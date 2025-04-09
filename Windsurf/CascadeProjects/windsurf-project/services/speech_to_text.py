import speech_recognition as sr
from pydub import AudioSegment
import os
import tempfile
import numpy as np
from langdetect import detect
import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import warnings

class SpeechToTextService:
    """Service for converting speech to text with support for multiple languages and models."""
    
    def __init__(self):
        # Initialize the speech recognizer
        self.recognizer = sr.Recognizer()
        
        # Language codes mapping
        self.language_codes = {
            'en-US': 'english',
            'en-GB': 'english',
            'en-AU': 'english',
            'es-ES': 'spanish',
            'es-MX': 'spanish',
            'fr-FR': 'french',
            'de-DE': 'german',
            'it-IT': 'italian',
            'pt-BR': 'portuguese',
            'zh-CN': 'chinese',
            'ja-JP': 'japanese',
            'ko-KR': 'korean',
            'hi-IN': 'hindi'
        }
        
        # Pre-trained model IDs for different languages
        self.model_ids = {
            'en-US': 'facebook/wav2vec2-large-960h-lv60-self',
            'en-GB': 'facebook/wav2vec2-large-960h-lv60-self',
            'en-AU': 'facebook/wav2vec2-large-960h-lv60-self',
            'es-ES': 'facebook/wav2vec2-large-xlsr-53-spanish',
            'fr-FR': 'facebook/wav2vec2-large-xlsr-53-french',
            'de-DE': 'facebook/wav2vec2-large-xlsr-53-german',
            'it-IT': 'facebook/wav2vec2-large-xlsr-53-italian',
            'pt-BR': 'facebook/wav2vec2-large-xlsr-53-portuguese',
            'zh-CN': 'facebook/wav2vec2-large-xlsr-53',
            'ja-JP': 'facebook/wav2vec2-large-xlsr-53',
            'ko-KR': 'facebook/wav2vec2-large-xlsr-53',
            'hi-IN': 'facebook/wav2vec2-large-xlsr-53'
        }
        
        # Initialize model and processor maps
        self.models = {}
        self.processors = {}
        
        # Load models on-demand to save memory
        
    def _load_model(self, language):
        """Load model and processor for a specific language if not already loaded."""
        if language not in self.models:
            try:
                model_id = self.model_ids.get(language, self.model_ids['en-US'])
                self.processors[language] = Wav2Vec2Processor.from_pretrained(model_id)
                self.models[language] = Wav2Vec2ForCTC.from_pretrained(model_id)
                print(f"Loaded model for {language}")
            except Exception as e:
                print(f"Failed to load model for {language}: {str(e)}")
                # Fall back to the English model if loading fails
                if language != 'en-US':
                    return self._load_model('en-US')
        
        return self.models[language], self.processors[language]
    
    def _convert_audio_to_wav(self, audio_path):
        """Convert audio to WAV format if it's not already in that format."""
        file_ext = os.path.splitext(audio_path)[1].lower()
        
        if file_ext == '.wav':
            return audio_path
        
        # Convert to WAV using pydub
        try:
            audio = AudioSegment.from_file(audio_path)
            temp_wav = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
            audio.export(temp_wav.name, format='wav')
            return temp_wav.name
        except Exception as e:
            raise Exception(f"Failed to convert audio format: {str(e)}")
    
    def _detect_language(self, audio_path):
        """Attempt to detect the language of the audio."""
        try:
            # Quick transcription to detect language
            with sr.AudioFile(audio_path) as source:
                audio_data = self.recognizer.record(source)
                text = self.recognizer.recognize_google(audio_data)
                detected_lang = detect(text)
                
                # Map detected language code to our supported languages
                for lang_code in self.language_codes:
                    if lang_code.startswith(detected_lang):
                        return lang_code
                
                # Default to en-US if no match
                return 'en-US'
        except:
            # Default to en-US if detection fails
            return 'en-US'
    
    def _transcribe_with_google(self, audio_path, language):
        """Transcribe audio using Google Speech Recognition."""
        try:
            with sr.AudioFile(audio_path) as source:
                audio_data = self.recognizer.record(source)
                
                # Map our language code to Google's format
                google_lang = language
                
                result = self.recognizer.recognize_google(
                    audio_data,
                    language=google_lang,
                    show_all=True
                )
                
                if not result or not isinstance(result, dict) or 'alternative' not in result:
                    return {'text': '', 'confidence': 0.0}
                
                best_result = result['alternative'][0]
                return {
                    'text': best_result.get('transcript', ''),
                    'confidence': best_result.get('confidence', 0.0) if 'confidence' in best_result else 0.8
                }
        except Exception as e:
            print(f"Google transcription error: {str(e)}")
            return {'text': '', 'confidence': 0.0}
    
    def _transcribe_with_transformer(self, audio_path, language):
        """Transcribe audio using Hugging Face Transformers."""
        try:
            # Load the model and processor
            model, processor = self._load_model(language)
            
            # Load and preprocess the audio
            import librosa
            speech_array, sampling_rate = librosa.load(audio_path, sr=16000)
            inputs = processor(speech_array, sampling_rate=16000, return_tensors="pt", padding=True)
            
            # Perform inference
            with torch.no_grad():
                logits = model(inputs.input_values, attention_mask=inputs.attention_mask).logits
                predicted_ids = torch.argmax(logits, dim=-1)
                
            # Convert the predictions to text
            transcription = processor.batch_decode(predicted_ids)[0]
            
            return {
                'text': transcription,
                'confidence': 0.85  # Estimated confidence
            }
        except Exception as e:
            print(f"Transformer transcription error: {str(e)}")
            return {'text': '', 'confidence': 0.0}
    
    def transcribe(self, audio_path, language=None, model='standard'):
        """
        Transcribe an audio file to text.
        
        Args:
            audio_path (str): Path to the audio file
            language (str, optional): Language code (e.g., 'en-US', 'es-ES')
            model (str, optional): Model to use ('fast', 'standard', 'precise')
            
        Returns:
            dict: A dictionary containing the transcribed text, confidence score, and detected language
        """
        # Convert audio to WAV if needed
        wav_path = self._convert_audio_to_wav(audio_path)
        
        # Detect language if not provided
        if not language or language not in self.language_codes:
            language = self._detect_language(wav_path)
        
        # Choose the transcription method based on the model parameter
        if model == 'fast':
            # Fast but less accurate (Google Speech Recognition)
            result = self._transcribe_with_google(wav_path, language)
        elif model == 'precise':
            # More accurate but slower (Transformer models)
            result = self._transcribe_with_transformer(wav_path, language)
        else:
            # Standard approach - try transformer first, fall back to Google if it fails
            result = self._transcribe_with_transformer(wav_path, language)
            if not result['text']:
                result = self._transcribe_with_google(wav_path, language)
        
        # Clean up temporary WAV file if we created one
        if wav_path != audio_path and os.path.exists(wav_path):
            os.unlink(wav_path)
        
        # Return the results
        return {
            'text': result['text'],
            'confidence': result['confidence'],
            'language': language
        }
