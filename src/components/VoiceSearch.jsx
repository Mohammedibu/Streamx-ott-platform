import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import '../App.css';

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [supportsSpeechRecognition, setSupportsSpeechRecognition] = useState(true);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupportsSpeechRecognition(false);
      setError('Your browser does not support speech recognition.');
      return;
    }

    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    // Setup event handlers
    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      
      // Auto search after receiving result
      if (speechResult.trim()) {
        setTimeout(() => {
          navigate(`/search?q=${encodeURIComponent(speechResult.trim())}`);
          setIsListening(false);
        }, 1000); // Short delay to show the user what was recognized
      }
    };

    recognitionRef.current.onerror = (event) => {
      setError(`Error occurred in recognition: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    // Clean up
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [navigate]);

  const toggleListening = () => {
    if (!supportsSpeechRecognition) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setError('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className="voice-search-container">
      <button 
        onClick={toggleListening} 
        className={`voice-search-button ${isListening ? 'listening' : ''}`}
        disabled={!supportsSpeechRecognition}
        title={supportsSpeechRecognition ? "Search with your voice" : "Voice search not supported"}
      >
        {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>
      
      {isListening && (
        <div className="voice-search-indicator">
          <div className="voice-waves">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
          <p>Listening...</p>
        </div>
      )}
      
      {transcript && (
        <div className="voice-transcript">
          "{transcript}"
        </div>
      )}
      
      {error && (
        <div className="voice-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;