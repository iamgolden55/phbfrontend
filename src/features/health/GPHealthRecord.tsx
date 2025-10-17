import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import { Link } from 'react-router-dom';
import { 
  fetchMedicalRecords, 
  isMedAccessTokenValid, 
  clearMedAccessToken, 
  ERROR_CODES 
} from './medicalRecordsAuthService';
import { API_BASE_URL, createApiUrl } from '../../utils/config';

// Import the service singleton
import medicalRecordsService from './medicalRecordsService';

interface RecordType {
  id: string;
  appointment_id?: string;
  date: string;
  formattedDate?: string;
  provider: string;
  title: string;
  summary: string;
  details?: string;
  type: 'appointment' | 'consultation' | 'test' | 'medication' | 'referral' | 'vaccination' | 'doctorInteraction';
  hospital?: string;
  department?: string;
  doctorName?: string;
  interactionType?: string;
  patientName?: string;
  status?: string;
}

interface AppointmentSummary {
  appointment_details: {
    appointment_id: string;
    doctor: string;
    date: string;
    time: string;
    formatted_date_time: string;
    hospital: string;
    department: string;
    type: string;
    priority: string;
    duration: string;
    status: string;
  };
  patient_details: {
    name: string;
    chief_complaint: string;
    symptoms: string;
    medical_history: string;
    allergies: string;
    current_medications: string;
  };
  important_notes: string;
  payment_info: {
    payment_required: boolean;
    payment_status: string;
    is_insurance_based: boolean;
    insurance_details: any;
  };
  additional_info: {
    notes: string;
    created_at: string;
    updated_at: string;
  };
}

const GPHealthRecord: React.FC = () => {
  const { user, isLoading, error: authError, hasPrimaryHospital, primaryHospital, checkPrimaryHospital } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<AppointmentSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'appointment' | 'complete'>('appointment');
  
  // Add state for medical record access
  const [accessState, setAccessState] = useState<'checking' | 'need_auth' | 'loading' | 'verifying' | 'authorized' | 'error'>('checking');
  const [medicalAccessError, setMedicalAccessError] = useState<string>('');
  const [accessExpiry, setAccessExpiry] = useState<Date | null>(null);
  
  // Add state for doctor interactions (appointments)
  const [appointments, setAppointments] = useState<RecordType[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState<boolean>(false);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  const [isFetchingSummary, setIsFetchingSummary] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Load data when component mounts
  useEffect(() => {
    // For appointment summaries, we don't need OTP verification
    // so we can fetch them right away
    fetchUserAppointments();
    
    // For complete medical records access,
    // we'd need to check for OTP verification
    checkMedicalRecordsAccess();
  }, []);

  // Check if we have medical records access
  const checkMedicalRecordsAccess = () => {
    setAccessState('checking');
    
    // Check if we have a valid med access token
    if (isMedAccessTokenValid()) {
      // We have a valid token, we can show the records
      setAccessState('authorized');
      
      // Set expiry time for UI display
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 30); // Assuming 30 min expiry
      setAccessExpiry(expiryTime);
    } else {
      // We need to request authentication
      setAccessState('need_auth');
    }
  };
  
  // Fetch user's appointments from the API
  const fetchUserAppointments = async () => {
    setIsLoadingAppointments(true);
    setAppointmentsError(null);
    
    try {
      const token = localStorage.getItem('phb_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Fetch appointments from the regular API endpoint
      const response = await fetch(createApiUrl('api/appointments/'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process the appointments data to match our RecordType interface
      const processedAppointments = data.map((appointment: any) => ({
        id: appointment.id.toString(),
        appointment_id: appointment.appointment_id,
        date: appointment.appointment_date,
        formattedDate: appointment.formatted_date_time || `${appointment.formatted_date} at ${appointment.formatted_time}`,
        provider: appointment.doctor_full_name || appointment.doctor_name || 'Unknown Doctor',
        title: appointment.formatted_appointment_type || 'Appointment',
        summary: appointment.chief_complaint || 'No complaint recorded',
        hospital: appointment.hospital_name || 'Unknown Hospital',
        department: appointment.department_name || 'Unknown Department',
        doctorName: appointment.doctor_full_name || appointment.doctor_name || 'Unknown Doctor',
        patientName: user?.full_name || user?.email || 'Patient',
        type: 'doctorInteraction',
        status: appointment.status
      }));
      
      // Filter to only show completed appointments
      const completedAppointments = processedAppointments.filter(
        (appointment: any) => appointment.status === 'completed'
      );
      
      setAppointments(completedAppointments);
      
      // Select the first appointment by default if we have any
      if (completedAppointments.length > 0) {
        setSelectedRecord(completedAppointments[0]);
        // Fetch the summary for the first appointment
        fetchAppointmentSummary(completedAppointments[0].appointment_id);
      }
      
      // Authorized to view appointments
      setAccessState('authorized');
      
      // Set expiry time for UI display
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 30);
      setAccessExpiry(expiryTime);
    } catch (err: any) {
      console.error('Error fetching appointments:', err);
      setAppointmentsError(err.message || 'An unexpected error occurred while fetching appointments');
    } finally {
      setIsLoadingAppointments(false);
    }
  };
  
  // Fetch detailed summary for a specific appointment
  const fetchAppointmentSummary = async (appointmentId?: string) => {
    if (!appointmentId) return;
    
    setIsFetchingSummary(true);
    setSummaryError(null);
    
    try {
      const token = localStorage.getItem('phb_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/summary/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch appointment summary: ${response.status}`);
      }
      
      const data = await response.json();
      setSelectedSummary(data);
    } catch (err: any) {
      console.error('Error fetching appointment summary:', err);
      setSummaryError(err.message || 'An error occurred while fetching the appointment summary');
    } finally {
      setIsFetchingSummary(false);
    }
  };

  const handleVerificationSuccess = () => {
    setAccessState('authorized');
    // Set expiry time for UI display
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    setAccessExpiry(expiryTime);
  };

  const handleCancelVerification = () => {
    // Just show a message instead of the verification form
    setAccessState('need_auth');
  };
  
  // Handle selecting an appointment from the list
  const handleSelectAppointment = (record: RecordType) => {
    setSelectedRecord(record);
    setSelectedSummary(null); // Clear the previous summary
    if (record.appointment_id) {
      fetchAppointmentSummary(record.appointment_id);
    }
  };

  // Format date in human-readable form
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format expiry time remaining
  const formatExpiryTime = () => {
    if (!accessExpiry) return '';
    
    const now = new Date();
    const timeDiff = Math.max(0, accessExpiry.getTime() - now.getTime());
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-4">
          {/* Back Link */}
          <Link to="/account" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Account
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900">GP Health Record</h1>
          
          {/* Main Content Grid */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-bold">Health Services</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  <Link to="/account/gp-record"
                    className="flex items-center px-4 py-3 bg-gray-50 border-l-4 border-blue-600">
                    <div className="mr-3 text-blue-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-blue-600">GP Health Record</span>
                  </Link>
                  <Link to="/account/prescriptions"
                    className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <div className="mr-3 text-gray-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Prescriptions</span>
                  </Link>
                  <Link to="/account/appointments"
                    className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <div className="mr-3 text-gray-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Appointments</span>
                  </Link>
                  <Link to="/account/test-results"
                    className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <div className="mr-3 text-gray-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Test Results</span>
                  </Link>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Need help?</h3>
                <p className="text-sm text-blue-700 mb-3">
                  If you need assistance with your health dashboard, our support team is here to help.
                </p>
                <Link to="/help/health-services"
                  className="text-blue-600 text-sm hover:underline flex items-center">
                  Visit our help center
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Single heading replacing tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex">
                  <div className="py-3 px-4 text-sm font-medium border-b-2 border-blue-500 text-blue-600">
                    Appointment Summaries
                  </div>
                </div>
              </div>

              {/* Content based on selected tab */}
              {activeTab === 'appointment' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - List of Appointments */}
                  <div className="col-span-1">
                    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Appointments</h3>
                      
                      {isLoadingAppointments ? (
                        <div className="flex justify-center py-6">
                          <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        </div>
                      ) : appointmentsError ? (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md">
                          {appointmentsError}
                        </div>
                      ) : appointments.length === 0 ? (
                        <div className="bg-gray-50 text-gray-600 p-3 rounded-md">
                          No completed appointments available.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {appointments.map(record => (
                            <div
                              key={record.id}
                              onClick={() => handleSelectAppointment(record)}
                              className={`p-3 rounded-md cursor-pointer border ${
                                selectedRecord?.id === record.id
                                  ? 'border-blue-300 bg-blue-50'
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="text-blue-500 pt-1">
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-gray-500">{record.formattedDate || formatDate(record.date)}</p>
                                  <p className="font-medium text-sm">{record.title}</p>
                                  <div className="text-sm text-gray-600">
                                    {record.doctorName} - {record.hospital}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Appointment Details */}
                  <div className="col-span-1 lg:col-span-2">
                    {isFetchingSummary ? (
                      <div className="bg-white shadow-sm rounded-lg p-6 flex justify-center items-center">
                        <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                        <p className="text-gray-600">Loading appointment summary...</p>
                      </div>
                    ) : summaryError ? (
                      <div className="bg-white shadow-sm rounded-lg p-6">
                        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                          {summaryError}
                        </div>
                        <p className="text-gray-600">Unable to load appointment summary. Please try again later.</p>
                      </div>
                    ) : selectedRecord && selectedSummary ? (
                      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">
                                Appointment ID: {selectedRecord.appointment_id}
                              </div>
                              <div className="text-xs text-gray-500">
                                Hospital: {selectedSummary.appointment_details.hospital}
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="text-xl font-medium mb-4">Consultation Details</h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                  <p className="text-sm text-gray-500">Date & Time</p>
                                  <p className="font-medium">
                                    {selectedSummary.appointment_details.formatted_date_time}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Doctor</p>
                                  <p className="font-medium">{selectedSummary.appointment_details.doctor}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Hospital</p>
                                  <p className="font-medium">{selectedSummary.appointment_details.hospital}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Department</p>
                                  <p className="font-medium">{selectedSummary.appointment_details.department}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Type</p>
                                  <p className="font-medium">{selectedSummary.appointment_details.type}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Duration</p>
                                  <p className="font-medium">{selectedSummary.appointment_details.duration}</p>
                                </div>
                              </div>
                              
                              <h4 className="font-medium mb-2">Medical Summary</h4>
                              <div className="bg-white p-4 rounded-md">
                                <p className="font-medium mb-2">Patient: {selectedSummary.patient_details.name}</p>
                                
                                <p className="font-medium mt-4 mb-2">Presenting Complaint:</p>
                                <p className="text-gray-700">{selectedSummary.patient_details.chief_complaint}</p>
                                
                                {selectedSummary.patient_details.symptoms && (
                                  <>
                                    <p className="font-medium mt-4 mb-2">Symptoms:</p>
                                    <p className="text-gray-700">
                                      {selectedSummary.patient_details.symptoms}
                                    </p>
                                  </>
                                )}

                                {selectedSummary.additional_info?.notes && (
                                  <>
                                    <p className="font-medium mt-4 mb-2">Doctor's Notes:</p>
                                    <p className="text-gray-700 whitespace-pre-line">
                                      {selectedSummary.additional_info.notes}
                                    </p>
                                  </>
                                )}
                                
                                {selectedSummary.patient_details.current_medications && (
                                  <>
                                    <p className="font-medium mt-4 mb-2">Current Medications:</p>
                                    <p className="text-gray-700">
                                      {selectedSummary.patient_details.current_medications}
                                    </p>
                                  </>
                                )}
                                
                                {selectedSummary.patient_details.allergies && (
                                  <>
                                    <p className="font-medium mt-4 mb-2">Allergies:</p>
                                    <p className="text-gray-700">
                                      {selectedSummary.patient_details.allergies}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white shadow-sm rounded-lg p-6">
                        <p className="text-gray-500">Select an appointment to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Complete Medical Records Tab content removed since we're now linking directly to the medical records page */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPHealthRecord;
