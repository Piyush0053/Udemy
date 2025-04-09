# Expense Tracker Browser Extension

A browser extension to track and manage expenses on popular online shopping and food delivery platforms like Amazon, Flipkart, Swiggy, Zomato, and Zepto.

## Features

- **Automatic Expense Tracking**: Automatically detects and tracks expenses on supported platforms
- **Real-time Dashboard**: View your spending by platform with an intuitive dashboard
- **Budget Management**: Set and monitor budgets for each platform
- **Expense Reports**: Generate detailed reports of your spending habits
- **Spending Alerts**: Receive notifications when you approach or exceed budget limits

## Supported Platforms

- Amazon
- Flipkart
- Swiggy
- Zomato
- Zepto

## Installation

### Chrome / Edge

1. Download or clone this repository to your local machine
2. Open Chrome/Edge and navigate to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. The extension should now be installed and visible in your browser toolbar

### Firefox

1. Download or clone this repository to your local machine
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to the folder containing the extension files and select the `manifest.json` file
5. The extension should now be installed and visible in your browser toolbar

## Usage

### Tracking Expenses

1. Visit any supported shopping or food delivery website
2. Add items to your cart and proceed to checkout
3. The extension will automatically detect the expense and show a notification
4. Click "Track Expense" to save it to your dashboard

### Viewing Your Dashboard

1. Click on the extension icon in your browser toolbar
2. The popup will show your total expenses and breakdown by platform
3. You can view your recent expenses at the bottom of the popup

### Setting Budgets

1. Open the extension popup
2. Scroll to the "Budget Settings" section
3. Select a platform or "All Platforms"
4. Enter your monthly budget amount
5. Click "Save Budget"

### Generating Reports

1. Open the extension popup
2. Click the "Generate Report" button
3. A new tab will open with a detailed report of your expenses

## Customization

You can modify the following files to customize the extension:

- `manifest.json`: Extension configuration
- `popup.html` and `styles.css`: UI appearance
- `content.js`: Platform detection and expense tracking logic
- `popup.js`: Dashboard functionality
- `background.js`: Background processes and notifications

## Adding New Platforms

To add support for a new platform, edit the `SUPPORTED_PLATFORMS` object in `content.js` and add the necessary selectors and indicators for the new platform.

## Privacy

All your expense data is stored locally in your browser and is never sent to external servers.

## License

MIT License 