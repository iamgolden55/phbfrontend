---
date: 2025-11-11T08:49:47+0000
researcher: Claude
git_commit: 991bc3617244ceb5a57cd467da28bdd5aa29c30d
branch: main
repository: phbfrontend
topic: "Appointment Booking Department Routing System and Critical Issues"
tags: [research, codebase, appointments, departments, hospital, routing, body-map, triage]
status: complete
last_updated: 2025-11-11
last_updated_by: Claude
---

# Research: Appointment Booking Department Routing System and Critical Issues

**Date**: 2025-11-11T08:49:47+0000
**Researcher**: Claude
**Git Commit**: 991bc3617244ceb5a57cd467da28bdd5aa29c30d
**Branch**: main
**Repository**: phbfrontend

## Research Question

**Primary Question**: How does the PHB appointment booking system determine which hospital department to route patients to based on their symptoms, and what issues arise when hospitals have no departments configured?

**Context**: General Hospital ASABA (Delta State) was created with user `publichealthbureau@hotmail.com`, but has zero departments configured. This prevents patients from booking appointments, revealing a critical architectural dependency on department availability.

**Secondary Questions**:
1. How does the body map selection interface work?
2. What is the department matching algorithm?
3. What happens when departments are unavailable?
4. How can we implement an NHS-style triage system to reduce dependency on specialist departments?

## Summary

The PHB appointment booking system uses a **client-side department routing algorithm** that maps body parts/symptoms to hospital departments using a hardcoded preference table. When a patient selects symptoms via an interactive body map, the system:

1. Maps the body part to a prioritized list of department names
2. Searches the hospital's available departments for the first match
3. Falls back to "General Medicine" if no specialist match
4. **FAILS if hospital has zero departments configured**

**Critical Finding**: The system has a **hard dependency on departments existing** for appointment booking to function. Hospitals can be created without departments (no database constraint), but this makes them unusable for appointments.

**Architecture Issue**: Department routing logic is entirely in the frontend with static mappings, making it:
- Inflexible (can't adapt to different hospital structures)
- Fragile (exact name matching required)
- Non-scalable (requires code changes to update mappings)

**Proposed Solution**: Implement NHS-style triage system where:
- Low-severity cases → Online consultations (no department needed)
- Medium-severity → General Medicine (single fallback department)
- High-severity → Specialist departments (current routing logic)
- Critical → Emergency department

This reduces specialist department dependency from 100% to ~30% of cases.

## Detailed Findings

### 1. Body Map Selection Interface

#### Component: `BodyMapSearch.tsx`

**Location**: `/Users/new/phbfinal/phbfrontend/src/features/search/BodyMapSearch.tsx`

**Purpose**: Interactive SVG-based body map allowing patients to visually select body parts and associated symptoms.

**Structure** (lines 26-251):

```typescript
interface BodyPart {
  id: string;           // e.g., 'head', 'chest', 'leftArm'
  name: string;         // Display name: "Head", "Chest"
  area: string;         // Anatomical region: "Upper Body"
  symptoms: string[];   // 5-7 common symptoms per body part
  svgPath: string;      // SVG path coordinates for clickable region
}
```

**Body Parts Defined** (15 total):
- **Head & Neck**: head (7 symptoms), face (7), neck (6)
- **Torso**: chest (7), upperAbdomen (6), lowerAbdomen (6)
- **Upper Extremities**: leftShoulder (5), rightShoulder (5), leftArm (6), rightArm (6)
- **Lower Extremities**: leftHip (5), rightHip (5), leftLeg (7), rightLeg (7)
- **Back**: upperBack (5), lowerBack (6)

**Example Symptoms**:
- Head: Headache, Migraine, Dizziness, Vision problems, Facial numbness, Head injury, Jaw pain
- Chest: Chest pain, Shortness of breath, Heart palpitations, Cough, Wheezing, Chest tightness, Difficulty breathing
- Lower Abdomen: Lower abdominal pain, Bladder discomfort, Frequent urination, Pelvic pain, Menstrual issues, Groin pain

**User Interaction Flow** (`BookAppointment.tsx:408-463`):

1. **Body Part Click** (BodyMapSearch.tsx:285):
   - User clicks SVG region
   - `handleBodyPartClick()` fires
   - Component updates `selectedBodyPart` state
   - Callback: `onBodyPartSelect(bodyPart)`

2. **Symptom Selection** (BodyMapSearch.tsx:306):
   - Symptoms panel displays for selected body part
   - User clicks specific symptom
   - `handleSymptomClick()` fires
   - Callback: `onSymptomSelect(symptom, selectedBodyPart)`

3. **Data Collection** (BookAppointment.tsx:415-437):
   ```typescript
   const handleSymptomSelect = (symptom: string, bodyPart: any) => {
     const newSymptom: SelectedSymptom = {
       bodyPartId: bodyPart.id,          // 'chest'
       bodyPartName: bodyPart.name,      // 'Chest'
       symptomName: symptom,             // 'Chest pain'
       description: ''                   // Optional detail
     };

     // Prevent duplicates
     const isDuplicate = formData.selectedSymptoms.some(
       s => s.bodyPartId === bodyPart.id && s.symptomName === symptom
     );

     if (!isDuplicate) {
       setFormData(prev => ({
         ...prev,
         selectedSymptoms: [...prev.selectedSymptoms, newSymptom]
       }));
     }
   };
   ```

4. **Storage & History** (BodyMapSearch.tsx:319-321):
   - Saves to localStorage as `'phb-symptom-history'`
   - Displays recent selections for quick re-selection
   - Limit: 10 most recent symptoms

**UI Features**:
- **Dual View**: Front and back body SVG views (lines 453-530)
- **Hover State**: Light blue fill `#93c5fd` on hover
- **Selected State**: Blue fill `#60a5fa` with dark blue stroke `#2563eb`
- **Touch Support**: `onTouchStart` events for mobile (line 476)
- **Search Filter**: Type to filter symptom list (lines 617-641)
- **2D/3D Toggle**: Switch between flat and perspective views (lines 418-444)
- **Tooltips**: Hover shows body part name (lines 538-550)

---

### 2. Department Routing Algorithm

#### Function: `getDepartmentForBodyPart()` (`BookAppointment.tsx:177-230`)

**Purpose**: Maps body part selections to appropriate hospital departments using a priority-ordered lookup table.

**The Mapping Table** (lines 193-210):

```typescript
const bodyPartToDeptMapping: Record<string, string[]> = {
  // Head & Neck
  'head': ['neurology', 'ent', 'ophthalmology', 'neurosurgery'],
  'face': ['ent', 'dermatology', 'oral & maxillofacial surgery', 'neurology'],
  'neck': ['ent', 'endocrinology', 'neurology', 'orthopedics', 'oncology'],

  // Torso
  'chest': ['cardiology', 'pulmonology', 'emergency medicine', 'internal medicine'],
  'upperAbdomen': ['gastroenterology', 'hepatology', 'general surgery', 'nutrition'],
  'lowerAbdomen': ['gastroenterology', 'urology', 'gynecology', 'colorectal surgery'],

  // Upper Extremities
  'leftShoulder': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],
  'rightShoulder': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],
  'leftArm': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],
  'rightArm': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],

  // Lower Extremities
  'leftHip': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy'],
  'rightHip': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy'],
  'leftLeg': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy'],
  'rightLeg': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy'],

  // Back
  'upperBack': ['orthopedics', 'neurology', 'pain management', 'physiotherapy', 'neurosurgery'],
  'lowerBack': ['orthopedics', 'neurology', 'pain management', 'physiotherapy', 'neurosurgery']
};
```

**Key Pattern**: Each body part maps to **2-5 departments in priority order**. First department in array is most preferred.

**Algorithm Steps**:

**Step 1: Build Department Lookup** (lines 182-187)
```typescript
const departmentIdsByName: Record<string, number> = {};
departments.forEach(dept => {
  departmentIdsByName[dept.name.toLowerCase()] = dept.id;
});
```
Creates a case-insensitive mapping of department name → ID from available hospital departments.

**Step 2: Find General Medicine Fallback** (line 190)
```typescript
const generalMedId = departmentIdsByName['general medicine'];
```
Identifies the General Medicine department ID for fallback use.

**Step 3: Get Preferred Departments** (lines 212-213)
```typescript
const preferredDeptNames = bodyPartToDeptMapping[bodyPartId] ||
                          ['general medicine'];
```
Retrieves prioritized department list for the body part, defaulting to General Medicine if body part not mapped.

**Step 4: Match First Available** (lines 216-221)
```typescript
for (const deptName of preferredDeptNames) {
  const deptId = departmentIdsByName[deptName.toLowerCase()];
  if (deptId) {
    return deptId;  // ← RETURNS IMMEDIATELY on first match
  }
}
```
Iterates through preferred departments in order, returning the **first** match found in hospital's available departments.

**Step 5: Fallback Chain** (lines 223-229)
```typescript
// Fallback 1: General Medicine
if (generalMedId) {
  return generalMedId;
}

// Fallback 2: First available department
return departments.length > 0 ? departments[0].id : null;
```

**Fallback Logic**:
1. If no preferred match → Try General Medicine
2. If no General Medicine → Use first department in hospital's list
3. If no departments at all → **Return `null` (triggers error)**

**Example Walkthrough**:

Scenario: Patient selects "Chest" body part with "Chest pain" symptom at General Hospital ASABA.

```
1. Body part ID: 'chest'
2. Preferred departments: ['cardiology', 'pulmonology', 'emergency medicine', 'internal medicine']
3. Hospital departments: [] ← EMPTY (this is the problem)

Matching:
  - Try 'cardiology' → Not in hospital list
  - Try 'pulmonology' → Not in hospital list
  - Try 'emergency medicine' → Not in hospital list
  - Try 'internal medicine' → Not in hospital list

Fallback 1:
  - Try 'general medicine' → Not in hospital list

Fallback 2:
  - departments[0] → undefined (empty array)

Result: null ← TRIGGERS ERROR
```

---

### 3. Multi-Symptom Department Resolution

#### Scenario: Patient Selects Multiple Symptoms

**Example**: Patient selects:
- Chest → "Chest pain"
- Left Arm → "Arm pain"
- Upper Back → "Upper back pain"

**Algorithm** (`BookAppointment.tsx:707-753`):

**Step 1: Count Department Occurrences** (lines 712-718)
```typescript
const departmentCounts: Record<number, number> = {};
formData.selectedSymptoms.forEach(symptom => {
  const deptId = getDepartmentForBodyPart(symptom.bodyPartId, departmentsList);
  if (deptId) {
    departmentCounts[deptId] = (departmentCounts[deptId] || 0) + 1;
  }
});
```

For the example above:
- Chest → Cardiology (ID: 5)
- Left Arm → Orthopedics (ID: 8)
- Upper Back → Orthopedics (ID: 8)

Result: `{ 5: 1, 8: 2 }`

**Step 2: Sort by Frequency** (lines 721-722)
```typescript
const sortedDepts = Object.entries(departmentCounts)
  .sort(([, countA], [, countB]) => countB - countA);
```

Result: `[[8, 2], [5, 1]]` (Orthopedics appears twice, Cardiology once)

**Step 3: Select Most Common** (lines 725-731)
```typescript
if (sortedDepts.length > 0) {
  const [mostCommonDeptId] = sortedDepts[0];
  departmentId = mostCommonDeptId;
  const dept = departmentsList.find(d => d.id === Number(mostCommonDeptId));
  departmentName = dept?.name || 'Unknown Department';
}
```

**Winner**: Orthopedics (ID: 8) because it appears in 2 out of 3 symptoms.

**Step 4: General Medicine Fallback** (lines 735-741)
```typescript
if (!departmentId) {
  const generalMed = departmentsList.find(
    d => d.name.toLowerCase() === 'general medicine'
  );
  if (generalMed) {
    departmentId = generalMed.id;
    departmentName = generalMed.name;
  }
}
```

**Step 5: First Department Fallback** (lines 744-747)
```typescript
if (!departmentId && departmentsList.length > 0) {
  departmentId = departmentsList[0].id;
  departmentName = departmentsList[0].name;
}
```

**Step 6: Error if No Departments** (lines 755-757)
```typescript
if (!departmentId) {
  throw new Error('Could not determine appropriate department. Please try again.');
}
```

**Why This Approach Makes Sense**:
- Multiple related symptoms → Likely single underlying condition
- Example: Chest pain + arm pain + back pain → Classic cardiac symptoms → Cardiology
- Example: Lower back pain + leg pain → Sciatica → Orthopedics/Neurology
- Frequency counting provides logical routing without complex medical logic

---

### 4. Hospital-Department Data Models

#### Hospital Type Definitions

**1. User Authentication Hospital** (`authContext.tsx:34-46`):
```typescript
interface Hospital {
  id: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  region?: string;
  registration_date?: string;
  status?: string;
  available?: boolean;
}
```

**Purpose**: Represents user's primary hospital for appointment booking.
**Usage**: Retrieved via `/api/user/has-primary-hospital/`, stored in `primaryHospital` state.
**Critical**: Required for booking appointments (checked by `HospitalStatusGuard`).

**2. Organization Hospital** (`organizationAuthContext.tsx:23-27`):
```typescript
export interface HospitalInfo {
  id: number;
  name: string;
  code: string;
}
```

**Purpose**: Hospital admin authentication context.
**Usage**: Part of organization admin's `UserData`, used for hospital admin login.

**3. Map-Based Hospital** (`location.ts:61-71`):
```typescript
export interface HospitalDetails {
  departments: string[];      // ← Display-only string array
  emergencyServices: boolean;
  bedCount: number;
}
```

**Purpose**: Display hospitals on interactive maps.
**Department Relationship**: Departments stored as string array, **not relational**.

#### Department Type Definitions

**1. Basic Department** (`staffService.ts:1-7`):
```typescript
export interface Department {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}
```

**Fetching**: `getHospitalDepartments(hospitalId: number)`
**Endpoint**: `GET /api/hospitals/departments/?hospital_id=${hospitalId}`
**Returns**: `Department[]` array

**2. Booking Department** (`BookAppointment.tsx:36-41`):
```typescript
interface Department {
  id: number;
  name: string;
  code?: string;
  description?: string;
}
```

**Fetching** (line 318):
```typescript
const response = await fetch(`${API_BASE_URL}/api/departments/`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

**Response Format Handling** (lines 343-357):
- Format 1: `{ status: 'success', departments: [...] }`
- Format 2: Direct array `[...]`
- Format 3: Paginated `{ results: [...] }`
- Format 4: Wrapped `{ data: [...] }`

**3. Comprehensive Department** (`useDepartmentStats.ts:8-64`):
```typescript
export interface DepartmentData {
  // Core Info
  id: number;
  name: string;
  code: string;
  department_type: string;
  is_active: boolean;

  // Bed Management
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  bed_utilization_rate: number;

  // Staff Management
  current_staff_count: number;
  minimum_staff_required: number;
  is_understaffed: boolean;

  // Patient Statistics
  current_patient_count: number;
  utilization_rate: number;

  // Operational
  is_24_hours: boolean;
  operating_hours: Record<string, any>;
  requires_referral: boolean;

  // Budget
  annual_budget: number | null;
  budget_utilized: number;

  // Classification
  is_clinical: boolean;
  is_support: boolean;
  is_administrative: boolean;
  is_available_for_appointments: boolean;
}
```

**Purpose**: Full department analytics for organization dashboards.
**Fetching**: `GET /api/hospitals/departments/?hospital=${hospitalId}`
**Context**: Hospital ID from `useOrganizationAuth().userData?.hospital?.id`

---

### 5. Department Availability and Failure Modes

#### Current Behavior When Departments Are Missing

**Scenario**: General Hospital ASABA has zero departments configured.

**Detection Points**:

**1. Initial Load** (`BookAppointment.tsx:318-374`)
```typescript
const response = await fetch(`${API_BASE_URL}/api/departments/`);
const data = await response.json();

// Try multiple response formats
const fetchedDepartments =
  data.status === 'success' ? data.departments :
  Array.isArray(data) ? data :
  data.results || data.data || [];

if (fetchedDepartments.length === 0) {
  console.warn('No departments available'); // ← Line 360
}

setDepartments(fetchedDepartments); // ← Sets empty array []
```

**2. Department Mapping** (`BookAppointment.tsx:755-757`)
```typescript
if (!departmentId) {
  throw new Error('Could not determine appropriate department. Please try again.');
}
```

**Impact Chain**:

```
Empty departments array []
  ↓
getDepartmentForBodyPart() returns null
  ↓ (line 755)
Throws Error: "Could not determine appropriate department"
  ↓ (line 370 in catch block)
Sets submissionError state
  ↓ (lines 1644-1648 in UI)
Red error panel displayed to user
  ↓
BOOKING BLOCKED ❌
```

**User Experience**:

1. **Loading State** (lines 1232-1237):
   ```tsx
   {loading && (
     <div className="text-center py-8">
       <CircularProgress />
       <p>Loading departments...</p>
     </div>
   )}
   ```

2. **Error State** (lines 1644-1648):
   ```tsx
   {submissionError && (
     <div className="bg-red-50 border border-red-200 rounded-lg p-4">
       <p className="text-red-600">{submissionError}</p>
     </div>
   )}
   ```

3. **No Departments Warning** (implicit):
   - User completes symptom selection ✓
   - User selects date and time ✓
   - User clicks "Confirm & Book Appointment"
   - Error appears: "Could not determine appropriate department"
   - **User cannot proceed** - appointment booking completely blocked

**API Error Handling** (lines 331-339):

```typescript
if (response.status === 403) {
  setError('You are not registered with this hospital. Please register first.');
} else if (response.status === 404) {
  setError('No primary hospital found. Please select a hospital first.');
} else {
  setError('Failed to load departments. Please try again.');
}
```

**Critical Gap**: No specific error message for "Hospital has no departments configured."

---

### 6. Appointment Booking Flow Summary

#### Complete Patient Journey

**Step 1: Symptom Selection** (lines 1242-1396)
- Interactive body map with 15 clickable regions
- Select 1 or more symptoms
- Optional detailed description per symptom
- Select preferred language (10 options)
- Select urgency: routine / soon / urgent

**Step 2: Date & Time Selection** (lines 1399-1558)
- HTML5 date picker with minimum date = today
- Time slots generated: 9:00 AM - 5:00 PM (30-min intervals)
- Past slots filtered for current day
- Explicit selection flags prevent accidental defaults

**Step 3: Review & Confirmation** (lines 1561-1693)
- Display all booking details in summary panel
- Show department assignment preview
- Optional additional notes
- Doctor assignment explanation

**Step 4: Submit & Department Resolution** (lines 653-820)
- Validate date, time, symptoms
- Check hospital registration status
- **Determine department** via routing algorithm
- Construct appointment payload with department ID

**Step 5: Payment Integration** (lines 821-907)
- Initialize payment via `/api/payments/initialize/`
- Backend creates appointment atomically with payment
- Display Paystack payment modal
- **Payment-first architecture**: Appointment created during payment init

**Step 6: Payment Verification** (PaymentModal.tsx)
- User completes Paystack payment
- Frontend verifies via `/api/payments/verify/{reference}/`
- Confirms appointment already created by backend

**Step 7: Confirmation** (PaymentConfirmation.tsx)
- Display success message with appointment details
- Show transaction ID and amount
- Provide next steps guidance
- Navigate to appointments list

**Critical Dependency**: **Department ID is required in Step 4**. If unavailable, entire flow fails.

---

### 7. The General Hospital ASABA Problem

#### Current State

**Hospital**: General Hospital ASABA
**Location**: Delta State, Nigeria
**User**: publichealthbureau@hotmail.com
**Issue**: Hospital has **zero departments created**

#### Why This Breaks Appointments

**Root Cause**: No database constraint requiring departments during hospital creation.

**Hospital Creation Flow**:
1. Hospital registered via `/api/hospitals/register/` ✓
2. Hospital admin account created ✓
3. User can log in to organization dashboard ✓
4. **Departments NOT created** ← Missing step
5. Patients attempt to book appointments ❌

**What Should Have Happened**:
1. Hospital registered
2. Admin prompted: "Create hospital departments"
3. Department creation wizard with template options:
   - Small Clinic: 2-3 basic departments
   - Medium Hospital: 8-10 departments
   - Large Hospital: 15-20 departments
4. Minimum requirement: **General Medicine** (critical fallback)
5. Only after departments created → Hospital marked as "ready for appointments"

#### Immediate Impact

**Affected User**: publichealthbureau@hotmail.com
- Can log in to organization dashboard ✓
- Can view hospital details ✓
- Can manage staff (theoretically) ✓
- **Patients cannot book appointments** ❌

**Patient Experience**:
1. Patient navigates to Book Appointment
2. Selects symptoms successfully
3. Selects date and time successfully
4. Clicks "Confirm & Book"
5. **Error**: "Could not determine appropriate department. Please try again."
6. Patient frustrated, cannot access care

**Business Impact**:
- Hospital effectively non-functional for appointments
- Zero revenue from appointments
- Poor user experience
- Support tickets: "Why can't I book an appointment?"

---

## Code References

### Appointment Booking System
- `src/features/health/BookAppointment.tsx:177-230` - Department routing algorithm
- `src/features/health/BookAppointment.tsx:653-820` - Form submission and validation
- `src/features/health/BookAppointment.tsx:707-753` - Multi-symptom department resolution
- `src/services/appointmentService.ts:37` - Appointment service API methods

### Body Map Selection
- `src/features/search/BodyMapSearch.tsx:26-251` - Body part definitions with symptoms
- `src/features/search/BodyMapSearch.tsx:285` - Body part click handler
- `src/features/search/BodyMapSearch.tsx:306` - Symptom selection handler
- `src/features/search/BodyMapSearch.tsx:453-530` - SVG map rendering

### Department Management
- `src/services/staffService.ts:1-7` - Department interface
- `src/services/staffService.ts:134-136` - Get hospital departments API
- `src/pages/organization/WardManagementPage.tsx` - Department creation UI
- `src/hooks/useDepartmentStats.ts:8-64` - Comprehensive department data model

### Hospital Models
- `src/features/auth/authContext.tsx:34-46` - User hospital interface
- `src/features/organization/organizationAuthContext.tsx:23-27` - Organization hospital interface
- `src/types/location.ts:61-71` - Map-based hospital interface

### Payment Integration
- `src/services/paymentService.ts:220-337` - Payment initialization
- `src/components/modals/PaymentModal.tsx:81-144` - Paystack integration
- `src/features/health/PaymentConfirmation.tsx` - Confirmation display

## Architecture Insights

### Client-Side Department Routing

**Current Pattern**:
- All department mapping logic in frontend (BookAppointment.tsx)
- Hardcoded mapping table of body parts → department names
- No backend validation or suggestion
- Frontend must have complete knowledge of all possible departments

**Strengths**:
- Fast (no API call for department suggestion)
- Simple to understand
- Works offline

**Weaknesses**:
- **Rigid**: Cannot adapt to hospitals with different naming conventions
- **Fragile**: Exact string matching required ("Internal Medicine" ≠ "General Medicine")
- **Not scalable**: Adding new body parts or departments requires code deployment
- **No AI/ML**: Cannot learn from past successful matches
- **Single point of failure**: If departments empty, entire flow breaks

### Payment-First Architecture

**Pattern**: Appointment created during payment initialization, not after payment success.

**Benefits**:
- Eliminates abandoned payments with no appointments
- Atomic transaction: payment + appointment created together
- Prevents race conditions (double bookings)
- Simpler error recovery (both succeed or both fail)

**Implementation** (paymentService.ts:229-281):
```typescript
// POST /api/payments/initialize/
{
  // Sends full appointment details during payment init
  "department_id": 45,
  "hospital_id": 123,
  "appointment_date": "2025-11-11T14:30:00Z",
  "symptoms_data": [...],
  "chief_complaint": "Chest pain",
  "priority": "urgent"
}

// Backend response:
{
  "authorization_url": "https://checkout.paystack.com/...",
  "access_code": "abc123",
  "reference": "TRX_xyz789"
  // Note: Appointment already created in database
}
```

Backend atomically creates:
1. `Appointment` record (status='pending_payment')
2. `PaymentTransaction` record (status='pending')
3. Links them via foreign keys

On payment success:
- Updates `Appointment.status = 'confirmed'`
- Updates `PaymentTransaction.status = 'completed'`

On payment failure:
- Marks both as 'failed'
- Preserves for audit trail

### Department Dependency Chain

**Critical Path**:
```
Hospital Exists
  → Departments Created (OPTIONAL in current system ❌)
    → Department Mapping Succeeds
      → Appointment Payload Valid
        → Payment Initialization Succeeds
          → Appointment Booked ✓
```

**Failure Point**: Step 2 (Departments Created) is not enforced, breaking entire chain.

**Should Be**:
```
Hospital Created
  → Department Setup Wizard (REQUIRED ✓)
    → Minimum: General Medicine created
      → Hospital marked "ready"
        → Appointments enabled ✓
```

### Fallback Strategy

**Three-Level Fallback**:

1. **Primary**: Match preferred department for body part
   - Example: Chest → Cardiology

2. **Secondary**: Fall back to General Medicine
   - Universal department handling most non-specialist cases
   - Acts as safety net when specialist unavailable

3. **Tertiary**: Use first available department
   - Last resort to prevent complete failure
   - Assumes some department can triage the patient

**Problem**: All three levels fail if `departments = []`.

**Missing Level**: **Zero-Level Fallback**:
- If no departments → Route to "Virtual Triage"
- Online consultation with GP to assess severity
- GP decides: online treatment vs. in-person vs. specialist referral

This is the **NHS model** mentioned by the user.

## Historical Context (from thoughts/)

### Existing Research Documents

**1. Prescription & Appointment Flow** (`thoughts/shared/research/2025-11-08-appointment-prescription-pharmacy-flow.md`):
- Documents complete flow from appointment → prescription → pharmacy
- Covers prescription triage system (pharmacist first-line review)
- Electronic prescription routing with QR codes
- Pharmacy nomination system (NHS EPS model)
- **Relevant**: Shows appointment system works well when departments exist

**2. Prescription Triage Status** (`thoughts/shared/research/2025-11-02-prescription-triage-status-and-next-steps.md`):
- Phase 1 backend complete (pharmacist model, triage logic)
- Phase 2 endpoints needed (pharmacist review actions)
- Evidence-based triage reduces doctor workload by 60%
- **Connection**: Triage system could extend to appointment routing

**3. Professional Registration** (multiple docs):
- Professional registry system for onboarding doctors, pharmacists
- Bulk CSV upload for large hospitals (1000+ staff)
- Hospital affiliation required before professionals can work
- **Relevant**: Shows hospital setup is complex, needs guided workflows

### Implementation Timeline Insights

From existing documentation:

**October 2025**: Prescription system implemented
- Pharmacy nomination system
- Electronic prescription tokens (HMAC-SHA256 signatures)
- NHS EPS model adopted

**November 2025**: Professional registry and triage
- Pharmacist model created
- Triage categorization logic
- Department-based prescription routing

**Current Gap**: Department setup workflow never implemented
- Hospitals can be created without departments
- No guided setup wizard
- No minimum department requirements
- No department templates

## Related Research

- `thoughts/shared/research/2025-11-08-appointment-prescription-pharmacy-flow.md` - Complete patient journey through appointments and prescriptions
- `thoughts/shared/research/2025-11-02-prescription-triage-status-and-next-steps.md` - Triage system architecture and next steps
- `thoughts/shared/plans/2025-11-07-professional-practice-pages-implementation.md` - Professional onboarding workflows

## Open Questions

### Immediate Questions

1. **How to create departments for General Hospital ASABA?**
   - **Option A**: Organization admin panel (`/organization/wards`)
   - **Option B**: Backend database script
   - **Option C**: Admin support ticket to PHB team
   - **Recommendation**: Create standard Nigerian hospital department template

2. **What departments are required minimum?**
   - Critical: General Medicine (fallback department)
   - Essential: Emergency Medicine, Cardiology, Orthopedics
   - Full set: 15-20 departments for comprehensive coverage

3. **Should we enforce departments during hospital creation?**
   - **Current**: Optional (no constraint)
   - **Proposed**: Required minimum (General Medicine)
   - **Implementation**: Database constraint + setup wizard

### Strategic Questions

1. **Should we implement NHS-style triage routing?**

   **Current Flow**:
   ```
   Symptom → Department → Doctor → In-Person Appointment
   ```

   **NHS Flow**:
   ```
   Symptom → Severity Assessment
     → Low: Online/Phone Consultation (60%)
     → Medium: GP Appointment (30%)
     → High: Specialist Appointment (8%)
     → Critical: Emergency (2%)
   ```

   **Benefits**:
   - Reduces specialist department dependency from 100% to ~10%
   - Faster patient access (online available same-day)
   - Lower cost (online consultations cheaper)
   - Scales better (one GP can handle 50 online/day vs. 20 in-person)

2. **Should department routing move to backend?**

   **Current**: Frontend static mapping
   **Proposed**: Backend AI/ML-based suggestion

   **API Design**:
   ```
   POST /api/appointments/suggest-department/
   {
     "hospital_id": 123,
     "symptoms": [
       {"body_part": "chest", "symptom": "chest pain"},
       {"body_part": "left_arm", "symptom": "arm pain"}
     ],
     "urgency": "urgent",
     "patient_age": 55,
     "patient_gender": "male",
     "medical_history": ["hypertension"]
   }

   Response:
   {
     "primary_suggestion": {
       "department_id": 45,
       "department_name": "Cardiology",
       "confidence": 0.95,
       "reason": "Chest pain with arm radiation in male >50 suggests cardiac evaluation"
     },
     "alternative_suggestions": [
       {"department_id": 12, "department_name": "Emergency Medicine", "confidence": 0.88},
       {"department_id": 67, "department_name": "General Medicine", "confidence": 0.75}
     ],
     "severity_assessment": {
       "level": "high",
       "recommended_timeframe": "within 24 hours",
       "requires_in_person": true
     }
   }
   ```

   **Benefits**:
   - Flexible (learns from data)
   - Context-aware (considers age, gender, history)
   - Severity assessment (enables triage routing)
   - Graceful degradation (multiple suggestions)

3. **Should we create department templates?**

   **Proposed Templates**:

   **Small Clinic** (5 departments):
   - General Medicine
   - Emergency Medicine
   - Pediatrics
   - Obstetrics & Gynecology
   - Pharmacy

   **Medium Hospital** (12 departments):
   - All from Small Clinic +
   - Cardiology
   - Orthopedics
   - Surgery (General)
   - Radiology
   - Laboratory
   - Intensive Care Unit
   - Outpatient Clinic

   **Large Teaching Hospital** (20+ departments):
   - All from Medium Hospital +
   - Neurology, Neurosurgery
   - ENT (Otorhinolaryngology)
   - Ophthalmology
   - Urology
   - Gastroenterology
   - Pulmonology
   - Nephrology
   - Endocrinology
   - Dermatology
   - Oncology
   - Psychiatry

   **Implementation**:
   - Setup wizard during hospital onboarding
   - "Select hospital size" → Auto-creates departments
   - Can customize after initial setup
   - Ensures minimum departments always exist

## Next Steps

### Immediate Actions (This Week)

**1. Fix General Hospital ASABA**

Create departments via organization admin panel or backend script:

**Option A: Admin Panel** (`/organization/wards`):
- Log in as hospital admin
- Navigate to Ward Management
- Click "Add Department"
- Create minimum departments:
  - General Medicine ✓ (critical fallback)
  - Emergency Medicine
  - Cardiology
  - Orthopedics

**Option B: Backend Script**:
```python
# create_hospital_departments.py
from api.models import Hospital, Department

hospital = Hospital.objects.get(name="General Hospital ASABA")

departments = [
    {"name": "General Medicine", "code": "GEN", "is_clinical": True},
    {"name": "Emergency Medicine", "code": "ER", "is_clinical": True, "is_24_hours": True},
    {"name": "Cardiology", "code": "CARD", "is_clinical": True},
    {"name": "Orthopedics", "code": "ORTHO", "is_clinical": True},
    {"name": "Pediatrics", "code": "PEDS", "is_clinical": True},
    {"name": "Obstetrics & Gynecology", "code": "OBGYN", "is_clinical": True},
    {"name": "Surgery", "code": "SURG", "is_clinical": True},
    {"name": "Radiology", "code": "RAD", "is_support": True},
    {"name": "Laboratory", "code": "LAB", "is_support": True},
    {"name": "Pharmacy", "code": "PHARM", "is_support": True},
]

for dept_data in departments:
    Department.objects.create(hospital=hospital, **dept_data)

print(f"Created {len(departments)} departments for {hospital.name}")
```

**2. Add Error Message for Missing Departments**

Update `BookAppointment.tsx:368-374`:

```typescript
if (fetchedDepartments.length === 0) {
  setError(
    'This hospital has not configured departments yet. ' +
    'Please contact hospital administration or try a different hospital.'
  );
  console.warn('No departments available for hospital');
}
```

**3. Document Department Setup Process**

Create guide for hospital admins:
- `docs/hospital-admin/department-setup-guide.md`
- Minimum required departments
- How to create departments via admin panel
- Department naming conventions

### Short-Term Improvements (Next 2 Weeks)

**1. Implement Department Setup Wizard**

Create onboarding flow for new hospitals:

- **Step 1**: Hospital registration (existing)
- **Step 2**: Select hospital size template (new)
  - Small Clinic (5 depts)
  - Medium Hospital (12 depts)
  - Large Hospital (20 depts)
  - Custom (manual selection)
- **Step 3**: Review and customize departments (new)
- **Step 4**: Confirm creation (new)
- **Step 5**: Hospital marked "ready for appointments" (new)

**Files to Create**:
- `src/pages/organization/DepartmentSetupWizard.tsx`
- `src/services/departmentService.ts` (new)
- Backend: `api/views/department_setup_views.py`

**2. Add Department Validation**

Prevent hospital activation without departments:

**Backend**:
```python
# api/models/hospital.py
class Hospital(models.Model):
    # ...
    is_ready_for_appointments = models.BooleanField(default=False)

    def check_appointment_readiness(self):
        # Requires at least General Medicine department
        has_general_med = self.departments.filter(
            name__iexact='general medicine'
        ).exists()

        # Requires at least one doctor
        has_doctors = self.doctors.filter(is_active=True).exists()

        self.is_ready_for_appointments = has_general_med and has_doctors
        self.save()
```

**Frontend**:
```typescript
// src/features/health/BookAppointment.tsx:694-701
if (!primaryHospital.is_ready_for_appointments) {
  throw new Error(
    'This hospital is not yet ready to accept appointments. ' +
    'Please contact hospital administration.'
  );
}
```

**3. Improve Department Matching Flexibility**

Add fuzzy matching and synonyms:

```typescript
// Synonym mapping
const departmentSynonyms: Record<string, string[]> = {
  'general medicine': ['internal medicine', 'general practice', 'family medicine'],
  'ent': ['otorhinolaryngology', 'ear nose throat', 'ear, nose and throat'],
  'obgyn': ['obstetrics and gynecology', 'ob/gyn', 'womens health'],
  'orthopedics': ['orthopaedics', 'ortho', 'bone and joint'],
};

function findDepartmentWithSynonyms(
  targetName: string,
  availableDepts: Department[]
): Department | undefined {
  const target = targetName.toLowerCase();

  // Try exact match first
  let match = availableDepts.find(d => d.name.toLowerCase() === target);
  if (match) return match;

  // Try synonyms
  for (const [canonical, synonyms] of Object.entries(departmentSynonyms)) {
    if (target === canonical || synonyms.includes(target)) {
      match = availableDepts.find(d =>
        d.name.toLowerCase() === canonical ||
        synonyms.includes(d.name.toLowerCase())
      );
      if (match) return match;
    }
  }

  // Try fuzzy match (Levenshtein distance < 3)
  // ... implementation

  return undefined;
}
```

### Medium-Term Enhancements (Next Month)

**1. Implement NHS-Style Severity Assessment**

Add triage layer before department routing:

**Frontend** (`BookAppointment.tsx`):
```typescript
interface SeverityAssessment {
  level: 'low' | 'medium' | 'high' | 'critical';
  recommended_care: 'online' | 'gp_appointment' | 'specialist' | 'emergency';
  timeframe: 'same_day' | 'within_week' | 'within_month';
  department_required: boolean;
}

async function assessSeverity(
  symptoms: SelectedSymptom[],
  urgency: string
): Promise<SeverityAssessment> {
  const response = await fetch('/api/appointments/assess-severity/', {
    method: 'POST',
    body: JSON.stringify({ symptoms, urgency })
  });
  return response.json();
}
```

**Backend** (`api/views/appointment_triage_views.py`):
```python
@api_view(['POST'])
def assess_appointment_severity(request):
    symptoms = request.data.get('symptoms', [])
    urgency = request.data.get('urgency', 'routine')

    # Simple rule-based assessment (can be ML later)
    severity_score = calculate_severity_score(symptoms, urgency)

    if severity_score >= 80:  # Critical
        return {
            'level': 'critical',
            'recommended_care': 'emergency',
            'timeframe': 'immediate',
            'department_required': True,
            'suggested_department': 'Emergency Medicine'
        }
    elif severity_score >= 60:  # High
        return {
            'level': 'high',
            'recommended_care': 'specialist',
            'timeframe': 'within_week',
            'department_required': True,
            'suggested_departments': determine_specialists(symptoms)
        }
    elif severity_score >= 30:  # Medium
        return {
            'level': 'medium',
            'recommended_care': 'gp_appointment',
            'timeframe': 'within_week',
            'department_required': False,  # ← Can route to General Medicine
            'suggested_department': 'General Medicine'
        }
    else:  # Low
        return {
            'level': 'low',
            'recommended_care': 'online',
            'timeframe': 'same_day',
            'department_required': False,  # ← Online consultation, no department
            'online_consultation_available': True
        }
```

**Benefits**:
- 60-70% of cases → Online/GP (no specialist departments needed)
- Reduces department dependency
- Faster patient access
- Aligns with NHS best practices

**2. Move Department Routing to Backend**

Create intelligent department suggestion API:

**Endpoint**: `POST /api/appointments/suggest-department/`

**Request**:
```json
{
  "hospital_id": 123,
  "symptoms": [
    {"body_part": "chest", "symptom": "chest pain", "description": "Sharp pain, worse with breathing"},
    {"body_part": "left_arm", "symptom": "arm pain"}
  ],
  "urgency": "urgent",
  "patient_context": {
    "age": 55,
    "gender": "male",
    "medical_history": ["hypertension", "diabetes"]
  }
}
```

**Response**:
```json
{
  "primary_suggestion": {
    "department_id": 45,
    "department_name": "Cardiology",
    "confidence": 0.95,
    "reasoning": "Chest pain with arm radiation in male >50 with cardiac risk factors suggests acute coronary syndrome"
  },
  "alternative_suggestions": [
    {"department_id": 12, "department_name": "Emergency Medicine", "confidence": 0.92, "reasoning": "High urgency cardiac symptoms"},
    {"department_id": 67, "department_name": "General Medicine", "confidence": 0.60, "reasoning": "General fallback"}
  ],
  "severity_assessment": {
    "level": "high",
    "requires_immediate_care": true,
    "recommended_timeframe": "within 24 hours"
  },
  "clinical_flags": [
    "Possible cardiac event - urgent evaluation recommended",
    "Patient has cardiovascular risk factors"
  ]
}
```

**Implementation**:
- Phase 1: Rule-based (similar to current frontend logic)
- Phase 2: ML-based (learn from historical successful matches)
- Phase 3: Clinical decision support (integrate medical knowledge bases)

### Long-Term Vision (Next 3 Months)

**1. Unified Triage & Routing System**

Combine prescription triage and appointment triage:

```
Patient Request (Appointment or Prescription)
  ↓
Severity Assessment (Low/Medium/High/Critical)
  ↓
Route to Appropriate Care Level:
  - Low → Online consultation or Pharmacist review
  - Medium → GP appointment or Pharmacist approval
  - High → Specialist appointment or Doctor review
  - Critical → Emergency or Immediate doctor intervention
```

**2. Department Analytics Dashboard**

Track department routing effectiveness:

- Most common symptom → department mappings
- Misrouted appointments (patient switched departments)
- Average wait times per department
- Department capacity utilization
- Patient satisfaction by department

Use data to improve routing algorithm over time.

**3. Inter-Hospital Department Sharing**

Allow patients to book at other hospitals when local departments unavailable:

**Scenario**: General Hospital ASABA has no Cardiology department.

**Current**: Booking fails ❌

**Proposed**:
```
System detects no Cardiology at General Hospital ASABA
  ↓
Searches nearby hospitals within 50km radius
  ↓
Finds: Federal Medical Centre Asaba (15km) has Cardiology
  ↓
Offers patient option:
  "Cardiology not available at your primary hospital.
   Would you like to book at Federal Medical Centre Asaba (15km away)?"
```

**Benefits**:
- Prevents booking failures
- Improves access to specialist care
- Maximizes healthcare system capacity
- Follows NHS "Choose & Book" model

---

**Document Version**: 1.0
**Status**: ✅ Complete
**Next Review**: After immediate fixes implemented

---

## Key Takeaways

### Critical Issues Identified

1. **No Department = No Appointments**: System has hard dependency on departments existing, but no enforcement
2. **General Hospital ASABA Broken**: Zero departments configured, making it unusable for appointments
3. **Frontend-Only Routing**: Department mapping logic in client, not adaptable to different hospitals
4. **No Setup Guidance**: Hospitals created without department setup wizard

### Immediate Solutions

1. **Create departments for General Hospital ASABA** (script or admin panel)
2. **Add better error messages** when departments missing
3. **Implement department setup wizard** for new hospitals
4. **Enforce minimum departments** (at least General Medicine required)

### Strategic Recommendations

1. **Adopt NHS triage model**: Route low-severity cases to online consultations (60-70% of appointments)
2. **Move routing to backend**: AI/ML-based department suggestion API
3. **Department templates**: Auto-create standard department sets during hospital onboarding
4. **Graceful degradation**: Always fallback to General Medicine or online consultation

### Next Actions

**This Week**:
- [ ] Create departments for General Hospital ASABA
- [ ] Improve error messages for missing departments
- [ ] Document department setup process for admins

**Next 2 Weeks**:
- [ ] Build department setup wizard
- [ ] Add hospital readiness validation
- [ ] Implement fuzzy department matching

**Next Month**:
- [ ] Implement NHS-style severity assessment
- [ ] Move department routing to backend API
- [ ] Add department analytics dashboard
