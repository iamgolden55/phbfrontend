// Organization Profile Service
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Backend Hospital API Response
interface HospitalApiResponse {
  id: number;
  name: string;
  hospital_type: 'public' | 'private' | 'specialist' | 'teaching' | 'clinic' | 'research';
  registration_number: string;
  address: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  latitude: string | null;
  longitude: string | null;
  emergency_contact: string | null;

  // Contact Persons
  primary_contact_name: string | null;
  primary_contact_title: string | null;
  primary_contact_phone: string | null;
  primary_contact_email: string | null;

  administrative_contact_name: string | null;
  administrative_contact_title: string | null;
  administrative_contact_phone: string | null;
  administrative_contact_email: string | null;

  medical_director_name: string | null;
  medical_director_license: string | null;
  medical_director_specialization: string | null;
  medical_director_years_experience: number;

  // Operational
  bed_capacity: number;
  emergency_unit: boolean;
  icu_unit: boolean;
  is_verified: boolean;
  verification_date: string | null;
  accreditation_status: boolean;
  accreditation_expiry: string | null;

  // Digital Infrastructure
  has_hospital_information_system: boolean;
  has_electronic_medical_records: boolean;
  has_telemedicine_capabilities: boolean;
  has_api_integration: boolean;
  has_online_appointment_booking: boolean;
  has_patient_portal: boolean;
  has_mobile_application: boolean;
}

// Frontend Organization Profile (simplified to match backend)
export interface OrganizationProfile {
  id: number;
  name: string;
  type: string;
  code: string;
  address: string;

  // Contact Information
  phone: string;
  email: string;
  website: string;
  emergency_contact: string;

  // Location
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude: string | null;
  longitude: string | null;

  // Primary Contact
  primary_contact?: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };

  // Administrative Contact
  administrative_contact?: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };

  // Medical Director
  medical_director?: {
    name: string;
    license: string;
    specialization: string;
    years_experience: number;
  };

  // Operational Information
  bed_capacity: number;
  emergency_unit: boolean;
  icu_unit: boolean;
  is_verified: boolean;
  verification_date: string | null;
  accreditation_status: boolean;
  accreditation_expiry: string | null;

  // Digital Capabilities
  digital_infrastructure: {
    his: boolean;
    emr: boolean;
    telemedicine: boolean;
    api_integration: boolean;
    online_booking: boolean;
    patient_portal: boolean;
    mobile_app: boolean;
  };
}

/**
 * Map backend Hospital API response to frontend OrganizationProfile
 */
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    id: hospital.id,
    name: hospital.name,
    type: hospital.hospital_type,
    code: hospital.registration_number,
    address: hospital.address || '',
    phone: hospital.phone || '',
    email: hospital.email || '',
    website: hospital.website || '',
    emergency_contact: hospital.emergency_contact || '',
    city: hospital.city || '',
    state: hospital.state || '',
    country: hospital.country || '',
    postal_code: hospital.postal_code || '',
    latitude: hospital.latitude,
    longitude: hospital.longitude,

    // Primary Contact
    primary_contact: hospital.primary_contact_name ? {
      name: hospital.primary_contact_name,
      title: hospital.primary_contact_title || '',
      phone: hospital.primary_contact_phone || '',
      email: hospital.primary_contact_email || '',
    } : undefined,

    // Administrative Contact
    administrative_contact: hospital.administrative_contact_name ? {
      name: hospital.administrative_contact_name,
      title: hospital.administrative_contact_title || '',
      phone: hospital.administrative_contact_phone || '',
      email: hospital.administrative_contact_email || '',
    } : undefined,

    // Medical Director
    medical_director: hospital.medical_director_name ? {
      name: hospital.medical_director_name,
      license: hospital.medical_director_license || '',
      specialization: hospital.medical_director_specialization || '',
      years_experience: hospital.medical_director_years_experience || 0,
    } : undefined,

    // Operational
    bed_capacity: hospital.bed_capacity,
    emergency_unit: hospital.emergency_unit,
    icu_unit: hospital.icu_unit,
    is_verified: hospital.is_verified,
    verification_date: hospital.verification_date,
    accreditation_status: hospital.accreditation_status,
    accreditation_expiry: hospital.accreditation_expiry,

    // Digital Infrastructure
    digital_infrastructure: {
      his: hospital.has_hospital_information_system,
      emr: hospital.has_electronic_medical_records,
      telemedicine: hospital.has_telemedicine_capabilities,
      api_integration: hospital.has_api_integration,
      online_booking: hospital.has_online_appointment_booking,
      patient_portal: hospital.has_patient_portal,
      mobile_app: hospital.has_mobile_application,
    },
  };
}

export const OrganizationProfileService = {
  async getProfile(): Promise<OrganizationProfile> {
    try {
      // Step 1: Get the admin profile to find the hospital ID
      const profileResponse = await fetch(`${API_BASE_URL}/api/hospitals/admin/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Use HTTP-only cookies
      });

      if (!profileResponse.ok) {
        throw new Error(`Failed to fetch admin profile: ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();
      const hospitalId = profileData.hospital?.id;

      if (!hospitalId) {
        throw new Error('Hospital ID not found in admin profile');
      }

      // Step 2: Get all hospitals and find the one matching the ID
      const hospitalsResponse = await fetch(`${API_BASE_URL}/api/hospitals/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!hospitalsResponse.ok) {
        throw new Error(`Failed to fetch hospitals: ${hospitalsResponse.status}`);
      }

      const hospitalsData = await hospitalsResponse.json();
      const hospital = hospitalsData.hospitals?.find((h: HospitalApiResponse) => h.id === hospitalId);

      if (!hospital) {
        throw new Error(`Hospital with ID ${hospitalId} not found`);
      }

      // Step 3: Map and return the profile
      return mapHospitalToProfile(hospital);
    } catch (error) {
      console.error('Error fetching organization profile:', error);
      throw error;
    }
  },
};
