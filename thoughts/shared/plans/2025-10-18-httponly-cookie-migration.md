# HttpOnly Cookie Migration for Enhanced Security Implementation Plan

## Overview

Migrate JWT token storage from localStorage to httpOnly cookies to protect against XSS (Cross-Site Scripting) attacks in the PHB Healthcare System. This security enhancement will make authentication tokens inaccessible to JavaScript while maintaining seamless user experience.

## Current State Analysis

### What Exists Now

1. **Frontend Token Storage** (`src/features/auth/authContext.tsx:140, 252, 359`):
   - JWT tokens stored in localStorage
   - Tokens manually included in Authorization headers
   - 3 separate auth systems (user, professional, organization)
   - No automatic token refresh implementation

2. **Backend JWT Configuration** (`/Users/new/Newphb/basebackend/server/settings.py:33-39`):
   - Access token lifetime: 30 minutes
   - Refresh token lifetime: 1 day
   - Token rotation enabled
   - Tokens returned in JSON response body (not cookies)

3. **Security Vulnerabilities**:
   - ❌ **XSS Attack Surface**: localStorage tokens accessible to any JavaScript
   - ❌ **No httpOnly Protection**: Malicious scripts can steal tokens
   - ❌ **Multiple Token Locations**: 4+ different localStorage keys to secure
   - ❌ **No Automatic Refresh**: Users must re-login after 30 minutes

4. **Existing Infrastructure**:
   - ✅ CORS_ALLOW_CREDENTIALS = True (backend ready for cookies)
   - ✅ SESSION_COOKIE_SECURE = True (production settings configured)
   - ✅ CSRF middleware enabled
   - ✅ SameSite cookie support available

### Key Constraints

- Healthcare application handling sensitive patient data (HIPAA-adjacent)
- Cannot disrupt service for existing logged-in users
- Must maintain 3 separate auth systems (user, professional, organization)
- Mobile app compatibility considerations (cookies work differently)
- Third-party integrations (Paystack) must continue working

### Key Discoveries

- Backend infrastructure already configured for secure cookies
- JWT Simple JWT library supports cookie-based tokens
- CSRF protection already in place via middleware
- Token refresh rotation already enabled but not utilized
- WebSocket authentication needs special handling

## Desired End State

After this plan is complete:

1. ✅ JWT tokens stored in httpOnly cookies (inaccessible to JavaScript)
2. ✅ Automatic token refresh using refresh token cookie
3. ✅ CSRF protection properly configured for API endpoints
4. ✅ Secure cookies (Secure, HttpOnly, SameSite=Lax)
5. ✅ Seamless migration for existing users (no forced re-login)
6. ✅ localStorage cleaned up (only non-sensitive preferences remain)
7. ✅ Logout properly clears all cookies

### How to Verify:

**Automated Verification**:
- [ ] All backend tests pass: `cd /Users/new/Newphb/basebackend && python manage.py test`
- [ ] All frontend tests pass: `bun run test`
- [ ] TypeScript compilation succeeds: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Backend linting passes: `cd /Users/new/Newphb/basebackend && flake8 api/`
- [ ] Security scan passes: `bun audit`
- [ ] Build succeeds: `bun run build`

**Manual Verification**:
- [ ] Login succeeds and sets httpOnly cookies (visible in DevTools → Application → Cookies)
- [ ] JWT tokens NOT visible in localStorage
- [ ] API requests work without explicit Authorization header in code
- [ ] Token auto-refreshes before 30-minute expiry
- [ ] Logout clears all auth cookies
- [ ] CSRF token is properly sent with mutations
- [ ] 401 errors trigger re-authentication
- [ ] No XSS vulnerability (tokens inaccessible via console)

## What We're NOT Doing

- ❌ NOT changing the JWT token structure or claims
- ❌ NOT implementing OAuth2/OIDC (staying with JWT)
- ❌ NOT adding new authentication methods
- ❌ NOT changing user database schema
- ❌ NOT modifying password hashing or security
- ❌ NOT implementing multi-factor authentication (separate project)
- ❌ NOT changing API endpoint URLs
- ❌ NOT breaking mobile app compatibility (if it exists)

## Implementation Approach

**Strategy**: Phased migration with backwards compatibility, starting with backend cookie infrastructure, then frontend adoption, followed by localStorage cleanup.

**Reasoning**:
- **Security First**: HttpOnly cookies prevent XSS token theft
- **User Experience**: Auto-refresh reduces login interruptions
- **Compliance**: Better security posture for healthcare data
- **Industry Standard**: HttpOnly cookies are security best practice
- **Zero Downtime**: Dual-token support during migration prevents disruption

---

## Phase 1: Backend - JWT Cookie Support

### Overview
Add cookie-based JWT token setting to Django backend while maintaining backwards compatibility with Authorization header authentication.

### Changes Required:

#### 1. Create JWT Cookie Authentication Class
**File**: `/Users/new/Newphb/basebackend/api/auth.py` (add new class)
**Changes**: Add custom authentication class that checks both cookies and headers

```python
# Add after EmailBackend class (after line 30)

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings


class JWTCookieAuthentication(JWTAuthentication):
    """
    Custom JWT authentication that checks for tokens in cookies first,
    then falls back to Authorization header for backwards compatibility.
    """

    def authenticate(self, request):
        # First, try to get token from cookie
        cookie_name = getattr(settings, 'JWT_AUTH_COOKIE', 'access_token')
        raw_token = request.COOKIES.get(cookie_name)

        if raw_token is None:
            # Fall back to Authorization header
            return super().authenticate(request)

        # Validate the cookie token
        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except (InvalidToken, TokenError):
            # If cookie token is invalid, try header as fallback
            return super().authenticate(request)
```

#### 2. Update REST Framework Authentication Settings
**File**: `/Users/new/Newphb/basebackend/server/settings.py`
**Line**: 27-31
**Changes**: Add custom cookie authentication class

**Current**:
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
```

**New**:
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'api.auth.JWTCookieAuthentication',  # Checks cookies first, then headers
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # Fallback
    )
}
```

#### 3. Add JWT Cookie Configuration
**File**: `/Users/new/Newphb/basebackend/server/settings.py`
**After line 39** (after SIMPLE_JWT config)
**Changes**: Add cookie-specific JWT settings

```python
# JWT Cookie Configuration (after SIMPLE_JWT block)
JWT_AUTH_COOKIE = 'access_token'  # Cookie name for access token
JWT_AUTH_REFRESH_COOKIE = 'refresh_token'  # Cookie name for refresh token
JWT_AUTH_SAMESITE = 'Lax'  # Lax allows cookies on navigation, Strict blocks all cross-site
JWT_AUTH_SECURE = not DEBUG  # Only send cookies over HTTPS in production
JWT_AUTH_HTTPONLY = True  # Prevent JavaScript access to cookies
JWT_AUTH_COOKIE_MAX_AGE = 60 * 30  # 30 minutes (matches ACCESS_TOKEN_LIFETIME)
JWT_AUTH_REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24  # 1 day (matches REFRESH_TOKEN_LIFETIME)
```

#### 4. Create Cookie Utility Functions
**File**: `/Users/new/Newphb/basebackend/api/utils/cookie_helpers.py` (new file)
**Changes**: Create helper functions for setting and clearing JWT cookies

```python
from django.conf import settings
from datetime import datetime, timedelta


def set_jwt_cookies(response, access_token, refresh_token):
    """
    Set JWT access and refresh tokens as httpOnly cookies.

    Args:
        response: Django HttpResponse object
        access_token: JWT access token string
        refresh_token: JWT refresh token string

    Returns:
        Modified response object with cookies set
    """
    # Access token cookie
    response.set_cookie(
        key=settings.JWT_AUTH_COOKIE,
        value=access_token,
        max_age=settings.JWT_AUTH_COOKIE_MAX_AGE,
        httponly=settings.JWT_AUTH_HTTPONLY,
        secure=settings.JWT_AUTH_SECURE,
        samesite=settings.JWT_AUTH_SAMESITE,
        domain=settings.SESSION_COOKIE_DOMAIN if hasattr(settings, 'SESSION_COOKIE_DOMAIN') else None,
    )

    # Refresh token cookie
    response.set_cookie(
        key=settings.JWT_AUTH_REFRESH_COOKIE,
        value=refresh_token,
        max_age=settings.JWT_AUTH_REFRESH_COOKIE_MAX_AGE,
        httponly=settings.JWT_AUTH_HTTPONLY,
        secure=settings.JWT_AUTH_SECURE,
        samesite=settings.JWT_AUTH_SAMESITE,
        domain=settings.SESSION_COOKIE_DOMAIN if hasattr(settings, 'SESSION_COOKIE_DOMAIN') else None,
    )

    return response


def clear_jwt_cookies(response):
    """
    Clear JWT authentication cookies (used during logout).

    Args:
        response: Django HttpResponse object

    Returns:
        Modified response object with cookies cleared
    """
    response.delete_cookie(
        key=settings.JWT_AUTH_COOKIE,
        domain=settings.SESSION_COOKIE_DOMAIN if hasattr(settings, 'SESSION_COOKIE_DOMAIN') else None,
        samesite=settings.JWT_AUTH_SAMESITE,
    )

    response.delete_cookie(
        key=settings.JWT_AUTH_REFRESH_COOKIE,
        domain=settings.SESSION_COOKIE_DOMAIN if hasattr(settings, 'SESSION_COOKIE_DOMAIN') else None,
        samesite=settings.JWT_AUTH_SAMESITE,
    )

    return response
```

#### 5. Update Login View to Set Cookies
**File**: `/Users/new/Newphb/basebackend/api/views/auth/authentication.py`
**Lines**: 546-577 (token generation section)
**Changes**: Set JWT cookies in response

**Import at top of file**:
```python
from api.utils.cookie_helpers import set_jwt_cookies
```

**Current** (line 546-577):
```python
# Line 546
refresh = RefreshToken.for_user(user)

# Lines 569-577
return Response({
    "status": "success",
    "message": "Login successful",
    "tokens": {
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    },
    "user_data": user_data
})
```

**New**:
```python
# Line 546
refresh = RefreshToken.for_user(user)
access_token = str(refresh.access_token)
refresh_token = str(refresh)

# Create response with tokens in JSON (backwards compatibility)
response_data = {
    "status": "success",
    "message": "Login successful",
    "user_data": user_data,
    # Include tokens in response for backwards compatibility
    # Frontend can ignore these once migrated to cookie auth
    "tokens": {
        "access": access_token,
        "refresh": refresh_token
    }
}

response = Response(response_data)

# Set JWT tokens as httpOnly cookies
set_jwt_cookies(response, access_token, refresh_token)

return response
```

#### 6. Update OTP Verification View
**File**: `/Users/new/Newphb/basebackend/api/views/auth/authentication.py`
**Lines**: 683-714 (OTP verification response)
**Changes**: Set cookies after OTP verification

**Import at top of file** (if not already added):
```python
from api.utils.cookie_helpers import set_jwt_cookies
```

**Current** (lines 683-714):
```python
refresh = RefreshToken.for_user(user)

return Response({
    "status": "success",
    "message": "Login successful",
    "tokens": {
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    },
    "user_data": user_data
})
```

**New**:
```python
refresh = RefreshToken.for_user(user)
access_token = str(refresh.access_token)
refresh_token = str(refresh)

response_data = {
    "status": "success",
    "message": "Login successful",
    "user_data": user_data,
    "tokens": {
        "access": access_token,
        "refresh": refresh_token
    }
}

response = Response(response_data)
set_jwt_cookies(response, access_token, refresh_token)

return response
```

#### 7. Update Hospital Admin 2FA Verification View
**File**: `/Users/new/Newphb/basebackend/api/views/auth/hospital_admin_auth.py`
**Lines**: 645-690 (2FA token generation)
**Changes**: Set cookies for organization auth

**Import at top of file**:
```python
from api.utils.cookie_helpers import set_jwt_cookies
```

**Update token generation section** (around line 646):
```python
refresh = RefreshToken.for_user(user)
access_token = str(refresh.access_token)
refresh_token = str(refresh)

response_data = {
    "status": "success",
    "message": "Login successful",
    "user_data": {
        'id': user.id,
        'email': user.email,
        'full_name': f"{user.first_name} {user.last_name}".strip(),
        'role': 'hospital_admin',
        'hospital': {
            'id': hospital.id,
            'name': hospital.name,
            'code': hospital.registration_number
        },
        'password_change_required': password_change_required
    },
    "tokens": {
        "access": access_token,
        "refresh": refresh_token
    }
}

response = Response(response_data)
set_jwt_cookies(response, access_token, refresh_token)

return response
```

#### 8. Create Token Refresh with Cookie View
**File**: `/Users/new/Newphb/basebackend/api/views/auth/token_refresh.py` (new file)
**Changes**: Create custom token refresh view that works with cookies

```python
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.conf import settings
from api.utils.cookie_helpers import set_jwt_cookies, clear_jwt_cookies


class CookieTokenRefreshView(APIView):
    """
    Refresh JWT access token using refresh token from cookie.

    This endpoint reads the refresh token from the httpOnly cookie,
    validates it, and returns a new access token (also as a cookie).
    """
    permission_classes = []  # No authentication required for refresh
    authentication_classes = []  # Disable authentication for this endpoint

    def post(self, request):
        # Try to get refresh token from cookie first
        refresh_token = request.COOKIES.get(settings.JWT_AUTH_REFRESH_COOKIE)

        # Fall back to request body for backwards compatibility
        if not refresh_token:
            refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response(
                {'detail': 'Refresh token not found in cookie or request body'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            # Validate and refresh the token
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            # If rotation is enabled, get new refresh token
            if settings.SIMPLE_JWT.get('ROTATE_REFRESH_TOKENS', False):
                refresh.set_jti()
                refresh.set_exp()
                new_refresh_token = str(refresh)
            else:
                new_refresh_token = refresh_token

            response_data = {
                'status': 'success',
                'message': 'Token refreshed successfully',
                # Include tokens for backwards compatibility
                'tokens': {
                    'access': access_token,
                    'refresh': new_refresh_token
                }
            }

            response = Response(response_data, status=status.HTTP_200_OK)

            # Set new tokens as cookies
            set_jwt_cookies(response, access_token, new_refresh_token)

            return response

        except (TokenError, InvalidToken) as e:
            # Clear invalid cookies
            response = Response(
                {'detail': 'Invalid or expired refresh token'},
                status=status.HTTP_401_UNAUTHORIZED
            )
            clear_jwt_cookies(response)
            return response
```

#### 9. Update Logout View to Clear Cookies
**File**: `/Users/new/Newphb/basebackend/api/views/auth/authentication.py`
**Around line 663** (logout endpoint)
**Changes**: Clear JWT cookies on logout

**Import at top of file**:
```python
from api.utils.cookie_helpers import clear_jwt_cookies
```

**Find existing logout view and update** (create if doesn't exist):
```python
class LogoutView(APIView):
    """
    Logout user and clear authentication cookies.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # If refresh token provided, blacklist it
            refresh_token = request.COOKIES.get(settings.JWT_AUTH_REFRESH_COOKIE) or request.data.get('refresh')

            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Requires token_blacklist app

        except Exception as e:
            # Log error but don't fail logout
            print(f"Error blacklisting token: {e}")

        # Create response
        response = Response(
            {'status': 'success', 'message': 'Logged out successfully'},
            status=status.HTTP_200_OK
        )

        # Clear JWT cookies
        clear_jwt_cookies(response)

        return response
```

#### 10. Update URL Configuration
**File**: `/Users/new/Newphb/basebackend/server/urls.py`
**Around line 19-20**
**Changes**: Add cookie refresh endpoint

**Import at top**:
```python
from api.views.auth.token_refresh import CookieTokenRefreshView
```

**Add new URL pattern**:
```python
# Add after existing token endpoints (around line 20)
path('api/token/refresh-cookie/', CookieTokenRefreshView.as_view(), name='token_refresh_cookie'),
```

### Success Criteria:

#### Automated Verification:
- [ ] Backend tests pass: `cd /Users/new/Newphb/basebackend && python manage.py test api.tests.test_authentication`
- [ ] No Python syntax errors: `python -m py_compile api/auth.py api/utils/cookie_helpers.py`
- [ ] No import errors: `python manage.py check`
- [ ] Migrations clean: `python manage.py makemigrations --check --dry-run`

#### Manual Verification:
- [ ] POST `/api/login/` sets `access_token` and `refresh_token` cookies
- [ ] Cookies have `HttpOnly` flag set (check in DevTools)
- [ ] Cookies have `Secure` flag set in production
- [ ] Cookies have `SameSite=Lax` attribute
- [ ] GET `/api/profile/` works with cookie (no Authorization header)
- [ ] POST `/api/token/refresh-cookie/` returns new access token
- [ ] POST `/api/logout/` clears both cookies
- [ ] Backwards compatibility: Authorization header still works
- [ ] Invalid cookies are rejected with 401
- [ ] Token refresh rotation works (new refresh token issued)

**Implementation Note**: After completing this phase and all automated verification passes, deploy to staging environment and test thoroughly before proceeding to Phase 2.

---

## Phase 2: Frontend - Remove Authorization Header Logic

### Overview
Update frontend to rely on automatic cookie sending instead of manually adding Authorization headers. Maintain backwards compatibility during transition.

### Changes Required:

#### 1. Update Auth Context to Use Cookies
**File**: `src/features/auth/authContext.tsx`
**Lines**: 143-200 (apiRequest helper)
**Changes**: Remove Authorization header, add credentials: 'include'

**Current**:
```typescript
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  // ... rest of function
}
```

**New**:
```typescript
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  _token?: string | null  // Deprecated, kept for backwards compatibility
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Get CSRF token from cookie for mutations
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',  // Include cookies in cross-origin requests
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  // ... rest of function
}

// Helper function to read cookies
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}
```

#### 2. Update Login Handler to Not Store Tokens
**File**: `src/features/auth/authContext.tsx`
**Lines**: 347-371 (handleAuthSuccess function)
**Changes**: Remove localStorage token storage

**Current**:
```typescript
const handleAuthSuccess = (userData: User, token: string) => {
  setUser(userData);
  localStorage.setItem(AUTH_TOKEN_KEY, token);  // Line 359
  setOtpVerificationRequired(false);
};
```

**New**:
```typescript
const handleAuthSuccess = (userData: User, _token?: string) => {
  // Token parameter deprecated - now using httpOnly cookies
  // Backend sets cookies automatically, no client-side storage needed

  setUser(userData);
  setOtpVerificationRequired(false);

  // Clean up legacy localStorage tokens if they exist
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem('phb_token');
  localStorage.removeItem('phb_professional_token');
  localStorage.removeItem('phb_organization_token');

  console.log('✅ Authentication successful - tokens stored in secure httpOnly cookies');
};
```

#### 3. Remove Token Check from Initialization
**File**: `src/features/auth/authContext.tsx`
**Lines**: 249-341 (initialization useEffect)
**Changes**: Check auth status via API call instead of localStorage token

**Current**:
```typescript
useEffect(() => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);  // Line 252

  if (token) {
    // Validate token by fetching profile
    const userData = await apiRequest<User>('/api/profile/', 'GET', undefined, token);
    setUser(userData);
  }
}, []);
```

**New**:
```typescript
useEffect(() => {
  // Check if user is authenticated by making an API call
  // If httpOnly cookie exists and is valid, backend will authenticate us
  const checkAuthStatus = async () => {
    try {
      // This will succeed if valid access_token cookie exists
      const userData = await apiRequest<User>('/api/profile/', 'GET');
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      // Not authenticated or token expired
      if (error.status === 401) {
        // Try to refresh token
        try {
          await apiRequest('/api/token/refresh-cookie/', 'POST');
          // Retry profile fetch after refresh
          const userData = await apiRequest<User>('/api/profile/', 'GET');
          setUser(userData);
          setIsAuthenticated(true);
        } catch (refreshError) {
          // Refresh failed - user needs to log in
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  checkAuthStatus();
}, []);
```

#### 4. Update Logout to Call Backend Endpoint
**File**: `src/features/auth/authContext.tsx`
**Lines**: 645-671 (logout function)
**Changes**: Call backend logout to clear cookies

**Current**:
```typescript
const logout = async () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem('phb_professional_user');
  setUser(null);
  setPrimaryHospital(null);
  setHasPrimaryHospital(false);
  localStorage.removeItem('phb_view_preference');

  try {
    await apiRequest('/api/logout/', 'POST');
  } catch (err) {
    console.error('Error during logout:', err);
  }

  return Promise.resolve();
};
```

**New**:
```typescript
const logout = async () => {
  // Clear local state first
  setUser(null);
  setPrimaryHospital(null);
  setHasPrimaryHospital(false);
  setIsAuthenticated(false);

  // Clean up localStorage (preferences can stay)
  localStorage.removeItem('phb_professional_user');
  localStorage.removeItem('phb_view_preference');

  try {
    // Call backend to clear httpOnly cookies
    await apiRequest('/api/logout/', 'POST');
    console.log('✅ Logged out successfully - cookies cleared');
  } catch (err) {
    console.error('Error during logout:', err);
    // Even if backend fails, user is logged out locally
  }

  return Promise.resolve();
};
```

#### 5. Add Automatic Token Refresh Logic
**File**: `src/features/auth/authContext.tsx`
**After initialization useEffect** (create new useEffect)
**Changes**: Add background token refresh before expiry

```typescript
// Automatic token refresh (runs every 25 minutes, before 30-minute expiry)
useEffect(() => {
  if (!isAuthenticated) return;

  const refreshInterval = setInterval(async () => {
    try {
      console.log('🔄 Refreshing access token...');
      await apiRequest('/api/token/refresh-cookie/', 'POST');
      console.log('✅ Access token refreshed successfully');
    } catch (error) {
      console.error('❌ Failed to refresh token:', error);
      // If refresh fails, user will be prompted to log in on next API call
      setIsAuthenticated(false);
      setUser(null);
    }
  }, 25 * 60 * 1000); // 25 minutes (5 minutes before expiry)

  return () => clearInterval(refreshInterval);
}, [isAuthenticated]);
```

#### 6. Update All Service Files to Use credentials: 'include'
**Files to update**:
- `src/services/paymentService.ts`
- `src/services/guidelinesService.ts`
- `src/services/staffService.ts`
- `src/services/appointmentService.ts`
- `src/services/womensHealthApi.ts`

**Pattern for all services**:

**Current pattern**:
```typescript
const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

**New pattern**:
```typescript
const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',  // Send cookies automatically
});

// For mutations, add CSRF token
if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken;
  }
}
```

#### 7. Update Organization Auth Context
**File**: `src/features/organization/organizationAuthContext.tsx`
**Lines**: Throughout file (multiple changes)
**Changes**: Remove localStorage token storage, use cookies

**Remove token storage** (around line 448):
```typescript
// DELETE THIS:
localStorage.setItem('organizationAuth', JSON.stringify(authData));

// REPLACE WITH:
// Tokens now stored in httpOnly cookies by backend
// No client-side token storage needed
setUserData(authData.user_data);
setIsAuthenticated(true);
```

**Update API calls to use credentials**:
```typescript
const response = await fetch('http://127.0.0.1:8000/api/hospitals/admin/login/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',  // Add this
  body: JSON.stringify({
    email,
    password,
    hospital_code
  })
});
```

#### 8. Create CSRF Token Utility
**File**: `src/utils/csrf.ts` (new file)
**Changes**: Centralized CSRF token handling

```typescript
/**
 * Get CSRF token from cookie.
 * Django sets csrftoken cookie which must be sent in X-CSRFToken header for mutations.
 */
export function getCsrfToken(): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; csrftoken=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

/**
 * Add CSRF token to request headers if needed.
 */
export function addCsrfHeader(headers: HeadersInit, method: string): HeadersInit {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      return {
        ...headers,
        'X-CSRFToken': csrfToken,
      };
    }
  }
  return headers;
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation succeeds: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Application builds successfully: `bun run build`
- [ ] No console errors on page load
- [ ] All frontend tests pass: `bun run test`

#### Manual Verification:
- [ ] Login succeeds without storing tokens in localStorage
- [ ] DevTools → Application → Cookies shows `access_token` and `refresh_token`
- [ ] DevTools → Application → Local Storage has NO auth tokens
- [ ] API requests succeed without Authorization header in Network tab
- [ ] CSRF token sent in X-CSRFToken header for POST/PUT/DELETE
- [ ] Token auto-refreshes every 25 minutes (check Network tab)
- [ ] Logout clears cookies (verify in DevTools)
- [ ] Hard refresh maintains authentication (cookies persist)
- [ ] Opening in new tab maintains authentication
- [ ] Private/incognito mode requires new login

**Implementation Note**: After completing this phase, coordinate with backend team to ensure both phases are deployed simultaneously to avoid authentication failures.

---

## Phase 3: Migration Strategy for Existing Users

### Overview
Handle graceful migration for users with existing localStorage tokens, ensuring no forced logout during deployment.

### Changes Required:

#### 1. Create Migration Detection Service
**File**: `src/services/authMigration.ts` (new file)
**Changes**: Detect and migrate legacy localStorage tokens

```typescript
import { API_BASE_URL } from '../utils/config';

/**
 * Detect if user has legacy localStorage token and migrate to cookie-based auth.
 */
export async function migrateLegacyAuth(): Promise<boolean> {
  const legacyTokenKeys = [
    'phb_auth_token',
    'phb_professional_token',
    'phb_organization_token',
  ];

  // Check for any legacy tokens
  const legacyToken = legacyTokenKeys
    .map(key => localStorage.getItem(key))
    .find(token => token !== null);

  if (!legacyToken) {
    return false; // No migration needed
  }

  console.log('🔄 Migrating legacy localStorage token to httpOnly cookies...');

  try {
    // Call migration endpoint with legacy token
    const response = await fetch(`${API_BASE_URL}/api/auth/migrate-to-cookies/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${legacyToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Migration failed');
    }

    // Backend has set httpOnly cookies
    // Clean up localStorage
    legacyTokenKeys.forEach(key => localStorage.removeItem(key));

    console.log('✅ Migration successful - using httpOnly cookies now');
    return true;

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return false;
  }
}
```

#### 2. Create Backend Migration Endpoint
**File**: `/Users/new/Newphb/basebackend/api/views/auth/migration.py` (new file)
**Changes**: Create endpoint to exchange localStorage token for cookies

```python
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from api.utils.cookie_helpers import set_jwt_cookies


class MigrateToCookiesView(APIView):
    """
    Exchange localStorage token for httpOnly cookie tokens.

    This endpoint allows clients with localStorage tokens to migrate
    to cookie-based authentication without requiring re-login.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # User is already authenticated via Authorization header
        user = request.user

        # Generate new token pair
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response_data = {
            'status': 'success',
            'message': 'Successfully migrated to cookie-based authentication',
            'user_data': {
                'id': user.id,
                'email': user.email,
                'full_name': f"{user.first_name} {user.last_name}".strip(),
            }
        }

        response = Response(response_data, status=status.HTTP_200_OK)

        # Set JWT tokens as httpOnly cookies
        set_jwt_cookies(response, access_token, refresh_token)

        return response
```

#### 3. Add Migration URL
**File**: `/Users/new/Newphb/basebackend/server/urls.py`
**Changes**: Add migration endpoint

```python
from api.views.auth.migration import MigrateToCookiesView

# Add to urlpatterns
path('api/auth/migrate-to-cookies/', MigrateToCookiesView.as_view(), name='migrate_to_cookies'),
```

#### 4. Call Migration on App Initialization
**File**: `src/features/auth/authContext.tsx`
**In initialization useEffect** (update from Phase 2)
**Changes**: Attempt migration before checking cookie auth

```typescript
useEffect(() => {
  const initialize = async () => {
    try {
      // First, try to migrate legacy localStorage tokens
      const migrated = await migrateLegacyAuth();

      if (migrated) {
        console.log('✅ Migrated from localStorage to httpOnly cookies');
      }

      // Now check authentication status (using cookies)
      const checkAuthStatus = async () => {
        try {
          const userData = await apiRequest<User>('/api/profile/', 'GET');
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error: any) {
          if (error.status === 401) {
            // Try to refresh token
            try {
              await apiRequest('/api/token/refresh-cookie/', 'POST');
              const userData = await apiRequest<User>('/api/profile/', 'GET');
              setUser(userData);
              setIsAuthenticated(true);
            } catch (refreshError) {
              setUser(null);
              setIsAuthenticated(false);
            }
          }
        }
      };

      await checkAuthStatus();

    } catch (error) {
      console.error('Initialization error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  initialize();
}, []);
```

### Success Criteria:

#### Automated Verification:
- [ ] Migration endpoint responds correctly: `python manage.py test api.tests.test_migration`
- [ ] TypeScript compilation succeeds: `bun run typecheck`
- [ ] No linting errors: `bun run lint`

#### Manual Verification:
- [ ] User with localStorage token gets migrated automatically on page load
- [ ] After migration, localStorage tokens are deleted
- [ ] After migration, httpOnly cookies are set
- [ ] User remains logged in during migration (no disruption)
- [ ] Migration only runs once (not on every page load)
- [ ] New users (no localStorage) skip migration
- [ ] Migration failure doesn't break authentication (falls back gracefully)

**Implementation Note**: This migration code can be removed 3 months after deployment once all users have been migrated.

---

## Phase 4: Security Hardening & Testing

### Overview
Add additional security measures, comprehensive testing, and monitoring.

### Changes Required:

#### 1. Add Content Security Policy Header
**File**: `/Users/new/Newphb/basebackend/server/settings.py`
**After middleware configuration**
**Changes**: Add CSP middleware for XSS protection

```python
# Add to MIDDLEWARE list (after line 75)
'csp.middleware.CSPMiddleware',

# Add CSP configuration after CORS settings
# Content Security Policy - XSS protection
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.paystack.co")
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'", "https://fonts.googleapis.com")
CSP_FONT_SRC = ("'self'", "https://fonts.gstatic.com")
CSP_IMG_SRC = ("'self'", "data:", "https:")
CSP_CONNECT_SRC = ("'self'", "https://api.paystack.co")
CSP_FRAME_SRC = ("https://js.paystack.co",)  # Paystack payment iframe
```

#### 2. Install CSP Package
**File**: `/Users/new/Newphb/basebackend/requirements.txt`
**Changes**: Add django-csp package

```
django-csp==3.7
```

#### 3. Add Security Logging
**File**: `/Users/new/Newphb/basebackend/api/middleware/security_logging.py` (new file)
**Changes**: Log authentication events

```python
import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger('security')


class SecurityLoggingMiddleware(MiddlewareMixin):
    """
    Log security-relevant events for monitoring and audit.
    """

    def process_request(self, request):
        # Log authentication failures
        if request.path == '/api/login/' and request.method == 'POST':
            logger.info(f"Login attempt from {request.META.get('REMOTE_ADDR')}")

    def process_response(self, request, response):
        # Log authentication failures
        if request.path == '/api/login/' and response.status_code == 401:
            logger.warning(f"Failed login attempt from {request.META.get('REMOTE_ADDR')}")

        # Log successful logins
        if request.path == '/api/login/' and response.status_code == 200:
            logger.info(f"Successful login from {request.META.get('REMOTE_ADDR')}")

        # Log cookie setting
        if 'Set-Cookie' in response:
            if 'access_token' in response['Set-Cookie']:
                logger.info(f"JWT cookie set for user {getattr(request.user, 'email', 'unknown')}")

        return response
```

#### 4. Create Comprehensive Test Suite
**File**: `/Users/new/Newphb/basebackend/api/tests/test_cookie_auth.py` (new file)
**Changes**: Add tests for cookie authentication

```python
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()


class CookieAuthenticationTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User',
            is_verified=True
        )

    def test_login_sets_cookies(self):
        """Test that login sets httpOnly cookies"""
        response = self.client.post('/api/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })

        self.assertEqual(response.status_code, 200)

        # Check access token cookie
        self.assertIn('access_token', response.cookies)
        access_cookie = response.cookies['access_token']
        self.assertTrue(access_cookie['httponly'])
        self.assertEqual(access_cookie['samesite'], 'Lax')

        # Check refresh token cookie
        self.assertIn('refresh_token', response.cookies)
        refresh_cookie = response.cookies['refresh_token']
        self.assertTrue(refresh_cookie['httponly'])

    def test_authenticated_request_with_cookie(self):
        """Test that API requests work with cookie authentication"""
        # Login first
        self.client.post('/api/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })

        # Make authenticated request (cookies sent automatically by test client)
        response = self.client.get('/api/profile/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['email'], 'test@example.com')

    def test_token_refresh_with_cookie(self):
        """Test token refresh using refresh token cookie"""
        # Login first
        self.client.post('/api/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })

        # Refresh token
        response = self.client.post('/api/token/refresh-cookie/')

        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', response.cookies)

    def test_logout_clears_cookies(self):
        """Test that logout clears authentication cookies"""
        # Login first
        self.client.post('/api/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })

        # Logout
        response = self.client.post('/api/logout/')

        self.assertEqual(response.status_code, 200)

        # Check cookies are cleared (max_age=0)
        access_cookie = response.cookies.get('access_token')
        if access_cookie:
            self.assertEqual(access_cookie['max-age'], 0)

    def test_invalid_cookie_rejected(self):
        """Test that invalid cookies are rejected"""
        # Set invalid cookie
        self.client.cookies['access_token'] = 'invalid.token.here'

        response = self.client.get('/api/profile/')

        self.assertEqual(response.status_code, 401)

    def test_backwards_compatibility_with_header(self):
        """Test that Authorization header still works during migration"""
        # Login to get token
        response = self.client.post('/api/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })

        token = response.json()['tokens']['access']

        # Use token in Authorization header (old method)
        response = self.client.get(
            '/api/profile/',
            HTTP_AUTHORIZATION=f'Bearer {token}'
        )

        self.assertEqual(response.status_code, 200)
```

#### 5. Create Frontend E2E Tests
**File**: `src/tests/e2e/cookie-auth.test.ts` (new file)
**Changes**: Add E2E tests for cookie authentication

```typescript
import { test, expect } from '@playwright/test';

test.describe('Cookie Authentication', () => {
  test('login sets httpOnly cookies', async ({ page, context }) => {
    await page.goto('/login');

    // Fill login form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');

    // Wait for redirect after successful login
    await page.waitForURL('/dashboard');

    // Check cookies
    const cookies = await context.cookies();
    const accessTokenCookie = cookies.find(c => c.name === 'access_token');
    const refreshTokenCookie = cookies.find(c => c.name === 'refresh_token');

    expect(accessTokenCookie).toBeDefined();
    expect(accessTokenCookie?.httpOnly).toBe(true);
    expect(accessTokenCookie?.sameSite).toBe('Lax');

    expect(refreshTokenCookie).toBeDefined();
    expect(refreshTokenCookie?.httpOnly).toBe(true);
  });

  test('cookies are not accessible via JavaScript', async ({ page }) => {
    await page.goto('/login');

    // Login
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');

    // Try to access cookies via JavaScript (should fail for httpOnly cookies)
    const cookiesFromJS = await page.evaluate(() => document.cookie);

    expect(cookiesFromJS).not.toContain('access_token');
    expect(cookiesFromJS).not.toContain('refresh_token');
  });

  test('logout clears cookies', async ({ page, context }) => {
    await page.goto('/login');

    // Login
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');

    // Logout
    await page.click('[data-testid="logout-button"]');
    await page.waitForURL('/login');

    // Check cookies are cleared
    const cookies = await context.cookies();
    const accessTokenCookie = cookies.find(c => c.name === 'access_token');
    const refreshTokenCookie = cookies.find(c => c.name === 'refresh_token');

    expect(accessTokenCookie).toBeUndefined();
    expect(refreshTokenCookie).toBeUndefined();
  });

  test('authentication persists across page refresh', async ({ page }) => {
    await page.goto('/login');

    // Login
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');

    // Refresh page
    await page.reload();

    // Should still be on dashboard (authenticated)
    expect(page.url()).toContain('/dashboard');
  });
});
```

### Success Criteria:

#### Automated Verification:
- [ ] All backend tests pass: `python manage.py test`
- [ ] All frontend tests pass: `bun run test`
- [ ] E2E tests pass: `npx playwright test`
- [ ] Security audit passes: `bun audit`
- [ ] No high-severity vulnerabilities
- [ ] CSP policy validates: Check browser console for CSP violations
- [ ] Linting passes on all new code

#### Manual Verification:
- [ ] XSS test: Try `document.cookie` in console → should NOT show access_token
- [ ] CSRF test: External site cannot make authenticated requests
- [ ] Cookie inspection: Verify HttpOnly, Secure, SameSite flags in DevTools
- [ ] Token refresh: Monitor Network tab → auto-refresh happens every 25 minutes
- [ ] Multiple tabs: Login in one tab → authenticated in other tabs
- [ ] Private browsing: Cookies cleared when closing private window
- [ ] Security headers: Check response headers include CSP, X-Frame-Options, etc.
- [ ] Penetration testing: Run OWASP ZAP or similar security scanner

**Implementation Note**: Schedule security audit with external security team before production deployment.

---

## Testing Strategy

### Unit Tests

**Backend**:
```bash
# Run all authentication tests
cd /Users/new/Newphb/basebackend
python manage.py test api.tests.test_cookie_auth

# Run specific test
python manage.py test api.tests.test_cookie_auth.CookieAuthenticationTestCase.test_login_sets_cookies
```

**Frontend**:
```bash
# Run all tests
bun run test

# Run with coverage
bun run test --coverage
```

### Integration Tests

**Full authentication flow**:
1. User registers → receives verification email
2. User verifies email → account activated
3. User logs in → cookies set
4. User makes API requests → authenticated via cookie
5. Token auto-refreshes → new cookies set
6. User logs out → cookies cleared

### E2E Tests

```bash
# Run Playwright tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific test file
npx playwright test src/tests/e2e/cookie-auth.test.ts
```

### Manual Testing Steps

1. **Fresh Installation Test**:
   - Clear all localStorage and cookies
   - Create new account
   - Verify cookies are set (no localStorage)
   - Test all features work correctly

2. **Migration Test**:
   - Login with old version (localStorage tokens)
   - Deploy new version
   - Verify automatic migration to cookies
   - Verify localStorage cleaned up

3. **Security Test**:
   - Open DevTools console
   - Try `document.cookie` → should NOT show access_token
   - Try `localStorage.getItem('phb_auth_token')` → should be null
   - Verify XSS prevention

4. **Multi-Device Test**:
   - Login on desktop
   - Open same account on mobile
   - Verify both sessions work independently
   - Logout on one → other remains active

5. **Token Expiry Test**:
   - Login and wait 25 minutes
   - Verify automatic refresh in Network tab
   - Wait 31 minutes without activity
   - Verify next API call triggers re-authentication

## Performance Considerations

- **Cookie Overhead**: ~200 bytes per request (minimal impact)
- **Auto-Refresh**: Background refresh every 25 minutes (low overhead)
- **localStorage Cleanup**: One-time operation during migration
- **CSRF Token**: Additional header on mutations (~50 bytes)

**Expected Performance**:
- No noticeable latency increase
- Slightly larger request/response headers
- Background refresh invisible to users

## Migration Notes

### Rollout Strategy

**Phase 1 - Week 1**: Backend deployment
- Deploy cookie support to backend
- Maintain backwards compatibility with headers
- Monitor for issues

**Phase 2 - Week 2**: Frontend deployment
- Deploy frontend with cookie support
- Automatic migration for existing users
- Monitor migration success rate

**Phase 3 - Week 3**: Monitoring
- Monitor security logs
- Check for authentication errors
- Gather user feedback

**Phase 4 - Month 2**: Cleanup
- Remove backwards compatibility code
- Remove migration endpoint
- Update documentation

### Backwards Compatibility Timeline

- **Month 1**: Both cookies and Authorization headers supported
- **Month 2**: Migration code can be removed (all users migrated)
- **Month 3**: Remove Authorization header fallback (cookies only)

### Rollback Plan

If critical issues arise:

1. **Backend Rollback**:
   - Remove JWTCookieAuthentication from settings
   - Revert to standard JWTAuthentication
   - Redeploy previous backend version

2. **Frontend Rollback**:
   - Revert to localStorage-based auth
   - Redeploy previous frontend version
   - Users will need to re-login

3. **Database**: No database changes, no migration needed

## References

- Original research: `thoughts/shared/research/2025-10-18-cookie-usage.md`
- Related plan: `thoughts/shared/plans/2025-10-18-cookie-documentation-alignment.md`
- Django REST Framework Simple JWT: https://django-rest-framework-simplejwt.readthedocs.io/
- OWASP Cookie Security: https://owasp.org/www-community/controls/SecureCookieAttribute
- MDN HTTP Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- SameSite Cookie Explanation: https://web.dev/samesite-cookies-explained/
- CSRF Protection in Django: https://docs.djangoproject.com/en/4.2/ref/csrf/

## Success Metrics

### Completion Criteria
- [ ] All 4 phases implemented and verified
- [ ] All automated tests pass (backend + frontend + E2E)
- [ ] Security audit completed with no critical issues
- [ ] 95%+ migration success rate for existing users
- [ ] Zero authentication-related errors in production
- [ ] Documentation updated

### Post-Deployment Monitoring

**Week 1**:
- Monitor authentication error rates
- Check cookie setting success rates
- Track migration completion percentage
- Monitor security logs for suspicious activity

**Week 2-4**:
- Analyze user feedback
- Monitor auto-refresh success rate
- Track logout success rate
- Check for any cookie-related browser compatibility issues

**Month 2**:
- Security penetration testing
- Performance benchmarking
- Prepare for backwards compatibility removal

---

**Plan Status**: Ready for implementation
**Estimated Effort**: 3-5 days (8-12 hours backend, 8-12 hours frontend, 8 hours testing)
**Risk Level**: Medium (authentication changes always carry risk, but well-tested)
**Dependencies**: Requires coordination between backend and frontend deployments
**Blocking**: Should deploy documentation alignment plan first to set user expectations