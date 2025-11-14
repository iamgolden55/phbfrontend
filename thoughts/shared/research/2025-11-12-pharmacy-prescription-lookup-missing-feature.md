---
date: 2025-11-12T20:10:59+0000
researcher: Claude
git_commit: 991bc3617244ceb5a57cd467da28bdd5aa29c30d
branch: main
repository: phbfrontend
topic: "Pharmacy Prescription Lookup and Dispensing - Missing Feature Analysis"
tags: [research, codebase, pharmacy, prescriptions, hpn-lookup, dispensing, missing-feature]
status: complete
last_updated: 2025-11-12
last_updated_by: Claude
---

# Research: Pharmacy Prescription Lookup and Dispensing - Missing Feature Analysis

**Date**: 2025-11-12T20:10:59+0000
**Researcher**: Claude
**Git Commit**: 991bc3617244ceb5a57cd467da28bdd5aa29c30d
**Branch**: main
**Repository**: phbfrontend

## Research Question

**User Request**: "We need to finalize the prescription triage flow by creating the missing pharmacy dashboard page where pharmacists can request the HPN number of a patient and view the prescriptions that doctors have assigned to that patient."

**Core Questions**:
1. What prescription and pharmacy infrastructure already exists?
2. How do pharmacists currently authenticate and access the system?
3. What's missing in the pharmacy prescription lookup workflow?
4. How should the pharmacy HPN lookup and dispensing feature work?

## Summary

**Key Finding**: The codebase has a **comprehensive prescription system** with doctor prescription creation, patient prescription viewing, QR code generation, and a public pharmacy verification tool. However, there is a **critical missing feature**:

**❌ MISSING: Pharmacy Dashboard Page for HPN-Based Prescription Lookup**

### What Exists ✅
- Complete prescription creation and management by doctors
- Patient prescription viewing with QR codes
- Electronic prescription tokens with HMAC-SHA256 signatures
- Pharmacy nomination system
- **Public** pharmacy verification tool (`/pharmacy-verification`)
- Patient HPN system and search API
- Pharmacist authentication via `ProfessionalAuthProvider`

### What's Missing ❌
- **Authenticated pharmacy dashboard page** where pharmacists can:
  1. Enter a patient's HPN number
  2. Search for and view all active prescriptions for that patient
  3. Verify prescription authenticity
  4. Dispense medications with proper logging
  5. View nominated pharmacy information

### Current Gap
The existing `PharmacyVerification.tsx` component is a **public tool** that requires scanning a QR code. It doesn't allow pharmacists to:
- Log in to a pharmacy-specific dashboard
- Look up patients by HPN
- View all prescriptions assigned to a patient
- Access nominated pharmacy information

## Detailed Findings

### 1. Prescription Infrastructure ✅

#### Core Service Files
**`/Users/new/phbfinal/phbfrontend/src/features/health/prescriptionsService.ts`**
- Complete prescription service with 16+ TypeScript interfaces
- API endpoints for patient prescriptions, prescription requests, doctor workflows, and pharmacist triage
- Contains signed prescription data structure with payload and HMAC-SHA256 signature

**Key Interfaces**:
```typescript
ApiMedication {
  id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribed_by: string;
  prescribed_at: string;
  status: 'pending' | 'active' | 'dispensed' | 'completed';
  signed_prescription_data?: {
    payload: {
      type: string;
      id: string;
      nonce: string;  // UUID for replay attack prevention
      hpn: string;    // Patient HPN
      medication: string;
      patient: string;
      prescriber: string;
      pharmacy: any | null;
      issued: string;
      expiry: string;  // 30-day validity
    };
    signature: string;  // HMAC-SHA256
  };
}
```

#### API Endpoints
```
# Patient Prescription APIs
GET    /api/prescriptions/                          - Fetch patient prescriptions
POST   /api/prescriptions/requests/                 - Submit prescription request
GET    /api/prescriptions/{id}/                    - Get prescription details

# Doctor/Provider Prescription APIs
GET    /api/provider/prescriptions/                - List prescription requests
GET    /api/provider/prescriptions/{id}/           - Get request detail
POST   /api/provider/prescriptions/{id}/approve    - Approve request

# Pharmacist Triage APIs
GET    /api/provider/prescriptions/triage/         - List triage requests
POST   /api/provider/prescriptions/triage/{id}/approve/   - Approve
POST   /api/provider/prescriptions/triage/{id}/escalate/  - Escalate to doctor

# Verification & Dispensing APIs (Backend)
POST   /api/prescriptions/verify/                   - Verify prescription signature
POST   /api/prescriptions/dispense/                 - Record dispensing

# Patient Search API
GET    /api/patients/search/?hpn={hpn}             - Search patient by HPN
```

#### Prescription Creation Workflow
**`/Users/new/phbfinal/phbfrontend/src/features/professional/appointmentsService.ts:582-616`**
- Doctors create prescriptions during appointments
- Function: `addAppointmentPrescriptions(appointmentId, medications)`
- Medications include: name, dosage, quantity, duration, instructions, controlled flag

---

### 2. Pharmacy Authentication System ✅

#### Professional Authentication (Used by Pharmacists)
**`/Users/new/phbfinal/phbfrontend/src/features/professional/professionalAuthContext.tsx`**
- Pharmacists authenticate as professionals with `professional_type='pharmacist'`
- Token stored as: `phb_professional_token`
- Professional interface includes fields:
  - `professional_type: 'pharmacist' | 'doctor' | ...`
  - `pcn_license: string` (Pharmacists Council of Nigeria license)
  - `specialization: string` (e.g., 'Community Pharmacy', 'Hospital Pharmacy')

#### Professional Dashboard
**`/Users/new/phbfinal/phbfrontend/src/pages/professional/ProfessionalDashboardPage.tsx:13-26`**
- Pharmacist-specific configuration with welcome message
- Quick links to pharmacy resources and prescription triage

#### Route Guards
**`/Users/new/phbfinal/phbfrontend/src/features/professional/ProfessionalRouteGuard.tsx`**
- Protects professional routes (includes pharmacists)
- No pharmacy-specific route guard found

---

### 3. HPN (Health Patient Number) System ✅

#### HPN Storage
**`/Users/new/phbfinal/phbfrontend/src/features/auth/authContext.tsx:9`**
```typescript
interface User {
  id: string;
  full_name: string;
  email: string;
  hpn?: string;  // Health Patient Number
  // ... other fields
}
```

#### Patient Search by HPN
**`/Users/new/phbfinal/phbfrontend/src/components/search/PatientHPNSearch.tsx:66`**
- Component for HPN-based patient search
- Format: XXX XXX XXX XXXX (formatted display)
- API: `GET /api/patients/search/?hpn={hpn}`

#### HPN Usage in Prescriptions
**`/Users/new/phbfinal/phbfrontend/src/features/health/PrintablePrescription.tsx:193,267`**
- HPN displayed on printable prescriptions
- HPN included in QR code payload for pharmacy verification

---

### 4. Prescription Verification & QR Code System ✅

#### QR Code Generation
**`/Users/new/phbfinal/phbfrontend/src/features/health/PrintablePrescription.tsx`**
- Generates QR code using `react-qr-code` library
- QR code contains: `{payload: {...}, signature: "HMAC-SHA256"}`
- Includes prescription ID, nonce, HPN, medication details
- Also generates barcode as fallback

#### Pharmacy Verification Tool (PUBLIC)
**`/Users/new/phbfinal/phbfrontend/src/features/health/PharmacyVerification.tsx`**
- **Location**: `/pharmacy-verification` (public route)
- **Purpose**: Verify and dispense prescriptions via QR code
- **Functions**:
  - Verify prescription signature (lines 50-84)
  - Dispense medication (lines 86-133)
- **Limitation**: ⚠️ This is a **PUBLIC tool**, not behind pharmacy authentication
- **Missing**: No HPN lookup functionality

#### Verification Workflow
```
1. Pharmacy scans QR code
2. Parses JSON payload + signature
3. POST to /api/prescriptions/verify/
4. Backend verifies HMAC-SHA256 signature
5. Checks: prescription exists, not expired, not dispensed, nonce matches
6. Returns verification result
```

#### Dispensing Workflow
```
1. After successful verification
2. Pharmacy enters: pharmacy code, pharmacy name, pharmacist name
3. POST to /api/prescriptions/dispense/
4. Backend records: dispensed=True, dispensed_at, pharmacy, pharmacist
5. Creates audit trail
```

---

### 5. Pharmacy Nomination System ✅

#### Pharmacy Service
**`/Users/new/phbfinal/phbfrontend/src/services/pharmacyService.ts`**
- Complete pharmacy service with nomination APIs
- Functions:
  - `getCurrentNomination()` - GET `/api/pharmacies/nominated/`
  - `nominatePharmacy(pharmacyId, userHpn)` - POST `/api/pharmacies/nominated/`
  - `removeNomination()` - DELETE `/api/pharmacies/nominated/`
  - `getNominationHistory()` - GET `/api/pharmacies/nomination-history/`

**Key Interface**:
```typescript
interface NominatedPharmacy {
  id: string;
  pharmacy: Pharmacy;
  user_hpn: string;  // Patient HPN
  nominated_at: string;
  is_active: boolean;
}
```

#### Nomination Page
**`/Users/new/phbfinal/phbfrontend/src/pages/account/NominatedPharmacyPage.tsx`**
- Route: `/account/nominated-pharmacy`
- Patients can select and manage their nominated pharmacy
- Displays if pharmacy has electronic prescriptions enabled

---

### 6. Existing Pharmacy Pages

#### Pharmacy Resources Page
**`/Users/new/phbfinal/phbfrontend/src/pages/professional/PharmacyResourcesPage.tsx`**
- Route: `/professional/pharmacy-resources`
- Resource page specifically for pharmacists
- Links to external pharmacy education resources

#### Prescription Triage Page
**`/Users/new/phbfinal/phbfrontend/src/pages/professional/PrescriptionTriagePage.tsx`**
- Route: `/professional/prescriptions/triage`
- Pharmacists review prescription requests
- Actions: approve, escalate, or reject requests
- **Limitation**: This is for prescription **requests**, not for dispensing prescriptions created by doctors

---

## Gap Analysis: What's Missing ❌

### The Missing Feature: Pharmacy HPN Lookup & Dispensing Dashboard

The system currently lacks a **dedicated authenticated pharmacy dashboard page** where pharmacists can:

#### 1. **HPN-Based Patient Search**
```
Missing Component: PharmacyPrescriptionLookup.tsx
Missing Route: /professional/pharmacy/prescriptions or /professional/pharmacy/dispense

Functionality Needed:
- Input field for patient HPN (with format validation: XXX XXX XXX XXXX)
- Button to search for patient prescriptions
- Call API: GET /api/patients/search/?hpn={hpn}
- Display patient information (name, HPN, nominated pharmacy)
```

#### 2. **Prescription List View for Patient**
```
Missing Component: PharmacyPatientPrescriptions.tsx

Functionality Needed:
- Display all active/pending prescriptions for the patient
- Show prescription details:
  - Medication name, dosage, frequency, duration
  - Prescribed by (doctor name)
  - Prescribed at (date/time)
  - Status (pending/active/dispensed)
  - Nominated pharmacy (if any)
  - Expiry date (30 days from issue)
- Filter prescriptions by status
- Highlight prescriptions nominated to this pharmacy
```

#### 3. **Prescription Detail & Verification**
```
Missing Component: PharmacyPrescriptionDetail.tsx

Functionality Needed:
- View full prescription details
- Display signed prescription data (payload + signature)
- Verify prescription authenticity automatically
- Show verification status:
  ✓ Signature Valid
  ✓ Not Expired
  ✓ Not Previously Dispensed
  ✓ Nonce Valid
- For controlled substances: prompt for additional verification
  - Patient ID type (NIN, Driver License, Passport, etc.)
  - ID last 4 digits
  - Patient presence confirmation
  - Professional judgment notes
```

#### 4. **Dispensing Action**
```
Missing Functionality in Authenticated Context:

Functionality Needed:
- "Dispense Medication" button
- Form to capture:
  - Pharmacy code (auto-filled from logged-in pharmacy)
  - Pharmacy name (auto-filled)
  - Pharmacist name (auto-filled from logged-in user)
  - PCN license number (auto-filled)
  - For controlled substances:
    - Patient ID verification fields
    - Professional judgment notes
    - Prescriber contact confirmation (if needed)
- POST to /api/prescriptions/dispense/ with authentication
- Display dispensing confirmation
- Update prescription status to "dispensed"
- Record audit trail
```

#### 5. **Pharmacy Dashboard Integration**
```
Missing Route: /professional/pharmacy/dashboard

Functionality Needed:
- Quick HPN search box
- Recent dispensing activity
- Pending prescription triage requests
- Nominated pharmacy prescriptions waiting
- Statistics: prescriptions dispensed today, this week, this month
- Controlled substances log access
```

---

## Comparison: Existing vs. Missing

### Existing: PharmacyVerification.tsx (Public Tool)
**Location**: `/pharmacy-verification` (public route)
**Purpose**: Verify QR codes from printed prescriptions
**Workflow**:
```
1. Patient brings printed prescription with QR code
2. Pharmacist (unauthenticated) scans QR code
3. System verifies signature
4. Pharmacist enters pharmacy details manually
5. System records dispensing
```
**Limitations**:
- ❌ Requires patient to have QR code
- ❌ No authentication required
- ❌ No HPN lookup
- ❌ No access to all patient prescriptions
- ❌ No integration with nominated pharmacy
- ❌ Manual entry of pharmacy details

### Missing: PharmacyPrescriptionLookup (Authenticated Dashboard)
**Proposed Location**: `/professional/pharmacy/prescriptions`
**Purpose**: Authenticated pharmacy dashboard for HPN-based prescription lookup
**Workflow**:
```
1. Pharmacist logs in (authenticated)
2. Patient arrives with HPN (no QR code needed)
3. Pharmacist enters HPN in dashboard
4. System displays all active prescriptions for patient
5. Pharmacist selects prescription to dispense
6. System verifies prescription automatically
7. Pharmacist confirms dispensing
8. System records dispensing with logged-in pharmacy details
```
**Advantages**:
- ✅ Patient only needs to remember/show HPN
- ✅ Authenticated access (audit trail of who accessed what)
- ✅ View all prescriptions at once
- ✅ Auto-fill pharmacy details from logged-in user
- ✅ Integration with nominated pharmacy
- ✅ Better security and compliance

---

## Recommended Implementation

### Phase 1: Core HPN Lookup Feature

#### 1. Create New Service Function
**File**: `/Users/new/phbfinal/phbfrontend/src/services/pharmacyService.ts`

```typescript
// Add new interface
export interface PatientPrescriptionsResponse {
  patient: {
    id: string;
    full_name: string;
    hpn: string;
    nominated_pharmacy?: NominatedPharmacy;
  };
  prescriptions: ApiMedication[];
  total_count: number;
}

// Add new function
export const getPatientPrescriptionsByHPN = async (
  hpn: string,
  status?: 'pending' | 'active' | 'dispensed' | 'completed'
): Promise<PatientPrescriptionsResponse> => {
  const token = localStorage.getItem('phb_professional_token');
  const params = new URLSearchParams({ hpn });
  if (status) params.append('status', status);

  const response = await axios.get(
    `${API_BASE_URL}/api/pharmacy/prescriptions/by-hpn/?${params.toString()}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
```

#### 2. Create HPN Search Component
**New File**: `/Users/new/phbfinal/phbfrontend/src/features/pharmacy/PharmacyHPNSearch.tsx`

```typescript
import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

export const PharmacyHPNSearch: React.FC = () => {
  const [hpn, setHpn] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    // Call getPatientPrescriptionsByHPN
    // Navigate to prescription list view
  };

  const formatHPN = (value: string) => {
    // Format as XXX XXX XXX XXXX
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return value;
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Search Patient Prescriptions by HPN
      </Typography>
      <TextField
        label="Health Patient Number (HPN)"
        value={hpn}
        onChange={(e) => setHpn(formatHPN(e.target.value))}
        placeholder="XXX XXX XXX XXXX"
        fullWidth
      />
      <Button
        variant="contained"
        startIcon={<Search />}
        onClick={handleSearch}
        disabled={loading || hpn.length < 15}
      >
        Search Prescriptions
      </Button>
    </Card>
  );
};
```

#### 3. Create Prescription List Component
**New File**: `/Users/new/phbfinal/phbfrontend/src/features/pharmacy/PharmacyPrescriptionList.tsx`

```typescript
import React from 'react';
import { Card, List, ListItem, Chip, Button } from '@mui/material';
import { ApiMedication } from '../health/prescriptionsService';

interface Props {
  patient: {
    full_name: string;
    hpn: string;
    nominated_pharmacy?: any;
  };
  prescriptions: ApiMedication[];
  onDispense: (prescriptionId: string) => void;
}

export const PharmacyPrescriptionList: React.FC<Props> = ({
  patient,
  prescriptions,
  onDispense
}) => {
  return (
    <div>
      <Card sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">{patient.full_name}</Typography>
        <Typography variant="body2">HPN: {patient.hpn}</Typography>
        {patient.nominated_pharmacy && (
          <Chip label={`Nominated: ${patient.nominated_pharmacy.name}`} />
        )}
      </Card>

      <List>
        {prescriptions.map((prescription) => (
          <ListItem key={prescription.id}>
            {/* Prescription details */}
            <Button
              variant="contained"
              onClick={() => onDispense(prescription.id)}
              disabled={prescription.status === 'dispensed'}
            >
              {prescription.status === 'dispensed' ? 'Already Dispensed' : 'Dispense'}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
```

#### 4. Create Main Pharmacy Prescriptions Page
**New File**: `/Users/new/phbfinal/phbfrontend/src/pages/professional/PharmacyPrescriptionsPage.tsx`

```typescript
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { PharmacyHPNSearch } from '../../features/pharmacy/PharmacyHPNSearch';
import { PharmacyPrescriptionList } from '../../features/pharmacy/PharmacyPrescriptionList';
import { getPatientPrescriptionsByHPN } from '../../services/pharmacyService';

export const PharmacyPrescriptionsPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = async (hpn: string) => {
    const result = await getPatientPrescriptionsByHPN(hpn);
    setSearchResult(result);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pharmacy Prescription Management
      </Typography>

      <PharmacyHPNSearch onSearch={handleSearch} />

      {searchResult && (
        <PharmacyPrescriptionList
          patient={searchResult.patient}
          prescriptions={searchResult.prescriptions}
          onDispense={(id) => {/* Handle dispensing */}}
        />
      )}
    </Container>
  );
};
```

#### 5. Add Route to App.tsx
**File**: `/Users/new/phbfinal/phbfrontend/src/App.tsx`

```typescript
// Add import
import PharmacyPrescriptionsPage from './pages/professional/PharmacyPrescriptionsPage';

// Add route under ProfessionalLayout
<Route
  path="/professional/pharmacy/prescriptions"
  element={
    <ProfessionalRouteGuard>
      <PharmacyPrescriptionsPage />
    </ProfessionalRouteGuard>
  }
/>
```

#### 6. Update Professional Layout Navigation
**File**: `/Users/new/phbfinal/phbfrontend/src/layouts/ProfessionalLayout.tsx`

```typescript
// Add to pharmacist navigation menu
case 'pharmacist':
  menuItems = [
    { label: 'Dashboard', path: '/professional/dashboard', icon: <Dashboard /> },
    { label: 'Prescriptions', path: '/professional/pharmacy/prescriptions', icon: <LocalPharmacy /> },
    { label: 'Prescription Triage', path: '/professional/prescriptions/triage', icon: <Assignment /> },
    { label: 'Pharmacy Resources', path: '/professional/pharmacy-resources', icon: <School /> },
  ];
```

---

### Phase 2: Enhanced Features

#### 1. Dispensing Modal with Verification
**New File**: `/Users/new/phbfinal/phbfrontend/src/components/pharmacy/PharmacyDispenseModal.tsx`

Features:
- Display prescription details
- Automatic signature verification
- Controlled substance detection
- Patient ID verification form (for controlled substances)
- Pharmacist confirmation
- Dispensing notes
- Call POST `/api/prescriptions/dispense/` with authenticated pharmacy details

#### 2. Controlled Drugs Register
**New Page**: `/Users/new/phbfinal/phbfrontend/src/pages/professional/ControlledDrugsRegisterPage.tsx`

Features:
- View all controlled substance dispensing
- Filter by date range
- Export to PDF for compliance
- Stock reconciliation

#### 3. Pharmacy Dashboard Analytics
**New Page**: `/Users/new/phbfinal/phbfrontend/src/pages/professional/PharmacyDashboardPage.tsx`

Features:
- Quick HPN search
- Today's dispensing activity
- Pending prescription triage
- Nominated pharmacy prescriptions waiting
- Statistics and charts

---

## Backend API Requirements

### New Endpoint Needed
```
GET /api/pharmacy/prescriptions/by-hpn/?hpn={hpn}&status={status}
Authorization: Bearer {professional_token}

Response:
{
  "patient": {
    "id": "uuid",
    "full_name": "John Doe",
    "hpn": "123 456 7890",
    "nominated_pharmacy": {
      "id": "uuid",
      "name": "City Pharmacy",
      "code": "PHB-PH-001234"
    }
  },
  "prescriptions": [
    {
      "id": "PHB-RX-00000123",
      "medication_name": "Amoxicillin 500mg",
      "dosage": "500mg",
      "frequency": "Three times daily",
      "duration": "7 days",
      "prescribed_by": "Dr. Jane Smith",
      "prescribed_at": "2025-11-10T10:30:00Z",
      "status": "active",
      "is_controlled": false,
      "signed_prescription_data": {
        "payload": { ... },
        "signature": "abc123..."
      }
    }
  ],
  "total_count": 5
}
```

### Security Considerations
- Endpoint must require professional authentication
- Log all HPN searches (audit trail)
- Verify pharmacist has authorization to access patient data
- Rate limiting to prevent data scraping
- Comply with HIPAA-equivalent regulations (NAFDAC guidelines)

---

## Code References

### Existing Components to Reference
- `PatientHPNSearch.tsx:66` - HPN search pattern
- `PharmacyVerification.tsx:50-133` - Verification and dispensing logic
- `PrintablePrescription.tsx:27-44` - Signed prescription data structure
- `prescriptionsService.ts:33-77` - ApiMedication interface
- `pharmacyService.ts:15-427` - Pharmacy service patterns
- `ProfessionalDashboardPage.tsx:13-26` - Pharmacist dashboard config

### API Endpoints to Use
- `GET /api/patients/search/?hpn={hpn}` - Patient search (existing)
- `POST /api/prescriptions/verify/` - Signature verification (existing)
- `POST /api/prescriptions/dispense/` - Record dispensing (existing)
- `GET /api/pharmacy/prescriptions/by-hpn/` - **NEW** - Get prescriptions by HPN

---

## Documentation References

### Comprehensive Guides
- `/Users/new/phbfinal/phbfrontend/docs/prescription_guides_and_triage_system/PRESCRIPTION_COMPLIANCE_AND_PATIENT_VERIFICATION.md` - Complete compliance guide with NHS EPS model, NAFDAC regulations, patient verification protocols
- `/Users/new/phbfinal/phbfrontend/ELECTRONIC_PRESCRIPTION_TOKEN_ANALYSIS.md` - Signature generation, verification workflow, QR code payload structure
- `/Users/new/phbfinal/phbfrontend/thoughts/shared/research/2025-11-08-appointment-prescription-pharmacy-flow.md` - Complete flow analysis including verification and dispensing

### Implementation Context
- Prescription system follows **NHS Electronic Prescription Service (UK)** model
- 30-day prescription validity (NAFDAC compliance)
- HMAC-SHA256 signatures for cryptographic security
- Nonce-based replay attack prevention
- Multi-layered patient verification for controlled substances

---

## Next Steps

### Immediate Actions
1. ✅ **Review findings with user** to confirm understanding
2. ⚠️ **Clarify backend API availability** - Does `GET /api/pharmacy/prescriptions/by-hpn/` exist?
3. ⚠️ **Create PharmacyPrescriptionsPage.tsx** - Main HPN lookup page
4. ⚠️ **Create PharmacyHPNSearch.tsx** - HPN search component
5. ⚠️ **Create PharmacyPrescriptionList.tsx** - Prescription list view
6. ⚠️ **Create PharmacyDispenseModal.tsx** - Dispensing modal with verification
7. ⚠️ **Add route to App.tsx** - `/professional/pharmacy/prescriptions`
8. ⚠️ **Update ProfessionalLayout.tsx** - Add navigation menu item for pharmacists

### Testing Requirements
1. Test HPN search functionality
2. Test prescription list display
3. Test dispensing workflow
4. Test controlled substance additional verification
5. Test audit trail logging
6. Test with nominated pharmacy vs. non-nominated

### Questions for User
1. Does the backend API `GET /api/pharmacy/prescriptions/by-hpn/` already exist?
2. Should pharmacists only see prescriptions for patients at their nominated pharmacy, or all prescriptions?
3. What additional patient verification is required beyond HPN?
4. Should there be a pharmacy code/license verification before allowing access?
5. Any specific NAFDAC compliance requirements we need to implement immediately?

---

## Conclusion

The PHB prescription system has a **solid foundation** with comprehensive doctor prescription creation, patient viewing, QR code generation, and a public verification tool. However, the **critical missing piece** is an **authenticated pharmacy dashboard** where pharmacists can look up patients by HPN and view/dispense all prescriptions assigned by doctors.

The existing `PharmacyVerification.tsx` is a public tool that requires QR code scanning, which doesn't fulfill the complete pharmacy workflow. The recommended implementation adds a new authenticated page at `/professional/pharmacy/prescriptions` that allows pharmacists to:

1. Enter patient HPN
2. View all active prescriptions for that patient
3. Verify prescription authenticity automatically
4. Dispense medications with proper logging and compliance

This feature will complete the prescription triage flow: **Patient → Doctor → Prescription → Pharmacist Lookup by HPN → Dispensing**.

---

## Follow-up Research: Industry Standards Analysis

**Date**: 2025-11-12T20:45:00+0000
**Added By**: Claude
**Topic**: Industry standards from NHS, US systems, Canadian PrescribeIT, Australian eRx

### Question 1: Pharmacy Scope - Industry Standard

**Research Finding**: **Patient-Choice Model** (NHS EPS, Australia eRx, Canada PrescribeIT, US systems)

#### NHS Electronic Prescription Service (Gold Standard)
- **Nomination is for convenience, NOT restriction**
- If patient nominates pharmacy: Prescriptions automatically sent to nominated pharmacy
- If NO nomination: Patient receives electronic token that works at **ANY pharmacy**
- **Key principle**: Prescription follows the PATIENT, not the pharmacy

**Quote from NHS England**:
> "If a patient has no nomination, you will need to print an electronic prescription token... the prescription can be dispensed at any pharmacy"

#### Australian eRx & Canadian PrescribeIT
- Electronic token sent to patient (SMS/email)
- Patient can take token to ANY pharmacy
- Nomination just automates delivery to preferred pharmacy

#### US Systems (CVS, Walgreens, Epic)
- Patient-centric model: Prescriptions belong to the patient
- Patients can transfer prescriptions between pharmacies
- No nomination lock-in

**RECOMMENDATION**:
```
✅ Patient-Choice Model for PHB

Pharmacy Access Rules:
1. Nominated Pharmacy:
   - Automatically sees prescriptions nominated to them
   - Receives notifications for new prescriptions

2. Non-Nominated Pharmacy (Patient walks in with HPN):
   - Can look up patient by HPN
   - Views ALL active prescriptions for patient
   - Patient must be physically present (or authorize)
   - System logs which pharmacy accessed prescriptions

3. Security:
   - Audit trail of all pharmacy access
   - Patient can view access history
   - Rate limiting to prevent data scraping

Rationale:
- Follows NHS EPS and international standards
- Maximizes patient convenience and choice
- Prevents vendor lock-in
- Maintains security through audit trails
```

---

### Question 2: Patient Verification - Industry Standard

**Research Finding**: **Risk-Based Verification** (NHS, DEA, international standards)

#### NHS Standard (Two-Tier)

**Standard Medications:**
- Patient name (verbal confirmation)
- Address confirmation
- Visual age-appropriate check

**Controlled Substances (Schedule 2/3):**
- **Government-issued photo ID REQUIRED**
- Acceptable IDs: Passport, Driving License, National ID
- Pharmacist verifies photo matches patient
- Records ID type and verification in log

#### US DEA Standard

**Schedule II Controlled Substances - MANDATORY:**
```
- Government-issued photo ID:
  * Driver's License
  * Passport
  * State ID Card
- Name and address match prescription
- Some states require:
  * Signature comparison
  * Thumbprint (California, Nevada)
  * PDMP database check (Prescription Drug Monitoring Program)
```

#### Epic/CLEAR Integration (Modern Hospital Systems)
- Biometric identity verification
- Selfie + ID document
- Reusable digital identity
- Integration with EHR systems

**RECOMMENDATION**:
```
✅ Risk-Based Patient Verification for PHB

LEVEL 1: All Prescriptions (Basic)
- Patient provides HPN verbally
- Pharmacist confirms: "What is your full name?"
- Visual confirmation: Patient physically present
- System validates: HPN exists, matches patient name

LEVEL 2: Controlled Substances (Enhanced - NAFDAC Schedule 2/3/4)
- ALL Level 1 checks PLUS:
- Government-issued photo ID REQUIRED:
  * National ID (NIN) - PREFERRED
  * Driver's License
  * International Passport
  * Voter's Card
- Pharmacist verifies:
  * Photo matches patient
  * Name matches prescription
  * ID not expired
- System records:
  * ID type
  * Last 4 digits of ID number (privacy)
  * Pharmacist confirmation checkbox

LEVEL 3: High-Risk Scenarios (Maximum)
- ALL Level 2 checks PLUS:
- Prescriber contact verification
- Dosage monitoring (check prescription history)
- Professional judgment documentation

Drug Database Integration:
- System automatically flags controlled substances
- Uses DrugClassification.nafdac_schedule field
- Shows pharmacist: "⚠️ NAFDAC Schedule 2 - Photo ID Required"
- Cannot proceed without ID verification for controlled substances
```

---

### Question 3: Pharmacy License Verification - Industry Standard

**Research Finding**: **Yes - Mandatory License Verification** (All international systems)

#### NHS Standard
- Pharmacy must have **NHS contract number**
- Pharmacist must have **GPhC registration** (General Pharmaceutical Council)
- System checks registration before allowing EPS access
- Only registered pharmacies can access NHS Spine

#### US DEA Standard

**Strict licensing requirements:**
```
MANDATORY for controlled substances:
- DEA Form 224: Pharmacy registration
- DEA registration number
- State pharmacy license
- Pharmacist state license
- Annual renewal required

System Integration:
- Real-time verification of DEA registration
- State board license status checks
- Automated alerts for expired licenses
```

#### Canadian PrescribeIT
- Pharmacy must be registered with provincial college
- Digital certificates for authentication
- Pharmacist professional license verification

#### Australian eRx
- Pharmacy registration required
- Integration with AHPRA (Australian Health Practitioner Regulation Agency)
- License verification before system access

**RECOMMENDATION**:
```
✅ Pharmacy Access Control for PHB

REGISTRATION REQUIREMENTS (Before ANY access):
1. Pharmacy License Verification:
   - PCN (Pharmacists Council of Nigeria) registration
   - Pharmacy premises license
   - Unique pharmacy code (PHB-PH-XXXXXX)
   - License expiry date
   - Annual renewal status

2. Pharmacist Authentication:
   - Professional login with credentials
   - PCN license number verification
   - Current practicing license
   - Specialization verification

3. System Access Levels:
   - Level 1: View nominated prescriptions (automatic)
   - Level 2: Search any patient by HPN (requires license verification)
   - Level 3: Dispense controlled substances (requires enhanced verification)

IMPLEMENTATION:
Backend API checks on EVERY request:
- Verify pharmacy license is active
- Verify pharmacist license is current
- Rate limiting to prevent abuse
- Automatic blocking if license expires

Database Tables:
- pharmacy_licenses (pharmacy_code, pcn_registration, expiry_date, status)
- pharmacist_credentials (user_id, pcn_license, specialization, verified_at)
- access_logs (pharmacy_id, pharmacist_id, patient_hpn, action, timestamp)
```

---

## Drug Database Integration Role

**Reference**: `/Users/new/phbfinal/phbfrontend/docs/drugs_database/DRUG_DATABASE_TRIAGE_INTEGRATION_COMPLETE.md`

### Comprehensive Drug Database (505 Drugs)

The drug database is **NOT just for identifying controlled drugs** - it's a comprehensive system that powers the entire prescription workflow:

#### Current Uses (Live System):
1. **Prescription Request Triage**: Auto-categorizes to pharmacist vs doctor
2. **Controlled Substance Detection**: NAFDAC Schedules 2/3/4 identification
3. **Risk Assessment**: High-risk medications, monitoring requirements
4. **Safety Checks**: Drug interactions, contraindications, warnings

#### Upcoming Use (Pharmacy Dispensing - This Implementation):
```
Pharmacist Dispensing Flow with Drug Database:

1. Pharmacist enters patient HPN
2. System displays prescriptions
3. Pharmacist selects prescription to dispense
4. Drug Database provides:
   ✓ Is it controlled substance? → ID verification required
   ✓ Risk level? → Monitoring notes needed
   ✓ Drug interactions? → Warnings displayed
   ✓ Dispensing restrictions? → Special handling required
   ✓ Storage requirements? → Pharmacist counseling points
   ✓ Patient counseling? → Safety information
```

#### Drug Database Coverage:
```
505 Drugs Imported with 60+ fields each:
- NAFDAC registration number
- NAFDAC schedule classification (2, 3, 4, or unscheduled)
- Risk level (high, moderate, low)
- Prescription requirements (physician-only, prescription required, OTC)
- Drug interactions
- Contraindications
- Black box warnings
- Monitoring requirements (INR checks, liver function, etc.)
- Dispensing restrictions
- Alternative medications
- Storage conditions
- Therapeutic class

Categories:
- 25 controlled substances (Schedules 2-4)
- 85 high-risk medications
- 128 physician-only prescriptions
- 68 antibiotics
- 88 cardiovascular drugs
- And many more...
```

#### Integration Points in Pharmacy Dispensing:

**1. Controlled Substance Detection**
```typescript
// Automatic detection from drug database
if (medication.drug.nafdac_schedule in ['2', '3', '4']) {
  showAlert("⚠️ NAFDAC Schedule " + medication.drug.nafdac_schedule);
  requirePatientIDVerification = true;
  showIDVerificationForm();
}
```

**2. Risk-Based Counseling**
```typescript
// Display from drug database
if (medication.drug.risk_level === 'HIGH') {
  showMonitoringRequirements(medication.drug.monitoring_requirements);
  showBlackBoxWarning(medication.drug.black_box_warning);
}
```

**3. Drug Interaction Warnings**
```typescript
// Check against patient's other medications
const interactions = checkDrugInteractions(
  medication.drug,
  patientOtherMedications
);
if (interactions.length > 0) {
  showInteractionWarnings(interactions);
}
```

---

## Updated Implementation Plan (Industry Standard + Drug Database)

### Phase 1: Core HPN Lookup Feature (Priority 1)

#### 1. Backend API Endpoint
**NEW**: `GET /api/pharmacy/prescriptions/by-hpn/`

```python
# api/views/pharmacy_prescription_views.py

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsPharmacist])
def get_prescriptions_by_hpn(request):
    """
    Get all prescriptions for a patient by HPN.
    Includes drug database information for dispensing.
    """
    hpn = request.GET.get('hpn')
    status = request.GET.get('status', 'active')  # active, pending, dispensed

    # Verify pharmacy license
    pharmacy = request.user.pharmacist.pharmacy
    if not pharmacy.is_license_valid():
        return Response({'error': 'Pharmacy license expired'}, status=403)

    # Verify pharmacist license
    if not request.user.pharmacist.is_license_valid():
        return Response({'error': 'Pharmacist license expired'}, status=403)

    # Find patient by HPN
    try:
        user = User.objects.get(hpn=hpn)
    except User.DoesNotExist:
        return Response({'error': 'Patient not found'}, status=404)

    # Get prescriptions with drug database info
    prescriptions = Medication.objects.filter(
        user=user,
        status=status
    ).select_related('drug', 'prescribed_by').prefetch_related('drug__interactions')

    # Log access for audit trail
    PharmacyAccessLog.objects.create(
        pharmacy=pharmacy,
        pharmacist=request.user.pharmacist,
        patient=user,
        action='VIEW_PRESCRIPTIONS',
        timestamp=timezone.now()
    )

    # Serialize with drug database info
    prescription_data = []
    for med in prescriptions:
        data = {
            'id': med.id,
            'medication_name': med.medication_name,
            'dosage': med.dosage,
            'frequency': med.frequency,
            'prescribed_by': med.prescribed_by.full_name,
            'prescribed_at': med.prescribed_at,
            'status': med.status,

            # Drug database info
            'drug_info': {
                'is_controlled': med.drug.nafdac_schedule in ['2', '3', '4'],
                'nafdac_schedule': med.drug.nafdac_schedule,
                'risk_level': med.drug.risk_level,
                'requires_monitoring': med.drug.requires_therapeutic_monitoring,
                'has_black_box_warning': med.drug.has_black_box_warning,
                'dispensing_restrictions': med.drug.dispensing_restrictions,
                'storage_conditions': med.drug.storage_conditions,
                'counseling_points': med.drug.patient_counseling_points,
            } if med.drug else None,

            # Prescription verification
            'signed_prescription_data': med.signed_prescription_data,
        }
        prescription_data.append(data)

    return Response({
        'patient': {
            'id': user.id,
            'full_name': user.full_name,
            'hpn': user.hpn,
            'nominated_pharmacy': get_nominated_pharmacy(user),
        },
        'prescriptions': prescription_data,
        'total_count': len(prescription_data),
    })
```

#### 2. Frontend Service Function
**File**: `/Users/new/phbfinal/phbfrontend/src/services/pharmacyPrescriptionService.ts`

```typescript
export interface DrugInfo {
  is_controlled: boolean;
  nafdac_schedule: string;
  risk_level: 'HIGH' | 'MODERATE' | 'LOW';
  requires_monitoring: boolean;
  has_black_box_warning: boolean;
  dispensing_restrictions: string;
  storage_conditions: string;
  counseling_points: string[];
}

export interface PharmacyPrescription {
  id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  prescribed_by: string;
  prescribed_at: string;
  status: 'pending' | 'active' | 'dispensed';
  drug_info?: DrugInfo;
  signed_prescription_data?: any;
}

export interface PatientPrescriptionsResponse {
  patient: {
    id: string;
    full_name: string;
    hpn: string;
    nominated_pharmacy?: any;
  };
  prescriptions: PharmacyPrescription[];
  total_count: number;
}

export const getPatientPrescriptionsByHPN = async (
  hpn: string,
  status?: string
): Promise<PatientPrescriptionsResponse> => {
  const token = localStorage.getItem('phb_professional_token');
  const params = new URLSearchParams({ hpn });
  if (status) params.append('status', status);

  const response = await axios.get(
    `${API_BASE_URL}/api/pharmacy/prescriptions/by-hpn/?${params.toString()}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
```

#### 3. Main Pharmacy Prescriptions Page
**NEW FILE**: `/Users/new/phbfinal/phbfrontend/src/pages/professional/PharmacyPrescriptionsPage.tsx`

```typescript
import React, { useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { PharmacyHPNSearch } from '../../features/pharmacy/PharmacyHPNSearch';
import { PharmacyPrescriptionList } from '../../features/pharmacy/PharmacyPrescriptionList';
import { getPatientPrescriptionsByHPN } from '../../services/pharmacyPrescriptionService';

export const PharmacyPrescriptionsPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (hpn: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPatientPrescriptionsByHPN(hpn);
      setSearchResult(result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pharmacy Prescription Management
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Search for patient prescriptions by Health Patient Number (HPN)
      </Typography>

      <PharmacyHPNSearch onSearch={handleSearch} loading={loading} />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {searchResult && (
        <PharmacyPrescriptionList
          patient={searchResult.patient}
          prescriptions={searchResult.prescriptions}
          onDispense={(id) => {/* Handle dispensing */}}
        />
      )}
    </Container>
  );
};
```

#### 4. HPN Search Component with Drug Database Awareness
**NEW FILE**: `/Users/new/phbfinal/phbfrontend/src/features/pharmacy/PharmacyHPNSearch.tsx`

```typescript
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { Search, LocalPharmacy } from '@mui/icons-material';

interface Props {
  onSearch: (hpn: string) => void;
  loading?: boolean;
}

export const PharmacyHPNSearch: React.FC<Props> = ({ onSearch, loading }) => {
  const [hpn, setHpn] = useState('');

  const formatHPN = (value: string) => {
    // Format as XXX XXX XXX XXXX (Nigeria HPN format)
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4]]
        .filter(x => x)
        .join(' ');
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHpn(formatHPN(e.target.value));
  };

  const handleSearch = () => {
    const cleanedHPN = hpn.replace(/\s/g, '');
    if (cleanedHPN.length === 13) {
      onSearch(cleanedHPN);
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalPharmacy color="primary" />
          Search Patient Prescriptions
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter the patient's Health Patient Number (HPN) to view their active prescriptions
        </Typography>

        <TextField
          label="Health Patient Number (HPN)"
          value={hpn}
          onChange={handleChange}
          placeholder="XXX XXX XXX XXXX"
          fullWidth
          helperText="Patient must be physically present for prescription access"
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearch}
          disabled={loading || hpn.replace(/\s/g, '').length !== 13}
          fullWidth
        >
          {loading ? 'Searching...' : 'Search Prescriptions'}
        </Button>
      </CardContent>
    </Card>
  );
};
```

#### 5. Prescription List with Drug Database Info
**NEW FILE**: `/Users/new/phbfinal/phbfrontend/src/features/pharmacy/PharmacyPrescriptionList.tsx`

```typescript
import React from 'react';
import {
  Card, CardContent, Typography, List, ListItem, Chip,
  Button, Alert, Box, Divider
} from '@mui/material';
import {
  Warning, LocalPharmacy, Schedule, MedicalServices
} from '@mui/icons-material';
import { PharmacyPrescription } from '../../services/pharmacyPrescriptionService';

interface Props {
  patient: {
    full_name: string;
    hpn: string;
    nominated_pharmacy?: any;
  };
  prescriptions: PharmacyPrescription[];
  onDispense: (prescriptionId: string) => void;
}

export const PharmacyPrescriptionList: React.FC<Props> = ({
  patient,
  prescriptions,
  onDispense
}) => {
  const controlledSubstances = prescriptions.filter(
    p => p.drug_info?.is_controlled
  );

  return (
    <Box sx={{ mt: 3 }}>
      {/* Patient Info Card */}
      <Card elevation={2} sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{patient.full_name}</Typography>
          <Typography variant="body2" color="text.secondary">
            HPN: {patient.hpn}
          </Typography>
          {patient.nominated_pharmacy && (
            <Chip
              label={`Nominated: ${patient.nominated_pharmacy.name}`}
              color="primary"
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </CardContent>
      </Card>

      {/* Controlled Substances Alert */}
      {controlledSubstances.length > 0 && (
        <Alert severity="warning" icon={<Warning />} sx={{ mb: 2 }}>
          <Typography variant="subtitle2">
            {controlledSubstances.length} Controlled Substance{controlledSubstances.length > 1 ? 's' : ''} Detected
          </Typography>
          <Typography variant="body2">
            Patient photo ID verification required for NAFDAC Schedule {controlledSubstances.map(p => p.drug_info?.nafdac_schedule).join(', ')} medications
          </Typography>
        </Alert>
      )}

      {/* Prescriptions List */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Active Prescriptions ({prescriptions.length})
      </Typography>

      <List>
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="h6">
                    {prescription.medication_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prescription.dosage} • {prescription.frequency}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Prescribed by {prescription.prescribed_by} on{' '}
                    {new Date(prescription.prescribed_at).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                  {prescription.drug_info?.is_controlled && (
                    <Chip
                      label={`NAFDAC Schedule ${prescription.drug_info.nafdac_schedule}`}
                      color="error"
                      size="small"
                      icon={<Warning />}
                    />
                  )}

                  {prescription.drug_info?.risk_level === 'HIGH' && (
                    <Chip
                      label="High Risk"
                      color="warning"
                      size="small"
                    />
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Drug Database Information */}
              {prescription.drug_info && (
                <Box sx={{ mb: 2 }}>
                  {prescription.drug_info.has_black_box_warning && (
                    <Alert severity="error" icon={<Warning />} sx={{ mb: 1 }}>
                      <Typography variant="caption">
                        <strong>Black Box Warning:</strong> This medication has special safety concerns
                      </Typography>
                    </Alert>
                  )}

                  {prescription.drug_info.requires_monitoring && (
                    <Alert severity="info" icon={<MedicalServices />} sx={{ mb: 1 }}>
                      <Typography variant="caption">
                        <strong>Monitoring Required:</strong> Therapeutic drug monitoring needed
                      </Typography>
                    </Alert>
                  )}

                  {prescription.drug_info.dispensing_restrictions && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Dispensing Notes:</strong> {prescription.drug_info.dispensing_restrictions}
                    </Typography>
                  )}
                </Box>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={() => onDispense(prescription.id)}
                disabled={prescription.status === 'dispensed'}
                fullWidth
              >
                {prescription.status === 'dispensed' ? 'Already Dispensed' : 'Dispense Medication'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};
```

---

## Implementation Priority (Industry Standard + Drug Database)

### **Phase 1** (Critical - Week 1):
1. ✅ Pharmacy license verification (PCN registration check)
2. ✅ HPN lookup endpoint with drug database integration
3. ✅ Basic patient verification (HPN + name)
4. ✅ Patient-choice model (any pharmacy can access with patient present)
5. ✅ Audit logging of all pharmacy access

### **Phase 2** (Compliance - Week 2):
1. ✅ Controlled substance detection (from drug database)
2. ✅ Government ID verification for NAFDAC Schedule 2/3/4
3. ✅ Dispensing modal with drug database info
4. ✅ Risk-based verification workflow
5. ✅ Drug interaction warnings

### **Phase 3** (Advanced - Week 3-4):
1. ✅ Real-time PCN license API integration (when available)
2. ✅ Prescription Drug Monitoring equivalent
3. ✅ Patient prescription history across pharmacies
4. ✅ Analytics dashboard for pharmacy metrics

---

**Document Status**: ✅ Complete with Industry Standards and Drug Database Integration
**Next Review**: After user confirmation to proceed with implementation
