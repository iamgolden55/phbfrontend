---
date: 2025-10-31T16:40:40Z
researcher: Claude
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Missing 2FA Toggle and Non-Functional Contact Preferences"
tags: [research, codebase, authentication, 2fa, user-settings, contact-preferences, security]
status: complete
last_updated: 2025-10-31
last_updated_by: Claude
---

# Research: Missing 2FA Toggle and Non-Functional Contact Preferences

**Date**: 2025-10-31T16:40:40Z
**Researcher**: Claude
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

Two critical issues need investigation:
1. Missing 2FA toggle functionality for users after login (frontend implementation)
2. Non-functional contact preferences at `/account/contact-preferences` (missing backend endpoints)

## Summary

**Issue 1 - Missing 2FA Toggle:**
- 2FA functionality exists **ONLY** for organization/hospital admins, not regular users or medical professionals
- Regular users have NO security settings page or 2FA management UI
- No `/account/security` route exists in the application
- The auth context for regular users has no 2FA-related methods or state

**Issue 2 - Contact Preferences Not Working:**
- The contact preferences page at `/account/contact-preferences` exists but is **non-functional**
- The `updateContactPreferences()` method in authContext is **stubbed out** and not implemented
- Backend API endpoint `/api/users/contact-preferences` is commented out
- Currently shows error: "Update Contact Preferences endpoint not configured in frontend"

## Detailed Findings

### Issue 1: Missing 2FA Toggle for Regular Users

#### Current 2FA Implementation (Organization Admins Only)

**File**: [organizationAuthContext.tsx](src/features/organization/organizationAuthContext.tsx)

2FA is fully implemented for organization/hospital admins:
- **Method**: `verify2FA(email, verificationCode, rememberDevice)` (lines 464-533)
- **API Endpoint**: `http://127.0.0.1:8000/api/hospitals/admin/verify-2fa/`
- **Features**:
  - 2FA code verification during login
  - "Remember device" functionality
  - Integrated with password reset flow

**Related Files**:
- [OrganizationVerificationForm.tsx](src/features/organization/OrganizationVerificationForm.tsx) - 2FA verification UI
- [HospitalAdminPasswordResetComplete.tsx](src/features/organization/HospitalAdminPasswordResetComplete.tsx) - 2FA reminder in password reset

#### Missing for Regular Users

**File**: [authContext.tsx](src/features/auth/authContext.tsx)

Regular user auth context has **NO 2FA implementation**:
- User interface (lines 5-32) - No 2FA fields
- AuthContextType interface (lines 94-130) - No 2FA methods
- No `enable2FA()`, `disable2FA()`, or `verify2FA()` methods
- Only OTP exists for email verification, not authentication

#### Missing Security Settings Page

**Account Routes** ([App.tsx](src/App.tsx) lines 632-665):
```typescript
// Existing routes
/account/personal-details → PersonalDetailsPage
/account/contact-preferences → ContactPreferencesPage
/account/password → PasswordPage
/account/link-phb → LinkPHBPage

// MISSING: /account/security (no security settings page)
```

**Account Page Navigation** ([AccountPage.tsx](src/pages/AccountPage.tsx) lines 157-177):
- Personal details link exists
- Contact preferences link exists
- Change password link exists
- **NO security settings link**

#### What's Missing for Regular User 2FA

To implement 2FA toggle for regular users, we need:

1. **New Security Settings Page**: `SecuritySettingsPage.tsx` component
2. **User Interface Updates**: Add 2FA fields to User interface in authContext
   - `two_factor_enabled: boolean`
   - `two_factor_secret?: string`
   - `backup_codes?: string[]`
3. **Auth Context Methods**: Add to AuthContextType
   - `enable2FA(): Promise<{qrCode: string, secret: string, backupCodes: string[]}>`
   - `disable2FA(verificationCode: string): Promise<void>`
   - `verify2FASetup(verificationCode: string): Promise<void>`
4. **New Route**: `/account/security` in App.tsx
5. **Backend API Endpoints** (need to be created):
   - `POST /api/users/2fa/enable/` - Generate QR code and secret
   - `POST /api/users/2fa/verify/` - Verify setup with code
   - `DELETE /api/users/2fa/disable/` - Disable 2FA
   - `POST /api/users/2fa/verify-login/` - Verify 2FA during login
6. **UI Components**:
   - QR code display for authenticator app setup
   - Backup codes display and download
   - 2FA verification modal during login
7. **Navigation Update**: Add security settings link to AccountPage

---

### Issue 2: Non-Functional Contact Preferences

#### Current Implementation

**File**: [ContactPreferencesPage.tsx](src/pages/account/ContactPreferencesPage.tsx)

The UI exists and renders properly with all form fields:
- Email notifications toggle (line 99)
- SMS notifications toggle (line 119)
- Appointment reminders toggle (line 144)
- Health tips toggle (line 164)
- Service updates toggle (line 184)
- Research participation toggle (line 201)

**Submit Handler** (lines 32-56):
```typescript
const handleSave = (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Calls updateContactPreferences from auth context
    if (typeof updateContactPreferences === 'function') {
      updateContactPreferences(preferences);
    }

    setSuccessMessage('Contact preferences updated successfully');
  } catch (error) {
    setErrorMessage('Failed to update contact preferences');
  }
};
```

#### Stubbed Backend Implementation

**File**: [authContext.tsx](src/features/auth/authContext.tsx) lines 1015-1036

```typescript
const updateContactPreferences = async (preferences: ContactPreferencesData) => {
  if (!user) throw new Error("User not authenticated");
  setIsLoading(true);
  setError(null);
  try {
    // Backend endpoint is COMMENTED OUT
    // const updatedUserData = await apiRequest<User>(
    //   '/api/users/contact-preferences',
    //   'PUT',
    //   preferences,
    //   token
    // );
    // setUser(updatedUserData);

    console.warn(
      "Update Contact Preferences functionality might need to be merged " +
      "into updateUserProfile or requires a specific backend endpoint."
    );

    // Sets error instead of updating
    setError("Update Contact Preferences endpoint not configured in frontend.");
  } catch (err: any) {
    console.error("Update preferences failed:", err);
    setError(err.message || "Failed to update preferences.");
    throw err;
  } finally {
    setIsLoading(false);
  }
};
```

#### Data Structure

**ContactPreferencesData Interface** (lines 85-92):
```typescript
interface ContactPreferencesData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  healthTips: boolean;
  serviceUpdates: boolean;
  researchParticipation: boolean;
}
```

**User Interface** includes contactPreferences (lines 21-28):
```typescript
interface User {
  // ... other fields
  contactPreferences?: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    appointmentReminders: boolean;
    healthTips: boolean;
    serviceUpdates: boolean;
    researchParticipation: boolean;
  };
}
```

#### Missing Backend Implementation

**Backend Endpoints Needed**:
1. **GET** `/api/users/contact-preferences/` - Retrieve current preferences
2. **PUT/PATCH** `/api/users/contact-preferences/` - Update preferences

**Alternative Approach**:
Merge into existing profile endpoint `/api/profile/` which already handles user updates (lines 958-1013 in authContext.tsx).

---

## Code References

### 2FA Implementation
- [organizationAuthContext.tsx:464-533](src/features/organization/organizationAuthContext.tsx#L464-L533) - Organization 2FA verification method
- [OrganizationVerificationForm.tsx:59-76](src/features/organization/OrganizationVerificationForm.tsx#L59-L76) - 2FA verification UI
- [authContext.tsx:5-130](src/features/auth/authContext.tsx#L5-L130) - Regular user auth context (no 2FA)

### Contact Preferences
- [ContactPreferencesPage.tsx:32-56](src/pages/account/ContactPreferencesPage.tsx#L32-L56) - UI submit handler
- [authContext.tsx:1015-1036](src/features/auth/authContext.tsx#L1015-L1036) - Stubbed updateContactPreferences method
- [authContext.tsx:85-92](src/features/auth/authContext.tsx#L85-L92) - ContactPreferencesData interface
- [authContext.tsx:21-28](src/features/auth/authContext.tsx#L21-L28) - User contactPreferences field

### Account Routes
- [App.tsx:632-665](src/App.tsx#L632-L665) - Account settings routes
- [AccountPage.tsx:157-177](src/pages/AccountPage.tsx#L157-L177) - Account navigation links

---

## Architecture Insights

### Three Separate Auth Systems

The codebase maintains three completely independent authentication contexts:

1. **Regular Users** ([authContext.tsx](src/features/auth/authContext.tsx))
   - httpOnly cookie-based authentication
   - No 2FA implementation
   - Has stubbed contact preferences

2. **Medical Professionals** ([professionalAuthContext.tsx](src/features/professional/professionalAuthContext.tsx))
   - localStorage-based authentication (planned migration to cookies)
   - No 2FA implementation
   - No settings/preferences endpoints

3. **Organization Admins** ([organizationAuthContext.tsx](src/features/organization/organizationAuthContext.tsx))
   - httpOnly cookie-based authentication
   - **Full 2FA implementation**
   - Password reset with 2FA verification

This separation means 2FA implementation for regular users and professionals would need to follow the organization auth pattern but adapted for their respective contexts.

### Current Account Settings Structure

**Settings Available**:
- Personal details (name, DOB, gender, phone, etc.)
- Password change
- Contact preferences (UI exists but non-functional)
- Link PHB account

**Settings Missing**:
- Security settings (2FA toggle, session management, login history)
- Privacy settings
- Account deletion
- Notification preferences (backend not implemented)

---

## Recommendations

### Priority 1: Fix Contact Preferences (Quick Win)

**Option A - Use Existing Profile Endpoint** (Recommended):
1. Modify `updateUserProfile()` in authContext to accept contactPreferences
2. Send contactPreferences as part of PATCH to `/api/profile/`
3. Backend already returns full user object including contactPreferences
4. Update ContactPreferencesPage to use `updateUserProfile()` instead

**Option B - Create Dedicated Endpoint**:
1. Backend: Create `/api/users/contact-preferences/` endpoint
2. Frontend: Uncomment and complete the `updateContactPreferences()` implementation
3. Test with the existing UI at `/account/contact-preferences`

**Estimated Effort**: 2-4 hours (Option A) or 4-6 hours (Option B with backend)

### Priority 2: Add 2FA for Regular Users (Medium Complexity)

**Phase 1 - Backend Setup** (Backend work required):
1. Create 2FA models and database fields
2. Implement endpoints:
   - `POST /api/users/2fa/enable/` - Generate secret and QR code
   - `POST /api/users/2fa/verify-setup/` - Verify initial setup
   - `POST /api/users/2fa/verify-login/` - Verify during login
   - `DELETE /api/users/2fa/disable/` - Disable 2FA
3. Use TOTP library (pyotp or similar)
4. Generate backup codes

**Phase 2 - Frontend Implementation**:
1. Create `SecuritySettingsPage.tsx`:
   - 2FA enable/disable toggle
   - QR code display for setup
   - Backup codes display/download
   - Active sessions list (future)
2. Update authContext.tsx:
   - Add 2FA fields to User interface
   - Add 2FA methods to AuthContextType
   - Implement enable2FA, disable2FA, verify2FA methods
3. Update LoginForm.tsx:
   - Add 2FA verification step after password
   - Show 2FA input if user has 2FA enabled
4. Add route in App.tsx:
   - `/account/security` → SecuritySettingsPage
5. Update AccountPage.tsx:
   - Add "Security Settings" link in navigation

**Phase 3 - Professional Users 2FA**:
1. Repeat similar implementation in professionalAuthContext
2. Create professional security settings page
3. Update professional login flow

**Estimated Effort**:
- Backend: 12-16 hours
- Frontend (Regular users): 8-12 hours
- Frontend (Professional users): 6-8 hours
- Testing: 4-6 hours
- **Total**: 30-42 hours

---

## Implementation Priority Order

1. **Immediate**: Fix contact preferences (non-breaking, quick win)
2. **Short-term**: Add security settings page structure (even without 2FA)
3. **Medium-term**: Implement 2FA for regular users (requires backend coordination)
4. **Long-term**: Implement 2FA for professional users

---

## Breaking Changes Risk Assessment

### Contact Preferences Fix
- **Risk**: LOW
- **Reason**: Only affects `/account/contact-preferences` page
- **Impact**: Isolated to contact preferences functionality
- **Testing Required**: Contact preferences save/load

### 2FA Implementation
- **Risk**: MEDIUM
- **Reason**: Modifies login flow and auth context
- **Impact**: Could affect existing login functionality if not careful
- **Mitigation**:
  - Make 2FA optional (disabled by default)
  - Feature flag for rollout
  - Extensive testing of login flow
  - Keep existing non-2FA flow working
- **Testing Required**:
  - Login without 2FA (existing users)
  - Login with 2FA enabled
  - 2FA setup flow
  - 2FA disable flow
  - Password reset with 2FA
  - "Remember device" functionality

---

## Related Research

- [authentication-flow.md](../../../docs/authentication-flow.md) - Current authentication documentation
- [httponly-cookie-migration.md](../plans/2025-10-18-httponly-cookie-migration.md) - Cookie migration planning

---

## Open Questions

1. **Backend Status**: Does the backend have any 2FA endpoints for regular users already?
2. **Contact Preferences Backend**: Is `/api/users/contact-preferences/` implemented on backend?
3. **Profile Endpoint**: Does `/api/profile/` accept contactPreferences in PATCH requests?
4. **2FA Library**: What TOTP library is used on the backend for organization 2FA?
5. **Session Management**: Should we implement session management alongside 2FA?
6. **Backup Codes**: How many backup codes should be generated? (Typical: 8-10)
7. **Device Memory**: How long should "remember device" last? (Organization uses this)
8. **Professional Users**: Should professionals get 2FA before or after regular users?
