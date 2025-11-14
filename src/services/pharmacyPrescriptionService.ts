/**
 * Pharmacy Prescription Service
 *
 * API service for pharmacy prescription lookup by HPN.
 * Implements NHS EPS-style patient-choice model with drug database integration.
 */

import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

// Create axios instance with cookie-based auth
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== TypeScript Interfaces =====

export interface DrugInfo {
  generic_name: string;
  brand_names: string[];

  // Regulatory
  nafdac_approved: boolean;
  nafdac_schedule: string;
  nafdac_schedule_display: string;

  // Risk Flags
  is_controlled: boolean;
  is_high_risk: boolean;
  risk_level: 'low' | 'moderate' | 'high' | 'critical';

  // Prescribing Requirements
  requires_photo_id: boolean;
  requires_special_prescription: boolean;
  maximum_days_supply: number | null;

  // Monitoring
  requires_monitoring: boolean;
  monitoring_type: string | null;
  monitoring_frequency_days: number | null;

  // Safety
  black_box_warning: boolean;
  black_box_warning_text: string | null;
  addiction_risk: boolean;
  abuse_potential: 'none' | 'low' | 'moderate' | 'high' | 'severe';

  // Age & Pregnancy
  minimum_age: number | null;
  pregnancy_category: string;
  breastfeeding_safe: boolean;

  // Interactions
  major_contraindications: string[];
  major_drug_interactions: string[];
  food_interactions: string[];

  // Alternatives
  safer_alternatives: string[];
  cheaper_alternatives: string[];
}

export interface Prescription {
  id: string;
  medication_name: string;
  generic_name: string | null;
  strength: string;
  form: string;
  route: string;
  dosage: string;
  frequency: string;

  // Dates
  start_date: string;
  end_date: string | null;
  is_ongoing: boolean;

  // Instructions
  patient_instructions: string | null;
  pharmacy_instructions: string | null;
  indication: string | null;

  // Prescription Management
  prescription_number: string | null;
  refills_authorized: number;
  refills_remaining: number;

  // Status
  status: 'active' | 'completed' | 'discontinued' | 'on_hold' | 'never_administered';
  priority: number;

  // Provider
  prescribed_by: {
    name: string;
    specialty: string | null;
  } | null;

  // Nomination
  nominated_pharmacy: {
    name: string;
    code: string;
  } | null;

  // Dispensing
  dispensed: boolean;
  dispensed_at: string | null;
  dispensed_by_pharmacy: {
    name: string;
  } | null;

  // Security
  nonce: string | null;
  signature: string | null;

  // Drug Database Info
  drug_info: DrugInfo | null;
}

export interface PatientInfo {
  hpn: string;
  name: string;
  blood_type: string | null;
  allergies: string | null;
  chronic_conditions: string | null;
  is_high_risk: boolean;
}

export interface PrescriptionSummary {
  total_prescriptions: number;
  controlled_substances: number;
  requires_enhanced_verification: boolean;
}

export interface VerificationRequired {
  level_1_basic: boolean;
  level_2_government_id: boolean;
  level_3_prescriber_contact: boolean;
}

export interface PharmacyPrescriptionResponse {
  success: boolean;
  patient: PatientInfo;
  prescriptions: Prescription[];
  summary: PrescriptionSummary;
  verification_required: VerificationRequired;
  accessed_at: string;
  accessed_by: {
    pharmacist: string;
    license_number: string;
    pharmacy: string;
  };
}

// ===== API Functions =====

/**
 * Search for patient prescriptions by HPN
 *
 * @param hpn - Patient's Health Patient Number (format: XXX XXX XXX XXXX)
 * @param status - Filter by status: 'active' (default), 'completed', 'discontinued', 'all'
 * @returns Promise with prescription data and drug database info
 */
export const searchPrescriptionsByHPN = async (
  hpn: string,
  status: 'active' | 'completed' | 'discontinued' | 'all' = 'active'
): Promise<PharmacyPrescriptionResponse> => {
  try {
    const response = await api.get('/api/pharmacy/prescriptions/search/', {
      params: {
        hpn: hpn.trim(),
        status
      }
    });

    return response.data;
  } catch (error: any) {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error
      const errorData = error.response.data;

      throw {
        status: error.response.status,
        message: errorData.message || errorData.error || 'Failed to fetch prescriptions',
        error: errorData.error,
        suggestions: errorData.suggestions || [],
        requiresAction: errorData.requires_action
      };
    } else if (error.request) {
      // Request made but no response
      throw {
        status: 0,
        message: 'Network error - unable to reach server',
        error: 'NETWORK_ERROR'
      };
    } else {
      // Something else went wrong
      throw {
        status: 0,
        message: error.message || 'An unexpected error occurred',
        error: 'UNKNOWN_ERROR'
      };
    }
  }
};

/**
 * Format HPN for display (adds spaces)
 * ASA2898431620 -> ASA 289 843 1620
 * Format: 3 letters + 10 digits with spaces
 */
export const formatHPN = (hpn: string): string => {
  const cleaned = hpn.replace(/\s/g, '').toUpperCase();
  if (cleaned.length === 13) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  // Partial formatting for better UX while typing
  if (cleaned.length > 9) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  } else if (cleaned.length > 6) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  } else if (cleaned.length > 3) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }
  return cleaned;
};

/**
 * Validate HPN format
 * Format: 3 letters + 10 digits (e.g., ASA 289 843 1620)
 */
export const validateHPN = (hpn: string): { valid: boolean; message?: string } => {
  const cleaned = hpn.replace(/\s/g, '').toUpperCase();

  if (!cleaned) {
    return { valid: false, message: 'HPN is required' };
  }

  if (cleaned.length !== 13) {
    return { valid: false, message: 'HPN must be 13 characters (ABC 123 456 7890)' };
  }

  // Validate format: 3 letters followed by 10 digits
  if (!/^[A-Z]{3}\d{10}$/.test(cleaned)) {
    return { valid: false, message: 'HPN must be 3 letters followed by 10 digits (e.g., ASA xxx xxx xxxx)' };
  }

  return { valid: true };
};

/**
 * Get risk level color for UI display
 */
export const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'critical':
      return 'error';
    case 'high':
      return 'warning';
    case 'moderate':
      return 'info';
    default:
      return 'success';
  }
};

/**
 * Get verification level badge text
 */
export const getVerificationText = (verification: VerificationRequired): string => {
  if (verification.level_3_prescriber_contact) {
    return 'Level 3: Prescriber Contact Required';
  } else if (verification.level_2_government_id) {
    return 'Level 2: Government ID Required';
  } else {
    return 'Level 1: Basic Verification';
  }
};

/**
 * Mark a prescription as dispensed
 *
 * @param prescriptionId - The ID of the prescription to dispense
 * @param nonce - The nonce from the prescription for verification
 * @param pharmacyCode - The pharmacy code (required by backend)
 * @param pharmacistName - The pharmacist's name (required by backend)
 * @returns Promise with dispense confirmation
 */
export const dispensePrescription = async (
  prescriptionId: string,
  nonce: string | null,
  pharmacyCode: string,
  pharmacistName: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate required fields before sending
    if (!nonce) {
      throw {
        status: 400,
        message: 'This prescription cannot be dispensed - missing security nonce. Please contact the prescribing doctor.',
        error: 'MISSING_NONCE'
      };
    }

    const response = await api.post('/api/prescriptions/dispense/', {
      prescription_id: prescriptionId,
      nonce: nonce,
      pharmacy_code: pharmacyCode,
      pharmacist_name: pharmacistName,
      verification_notes: 'Dispensed via PHB system'
    });

    return response.data;
  } catch (error: any) {
    // Enhanced error handling
    if (error.response) {
      const errorData = error.response.data;

      throw {
        status: error.response.status,
        message: errorData.message || errorData.error || 'Failed to dispense prescription',
        error: errorData.error
      };
    } else if (error.request) {
      throw {
        status: 0,
        message: 'Network error - unable to reach server',
        error: 'NETWORK_ERROR'
      };
    } else {
      throw {
        status: 0,
        message: error.message || 'An unexpected error occurred',
        error: 'UNKNOWN_ERROR'
      };
    }
  }
};

export default {
  searchPrescriptionsByHPN,
  dispensePrescription,
  formatHPN,
  validateHPN,
  getRiskLevelColor,
  getVerificationText
};
