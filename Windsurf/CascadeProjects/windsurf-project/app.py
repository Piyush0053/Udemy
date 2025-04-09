from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import os
import json
import tempfile
from services.speech_to_text import SpeechToTextService
from services.text_to_speech import TextToSpeechService

app = Flask(__name__)
CORS(app)

# Initialize services
stt_service = SpeechToTextService()
tts_service = TextToSpeechService()

@app.route('/')
def home():
    return '''
    <html>
        <head>
            <title>SpeechFlow API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    line-height: 1.6;
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                .endpoint {
                    background-color: #f5f5f5;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
                code {
                    background-color: #eee;
                    padding: 2px 5px;
                    border-radius: 3px;
                }
                pre {
                    background-color: #eee;
                    padding: 10px;
                    border-radius: 5px;
                    overflow-x: auto;
                }
            </style>
        </head>
        <body>
            <h1>SpeechFlow API</h1>
            <p>A comprehensive API for converting speech to text and text to speech with support for multiple languages.</p>
            
            <div class="endpoint">
                <h2>Speech-to-Text Endpoint</h2>
                <p><code>POST /api/speech-to-text</code></p>
                <p>Convert audio file to text.</p>
                <p>Parameters:</p>
                <ul>
                    <li><code>audio</code> (file): Audio file to transcribe</li>
                    <li><code>language</code> (string, optional): Language code (default: 'en-US')</li>
                    <li><code>model</code> (string, optional): Model to use ('fast', 'standard', 'precise')</li>
                </ul>
            </div>
            
            <div class="endpoint">
                <h2>Text-to-Speech Endpoint</h2>
                <p><code>POST /api/text-to-speech</code></p>
                <p>Convert text to speech.</p>
                <p>Parameters:</p>
                <ul>
                    <li><code>text</code> (string): Text to convert to speech</li>
                    <li><code>voice</code> (string, optional): Voice type ('male', 'female')</li>
                    <li><code>language</code> (string, optional): Language code (default: 'en-US')</li>
                    <li><code>rate</code> (float, optional): Speaking rate (0.5 to 2.0)</li>
                    <li><code>pitch</code> (float, optional): Voice pitch (0.5 to 2.0)</li>
                </ul>
            </div>
            
            <h2>Example Usage</h2>
            <pre>
import requests

# Speech-to-Text
files = {'audio': open('sample.wav', 'rb')}
response = requests.post('http://localhost:5000/api/speech-to-text', files=files)
result = response.json()
print(result['text'])

# Text-to-Speech
data = {
    'text': 'Hello, welcome to SpeechFlow API!',
    'voice': 'female',
    'language': 'en-US'
}
response = requests.post('http://localhost:5000/api/text-to-speech', json=data)
with open('output.wav', 'wb') as f:
    f.write(response.content)
            </pre>
        </body>
    </html>
    '''

@app.route('/api/speech-to-text', methods=['POST'])
def speech_to_text():
    """
    Convert speech to text
    ---
    parameters:
      - name: audio
        in: formData
        type: file
        required: true
        description: Audio file to transcribe
      - name: language
        in: formData
        type: string
        required: false
        default: en-US
        description: Language code
      - name: model
        in: formData
        type: string
        required: false
        default: standard
        description: Model to use (fast, standard, precise)
    """
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']
    language = request.form.get('language', 'en-US')
    model = request.form.get('model', 'standard')
    
    # Save uploaded file to a temporary location
    temp_file = tempfile.NamedTemporaryFile(delete=False)
    audio_file.save(temp_file.name)
    temp_file.close()
    
    try:
        # Process the audio file
        result = stt_service.transcribe(
            audio_path=temp_file.name,
            language=language,
            model=model
        )
        
        # Clean up the temporary file
        os.unlink(temp_file.name)
        
        return jsonify(result)
    
    except Exception as e:
        # Clean up the temporary file in case of error
        if os.path.exists(temp_file.name):
            os.unlink(temp_file.name)
        
        return jsonify({'error': str(e)}), 500

@app.route('/api/text-to-speech', methods=['POST'])
def text_to_speech():
    """
    Convert text to speech
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: TextToSpeech
          required:
            - text
          properties:
            text:
              type: string
              description: Text to convert to speech
            voice:
              type: string
              description: Voice type (male, female)
              default: female
            language:
              type: string
              description: Language code
              default: en-US
            rate:
              type: number
              description: Speaking rate (0.5 to 2.0)
              default: 1.0
            pitch:
              type: number
              description: Voice pitch (0.5 to 2.0)
              default: 1.0
    """
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400
    
    data = request.get_json()
    
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    voice = data.get('voice', 'female')
    language = data.get('language', 'en-US')
    rate = float(data.get('rate', 1.0))
    pitch = float(data.get('pitch', 1.0))
    
    try:
        # Generate audio from text
        audio_bytes = tts_service.synthesize(
            text=text,
            voice=voice,
            language=language,
            rate=rate,
            pitch=pitch
        )
        
        # Return the audio file
        return Response(
            audio_bytes,
            mimetype='audio/wav'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure the required directories exist
    os.makedirs('uploads', exist_ok=True)
    
    # Print startup message
    print("SpeechFlow API is running at http://localhost:5000")
    print("Available endpoints:")
    print("  - POST /api/speech-to-text")
    print("  - POST /api/text-to-speech")
    
    app.run(debug=True)
