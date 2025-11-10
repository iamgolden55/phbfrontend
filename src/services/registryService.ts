/**
 * Professional Registry Service
 *
 * MICROSERVICE-READY ARCHITECTURE:
 * - All registry API calls isolated in this file
 * - Easy to swap REGISTRY_API_URL to point to separate microservice
 * - No direct dependencies on main app services
 * - Can be extracted with zero code changes in components
 *
 * FUTURE MIGRATION:
 * Change REGISTRY_API_URL from '/api/registry' to 'https://registry.phb.ng/api'
 * and this entire registry system becomes a separate microservice.
 */

import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../utils/config';

// MICROSERVICE ENDPOINT CONFIGURATION
// Current: Monolith at /api/registry
// Future: Change to 'https://registry-service.phb.ng' for microservice deployment
const REGISTRY_API_URL = `${API_BASE_URL}/api/registry`;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ProfessionalType =
  | 'doctor'
  | 'pharmacist'
  | 'nurse'
  | 'midwife'
  | 'dentist'
  | 'physiotherapist'
  | 'medical_laboratory_scientist'
  | 'radiographer'
  | 'optometrist';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'clarification_requested';

export type Gender = 'male' | 'female' | 'other';

export type RegulatoryBody =
  | 'MDCN'  // Medical and Dental Council of Nigeria
  | 'PCN'   // Pharmacists Council of Nigeria
  | 'NMCN'  // Nursing and Midwifery Council
  | 'MPBN'  // Medical Physiotherapy Board of Nigeria
  | 'MLSCN' // Medical Laboratory Science Council
  | 'RRBN'  // Radiographers Registration Board
  | 'OPTON'; // Optometrists and Dispensing Opticians Registration Board

export interface ProfessionalApplicationData {
  // Personal Information
  professional_type: ProfessionalType;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  phone_number: string;
  alternate_phone_number?: string;
  date_of_birth: string;
  gender: Gender;
  nationality: string;
  state_of_origin?: string;

  // Contact Address
  residential_address: string;
  residential_city: string;
  residential_state: string;
  residential_country: string;

  // Regulatory Information
  regulatory_body: RegulatoryBody;
  registration_number: string;
  registration_date?: string;
  registration_expiry_date?: string;

  // Educational Background
  highest_degree: string;
  university: string;
  graduation_year: number;
  additional_qualifications?: string[];

  // Professional Details
  years_experience: number;
  specialization: string;
  sub_specializations?: string[];
  current_practice_address: string;
  current_practice_city: string;
  current_practice_state: string;

  // Additional Information
  professional_memberships?: string[];
  languages_spoken?: string[];
  research_interests?: string[];
  publications?: string[];
}

export interface ApplicationDocument {
  id: string;
  document_type: string;
  file_name: string;
  file_url?: string;
  uploaded_at: string;
  verified: boolean;
  verification_status?: 'pending' | 'verified' | 'rejected';
  verified_at?: string;
  verified_by?: string;
  rejection_reason?: string;
  verification_notes?: string;
  // Rejection workflow fields
  rejection_count?: number;
  max_rejection_attempts?: number;
  attempts_remaining?: number;
  resubmission_deadline?: string;
  can_be_replaced?: boolean;
  locked_after_verification?: boolean;
  is_deadline_approaching?: boolean;
}

export interface ProfessionalApplication {
  id: string;
  application_reference: string; // PHB-APP-2025-XXXXX format
  status: ApplicationStatus; // Backend uses 'status', not 'application_status'
  professional_type: ProfessionalType;
  phb_license_number?: string; // Set when approved

  // Personal
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone: string; // Backend uses 'phone', not 'phone_number'
  alternate_phone?: string;

  // Address
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  country?: string;

  // Regulatory - Backend uses 'home_registration_*' prefix
  home_registration_body: RegulatoryBody;
  home_registration_number: string;
  home_registration_date?: string;

  // Professional
  specialization: string;
  years_of_experience: number; // Backend uses 'years_of_experience', not 'years_experience'

  // Timestamps
  created_at: string;
  submitted_date?: string; // Backend uses 'submitted_date', not 'submitted_at'
  under_review_date?: string;
  decision_date?: string;

  // Documents
  documents: ApplicationDocument[];

  // Review
  review_notes?: string; // Backend uses 'review_notes', not 'reviewer_notes'
  rejection_reason?: string;

  // Display fields (computed by backend)
  applicant_name?: string;
  professional_type_display?: string;
  status_display?: string;
  is_draft?: boolean;
  is_submitted?: boolean;
  is_approved?: boolean;
  has_rejected_documents?: boolean; // Flag indicating if application has any rejected documents needing re-upload
}

export interface RegistryProfessional {
  phb_license_number: string;
  full_name: string;
  professional_type: ProfessionalType;
  specialization: string;
  regulatory_body: RegulatoryBody;
  registration_number: string;
  verification_status: 'verified' | 'pending' | 'expired';
  license_status: 'active' | 'suspended' | 'revoked';
  license_issue_date: string;
  license_expiry_date: string;
  state: string;
  years_experience?: number;
}

export interface RequiredDocument {
  document_type: string;
  display_name: string;
  description: string;
  is_required: boolean;
  accepted_formats: string[];
  max_size_mb: number;
}

export interface RegistryStatistics {
  total_professionals: number;
  by_type: Record<ProfessionalType, number>;
  by_state: Record<string, number>;
  active_licenses: number;
  pending_applications: number;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class RegistryServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'RegistryServiceError';
  }
}

const handleError = (error: AxiosError): never => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data as any;

    throw new RegistryServiceError(
      data.message || data.error || 'Registry service error',
      status,
      data
    );
  } else if (error.request) {
    throw new RegistryServiceError(
      'Cannot connect to registry service. Please check your internet connection.',
      0
    );
  } else {
    throw new RegistryServiceError(error.message);
  }
};

// ============================================================================
// AUTHENTICATION HELPER
// ============================================================================

// COOKIE-BASED AUTHENTICATION
// Auth tokens are stored in httpOnly cookies and sent automatically with credentials: 'include'
// No need to manually get token from localStorage
const getAuthConfig = () => {
  return {
    withCredentials: true,  // Send cookies with request
    headers: {
      'Content-Type': 'application/json',
    }
  };
};

// ============================================================================
// PUBLIC REGISTRY ENDPOINTS (No authentication required)
// ============================================================================

export const publicRegistryAPI = {
  /**
   * Search professional registry
   *
   * @param query - Search query (name, license number, etc.)
   * @param filters - Optional filters (type, state, specialization)
   */
  async searchRegistry(
    query?: string,
    filters?: {
      professional_type?: ProfessionalType;
      state?: string;
      specialization?: string;
      license_status?: 'active' | 'suspended' | 'revoked';
    }
  ): Promise<{ count: number; results: RegistryProfessional[] }> {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (filters?.professional_type) params.append('professional_type', filters.professional_type);
      if (filters?.state) params.append('state', filters.state);
      if (filters?.specialization) params.append('specialization', filters.specialization);
      if (filters?.license_status) params.append('license_status', filters.license_status);

      const response = await axios.get(
        `${REGISTRY_API_URL}/search/?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Verify a professional license by license number
   */
  async verifyLicense(licenseNumber: string): Promise<{
    valid: boolean;
    professional?: RegistryProfessional;
    message: string;
  }> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/verify/${licenseNumber}/`
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get registry statistics
   */
  async getStatistics(): Promise<RegistryStatistics> {
    try {
      const response = await axios.get(`${REGISTRY_API_URL}/statistics/`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get list of Nigerian states
   */
  async getNigerianStates(): Promise<string[]> {
    try {
      const response = await axios.get(`${REGISTRY_API_URL}/states/`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get list of professional types
   */
  async getProfessionalTypes(): Promise<Array<{
    value: ProfessionalType;
    label: string;
    regulatory_body: RegulatoryBody;
  }>> {
    try {
      const response = await axios.get(`${REGISTRY_API_URL}/professional-types/`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get specializations for a professional type
   */
  async getSpecializations(professionalType: ProfessionalType): Promise<string[]> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/specializations/?professional_type=${professionalType}`
      );
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Submit a new professional application (public - no auth required)
   * This creates both the user account and application in one step
   *
   * @param data - Application data including email (which becomes username)
   * @returns Application details and temporary access info
   */
  async submitNewApplication(
    data: Partial<ProfessionalApplicationData> & { password?: string }
  ): Promise<{
    application: ProfessionalApplication;
    message: string;
    email_sent: boolean;
    user_created: boolean;
    login_credentials?: {
      username: string;
      password: string;
      note: string;
    };
  }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/public/applications/`,
        data
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
};

// ============================================================================
// PROFESSIONAL APPLICATION ENDPOINTS (Requires authentication)
// ============================================================================

export const professionalApplicationAPI = {
  /**
   * Create a new professional application (draft)
   */
  async createApplication(
    data: Partial<ProfessionalApplicationData>
  ): Promise<ProfessionalApplication> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/applications/`,
        data,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get all applications for current user
   */
  async getMyApplications(): Promise<ProfessionalApplication[]> {
    try {
      console.log('🔍 registryService: Fetching applications from:', `${REGISTRY_API_URL}/applications/`);
      console.log('🔍 registryService: Auth config:', getAuthConfig());

      const response = await axios.get(
        `${REGISTRY_API_URL}/applications/`,
        getAuthConfig()
      );

      console.log('✅ registryService: Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ registryService: Error:', error);
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get application details
   */
  async getApplication(applicationId: string): Promise<ProfessionalApplication> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/applications/${applicationId}/`,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Update application (only if in draft status)
   */
  async updateApplication(
    applicationId: string,
    data: Partial<ProfessionalApplicationData>
  ): Promise<ProfessionalApplication> {
    try {
      const response = await axios.put(
        `${REGISTRY_API_URL}/applications/${applicationId}/`,
        data,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Submit application for review (changes status from draft to submitted)
   */
  async submitApplication(applicationId: string): Promise<{
    status: string;
    message: string;
    submitted_at: string;
  }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/applications/${applicationId}/submit/`,
        {},
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get required documents for a professional type
   */
  async getRequiredDocuments(
    professionalType: ProfessionalType
  ): Promise<RequiredDocument[]> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/required-documents/?professional_type=${professionalType}`,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Upload a document for an application
   */
  async uploadDocument(
    applicationId: string,
    documentType: string,
    file: File
  ): Promise<ApplicationDocument> {
    try {
      const formData = new FormData();
      formData.append('document_type', documentType);
      formData.append('file', file);

      const response = await axios.post(
        `${REGISTRY_API_URL}/applications/${applicationId}/documents/`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Backend returns { message: '...', document: {...} }
      // Extract just the document object
      return response.data.document;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get all documents for an application
   */
  async getApplicationDocuments(
    applicationId: string
  ): Promise<ApplicationDocument[]> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/applications/${applicationId}/documents/`,
        getAuthConfig()
      );

      // Backend returns { count: X, documents: [...] }
      // Extract just the documents array
      return response.data.documents;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Delete a document
   */
  async deleteDocument(
    applicationId: string,
    documentId: string
  ): Promise<void> {
    try {
      await axios.delete(
        `${REGISTRY_API_URL}/applications/${applicationId}/documents/${documentId}/`,
        getAuthConfig()
      );
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
};

// ============================================================================
// ADMIN ENDPOINTS (Requires admin authentication)
// ============================================================================

export const adminRegistryAPI = {
  /**
   * Get all applications (admin view)
   */
  async getAllApplications(filters?: {
    status?: ApplicationStatus;
    professional_type?: ProfessionalType;
    submitted_after?: string;
  }): Promise<ProfessionalApplication[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.professional_type) params.append('professional_type', filters.professional_type);
      if (filters?.submitted_after) params.append('submitted_after', filters.submitted_after);

      const response = await axios.get(
        `${REGISTRY_API_URL}/admin/applications/?${params.toString()}`,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get application details (admin view)
   */
  async getApplicationDetail(applicationId: string): Promise<ProfessionalApplication> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/admin/applications/${applicationId}/`,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Start reviewing an application
   */
  async startReview(applicationId: string): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/applications/${applicationId}/start-review/`,
        {},
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Approve an application and issue PHB license
   */
  async approveApplication(
    applicationId: string,
    data: {
      phb_license_number: string;
      license_expiry_date: string;
      additional_certifications?: string[];
      notes?: string;
    }
  ): Promise<{ message: string; registry_id: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/applications/${applicationId}/approve/`,
        data,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Reject an application
   */
  async rejectApplication(
    applicationId: string,
    reason: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/applications/${applicationId}/reject/`,
        { rejection_reason: reason },
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Verify a document
   */
  async verifyDocument(
    applicationId: string,
    documentId: string,
    notes?: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/applications/${applicationId}/documents/${documentId}/verify/`,
        { notes },
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Reject a document
   */
  async rejectDocument(
    applicationId: string,
    documentId: string,
    reason: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/applications/${applicationId}/documents/${documentId}/reject/`,
        { rejection_reason: reason },
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Request additional documents
   */
  async requestAdditionalDocuments(
    applicationId: string,
    documentTypes: string[],
    message: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/applications/${applicationId}/request-documents/`,
        { document_types: documentTypes, message },
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get all professionals in registry (admin view)
   */
  async getAllRegistryProfessionals(): Promise<RegistryProfessional[]> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/admin/registry/`,
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Suspend a license
   */
  async suspendLicense(
    licenseNumber: string,
    reason: string,
    suspensionEndDate?: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/registry/${licenseNumber}/suspend/`,
        { reason, suspension_end_date: suspensionEndDate },
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Reactivate a suspended license
   */
  async reactivateLicense(
    licenseNumber: string,
    notes?: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${REGISTRY_API_URL}/admin/registry/${licenseNumber}/reactivate/`,
        { notes },
        getAuthConfig()
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
};

// ============================================================================
// PUBLIC SEARCH API (No authentication required)
// ============================================================================

const publicSearchAPI = {
  /**
   * Search for registered professionals (public endpoint)
   * No authentication required
   */
  async searchProfessionals(filters: {
    query?: string;
    professionalType?: string;
    specialization?: string;
    state?: string;
  }): Promise<{ count: number; results: any[] }> {
    try {
      const params = new URLSearchParams();
      if (filters.query) params.append('query', filters.query);
      if (filters.professionalType) params.append('professional_type', filters.professionalType);
      if (filters.specialization) params.append('specialization', filters.specialization);
      if (filters.state) params.append('state', filters.state);

      const response = await axios.get(
        `${REGISTRY_API_URL}/search/?${params.toString()}`,
        { withCredentials: false }  // Public endpoint
      );

      return {
        count: response.data.count,
        results: response.data.results,
      };
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Verify a specific license number (public endpoint)
   * No authentication required
   */
  async verifyLicense(licenseNumber: string): Promise<{ verified: boolean; professional?: any }> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/verify/${licenseNumber}/`,
        { withCredentials: false }  // Public endpoint
      );

      return response.data;
    } catch (error) {
      if ((error as AxiosError).response?.status === 404) {
        return {
          verified: false,
          message: 'No active professional found with this license number'
        };
      }
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get registry statistics (public endpoint)
   * No authentication required
   */
  async getRegistryStats(): Promise<{
    total_active_professionals: number;
    by_type: Record<string, number>;
    by_state: Record<string, number>;
  }> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/stats/`,
        { withCredentials: false }  // Public endpoint
      );

      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  /**
   * Get application status by ID (public endpoint)
   * No authentication required
   * Returns the current status and license number if approved
   */
  async getApplicationStatus(applicationId: string): Promise<{
    status: 'pending' | 'approved' | 'rejected';
    license_number?: string;
    reason?: string;
  }> {
    try {
      const response = await axios.get(
        `${REGISTRY_API_URL}/application-status/${applicationId}/`,
        { withCredentials: false }  // Public endpoint
      );

      return response.data;
    } catch (error) {
      // If application doesn't exist or error occurs, return pending as fallback
      if ((error as AxiosError).response?.status === 404) {
        return {
          status: 'pending',
          reason: 'Application not found or still pending review'
        };
      }
      return handleError(error as AxiosError);
    }
  },
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export const registryService = {
  ...publicSearchAPI,  // Expose search methods at top level
  public: publicRegistryAPI,
  professional: professionalApplicationAPI,
  admin: adminRegistryAPI,
  search: publicSearchAPI,  // Also available under search namespace
};

export default registryService;
