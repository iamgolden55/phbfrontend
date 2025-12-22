---
date: 2025-12-17T00:26:37+0000
researcher: Claude Code
git_commit: 79990a0f02f834e33797ea8980e3d783d283664e
branch: main
repository: phbfrontend
topic: "Analytics Page Logic Errors - Discharging Patients and Active Patients Calculations"
tags: [research, analytics, patient-data, data-consistency, frontend]
status: complete
last_updated: 2025-12-17
last_updated_by: Claude Code
---

# Research: Analytics Page Logic Errors - Discharging Patients and Active Patients Calculations

**Date**: 2025-12-17T00:26:37+0000
**Researcher**: Claude Code
**Git Commit**: 79990a0f02f834e33797ea8980e3d783d283664e
**Branch**: main
**Repository**: phbfrontend

## Research Question

Investigate the analytics page for errors in:
1. Discharging patient logic
2. Active admitted patient logic
3. Ensure active admitted patients logic uses `current_patient_count` from each department to aggregate total active patients
4. Verify staff utilization rate calculation is correct

## Summary

**Critical Issues Found:**

1. **Discharge Logic Inconsistency**: The chart data calculation doesn't verify discharge status, only the presence of a discharge date
2. **Active Patients Data Source Mismatch**: The KPI calculates active patients by filtering admissions, NOT by aggregating `current_patient_count` from departments as intended
3. **Department Aggregates Inconsistency**: The hook uses `occupiedBeds` for total patients, while filtered aggregates use `current_patient_count`
4. **Staff Utilization**: Calculation is correct, but references inconsistent patient data

## Detailed Findings

### 1. Discharging Patient Logic Error

**Location**: `src/pages/organization/AnalyticsPage.tsx`

#### Chart Data Calculation (Lines 376-377)
```typescript
const dayDischarges = admissions.filter((adm: AdmissionData) =>
  adm.actual_discharge_date && format(parseISO(adm.actual_discharge_date), 'yyyy-MM-dd') === dateStr
);
```

**Issue**: Only checks if `actual_discharge_date` exists, does NOT verify `status === 'discharged'`

#### Department Discharge Stats (Line 429)
```typescript
if (adm.status === 'discharged' && adm.actual_discharge_date) {
```

**Correct**: Checks BOTH status and discharge date

**Impact**: The chart may count records that have discharge dates but aren't actually in 'discharged' status, leading to inflated discharge counts in the Patient Flow Progression chart.

**Recommendation**: Add `adm.status === 'discharged'` check to line 376-377:
```typescript
const dayDischarges = admissions.filter((adm: AdmissionData) =>
  adm.status === 'discharged' &&
  adm.actual_discharge_date &&
  format(parseISO(adm.actual_discharge_date), 'yyyy-MM-dd') === dateStr
);
```

### 2. Active Admitted Patients Logic Error

**Location**: `src/pages/organization/AnalyticsPage.tsx:548-552`

#### Current Implementation
```typescript
const activeAdmissions = admissions.filter(
  (a: AdmissionData) => a.status === 'admitted'
).length;
```

**Issue**: Calculates active patients by filtering the admissions list for `status === 'admitted'`, completely ignoring the `current_patient_count` field from departments.

#### What Should Happen (Per User Request)
Active patients should be calculated by aggregating `current_patient_count` from each department:

```typescript
// Should use this instead:
const activeAdmissions = departmentAggregates.totalPatients;
```

**However**, there's a deeper issue with `departmentAggregates.totalPatients`:

### 3. Department Aggregates Data Source Inconsistency

**Location**: Multiple files

#### Hook's Calculation (`useDepartmentStats.ts:254`)
```typescript
// 🏥 Patient statistics - Use occupied_beds instead of current_patient_count to avoid double-counting
// Note: current_patient_count might include outpatients or other non-bed patients
const totalPatients = occupiedBeds; // Use occupiedBeds instead of summing current_patient_count
```

**Uses**: `occupiedBeds` as the source for `totalPatients`

#### Filtered Aggregates (`AnalyticsPage.tsx:230`)
```typescript
totalPatients: acc.totalPatients + safeInt(dept.current_patient_count),
```

**Uses**: `current_patient_count` when a specific department is selected

#### The Problem

When `departmentFilter === 'all'`:
- Returns `allDepartmentAggregates` from hook
- Hook's stats use `occupiedBeds` as `totalPatients`

When `departmentFilter === specific department`:
- Recalculates aggregates
- Uses `current_patient_count` as `totalPatients`

**Result**: Inconsistent behavior based on department filter selection

### 4. Staff Utilization Rate Calculation

**Location**: `src/pages/organization/AnalyticsPage.tsx:588-677`

#### KPI Calculation (Lines 561-563)
```typescript
const staffUtilization = departmentStats.length > 0
  ? (departmentStats.reduce((sum, dept) => sum + (dept.staff_utilization_rate || 0), 0) / departmentStats.length)
  : 0;
```

#### Insight Calculation (Lines 592-594, 597-602)
```typescript
// Average staff utilization across departments
const staffUtilization = departmentStats.length > 0
  ? (departmentStats.reduce((sum, dept) => sum + (dept.staff_utilization_rate || 0), 0) / departmentStats.length)
  : 0;

// Total current staff from all departments
const totalCurrentStaff = departmentStats.reduce((sum, dept) => sum + (dept.current_staff_count || 0), 0);

// Total patients from all departments
const totalPatients = departmentStats.reduce((sum, dept) => sum + (dept.current_patient_count || 0), 0);

// Average recommended staff ratio
const avgStaffRatio = departmentStats.length > 0
  ? (departmentStats.reduce((sum, dept) => sum + (dept.recommended_staff_ratio || 0), 0) / departmentStats.length)
  : 0;

// Calculate recommended staff
const recommendedStaff = Math.ceil(totalPatients * avgStaffRatio);
```

**Verdict**: ✅ **Calculation is mathematically correct**

**However**: The insight uses `dept.current_patient_count` for total patients (line 598), while the "Active Admitted Patients" KPI uses filtered admissions (line 548-552). These values may not match, leading to confusion where:
- The insight shows "You have 50 staff serving 120 patients"
- But the Active Patients KPI shows 95 patients

## Code References

### Primary Issues
- `src/pages/organization/AnalyticsPage.tsx:376-377` - Discharge filter missing status check
- `src/pages/organization/AnalyticsPage.tsx:548-552` - Active patients not using department data
- `src/pages/organization/AnalyticsPage.tsx:230` - Filtered aggregates use current_patient_count
- `src/hooks/useDepartmentStats.ts:254` - Hook uses occupiedBeds as totalPatients

### Working Correctly
- `src/pages/organization/AnalyticsPage.tsx:429` - Discharge stats correctly check status
- `src/pages/organization/AnalyticsPage.tsx:561-563` - Staff utilization KPI correct
- `src/pages/organization/AnalyticsPage.tsx:588-677` - Staff utilization insight correct

### Data Sources
- `src/hooks/useAdmissionData.ts` - Fetches admissions from `/api/admissions/`
- `src/hooks/useDepartmentStats.ts` - Fetches departments from `/api/hospitals/departments/`

## Architecture Insights

### Data Flow for Active Patients

```
Backend API
   ↓
useDepartmentStats Hook → Returns stats.totalPatients (using occupiedBeds)
   ↓
AnalyticsPage → allDepartmentAggregates
   ↓
Department Filter === 'all'
   → Uses allDepartmentAggregates (occupiedBeds)

Department Filter === 'specific'
   → Recalculates using current_patient_count

KPI Calculation
   → Ignores both, filters admissions list
```

**Recommended Flow:**
```
Backend API
   ↓
useDepartmentStats Hook → Sum current_patient_count from all departments
   ↓
AnalyticsPage → Use departmentAggregates.totalPatients consistently
   ↓
KPI Calculation → Use departmentAggregates.totalPatients
```

### Why Multiple Sources Exist

1. **Historical Decision**: Comment in `useDepartmentStats.ts:254` suggests `current_patient_count` might include outpatients, so `occupiedBeds` was chosen
2. **Filtering Logic**: When a department is selected, the page recalculates using `current_patient_count`
3. **Direct Counting**: KPI calculation counts admissions directly, possibly for "real-time" accuracy

### Architectural Recommendations

1. **Standardize on One Source**: Choose either `current_patient_count` or `occupiedBeds` as the single source of truth
2. **Update Hook**: Modify `useDepartmentStats.ts` to use `current_patient_count` if that's the preferred source
3. **Remove Direct Filtering**: KPI should use `departmentAggregates.totalPatients` instead of filtering admissions
4. **Add Status Check**: Include `status === 'discharged'` in discharge calculations for consistency

## Recommended Fixes

### Fix 1: Discharge Logic Consistency
**File**: `src/pages/organization/AnalyticsPage.tsx:376-377`

**Change**:
```typescript
// OLD
const dayDischarges = admissions.filter((adm: AdmissionData) =>
  adm.actual_discharge_date && format(parseISO(adm.actual_discharge_date), 'yyyy-MM-dd') === dateStr
);

// NEW
const dayDischarges = admissions.filter((adm: AdmissionData) =>
  adm.status === 'discharged' &&
  adm.actual_discharge_date &&
  format(parseISO(adm.actual_discharge_date), 'yyyy-MM-dd') === dateStr
);
```

### Fix 2: Use Department Data for Active Patients
**File**: `src/pages/organization/AnalyticsPage.tsx:548-585`

**Change**:
```typescript
// OLD
const activeAdmissions = admissions.filter(
  (a: AdmissionData) => a.status === 'admitted'
).length;

// NEW - Use aggregated department data
const activeAdmissions = departmentAggregates.totalPatients || 0;
```

### Fix 3: Standardize Hook's Total Patients Calculation
**File**: `src/hooks/useDepartmentStats.ts:252-256`

**Change**:
```typescript
// OLD
const totalPatients = occupiedBeds; // Use occupiedBeds instead of summing current_patient_count

// NEW - Use current_patient_count as requested
const totalPatients = activeDepts.reduce((sum, dept) => {
  return sum + safeNumber(dept.current_patient_count);
}, 0);
```

### Fix 4: Update Comment to Reflect New Logic
**File**: `src/hooks/useDepartmentStats.ts:252-254`

**Change**:
```typescript
// OLD COMMENT
// 🏥 Patient statistics - Use occupied_beds instead of current_patient_count to avoid double-counting
// Note: current_patient_count might include outpatients or other non-bed patients

// NEW COMMENT
// 🏥 Patient statistics - Use current_patient_count from each department
// This represents all currently active patients in the department
```

## Testing Recommendations

1. **Compare Values**: After fixes, verify that:
   - Active Patients KPI matches sum of department `current_patient_count`
   - Staff utilization insight patient count matches Active Patients KPI
   - Discharge counts don't include non-discharged records

2. **Edge Cases**:
   - Test with department filter = 'all'
   - Test with specific department selected
   - Test with patients who have discharge dates but aren't discharged
   - Test with 0 patients in departments

3. **Data Consistency**:
   - Compare `current_patient_count` vs `occupiedBeds` in backend
   - Verify which value is more accurate for "active admitted patients"

## Open Questions

1. **Backend Data**: Does `current_patient_count` include outpatients, or only admitted inpatients?
2. **Occupancy vs Admissions**: Should we use bed occupancy (`occupiedBeds`) or admission status counts?
3. **Real-time Updates**: How frequently does `current_patient_count` update in the backend?
4. **Historical Data**: Should archived/transferred patients affect these counts?

## Related Files

- `src/pages/organization/AnalyticsPage.tsx` - Main analytics dashboard
- `src/hooks/useAdmissionData.ts` - Admissions data hook
- `src/hooks/useDepartmentStats.ts` - Department statistics hook
- `src/components/organization/DashboardWidgets.tsx` - Dashboard widgets (may use similar logic)

## Conclusion

The analytics page has significant data consistency issues stemming from using multiple data sources for "active patients":

1. ❌ KPI uses filtered admissions count
2. ❌ Hook uses `occupiedBeds`
3. ❌ Filtered aggregates use `current_patient_count`
4. ❌ Discharge chart doesn't verify status

**Impact**: Displayed metrics are inconsistent and potentially inaccurate, leading to confusion for hospital administrators making staffing and operational decisions.

**Priority**: High - This affects critical hospital operations metrics

**Effort**: Low-Medium - Changes are localized to specific calculations