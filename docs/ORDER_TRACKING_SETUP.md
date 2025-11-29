# Order Tracking Setup Guide - Google Spreadsheet Integration

This guide will walk you through setting up automated order tracking using Google Spreadsheets and Google Apps Script. Orders will be automatically saved to a spreadsheet organized by website in a Drive folder, and customers will still receive the Messenger prefilled message.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Create Google Apps Script](#step-1-create-google-apps-script)
4. [Step 2: Deploy as Web App](#step-2-deploy-as-web-app)
5. [Step 3: Configure in Website Builder](#step-3-configure-in-website-builder)
6. [Step 4: Test the Integration](#step-4-test-the-integration)
7. [Managing Orders](#managing-orders)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Configuration](#advanced-configuration)

---

## Overview

This integration allows your website to:
- ✅ Automatically save orders to Google Spreadsheet
- ✅ Organize orders by website in a Drive folder
- ✅ Track order status with dropdown menus
- ✅ Still send prefilled messages to Messenger
- ✅ Work completely free (no paid services required)
- ✅ Handle CORS automatically (works with React/Vite)

**How it works:**
1. Customer places order and clicks "Checkout via Messenger"
2. Order data is sent to Google Apps Script
3. Script saves order to spreadsheet (one per website)
4. Messenger opens with prefilled order message
5. Business can track orders in the spreadsheet with status dropdown

**Folder Structure:**
```
Google Drive
└── Messenger/Excel Integration/
    ├── Website 1 - Orders.xlsx
    ├── Website 2 - Orders.xlsx
    └── Website 3 - Orders.xlsx
```

---

## Prerequisites

- ✅ A Google account (Gmail or Google Workspace)
- ✅ Access to Google Apps Script (script.google.com)
- ✅ Your website deployed and accessible
- ✅ Facebook Messenger Page ID configured

---

## Step 1: Create Google Apps Script

1. **Go to Google Apps Script**
   - Visit [script.google.com](https://script.google.com)
   - Sign in with your Google account

2. **Create New Project**
   - Click **"New Project"** or the **"+"** button
   - A new project will open with a default function

3. **Copy the Script Code**
   - Open the file `docs/ORDER_TRACKING_SCRIPT.js` from this repository
   - Copy the entire contents

4. **Paste into Apps Script**
   - Delete the default `myFunction()` code
   - Paste the copied code into the editor

5. **Update Configuration**
   - Find the line: `const ADMIN_EMAIL = "your-email@gmail.com";`
   - Replace `"your-email@gmail.com"` with your actual email address
   - This email will receive error notifications if something goes wrong

6. **Save the Project**
   - Click **File** → **Save** (or press `Ctrl+S` / `Cmd+S`)
   - Name your project: "Order Tracking Script" (or any name you prefer)

---

## Step 2: Deploy as Web App

1. **Deploy the Script**
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **"Web app"**

2. **Configure Deployment Settings**
   - **Description**: "Order Tracking v1" (optional, for version tracking)
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone** ⚠️ (Important: This allows your website to call the script)
   - Click **Deploy**

3. **Authorize the Script**
   - You'll be prompted to authorize the script
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow** to grant permissions
   - The script needs access to:
     - Drive (to create folders and spreadsheets)
     - Spreadsheets (to write order data)

4. **Copy the Web App URL**
   - After deployment, you'll see a "Web app" URL
   - It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Copy this URL** - you'll need it in the next step
   - Click **Done**

---

## Step 3: Configure in Website Builder

1. **Open Your Website in Builder**
   - Navigate to your website in the builder
   - Go to the **"Integrations"** tab (or section)

2. **Enable Messenger Integration**
   - Find the **"Facebook Messenger"** section
   - Toggle the switch to **enabled**

3. **Enter Facebook Page ID**
   - In the **"Facebook Page ID"** field, enter your Page ID or username
   - Example: `mybusinesspage` or `123456789012345`

4. **Add Google Script URL**
   - In the **"Google Spreadsheet Integration"** field
   - Paste the Web App URL you copied in Step 2
   - Example: `https://script.google.com/macros/s/AKfycby.../exec`

5. **Save Configuration**
   - Click **Save** or the website will auto-save
   - The integration is now active!

---

## Step 4: Test the Integration

1. **Preview Your Website**
   - Open your website in preview mode
   - Navigate to the products section

2. **Place a Test Order**
   - Add items to cart
   - Click the cart icon
   - Fill in:
     - **Name**: Test Customer
     - **Location**: Test Address
     - **Message**: (optional)
   - Click **"Checkout via Messenger"**

3. **Verify Results**
   - ✅ Messenger should open with prefilled message
   - ✅ Check your Google Drive:
     - Go to [drive.google.com](https://drive.google.com)
     - Look for folder: **"Messenger/Excel Integration"**
     - Open the spreadsheet for your website
     - You should see the test order in the "Orders" sheet

4. **Check Order Details**
   - The spreadsheet should have columns:
     - Order ID
     - Date/Time
     - Customer Name
     - Location
     - Items
     - Item Details
     - Total Amount
     - Note
     - Status (with dropdown)

---

## Managing Orders

### Viewing Orders

1. **Access Spreadsheet**
   - Go to Google Drive
   - Navigate to **"Messenger/Excel Integration"**
   - Open your website's spreadsheet

2. **Order Information**
   - Each order appears as a new row
   - **Order ID**: Unique identifier (format: `ORD-1234567890-123`)
   - **Date/Time**: When the order was placed
   - **Items**: Summary of ordered items
   - **Item Details**: Detailed breakdown with quantities and prices

### Tracking Order Status

1. **Update Status**
   - Find the **"Status"** column (Column I)
   - Click on the status cell for an order
   - Select from dropdown:
     - **Pending** (default for new orders)
     - **Processing**
     - **Preparing**
     - **Ready**
     - **Out for Delivery**
     - **Delivered**
     - **Cancelled**

2. **Status Workflow**
   - New orders start as **"Pending"**
   - Update status as you process the order
   - Use **"Delivered"** when order is complete
   - Use **"Cancelled"** if order is cancelled

### Spreadsheet Features

- **Auto-formatting**: New orders are highlighted in yellow
- **Frozen Header**: Header row stays visible when scrolling
- **Alternating Rows**: Rows alternate colors for readability
- **Data Validation**: Status dropdown prevents invalid entries
- **Auto-resize**: Columns automatically adjust to content

---

## Troubleshooting

### Orders Not Appearing in Spreadsheet

**Problem**: Orders are placed but don't show up in the spreadsheet.

**Solutions**:
1. **Check Script URL**
   - Verify the URL in website configuration is correct
   - Make sure it ends with `/exec` (not `/dev`)
   - Try copying the URL again from Apps Script

2. **Check Script Permissions**
   - Go back to Apps Script
   - Click **Deploy** → **Manage deployments**
   - Ensure "Who has access" is set to **"Anyone"**

3. **Check Browser Console**
   - Open browser Developer Tools (F12)
   - Go to Console tab
   - Look for error messages
   - Common errors:
     - `CORS error`: Script deployment issue
     - `404 Not Found`: Incorrect URL
     - `403 Forbidden`: Permission issue

4. **Test Script Manually**
   - In Apps Script, go to **Run** → **testSetup**
   - Check execution log for errors
   - This creates a test order in your spreadsheet

### Folder Not Created

**Problem**: The "Messenger/Excel Integration" folder doesn't exist.

**Solution**:
- The folder is created automatically on first order
- If it doesn't appear, check:
  - Script has Drive permissions
  - You're looking in the correct Google account
  - Try placing a test order

### Spreadsheet Not Created for Website

**Problem**: Folder exists but no spreadsheet for your website.

**Solution**:
- Spreadsheet is created on first order
- Name format: `{Website Title} - Orders`
- Check if you have multiple spreadsheets with similar names
- The script uses `websiteId` (from website configuration) to identify websites

### Status Dropdown Not Working

**Problem**: Can't select status from dropdown.

**Solution**:
- Ensure you're clicking in the "Status" column (Column I)
- Try refreshing the spreadsheet
- Check if data validation is applied (should see dropdown arrow)
- Manually reapply validation if needed (see Advanced Configuration)

### Messenger Not Opening

**Problem**: Messenger doesn't open when clicking checkout.

**Solution**:
- Check Facebook Page ID is correct
- Verify Page ID format (username or numeric ID)
- Test the m.me link manually: `https://m.me/{yourPageId}`
- Ensure pop-ups aren't blocked in browser

---

## Advanced Configuration

### Customizing Order Status Options

To change the available status options:

1. **Open Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Open your Order Tracking Script project

2. **Find Status Options**
   - Look for: `const ORDER_STATUS_OPTIONS = [...]`
   - Currently set to:
     ```javascript
     ["Pending", "Processing", "Preparing", "Ready", "Out for Delivery", "Delivered", "Cancelled"]
     ```

3. **Modify Options**
   - Add, remove, or change status options
   - Example:
     ```javascript
     const ORDER_STATUS_OPTIONS = [
       "New", 
       "Confirmed", 
       "In Progress", 
       "Ready for Pickup", 
       "Shipped", 
       "Completed", 
       "Refunded"
     ];
     ```

4. **Redeploy**
   - Click **Deploy** → **Manage deployments**
   - Click **Edit** (pencil icon)
   - Update version description
   - Click **Deploy**
   - New orders will use updated status options

### Changing Drive Folder Name

To use a different folder name:

1. **Open Apps Script**
2. **Find Folder Name**
   - Look for: `const DRIVE_FOLDER_NAME = "Messenger/Excel Integration";`
3. **Change to Your Preference**
   - Example: `const DRIVE_FOLDER_NAME = "Orders";`
   - Or: `const DRIVE_FOLDER_NAME = "E-commerce/Orders";`
4. **Redeploy** (same steps as above)

### Customizing Spreadsheet Columns

To add or modify columns:

1. **Open Apps Script**
2. **Find Headers Section**
   - Look for the `getOrCreateOrdersSheet` function
   - Find: `const headers = [...]`
3. **Modify Headers**
   - Add new column names
   - Example: Add "Phone Number" column
4. **Update Row Data**
   - Find `addOrderToSheet` function
   - Update `rowData` array to include new column values
5. **Redeploy**

### Email Notifications (Optional)

To receive email notifications for new orders:

1. **Open Apps Script**
2. **Add Email Function**
   - In `addOrderToSheet` function, add:
   ```javascript
   // Send email notification
   MailApp.sendEmail({
     to: ADMIN_EMAIL,
     subject: `New Order: ${orderId}`,
     body: `A new order has been received:\n\n${JSON.stringify(orderData, null, 2)}`
   });
   ```
3. **Redeploy**

**Note**: Email notifications may slow down order processing. Use sparingly.

### Multiple Websites with Same Script

The script automatically handles multiple websites:
- Each website gets its own spreadsheet
- Spreadsheets are identified by `websiteId` (from website configuration)
- All spreadsheets are in the same Drive folder
- No additional configuration needed

---

## Security Considerations

### Script URL Security

- ⚠️ The Web App URL is public (anyone with the URL can call it)
- ✅ The script validates incoming data
- ✅ Only processes valid order data
- ✅ Errors are logged but not exposed

### Data Privacy

- Orders are stored in your Google Drive
- Only you (and those with Drive access) can view orders
- Consider sharing the folder with team members if needed
- Don't share the script URL publicly

### Best Practices

1. **Regular Backups**
   - Google Sheets auto-saves, but consider:
     - Exporting spreadsheets periodically
     - Setting up Google Drive backups

2. **Access Control**
   - Share the Drive folder only with trusted team members
   - Use Google Workspace for better access controls

3. **Monitoring**
   - Check spreadsheet regularly for orders
   - Set up email notifications if needed (see Advanced Configuration)

---

## FAQ

**Q: Can I use the same script for multiple websites?**  
A: Yes! The script automatically creates separate spreadsheets for each website based on the `websiteId`.

**Q: What happens if the script fails?**  
A: The order will still open Messenger (that happens independently). The spreadsheet save might fail, but you'll receive an error email if configured.

**Q: Can I change the currency format?**  
A: Yes, edit the `formatCurrency` function in the script. Currently set to Philippine Peso (₱).

**Q: How do I delete old orders?**  
A: Simply delete rows from the spreadsheet. The script only adds new rows, it doesn't delete anything.

**Q: Can I export orders to another system?**  
A: Yes, you can export the spreadsheet as CSV/Excel and import into other systems. Or use Google Sheets API for automation.

**Q: What if I want to track more order details?**  
A: See "Customizing Spreadsheet Columns" in Advanced Configuration section.

**Q: Does this work offline?**  
A: No, it requires an internet connection to save to Google Sheets. Messenger will still open, but the spreadsheet save will fail.

**Q: Is there a limit on orders?**  
A: Google Sheets can handle millions of rows. The script is designed to handle high volume.

---

## Support

If you encounter issues:

1. Check the Troubleshooting section above
2. Review browser console for errors
3. Test the script manually using `testSetup` function
4. Verify all configuration steps were completed
5. Check that script permissions are correct

---

## Next Steps

After setup:
1. ✅ Test with a real order
2. ✅ Verify order appears in spreadsheet
3. ✅ Test status dropdown
4. ✅ Share folder with team (if needed)
5. ✅ Set up regular order review process

Happy tracking! 🎉

