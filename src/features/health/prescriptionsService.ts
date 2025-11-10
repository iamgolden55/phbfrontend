import { API_BASE_URL } from '../../utils/config';

// Check if API_BASE_URL ends with a slash to avoid double slashes
const fixApiUrl = (endpoint: string): string => {
  // If API_BASE_URL ends with a slash and endpoint starts with a slash,
  // remove the slash from the endpoint to avoid double slashes
  if (API_BASE_URL.endsWith('/') && endpoint.startsWith('/')) {
    return `${API_BASE_URL}${endpoint.substring(1)}`;
  }
  return `${API_BASE_URL}${endpoint}`;
};

// Pharmacy interface for nominated pharmacy
export interface ApiPharmacy {
  id: number;
  phb_pharmacy_code: string;
  name: string;
  address_line_1: string;
  city: string;
  postcode: string;
  phone: string;
  electronic_prescriptions_enabled: boolean;
}

// Doctor interface for prescriber
export interface ApiDoctor {
  id: number;
  first_name: string;
  last_name: string;
}

// API Interfaces
export interface ApiMedication {
  id: string;
  medication_name: string;
  generic_name?: string;
  strength: string;
  form: string;
  route: string;
  dosage: string;
  frequency: string;
  duration?: string;
  patient_instructions: string;
  indication: string;
  created_at: string;
  updated_at: string;
  prescriber_name: string;
  appointment_id?: string;
  appointment_date?: string;
  status?: string;
  prescription_id?: string;
  doctor_name?: string;
  nominated_pharmacy?: ApiPharmacy | null;
  prescribed_by?: ApiDoctor;
  signed_prescription_data?: {
    payload: {
      type: string;
      id: string;
      nonce: string;
      hpn: string;
      medication: string;
      strength?: string;
      patient: string;
      prescriber: string;
      dosage: string;
      frequency: string;
      pharmacy: any | null;
      issued: string;
      expiry: string;
    };
    signature: string;
  } | null;
  nonce?: string;
  signature?: string;
  dispensed?: boolean;
  dispensed_at?: string | null;
}

export interface ApiPrescriptionsResponse {
  status: string;
  medications: ApiMedication[];
}

// New interfaces for prescription requests
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

export interface PrescriptionDetails {
  id: string;
  prescription_id?: string;
  medication_name: string;
  generic_name?: string;
  strength: string;
  form: string;
  route: string;
  dosage: string;
  frequency: string;
  duration?: string;
  patient_instructions: string;
  indication: string;
  created_at: string;
  prescriber_name: string;
  status?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  date: string;
  prescription_id?: string;
}

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

/**
 * Check if a medication is a controlled substance
 * @param medicationName Name of the medication to check
 * @returns true if medication matches controlled substance patterns
 */
export function isControlledMedication(medicationName: string): boolean {
  return CONTROLLED_MEDICATION_PATTERNS.some(pattern =>
    pattern.test(medicationName)
  );
}

/**
 * Validate medication quantities and enforce limits
 * @param medications Array of medication items to validate
 * @throws Error if validation fails
 */
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

  // Note: Quantity validation removed - quantities are now determined by doctors during review
  // Patients only request medications, doctors specify appropriate quantities
}

/**
 * Fetch all prescriptions for the current patient
 * @returns Promise that resolves to the patient's prescriptions
 */
export async function fetchPatientPrescriptions(): Promise<ApiPrescriptionsResponse> {
  try {
    const response = await fetch(fixApiUrl('/api/prescriptions/'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching prescriptions: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched patient prescriptions:', data);
    return data;
  } catch (error) {
    console.error('Error fetching patient prescriptions:', error);
    throw error;
  }
}

/**
 * Request a new prescription for the current patient
 * @param prescriptionRequest Details of the prescription request
 * @returns Promise that resolves to the created prescription request
 */
export async function requestNewPrescription(
  prescriptionRequest: PrescriptionRequest
): Promise<PrescriptionRequestResponse> {
  try {
    // Validate quantities before sending
    validateQuantities(prescriptionRequest.medications);

    const response = await fetch(fixApiUrl('/api/prescriptions/requests/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(prescriptionRequest),
    });

    if (!response.ok) {
      // If backend endpoint not implemented yet, simulate success for frontend development
      if (response.status === 404 || response.status === 405) {
        console.warn('⚠️ Prescription request endpoint not implemented yet. Simulating success...');
        const mockResponse: PrescriptionRequestResponse = {
          id: `mock-${Date.now()}`,
          request_reference: `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          status: 'REQUESTED',
          request_date: new Date().toISOString(),
          medications: prescriptionRequest.medications,
          message: 'Prescription request submitted successfully (simulated for development)'
        };
        return mockResponse;
      }

      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || errorData.details || `Error requesting prescription: ${response.status}`;
      console.error('❌ Prescription request failed:', errorData);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Created prescription request:', data);
    return data;
  } catch (error) {
    console.error('Error requesting prescription:', error);
    throw error;
  }
}

/**
 * Order a prescription for the current patient
 * @param prescriptionId ID of the prescription to order
 * @returns Promise that resolves to the ordered prescription
 */
export async function orderPrescription(prescriptionId: string) {
  try {
    const response = await fetch(fixApiUrl(`/api/prescriptions/${prescriptionId}/order/`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    
    if (!response.ok) {
      // For 404 errors (common during development), try a fallback solution
      if (response.status === 404) {
        console.log('Order endpoint not found, trying fallback...');
        // First try a generic update endpoint
        try {
          const updateResponse = await fetch(fixApiUrl(`/api/prescriptions/${prescriptionId}/update-status/`), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Send cookies with request
            body: JSON.stringify({ status: 'collected' }),
          });
          
          if (updateResponse.ok) {
            const data = await updateResponse.json();
            console.log('Updated prescription status using fallback endpoint:', data);
            return data;
          }
        } catch (fallbackError) {
          console.log('Fallback endpoint also failed, using local simulation');
        }
        
        // If API endpoints all fail, simulate success (for development)
        console.log('API endpoints not available, simulating successful update');
        return {
          id: prescriptionId,
          status: 'collected',
          message: 'Prescription marked as collected (simulated)',
        };
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ordering prescription: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Ordered prescription:', data);
    return data;
  } catch (error) {
    console.error('Error ordering prescription:', error);
    throw error;
  }
}

/**
 * Fetch details for a specific prescription
 * @param prescriptionId ID of the prescription to fetch details for
 * @returns Promise that resolves to the prescription details
 */
export async function fetchPrescriptionDetails(prescriptionId: string): Promise<PrescriptionDetails> {
  try {
    const response = await fetch(fixApiUrl(`/api/prescriptions/${prescriptionId}/`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching prescription details: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched prescription details:', data);
    return data;
  } catch (error) {
    console.error('Error fetching prescription details:', error);
    throw error;
  }
}

/**
 * Complete a prescription
 * @param prescriptionId ID of the prescription to mark as completed
 * @returns Promise that resolves to the completed prescription
 */
export async function completePrescription(prescriptionId: string) {
  try {
    // Try the complete endpoint
    const response = await fetch(fixApiUrl(`/api/prescriptions/${prescriptionId}/complete/`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });

    if (!response.ok) {
      // For 404 errors (common during development), try a fallback solution
      if (response.status === 404) {
        console.log('Complete endpoint not found, trying fallback...');
        // Simulate successful completion (for development)
        return {
          id: prescriptionId,
          status: 'completed',
          message: 'Prescription marked as completed (simulated)',
        };
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error completing prescription: ${response.status}`);
    }

    const data = await response.json();
    console.log('Completed prescription:', data);
    return data;
  } catch (error) {
    console.error('Error completing prescription:', error);
    throw error;
  }
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

/**
 * Generate notifications based on prescription data
 * @param prescriptions The prescriptions to generate notifications for
 * @returns Array of notifications
 */
export function generateNotifications(prescriptions: ApiMedication[]): Notification[] {
  const notifications: Notification[] = [];
  
  if (!prescriptions || prescriptions.length === 0) {
    return [];
  }
  
  // Process prescriptions to generate relevant notifications
  prescriptions.forEach((prescription) => {
    const today = new Date().toISOString().split('T')[0];
    
    // For newly added/active prescriptions
    if (prescription.status === 'active') {
      notifications.push({
        id: `notification-${prescription.id}-active`,
        type: 'info',
        message: `Your prescription for ${prescription.medication_name} ${prescription.strength || ''} is ready to collect.`,
        date: today,
        prescription_id: prescription.id
      });
    }
    
    // For collected prescriptions
    else if (prescription.status === 'dispensed' || prescription.status === 'ordered') {
      notifications.push({
        id: `notification-${prescription.id}-collected`,
        type: 'success',
        message: `Your prescription for ${prescription.medication_name} ${prescription.strength || ''} has been collected and is ready for use.`,
        date: today,
        prescription_id: prescription.id
      });
    }
    
    // For completed prescriptions - only show if completed recently (within 7 days)
    else if (prescription.status === 'completed' && prescription.updated_at) {
      const completedDate = new Date(prescription.updated_at);
      const currentDate = new Date();
      const daysDifference = Math.floor((currentDate.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDifference <= 7) {
        notifications.push({
          id: `notification-${prescription.id}-completed`,
          type: 'info',
          message: `You've completed your course of ${prescription.medication_name} ${prescription.strength || ''}.`,
          date: prescription.updated_at.split('T')[0],
          prescription_id: prescription.id
        });
      }
    }
    
    // For expired prescriptions
    else if (prescription.status === 'expired') {
      notifications.push({
        id: `notification-${prescription.id}-expired`,
        type: 'warning',
        message: `Your prescription for ${prescription.medication_name} ${prescription.strength || ''} has expired.`,
        date: today,
        prescription_id: prescription.id
      });
    }
  });
  
  return notifications;
}

/**
 * Save notifications to local storage
 * @param notifications Array of notifications to save
 */
export function saveNotifications(notifications: Notification[]): void {
  localStorage.setItem('phb_prescription_notifications', JSON.stringify(notifications));
}

/**
 * Get saved notifications from local storage
 * @returns Array of saved notifications
 */
export function getSavedNotifications(): Notification[] {
  const savedNotifications = localStorage.getItem('phb_prescription_notifications');
  return savedNotifications ? JSON.parse(savedNotifications) : [];
}

/**
 * Delete a notification by ID
 * @param notificationId ID of the notification to delete
 * @returns Updated array of notifications
 */
export function deleteNotification(notificationId: string): Notification[] {
  const notifications = getSavedNotifications();
  const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
  saveNotifications(updatedNotifications);
  return updatedNotifications;
}

// ============================================================================
// PROFESSIONAL/DOCTOR PRESCRIPTION REQUEST FUNCTIONS
// ============================================================================

/**
 * Interfaces for doctor prescription request management
 */
export interface DoctorPrescriptionRequest {
  id: string;
  request_reference: string;
  patient_name: string;
  patient_hpn: string;
  patient_dob: string;
  patient_age: number;
  allergies?: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'DISPENSED';
  urgency: 'routine' | 'urgent';
  request_date: string;
  approval_date?: string;
  rejection_date?: string;
  medications: MedicationRequestItem[];
  additional_notes?: string;
  pharmacy?: ApiPharmacy;
}

export interface DoctorPrescriptionRequestsResponse {
  status: string;
  requests: DoctorPrescriptionRequest[];
  total_count: number;
  pending_count: number;
  urgent_count: number;
}

export interface PrescriptionRequestDetail {
  id: string;
  request_reference: string;
  patient: {
    name: string;
    hpn: string;
    dob: string;
    age: number;
    allergies?: string;
    current_medications?: string[];
  };
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'DISPENSED';
  urgency: 'routine' | 'urgent';
  request_date: string;
  approval_date?: string;
  rejection_date?: string;
  approved_by?: string;
  rejected_by?: string;
  rejection_reason?: string;
  medications: MedicationRequestItem[];
  additional_notes?: string;
  pharmacy?: ApiPharmacy;
}

export interface ApprovedMedication {
  medication_name: string;
  strength: string;
  form: string;
  quantity: number;
  dosage_instructions: string;
  refills_allowed: number; // 0-11
}

export interface ApprovalResponse {
  success: boolean;
  message: string;
  request_reference?: string;
}

export interface RejectionResponse {
  success: boolean;
  message: string;
  request_reference?: string;
}

/**
 * Fetch prescription requests for the doctor's hospital
 * @param status Optional filter by status (REQUESTED, APPROVED, REJECTED, ALL)
 * @returns Promise with prescription requests
 */
export async function fetchDoctorPrescriptionRequests(
  status?: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'ALL'
): Promise<DoctorPrescriptionRequestsResponse> {
  try {
    const queryParams = status && status !== 'ALL' ? `?status=${status}` : '';
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/${queryParams}`), // Added trailing slash
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      // Mock data for development
      if (response.status === 404 || response.status === 405) {
        console.warn('⚠️ Doctor prescription requests endpoint not implemented. Using mock data...');
        const mockRequests: DoctorPrescriptionRequest[] = [
          {
            id: 'mock-1',
            request_reference: 'REQ-ABC123',
            patient_name: 'John Smith',
            patient_hpn: 'HPN-123456',
            patient_dob: '1985-05-15',
            patient_age: 39,
            allergies: 'Penicillin',
            status: 'REQUESTED',
            urgency: 'urgent',
            request_date: new Date(Date.now() - 3600000).toISOString(),
            medications: [
              {
                medication_name: 'Amoxicillin',
                strength: '500mg',
                form: 'capsule',
                quantity: 21,
                is_repeat: true,
              }
            ],
            additional_notes: 'Running low on medication',
          },
          {
            id: 'mock-2',
            request_reference: 'REQ-XYZ789',
            patient_name: 'Jane Doe',
            patient_hpn: 'HPN-789012',
            patient_dob: '1990-08-22',
            patient_age: 34,
            status: 'REQUESTED',
            urgency: 'routine',
            request_date: new Date(Date.now() - 7200000).toISOString(),
            medications: [
              {
                medication_name: 'Metformin',
                strength: '500mg',
                form: 'tablet',
                quantity: 90,
                is_repeat: true,
              }
            ],
          }
        ];

        return {
          status: 'success',
          requests: status === 'ALL' || !status || status === 'REQUESTED' ? mockRequests : [],
          total_count: mockRequests.length,
          pending_count: 2,
          urgent_count: 1,
        };
      }

      throw new Error(`Error fetching prescription requests: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor prescription requests:', error);
    throw error;
  }
}

/**
 * Get detailed information about a specific prescription request
 * @param requestId ID of the prescription request
 * @returns Promise with prescription request details
 */
export async function getPrescriptionRequestDetails(
  requestId: string
): Promise<PrescriptionRequestDetail> {
  try {
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/${requestId}/`), // Added trailing slash
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      // Mock data for development
      if (response.status === 404 || response.status === 405) {
        console.warn('⚠️ Prescription request detail endpoint not implemented. Using mock data...');
        return {
          id: requestId,
          request_reference: 'REQ-ABC123',
          patient: {
            name: 'John Smith',
            hpn: 'HPN-123456',
            dob: '1985-05-15',
            age: 39,
            allergies: 'Penicillin',
            current_medications: ['Lisinopril 10mg daily', 'Atorvastatin 20mg daily'],
          },
          status: 'REQUESTED',
          urgency: 'urgent',
          request_date: new Date(Date.now() - 3600000).toISOString(),
          medications: [
            {
              medication_name: 'Amoxicillin',
              strength: '500mg',
              form: 'capsule',
              quantity: 21,
              is_repeat: true,
            }
          ],
          additional_notes: 'Running low on medication. Last prescription dispensed 2 months ago.',
        };
      }

      throw new Error(`Error fetching prescription request details: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prescription request details:', error);
    throw error;
  }
}

/**
 * Approve a prescription request
 * @param requestId ID of the prescription request
 * @param medications Array of approved medications with quantities and instructions
 * @param clinicalNotes Clinical notes from the prescriber
 * @returns Promise with approval response
 */
export async function approvePrescription(
  requestId: string,
  medications: ApprovedMedication[],
  clinicalNotes: string
): Promise<ApprovalResponse> {
  try {
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/${requestId}/approve`),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          medications,
          clinical_notes: clinicalNotes,
        }),
      }
    );

    if (!response.ok) {
      // Mock success for development
      if (response.status === 404 || response.status === 405) {
        console.warn('⚠️ Approve prescription endpoint not implemented. Simulating success...');
        return {
          success: true,
          message: 'Prescription approved successfully (simulated)',
          request_reference: 'REQ-ABC123',
        };
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error approving prescription: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error approving prescription:', error);
    throw error;
  }
}

/**
 * Reject a prescription request
 * @param requestId ID of the prescription request
 * @param reason Detailed reason for rejection
 * @param requiresFollowUp Whether patient needs follow-up appointment
 * @returns Promise with rejection response
 */
export async function rejectPrescription(
  requestId: string,
  reason: string,
  requiresFollowUp: boolean
): Promise<RejectionResponse> {
  try {
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/${requestId}/reject`),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          reason,
          requires_follow_up: requiresFollowUp,
        }),
      }
    );

    if (!response.ok) {
      // Mock success for development
      if (response.status === 404 || response.status === 405) {
        console.warn('⚠️ Reject prescription endpoint not implemented. Simulating success...');
        return {
          success: true,
          message: 'Prescription rejected successfully (simulated)',
          request_reference: 'REQ-ABC123',
        };
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error rejecting prescription: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error rejecting prescription:', error);
    throw error;
  }
}

// ============================================================================
// PHARMACIST TRIAGE FUNCTIONS
// ============================================================================

/**
 * Interfaces for pharmacist triage management
 */
export interface PharmacistPrescriptionRequest {
  id: string;
  request_reference: string;
  patient_name: string;
  patient_hpn: string;
  patient_dob: string;
  patient_age: number;
  allergies?: string;
  current_medications?: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'DISPENSED';
  urgency: 'routine' | 'urgent';
  request_date: string;
  medications: MedicationRequestItem[];
  additional_notes?: string;
  pharmacy?: ApiPharmacy;
  triage_category?: string;
  triage_score?: number;
  assigned_at?: string;
  pharmacist_reviewed?: boolean;
  pharmacist_review_date?: string;
  pharmacist_review_action?: 'approved' | 'escalated' | 'rejected';
}

export interface PharmacistTriageResponse {
  status: string;
  requests: PharmacistPrescriptionRequest[];
  total_count: number;
  stats: {
    awaiting_review: number;
    reviewed_today: number;
    urgent_pending: number;
  };
  pagination?: {
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface PharmacistPrescriptionRequestDetail {
  id: string;
  request_reference: string;
  patient: {
    name: string;
    hpn: string;
    dob: string;
    age: number;
    allergies?: string;
    current_medications?: string[];
  };
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'DISPENSED';
  urgency: 'routine' | 'urgent';
  request_date: string;
  medications: Array<MedicationRequestItem & {
    is_controlled?: boolean;
    clinical_concern?: string;
  }>;
  additional_notes?: string;
  pharmacy?: ApiPharmacy;
  triage_info: {
    category: string;
    score: number;
    reason: string;
    assigned_at: string;
  };
  review_history?: {
    pharmacist_reviewed: boolean;
    review_date?: string;
    review_action?: 'approved' | 'escalated' | 'rejected';
    pharmacist_notes?: string;
  };
}

export interface PharmacistApprovalRequest {
  pharmacist_notes: string;
  drug_interactions_checked?: string;
  monitoring_requirements?: string;
  approved_medications: Array<{
    medication_name: string;
    approved_quantity: number;
    approved_dosage: string;
    refills_allowed: number;
  }>;
  had_clinical_intervention?: boolean;
}

export interface PharmacistEscalationRequest {
  escalation_reason: string;
  clinical_concerns?: string;
  pharmacist_recommendation?: string;
  pharmacist_notes: string;
  flagged_medications?: string[];
  had_clinical_intervention?: boolean;
}

export interface PharmacistRejectionRequest {
  rejection_reason: string;
  pharmacist_notes: string;
  requires_appointment?: boolean;
  had_clinical_intervention?: boolean;
}

export interface PharmacistActionResponse {
  success: boolean;
  message: string;
  request_reference?: string;
}

export interface PharmacistStatistics {
  total_reviews_completed: number;
  approval_rate: number;
  escalation_rate: number;
  rejection_rate: number;
  intervention_rate: number;
  average_review_time_minutes: number;
  reviews_this_week: number;
  reviews_this_month: number;
  urgent_pending: number;
  routine_pending: number;
}

/**
 * Fetch prescription requests assigned to pharmacist for triage
 * @param filters Optional filters (status, urgency, triage_category, etc.)
 * @param page Page number for pagination
 * @param perPage Items per page
 * @returns Promise with pharmacist triage requests
 */
export async function fetchPharmacistTriageRequests(
  filters?: {
    status?: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'ALL';
    urgency?: 'routine' | 'urgent';
    triage_category?: string;
    reviewed?: boolean;
  },
  page: number = 1,
  perPage: number = 20
): Promise<PharmacistTriageResponse> {
  try {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters?.urgency) params.append('urgency', filters.urgency);
    if (filters?.triage_category) params.append('triage_category', filters.triage_category);
    if (filters?.reviewed !== undefined) params.append('reviewed', String(filters.reviewed));
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    const queryString = params.toString();
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/triage/${queryString ? `?${queryString}` : ''}`),
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching triage requests: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pharmacist triage requests:', error);
    throw error;
  }
}

/**
 * Get detailed information about a specific prescription request for triage
 * @param requestId ID of the prescription request
 * @returns Promise with prescription request details
 */
export async function getPharmacistTriageRequestDetail(
  requestId: string
): Promise<PharmacistPrescriptionRequestDetail> {
  try {
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/triage/${requestId}/`),
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching triage request detail: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pharmacist triage request detail:', error);
    throw error;
  }
}

/**
 * Approve a prescription request (pharmacist review)
 * @param requestId ID of the prescription request
 * @param approvalData Approval details with medications and notes
 * @returns Promise with approval response
 */
export async function pharmacistApprovePrescription(
  requestId: string,
  approvalData: PharmacistApprovalRequest
): Promise<PharmacistActionResponse> {
  try {
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/triage/${requestId}/approve/`),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(approvalData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error approving prescription: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error approving prescription (pharmacist):', error);
    throw error;
  }
}

/**
 * Escalate a prescription request to physician
 * @param requestId ID of the prescription request
 * @param escalationData Escalation reason and clinical concerns
 * @returns Promise with escalation response
 */
export async function escalatePrescriptionToPhysician(
  requestId: string,
  escalationData: PharmacistEscalationRequest
): Promise<PharmacistActionResponse> {
  try {
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/triage/${requestId}/escalate/`),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(escalationData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error escalating prescription: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error escalating prescription to physician:', error);
    throw error;
  }
}

/**
 * Reject a prescription request (pharmacist review)
 * @param requestId ID of the prescription request
 * @param rejectionData Rejection reason and notes
 * @returns Promise with rejection response
 */
export async function pharmacistRejectPrescription(
  requestId: string,
  rejectionData: PharmacistRejectionRequest
): Promise<PharmacistActionResponse> {
  try {
    const response = await fetch(
      fixApiUrl(`/api/provider/prescriptions/triage/${requestId}/reject/`),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(rejectionData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error rejecting prescription: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error rejecting prescription (pharmacist):', error);
    throw error;
  }
}

/**
 * Get pharmacist triage statistics
 * @returns Promise with pharmacist performance statistics
 */
export async function getPharmacistStatistics(): Promise<PharmacistStatistics> {
  try {
    const response = await fetch(
      fixApiUrl('/api/provider/prescriptions/triage/stats/'),
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching statistics: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pharmacist statistics:', error);
    throw error;
  }
}