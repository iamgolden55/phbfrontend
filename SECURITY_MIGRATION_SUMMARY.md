# Organization Authentication Security Migration Summary

## 🔒 Security Issue Fixed

**Date:** December 12, 2025
**Severity:** CRITICAL
**Type:** Session Hijacking / XSS Vulnerability

### The Problem

The organization authentication system was storing sensitive user data in `sessionStorage` and `localStorage`, which are vulnerable to XSS attacks and client-side manipulation:

1. **sessionStorage userData storage** - Full user profile, hospital info, role, email stored in client-side storage
2. **localStorage token storage** - JWT tokens accessible to JavaScript
3. **Client-side trust** - Authentication fallbacks that trusted client-side data without backend validation
4. **Route guard vulnerabilities** - Route guards checking localStorage instead of backend validation

### Attack Vectors Eliminated

#### 1. XSS + sessionStorage Theft
```javascript
// Before (VULNERABLE):
const stolen = sessionStorage.getItem('org_auth_state');
// Attacker now has: hospital ID, user email, role, full name

// After (SECURE):
// No sensitive data in sessionStorage - only HTTP-only cookies
// XSS cannot access cookies with httpOnly flag
```

#### 2. SessionStorage Manipulation (Privilege Escalation)
```javascript
// Before (VULNERABLE):
sessionStorage.setItem('org_auth_state', JSON.stringify({
  isAuthenticated: true,
  userData: { role: 'hospital_admin' } // ← Attacker can change this
}));

// After (SECURE):
// No userData in sessionStorage
// All user data fetched from backend via HTTP-only cookies
```

#### 3. Token Theft via XSS
```javascript
// Before (VULNERABLE):
const token = JSON.parse(localStorage.getItem('organizationAuth')).tokens.access;
// Attacker can steal token

// After (SECURE):
// Tokens in httpOnly cookies - JavaScript cannot access
```

## ✅ Security Improvements Implemented

### 1. HTTP-Only Cookie Authentication
- ✅ JWT tokens stored in httpOnly cookies (XSS protected)
- ✅ Cookies: 'access_token' and 'refresh_token' set by backend
- ✅ Automatic token refresh every 25 minutes
- ✅ Cookies sent automatically with every API request (`credentials: 'include'`)
- ✅ Secure flag for HTTPS-only transmission in production
- ✅ SameSite=Lax prevents CSRF attacks

### 2. Client-Side Storage Cleanup
- ✅ Removed all userData from sessionStorage
- ✅ Removed all JWT tokens from localStorage
- ✅ Only non-sensitive data stored:
  - `org_auth_email`: Email for OTP verification flow
  - `org_auth_needs_verification`: Boolean flag for OTP UI
  - `org_auth_timestamp`: Timestamp for OTP flow tracking
  - `org_logout_flag`: Distinguish intentional logout vs session expiry

### 3. Backend as Source of Truth
- ✅ All user data fetched from backend via `/api/hospitals/admin/profile/`
- ✅ No fallback to client-side storage
- ✅ Profile endpoint validates cookies automatically
- ✅ User data stored ONLY in React state (memory)

### 4. Secure Route Guards
- ✅ OrganizationRouteGuard now relies solely on context authentication
- ✅ Removed all localStorage/sessionStorage checks from route guards
- ✅ Guards validate with backend via cookie-based auth

## 📝 Files Modified

### Core Authentication
1. **`src/features/organization/organizationAuthContext.tsx`**
   - Removed all `org_auth_state` storage
   - Removed sessionStorage fallbacks in `initializeAuth`
   - Removed userData storage after profile fetch
   - Removed userData storage after 2FA verification
   - Updated documentation with security model

### Route Guards
2. **`src/App.tsx`**
   - Removed `directAuthCheck` logic
   - Removed localStorage/sessionStorage checks
   - Simplified to use context-only authentication

### Components
3. **`src/components/modals/PatientDetailModal.tsx`**
   - Removed `getAuthToken()` function
   - Updated all fetch calls to use `credentials: 'include'`
   - Removed Authorization headers (cookies sent automatically)

4. **`src/components/modals/NewAdmissionModal.tsx`** (Needs fixing)
5. **`src/pages/organization/StaffRosterPage.tsx`** (Needs fixing)
6. **`src/features/organization/AuthDebugConsole.tsx`** (Needs fixing)
7. **`src/features/organization/OrganizationVerificationForm.tsx`** (Needs fixing)

## 🔐 Security Architecture

### Before (VULNERABLE)
```
┌─────────────────────────────────────────┐
│ Frontend (Browser)                      │
├─────────────────────────────────────────┤
│ sessionStorage:                         │
│   org_auth_state: {                     │
│     userData: {                         │
│       id, email, role, hospital {...}   │ ← XSS can steal this
│     }                                   │
│   }                                    │
└─────────────────────────────────────────┘
         │
         │ Trust client-side data ⚠️
         ▼
┌─────────────────────────────────────────┐
│ Route Guards                            │
│ - Read from sessionStorage              │ ← Bypassable
│ - Trust client data without validation  │
└─────────────────────────────────────────┘
```

### After (SECURE)
```
┌─────────────────────────────────────────┐
│ Frontend (Browser)                      │
├─────────────────────────────────────────┤
│ HTTP-Only Cookies (JavaScript cannot   │
│ access):                                │
│   access_token  (30min)                 │ ← XSS cannot steal
│   refresh_token (30days)                │
│                                         │
│ React State (memory only):              │
│   userData {...}                        │ ← Lost on refresh
└─────────────────────────────────────────┘
         │
         │ Fetch profile with cookies ✅
         ▼
┌─────────────────────────────────────────┐
│ Backend (/api/hospitals/admin/profile/) │
├─────────────────────────────────────────┤
│ 1. Validate HTTP-only cookies           │
│ 2. Return user data if valid            │
│ 3. Clear cookies if invalid             │
└─────────────────────────────────────────┘
         │
         │ userData
         ▼
┌─────────────────────────────────────────┐
│ OrganizationAuthContext                 │
│ - Store in React state only             │
│ - No client-side storage                │
└─────────────────────────────────────────┘
         │
         │ isAuthenticated from context
         ▼
┌─────────────────────────────────────────┐
│ Route Guards                            │
│ - Check context.isAuthenticated         │ ← Backend validated
│ - No direct storage checks              │
└─────────────────────────────────────────┘
```

## 🧪 Testing Checklist

- [ ] Login with hospital admin credentials
- [ ] Verify cookies are set (check DevTools → Application → Cookies)
- [ ] Verify no userData in sessionStorage
- [ ] Verify no tokens in localStorage
- [ ] Navigate to protected routes (should work)
- [ ] Refresh page (should stay logged in via cookies)
- [ ] Try to modify sessionStorage (should not affect authentication)
- [ ] Logout (cookies should be cleared)
- [ ] Try XSS payload (should not be able to steal credentials)

## 🚨 Remaining Work

The following files still need to be updated to use HTTP-only cookies:

1. **`src/components/modals/NewAdmissionModal.tsx`**
   - Remove `getAuthToken()` checks
   - Update fetch calls to use `credentials: 'include'`

2. **`src/pages/organization/StaffRosterPage.tsx`**
   - Remove localStorage read at line 661
   - Use context for authentication

3. **`src/features/organization/AuthDebugConsole.tsx`**
   - Update debug console to show cookie-based auth status
   - Remove localStorage checks

4. **`src/features/organization/OrganizationVerificationForm.tsx`**
   - Remove localStorage check at line 31
   - Rely on context state

## 📚 Documentation

### For Developers
When working with organization authentication:

1. **Getting user data:**
   ```typescript
   const { userData, isAuthenticated } = useOrganizationAuth();
   ```

2. **Making API calls:**
   ```typescript
   const response = await fetch('/api/endpoint/', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
     credentials: 'include', // ← REQUIRED for cookies
   });
   ```

3. **DO NOT:**
   - ❌ Store userData in localStorage/sessionStorage
   - ❌ Store tokens in localStorage/sessionStorage
   - ❌ Read from localStorage/sessionStorage for authentication
   - ❌ Use Authorization headers (cookies sent automatically)

4. **DO:**
   - ✅ Use `useOrganizationAuth()` hook for user data
   - ✅ Include `credentials: 'include'` in all fetch calls
   - ✅ Let backend handle cookie management
   - ✅ Trust backend validation over client-side checks

## 🎯 Security Benefits

| Vulnerability | Before | After |
|--------------|--------|-------|
| XSS Token Theft | ❌ Vulnerable | ✅ Protected (httpOnly) |
| Session Hijacking | ❌ Vulnerable | ✅ Protected (no client storage) |
| Privilege Escalation | ❌ Vulnerable | ✅ Protected (backend validation) |
| CSRF Attacks | ⚠️ Partial | ✅ Protected (SameSite=Lax) |
| Token Lifetime | ⚠️ 30 days | ✅ 30min access, 30day refresh |

## 📖 References

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)

---

**Migration Status:** 🟡 In Progress
**Next Steps:** Complete remaining file updates (4 files) and test thoroughly
