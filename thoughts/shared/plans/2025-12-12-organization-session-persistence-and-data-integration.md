---
date: 2025-12-12
author: Claude
git_commit: b1b01de1a24739f0e33ab785d2e536faabdd184b
branch: main
repository: phbfrontend
topic: "Organization Session Persistence, Token Refresh Fixes, and Real-Time Data Integration"
tags: [implementation-plan, organization, authentication, session-management, token-refresh, data-integration, api, cookies]
status: ready-for-implementation
priority: critical
---

# Organization Session Persistence, Token Refresh Fixes, and Real-Time Data Integration

**Date**: 2025-12-12
**Author**: Claude
**Status**: Ready for Implementation
**Priority**: Critical

## Overview

This implementation plan addresses three critical issues affecting the organization dashboard system:

1. **Session Persistence Issue**: Users are logged out immediately on browser refresh due to cookie domain mismatch
2. **Token Refresh Broken**: Automatic token refresh mechanism has multiple bugs preventing it from working
3. **Data Integration Needed**: 18 organization pages currently show static UI or mock data instead of real-time backend data

All three issues will be resolved in a phased approach to ensure system stability and complete functionality.

## Current State Analysis

### Issue #1: Session Persistence Problem

**Symptom**: Users are logged out immediately when refreshing the browser, consistently across all organization pages.

**Root Cause**: Cookie domain mismatch between `localhost` and `127.0.0.1`.

**Current Implementation** (`src/utils/config.ts:6`):
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';
```

**Environment File** (`.env:9`):
```
VITE_API_BASE_URL=http://localhost:8000
```

**The Problem**:
- Browsers treat `localhost` and `127.0.0.1` as separate domains
- If cookies are set for `localhost:8000` during login, but a request goes to `127.0.0.1:8000`, cookies won't be sent
- The profile endpoint (`/api/organizations/profile/`) returns 401/403
- `initializeAuth()` sets `isAuthenticated: false` → user logged out

### Issue #2: Token Refresh Mechanism Bugs

The automatic token refresh has **3 critical bugs** preventing it from working:

#### Bug #1: Expired Refresh Tokens Don't Trigger Logout
**Location**: `src/features/organization/organizationAuthContext.tsx:107-122`

**Current Code**:
```typescript
if (!response.ok) {
  console.error('❌ Organization: Token refresh failed');
  return false;  // ❌ Just returns, doesn't log out
}

const data = await response.json();
if (data.status === 'success') {
  // Success handling
  return true;
}

return false; // ❌ Catch block at lines 125-133 never executes
```

**The Problem**:
- When refresh token expires (401/403), the function returns `false` at line 122
- The catch block at lines 123-135 only catches network errors, not HTTP error responses
- Logout logic at lines 125-133 never executes
- User stays in broken authenticated state where `isAuthenticated: true` but all API calls fail

#### Bug #2: Silent Failures
**Location**: `src/features/organization/organizationAuthContext.tsx:107-109`

**Current Code**:
```typescript
if (!response.ok) {
  console.error('❌ Organization: Token refresh failed');
  return false;
}
```

**The Problem**:
- No logging of HTTP status code
- No logging of response body/error message
- Makes debugging impossible

#### Bug #3: Race Conditions
**Location**: Multiple refresh triggers throughout the file

**The Problem**:
- Timer-based refresh (line 153)
- Visibility-based refresh (line 182)
- Activity-based refresh (line 207)

All three can fire simultaneously with no mutex/lock, potentially causing:
- Duplicate refresh requests
- Token rotation conflicts
- Race conditions in `lastAuthTime` state updates

### Issue #3: Data Integration Status

**Pages Needing Work**: 18 pages total

**Category 1: Static UI Only (7 pages)**
- `src/pages/organization/ClinicalManagementPage.tsx` - Tab interface only
- `src/pages/organization/PharmacyManagementPage.tsx` - Empty stat cards
- `src/pages/organization/LabTechnicianPage.tsx` - Empty structure
- `src/pages/organization/StaffManagementPage.tsx` - 1 hardcoded doctor
- `src/pages/organization/ReportsPage.tsx` - Placeholder charts
- `src/pages/organization/PatientRegistrationPage.tsx` - Static form
- `src/pages/organization/settings/PriceListPage.tsx` - Empty table
- `src/pages/organization/settings/HealthPackagesPage.tsx` - Empty state

**Category 2: Mock/Hardcoded Data (5 pages)**
- `src/pages/organization/PatientManagementPage.tsx` - 3 fake patients
- `src/pages/organization/RadiologyPage.tsx` - 5 fake radiology requests
- `src/pages/organization/BillingManagementPage.tsx` - 5 fake invoices
- `src/pages/organization/settings/RoleManagementPage.tsx` - Hardcoded roles
- `src/pages/organization/settings/TemplateLibraryPage.tsx` - Hardcoded templates

**Category 3: Already API-Integrated (10 pages - ✅)**
- `ModernOrganizationDashboard` ✅
- `AnalyticsPage` ✅
- `AppointmentsPage` ✅
- `WardManagementPage` ✅
- And 6 more...

## Desired End State

### Success Criteria:

1. **Session Persistence**:
   - Users remain logged in after browser refresh
   - Works consistently across `localhost` and `127.0.0.1` domains
   - Works across different ports (5173 frontend, 8000 backend)
   - Cookies are properly sent with all API requests

2. **Token Refresh**:
   - Access tokens automatically refresh every 25 minutes
   - Expired refresh tokens trigger proper logout with user notification
   - No race conditions between multiple refresh triggers
   - Comprehensive error logging for debugging
   - Works reliably during long idle periods

3. **Data Integration**:
   - All 18 pages display real-time data from backend APIs
   - Proper loading states during data fetch
   - User-friendly error handling when APIs fail
   - Consistent data patterns across all pages

### How to Verify:

**Session Persistence Verification**:
1. Login at `http://localhost:5173/organization/login`
2. Navigate to dashboard
3. Hard refresh browser (Cmd/Ctrl + Shift + R)
4. User should remain logged in
5. Repeat test at `http://127.0.0.1:5173/organization/login`

**Token Refresh Verification**:
1. Login and remain active for 26+ minutes
2. Check Network tab: should see POST to `/api/token/refresh/` every 25 minutes
3. Check Console: should see "✅ Organization: Token refresh successful"
4. Make API calls after 26 minutes: should work without re-login

**Data Integration Verification**:
1. Navigate to each page in the sidebar
2. Verify real data is displayed (not mock/hardcoded)
3. Check loading states appear during fetch
4. Verify errors are handled gracefully

## What We're NOT Doing

To prevent scope creep, we explicitly exclude:

1. **NOT changing authentication flow** - Login and 2FA process remains unchanged
2. **NOT modifying backend cookie settings** - Assumes backend is correctly configured
3. **NOT adding new features** - Only fixing existing functionality
4. **NOT creating new backend APIs** - Only using existing endpoints (will document required APIs)
5. **NOT redesigning UI** - Pages keep current design, just add real data
6. **NOT implementing offline mode** - Session requires active backend connection
7. **NOT adding biometric authentication** - Sticking with email/password/OTP
8. **NOT implementing remember-me** - Using httpOnly cookies as-is

## Implementation Approach

### Strategy:

**Phased Rollout**: Fix critical issues first (session + token), then data integration
**Incremental Testing**: Test each fix independently before moving to next phase
**Backward Compatibility**: Ensure changes don't break existing functionality
**Comprehensive Logging**: Add detailed logging for debugging future issues

### Risk Mitigation:

1. **Backup Current State**: Create git branch before changes
2. **Test with Credentials**: Use provided test account at each phase
3. **Console Monitoring**: Watch browser console for errors during testing
4. **Network Monitoring**: Verify cookies and API calls in Network tab
5. **Incremental Commits**: Commit after each successful phase

---

## Phase 1: Fix Cookie Domain Configuration for Session Persistence

### Overview
Fix the cookie domain mismatch issue to ensure sessions persist across browser refreshes, regardless of whether users access via `localhost` or `127.0.0.1`.

### Changes Required:

#### 1. Update API Configuration

**File**: `src/utils/config.ts`

**Current Code** (lines 5-8):
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';

export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
```

**New Code**:
```typescript
// Normalize domain to always use localhost in development for consistent cookie behavior
// Browsers treat localhost and 127.0.0.1 as separate domains, causing cookie issues
const normalizeApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';

  // In development, always use localhost for consistent cookie domain
  // This ensures cookies set by backend are accessible by frontend
  if (import.meta.env.DEV) {
    return envUrl.replace('127.0.0.1', 'localhost');
  }

  return envUrl;
};

export const API_BASE_URL = normalizeApiBaseUrl();

export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// Log configuration in development for debugging
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    API_BASE_URL,
    env: import.meta.env.VITE_API_BASE_URL,
    mode: import.meta.env.MODE
  });
}
```

**Explanation**:
- Normalizes domain to always use `localhost` in development
- Replaces any `127.0.0.1` references with `localhost`
- Ensures cookies set at `localhost:8000` are sent to `localhost:8000`
- Adds debug logging to verify configuration

#### 2. Update Environment Configuration

**File**: `.env`

**Current Content** (line 9):
```
VITE_API_BASE_URL=http://localhost:8000
```

**Keep as-is** ✅ - Already correct

**Add documentation comment**:
```
# IMPORTANT: Use 'localhost' not '127.0.0.1' for consistent cookie behavior
# Browsers treat these as separate domains, causing session issues
VITE_API_BASE_URL=http://localhost:8000
```

#### 3. Add Cookie Domain Verification Utility

**File**: `src/utils/cookieDebug.ts` (NEW FILE)

**Purpose**: Helper to debug cookie issues in development

**Code**:
```typescript
/**
 * Cookie Debugging Utility
 *
 * Helps diagnose cookie-related authentication issues in development.
 * Run in browser console: window.debugCookies()
 */

export const debugCookies = () => {
  const cookies = document.cookie.split(';').map(c => c.trim());

  console.group('🍪 Cookie Debug Information');
  console.log('Current URL:', window.location.href);
  console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('');

  console.log('All Cookies:', cookies.length > 0 ? cookies : 'None found');
  console.log('');

  console.log('⚠️ Note: HttpOnly cookies (access_token, refresh_token) are NOT visible here');
  console.log('Check Application > Cookies in DevTools to see them');
  console.log('');

  console.log('Expected cookies for authentication:');
  console.log('  - access_token (HttpOnly) at localhost:8000');
  console.log('  - refresh_token (HttpOnly) at localhost:8000');
  console.groupEnd();
};

// Expose to window for console access
if (import.meta.env.DEV) {
  (window as any).debugCookies = debugCookies;
}
```

#### 4. Add Authentication State Debugging

**File**: `src/features/organization/organizationAuthContext.tsx`

**Add after line 94** (after state declarations):
```typescript
// Debug helper - expose auth state to window in development
React.useEffect(() => {
  if (import.meta.env.DEV) {
    (window as any).getOrgAuthState = () => ({
      isAuthenticated,
      isLoading,
      isInitialized,
      needsVerification,
      hasUserData: !!userData,
      userEmail: userData?.email,
      organizationName: userData?.hospital?.name || userData?.ngo?.name || userData?.pharmacy?.name,
      lastAuthTime: new Date(lastAuthTime).toISOString()
    });
    console.log('🔐 Organization auth state exposed: window.getOrgAuthState()');
  }
}, [isAuthenticated, isLoading, isInitialized, needsVerification, userData, lastAuthTime]);
```

### Success Criteria:

#### Automated Verification:
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run build` completes successfully
- [ ] Console shows "🔧 API Configuration" log with correct localhost URL
- [ ] No TypeScript errors in modified files

#### Manual Verification:
- [ ] **Test 1 - Login and Refresh at localhost**:
  1. Navigate to `http://localhost:5173/organization/login`
  2. Login with credentials: admin.newgeneralcentralhospitalgraasaba@example.com / Password123! / HOSP-NG-2025-175
  3. Enter OTP from email
  4. Navigate to dashboard
  5. Open DevTools → Application → Cookies → http://localhost:8000
  6. Verify `access_token` and `refresh_token` cookies exist
  7. Hard refresh browser (Cmd/Ctrl + Shift + R)
  8. ✅ Should remain logged in on dashboard
  9. Check console: Should see "🔐 ✅ ORGANIZATION USER AUTHENTICATED VIA COOKIES"

- [ ] **Test 2 - Login and Refresh at 127.0.0.1**:
  1. Navigate to `http://127.0.0.1:5173/organization/login`
  2. Login with same credentials
  3. Navigate to dashboard
  4. Hard refresh browser
  5. ✅ Should remain logged in (domain normalized to localhost internally)

- [ ] **Test 3 - Cross-Domain Navigation**:
  1. Login at `http://localhost:5173/organization/login`
  2. Navigate to `http://127.0.0.1:5173/organization/dashboard`
  3. ✅ Should remain logged in (same backend domain)

- [ ] **Test 4 - Cookie Verification**:
  1. After login, run in browser console: `window.debugCookies()`
  2. ✅ Should show current URL and API configuration
  3. Open DevTools → Application → Cookies
  4. ✅ Should see cookies at `http://localhost:8000` domain
  5. ✅ Cookies should have HttpOnly, SameSite=Lax flags

- [ ] **Test 5 - Auth State Debugging**:
  1. After login, run in browser console: `window.getOrgAuthState()`
  2. ✅ Should return object with `isAuthenticated: true`
  3. ✅ Should show user email and organization name
  4. ✅ Should show recent lastAuthTime

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that all 5 tests passed before proceeding to Phase 2.

---

## Phase 2: Fix Token Refresh Mechanism

### Overview
Fix the three critical bugs in the token refresh system to ensure sessions persist during long user sessions without requiring re-login.

### Changes Required:

#### 1. Fix Expired Token Logout Logic

**File**: `src/features/organization/organizationAuthContext.tsx`

**Replace lines 96-136** (entire `refreshAccessToken` function):

**Old Code**:
```typescript
const refreshAccessToken = React.useCallback(async (): Promise<boolean> => {
  try {
    console.log('🔄 Organization: Attempting to refresh access token...');
    const response = await fetch(createApiUrl('api/token/refresh/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('❌ Organization: Token refresh failed');
      return false;
    }

    const data = await response.json();
    if (data.status === 'success') {
      console.log('✅ Organization: Token refresh successful');
      const now = Date.now();
      setLastAuthTime(now);
      localStorage.setItem('org_last_token_refresh', now.toString());
      return true;
    }

    return false;
  } catch (err: any) {
    console.error('❌ Organization: Token refresh error:', err);
    if (err.status === 401 || err.status === 403) {
      console.log('🔒 Organization: Refresh token expired - logging out user');
      setIsAuthenticated(false);
      setUserData(null);
      setNeedsVerification(false);
      setCurrentEmail(null);
      sessionStorage.removeItem('org_auth_email');
      sessionStorage.removeItem('org_auth_needs_verification');
    }
    return false;
  }
}, []);
```

**New Code**:
```typescript
// Track if refresh is in progress to prevent race conditions
const refreshInProgressRef = React.useRef<boolean>(false);

const refreshAccessToken = React.useCallback(async (): Promise<boolean> => {
  // Prevent duplicate refresh requests
  if (refreshInProgressRef.current) {
    console.log('⏭️ Organization: Token refresh already in progress, skipping');
    return false;
  }

  refreshInProgressRef.current = true;

  try {
    console.log('🔄 Organization: Attempting to refresh access token...');
    const response = await fetch(createApiUrl('api/token/refresh/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send httpOnly cookies
    });

    // Log response details for debugging
    console.log(`📡 Organization: Token refresh response - Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      // Parse error details from response
      let errorMessage = 'Token refresh failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.detail || errorMessage;
      } catch {
        // Response not JSON, use status text
        errorMessage = response.statusText;
      }

      console.error(`❌ Organization: Token refresh failed - ${response.status}: ${errorMessage}`);

      // Handle expired refresh tokens (401/403) by logging out
      if (response.status === 401 || response.status === 403) {
        console.log('🔒 Organization: Refresh token expired or invalid - logging out user');

        // Clear auth state
        setIsAuthenticated(false);
        setUserData(null);
        setNeedsVerification(false);
        setCurrentEmail(null);

        // Clear session storage
        sessionStorage.removeItem('org_auth_email');
        sessionStorage.removeItem('org_auth_needs_verification');
        sessionStorage.removeItem('org_auth_timestamp');
        sessionStorage.removeItem('org_auth_state');

        // Clear localStorage tracking
        localStorage.removeItem('org_last_token_refresh');

        // Show user-friendly message
        console.warn('⚠️ Your session has expired. Please log in again.');
      }

      refreshInProgressRef.current = false;
      return false;
    }

    // Parse successful response
    const data = await response.json();

    if (data.status === 'success') {
      console.log('✅ Organization: Token refresh successful');
      const now = Date.now();
      setLastAuthTime(now);
      // Only update localStorage once, not in setupTokenRefreshTimer
      localStorage.setItem('org_last_token_refresh', now.toString());
      refreshInProgressRef.current = false;
      return true;
    }

    console.error('❌ Organization: Token refresh returned non-success status:', data);
    refreshInProgressRef.current = false;
    return false;

  } catch (err: any) {
    console.error('❌ Organization: Token refresh network error:', err);

    // Network errors don't necessarily mean expired token
    // User might have lost internet connection
    console.warn('⚠️ Network error during token refresh. Will retry on next trigger.');

    refreshInProgressRef.current = false;
    return false;
  }
}, []);
```

**Key Changes**:
1. **Added mutex with `refreshInProgressRef`** to prevent race conditions
2. **Fixed logout logic** - Now triggers on 401/403 HTTP responses (not just catch block)
3. **Added comprehensive logging** - Logs status codes, error messages, and all state changes
4. **Separated network errors from auth errors** - Network failures don't log out user
5. **Single localStorage write** - Removed duplicate write in `setupTokenRefreshTimer`
6. **User-friendly warnings** - Clear console messages about what's happening

#### 2. Update Token Refresh Timer Setup

**File**: `src/features/organization/organizationAuthContext.tsx`

**Replace lines 139-160** (`setupTokenRefreshTimer` function):

**Old Code**:
```typescript
const setupTokenRefreshTimer = React.useCallback(() => {
  if (refreshTimerRef.current) {
    clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = null;
  }

  const REFRESH_INTERVAL = 25 * 60 * 1000;
  const now = Date.now();

  localStorage.setItem('org_last_token_refresh', now.toString());

  console.log('⏰ Organization: Setting up token refresh timer (will refresh in 25 minutes)');

  refreshTimerRef.current = setTimeout(async () => {
    console.log('⏰ Organization: Token refresh timer triggered');
    const success = await refreshAccessToken();
    if (success) {
      setupTokenRefreshTimer();
    }
  }, REFRESH_INTERVAL);
}, [refreshAccessToken]);
```

**New Code**:
```typescript
const setupTokenRefreshTimer = React.useCallback(() => {
  // Clear any existing timer
  if (refreshTimerRef.current) {
    clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = null;
    console.log('🔄 Organization: Cleared existing refresh timer');
  }

  const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes

  // Don't set localStorage here - only after actual refresh succeeds
  // This prevents timestamp drift between timer setup and actual refresh

  console.log('⏰ Organization: Setting up token refresh timer (will refresh in 25 minutes)');
  console.log(`⏰ Next refresh scheduled at: ${new Date(Date.now() + REFRESH_INTERVAL).toLocaleTimeString()}`);

  refreshTimerRef.current = setTimeout(async () => {
    console.log('⏰ Organization: Token refresh timer triggered');
    const success = await refreshAccessToken();
    if (success) {
      // Reschedule only if refresh succeeded
      console.log('✅ Organization: Refresh succeeded, rescheduling timer');
      setupTokenRefreshTimer();
    } else {
      // If refresh failed, check if user is still authenticated
      // If yes, retry in 1 minute (might be temporary network issue)
      // If no, user was logged out (expired refresh token)
      if (isAuthenticated) {
        console.warn('⚠️ Organization: Refresh failed but user still authenticated, retrying in 1 minute');
        refreshTimerRef.current = setTimeout(() => {
          refreshAccessToken().then(success => {
            if (success) setupTokenRefreshTimer();
          });
        }, 60 * 1000); // Retry in 1 minute
      } else {
        console.log('🔒 Organization: User logged out, not rescheduling timer');
      }
    }
  }, REFRESH_INTERVAL);
}, [refreshAccessToken, isAuthenticated]);
```

**Key Changes**:
1. **Removed duplicate localStorage write** - Only write after actual refresh
2. **Added retry logic** - If refresh fails due to network issue, retry in 1 minute
3. **Better logging** - Shows exact time of next refresh
4. **Conditional rescheduling** - Only reschedule if user still authenticated

#### 3. Fix Visibility and Activity Handlers

**File**: `src/features/organization/organizationAuthContext.tsx`

**Replace lines 172-193** (visibility change handler):

**Old Code**:
```typescript
React.useEffect(() => {
  const handleVisibilityChange = async () => {
    if (document.visibilityState === 'visible' && isAuthenticated) {
      const lastRefresh = localStorage.getItem('org_last_token_refresh');
      const REFRESH_THRESHOLD = 20 * 60 * 1000;

      if (lastRefresh) {
        const timeSinceRefresh = Date.now() - parseInt(lastRefresh);
        if (timeSinceRefresh >= REFRESH_THRESHOLD) {
          console.log('⏰ Organization: Tab became visible, refreshing token...');
          await refreshAccessToken();
          setupTokenRefreshTimer();
        }
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [isAuthenticated, refreshAccessToken, setupTokenRefreshTimer]);
```

**New Code**:
```typescript
React.useEffect(() => {
  const handleVisibilityChange = async () => {
    if (document.visibilityState === 'visible' && isAuthenticated) {
      const lastRefresh = localStorage.getItem('org_last_token_refresh');
      const REFRESH_THRESHOLD = 20 * 60 * 1000; // 20 minutes

      if (lastRefresh) {
        const timeSinceRefresh = Date.now() - parseInt(lastRefresh);
        if (timeSinceRefresh >= REFRESH_THRESHOLD) {
          console.log(`⏰ Organization: Tab became visible after ${Math.round(timeSinceRefresh / 60000)} minutes, refreshing token...`);

          // refreshAccessToken has its own mutex to prevent race conditions
          const success = await refreshAccessToken();

          if (success) {
            // Reset the timer after successful refresh
            setupTokenRefreshTimer();
          }
        } else {
          console.log(`⏰ Organization: Tab became visible, but token was refreshed ${Math.round(timeSinceRefresh / 60000)} minutes ago (threshold: 20 min)`);
        }
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [isAuthenticated, refreshAccessToken, setupTokenRefreshTimer]);
```

**Replace lines 196-232** (activity-based handler):

**Old Code**:
```typescript
React.useEffect(() => {
  const handleUserActivity = async () => {
    if (!isAuthenticated) return;

    const lastRefresh = localStorage.getItem('org_last_token_refresh');
    const ACTIVITY_REFRESH_THRESHOLD = 20 * 60 * 1000;

    if (lastRefresh) {
      const timeSinceRefresh = Date.now() - parseInt(lastRefresh);
      if (timeSinceRefresh >= ACTIVITY_REFRESH_THRESHOLD) {
        console.log('⏰ Organization: User activity detected, refreshing token...');
        await refreshAccessToken();
        setupTokenRefreshTimer();
      }
    }
  };

  let activityTimeout: NodeJS.Timeout;
  const throttledActivity = () => {
    if (activityTimeout) clearTimeout(activityTimeout);
    activityTimeout = setTimeout(handleUserActivity, 5000);
  };

  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, throttledActivity);
  });

  return () => {
    events.forEach(event => {
      document.removeEventListener(event, throttledActivity);
    });
    if (activityTimeout) clearTimeout(activityTimeout);
  };
}, [isAuthenticated, refreshAccessToken, setupTokenRefreshTimer]);
```

**New Code**:
```typescript
React.useEffect(() => {
  const handleUserActivity = async () => {
    if (!isAuthenticated) return;

    const lastRefresh = localStorage.getItem('org_last_token_refresh');
    const ACTIVITY_REFRESH_THRESHOLD = 20 * 60 * 1000; // 20 minutes

    if (lastRefresh) {
      const timeSinceRefresh = Date.now() - parseInt(lastRefresh);
      if (timeSinceRefresh >= ACTIVITY_REFRESH_THRESHOLD) {
        console.log(`⏰ Organization: User activity detected after ${Math.round(timeSinceRefresh / 60000)} minutes, refreshing token...`);

        // refreshAccessToken has its own mutex to prevent race conditions
        const success = await refreshAccessToken();

        if (success) {
          // Reset the timer after successful refresh
          setupTokenRefreshTimer();
        }
      }
    }
  };

  let activityTimeout: NodeJS.Timeout;
  const throttledActivity = () => {
    if (activityTimeout) clearTimeout(activityTimeout);
    activityTimeout = setTimeout(handleUserActivity, 5000); // Check 5 seconds after activity stops
  };

  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, throttledActivity, { passive: true }); // Add passive for performance
  });

  return () => {
    events.forEach(event => {
      document.removeEventListener(event, throttledActivity);
    });
    if (activityTimeout) clearTimeout(activityTimeout);
  };
}, [isAuthenticated, refreshAccessToken, setupTokenRefreshTimer]);
```

**Key Changes**:
1. **Added time-since-refresh logging** - Shows how long since last refresh
2. **Clarified threshold logic** - Comments explain 20-minute threshold
3. **Rely on mutex in refreshAccessToken** - No need for additional locking here
4. **Added passive event listeners** - Improves scroll performance

### Success Criteria:

#### Automated Verification:
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run build` completes successfully
- [ ] No console errors after changes
- [ ] All TypeScript types resolve correctly

#### Manual Verification:

- [ ] **Test 1 - Automatic 25-Minute Refresh**:
  1. Login to organization dashboard
  2. Open DevTools → Console
  3. Wait 25 minutes (or temporarily change `REFRESH_INTERVAL` to 2 minutes for faster testing)
  4. ✅ Should see console log: "⏰ Organization: Token refresh timer triggered"
  5. ✅ Should see console log: "✅ Organization: Token refresh successful"
  6. ✅ Should see console log: "✅ Organization: Refresh succeeded, rescheduling timer"
  7. Open DevTools → Network tab
  8. ✅ Should see POST request to `/api/token/refresh/` with status 200
  9. Make an API call (e.g., navigate to a page)
  10. ✅ Should work without re-login

- [ ] **Test 2 - Visibility-Based Refresh**:
  1. Login to organization dashboard
  2. Switch to different tab/window for 21+ minutes
  3. Return to organization tab
  4. ✅ Should see console log: "⏰ Organization: Tab became visible after X minutes, refreshing token..."
  5. ✅ Should see successful refresh logs
  6. Dashboard should remain accessible without re-login

- [ ] **Test 3 - Activity-Based Refresh**:
  1. Login to organization dashboard
  2. Leave page idle (no interaction) for 21+ minutes
  3. Click anywhere on the page
  4. ✅ Should see console log: "⏰ Organization: User activity detected after X minutes, refreshing token..."
  5. ✅ Should see successful refresh logs
  6. Page should remain functional

- [ ] **Test 4 - Expired Refresh Token Logout**:
  1. Login to organization dashboard
  2. In DevTools → Application → Cookies, delete the `refresh_token` cookie
  3. Wait for next automatic refresh (or trigger refresh by switching tabs)
  4. ✅ Should see console log: "🔒 Organization: Refresh token expired or invalid - logging out user"
  5. ✅ Should see console warning: "⚠️ Your session has expired. Please log in again."
  6. ✅ Should be redirected to login page

- [ ] **Test 5 - Race Condition Prevention**:
  1. Login to organization dashboard
  2. Wait 21+ minutes
  3. Quickly: Switch tabs, then immediately click on page
  4. Check console logs
  5. ✅ Should see one of: "⏭️ Organization: Token refresh already in progress, skipping"
  6. ✅ Should NOT see duplicate refresh requests in Network tab

- [ ] **Test 6 - Network Error Handling**:
  1. Login to organization dashboard
  2. In DevTools → Network, enable "Offline" mode
  3. Wait for automatic refresh trigger (or manually trigger)
  4. ✅ Should see console log: "❌ Organization: Token refresh network error"
  5. ✅ Should see console warning: "⚠️ Network error during token refresh. Will retry on next trigger."
  6. ✅ Should NOT be logged out
  7. Re-enable network
  8. ✅ Should successfully refresh on next trigger (1 minute retry)

- [ ] **Test 7 - Long Session (30+ Minutes)**:
  1. Login to organization dashboard
  2. Keep browser active and online for 35+ minutes
  3. ✅ Should see at least one automatic refresh in console (at 25 minutes)
  4. ✅ Should see successful refresh logs
  5. Navigate to different pages
  6. ✅ All API calls should work without re-login
  7. Check Network tab
  8. ✅ Should see POST to `/api/token/refresh/` approximately every 25 minutes

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that all 7 tests passed before proceeding to Phase 3.

---

## Phase 3: Real-Time Data Integration - Patient Management Pages

### Overview
Integrate real backend data for patient management pages, replacing mock data with actual API calls.

### Changes Required:

#### 1. Create Patient Management Service

**File**: `src/services/patientManagementService.ts` (NEW FILE)

**Code**:
```typescript
import { createApiUrl } from '../utils/config';

export interface Patient {
  id: string;
  patient_id: string;
  full_name: string;
  date_of_birth: string;
  age?: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address?: string;
  blood_group?: string;
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  registration_date: string;
  status: 'active' | 'inactive' | 'archived';
  last_visit?: string;
}

export interface PatientsListResponse {
  status: string;
  patients: Patient[];
  total_count: number;
  page?: number;
  page_size?: number;
}

export const PatientManagementService = {
  /**
   * Fetch all patients for the organization
   */
  async fetchPatients(): Promise<PatientsListResponse> {
    try {
      const response = await fetch(createApiUrl('api/hospitals/patients/'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send httpOnly cookies
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error fetching patients:', error);
      throw error;
    }
  },

  /**
   * Fetch single patient details
   */
  async fetchPatientById(patientId: string): Promise<Patient> {
    try {
      const response = await fetch(createApiUrl(`api/hospitals/patients/${patientId}/`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch patient: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error fetching patient:', error);
      throw error;
    }
  },

  /**
   * Create new patient registration
   */
  async createPatient(patientData: Partial<Patient>): Promise<Patient> {
    try {
      const response = await fetch(createApiUrl('api/hospitals/patients/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create patient: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error creating patient:', error);
      throw error;
    }
  },

  /**
   * Update existing patient
   */
  async updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient> {
    try {
      const response = await fetch(createApiUrl(`api/hospitals/patients/${patientId}/`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update patient: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error updating patient:', error);
      throw error;
    }
  }
};
```

#### 2. Update PatientManagementPage to Use API

**File**: `src/pages/organization/PatientManagementPage.tsx`

**Replace the entire file** with API-integrated version:

```typescript
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Users, Search, Filter, Plus, Edit, Eye, AlertCircle, Loader } from 'lucide-react';
import { PatientManagementService, Patient } from '../../services/patientManagementService';
import { useNavigate } from 'react-router-dom';

const PatientManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch patients on mount
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await PatientManagementService.fetchPatients();
      setPatients(response.patients || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load patients');
      console.error('Error loading patients:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter patients by search term
  const filteredPatients = patients.filter(patient =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center bg-red-50 p-8 rounded-xl max-w-md">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Patients</h2>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={loadPatients}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Patient Management | PHB</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              Patient Management
            </h1>
            <p className="text-gray-500 mt-1">
              Total Patients: <span className="font-semibold text-blue-600">{patients.length}</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/organization/patients/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Patient
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age / Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-500">
                      {searchTerm ? 'No patients found matching your search' : 'No patients registered yet'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.patient_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.full_name}</div>
                      {patient.email && (
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.age || 'N/A'} / {patient.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.last_visit
                        ? new Date(patient.last_visit).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          patient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : patient.status === 'inactive'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {/* View patient details */}}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {/* Edit patient */}}
                          className="text-green-600 hover:text-green-900"
                          title="Edit Patient"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientManagementPage;
```

#### 3. Update PatientRegistrationPage with API Integration

**File**: `src/pages/organization/PatientRegistrationPage.tsx`

**Replace the static form with API-integrated version** (similar pattern to above, but with form submission to `PatientManagementService.createPatient()`)

### Backend API Requirements:

**If these endpoints don't exist yet, they need to be created:**

1. **GET `/api/hospitals/patients/`** - List all patients
   - Response: `{ status: 'success', patients: Patient[], total_count: number }`

2. **GET `/api/hospitals/patients/{id}/`** - Get single patient
   - Response: `Patient` object

3. **POST `/api/hospitals/patients/`** - Create new patient
   - Request body: `Patient` object (partial)
   - Response: Created `Patient` object

4. **PATCH `/api/hospitals/patients/{id}/`** - Update patient
   - Request body: Partial `Patient` object
   - Response: Updated `Patient` object

### Success Criteria:

#### Automated Verification:
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] No console errors after changes

#### Manual Verification:

- [ ] **Test 1 - Patient List Loading**:
  1. Login to organization dashboard
  2. Navigate to Patients page
  3. ✅ Should see loading spinner initially
  4. ✅ Should load list of patients from backend
  5. ✅ Should show total count
  6. Check Network tab
  7. ✅ Should see GET request to `/api/hospitals/patients/`

- [ ] **Test 2 - Search Functionality**:
  1. On Patients page, type in search box
  2. ✅ Should filter patients by name, ID, or phone
  3. ✅ Should update results immediately
  4. Clear search
  5. ✅ Should show all patients again

- [ ] **Test 3 - Empty State**:
  1. If no patients exist (or use search with no results)
  2. ✅ Should show "No patients" message with icon
  3. ✅ Should not show error state

- [ ] **Test 4 - Error Handling**:
  1. Disconnect network
  2. Refresh Patients page
  3. ✅ Should show error state with retry button
  4. Reconnect network
  5. Click retry
  6. ✅ Should successfully load patients

- [ ] **Test 5 - Patient Registration**:
  1. Click "New Patient" button
  2. ✅ Should navigate to registration form
  3. Fill out form with valid data
  4. Submit
  5. ✅ Should call API to create patient
  6. ✅ Should redirect back to patients list
  7. ✅ Should show new patient in list

**Implementation Note**: After completing this phase, pause for manual testing before proceeding to Phase 4.

---

## Phase 4: Real-Time Data Integration - Clinical & Services Pages

### Overview
Integrate real backend data for clinical management, laboratory, radiology, pharmacy, and billing pages.

This phase follows the same pattern as Phase 3 but covers more complex pages with department-specific data.

### Changes Required:

#### 1. Create Radiology Service

**File**: `src/services/radiologyService.ts` (NEW FILE)

**Code**:
```typescript
import { createApiUrl } from '../utils/config';

export interface RadiologyRequest {
  id: string;
  request_id: string;
  patient_name: string;
  patient_id: string;
  exam_type: string;
  body_part: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  ordered_by: string;
  ordered_date: string;
  scheduled_date?: string;
  completed_date?: string;
  findings?: string;
  report_url?: string;
}

export const RadiologyService = {
  async fetchRequests(): Promise<RadiologyRequest[]> {
    const response = await fetch(createApiUrl('api/hospitals/radiology/requests/'), {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch radiology requests');
    const data = await response.json();
    return data.requests || data;
  },

  async fetchRequestById(id: string): Promise<RadiologyRequest> {
    const response = await fetch(createApiUrl(`api/hospitals/radiology/requests/${id}/`), {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch radiology request');
    return response.json();
  },

  async updateRequestStatus(id: string, status: string): Promise<RadiologyRequest> {
    const response = await fetch(createApiUrl(`api/hospitals/radiology/requests/${id}/`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update request status');
    return response.json();
  }
};
```

#### 2. Create Laboratory Service

**File**: `src/services/laboratoryService.ts` (NEW FILE)

Similar pattern to RadiologyService for lab test orders.

#### 3. Create Pharmacy Service

**File**: `src/services/pharmacyService.ts` (NEW FILE)

For pharmacy inventory and prescription management.

#### 4. Create Billing Service

**File**: `src/services/billingService.ts` (NEW FILE)

```typescript
import { createApiUrl } from '../utils/config';

export interface Invoice {
  id: string;
  invoice_number: string;
  patient_name: string;
  patient_id: string;
  date: string;
  due_date: string;
  amount: number;
  paid_amount: number;
  balance: number;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export const BillingService = {
  async fetchInvoices(): Promise<Invoice[]> {
    const response = await fetch(createApiUrl('api/hospitals/billing/invoices/'), {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch invoices');
    const data = await response.json();
    return data.invoices || data;
  },

  async fetchInvoiceById(id: string): Promise<Invoice> {
    const response = await fetch(createApiUrl(`api/hospitals/billing/invoices/${id}/`), {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch invoice');
    return response.json();
  },

  async createInvoice(invoice: Partial<Invoice>): Promise<Invoice> {
    const response = await fetch(createApiUrl('api/hospitals/billing/invoices/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(invoice),
    });
    if (!response.ok) throw new Error('Failed to create invoice');
    return response.json();
  }
};
```

#### 5-8. Update Pages with Services

Update the following pages following the same pattern as PatientManagementPage:
- **RadiologyPage**: Use RadiologyService
- **LabTechnicianPage**: Use LaboratoryService
- **PharmacyManagementPage**: Use PharmacyService
- **BillingManagementPage**: Use BillingService

### Backend API Requirements:

**Required endpoints** (if they don't exist yet):

1. **Radiology**:
   - GET `/api/hospitals/radiology/requests/`
   - GET `/api/hospitals/radiology/requests/{id}/`
   - PATCH `/api/hospitals/radiology/requests/{id}/`

2. **Laboratory**:
   - GET `/api/hospitals/lab/tests/`
   - GET `/api/hospitals/lab/tests/{id}/`
   - PATCH `/api/hospitals/lab/tests/{id}/`

3. **Pharmacy**:
   - GET `/api/hospitals/pharmacy/inventory/`
   - GET `/api/hospitals/pharmacy/prescriptions/`
   - POST `/api/hospitals/pharmacy/dispense/`

4. **Billing**:
   - GET `/api/hospitals/billing/invoices/`
   - GET `/api/hospitals/billing/invoices/{id}/`
   - POST `/api/hospitals/billing/invoices/`
   - PATCH `/api/hospitals/billing/invoices/{id}/`

### Success Criteria:

#### Automated Verification:
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] No console errors

#### Manual Verification:
- [ ] Each page loads real data from backend
- [ ] Loading states appear during fetch
- [ ] Error states handle API failures gracefully
- [ ] Search/filter functionality works
- [ ] Create/update operations call correct APIs

**Implementation Note**: After completing this phase, pause for manual testing before proceeding to Phase 5.

---

## Phase 5: Real-Time Data Integration - Staff & Reports Pages

### Overview
Complete data integration for remaining pages: staff management, reports, and settings pages.

### Changes Required:

#### 1. Enhance StaffManagementPage

**File**: `src/pages/organization/StaffManagementPage.tsx`

Currently shows only 1 hardcoded doctor. Update to use existing `StaffService`:

```typescript
import { StaffService } from '../../services/staffService';

// Inside component:
const [staff, setStaff] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadStaff();
}, []);

const loadStaff = async () => {
  try {
    setLoading(true);
    const response = await StaffService.fetchStaffMembers();
    setStaff(response.staff_members || []);
  } catch (error) {
    console.error('Error loading staff:', error);
  } finally {
    setLoading(false);
  }
};
```

#### 2. Create Reports Service

**File**: `src/services/reportsService.ts` (NEW FILE)

```typescript
import { createApiUrl } from '../utils/config';

export interface ReportData {
  id: string;
  title: string;
  type: 'financial' | 'clinical' | 'operational' | 'administrative';
  date_range: {
    start: string;
    end: string;
  };
  data: any; // Report-specific data structure
  generated_at: string;
  generated_by: string;
}

export const ReportsService = {
  async generateFinancialReport(startDate: string, endDate: string): Promise<ReportData> {
    const response = await fetch(createApiUrl('api/hospitals/reports/financial/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ start_date: startDate, end_date: endDate }),
    });
    if (!response.ok) throw new Error('Failed to generate financial report');
    return response.json();
  },

  async generateClinicalReport(startDate: string, endDate: string): Promise<ReportData> {
    const response = await fetch(createApiUrl('api/hospitals/reports/clinical/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ start_date: startDate, end_date: endDate }),
    });
    if (!response.ok) throw new Error('Failed to generate clinical report');
    return response.json();
  },

  async fetchRecentReports(): Promise<ReportData[]> {
    const response = await fetch(createApiUrl('api/hospitals/reports/'), {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch reports');
    const data = await response.json();
    return data.reports || data;
  }
};
```

#### 3. Update ReportsPage with Real Data

Replace placeholder charts in `ReportsPage.tsx` with actual data from `ReportsService`.

#### 4. Settings Pages Data Integration

Update the following settings pages:

- **RoleManagementPage**: Create roles API service
- **TemplateLibraryPage**: Create templates API service
- **PriceListPage**: Create price list API service
- **HealthPackagesPage**: Create health packages API service

### Backend API Requirements:

**Required endpoints**:

1. **Reports**:
   - POST `/api/hospitals/reports/financial/`
   - POST `/api/hospitals/reports/clinical/`
   - GET `/api/hospitals/reports/`

2. **Roles** (if not using existing):
   - GET `/api/hospitals/roles/`
   - POST `/api/hospitals/roles/`
   - PATCH `/api/hospitals/roles/{id}/`

3. **Templates**:
   - GET `/api/hospitals/templates/`
   - POST `/api/hospitals/templates/`

4. **Price Lists**:
   - GET `/api/hospitals/price-list/`
   - POST `/api/hospitals/price-list/items/`

5. **Health Packages**:
   - GET `/api/hospitals/health-packages/`
   - POST `/api/hospitals/health-packages/`

### Success Criteria:

#### Automated Verification:
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] All services properly typed

#### Manual Verification:
- [ ] StaffManagementPage shows all staff members
- [ ] ReportsPage generates real reports with backend data
- [ ] Settings pages load and save data via APIs
- [ ] All CRUD operations work correctly

**Implementation Note**: After completing this phase, perform comprehensive end-to-end testing of the entire organization dashboard system.

---

## Testing Strategy

### Comprehensive Testing Checklist

#### Session Persistence Testing
- [ ] Login and refresh at localhost:5173
- [ ] Login and refresh at 127.0.0.1:5173
- [ ] Login at localhost, navigate to 127.0.0.1
- [ ] Cookies persist across tabs
- [ ] Cookies survive browser restart (until expiry)

#### Token Refresh Testing
- [ ] Automatic refresh at 25 minutes
- [ ] Visibility-based refresh (switch tabs after 20+ min)
- [ ] Activity-based refresh (idle then interact after 20+ min)
- [ ] Expired refresh token triggers logout
- [ ] Network errors don't cause logout
- [ ] Multiple refresh triggers don't cause race conditions
- [ ] Session lasts 30+ minutes with continuous activity

#### Data Integration Testing

For each page:
- [ ] Initial load shows loading state
- [ ] Data loads from correct API endpoint
- [ ] Empty states display properly
- [ ] Error states allow retry
- [ ] Search/filter works correctly
- [ ] Create operations call POST APIs
- [ ] Update operations call PATCH APIs
- [ ] Delete operations (if applicable) call DELETE APIs

#### Pages to Test:
- [ ] PatientManagementPage
- [ ] PatientRegistrationPage
- [ ] RadiologyPage
- [ ] LabTechnicianPage
- [ ] PharmacyManagementPage
- [ ] BillingManagementPage
- [ ] StaffManagementPage
- [ ] ReportsPage
- [ ] ClinicalManagementPage
- [ ] RoleManagementPage
- [ ] TemplateLibraryPage
- [ ] PriceListPage
- [ ] HealthPackagesPage

### Performance Testing
- [ ] Dashboard loads in <3 seconds
- [ ] API calls complete in <2 seconds (local dev)
- [ ] No memory leaks during long sessions (30+ min)
- [ ] Token refresh doesn't cause UI stuttering
- [ ] Multiple API calls don't overwhelm backend

### Security Testing
- [ ] HttpOnly cookies cannot be accessed via JavaScript
- [ ] Expired tokens properly rejected
- [ ] API calls without cookies return 401
- [ ] Sensitive data not logged in console (production)

### Browser Compatibility Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Test Credentials

**Organization Login**:
- Email: `admin.newgeneralcentralhospitalgraasaba@example.com`
- Password: `Password123!`
- Hospital Code: `HOSP-NG-2025-175`
- Note: Requires OTP verification via email

---

## Performance Considerations

### Token Refresh Performance

**Current Configuration**:
- Access token expiry: 30 minutes
- Refresh interval: 25 minutes (5-minute buffer)
- Refresh threshold: 20 minutes (for visibility/activity triggers)

**Optimization Opportunities**:
1. **Reduce refresh interval to 15 minutes** (if users prefer more frequent refreshes)
2. **Increase access token expiry to 60 minutes** (reduce refresh frequency)
3. **Add exponential backoff** for failed refresh attempts

### API Call Optimization

**Current State**: Each page makes individual API calls
**Potential Improvements**:
1. **Implement caching layer** for frequently accessed data
2. **Use React Query** for automatic caching and refetching
3. **Batch related API calls** to reduce network requests
4. **Add pagination** for large lists (patients, invoices, etc.)

### Loading Performance

**Current State**: Each component manages its own loading state
**Potential Improvements**:
1. **Skeleton screens** instead of spinners for better perceived performance
2. **Optimistic updates** for create/update operations
3. **Prefetch data** on navigation hover
4. **Code splitting** per route for smaller initial bundle

---

## Migration Notes

### From Mock Data to Real APIs

For pages currently using mock data, follow this migration pattern:

1. **Create service file** with typed interfaces
2. **Add loading/error states** to component
3. **Replace mock data** with API call in useEffect
4. **Update UI** to handle empty states
5. **Test thoroughly** before removing mock data
6. **Keep mock data commented** for reference during testing

### Backward Compatibility

**No Breaking Changes Expected**:
- Cookie configuration changes are transparent to users
- Token refresh improvements maintain same intervals
- Data integration doesn't change UI/UX

**Potential Issues**:
- If backend APIs don't exist, pages will show errors (expected)
- If backend returns different data structure, services will need adjustment
- Cookie domain changes require backend coordination

---

## Rollback Plan

If issues arise during implementation:

### Phase 1 Rollback (Cookie Config):
```bash
git revert <commit-hash>
# Or manually restore src/utils/config.ts from backup
```

### Phase 2 Rollback (Token Refresh):
```bash
git revert <commit-hash>
# Or manually restore organizationAuthContext.tsx from backup
```

### Phase 3-5 Rollback (Data Integration):
```bash
# Individual pages can be rolled back independently
git checkout HEAD -- src/pages/organization/PatientManagementPage.tsx
# Or restore from backup
```

### Emergency Rollback (Full):
```bash
git reset --hard <pre-implementation-commit>
```

---

## Documentation Updates Required

After implementation, update these documentation files:

1. **README.md**: Add notes about session persistence and token refresh
2. **CLAUDE.md**: Update with new services and data integration patterns
3. **API Documentation**: Document all new service endpoints
4. **Developer Guide**: Add troubleshooting section for cookie/session issues

---

## References

### Related Research Documents
- `thoughts/shared/research/2025-12-12-organization-dashboard-data-migration.md` - Original dashboard data analysis
- `thoughts/shared/research/2025-11-18-session-persistence-httponly-cookies.md` - Cookie implementation details

### Related Tickets
- Session persistence issue (from user report)
- Token refresh not working (from user report)
- Data integration requirement (from user report)

### Code Files Modified
- `src/utils/config.ts` - API configuration
- `src/features/organization/organizationAuthContext.tsx` - Authentication and token refresh
- `src/services/*.ts` - New service files for each department
- `src/pages/organization/*.tsx` - 18 pages updated with real data integration

---

## Success Metrics

### Definition of Done

This implementation is complete when:

1. ✅ Users can login and remain logged in after browser refresh
2. ✅ Sessions persist across different domains (localhost/127.0.0.1)
3. ✅ Tokens automatically refresh every 25 minutes
4. ✅ Expired refresh tokens trigger proper logout with notification
5. ✅ All 18 organization pages display real-time backend data
6. ✅ Loading and error states work correctly on all pages
7. ✅ All automated verification tests pass
8. ✅ All manual verification tests pass
9. ✅ No console errors in production build
10. ✅ Performance benchmarks met (dashboard <3s, APIs <2s)

### Acceptance Criteria

- [ ] User can stay logged in for 30+ continuous minutes without re-login
- [ ] User can refresh browser at any time and remain authenticated
- [ ] All pages load real data from backend APIs
- [ ] System handles network errors gracefully without logging out user
- [ ] Token refresh happens automatically in background without user noticing
- [ ] No race conditions or duplicate API calls
- [ ] Comprehensive logging helps debug any future issues

---

## Next Steps After Implementation

1. **Monitor Production**: Watch for any session-related errors in logs
2. **Gather User Feedback**: Ask users if session persistence is working as expected
3. **Performance Tuning**: Adjust token refresh intervals based on actual usage patterns
4. **Complete Remaining Pages**: Integrate data for any pages not covered in this plan
5. **Backend API Development**: Create missing endpoints identified during implementation
6. **Documentation**: Update all relevant docs with new patterns and troubleshooting guides

---

**End of Implementation Plan**