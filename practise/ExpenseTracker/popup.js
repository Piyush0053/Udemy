// Initialize variables
let expenses = [];
let budgets = {};
let platforms = ['amazon', 'flipkart', 'swiggy', 'zomato', 'zepto'];
let isLoading = true;
let debugMode = true;

// Debug log function
function debugLog(...args) {
  if (debugMode) {
    console.log('[Expense Tracker Popup]', ...args);
  }
}

// DOM elements
const totalAmountElement = document.getElementById('total-amount');
const platformStatsElement = document.getElementById('platform-stats');
const expenseListElement = document.getElementById('expense-list');
const budgetForm = document.getElementById('budget-form');
const platformSelect = document.getElementById('platform-select');
const budgetAmountInput = document.getElementById('budget-amount');
const generateReportButton = document.getElementById('generate-report');
const clearDataButton = document.getElementById('clear-data');
const addCustomExpenseButton = document.getElementById('add-custom-expense');

// Load data when popup opens
document.addEventListener('DOMContentLoaded', () => {
  debugLog('Popup opened, loading data');
  
  // Show loading state
  showLoadingState();
  
  // Add other platforms that might be in expenses but not in our predefined list
  loadOtherPlatforms();
  
  // Load expense and budget data
  loadData();
  
  // Set up event listeners
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  budgetForm.addEventListener('submit', saveBudget);
  generateReportButton.addEventListener('click', generateReport);
  clearDataButton.addEventListener('click', clearAllData);
  addCustomExpenseButton.addEventListener('click', openCustomExpenseForm);
  
  // Setup debug toggle
  const debugToggle = document.getElementById('debug-toggle');
  if (debugToggle) {
    // Check if debug mode is enabled
    chrome.storage.local.get(['debugMode'], (result) => {
      debugMode = result.debugMode !== undefined ? result.debugMode : true;
      updateDebugDisplay();
      
      // Add click listener
      debugToggle.addEventListener('click', toggleDebugMode);
    });
  }
  
  // Add real-time updates with storage listener
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace !== 'local') return;
    
    let needsUpdate = false;
    
    if (changes.expenses) {
      debugLog('Expenses changed externally');
      expenses = changes.expenses.newValue || [];
      needsUpdate = true;
    }
    
    if (changes.budgets) {
      debugLog('Budgets changed externally');
      budgets = changes.budgets.newValue || {};
      needsUpdate = true;
    }
    
    if (needsUpdate && !isLoading) {
      debugLog('Updating UI due to external changes');
      updateUI();
    }
  });
}

// Toggle debug mode
function toggleDebugMode() {
  debugMode = !debugMode;
  chrome.storage.local.set({ debugMode }, () => {
    updateDebugDisplay();
    debugLog('Debug mode ' + (debugMode ? 'enabled' : 'disabled'));
  });
}

// Update debug display
function updateDebugDisplay() {
  const debugToggle = document.getElementById('debug-toggle');
  if (debugToggle) {
    debugToggle.style.opacity = debugMode ? '0.8' : '0.3';
    debugToggle.textContent = debugMode ? 'Debug ON' : 'Debug OFF';
  }
}

// Show loading state
function showLoadingState() {
  isLoading = true;
  
  // Add loading indicators
  platformStatsElement.innerHTML = '<p>Loading platform data...</p>';
  expenseListElement.innerHTML = '<p>Loading expenses...</p>';
}

// Load other platforms from existing expenses
function loadOtherPlatforms() {
  chrome.storage.local.get(['expenses'], (result) => {
    if (chrome.runtime.lastError) {
      debugLog('Error loading platforms:', chrome.runtime.lastError);
      return;
    }
    
    const expenses = result.expenses || [];
    if (!Array.isArray(expenses)) {
      debugLog('Expenses data is not an array:', expenses);
      return;
    }
    
    // Extract all unique platforms
    const uniquePlatforms = new Set();
    expenses.forEach(expense => {
      if (expense && expense.platform) {
        uniquePlatforms.add(expense.platform);
      }
    });
    
    // Add any new platforms to our list and to the dropdown
    uniquePlatforms.forEach(platform => {
      if (!platforms.includes(platform)) {
        platforms.push(platform);
        debugLog('Added platform from expenses:', platform);
        
        // Add to dropdown
        const option = document.createElement('option');
        option.value = platform;
        option.textContent = capitalizeFirstLetter(platform);
        platformSelect.appendChild(option);
      }
    });
  });
}

// Open custom expense form
function openCustomExpenseForm() {
  chrome.tabs.create({
    url: 'custom_expense.html'
  });
}

// Load data from storage
function loadData() {
  chrome.storage.local.get(['expenses', 'budgets'], (result) => {
    if (chrome.runtime.lastError) {
      debugLog('Error loading data:', chrome.runtime.lastError);
      showAlert('Error loading expense data. Please try again.', 'danger');
      isLoading = false;
      return;
    }
    
    // Load expenses
    if (result.expenses) {
      if (Array.isArray(result.expenses)) {
        expenses = result.expenses;
        debugLog('Loaded expenses:', expenses.length);
      } else {
        debugLog('Expenses data is not an array, resetting');
        expenses = [];
        
        // Try to fix corrupted data
        chrome.storage.local.set({ expenses: [] });
      }
    } else {
      debugLog('No expenses found, initializing empty array');
      expenses = [];
      
      // Initialize expenses array in storage
      chrome.storage.local.set({ expenses: [] });
    }
    
    // Load budgets
    if (result.budgets) {
      if (typeof result.budgets === 'object') {
        budgets = result.budgets;
        debugLog('Loaded budgets:', Object.keys(budgets).length);
      } else {
        debugLog('Budgets data is not an object, resetting');
        budgets = {};
        
        // Try to fix corrupted data
        chrome.storage.local.set({ budgets: {} });
      }
    } else {
      debugLog('No budgets found, initializing empty object');
      budgets = {};
      
      // Initialize budgets object in storage
      chrome.storage.local.set({ budgets: {} });
    }
    
    // Update UI with loaded data
    isLoading = false;
    updateUI();
  });
}

// Update the UI with the latest data
function updateUI() {
  if (isLoading) return;
  
  debugLog('Updating UI with current data');
  updateTotalAmount();
  updatePlatformStats();
  updateExpenseList();
}

// Update the total amount spent
function updateTotalAmount() {
  if (!Array.isArray(expenses)) {
    debugLog('Expenses is not an array when updating total');
    totalAmountElement.textContent = formatCurrency(0);
    return;
  }
  
  const total = expenses.reduce((sum, expense) => {
    // Check for valid expense object with amount
    if (expense && typeof expense.amount === 'number') {
      return sum + expense.amount;
    }
    return sum;
  }, 0);
  
  totalAmountElement.textContent = formatCurrency(total);
  debugLog('Updated total amount:', total);
}

// Update platform statistics
function updatePlatformStats() {
  platformStatsElement.innerHTML = '';
  
  if (!Array.isArray(expenses) || expenses.length === 0) {
    platformStatsElement.innerHTML = '<p>No expenses recorded yet.</p>';
    debugLog('No expenses to show in platform stats');
    return;
  }
  
  // Group expenses by platform
  const platformExpenses = {};
  platforms.forEach(platform => {
    platformExpenses[platform] = expenses
      .filter(expense => expense && expense.platform === platform)
      .reduce((sum, expense) => sum + (expense.amount || 0), 0);
  });
  
  // Create platform stat elements for platforms with expenses
  let anyPlatformShown = false;
  
  platforms.forEach(platform => {
    const amount = platformExpenses[platform] || 0;
    const budget = budgets[platform] || 0;
    
    // Skip if no expenses for this platform
    if (amount === 0) return;
    
    anyPlatformShown = true;
    const platformElement = document.createElement('div');
    platformElement.className = 'platform-item';
    
    const isOverBudget = budget > 0 && amount > budget;
    const percentage = budget > 0 ? Math.min((amount / budget) * 100, 100) : 0;
    
    platformElement.innerHTML = `
      <div>
        <div class="platform-name">${capitalizeFirstLetter(platform)}</div>
        <div class="platform-stats">
          <span>${formatCurrency(amount)}</span>
          ${budget > 0 ? `/ <span>${formatCurrency(budget)}</span>` : ''}
        </div>
        ${budget > 0 ? `
          <div class="progress-bar ${isOverBudget ? 'over-budget' : ''}">
            <div class="progress-fill" style="width: ${percentage}%"></div>
          </div>
        ` : ''}
      </div>
    `;
    
    platformStatsElement.appendChild(platformElement);
  });
  
  // Show message if no platform has expenses
  if (!anyPlatformShown) {
    platformStatsElement.innerHTML = '<p>No expenses recorded yet.</p>';
  }
  
  debugLog('Updated platform stats');
}

// Update the expense list
function updateExpenseList() {
  expenseListElement.innerHTML = '';
  
  if (!Array.isArray(expenses) || expenses.length === 0) {
    expenseListElement.innerHTML = '<p>No expenses recorded yet.</p>';
    debugLog('No expenses to show in expense list');
    return;
  }
  
  // Sort expenses by date (most recent first)
  const sortedExpenses = [...expenses].sort((a, b) => {
    // Handle invalid or missing date values
    const dateA = a && a.date ? a.date : 0;
    const dateB = b && b.date ? b.date : 0;
    return dateB - dateA;
  });
  
  // Only show the 10 most recent expenses
  const recentExpenses = sortedExpenses.slice(0, 10);
  debugLog('Showing recent expenses:', recentExpenses.length);
  
  recentExpenses.forEach(expense => {
    if (!expense || typeof expense !== 'object') {
      debugLog('Invalid expense object:', expense);
      return;
    }
    
    const expenseElement = document.createElement('div');
    expenseElement.className = 'expense-item';
    
    // Ensure date is valid
    let formattedDate = 'Unknown date';
    if (expense.date) {
      const date = new Date(expense.date);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toLocaleDateString('en-IN');
      }
    }
    
    // Ensure platform name is valid
    const platform = expense.platform || 'unknown';
    
    // Ensure amount is valid
    const amount = typeof expense.amount === 'number' ? expense.amount : 0;
    
    expenseElement.innerHTML = `
      <div class="expense-header">
        <span class="expense-platform">${capitalizeFirstLetter(platform)}</span>
        <span class="expense-date">${formattedDate}</span>
      </div>
      <div class="expense-amount">${formatCurrency(amount)}</div>
      ${expense.description ? `<div class="expense-description">${expense.description}</div>` : ''}
    `;
    
    expenseListElement.appendChild(expenseElement);
  });
  
  // Add a "View All" button if there are more than 10 expenses
  if (expenses.length > 10) {
    const viewAllElement = document.createElement('div');
    viewAllElement.className = 'view-all-expenses';
    viewAllElement.innerHTML = `
      <button id="view-all-expenses">View All ${expenses.length} Expenses</button>
    `;
    expenseListElement.appendChild(viewAllElement);
    
    // Add event listener for View All button
    document.getElementById('view-all-expenses').addEventListener('click', () => {
      generateFullExpenseReport();
    });
  }
}

// Generate a full expense report
function generateFullExpenseReport() {
  debugLog('Generating full expense report');
  
  if (!Array.isArray(expenses) || expenses.length === 0) {
    showAlert('No expenses to show in report.', 'warning');
    return;
  }
  
  // Sort expenses by date (most recent first)
  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = a && a.date ? a.date : 0;
    const dateB = b && b.date ? b.date : 0;
    return dateB - dateA;
  });
  
  // Create report HTML
  let reportHTML = `
    <html>
    <head>
      <title>Expense Tracker - All Expenses</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #2c3e50; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; }
        .total { font-weight: bold; }
        .platform-filter { margin-bottom: 20px; }
        .platform-filter select { padding: 5px; margin-right: 10px; }
        .platform-filter button { padding: 5px 10px; background-color: #3498db; color: white; border: none; cursor: pointer; }
        .expense-date { color: #7f8c8d; }
        .expense-amount { font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>All Expenses</h1>
      <div class="platform-filter">
        <select id="platform-filter">
          <option value="all">All Platforms</option>
          ${platforms.map(p => `<option value="${p}">${capitalizeFirstLetter(p)}</option>`).join('')}
        </select>
        <button id="apply-filter">Filter</button>
      </div>
      <table id="expenses-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Platform</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  sortedExpenses.forEach(expense => {
    if (!expense || typeof expense !== 'object') return;
    
    let formattedDate = 'Unknown date';
    if (expense.date) {
      const date = new Date(expense.date);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toLocaleDateString('en-IN');
      }
    }
    
    const platform = expense.platform || 'unknown';
    const amount = typeof expense.amount === 'number' ? expense.amount : 0;
    const description = expense.description || '';
    
    reportHTML += `
      <tr data-platform="${platform}">
        <td class="expense-date">${formattedDate}</td>
        <td>${capitalizeFirstLetter(platform)}</td>
        <td class="expense-amount">${formatCurrency(amount)}</td>
        <td>${description}</td>
      </tr>
    `;
  });
  
  const total = expenses.reduce((sum, expense) => {
    if (expense && typeof expense.amount === 'number') {
      return sum + expense.amount;
    }
    return sum;
  }, 0);
  
  reportHTML += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="total">Total</td>
            <td class="total" id="total-amount">${formatCurrency(total)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      
      <script>
        document.getElementById('apply-filter').addEventListener('click', function() {
          const platform = document.getElementById('platform-filter').value;
          const rows = document.querySelectorAll('#expenses-table tbody tr');
          let filteredTotal = 0;
          
          rows.forEach(row => {
            const rowPlatform = row.getAttribute('data-platform');
            const amountText = row.querySelector('.expense-amount').textContent;
            const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
            
            if (platform === 'all' || rowPlatform === platform) {
              row.style.display = '';
              if (!isNaN(amount)) {
                filteredTotal += amount;
              }
            } else {
              row.style.display = 'none';
            }
          });
          
          document.getElementById('total-amount').textContent = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
          }).format(filteredTotal);
        });
      </script>
    </body>
    </html>
  `;
  
  // Open report in new tab
  const blob = new Blob([reportHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  chrome.tabs.create({ url });
}

// Save budget
function saveBudget(event) {
  event.preventDefault();
  debugLog('Saving budget');
  
  const platform = platformSelect.value;
  const amount = parseFloat(budgetAmountInput.value);
  
  if (isNaN(amount) || amount < 0) {
    showAlert('Please enter a valid budget amount.', 'danger');
    return;
  }
  
  if (platform === 'all') {
    // Set the same budget for all platforms
    platforms.forEach(p => {
      budgets[p] = amount;
    });
  } else {
    // Set budget for specific platform
    budgets[platform] = amount;
  }
  
  // Save to storage
  chrome.storage.local.set({ budgets }, () => {
    if (chrome.runtime.lastError) {
      debugLog('Error saving budget:', chrome.runtime.lastError);
      showAlert('Error saving budget. Please try again.', 'danger');
      return;
    }
    
    debugLog('Budget saved successfully');
    showAlert('Budget saved successfully!', 'success');
    updatePlatformStats();
  });
}

// Generate report
function generateReport() {
  debugLog('Generating monthly report');
  
  if (!Array.isArray(expenses) || expenses.length === 0) {
    showAlert('No expenses to show in report.', 'warning');
    return;
  }
  
  // Group expenses by platform and month
  const monthlyExpenses = {};
  
  expenses.forEach(expense => {
    if (!expense || typeof expense !== 'object' || !expense.date) return;
    
    const date = new Date(expense.date);
    if (isNaN(date.getTime())) return;
    
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month}`;
    
    if (!monthlyExpenses[key]) {
      monthlyExpenses[key] = {
        month: getMonthName(month),
        year: year,
        platforms: {}
      };
      
      platforms.forEach(p => {
        monthlyExpenses[key].platforms[p] = 0;
      });
    }
    
    if (expense.platform && typeof expense.amount === 'number') {
      monthlyExpenses[key].platforms[expense.platform] = 
        (monthlyExpenses[key].platforms[expense.platform] || 0) + expense.amount;
    }
  });
  
  // Create report HTML
  let reportHTML = `
    <html>
    <head>
      <title>Expense Tracker Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #2c3e50; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; }
        .total { font-weight: bold; }
        .chart-container { margin-top: 40px; margin-bottom: 40px; }
        .platform-label { display: inline-block; margin-right: 15px; padding: 5px; border-radius: 3px; color: white; }
      </style>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body>
      <h1>Expense Tracker Report</h1>
      <h2>Monthly Expenses</h2>
      
      <div class="chart-container">
        <canvas id="expenseChart"></canvas>
      </div>
      
      <table>
        <tr>
          <th>Month</th>
          ${platforms.map(p => `<th>${capitalizeFirstLetter(p)}</th>`).join('')}
          <th>Total</th>
        </tr>
  `;
  
  // Sort keys by year and month
  const sortedKeys = Object.keys(monthlyExpenses).sort().reverse();
  
  // For chart data
  const chartLabels = [];
  const chartData = {};
  const chartColors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', 
    '#1abc9c', '#d35400', '#34495e', '#16a085', '#c0392b'
  ];
  
  platforms.forEach((platform, index) => {
    chartData[platform] = [];
  });
  
  sortedKeys.forEach(key => {
    const data = monthlyExpenses[key];
    const total = platforms.reduce((sum, p) => sum + (data.platforms[p] || 0), 0);
    
    reportHTML += `
      <tr>
        <td>${data.month} ${data.year}</td>
        ${platforms.map(p => `<td>${formatCurrency(data.platforms[p] || 0)}</td>`).join('')}
        <td class="total">${formatCurrency(total)}</td>
      </tr>
    `;
    
    // Add data for chart
    chartLabels.unshift(`${data.month} ${data.year}`);
    platforms.forEach(platform => {
      chartData[platform].unshift(data.platforms[platform] || 0);
    });
  });
  
  // Complete the HTML with chart script
  reportHTML += `
      </table>
      
      <h2>Platform Distribution</h2>
      <div>
        ${platforms.map((p, i) => `
          <div class="platform-label" style="background-color: ${chartColors[i % chartColors.length]}">
            ${capitalizeFirstLetter(p)}
          </div>
        `).join('')}
      </div>
      
      <script>
        const ctx = document.getElementById('expenseChart').getContext('2d');
        const expenseChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ${JSON.stringify(chartLabels)},
            datasets: [
              ${platforms.map((p, i) => `{
                label: '${capitalizeFirstLetter(p)}',
                data: ${JSON.stringify(chartData[p])},
                backgroundColor: '${chartColors[i % chartColors.length]}',
                borderColor: '${chartColors[i % chartColors.length]}',
                borderWidth: 1
              }`).join(',')}
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true
              }
            }
          }
        });
      </script>
    </body>
    </html>
  `;
  
  // Open report in new tab
  const blob = new Blob([reportHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  chrome.tabs.create({ url });
}

// Clear all data
function clearAllData() {
  if (confirm('Are you sure you want to clear all expense data? This action cannot be undone.')) {
    debugLog('Clearing all data');
    
    chrome.storage.local.set({ expenses: [], budgets: {} }, () => {
      if (chrome.runtime.lastError) {
        debugLog('Error clearing data:', chrome.runtime.lastError);
        showAlert('Error clearing data. Please try again.', 'danger');
        return;
      }
      
      expenses = [];
      budgets = {};
      updateUI();
      showAlert('All data has been cleared.', 'success');
    });
  }
}

// Show alert message
function showAlert(message, type = 'success') {
  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type}`;
  alertElement.textContent = message;
  
  // Insert at the top of the container
  const container = document.querySelector('.container');
  
  // Remove any existing alerts
  const existingAlerts = document.querySelectorAll('.alert');
  existingAlerts.forEach(alert => alert.remove());
  
  container.insertBefore(alertElement, container.firstChild);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (alertElement.parentNode) {
      alertElement.remove();
    }
  }, 3000);
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get month name
function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}

// Export expenses as JSON
function exportExpenses() {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    showAlert('No expenses to export.', 'warning');
    return;
  }
  
  const dataStr = JSON.stringify({ expenses, budgets }, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileName = `expense_tracker_export_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileName);
  linkElement.click();
} 