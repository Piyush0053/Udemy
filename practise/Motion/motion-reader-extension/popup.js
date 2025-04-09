document.addEventListener('DOMContentLoaded', function() {
  const motionToggle = document.getElementById("motionToggle");
  const voiceToggle = document.getElementById("voiceToggle");
  
  motionToggle.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleMotion" }, response => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        
        if (response && response.status) {
          motionToggle.textContent = response.status.includes("enabled") 
            ? "Disable Motion Compensation" 
            : "Enable Motion Compensation";
          
          motionToggle.classList.toggle("active", response.status.includes("enabled"));
        }
      });
    });
  });
  
  voiceToggle.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleVoice" }, response => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        
        if (response && response.status) {
          voiceToggle.textContent = response.status.includes("enabled") 
            ? "Disable Voice Control" 
            : "Enable Voice Control";
          
          voiceToggle.classList.toggle("active", response.status.includes("enabled"));
        }
      });
    });
  });
});
  