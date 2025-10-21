---
date: 2025-10-18 09:39:44 BST
researcher: Claude Code
git_commit: 393b35d52cd4b1f332fa408523c98e06247131a8
branch: main
repository: phbfrontend
topic: "How are cookies used on this project?"
tags: [research, codebase, cookies, authentication, security, localStorage, django, react]
status: complete
last_updated: 2025-10-18
last_updated_by: Claude Code
---

# Research: Cookie Usage in PHB Healthcare System

**Date**: 2025-10-18 09:39:44 BST
**Researcher**: Claude Code
**Git Commit**: 393b35d52cd4b1f332fa408523c98e06247131a8
**Branch**: main
**Repository**: phbfrontend (with backend at /Users/new/Newphb/basebackend)

## Research Question

How are cookies used on this project? (Including both frontend and backend)

## Summary

The PHB Healthcare System has an **interesting discrepancy between documentation and implementation**:

### Key Findings:
1. **Frontend Implementation**: Uses **localStorage exclusively** for token storage, NOT browser cookies
2. **Backend Configuration**: Properly configured Django session and CSRF cookies with security flags
3. **Authentication Method**: JWT tokens stored in localStorage and sent via Authorization headers
4. **Cookie Policy Documentation**: Exists and mentions cookie names, but doesn't reflect actual implementation
5. **Security Gap**: No httpOnly cookie protection for JWT tokens (vulnerable to XSS attacks)

The system is **prepared for cookie-based authentication** (CORS credentials enabled, secure flags configured) but currently relies on localStorage for all client-side data persistence.

## Detailed Findings

### Frontend Cookie Usage

#### 1. Cookie Banner Implementation
**Location**: `src/components/Header.tsx:37, 48-60, 86-118`

Despite being called a "cookie consent banner," this feature actually uses localStorage:

```typescript
// State management
const [showCookieBanner, setShowCookieBanner] = useState(false);

// Check consent status from localStorage
useEffect(() => {
  const hasConsent = localStorage.getItem('cookie-consent');
  if (!hasConsent) {
    setShowCookieBanner(true);
  }
}, []);

// Save consent to localStorage
const handleCookieConsent = (accepted: boolean) => {
  localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'declined');
  setShowCookieBanner(false);
};
```

**Key Observations**:
- Banner displays cookie policy information
- User consent stored in localStorage, not cookies
- Key: `'cookie-consent'`

#### 2. Cookie Policy Documentation
**Location**: `src/pages/AboutPHBPage.tsx:738-897`

Comprehensive cookie policy section includes:

```typescript
// Documented cookie names (line 770)
<strong>Cookie names:</strong> phb_token, phb_professional_token,
phb_organization_token, session_id
```

**Documented Cookie Types**:
- **Essential Cookies**: Authentication and security
- **Functional Cookies**: User preferences and settings
- **Analytics Cookies**: Usage patterns and performance
- **Performance Cookies**: Site optimization
- **Third-Party Cookies**: Payment processing (Paystack)

**Cookie Duration Types**:
- Session cookies (deleted when browser closes)
- Persistent cookies (stored for specified duration)

**Important**: This documentation doesn't match the actual implementation, which uses localStorage.

#### 3. No Actual Cookie Usage
**Finding**: No `document.cookie` usage found anywhere in the frontend codebase
**Finding**: No cookie libraries (like `js-cookie`) in dependencies
**Finding**: No cookie read/write operations

#### 4. localStorage Token Storage Pattern
**Location**: `src/features/auth/authContext.tsx:140, 252, 359`

```typescript
const AUTH_TOKEN_KEY = 'phb_auth_token';

// Storing token
const handleAuthSuccess = (userData: User, token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    // ...
};

// Retrieving token
const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
        const userData = await apiRequest<User>('/api/profile/', 'GET', undefined, token);
    }
}, []);

// Clearing token on logout
const logout = async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem('phb_professional_user');
    localStorage.removeItem('phb_view_preference');
};
```

### Backend Cookie Usage

#### 1. Django Middleware Configuration
**Location**: `/Users/new/Newphb/basebackend/server/settings.py:65-75`

Django's built-in middleware handles session and CSRF cookies automatically:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Session cookies
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',  # CSRF cookies
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

**Cookies Created by Middleware**:
- `sessionid` - Django session cookie (from SessionMiddleware)
- `csrftoken` - CSRF protection cookie (from CsrfViewMiddleware)

#### 2. Production Cookie Security Settings
**Location**: `/Users/new/Newphb/basebackend/server/settings.py:98-99`

```python
# HTTPS Settings (enable in production)
if not DEBUG:
    SESSION_COOKIE_SECURE = True   # Only send over HTTPS
    CSRF_COOKIE_SECURE = True      # Only send over HTTPS
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31536000  # 1 year
```

**Location**: `/Users/new/Newphb/basebackend/server/settings_heroku.py:61-62`

```python
# Heroku hardened settings (always enforced)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

#### 3. CORS Configuration with Credentials
**Location**: `/Users/new/Newphb/basebackend/server/settings.py:245`

```python
CORS_ALLOW_CREDENTIALS = True  # Allows cookies in CORS requests

CORS_ALLOW_HEADERS = [
    'accept',
    'authorization',
    'content-type',
    'x-csrftoken',  # CSRF token header
    'x-med-access-token',
    # ...
]
```

**Key Aspects**:
- Enables cookies/credentials in cross-origin requests
- CSRF token can be sent in headers
- Prepared for cookie-based authentication (but not currently used)

#### 4. JWT Authentication (Current Method)
**Location**: `/Users/new/Newphb/basebackend/server/settings.py:27-31`

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # ...
}
```

**Authentication Flow**:
1. User logs in, receives JWT token in response body
2. Frontend stores token in localStorage
3. Frontend sends token in `Authorization: Bearer <token>` header
4. Backend validates JWT from header, NOT from cookies

### Token Storage Locations

| Token Type | localStorage Key | Purpose |
|------------|-----------------|---------|
| Regular User | `phb_auth_token` or `phb_token` | User authentication |
| Professional | `phb_professional_token` | Medical professional authentication |
| Organization | `phb_organization_token` | Organization admin authentication |
| Medical Records | `medical_record_token` | Medical records access |
| Medical Access | `med_access_token` | Temporary medical access |
| Onboarding Flag | `phb_onboarding_completed` | Onboarding completion status |
| View Preference | `phb_view_preference` | Professional view toggle |
| Cookie Consent | `cookie-consent` | Cookie banner acceptance |

## Code References

### Frontend
- `src/components/Header.tsx:37-118` - Cookie banner (uses localStorage)
- `src/pages/AboutPHBPage.tsx:738-897` - Cookie policy documentation
- `src/features/auth/authContext.tsx:140, 252, 359` - Token storage in localStorage
- `src/features/professional/professionalAuthContext.tsx:31-32` - Professional tokens
- `src/services/paymentService.ts:71-73` - Payment service token handling
- `src/services/guidelinesService.ts:102, 120` - Multiple token type handling

### Backend
- `/Users/new/Newphb/basebackend/server/settings.py:65-75` - Middleware configuration
- `/Users/new/Newphb/basebackend/server/settings.py:98-99` - Production cookie security
- `/Users/new/Newphb/basebackend/server/settings.py:245` - CORS credentials
- `/Users/new/Newphb/basebackend/server/settings_heroku.py:61-62` - Heroku security settings
- `/Users/new/Newphb/basebackend/PRODUCTION_SECURITY_CHECKLIST.md:112-113` - Security checklist

## Architecture Documentation

### Current Authentication Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                       │
│                                                              │
│  Login ──> Receive JWT ──> Store in localStorage           │
│                             ↓                                │
│  API Request ──> Read from localStorage ──> Add to Headers │
│                             ↓                                │
│              Authorization: Bearer <token>                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌──────────────────────────────────────────────────────────────┐
│                     Backend (Django)                          │
│                                                              │
│  Receive Request ──> Extract JWT from Header               │
│                      ↓                                       │
│              JWTAuthentication validates token              │
│                      ↓                                       │
│              Return response (no cookie setting)            │
│                                                              │
│  Django Middleware Also Sets:                               │
│  - sessionid cookie (SessionMiddleware)                     │
│  - csrftoken cookie (CsrfViewMiddleware)                    │
└──────────────────────────────────────────────────────────────┘
```

### Cookie vs localStorage Comparison

| Aspect | Cookies (Not Used) | localStorage (Current) |
|--------|-------------------|----------------------|
| Storage Location | Browser cookies | Browser localStorage |
| httpOnly Protection | ✅ Possible | ❌ Not possible |
| Secure Flag | ✅ Available | ❌ Not available |
| XSS Protection | ✅ With httpOnly | ❌ Vulnerable to XSS |
| CSRF Protection | ⚠️ Requires tokens | ✅ Not vulnerable to CSRF |
| Automatic Sending | ✅ Automatic | ❌ Manual in headers |
| Size Limit | ~4KB per cookie | ~5-10MB total |
| Expiration | ✅ Can set | ❌ Manual management |

### Security Implications

**Current Implementation (localStorage + JWT in headers)**:
- ✅ **CSRF Resistant**: Tokens not automatically sent
- ❌ **XSS Vulnerable**: JavaScript can access tokens
- ❌ **No httpOnly Protection**: Tokens exposed to client scripts
- ✅ **Flexible**: Easy to implement and debug
- ⚠️ **Persistence**: Tokens remain until manually cleared

**If Switched to httpOnly Cookies**:
- ✅ **XSS Resistant**: Cookies not accessible to JavaScript
- ⚠️ **CSRF Vulnerable**: Automatic sending requires CSRF protection
- ✅ **httpOnly Protection**: Enhanced security
- ⚠️ **Complex**: Requires backend changes for token refresh
- ✅ **Auto Expiration**: Browser handles cookie lifecycle

## Related Research

No related research documents found in `thoughts/shared/research/`

## Open Questions

1. **Why localStorage instead of cookies?**
   - Simpler implementation for SPA
   - Avoids CSRF complexity
   - Easier development and debugging
   - Trade-off: XSS vulnerability

2. **Is the cookie policy documentation outdated?**
   - Policy mentions cookie names that don't exist as cookies
   - Should be updated to reflect localStorage usage
   - Or implementation should be changed to match documentation

3. **Should the system migrate to httpOnly cookies?**
   - Would improve XSS protection
   - Requires CSRF token implementation
   - Backend already configured for it (CORS_ALLOW_CREDENTIALS = True)
   - Would need token refresh flow changes

4. **What are the Django session/CSRF cookies used for?**
   - SessionMiddleware and CsrfViewMiddleware are enabled
   - But JWT authentication bypasses session authentication
   - CSRF middleware may be providing protection for certain endpoints
   - Could be legacy configuration from before JWT implementation

5. **Why is CORS_ALLOW_CREDENTIALS enabled?**
   - Setting is enabled but not actively used
   - Suggests possible future migration to cookie-based auth
   - Or legacy from previous authentication method
