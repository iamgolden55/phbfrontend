---
date: 2025-10-21T00:45:15+0000
researcher: Claude Code
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Pharmacy Nomination System - How it Works and Current Implementation Status"
tags: [research, codebase, pharmacy, prescriptions, nominations, eps, healthcare, backend, django]
status: complete
last_updated: 2025-10-21
last_updated_by: Claude Code
last_updated_note: "Added comprehensive backend implementation findings from /Users/new/Newphb/basebackend/"
---

# Research: Pharmacy Nomination System - How it Works and Current Implementation Status

**Date**: 2025-10-21T00:45:15+0000
**Researcher**: Claude Code
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

How does pharmacy nomination work in the PHB system? How do you change your default pharmacy? Is there a pharmacy system as stated in the help URL `http://127.0.0.1:5173/help/prescriptions/how-nominations-work`?

## Summary

**YES**, there is a comprehensive pharmacy nomination system documented and partially implemented in the PHB frontend:

1. **Help Documentation EXISTS**: The help page at `/help/prescriptions/how-nominations-work` is fully implemented with detailed information about how pharmacy nominations work
2. **Backend Architecture DOCUMENTED**: Complete backend specification exists with database schema, API endpoints, and integration details
3. **Frontend Implementation INCOMPLETE**: The actual pharmacy nomination functionality is in "Coming Soon" status - users cannot yet nominate or change pharmacies through the UI
4. **Pharmacy Search EXISTS**: Users can search and find pharmacies but cannot select them as nominated pharmacies yet

**Key Finding**: The system is designed but not yet fully operational on the frontend.

## Detailed Findings

### 1. How Pharmacy Nomination Works (Design)

Based on the help page and backend documentation, pharmacy nomination is designed to work as follows:

**Concept**:
- A nominated pharmacy is the pharmacy chosen to receive and dispense electronic prescriptions automatically
- When a GP issues an electronic prescription, it's sent directly to the nominated pharmacy via the Electronic Prescription Service (EPS)

**Benefits** (src/pages/help/prescriptions/HowNominationsWorkPage.tsx:73-105):
- No need to collect paper prescriptions from GP
- Pharmacy can prepare prescriptions before patient arrives
- Reduced risk of lost prescriptions
- More efficient repeat prescription process
- Option for medication delivery from some pharmacies

**Workflow** (src/pages/help/prescriptions/HowNominationsWorkPage.tsx:112-170):
1. **Prescription Created**: Doctor creates electronic prescription
2. **Electronic Transmission**: Prescription sent to nominated pharmacy via EPS
3. **Preparation**: Pharmacy prepares medication
4. **Collection**: Patient collects medication from nominated pharmacy

### 2. How to Change Default Pharmacy (Documented Methods)

The help page documents 4 ways to set/change nominated pharmacy (src/pages/help/prescriptions/HowNominationsWorkPage.tsx:175-243):

1. **Through PHB Website/App** (Primary Method - Line 182-200):
   - Easiest method via PHB account
   - Links to `/account/nominated-pharmacy`
   - **Status**: NOT YET IMPLEMENTED (shows "Coming Soon")

2. **At Your Pharmacy** (Line 202-214):
   - Visit any pharmacy in person
   - Pharmacy staff can set up or change nomination
   - Requires identification

3. **Through GP Practice** (Line 216-228):
   - Contact GP practice directly
   - GP can update pharmacy nomination preferences

4. **By Phone** (Line 230-242):
   - Call PHB Help Centre: 0800 123 4567
   - Available 8am-8pm, 7 days a week
   - Staff can update nomination

**Important Note** (Line 253-255): Users can change nominated pharmacy at any time; new nomination takes effect for next prescription.

### 3. Current Implementation Status

#### ✅ IMPLEMENTED Components

**Help Pages**:
- `src/pages/help/prescriptions/HowNominationsWorkPage.tsx` - Complete help documentation
- `src/pages/help/prescriptions/HowToRequestPage.tsx` - Prescription request guide
- `src/pages/help/prescriptions/UrgentRequestsPage.tsx` - Urgent prescription info

**Pharmacy Search**:
- `src/pages/FindPharmacyPage.tsx` - Full pharmacy finder with:
  - MapBox integration for location-based search
  - Pharmacy list with filtering by category
  - Search by name, address, and services
  - Interactive map with pharmacy markers
  - Pharmacy details display (hours, phone, services)

**Route Configuration** (src/App.tsx):
- Line 525-527: Help page routes properly configured
- Line 704-706: Nominated pharmacy page route exists
- Line 786: Find pharmacy route functional

#### ⏳ NOT YET IMPLEMENTED

**Pharmacy Nomination UI** (src/pages/account/NominatedPharmacyPage.tsx):
- Page exists but shows "Coming Soon" placeholder (line 32)
- Located at `/account/nominated-pharmacy`
- Explains future functionality (line 36-43):
  - View currently nominated pharmacy details
  - Search pharmacies by name, postcode, or town
  - View nearby pharmacies with opening hours
  - Change nominated pharmacy easily
  - Receive nomination update confirmation

**Pharmacy API Service**:
- No dedicated pharmacy service file exists in frontend
- Backend endpoints documented but not consumed by frontend
- Prescription service exists but doesn't include pharmacy nomination calls

### 4. Backend Architecture (Documented)

The backend specification in `docs/prescription-service-backend.md` provides complete architecture:

**Database Schema** (Lines 140-175):

1. **pharmacies table**:
   - Stores pharmacy information (name, address, ODS code)
   - EPS enabled status
   - Opening hours (JSONB format)

2. **nominated_pharmacies table**:
   - Links users to their nominated pharmacy
   - `is_current` flag ensures only one active nomination
   - Prevents duplicate nominations via unique constraint
   - Tracks nomination history

**API Endpoints Documented** (Lines 192-199):
```
GET    /api/pharmacies/search            # Search pharmacies
GET    /api/pharmacies/:id               # Get pharmacy details
GET    /api/pharmacies/nominated         # Get user's nominated pharmacy
POST   /api/pharmacies/:id/nominate      # Nominate a pharmacy
DELETE /api/pharmacies/:id/nominate      # Remove pharmacy nomination
```

**EPS Integration** (Lines 256-264):
- Protocol: HL7 FHIR (Fast Healthcare Interoperability Resources)
- Authentication: PKI certificates and mutual TLS
- Message Format: JSON-based FHIR resources
- Operations: Send prescriptions, receive status updates, query dispensing info

### 5. Related Prescription Features

**Prescription Management** (src/features/health/Prescriptions.tsx):
- Main UI component for viewing prescriptions
- Three modal dialogs: Collect, Complete, Details
- Status filtering and prescription cards
- References nominated pharmacy functionality (line 477-482)

**Prescription Service** (src/features/health/prescriptionsService.ts):
- Complete API service with endpoints:
  - `GET /api/prescriptions/` - Fetch patient prescriptions
  - `POST /api/prescriptions/request/` - Request new prescription
  - `POST /api/prescriptions/:id/order/` - Order prescription
  - `POST /api/prescriptions/:id/complete/` - Complete prescription
- No pharmacy nomination API calls yet

**Request Prescription Page** (src/pages/account/RequestPrescriptionPage.tsx):
- Also in "Coming Soon" status
- Will allow repeat prescription requests
- Will integrate with pharmacy nomination

### 6. Organization & Professional Views

**Pharmacy Organizations**:
- Support for `pharmacy_admin` role (src/features/organization/organizationAuthContext.tsx:364-365)
- Pharmacy dashboard components exist:
  - `src/features/organization/dashboards/PharmaDashboard.tsx`
  - `src/features/organization/dashboards/FluentPharmaDashboard.tsx`
- Organization layouts handle pharmacy type detection

## Code References

**Help Pages**:
- `src/pages/help/prescriptions/HowNominationsWorkPage.tsx:1-339` - Complete nomination explanation
- `src/pages/help/prescriptions/HowToRequestPage.tsx` - Prescription request guide
- `src/pages/help/prescriptions/UrgentRequestsPage.tsx` - Urgent requests

**Account Pages**:
- `src/pages/account/NominatedPharmacyPage.tsx:1-64` - Coming Soon placeholder
- `src/pages/account/RequestPrescriptionPage.tsx` - Coming Soon placeholder
- `src/pages/FindPharmacyPage.tsx` - Working pharmacy search

**Services**:
- `src/features/health/prescriptionsService.ts` - Prescription API service
- No pharmacy service file exists yet

**Documentation**:
- `docs/prescription-service-backend.md:1-479` - Complete backend specification
- `docs/prescription-service-backend.md:140-175` - Database schema
- `docs/prescription-service-backend.md:192-199` - Pharmacy API endpoints

**Routes** (src/App.tsx):
- Line 525-527: Help page routes
- Line 704-706: Nominated pharmacy route
- Line 786: Find pharmacy route

## Architecture Insights

### Design Patterns

1. **Electronic Prescription Service (EPS) Integration**:
   - National system for electronic prescription transmission
   - Requires pharmacy to be EPS-enabled
   - Uses HL7 FHIR protocol for interoperability

2. **Single Nominated Pharmacy**:
   - Users can only have ONE nominated pharmacy at a time
   - Implemented via `is_current` flag in database
   - Can change nomination at any time

3. **Pharmacy Nomination is Optional**:
   - Users can still receive paper prescriptions with barcodes
   - Paper prescriptions can be taken to any pharmacy
   - Nomination provides convenience, not requirement

4. **Multiple Update Channels**:
   - Online (primary), in-person at pharmacy, through GP, or by phone
   - Ensures accessibility for all user types

### Security & Compliance

**Data Protection** (docs/prescription-service-backend.md:286-296):
- AES-256 encryption for data at rest
- TLS 1.2+ for data in transit
- Database field-level encryption for sensitive data

**Authentication**:
- JWT tokens for patient authentication
- Permission scopes: `pharmacy:read`, `pharmacy:nominate`
- Multi-factor authentication for healthcare providers

**Regulatory Compliance**:
- GDPR compliance for patient data
- National Health Data Security requirements
- 8-year data retention period

### Integration Points

1. **National EPS**: Electronic prescription transmission
2. **GP/Hospital Systems**: HL7 v2 or FHIR integration
3. **Pharmacy Management Systems**: FHIR or proprietary APIs
4. **PHB Authentication Service**: Centralized user authentication

## Historical Context (from thoughts/)

From `thoughts/shared/research/2025-10-17-data-management-global-scale.md`:

**Prescriptions Feature Context** (line 118-121):
- Prescription request page mentioned with features:
  - Medication requests
  - **Nominated pharmacy selection** (planned)
  - Prescription history

**Security Considerations**:
- Prescription data classified as PHI (Protected Health Information)
- Recommendation for AES-256 encryption
- OTP verification for medical record access includes prescriptions

**Role Context** (line 335):
- `pharmacy_admin` role for pharmacy organizations
- Access to `/organization/*` routes
- Part of three-tier auth system (user, professional, organization)

## Related Research

No other pharmacy-specific research documents found in thoughts directory.

## Open Questions

1. **Implementation Timeline**: When will the pharmacy nomination UI be completed?
2. **API Integration Status**: Are the backend pharmacy endpoints already implemented or also pending?
3. **EPS Connectivity**: Has the EPS integration been completed on the backend?
4. **Pharmacy Data Source**: Where does the pharmacy database come from? (NHS ODS service?)
5. **Testing Environment**: How to test pharmacy nomination without full backend?
6. **Migration Path**: How will existing users be onboarded to pharmacy nominations when feature launches?

## Answers to Original Questions

### Q1: How does pharmacy nomination work?

Pharmacy nomination is a system where patients choose a preferred pharmacy to receive their electronic prescriptions automatically via the Electronic Prescription Service (EPS). When a GP issues a prescription, it's transmitted electronically to the nominated pharmacy, which prepares the medication for collection. Benefits include:
- No paper prescription needed
- Pharmacy can prepare medication in advance
- Reduced prescription loss risk
- More efficient repeat prescription process
- Some pharmacies offer delivery

The workflow: Doctor creates prescription → EPS transmits to nominated pharmacy → Pharmacy prepares medication → Patient collects.

### Q2: How do you change your default pharmacy?

**Documented Methods** (4 ways):
1. Through PHB website/app at `/account/nominated-pharmacy` (**NOT YET AVAILABLE** - Coming Soon)
2. In person at any pharmacy (pharmacy staff update the system)
3. Contact GP practice to update preferences
4. Call PHB Help Centre at 0800 123 4567

**Current Status**: The online method is not yet implemented. The page exists but shows a "Coming Soon" message. Users would need to use alternative methods (pharmacy, GP, phone) until the feature is completed.

### Q3: Is there a pharmacy system as stated in the help URL?

**YES**, the help page EXISTS and is fully functional at `/help/prescriptions/how-nominations-work` (route works at `http://127.0.0.1:5173/help/prescriptions/how-nominations-work`).

**However**:
- ✅ Help documentation is COMPLETE and accessible
- ✅ Backend architecture is FULLY DOCUMENTED
- ✅ Pharmacy search/finder is FUNCTIONAL
- ❌ Actual pharmacy nomination feature is NOT YET IMPLEMENTED (Coming Soon)
- ❌ Prescription request feature is NOT YET IMPLEMENTED (Coming Soon)

The system is designed and documented but waiting for full implementation.

---

## Follow-up Research: Backend Implementation Analysis

**Date**: 2025-10-21T01:00:00+0000
**Backend Repository**: `/Users/new/Newphb/basebackend/`

### Key Finding: NO Pharmacy Nomination System in Backend

After thoroughly exploring the Django backend at `/Users/new/Newphb/basebackend/`, I found that:

**❌ PHARMACY NOMINATION DOES NOT EXIST** in the current backend implementation. The pharmacy nomination system documented in `docs/prescription-service-backend.md` (frontend docs) is **purely aspirational** - it describes a future system that has not been built yet.

### What Actually Exists in Backend

#### 1. Pharmacy as Department Type

**File**: `/Users/new/Newphb/basebackend/api/models/medical/department.py:14-32`

Pharmacy is implemented as a **department type** within hospitals, not as standalone pharmacies:

```python
DEPARTMENT_TYPES = [
    # ... other types ...
    ('pharmacy', 'Pharmacy'),  # Line 25
    # ...
]
```

**What this means**:
- Pharmacies are hospital departments, not independent entities
- No separate Pharmacy model exists
- No NominatedPharmacy model exists
- No pharmacy nomination functionality

**To search for pharmacy departments**:
- Endpoint: `GET /api/hospitals/departments/`
- Filter: `?department_type=pharmacy`
- Returns: Hospital departments of type pharmacy

#### 2. Prescription Implementation (Medication Model)

**File**: `/Users/new/Newphb/basebackend/api/models/medical/medication.py`

The backend uses `Medication` model for prescriptions, not a separate `Prescription` model:

**Two models exist**:
1. **MedicationCatalog** (line 10): Reference catalog with drug information
2. **Medication** (line 210): Patient prescription records

**Pharmacy-related fields in Medication model**:
- `pharmacy_instructions` (TextField) - Instructions for pharmacy
- `prescription_number` (CharField) - Pharmacy prescription number
- `pharmacy_name` (CharField) - Dispensing pharmacy name

**Database tables**:
- `api_medicationcatalog` - Drug reference catalog
- `api_medication` - Patient prescriptions

#### 3. Prescription API Endpoints (Actually Implemented)

**File**: `/Users/new/Newphb/basebackend/api/urls.py:380-384`

```python
# Prescription endpoints
path('appointments/<str:appointment_id>/prescriptions/', create_prescription, name='create-prescription')
path('appointments/<str:appointment_id>/prescriptions/view/', appointment_prescriptions, name='appointment-prescriptions')
path('prescriptions/', patient_prescriptions, name='patient-prescriptions')
path('prescriptions/<str:appointment_id>/', patient_prescriptions, name='patient-prescriptions-by-appointment')
```

**Available endpoints**:
- `POST /api/appointments/{id}/prescriptions/` - Create prescription (doctor only)
- `GET /api/appointments/{id}/prescriptions/view/` - View appointment prescriptions
- `GET /api/prescriptions/` - List all patient prescriptions
- `GET /api/prescriptions/{id}/` - Get prescriptions by appointment

**View implementation**: `/Users/new/Newphb/basebackend/api/views/hospital/hospital_views.py`
- `create_prescription()` function (lines 2304, 3092 - duplicate implementations)
- `patient_prescriptions()` function (lines 2391, 3257 - duplicate implementations)
- `appointment_prescriptions()` function (lines 2448, 3354 - duplicate implementations)

#### 4. Pharmacy Staff Role

**File**: `/Users/new/Newphb/basebackend/api/models/user/custom_user.py:149`

```python
('pharmacy_tech', 'Pharmacy Technician')
```

Pharmacy technicians can be created as users, but there's no specific pharmacy organization management beyond this role.

### What Does NOT Exist in Backend

**❌ No Pharmacy Models**:
- No `Pharmacy` model
- No `NominatedPharmacy` model
- No `PharmacyLicense` standalone model
- No pharmacy-specific database tables

**❌ No Pharmacy Nomination Endpoints**:
- No `GET /api/pharmacies/search`
- No `GET /api/pharmacies/:id`
- No `GET /api/pharmacies/nominated`
- No `POST /api/pharmacies/:id/nominate`
- No `DELETE /api/pharmacies/:id/nominate`

**❌ No EPS Integration**:
- No Electronic Prescription Service integration
- No HL7 FHIR implementation
- No prescription transmission to external pharmacies

**❌ No Prescription Request/Approval Workflow**:
- No prescription request model
- No approval/rejection workflow
- No prescription status beyond medication status (active, completed, discontinued)
- No prescription ordering/fulfillment system

### Backend Architecture Summary

**Current Reality**:
- Pharmacy = Department within a hospital
- Prescription = Medication record attached to appointments
- No standalone pharmacy entities
- No pharmacy nomination system
- No prescription request/approval workflow

**Prescription Workflow (Actual)**:
1. Doctor creates appointment with patient
2. Doctor creates `Medication` record during/after appointment
3. Medication can include `pharmacy_name` and `pharmacy_instructions`
4. Patient can view their medications via `/api/prescriptions/`
5. No transmission to external pharmacies

**Department-based Pharmacy**:
- Hospitals can have pharmacy departments
- Pharmacy departments tracked like other departments
- No special pharmacy functionality beyond department type
- Can search: `/api/hospitals/departments/?department_type=pharmacy`

### Gap Analysis: Documentation vs Reality

**Frontend Documentation** (`docs/prescription-service-backend.md`):
- Describes comprehensive pharmacy nomination system ✗ NOT IMPLEMENTED
- Documents dedicated pharmacy tables ✗ DO NOT EXIST
- Shows pharmacy nomination API endpoints ✗ DO NOT EXIST
- Explains EPS integration ✗ DOES NOT EXIST

**Actual Backend Implementation**:
- Pharmacy as hospital department type ✓ EXISTS
- Basic prescription/medication tracking ✓ EXISTS
- Pharmacy fields in medication model ✓ EXISTS
- Simple appointment-based prescription creation ✓ EXISTS

### Database Schema (Actual)

**Tables that exist**:
```
api_department - Contains pharmacy departments
api_medication - Contains prescriptions with pharmacy fields
api_medicationcatalog - Drug reference catalog
api_customuser - Contains pharmacy_tech staff type
```

**Tables that DO NOT exist**:
```
pharmacies - Documented but not created
nominated_pharmacies - Documented but not created
prescription_items - Documented but not created
prescriptions - Uses api_medication instead
```

### Code References (Backend)

**Models**:
- `/Users/new/Newphb/basebackend/api/models/medical/department.py:14-32` - Pharmacy department type
- `/Users/new/Newphb/basebackend/api/models/medical/medication.py:1-500` - Medication/prescription model
- `/Users/new/Newphb/basebackend/api/models/user/custom_user.py:149` - Pharmacy tech role

**Views**:
- `/Users/new/Newphb/basebackend/api/views/hospital/hospital_views.py:2304-2453` - Prescription endpoints
- `/Users/new/Newphb/basebackend/api/views/hospital/hospital_views.py:3092-3412` - Enhanced prescription endpoints (duplicates)

**URLs**:
- `/Users/new/Newphb/basebackend/api/urls.py:380-384` - Prescription routes
- `/Users/new/Newphb/basebackend/api/urls.py:227-229` - Department routes

**Serializers**:
- `/Users/new/Newphb/basebackend/api/serializers.py:1142-1169` - MedicationSerializer
- `/Users/new/Newphb/basebackend/api/serializers.py:1172-1175` - PrescriptionSerializer

**Migrations**:
- `/Users/new/Newphb/basebackend/api/migrations/0007_medicationcatalog_medication.py` - Creates medication tables
- `/Users/new/Newphb/basebackend/api/migrations/0001_initial.py` - Initial pharmacy department type

### Updated Answers to Original Questions

#### Q1: How does pharmacy nomination work?

**Design** (from frontend docs): Pharmacy nomination would allow patients to choose a preferred pharmacy for electronic prescriptions via EPS.

**Reality**: **Pharmacy nomination does not exist** in either frontend or backend. The help page describes a planned feature that has not been built.

#### Q2: How do you change your default pharmacy?

**Answer**: **You cannot** change your default pharmacy because the pharmacy nomination system has not been implemented. The help page and documentation describe future functionality.

**Current workaround**: Doctors can manually enter `pharmacy_name` when creating prescriptions, but there's no user-managed nomination system.

#### Q3: Is there a pharmacy system?

**Partial YES**:
- ✅ Help documentation exists explaining how it WOULD work
- ✅ Pharmacy departments can be created within hospitals
- ✅ Prescriptions can include pharmacy name and instructions
- ❌ No standalone pharmacy entities
- ❌ No pharmacy nomination functionality
- ❌ No pharmacy search for patients
- ❌ No EPS integration
- ❌ No electronic prescription transmission

**Conclusion**: The pharmacy "system" is limited to hospital pharmacy departments and basic pharmacy metadata on prescriptions. The comprehensive pharmacy nomination system described in the help pages does not exist.

### Implementation Recommendations

To build the pharmacy nomination system as documented:

1. **Create Pharmacy Model** - Standalone pharmacies with ODS codes, addresses, hours
2. **Create NominatedPharmacy Model** - User-pharmacy nomination tracking
3. **Build Pharmacy API** - Search, view, nominate, remove nomination endpoints
4. **Frontend Integration** - Connect NominatedPharmacyPage to new endpoints
5. **EPS Integration** - External system integration for prescription transmission
6. **Migration Strategy** - Import pharmacy data from NHS ODS or similar source

**Estimated effort**: Major feature development (weeks/months), not a quick addition.
