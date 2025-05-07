import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointmentDetails, updateAppointmentStatus } from '../../features/professional/appointmentsService';

const ProfessionalAppointmentDetailPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddNotesModal, setShowAddNotesModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<{
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
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [medicalSummary, setMedicalSummary] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      if (!appointmentId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointmentDetails(appointmentId);
        console.log("Appointment details:", data); // For debugging
        
        // Process the data to extract patient information correctly
        // Try all possible locations where patient info might be stored
        const processedData = { ...data };
        
        // Try to extract patient name from various possible locations
        let patientName = processedData.patient_name || 
                          processedData.patient_full_name || 
                          (processedData.patient && (processedData.patient.name || processedData.patient.full_name)) ||
                          processedData.name ||
                          processedData.full_name ||
                          processedData.customer_name || 
                          processedData.user_name;
                          
        // If we found a name, ensure it's stored in the patient_name field
        if (patientName) {
          processedData.patient_name = patientName;
        }
        
        // Similarly handle patient email
        let patientEmail = processedData.patient_email || 
                           (processedData.patient && processedData.patient.email) ||
                           processedData.email;
                           
        if (patientEmail) {
          processedData.patient_email = patientEmail;
        }
        
        console.log("Processed appointment details:", processedData);
        setAppointmentDetails(processedData);
      } catch (err: any) {
        console.error('Failed to load appointment details:', err);
        setError(err.message || 'Failed to load appointment details');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointmentDetails();
  }, [appointmentId]);

  // Handle back button click
  const handleBack = () => {
    navigate('/professional/appointments');
  };

  // Handle add notes modal
  const handleAddNotesClick = () => {
    setShowAddNotesModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowAddNotesModal(false);
  };

  // Handle save notes
  const handleSaveNotes = () => {
    // Add notes to the important notes array
    if (notes.trim() !== "") {
      // In a real app, you would call an API endpoint to save the notes
      // For now, we'll just update the local state
      const updatedImportantNotes = [...(appointmentDetails.important_notes || []), notes];
      setAppointmentDetails({
        ...appointmentDetails,
        important_notes: updatedImportantNotes
      });
      setNotes('');
      setShowAddNotesModal(false);
      
      // Show success message
      setStatusUpdateSuccess('Note added successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(null);
      }, 3000);
    }
  };

  // Helper function to process notification response
  const processNotificationResponse = (notification: any) => {
    if (!notification) return null;
    
    const notificationData: any = {
      status: 'unknown',
      message: null
    };
    
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

  // Handle confirm appointment
  const handleConfirmAppointment = async () => {
    if (!appointmentId) return;
    
    try {
      const result = await updateAppointmentStatus(appointmentId, 'confirmed');
      setStatusUpdateSuccess('Appointment confirmed successfully');
      
      // Process enhanced notification response
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      // Update local state
      if (appointmentDetails) {
        setAppointmentDetails({
          ...appointmentDetails,
          status: 'confirmed',
          status_display: 'Confirmed'
        });
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to confirm appointment');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // Handle cancel appointment
  const handleCancelAppointment = async () => {
    if (!appointmentId) return;
    
    try {
      const result = await updateAppointmentStatus(appointmentId, 'cancelled');
      setStatusUpdateSuccess('Appointment cancelled successfully');
      
      // Process enhanced notification response
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      // Update local state
      if (appointmentDetails) {
        setAppointmentDetails({
          ...appointmentDetails,
          status: 'cancelled',
          status_display: 'Cancelled',
          can_be_cancelled: false
        });
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to cancel appointment');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // Handle no-show appointment
  const handleNoShowAppointment = async () => {
    if (!appointmentId) return;
    
    try {
      const result = await updateAppointmentStatus(appointmentId, 'no_show');
      setStatusUpdateSuccess('Appointment marked as no-show');
      
      // Process enhanced notification response
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      // Update local state
      if (appointmentDetails) {
        setAppointmentDetails({
          ...appointmentDetails,
          status: 'no_show',
          status_display: 'No Show',
          can_be_cancelled: false
        });
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to mark appointment as no-show');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // Helper to convert time format from "2:30 PM" to "14:30"
  const convertTimeFormat = (time12h: string): string => {
    if (!time12h || !time12h.includes(' ')) return '00:00';
    
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = modifier === 'AM' ? '00' : '12';
    } else if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    return `${hours.padStart(2, '0')}:${minutes || '00'}`;
  };

  // Modified function to show the completion modal and set default times
  const handleShowCompletionModal = () => {
    // Set default start time to the scheduled appointment time if available
    if (appointmentDetails) {
      const appointmentDate = appointmentDetails.appointment_date?.split('T')[0] || new Date().toISOString().split('T')[0];
      const appointmentTime = appointmentDetails.formatted_time ? 
        convertTimeFormat(appointmentDetails.formatted_time) : 
        new Date().toTimeString().slice(0, 5);
      
      setMeetingStartTime(`${appointmentDate}T${appointmentTime}`);
      
      // Set default end time to current time
      const now = new Date();
      const endDate = now.toISOString().split('T')[0];
      const endTime = now.toTimeString().slice(0, 5);
      setMeetingEndTime(`${endDate}T${endTime}`);
    } else {
      // Default to current date/time if appointment details not available
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
    
    setShowSummaryModal(true);
  };

  // Modified handleCompleteAppointment to accept summary and meeting times
  const handleCompleteAppointment = async (summary?: string) => {
    if (!appointmentId) return;
    // Validate summary is provided
    if (!summary || summary.trim() === '') {
      setError('Medical summary is required when completing an appointment');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    
    if (!meetingStartTime || !meetingEndTime) {
      setError('Meeting start and end times are required');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    
    try {
      // Format the start and end times
      const startDate = new Date(meetingStartTime);
      const endDate = new Date(meetingEndTime);
      
      const startTimeFormatted = startDate.toLocaleString();
      const endTimeFormatted = endDate.toLocaleString();
      
      // Create an enhanced summary with the meeting times included
      const enhancedSummary = `Meeting Time: ${startTimeFormatted} to ${endTimeFormatted}\n\n${summary}`;
      
      // Call the API to update the status and include the summary
      const result = await updateAppointmentStatus(
        appointmentId, 
        'completed',
        undefined,
        enhancedSummary
      );
      
      // Process enhanced notification response
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      // Update local state
      if (appointmentDetails) {
        setAppointmentDetails({
          ...appointmentDetails,
          status: 'completed',
          status_display: 'Completed',
          can_be_cancelled: false,
          medical_summary: enhancedSummary
        });
      }
      
      // Close the modal
      setShowSummaryModal(false);
      
      // Reset form
      setMedicalSummary('');
      setMeetingStartTime('');
      setMeetingEndTime('');
      
      // Set success message
      setStatusUpdateSuccess('Appointment completed successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to complete appointment');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // Helper function to handle status changes and resend notifications
  const handleStatusChange = async (currentStatus: string) => {
    if (!appointmentId) return;
    
    try {
      const result = await updateAppointmentStatus(appointmentId, currentStatus as any);
      setStatusUpdateSuccess(`Notification resent for ${currentStatus} status`);
      
      // Update notification status using the helper function
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to resend notification');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading appointment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button 
          className="mt-2 text-blue-600 hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (!appointmentDetails) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Appointment not found</p>
        <a 
          href="/professional/appointments" 
          className="mt-2 text-blue-600 hover:underline"
        >
          Back to appointments
        </a>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Appointment {appointmentId} | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Appointment Details</h1>
          <p className="mt-2 text-gray-600">
            Appointment ID: {appointmentId}
          </p>
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Appointments
        </button>
      </div>
      
      {statusUpdateSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{statusUpdateSuccess}</span>
        </div>
      )}
      
      {notificationStatus && (
        <div className={`mb-6 px-4 py-3 rounded relative ${
          notificationStatus.status === 'sent' ? 'bg-green-100 border border-green-400 text-green-700' :
          notificationStatus.status === 'pending' ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' :
          'bg-red-100 border border-red-400 text-red-700'
        }`} role="alert">
          <span className="font-medium">Notification status: {notificationStatus.status}</span>
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
                if (appointmentDetails) handleStatusChange(appointmentDetails.status);
              }} 
              className="mt-3 px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
            >
              Resend notification
            </button>
          )}
        </div>
      )}
      
      {/* Appointment Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-base font-medium">
              {appointmentDetails.formatted_date_time || 
                (appointmentDetails.formatted_date && appointmentDetails.formatted_time 
                  ? `${appointmentDetails.formatted_date} at ${appointmentDetails.formatted_time}`
                  : appointmentDetails.appointment_date 
                    ? new Date(appointmentDetails.appointment_date).toLocaleString() 
                    : 'Not specified')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base font-medium">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                appointmentDetails.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                appointmentDetails.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                appointmentDetails.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                appointmentDetails.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {appointmentDetails.status_display || appointmentDetails.status || 'No Show'}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hospital</p>
            <p className="text-base font-medium">
              {appointmentDetails.hospital?.name || 
              appointmentDetails.hospital_name || 
              'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-base font-medium">
              {appointmentDetails.department?.name || 
              appointmentDetails.department_name || 
              'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-base font-medium">
              {appointmentDetails.formatted_appointment_type || 
              appointmentDetails.appointment_type || 
              'Consultation'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="text-base font-medium">
              {appointmentDetails.formatted_priority || 
              appointmentDetails.priority || 
              'Normal Priority'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-base font-medium">
              {appointmentDetails.duration || '30'} minutes
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-base font-medium">
              {appointmentDetails.created_at 
                ? new Date(appointmentDetails.created_at).toLocaleString() 
                : 'Not specified'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Patient Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Patient Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Patient Name</p>
            <p className="text-base font-medium">
              {appointmentDetails.patient_name || 
              (appointmentDetails.patient && appointmentDetails.patient.name) || 
              `Patient #${appointmentDetails.appointment_id?.slice(-6)}`}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Patient ID</p>
            <p className="text-base font-medium">
              {appointmentDetails.patient_id || 
              (appointmentDetails.patient && appointmentDetails.patient.id) || 
              appointmentDetails.appointment_id || 'Not Available'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Patient Email</p>
            <p className="text-base font-medium">
              {appointmentDetails.patient_email || 
              (appointmentDetails.patient && appointmentDetails.patient.email) || 
              'Not Available'}
              {appointmentDetails.email_verified === false && (
                <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  Not Verified
                </span>
              )}
            </p>
            {appointmentDetails.email_verified === false && (
              <p className="text-xs text-red-600 mt-1">
                Warning: Email not verified. Notifications may not be delivered.
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Chief Complaint</p>
            <p className="text-base font-medium">
              {appointmentDetails.chief_complaint || 'None recorded'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Symptoms</p>
            <p className="text-base font-medium">
              {appointmentDetails.symptoms || 'None recorded'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Medical History</p>
            <p className="text-base font-medium">
              {appointmentDetails.medical_history || 'None recorded'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Allergies</p>
            <p className="text-base font-medium">
              {appointmentDetails.allergies || 'None recorded'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Medications</p>
            <p className="text-base font-medium">
              {appointmentDetails.current_medications || 'None recorded'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Payment Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="text-base font-medium capitalize">
              {appointmentDetails.payment_status || 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Required</p>
            <p className="text-base font-medium">
              {appointmentDetails.payment_required ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Insurance Based</p>
            <p className="text-base font-medium">
              {appointmentDetails.is_insurance_based ? 'Yes' : 'No'}
            </p>
          </div>
          {appointmentDetails.insurance_details && (
            <div>
              <p className="text-sm text-gray-500">Insurance Details</p>
              <p className="text-base font-medium">{appointmentDetails.insurance_details}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Actions</h2>
        <div className="flex flex-wrap gap-4">
          {/* Pending Status Actions */}
          {appointmentDetails.status === 'pending' && (
            <>
              <button 
                onClick={handleConfirmAppointment}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Confirm Appointment
              </button>
              <button 
                onClick={handleCancelAppointment}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Cancel Appointment
              </button>
              <button 
                onClick={handleAddNotesClick}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                Add Notes
              </button>
            </>
          )}
          
          {/* Confirmed Status Actions */}
          {appointmentDetails.status === 'confirmed' && (
            <>
              <button 
                onClick={handleShowCompletionModal}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Mark as Completed
              </button>
              {appointmentDetails.can_be_cancelled && (
                <button 
                  onClick={handleCancelAppointment}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Cancel Appointment
                </button>
              )}
              <button 
                onClick={handleNoShowAppointment}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                Mark as No-Show
              </button>
              <button 
                onClick={handleAddNotesClick}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                Add Notes
              </button>
            </>
          )}
          
          {/* Other statuses */}
          {appointmentDetails.status !== 'pending' && appointmentDetails.status !== 'confirmed' && (
            <button 
              onClick={handleAddNotesClick}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              Add Notes
            </button>
          )}
        </div>
      </div>
      
      {/* Important Notes */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Important Notes</h2>
        {appointmentDetails.important_notes && appointmentDetails.important_notes.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {appointmentDetails.important_notes.map((note: string, index: number) => (
              <li key={index} className="text-gray-700">{note}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes recorded</p>
        )}
      </div>
      
      {/* Add Notes Modal */}
      {showAddNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Add Notes</h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 h-32 mb-4"
              placeholder="Enter your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {showSummaryModal && (
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
                  setShowSummaryModal(false); 
                  setMedicalSummary(''); 
                  setMeetingStartTime('');
                  setMeetingEndTime('');
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCompleteAppointment(medicalSummary)}
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

export default ProfessionalAppointmentDetailPage; 