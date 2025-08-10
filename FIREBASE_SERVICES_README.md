# Firebase Services Upload Guide

## Overview
This guide explains how to upload your services data to Firebase Firestore and how the GP linking system works.

## What Was Fixed

### 1. Dynamic Service Component Updates
- **Fixed URL to Firebase Name Conversion**: The component now properly converts URL parameters (like `gp-canary-wharf`) to Firebase document names (like `GP Canary Wharf`)
- **Added Fallback to Service Collection**: If a service isn't found in the 'products' collection, it will automatically try the 'service' collection
- **Improved Price Formatting**: Prices now display correctly as £49.00 format and handle "Free" and "Contact for price" cases

### 2. Firebase Service Updates
- **Added Service Collection Method**: New `getServiceById()` method to fetch from the 'service' collection
- **Made Firestore Public**: Firestore instance is now accessible for advanced queries

### 3. Service Name Mappings Added
The component now correctly maps these URL formats to Firebase document names:

**GP Services:**
- `gp-canary-wharf` → `GP Canary Wharf`
- `gp-islington` → `GP Islington`
- `gp-ken-chel` → `GP Ken & Chel`
- And all other GP locations...

**Other Services:**
- `allergies-intolerances` → `Allergies & Intolerances`
- `mri-ct-scans` → `MRI & CT Scans`
- `sexual-health` → `General STI Screening`
- And many more...

## How to Upload Services to Firebase

### Step 1: Configure Firebase
1. Open `upload-services.js`
2. Replace the `firebaseConfig` object with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

### Step 2: Run the Upload Script
```bash
node upload-services.js
```

This will create documents in the `service` collection with the exact names from your data:
- `Cholesterol`
- `GP Canary Wharf`
- `Allergies & Intolerances`
- etc.

### Step 3: Verify Upload
Check your Firebase Console under Firestore Database > service collection to confirm all documents were created.

## How the GP Linking Works

### URL Structure
Your application uses URLs like:
- `/service/gp-canary-wharf`
- `/service/gp-islington`
- `/service/cholesterol`

### Conversion Process
1. **URL Parameter**: `gp-canary-wharf`
2. **Conversion**: Uses `convertUrlToFirebaseName()` method
3. **Firebase Document**: `GP Canary Wharf`
4. **Data Retrieval**: Fetches from Firestore using exact document name

### Search Priority
1. First tries `products` collection
2. If not found, tries `service` collection
3. Converts Firebase data to match component's expected format
4. Displays service information

## Data Structure in Firebase

Each service document contains:
```javascript
{
  description: "Book a GP appointment in Canary Wharf",
  price: "£75.00",
  delivery: ["In Clinic"]
}
```

## Testing the Fix

### Test URLs to Try:
- `/service/gp-canary-wharf`
- `/service/gp-islington`
- `/service/cholesterol`
- `/service/allergies-intolerances`

### What Should Work:
- ✅ Correct service name display
- ✅ Proper price formatting (£75.00)
- ✅ Delivery options (At Home, In Clinic, Online)
- ✅ Service descriptions
- ✅ Booking functionality

## Troubleshooting

### Service Not Found Error:
1. Check Firebase Console - ensure document exists with exact name
2. Verify URL mapping in `convertUrlToFirebaseName()` method
3. Check browser console for detailed error messages

### Price Display Issues:
- Prices should show as £75.00, Free, or Contact for price
- Check `getFormattedPrice()` method for custom formatting

### Delivery Options Not Showing:
- Ensure `delivery` field is an array in Firebase
- Check `processDeliveryOptions()` method

## Need to Add New Services?

1. Add the service to the `services` array in `upload-services.js`
2. Run the upload script again
3. Add URL mapping in `convertUrlToFirebaseName()` if needed

## Firebase Security Rules

Make sure your Firestore rules allow reading from the service collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /service/{document} {
      allow read: if true;
    }
  }
}
```

The GP linking should now work perfectly with your Firebase data structure! 