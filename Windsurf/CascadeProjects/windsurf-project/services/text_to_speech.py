import os
import io
import tempfile
import numpy as np
from gtts import gTTS
import pyttsx3
from pydub import AudioSegment
import torch
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
import warnings

class TextToSpeechService:
    """Service for converting text to speech with support for multiple languages and voices."""
    
    def __init__(self):
        # Initialize pyttsx3 for offline TTS
        self.engine = pyttsx3.init()
        
        # Language codes mapping
        self.language_codes = {
            'en-US': 'en',
            'en-GB': 'en',
            'en-AU': 'en',
            'es-ES': 'es',
            'es-MX': 'es',
            'fr-FR': 'fr',
            'de-DE': 'de',
            'it-IT': 'it',
            'pt-BR': 'pt',
            'zh-CN': 'zh-CN',
            'ja-JP': 'ja',
            'ko-KR': 'ko',
            'hi-IN': 'hi'
        }
        
        # Initialize advanced model variables (will be loaded on-demand)
        self.processor = None
        self.model = None
        self.vocoder = None
    
    def _load_advanced_models(self):
        """Load advanced TTS models if they haven't been loaded yet."""
        if self.model is None:
            try:
                self.processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
                self.model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
                self.vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")
                print("Advanced TTS models loaded successfully")
            except Exception as e:
                print(f"Failed to load advanced TTS models: {str(e)}")
    
    def _synthesize_with_gtts(self, text, language, rate, pitch):
        """Synthesize speech using Google Text-to-Speech."""
        try:
            # Map our language code to gTTS format
            gtts_lang = self.language_codes.get(language, 'en')
            
            # Create a gTTS object
            tts = gTTS(text=text, lang=gtts_lang, slow=False)
            
            # Save to a temporary file
            temp_file = tempfile.NamedTemporaryFile(suffix='.mp3', delete=False)
            tts.save(temp_file.name)
            temp_file.close()
            
            # Convert MP3 to WAV with adjusted rate and pitch
            audio = AudioSegment.from_mp3(temp_file.name)
            
            # Apply rate and pitch modifications
            if rate != 1.0:
                # Change tempo without changing pitch
                audio = audio._spawn(audio.raw_data, overrides={
                    "frame_rate": int(audio.frame_rate * rate)
                })
                audio = audio.set_frame_rate(audio.frame_rate)
            
            if pitch != 1.0:
                # For pitch changes, we need to use a different approach
                # This is a simple approximation
                octaves = pitch - 1
                new_sample_rate = int(audio.frame_rate * (2.0 ** octaves))
                audio = audio._spawn(audio.raw_data, overrides={
                    "frame_rate": new_sample_rate
                })
            
            # Export to bytes
            buffer = io.BytesIO()
            audio.export(buffer, format="wav")
            
            # Clean up temporary file
            os.unlink(temp_file.name)
            
            return buffer.getvalue()
        
        except Exception as e:
            raise Exception(f"gTTS synthesis error: {str(e)}")
    
    def _synthesize_with_pyttsx3(self, text, voice, rate, pitch):
        """Synthesize speech using pyttsx3 (offline)."""
        try:
            # Set properties
            voices = self.engine.getProperty('voices')
            
            # Set voice based on gender
            if voice.lower() == 'female':
                # Try to find a female voice
                female_voices = [v for v in voices if 'female' in v.name.lower()]
                if female_voices:
                    self.engine.setProperty('voice', female_voices[0].id)
                else:
                    # If no explicit female voice, use the second voice if available (often female)
                    if len(voices) > 1:
                        self.engine.setProperty('voice', voices[1].id)
            else:
                # Use the first voice (usually male)
                self.engine.setProperty('voice', voices[0].id)
            
            # Set rate (words per minute)
            self.engine.setProperty('rate', self.engine.getProperty('rate') * rate)
            
            # Save to a temporary file
            temp_file = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
            self.engine.save_to_file(text, temp_file.name)
            self.engine.runAndWait()
            temp_file.close()
            
            # Load the audio to adjust pitch if needed
            audio = AudioSegment.from_wav(temp_file.name)
            
            # Apply pitch modification if needed
            if pitch != 1.0:
                octaves = pitch - 1
                new_sample_rate = int(audio.frame_rate * (2.0 ** octaves))
                audio = audio._spawn(audio.raw_data, overrides={
                    "frame_rate": new_sample_rate
                })
            
            # Export to bytes
            buffer = io.BytesIO()
            audio.export(buffer, format="wav")
            
            # Clean up temporary file
            os.unlink(temp_file.name)
            
            return buffer.getvalue()
        
        except Exception as e:
            raise Exception(f"pyttsx3 synthesis error: {str(e)}")
    
    def _synthesize_with_transformer(self, text, voice, language):
        """Synthesize speech using Hugging Face Transformers."""
        try:
            # Load models if not already loaded
            self._load_advanced_models()
            
            # Prepare inputs
            inputs = self.processor(text=text, return_tensors="pt")
            
            # Speaker embedding for voice selection
            speaker_embeddings = torch.zeros((1, 512))  # Default speaker embedding
            
            # Generate speech
            speech = self.model.generate_speech(
                inputs["input_ids"], 
                speaker_embeddings, 
                vocoder=self.vocoder
            )
            
            # Convert to WAV bytes
            buffer = io.BytesIO()
            import scipy.io.wavfile as wav
            wav.write(buffer, rate=16000, data=speech.numpy())
            
            return buffer.getvalue()
        
        except Exception as e:
            print(f"Transformer synthesis error: {str(e)}")
            # Fall back to another method
            return None
    
    def synthesize(self, text, voice='female', language='en-US', rate=1.0, pitch=1.0):
        """
        Convert text to speech.
        
        Args:
            text (str): Text to convert to speech
            voice (str, optional): Voice type ('male', 'female')
            language (str, optional): Language code
            rate (float, optional): Speaking rate (0.5 to 2.0)
            pitch (float, optional): Voice pitch (0.5 to 2.0)
            
        Returns:
            bytes: Audio data in WAV format
        """
        # Validate parameters
        if not text:
            raise ValueError("Text cannot be empty")
        
        if language not in self.language_codes:
            language = 'en-US'  # Default to English
        
        rate = max(0.5, min(2.0, rate))  # Clamp rate between 0.5 and 2.0
        pitch = max(0.5, min(2.0, pitch))  # Clamp pitch between 0.5 and 2.0
        
        # Try advanced transformer-based synthesis first for English
        if language.startswith('en-'):
            try:
                audio_data = self._synthesize_with_transformer(text, voice, language)
                if audio_data:
                    return audio_data
            except Exception as e:
                print(f"Advanced synthesis failed, falling back: {str(e)}")
        
        # For non-English or if transformer synthesis failed, try Google TTS
        try:
            return self._synthesize_with_gtts(text, language, rate, pitch)
        except Exception as e:
            print(f"Google TTS failed, falling back to offline TTS: {str(e)}")
        
        # Fall back to offline TTS engine
        return self._synthesize_with_pyttsx3(text, voice, rate, pitch)
