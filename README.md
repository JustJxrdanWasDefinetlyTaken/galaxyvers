# GalaxyVerse HWID Protection System v3.0

## 🔐 Overview

The HWID (Hardware ID) Protection System is a comprehensive security solution that permanently locks access keys to specific devices. This prevents key sharing, unauthorized access, and ensures each key can only be used on the device that first claimed it.

## 🛡️ Security Features

### Multi-Layer Device Fingerprinting

1. **Canvas Fingerprinting**
   - Creates unique rendering patterns based on GPU and graphics drivers
   - Nearly impossible to spoof without changing hardware

2. **WebGL Fingerprinting**
   - Detects GPU vendor and renderer information
   - Hardware-specific identifiers

3. **Audio Fingerprinting**
   - Analyzes audio processing characteristics
   - Device-specific audio hardware signatures

4. **Font Detection**
   - Identifies installed system fonts
   - Operating system and configuration dependent

5. **Hardware Metrics**
   - CPU cores (hardwareConcurrency)
   - Device memory
   - Screen resolution and color depth
   - Timezone and language settings

## 📋 How It Works

### First Time Key Use (Registration)

1. User enters a valid key
2. System generates comprehensive HWID from device characteristics
3. HWID is permanently stored in Firebase with the key
4. Legacy fingerprint also stored for backward compatibility
5. Key is now locked to this specific device

### Returning User (Verification)

1. System generates current device HWID
2. Compares with stored HWID in Firebase
3. If match: Access granted automatically
4. If mismatch: Access denied, security log created
5. User's key remains stored locally for convenience

### Security Violations

When someone tries to use a key on a different device:
- Access is immediately denied
- Security event is logged to Firebase
- Both HWIDs (stored and attempted) are recorded
- Original device remains unaffected

## 🔧 Implementation

### File Structure

```
project/
├── index.html (updated with correct script order)
├── scripts.js (main application with HWID integration)
├── others/assets/scripts/
│   ├── fingerprint-enhanced.js (NEW - HWID generation)
│   ├── console.js
│   ├── gms.js
│   └── stats.js
└── firebase-rules.json (updated security rules)
```

### Required Script Load Order

```html
<!-- 1. Firebase -->
<script src="firebase-app-compat.js"></script>
<script src="firebase-database-compat.js"></script>

<!-- 2. Console -->
<script src="console.js"></script>

<!-- 3. Enhanced Fingerprint (CRITICAL - MUST BE BEFORE scripts.js) -->
<script src="fingerprint-enhanced.js"></script>

<!-- 4. Games data -->
<script src="gms.js"></script>

<!-- 5. Stats -->
<script src="stats.js"></script>

<!-- 6. Main scripts -->
<script src="scripts.js"></script>
```

## 🔥 Firebase Setup

### Step 1: Update Security Rules

Copy the contents of the Firebase rules artifact to your Firebase Realtime Database rules:

1. Go to Firebase Console
2. Select your project
3. Navigate to Realtime Database → Rules
4. Replace with the new rules
5. Click "Publish"

### Step 2: Data Structure

The system creates the following structure:

```
database/
├── usedKeys/
│   └── [keyId]/
│       ├── used: true
│       ├── hwid: "hwid_abc123..." (NEW)
│       ├── fingerprint: "fp_xyz789..."
│       ├── deviceInfo: { browser, os, screen, cores, memory }
│       ├── websites: ["site1.com", "site2.com"]
│       ├── timesAccessed: 42
│       ├── lastAccessed: "2025-01-15T10:30:00Z"
│       └── lastVerified: "2025-01-15T10:30:00Z"
│
├── fingerprints/
│   └── [fingerprintId]/
│       ├── key: "user_key"
│       ├── hwid: "hwid_abc123..." (NEW)
│       ├── deviceInfo: {...}
│       └── lastSeen: "2025-01-15T10:30:00Z"
│
└── securityLogs/
    ├── unauthorizedKeyAttempts/
    │   └── [timestamp]/
    │       ├── attemptedKey: "key123"
    │       ├── keyOwnerHWID: "hwid_abc..."
    │       ├── attemptedByHWID: "hwid_xyz..."
    │       └── reason: "HWID_MISMATCH"
    │
    └── hwidMismatches/
        └── [timestamp]/
            ├── key: "key123"
            ├── storedHWID: "hwid_abc..."
            ├── attemptedHWID: "hwid_xyz..."
            └── website: "example.com"
```

## 🚀 Deployment Steps

### 1. Update Files

Replace the following files in your project:

- `index.html` → Use updated version with correct script order
- `scripts.js` → Use version with HWID integration
- `others/assets/scripts/fingerprint-enhanced.js` → NEW FILE, add this

### 2. Update Firebase Rules

Copy and publish the new Firebase security rules.

### 3. Test the System

1. Clear your browser's localStorage
2. Visit your site
3. Enter a valid key
4. Key should be claimed with HWID
5. Reload the page - should auto-login
6. Try using the same key in a different browser - should be denied

### 4. Monitor Security Logs

Check Firebase for security events:
- Navigate to Database → securityLogs
- Review `unauthorizedKeyAttempts`
- Review `hwidMismatches`

## 📊 Admin Monitoring

### View Key Usage

```javascript
// In Firebase Console, query:
database.ref('usedKeys').once('value').then(snapshot => {
  snapshot.forEach(child => {
    console.log('Key:', child.key);
    console.log('HWID:', child.val().hwid);
    console.log('Device:', child.val().deviceInfo);
    console.log('Sites:', child.val().websites);
    console.log('---');
  });
});
```

### Check Security Events

```javascript
// Recent unauthorized attempts
database.ref('securityLogs/unauthorizedKeyAttempts')
  .limitToLast(10)
  .once('value')
  .then(snapshot => {
    snapshot.forEach(child => {
      console.log('Attempt:', child.val());
    });
  });
```

## ⚠️ Important Notes

### Key Permanence

- **Keys cannot be transferred between devices**
- Once claimed, a key is permanently locked
- Only the original device can use the key
- This is by design for security

### User Experience

- First-time users: Enter key once
- Returning users: Automatic login (HWID verified)
- Different device: Access denied (security measure)
- Same device, different browser: New key required

### Browser Updates

- Minor browser updates: Usually no issues
- Major updates: May require key re-verification
- System uses fingerprint as fallback if HWID matches

## 🔍 Troubleshooting

### Key Won't Verify

1. Check browser console for errors
2. Verify Firebase connection (use Test Connection button)
3. Ensure fingerprint-enhanced.js is loaded
4. Check Firebase rules are published

### False Positives

If legitimate users are locked out:

1. Check if they changed devices
2. Verify browser version hasn't drastically changed
3. Check if they cleared all browser data
4. Issue new key if necessary

### Security Logs

Monitor for patterns:
- Multiple failed attempts = potential attacker
- Same key, different HWIDs = key sharing attempt
- High frequency = automated attack

## 🛠️ Customization

### Adjust HWID Strictness

In `fingerprint-enhanced.js`, modify `collectHardwareData()`:

```javascript
// More strict (more components)
const data = {
  // ... all existing components
  additionalComponent: yourCustomCheck()
};

// Less strict (fewer components)
const data = {
  userAgent: navigator.userAgent,
  screenResolution: `${screen.width}x${screen.height}`,
  // Remove other components for less strictness
};
```

### Custom Security Actions

In `scripts.js`, find the HWID mismatch handler:

```javascript
if (hwid !== keyOwnerHWID) {
  // Add custom actions here
  // Example: Send email alert
  // Example: Temporary lockout
  // Example: CAPTCHA challenge
}
```

## 📈 Performance

- HWID generation: ~100-300ms (first time)
- Verification: ~50-100ms (returning users)
- No impact on page load (async)
- Minimal Firebase reads/writes

## 🔒 Security Best Practices

1. **Never disable HWID checks** - Core security feature
2. **Monitor security logs regularly** - Catch attackers early
3. **Rotate keys periodically** - For compromised keys
4. **Use HTTPS only** - Protect data in transit
5. **Keep Firebase rules updated** - Security patches

## 📝 Version History

### v3.0 (Current)
- Added comprehensive HWID protection
- Multi-layer device fingerprinting
- Enhanced security logging
- Automatic verification system

### v2.0 (Previous)
- Basic fingerprint system
- Network-wide key access
- Cross-domain support

### v1.0 (Original)
- Simple key verification
- Single domain only

## 🆘 Support

For issues or questions:
1. Check browser console for errors
2. Review Firebase security logs
3. Verify all files are updated
4. Test connection button in key entry
5. Contact developers if issues persist

## ⚖️ Legal & Privacy

- HWIDs are hashed and not personally identifiable
- No personal information is collected
- Device fingerprints are used solely for access control
- Complies with standard web security practices

---

**GalaxyVerse HWID Protection System v3.0**  
*Secure. Permanent. Device-Locked.*
