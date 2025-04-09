chrome.runtime.onInstalled.addListener(() => {
    console.log("Motion-Optimized Reader installed.");
  });
  
  // The action.onClicked event won't fire if there's a popup
  // This is a fallback for when the user disables the popup
  chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith("http")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
    }
  });
  