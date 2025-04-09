# SpeechFlow API

A comprehensive API for converting speech to text and text to speech with support for multiple languages and dialects.

## Features

- **Speech-to-Text Conversion**: High accuracy transcription with support for multiple languages and dialects
- **Text-to-Speech Conversion**: Natural-sounding speech synthesis with customizable voice options
- **Multi-language Support**: Works with various languages and regional accents
- **Customizable Voice Options**: Multiple voice types and speaking styles
- **High Accuracy**: Trained on diverse datasets with an 85% accuracy rate
- **Easy Integration**: Simple API endpoints for seamless integration into any application

## Installation

```bash
pip install -r requirements.txt
```

## Quick Start

### Starting the API Server

```bash
python app.py
```

The API will be available at: http://localhost:5000

### Speech-to-Text Example

```python
import requests
import json

# Convert an audio file to text
files = {'audio': open('sample.wav', 'rb')}
response = requests.post('http://localhost:5000/api/speech-to-text', files=files)
result = response.json()
print(result['text'])
```

### Text-to-Speech Example

```python
import requests
import json

# Convert text to speech
data = {
    'text': 'Hello, welcome to SpeechFlow API!',
    'voice': 'female',
    'language': 'en-US'
}
response = requests.post('http://localhost:5000/api/text-to-speech', json=data)

# Save the audio file
with open('output.wav', 'wb') as f:
    f.write(response.content)
```

## API Documentation

### Speech-to-Text Endpoint

`POST /api/speech-to-text`

Parameters:
- `audio` (file): Audio file to transcribe (WAV, MP3, FLAC formats supported)
- `language` (string, optional): Language code (default: 'en-US')
- `model` (string, optional): Model to use for transcription ('fast', 'standard', 'precise', default: 'standard')

Response:
```json
{
    "text": "Transcribed text will appear here",
    "confidence": 0.95,
    "language": "en-US"
}
```

### Text-to-Speech Endpoint

`POST /api/text-to-speech`

Parameters:
- `text` (string): Text to convert to speech
- `voice` (string, optional): Voice type ('male', 'female', default: 'female')
- `language` (string, optional): Language code (default: 'en-US')
- `rate` (float, optional): Speaking rate (0.5 to 2.0, default: 1.0)
- `pitch` (float, optional): Voice pitch (0.5 to 2.0, default: 1.0)

Response:
- Audio file (WAV format)

## Supported Languages

The API currently supports the following languages:
- English (en-US, en-GB, en-AU)
- Spanish (es-ES, es-MX)
- French (fr-FR)
- German (de-DE)
- Italian (it-IT)
- Portuguese (pt-BR)
- Chinese (zh-CN)
- Japanese (ja-JP)
- Korean (ko-KR)
- Hindi (hi-IN)

## License

MIT License
