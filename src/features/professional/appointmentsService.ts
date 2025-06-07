import { API_BASE_URL, createApiUrl } from '../../utils/config';

const AUTH_TOKEN_KEY = 'phb_auth_token';

// Define types for appointment data
export interface AppointmentSummary {
  pending_department_count: number;
  my_appointments_count: {
    confirmed: number;
    in_progress: number;
    completed: number;
    cancelled: number;
    no_show: number;
    total: number;
  };
  today_appointments: number;
  upcoming_appointments: number;
}

export interface DoctorInfo {
  id: number;
  name: string;
  email: string;
  specialization: string;
  department: {
    id: number;
    name: string;
  };
  hospital: {
    id: number;
    name: string;
  };
}

export interface AppointmentResponse {
  pending_department_appointments: any[];
  my_appointments: {
    confirmed: any[];
    in_progress: any[];
    completed: any[];
    cancelled: any[];
    no_show: any[];
    all: any[];
  };
  doctor_info: DoctorInfo;
  summary: AppointmentSummary;
}

// Create a basic appointment interface
export interface Appointment {
  appointment_id: string;
  status: string;
  priority: string;
  appointment_date: string;
  [key: string]: any; // Allow other properties
}

/**
 * Fetch all appointments for the doctor's department and the doctor's own appointments
 * @param filters Optional query parameters for filtering
 * @returns Promise that resolves to the appointment data
 */
export async function fetchDoctorAppointments(filters?: {
  status?: string;
  start_date?: string;
  end_date?: string;
  priority?: string;
  doctor_id?: number;
}) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    // Build the query string from filters
    let queryParams = '';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.doctor_id) params.append('doctor_id', filters.doctor_id.toString());
      queryParams = `?${params.toString()}`;
    }
    
    const response = await fetch(`${API_BASE_URL}api/department-pending-appointments/${queryParams}`, {
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
    
    console.log('Raw data:', data);
    
    // Check if the response follows the new format
    if (data.pending_department_appointments !== undefined && 
        data.my_appointments !== undefined && 
        data.doctor_info !== undefined) {
      // Return the complete response for the new format
      return data as AppointmentResponse;
    }
    
    // If it's still using the old format, transform it to match the expected structure
    const appointments = Array.isArray(data) ? data : 
                         data.appointments ? data.appointments : 
                         data.data ? data.data : 
                         data.results ? data.results : [];
    console.log('Appointments:', appointments);
    
    // Log the structure of the first appointment if available
    if (appointments.length > 0) {
      console.log('First appointment structure:', appointments[0]);
      console.log('Available keys in first appointment:', Object.keys(appointments[0]));
    }
    
    // Create a mock structure that matches the new format
    const mockResponse: AppointmentResponse = {
      pending_department_appointments: appointments.filter((a: Appointment) => a.status === 'pending'),
      my_appointments: {
        confirmed: appointments.filter((a: Appointment) => a.status === 'confirmed'),
        in_progress: appointments.filter((a: Appointment) => a.status === 'in_progress'),
        completed: appointments.filter((a: Appointment) => a.status === 'completed'),
        cancelled: appointments.filter((a: Appointment) => a.status === 'cancelled'),
        no_show: appointments.filter((a: Appointment) => a.status === 'no_show'),
        all: appointments
      },
      doctor_info: {
        id: 0,
        name: '',
        email: '',
        specialization: '',
        department: { id: 0, name: '' },
        hospital: { id: 0, name: '' }
      },
      summary: {
        pending_department_count: appointments.filter((a: Appointment) => a.status === 'pending').length,
        my_appointments_count: {
          confirmed: appointments.filter((a: Appointment) => a.status === 'confirmed').length,
          in_progress: appointments.filter((a: Appointment) => a.status === 'in_progress').length,
          completed: appointments.filter((a: Appointment) => a.status === 'completed').length,
          cancelled: appointments.filter((a: Appointment) => a.status === 'cancelled').length,
          no_show: appointments.filter((a: Appointment) => a.status === 'no_show').length,
          total: appointments.length
        },
        today_appointments: 0,
        upcoming_appointments: 0
      }
    };
    
    return mockResponse;
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
    const response = await fetch(`${API_BASE_URL}api/doctor-appointments/${appointmentId}/`, {
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
    
    return processedData;
  } catch (error) {
    console.error('Error fetching doctor appointment details:', error);
    throw error;
  }
}

/**
 * Accept an appointment as a doctor
 * @param appointmentId The ID of the appointment to accept
 * @returns Promise that resolves to the updated appointment
 */
export async function acceptAppointment(appointmentId: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/accept/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error accepting appointment: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Accepted appointment:', data);
    return data;
  } catch (error) {
    console.error('Error accepting appointment:', error);
    throw error;
  }
}

/**
 * Start a consultation for an appointment
 * @param appointmentId The ID of the appointment to start consultation for
 * @returns Promise that resolves to the updated appointment
 */
export async function startConsultation(appointmentId: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/start-consultation/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error starting consultation: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Started consultation:', data);
    return data;
  } catch (error) {
    console.error('Error starting consultation:', error);
    throw error;
  }
}

/**
 * Complete a consultation for an appointment
 * @param appointmentId The ID of the appointment to complete consultation for
 * @param notes The doctor's notes for the consultation
 * @returns Promise that resolves to the updated appointment
 */
export async function completeConsultation(appointmentId: string, notes: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/complete-consultation/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error completing consultation: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Completed consultation:', data);
    return data;
  } catch (error) {
    console.error('Error completing consultation:', error);
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
    ? createApiUrl('api/doctor-appointments/') 
    : createApiUrl('api/appointments/');
  
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
  status: 'confirmed' | 'cancelled' | 'completed' | 'rescheduled' | 'no_show' | 'in_progress', 
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
    return data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
}

/**
 * Add notes to an appointment without changing its status
 * @param appointmentId The ID of the appointment to add notes to
 * @param notes The doctor's notes to add
 * @returns Promise that resolves to the updated appointment
 */
export async function addDoctorNotes(appointmentId: string, notes: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  if (!notes || !notes.trim()) {
    throw new Error('Notes cannot be empty');
  }
  
  try {
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/add-notes/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error adding notes: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Added notes:', data);
    return data;
  } catch (error) {
    console.error('Error adding doctor notes:', error);
    throw error;
  }
}

/**
 * Cancel an appointment using the dedicated endpoint
 * @param appointmentId The ID of the appointment to cancel
 * @param reason Optional reason for cancellation
 * @returns Promise that resolves to the updated appointment
 */
export async function cancelAppointment(appointmentId: string, reason?: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  if (!reason || !reason.trim()) {
    throw new Error('Cancellation reason is required');
  }
  
  try {
    const requestBody = {
      cancellation_reason: reason
    };
    
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/cancel/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error cancelling appointment: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Cancelled appointment:', data);
    return data;
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
}

/**
 * Mark an appointment as no-show using the dedicated endpoint
 * @param appointmentId The ID of the appointment to mark as no-show
 * @param notes Optional notes about the no-show
 * @returns Promise that resolves to the updated appointment
 */
export async function markAppointmentNoShow(appointmentId: string, notes?: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const requestBody: any = {};
    
    // Add notes if provided
    if (notes) {
      requestBody.notes = notes;
    }
    
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/no-show/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error marking appointment as no-show: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Marked appointment as no-show:', data);
    return data;
  } catch (error) {
    console.error('Error marking appointment as no-show:', error);
    throw error;
  }
}

/**
 * Interface for prescription medication
 */
export interface PrescriptionMedication {
  id: number;
  medication_name: string;
  generic_name?: string;
  strength: string;
  form: string;
  route: string;
  dosage: string;
  frequency: string;
  duration?: string;
  patient_instructions: string;
  indication: string;
  status?: string;
  status_display?: string;
  start_date?: string;
  end_date?: string;
  is_ongoing?: boolean;
  catalog_details?: any;
  prescribed_by?: number;
  patient_name?: string;
  doctor_name?: string;
  pharmacy_name?: string;
  prescription_number?: string;
  refills_authorized?: number;
  refills_remaining?: number;
  side_effects_experienced?: string;
}

/**
 * Interface for prescription response
 */
export interface PrescriptionResponse {
  status: string;
  appointment_id: string;
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  medication_count: number;
  medications: PrescriptionMedication[];
}

/**
 * Add prescriptions to an appointment
 * @param appointmentId The ID of the appointment to add prescriptions to
 * @param medications Array of medications to prescribe
 * @returns Promise that resolves to the created prescriptions
 */
export async function addAppointmentPrescriptions(appointmentId: string, medications: PrescriptionMedication[]) {
const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
if (!token) {
  throw new Error('Authentication required');
}
  if (!token) {
    throw new Error('Authentication required');
  }
  
  if (!medications || medications.length === 0) {
    throw new Error('At least one medication is required');
  }
  console.log('medications', medications)
  try {
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/prescriptions/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ medications }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error adding prescriptions: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Added prescriptions:', data);
    return data;
  } catch (error) {
    console.error('Error adding prescriptions:', error);
    throw error;
  }
}

/**
 * Get prescriptions for an appointment
 * @param appointmentId The ID of the appointment to get prescriptions for
 * @returns Promise that resolves to the appointment prescriptions
 */
export async function getAppointmentPrescriptions(appointmentId: string) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/prescriptions/view/`), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error getting prescriptions: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Retrieved prescriptions:', data);
    return data;
  } catch (error) {
    console.error('Error getting prescriptions:', error);
    throw error;
  }
}

/**
 * Fetch patient medical records for the professional view
 * @param patientId The ID of the patient
 * @returns Promise that resolves to the patient's medical records
 */
export async function getPatientMedicalRecords(patientId: string | number) {
  if (!patientId) {
    throw new Error('Patient ID is required to fetch medical records');
  }

  // Get the auth token
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) {
    throw new Error('Authentication required');
  }

  const url = `${API_BASE_URL}/api/professional/patients/${patientId}/medical-records/`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('You are not authorized to view this patient\'s medical records');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch patient medical records: ${response.status}`);
    }

    const data = await response.json();
    console.log('Retrieved patient medical records:', data);
    return data;
  } catch (error) {
    console.error('Error fetching patient medical records:', error);
    throw error;
  }
}

/**
 * Fetch appointment notes
 * @param appointmentId The ID of the appointment to fetch notes for
 * @returns Promise that resolves to the appointment notes
 */
export const fetchAppointmentNotes = async (appointmentId: string) => {
  try {
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/notes/`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch appointment notes: ${response.status}`);
    }

    const data = await response.json();
    console.log('Retrieved appointment notes:', data);
    return data;
  } catch (error) {
    console.error('Error fetching appointment notes:', error);
    throw error;
  }
};

/**
 * Edit appointment notes
 * @param appointmentId The ID of the appointment to edit notes for
 * @param notes Object containing updated notes
 * @returns Promise that resolves to the updated notes
 */
export const editAppointmentNotes = async (appointmentId: string, notes: { general_notes?: string; doctor_notes?: string }) => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) throw new Error('No authentication token found');
    console.log('Editing appointment notes:', notes);
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/notes/edit/`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(notes)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to edit appointment notes: ${response.status}`);
    }

    const data = await response.json();
    console.log('Updated appointment notes:', data);
    return data;
  } catch (error) {
    console.error('Error editing appointment notes:', error);
    throw error;
  }
};

/**
 * Delete appointment notes
 * @param appointmentId The ID of the appointment to delete notes for
 * @returns Promise that resolves to the deletion status
 */
export const deleteAppointmentNotes = async (appointmentId: string) => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) throw new Error('No authentication token found');
    
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/notes/delete/`), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete appointment notes: ${response.status}`);
    }

    const data = await response.json();
    console.log('Deleted appointment notes:', data);
    return data;
  } catch (error) {
    console.error('Error deleting appointment notes:', error);
    throw error;
  }
};

/**
 * Interface for referral request
 */
export interface ReferralRequest {
  referred_to_hospital?: number;
  referred_to_department?: number;
  referral_reason: string;
}

/**
 * Refer an appointment to another hospital or department
 * @param appointmentId The ID of the appointment to refer
 * @param referralData The referral data (hospital or department ID and reason)
 * @returns Promise that resolves to the referral response
 */
export const referAppointment = async (appointmentId: string, referralData: ReferralRequest) => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) throw new Error('No authentication token found');
    console.log('Refer appointment:', referralData);
    const response = await fetch(createApiUrl(`api/appointments/${appointmentId}/refer/`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(referralData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to refer appointment: ${response.status}`);
    }

    const data = await response.json();
    console.log('Referred appointment:', data);
    return data;
  } catch (error) {
    console.error('Error referring appointment:', error);
    throw error;
  }
};

/**
 * Fetch hospitals
 * @returns Promise that resolves to the list of hospitals
 */
export async function fetchHospitals() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}api/hospitals/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching hospitals: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw error;
  }
}

/**
 * Fetch departments by hospital ID
 * @param hospitalId The ID of the hospital to fetch departments for
 * @returns Promise that resolves to the list of departments
 */
export async function fetchDepartments(hospitalId: number) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}api/departments/${hospitalId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching departments: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.status === 'success') {
      return data.departments;
    } else {
      throw new Error(data.message || 'Failed to fetch departments');
    }
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
}
