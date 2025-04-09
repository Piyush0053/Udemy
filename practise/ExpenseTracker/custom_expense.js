// DOM elements
const form = document.getElementById('custom-expense-form');
const platformSelect = document.getElementById('platform');
const otherPlatformContainer = document.getElementById('other-platform-container');
const otherPlatformInput = document.getElementById('other-platform');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');

// Set default date to today
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
dateInput.value = `${year}-${month}-${day}`;

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});

function setupEventListeners() {
  // Show/hide other platform input based on selection
  platformSelect.addEventListener('change', () => {
    if (platformSelect.value === 'other') {
      otherPlatformContainer.style.display = 'block';
      otherPlatformInput.required = true;
    } else {
      otherPlatformContainer.style.display = 'none';
      otherPlatformInput.required = false;
    }
  });
  
  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveExpense();
  });
  
  // Handle cancel button
  cancelButton.addEventListener('click', () => {
    window.close();
  });
}

// Save expense
function saveExpense() {
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Get platform
  let platform = platformSelect.value;
  if (platform === 'other') {
    platform = otherPlatformInput.value.toLowerCase().trim();
  }
  
  // Create expense object
  const expense = {
    platform: platform,
    amount: parseFloat(amountInput.value),
    date: new Date(dateInput.value).getTime(),
    description: descriptionInput.value.trim()
  };
  
  // Get existing expenses
  chrome.storage.local.get(['expenses'], (result) => {
    const expenses = result.expenses || [];
    expenses.push(expense);
    
    // Save updated expenses
    chrome.storage.local.set({ expenses }, () => {
      // Show confirmation
      showConfirmation(expense);
    });
  });
}

// Validate form inputs
function validateForm() {
  if (!platformSelect.value) {
    showError('Please select a platform.');
    return false;
  }
  
  if (platformSelect.value === 'other' && !otherPlatformInput.value.trim()) {
    showError('Please enter the platform name.');
    return false;
  }
  
  if (!amountInput.value || parseFloat(amountInput.value) <= 0) {
    showError('Please enter a valid amount greater than zero.');
    return false;
  }
  
  if (!dateInput.value) {
    showError('Please select a date.');
    return false;
  }
  
  return true;
}

// Show error message
function showError(message) {
  // Check if error message already exists
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message alert alert-danger';
  errorDiv.textContent = message;
  
  // Insert at the top of the form
  form.insertBefore(errorDiv, form.firstChild);
  
  // Remove after 3 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}

// Show confirmation message
function showConfirmation(expense) {
  // Clear the form
  form.innerHTML = '';
  
  // Create confirmation message
  const confirmationDiv = document.createElement('div');
  confirmationDiv.className = 'confirmation-message';
  confirmationDiv.innerHTML = `
    <h2 style="color: #27ae60; text-align: center; margin-bottom: 15px;">Expense Saved!</h2>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
      <p><strong>Platform:</strong> ${capitalizeFirstLetter(expense.platform)}</p>
      <p><strong>Amount:</strong> ₹${expense.amount.toFixed(2)}</p>
      <p><strong>Date:</strong> ${new Date(expense.date).toLocaleDateString('en-IN')}</p>
      ${expense.description ? `<p><strong>Description:</strong> ${expense.description}</p>` : ''}
    </div>
    <div style="text-align: center;">
      <button id="add-another" style="margin-right: 10px;">Add Another</button>
      <button id="close-window">Close</button>
    </div>
  `;
  
  // Add to form
  form.appendChild(confirmationDiv);
  
  // Add event listeners
  document.getElementById('add-another').addEventListener('click', () => {
    location.reload();
  });
  
  document.getElementById('close-window').addEventListener('click', () => {
    window.close();
  });
}

// Capitalize first letter helper
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 