---
date: 2025-10-31T17:04:07Z
researcher: Claude
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Non-Functional Features in Onboarding Flow"
tags: [research, codebase, onboarding, user-experience, hospital-finding, medical-records, emergency-contacts]
status: complete
last_updated: 2025-10-31
last_updated_by: Claude
---

# Research: Non-Functional Features in Onboarding Flow

**Date**: 2025-10-31T17:04:07Z
**Researcher**: Claude
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

The onboarding page at `http://127.0.0.1:5173/onboarding` has three major features that do not work:
1. "Find hospital near me" button
2. "Upload records now" button
3. "Set up emergency contacts" button

## Summary

All three buttons in the onboarding flow are **non-functional placeholders** with **no event handlers** attached. They are purely cosmetic UI elements that do not navigate users to any functional pages or trigger any actions. While the underlying features (hospital finding, medical records upload, and emergency contacts) exist elsewhere in the application, the onboarding flow buttons do not connect to these implementations.

**Critical Findings:**
- The "Find hospital near me" button does navigate but goes to a **different page** (`/account/gp-record`) than intended
- The "Upload records now" and "Set up emergency contacts" buttons have **NO onClick handlers** at all
- Each feature exists independently in other parts of the app but is not properly integrated into onboarding
- This creates a **broken user experience** for new users completing onboarding

## Detailed Findings

### Issue 1: "Find Hospital Near Me" Button (Partially Working)

**Location**: [OnboardingFlow.tsx:183-188](src/features/auth/OnboardingFlow.tsx#L183-L188)

**Current Implementation:**
```typescript
<button
  className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors"
  onClick={handleGoToGPRecord}
>
  Find hospitals near me
</button>
```

**Handler Definition** (lines 99-104):
```typescript
const handleGoToGPRecord = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Navigating to GP Record page using window.location');
  window.location.href = '/account/gp-record';
};
```

**Problem:**
- The button **does work** but navigates to `/account/gp-record` (GPHealthRecord component)
- This is **NOT a hospital finding/registration page** - it's a medical records viewing page
- The actual hospital finding functionality exists at `/account/link-phb` (LinkPHBPage component)

**What It Should Do:**
- Navigate to `/account/link-phb` where users can:
  - Use geolocation to find nearby hospitals
  - View a list of all available hospitals
  - Register with a primary hospital

**Backend Integration Available** (in authContext.tsx):
- `fetchNearbyHospitals()` - API endpoint: `/api/hospitals/nearby/` (line 1148)
- `registerWithHospital(hospitalId)` - API endpoint: `/api/users/link-hospital/` (line 1161)
- `hasPrimaryHospital` state - Tracks if user has registered with a hospital

**Correct Destination:**
- [LinkPHBPage.tsx](src/pages/account/LinkPHBPage.tsx) - Full hospital finding and registration UI

---

### Issue 2: "Upload Records Now" Button (Completely Non-Functional)

**Location**: [OnboardingFlow.tsx:222-224](src/features/auth/OnboardingFlow.tsx#L222-L224)

**Current Implementation:**
```typescript
<button className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors">
  Upload records now
</button>
```

**Problem:**
- **NO onClick handler** attached to the button
- Button does absolutely nothing when clicked
- Just a visual placeholder

**What It Should Do:**
- Navigate to `/account/health-records` where users can upload medical documents
- The page exists with full upload functionality including:
  - Secure file upload with virus scanning
  - File encryption and validation
  - Progress tracking
  - Document management

**Implementation Available:**
- [HealthRecordsPage.tsx](src/pages/account/HealthRecordsPage.tsx) - Complete file upload system
  - Upload form with progress tracking (lines 221-350+)
  - File validation and security checks
  - API endpoint: `api/secure/upload/` (line 231)
  - Document viewing and management features

**Security Features:**
- [SecureFileUpload.tsx](src/components/security/SecureFileUpload.tsx) - Encryption and security
- [FileValidator.tsx](src/components/security/FileValidator.tsx) - File type and size validation
- [VirusScanner.tsx](src/components/security/VirusScanner.tsx) - Malware detection

**Service Integration:**
- [medicalRecordsService.ts](src/features/health/medicalRecordsService.ts) - Medical records API service
- Requires OTP verification for access (security measure)

**Fix Required:**
```typescript
// Add this handler
const handleUploadRecords = () => {
  window.location.href = '/account/health-records';
};

// Update button
<button
  className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors"
  onClick={handleUploadRecords}
>
  Upload records now
</button>
```

---

### Issue 3: "Set Up Emergency Contacts" Button (Completely Non-Functional)

**Location**: [OnboardingFlow.tsx:260-262](src/features/auth/OnboardingFlow.tsx#L260-L262)

**Current Implementation:**
```typescript
<button className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
  Set up emergency contacts
</button>
```

**Problem:**
- **NO onClick handler** attached to the button
- Button does absolutely nothing when clicked
- Just a visual placeholder

**Critical Issue:**
- **NO DEDICATED PAGE EXISTS** for emergency contact setup
- Emergency contact fields exist in various data structures but there's no centralized UI for regular users to manage them

**What Emergency Contact Support Exists:**

1. **Data Structure Support**:
   - [patientTypes.ts:40-45](src/features/professional/patients/patientTypes.ts#L40-L45) - `EmergencyContact` interface
   - User profile can include emergency contact fields
   - Admission forms include emergency contact fields

2. **Display in Various Contexts**:
   - [PatientProfile.tsx:93-111](src/features/health/PatientProfile.tsx#L93-L111) - Shows emergency contacts
   - [NewAdmissionModal.tsx:636-650](src/components/modals/NewAdmissionModal.tsx#L636-L650) - Emergency admission form
   - Women's health API includes emergency contact fields (lines 88-91 in womensHealthApi.ts)

3. **Related Pages**:
   - [EmergencyServicesPage.tsx](src/pages/EmergencyServicesPage.tsx) - Public info about emergency services (NOT contact management)
   - [ContactSupportPage.tsx](src/pages/account/ContactSupportPage.tsx) - Support contact info (NOT emergency contacts)
   - [ContactPreferencesPage.tsx](src/pages/account/ContactPreferencesPage.tsx) - Notification preferences (NOT emergency contacts)

**What's Missing:**

A dedicated page like `/account/emergency-contacts` that allows users to:
- Add emergency contact name
- Add emergency contact phone number
- Add emergency contact relationship
- Add emergency contact email (optional)
- Manage multiple emergency contacts
- Set primary emergency contact

**Implementation Needed:**

1. **Create New Component**: `EmergencyContactsPage.tsx`
2. **Add to PersonalDetailsPage**: Emergency contacts could be added as a section in the existing personal details page
3. **Auth Context Integration**: Add methods to update emergency contacts
   - `updateEmergencyContacts(contacts: EmergencyContact[]): Promise<void>`
   - Backend endpoint: `PUT /api/users/emergency-contacts/`

4. **User Interface Requirements**:
   - List of existing emergency contacts
   - Add/Edit/Delete functionality
   - Form validation for phone numbers and emails
   - Ability to reorder contacts by priority

**Alternative Quick Fix:**
- Direct users to `/account/personal-details` where emergency contact fields could be added
- This requires updating PersonalDetailsPage.tsx to include emergency contact fields

---

## Code References

### Onboarding Flow
- [OnboardingFlow.tsx:99-104](src/features/auth/OnboardingFlow.tsx#L99-L104) - "Find hospital near me" handler (wrong destination)
- [OnboardingFlow.tsx:183-188](src/features/auth/OnboardingFlow.tsx#L183-L188) - "Find hospital near me" button
- [OnboardingFlow.tsx:222-224](src/features/auth/OnboardingFlow.tsx#L222-L224) - "Upload records now" button (no handler)
- [OnboardingFlow.tsx:260-262](src/features/auth/OnboardingFlow.tsx#L260-L262) - "Set up emergency contacts" button (no handler)

### Hospital Finding (Correct Destination)
- [LinkPHBPage.tsx](src/pages/account/LinkPHBPage.tsx) - Full hospital finding and registration UI
- [authContext.tsx:1148](src/features/auth/authContext.tsx#L1148) - `fetchNearbyHospitals()` API call
- [authContext.tsx:1161](src/features/auth/authContext.tsx#L1161) - `registerWithHospital()` API call

### Wrong Current Destination
- [GPHealthRecord.tsx](src/features/health/GPHealthRecord.tsx) - GP health record viewing page (not hospital finding)
- [App.tsx:722](src/App.tsx#L722) - Route: `/account/gp-record` → `<GPHealthRecord />`

### Medical Records Upload
- [HealthRecordsPage.tsx:221-350+](src/pages/account/HealthRecordsPage.tsx#L221-L350) - Upload form UI
- [HealthRecordsPage.tsx:231](src/pages/account/HealthRecordsPage.tsx#L231) - Upload API endpoint
- [SecureFileUpload.tsx](src/components/security/SecureFileUpload.tsx) - Secure upload component
- [medicalRecordsService.ts](src/features/health/medicalRecordsService.ts) - Medical records API service

### Emergency Contacts (Data Structures)
- [patientTypes.ts:40-45](src/features/professional/patients/patientTypes.ts#L40-L45) - `EmergencyContact` interface
- [PatientProfile.tsx:93-111](src/features/health/PatientProfile.tsx#L93-L111) - Emergency contact display
- [NewAdmissionModal.tsx:636-650](src/components/modals/NewAdmissionModal.tsx#L636-L650) - Emergency admission form
- [womensHealthApi.ts:88-91](src/services/womensHealthApi.ts#L88-L91) - Women's health emergency contacts

### Related Pages (Not Emergency Contacts)
- [EmergencyServicesPage.tsx](src/pages/EmergencyServicesPage.tsx) - Emergency services info
- [ContactSupportPage.tsx](src/pages/account/ContactSupportPage.tsx) - Support contact
- [ContactPreferencesPage.tsx](src/pages/account/ContactPreferencesPage.tsx) - Notification preferences

---

## Architecture Insights

### Onboarding Flow Design Pattern

The onboarding flow follows a **progressive disclosure pattern** with 6 steps:
1. Welcome
2. Health Point Number (HPN) display
3. Primary hospital registration
4. Medical records management
5. Emergency assistance
6. Completion

**Current State:**
- Steps 1, 2, and 6 are **fully functional**
- Steps 3, 4, and 5 have **broken or missing button handlers**
- The content and UI are complete, but the **interactivity is missing**

### Disconnected Feature Implementation

The app has a **disconnected architecture** where:
- Onboarding flow exists as a standalone component
- Feature pages (hospital finding, medical records, emergency contacts) exist separately
- **No integration** between onboarding buttons and feature pages
- This suggests onboarding was designed as a **mockup/prototype** and never fully wired up

### User Experience Impact

**For New Users:**
1. Complete registration and OTP verification
2. Land on onboarding flow
3. Click "Find hospital near me" → Goes to wrong page (GP records instead of hospital search)
4. Click "Upload records now" → Nothing happens
5. Click "Set up emergency contacts" → Nothing happens
6. Complete onboarding without actually setting up these features
7. Must discover these features independently through navigation

**Consequence:**
- **Broken first-time user experience**
- Users miss critical onboarding steps
- Features remain undiscovered
- Reduces user engagement and platform adoption

---

## Recommendations

### Priority 1: Fix "Find Hospital Near Me" (Quick Fix)

**Effort**: 5 minutes

**Change Required:**
```typescript
// In OnboardingFlow.tsx, line 103
// CHANGE FROM:
window.location.href = '/account/gp-record';

// CHANGE TO:
window.location.href = '/account/link-phb';
```

**Impact:**
- Redirects users to correct hospital finding page
- Users can immediately find and register with a primary hospital
- Fixes the most critical onboarding issue

---

### Priority 2: Connect "Upload Records Now" (Quick Fix)

**Effort**: 10 minutes

**Implementation:**

1. Add handler function in OnboardingFlow.tsx:
```typescript
const handleUploadRecords = () => {
  window.location.href = '/account/health-records';
};
```

2. Update button (line 222):
```typescript
<button
  className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors"
  onClick={handleUploadRecords}
>
  Upload records now
</button>
```

**Impact:**
- Users can immediately upload medical records
- Connects to existing fully-functional upload system
- Minimal code change, maximum UX improvement

---

### Priority 3: Emergency Contacts - Two Options

#### Option A: Quick Fix - Direct to Personal Details (Recommended)

**Effort**: 30 minutes

**Steps:**
1. Add emergency contact fields to PersonalDetailsPage.tsx
2. Update user profile API to accept emergency contacts
3. Add handler to onboarding:
```typescript
const handleEmergencyContacts = () => {
  window.location.href = '/account/personal-details#emergency-contacts';
};
```

**Pros:**
- Reuses existing personal details page
- Quick implementation
- Emergency contacts part of user profile

**Cons:**
- Less focused UX
- Emergency contacts mixed with other profile fields

---

#### Option B: Create Dedicated Page (Better UX)

**Effort**: 4-6 hours

**Steps:**
1. Create new component: `src/pages/account/EmergencyContactsPage.tsx`
2. Add route in App.tsx: `/account/emergency-contacts`
3. Implement UI for:
   - List emergency contacts
   - Add/Edit/Delete contacts
   - Set primary contact
   - Phone/email validation
4. Create auth context methods:
   - `fetchEmergencyContacts()`
   - `addEmergencyContact(contact)`
   - `updateEmergencyContact(id, contact)`
   - `deleteEmergencyContact(id)`
5. Backend endpoints:
   - `GET /api/users/emergency-contacts/`
   - `POST /api/users/emergency-contacts/`
   - `PUT /api/users/emergency-contacts/:id/`
   - `DELETE /api/users/emergency-contacts/:id/`
6. Update onboarding handler:
```typescript
const handleEmergencyContacts = () => {
  window.location.href = '/account/emergency-contacts';
};
```

**Pros:**
- Dedicated, focused UI
- Better UX for managing multiple contacts
- Cleaner separation of concerns
- Matches professional medical apps

**Cons:**
- More development time
- Requires backend coordination

---

## Implementation Priority Order

1. **Immediate** (10 minutes total):
   - Fix "Find hospital near me" destination (5 min)
   - Add "Upload records now" handler (5 min)

2. **Short-term** (30 min - 1 hour):
   - Option A: Add emergency contacts to personal details page

3. **Medium-term** (4-6 hours):
   - Option B: Create dedicated emergency contacts management page
   - Requires backend coordination

---

## Testing Requirements

After implementing fixes, test:

1. **Hospital Finding Flow:**
   - Click "Find hospital near me" in onboarding
   - Verify navigation to `/account/link-phb`
   - Test geolocation permission request
   - Verify nearby hospitals load
   - Test hospital registration
   - Confirm user is marked as having primary hospital

2. **Medical Records Upload:**
   - Click "Upload records now" in onboarding
   - Verify navigation to `/account/health-records`
   - Test OTP verification for medical access
   - Test file upload with various file types
   - Verify virus scanning and encryption
   - Confirm uploaded files appear in records list

3. **Emergency Contacts:**
   - Click "Set up emergency contacts" in onboarding
   - Verify navigation to correct page
   - Test adding emergency contact
   - Test validation (phone format, required fields)
   - Test editing/deleting contacts
   - Verify contacts save to backend
   - Confirm contacts display in patient profile

4. **Complete Onboarding Flow:**
   - Go through all 6 steps
   - Test all three action buttons
   - Complete onboarding
   - Verify redirect to account page
   - Check that features are accessible from account navigation

---

## Breaking Changes Risk Assessment

### Risk Level: **VERY LOW**

**Rationale:**
- All changes are **additive** (adding onClick handlers)
- One change is a **route redirect** (low risk)
- No existing functionality is being removed or modified
- Changes only affect onboarding flow, which is isolated

**Impact:**
- Improves user experience
- Increases feature discoverability
- Higher user engagement
- Better onboarding completion rates

**Testing Required:**
- Manual testing of onboarding flow
- Verify navigation to correct pages
- Ensure existing pages work as expected
- No regression testing needed (no existing functionality modified)

---

## Related Research

- [2025-10-31-2fa-contact-preferences-issues.md](thoughts/shared/research/2025-10-31-2fa-contact-preferences-issues.md) - Contact preferences issues
- [onboarding-flow.md](docs/onboarding-flow.md) - Onboarding flow documentation
- [authentication-flow.md](docs/authentication-flow.md) - Authentication flow

---

## Open Questions

1. **Backend Status**:
   - Does the backend support emergency contacts endpoints?
   - Is there a preferred data structure for emergency contacts?

2. **User Profile Schema**:
   - Should emergency contacts be part of the main user profile?
   - Or should they be a separate related model?

3. **Feature Discoverability**:
   - Should users be required to complete these steps during onboarding?
   - Or should they remain optional?

4. **Navigation Pattern**:
   - Should we use `window.location.href` (full page reload)?
   - Or `navigate()` from react-router (SPA navigation)?

5. **Onboarding Completion**:
   - Should onboarding be marked complete even if users skip these features?
   - Or should we track which steps users completed?

6. **Emergency Contact Limits**:
   - How many emergency contacts should users be allowed to add?
   - Should there be a primary/secondary designation?
