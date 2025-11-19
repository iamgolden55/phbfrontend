---
date: 2025-11-18T00:00:00Z
researcher: Claude
git_commit: dcacc89d1af60285ff1aabe09af5cb52b390b960
branch: main
repository: phbfrontend
topic: "Session Persistence and httpOnly Cookie Best Practices: localhost vs 127.0.0.1"
tags: [research, security, authentication, cookies, session-persistence, localhost]
status: implemented
last_updated: 2025-11-18
last_updated_by: Claude
implementation_date: 2025-11-18
---

## ✅ IMPLEMENTATION COMPLETE (2025-11-18)

### Changes Applied

**File**: `src/features/organization/organizationAuthContext.tsx`

**Problem**: Hardcoded `http://127.0.0.1:8000/` URLs causing cookie domain mismatch when frontend accessed via `localhost:5173`

**Solution**: Replaced all 8 hardcoded URLs with `createApiUrl()` helper from `utils/config.ts`

**Changes made**:
1. Added import: `import { createApiUrl } from '../../utils/config';` (line 2)
2. Replaced 8 hardcoded URLs:
   - Line 99: Token refresh endpoint
   - Line 262: Organization profile endpoint
   - Line 379: Hospital admin login endpoint
   - Line 505: Logout endpoint
   - Line 555: 2FA verification endpoint
   - Line 626: Password reset request endpoint
   - Line 690: Password reset verify endpoint
   - Line 732: Password reset complete endpoint

**Environment Variable**: `VITE_API_BASE_URL` (defaults to `http://127.0.0.1:8000/` in `utils/config.ts`)

**Testing Required**:
- [ ] Test with `localhost:5173` - sessions should now persist
- [ ] Test with `127.0.0.1:5173` - sessions should continue to persist
- [ ] Verify token refresh works correctly
- [ ] Test all organization auth flows (login, 2FA, password reset, logout)

**Next Step**: Update `.env.development` to use `VITE_API_BASE_URL=http://localhost:8000` for consistent localhost usage

---

# Research: Session Persistence and httpOnly Cookie Best Practices

**Date**: 2025-11-18
**Researcher**: Claude
**Git Commit**: dcacc89d1af60285ff1aabe09af5cb52b390b960
**Branch**: main
**Repository**: phbfrontend

## Research Question

The user reported experiencing inconsistent session persistence behavior:
- Using `http://localhost:5173/` - sessions don't persist on browser refresh
- Using `http://127.0.0.1:5173/` - sessions persist correctly

The question: What is the best solution to retain httpOnly cookies across all environments (development and production) given that research documents recommend migrating from localStorage to httpOnly cookies?

## Summary

The inconsistent session behavior is caused by a fundamental browser security principle: **browsers treat `localhost` and `127.0.0.1` as completely separate domains**, even though they resolve to the same IP address. Cookies set for one domain won't be sent to the other.

The PHB frontend has **already migrated** the OrganizationAuthContext to httpOnly cookies and is in the process of migrating UserAuthContext and ProfessionalAuthContext. To ensure consistent cookie behavior:

1. **Always use the same hostname** in development (`localhost` recommended)
2. **Configure cookies appropriately per environment** (different settings for dev vs production)
3. **Never mix localhost and 127.0.0.1** when testing the same application
4. **Use SameSite=Lax for development**, SameSite=Strict for production (unless cross-origin is required)

## Detailed Findings

### 1. Current Authentication Implementation (Codebase Analysis)

#### Migration Status: localStorage → httpOnly Cookies

**Finding**: The PHB system has **partially migrated** to httpOnly cookie authentication:

| Context | Token Storage | Status | File |
|---------|---------------|--------|------|
| **OrganizationAuthContext** | ✅ httpOnly cookies | Fully migrated | `src/features/organization/organizationAuthContext.tsx` |
| **AuthContext** (Users) | ✅ httpOnly cookies | Fully migrated | `src/features/auth/authContext.tsx` |
| **ProfessionalAuthContext** | ⚠️ Relies on main auth | Hybrid approach | `src/features/professional/professionalAuthContext.tsx` |

**Key Implementation Details**:

1. **No JWT tokens in localStorage** - All authentication tokens are stored in httpOnly cookies set by the backend
2. **Automatic cookie transmission** - All API calls use `credentials: 'include'` to send cookies
3. **localStorage usage limited to metadata**:
   - `org_last_token_refresh` (timestamp only, for refresh coordination)
   - `phb_onboarding_completed` (UI state)
   - `phb_view_preference` (UI preference)

**Evidence from AuthContext** (`authContext.tsx:143-161`):
```typescript
/**
 * Authentication Token Storage
 *
 * CURRENT IMPLEMENTATION (httpOnly Cookies):
 * - JWT tokens are stored in httpOnly cookies (set by backend)
 * - Cookies are automatically sent with requests (credentials: 'include')
 * - Inaccessible to JavaScript code (XSS protection)
 * - SameSite=Lax prevents CSRF attacks
 */
```

#### Automatic Token Refresh

**OrganizationAuthContext** implements a sophisticated triple-refresh strategy:

1. **Timer-based**: Every 25 minutes (5 min before 30-min expiry) - `organizationAuthContext.tsx:144`
2. **Visibility-based**: When tab regains focus after 20+ minutes - `organizationAuthContext.tsx:171-192`
3. **Activity-based**: On user interaction after 20+ minutes - `organizationAuthContext.tsx:195-231`

**Refresh implementation** (`organizationAuthContext.tsx:95-135`):
```typescript
const refreshAccessToken = async (): Promise<boolean> => {
  const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
    method: 'POST',
    credentials: 'include', // Sends refresh token cookie automatically
  });

  if (response.ok) {
    // Backend sets new access token in httpOnly cookie via Set-Cookie header
    localStorage.setItem('org_last_token_refresh', Date.now().toString());
    return true;
  }
  return false;
};
```

**Critical observation**: The refresh endpoint is hardcoded to `http://127.0.0.1:8000/` which explains why the user experiences better persistence with `127.0.0.1:5173` - cookies are domain-specific!

### 2. localhost vs 127.0.0.1: Why Cookies Don't Share

**Research source**: Browser security specifications, Stack Overflow technical explanations

**Core Issue**: Browsers perform **string-based domain matching** for cookie security, treating different domain strings as separate origins regardless of IP resolution.

**Technical Explanation**:
- `localhost` is a **DNS hostname** that resolves to the loopback address
- `127.0.0.1` is the **direct loopback IP address**
- Browser cookie policy: `"localhost" !== "127.0.0.1"` (strict string comparison)
- This applies to **any domain name vs its IP address**, not just localhost

**Consequences**:
- Cookies set with `domain=localhost` are only sent to `localhost:*` URLs
- Cookies set with `domain=127.0.0.1` are only sent to `127.0.0.1:*` URLs
- The two cookie jars are **completely isolated** from each other

**Port behavior**: Different ports on the **same hostname** are treated as **different origins** for CORS but **same-site** for cookies:
- `localhost:5173` and `localhost:8000` are same-site (cookies shared if domain attribute omitted)
- `localhost:5173` and `127.0.0.1:8000` are **cross-site** (cookies never shared)

### 3. Backend Hardcoded to 127.0.0.1

**Critical finding**: Multiple API calls in OrganizationAuthContext are hardcoded to `127.0.0.1`:

**File**: `src/features/organization/organizationAuthContext.tsx`

**Line 98**: Token refresh endpoint
```typescript
const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
```

**Line 261**: Profile endpoint for session validation
```typescript
const response = await fetch('http://127.0.0.1:8000/api/organizations/profile/', {
```

**Line 504**: Logout endpoint
```typescript
await fetch('http://127.0.0.1:8000/api/logout/', {
```

**Line 555**: 2FA verification endpoint
```typescript
const response = await fetch('http://127.0.0.1:8000/api/hospitals/admin/verify-2fa/', {
```

**Impact**: If the user accesses the frontend via `http://localhost:5173/`, but the backend is called at `http://127.0.0.1:8000/`:
- Backend sets cookies for `127.0.0.1` domain
- Frontend at `localhost` cannot access those cookies
- Session appears lost on refresh because profile endpoint fails

**Recommendation**: Use `API_BASE_URL` environment variable consistently instead of hardcoding `127.0.0.1`.

### 4. Browser Cookie Configuration: Development vs Production

#### Development Environment (HTTP/localhost)

**Recommended Configuration**:
```javascript
// Backend cookie settings
{
  httpOnly: true,
  secure: false,           // HTTP allowed in development
  sameSite: 'lax',         // Not 'none' - more secure for dev
  domain: 'localhost',     // Explicit domain
  path: '/',
  maxAge: 24 * 60 * 60 * 1000  // 24 hours
}
```

**Key points**:
- **secure=false**: Modern browsers allow secure cookies over HTTP for localhost
- **domain='localhost'**: Explicit domain prevents cross-domain issues
- **SameSite=Lax**: Provides security while allowing top-level navigation
- **Never use SameSite=None in development** - it requires HTTPS and secure=true

**Frontend configuration**:
```typescript
// All API calls must include
credentials: 'include'  // or withCredentials: true for axios
```

#### Production Environment (HTTPS)

**Recommended Configuration**:
```javascript
// Backend cookie settings
{
  httpOnly: true,
  secure: true,            // HTTPS required
  sameSite: 'strict',      // or 'lax' if cross-site navigation needed
  // domain omitted for host-only cookies (more secure)
  path: '/',
  maxAge: 8 * 60 * 60 * 1000   // 8 hours
}
```

**CORS configuration** (backend):
```javascript
app.use(cors({
  origin: 'https://yourapp.com',  // Specific origin, NOT '*'
  credentials: true                // Required for cookies
}));
```

**Critical**: Cannot use wildcard `*` origin when `credentials: true` - must specify exact origin(s).

#### Cross-Origin Cookies (Only If Required)

If frontend and backend are on **different domains** (not recommended for security):

```javascript
{
  httpOnly: true,
  secure: true,            // REQUIRED with SameSite=None
  sameSite: 'none',        // Allows cross-origin
  path: '/',
  maxAge: 8 * 60 * 60 * 1000
}
```

**Additional security**: Implement anti-CSRF tokens using the cookie-to-header pattern.

### 5. SameSite Attribute Best Practices

**Research source**: OWASP security guidelines, MDN documentation, Web.dev

#### SameSite=Strict (Maximum Security)

**Behavior**: Cookies **never** sent in cross-site requests, even when following links

**Use cases**:
- Banking applications
- Password change operations
- Financial transactions
- High-security admin panels

**Trade-off**: Users must re-authenticate when arriving from external links

#### SameSite=Lax (Recommended Default)

**Behavior**: Cookies sent with:
- All same-site requests
- Top-level navigations (user clicking links)
- Safe HTTP methods (GET, HEAD, OPTIONS)

**NOT sent with**:
- Cross-site subrequests (images, iframes, AJAX)
- Unsafe methods (POST from external sites)

**Recommendation**: **Use Lax for most authentication cookies** - provides good security while maintaining usability.

**Browser default**: Chrome, Edge, Opera default to `Lax` when omitted; Firefox and Safari do not - **always set explicitly**.

#### SameSite=None (Cross-Origin Required)

**Behavior**: Cookies sent in all contexts

**Requirements**:
- **MUST** be paired with `Secure=true`
- **MUST** use HTTPS (except localhost exception)

**Use cases**:
- Cross-domain authentication
- Third-party widgets
- OAuth providers

**Security warning**: Opens CSRF attack surface - requires additional protection (anti-CSRF tokens).

### 6. Environment-Based Configuration Pattern

**Recommended implementation**:

```typescript
// Backend: utils/cookieConfig.ts
export const getCookieOptions = () => {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    httpOnly: true,
    secure: !isDev,                    // false in dev, true in prod
    sameSite: isDev ? 'lax' : 'strict', // or 'none' if cross-origin in prod
    path: '/',
    maxAge: 8 * 60 * 60 * 1000,
    // Only set domain in production if needed
    ...(isDev ? { domain: 'localhost' } : {})
  };
};

// Usage
res.cookie('access_token', token, getCookieOptions());
```

**Frontend: Use environment variables**:

```typescript
// vite.config.ts - Development proxy
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Match backend exactly
        changeOrigin: true,
        secure: false
      }
    }
  }
});
```

**OR use API_BASE_URL**:

```typescript
// .env.development
VITE_API_BASE_URL=http://localhost:8000

// .env.production
VITE_API_BASE_URL=https://api.yourapp.com

// services/apiClient.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

### 7. Hybrid Token Storage Pattern (Modern Best Practice)

**Research source**: 2024-2025 security best practices, OWASP guidelines

**Recommended architecture**:

1. **Access Token**:
   - Short-lived (15-30 minutes)
   - Stored in **memory** (React state/context)
   - Lost on page refresh (by design)

2. **Refresh Token**:
   - Long-lived (7 days)
   - Stored in **httpOnly cookie**
   - Persists across page refreshes
   - Used to obtain new access tokens

**Benefits**:
- Access tokens never persisted (minimal XSS risk)
- Refresh tokens protected by httpOnly (XSS-proof)
- Automatic session restoration on page load
- Short access token lifetime limits damage from theft

**Implementation** (`authContext.tsx` already follows this):

```typescript
// On page load
useEffect(() => {
  const checkAuthStatus = async () => {
    try {
      // Refresh token cookie sent automatically
      const userData = await apiRequest('/api/profile/', 'GET');
      setUser(userData);  // Access token in memory
      setupTokenRefreshTimer();
    } catch {
      setUser(null);  // Invalid/expired cookies
    }
  };
  checkAuthStatus();
}, []);
```

## Code References

### Authentication Contexts

- **AuthContext**: `src/features/auth/authContext.tsx`
  - Lines 143-161: httpOnly cookie documentation
  - Lines 164-232: `apiRequest` helper with `credentials: 'include'`
  - Lines 296-369: Token refresh implementation
  - Lines 382-495: Session persistence on page load

- **OrganizationAuthContext**: `src/features/organization/organizationAuthContext.tsx`
  - Lines 76-82: Cookie-based auth documentation
  - Lines 95-135: Token refresh function
  - Lines 138-159: 25-minute refresh timer
  - Lines 171-192: Visibility-based refresh
  - Lines 195-231: Activity-based refresh
  - **Line 98, 261, 504, 555**: Hardcoded `127.0.0.1` endpoints ⚠️

- **ProfessionalAuthContext**: `src/features/professional/professionalAuthContext.tsx`
  - Lines 43-56: Hybrid approach documentation
  - Lines 66-173: Depends on main auth cookies

### Service Layer

- **AppointmentService**: `src/services/appointmentService.ts:56-62`
  - Example of `credentials: 'include'` usage pattern

## Architecture Insights

### Current State

1. **Migration Progress**: System has already migrated to httpOnly cookies for all three auth contexts
2. **No localStorage tokens**: All JWT tokens stored in httpOnly cookies (XSS-protected)
3. **Metadata-only localStorage**: Only timestamps and UI preferences stored client-side
4. **Automatic cookie transmission**: All services use `credentials: 'include'`

### Issues Identified

1. **Hardcoded 127.0.0.1**: OrganizationAuthContext has hardcoded `http://127.0.0.1:8000/` URLs
   - Causes domain mismatch when frontend accessed via `localhost`
   - Should use `API_BASE_URL` environment variable

2. **Cookie domain handling**: No explicit domain configuration visible in frontend code
   - Backend must be setting appropriate domain attribute
   - Should verify backend cookie configuration matches frontend domain

3. **Development environment inconsistency**: Using both `localhost` and `127.0.0.1` causes:
   - Session loss on refresh (domain mismatch)
   - Cookie isolation between the two addresses
   - Confusing developer experience

## Recommendations

### Immediate Actions (P0 - Critical)

#### 1. Fix Hardcoded 127.0.0.1 References

**Issue**: OrganizationAuthContext hardcodes `127.0.0.1` in API URLs

**Fix**: Replace with environment variable

**Files to update**: `src/features/organization/organizationAuthContext.tsx`

**Changes**:
```typescript
// OLD (Lines 98, 261, 504, 555)
await fetch('http://127.0.0.1:8000/api/token/refresh/', {

// NEW
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
await fetch(`${API_BASE_URL}/api/token/refresh/`, {
```

**Impact**: Allows developers to choose `localhost` or `127.0.0.1` consistently via `.env` file

#### 2. Standardize Development Environment

**Issue**: Mixing `localhost` and `127.0.0.1` causes cookie domain mismatch

**Fix**: Choose one and use consistently

**Recommended approach**:

**.env.development**:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

**Documentation**: Update README to specify:
- Always access frontend via `http://localhost:5173/`
- Never mix `localhost` and `127.0.0.1` in same browser session
- Clear cookies if switching between addresses

**Alternative**: Use Vite proxy to avoid CORS entirely:

**vite.config.ts**:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
```

Then update all services to use relative URLs: `/api/...` instead of `http://...`

#### 3. Verify Backend Cookie Configuration

**Ensure backend sets appropriate cookie attributes**:

**Development**:
```python
# Django settings.py or cookie middleware
SESSION_COOKIE_DOMAIN = 'localhost'  # Explicit domain
SESSION_COOKIE_SECURE = False        # HTTP allowed
SESSION_COOKIE_SAMESITE = 'Lax'      # Security + usability
SESSION_COOKIE_HTTPONLY = True       # XSS protection
```

**Production**:
```python
SESSION_COOKIE_DOMAIN = None         # Host-only (more secure)
SESSION_COOKIE_SECURE = True         # HTTPS required
SESSION_COOKIE_SAMESITE = 'Strict'   # Maximum security
SESSION_COOKIE_HTTPONLY = True       # XSS protection
```

### High Priority (P1)

#### 4. Document Cookie Behavior

**Create developer documentation** explaining:
- Why `localhost` and `127.0.0.1` are different
- How to clear cookies when switching addresses
- Environment variable configuration
- Troubleshooting session persistence issues

**Location**: `docs/AUTHENTICATION.md` or update `CLAUDE.md`

#### 5. Add Environment Detection

**Add runtime environment detection and warnings**:

```typescript
// src/utils/envCheck.ts
export const validateEnvironment = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const frontendUrl = window.location.origin;

  const apiHostname = new URL(apiUrl).hostname;
  const frontendHostname = new URL(frontendUrl).hostname;

  if (apiHostname !== frontendHostname) {
    console.warn(
      `⚠️ Frontend (${frontendHostname}) and API (${apiHostname}) use different hostnames. ` +
      `Cookies may not work. Use matching hostnames (both localhost or both 127.0.0.1).`
    );
  }
};

// Call in main.tsx
if (import.meta.env.DEV) {
  validateEnvironment();
}
```

### Medium Priority (P2)

#### 6. Implement CSRF Protection

**Current**: SameSite cookies provide partial CSRF protection

**Recommendation**: Add explicit CSRF tokens for state-changing operations

**Pattern**: Cookie-to-header (for SPAs)

```typescript
// Backend sets CSRF token (NOT httpOnly)
res.cookie('XSRF-TOKEN', csrfToken, {
  httpOnly: false,  // Must be readable
  secure: true,
  sameSite: 'lax'
});

// Frontend reads and sends as header
const csrfToken = document.cookie
  .split('; ')
  .find(row => row.startsWith('XSRF-TOKEN='))
  ?.split('=')[1];

axios.post('/api/endpoint', data, {
  headers: { 'X-CSRF-Token': csrfToken }
});
```

#### 7. Add Session Timeout Warnings

**Enhance UX** with session expiry warnings:

```typescript
// src/components/SessionTimeoutWarning.tsx
export const SessionTimeoutWarning = () => {
  const { lastAuthTime } = useAuth();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const WARNING_THRESHOLD = 25 * 60 * 1000; // 25 minutes
    const checkTimeout = setInterval(() => {
      const timeSinceAuth = Date.now() - lastAuthTime;
      setShowWarning(timeSinceAuth >= WARNING_THRESHOLD);
    }, 60000); // Check every minute

    return () => clearInterval(checkTimeout);
  }, [lastAuthTime]);

  if (!showWarning) return null;

  return (
    <div className="session-warning">
      Your session will expire soon. Click here to stay logged in.
    </div>
  );
};
```

## Production Deployment Considerations

### Same-Domain Architecture (Recommended)

**Ideal setup**:
- Frontend: `https://phbhospital.com`
- Backend: `https://api.phbhospital.com`
- Cookies: `domain=.phbhospital.com` (shares across subdomains)

**Benefits**:
- Simpler cookie configuration
- No need for SameSite=None
- Better security (SameSite=Strict works)
- Easier CORS setup

### Cross-Domain Architecture (If Required)

If frontend/backend on different domains:

**Backend**:
```javascript
res.cookie('refreshToken', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',  // Required for cross-domain
  maxAge: 7 * 24 * 60 * 60 * 1000
});

app.use(cors({
  origin: 'https://phbfrontend.vercel.app',  // Specific, not '*'
  credentials: true
}));
```

**Additional security**: Implement anti-CSRF tokens (cookie-to-header pattern)

## Open Questions

1. **Backend cookie configuration**: What domain attribute does the Django backend currently set for cookies? (Needs backend code review)

2. **Production domain strategy**: Will production use same domain (api.phbhospital.com) or different domain (separate-api.com)?

3. **Mobile app considerations**: If native mobile apps are planned, will they use the same cookie-based auth or a different strategy (tokens in secure storage)?

4. **Multi-tab coordination**: Does the localStorage timestamp approach (`org_last_token_refresh`) adequately prevent race conditions when multiple tabs refresh simultaneously?

5. **Cookie size constraints**: How large are the JWT tokens? Are they within the 4KB cookie size limit?

## Related Research

- [SECURITY-REVIEW.md](./SECURITY-REVIEW.md) - Documents the recommendation to migrate to httpOnly cookies
- [IMPROVEMENT-ROADMAP.md](./IMPROVEMENT-ROADMAP.md) - P0-1 task details the authentication migration plan
- [SYSTEM-DESIGN.md](./SYSTEM-DESIGN.md) - Architecture overview showing triple-context authentication

## Testing Checklist

After implementing fixes, verify:

- [ ] Clear all browser cookies
- [ ] Access frontend via `http://localhost:5173/`
- [ ] Log in via OrganizationAuthContext
- [ ] Verify cookies are set (Chrome DevTools → Application → Cookies)
- [ ] Refresh browser (F5)
- [ ] Verify session persists (user still authenticated)
- [ ] Test with `http://127.0.0.1:5173/` separately (should also work if API_BASE_URL matches)
- [ ] Test cross-tab coordination (open two tabs, verify refresh coordination)
- [ ] Test session timeout (wait 30+ minutes, verify automatic logout)
- [ ] Test token refresh (monitor network tab for /api/token/refresh/ calls)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-18
**Next Review**: After P0 fixes implementation
**Maintained By**: PHB Development Team
