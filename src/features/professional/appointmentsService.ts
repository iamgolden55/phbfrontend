import { API_BASE_URL } from '../../utils/config';

const AUTH_TOKEN_KEY = 'phb_auth_token';

/**
 * Fetch all appointments for the doctor
 * @returns Promise that resolves to an array of appointments
 */
export async function fetchDoctorAppointments() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/doctor-appointments/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching appointments: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    throw error;
  }
}

/**
 * Fetch a specific appointment for the doctor
 * @param appointmentId The ID of the appointment to fetch
 * @returns Promise that resolves to the appointment details
 */
export async function fetchDoctorAppointmentDetails(appointmentId: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/doctor-appointments/${appointmentId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching appointment details: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor appointment details:', error);
    throw error;
  }
}

/**
 * Fetch regular patient appointments with the option to view as doctor
 * @param viewAsDoctor Whether to view appointments as a doctor
 * @returns Promise that resolves to an array of appointments
 */
export async function fetchAppointments(viewAsDoctor: boolean = false) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  // If viewAsDoctor is true, use the doctor-appointments endpoint
  // to fetch appointments where the doctor is the provider.
  // Otherwise, use the regular appointments endpoint for patient appointments.
  const url = viewAsDoctor 
    ? `${API_BASE_URL}/api/doctor-appointments/` 
    : `${API_BASE_URL}/api/appointments/`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching appointments: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

/**
 * Update appointment status (confirm, cancel, complete)
 * @param appointmentId The ID of the appointment to update
 * @param status The new status for the appointment
 * @param notes Optional notes for the status update
 * @returns Promise that resolves to the updated appointment
 */
export async function updateAppointmentStatus(
  appointmentId: string, 
  status: 'confirmed' | 'cancelled' | 'completed' | 'rescheduled', 
  notes?: string
) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/doctor-appointments/${appointmentId}/status/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        notes,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error updating appointment status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
} 