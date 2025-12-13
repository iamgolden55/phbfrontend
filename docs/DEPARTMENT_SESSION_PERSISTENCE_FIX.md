# Department Management - Session Persistence Fix

**Date:** December 13, 2025
**Issue:** Page refresh causing logout after Department Management implementation
**Status:** ✅ FIXED

---

## Problem Description

After implementing the Department Management system (Phases 1-4), users experienced session logout when refreshing the page. This was a regression of a previously fixed issue documented in `SESSION_PERSISTENCE_FIX.md`.

### Symptoms
- Page refresh would log users out
- Error message: "Failed to load profile: 404"
- Session not being restored properly on page load

---

## Root Cause

The newly created `DepartmentManagementPage` component was making API calls **before** the authentication context finished initializing, causing requests to be sent without proper session cookies being restored.

**Problematic code:**
```typescript
// ❌ INCORRECT - Calls API immediately without waiting for auth
useEffect(() => {
  loadDepartments();
}, []);
```

This violated the established pattern for session persistence that requires waiting for `isInitialized && !authLoading` before making any API calls.

---

## Solution

Updated `DepartmentManagementPage.tsx` to follow the correct authentication initialization pattern, matching the implementation in `useDepartmentStats.ts`.

### Changes Made

**1. Added Auth State Extraction:**
```typescript
// Auth state - CRITICAL: Must wait for initialization before making API calls
const { isInitialized, isLoading: authLoading, userData } = useOrganizationAuth();
```

**2. Updated loadDepartments useEffect:**
```typescript
// Load departments when auth is fully initialized
// CRITICAL: Must wait for isInitialized to ensure session restoration is complete
useEffect(() => {
  if (isInitialized && !authLoading && userData?.hospital?.id) {
    console.log('🏥 ✅ Auth initialized, loading departments...');
    loadDepartments();
  } else {
    console.log('🏥 ⏳ Waiting for auth initialization...', {
      isInitialized,
      authLoading,
      hospitalId: userData?.hospital?.id
    });
  }
}, [isInitialized, authLoading, userData?.hospital?.id]);
```

**3. Added Early Return for Auth Loading:**
```typescript
// Wait for auth initialization before rendering
// This prevents premature API calls during session restoration
if (!isInitialized || authLoading) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    </Container>
  );
}
```

---

## Session Persistence Pattern

All organization pages **MUST** follow this pattern to ensure session persistence works correctly:

### Required Steps

1. **Import the auth hook:**
   ```typescript
   import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
   ```

2. **Extract auth state:**
   ```typescript
   const { isInitialized, isLoading: authLoading, userData } = useOrganizationAuth();
   ```

3. **Wait for auth before API calls:**
   ```typescript
   useEffect(() => {
     if (isInitialized && !authLoading && userData?.hospital?.id) {
       // Safe to make API calls now
       loadData();
     }
   }, [isInitialized, authLoading, userData?.hospital?.id]);
   ```

4. **Show loading state during auth initialization:**
   ```typescript
   if (!isInitialized || authLoading) {
     return <CircularProgress />;
   }
   ```

---

## Why This Pattern Is Critical

1. **HTTP-Only Cookies:** Session tokens are stored in HTTP-only cookies that need to be restored from the browser
2. **Async Initialization:** The auth context performs async operations to restore the session
3. **Race Conditions:** Making API calls before session restoration completes causes 401/404 errors
4. **Session Loss:** Premature API calls can trigger logout flows before the session is fully restored

---

## Files Modified

- `/Users/new/phbfinal/phbfrontend/src/pages/organization/DepartmentManagementPage.tsx`
  - Added `useOrganizationAuth()` hook
  - Updated `loadDepartments` useEffect to wait for auth initialization
  - Added early return for loading state during auth initialization

---

## Testing

### Manual Testing Steps

1. Login to organization account
2. Navigate to Department Management page (`/organization/departments`)
3. Verify departments load correctly
4. **Refresh the page** (Cmd+R / Ctrl+R)
5. ✅ User should remain logged in
6. ✅ Departments should reload successfully
7. ✅ No 404 errors should appear in console

### Console Logs to Verify

When page loads, you should see:
```
🏥 ⏳ Waiting for auth initialization... { isInitialized: false, authLoading: true, hospitalId: undefined }
🏥 ✅ Auth initialized, loading departments...
```

When refreshing the page:
```
🏥 ⏳ Waiting for auth initialization... { isInitialized: false, authLoading: true, hospitalId: undefined }
[Auth context restores session from cookies]
🏥 ✅ Auth initialized, loading departments...
```

---

## Related Documentation

- **Previous Fix:** `/Users/new/phbfinal/phbfrontend/docs/SESSION_PERSISTENCE_FIX.md`
- **Auth Context:** `src/features/organization/organizationAuthContext.tsx`
- **Reference Implementation:** `src/hooks/useDepartmentStats.ts` (lines 310-323)
- **Department Management:** `docs/DEPARTMENT_MANAGEMENT_IMPLEMENTATION_COMPLETE.md`

---

## Prevention

To prevent this issue in the future:

1. **Always use the auth pattern** when creating new organization pages
2. **Check `isInitialized` flag** before making any API calls
3. **Add early loading returns** to prevent rendering before auth is ready
4. **Reference working examples** like `useDepartmentStats.ts` when unsure
5. **Test page refresh** as part of development workflow

---

## Status

✅ **FIXED** - Session persistence now works correctly on Department Management page

The fix follows the established pattern and is consistent with other organization pages that already implement session persistence correctly.

---

**Fixed By:** AI Assistant
**Date:** December 13, 2025
**Related Issue:** Session logout on page refresh (regression)
