---
date: 2025-12-12T08:59:56Z
researcher: Claude
git_commit: b1b01de1a24739f0e33ab785d2e536faabdd184b
branch: main
repository: phbfrontend
topic: "Organization Dashboard Data Migration: Old vs New Implementation"
tags: [research, organization, dashboard, api, migration, data-integration]
status: complete
last_updated: 2025-12-12
last_updated_by: Claude
---

# Research: Organization Dashboard Data Migration

**Date**: 2025-12-12T08:59:56Z
**Researcher**: Claude
**Git Commit**: b1b01de1a24739f0e33ab785d2e536faabdd184b
**Branch**: main
**Repository**: phbfrontend

## Research Question

How should we migrate the organization dashboard from the old implementation to the new ModernOrganizationDashboard, ensuring all real backend data is properly integrated and displayed with correct user information?

## Summary

The old organization dashboard (`OrganizationDashboardPage.tsx`) renders role-specific dashboards (HospitalDashboard, NGODashboard, PharmaDashboard) that fetch real data from backend APIs. The new ModernOrganizationDashboard uses hardcoded mock data and only displays the user's full name. **Critical Issue**: The new dashboard needs to be integrated with the existing backend API endpoints to display real organization statistics, user information, and metrics.

**Key Findings:**
- Old HospitalDashboard fetches data from 5 different API endpoints with comprehensive statistics
- New dashboard has NO API integration - everything is mock data
- Backend endpoints are well-established and working
- NGO and Pharmacy dashboards also need real data integration (currently mock)
- User authentication context provides necessary organization details but new dashboard doesn't use them

## Detailed Findings

### Old Dashboard Implementation

#### 1. OrganizationDashboardPage (`src/pages/organization/OrganizationDashboardPage.tsx`)

**Data Sources:**
- `useOrganizationAuth()` hook provides:
  - `userData.full_name` - User's full name
  - `userData.role` - Organization type (hospital_admin, ngo_admin, pharmacy_admin)
  - `userData.hospital?.name` - Organization name
  - `userData.hospital?.id` - Organization ID (used for API queries)
  - `isAuthenticated`, `isLoading`, `isInitialized` - Auth state

**Rendering Logic:**
```typescript
// Determines which dashboard to render based on role
switch (userData.role) {
  case 'hospital_admin': return <HospitalDashboard userData={userData} />;
  case 'ngo_admin': return <NGODashboard userData={userData} />;
  case 'pharmacy_admin': return <PharmaDashboard userData={userData} />;
}
```

**Display Elements:**
- Shows organization name from `userData.hospital?.name || userData.ngo?.name || userData.pharmacy?.name`
- Displays user welcome message with `userData.full_name`
- Includes common announcements and events sections (static)

#### 2. HospitalDashboard (`src/features/organization/dashboards/HospitalDashboard.tsx`)

**The most data-rich dashboard with real backend integration:**

**Data Sources & API Endpoints:**

1. **Registration Statistics** - `useRegistrationStats()`
   - API: `/api/hospitals/registrations/?status=pending` and `?status=approved`
   - Data: Counts of pending and approved registrations
   - Used for: Badge notifications, approval tracking

2. **Department Statistics** - `useDepartmentStats()`
   - API: `/api/hospitals/departments/?hospital={hospitalId}`
   - Returns comprehensive data per department:
     ```typescript
     {
       total_beds: number,
       occupied_beds: number,
       available_beds: number,
       icu_beds: number,
       occupied_icu_beds: number,
       available_icu_beds: number,
       bed_utilization_rate: number,
       current_staff_count: number,
       minimum_staff_required: number,
       is_understaffed: boolean,
       staff_utilization_rate: number,
       current_patient_count: number,
       utilization_rate: number
     }
     ```
   - Aggregates to hospital-wide statistics:
     - Total/occupied/available beds (regular + ICU)
     - Overall bed utilization percentage
     - Total staff count
     - Understaffed department count
     - Critical alerts (low bed availability, high utilization)

3. **Admission Data** - `useAdmissionData()`
   - API: `/api/admissions/`
   - Returns admission records with:
     ```typescript
     {
       admission_id: string,
       patient_name: string,
       patient_age: number,
       department_name: string,
       attending_doctor_name: string,
       status: 'pending' | 'admitted' | 'discharged' | 'transferred' | 'deceased' | 'left_ama',
       priority: string,
       admission_date: string
     }
     ```
   - Used for: Recent admissions list, active patient count, status breakdown

4. **Staff Data** - `StaffService.fetchStaffMembers()`
   - API: `/api/staff/`
   - Returns: `{ status, total_staff, staff_members[] }`
   - Staff member data:
     ```typescript
     {
       full_name: string,
       role_display: string,
       department_name: string,
       availability_status: {
         is_available: boolean,
         consultation_hours_start: string,
         consultation_hours_end: string
       }
     }
     ```
   - Used for: Staff on duty list, staff count statistics

**Statistics Displayed (with real data):**
- Active Patients: Count from admissions with status 'admitted'
- Available Beds: `availableBeds / totalBeds` from department stats
- Bed Utilization: Percentage calculated from department stats
- Staff On Duty: Count of staff where `is_available = true`
- Approved Registrations: Count from registration API

**Visual Components:**
- 5 stat cards with gradient backgrounds showing key metrics
- Bar chart for resource utilization (beds, ICU beds, staff, patients)
- Recent admissions list with real patient data
- Staff on duty list with avatars and availability
- Critical alerts banner when beds are low or departments understaffed
- Ward occupancy visualization
- Surgery schedule overview (mock data)
- Recent activities table (mock data)
- Notifications panel (mock data)

#### 3. NGODashboard (`src/features/organization/dashboards/NGODashboard.tsx`)

**Current Implementation:**
- **ALL DATA IS HARDCODED**
- No API calls
- Static statistics:
  - Active Programs: 12
  - Beneficiaries Reached: 5,400+
  - Active Volunteers: 75
  - Funds Raised: $28,500
- Mock program highlights and volunteer activity
- Quick links to management pages

**Needs:**
- Real NGO-specific API endpoints for programs, beneficiaries, volunteers, donations
- Integration with backend NGO data models

#### 4. PharmaDashboard (`src/features/organization/dashboards/PharmaDashboard.tsx`)

**Current Implementation:**
- **ALL DATA IS HARDCODED**
- No API calls
- Static statistics:
  - Active Clinical Trials: 8
  - Products in Pipeline: 25
  - Pending Regulatory Submissions: 5
  - Research Publications: 18
- Mock clinical trial status and pipeline overview
- Quick links to management pages

**Needs:**
- Real pharmaceutical-specific API endpoints for trials, inventory, R&D projects
- Integration with backend pharmaceutical data models

### New Dashboard Implementation

#### ModernOrganizationDashboard (`src/pages/organization/ModernOrganizationDashboard.tsx`)

**Current State:**
- Only uses `userData` from `useOrganizationAuth()`
- Displays: `userData?.full_name || 'Admin'` in welcome message
- **ALL STATISTICS ARE HARDCODED:**
  ```typescript
  // Examples of hardcoded data
  - Attendance Overview: "120/154" (+2.1%)
  - Total Projects: "90/125" (-2.1%)
  - Total Clients: "69/86" (-11.2%)
  - Total Tasks: "25/28" (+11.2%)
  - Earnings: "$21445" (+10.2%)
  - Profit: "$5,544" (+2.1%)
  - Job Applicants: "98" (+2.1%)
  - New Hires: "45/48" (-11.2%)
  ```
- Mock charts for employee status, attendance, and departments
- Mock clock-in/out list with fake employee names
- Generic "SmartHR" branding instead of organization-specific

**Missing Integration:**
- No connection to any backend API endpoints
- No organization-specific data (type, name, stats)
- No role-based customization
- No real metrics or trends
- No use of hospital/NGO/pharmacy-specific data

### Authentication Context Data Available

From `organizationAuthContext.tsx`, the following data is readily available:

```typescript
interface UserData {
  id: number;
  email: string;
  full_name: string;
  role: 'hospital_admin' | 'ngo_admin' | 'pharmacy_admin';
  hospital?: {
    id: number;
    name: string;
    code: string;
  };
  ngo?: {
    id: number;
    name: string;
    code: string;
  };
  pharmacy?: {
    id: number;
    name: string;
    code: string;
  };
  is_verified: boolean;
  position: string;
}
```

**Additionally available:**
- `isAuthenticated` - Boolean
- `isLoading` - Boolean
- `isInitialized` - Boolean
- `needsVerification` - Boolean

### Backend API Endpoints Summary

**Hospital-Specific APIs (Working):**
1. `/api/hospitals/registrations/?status={pending|approved}` - User registration management
2. `/api/hospitals/departments/?hospital={hospitalId}` - Department data with beds, staff, patients
3. `/api/admissions/` - Patient admission records
4. `/api/staff/` - Hospital staff members with availability

**Organization-Wide APIs (Working):**
5. `/api/organizations/profile/` - Organization profile with complete details

**NGO-Specific APIs (Need Verification):**
- Not yet discovered in codebase
- May need to be created or exist in backend but not used

**Pharmacy-Specific APIs (Need Verification):**
- Not yet discovered in codebase
- May need to be created or exist in backend but not used

## Code References

### Old Dashboard Files
- `src/pages/organization/OrganizationDashboardPage.tsx` - Main dashboard container
- `src/features/organization/dashboards/HospitalDashboard.tsx:1-1084` - Hospital dashboard with real data
- `src/features/organization/dashboards/NGODashboard.tsx:1-113` - NGO dashboard (mock data)
- `src/features/organization/dashboards/PharmaDashboard.tsx:1-112` - Pharmacy dashboard (mock data)

### New Dashboard Files
- `src/pages/organization/ModernOrganizationDashboard.tsx:1-216` - New dashboard (all mock data)
- `src/components/organization/DashboardWidgets.tsx` - Widget components for new dashboard

### Hooks & Services
- `src/hooks/useRegistrationStats.ts:1-86` - Registration statistics hook
- `src/hooks/useDepartmentStats.ts:1-335` - Department statistics hook with bed/staff/patient data
- `src/hooks/useAdmissionData.ts:1-144` - Admission data hook
- `src/services/staffService.ts:1-156` - Staff service with API calls
- `src/services/organizationProfileService.ts:1-142` - Organization profile service

### Auth Context
- `src/features/organization/organizationAuthContext.tsx:1-806` - Organization authentication with userData

## Comparison: Old vs New Dashboard

| Feature | Old Dashboard | New Dashboard | Status |
|---------|--------------|---------------|--------|
| User Name Display | ✅ Uses `userData.full_name` | ⚠️ Uses `userData.full_name \|\| 'Admin'` | Partial |
| Organization Name | ✅ Shows org name from userData | ❌ Not displayed | Missing |
| Organization Type | ✅ Role-based dashboard rendering | ❌ Generic dashboard | Missing |
| Registration Stats | ✅ Real API data | ❌ No data | Missing |
| Department Stats | ✅ Real API data | ❌ No data | Missing |
| Bed Statistics | ✅ Real-time bed availability | ❌ No data | Missing |
| Staff Data | ✅ Real staff list with availability | ❌ Mock data | Missing |
| Patient Admissions | ✅ Real admission records | ❌ No data | Missing |
| Critical Alerts | ✅ Dynamic alerts based on data | ❌ Static notifications | Missing |
| Resource Utilization | ✅ Real charts from API | ❌ Mock charts | Missing |
| Role Customization | ✅ Hospital/NGO/Pharmacy specific | ❌ Generic "SmartHR" theme | Missing |
| Pending Approvals | ✅ Real count with badge | ❌ Hardcoded "21 Pending" | Missing |

## Architecture Insights

### Design Pattern Used in Old Dashboard

The old dashboard uses a **Provider Pattern + Custom Hooks** architecture:

1. **Authentication Layer**: `OrganizationAuthProvider` provides user context
2. **Data Fetching Layer**: Custom hooks (`useDepartmentStats`, `useAdmissionData`, etc.) encapsulate API logic
3. **Presentation Layer**: Dashboard components consume hooks and display data
4. **Service Layer**: Separate services (`StaffService`, `OrganizationProfileService`) for API calls

**Benefits of This Pattern:**
- Clear separation of concerns
- Reusable data fetching logic
- Automatic loading and error states
- Easy to test and maintain
- Type-safe with TypeScript interfaces

### API Design Conventions

**Authentication:**
- All API calls use `credentials: 'include'` to send httpOnly cookies
- Token stored in cookies: `access_token` and `refresh_token`
- No explicit Authorization headers needed (cookies handled automatically)

**URL Construction:**
- Base URL from environment: `import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'`
- Hospital-specific endpoints require `hospital={hospitalId}` parameter
- Consistent REST patterns: GET for fetching, POST for creating

**Response Formats:**
- Arrays for list endpoints: `[...]`
- Objects with status for service responses: `{ status, message, data }`
- Pagination support: `{ results: [...], count, next, previous }`

### Current Implementation Gap

**The new ModernOrganizationDashboard was designed as a UI redesign** but was never integrated with the backend:
- It has modern UI components (stat cards, charts, widgets)
- Beautiful gradient cards and responsive layout
- BUT: Zero backend integration
- Appears to be a template/mockup that needs data connection

**This is a common development pattern:**
1. Design new UI with mock data
2. Test layout and interactions
3. **[MISSING STEP]** Replace mock data with real API calls
4. Deploy new dashboard

We're at step 3 - need to connect the beautiful new UI to the existing working APIs.

## Recommendations

### Immediate Actions Required

1. **Create Organization Dashboard Service** (`src/services/organizationDashboardService.ts`)
   - Aggregate all dashboard-related API calls
   - Provide unified interface for dashboard statistics
   - Handle role-specific data fetching (hospital/NGO/pharmacy)

2. **Create Dashboard Stats Hook** (`src/hooks/useOrganizationDashboardStats.ts`)
   - Combine data from multiple sources
   - Return role-appropriate statistics
   - Handle loading and error states uniformly
   - Example structure:
     ```typescript
     interface DashboardStats {
       // Common stats for all organization types
       organizationName: string;
       organizationType: 'hospital' | 'ngo' | 'pharmacy';
       userFullName: string;

       // Hospital-specific
       hospital?: {
         activePatients: number;
         availableBeds: string; // "120/154"
         bedUtilization: number;
         staffOnDuty: number;
         pendingApprovals: number;
         departmentStats: DepartmentStats;
         recentAdmissions: AdmissionData[];
       };

       // NGO-specific (when APIs exist)
       ngo?: {
         activePrograms: number;
         beneficiariesReached: number;
         activeVolunteers: number;
         fundsRaised: number;
       };

       // Pharmacy-specific (when APIs exist)
       pharmacy?: {
         activeClinicalTrials: number;
         productsInPipeline: number;
         pendingSubmissions: number;
         researchPublications: number;
       };
     }
     ```

3. **Update ModernOrganizationDashboard to Use Real Data**
   - Replace all hardcoded values with data from hook
   - Add role-based conditional rendering for hospital/NGO/pharmacy
   - Display organization name prominently
   - Show correct pending approvals count
   - Use real employee/staff data instead of mock names

4. **Create Role-Specific Dashboard Variants** (Optional but Recommended)
   - `ModernHospitalDashboard.tsx` - Hospital-specific metrics and layouts
   - `ModernNGODashboard.tsx` - NGO-specific programs and volunteers
   - `ModernPharmacyDashboard.tsx` - Pharmaceutical trials and pipeline
   - Keep common layout components in `DashboardWidgets.tsx`

5. **Investigate NGO and Pharmacy Backend APIs**
   - Check if endpoints exist in backend but aren't used in frontend
   - Document available APIs or requirements for new ones
   - Create tickets for missing backend endpoints if needed

### Data Mapping Guide

**For Hospital Dashboard:**

```typescript
// OLD: Scattered across multiple components
<StatCard label="Active Patients" value={stats.activePatients} />

// NEW: Centralized data source
const { hospital } = useOrganizationDashboardStats();
<StatCard
  title="Active Patients"
  value={hospital.activePatients.toString()}
  trend={`${hospital.activePatientsTrend}%`}
  trendDirection="up"
  icon={Users}
/>
```

**Key Mappings:**
- "Attendance Overview" → `${hospital.activePatients}/${hospital.totalBeds}`
- "Total Projects" → Keep as-is or map to something meaningful (departments?)
- "Total Clients" → Hospital: Registered patients, NGO: Beneficiaries
- "Earnings" → Remove or map to budget data if available
- "Job Applicants" → Map to pending registrations
- Clock-in List → Map to staff on duty list

### Testing Strategy

1. **Test with Real Hospital Account**
   - Verify all APIs return correct data for specific hospital ID
   - Check bed availability calculations
   - Validate staff availability status
   - Confirm admission data displays correctly

2. **Test Loading States**
   - Dashboard should show loading indicators
   - Graceful degradation if APIs fail
   - Error messages should be user-friendly

3. **Test Role-Based Rendering**
   - Hospital admin sees hospital metrics
   - NGO admin sees NGO metrics (once implemented)
   - Pharmacy admin sees pharmaceutical metrics (once implemented)

4. **Performance Testing**
   - Multiple API calls should be made in parallel
   - Consider caching strategies for dashboard data
   - Implement refresh mechanism for real-time updates

### Migration Path

**Option A: Full Migration (Recommended)**
1. Create unified dashboard stats service and hook
2. Update ModernOrganizationDashboard with real data
3. Test thoroughly with all organization types
4. Replace old dashboard route with new one
5. Archive old dashboard files

**Option B: Gradual Migration**
1. Keep both dashboards temporarily
2. Add feature flag to switch between old/new
3. Migrate one organization type at a time (Hospital first, then NGO, then Pharmacy)
4. Gather user feedback
5. Complete migration when all types are ready

**Option C: Hybrid Approach**
1. Use ModernOrganizationDashboard as main layout
2. Embed old role-specific dashboards as content sections
3. Gradually replace sections with new components
4. Ensures no functionality loss during transition

## Related Research

- Backend API documentation (if exists in `docs/` or `api/`)
- Organization data models in backend codebase
- Authentication and authorization patterns
- Dashboard performance requirements

## Open Questions

1. **NGO APIs**: Do backend endpoints exist for NGO statistics? Need to check backend codebase.
2. **Pharmacy APIs**: Do backend endpoints exist for pharmaceutical data? Need to check backend codebase.
3. **Real-time Updates**: Should dashboard auto-refresh? How frequently?
4. **Permissions**: Do different admin roles have different data access levels?
5. **Chart Data**: Should charts show historical trends or just current snapshot?
6. **Emergency Alerts**: How should critical alerts be prioritized and displayed in new UI?
7. **Mobile Responsiveness**: Is the new dashboard fully responsive for mobile admins?
8. **Feature Parity**: Should new dashboard have ALL features from old dashboard or is this a redesign opportunity?

## Next Steps

1. **Spawn parallel research tasks** to:
   - Investigate NGO backend APIs (search backend codebase)
   - Investigate Pharmacy backend APIs (search backend codebase)
   - Review backend API documentation

2. **Create implementation plan** for:
   - Dashboard service layer
   - Unified stats hook
   - Component updates
   - Testing strategy

3. **Prototype integration** for Hospital dashboard first (most complete API coverage)

4. **User testing** with organization admins to validate data accuracy and UI improvements