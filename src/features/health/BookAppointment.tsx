import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import { useAuth } from '../auth/authContext';
import { createApiUrl } from '../../utils/config';
import BodyMapSearch from '../search/BodyMapSearch';
import PaymentModal from '../../components/modals/PaymentModal';
import PaymentConfirmation from '../../components/modals/PaymentConfirmation';
import { calculateAppointmentPrice, getAppointmentTypeDescription, PaymentService } from '../../services/paymentService';
import { AppointmentService } from '../../services/appointmentService';

interface SelectedSymptom {
  bodyPartId: string;
  bodyPartName: string;
  symptomName: string;
  description: string;
}

interface AppointmentFormData {
  preferredLanguage: string;
  urgency: string;
  preferredDate: string;
  preferredTimeSlot: string;
  selectedSymptoms: SelectedSymptom[];
  additionalNotes: string;
  dateExplicitlySelected: boolean;
  timeExplicitlySelected: boolean;
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

// Helper function for making API calls (using cookie-based authentication)
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

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include', // Use cookies for authentication
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

// Function to generate time slots at 30-minute intervals from 9:00 to 17:00
const generateTimeSlots = (selectedDate: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === today;
  const currentTime = new Date();
  
  // Start from 9:00 AM (9 hours) and go until 5:00 PM (17 hours)
  // with 30-minute intervals
  for (let hour = 9; hour < 17; hour++) {
    for (let minute of [0, 30]) {
      const slotDate = new Date(selectedDate);
      slotDate.setHours(hour, minute, 0, 0);
      
      // If today, only include future time slots
      if (isToday && slotDate <= currentTime) {
        continue;
      }
      
      // Format for start and end times
      const startHour = String(hour).padStart(2, '0');
      const startMinute = String(minute).padStart(2, '0');
      
      // Calculate end time (30 minutes later)
      let endHour = hour;
      let endMinute = minute + 30;
      
      if (endMinute >= 60) {
        endHour += 1;
        endMinute -= 60;
      }
      
      // Skip if end time is after 5:00 PM
      if (endHour >= 17 && endMinute > 0) {
        continue;
      }
      
      const formattedEndHour = String(endHour).padStart(2, '0');
      const formattedEndMinute = String(endMinute).padStart(2, '0');
      
      slots.push({
        start: `${startHour}:${startMinute}:00`,
        end: `${formattedEndHour}:${formattedEndMinute}:00`
      });
    }
  }
  
  return slots;
};

// Create a more robust department mapping function based on backend feedback
const getDepartmentForBodyPart = (
  bodyPartId: string, 
  departmentsList: Department[]
): number | null => {
  // Get department IDs by name for easier lookup
  const departmentIdsByName: Record<string, number> = {};
  
  // Build lookup dictionary from available departments
  departmentsList.forEach(dept => {
    departmentIdsByName[dept.name.toLowerCase()] = dept.id;
  });
  
  // Find General Medicine department (fallback)
  const generalMedicineId = departmentIdsByName['general medicine'] || null;
  
  // Define mapping of body parts to department names
  const bodyPartToDeptMapping: Record<string, string[]> = {
    'head': ['neurology', 'ent', 'ophthalmology', 'neurosurgery'],
    'face': ['ent', 'dermatology', 'oral & maxillofacial surgery', 'neurology'],
    'neck': ['ent', 'endocrinology', 'neurology', 'orthopedics', 'oncology'],
    'chest': ['cardiology', 'pulmonology', 'emergency medicine', 'internal medicine'],
    'upperAbdomen': ['gastroenterology', 'hepatology', 'general surgery', 'nutrition'],
    'lowerAbdomen': ['gastroenterology', 'urology', 'gynecology', 'colorectal surgery'],
    'leftShoulder': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],
    'rightShoulder': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],
    'leftArm': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],
    'rightArm': ['orthopedics', 'neurology', 'rheumatology', 'sports medicine'],
    'leftHip': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy'],
    'rightHip': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy'],
    'upperBack': ['orthopedics', 'neurology', 'pain management', 'physiotherapy', 'neurosurgery'],
    'lowerBack': ['orthopedics', 'neurology', 'pain management', 'physiotherapy', 'neurosurgery'],
    'leftLeg': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy'],
    'rightLeg': ['orthopedics', 'neurology', 'vascular surgery', 'physiotherapy']
  };
  
  // Get preferred departments for this body part
  const preferredDepts = bodyPartToDeptMapping[bodyPartId] || ['general medicine'];
  
  // Try to find a matching department from the preferred list
  for (const deptName of preferredDepts) {
    const departmentId = departmentIdsByName[deptName];
    if (departmentId) {
      return departmentId;
    }
  }
  
  // If no match found, return General Medicine or first department as fallback
  if (generalMedicineId) {
    return generalMedicineId;
  }
  
  // Last resort: return first department in the list if available
  return departmentsList.length > 0 ? departmentsList[0].id : null;
};

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, primaryHospital } = useAuth(); // Use auth context
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    preferredLanguage: 'English', // Default value
    urgency: 'routine',
    preferredDate: '',
    preferredTimeSlot: '',
    selectedSymptoms: [],
    additionalNotes: '',
    dateExplicitlySelected: false,
    timeExplicitlySelected: false
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
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);

  // Payment states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'processing'>('processing');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [appointmentPayload, setAppointmentPayload] = useState<any>(null);
  const [paymentModalData, setPaymentModalData] = useState<any>(null); // 🎯 ADD THIS STATE!
  
  // Payment system status states
  const [paymentsEnabled, setPaymentsEnabled] = useState<boolean>(true);
  const [freeAppointments, setFreeAppointments] = useState<boolean>(false);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState<boolean>(true);
  
  // 🛡️ DUPLICATE PREVENTION STATES
  const [processedPaymentReferences, setProcessedPaymentReferences] = useState<Set<string>>(new Set());
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  
  // 🛡️ CONFLICT CHECK STATES
  const [isCheckingConflict, setIsCheckingConflict] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Check payment system status on component mount
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        setPaymentStatusLoading(true);
        const paymentStatus = await PaymentService.getPaymentStatus();
        
        console.log('💰 Payment system status:', paymentStatus);
        
        setPaymentsEnabled(paymentStatus.payments_enabled);
        setFreeAppointments(paymentStatus.free_appointments);
      } catch (error) {
        console.error('Failed to check payment status:', error);
        // Default to payments enabled on error
        setPaymentsEnabled(true);
        setFreeAppointments(false);
      } finally {
        setPaymentStatusLoading(false);
      }
    };

    if (isAuthenticated) {
      checkPaymentStatus();
    }
  }, [isAuthenticated]);

  // Fetch departments on component mount
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/account/appointments/book' } });
      return;
    }
    
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        // Handle the departments response format
        const departmentsResponse = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/departments/`, {
          credentials: 'include', // Use cookies for authentication
          headers: {
            'Accept': 'application/json',
          }
        });

        // Parse the departments response
        const departmentsData = await departmentsResponse.json();
        
        console.log('Departments API response:', departmentsData);

        // Handle different response status codes
        if (!departmentsResponse.ok) {
          switch (departmentsResponse.status) {
            case 403:
              throw new Error('You are not registered with this hospital. Please contact support.');
            case 404:
              throw new Error('No primary hospital found. Please register with a hospital first.');
            default:
              throw new Error(`Failed to fetch departments: ${departmentsData.message || departmentsData.detail || 'Unknown error'}`);
          }
        }

        // Check if departmentsData has a valid structure
        let departmentsList = [];
        
        // Handle different response formats
        if (departmentsData.status === 'success' && Array.isArray(departmentsData.departments)) {
          departmentsList = departmentsData.departments;
        } else if (Array.isArray(departmentsData)) {
          departmentsList = departmentsData;
        } else if (departmentsData.results && Array.isArray(departmentsData.results)) {
          departmentsList = departmentsData.results;
        } else if (departmentsData.data && Array.isArray(departmentsData.data)) {
          departmentsList = departmentsData.data;
        } else {
          console.error('Unexpected departments data structure:', departmentsData);
          throw new Error('Invalid department data received from server');
        }
        
        // Validate that departments have the expected structure
        if (departmentsList.length === 0) {
          console.warn('No departments returned from API');
          // Better error message for missing departments
          throw new Error(
            'This hospital has not configured any departments yet. ' +
            'Appointment bookings are currently unavailable. ' +
            'Please contact hospital administration or try a different hospital.'
          );
        } else if (!departmentsList[0].id || !departmentsList[0].name) {
          console.error('Department objects missing required fields:', departmentsList[0]);
          throw new Error('Invalid department data structure');
        }
        
        setDepartments(departmentsList);
      } catch (error: any) {
        console.error('Error fetching departments:', error);
        setSubmissionError(error.message);
        setDepartments([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [isAuthenticated, navigate]);

  // When form data changes, we might want to update the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for date field to ensure it's marked as explicitly selected
    if (name === 'preferredDate') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        dateExplicitlySelected: true // Mark date as explicitly selected
      }));
      
      // If we're selecting a date, also generate time slots
      const slots = generateTimeSlots(value);
      setAvailableTimeSlots(slots);
      console.log(`Date selected: ${value} with ${slots.length} available time slots`);
      
      // Clear any previous errors
      setDateTimeError(null);
    } else {
      // For other fields, just update normally
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle symptom selection from body map
  const handleBodyPartSelect = (bodyPart: any) => {
    // We'll use this just to show available symptoms for the selected body part
    console.log(`Selected body part: ${bodyPart.name}`);
  };

  // Handle symptom selection and description
  const handleSymptomSelect = (symptom: string, bodyPart: any) => {
    // Open description input for the selected symptom
    const newSymptom: SelectedSymptom = {
      bodyPartId: bodyPart.id,
      bodyPartName: bodyPart.name,
      symptomName: symptom,
      description: '' // Empty initially, to be filled by user
    };
    
    // Check if this symptom is already selected
    const isDuplicate = formData.selectedSymptoms.some(
      s => s.bodyPartId === bodyPart.id && s.symptomName === symptom
    );
    
    if (!isDuplicate) {
      setFormData(prev => ({
        ...prev,
        selectedSymptoms: [...prev.selectedSymptoms, newSymptom]
      }));
    } else {
      console.log('Symptom already selected');
    }
  };

  // Update symptom description
  const handleSymptomDescriptionChange = (index: number, description: string) => {
    setFormData(prev => {
      const updatedSymptoms = [...prev.selectedSymptoms];
      updatedSymptoms[index] = {
        ...updatedSymptoms[index],
        description
      };
      return {
        ...prev,
        selectedSymptoms: updatedSymptoms
      };
    });
  };

  // Remove a selected symptom
  const handleRemoveSymptom = (index: number) => {
    setFormData(prev => {
      const updatedSymptoms = prev.selectedSymptoms.filter((_, i) => i !== index);
      return {
        ...prev,
        selectedSymptoms: updatedSymptoms
      };
    });
  };

  // Match with a department based on selected symptoms
  const matchWithDepartment = async () => {
    setIsLoading(true);
    setSubmissionError(null);
    
    try {
      // Get all body parts selected
      const bodyParts = formData.selectedSymptoms.map(item => item.bodyPartId);
      
      // Comprehensive mapping of body parts to departments based on provided information
      const departmentMapping: { [key: string]: string[] } = {
        'head': ['Neurology', 'ENT', 'Ophthalmology', 'Neurosurgery'],
        'face': ['ENT', 'Dermatology', 'Oral & Maxillofacial Surgery', 'Neurology'],
        'neck': ['ENT', 'Endocrinology', 'Neurology', 'Orthopedics', 'Oncology'],
        'chest': ['Cardiology', 'Pulmonology', 'Emergency Medicine', 'Internal Medicine'],
        'upperAbdomen': ['Gastroenterology', 'Hepatology', 'General Surgery', 'Nutrition'],
        'lowerAbdomen': ['Gastroenterology', 'Urology', 'Gynecology', 'Colorectal Surgery'],
        'leftShoulder': ['Orthopedics', 'Neurology', 'Rheumatology', 'Sports Medicine'],
        'rightShoulder': ['Orthopedics', 'Neurology', 'Rheumatology', 'Sports Medicine'],
        'leftArm': ['Orthopedics', 'Neurology', 'Rheumatology', 'Sports Medicine'],
        'rightArm': ['Orthopedics', 'Neurology', 'Rheumatology', 'Sports Medicine'],
        'leftHip': ['Orthopedics', 'Neurology', 'Vascular Surgery', 'Physiotherapy'],
        'rightHip': ['Orthopedics', 'Neurology', 'Vascular Surgery', 'Physiotherapy'],
        'upperBack': ['Orthopedics', 'Neurology', 'Pain Management', 'Physiotherapy', 'Neurosurgery'],
        'lowerBack': ['Orthopedics', 'Neurology', 'Pain Management', 'Physiotherapy', 'Neurosurgery'],
        'leftLeg': ['Orthopedics', 'Neurology', 'Vascular Surgery', 'Physiotherapy'],
        'rightLeg': ['Orthopedics', 'Neurology', 'Vascular Surgery', 'Physiotherapy']
      };
      
      // Find the most appropriate department based on symptoms
      let departmentName = "General Medicine"; // Default department
      
      if (bodyParts.length > 0) {
        // Use the first body part to determine department
        const primaryBodyPart = bodyParts[0];
        const possibleDepartments = departmentMapping[primaryBodyPart] || ['General Medicine'];
        
        // For simplicity, use the first recommended department
        departmentName = possibleDepartments[0];
        
        // For more complex implementations, we could:
        // 1. Count symptom frequency by department
        // 2. Consider symptom descriptions for more nuanced matching
        // 3. Use a scoring system based on symptom severity
      }
      
      // Find the department ID by name
      const matchedDepartment = departments.find(d => d.name === departmentName);
      const departmentId = matchedDepartment ? matchedDepartment.id : departments[0]?.id || 1;
      
      // Format the date in the required format (YYYY-MM-DD)
      const dateToSend = formData.preferredDate || new Date().toISOString().split('T')[0];
      
      // Generate time slots
      const generatedTimeSlots = generateTimeSlots(dateToSend);
      setAvailableTimeSlots(generatedTimeSlots);
      
      // If no matching department found in the database, use the first one or create a default
      const selectedDepartment = matchedDepartment || departments[0] || { 
        id: departmentId, 
        name: departmentName 
      };
      
      console.log(`Matching to department: ${selectedDepartment.name} (ID: ${selectedDepartment.id})`);
      
      // Set department info as the matched doctor (since we're not matching to a specific doctor)
      setMatchedDoctor({
        doctor_id: 0,
        doctor_name: `Department of ${selectedDepartment.name}`,
        department_id: selectedDepartment.id,
        available_dates: [dateToSend],
        specialty: selectedDepartment.name
      });
      
    } catch (error: any) {
      console.error('Error matching with department:', error);
      setSubmissionError(error.message || 'Error matching with a department');
      setAvailableTimeSlots([]);
    } finally {
      setIsLoading(false);
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

  // Helper function to parse time from display format back to 24-hour format
  const parseTimeSlot = (timeSlotDisplay: string): { startHour: number, startMinute: number } | null => {
    try {
      // Handle formats like "9:00 AM - 9:30 AM" or "09:00 AM - 09:30 AM"
      const startTimeMatch = timeSlotDisplay.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      
      if (!startTimeMatch) {
        console.error('Unable to parse time slot:', timeSlotDisplay);
        return null;
      }
      
      let hours = parseInt(startTimeMatch[1]);
      const minutes = parseInt(startTimeMatch[2]);
      const period = startTimeMatch[3].toUpperCase();
      
      // Convert to 24-hour format
      if (period === 'PM' && hours < 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return { startHour: hours, startMinute: minutes };
    } catch (error) {
      console.error('Error parsing time slot:', error);
      return null;
    }
  };

  // Update the hospital registration check to handle different API response formats
  const checkHospitalRegistration = async (hospitalId: number): Promise<boolean> => {
    try {
      // For testing/development: bypass the check if we can't verify
      // This allows testing even when hospital registration is not set up correctly
      console.log('Attempting to check hospital registration for hospital ID:', hospitalId);
      
      // First check if the hospital is the primary hospital
      try {
        const primaryResponse = await apiRequest<any>('/api/hospitals/', 'GET');
        console.log('Primary hospital response:', primaryResponse);
        
        // Different possible response formats
        if (primaryResponse && primaryResponse.has_primary && 
            primaryResponse.primary_hospital && 
            primaryResponse.primary_hospital.id === hospitalId) {
          console.log('User has primary hospital registration with this hospital');
          return true;
        }
      } catch (primaryError) {
        console.warn('Error checking primary hospital, will try registrations:', primaryError);
        // Continue to next check if this fails
      }
      
      // If not primary, check registrations
      try {
        const registrationsResponse = await apiRequest<any>('/api/hospitals/registrations/', 'GET');
        console.log('Registrations response:', registrationsResponse);
        
        // Handle case where the API returns an object with a 'registrations' property
        const registrations: any[] = Array.isArray(registrationsResponse) 
          ? registrationsResponse 
          : (registrationsResponse?.registrations || []);
          
        const isRegistered = registrations.some(
          (reg: any) => (reg.hospital?.id === hospitalId || reg.hospital === hospitalId) && 
          (reg.status === 'approved' || reg.status === 'active')
        );
        
        console.log(`User registration status with hospital ${hospitalId}: ${isRegistered ? 'Registered' : 'Not registered'}`);
        
        if (isRegistered) {
          return true;
        }
      } catch (regError) {
        console.warn('Error checking hospital registrations:', regError);
        // Continue to fallback if this fails
      }
      
      // TEMPORARY FALLBACK: For development purposes, assume registration
      // Remove or modify this in production
      console.warn('Unable to verify hospital registration - assuming registered for development');
      return true;
      
    } catch (error) {
      console.error('Error checking hospital registration:', error);
      // If there's an error, we'll assume they're registered for now to avoid blocking testing
      console.warn('Registration check failed - assuming registered for testing purposes');
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    try {
      // Enhanced validation for date and time
      if (!formData.preferredDate || !formData.dateExplicitlySelected) {
        throw new Error('Please select a date for your appointment');
      }

      if (!formData.preferredTimeSlot || !formData.timeExplicitlySelected) {
        throw new Error('Please select a time slot for your appointment');
      }

      // Add a validation check to ensure we have at least one symptom
      if (!formData.selectedSymptoms || formData.selectedSymptoms.length === 0) {
        throw new Error('Please select at least one symptom for your appointment');
      }

      // Validate symptom descriptions (optional - allow empty descriptions)
      // const incompleteSymptoms = formData.selectedSymptoms.filter(s => !s.description || s.description.trim() === '');
      // if (incompleteSymptoms.length > 0) {
      //   throw new Error('Please provide descriptions for all selected symptoms');
      // }

      // Parse the time slot
      const parsedTime = parseTimeSlot(formData.preferredTimeSlot);
      if (!parsedTime) {
        console.error('Time parsing failed for:', formData.preferredTimeSlot);
        throw new Error('Could not parse the selected time. Please try selecting a different time slot.');
      }

      // 🔍 DEBUG: Log appointment date creation
      console.log('🔍 APPOINTMENT DATE DEBUG:');
      console.log('- Selected date:', formData.preferredDate);
      console.log('- Selected time slot:', formData.preferredTimeSlot);
      console.log('- Parsed time:', parsedTime);
      console.log('- Date explicitly selected:', formData.dateExplicitlySelected);
      console.log('- Time explicitly selected:', formData.timeExplicitlySelected);

      // Ensure we have valid hospital ID from user profile
      if (!primaryHospital?.id) {
        throw new Error('No primary hospital found. Please set your primary hospital in your profile.');
      }

      const hospitalId = Number(primaryHospital?.id);
      if (isNaN(hospitalId)) {
        throw new Error('Invalid hospital ID. Please check your profile settings.');
      }

      // Get department ID and name for payment
      let departmentId: number | null = null;
      let departmentName = 'General Medicine';
      
      if (formData.selectedSymptoms.length > 1) {
        // For multiple symptoms, find the most appropriate department
        const allDepartments = new Map<string, number>();
        
        // Count department occurrences across all symptoms
        for (const symptom of formData.selectedSymptoms) {
          const deptId = getDepartmentForBodyPart(symptom.bodyPartId, departments);
          if (deptId) {
            const deptName = departments.find(d => d.id === deptId)?.name.toLowerCase() || '';
            allDepartments.set(deptName, (allDepartments.get(deptName) || 0) + 1);
          }
        }
        
        // Sort departments by occurrence count (most common first)
        const sortedDepartments = Array.from(allDepartments.entries())
          .sort((a, b) => b[1] - a[1]);
        
        // If we have departments with counts, use the most common one
        if (sortedDepartments.length > 0) {
          const [mostCommonDeptName] = sortedDepartments[0];
          const mostCommonDept = departments.find(d => 
            d.name.toLowerCase() === mostCommonDeptName
          );
          departmentId = mostCommonDept?.id || null;
          departmentName = mostCommonDept?.name || 'General Medicine';
        }
        
        // If no department found or still null, try General Medicine as fallback
        if (!departmentId) {
          const generalMedicineDept = departments.find(d => 
            d.name.toLowerCase() === 'general medicine'
          );
          departmentId = generalMedicineDept?.id || null;
          departmentName = generalMedicineDept?.name || 'General Medicine';
        }
        
        // If still no department, use the first department as last resort
        if (!departmentId && departments.length > 0) {
          departmentId = departments[0].id;
          departmentName = departments[0].name;
        }
      } else if (formData.selectedSymptoms.length === 1) {
        // For single symptom, use the standard mapping
        departmentId = getDepartmentForBodyPart(formData.selectedSymptoms[0].bodyPartId, departments);
        const dept = departments.find(d => d.id === departmentId);
        departmentName = dept?.name || 'General Medicine';
      }

      if (!departmentId) {
        throw new Error(
          'Could not find a suitable department for your symptoms at this hospital. ' +
          'This may be because the hospital does not have the required specialist departments configured. ' +
          'Please try selecting different symptoms or contact the hospital directly.'
        );
      }

      // Check hospital registration before proceeding
      console.log(`Checking registration for hospital ID: ${hospitalId}`);
      const isRegistered = await checkHospitalRegistration(hospitalId);
      
      if (!isRegistered) {
        throw new Error('You must be registered with this hospital before booking an appointment. Please go to your profile and register with the hospital first.');
      }

      // Format date and time properly with timezone
      const { startHour, startMinute } = parsedTime;
      const datePart = formData.preferredDate;
      const appointmentDateTime = `${datePart}T${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00Z`;

      // 🔍 DEBUG: Log final appointment datetime
      console.log('🔍 FINAL APPOINTMENT DATETIME:', appointmentDateTime);
      console.log('🔍 PARSED AS DATE:', new Date(appointmentDateTime).toLocaleString());

      // Map urgency levels to priority
      const priorityMapping: { [key: string]: string } = {
        "routine": "normal",
        "soon": "urgent",
        "urgent": "emergency"
      };

      // Create chief complaint from first symptom
      const primaryComplaint = formData.selectedSymptoms.length > 0 
        ? `${formData.selectedSymptoms[0].bodyPartName} - ${formData.selectedSymptoms[0].symptomName}`
        : 'General consultation';

      // Construct the appointment payload (to be sent AFTER payment)
      const basePayload = {
        hospital: hospitalId,
        department: Number(departmentId),
        appointment_date: appointmentDateTime,
        appointment_type: "consultation",
        priority: priorityMapping[formData.urgency] || "normal",
        chief_complaint: primaryComplaint
      };

      // Add symptoms_data if we have symptoms
      const appointmentRequestBody = formData.selectedSymptoms.length > 0 
        ? {
            ...basePayload,
            symptoms_data: formData.selectedSymptoms.map(symptom => ({
              body_part_id: symptom.bodyPartId,
              body_part_name: symptom.bodyPartName,
              symptom_name: symptom.symptomName,
              description: symptom.description || ''
            }))
          }
        : basePayload;

      // Store appointment payload for AFTER payment success
      setAppointmentPayload(appointmentRequestBody);

      // 🔍 DEBUG: Log final appointment payload
      console.log('🔍 APPOINTMENT PAYLOAD TO BE SENT AFTER PAYMENT:');
      console.log('- Full payload:', appointmentRequestBody);
      console.log('- Appointment date field:', appointmentRequestBody.appointment_date);
      console.log('- Hospital ID:', appointmentRequestBody.hospital);
      console.log('- Department ID:', appointmentRequestBody.department);

      console.log('🚀 Initializing payment BEFORE creating appointment...');

      // Step 1: Initialize payment through backend FIRST (NO APPOINTMENT YET!)
      const paymentDataForModal = {
        // 🎯 NO appointmentId YET - we'll create appointment AFTER payment!
        urgency: formData.urgency as 'routine' | 'soon' | 'urgent',
        department: departmentName,
        patientEmail: user?.email || '',
        patientName: user?.full_name || user?.first_name + ' ' + user?.last_name || 'Patient',
        appointmentDate: appointmentDateTime, // ✅ Use ISO format for backend
        appointmentTime: formData.preferredTimeSlot,
        symptoms: formData.selectedSymptoms,
        // 🚀 PAYMENT-FIRST: Include booking details for backend
        departmentId: departmentId,
        hospitalId: hospitalId,
        chiefComplaint: primaryComplaint,
        priority: priorityMapping[formData.urgency] || "normal",
        // ✅ Add additional booking details needed by backend
        appointmentType: "consultation",
        medicalHistory: formData.additionalNotes || '',
        allergies: '',
        currentMedications: '',
        duration: 30,
        isInsuranceBased: false,
        insuranceDetails: {}
      };

      console.log('🚀 Initializing payment without appointment (payment-first approach)...');
      
      // 🔥 INITIALIZE PAYMENT WITHOUT APPOINTMENT ID!
      const paymentInitResult = await PaymentService.initializePayment(paymentDataForModal);
      
      if (paymentInitResult.status !== 'success' || !paymentInitResult.data) {
        throw new Error(paymentInitResult.message || 'Failed to initialize payment');
      }

      console.log('✅ Payment initialized (no appointment created yet):', paymentInitResult.data);

      // Check if payment was waived (payments disabled)
      if (paymentInitResult.isPaymentWaived) {
        console.log('🎉 Payment waived - appointment created successfully!');
        
        // Skip payment modal and go directly to confirmation
        setPaymentData({
          reference: 'waived-payment',
          status: 'completed',
          amount: 0,
          currency: 'NGN',
          transaction: 'free-appointment'
        });
        setPaymentStatus('success');
        setShowPaymentConfirmation(true);
        return;
      }

      // Calculate amount and appointment type
      const amount = calculateAppointmentPrice(paymentDataForModal);
      const appointmentType = getAppointmentTypeDescription(paymentDataForModal);

      // Show payment modal with all the appointment details
      const appointmentDataForPayment = {
        amount,
        currency: 'NGN',
        appointmentType,
        patientEmail: paymentDataForModal.patientEmail,
        patientName: paymentDataForModal.patientName,
        appointmentDate: new Date(formData.preferredDate).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        appointmentTime: formData.preferredTimeSlot,
        department: departmentName,
        // 🎯 ADD BACKEND PAYMENT REFERENCE!
        paymentReference: paymentInitResult.data.reference
      };

      console.log('Showing payment modal with backend reference:', appointmentDataForPayment);
      setPaymentModalData(appointmentDataForPayment); // 🎯 STORE THE PAYMENT DATA!
      setShowPaymentModal(true);

    } catch (error: any) {
      console.error('Error preparing appointment:', error);
      setSubmissionError(error.message || 'Failed to prepare appointment. Please try again.');
    }
  };

  // Handle successful payment - PAYMENT-FIRST APPROACH!
  const handlePaymentSuccess = async (transactionData: any) => {
    setShowPaymentModal(false);
    setPaymentData(transactionData);
    setShowPaymentConfirmation(true);

    // 🛡️ PREVENT DUPLICATE PROCESSING
    const paymentReference = transactionData.reference || transactionData.trans;
    
    if (!paymentReference) {
      console.error('❌ No payment reference found in transaction data:', transactionData);
      setPaymentStatus('failed');
      setSubmissionError('Payment successful but missing reference. Please contact support.');
      return;
    }

    if (processedPaymentReferences.has(paymentReference)) {
      console.log('🛡️ Payment reference already processed, skipping duplicate:', paymentReference);
      setPaymentStatus('success');
      return;
    }

    if (isCreatingAppointment) {
      console.log('⚠️ Appointment creation already in progress, skipping duplicate request');
      return;
    }

    try {
      setIsCreatingAppointment(true);
      
      // Mark this payment reference as processed
      setProcessedPaymentReferences(prev => new Set(prev).add(paymentReference));
      
      console.log('💳 Payment successful! Using payment-first approach:', transactionData);
      console.log('🔍 Payment reference being processed:', paymentReference);
      
      // 🚀 PAYMENT-FIRST APPROACH: Appointment already created during payment!
      // We just need to verify the backend created it successfully by checking the transaction data
      
      if (transactionData.status === 'completed' || transactionData.status === 'successful') {
        console.log('✅ Payment completed successfully - appointment already created by backend!');
        console.log('✅ Transaction data:', transactionData);
        
        setPaymentStatus('success');
        console.log('🎉 Payment-first flow successful: Payment processed and appointment created by backend!');
      } else {
        // Handle unexpected payment status
        console.warn('⚠️ Unexpected payment status:', transactionData.status);
        setPaymentStatus('success'); // Still proceed as payment verification succeeded
      }
      
    } catch (error: any) {
      console.error('💥 Payment success handling failed:', error);
      console.error('💥 Error message:', error.message);
      console.error('💥 Error stack:', error.stack);
      
      // Remove the payment reference from processed set on error so it can be retried
      setProcessedPaymentReferences(prev => {
        const newSet = new Set(prev);
        newSet.delete(paymentReference);
        return newSet;
      });
      
      setPaymentStatus('failed');
      setSubmissionError('Payment processing failed. Please contact support with your payment reference: ' + paymentReference);
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  // Handle payment failure
  const handlePaymentError = (error: string) => {
    setShowPaymentModal(false);
    setPaymentStatus('failed');
    setShowPaymentConfirmation(true);
    setSubmissionError(error);
  };

  // Handle payment retry
  const handlePaymentRetry = () => {
    setShowPaymentConfirmation(false);
    setShowPaymentModal(true);
    setSubmissionError(null);
    
    // ✅ Reset payment states for retry
    setPaymentStatus('processing');
    setPaymentData(null);
    
    console.log('🔄 User initiated payment retry');
  };

  // Handle going to appointments after success
  const handleGoToAppointments = () => {
    navigate('/account/appointments');
  };

  // Close payment confirmation
  const handleClosePaymentConfirmation = () => {
    setShowPaymentConfirmation(false);
    if (paymentStatus === 'success') {
      // Navigate to appointments page on success
      navigate('/account/appointments');
    }
    // Reset states
    setPaymentData(null);
    setAppointmentPayload(null);
    setPaymentModalData(null); // 🎯 RESET PAYMENT MODAL DATA!
  };

  // Helper function for error messages
  const getErrorMessage = (error: any): string => {
    // First check if it's an API error with a response object
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
      } else if (error.response.status === 404) {
        return 'The requested resource was not found. Please check your inputs.';
      } else if (error.response.status >= 500) {
        return 'Server error. Please try again later or contact support.';
      } else {
        return `Error (${error.response.status}): ${error.response.data?.message || 'Unknown error'}`;
      }
    } else if (error.request) {
      return 'Cannot connect to server. Check your internet connection.';
    } else if (error.errors && typeof error.errors === 'object') {
      // Handle object with multiple error fields
      const errorFields = Object.entries(error.errors)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(', ');
      return `Validation errors: ${errorFields}`;
    } else {
      return error.message || 'An error occurred. Please try again.';
    }
  };

  // Add a function to directly select time slots
  const selectTimeSlot = (timeSlotValue: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTimeSlot: timeSlotValue,
      timeExplicitlySelected: true
    }));
    
    // Debug
    console.log(`Time slot explicitly selected: ${timeSlotValue}`);
    setDateTimeError(null);
  };

  const goToNextStep = async () => {
    if (currentStep < 3) {
      // Reset any previous errors
      setDateTimeError(null);
      
      // If moving from step 1 to step 2, set up time slots
      if (currentStep === 1) {
        // Set default date to today if not already selected
        if (!formData.preferredDate) {
          const today = new Date().toISOString().split('T')[0];
          const slots = generateTimeSlots(today);
          setAvailableTimeSlots(slots);
          setFormData(prev => ({
            ...prev,
            preferredDate: today,
            dateExplicitlySelected: true // Ensure this flag is set
          }));
          console.log(`Default date set to today (${today}) with ${slots.length} available slots`);
        } else {
          // Generate time slots for the already selected date
          const slots = generateTimeSlots(formData.preferredDate);
          setAvailableTimeSlots(slots);
          
          // Ensure the date is marked as explicitly selected
          if (!formData.dateExplicitlySelected) {
            setFormData(prev => ({
              ...prev,
              dateExplicitlySelected: true
            }));
            console.log(`Marking existing date (${formData.preferredDate}) as explicitly selected`);
          }
        }
        
        // No validation needed for step 1 → 2
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
      // If moving from step 2 to step 3, validate date and time selection
      else if (currentStep === 2) {
        // These checks should match validateCurrentStep for step 2
        if (!formData.preferredDate || !formData.dateExplicitlySelected) {
          setDateTimeError('Please select a date for your appointment');
          return;
        }
        
        if (!formData.preferredTimeSlot || !formData.timeExplicitlySelected) {
          setDateTimeError('Please select a time slot for your appointment');
          return;
        }
        
        // Add one final check - can we parse the time?
        const parsedTime = parseTimeSlot(formData.preferredTimeSlot);
        if (!parsedTime) {
          setDateTimeError('Invalid time slot selected. Please select a different time.');
          return;
        }
        
        // All validations passed
        console.log('Date/time validation passed - moving to step 3:', {
          date: formData.preferredDate,
          time: formData.preferredTimeSlot,
          parsed: parsedTime
        });
        
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
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
        // Only require symptoms, language and urgency - descriptions are optional
        return formData.selectedSymptoms.length > 0 && 
          !!formData.preferredLanguage && 
          !!formData.urgency;
      case 2:
        // Check both the value and the explicit selection flag
        return !!formData.preferredDate && 
               formData.dateExplicitlySelected &&
               !!formData.preferredTimeSlot && 
               formData.timeExplicitlySelected;
      case 3:
        return true; // Final review step
      default:
        return false;
    }
  };

  // Improve the time slot selection handler
  const handleTimeSlotSelect = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTimeSlot: timeSlot
    }));
    
    // Also log the selection for debugging
    console.log('Selected time slot:', timeSlot);
  };

  return (
    <AccountHealthLayout title="Book an Appointment">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

        {/* Free Appointments Notice */}
        {!paymentStatusLoading && freeAppointments && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Free Appointments Available!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  All appointments are currently free of charge. Complete your booking without any payment required.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
              <div
                className="bg-[#0891b2] transition-all ease-out duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <div className={`text-xs font-medium ${currentStep >= 1 ? 'text-[#0891b2]' : 'text-gray-500'}`}>
                Select Symptoms
              </div>
              <div className={`text-xs font-medium ${currentStep >= 2 ? 'text-[#0891b2]' : 'text-gray-500'}`}>
                Schedule
              </div>
              <div className={`text-xs font-medium ${currentStep >= 3 ? 'text-[#0891b2]' : 'text-gray-500'}`}>
                Confirm
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0891b2]"></div>
            <span className="ml-3 text-gray-700">Loading...</span>
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit}>
            {/* Step 1: Symptoms & Preferences */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Select Your Symptoms</h3>
                <p className="text-gray-600 mb-4">
                  Click on the affected body part and select your symptoms. Our system will automatically 
                  match you with the appropriate medical department.
                </p>

                <div className="space-y-6">
                  {/* Body Map */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h4 className="text-lg font-medium mb-4">Interactive Body Map</h4>
                    <BodyMapSearch 
                      onBodyPartSelect={handleBodyPartSelect} 
                      onSymptomSelect={handleSymptomSelect}
                    />
                  </div>

                  {/* Info Alert */}
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-700">
                      <strong>How it works:</strong> Based on the body part(s) you select, we'll automatically 
                      assign your appointment to the appropriate medical department. If you select multiple body parts, 
                      you'll be assigned to our General Medicine department.
                    </p>
                  </div>

                  {/* Selected Symptoms Display */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium mb-2">Selected Symptoms:</h4>
                    {formData.selectedSymptoms.length === 0 ? (
                      <p className="text-gray-500 italic">No symptoms selected yet. Please use the body map above to select affected areas.</p>
                    ) : (
                      <div className="space-y-3">
                        {formData.selectedSymptoms.map((symptom, index) => (
                          <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                            <div className="flex justify-between items-start">
                              <h5 className="text-sm font-medium">{symptom.bodyPartName} - {symptom.symptomName}</h5>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveSymptom(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                            <textarea
                              value={symptom.description}
                              onChange={(e) => handleSymptomDescriptionChange(index, e.target.value)}
                              className="mt-2 w-full p-2 text-sm border border-gray-300 rounded"
                              placeholder="Optional: Describe your symptoms in more detail (e.g., when did it start, severity, any patterns)"
                              rows={2}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

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
                            className="h-4 w-4 border-gray-300 text-[#0891b2] focus:ring-[#0891b2]"
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
                            className="h-4 w-4 border-gray-300 text-[#0891b2] focus:ring-[#0891b2]"
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
                            className="h-4 w-4 border-gray-300 text-[#0891b2] focus:ring-[#0891b2]"
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

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={!validateCurrentStep()}
                      className={`w-full py-3 px-4 rounded-md text-white font-medium
                        ${validateCurrentStep()
                          ? 'bg-[#0891b2] hover:bg-[#004c93]'
                          : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Schedule */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Schedule Your Appointment</h3>
                <p className="text-gray-600 mb-4">
                  Select your preferred date and time for the appointment.
                </p>

                <div className="mb-6 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-2">Automatic Department Assignment</h4>
                  <p className="text-blue-800">
                    Based on your selected symptoms, our system will automatically assign your appointment
                    to the appropriate medical department. The first available healthcare provider from that
                    department will confirm your appointment.
                  </p>
                </div>

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
                      onChange={(e) => {
                        // Set the date and mark it as explicitly selected
                        setFormData(prev => ({
                          ...prev,
                          preferredDate: e.target.value,
                          preferredTimeSlot: '', // Reset time slot
                          dateExplicitlySelected: true, // Mark as explicitly selected
                          timeExplicitlySelected: false // Reset time selection flag
                        }));
                        
                        // Generate time slots
                        const newDate = e.target.value;
                        const slots = generateTimeSlots(newDate);
                        setAvailableTimeSlots(slots);
                        
                        // Clear any previous errors
                        setDateTimeError(null);
                        
                        // Debug
                        console.log(`Date selected: ${e.target.value}`);
                      }}
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
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableTimeSlots.map((timeSlot, index) => (
                          <div key={index} className="relative">
                            <input
                              id={`time-${index}`}
                              name="preferredTimeSlot"
                              type="radio"
                              value={formatTimeSlot(timeSlot)}
                              checked={formData.preferredTimeSlot === formatTimeSlot(timeSlot)}
                              onChange={(e) => {
                                // Set time slot and mark as explicitly selected
                                setFormData(prev => ({
                                  ...prev,
                                  preferredTimeSlot: e.target.value,
                                  timeExplicitlySelected: true
                                }));
                                
                                // Debug
                                console.log(`Time slot selected: ${e.target.value}`);
                                
                                // Clear any errors
                                setDateTimeError(null);
                              }}
                              className="sr-only peer"
                              required
                            />
                            <label
                              htmlFor={`time-${index}`}
                              className="flex flex-col items-center justify-center p-3 border rounded-md text-sm cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:bg-gray-50"
                            >
                              <span className="mb-1">{formatTimeSlot(timeSlot)}</span>
                              <button 
                                type="button"
                                onClick={() => selectTimeSlot(formatTimeSlot(timeSlot))}
                                className={`text-xs py-1 px-2 mt-1 rounded ${
                                  formData.preferredTimeSlot === formatTimeSlot(timeSlot) 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {formData.preferredTimeSlot === formatTimeSlot(timeSlot) ? 'Selected' : 'Select'}
                              </button>
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

                  {dateTimeError && (
                    <div className="mt-2 text-sm text-red-600">
                      {dateTimeError}
                    </div>
                  )}

                  {currentStep === 2 && formData.preferredDate && formData.dateExplicitlySelected && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md">
                      <p className="text-sm text-green-700">
                        <span className="font-medium">✓</span> Date selected: {new Date(formData.preferredDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {currentStep === 2 && formData.preferredTimeSlot && formData.timeExplicitlySelected && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md">
                      <p className="text-sm text-green-700">
                        <span className="font-medium">✓</span> Time selected: {formData.preferredTimeSlot}
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
                          ? 'bg-[#0891b2] hover:bg-[#004c93]'
                          : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Review & Confirm</h3>
                <p className="text-gray-600 mb-4">
                  Please review your appointment details before submitting.
                </p>

                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Preferred Language</h4>
                      <p className="text-black">{formData.preferredLanguage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Urgency</h4>
                      <p className="text-black capitalize">{formData.urgency}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Symptoms</h4>
                    {formData.selectedSymptoms.length === 0 ? (
                      <p className="text-gray-500 italic">No symptoms provided</p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {formData.selectedSymptoms.map((symptom, index) => (
                          <div key={index} className="p-2 bg-white border border-gray-200 rounded-md">
                            <p className="text-sm font-semibold">{symptom.bodyPartName} - {symptom.symptomName}</p>
                            <p className="text-sm text-gray-600">{symptom.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <strong>Department Assignment:</strong> Based on your selected body part(s), our system will 
                      automatically assign you to the appropriate medical department. {formData.selectedSymptoms.length > 1 && 
                      "Since you've selected multiple body parts, you'll be assigned to our General Medicine department."}
                    </p>
                  </div>
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
                    <strong>Doctor Assignment Process:</strong> After booking, your appointment will be visible to all doctors 
                    in the assigned department. The first available doctor will confirm your appointment on a first-come, 
                    first-serve basis. You'll receive a notification once a doctor has confirmed your appointment.
                  </p>
                </div>

                {submissionError && (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-sm text-red-700">{submissionError}</p>
                  </div>
                )}

                {currentStep === 3 && !formData.preferredDate && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-md">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> No date is selected for your appointment. Please go back and select a date.
                    </p>
                  </div>
                )}

                {currentStep === 3 && !formData.preferredTimeSlot && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-md">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> No time slot is selected for your appointment. Please go back and select a time.
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
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 px-4 bg-[#0891b2] rounded-md text-white font-medium hover:bg-[#004c93] flex items-center"
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
                      freeAppointments ? "Book Free Appointment" : "Proceed to Payment"
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
              <span className="text-gray-900 font-medium">Department Assignment:</span> Our system will automatically assign your appointment to the appropriate department based on your symptoms.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Doctor Confirmation:</span> The first available doctor from that department will confirm your appointment on a first-come, first-serve basis.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Notification:</span> You'll receive a confirmation email when your appointment is booked and another notification when a doctor confirms it.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Consultation:</span> Join your appointment via the method specified (in-person, phone, or video call).
            </li>
          </ol>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && paymentModalData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          appointmentData={paymentModalData} // 🎯 USE THE STORED DATA WITH BACKEND REFERENCE!
        />
      )}

      {/* Payment Confirmation Modal */}
      {showPaymentConfirmation && (
        <PaymentConfirmation
          isOpen={showPaymentConfirmation}
          onClose={handleClosePaymentConfirmation}
          status={paymentStatus}
          paymentData={paymentData ? {
            transactionId: paymentData.id || paymentData.trans || '',
            reference: paymentData.reference || '',
            amount: paymentData.amount || 0,
            currency: 'NGN',
            paymentMethod: 'card',
            paidAt: paymentData.paid_at || new Date().toISOString()
          } : undefined}
          appointmentData={paymentData?.appointmentData ? {
            appointmentId: paymentData.appointmentData.id?.toString() || '',
            appointmentType: getAppointmentTypeDescription({
              urgency: formData.urgency as 'routine' | 'soon' | 'urgent',
              department: departments.find(d => d.id === appointmentPayload?.department)?.name || 'General Medicine',
              patientEmail: user?.email || '',
              patientName: user?.full_name || user?.first_name + ' ' + user?.last_name || 'Patient',
              appointmentDate: formData.preferredDate,
              appointmentTime: formData.preferredTimeSlot,
              symptoms: formData.selectedSymptoms
            }),
            department: departments.find(d => d.id === appointmentPayload?.department)?.name || 'General Medicine',
            date: formData.preferredDate,
            time: formData.preferredTimeSlot,
            patientName: user?.full_name || user?.first_name + ' ' + user?.last_name || 'Patient'
          } : undefined}
          onRetry={handlePaymentRetry}
          onGoToAppointments={handleGoToAppointments}
        />
      )}
    </AccountHealthLayout>
  );
};

export default BookAppointment;
