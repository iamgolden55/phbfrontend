import { API_BASE_URL } from '../../utils/config';

const AUTH_TOKEN_KEY = 'phb_auth_token';

export interface MedicalRecord {
  id: string;
  patient_id: string;
  patient_name: string;
  date_of_birth?: string;
  blood_type?: string;
  height?: string;
  weight?: string;
  allergies?: string[];
  conditions?: MedicalCondition[];
  medications?: Medication[];
  lab_results?: LabResult[];
  procedures?: MedicalProcedure[];
  immunizations?: Immunization[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalCondition {
  id: string;
  name: string;
  diagnosis_date: string;
  status: 'active' | 'resolved' | 'chronic';
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date?: string;
  prescribed_by: string;
  status: 'active' | 'completed' | 'discontinued';
  notes?: string;
}

export interface LabResult {
  id: string;
  test_name: string;
  test_date: string;
  result: string;
  reference_range: string;
  status: 'normal' | 'abnormal' | 'critical';
  notes?: string;
}

export interface MedicalProcedure {
  id: string;
  name: string;
  procedure_date: string;
  performed_by: string;
  notes?: string;
}

export interface Immunization {
  id: string;
  vaccine: string;
  date_administered: string;
  administered_by: string;
  next_dose_date?: string;
  notes?: string;
}

/**
 * Request OTP for medical record access
 * @param patientId The ID of the patient whose records are being accessed
 * @returns Promise that resolves to the OTP request status
 */
export const requestMedicalRecordOTP = async (patientId: string) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/medical-records/request-access/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        patient_id: patientId,
        reason: 'Medical consultation',
        access_duration: '1h' // Request access for 1 hour
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // If already requested, check if we can resend OTP
      if (response.status === 400 && errorData.detail?.includes('already requested')) {
        return { 
          status: 'pending',
          message: 'OTP already requested. Please check your email or request a new one.',
          can_resend: true
        };
      }
      
      throw new Error(errorData.detail || errorData.message || 'Failed to request access');
    }
    
    const data = await response.json();
    
    return {
      status: data.status || 'success',
      message: data.message || 'OTP sent successfully',
      requires_otp: data.requires_otp || false
    };
  } catch (error) {
    console.error('Error requesting medical record access:', error);
    throw error;
  }
};

/**
 * Verify OTP and get medical record access token
 * @param patientId The ID of the patient whose records are being accessed
 * @param otp The OTP code to verify
 * @returns Promise that resolves to the access token and expiry
 */
export const verifyMedicalRecordOTP = async (patientId: string, otp: string) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/medical-records/verify-access/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        patient_id: patientId,
        otp: otp.trim() 
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific error cases
      if (response.status === 400) {
        if (errorData.detail?.includes('expired')) {
          throw new Error('OTP has expired. Please request a new one.');
        }
        if (errorData.detail?.includes('invalid') || errorData.detail?.includes('incorrect')) {
          throw new Error('Invalid OTP. Please try again.');
        }
      }
      
      throw new Error(errorData.detail || errorData.message || 'Verification failed');
    }
    
    const data = await response.json();
    
    // Store the medical record access token if provided
    if (data.access_token) {
      localStorage.setItem('medical_record_token', data.access_token);
      
      // Also store the expiration time (default to 1 hour if not provided)
      const expiresIn = data.expires_in || 3600; // Default to 1 hour
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
      localStorage.setItem('medical_record_token_expires_at', expiresAt);
    }
    
    return {
      status: 'success',
      access_token: data.access_token,
      expires_in: data.expires_in,
      message: data.message || 'Access granted successfully'
    };
  } catch (error) {
    console.error('Error verifying medical record access:', error);
    throw error;
  }
};

/**
 * Fetch medical records for a patient
 * @param patientId The ID of the patient
 * @param accessToken Optional access token for protected records
 * @returns Promise that resolves to the patient's medical records
 */
export async function fetchMedicalRecords(patientId: string, accessToken?: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const headers: HeadersInit = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    
    // Add medical record access token to headers if provided
    const medicalRecordToken = localStorage.getItem('medical_record_token');
    if (medicalRecordToken) {
      headers['X-Medical-Record-Token'] = medicalRecordToken;
    }
    
    // First, try to get the medical record ID for the patient
    const recordsResponse = await fetch(`${API_BASE_URL}/api/patient/medical-record/`, {
      method: 'GET',
      headers,
    });
    
    if (!recordsResponse.ok) {
      // If access denied, check if it's due to missing OTP
      if (recordsResponse.status === 403) {
        const errorData = await recordsResponse.json().catch(() => ({}));
        if (errorData.requires_otp) {
          return { requiresOtp: true };
        }
      }
      
      const errorData = await recordsResponse.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching medical records: ${recordsResponse.status}`);
    }
    
    const recordsData = await recordsResponse.json();
    
    // Find the specific record for this patient
    const patientRecord = Array.isArray(recordsData) 
      ? recordsData.find((record: any) => record.patient_id === patientId || record.patient?.id === patientId)
      : recordsData;
    
    if (!patientRecord) {
      throw new Error('No medical records found for this patient');
    }
    
    // If we have a direct record, return it
    if (patientRecord.id) {
      return patientRecord;
    }
    
    // Otherwise, try to fetch the specific record
    const recordId = patientRecord.record_id || patientRecord.id;
    if (!recordId) {
      throw new Error('Invalid medical record ID');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/medical-records/${recordId}/`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching medical record: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching medical records:', error);
    throw error;
  }
}
