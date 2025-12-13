# Organization Dashboard Session Persistence Fix

## Problem

Users were experiencing forced re-authentication (including OTP) when returning to the organization dashboard tab after being away, even though the session should have remained active for the refresh token lifetime (1 day).

## Root Causes

1. **Cookie Expiration Issue**: The access token cookie was set to expire after exactly 30 minutes (matching the JWT token lifetime), leaving no buffer for the refresh mechanism to work when timers were delayed.

2. **Browser Timer Throttling**: When browser tabs become inactive or hidden, browsers throttle or suspend JavaScript timers. The 25-minute refresh timer might not fire reliably, causing the access token to expire before refresh could occur.

3. **Aggressive Thresholds**: The refresh mechanism only triggered after 20+ minutes of inactivity, which didn't provide enough margin before the 30-minute token expiry.

## Solutions Implemented

### Backend Changes

**File**: `/Users/new/Newphb/basebackend/server/settings.py`

- **Extended cookie lifetime**: Changed `JWT_AUTH_COOKIE_MAX_AGE` from 30 minutes to 2 hours
  ```python
  # Before
  JWT_AUTH_COOKIE_MAX_AGE = 60 * 30  # 30 minutes

  # After
  JWT_AUTH_COOKIE_MAX_AGE = 60 * 60 * 2  # 2 hours
  ```

**Why this helps**: Even if the 30-minute access token expires and the timer didn't fire due to tab inactivity, the cookie itself remains available for up to 2 hours, allowing the refresh mechanism to work when the user returns.

### Frontend Changes

**File**: `/Users/new/phbfinal/phbfrontend/src/features/organization/organizationAuthContext.tsx`

#### 1. More Aggressive Refresh Thresholds
- Reduced refresh threshold from **20 minutes to 15 minutes** across all mechanisms
- This provides a 15-minute buffer before the 30-minute token expiry

#### 2. Enhanced Visibility Change Handler
- Now refreshes immediately if no timestamp exists
- Added dual event listeners: `visibilitychange` + `focus` for better coverage
- Refactored into shared `checkAndRefreshToken()` function

**Before**:
```typescript
const handleVisibilityChange = async () => {
  if (document.visibilityState === 'visible' && isAuthenticated) {
    const REFRESH_THRESHOLD = 20 * 60 * 1000; // 20 minutes
    // ... check timestamp and refresh if needed
  }
};
```

**After**:
```typescript
const checkAndRefreshToken = async () => {
  if (!isAuthenticated) return;
  const REFRESH_THRESHOLD = 15 * 60 * 1000; // 15 minutes

  if (lastRefresh) {
    // ... check timestamp
  } else {
    // NEW: Refresh immediately if no timestamp
    console.log('Tab became active with no refresh timestamp, refreshing immediately...');
    const success = await refreshAccessToken();
    if (success) setupTokenRefreshTimer();
  }
};

// Listen to BOTH events for better coverage
document.addEventListener('visibilitychange', handleVisibilityChange);
window.addEventListener('focus', handleFocus);
```

#### 3. Proactive Refresh on Initialization
- When restoring a session, now checks for missing timestamp and refreshes proactively
- Ensures token is fresh even if the last refresh time is unknown

## How It Works Now

### Timeline of Session Persistence

| Time | Event | Action |
|------|-------|--------|
| 0:00 | User logs in | Access token valid for 30min, cookie valid for 2hrs |
| 15:00 | User returns to tab | Triggers immediate refresh if >15min since last refresh |
| 25:00 | Automatic timer | Refresh happens automatically (if tab active) |
| 30:00+ | User away, tab inactive | Cookie still valid (up to 2hrs), timer may be suspended |
| 45:00 | User returns | Visibility/focus handler detects >15min gap, refreshes immediately |
| 60:00+ | User returns | Same behavior - refresh if needed, using still-valid cookie |

### Safety Nets (Multiple Layers)

1. **Scheduled refresh**: Every 25 minutes (if tab active)
2. **Visibility change**: When tab becomes visible + >15min since last refresh
3. **Window focus**: When window gains focus + >15min since last refresh
4. **User activity**: On mouse/keyboard/scroll events + >15min since last refresh
5. **Initialization**: On page load/refresh, checks and refreshes if needed

## Testing

To verify the fix works:

1. **Log in** to organization dashboard
2. **Navigate away** (switch tabs or minimize browser) for 20-30 minutes
3. **Return to the tab** - should remain logged in, not see login screen
4. Check browser console for logs:
   - `⏰ Organization: Tab became active after X minutes, refreshing token...`
   - `✅ Organization: Token refresh successful`

## Security Considerations

- **httpOnly cookies**: Still protected from XSS attacks (JavaScript cannot access)
- **SameSite=Lax**: CSRF protection maintained
- **Extended cookie lifetime**: Does NOT extend the JWT token lifetime (still 30min)
- **Refresh token rotation**: New refresh token issued on each refresh, old one blacklisted

## Monitoring

Key console log messages to watch for:

- `⏰ Organization: Tab became active after X minutes, refreshing token...` (Good - working as expected)
- `✅ Organization: Token refresh successful` (Good)
- `❌ Organization: Token refresh failed` (Investigate)
- `🔒 Organization: Refresh token expired or invalid - logging out user` (User was away >1 day)

## Future Improvements

Consider implementing:

1. **Web Worker for background refresh**: Use service workers to refresh tokens even when tab is inactive
2. **Refresh token extension**: Extend refresh token lifetime to 7 days for even better UX
3. **Remember device**: Skip 2FA on trusted devices for 30 days
4. **Session activity tracking**: Dashboard showing active sessions and last activity

---

**Date**: December 12, 2025
**Impact**: High - Significantly improves user experience for organization admins
**Breaking Changes**: None - fully backward compatible
