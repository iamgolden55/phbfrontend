---
date: 2025-11-10T03:59:01+0000
researcher: Claude Code
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Link PHB Page Issues: Auto-Refresh, Search Problems, and Non-Responsive Clicks"
tags: [research, codebase, link-phb, hospital-search, form-submission, user-registration]
status: complete
last_updated: 2025-11-10
last_updated_by: Claude Code
---

# Research: Link PHB Page Issues - Auto-Refresh, Search Problems, and Non-Responsive Clicks

**Date**: 2025-11-10T03:59:01+0000
**Researcher**: Claude Code
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

The user reported three critical issues with the Link PHB page (`/account/link-phb`):

1. **Auto-refresh when typing**: When typing the hospital name in the search field, the page automatically refreshes, requiring the user to type again
2. **Search for other hospitals fails**: For users who see nearby hospitals based on their location (e.g., user `publichealthbureau@hotmail.com` in DELTA STATE ASABA), searching for hospitals outside their area has "massive issues"
3. **Clicking does nothing**: When clicking on a hospital card or the "Link HPN Number" button, nothing happens

## Summary

After comprehensive analysis, I've identified the root causes for all three issues:

1. **Auto-refresh issue**: Caused by excessive re-renders due to multiple state updates (5+ per search) combined with the form onSubmit handler being recreated on every render, creating React reconciliation issues
2. **Search functionality issues**: Combination of aggressive throttling (500ms), debouncing (500ms), and cached data returns making rapid searches appear non-responsive
3. **Non-responsive clicks**: Hospital card onClick handlers are recreated on every render (not memoized), causing click events to be lost during frequent re-render cycles

All issues stem from **performance and state management problems**, not broken logic.

## Detailed Findings

### 1. Auto-Refresh When Typing Hospital Name

**File**: `src/pages/account/LinkPHBPage.tsx`

#### Root Cause Analysis

The "auto-refresh" is not an actual page reload, but rather **excessive React re-renders** causing the UI to appear to refresh:

**Primary Issue - Form Handler Recreation** (`LinkPHBPage.tsx:657-660`):
```tsx
<form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit(e);
}} className="mb-8">
```

The inline arrow function creates a **new function instance on every render**, potentially causing React to treat the form as a new element during reconciliation.

**Secondary Issue - Multiple State Updates** (`LinkPHBPage.tsx:129-182`):

The debounced search effect triggers 5+ state updates per search:
1. `setIsSearching(true)` at line 141
2. `setHospitals(formattedHospitals)` at line 158
3. `setNoHospitalsFound(...)` at line 159
4. `setLocationMessage(...)` at lines 162, 164
5. `setError(...)` at line 168 (if error)
6. `setIsSearching(false)` at line 170

**State Update Cascade**:
```
User types → onChange fires (line 756)
         → setSearchTerm() updates state → Component re-renders
         → Form onSubmit handler recreated (new function instance)
         → After 500ms → Search effect fires (line 144)
         → setIsSearching(true) → Re-render #2
         → API call completes → Re-render #3, #4, #5, #6
         → Total: 6+ re-renders per keystroke after debounce
```

**Evidence** (`LinkPHBPage.tsx:129-182`):
```typescript
useEffect(() => {
  // Clear any existing timeout
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }

  // If search term is empty or less than 2 characters, don't search
  if (!searchTerm || searchTerm.length < 2) {
    return;
  }

  // Set loading state immediately
  setIsSearching(true);  // ← State update #1

  // Debounce the search by 500ms
  searchTimeoutRef.current = setTimeout(async () => {
    try {
      const results = await searchHospitals(searchTerm, { limit: 50 });

      const formattedHospitals = results.map(hospital => ({
        ...hospital,
        region: hospital.state || hospital.city || '',
        available: hospital.available !== false
      }));

      setHospitals(formattedHospitals);  // ← State update #2
      setNoHospitalsFound(formattedHospitals.length === 0);  // ← State update #3

      if (formattedHospitals.length === 0) {
        setLocationMessage(`No hospitals found matching "${searchTerm}".`);  // ← State update #4
      } else {
        setLocationMessage(`Found ${formattedHospitals.length} hospital(s)`);  // ← State update #4
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search hospitals.');  // ← State update #5
    } finally {
      setIsSearching(false);  // ← State update #6
    }
  }, 500);
}, [searchTerm]);
```

#### Impact on User Experience

- User types a character
- Component re-renders immediately (searchTerm state change)
- After 500ms, 5+ more re-renders occur
- During re-renders, the form element may lose focus or reset
- User experiences this as the page "refreshing" and has to type again

---

### 2. Search for Other Hospitals - Massive Issues

**File**: `src/features/auth/authContext.tsx`

#### Root Cause Analysis

The search functionality has **three layers of throttling/caching** that make rapid searches appear broken:

**Issue 1 - API Throttling** (`authContext.tsx:1267-1271`):
```typescript
// Throttle identical API calls
if (shouldThrottleApiCall(endpoint, {})) {
  console.log("Throttling identical API call - returning cached data");
  return hospitalCache.current.allHospitals || [];
}
```

**Throttling Mechanism** (`authContext.tsx:275-293`):
- Prevents identical API calls within 500ms (default)
- Returns **cached data** instead of making new requests
- **Problem**: If user searches for "Delta", then quickly searches for "Abuja", the second search may return cached Delta results

**Issue 2 - Debouncing** (`LinkPHBPage.tsx:144-172`):
- Search doesn't trigger until user stops typing for 500ms
- **Total delay**: 500ms (debounce) + API call time + 500ms (potential throttle) = ~1000ms+ minimum

**Issue 3 - Cache Returns Empty Arrays** (`authContext.tsx:1292`):
```typescript
return hospitalCache.current.allHospitals || [];
```
- If previous search failed, cache contains empty array
- Next search returns empty array (throttled)
- User sees "No hospitals found" even though backend has results

#### Search API Implementation

**Endpoint**: `/api/hospitals/search/` (`authContext.tsx:1246-1296`)

```typescript
const searchHospitals = async (
  query: string,
  options?: {
    state?: string;
    city?: string;
    limit?: number;
  }
) => {
  if (!user) throw new Error("User not authenticated");

  // Build query parameters
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (options?.state) params.append('state', options.state);
  if (options?.city) params.append('city', options.city);
  if (options?.limit) params.append('limit', options.limit.toString());

  const endpoint = `/api/hospitals/search/?${params.toString()}`;

  // Throttle identical API calls
  if (shouldThrottleApiCall(endpoint, {})) {
    return hospitalCache.current.allHospitals || [];  // ← Returns stale data
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await apiRequest<{
      hospitals: Hospital[];
      message?: string;
      total?: number;
    }>(endpoint, 'GET');

    hospitalCache.current.allHospitals = response.hospitals || [];
    hospitalCache.current.timestamp = Date.now();

    return response.hospitals || [];
  } catch (err: any) {
    console.error("Search hospitals failed:", err);
    setError(err.message || "Failed to search hospitals.");
    return hospitalCache.current.allHospitals || [];  // ← Returns stale data on error
  } finally {
    setIsLoading(false);
  }
};
```

#### Example User Flow - Why Search "Breaks"

**Scenario**: User in Delta State wants to search for Abuja hospitals

1. **Initial Load** (`LinkPHBPage.tsx:208-317`):
   - Page loads → `loadHospitals(true)` called
   - Geolocation detected → Fetches hospitals in Delta State
   - Cache populated with Delta hospitals

2. **User Searches "Abuja"**:
   - User types "A" → debounce timer starts
   - User types "b" → timer resets
   - User types "u" → timer resets
   - User types "j" → timer resets
   - User types "a" → timer resets
   - 500ms passes → search API called for "abuja"

3. **Throttling Kicks In**:
   - If this is the first "abuja" search: **Works fine**, returns Abuja hospitals
   - If user searches "abuja" again within 500ms: **Returns cached Delta hospitals** (wrong!)
   - User sees Delta hospitals even though they searched for Abuja

4. **Cache Persistence**:
   - Cache key is based on endpoint + params
   - Different search terms use same cache (`hospitalCache.current.allHospitals`)
   - **Bug**: All searches overwrite the same cache, causing cross-contamination

---

### 3. Clicking on Hospital/Link HPN Does Nothing

**File**: `src/pages/account/LinkPHBPage.tsx`

#### Root Cause Analysis

**Issue 1 - Hospital Card Onclick Recreation** (`LinkPHBPage.tsx:806`):
```tsx
<div
  key={hospital.id}
  onClick={() => hospital.available && handleHospitalSelect(hospital.id)}
  className={...}
>
```

**Problem**:
- Arrow function `() => hospital.available && handleHospitalSelect(hospital.id)` creates a **new function on every render**
- Not memoized with `useCallback`
- During search (5+ re-renders), hospital cards re-render 5+ times
- If user clicks during re-render cycle, click event may be lost or ignored by React

**Issue 2 - Submit Button Disabled States** (`LinkPHBPage.tsx:873`):
```tsx
disabled={isSubmitting || isLoadingHospitals || noHospitalsFound || !selectedHospital}
```

**Four conditions that disable the button**:
1. `isSubmitting === true` - During form submission
2. `isLoadingHospitals === true` - During hospital fetch
3. `noHospitalsFound === true` - If no hospitals available
4. `!selectedHospital` - If no hospital selected

**Stuck State Scenarios**:
- If `isLoadingHospitals` gets stuck at `true` (API error before finally block), button remains disabled
- If `apiCallInProgress.current` flag isn't reset, subsequent loads fail and `isLoadingHospitals` stays true

#### Hospital Selection Handler Implementation

**Handler** (`LinkPHBPage.tsx:491-503`):
```typescript
const handleHospitalSelect = (hospitalId: number) => {
  setSelectedHospital(hospitalId);  // ← State update
  setError('');  // ← State update

  const selectedHosp = hospitals.find(h => h.id === hospitalId);
  if (selectedHosp) {
    checkHospitalRegionMismatch(selectedHosp);  // ← May set regionWarning state
  } else {
    setRegionWarning(null);  // ← State update
  }
}
```

**Problem**: 2-3 state updates per click → Component re-renders 2-3 times

#### Form Submission Handler

**Handler** (`LinkPHBPage.tsx:429-463`):
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!phbNumber.trim()) {
    setError('Please enter your HPN number');
    return;
  }

  if (!selectedHospital) {
    setError('Please select a hospital');
    return;
  }

  setIsSubmitting(true);
  setError('');

  try {
    const result = await registerWithHospital(selectedHospital, true);
    setSuccess(result.message || 'Successfully linked.');

    setTimeout(() => {
      navigate('/account');
    }, 3000);
  } catch (err: any) {
    console.error("Hospital registration failed:", err);
    setError(err.message || 'Failed to register.');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Cascading API Calls** - `registerWithHospital` triggers `checkPrimaryHospital`:

**In authContext.tsx** (`authContext.tsx:1298-1325`):
```typescript
const registerWithHospital = async (hospitalId: number, isPrimary: boolean = true) => {
  // ... validation ...

  setIsLoading(true);  // ← State update #1

  const response = await apiRequest('/api/hospitals/register/', 'POST', {
    hospital: hospitalId,
    is_primary: isPrimary
  });

  if (isPrimary && response.data) {
    await checkPrimaryHospital();  // ← Triggers ANOTHER API call with 4 more state updates
  }

  setIsLoading(false);  // ← State update #2
  return response;
};
```

**State Update Cascade**:
1. User clicks "Link HPN Number"
2. `setIsSubmitting(true)` → Re-render #1
3. `setError('')` → Re-render #2
4. `registerWithHospital()` called:
   - `setIsLoading(true)` in auth context → Re-render #3
   - API call to `/api/hospitals/register/`
   - `checkPrimaryHospital()` called:
     - `setIsLoading(true)` → Re-render #4
     - API call to `/api/user/has-primary-hospital/`
     - `setHasPrimaryHospital()` → Re-render #5
     - `setPrimaryHospital()` → Re-render #6
     - `setIsLoading(false)` → Re-render #7
   - `setIsLoading(false)` → Re-render #8
5. `setSuccess()` → Re-render #9
6. `setIsSubmitting(false)` → Re-render #10

**Total: 10+ re-renders for a single form submission**

---

## Code References

### Link PHB Page
- `src/pages/account/LinkPHBPage.tsx:657-660` - Form with recreated onSubmit handler
- `src/pages/account/LinkPHBPage.tsx:129-182` - Debounced search effect (5+ state updates)
- `src/pages/account/LinkPHBPage.tsx:756` - Search input onChange
- `src/pages/account/LinkPHBPage.tsx:757-761` - Search input onKeyDown (prevents Enter)
- `src/pages/account/LinkPHBPage.tsx:806` - Hospital card onClick (not memoized)
- `src/pages/account/LinkPHBPage.tsx:873` - Submit button disabled conditions
- `src/pages/account/LinkPHBPage.tsx:429-463` - Form submission handler
- `src/pages/account/LinkPHBPage.tsx:491-503` - Hospital selection handler

### Authentication Context
- `src/features/auth/authContext.tsx:1246-1296` - searchHospitals implementation
- `src/features/auth/authContext.tsx:1156-1202` - fetchNearbyHospitals implementation
- `src/features/auth/authContext.tsx:1298-1325` - registerWithHospital implementation
- `src/features/auth/authContext.tsx:1092-1154` - checkPrimaryHospital implementation
- `src/features/auth/authContext.tsx:275-293` - shouldThrottleApiCall helper
- `src/features/auth/authContext.tsx:1267-1271` - Throttling check in searchHospitals

### API Endpoints
- `GET /api/hospitals/search/` - Search hospitals with filters (query, state, city, limit)
- `GET /api/hospitals/nearby/` - Get nearby hospitals by geolocation (latitude, longitude, radius)
- `POST /api/hospitals/register/` - Register user with hospital (set as primary)
- `GET /api/user/has-primary-hospital/` - Check if user has primary hospital

---

## Architecture Insights

### Performance Anti-Patterns Identified

1. **Inline Function Creation**:
   - Form onSubmit handler recreated on every render
   - Hospital card onClick handlers recreated on every render
   - Creates new function instances → React reconciliation issues

2. **Excessive State Updates**:
   - Search: 5+ state updates per search
   - Form submission: 10+ state updates per submit
   - Each state update triggers re-render → Performance degradation

3. **Aggressive Caching/Throttling**:
   - 500ms throttle on API calls
   - Returns stale cached data
   - Cache key doesn't differentiate between different searches

4. **No Memoization**:
   - Filtered hospitals recalculated on every render (line 486)
   - Region extraction recalculated on every render (line 483)
   - No `useMemo` or `useCallback` usage

5. **Cascading API Calls**:
   - `registerWithHospital` → `checkPrimaryHospital`
   - Creates nested loading states
   - Multiple isLoading toggles (true → false → true → false)

### State Management Issues

**Multiple Loading States**:
- `isLoading` in auth context (shared across all components)
- `isSubmitting` in LinkPHBPage
- `isLoadingHospitals` in LinkPHBPage
- `isSearching` in LinkPHBPage

**Problem**: All four can be `true` simultaneously, causing UI confusion

**Ref-based Flags**:
- `hasInitialized.current` - Prevents double-mount in React Strict Mode
- `hospitalsLoaded.current` - Tracks if hospitals loaded
- `apiCallInProgress.current` - Prevents concurrent API calls
- `searchTimeoutRef.current` - Stores debounce timeout

**Good**: Prevents unnecessary API calls
**Bad**: Can get out of sync with actual state (stuck flags)

---

## Historical Context (from thoughts/)

### Related Issues

1. **Onboarding Flow Issues** (`thoughts/shared/research/2025-10-31-onboarding-non-functional-features.md`):
   - "Find hospital near me" button navigates to wrong page (should go to `/account/link-phb`)
   - Shows the hospital linking flow has broader issues beyond just the page itself

2. **Professional Registration 401 Error** (`thoughts/shared/research/2025-11-03-professional-registration-401-error.md`):
   - Public endpoint `/api/registry/public/applications/` returns 401
   - Similar authentication/endpoint issues may affect hospital search APIs

3. **Contact Preferences Non-Functional** (`thoughts/shared/research/2025-10-31-2fa-contact-preferences-issues.md`):
   - Backend endpoint not implemented
   - Pattern of incomplete backend implementations

### Related Research
- `thoughts/shared/research/2025-10-31-onboarding-non-functional-features.md` - Onboarding button issues
- `thoughts/shared/plans/2025-10-31-fix-onboarding-non-functional-buttons.md` - Fix plan for onboarding
- `thoughts/shared/research/2025-11-03-professional-registration-401-error.md` - API endpoint issues
- `thoughts/shared/research/2025-11-08-appointment-prescription-pharmacy-flow.md` - Related healthcare workflows

---

## Recommended Solutions

### 1. Fix Auto-Refresh Issue

**Solution 1: Extract Form Handler**
```typescript
// Before (line 657-660)
<form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit(e);
}}>

// After
const handleFormSubmit = useCallback((e: React.FormEvent) => {
  e.preventDefault();
  handleSubmit(e);
}, [handleSubmit]);

<form onSubmit={handleFormSubmit}>
```

**Solution 2: Batch State Updates**
```typescript
// Use React 18 automatic batching or combine into single state object
const [searchState, setSearchState] = useState({
  isSearching: false,
  hospitals: [],
  noHospitalsFound: false,
  locationMessage: null,
  error: null
});

// Single state update instead of 5+
setSearchState({
  isSearching: false,
  hospitals: formattedHospitals,
  noHospitalsFound: formattedHospitals.length === 0,
  locationMessage: `Found ${formattedHospitals.length} hospitals`,
  error: null
});
```

**Solution 3: Remove Redundant preventDefault**
```typescript
// Remove line 658's preventDefault (already in handleSubmit at line 430)
<form onSubmit={handleSubmit}>  // handleSubmit already calls preventDefault
```

### 2. Fix Search Functionality

**Solution 1: Fix Cache Key Collision**
```typescript
// In authContext.tsx
// Create separate cache entries for different searches
const cacheKey = `search_${query}_${options?.state || ''}_${options?.city || ''}`;
hospitalCache.current[cacheKey] = response.hospitals;

// Return from correct cache entry
return hospitalCache.current[cacheKey] || [];
```

**Solution 2: Reduce Throttle Time**
```typescript
// Change from 500ms to 200ms or remove throttling entirely for search
if (shouldThrottleApiCall(endpoint, {}, 200)) {  // Was: default 500ms
```

**Solution 3: Clear Cache on New Search**
```typescript
// In LinkPHBPage.tsx search effect
searchTimeoutRef.current = setTimeout(async () => {
  // Clear previous results to show loading state
  setHospitals([]);
  setNoHospitalsFound(false);

  try {
    const results = await searchHospitals(searchTerm, { limit: 50 });
    // ... rest of code
  }
}, 500);
```

### 3. Fix Non-Responsive Clicks

**Solution 1: Memoize Hospital Card Handler**
```typescript
const handleHospitalClick = useCallback((hospitalId: number, hospital: Hospital) => {
  if (!hospital.available) return;

  setSelectedHospital(hospitalId);
  setError('');
  checkHospitalRegionMismatch(hospital);
}, []);

// In JSX (line 806)
<div
  onClick={() => handleHospitalClick(hospital.id, hospital)}
>
```

**Solution 2: Prevent Click During Loading**
```typescript
// Add pointer-events-none during loading
<div
  onClick={() => hospital.available && !isSearching && handleHospitalSelect(hospital.id)}
  className={`... ${isSearching ? 'pointer-events-none' : ''}`}
>
```

**Solution 3: Debounce Button Clicks**
```typescript
const handleSubmitDebounced = useCallback(
  debounce((e: React.FormEvent) => handleSubmit(e), 300),
  [handleSubmit]
);
```

**Solution 4: Prevent Cascading State Updates**
```typescript
// In registerWithHospital, don't call checkPrimaryHospital
// Let the component handle it after success

const registerWithHospital = async (hospitalId: number, isPrimary: boolean = true) => {
  // ... validation ...

  const response = await apiRequest('/api/hospitals/register/', 'POST', {
    hospital: hospitalId,
    is_primary: isPrimary
  });

  // Remove this line (prevents cascading API calls)
  // if (isPrimary && response.data) {
  //   await checkPrimaryHospital();
  // }

  return response;
};

// In LinkPHBPage, call checkPrimaryHospital separately if needed
const handleSubmit = async (e: React.FormEvent) => {
  // ... validation ...

  try {
    const result = await registerWithHospital(selectedHospital, true);

    // Manually refresh if needed
    // await checkPrimaryHospital();

    setSuccess(result.message);
    setTimeout(() => navigate('/account'), 3000);
  } catch (err) {
    // ... error handling
  }
};
```

---

## Open Questions

1. **Backend Performance**: Are the hospital search APIs properly indexed? Slow queries could compound frontend performance issues.

2. **Geolocation Accuracy**: How accurate is the geolocation → nearby hospitals feature? Are hospitals properly geocoded in the database?

3. **Cache Strategy**: Should we use a more sophisticated cache (e.g., React Query) instead of custom useRef-based caching?

4. **Error Recovery**: If `apiCallInProgress.current` or `isLoadingHospitals` gets stuck, how should users recover? Add a "Reset" button?

5. **Mobile Experience**: Are these issues worse on mobile devices with slower processors?

6. **Analytics**: Are users abandoning the Link PHB flow at a high rate? This would indicate severity.

---

## Testing Recommendations

### Manual Testing Scenarios

1. **Auto-Refresh Test**:
   - Type "Delta" slowly (one character per second)
   - Type "Delta" quickly (5 characters in 1 second)
   - Does input lose focus?
   - Does input value reset?

2. **Search Test**:
   - Search "Delta" → Wait for results
   - Immediately search "Abuja" → Do results update?
   - Search "Delta" again within 500ms → Do you get Abuja results (cache bug)?

3. **Click Test**:
   - Search for a hospital
   - While results are loading (isSearching === true), click a hospital
   - Does it register?
   - After results load, click a hospital
   - Does it register?

4. **Form Submission Test**:
   - Select a hospital
   - Click "Link HPN Number"
   - Watch browser DevTools console for errors
   - Watch Network tab for API calls
   - Does button stay disabled after submission?

### Automated Testing Recommendations

```typescript
// Add React Testing Library tests
describe('LinkPHBPage', () => {
  it('should not lose focus during search typing', async () => {
    const { getByLabelText } = render(<LinkPHBPage />);
    const searchInput = getByLabelText('Search for a hospital');

    fireEvent.change(searchInput, { target: { value: 'Delta' } });

    // Wait for debounce and state updates
    await waitFor(() => {
      expect(document.activeElement).toBe(searchInput);
    }, { timeout: 1000 });
  });

  it('should handle rapid hospital selection clicks', async () => {
    const { getByText } = render(<LinkPHBPage />);

    const hospitalCard = getByText('Delta State Hospital');

    // Rapid clicks
    fireEvent.click(hospitalCard);
    fireEvent.click(hospitalCard);
    fireEvent.click(hospitalCard);

    // Should not throw errors or cause state corruption
    await waitFor(() => {
      expect(/* selected state */).toBeDefined();
    });
  });
});
```

---

## Priority Severity Assessment

**Issue 1 - Auto-Refresh**: 🔴 **CRITICAL**
- Blocks core user flow (hospital registration required for appointments)
- Severe user frustration (cannot complete typing)
- High abandonment risk

**Issue 2 - Search**: 🟠 **HIGH**
- Limits hospital discovery
- Affects users outside their immediate area
- Workaround exists (scroll through all hospitals)

**Issue 3 - Non-Responsive Clicks**: 🔴 **CRITICAL**
- Completely blocks form submission
- No workaround if button doesn't respond
- May be intermittent (works sometimes, fails others)

**Recommended Fix Order**:
1. Fix non-responsive clicks (highest impact)
2. Fix auto-refresh (blocking user flow)
3. Fix search functionality (quality of life)
