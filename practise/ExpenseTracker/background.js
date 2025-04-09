// Background service worker for Expense Tracker extension
const DEBUG_MODE = true;

// Debug log function
function debugLog(...args) {
  if (DEBUG_MODE) {
    console.log('[Expense Tracker Background]', ...args);
  }
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  debugLog('Received message:', message);
  
  if (message.action === 'openPopup') {
    // Open the popup
    try {
      chrome.action.openPopup();
      debugLog('Opening popup');
    } catch (error) {
      debugLog('Error opening popup:', error);
    }
  }
  
  // Return true to indicate async response
  return true;
});

// Set up context menu
chrome.runtime.onInstalled.addListener((details) => {
  debugLog('Extension installed, reason:', details.reason);
  
  // Create context menu item
  chrome.contextMenus.create({
    id: 'addCustomExpense',
    title: 'Add Custom Expense',
    contexts: ['page']
  }, () => {
    if (chrome.runtime.lastError) {
      debugLog('Error creating context menu:', chrome.runtime.lastError);
    } else {
      debugLog('Context menu created successfully');
    }
  });
  
  // Initialize data if needed
  chrome.storage.local.get(['expenses', 'budgets'], (result) => {
    if (chrome.runtime.lastError) {
      debugLog('Error getting storage data:', chrome.runtime.lastError);
      return;
    }
    
    // Initialize expenses if not present or invalid
    if (!result.expenses || !Array.isArray(result.expenses)) {
      chrome.storage.local.set({ expenses: [] }, () => {
        if (chrome.runtime.lastError) {
          debugLog('Error initializing expenses:', chrome.runtime.lastError);
        } else {
          debugLog('Expenses initialized successfully');
        }
      });
    } else {
      debugLog('Found existing expenses:', result.expenses.length);
    }
    
    // Initialize budgets if not present or invalid
    if (!result.budgets || typeof result.budgets !== 'object') {
      chrome.storage.local.set({ budgets: {} }, () => {
        if (chrome.runtime.lastError) {
          debugLog('Error initializing budgets:', chrome.runtime.lastError);
        } else {
          debugLog('Budgets initialized successfully');
        }
      });
    } else {
      debugLog('Found existing budgets for platforms:', Object.keys(result.budgets).length);
    }
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  debugLog('Context menu clicked:', info.menuItemId);
  
  if (info.menuItemId === 'addCustomExpense') {
    // Open custom expense form in a new tab
    chrome.tabs.create({
      url: 'custom_expense.html'
    }, (tab) => {
      if (chrome.runtime.lastError) {
        debugLog('Error opening custom expense form:', chrome.runtime.lastError);
      } else {
        debugLog('Custom expense form opened in tab:', tab.id);
      }
    });
  }
});

// Set up alarm for monthly budget resets
chrome.alarms.create('monthlyReset', {
  periodInMinutes: 60 * 24 // Check daily
}, () => {
  if (chrome.runtime.lastError) {
    debugLog('Error creating alarm:', chrome.runtime.lastError);
  } else {
    debugLog('Monthly reset alarm created');
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  debugLog('Alarm triggered:', alarm.name);
  
  if (alarm.name === 'monthlyReset') {
    const now = new Date();
    debugLog('Monthly reset check, date:', now.getDate());
    
    // If it's the first day of the month, check if we need to notify about budget resets
    if (now.getDate() === 1) {
      // Notify user about budget reset for the new month
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon128.png',
        title: 'Monthly Budget Reset',
        message: 'A new month has started. Your expense tracking has been reset for the new month.',
        buttons: [
          { title: 'View Dashboard' }
        ],
        priority: 2
      }, (notificationId) => {
        if (chrome.runtime.lastError) {
          debugLog('Error creating notification:', chrome.runtime.lastError);
        } else {
          debugLog('Monthly reset notification created:', notificationId);
        }
      });
    }
  }
});

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  debugLog('Notification button clicked:', notificationId, buttonIndex);
  
  if (buttonIndex === 0) {
    // Open the popup
    try {
      chrome.action.openPopup();
      debugLog('Opening popup from notification');
    } catch (error) {
      debugLog('Error opening popup from notification:', error);
      
      // Fallback - open popup.html in a new tab
      chrome.tabs.create({ url: 'popup.html' });
    }
  }
});

// Listen for tab updates to inject the content script when needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if this tab is for a supported e-commerce site
    const supportedDomains = [
      'amazon.com', 'flipkart.com', 'swiggy.com', 'zomato.com', 'zepto.co'
    ];
    
    const isSupported = supportedDomains.some(domain => tab.url.includes(domain));
    
    if (isSupported) {
      debugLog('Supported site loaded in tab:', tabId, tab.url);
    }
  }
});

// Log that the background script is ready
debugLog('Background service worker initialized');

// Function to validate storage data
function validateStorageData() {
  chrome.storage.local.get(['expenses', 'budgets'], (result) => {
    if (chrome.runtime.lastError) {
      debugLog('Error checking storage data:', chrome.runtime.lastError);
      return;
    }
    
    let needsRepair = false;
    
    // Check expenses
    if (!result.expenses) {
      debugLog('No expenses found');
      needsRepair = true;
    } else if (!Array.isArray(result.expenses)) {
      debugLog('Expenses is not an array:', typeof result.expenses);
      needsRepair = true;
    } else {
      debugLog('Expenses array looks good, count:', result.expenses.length);
    }
    
    // Check budgets
    if (!result.budgets) {
      debugLog('No budgets found');
      needsRepair = true;
    } else if (typeof result.budgets !== 'object') {
      debugLog('Budgets is not an object:', typeof result.budgets);
      needsRepair = true;
    } else {
      debugLog('Budgets object looks good, platforms:', Object.keys(result.budgets).length);
    }
    
    // Repair if needed
    if (needsRepair) {
      debugLog('Repairing storage data');
      
      const expenses = Array.isArray(result.expenses) ? result.expenses : [];
      const budgets = typeof result.budgets === 'object' ? result.budgets : {};
      
      chrome.storage.local.set({ expenses, budgets }, () => {
        if (chrome.runtime.lastError) {
          debugLog('Error repairing storage data:', chrome.runtime.lastError);
        } else {
          debugLog('Storage data repaired successfully');
        }
      });
    }
  });
}

// Run validation check periodically
setInterval(validateStorageData, 24 * 60 * 60 * 1000); // Once a day

// Run validation on startup
validateStorageData();