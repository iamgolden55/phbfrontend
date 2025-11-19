# Quick OTP Toggle Guide

## What Was Added

A new **Security & Login** option in the Account settings that lets users turn OTP verification ON or OFF with a simple toggle switch.

---

## How to Access

### Step 1: Login to Your Account
Navigate to: `http://localhost:5173/account`

### Step 2: Find Security Settings
Look at the left sidebar under **Account settings**:

```
Account settings
├── Personal details
├── Contact preferences
├── Security & Login          ← CLICK HERE (NEW!)
└── Change password
```

### Step 3: Toggle OTP
- **Blue toggle (ON)** = OTP is enabled
- **Gray toggle (OFF)** = OTP is disabled

---

## Quick Test

### Test the Feature Right Now

1. **Start your dev server** (if not running):
   ```bash
   cd /Users/new/phbfinal/phbfrontend
   bun run dev
   ```

2. **Login with any account**:
   ```
   Navigate to: http://localhost:5173/login
   ```

3. **Go to Security Settings**:
   ```
   http://localhost:5173/account/security
   ```

4. **Click the toggle**:
   - Watch it switch between ON (blue) and OFF (gray)
   - See the success message appear
   - Notice the warning when OTP is OFF

---

## What the Toggle Does

### When You Turn OTP OFF:
```
✅ Success message: "OTP verification disabled successfully..."
⚠️  Warning box appears: "Disabling OTP makes your account less secure"
📧 Future logins: Email + Password only (no OTP code needed)
```

### When You Turn OTP ON:
```
✅ Success message: "OTP verification enabled successfully..."
ℹ️  Info box appears: Benefits of OTP (security features)
📧 Future logins: Email + Password + OTP code from email
```

---

## Visual Guide

### Toggle States

**OTP Enabled (Secure Mode)**:
```
┌──────────────────┐
│ [====●]    ON    │  ← Blue toggle, knob on right
└──────────────────┘

ℹ️  Blue box: "OTP adds extra security..."
```

**OTP Disabled (Quick Login)**:
```
┌──────────────────┐
│ [●----]    OFF   │  ← Gray toggle, knob on left
└──────────────────┘

⚠️  Amber box: "Warning: Less secure..."
```

**Loading**:
```
┌──────────────────┐
│ [🔄---] Loading  │  ← Spinner icon, disabled
└──────────────────┘
```

---

## For Developers

### Files Changed

1. **New File**: `src/pages/account/SecuritySettingsPage.tsx`
   - The security settings page with OTP toggle

2. **Updated**: `src/pages/AccountPage.tsx` (Line 190-196)
   - Added "Security & Login" link

3. **Updated**: `src/App.tsx`
   - Line 55: Import SecuritySettingsPage
   - Line 716-720: Route for `/account/security`

### Route Path
```
/account/security
```

### API Call
```typescript
updateUserProfile({
  otp_required_for_login: true | false
})
```

---

## Testing Scenarios

### Scenario 1: Disable OTP for Testing
```
Current State: OTP = ON
Action: Click toggle
Expected: Toggle turns gray, shows "OFF", warning appears
Backend: otp_required_for_login = false
```

### Scenario 2: Re-enable OTP
```
Current State: OTP = OFF
Action: Click toggle
Expected: Toggle turns blue, shows "ON", info box appears
Backend: otp_required_for_login = true
```

### Scenario 3: Network Error
```
Current State: Any
Action: Click toggle (with network off)
Expected: Error message, toggle stays in original state
Backend: No change
```

---

## Quick Commands

### Start Dev Server
```bash
cd /Users/new/phbfinal/phbfrontend
bun run dev
```

### Access Security Settings
```
http://localhost:5173/account/security
```

### Check Backend Status
```bash
cd /Users/new/Newphb/basebackend
# Check if backend is running
lsof -i :8000
```

---

## Doctor Test Account

Use the test doctor credentials to test OTP toggle:

```
Email: dr.emmanuel.okonkwo@phb-test.com
Password: TestDoctor123!
OTP Status: Currently DISABLED
```

**To test**:
1. Login with above credentials (no OTP required)
2. Go to Account → Security & Login
3. Toggle OTP ON
4. Logout
5. Login again (should now require OTP code from email)
6. Toggle OTP OFF again
7. Logout
8. Login (no OTP required)

---

## Success Indicators

✅ **Visual**: Toggle animates smoothly
✅ **Feedback**: Success message appears
✅ **State**: Toggle position reflects current setting
✅ **Persistence**: Setting saved after page refresh
✅ **Backend**: `otp_required_for_login` updated in database

---

## Common Questions

### Q: Where is the setting stored?
**A**: In the `CustomUser` model, field: `otp_required_for_login`

### Q: Does this affect existing OTP codes?
**A**: Disabling OTP clears any pending OTP codes

### Q: Can I toggle multiple times?
**A**: Yes, but wait for each request to complete (loading state)

### Q: What's the default setting?
**A**: OTP is enabled by default (`true`) for new accounts

### Q: Does this work for all user types?
**A**: Yes - works for patients, doctors, professionals, and admins

---

**Quick Access**: `localhost:5173/account/security`
**Status**: Ready to test!
