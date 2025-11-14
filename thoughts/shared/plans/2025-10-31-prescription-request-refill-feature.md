# Prescription Request/Refill Feature Implementation Plan

## Overview

Implement a comprehensive prescription request and refill system that allows patients to request new prescriptions or refill existing ones through a user-friendly 3-step wizard interface. The feature includes request history tracking, controlled medication handling with smart warnings, and regulated quantity limits.

**Target Route**: `/account/request-prescription`
**Related Routes**: `/account/prescriptions` (history view)

## Current State Analysis

### What Exists

**Frontend:**
- Placeholder page at `src/pages/account/RequestPrescriptionPage.tsx:1-47` (just "Coming Soon" message)
- Service function `requestNewPrescription()` exists at `src/features/health/prescriptionsService.ts:149-172`
- Route already configured at `src/App.tsx:721-725`
- Prescription viewing and printing features completed last week

**Backend:**
- API endpoint exists: `POST /api/prescriptions/request/`
- Database schema supports multiple medications via `prescription_items` table
- Request status workflow: REQUESTED → APPROVED/REJECTED → DISPENSED

### Current Limitations

1. **API Interface Mismatch**: Current `PrescriptionRequest` interface only accepts single medication string, but backend database supports multiple structured medications
2. **No Request History**: Users cannot see pending or rejected requests
3. **No Controlled Medication Handling**: No warnings or restrictions for controlled substances
4. **No Quantity Validation**: No limits on requested quantities
5. **Incomplete User Flow**: No multi-step wizard implementation

### Key Discoveries

- **Reference Pattern**: `BookAppointment.tsx` provides excellent multi-step wizard pattern
- **Pharmacy Integration**: `NominatedPharmacyPage.tsx` has pharmacy search/selection ready to reuse
- **Medication Display**: Multiple patterns available for displaying medications
- **Backend Ready**: Database schema and approval workflow already implemented

## Desired End State

### User Capabilities

1. **Request Prescriptions via 3-Step Wizard:**
   - Step 1: Select medications from current prescriptions or request new medications
   - Step 2: Add request details, notes, and select/confirm nominated pharmacy
   - Step 3: Review all details and submit request

2. **View Request History:**
   - See all prescription requests (pending, approved, rejected)
   - Filter by status and date
   - Track request progress

3. **Smart Controlled Medication Handling:**
   - Visual warnings for controlled substances (Schedule II-V)
   - Mandatory additional information requirements
   - Quantity restrictions enforced
   - Confirmation dialogs before submission

4. **Regulated Quantity Limits:**
   - Maximum quantity per medication type
   - Maximum total items per request
   - Repeat request frequency tracking

### Verification Criteria

**User can:**
- Select multiple existing prescriptions for refill in one request
- Add custom new medication requests with detailed information
- See clear warnings when requesting controlled medications
- Review complete request before submission
- View pending requests and their approval status
- See rejected requests with rejection reasons
- Track approved requests through to dispensing

**System enforces:**
- Quantity limits (e.g., max 90-day supply)
- Controlled medication restrictions
- Frequency limits (e.g., no more than 1 request per 7 days for same medication)
- Required fields validation
- Pharmacy nomination requirement

## What We're NOT Doing

1. ❌ Prescription approval workflow (that's provider-side, already exists)
2. ❌ Real-time EPS integration (backend handles this)
3. ❌ Pharmacy inventory checking (future enhancement)
4. ❌ Payment processing (prescriptions are covered by healthcare system)
5. ❌ Prescription cancellation after approval (requires provider action)
6. ❌ Direct messaging with GP (separate feature)
7. ❌ Medication interaction checking (clinical decision support, out of scope)
8. ❌ Automated refill reminders (future enhancement)

## Implementation Approach

### Strategy

1. **Backend First**: Update API contract to support structured multiple medications
2. **Frontend Wizard**: Implement 3-step form with validation and user guidance
3. **History Integration**: Add request history viewing to existing prescriptions page
4. **Smart Safeguards**: Implement controlled medication warnings and quantity validation
5. **Testing**: Comprehensive testing including edge cases and controlled substances

### Technical Decisions

- **State Management**: Local component state using `useState` (matches existing patterns)
- **Form Pattern**: Multi-step wizard with explicit selection flags (proven in appointment booking)
- **Validation**: Step-by-step validation with clear error messages
- **API Authentication**: Cookie-based with `credentials: 'include'` (existing pattern)
- **Controlled Medication Detection**: Frontend validation based on medication name patterns + backend flags

---

## Phase 1: Backend API Enhancement

### Overview
Update the backend API to accept structured multiple medications per request, add quantity validation, and support request history retrieval with status filtering.

### Changes Required

#### 1.1 Update Request Interface

**File**: `src/features/health/prescriptionsService.ts`

**Current Interface (lines 84-88)**:
```typescript
export interface PrescriptionRequest {
  medication: string;
  reason: string;
  additional_info?: string;
}
```

**New Interface**:
```typescript
export interface MedicationRequestItem {
  medication_id?: string;           // For repeat prescriptions
  medication_name: string;           // Name of medication
  strength?: string;                 // e.g., "500mg"
  form?: string;                     // e.g., "tablet", "capsule"
  quantity: number;                  // Quantity requested
  dosage?: string;                   // e.g., "Take 1 tablet twice daily"
  is_repeat: boolean;                // true if refilling existing prescription
  reason?: string;                   // Reason for new medication request
}

export interface PrescriptionRequest {
  medications: MedicationRequestItem[];  // Multiple medications
  request_type: 'repeat' | 'new' | 'dosage_change';
  urgency: 'routine' | 'urgent';
  additional_notes?: string;
  nominated_pharmacy_id?: number;
}

export interface PrescriptionRequestResponse {
  id: string;
  request_reference: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'DISPENSED' | 'CANCELLED';
  request_date: string;
  medications: MedicationRequestItem[];
  pharmacy?: ApiPharmacy;
  message: string;
}
```

#### 1.2 Update API Service Function

**File**: `src/features/health/prescriptionsService.ts`

**Update `requestNewPrescription()` function (lines 149-172)**:
```typescript
export async function requestNewPrescription(
  prescriptionRequest: PrescriptionRequest
): Promise<PrescriptionRequestResponse> {
  try {
    // Validate quantities before sending
    validateQuantities(prescriptionRequest.medications);

    const response = await fetch(fixApiUrl('/api/prescriptions/request/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(prescriptionRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error requesting prescription: ${response.status}`);
    }

    const data = await response.json();
    console.log('Created prescription request:', data);
    return data;
  } catch (error) {
    console.error('Error requesting prescription:', error);
    throw error;
  }
}
```

#### 1.3 Add Request History Functions

**File**: `src/features/health/prescriptionsService.ts`

**Add new functions**:
```typescript
export interface PrescriptionRequestHistoryItem {
  id: string;
  request_reference: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'DISPENSED' | 'CANCELLED';
  request_date: string;
  approval_date?: string;
  rejection_reason?: string;
  medications: MedicationRequestItem[];
  urgency: 'routine' | 'urgent';
  pharmacy?: ApiPharmacy;
}

export interface RequestHistoryResponse {
  status: string;
  requests: PrescriptionRequestHistoryItem[];
  total_count: number;
}

/**
 * Fetch prescription request history
 * @param status Optional status filter
 * @returns Promise that resolves to request history
 */
export async function fetchPrescriptionRequests(
  status?: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'ALL'
): Promise<RequestHistoryResponse> {
  try {
    const queryParams = status && status !== 'ALL' ? `?status=${status}` : '';
    const response = await fetch(fixApiUrl(`/api/prescriptions/requests/${queryParams}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching request history: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching request history:', error);
    throw error;
  }
}
```

#### 1.4 Add Quantity Validation Logic

**File**: `src/features/health/prescriptionsService.ts`

**Add validation constants and function**:
```typescript
// Quantity limits per medication form
const QUANTITY_LIMITS: Record<string, number> = {
  tablet: 90,      // 90-day supply typical
  capsule: 90,
  liquid: 500,     // 500ml
  inhaler: 3,      // 3 inhalers max
  injection: 30,   // 30 doses
  patch: 30,       // 30 patches
  cream: 100,      // 100g
  ointment: 100,   // 100g
  default: 90      // Default limit
};

// Controlled medication patterns (Schedule II-V indicators)
const CONTROLLED_MEDICATION_PATTERNS = [
  /opioid/i,
  /morphine/i,
  /codeine/i,
  /tramadol/i,
  /oxycodone/i,
  /fentanyl/i,
  /hydrocodone/i,
  /amphetamine/i,
  /methylphenidate/i,
  /diazepam/i,
  /lorazepam/i,
  /alprazolam/i,
  /clonazepam/i,
  /zolpidem/i,
  /temazepam/i
];

const MAX_MEDICATIONS_PER_REQUEST = 10;
const MAX_CONTROLLED_MEDICATIONS_PER_REQUEST = 2;

export function isControlledMedication(medicationName: string): boolean {
  return CONTROLLED_MEDICATION_PATTERNS.some(pattern =>
    pattern.test(medicationName)
  );
}

export function validateQuantities(medications: MedicationRequestItem[]): void {
  if (medications.length === 0) {
    throw new Error('At least one medication is required');
  }

  if (medications.length > MAX_MEDICATIONS_PER_REQUEST) {
    throw new Error(`Maximum ${MAX_MEDICATIONS_PER_REQUEST} medications per request`);
  }

  const controlledCount = medications.filter(m =>
    isControlledMedication(m.medication_name)
  ).length;

  if (controlledCount > MAX_CONTROLLED_MEDICATIONS_PER_REQUEST) {
    throw new Error(
      `Maximum ${MAX_CONTROLLED_MEDICATIONS_PER_REQUEST} controlled medications per request. ` +
      'Please submit controlled medications in a separate request.'
    );
  }

  medications.forEach(med => {
    const limit = QUANTITY_LIMITS[med.form?.toLowerCase() || 'default'] || QUANTITY_LIMITS.default;

    if (med.quantity <= 0) {
      throw new Error(`Invalid quantity for ${med.medication_name}`);
    }

    if (med.quantity > limit) {
      throw new Error(
        `Quantity for ${med.medication_name} exceeds maximum limit of ${limit} ${med.form || 'units'}`
      );
    }

    // Stricter limits for controlled medications
    if (isControlledMedication(med.medication_name) && med.quantity > 30) {
      throw new Error(
        `Controlled medication ${med.medication_name} limited to 30-day supply (max 30 units)`
      );
    }
  });
}
```

### Success Criteria

#### Automated Verification:
- [x] TypeScript compilation passes: `bun run typecheck`
- [x] No linting errors: `bun run lint`
- [x] Interface changes don't break existing prescription viewing functionality
- [x] API service functions are properly typed and exported

#### Manual Verification:
- [ ] Backend API accepts new request format with multiple medications
- [ ] Validation functions correctly identify controlled medications
- [ ] Quantity limits are enforced appropriately
- [ ] Request history endpoint returns properly formatted data

**Implementation Note**: After completing this phase and all automated verification passes, test the API endpoints manually using curl or Postman to ensure backend is accepting the new format before proceeding to Phase 2.

---

## Phase 2: Core Component Structure & Step 1

### Overview
Implement the main wizard component structure and Step 1 (medication selection), including loading current prescriptions, visual selection UI, and custom medication request forms.

### Changes Required

#### 2.1 Replace Placeholder with Wizard Structure

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Replace entire file content** (currently lines 1-47):

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  Pill,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import {
  fetchPatientPrescriptions,
  requestNewPrescription,
  isControlledMedication,
  validateQuantities,
  ApiMedication,
  MedicationRequestItem,
  PrescriptionRequest
} from '../../features/health/prescriptionsService';

interface PrescriptionRequestFormData {
  // Step 1: Medication Selection
  selectedMedications: SelectedMedication[];
  customMedications: CustomMedicationRequest[];

  // Step 2: Details
  requestType: 'repeat' | 'new' | 'dosage_change';
  urgency: 'routine' | 'urgent';
  additionalNotes: string;

  // Step 3: Review
  confirmationChecked: boolean;
}

interface SelectedMedication {
  prescriptionId: string;
  medicationName: string;
  strength: string;
  form: string;
  dosage: string;
  quantity: number;
  isControlled: boolean;
}

interface CustomMedicationRequest {
  medicationName: string;
  strength: string;
  form: string;
  quantity: number;
  reason: string;
  additionalInfo: string;
}

const RequestPrescriptionPage: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PrescriptionRequestFormData>({
    selectedMedications: [],
    customMedications: [],
    requestType: 'repeat',
    urgency: 'routine',
    additionalNotes: '',
    confirmationChecked: false
  });

  const [currentPrescriptions, setCurrentPrescriptions] = useState<ApiMedication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load current prescriptions on mount
  useEffect(() => {
    loadCurrentPrescriptions();
  }, []);

  const loadCurrentPrescriptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetchPatientPrescriptions();
      // Filter to only show active prescriptions that can be refilled
      const refillable = response.medications.filter(
        med => med.status === 'active' || med.status === 'dispensed'
      );
      setCurrentPrescriptions(refillable);
    } catch (err: any) {
      setError('Failed to load your prescriptions. Please try again.');
      console.error('Error loading prescriptions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step navigation
  const goToNextStep = () => {
    setValidationError(null);
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    setValidationError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const validateCurrentStep = (): boolean => {
    try {
      switch (currentStep) {
        case 1:
          return validateStep1();
        case 2:
          return validateStep2();
        case 3:
          return validateStep3();
        default:
          return false;
      }
    } catch (err: any) {
      setValidationError(err.message);
      return false;
    }
  };

  const validateStep1 = (): boolean => {
    const hasSelectedMedications = formData.selectedMedications.length > 0;
    const hasCustomMedications = formData.customMedications.length > 0;

    if (!hasSelectedMedications && !hasCustomMedications) {
      setValidationError('Please select at least one medication or add a new medication request');
      return false;
    }

    // Validate custom medications
    const invalidCustomMed = formData.customMedications.find(
      med => !med.medicationName.trim() ||
             !med.reason.trim() ||
             !med.form.trim() ||
             med.quantity <= 0
    );

    if (invalidCustomMed) {
      setValidationError('Please fill in all required fields for custom medication requests');
      return false;
    }

    // Validate quantities using the service function
    const allMedications: MedicationRequestItem[] = [
      ...formData.selectedMedications.map(m => ({
        medication_name: m.medicationName,
        strength: m.strength,
        form: m.form,
        quantity: m.quantity,
        dosage: m.dosage,
        is_repeat: true
      })),
      ...formData.customMedications.map(m => ({
        medication_name: m.medicationName,
        strength: m.strength,
        form: m.form,
        quantity: m.quantity,
        is_repeat: false,
        reason: m.reason
      }))
    ];

    validateQuantities(allMedications);

    return true;
  };

  const validateStep2 = (): boolean => {
    // Basic validation - all fields are pre-selected or optional
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.confirmationChecked) {
      setValidationError('Please confirm that the information is accurate');
      return false;
    }
    return true;
  };

  // Medication selection handlers
  const handleMedicationToggle = (prescription: ApiMedication) => {
    const exists = formData.selectedMedications.find(
      m => m.prescriptionId === prescription.id
    );

    if (exists) {
      setFormData(prev => ({
        ...prev,
        selectedMedications: prev.selectedMedications.filter(
          m => m.prescriptionId !== prescription.id
        )
      }));
    } else {
      const newMedication: SelectedMedication = {
        prescriptionId: prescription.id,
        medicationName: prescription.medication_name,
        strength: prescription.strength,
        form: prescription.form,
        dosage: prescription.dosage,
        quantity: 30, // Default quantity
        isControlled: isControlledMedication(prescription.medication_name)
      };
      setFormData(prev => ({
        ...prev,
        selectedMedications: [...prev.selectedMedications, newMedication]
      }));
    }
  };

  const handleQuantityChange = (prescriptionId: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      selectedMedications: prev.selectedMedications.map(m =>
        m.prescriptionId === prescriptionId ? { ...m, quantity } : m
      )
    }));
  };

  const handleAddCustomMedication = () => {
    const newMedication: CustomMedicationRequest = {
      medicationName: '',
      strength: '',
      form: 'tablet',
      quantity: 30,
      reason: '',
      additionalInfo: ''
    };
    setFormData(prev => ({
      ...prev,
      customMedications: [...prev.customMedications, newMedication]
    }));
  };

  const handleRemoveCustomMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customMedications: prev.customMedications.filter((_, i) => i !== index)
    }));
  };

  const handleCustomMedicationChange = (
    index: number,
    field: keyof CustomMedicationRequest,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      customMedications: prev.customMedications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  // Form submission
  const handleSubmit = async () => {
    setValidationError(null);

    if (!formData.confirmationChecked) {
      setValidationError('Please confirm that the information is accurate');
      return;
    }

    try {
      setIsSubmitting(true);

      // Build request payload
      const medications: MedicationRequestItem[] = [
        ...formData.selectedMedications.map(m => ({
          medication_id: m.prescriptionId,
          medication_name: m.medicationName,
          strength: m.strength,
          form: m.form,
          quantity: m.quantity,
          dosage: m.dosage,
          is_repeat: true
        })),
        ...formData.customMedications.map(m => ({
          medication_name: m.medicationName,
          strength: m.strength,
          form: m.form,
          quantity: m.quantity,
          is_repeat: false,
          reason: m.reason
        }))
      ];

      const requestPayload: PrescriptionRequest = {
        medications,
        request_type: formData.requestType,
        urgency: formData.urgency,
        additional_notes: formData.additionalNotes
      };

      await requestNewPrescription(requestPayload);
      setShowSuccessModal(true);

    } catch (err: any) {
      setValidationError(err.message || 'Failed to submit prescription request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <AccountHealthLayout title="Request Prescription">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading your prescriptions...</span>
        </div>
      </AccountHealthLayout>
    );
  }

  // Render error state
  if (error) {
    return (
      <AccountHealthLayout title="Request Prescription">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <p className="text-red-800 font-medium mb-4">{error}</p>
          <button
            onClick={loadCurrentPrescriptions}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </AccountHealthLayout>
    );
  }

  return (
    <AccountHealthLayout title="Request Prescription">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Validation Error Display */}
        {validationError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Validation Error</p>
              <p className="text-red-700 text-sm mt-1">{validationError}</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {currentStep === 1 && (
            <Step1MedicationSelection
              formData={formData}
              currentPrescriptions={currentPrescriptions}
              onMedicationToggle={handleMedicationToggle}
              onQuantityChange={handleQuantityChange}
              onAddCustomMedication={handleAddCustomMedication}
              onRemoveCustomMedication={handleRemoveCustomMedication}
              onCustomMedicationChange={handleCustomMedicationChange}
            />
          )}
          {currentStep === 2 && (
            <Step2Details formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 3 && (
            <Step3Review formData={formData} setFormData={setFormData} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          {currentStep < 3 ? (
            <button
              onClick={goToNextStep}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <CheckCircle2 className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          onViewPrescriptions={() => navigate('/account/prescriptions')}
          onGoToDashboard={() => navigate('/account')}
        />
      )}
    </AccountHealthLayout>
  );
};

// Progress Indicator Component
const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Select Medications' },
    { number: 2, label: 'Add Details' },
    { number: 3, label: 'Review & Submit' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step.number <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-sm mt-2 text-center ${
                  step.number <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 ${
                  step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Step 1: Medication Selection Component
interface Step1Props {
  formData: PrescriptionRequestFormData;
  currentPrescriptions: ApiMedication[];
  onMedicationToggle: (prescription: ApiMedication) => void;
  onQuantityChange: (prescriptionId: string, quantity: number) => void;
  onAddCustomMedication: () => void;
  onRemoveCustomMedication: (index: number) => void;
  onCustomMedicationChange: (
    index: number,
    field: keyof CustomMedicationRequest,
    value: string | number
  ) => void;
}

const Step1MedicationSelection: React.FC<Step1Props> = ({
  formData,
  currentPrescriptions,
  onMedicationToggle,
  onQuantityChange,
  onAddCustomMedication,
  onRemoveCustomMedication,
  onCustomMedicationChange
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Medications</h2>

      {/* Current Prescriptions Section */}
      {currentPrescriptions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Current Prescriptions
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Select medications you want to refill. You can adjust quantities before submitting.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {currentPrescriptions.map(prescription => {
              const isSelected = formData.selectedMedications.some(
                m => m.prescriptionId === prescription.id
              );
              const selectedMed = formData.selectedMedications.find(
                m => m.prescriptionId === prescription.id
              );
              const isControlled = isControlledMedication(prescription.medication_name);

              return (
                <div
                  key={prescription.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onMedicationToggle(prescription)}
                      className="mt-1 mr-3 w-5 h-5 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {prescription.medication_name}
                          </p>
                          {prescription.strength && (
                            <p className="text-sm text-gray-600 mt-1">
                              Strength: {prescription.strength}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            Form: {prescription.form} • Dosage: {prescription.dosage}
                          </p>
                          {prescription.updated_at && (
                            <p className="text-xs text-gray-500 mt-1">
                              Last dispensed: {new Date(prescription.updated_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 ml-3" />
                        )}
                      </div>

                      {/* Controlled medication warning */}
                      {isControlled && (
                        <div className="mt-3 bg-yellow-50 border border-yellow-300 rounded-md p-3 flex items-start">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-yellow-800">Controlled Medication</p>
                            <p className="text-yellow-700 mt-1">
                              Limited to 30-day supply. Additional documentation may be required.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Quantity selector */}
                      {isSelected && selectedMed && (
                        <div className="mt-4 flex items-center">
                          <label className="text-sm font-medium text-gray-700 mr-3">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={isControlled ? 30 : 90}
                            value={selectedMed.quantity}
                            onChange={(e) =>
                              onQuantityChange(prescription.id, parseInt(e.target.value) || 1)
                            }
                            className="w-24 border border-gray-300 rounded-md px-3 py-2 text-center"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {prescription.form}(s)
                          </span>
                          {isControlled && (
                            <span className="ml-2 text-xs text-yellow-600">
                              (Max: 30)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state if no current prescriptions */}
      {currentPrescriptions.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center mb-8">
          <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Current Prescriptions</h3>
          <p className="text-gray-600 mb-4">
            You don't have any active prescriptions to refill. You can request a new medication below.
          </p>
        </div>
      )}

      {/* Custom Medication Request Section */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Request New Medication</h3>
        <p className="text-sm text-gray-600 mb-4">
          Need a medication that's not listed above? Add it here with details about why you need it.
        </p>

        <button
          onClick={onAddCustomMedication}
          className="flex items-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 hover:text-gray-700 transition-colors w-full justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Medication Request
        </button>

        {/* Custom medication forms */}
        {formData.customMedications.map((med, index) => {
          const isControlled = isControlledMedication(med.medicationName);

          return (
            <div key={index} className="mt-4 border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">
                  New Medication Request #{index + 1}
                </h4>
                <button
                  onClick={() => onRemoveCustomMedication(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove this medication"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Controlled medication warning for custom meds */}
              {isControlled && med.medicationName && (
                <div className="mb-4 bg-yellow-50 border border-yellow-300 rounded-md p-3 flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Controlled Medication Detected</p>
                    <p className="text-yellow-700 mt-1">
                      This appears to be a controlled substance. Additional verification and
                      documentation will be required. Maximum 30-day supply allowed.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medication Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={med.medicationName}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'medicationName', e.target.value)
                    }
                    placeholder="e.g., Amoxicillin"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Strength
                  </label>
                  <input
                    type="text"
                    value={med.strength}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'strength', e.target.value)
                    }
                    placeholder="e.g., 500mg"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={med.form}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'form', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="tablet">Tablet</option>
                    <option value="capsule">Capsule</option>
                    <option value="liquid">Liquid</option>
                    <option value="inhaler">Inhaler</option>
                    <option value="injection">Injection</option>
                    <option value="patch">Patch</option>
                    <option value="cream">Cream</option>
                    <option value="ointment">Ointment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={isControlled ? 30 : 90}
                    value={med.quantity}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'quantity', parseInt(e.target.value) || 1)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {isControlled && (
                    <p className="text-xs text-yellow-600 mt-1">Max: 30 (controlled substance)</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Request <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={med.reason}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'reason', e.target.value)
                    }
                    rows={3}
                    placeholder="Please explain why you need this medication..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Be specific about your symptoms and why this medication is needed
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    value={med.additionalInfo}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'additionalInfo', e.target.value)
                    }
                    rows={2}
                    placeholder="Any other relevant information..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary info */}
      {(formData.selectedMedications.length > 0 || formData.customMedications.length > 0) && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>
              {formData.selectedMedications.length + formData.customMedications.length}
            </strong>{' '}
            medication(s) selected
            {formData.selectedMedications.some(m => m.isControlled) ||
            formData.customMedications.some(m => isControlledMedication(m.medicationName)) ? (
              <span className="ml-2 text-yellow-700 font-medium">
                • Contains controlled medication(s)
              </span>
            ) : null}
          </p>
        </div>
      )}
    </div>
  );
};

// Placeholder components for Step 2 and Step 3 (will be implemented in next phases)
const Step2Details: React.FC<any> = () => (
  <div>Step 2 - Details (Coming in Phase 3)</div>
);

const Step3Review: React.FC<any> = () => (
  <div>Step 3 - Review (Coming in Phase 4)</div>
);

const SuccessModal: React.FC<any> = () => (
  <div>Success Modal (Coming in Phase 5)</div>
);

export default RequestPrescriptionPage;
```

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compilation passes: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Component renders without errors
- [ ] Prescription data loads on page mount

#### Manual Verification:
- [ ] Page displays current prescriptions in selectable cards
- [ ] Checkbox selection works smoothly with visual feedback
- [ ] Controlled medication warnings appear for appropriate medications
- [ ] Quantity adjustments work correctly with proper limits (30 for controlled, 90 for others)
- [ ] "Add New Medication Request" button creates new form
- [ ] Custom medication forms have all required fields
- [ ] Remove button deletes custom medication forms
- [ ] Empty state displays when no prescriptions available
- [ ] Step 1 validation prevents proceeding without selections
- [ ] Loading state displays while fetching prescriptions
- [ ] Error state displays and allows retry on fetch failure

**Implementation Note**: After completing this phase, test thoroughly with different scenarios: no prescriptions, only controlled medications, mix of controlled and regular, and various quantity combinations. Verify all validation messages are clear and actionable before proceeding to Phase 3.

---

## Phase 3: Step 2 - Request Details & Pharmacy Selection

### Overview
Implement Step 2 of the wizard, allowing users to specify request type, urgency, add notes, and confirm or select their nominated pharmacy.

### Changes Required

#### 3.1 Implement Step 2 Component

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Replace placeholder `Step2Details` component** (find and replace the placeholder):

```typescript
interface Step2Props {
  formData: PrescriptionRequestFormData;
  setFormData: React.Dispatch<React.SetStateAction<PrescriptionRequestFormData>>;
}

const Step2Details: React.FC<Step2Props> = ({ formData, setFormData }) => {
  const [currentNomination, setCurrentNomination] = useState<any>(null);
  const [showPharmacySearch, setShowPharmacySearch] = useState(false);
  const [isLoadingPharmacy, setIsLoadingPharmacy] = useState(true);

  // Load nominated pharmacy
  useEffect(() => {
    loadNominatedPharmacy();
  }, []);

  const loadNominatedPharmacy = async () => {
    try {
      setIsLoadingPharmacy(true);
      const response = await getCurrentNomination();
      if (response.nomination) {
        setCurrentNomination(response.nomination);
      }
    } catch (err) {
      console.error('Error loading nominated pharmacy:', err);
    } finally {
      setIsLoadingPharmacy(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Details</h2>

      {/* Request Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Request Type <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Help us understand the nature of your request
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: 'repeat',
              label: 'Repeat Prescription',
              description: 'Refill existing medication',
              icon: '🔄'
            },
            {
              value: 'new',
              label: 'New Medication',
              description: 'Request new prescription',
              icon: '✨'
            },
            {
              value: 'dosage_change',
              label: 'Dosage Change',
              description: 'Adjust current dosage',
              icon: '⚖️'
            }
          ].map(option => (
            <label
              key={option.value}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.requestType === option.value
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="requestType"
                value={option.value}
                checked={formData.requestType === option.value}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    requestType: e.target.value as any
                  }))
                }
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-3xl mb-2">{option.icon}</div>
                <p className="font-semibold text-gray-900">{option.label}</p>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
              {formData.requestType === option.value && (
                <div className="mt-2 flex justify-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Urgency */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Urgency <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          When do you need this prescription?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              value: 'routine',
              label: 'Routine',
              description: 'Standard processing (7-10 days)',
              icon: '📅',
              color: 'blue'
            },
            {
              value: 'urgent',
              label: 'Urgent',
              description: 'Priority processing (1-3 days)',
              icon: '🚨',
              color: 'red'
            }
          ].map(option => (
            <label
              key={option.value}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.urgency === option.value
                  ? `border-${option.color}-500 bg-${option.color}-50 ring-2 ring-${option.color}-200`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={option.value}
                checked={formData.urgency === option.value}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    urgency: e.target.value as any
                  }))
                }
                className="sr-only"
              />
              <div className="flex items-center">
                <div className="text-3xl mr-4">{option.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                {formData.urgency === option.value && (
                  <CheckCircle2 className={`w-6 h-6 text-${option.color}-600 flex-shrink-0`} />
                )}
              </div>
            </label>
          ))}
        </div>

        {/* Urgent request note */}
        {formData.urgency === 'urgent' && (
          <div className="mt-3 bg-orange-50 border border-orange-200 rounded-md p-3 flex items-start">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-orange-800">Urgent Request Note</p>
              <p className="text-orange-700 mt-1">
                Urgent requests are reviewed within 1-3 business days. Please ensure you provide
                detailed information in the notes section below to help expedite your request.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Information
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Provide any relevant information to help your doctor review your request
        </p>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) =>
            setFormData(prev => ({
              ...prev,
              additionalNotes: e.target.value
            }))
          }
          rows={5}
          placeholder="Example: I've been taking this medication for 6 months and it's been effective. I'm running low and need a refill..."
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.additionalNotes.length} / 500 characters
        </p>
      </div>

      {/* Nominated Pharmacy */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Nominated Pharmacy</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your prescription will be sent to this pharmacy when approved
        </p>

        {isLoadingPharmacy ? (
          <div className="border border-gray-200 rounded-lg p-6 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-3" />
            <span className="text-gray-600">Loading pharmacy information...</span>
          </div>
        ) : currentNomination ? (
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                  <p className="font-semibold text-gray-900">
                    {currentNomination.pharmacy.name}
                  </p>
                </div>
                <p className="text-sm text-gray-700 ml-7">
                  {currentNomination.pharmacy.address_line_1}
                  {currentNomination.pharmacy.address_line_2 && `, ${currentNomination.pharmacy.address_line_2}`}
                </p>
                <p className="text-sm text-gray-700 ml-7">
                  {currentNomination.pharmacy.city}, {currentNomination.pharmacy.postcode}
                </p>
                <p className="text-sm text-gray-600 ml-7 mt-1">
                  {currentNomination.pharmacy.phone}
                </p>
                {currentNomination.pharmacy.electronic_prescriptions_enabled && (
                  <div className="ml-7 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Electronic prescriptions enabled
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowPharmacySearch(true)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Change Pharmacy
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-700 font-medium mb-2">No Pharmacy Nominated</p>
              <p className="text-sm text-gray-600 mb-4">
                You need to nominate a pharmacy to receive your prescription
              </p>
              <button
                onClick={() => setShowPharmacySearch(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Select Pharmacy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pharmacy Search Modal (will be implemented with existing patterns) */}
      {showPharmacySearch && (
        <PharmacySearchModal
          onClose={() => setShowPharmacySearch(false)}
          onSelect={(pharmacy) => {
            setCurrentNomination({ pharmacy });
            setShowPharmacySearch(false);
          }}
        />
      )}
    </div>
  );
};

// Pharmacy Search Modal Placeholder (reuse from NominatedPharmacyPage)
const PharmacySearchModal: React.FC<any> = ({ onClose, onSelect }) => {
  // This will use the existing pharmacy search pattern from NominatedPharmacyPage.tsx
  // Implementation will reuse that code
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h3 className="text-xl font-bold mb-4">Select Pharmacy</h3>
        <p className="text-gray-600 mb-4">
          Search and select your preferred pharmacy
        </p>
        {/* Reuse pharmacy search implementation from NominatedPharmacyPage.tsx */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};
```

#### 3.2 Add Missing Import

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Add to imports at top of file**:
```typescript
import { getCurrentNomination } from '../../services/pharmacyService';
```

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compilation passes: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] All imports resolve correctly

#### Manual Verification:
- [ ] Request type radio buttons work with visual feedback
- [ ] Urgency selection works correctly
- [ ] Urgent request shows orange warning banner
- [ ] Additional notes textarea accepts input up to 500 characters
- [ ] Character counter updates as user types
- [ ] Nominated pharmacy displays correctly when one exists
- [ ] "No pharmacy" state displays when none nominated
- [ ] "Change Pharmacy" button opens search modal
- [ ] "Select Pharmacy" button opens search modal for new nomination
- [ ] Pharmacy details display completely (name, address, phone, EPS badge)
- [ ] Step navigation works: can go back to Step 1, forward to Step 3

**Implementation Note**: The pharmacy search modal is a placeholder in this phase. It will reuse the existing implementation from `NominatedPharmacyPage.tsx`. After testing Step 2 thoroughly, proceed to Phase 4.

---

## Phase 4: Step 3 - Review & Submit

### Overview
Implement the final review screen where users can see all selected medications, request details, and pharmacy information before submitting. Include confirmation checkbox and submission logic.

### Changes Required

#### 4.1 Implement Step 3 Review Component

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Replace placeholder `Step3Review` component**:

```typescript
interface Step3Props {
  formData: PrescriptionRequestFormData;
  setFormData: React.Dispatch<React.SetStateAction<PrescriptionRequestFormData>>;
}

const Step3Review: React.FC<Step3Props> = ({ formData, setFormData }) => {
  const [currentNomination, setCurrentNomination] = useState<any>(null);
  const [isLoadingPharmacy, setIsLoadingPharmacy] = useState(true);

  useEffect(() => {
    loadNominatedPharmacy();
  }, []);

  const loadNominatedPharmacy = async () => {
    try {
      setIsLoadingPharmacy(true);
      const response = await getCurrentNomination();
      if (response.nomination) {
        setCurrentNomination(response.nomination);
      }
    } catch (err) {
      console.error('Error loading pharmacy:', err);
    } finally {
      setIsLoadingPharmacy(false);
    }
  };

  const hasControlledMedications =
    formData.selectedMedications.some(m => m.isControlled) ||
    formData.customMedications.some(m => isControlledMedication(m.medicationName));

  const totalMedications =
    formData.selectedMedications.length + formData.customMedications.length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Request</h2>
      <p className="text-gray-600 mb-6">
        Please review all details carefully before submitting your prescription request
      </p>

      {/* Summary Banner */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">
              You are requesting {totalMedications} medication(s)
            </p>
            <p className="text-sm text-blue-800 mt-1">
              Your GP will review this request and you'll receive a notification once it's processed.
            </p>
            {hasControlledMedications && (
              <p className="text-sm text-yellow-700 mt-2 font-medium">
                ⚠️ Contains controlled medication(s) - Additional verification may be required
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Selected Medications Section */}
      {formData.selectedMedications.length > 0 && (
        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
            Repeat Prescriptions ({formData.selectedMedications.length})
          </h3>
          <div className="space-y-3">
            {formData.selectedMedications.map(med => (
              <div
                key={med.prescriptionId}
                className={`p-4 rounded-md border ${
                  med.isControlled
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-semibold text-gray-900">{med.medicationName}</p>
                      {med.isControlled && (
                        <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs font-medium rounded">
                          Controlled
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm text-gray-700">
                      <div>
                        <span className="text-gray-600">Strength:</span> {med.strength}
                      </div>
                      <div>
                        <span className="text-gray-600">Form:</span> {med.form}
                      </div>
                      <div>
                        <span className="text-gray-600">Dosage:</span> {med.dosage}
                      </div>
                      <div>
                        <span className="text-gray-600">Quantity:</span>{' '}
                        <span className="font-semibold">{med.quantity}</span> {med.form}(s)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Medication Requests */}
      {formData.customMedications.length > 0 && (
        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Plus className="w-5 h-5 text-blue-600 mr-2" />
            New Medication Requests ({formData.customMedications.length})
          </h3>
          <div className="space-y-4">
            {formData.customMedications.map((med, index) => {
              const isControlled = isControlledMedication(med.medicationName);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-md border ${
                    isControlled
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <p className="font-semibold text-gray-900">{med.medicationName}</p>
                    {isControlled && (
                      <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs font-medium rounded">
                        Controlled
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700">
                    {med.strength && (
                      <div>
                        <span className="text-gray-600">Strength:</span> {med.strength}
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Form:</span> {med.form}
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>{' '}
                      <span className="font-semibold">{med.quantity}</span> {med.form}(s)
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-sm text-gray-600 font-medium">Reason for Request:</p>
                    <p className="text-sm text-gray-700 mt-1">{med.reason}</p>
                    {med.additionalInfo && (
                      <>
                        <p className="text-sm text-gray-600 font-medium mt-2">
                          Additional Information:
                        </p>
                        <p className="text-sm text-gray-700 mt-1">{med.additionalInfo}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Request Details */}
      <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Request Type</p>
            <p className="text-base font-semibold text-gray-900 mt-1 capitalize">
              {formData.requestType.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Urgency</p>
            <p className="text-base font-semibold text-gray-900 mt-1 capitalize flex items-center">
              {formData.urgency}
              {formData.urgency === 'urgent' && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
                  Priority
                </span>
              )}
            </p>
          </div>
        </div>
        {formData.additionalNotes && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Additional Notes</p>
            <p className="text-sm text-gray-800 bg-gray-50 rounded-md p-3">
              {formData.additionalNotes}
            </p>
          </div>
        )}
      </div>

      {/* Nominated Pharmacy */}
      <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Nominated Pharmacy</h3>
        {isLoadingPharmacy ? (
          <div className="flex items-center text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Loading pharmacy information...
          </div>
        ) : currentNomination ? (
          <div className="flex items-start">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Pill className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-900">{currentNomination.pharmacy.name}</p>
              <p className="text-sm text-gray-700 mt-1">
                {currentNomination.pharmacy.address_line_1}
                {currentNomination.pharmacy.address_line_2 && `, ${currentNomination.pharmacy.address_line_2}`}
              </p>
              <p className="text-sm text-gray-700">
                {currentNomination.pharmacy.city}, {currentNomination.pharmacy.postcode}
              </p>
              <p className="text-sm text-gray-600 mt-1">{currentNomination.pharmacy.phone}</p>
              {currentNomination.pharmacy.electronic_prescriptions_enabled && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ✓ Electronic prescriptions enabled
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4 flex items-start">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-orange-800">No Pharmacy Nominated</p>
              <p className="text-orange-700 mt-1">
                Please go back to Step 2 and select a pharmacy to continue.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Important Information */}
      <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-purple-900 mb-2">
          ℹ️ What happens after you submit?
        </h4>
        <ul className="text-sm text-purple-800 space-y-1 ml-5 list-disc">
          <li>Your GP will review your prescription request</li>
          <li>
            {formData.urgency === 'urgent'
              ? 'Urgent requests are typically reviewed within 1-3 business days'
              : 'Routine requests are typically reviewed within 7-10 business days'}
          </li>
          <li>You'll receive an email notification when your request is approved or requires attention</li>
          <li>Approved prescriptions will be sent electronically to your nominated pharmacy</li>
          <li>You can collect your medication from the pharmacy once it's ready</li>
        </ul>
      </div>

      {/* Controlled Medication Additional Warning */}
      {hasControlledMedications && (
        <div className="mb-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-900">Controlled Medication Notice</p>
            <p className="text-yellow-800 mt-1">
              Your request contains controlled medication(s). Additional verification steps may be
              required, and your GP may contact you for further information. Controlled medications
              are subject to stricter regulations and may take longer to process.
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Checkbox */}
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-5">
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.confirmationChecked}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                confirmationChecked: e.target.checked
              }))
            }
            className="mt-1 mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 flex-1">
            <span className="font-semibold text-gray-900">I confirm that:</span>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li>All information provided is accurate and complete</li>
              <li>I understand my GP will review this request before approval</li>
              <li>I will collect the medication from my nominated pharmacy when ready</li>
              <li>
                I am responsible for checking the medication is correct before use
              </li>
              {hasControlledMedications && (
                <li className="font-medium text-yellow-800">
                  I understand additional verification may be required for controlled medications
                </li>
              )}
            </ul>
          </span>
        </label>
      </div>

      {!formData.confirmationChecked && (
        <p className="mt-3 text-sm text-gray-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          Please check the confirmation box to submit your request
        </p>
      )}
    </div>
  );
};
```

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compilation passes: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] All state updates work correctly

#### Manual Verification:
- [ ] All selected repeat prescriptions display correctly with details
- [ ] All custom medication requests display with reasons
- [ ] Controlled medication badges appear appropriately
- [ ] Request type and urgency display correctly
- [ ] Additional notes display when provided
- [ ] Pharmacy information loads and displays completely
- [ ] "No pharmacy" warning shows when no pharmacy nominated
- [ ] Confirmation checkbox can be checked/unchecked
- [ ] All warning banners (controlled meds, urgency) display appropriately
- [ ] "What happens next" information is clear and accurate
- [ ] Review screen is visually organized and easy to read
- [ ] Can navigate back to previous steps and data persists
- [ ] Submit button activates only when confirmation is checked

**Implementation Note**: After testing the review screen thoroughly with various combinations (controlled meds, urgent requests, with/without notes, with/without pharmacy), proceed to Phase 5 for success confirmation and actual submission.

---

## Phase 5: Success Confirmation & Request History

### Overview
Implement the success modal after submission and add request history viewing capability to the existing Prescriptions page.

### Changes Required

#### 5.1 Implement Success Modal

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Replace placeholder `SuccessModal` component**:

```typescript
interface SuccessModalProps {
  onViewPrescriptions: () => void;
  onGoToDashboard: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  onViewPrescriptions,
  onGoToDashboard
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fadeIn">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Your prescription request has been submitted successfully to your GP for review.
          </p>

          {/* What's Next Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              What happens next?
            </p>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Your GP will review your request within the specified timeframe</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>You'll receive an email notification when it's approved or needs attention</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Approved prescriptions will be sent to your nominated pharmacy electronically</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Collect your medication from the pharmacy when it's ready</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onViewPrescriptions}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
            >
              View Prescriptions
            </button>
            <button
              onClick={onGoToDashboard}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Additional Help */}
          <p className="mt-4 text-xs text-gray-500">
            You can track your request status in the Prescriptions section
          </p>
        </div>
      </div>
    </div>
  );
};
```

#### 5.2 Add Request History Tab to Prescriptions Page

**File**: `src/features/health/Prescriptions.tsx`

**Add near the top of component** (after existing state declarations):

```typescript
// Add new state for request history
const [requestHistory, setRequestHistory] = useState<PrescriptionRequestHistoryItem[]>([]);
const [isLoadingRequests, setIsLoadingRequests] = useState(false);
const [requestFilter, setRequestFilter] = useState<'ALL' | 'REQUESTED' | 'APPROVED' | 'REJECTED'>('ALL');
const [activeTab, setActiveTab] = useState<'active' | 'history' | 'requests'>('active');
```

**Add function to load request history**:

```typescript
const loadRequestHistory = async () => {
  try {
    setIsLoadingRequests(true);
    const response = await fetchPrescriptionRequests(requestFilter);
    setRequestHistory(response.requests);
  } catch (err: any) {
    console.error('Error loading request history:', err);
    // Don't show error to user - just log it
  } finally {
    setIsLoadingRequests(false);
  }
};

// Load request history when tab or filter changes
useEffect(() => {
  if (activeTab === 'requests') {
    loadRequestHistory();
  }
}, [activeTab, requestFilter]);
```

**Add tab navigation** (before existing medication tables):

```typescript
{/* Tab Navigation */}
<div className="mb-6 border-b border-gray-200">
  <nav className="-mb-px flex space-x-8">
    <button
      onClick={() => setActiveTab('active')}
      className={`py-4 px-1 border-b-2 font-medium text-sm ${
        activeTab === 'active'
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      Active Prescriptions
    </button>
    <button
      onClick={() => setActiveTab('history')}
      className={`py-4 px-1 border-b-2 font-medium text-sm ${
        activeTab === 'history'
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      History
    </button>
    <button
      onClick={() => setActiveTab('requests')}
      className={`py-4 px-1 border-b-2 font-medium text-sm ${
        activeTab === 'requests'
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      Requests
      {requestHistory.filter(r => r.status === 'REQUESTED').length > 0 && (
        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          {requestHistory.filter(r => r.status === 'REQUESTED').length}
        </span>
      )}
    </button>
  </nav>
</div>
```

**Add request history view** (after tab navigation):

```typescript
{/* Request History Tab */}
{activeTab === 'requests' && (
  <div>
    {/* Filter Buttons */}
    <div className="mb-4 flex flex-wrap gap-2">
      {(['ALL', 'REQUESTED', 'APPROVED', 'REJECTED'] as const).map(filter => (
        <button
          key={filter}
          onClick={() => setRequestFilter(filter)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            requestFilter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.charAt(0) + filter.slice(1).toLowerCase()}
          {filter !== 'ALL' && (
            <span className="ml-1">
              ({requestHistory.filter(r => r.status === filter).length})
            </span>
          )}
        </button>
      ))}
    </div>

    {/* Loading State */}
    {isLoadingRequests && (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Loading requests...</span>
      </div>
    )}

    {/* Request History List */}
    {!isLoadingRequests && requestHistory.length === 0 && (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Found</h3>
        <p className="text-gray-600 mb-4">
          You haven't made any prescription requests yet.
        </p>
        <button
          onClick={() => navigate('/account/request-prescription')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Request Prescription
        </button>
      </div>
    )}

    {!isLoadingRequests && requestHistory.length > 0 && (
      <div className="space-y-4">
        {requestHistory.map(request => (
          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Request Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Request #{request.request_reference}
                  </h3>
                  <span
                    className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'REQUESTED'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'REJECTED'
                        ? 'bg-red-100 text-red-800'
                        : request.status === 'DISPENSED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Requested: {new Date(request.request_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                {request.approval_date && (
                  <p className="text-sm text-gray-600">
                    Approved: {new Date(request.approval_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
              {request.urgency === 'urgent' && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                  URGENT
                </span>
              )}
            </div>

            {/* Medications */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Medications:</p>
              <div className="space-y-2">
                {request.medications.map((med, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded-md p-3">
                    <Pill className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{med.medication_name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {med.strength && `${med.strength} • `}
                        {med.form} • Qty: {med.quantity}
                        {med.is_repeat && ' • Repeat'}
                      </p>
                      {med.reason && (
                        <p className="text-xs text-gray-600 mt-1">Reason: {med.reason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rejection Reason */}
            {request.status === 'REJECTED' && request.rejection_reason && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm font-medium text-red-900">Rejection Reason:</p>
                <p className="text-sm text-red-800 mt-1">{request.rejection_reason}</p>
              </div>
            )}

            {/* Pharmacy */}
            {request.pharmacy && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Pharmacy:</span> {request.pharmacy.name}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
)}
```

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compilation passes: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Modal renders without errors
- [ ] Tab navigation works without errors

#### Manual Verification:
- [ ] Success modal displays after form submission
- [ ] Success modal has clear success icon and message
- [ ] "What happens next" information is helpful
- [ ] Both action buttons work correctly (View Prescriptions, Dashboard)
- [ ] Request history tab appears in prescriptions page
- [ ] Tab navigation works smoothly
- [ ] Filter buttons work correctly (ALL, REQUESTED, APPROVED, REJECTED)
- [ ] Request cards display all information correctly
- [ ] Status badges have appropriate colors
- [ ] Urgent requests show URGENT badge
- [ ] Medications list displays correctly for each request
- [ ] Rejection reason displays when status is REJECTED
- [ ] Empty state shows when no requests found
- [ ] "Request Prescription" button navigates correctly from empty state
- [ ] Loading state displays while fetching requests

**Implementation Note**: After implementing and testing the success flow and request history, the core functionality is complete. Proceed to Phase 6 for comprehensive error handling.

---

## Phase 6: Error Handling & Edge Cases

### Overview
Implement comprehensive error handling, edge case management, and user-friendly error messages throughout the prescription request flow.

### Changes Required

#### 6.1 Add Error Boundary Component

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Add at the top of file after imports**:

```typescript
// Error Boundary for catching React errors
class PrescriptionRequestErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Prescription Request Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <AccountHealthLayout title="Request Prescription">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Something Went Wrong</h3>
            <p className="text-red-800 mb-4">
              We encountered an error while processing your prescription request.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </AccountHealthLayout>
      );
    }

    return this.props.children;
  }
}
```

**Wrap the main component export**:
```typescript
export default function WrappedRequestPrescriptionPage() {
  return (
    <PrescriptionRequestErrorBoundary>
      <RequestPrescriptionPage />
    </PrescriptionRequestErrorBoundary>
  );
}
```

#### 6.2 Enhanced Error States

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Update error state management** (in main component):

```typescript
interface ErrorState {
  type: 'validation' | 'api' | 'network' | 'unknown';
  message: string;
  details?: string;
  retryable: boolean;
}

// Replace simple error state with enhanced error state
const [error, setError] = useState<ErrorState | null>(null);

// Add error handling helpers
const handleApiError = (err: any, context: string): ErrorState => {
  console.error(`${context} error:`, err);

  if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
    return {
      type: 'network',
      message: 'Network connection error',
      details: 'Please check your internet connection and try again.',
      retryable: true
    };
  }

  if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
    return {
      type: 'api',
      message: 'Authentication error',
      details: 'Your session may have expired. Please log in again.',
      retryable: false
    };
  }

  if (err.message?.includes('403') || err.message?.includes('Forbidden')) {
    return {
      type: 'api',
      message: 'Permission denied',
      details: 'You do not have permission to perform this action.',
      retryable: false
    };
  }

  if (err.message?.includes('500') || err.message?.includes('502') || err.message?.includes('503')) {
    return {
      type: 'api',
      message: 'Server error',
      details: 'The server encountered an error. Please try again in a few minutes.',
      retryable: true
    };
  }

  return {
    type: 'unknown',
    message: err.message || 'An unexpected error occurred',
    details: 'Please try again. If the problem persists, contact support.',
    retryable: true
  };
};

// Update error display component
const ErrorDisplay: React.FC<{ error: ErrorState; onRetry?: () => void }> = ({ error, onRetry }) => {
  const iconColor =
    error.type === 'network' ? 'text-orange-600' :
    error.type === 'validation' ? 'text-yellow-600' :
    'text-red-600';

  const bgColor =
    error.type === 'network' ? 'bg-orange-50 border-orange-200' :
    error.type === 'validation' ? 'bg-yellow-50 border-yellow-200' :
    'bg-red-50 border-red-200';

  return (
    <div className={`border rounded-lg p-4 ${bgColor}`}>
      <div className="flex items-start">
        <AlertCircle className={`w-5 h-5 ${iconColor} mr-3 flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{error.message}</p>
          {error.details && (
            <p className="text-sm text-gray-700 mt-1">{error.details}</p>
          )}
          {error.retryable && onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```

#### 6.3 Handle Specific Edge Cases

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Add edge case handlers**:

```typescript
// Check for maximum requests per day (example: 3 requests/day)
const checkRequestLimit = async (): Promise<boolean> => {
  try {
    const response = await fetchPrescriptionRequests('REQUESTED');
    const today = new Date().toISOString().split('T')[0];
    const todayRequests = response.requests.filter(r =>
      r.request_date.startsWith(today)
    );

    if (todayRequests.length >= 3) {
      setError({
        type: 'validation',
        message: 'Daily request limit reached',
        details: 'You can submit a maximum of 3 prescription requests per day. Please try again tomorrow.',
        retryable: false
      });
      return false;
    }

    return true;
  } catch (err) {
    // Don't block if we can't check - let backend handle it
    return true;
  }
};

// Check for duplicate requests within 7 days
const checkDuplicateRequest = (medications: MedicationRequestItem[]): boolean => {
  // This would check against recent request history
  // For now, just a placeholder that returns true
  // Backend should also enforce this
  return true;
};

// Update handleSubmit with enhanced error handling
const handleSubmit = async () => {
  setValidationError(null);
  setError(null);

  if (!formData.confirmationChecked) {
    setValidationError('Please confirm that the information is accurate');
    return;
  }

  try {
    setIsSubmitting(true);

    // Check request limits
    const canSubmit = await checkRequestLimit();
    if (!canSubmit) {
      return;
    }

    // Build request payload
    const medications: MedicationRequestItem[] = [
      ...formData.selectedMedications.map(m => ({
        medication_id: m.prescriptionId,
        medication_name: m.medicationName,
        strength: m.strength,
        form: m.form,
        quantity: m.quantity,
        dosage: m.dosage,
        is_repeat: true
      })),
      ...formData.customMedications.map(m => ({
        medication_name: m.medicationName,
        strength: m.strength,
        form: m.form,
        quantity: m.quantity,
        is_repeat: false,
        reason: m.reason
      }))
    ];

    // Check for duplicates
    if (!checkDuplicateRequest(medications)) {
      setError({
        type: 'validation',
        message: 'Duplicate request detected',
        details: 'You have recently requested one or more of these medications. Please wait 7 days before requesting again.',
        retryable: false
      });
      return;
    }

    const requestPayload: PrescriptionRequest = {
      medications,
      request_type: formData.requestType,
      urgency: formData.urgency,
      additional_notes: formData.additionalNotes
    };

    await requestNewPrescription(requestPayload);
    setShowSuccessModal(true);

  } catch (err: any) {
    const errorState = handleApiError(err, 'Prescription request submission');
    setError(errorState);

    // Scroll to top to show error
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } finally {
    setIsSubmitting(false);
  }
};

// Add retry handler
const handleRetrySubmit = () => {
  setError(null);
  handleSubmit();
};
```

#### 6.4 Add Network Status Indicator

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Add network status checker**:

```typescript
const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);

// Add to render (before main content)
{!isOnline && (
  <div className="mb-4 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center">
    <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
    <div className="flex-1">
      <p className="text-sm font-medium text-orange-900">You are currently offline</p>
      <p className="text-sm text-orange-800 mt-1">
        Please check your internet connection. Your progress is saved locally.
      </p>
    </div>
  </div>
)}
```

#### 6.5 Add Session Storage for Form Recovery

**File**: `src/pages/account/RequestPrescriptionPage.tsx`

**Add auto-save functionality**:

```typescript
// Auto-save form data to session storage
useEffect(() => {
  const saveFormData = () => {
    try {
      sessionStorage.setItem('prescriptionRequestDraft', JSON.stringify({
        formData,
        currentStep,
        timestamp: new Date().toISOString()
      }));
    } catch (err) {
      console.error('Error saving form draft:', err);
    }
  };

  // Debounce saves
  const timeoutId = setTimeout(saveFormData, 1000);
  return () => clearTimeout(timeoutId);
}, [formData, currentStep]);

// Restore form data on mount
useEffect(() => {
  try {
    const savedData = sessionStorage.getItem('prescriptionRequestDraft');
    if (savedData) {
      const { formData: savedFormData, currentStep: savedStep, timestamp } = JSON.parse(savedData);

      // Only restore if less than 1 hour old
      const age = Date.now() - new Date(timestamp).getTime();
      if (age < 3600000) { // 1 hour
        const shouldRestore = window.confirm(
          'We found a saved draft of your prescription request. Would you like to restore it?'
        );

        if (shouldRestore) {
          setFormData(savedFormData);
          setCurrentStep(savedStep);
        } else {
          sessionStorage.removeItem('prescriptionRequestDraft');
        }
      } else {
        sessionStorage.removeItem('prescriptionRequestDraft');
      }
    }
  } catch (err) {
    console.error('Error restoring form draft:', err);
  }
}, []);

// Clear draft on successful submission
const handleSubmit = async () => {
  // ... existing code ...

  await requestNewPrescription(requestPayload);

  // Clear saved draft
  sessionStorage.removeItem('prescriptionRequestDraft');

  setShowSuccessModal(true);
};
```

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compilation passes: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Error boundary catches and displays errors
- [ ] Session storage operations don't throw errors

#### Manual Verification:
- [ ] Error boundary catches React errors and shows recovery UI
- [ ] Network errors display with appropriate messaging
- [ ] API errors (401, 403, 500, etc.) show specific messages
- [ ] Validation errors display clearly
- [ ] Offline indicator appears when network disconnects
- [ ] Form data auto-saves during editing
- [ ] Draft restoration prompt appears on page reload
- [ ] Draft expires after 1 hour
- [ ] Daily request limit prevents excessive submissions
- [ ] Error messages include retry button when appropriate
- [ ] Retry functionality works for recoverable errors
- [ ] Non-retryable errors disable retry button
- [ ] Error colors match severity (orange=network, yellow=validation, red=critical)
- [ ] Scrolls to error message when validation fails

**Implementation Note**: Test error handling thoroughly by simulating various error conditions: disconnect network, trigger API errors, submit invalid data, refresh page mid-flow. Ensure all error states provide clear guidance to users.

---

## Phase 7: Testing, Refinement & Documentation

### Overview
Comprehensive testing of all features, edge cases, and user flows. Performance optimization and final documentation.

### Testing Checklist

#### 7.1 Functional Testing

**Step 1 - Medication Selection:**
- [ ] Loads current prescriptions correctly
- [ ] Empty state displays when no prescriptions
- [ ] Checkbox selection/deselection works
- [ ] Quantity adjustment works with proper limits
- [ ] Controlled medication warnings appear
- [ ] Add custom medication creates new form
- [ ] Remove custom medication deletes form
- [ ] Custom medication form validation works
- [ ] Cannot proceed without selecting medications
- [ ] Step 1 validation messages are clear

**Step 2 - Request Details:**
- [ ] Request type selection works
- [ ] Urgency selection works
- [ ] Urgent request shows warning banner
- [ ] Additional notes accepts input
- [ ] Character counter updates correctly
- [ ] Nominated pharmacy loads and displays
- [ ] Change pharmacy button works
- [ ] No pharmacy state displays correctly
- [ ] Can navigate back to Step 1 with data preserved

**Step 3 - Review:**
- [ ] All selected medications display correctly
- [ ] Custom medications display with reasons
- [ ] Controlled medication badges show
- [ ] Request details display accurately
- [ ] Pharmacy information displays completely
- [ ] Confirmation checkbox works
- [ ] Cannot submit without confirmation
- [ ] Can navigate back to previous steps
- [ ] Data persists across navigation

**Submission & Success:**
- [ ] Submit button disabled during submission
- [ ] Loading spinner shows during submission
- [ ] Success modal appears after submission
- [ ] Success modal action buttons work
- [ ] Draft clears after successful submission
- [ ] Redirects work correctly

**Request History:**
- [ ] Request history tab appears
- [ ] Loads request history correctly
- [ ] Filter buttons work
- [ ] Request cards display all info
- [ ] Status badges have correct colors
- [ ] Empty state shows when no requests
- [ ] Navigate to request prescription works

#### 7.2 Error Handling Testing

- [ ] Network disconnection handled gracefully
- [ ] Offline indicator appears/disappears
- [ ] API 401 error shows re-auth message
- [ ] API 403 error shows permission message
- [ ] API 500 error shows server error message
- [ ] Validation errors display clearly
- [ ] Retry button works for recoverable errors
- [ ] Daily limit prevents excessive requests
- [ ] Form draft saves automatically
- [ ] Draft restoration prompt appears
- [ ] Old drafts expire correctly
- [ ] Error boundary catches React errors

#### 7.3 Edge Cases Testing

- [ ] No current prescriptions scenario
- [ ] All controlled medications request
- [ ] Maximum medications (10) per request
- [ ] Maximum controlled meds (2) per request
- [ ] Quantity exceeds maximum limit
- [ ] No nominated pharmacy scenario
- [ ] Urgent request with controlled meds
- [ ] Very long additional notes (500+ chars)
- [ ] Custom medication with same name as existing
- [ ] Multiple rapid submissions (spam protection)
- [ ] Session timeout during form completion
- [ ] Page refresh mid-flow (draft recovery)
- [ ] Browser back button navigation
- [ ] Mobile viewport responsiveness

#### 7.4 Performance Testing

- [ ] Initial page load < 2 seconds
- [ ] Prescription data loads < 1 second
- [ ] Step transitions are smooth (< 100ms)
- [ ] Form inputs respond instantly
- [ ] No lag when typing in text areas
- [ ] No memory leaks on repeated use
- [ ] Images/icons load efficiently
- [ ] No console errors or warnings

#### 7.5 Accessibility Testing

- [ ] All form fields have labels
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators are visible
- [ ] Screen reader announces changes
- [ ] Color contrast meets WCAG AA standards
- [ ] Error messages are announced
- [ ] Success modal is accessible
- [ ] Tab order is logical

#### 7.6 Cross-Browser Testing

- [ ] Works in Chrome (latest)
- [ ] Works in Firefox (latest)
- [ ] Works in Safari (latest)
- [ ] Works in Edge (latest)
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] Mobile responsive design works
- [ ] Touch interactions work on mobile

### 7.7 Documentation

**Create/Update Documentation Files:**

1. **User Guide** (for patients):
   - How to request prescription refills
   - How to request new medications
   - What to expect after submission
   - How to track request status
   - FAQs

2. **Developer Documentation**:
   - API contract documentation
   - Component architecture
   - State management approach
   - Error handling patterns
   - Testing procedures

3. **Update README** (if exists):
   - Add prescription request feature to features list
   - Update setup instructions if needed
   - Add any new environment variables

### 7.8 Performance Optimizations

**If needed, implement:**

```typescript
// Memo expensive components
const MemoizedStep1 = React.memo(Step1MedicationSelection);
const MemoizedStep2 = React.memo(Step2Details);
const MemoizedStep3 = React.memo(Step3Review);

// Debounce search inputs
const debouncedSearch = useMemo(
  () => debounce((query: string) => {
    // Search logic
  }, 300),
  []
);

// Lazy load pharmacy search modal
const PharmacySearchModal = React.lazy(() =>
  import('./PharmacySearchModal')
);
```

### Success Criteria

#### Automated Verification:
- [ ] All tests pass: `bun run test` (if tests exist)
- [ ] Type checking passes: `bun run typecheck`
- [ ] Linting passes: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] Production build size is reasonable (< 500KB for this feature)

#### Manual Verification:
- [ ] All functional test cases pass
- [ ] All error handling scenarios work
- [ ] All edge cases handled correctly
- [ ] Performance is acceptable on slow 3G
- [ ] Accessibility audit passes
- [ ] Cross-browser testing complete
- [ ] User documentation is clear and comprehensive
- [ ] Developer documentation is complete
- [ ] Feature works end-to-end without issues
- [ ] Stakeholder approval obtained

**Implementation Note**: This is the final phase. After completing all testing and obtaining approval, the feature is ready for production deployment. Consider running a beta test with a small group of users before full rollout.

---

## Testing Strategy

### Unit Tests (If Implementing)

**Test validation functions**:
```typescript
describe('Prescription Request Validation', () => {
  it('should validate quantities correctly', () => {
    // Test quantity validation logic
  });

  it('should detect controlled medications', () => {
    // Test controlled medication detection
  });

  it('should enforce maximum medications limit', () => {
    // Test max medications limit
  });
});
```

### Integration Tests

- Test complete user flow from start to finish
- Test API integration with mock backend
- Test error scenarios with failing API calls
- Test pharmacy search integration
- Test form persistence and recovery

### Manual Testing Scenarios

1. **Happy Path**: Regular user requesting 2 repeat prescriptions
2. **Controlled Medication**: User requesting controlled substance with warnings
3. **New Medication**: User with no prescriptions requesting new medication
4. **Urgent Request**: User marking request as urgent
5. **Network Failure**: User loses connection mid-submission
6. **Session Timeout**: User's session expires during form completion
7. **Draft Recovery**: User refreshes page and restores draft
8. **No Pharmacy**: User without nominated pharmacy
9. **Maximum Limit**: User trying to request 11 medications (should fail)

## Performance Considerations

### Optimization Targets

- **Initial Load**: < 2 seconds on 3G
- **Step Transition**: < 100ms
- **API Response**: < 1 second
- **Form Input**: Instant feedback

### Performance Techniques

1. **Code Splitting**: Lazy load pharmacy search modal
2. **Memoization**: Memo expensive components
3. **Debouncing**: Debounce auto-save and search
4. **Optimistic Updates**: Show success before backend confirms
5. **Caching**: Cache pharmacy list in session storage
6. **Compression**: Ensure API responses are gzipped

## Security Considerations

### Data Protection

1. **No Sensitive Data in URLs**: All data in request body
2. **HTTPS Only**: Force HTTPS in production
3. **Cookie Security**: httpOnly, secure, sameSite flags
4. **XSS Prevention**: Sanitize all user input
5. **CSRF Protection**: Use CSRF tokens with all POST requests
6. **Rate Limiting**: Backend enforces request limits
7. **Audit Logging**: All requests logged with user ID

### Controlled Medication Safeguards

1. **Frontend Validation**: Quantity limits enforced
2. **Backend Validation**: Double-check all limits
3. **Additional Verification**: GP review required
4. **Audit Trail**: Controlled med requests specially logged
5. **Warning System**: Clear warnings to users

## Migration Notes

### Database Migrations (Backend)

If backend needs schema updates:
1. Add `request_type` and `urgency` columns to prescriptions table
2. Create prescription_requests table for request history
3. Add indexes on status and request_date for performance

### Data Migration

No data migration needed - this is a new feature.

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Code review completed
- [ ] API contract verified with backend team
- [ ] Environment variables configured
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics events implemented
- [ ] Feature flag created (if using feature flags)

### Deployment Steps

1. Deploy backend API changes first
2. Verify backend endpoints are working
3. Deploy frontend changes
4. Smoke test in production
5. Monitor error logs for 24 hours
6. Gradual rollout (10% → 50% → 100%)

### Post-Deployment

- [ ] Monitor error rates
- [ ] Track usage metrics
- [ ] Gather user feedback
- [ ] Address any issues promptly
- [ ] Document lessons learned

## References

- Original research document: `/Users/new/phbfinal/phbfrontend/thoughts/shared/research/2025-10-31-prescription-request-feature-research.md`
- Backend API documentation: `/Users/new/phbfinal/phbfrontend/docs/prescription-service-backend.md`
- Appointment booking reference: `src/features/health/BookAppointment.tsx`
- Pharmacy nomination reference: `src/pages/account/NominatedPharmacyPage.tsx`
- Prescription viewing: `src/features/health/Prescriptions.tsx`
- API service: `src/features/health/prescriptionsService.ts`

## Estimated Timeline

| Phase | Description | Estimated Time | Dependencies |
|-------|-------------|----------------|--------------|
| 1 | Backend API Enhancement | 4-6 hours | Backend team collaboration |
| 2 | Core Component & Step 1 | 5-7 hours | Phase 1 complete |
| 3 | Step 2 - Details & Pharmacy | 3-4 hours | Phase 2 complete |
| 4 | Step 3 - Review & Submit | 2-3 hours | Phase 3 complete |
| 5 | Success Modal & History | 3-4 hours | Phase 4 complete |
| 6 | Error Handling | 3-4 hours | Phase 5 complete |
| 7 | Testing & Refinement | 6-8 hours | All phases complete |
| **Total** | | **26-36 hours** | **3-5 days** |

**Note**: Timeline assumes full-time dedicated work. With interruptions and other tasks, expect 1-2 weeks calendar time.

---

## Contact & Support

For questions during implementation:
- **Technical Lead**: [Contact info]
- **Backend Team**: [Contact info]
- **Product Owner**: [Contact info]

---

**Plan Created**: October 31, 2025
**Last Updated**: October 31, 2025
**Status**: Ready for Implementation
