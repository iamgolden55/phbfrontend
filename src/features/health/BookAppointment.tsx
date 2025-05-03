import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import { useAuth } from '../auth/authContext';

interface AppointmentFormData {
  appointmentType: string;
  specialtyNeeded: string;
  preferredLanguage: string;
  urgency: string;
  preferredDate: string;
  preferredTimeSlot: string;
  symptoms: string;
  additionalNotes: string;
}

interface AppointmentType {
  id: string;
  name: string;
  description?: string;
}

interface Department {
  id: number;
  name: string;
  code?: string;
  description?: string;
}

interface Doctor {
  doctor_id: number;
  doctor_name: string;
  department_id: number;
  available_dates: string[];
  available_slots?: TimeSlot[];
  specialty?: string;
  languages?: string[];
}

interface TimeSlot {
  start: string;
  end: string;
}

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin',
  'Arabic',
  'Hindi',
  'Portuguese',
  'Russian',
  'Japanese'
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/'; // Fallback if .env is missing
const AUTH_TOKEN_KEY = 'phb_auth_token';

// Helper function for making API calls (reusing pattern from authContext)
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`; // Ensure no double slashes
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  const authToken = token || localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    // Handle empty responses (e.g., 204 No Content)
    if (response.status === 204) {
      return null as T;
    }

    const data = await response.json();

    if (!response.ok) {
      // Throw an error object that includes status and message
      const error: any = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data; // Attach full response data if needed
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error(`API request failed: ${method} ${endpoint}`, error);
    throw error;
  }
}

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); // Use auth context
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    appointmentType: '',
    specialtyNeeded: '',
    preferredLanguage: 'English', // Default value
    urgency: 'routine',
    preferredDate: '',
    preferredTimeSlot: '',
    symptoms: '',
    additionalNotes: ''
  });
  
  // API data states
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [matchedDoctor, setMatchedDoctor] = useState<Doctor | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch appointment types and departments on component mount
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/account/appointments/book' } });
      return;
    }
    
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        // Fetch appointment types and departments from the actual API endpoints
        const appointmentTypesResponse = await apiRequest<AppointmentType[]>('/api/appointment-types/');
        
        // Handle the new departments response format
        const departmentsResponse = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/departments/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            'Accept': 'application/json',
          }
        });

        // Parse the departments response
        const departmentsData = await departmentsResponse.json();

        // Handle different response status codes
        if (!departmentsResponse.ok) {
          switch (departmentsResponse.status) {
            case 403:
              throw new Error('You are not registered with this hospital. Please contact support.');
            case 404:
              throw new Error('No primary hospital found. Please register with a hospital first.');
            default:
              throw new Error(`Failed to fetch departments: ${departmentsData.message || 'Unknown error'}`);
          }
        }

        // Validate the success response format
        if (departmentsData.status !== 'success' || !Array.isArray(departmentsData.departments)) {
          throw new Error('Invalid department data received from server');
        }

        setAppointmentTypes(appointmentTypesResponse);
        setDepartments(departmentsData.departments);
      } catch (error: any) {
        setSubmissionError(error.message);
        setDepartments([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [isAuthenticated, navigate]);

  // Dynamically fetch available slots when date changes on step 3
  useEffect(() => {
    // Only run when on step 3 and a date is selected
    if (currentStep === 3 && formData.preferredDate) {
      // Debounce to avoid spamming API if user changes date quickly
      const debounceTimeout = setTimeout(() => {
        // Reset selected time slot when date changes
        setFormData(prev => ({
          ...prev,
          preferredTimeSlot: ''
        }));
        matchWithDoctor();
      }, 400); // 400ms debounce
      return () => clearTimeout(debounceTimeout);
    }
    // eslint-disable-next-line
  }, [formData.preferredDate, currentStep]);

  // When form data changes, we might want to update the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Format appointment type to match backend expectations (if needed)
    if (name === 'appointmentType') {
      // Capitalize first letter of each word for appointment type
      const formattedValue = value.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Match with a doctor after the Preferences step and get available time slots
  const matchWithDoctor = async () => {
    setIsLoading(true);
    setSubmissionError(null);
    
    try {
      // Find department ID from selection
      const selectedDepartment = departments.find(d => d.name === formData.specialtyNeeded);
      if (!selectedDepartment) {
        throw new Error('Please select a valid medical specialty');
      }
      
      // Map UI urgency levels to API values
      const priorityMapping: { [key: string]: string } = {
        "routine": "normal",
        "soon": "priority",
        "urgent": "emergency"
      };
      
      // Format the date in the required format (YYYY-MM-DD)
      const dateToSend = formData.preferredDate || new Date().toISOString().split('T')[0];
      
      console.log('Sending doctor assignment request with date:', dateToSend);
      
      // Call the doctor assignment API using fetch directly for maximum control
      const url = `${API_BASE_URL.replace(/\/$/, '')}/api/doctor-assignment/`;
      const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
        body: JSON.stringify({
          appointment_type: formData.appointmentType,
          department: selectedDepartment.id,
          chief_complaint: formData.symptoms || 'General checkup',
          priority: priorityMapping[formData.urgency],
          preferred_date: dateToSend,
          preferred_language: formData.preferredLanguage
        })
      });
      
      // Get the raw text response for debugging
      const responseText = await response.text();
      console.log('RAW DOCTOR ASSIGNMENT RESPONSE TEXT:', responseText);
      
      // Try to parse the JSON
      let jsonData;
      try {
        jsonData = JSON.parse(responseText);
        console.log('PARSED DOCTOR ASSIGNMENT RESPONSE:', jsonData);
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        throw new Error('Invalid JSON response from server');
      }
      
      // Check if the response indicates an error
      if (jsonData.status === 'error') {
        throw new Error(jsonData.message || 'Error from doctor matching service');
      }
      
      // Check if the response is successful
      if (jsonData.status !== 'success') {
        throw new Error('Invalid response from doctor matching service');
      }
      
      // Extract department and appointment type info from the response
      const departmentInfo = jsonData.department || {};
      const appointmentTypeInfo = jsonData.appointment_type || {};
      
      // Use default doctor info when backend doesn't specify a doctor
      const doctorInfo = {
        doctor_id: jsonData.doctor_id || 1, // Use placeholder ID
        doctor_name: jsonData.doctor_name || `Doctor from ${departmentInfo.name || formData.specialtyNeeded}`,
        department_id: departmentInfo.id || selectedDepartment.id,
        available_dates: [jsonData.preferred_date || dateToSend],
        specialty: departmentInfo.name || formData.specialtyNeeded
      };
      
      console.log('Created doctor info:', doctorInfo);
      setMatchedDoctor(doctorInfo);

      // Process available time slots
      console.log('Checking for available_slots in the response');
      if (jsonData.available_slots && Array.isArray(jsonData.available_slots)) {
        console.log('Available slots found:', jsonData.available_slots.length);
        
        // Format the time slots
        const processedSlots = jsonData.available_slots.map((slot: any) => {
          console.log('Processing slot:', slot);
          
          if (slot && typeof slot === 'object' && slot.time) {
            // Extract the time (e.g., "09:00")
            const timeStr = slot.time;
            // Split the time into hours and minutes
            const [hours, minutes] = timeStr.split(':').map(Number);
            
            // Calculate end time (30 minutes later)
            const endMinutes = minutes + 30;
            const endHours = hours + Math.floor(endMinutes / 60);
            const normalizedEndMinutes = endMinutes % 60;
            
            // Format times with seconds for consistency
            const startTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
            const endTime = `${String(endHours).padStart(2, '0')}:${String(normalizedEndMinutes).padStart(2, '0')}:00`;
            
            console.log(`Slot ${timeStr} formatted as ${startTime} - ${endTime}`);
            
            return {
              start: startTime,
              end: endTime
            };
          }
          
          // Fallback for unexpected formats
          return {
            start: String(slot),
            end: ''
          };
        });
        
        console.log('Formatted time slots:', processedSlots);
        
        // Set the time slots
        setAvailableTimeSlots(processedSlots);
        
        // Set preferred date
        setFormData(prev => ({
          ...prev,
          preferredDate: jsonData.preferred_date || dateToSend
        }));
      } else {
        console.log('No available slots found in the response');
        setAvailableTimeSlots([]);
      }
      
    } catch (error: any) {
      console.error('Error matching with doctor:', error);
      setSubmissionError(error.message || 'Error matching with a doctor');
      setAvailableTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedDoctor) {
      setSubmissionError('No doctor matched. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
      
      // Format the appointment date and time
      // Parse the selected time slot (e.g., "9:00 AM - 9:30 AM") to extract the start time
      let hours = 0;
      let minutes = 0;
      
      if (formData.preferredTimeSlot) {
        // Extract just the start time portion (e.g., "9:00 AM")
        const startTimeStr = formData.preferredTimeSlot.split(' - ')[0];
        
        // Parse hours and minutes, handling AM/PM
        const timeMatch = startTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeMatch) {
          let parsedHours = parseInt(timeMatch[1]);
          const parsedMinutes = parseInt(timeMatch[2]);
          const period = timeMatch[3].toUpperCase();
          
          // Convert 12-hour format to 24-hour format
          if (period === 'PM' && parsedHours < 12) {
            parsedHours += 12;
          } else if (period === 'AM' && parsedHours === 12) {
            parsedHours = 0;
          }
          
          hours = parsedHours;
          minutes = parsedMinutes;
        }
      }
      
      // Set the time on the appointment date
      const appointmentDate = new Date(formData.preferredDate);
      appointmentDate.setHours(hours, minutes, 0);
      const appointmentDateTime = appointmentDate.toISOString();
      
      console.log('Sending appointment with datetime:', appointmentDateTime);

      // Map urgency levels to API values
      const priorityMapping: { [key: string]: string } = {
        "routine": "normal",
        "soon": "priority",
        "urgent": "emergency"
      };
      
      // Submit appointment to API
      const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/appointments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
        body: JSON.stringify({
          department_id: matchedDoctor.department_id,
          appointment_date: appointmentDateTime,
          appointment_type: formData.appointmentType,
          priority: priorityMapping[formData.urgency],
          chief_complaint: formData.symptoms || 'General checkup'
          // Removed doctor_id, additional_notes, and preferred_language as per backend expectations
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment. Please try again.');
      }

      const appointmentData = await response.json();
      
      // Navigate to confirmation page with details
      navigate('/account/appointments/confirmation', {
        state: {
          appointmentDetails: {
            ...formData,
            appointmentId: appointmentData.id,
            doctorName: matchedDoctor.doctor_name,
            doctorSpecialty: formData.specialtyNeeded,
            location: appointmentData.location || 'PHB Virtual Care',
            dateConfirmed: formData.preferredDate,
            timeConfirmed: formData.preferredTimeSlot
          }
        }
      });
    } catch (error: any) {
      console.error('Error submitting appointment:', error);
      setSubmissionError(error.message || 'Failed to create appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function for error messages
  const getErrorMessage = (error: any): string => {
    if (error.response) {
      if (error.response.status === 400) {
        // Extract validation errors
        const validationErrors = error.response.data;
        let errorMessage = 'Please correct the following: ';
        
        if (typeof validationErrors === 'object') {
          for (const field in validationErrors) {
            const fieldErrors = validationErrors[field];
            if (Array.isArray(fieldErrors)) {
              errorMessage += `${field}: ${fieldErrors.join(', ')}. `;
            } else if (typeof fieldErrors === 'string') {
              errorMessage += `${field}: ${fieldErrors}. `;
            }
          }
        } else {
          errorMessage = 'Validation error. Please check your information.';
        }
        
        return errorMessage;
      } else if (error.response.status === 401 || error.response.status === 403) {
        return 'Authentication error. Please login again.';
      } else if (error.response.status === 409) {
        return 'This time slot is no longer available. Please select another time.';
      } else {
        return 'Server error. Please try again later.';
      }
    } else if (error.request) {
      return 'Cannot connect to server. Check your internet connection.';
    } else {
      return error.message || 'An error occurred. Please try again.';
    }
  };

  const goToNextStep = async () => {
    if (currentStep < 4) {
      // If we're moving from step 2 (Preferences) to step 3, match with a doctor first
      if (currentStep === 2) {
        await matchWithDoctor();
      }
      
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.appointmentType && !!formData.specialtyNeeded;
      case 2:
        return !!formData.preferredLanguage && !!formData.urgency;
      case 3:
        return !!formData.preferredDate && !!formData.preferredTimeSlot;
      case 4:
        return true; // Final review step
      default:
        return false;
    }
  };

  // Format time slot for display
  const formatTimeSlot = (timeSlot: TimeSlot): string => {
    // Convert "09:00:00" format to "09:00 AM - 09:30 AM" for display
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    };
    
    return `${formatTime(timeSlot.start)} - ${formatTime(timeSlot.end)}`;
  };

  return (
    <AccountHealthLayout title="Book an Appointment">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

        <div className="mb-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
              <div
                className="bg-[#005eb8] transition-all ease-out duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <div className={`text-xs font-medium ${currentStep >= 1 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Basic Info
              </div>
              <div className={`text-xs font-medium ${currentStep >= 2 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Preferences
              </div>
              <div className={`text-xs font-medium ${currentStep >= 3 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Schedule
              </div>
              <div className={`text-xs font-medium ${currentStep >= 4 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Confirm
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005eb8]"></div>
            <span className="ml-3 text-gray-700">Loading...</span>
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Appointment Details</h3>
                <p className="text-gray-600 mb-4">
                  Tell us what type of appointment you need and which medical specialty.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Type *
                    </label>
                    <select
                      id="appointmentType"
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select appointment type</option>
                      {Array.isArray(appointmentTypes) && appointmentTypes.map(type => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="specialtyNeeded" className="block text-sm font-medium text-gray-700 mb-1">
                      Medical Specialty Needed *
                    </label>
                    <select
                      id="specialtyNeeded"
                      name="specialtyNeeded"
                      value={formData.specialtyNeeded}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select specialty</option>
                      {Array.isArray(departments) && departments.map(department => (
                        <option key={department.id} value={department.name}>{department.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={!validateCurrentStep()}
                      className={`w-full py-3 px-4 rounded-md text-white font-medium
                        ${validateCurrentStep()
                          ? 'bg-[#005eb8] hover:bg-[#004c93]'
                          : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Your Preferences</h3>
                <p className="text-gray-600 mb-4">
                  Help us match you with the right healthcare provider based on your needs.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Language *
                    </label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      {LANGUAGES.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level *
                      </legend>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="urgency-routine"
                            name="urgency"
                            type="radio"
                            value="routine"
                            checked={formData.urgency === 'routine'}
                            onChange={handleInputChange}
                            className="h-4 w-4 border-gray-300 text-[#005eb8] focus:ring-[#005eb8]"
                          />
                          <label htmlFor="urgency-routine" className="ml-3 text-sm text-gray-700">
                            Routine - I need an appointment within the next few weeks
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="urgency-soon"
                            name="urgency"
                            type="radio"
                            value="soon"
                            checked={formData.urgency === 'soon'}
                            onChange={handleInputChange}
                            className="h-4 w-4 border-gray-300 text-[#005eb8] focus:ring-[#005eb8]"
                          />
                          <label htmlFor="urgency-soon" className="ml-3 text-sm text-gray-700">
                            Soon - I need an appointment within the next week
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="urgency-urgent"
                            name="urgency"
                            type="radio"
                            value="urgent"
                            checked={formData.urgency === 'urgent'}
                            onChange={handleInputChange}
                            className="h-4 w-4 border-gray-300 text-[#005eb8] focus:ring-[#005eb8]"
                          />
                          <label htmlFor="urgency-urgent" className="ml-3 text-sm text-gray-700">
                            Urgent - I need an appointment in the next 24-48 hours
                          </label>
                        </div>
                      </div>
                    </fieldset>

                    {formData.urgency === 'urgent' && (
                      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                        <p className="text-sm text-yellow-800">
                          <strong>Important:</strong> For medical emergencies, please call emergency services
                          or go to your nearest emergency department immediately.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                      Brief Description of Symptoms
                    </label>
                    <textarea
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Please describe your symptoms or reason for the appointment"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={!validateCurrentStep()}
                      className={`py-3 px-4 rounded-md text-white font-medium
                        ${validateCurrentStep()
                          ? 'bg-[#005eb8] hover:bg-[#004c93]'
                          : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Schedule Your Appointment</h3>
                <p className="text-gray-600 mb-4">
                  Select your preferred date and time for the appointment.
                </p>

                {matchedDoctor && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-900 mb-2">Matched with Healthcare Provider</h4>
                    <p className="text-blue-800">
                      Based on your preferences, we've matched you with <strong>{matchedDoctor.doctor_name}</strong>, specializing in {matchedDoctor.specialty}.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {formData.preferredDate && Array.isArray(availableTimeSlots) && availableTimeSlots.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Available Time Slots *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableTimeSlots.map((timeSlot, index) => (
                          <div key={index} className="relative">
                            <input
                              id={`time-${index}`}
                              name="preferredTimeSlot"
                              type="radio"
                              value={formatTimeSlot(timeSlot)}
                              checked={formData.preferredTimeSlot === formatTimeSlot(timeSlot)}
                              onChange={handleInputChange}
                              className="sr-only peer"
                              required
                            />
                            <label
                              htmlFor={`time-${index}`}
                              className="flex items-center justify-center p-3 border rounded-md text-sm cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:bg-gray-50"
                            >
                              {formatTimeSlot(timeSlot)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.preferredDate && (!Array.isArray(availableTimeSlots) || availableTimeSlots.length === 0) && !isLoading && (
                    <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                      <p className="text-sm text-yellow-800">
                        No available time slots for this date. Please select a different date.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={!validateCurrentStep()}
                      className={`py-3 px-4 rounded-md text-white font-medium
                        ${validateCurrentStep()
                          ? 'bg-[#005eb8] hover:bg-[#004c93]'
                          : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Review & Confirm</h3>
                <p className="text-gray-600 mb-4">
                  Please review your appointment details before submitting.
                </p>

                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Appointment Type</h4>
                      <p className="text-black">{formData.appointmentType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Specialty</h4>
                      <p className="text-black">{formData.specialtyNeeded}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Preferred Language</h4>
                      <p className="text-black">{formData.preferredLanguage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Urgency</h4>
                      <p className="text-black capitalize">{formData.urgency}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date</h4>
                      <p className="text-black">
                        {formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : ''}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Time</h4>
                      <p className="text-black">{formData.preferredTimeSlot}</p>
                    </div>
                    {matchedDoctor && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Healthcare Provider</h4>
                        <p className="text-black">{matchedDoctor.doctor_name}</p>
                      </div>
                    )}
                  </div>

                  {formData.symptoms && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Symptoms/Reason</h4>
                      <p className="text-black">{formData.symptoms}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Any additional information for the healthcare provider"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>How doctor matching works:</strong> Our system will match you with an appropriate
                    healthcare provider based on your preferences, appointment type, and availability.
                    You'll receive a confirmation with the details of your appointment.
                  </p>
                </div>

                {submissionError && (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-sm text-red-700">{submissionError}</p>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 px-4 bg-[#005eb8] rounded-md text-white font-medium hover:bg-[#004c93] flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit Appointment Request"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h3>
          <ol className="space-y-4 ml-5 list-decimal">
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Matching:</span> Our system will match you with the most appropriate healthcare provider based on your preferences and requirements.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Confirmation:</span> You'll receive a confirmation email with your appointment details.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Reminders:</span> We'll send you reminders as your appointment date approaches.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Consultation:</span> Join your appointment via the method specified (in-person, phone, or video call).
            </li>
          </ol>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default BookAppointment;
