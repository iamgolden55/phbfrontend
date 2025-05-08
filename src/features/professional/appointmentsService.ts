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
    
    const rawData = await response.json();
    
    // Log the raw API response to understand its structure
    console.log('Raw API Response:', rawData);
    
    // If the response has data in nested structure, extract it
    const appointments = Array.isArray(rawData) ? rawData : 
                         rawData.appointments ? rawData.appointments : 
                         rawData.data ? rawData.data : 
                         rawData.results ? rawData.results : [];
    
    // Log the structure of the first appointment if available
    if (appointments.length > 0) {
      console.log('First appointment structure:', appointments[0]);
      console.log('Available keys in first appointment:', Object.keys(appointments[0]));
    }
    
    return appointments;
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
    
    // Log the response for debugging
    console.log('Appointment details response:', data);
    
    // Process the data to extract patient information correctly
    const processedData = { ...data };
    
    // Try to extract patient name from various possible locations
    let patientName = processedData.patient_name || 
                    processedData.patient_full_name || 
                    (processedData.patient && (processedData.patient.name || processedData.patient.full_name)) ||
                    processedData.name ||
                    processedData.full_name ||
                    processedData.customer_name || 
                    processedData.user_name ||
                    processedData.client_name;
                    
    // If we found a name, ensure it's stored in the patient_name field
    if (patientName) {
      processedData.patient_name = patientName;
    }
    
    // Similarly handle patient ID
    let patientId = processedData.patient_id || 
                   (processedData.patient && processedData.patient.id) ||
                   processedData.user_id ||
                   processedData.customer_id ||
                   processedData.client_id;
                   
    if (patientId) {
      processedData.patient_id = patientId;
    }
    
    // Similarly handle patient email
    let patientEmail = processedData.patient_email || 
                     (processedData.patient && processedData.patient.email) ||
                     processedData.email;
                     
    if (patientEmail) {
      processedData.patient_email = patientEmail;
    }
    
    // If we still don't have patient name but have an ID, create a placeholder name
    if (!processedData.patient_name && processedData.appointment_id) {
      processedData.patient_name = `Patient #${processedData.appointment_id.slice(-6)}`;
    }
    
    console.log("Processed appointment details:", processedData);
    return processedData;
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
 * @param medicalSummary Required medical summary when status is 'completed'
 * @returns Promise that resolves to the updated appointment with notification status
 */
export async function updateAppointmentStatus(
  appointmentId: string, 
  status: 'confirmed' | 'cancelled' | 'completed' | 'rescheduled' | 'no_show', 
  notes?: string,
  medicalSummary?: string
) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  // Check if medical summary is required but not provided
  if (status === 'completed' && !medicalSummary) {
    throw new Error('Medical summary is required when completing an appointment');
  }
  
  try {
    const requestBody: any = { status };
    
    // Add notes if provided
    if (notes) {
      requestBody.notes = notes;
    }
    
    // Add medical_summary if status is completed
    if (status === 'completed' && medicalSummary) {
      requestBody.medical_summary = medicalSummary;
    }
    
    const response = await fetch(`${API_BASE_URL}/api/doctor-appointments/${appointmentId}/status/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error updating appointment status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Log notification status if available
    if (data.notification) {
      console.log('Notification status:', data.notification);
    }
    
    return data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
} 