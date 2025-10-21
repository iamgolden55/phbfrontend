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

export interface ConflictCheckResponse {
  has_conflict: boolean;
  conflict_details?: {
    existing_appointment_id: string;
    department: string;
    date: string;
    time: string;
    status: string;
    formatted_date: string;
    formatted_time: string;
  };
  message: string;
}

export const AppointmentService = {
  async getAppointments(filters?: {
    status?: string;
    department_id?: number;
    doctor_id?: number;
    date_from?: string;
    date_to?: string;
  }): Promise<AppointmentsResponse> {
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
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
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

  async checkAppointmentConflict({
    department,
    date,
    time = '00:00'
  }: {
    department: number;
    date: string; // YYYY-MM-DD format
    time?: string; // HH:MM format
  }): Promise<ConflictCheckResponse> {
    const queryParams = new URLSearchParams({
      department: department.toString(),
      date,
      time
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/check-conflict/?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check appointment conflicts');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking appointment conflict:', error);
      throw error;
    }
  },
};
