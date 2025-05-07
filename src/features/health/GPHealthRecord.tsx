import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import { Link } from 'react-router-dom';
import { 
  fetchMedicalRecords, 
  isMedAccessTokenValid, 
  clearMedAccessToken, 
  ERROR_CODES 
} from './medicalRecordsAuthService';

// Import the service singleton
import medicalRecordsService from './medicalRecordsService';

interface RecordType {
  id: string;
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
}

// Sample appointment summaries for demonstration
const mockAppointments: RecordType[] = [
  {
    id: '1',
    date: '2025-05-07',
    formattedDate: 'May 07, 2025 at 06:14 PM',
    provider: 'Dr. Fatima Yusuf',
    title: 'Emergency Visit',
    summary: 'Patient presented with headache, fatigue, and mild fever for the past 3 days.',
    details: 'Temperature: 37.5°C\nBlood Pressure: 130/85 mmHg',
    type: 'doctorInteraction',
    hospital: 'St. Nicholas Hospital Lagos',
    department: 'Emergency',
    doctorName: 'Dr. Fatima Yusuf',
    patientName: 'Goldin Eruwa'
  },
  {
    id: '2',
    date: '2025-04-15',
    formattedDate: 'April 15, 2025 at 10:30 AM',
    provider: 'Dr. James Wilson',
    title: 'Regular Check-up',
    summary: 'Routine health check-up. Patient in good health.',
    details: 'Blood pressure normal. Weight stable.',
    type: 'doctorInteraction',
    hospital: 'St. Nicholas Hospital Lagos',
    department: 'General Practice',
    doctorName: 'Dr. James Wilson',
    patientName: 'Goldin Eruwa'
  },
  {
    id: '3',
    date: '2025-03-22',
    formattedDate: 'March 22, 2025 at 02:15 PM',
    provider: 'Dr. Sarah Johnson',
    title: 'Follow-up Appointment',
    summary: 'Follow-up on previous treatment. Symptoms improving.',
    details: 'Patient reports improved condition. Medication continued.',
    type: 'doctorInteraction',
    hospital: 'St. Nicholas Hospital Lagos',
    department: 'Internal Medicine',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'Goldin Eruwa'
  }
];

const GPHealthRecord: React.FC = () => {
  const { user, isLoading, error: authError, hasPrimaryHospital, primaryHospital, checkPrimaryHospital } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);
  const [activeTab, setActiveTab] = useState<'appointment' | 'complete'>('appointment');
  
  // Add state for medical record access
  const [accessState, setAccessState] = useState<'checking' | 'need_auth' | 'loading' | 'verifying' | 'authorized' | 'error'>('checking');
  const [medicalAccessError, setMedicalAccessError] = useState<string>('');
  const [accessExpiry, setAccessExpiry] = useState<Date | null>(null);
  
  // Add state for doctor interactions (appointments)
  const [appointments, setAppointments] = useState<RecordType[]>(mockAppointments);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState<boolean>(false);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);

  // Load data when component mounts
  useEffect(() => {
    // For appointment summaries, we don't need OTP verification
    // so we can fetch them right away
    fetchAppointmentSummaries();
    
    // For complete medical records access,
    // we'd need to check for OTP verification
    checkMedicalRecordsAccess();
    
    // Select the first record by default
    if (appointments.length > 0 && !selectedRecord) {
      setSelectedRecord(appointments[0]);
    }
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
  
  // Fetch appointment summaries
  const fetchAppointmentSummaries = async () => {
    setIsLoadingAppointments(true);
    setAppointmentsError(null);
    
    try {
      // In a real implementation, this would be an API call
      // For now, we'll use the mock data
      setAppointments(mockAppointments);
      
      if (mockAppointments.length > 0 && !selectedRecord) {
        setSelectedRecord(mockAppointments[0]);
      }
      
      // We successfully got appointment summaries
      setAccessState('authorized');
      
      // Set a dummy expiry time for UI display
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 30); 
      setAccessExpiry(expiryTime);
    } catch (err) {
      console.error('Error fetching appointment summaries:', err);
      setAppointmentsError('An unexpected error occurred while fetching appointment summaries');
    } finally {
      setIsLoadingAppointments(false);
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
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('appointment')}
                    className={`py-3 px-4 text-sm font-medium ${
                      activeTab === 'appointment' 
                        ? 'border-b-2 border-blue-500 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Appointment Summaries
                  </button>
                  <button
                    onClick={() => setActiveTab('complete')}
                    className={`py-3 px-4 text-sm font-medium ${
                      activeTab === 'complete' 
                        ? 'border-b-2 border-blue-500 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Complete Medical Records
                  </button>
                </div>
              </div>

              {/* Content based on selected tab */}
              {activeTab === 'appointment' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - List of Appointments */}
                  <div className="col-span-1">
                    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summaries</h3>
                      
                      {accessState === 'authorized' ? (
                        <div className="bg-green-50 flex justify-between items-center px-3 py-2 rounded-md mb-4">
                          <span className="text-sm text-green-700">Access expires: {formatExpiryTime()}</span>
                        </div>
                      ) : null}
                      
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
                          No appointment summaries available.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {appointments.map(record => (
                            <div
                              key={record.id}
                              onClick={() => setSelectedRecord(record)}
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
                                  <p className="font-medium text-sm">Patient: {record.patientName}</p>
                                  <div className="text-sm text-gray-600">
                                    {record.provider} - {record.hospital}
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
                    {selectedRecord ? (
                      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">
                                HPN Number: UNK 530 796 6405
                              </div>
                              <div className="text-xs text-gray-500">
                                Primary Hospital: {selectedRecord.hospital}
                              </div>
                            </div>
                            <div className="bg-green-50 px-3 py-1 rounded-md">
                              <p className="text-xs text-green-700">
                                Access expires: {formatExpiryTime()}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Summary Details</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="text-xl font-medium mb-4">Appointment Summary</h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                  <p className="text-sm text-gray-500">Date</p>
                                  <p className="font-medium">
                                    {selectedRecord.formattedDate || formatDate(selectedRecord.date)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Doctor</p>
                                  <p className="font-medium">{selectedRecord.provider}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Hospital</p>
                                  <p className="font-medium">{selectedRecord.hospital}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Department</p>
                                  <p className="font-medium">{selectedRecord.department}</p>
                                </div>
                              </div>
                              
                              <h4 className="font-medium mb-2">Medical Summary</h4>
                              <div className="bg-white p-4 rounded-md">
                                <p className="font-medium mb-2">Patient: {selectedRecord.patientName}</p>
                                
                                <p className="font-medium mt-4 mb-2">Presenting Complaint:</p>
                                <p className="text-gray-700">{selectedRecord.summary}</p>
                                
                                <p className="font-medium mt-4 mb-2">Examination:</p>
                                <p className="text-gray-700">
                                  - Temperature: 37.5°C<br />
                                  - Blood Pressure: 130/85 mmHg
                                </p>
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

              {/* Complete Medical Records Tab */}
              {activeTab === 'complete' && (
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Complete Medical Records</h3>
                  
                  {accessState === 'authorized' ? (
                    <div>
                      <div className="bg-green-50 flex justify-between items-center px-4 py-2 rounded-md mb-6">
                        <span className="text-sm text-green-700">Secure access granted - expires in {formatExpiryTime()}</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        Your complete medical records will be displayed here. This section is currently under development.
                      </p>
                    </div>
                  ) : accessState === 'need_auth' ? (
                    <div>
                      <div className="bg-yellow-50 p-4 rounded-md mb-6">
                        <p className="text-yellow-700">
                          Your complete medical records require additional verification to view.
                        </p>
                      </div>
                      
                      <button
                        onClick={() => setAccessState('loading')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Verify Identity to Access Records
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center py-6">
                      <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPHealthRecord;
