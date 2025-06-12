import { useOrganizationAuth } from '../features/organization/organizationAuthContext';

export interface Department {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StaffMember {
  id: number;
  email: string;
  full_name: string;
  role: string;
  role_display: string;
  department_name: string | null;
  is_available: boolean;
  availability_status: {
    is_available: boolean;
    consultation_hours_start: string | null;
    consultation_hours_end: string | null;
    next_available_slot: string | null;
  };
  phone: string | null;
  last_login: string;
  date_joined: string;
}

interface StaffResponse {
  status: string;
  total_staff: number;
  staff_members: StaffMember[];
}

interface AvailabilityResponse {
  status: string;
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

export const getAuthData = () => {
  const organizationAuth = localStorage.getItem('organizationAuth');
  if (organizationAuth) {
    try {
      const authData = JSON.parse(organizationAuth);
      return {
        token: authData.tokens?.access,
        hospitalId: authData.hospital?.id || authData.userData?.hospital?.id || authData.userData?.hospital_id
      };
    } catch (e) {
      console.error('Failed to parse organization auth data:', e);
    }
  }
  return { token: null, hospitalId: null };
};

interface CreateStaffRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'doctor' | 'nurse' | 'staff';
  department: number;
  date_of_birth?: string;
  gender?: string;
  preferred_language?: string;
  secondary_languages?: string[];
  custom_language?: string;
}

interface CreateStaffResponse {
  status: string;
  message: string;
  staff_member: StaffMember;
}

export const StaffService = {
  async fetchStaffMembers(): Promise<StaffResponse> {
    const authData = getAuthData();
    const token = authData.token;
    
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}api/staff/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Staff data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }
  },

  async updateAvailability(isAvailable: boolean): Promise<AvailabilityResponse> {
    const authData = getAuthData();
    const token = authData.token;
    
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}api/staff/availability/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_available: isAvailable
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  },

  async createStaffMember(staffData: CreateStaffRequest): Promise<CreateStaffResponse> {
    const authData = getAuthData();
    const token = authData.token;
    
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}api/staff/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create staff member');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating staff member:', error);
      throw error;
    }
  },

  async getHospitalDepartments(hospitalId: number): Promise<Department[]> {
    const authData = getAuthData();
    const token = authData.token;
    
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}api/hospitals/departments/?hospital_id=${hospitalId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.departments || [];
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }
};
