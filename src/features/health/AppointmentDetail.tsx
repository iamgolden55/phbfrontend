import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import { useAuth } from '../auth/authContext';

interface AppointmentDetail {
  id: string;
  date: string;
  time: string;
  duration: string;
  type: 'in-person' | 'phone' | 'video';
  provider: string;
  specialty: string;
  location: string;
  status: 'scheduled' | 'cancelled' | 'completed' | 'missed' | 'rescheduled';
  reason?: string;
  chief_complaint?: string;
  department_name?: string;
  hospital_name?: string;
  doctor_full_name?: string;
  appointment_type?: string;
  symptoms_data?: Array<{
    body_part_id: string;
    body_part_name: string;
    symptom_name: string;
    description?: string;
  }>;
  summaryDetails?: {
    diagnosis?: string;
    treatment?: string;
    followUp?: string;
    notes?: string;
    prescriptions?: Array<{
      name: string;
      dosage: string;
      instructions: string;
    }>;
    vitalSigns?: {
      bloodPressure?: string;
      heartRate?: string;
      temperature?: string;
      respiratoryRate?: string;
      oxygenSaturation?: string;
    };
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';
const AUTH_TOKEN_KEY = 'phb_auth_token';

// Mock data - in production this would come from API
const MOCK_APPOINTMENT: AppointmentDetail = {
  id: 'APP-123456',
  date: '2025-04-15',
  time: '09:30',
  duration: '20 min',
  type: 'in-person',
  provider: 'Dr. Sarah Johnson',
  specialty: 'General Practice',
  location: 'PHB Medical Center - North Wing',
  status: 'scheduled',
  reason: 'Annual check-up',
  summaryDetails: {
    diagnosis: 'Seasonal allergies, mild hypertension',
    treatment: 'Prescribed antihistamine and recommended lifestyle changes for blood pressure management',
    followUp: 'Follow-up appointment in 3 months',
    notes: 'Patient reports feeling generally well but with occasional seasonal allergy symptoms',
    prescriptions: [
      {
        name: 'Loratadine',
        dosage: '10mg',
        instructions: 'Take one tablet daily'
      }
    ],
    vitalSigns: {
      bloodPressure: '135/85 mmHg',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      respiratoryRate: '16 breaths/min',
      oxygenSaturation: '98%'
    }
  }
};

const AppointmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [appointment, setAppointment] = useState<AppointmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/account/appointments/${id}` } });
      return;
    }

    const fetchAppointmentDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
        
        if (!authToken) {
          throw new Error('Authentication required');
        }

        try {
          // Attempt to get data from actual API
          const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/appointments/${id}/`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Accept': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch appointment details');
          }

          const data = await response.json();
          console.log("API response data:", data);
          
          // Log symptoms data if available for debugging
          if (data.symptoms_data) {
            console.log("Symptoms data found:", data.symptoms_data);
          } else {
            console.log("No symptoms data found in response");
          }
          
          // Process the API response data to match our interface
          const processedAppointment: AppointmentDetail = {
            id: data.id || data.appointment_id || id || '',
            date: data.date || (data.appointment_date ? data.appointment_date.split('T')[0] : ''),
            time: data.time || (data.appointment_date ? new Date(data.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''),
            duration: data.duration ? `${data.duration} min` : '30 min',
            type: data.appointment_type?.includes('video') ? 'video' : 
                  data.appointment_type?.includes('phone') ? 'phone' : 'in-person',
            provider: data.doctor_full_name || data.doctor_name || 'Doctor',
            specialty: data.department_name || data.specialty || 'General',
            location: data.location || data.hospital_name || 'PHB Medical Center',
            status: data.status || 'scheduled',
            reason: data.chief_complaint || data.reason || '',
            // Store additional API fields
            chief_complaint: data.chief_complaint || '',
            department_name: data.department_name || '',
            hospital_name: data.hospital_name || '',
            doctor_full_name: data.doctor_full_name || '',
            appointment_type: data.appointment_type || '',
            // Store symptoms data if available - handle different possible formats
            symptoms_data: data.symptoms_data || 
                           (data.appointment_data?.symptoms_data) || 
                           (data.symptoms && Array.isArray(data.symptoms) ? data.symptoms.map((s: any) => ({
                             body_part_id: s.body_part_id || s.bodyPartId || '',
                             body_part_name: s.body_part_name || s.bodyPartName || '',
                             symptom_name: s.symptom_name || s.symptomName || '',
                             description: s.description || ''
                           })) : []),
            // Process summary details if available
            summaryDetails: data.medical_summary ? {
              diagnosis: data.medical_summary.diagnosis || '',
              treatment: data.medical_summary.treatment || '',
              followUp: data.medical_summary.follow_up || '',
              notes: data.medical_summary.notes || '',
              prescriptions: data.medical_summary.prescriptions || [],
              vitalSigns: data.medical_summary.vital_signs || {}
            } : undefined
          };
          
          console.log("Processed appointment with symptoms:", processedAppointment);
          
          setAppointment(processedAppointment);
        } catch (apiError) {
          console.error('API error, falling back to mock data:', apiError);
          // Fallback to mock data for development/testing
          setAppointment({...MOCK_APPOINTMENT, id: id || MOCK_APPOINTMENT.id});
        }
      } catch (err) {
        console.error('Error fetching appointment details:', err);
        setError('Failed to load appointment details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id, isAuthenticated, navigate]);

  const handleViewSummary = () => {
    if (!appointment) return;
    
    setSummaryLoading(true);
    setSummaryError(null);
    
    // Open the summary in a new tab/window
    window.open(`${API_BASE_URL.replace(/\/$/, '')}/api/appointments/${appointment.id}/summary/`, '_blank');
    
    setSummaryLoading(false);
  };

  const handleAddToCalendar = () => {
    if (!appointment) return;
    
    // Open the calendar endpoint in a new tab/window
    window.open(`${API_BASE_URL.replace(/\/$/, '')}/api/appointments/${appointment.id}/calendar/`, '_blank');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatDateTime = (date: string, time: string) => {
    return `${formatDate(date)} at ${time}`;
  };

  const getAppointmentTypeLabel = (type: string) => {
    switch (type) {
      case 'in-person': return 'In-Person Visit';
      case 'phone': return 'Phone Consultation';
      case 'video': return 'Video Consultation';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      case 'missed': return 'Missed';
      case 'rescheduled': return 'Rescheduled';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'missed': return 'text-yellow-600 bg-yellow-50';
      case 'rescheduled': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <AccountHealthLayout title="Appointment Details">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005eb8]"></div>
            <span className="ml-3 text-gray-700">Loading appointment details...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
            <Link 
              to="/account/appointments/view" 
              className="mt-4 inline-block text-blue-700 hover:underline"
            >
              Back to appointments
            </Link>
          </div>
        ) : appointment ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Appointment Details</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusLabel(appointment.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-4">Appointment Information</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Appointment ID</h4>
                    <p className="text-gray-900">{appointment.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                    <p className="text-gray-900">{formatDateTime(appointment.date, appointment.time)} ({appointment.duration})</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Type</h4>
                    <p className="text-gray-900">{getAppointmentTypeLabel(appointment.type)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="text-gray-900">{appointment.location || appointment.hospital_name}</p>
                  </div>
                  {/* Display symptoms based on availability */}
                  {appointment.symptoms_data && appointment.symptoms_data.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Symptoms</h4>
                      <ul className="list-disc list-inside text-gray-900 ml-2">
                        {appointment.symptoms_data.map((symptom, index) => (
                          <li key={index}>
                            {symptom.body_part_name} - {symptom.symptom_name}
                            {symptom.description && <span className="text-gray-600 ml-1">({symptom.description})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (appointment.reason || appointment.chief_complaint) && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Reason for Visit</h4>
                      <p className="text-gray-900">{appointment.chief_complaint || appointment.reason}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-4">Provider Information</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Healthcare Provider</h4>
                    <p className="text-gray-900">{appointment.provider || appointment.doctor_full_name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Specialty</h4>
                    <p className="text-gray-900">{appointment.specialty || appointment.department_name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Summary Section */}
            {appointment.summaryDetails && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Appointment Summary</h3>
                <div className="bg-blue-50 p-4 rounded-md space-y-4">
                  {appointment.summaryDetails.diagnosis && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Diagnosis</h4>
                      <p className="text-blue-900">{appointment.summaryDetails.diagnosis}</p>
                    </div>
                  )}
                  
                  {appointment.summaryDetails.treatment && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Treatment Plan</h4>
                      <p className="text-blue-900">{appointment.summaryDetails.treatment}</p>
                    </div>
                  )}
                  
                  {appointment.summaryDetails.followUp && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Follow-up Instructions</h4>
                      <p className="text-blue-900">{appointment.summaryDetails.followUp}</p>
                    </div>
                  )}
                  
                  {appointment.summaryDetails.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Provider Notes</h4>
                      <p className="text-blue-900">{appointment.summaryDetails.notes}</p>
                    </div>
                  )}
                  
                  {appointment.summaryDetails.prescriptions && appointment.summaryDetails.prescriptions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Prescriptions</h4>
                      <ul className="list-disc list-inside text-blue-900 ml-2">
                        {appointment.summaryDetails.prescriptions.map((prescription, index) => (
                          <li key={index}>
                            <strong>{prescription.name}</strong> ({prescription.dosage}) - {prescription.instructions}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {appointment.summaryDetails.vitalSigns && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Vital Signs</h4>
                      <div className="grid grid-cols-2 gap-2 text-blue-900">
                        {appointment.summaryDetails.vitalSigns.bloodPressure && (
                          <div>Blood Pressure: {appointment.summaryDetails.vitalSigns.bloodPressure}</div>
                        )}
                        {appointment.summaryDetails.vitalSigns.heartRate && (
                          <div>Heart Rate: {appointment.summaryDetails.vitalSigns.heartRate}</div>
                        )}
                        {appointment.summaryDetails.vitalSigns.temperature && (
                          <div>Temperature: {appointment.summaryDetails.vitalSigns.temperature}</div>
                        )}
                        {appointment.summaryDetails.vitalSigns.respiratoryRate && (
                          <div>Respiratory Rate: {appointment.summaryDetails.vitalSigns.respiratoryRate}</div>
                        )}
                        {appointment.summaryDetails.vitalSigns.oxygenSaturation && (
                          <div>Oxygen Saturation: {appointment.summaryDetails.vitalSigns.oxygenSaturation}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/account/appointments/view"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Appointments
              </Link>
              
              {appointment.status === 'scheduled' && (
                <>
                  <button
                    onClick={handleAddToCalendar}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Add to Calendar
                  </button>
                  {appointment.type === 'video' && (
                    <a
                      href="#join-video-call"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Join Video Call
                    </a>
                  )}
                </>
              )}
             
            </div>
            
            {summaryError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
                <p className="text-sm text-red-700">{summaryError}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-yellow-700">Appointment not found. It may have been cancelled or removed.</p>
            <Link 
              to="/account/appointments/view" 
              className="mt-4 inline-block text-blue-700 hover:underline"
            >
              Back to appointments
            </Link>
          </div>
        )}
      </div>
    </AccountHealthLayout>
  );
};

export default AppointmentDetail; 