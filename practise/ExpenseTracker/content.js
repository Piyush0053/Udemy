// Constants
const SUPPORTED_PLATFORMS = {
  'amazon.com': {
    name: 'amazon',
    orderAmountSelectors: [
      '.grand-total-price',
      '#totalAmount',
      '.a-color-price.a-size-medium.a-text-right.grand-total-price',
      '.a-color-price.a-size-medium.aok-align-center.a-text-bold',
      '.a-color-base .a-size-medium',
      '[data-testid="Prime-cart-total"] span',
      '.sc-white-space-nowrap'
    ],
    cartPageIndicators: [
      '/gp/cart/view.html',
      '/checkout/',
      '/buy/',
      '/cart'
    ],
    orderCompletionIndicators: [
      'Thank you for your purchase',
      'Your order has been placed',
      'Order placed'
    ]
  },
  'flipkart.com': {
    name: 'flipkart',
    orderAmountSelectors: [
      '._2Tpdn3',
      '.payment-amt',
      '._3xFQAD',
      '.B_NuCI',
      '.dyC4hf',
      '.pLyVGl',
      '._1dqRvU'
    ],
    cartPageIndicators: [
      '/checkout/cart',
      '/checkout/otp/',
      '/buy-now/',
      '/cart',
      '/viewcart'
    ],
    orderCompletionIndicators: [
      'Order Confirmed',
      'Your order is placed',
      'Your order has been placed'
    ]
  },
  'swiggy.com': {
    name: 'swiggy',
    orderAmountSelectors: [
      '.rupee',
      '._3TdDAC',
      '._2BgmMR',
      '[data-testid="total-amount"]',
      '.ZDryZ',
      '._3ZAW1'
    ],
    cartPageIndicators: [
      '/checkout',
      '/cart'
    ],
    orderCompletionIndicators: [
      'Order Placed',
      'Your order has been placed',
      'Order confirmed'
    ]
  },
  'zomato.com': {
    name: 'zomato',
    orderAmountSelectors: [
      '.totalpay',
      '.sc-1s0saks-17.bGrnCu',
      '.amount',
      '.cCiQWA',
      '[data-testid="totalCost"]',
      '.cBETuA'
    ],
    cartPageIndicators: [
      '/checkout',
      '/order',
      '/cart'
    ],
    orderCompletionIndicators: [
      'Order Placed Successfully',
      'Your order has been placed',
      'Order confirmed'
    ]
  },
  'zepto.co': {
    name: 'zepto',
    orderAmountSelectors: [
      '.amount',
      '.totalPrice',
      '.orderTotal',
      '[data-testid="cart-total"]',
      '.fzZlfi'
    ],
    cartPageIndicators: [
      '/cart',
      '/checkout'
    ],
    orderCompletionIndicators: [
      'Order Confirmed',
      'Your order has been placed',
      'Thank you for your order'
    ]
  }
};

// Variables
let currentPlatform = null;
let isCartPage = false;
let isOrderCompletionPage = false;
let orderAmount = 0;
let notificationShown = false;
let debugMode = true; // Enable debug mode

// Debug log function
function debugLog(...args) {
  if (debugMode) {
    console.log('[Expense Tracker]', ...args);
  }
}

// Initialize when the page loads
window.addEventListener('load', () => {
  debugLog('Extension loaded, detecting platform and page type');
  detectPlatform();
  checkPage();
  
  if (currentPlatform) {
    debugLog('Platform detected:', currentPlatform.name);
    if (isCartPage) {
      debugLog('Cart page detected');
      detectOrderAmount();
      showExpenseForm();
    } else if (isOrderCompletionPage) {
      debugLog('Order completion page detected');
      detectOrderAmount();
      trackExpense();
    } else {
      debugLog('Not a cart or order completion page. Checking for item pages');
      // Try to detect if we're on a product page and show a different notification
      detectProductPage();
    }
  } else {
    debugLog('No supported platform detected for hostname:', window.location.hostname);
  }
});

// Detect if this is a product page
function detectProductPage() {
  // Common product page indicators
  const productPageIndicators = [
    '/dp/',
    '/product/',
    '/item/',
    '/product-details/',
    '/pd/'
  ];
  
  const path = window.location.pathname;
  const isProductPage = productPageIndicators.some(indicator => path.includes(indicator));
  
  if (isProductPage) {
    debugLog('Product page detected');
    // Could add a small reminder notification here if desired
  }
}

// Detect current platform
function detectPlatform() {
  const hostname = window.location.hostname;
  debugLog('Checking hostname:', hostname);
  
  for (const domain in SUPPORTED_PLATFORMS) {
    if (hostname.includes(domain)) {
      currentPlatform = SUPPORTED_PLATFORMS[domain];
      debugLog('Matched platform:', domain);
      break;
    }
  }
}

// Check if current page is cart or order completion page
function checkPage() {
  if (!currentPlatform) return;
  
  const path = window.location.pathname + window.location.search;
  const bodyText = document.body.innerText || '';
  
  debugLog('Checking path:', path);
  
  // Check if cart page
  isCartPage = currentPlatform.cartPageIndicators.some(indicator => 
    path.includes(indicator)
  );
  
  // Check if order completion page
  isOrderCompletionPage = currentPlatform.orderCompletionIndicators.some(indicator => 
    bodyText.includes(indicator)
  );
  
  debugLog('Is cart page:', isCartPage);
  debugLog('Is order completion page:', isOrderCompletionPage);
}

// Detect order amount from the page
function detectOrderAmount() {
  if (!currentPlatform) return;
  
  debugLog('Trying to detect order amount');
  
  for (const selector of currentPlatform.orderAmountSelectors) {
    const elements = document.querySelectorAll(selector);
    debugLog(`Checking selector ${selector}, found ${elements.length} elements`);
    
    for (const element of elements) {
      const text = element.innerText || element.textContent;
      debugLog(`Element text: ${text}`);
      
      // Extract number from text (e.g., "₹1,234.56" -> 1234.56)
      const amountMatch = text.match(/[₹₨Rs.]*\s*([0-9,]+(\.[0-9]+)?)/);
      if (amountMatch && amountMatch[1]) {
        orderAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
        debugLog(`Detected amount: ${orderAmount}`);
        return;
      }
    }
  }
  
  // Try a more aggressive approach if no amount was found
  if (orderAmount <= 0) {
    debugLog('No amount found with selectors, trying regex on full page');
    const bodyText = document.body.innerText;
    const totalRegexes = [
      /total:?\s*₹\s*([0-9,]+(\.[0-9]+)?)/i,
      /total\s*amount:?\s*₹\s*([0-9,]+(\.[0-9]+)?)/i,
      /grand\s*total:?\s*₹\s*([0-9,]+(\.[0-9]+)?)/i,
      /order\s*total:?\s*₹\s*([0-9,]+(\.[0-9]+)?)/i,
      /₹\s*([0-9,]+(\.[0-9]+)?)/
    ];
    
    for (const regex of totalRegexes) {
      const match = bodyText.match(regex);
      if (match && match[1]) {
        orderAmount = parseFloat(match[1].replace(/,/g, ''));
        debugLog(`Found amount using regex: ${orderAmount}`);
        break;
      }
    }
  }
  
  if (orderAmount <= 0) {
    debugLog('Failed to detect order amount');
  }
}

// Show expense form on cart page
function showExpenseForm() {
  if (!currentPlatform || !isCartPage || notificationShown) return;
  
  // If no amount detected or amount is too small, try once more
  if (orderAmount <= 0) {
    debugLog('No amount detected initially, trying again');
    setTimeout(() => {
      detectOrderAmount();
      if (orderAmount > 0) {
        debugLog('Amount detected on retry:', orderAmount);
        createExpenseForm();
      } else {
        debugLog('Still no amount detected');
      }
    }, 2000); // Wait 2 seconds for page to fully load
  } else {
    createExpenseForm();
  }
}

// Create and show the expense tracking form
function createExpenseForm() {
  if (notificationShown) return;
  
  debugLog('Creating expense form with amount:', orderAmount);
  
  // Create notification container
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    padding: 15px;
    font-family: Arial, sans-serif;
  `;
  
  // Create notification content
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <h3 style="margin: 0; color: #2c3e50; font-size: 16px;">Expense Tracker</h3>
      <button id="expense-tracker-close" style="background: none; border: none; cursor: pointer; font-size: 16px;">×</button>
    </div>
    <p style="margin: 10px 0; color: #34495e;">Track this expense:</p>
    <div style="margin: 10px 0;">
      <strong>Platform:</strong> ${capitalizeFirstLetter(currentPlatform.name)}<br>
      <strong>Amount:</strong> ₹${orderAmount.toFixed(2)}
    </div>
    <button id="expense-tracker-track" style="background-color: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; width: 100%;">Track Expense</button>
  `;
  
  // Add to page
  document.body.appendChild(container);
  notificationShown = true;
  
  // Add event listeners
  document.getElementById('expense-tracker-close').addEventListener('click', () => {
    container.remove();
    notificationShown = false; // Allow showing the form again if closed
  });
  
  document.getElementById('expense-tracker-track').addEventListener('click', () => {
    trackExpense();
    container.innerHTML = `
      <div style="text-align: center; padding: 10px;">
        <p style="color: #27ae60; font-weight: bold;">Expense tracked!</p>
        <p>Amount: ₹${orderAmount.toFixed(2)}</p>
      </div>
    `;
    
    // Auto close after 3 seconds
    setTimeout(() => {
      container.remove();
    }, 3000);
  });
}

// Track expense
function trackExpense() {
  if (!currentPlatform || orderAmount <= 0) {
    debugLog('Cannot track expense: invalid platform or amount');
    return;
  }
  
  debugLog('Tracking expense:', currentPlatform.name, orderAmount);
  
  // Create expense object
  const expense = {
    platform: currentPlatform.name,
    amount: orderAmount,
    date: Date.now(),
    description: `Purchase from ${capitalizeFirstLetter(currentPlatform.name)}`
  };
  
  // Get existing expenses
  chrome.storage.local.get(['expenses'], (result) => {
    let expenses = result.expenses || [];
    debugLog('Current expenses count:', expenses.length);
    
    // Ensure expenses is an array (handling potential data corruption)
    if (!Array.isArray(expenses)) {
      debugLog('Expenses was not an array, resetting');
      expenses = [];
    }
    
    expenses.push(expense);
    
    // Save updated expenses
    chrome.storage.local.set({ expenses }, () => {
      const error = chrome.runtime.lastError;
      if (error) {
        debugLog('Error saving expense:', error);
      } else {
        debugLog('Expense saved successfully:', expense);
        
        // Show notification
        showNotification();
      }
    });
  });
}

// Show notification after tracking
function showNotification() {
  // Check if we're on order completion page
  if (isOrderCompletionPage && !notificationShown) {
    debugLog('Showing order completion notification');
    
    // Create notification container
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      padding: 15px;
      font-family: Arial, sans-serif;
    `;
    
    // Create notification content
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3 style="margin: 0; color: #2c3e50; font-size: 16px;">Expense Tracker</h3>
        <button id="expense-tracker-close-notification" style="background: none; border: none; cursor: pointer; font-size: 16px;">×</button>
      </div>
      <p style="margin: 10px 0; color: #27ae60; font-weight: bold;">Expense tracked successfully!</p>
      <div style="margin: 10px 0;">
        <strong>Platform:</strong> ${capitalizeFirstLetter(currentPlatform.name)}<br>
        <strong>Amount:</strong> ₹${orderAmount.toFixed(2)}
      </div>
      <button id="expense-tracker-view" style="background-color: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; width: 100%;">View Expenses</button>
    `;
    
    // Add to page
    document.body.appendChild(container);
    notificationShown = true;
    
    // Add event listeners
    document.getElementById('expense-tracker-close-notification').addEventListener('click', () => {
      container.remove();
    });
    
    document.getElementById('expense-tracker-view').addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openPopup' });
      container.remove();
    });
    
    // Auto close after 10 seconds
    setTimeout(() => {
      if (container.parentNode) {
        container.remove();
      }
    }, 10000);
  }
}

// Capitalize first letter helper
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Also run the detection when URL changes (for single-page applications)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    debugLog('URL changed, re-detecting page');
    isCartPage = false;
    isOrderCompletionPage = false;
    notificationShown = false;
    orderAmount = 0;
    
    // Wait a bit for the page to load
    setTimeout(() => {
      checkPage();
      if (isCartPage) {
        detectOrderAmount();
        showExpenseForm();
      } else if (isOrderCompletionPage) {
        detectOrderAmount();
        trackExpense();
      }
    }, 1000);
  }
}).observe(document, {subtree: true, childList: true});

// Log that the script is ready
debugLog('Content script initialized');

// Check for and show past expenses notification
setTimeout(() => {
  chrome.storage.local.get(['expenses'], (result) => {
    const expenses = result.expenses || [];
    debugLog('Current saved expenses:', expenses.length);
  });
}, 3000); 