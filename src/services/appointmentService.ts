import { getAuthData } from './staffService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface Appointment {
  id: number;
  patient_name: string;
  doctor_name: string;
  department_name: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  created_at: string;
  updated_at: string;
  doctor_id?: number;
  department_id?: number;
}

export interface AppointmentsResponse {
  status: string;
  appointments: Appointment[];
  total_count: number;
}

export const AppointmentService = {
  async getAppointments(filters?: {
    status?: string;
    department_id?: number;
    doctor_id?: number;
    date_from?: string;
    date_to?: string;
  }): Promise<AppointmentsResponse> {
    const authData = getAuthData();
    const token = authData.token;
    
    if (!token) {
      throw new Error('Authentication required');
    }

    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters) {
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.department_id) queryParams.append('department_id', filters.department_id.toString());
      if (filters.doctor_id) queryParams.append('doctor_id', filters.doctor_id.toString());
      if (filters.date_from) queryParams.append('date_from', filters.date_from);
      if (filters.date_to) queryParams.append('date_to', filters.date_to);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/hospitals/appointments/?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch appointments');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },
};
