import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorAppointments, updateAppointmentStatus, fetchDoctorAppointmentDetails } from '../../features/professional/appointmentsService';
import { useAuth } from '../../features/auth/authContext';

// Define appointment type based on the API response
interface Appointment {
  id: number;
  appointment_id: string;
  doctor_full_name: string;
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
  // Patient information can come in different formats
  patient?: {
    id: number;
    name: string;
    age?: number;
    gender?: string;
  };
  // Alternative format fields for patient data
  patient_name?: string;
  patient_full_name?: string;
  patient_id?: string;
  // Notification info
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
}

const ProfessionalAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('upcoming');
  const [statusUpdateLoading, setStatusUpdateLoading] = useState<string | null>(null);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<{
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
  } | null>(null);
  // Add states for the completion modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionAppointmentId, setCompletionAppointmentId] = useState<string | null>(null);
  const [medicalSummary, setMedicalSummary] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Fetch appointments on component mount
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch appointments from API
        const data = await fetchDoctorAppointments();
        
        // Process the data to properly handle patient information
        const processedData = data.map((appointment: any) => {
          // Make a copy to avoid mutating the original
          const processed = { ...appointment };
          
          // Extract patient name based on multiple possible data structures
          let patientName = processed.patient_name || 
                          processed.patient_full_name || 
                          (processed.patient && (processed.patient.name || processed.patient.full_name)) ||
                          processed.name ||
                          processed.full_name ||
                          processed.customer_name || 
                          processed.user_name ||
                          processed.client_name;
          
          // Extract patient ID if available
          let patientId = processed.patient_id ||
                          (processed.patient && processed.patient.id) ||
                          processed.user_id ||
                          processed.customer_id ||
                          processed.client_id;
                          
          // Add the extracted patient name and ID to the processed appointment
          if (patientName) {
            processed.patient_name = patientName;
          }
          
          if (patientId) {
            processed.patient_id = patientId;
          }
          
          return processed;
        });
        
        // For appointments without patient names, try to fetch patient details
        const appointmentsWithMissingNames = processedData.filter(
          (app: any) => !app.patient_name || app.patient_name === 'No Patient Name Available'
        );
        
        if (appointmentsWithMissingNames.length > 0) {
          // Only get patient details for appointments without names
          const appointmentsWithDetailsFetched = await Promise.all(
            processedData.map(async (appointment: any) => {
              if (!appointment.patient_name || appointment.patient_name === 'No Patient Name Available') {
                try {
                  // Fetch detailed info for this appointment
                  const details = await fetchDoctorAppointmentDetails(appointment.appointment_id);
                  
                  // Extract patient name from details if available
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
        } else {
          // No missing names, use processed data directly
          setAppointments(processedData);
        }
      } catch (err: any) {
        console.error('Failed to load doctor appointments:', err);
        setError(err.message || 'Failed to load doctor appointments');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, []);

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    navigate('/professional/dashboard');
  };

  // Navigate to appointment details
  const handleViewAppointment = (appointmentId: string) => {
    navigate(`/professional/appointments/${appointmentId}`);
  };

  // Filter appointments based on active filter
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    const now = new Date();
    
    if (activeFilter === 'upcoming') {
      // Show only confirmed appointments with future dates
      return appointmentDate >= now && appointment.status === 'confirmed';
    } else if (activeFilter === 'past') {
      // Show only completed appointments
      return appointment.status === 'completed';
    } else if (activeFilter === 'cancelled') {
      return appointment.status === 'cancelled';
    } else if (activeFilter === 'all') {
      return true;
    }
    
    return false;
  });

  // Handle the click on Complete button
  const handleCompleteClick = (appointmentId: string) => {
    setCompletionAppointmentId(appointmentId);
    
    // Find the appointment to pre-fill the meeting start time with scheduled time
    const appointment = appointments.find(a => a.appointment_id === appointmentId);
    if (appointment) {
      // Set default start time to the scheduled appointment time if available
      const appointmentDate = appointment.appointment_date?.split('T')[0] || new Date().toISOString().split('T')[0];
      const appointmentTime = appointment.formatted_time ? 
        convertTimeFormat(appointment.formatted_time) : 
        new Date().toTimeString().slice(0, 5);
      
      setMeetingStartTime(`${appointmentDate}T${appointmentTime}`);
      
      // Set default end time to current time or appointment time + duration
      const now = new Date();
      const endDate = now.toISOString().split('T')[0];
      const endTime = now.toTimeString().slice(0, 5);
      setMeetingEndTime(`${endDate}T${endTime}`);
    } else {
      // Default to current date/time if appointment not found
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().slice(0, 5);
      setMeetingStartTime(`${dateStr}T${timeStr}`);
      
      // Set end time 30 minutes later as default
      const endTime = new Date(now.getTime() + 30 * 60000);
      const endDateStr = endTime.toISOString().split('T')[0];
      const endTimeStr = endTime.toTimeString().slice(0, 5);
      setMeetingEndTime(`${endDateStr}T${endTimeStr}`);
    }
    
    setShowCompletionModal(true);
  };
  
  // Helper to convert time format from "2:30 PM" to "14:30"
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

  // Handle the submission of medical summary
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
      // Format the meeting times for sending to the API
      const startTimeFormatted = new Date(meetingStartTime).toISOString();
      const endTimeFormatted = new Date(meetingEndTime).toISOString();
      
      // Create an enhanced summary with the meeting times included
      const enhancedSummary = `Meeting Time: ${startTimeFormatted} to ${endTimeFormatted}\n\n${medicalSummary}`;
      
      // Call the existing status change function with the additional parameter
      await handleStatusChange(completionAppointmentId, 'completed', enhancedSummary);
      
      // Reset the modal state
      setShowCompletionModal(false);
      setCompletionAppointmentId(null);
      setMedicalSummary('');
      setMeetingStartTime('');
      setMeetingEndTime('');
    } catch (err) {
      console.error('Error submitting completion:', err);
      setError('Failed to submit completion information');
    }
  };

  // Helper function to process notification response
  const processNotificationResponse = (notification: any, appointmentId?: string) => {
    if (!notification) return null;
    
    const notificationData: any = {
      status: 'unknown',
      message: null
    };
    
    // Add appointment ID if provided
    if (appointmentId) {
      notificationData.id = appointmentId;
    }
    
    // Handle legacy notification format
    if (typeof notification === 'string' || notification.status) {
      notificationData.status = notification.status || 'unknown';
      notificationData.message = notification.message;
    }
    
    // Handle enhanced notification format
    if (notification.email_sent) {
      notificationData.status = notification.email_sent.notification_status;
      notificationData.recipient = notification.email_sent.recipient;
      notificationData.sentAt = notification.email_sent.sent_at;
      notificationData.calendarAttached = notification.email_sent.calendar_attached;
    }
    
    // Add notification details if available
    if (notification.details && Array.isArray(notification.details)) {
      notificationData.details = notification.details;
    }
    
    return notificationData;
  };

  // Modified handle status change to include medical summary
  const handleStatusChange = async (appointmentId: string, newStatus: string, summary?: string) => {
    // Show loading for this specific appointment
    setStatusUpdateLoading(appointmentId);
    
    try {
      // Call the API to update the status
      const result = await updateAppointmentStatus(
        appointmentId, 
        newStatus as 'confirmed' | 'cancelled' | 'completed' | 'rescheduled' | 'no_show',
        undefined,
        summary
      );
      
      // Check for enhanced notification status in the response
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification, appointmentId));
      }
      
      // Update the local state
      setAppointments(appointments.map(appointment => {
        if (appointment.appointment_id === appointmentId) {
          const updatedAppointment = {
            ...appointment,
            status: newStatus,
            status_display: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
          };
          
          // Add notification data to appointment
          if (result.notification) {
            // Legacy format
            if (result.notification.status) {
              updatedAppointment.notification_status = result.notification.status;
              updatedAppointment.notification_message = result.notification.message;
            }
            
            // Enhanced format
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
      
      // Show success message
      setStatusUpdateSuccess(`Appointment ${newStatus} successfully` + 
        (result.notification ? ` | Notification: ${
          result.notification.email_sent?.notification_status || 
          result.notification.status || 
          'processed'
        }` : ''));
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(null);
      }, 5000);
    } catch (err: any) {
      console.error(`Failed to update appointment status to ${newStatus}:`, err);
      setError(err.message || `Failed to update appointment status to ${newStatus}`);
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      // Clear loading state
      setStatusUpdateLoading(null);
    }
  };
  
  // Format patient ID for display
  const formatPatientId = (appointment: Appointment) => {
    const patientId = appointment.patient_id || 
                     (appointment.patient && appointment.patient.id) || 
                     appointment.appointment_id;
                     
    return `ID: ${patientId || appointment.appointment_id}`;
  };

  return (
    <div>
      <Helmet>
        <title>My Appointments | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>
          <p className="mt-2 text-gray-600">
            Manage appointments for Dr. {user?.full_name}
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
        }`} role="alert">
          <span className="font-medium">Notification status for Appointment {notificationStatus.id}: {notificationStatus.status}</span>
          {notificationStatus.message && (
            <p className="block sm:inline mt-1">{notificationStatus.message}</p>
          )}
          
          {/* Enhanced notification details */}
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
          
          {/* Notification details list */}
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
          
          {notificationStatus.status === 'failed' && (
            <button 
              onClick={() => {
                const appointment = appointments.find(a => a.appointment_id === notificationStatus.id);
                if (appointment) handleStatusChange(notificationStatus.id, appointment.status);
              }} 
              className="mt-3 px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
            >
              Retry sending notification
            </button>
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
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patient_name || 
                         (appointment.patient && appointment.patient.name) || 
                         `Patient #${appointment.appointment_id.slice(-6)}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPatientId(appointment)}
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
                            onClick={() => handleStatusChange(appointment.appointment_id, 'confirmed')}
                            className="text-green-600 hover:text-green-900 mr-3"
                            disabled={statusUpdateLoading === appointment.appointment_id}
                          >
                            {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'Confirm'}
                          </button>
                          <button 
                            onClick={() => handleStatusChange(appointment.appointment_id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                            disabled={statusUpdateLoading === appointment.appointment_id}
                          >
                            {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'Cancel'}
                          </button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <>
                          <button 
                            onClick={() => handleCompleteClick(appointment.appointment_id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            disabled={statusUpdateLoading === appointment.appointment_id}
                          >
                            {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'Complete'}
                          </button>
                          <button 
                            onClick={() => handleStatusChange(appointment.appointment_id, 'no_show')}
                            className="text-gray-600 hover:text-gray-900"
                            disabled={statusUpdateLoading === appointment.appointment_id}
                          >
                            {statusUpdateLoading === appointment.appointment_id ? 'Loading...' : 'No Show'}
                          </button>
                        </>
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