# Quick Start: Order Tracking Setup (5 Minutes)

## 🎯 Overview

Set up automated order tracking to Google Spreadsheets. Orders are saved automatically and Messenger still opens with prefilled message.

---

## 📝 Step-by-Step

### 1. Create Google Apps Script (2 min)

1. Go to [script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Open `docs/ORDER_TRACKING_SCRIPT.js` from this repo
4. Copy the entire code
5. Paste into Apps Script editor
6. Update line 18: Change `"your-email@gmail.com"` to your email
7. Click **File** → **Save**
8. Name project: "Order Tracking"

### 2. Deploy as Web App (1 min)

1. Click **Deploy** → **New deployment**
2. Click gear ⚙️ → Select **"Web app"**
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone** ⚠️
4. Click **Deploy**
5. **Authorize** when prompted (click "Advanced" → "Go to...")
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycbzHr4wEPOyrySaTfXyn-HsQkAxU3KxIpWpAFLuaI4FUfW5LKobqQyMkhQMWVazRpRdhKw/exec`)

### 3. Configure in Website Builder (1 min)

1. Open website in builder
2. Go to **"Integrations"** tab
3. Enable **"Facebook Messenger"** toggle
4. Enter **Facebook Page ID** (e.g., `mybusinesspage`)
5. Paste **Google Script URL** in "Google Spreadsheet Integration" field
6. Save

### 4. Test (30 sec)

1. Preview website
2. Add item to cart
3. Fill checkout form (name, location)
4. Click **"Checkout via Messenger"**
5. ✅ Messenger opens
6. ✅ Check Google Drive → **"Messenger/Excel Integration"** folder
7. ✅ Open spreadsheet → See your order!

---

## ✅ What You Get

- **Automatic Order Saving**: Every order saved to spreadsheet
- **One Spreadsheet Per Website**: Organized in Drive folder
- **Status Tracking**: Dropdown to track order progress
- **Messenger Integration**: Still opens with prefilled message
- **Free**: No paid services required

---

## 📊 Spreadsheet Columns

| Column | Description |
|--------|-------------|
| Order ID | Unique identifier |
| Date/Time | When order was placed |
| Customer Name | Customer's name |
| Location | Delivery/pickup location |
| Items | Summary of items |
| Item Details | Detailed breakdown |
| Total Amount | Order total |
| Note | Customer message |
| Status | Dropdown: Pending, Processing, Ready, etc. |

---

## 🔧 Status Options

Default statuses:
- **Pending** (new orders)
- **Processing**
- **Preparing**
- **Ready**
- **Out for Delivery**
- **Delivered**
- **Cancelled**

Update status by clicking the dropdown in the Status column.

---

## ❓ Troubleshooting

**Orders not appearing?**
- Check script URL is correct (ends with `/exec`)
- Verify "Who has access" is set to **"Anyone"**
- Check browser console for errors (F12)

**Folder not created?**
- Folder is created on first order
- Check you're logged into correct Google account

**Need help?**
- See full guide: `docs/ORDER_TRACKING_SETUP.md`
- Check browser console for error messages

---

## 🎉 Done!

Your order tracking is now set up. Every order will:
1. ✅ Save to Google Spreadsheet automatically
2. ✅ Open Messenger with prefilled message
3. ✅ Be trackable with status dropdown

Happy tracking! 📈

