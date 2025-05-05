import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import MedicalRecordsOTP from './MedicalRecordsOTP';
import PatientProfile from './PatientProfile';
import medicalRecordsService from './medicalRecordsService';

// Define interface for auth user to fix type error
interface AuthUser {
  hpn?: string;
  [key: string]: any; // For any other properties the user object might have
}

interface MedicalRecord {
  id: string;
  date: string;
  title: string;
  type: string;
  provider: string;
  description: string;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
}

interface PatientData {
  hpn?: string;
  blood_type?: string | null;
  allergies?: string | null;
  chronic_conditions?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  last_visit_date?: string | null;
  diagnoses?: Array<any>;
  treatments?: Array<any>;
}

const MedicalRecords: React.FC = () => {
  // Fix the type of user
  const { user } = useAuth() as { user: AuthUser | null };
  const [accessState, setAccessState] = useState<'checking' | 'need_auth' | 'loading' | 'authorized' | 'error'>('checking');
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [error, setError] = useState<string>('');
  const [accessExpiry, setAccessExpiry] = useState<Date | null>(null);
  
  // Add state for countdown timer
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    checkAccess();
  }, []);
  
  // Add effect for countdown timer
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (accessExpiry) {
      // Update immediately
      updateRemainingTime();
      
      // Set up interval to update every second
      intervalId = window.setInterval(updateRemainingTime, 1000);
    }
    
    // Clean up interval on unmount or when expiry changes
    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
    
    function updateRemainingTime() {
      if (!accessExpiry) return;
      
      const now = new Date();
      const timeDiff = accessExpiry.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        // Time expired, clear interval and reload to show OTP screen
        if (intervalId !== undefined) {
          clearInterval(intervalId);
        }
        setRemainingTime('Expired');
        // Force reload after a brief delay
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return;
      }
      
      // Calculate minutes and seconds
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      // Format with leading zeros
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      
      setRemainingTime(`${formattedMinutes}:${formattedSeconds}`);
    }
  }, [accessExpiry]);

  const checkAccess = async () => {
    setAccessState('checking');
    console.log('Checking medical records access...');
    
    try {
      // Try to fetch medical records directly - this will check if we have valid tokens
      const result = await medicalRecordsService.getMedicalRecords();
      console.log('Medical records access check result:', result);
      
      if (result.status === 'success' && result.data) {
        // Debug the actual data structure in more detail
        console.log('Medical records data structure:', {
          type: typeof result.data,
          isArray: Array.isArray(result.data),
          keys: typeof result.data === 'object' ? Object.keys(result.data) : null,
          rawData: result.data // Log the raw data for inspection
        });
        
        // If it's a patient health profile (not an array of records)
        if (!Array.isArray(result.data) && typeof result.data === 'object' && result.data !== null) {
          if ('hpn' in result.data) {
            console.log('Data appears to be a patient profile');
            setPatientData(result.data as PatientData);
            setAccessState('authorized');
            
            // Set expiry time for UI display
            const expiresAt = localStorage.getItem('med_access_expires_at');
            if (expiresAt) {
              setAccessExpiry(new Date(parseInt(expiresAt)));
            } else {
              // No expiry stored, set default 15 min
              const expiryTime = new Date();
              expiryTime.setMinutes(expiryTime.getMinutes() + 15);
              setAccessExpiry(expiryTime);
            }
            return;
          }
        }
        
        // Handle the case where data might be an array of medical records
        try {
          if (Array.isArray(result.data)) {
            console.log('Data is an array with length:', result.data.length);
            
            // Data is already an array
            setRecords(result.data as MedicalRecord[]);
            setAccessState('authorized');
            
            // Set expiry time for UI display
            const expiresAt = localStorage.getItem('med_access_expires_at');
            if (expiresAt) {
              setAccessExpiry(new Date(parseInt(expiresAt)));
            } else {
              // No expiry stored, set default 15 min
              const expiryTime = new Date();
              expiryTime.setMinutes(expiryTime.getMinutes() + 15);
              setAccessExpiry(expiryTime);
            }
            return;
          } else {
            // Neither a patient profile nor an array of records
            console.error('Unexpected data format:', result.data);
            setError('The medical records data is not in the expected format.');
            setAccessState('error');
          }
        } catch (parseErr) {
          console.error('Error during data processing:', parseErr);
          setError('The medical records data could not be processed.');
          setAccessState('error');
        }
      } else if (result.code === 'MED_ACCESS_REQUIRED' || result.code === 'MED_ACCESS_EXPIRED' || result.code === 'INVALID_MED_ACCESS') {
        // We need to authorize with OTP - make sure this is set correctly
        console.log('Medical records access requires verification. Code:', result.code);
        setAccessState('need_auth');
      } else {
        // Some other error
        console.error('Error retrieving medical records:', result);
        setError(result.message || 'Failed to access medical records');
        setAccessState('error');
      }
    } catch (err) {
      console.error('Error checking medical records access:', err);
      setError('An unexpected error occurred. Please try again later.');
      setAccessState('error');
    }
  };

  const loadMedicalRecords = async () => {
    setAccessState('loading');
    setError('');
    
    try {
      console.log('Fetching medical records...');
      const result = await medicalRecordsService.getMedicalRecords();
      console.log('Medical records result:', result);
      
      if (result.status === 'success' && result.data) {
        // Debug the actual data structure in more detail
        console.log('Medical records data structure:', {
          type: typeof result.data,
          isArray: Array.isArray(result.data),
          keys: typeof result.data === 'object' ? Object.keys(result.data) : null,
          rawData: result.data // Log the raw data for inspection
        });
        
        // If it's a patient health profile (not an array of records)
        if (!Array.isArray(result.data) && typeof result.data === 'object' && result.data !== null) {
          if ('hpn' in result.data) {
            console.log('Data appears to be a patient profile');
            setPatientData(result.data as PatientData);
            setAccessState('authorized');
            
            // Set expiry time for UI display
            const expiresAt = localStorage.getItem('med_access_expires_at');
            if (expiresAt) {
              setAccessExpiry(new Date(parseInt(expiresAt)));
            } else {
              // No expiry stored, set default 15 min
              const expiryTime = new Date();
              expiryTime.setMinutes(expiryTime.getMinutes() + 15);
              setAccessExpiry(expiryTime);
            }
            return;
          }
        }
        
        // Handle the case where data might be an array of medical records
        try {
          if (Array.isArray(result.data)) {
            console.log('Data is an array with length:', result.data.length);
            
            // Data is already an array
            setRecords(result.data as MedicalRecord[]);
            setAccessState('authorized');
            
            // Set expiry time for UI display
            const expiresAt = localStorage.getItem('med_access_expires_at');
            if (expiresAt) {
              setAccessExpiry(new Date(parseInt(expiresAt)));
            } else {
              // No expiry stored, set default 15 min
              const expiryTime = new Date();
              expiryTime.setMinutes(expiryTime.getMinutes() + 15);
              setAccessExpiry(expiryTime);
            }
            return;
          } else {
            // Neither a patient profile nor an array of records
            console.error('Unexpected data format:', result.data);
            setError('The medical records data is not in the expected format.');
            setAccessState('error');
          }
        } catch (parseErr) {
          console.error('Error during data processing:', parseErr);
          setError('The medical records data could not be processed.');
          setAccessState('error');
        }
      } else if (result.code === 'MED_ACCESS_REQUIRED' || result.code === 'MED_ACCESS_EXPIRED' || result.code === 'INVALID_MED_ACCESS') {
        // We need to authorize with OTP
        console.log('Medical records access requires verification. Code:', result.code);
        setAccessState('need_auth');
      } else {
        // Handle specific error codes
        console.log('Error loading medical records:', result.code);
        setError(result.message || 'Failed to load medical records');
        setAccessState('error');
      }
    } catch (err) {
      console.error('Error loading medical records:', err);
      setError('An unexpected error occurred. Please try again later.');
      setAccessState('error');
    }
  };

  const handleVerificationSuccess = () => {
    console.log('OTP verification successful, loading medical records...');
    loadMedicalRecords();
  };

  const handleCancelVerification = () => {
    // Just show a message instead of the verification form
    console.log('OTP verification cancelled');
    setAccessState('need_auth');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Render the content based on access state
  const renderContent = () => {
    switch (accessState) {
      case 'checking':
      case 'loading':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005eb8]"></div>
            </div>
            <p className="text-center text-gray-600">
              Loading your medical records...
            </p>
          </div>
        );
        
      case 'need_auth':
        return (
          <MedicalRecordsOTP 
            onVerificationSuccess={handleVerificationSuccess} 
            onCancel={handleCancelVerification} 
          />
        );
        
      case 'error':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
            
            <div className="p-4 bg-red-50 rounded-md mb-6 text-red-700">
              {error || 'An error occurred while fetching your medical records.'}
            </div>
            
            <button
              onClick={checkAccess}
              className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e]"
            >
              Try Again
            </button>
          </div>
        );
        
      case 'authorized':
        // Check if we have patient profile data instead of medical records
        if (patientData) {
          return (
            <>
              {remainingTime && (
                <div className="mb-4 px-3 py-2 bg-green-100 text-green-800 rounded-md text-sm flex justify-between items-center">
                  <span className="font-medium">Session expires in:</span>
                  <span className="font-bold">{remainingTime}</span>
                </div>
              )}
              <PatientProfile data={patientData} expiryTime={null} />
            </>
          );
        }
        
        // Otherwise show medical records list (legacy format)
        return (
          <>
            {remainingTime && (
              <div className="mb-4 px-3 py-2 bg-green-100 text-green-800 rounded-md text-sm flex justify-between items-center">
                <span className="font-medium">Session expires in:</span>
                <span className="font-bold">{remainingTime}</span>
              </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Medical Records</h2>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-md mb-6">
                <p className="text-blue-700">
                  Your HPN number: {user?.hpn || patientData?.hpn || 'Not available'}
                </p>
              </div>
              
              {records.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-md">
                  <p className="text-gray-600 mb-2">No medical records found.</p>
                  <p className="text-sm text-gray-500">
                    If you believe this is an error, please contact your healthcare provider.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {records.map((record, index) => (
                    <div key={record.id || index} className="border rounded-md p-4 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{record.title || 'Unknown Title'}</h3>
                        <span className="text-sm text-gray-500">
                          {record.date ? formatDate(record.date) : 'Unknown Date'}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">
                        {record.provider || 'Unknown Provider'} • {record.type || 'Unknown Type'}
                      </p>
                      <p className="mb-3">{record.description || 'No description available'}</p>
                      
                      {record.attachments && record.attachments.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-sm font-medium mb-2">Attachments:</h4>
                          <div className="space-y-2">
                            {record.attachments.map((attachment, attachIndex) => (
                              <a 
                                key={attachment.id || attachIndex}
                                href={attachment.url}
                                className="flex items-center text-[#005eb8] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                {attachment.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
        
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
            <p>Something went wrong. Please refresh the page and try again.</p>
          </div>
        );
    }
  };

  return (
    <AccountHealthLayout>
      {renderContent()}
    </AccountHealthLayout>
  );
};

export default MedicalRecords;
