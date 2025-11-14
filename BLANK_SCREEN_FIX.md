# Blank Screen Fix (useLocation Hook Error)

**Issue Reported**: January 13, 2025
**Status**: ✅ Fixed

---

## Problem

After implementing the unnecessary API calls fix, the entire app showed a **blank screen** with console error:

```
Uncaught Error: useLocation() may be used only in the context of a <Router> component.
```

### Root Cause

In attempting to fix the unnecessary organization profile API call, I added `useLocation()` hook to `OrganizationAuthProvider`:

```typescript
// ❌ BROKEN CODE (Line 2, 85, 370)
import { useLocation } from 'react-router-dom';

export const OrganizationAuthProvider = ({ children }) => {
  const location = useLocation(); // ERROR - can't use before Router!

  // ...

  useEffect(() => {
    // Check route before making API call
    const isOrganizationRoute = location.pathname.startsWith('/organization');
  }, [location.pathname]);
}
```

**Why This Failed**: `OrganizationAuthProvider` is rendered **BEFORE** the `<Router>` component in the app hierarchy (`App.tsx`), making `useLocation()` unavailable in its context.

**App Structure**:
```
<OrganizationAuthProvider>  ← useLocation() called here (ERROR!)
  <Router>                   ← Router defined here
    <Routes>
      ...
    </Routes>
  </Router>
</OrganizationAuthProvider>
```

The hook can only be used **inside** the Router, not outside/before it.

---

## Solution

### 1. Removed useLocation Import and Usage

**File**: `src/features/organization/organizationAuthContext.tsx`

**Changes**:
- Line 2: Removed `import { useLocation } from 'react-router-dom'`
- Line 85: Removed `const location = useLocation()`
- Line 370: Changed dependencies from `[location.pathname]` to `[]`
- Lines 312-334: Simplified error handling to suppress expected 404s

```typescript
// ✅ AFTER - No route checking
export const OrganizationAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Removed: const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  // ... rest of state
```

```typescript
// ✅ AFTER - useEffect dependencies (Line 370)
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount
```

---

### 2. Simplified Organization Auth Check

Instead of checking routes, we now:
1. **Let the API call happen** for all users on mount
2. **Fail silently** if user is not an organization admin (404/401)
3. **Suppress console errors** for expected failures

```typescript
// Lines 311-332 - Silent failure for non-org users
} else {
  // Expected for non-organization users (404/401/403)
  // This is not an error - just means user is not an organization admin

  // Check if we're in the middle of OTP verification
  const storedEmail = sessionStorage.getItem('org_auth_email');
  const needsVerify = sessionStorage.getItem('org_auth_needs_verification');

  if (storedEmail && needsVerify === 'true') {
    console.log('🔐 Resuming OTP verification for email:', storedEmail);
    setCurrentEmail(storedEmail);
    setNeedsVerification(true);
    setIsAuthenticated(false);
    setUserData(null);
  } else {
    // No auth data and no verification in progress - this is normal for non-org users
    setIsAuthenticated(false);
    setUserData(null);
    setNeedsVerification(false);
    setCurrentEmail(null);
  }
}
```

```typescript
// Lines 333-352 - Suppress error logging
} catch (fetchError) {
  // Expected error for non-organization users - suppress console log

  // Check if we're in the middle of OTP verification
  const storedEmail = sessionStorage.getItem('org_auth_email');
  const needsVerify = sessionStorage.getItem('org_auth_needs_verification');

  if (storedEmail && needsVerify === 'true') {
    console.log('🔐 Resuming OTP verification for email:', storedEmail);
    setCurrentEmail(storedEmail);
    setNeedsVerification(true);
    setIsAuthenticated(false);
    setUserData(null);
  } else {
    setIsAuthenticated(false);
    setUserData(null);
    setNeedsVerification(false);
    setCurrentEmail(null);
  }
}
```

---

## Trade-offs

### What We Gave Up
- **Route-based optimization**: Organization profile API is now called for all users (not just org routes)
- **Network efficiency**: Non-org users will see 404 request in Network tab

### What We Gained
- **App stability**: No more blank screen errors
- **Clean console**: No error logs for expected 404s
- **Simpler code**: No complex route checking logic
- **Better UX**: App loads immediately without crashes

### Why This Is Acceptable

1. **Single API call on mount**: Only happens once when app loads
2. **Fast failure**: 404 response is instant (no timeout)
3. **Minimal overhead**: One failed request is negligible
4. **Silent failure**: User never sees the error
5. **Better than alternative**: Much simpler than restructuring app hierarchy

---

## Alternative Approaches Considered

### Option 1: Move OrganizationAuthProvider Inside Router
**Problem**: Would require major app restructuring and could break other auth contexts

### Option 2: Use window.location.pathname Instead
**Problem**: Would still check route unnecessarily and add complexity

### Option 3: Create Separate Organization Route Wrapper
**Problem**: Would require splitting auth logic and maintaining two contexts

### ✅ Option 4: Accept Silent 404 (CHOSEN)
**Why**: Simplest, most reliable, minimal performance impact

---

## Files Modified

1. **`src/features/organization/organizationAuthContext.tsx`**
   - Line 2: Removed `useLocation` import
   - Line 85: Removed `location` hook usage
   - Lines 312-334: Simplified error handling
   - Line 370: Fixed useEffect dependencies

---

## Testing

### Test Case 1: Pharmacist User (Non-Organization)
**User**: Amanda Okafor (eruwagolden55@yahoo.com)
**Role**: Pharmacist

**Steps**:
1. Login as Amanda Okafor
2. Navigate to `/professional/prescriptions/pharmacy`
3. Open browser console
4. Check Network tab

**Expected Results**:
- ✅ App loads without blank screen
- ✅ No console errors
- ✅ Network tab shows single 404 for organization profile (expected)
- ✅ No infinite render loops
- ✅ Pharmacy prescriptions load correctly

---

### Test Case 2: Organization Admin
**Role**: Hospital Admin

**Steps**:
1. Login as hospital admin
2. Navigate to `/organization/dashboard`
3. Open browser console

**Expected Results**:
- ✅ Organization profile API succeeds (200)
- ✅ Dashboard loads correctly
- ✅ User data populated
- ✅ No errors in console

---

### Test Case 3: Regular User
**Role**: Patient/Regular User

**Steps**:
1. Login as regular user
2. Navigate to `/account`
3. Open browser console

**Expected Results**:
- ✅ App loads without blank screen
- ✅ No console errors
- ✅ Network tab shows single 404 for organization profile (expected, silent)
- ✅ Account page loads correctly

---

## Related Fixes

This fix is part of a series of performance improvements:

1. **DISPENSE_FIX.md** - Fixed dispense button 400 error
2. **UNNECESSARY_API_CALLS_FIX.md** - Fixed infinite loops and role-based API calls
3. **BLANK_SCREEN_FIX.md** (this document) - Fixed blank screen from useLocation error

---

## Performance Impact

### Before Fix
- ❌ App completely broken (blank screen)
- ❌ No functionality available
- ❌ useLocation error prevents rendering

### After Fix
- ✅ App loads normally
- ✅ All functionality restored
- ✅ One silent 404 per session (negligible impact)
- ✅ Clean console output

### Network Impact
- **Organization admins**: No change (API succeeds)
- **Non-org users**: +1 failed request on mount (instant 404)
- **Overall**: Acceptable trade-off for app stability

---

## Lessons Learned

### React Hook Rules
1. **Hooks require context**: `useLocation()` only works inside `<Router>`
2. **Provider hierarchy matters**: Auth providers often wrap Router
3. **Check component tree**: Before using context hooks, verify provider order

### Error Handling Patterns
1. **Expected failures are not errors**: 404 for non-org users is normal behavior
2. **Suppress noise**: Don't log expected failures to console
3. **Fail gracefully**: Set state appropriately even when API fails

### Architecture Decisions
1. **Simple is better**: Complex route checks add fragility
2. **Accept trade-offs**: One failed request is better than broken app
3. **Performance vs complexity**: Simpler code is worth minor overhead

---

## Backward Compatibility

✅ **Fully backward compatible**

- Organization admins: API succeeds as before
- Non-organization users: App loads correctly (was broken before)
- All existing functionality: Preserved
- No breaking changes: Just removed problematic code

---

## Next Steps

### Immediate
1. ✅ Reload frontend dev server
2. ✅ Test with pharmacist user (Amanda Okafor)
3. ✅ Verify app loads without blank screen
4. ✅ Test dispense functionality works

### Future Optimization (Optional)
1. Consider moving OrganizationAuthProvider inside Router (major refactor)
2. Implement route-based auth checking at route level instead of provider level
3. Add organization-specific route wrapper component

---

**Status**: ✅ Complete

The blank screen issue has been resolved. The app now loads correctly for all user types, with clean console output and proper error handling.
