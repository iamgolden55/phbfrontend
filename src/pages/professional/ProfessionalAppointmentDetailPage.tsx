import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointmentDetails, updateAppointmentStatus } from '../../features/professional/appointmentsService';

interface AppointmentDetails {
  id: string;
  status: string;
  status_display: string;
  patient_name: string;
  patient_email?: string;
  patient_id?: string;
  appointment_date?: string;
  formatted_date?: string;
  formatted_time?: string;
  formatted_date_time?: string;
  hospital_name?: string;
  department_name?: string;
  formatted_appointment_type?: string;
  formatted_priority?: string;
  duration?: string | number;
  appointment_duration_display?: string;
  created_at?: string;
  chief_complaint?: string;
  symptoms?: string;
  medical_history?: string;
  allergies?: string;
  current_medications?: string;
  is_insurance_based?: boolean;
  insurance_details?: any;
  payment_status?: string;
  important_notes?: string[];
  can_be_cancelled?: boolean;
  email_verified?: boolean;
}

interface NotificationStatus {
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

const ProfessionalAppointmentDetailPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [medicalSummary, setMedicalSummary] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      if (!appointmentId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointmentDetails(appointmentId);
        console.log('Appointment details:', data);
        
        // Process patient information
        const processedData: AppointmentDetails = {
          ...data,
          patient_name: data.patient_name || 
                       data.patient?.name || 
                       data.patient?.full_name ||
                       data.name ||
                       data.full_name ||
                       data.customer_name || 
                       data.user_name ||
                       `Patient #${data.appointment_id?.slice(-6)}`,
          patient_email: data.patient_email || data.patient?.email || data.email,
          patient_id: data.patient_id || data.patient?.id || data.appointment_id
        };

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

  const processNotificationResponse = (notification: any): NotificationStatus | null => {
    if (!notification) return null;
    
    const notificationData: NotificationStatus = {
      status: 'unknown',
    };
    
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

  const handleConfirmAppointment = async () => {
    if (!appointmentId || !appointmentDetails) return;
    
    setActionLoading('confirm');
    try {
      const result = await updateAppointmentStatus(appointmentId, 'confirmed');
      setStatusUpdateSuccess('Appointment confirmed successfully');
      
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      setAppointmentDetails({
        ...appointmentDetails,
        status: 'confirmed',
        status_display: 'Confirmed'
      });
      
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to confirm appointment');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelAppointment = async () => {
    if (!appointmentId || !appointmentDetails) return;
    
    const reason = prompt('Please provide a reason for cancellation:');
    if (reason === null) return;
    
    setActionLoading('cancel');
    try {
      const result = await updateAppointmentStatus(appointmentId, 'cancelled', reason);
      setStatusUpdateSuccess('Appointment cancelled successfully');
      
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      setAppointmentDetails({
        ...appointmentDetails,
        status: 'cancelled',
        status_display: 'Cancelled',
        can_be_cancelled: false
      });
      
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to cancel appointment');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleNoShowAppointment = async () => {
    if (!appointmentId || !appointmentDetails) return;
    
    setActionLoading('no_show');
    try {
      const result = await updateAppointmentStatus(appointmentId, 'no_show');
      setStatusUpdateSuccess('Appointment marked as no-show');
      
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      setAppointmentDetails({
        ...appointmentDetails,
        status: 'no_show',
        status_display: 'No Show',
        can_be_cancelled: false
      });
      
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to mark appointment as no-show');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

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

  const handleShowCompletionModal = () => {
    if (appointmentDetails) {
      const appointmentDate = appointmentDetails.appointment_date?.split('T')[0] || new Date().toISOString().split('T')[0];
      const appointmentTime = appointmentDetails.formatted_time ? 
        convertTimeFormat(appointmentDetails.formatted_time) : 
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
    
    setShowSummaryModal(true);
  };

  const handleCompleteAppointment = async () => {
    if (!appointmentId || !appointmentDetails) return;
    
    if (!medicalSummary || medicalSummary.trim() === '') {
      setError('Medical summary is required when completing an appointment');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    if (!meetingStartTime || !meetingEndTime) {
      setError('Meeting start and end times are required');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    const startDate = new Date(meetingStartTime);
    const endDate = new Date(meetingEndTime);
    
    if (endDate <= startDate) {
      setError('End time must be after start time');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setActionLoading('complete');
    try {
      const startTimeFormatted = startDate.toLocaleString();
      const endTimeFormatted = endDate.toLocaleString();
      const enhancedSummary = `Meeting Time: ${startTimeFormatted} to ${endTimeFormatted}\n\n${medicalSummary}`;
      
      const result = await updateAppointmentStatus(
        appointmentId, 
        'completed',
        undefined,
        enhancedSummary
      );
      
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      setAppointmentDetails({
        ...appointmentDetails,
        status: 'completed',
        status_display: 'Completed',
        can_be_cancelled: false,
        medical_summary: enhancedSummary
      });
      
      setShowSummaryModal(false);
      setMedicalSummary('');
      setMeetingStartTime('');
      setMeetingEndTime('');
      
      setStatusUpdateSuccess('Appointment completed successfully');
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to complete appointment');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddNotes = () => {
    setShowNotesModal(true);
  };

  const handleSaveNotes = async () => {
    if (!appointmentId || !notes.trim()) {
      setShowNotesModal(false);
      return;
    }
    
    setActionLoading('notes');
    try {
      const updatedAppointment = await updateAppointmentStatus(
        appointmentId, 
        appointmentDetails?.status || '', 
        notes
      );
      setAppointmentDetails(updatedAppointment);
      setShowNotesModal(false);
      setNotes('');
      setStatusUpdateSuccess('Notes added successfully');
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to add notes');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBack = () => {
    navigate('/professional/appointments');
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
        <button 
          onClick={handleBack}
          className="mt-2 text-blue-600 hover:underline"
        >
          Back to appointments
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
        }`}>
          <span className="font-medium">Notification status: {notificationStatus.status}</span>
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
              {appointmentDetails.hospital_name || 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-base font-medium">
              {appointmentDetails.department_name || 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-base font-medium">
              {appointmentDetails.formatted_appointment_type || 'Consultation'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="text-base font-medium">
              {appointmentDetails.formatted_priority || 'Normal Priority'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-base font-medium">
              {appointmentDetails.appointment_duration_display || 
               (appointmentDetails.duration ? `${appointmentDetails.duration} minutes` : 'Not specified')}
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
              {appointmentDetails.patient_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Patient ID</p>
            <p className="text-base font-medium">
              {appointmentDetails.patient_id || 'Not Available'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Patient Email</p>
            <p className="text-base font-medium">
              {appointmentDetails.patient_email || 'Not Available'}
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
      {(appointmentDetails.payment_status || appointmentDetails.is_insurance_based) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointmentDetails.payment_status && (
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p className="text-base font-medium capitalize">
                  {appointmentDetails.payment_status}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Insurance Based</p>
              <p className="text-base font-medium">
                {appointmentDetails.is_insurance_based ? 'Yes' : 'No'}
              </p>
            </div>
            {appointmentDetails.insurance_details && (
              <div>
                <p className="text-sm text-gray-500">Insurance Details</p>
                <p className="text-base font-medium">
                  {typeof appointmentDetails.insurance_details === 'string' 
                    ? appointmentDetails.insurance_details
                    : JSON.stringify(appointmentDetails.insurance_details)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Actions</h2>
        <div className="flex flex-wrap gap-4">
          {/* Pending Status Actions */}
          {appointmentDetails.status === 'pending' && (
            <>
              <button 
                onClick={handleConfirmAppointment}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors ${
                  actionLoading === 'confirm' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'confirm' ? 'Confirming...' : 'Confirm Appointment'}
              </button>
              <button 
                onClick={handleCancelAppointment}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors ${
                  actionLoading === 'cancel' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'cancel' ? 'Cancelling...' : 'Cancel Appointment'}
              </button>
              <button 
                onClick={handleAddNotes}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors ${
                  actionLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors ${
                  actionLoading === 'complete' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'complete' ? 'Completing...' : 'Mark as Completed'}
              </button>
              {(appointmentDetails.can_be_cancelled ?? true) && (
                <button 
                  onClick={handleCancelAppointment}
                  disabled={actionLoading !== null}
                  className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors ${
                    actionLoading === 'cancel' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {actionLoading === 'cancel' ? 'Cancelling...' : 'Cancel Appointment'}
                </button>
              )}
              <button 
                onClick={handleNoShowAppointment}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors ${
                  actionLoading === 'no_show' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'no_show' ? 'Processing...' : 'Mark as No-Show'}
              </button>
              <button 
                onClick={handleAddNotes}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors ${
                  actionLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Add Notes
              </button>
            </>
          )}
          
          {/* Other statuses */}
          {appointmentDetails.status !== 'pending' && appointmentDetails.status !== 'confirmed' && (
            <button 
              onClick={handleAddNotes}
              disabled={actionLoading !== null}
              className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors ${
                actionLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
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
      {showNotesModal && (
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
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                disabled={!notes.trim() || actionLoading === 'notes'}
                className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors ${
                  !notes.trim() || actionLoading === 'notes' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'notes' ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
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
                onClick={handleCompleteAppointment}
                disabled={!medicalSummary.trim() || !meetingStartTime || !meetingEndTime || actionLoading === 'complete'}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors ${
                  !medicalSummary.trim() || !meetingStartTime || !meetingEndTime || actionLoading === 'complete' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {actionLoading === 'complete' ? 'Processing...' : 'Submit & Complete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalAppointmentDetailPage;