import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  fetchDoctorAppointments, 
  updateAppointmentStatus, 
  fetchDoctorAppointmentDetails,
  acceptAppointment,
  startConsultation,
  completeConsultation,
  cancelAppointment,
  markAppointmentNoShow
} from '../../features/professional/appointmentsService';
import { useAuth } from '../../features/auth/authContext';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';

interface Appointment {
  id: number;
  appointment_id: string;
  doctor_full_name: string;
  patient_name: string;
  hospital_name: string;
  department_name: string;
  appointment_date: string;
  formatted_date: string;
  formatted_time: string;
  formatted_date_time: string;
  duration: number;
  appointment_type: string;
  formatted_appointment_type: string;
  priority: string;
  formatted_priority: string;
  status: string;
  status_display: string;
  chief_complaint: string;
  created_at: string;
  patient?: {
    id: number;
    name: string;
    age?: number;
    gender?: string;
  };
  patient_full_name?: string;
  patient_id?: string;
  notification_status?: string;
  notification_message?: string;
  notification_details?: {
    email_sent?: {
      success: boolean;
      recipient: string;
      notification_id: number;
      notification_status: string;
      calendar_attached: boolean;
      appointment_status: string;
      sent_at: string;
    };
    details?: Array<{
      id: number;
      type: string;
      status: string;
      created_at: string;
      sent_at: string;
    }>;
  };
  is_own_appointment?: boolean;
  is_department_pending?: boolean;
}

interface NotificationStatus {
  id: string;
  status: string;
  message?: string;
  recipient?: string;
  sentAt?: string;
  calendarAttached?: boolean;
  details?: Array<{
    id: number;
    type: string;
    status: string;
    created_at: string;
    sent_at: string;
  }>;
}

const ProfessionalAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('upcoming');
  const [statusUpdateLoading, setStatusUpdateLoading] = useState<string | null>(null);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionAppointmentId, setCompletionAppointmentId] = useState<string | null>(null);
  const [medicalSummary, setMedicalSummary] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  
  // Get data from both auth contexts
  const { user, isAuthenticated: mainIsAuthenticated, isLoading: mainIsLoading, isDoctor } = useAuth();
  const { professionalUser, isAuthenticated: profIsAuthenticated, isLoading: profIsLoading } = useProfessionalAuth();
  const navigate = useNavigate();

  // Check if the user is authenticated and is a doctor
  const isAuthLoading = mainIsLoading || profIsLoading;
  const isAuthenticated = mainIsAuthenticated && isDoctor;

  // Redirect if not authenticated or not a doctor
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!isAuthenticated) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointments();
        
        // Process the data to properly handle patient information for both appointment types
        const processMyAppointments = data.my_appointments.all.map((appointment: any) => {
          const processed = { ...appointment };
          
          let patientName = processed.patient_name || 
                          processed.patient_full_name || 
                          (processed.patient && (processed.patient.name || processed.patient.full_name)) ||
                          processed.name ||
                          processed.full_name ||
                          processed.customer_name || 
                          processed.user_name ||
                          processed.client_name;
          
          let patientId = processed.patient_id ||
                          (processed.patient && processed.patient.id) ||
                          processed.user_id ||
                          processed.customer_id ||
                          processed.client_id;
                          
          if (patientName) processed.patient_name = patientName;
          if (patientId) processed.patient_id = patientId;
          
          // Ensure status_display is properly capitalized
          if (processed.status && !processed.status_display) {
            processed.status_display = processed.status.charAt(0).toUpperCase() + processed.status.slice(1).replace('_', ' ');
          }
          
          // Mark as doctor's own appointment
          processed.is_own_appointment = true;
          
          return processed;
        });
        
        // Process department pending appointments
        const processDeptPendingAppointments = data.pending_department_appointments.map((appointment: any) => {
          const processed = { ...appointment };
          
          let patientName = processed.patient_name || 
                          processed.patient_full_name || 
                          (processed.patient && (processed.patient.name || processed.patient.full_name)) ||
                          processed.name ||
                          processed.full_name ||
                          processed.customer_name || 
                          processed.user_name ||
                          processed.client_name;
          
          let patientId = processed.patient_id ||
                          (processed.patient && processed.patient.id) ||
                          processed.user_id ||
                          processed.customer_id ||
                          processed.client_id;
                          
          if (patientName) processed.patient_name = patientName;
          if (patientId) processed.patient_id = patientId;
          
          // Ensure status_display is properly capitalized
          if (processed.status && !processed.status_display) {
            processed.status_display = processed.status.charAt(0).toUpperCase() + processed.status.slice(1).replace('_', ' ');
          }
          
          // Mark as department pending appointment
          processed.is_department_pending = true;
          
          return processed;
        });

        // Combine both types of appointments
        const allAppointments = [...processMyAppointments, ...processDeptPendingAppointments];
        
        // For appointments without patient names, try to fetch patient details
        const appointmentsWithDetailsFetched = await Promise.all(
          allAppointments.map(async (appointment: any) => {
            if (!appointment.patient_name || appointment.patient_name === 'No Patient Name Available') {
              try {
                const details = await fetchDoctorAppointmentDetails(appointment.appointment_id);
                let patientName = details.patient_name || 
                                 details.patient_full_name || 
                                 (details.patient && (details.patient.name || details.patient.full_name)) ||
                                 details.name ||
                                 details.full_name ||
                                 details.customer_name || 
                                 details.user_name;
                if (patientName) {
                  return { ...appointment, patient_name: patientName };
                }
              } catch (err) {
                console.error(`Failed to fetch details for appointment ${appointment.appointment_id}:`, err);
              }
            }
            return appointment;
          })
        );
        
        setAppointments(appointmentsWithDetailsFetched);
      } catch (err: any) {
        console.error('Failed to load doctor appointments:', err);
        setError(err.message || 'Failed to load doctor appointments');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, [isAuthenticated]);

  const handleBackToDashboard = () => {
    navigate('/professional/dashboard');
  };

  const handleViewAppointment = (appointmentId: string) => {
    navigate(`/professional/appointments/${appointmentId}`);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    const now = new Date();
    
    if (activeFilter === 'upcoming') {
      return appointmentDate >= now && (appointment.status === 'confirmed' || appointment.status === 'pending');
    } else if (activeFilter === 'past') {
      return appointmentDate < now && (appointment.status === 'completed' || appointment.status === 'cancelled');
    } else if (activeFilter === 'cancelled') {
      return appointment.status === 'cancelled';
    } else if (activeFilter === 'in_progress') {
      return appointment.status === 'in_progress';
    } else if (activeFilter === 'department_pending') {
      return appointment.is_department_pending === true;
    } else if (activeFilter === 'all') {
      return true;
    }
    return false;
  });

  const handleCompleteClick = (appointmentId: string) => {
    setCompletionAppointmentId(appointmentId);
    const appointment = appointments.find(a => a.appointment_id === appointmentId);
    
    if (appointment) {
      const appointmentDate = appointment.appointment_date?.split('T')[0] || new Date().toISOString().split('T')[0];
      const appointmentTime = appointment.formatted_time ? 
        convertTimeFormat(appointment.formatted_time) : 
        new Date().toTimeString().slice(0, 5);
      
      setMeetingStartTime(`${appointmentDate}T${appointmentTime}`);
      
      const now = new Date();
      const endDate = now.toISOString().split('T')[0];
      const endTime = now.toTimeString().slice(0, 5);
      setMeetingEndTime(`${endDate}T${endTime}`);
    } else {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().slice(0, 5);
      setMeetingStartTime(`${dateStr}T${timeStr}`);
      
      const endTime = new Date(now.getTime() + 30 * 60000);
      const endDateStr = endTime.toISOString().split('T')[0];
      const endTimeStr = endTime.toTimeString().slice(0, 5);
      setMeetingEndTime(`${endDateStr}T${endTimeStr}`);
    }
    
    setShowCompletionModal(true);
  };
  
  const convertTimeFormat = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = modifier === 'AM' ? '00' : '12';
    } else if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  const handleSubmitCompletion = async () => {
    if (!completionAppointmentId || !medicalSummary.trim()) {
      setError('Medical summary is required');
      return;
    }

    if (!meetingStartTime || !meetingEndTime) {
      setError('Meeting start and end times are required');
      return;
    }

    try {
      const startTimeFormatted = new Date(meetingStartTime).toISOString();
      const endTimeFormatted = new Date(meetingEndTime).toISOString();
      const enhancedSummary = `Meeting Time: ${startTimeFormatted} to ${endTimeFormatted}\n\n${medicalSummary}`;
      
      // Use the completeConsultation endpoint
      const result = await completeConsultation(completionAppointmentId, enhancedSummary);
      
      // Update the appointment in the list
      setAppointments(appointments.map(appointment => {
        if (appointment.appointment_id === completionAppointmentId) {
          return {
            ...appointment,
            status: 'completed',
            status_display: 'Completed',
          };
        }
        return appointment;
      }));
      
      setStatusUpdateSuccess(`Consultation for appointment ${completionAppointmentId} has been completed successfully`);
      
      setShowCompletionModal(false);
      setCompletionAppointmentId(null);
      setMedicalSummary('');
      setMeetingStartTime('');
      setMeetingEndTime('');
      
      setTimeout(() => setStatusUpdateSuccess(null), 5000);
    } catch (err: any) {
      console.error('Error submitting completion:', err);
      setError(err.message || 'Failed to submit completion information');
      setTimeout(() => setError(null), 5000);
    }
  };

  const processNotificationResponse = (notification: any, appointmentId?: string) => {
    if (!notification) return null;
    
    const notificationData: any = {
      status: 'unknown',
      message: null
    };
    
    if (appointmentId) notificationData.id = appointmentId;
    
    if (typeof notification === 'string' || notification.status) {
      notificationData.status = notification.status || 'unknown';
      notificationData.message = notification.message;
    }
    
    if (notification.email_sent) {
      notificationData.status = notification.email_sent.notification_status;
      notificationData.recipient = notification.email_sent.recipient;
      notificationData.sentAt = notification.email_sent.sent_at;
      notificationData.calendarAttached = notification.email_sent.calendar_attached;
    }
    
    if (notification.details && Array.isArray(notification.details)) {
      notificationData.details = notification.details;
    }
    
    return notificationData;
  };

  const handleStatusChange = async (appointmentId: string, newStatus: string, summary?: string) => {
    setStatusUpdateLoading(appointmentId);
    
    try {
      let result;
      
      // Use the dedicated endpoints for specific status changes
      if (newStatus === 'cancelled') {
        result = await cancelAppointment(appointmentId, summary);
      } else if (newStatus === 'no_show') {
        result = await markAppointmentNoShow(appointmentId, summary);
      } else {
        // Use the general status update endpoint for other statuses
        result = await updateAppointmentStatus(
          appointmentId, 
          newStatus as 'confirmed' | 'cancelled' | 'completed' | 'rescheduled' | 'no_show' | 'in_progress',
          summary
        );
      }
      
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification, appointmentId));
      }
      
      setAppointments(appointments.map(appointment => {
        if (appointment.appointment_id === appointmentId) {
          const updatedAppointment = {
            ...appointment,
            status: newStatus,
            status_display: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
          };
          
          if (result.notification) {
            if (result.notification.status) {
              updatedAppointment.notification_status = result.notification.status;
              updatedAppointment.notification_message = result.notification.message;
            }
            
            if (result.notification.email_sent || result.notification.details) {
              updatedAppointment.notification_details = {
                email_sent: result.notification.email_sent,
                details: result.notification.details
              };
            }
          }
          
          return updatedAppointment;
        }
        return appointment;
      }));
      
      setStatusUpdateSuccess(`Appointment ${newStatus} successfully` + 
        (result.notification ? ` | Notification: ${
          result.notification.email_sent?.notification_status || 
          result.notification.status || 
          'processed'
        }` : ''));
      
      setTimeout(() => setStatusUpdateSuccess(null), 5000);
    } catch (err: any) {
      console.error(`Failed to update appointment status to ${newStatus}:`, err);
      setError(err.message || `Failed to update appointment status to ${newStatus}`);
      setTimeout(() => setError(null), 5000);
    } finally {
      setStatusUpdateLoading(null);
    }
  };
  
  const formatPatientId = (appointment: Appointment) => {
    const patientId = appointment.patient_id || 
                     (appointment.patient && appointment.patient.id) || 
                     appointment.appointment_id;
    return `ID: ${patientId || appointment.appointment_id}`;
  };

  // Handle start consultation button click
  const handleStartConsultation = async (appointmentId: string) => {
    setStatusUpdateLoading(appointmentId);
    try {
      const result = await startConsultation(appointmentId);
      
      // Update the appointment in the list
      setAppointments(appointments.map(appointment => {
        if (appointment.appointment_id === appointmentId) {
          return {
            ...appointment,
            status: 'in_progress',
            status_display: 'In Progress',
          };
        }
        return appointment;
      }));
      
      setStatusUpdateSuccess(`Consultation for appointment ${appointmentId} has started`);
      setTimeout(() => setStatusUpdateSuccess(null), 5000);
    } catch (err: any) {
      console.error(`Failed to start consultation:`, err);
      setError(err.message || `Failed to start consultation`);
      setTimeout(() => setError(null), 5000);
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  // Handle accepting an appointment
  const handleAcceptAppointment = async (appointmentId: string) => {
    setStatusUpdateLoading(appointmentId);
    
    try {
      const result = await acceptAppointment(appointmentId);
      
      // Find the appointment that's being accepted
      const appointmentToAccept = appointments.find(app => app.appointment_id === appointmentId);
      
      // Update the appointments list
      setAppointments(appointments.map(appointment => {
        if (appointment.appointment_id === appointmentId) {
          return {
            ...appointment,
            status: 'confirmed',
            status_display: 'Confirmed',
            is_department_pending: false, // No longer a pending department appointment
            is_own_appointment: true // Now owned by this doctor
          };
        }
        return appointment;
      }));
      
      setStatusUpdateSuccess(`Appointment ${appointmentId} has been accepted successfully`);
      setTimeout(() => setStatusUpdateSuccess(null), 5000);
    } catch (err: any) {
      console.error(`Failed to accept appointment:`, err);
      setError(err.message || `Failed to accept appointment`);
      setTimeout(() => setError(null), 5000);
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  // Handle cancellation using the dedicated endpoint
  const handleCancelAppointment = async (appointmentId: string) => {
    setStatusUpdateLoading(appointmentId);
    
    try {
      const reason = prompt('Please provide a reason for cancellation (required):');
      if (reason === null) {
        // User cancelled the prompt
        setStatusUpdateLoading(null);
        return;
      }
      
      if (!reason.trim()) {
        // Empty reason provided
        setError('A cancellation reason is required');
        setTimeout(() => setError(null), 5000);
        setStatusUpdateLoading(null);
        return;
      }
      
      const result = await cancelAppointment(appointmentId, reason);
      
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification, appointmentId));
      }
      
      // Update the appointment in the list
      setAppointments(appointments.map(appointment => {
        if (appointment.appointment_id === appointmentId) {
          return {
            ...appointment,
            status: 'cancelled',
            status_display: 'Cancelled',
          };
        }
        return appointment;
      }));
      
      setStatusUpdateSuccess(`Appointment cancelled successfully`);
      setTimeout(() => setStatusUpdateSuccess(null), 5000);
    } catch (err: any) {
      console.error(`Failed to cancel appointment:`, err);
      setError(err.message || `Failed to cancel appointment`);
      setTimeout(() => setError(null), 5000);
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  // Handle no-show using the dedicated endpoint
  const handleNoShowAppointment = async (appointmentId: string) => {
    setStatusUpdateLoading(appointmentId);
    
    try {
      const result = await markAppointmentNoShow(appointmentId);
      
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification, appointmentId));
      }
      
      // Update the appointment in the list
      setAppointments(appointments.map(appointment => {
        if (appointment.appointment_id === appointmentId) {
          return {
            ...appointment,
            status: 'no_show',
            status_display: 'No Show',
          };
        }
        return appointment;
      }));
      
      setStatusUpdateSuccess(`Appointment marked as no-show successfully`);
      setTimeout(() => setStatusUpdateSuccess(null), 5000);
    } catch (err: any) {
      console.error(`Failed to mark appointment as no-show:`, err);
      setError(err.message || `Failed to mark appointment as no-show`);
      setTimeout(() => setError(null), 5000);
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  // Show loading state while authentication is being checked
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated or not a doctor, this will redirect (see useEffect above)
  if (!isAuthenticated) {
    return null;
  }

  // Get the doctor's name
  const doctorName = professionalUser?.name || user?.full_name || 'Doctor';

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>My Appointments | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>
          <p className="mt-2 text-gray-600">
            Manage appointments for Dr. {doctorName}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            View and manage both your assigned appointments and pending department appointments that need assignment.
          </p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Back to Dashboard
        </button>
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'upcoming'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveFilter('department_pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'department_pending'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Department Pending
          </button>
          <button
            onClick={() => setActiveFilter('in_progress')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'in_progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveFilter('past')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'past'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setActiveFilter('cancelled')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'cancelled'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Cancelled
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
        </div>
        
        {activeFilter === 'department_pending' && (
          <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
            <p>
              <strong>Department Pending:</strong> These are appointments waiting for a doctor in your department to accept. Click "Accept" to take responsibility for these appointments.
            </p>
          </div>
        )}
      </div>
      
      {statusUpdateSuccess && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{statusUpdateSuccess}</span>
        </div>
      )}
      
      {notificationStatus && (
        <div className={`mb-6 px-4 py-3 rounded relative ${
          notificationStatus.status === 'sent' ? 'bg-green-100 border border-green-400 text-green-700' :
          notificationStatus.status === 'pending' ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' :
          'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <span className="font-medium">Notification status for Appointment {notificationStatus.id}: {notificationStatus.status}</span>
          {notificationStatus.message && (
            <p className="block sm:inline mt-1">{notificationStatus.message}</p>
          )}
          
          {notificationStatus.recipient && (
            <div className="mt-2 text-sm">
              <p><strong>Recipient:</strong> {notificationStatus.recipient}</p>
              {notificationStatus.sentAt && (
                <p><strong>Sent at:</strong> {new Date(notificationStatus.sentAt).toLocaleString()}</p>
              )}
              {notificationStatus.calendarAttached !== undefined && (
                <p><strong>Calendar attached:</strong> {notificationStatus.calendarAttached ? 'Yes' : 'No'}</p>
              )}
            </div>
          )}
          
          {notificationStatus.details && notificationStatus.details.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Notification details:</p>
              <ul className="list-disc pl-5 mt-1 text-sm">
                {notificationStatus.details.map((detail, index) => (
                  <li key={index}>
                    {detail.type} notification - Status: {detail.status}
                    {detail.sent_at && ` (Sent: ${new Date(detail.sent_at).toLocaleString()})`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            <p>{error}</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <p>No appointments found for the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital / Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className={appointment.is_department_pending ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patient_name || 
                         (appointment.patient && appointment.patient.name) || 
                         `Patient #${appointment.appointment_id.slice(-6)}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPatientId(appointment)}
                        {appointment.is_department_pending && 
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Department
                          </span>
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.formatted_date}</div>
                      <div className="text-sm text-gray-500">{appointment.formatted_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.hospital_name}</div>
                      <div className="text-sm text-gray-500">{appointment.department_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.formatted_appointment_type}</div>
                      <div className="text-sm text-gray-500">{appointment.formatted_priority}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status_display}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewAppointment(appointment.appointment_id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      
                      {appointment.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleAcceptAppointment(appointment.appointment_id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                            disabled={statusUpdateLoading === appointment.appointment_id}
                          >
                            {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'Accept'}
                          </button>
                          {!appointment.is_department_pending && (
                            <button 
                              onClick={() => handleCancelAppointment(appointment.appointment_id)}
                              className="text-red-600 hover:text-red-900"
                              disabled={statusUpdateLoading === appointment.appointment_id}
                            >
                              {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'Cancel'}
                            </button>
                          )}
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <>
                          <button 
                            onClick={() => handleStartConsultation(appointment.appointment_id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                            disabled={statusUpdateLoading === appointment.appointment_id}
                          >
                            {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'Start Consultation'}
                          </button>
                          <button 
                            onClick={() => handleNoShowAppointment(appointment.appointment_id)}
                            className="text-gray-600 hover:text-gray-900"
                            disabled={statusUpdateLoading === appointment.appointment_id}
                          >
                            {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'No Show'}
                          </button>
                        </>
                      )}
                      
                      {appointment.status === 'in_progress' && (
                        <button 
                          onClick={() => handleCompleteClick(appointment.appointment_id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          disabled={statusUpdateLoading === appointment.appointment_id}
                        >
                          {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'Complete Consultation'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Complete appointment modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Appointment Completion</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Start Date/Time
              </label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={meetingStartTime}
                onChange={(e) => setMeetingStartTime(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting End Date/Time
              </label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={meetingEndTime}
                onChange={(e) => setMeetingEndTime(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Summary
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 h-32"
                placeholder="Enter appointment summary here..."
                value={medicalSummary}
                onChange={(e) => setMedicalSummary(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { 
                  setShowCompletionModal(false); 
                  setMedicalSummary('');
                  setMeetingStartTime('');
                  setMeetingEndTime('');
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCompletion}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                disabled={!medicalSummary.trim() || !meetingStartTime || !meetingEndTime}
              >
                Submit & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalAppointmentsPage;