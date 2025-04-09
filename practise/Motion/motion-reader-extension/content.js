let isMotionEnabled = false;
let isVoiceEnabled = false;

// Motion Compensation: Adjust Text Stabilization
function handleMotion(event) {
  if (!isMotionEnabled) return;

  let acceleration = event.accelerationIncludingGravity;
  if (acceleration) {
    let offsetX = Math.round(acceleration.x * -2);
    let offsetY = Math.round(acceleration.y * -2);
    document.body.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
}

// Toggle Motion Compensation
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleMotion") {
    isMotionEnabled = !isMotionEnabled;
    if (isMotionEnabled) {
      window.addEventListener("devicemotion", handleMotion);
      sendResponse({ status: "Motion compensation enabled" });
    } else {
      window.removeEventListener("devicemotion", handleMotion);
      document.body.style.transform = ""; // Reset position
      sendResponse({ status: "Motion compensation disabled" });
    }
  } else if (message.action === "toggleVoice") {
    isVoiceEnabled = !isVoiceEnabled;
    if (isVoiceEnabled) {
      startVoiceRecognition();
      sendResponse({ status: "Voice control enabled" });
    } else {
      stopVoiceRecognition();
      sendResponse({ status: "Voice control disabled" });
    }
  }
  return true; // Keep the message channel open for sendResponse
});

// Voice Control: Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

function setupRecognition() {
  if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser");
    return false;
  }
  
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  
  recognition.onstart = () => {
    console.log("Voice recognition started");
  };
  
  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
    if (event.error === 'not-allowed') {
      alert("Please enable microphone access for voice control");
    }
  };
  
  recognition.onend = () => {
    if (isVoiceEnabled) {
      // Restart if it ended unexpectedly while still enabled
      recognition.start();
    }
  };
  
  recognition.onresult = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("Voice Command: ", command);

    if (command.includes("scroll up")) {
      window.scrollBy(0, -200);
    } else if (command.includes("scroll down")) {
      window.scrollBy(0, 200);
    } else if (command.includes("read text")) {
      readText();
    } else if (command.includes("stop reading")) {
      speechSynthesis.cancel();
    }
  };
  
  return true;
}

function startVoiceRecognition() {
  if (!recognition && !setupRecognition()) {
    return;
  }
  
  try {
    recognition.start();
  } catch (e) {
    console.error("Error starting speech recognition:", e);
  }
}

function stopVoiceRecognition() {
  if (recognition) {
    try {
      recognition.stop();
    } catch (e) {
      console.error("Error stopping speech recognition:", e);
    }
  }
}

// Text-to-Speech Function
function readText() {
  let selectedText = window.getSelection().toString();
  if (!selectedText) {
    selectedText = document.body.innerText.substring(0, 500);
  }

  speechSynthesis.cancel(); // Stop any ongoing speech
  
  let utterance = new SpeechSynthesisUtterance(selectedText);
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}
