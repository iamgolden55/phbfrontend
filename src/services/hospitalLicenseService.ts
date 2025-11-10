/**
 * Hospital License Service
 * For hospital admins to manage their hospital's licenses
 */

import { API_BASE_URL } from '../utils/config';

export interface HospitalLicense {
  id: number;
  license_number: string;
  license_type: string;
  license_name: string;
  license_category?: string;
  license_status: string;
  issue_date?: string;
  effective_date?: string;
  expiration_date?: string;
  healthcare_authority?: {
    id: number;
    name: string;
  } | null;
  license_certificate?: string;
  conditions?: string;
  limitations?: string;
  notes?: string;
  created_at?: string;
}

export interface HospitalInfo {
  id: number;
  name: string;
  registration_number: string;
  is_verified: boolean;
}

export interface LicensesResponse {
  success: boolean;
  hospital: HospitalInfo;
  licenses: HospitalLicense[];
  total: number;
}

export interface UploadLicenseData {
  license_number: string;
  license_type: string;
  license_name: string;
  license_category?: string;
  license_status?: string;
  issue_date?: string;
  effective_date?: string;
  expiration_date?: string;
  healthcare_authority_id?: number;
  license_certificate?: File;
  conditions?: string;
}

class HospitalLicenseService {
  /**
   * Get all licenses for the current hospital admin's hospital
   */
  async getMyLicenses(): Promise<LicensesResponse> {
    try {
      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : API_BASE_URL + '/';
      const response = await fetch(`${baseUrl}api/my-hospital/licenses/`, {
        method: 'GET',
        credentials: 'include', // Send cookies automatically
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Failed to get hospital licenses:', error);
      throw error;
    }
  }

  /**
   * Upload a new license for the hospital
   */
  async uploadLicense(licenseData: UploadLicenseData): Promise<any> {
    try {
      const formData = new FormData();

      // Add all fields to FormData
      formData.append('license_number', licenseData.license_number);
      formData.append('license_type', licenseData.license_type);
      formData.append('license_name', licenseData.license_name);

      if (licenseData.license_category) {
        formData.append('license_category', licenseData.license_category);
      }
      if (licenseData.license_status) {
        formData.append('license_status', licenseData.license_status);
      }
      if (licenseData.issue_date) {
        formData.append('issue_date', licenseData.issue_date);
      }
      if (licenseData.effective_date) {
        formData.append('effective_date', licenseData.effective_date);
      }
      if (licenseData.expiration_date) {
        formData.append('expiration_date', licenseData.expiration_date);
      }
      if (licenseData.healthcare_authority_id) {
        formData.append('healthcare_authority_id', licenseData.healthcare_authority_id.toString());
      }
      if (licenseData.license_certificate) {
        formData.append('license_certificate', licenseData.license_certificate);
      }
      if (licenseData.conditions) {
        formData.append('conditions', licenseData.conditions);
      }
      if (licenseData.limitations) {
        formData.append('limitations', licenseData.limitations);
      }
      if (licenseData.notes) {
        formData.append('notes', licenseData.notes);
      }

      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : API_BASE_URL + '/';
      const response = await fetch(`${baseUrl}api/my-hospital/licenses/upload/`, {
        method: 'POST',
        credentials: 'include', // Send cookies automatically
        // Don't set Content-Type for FormData - browser sets it automatically with boundary
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Failed to upload license:', error);
      throw error;
    }
  }
}

export const hospitalLicenseService = new HospitalLicenseService();
