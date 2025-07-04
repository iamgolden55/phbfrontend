import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tab, Tabs, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import MedicalRecordsTab from '../../features/medical/MedicalRecordsTab';
import MedicalAccessTab from '../../features/professional/MedicalAccessTab';
import { 
  fetchDoctorAppointmentDetails, 
  updateAppointmentStatus, 
  addDoctorNotes,
  cancelAppointment,
  markAppointmentNoShow,
  addAppointmentPrescriptions,
  getAppointmentPrescriptions,
  PrescriptionMedication,
  PrescriptionResponse,
  fetchAppointmentNotes,
  editAppointmentNotes,
  deleteAppointmentNotes,
  completeConsultation,
  referAppointment,
  ReferralRequest,
  fetchHospitals,
  fetchDepartments
} from '../../features/professional/appointmentsService';

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
  hospital?: string;
  hospital_name?: string;
  department_name?: string;
  department?: string;
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
  medical_summary?: string;
  prescriptions?: PrescriptionResponse[];
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

interface MedicationForm {
  medication_name: string;
  strength: string;
  form: string;
  route: string;
  dosage: string;
  frequency: string;
  duration: string;
  patient_instructions: string;
  indication: string;
  generic_name?: string;
}

interface Hospital {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`appointment-tabpanel-${index}`}
      aria-labelledby={`appointment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `appointment-tab-${index}`,
    'aria-controls': `appointment-tabpanel-${index}`,
  };
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
  
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  // Notes state
  const [appointmentNotes, setAppointmentNotes] = useState<{
    notes?: string;
    doctor_notes?: string;
  } | null>(null);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editingNotesType, setEditingNotesType] = useState<'general' | 'doctor'>('general');
  
  // Prescription state variables
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState<PrescriptionResponse[]>([]);
  const [isLoadingPrescriptions, setIsLoadingPrescriptions] = useState(false);
  const [medications, setMedications] = useState<MedicationForm[]>([{
    medication_name: '',
    strength: '',
    form: '',
    route: '',
    dosage: '',
    frequency: '',
    duration: '',
    patient_instructions: '',
    indication: ''
  }]);
  
  // Referral state variables
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [referralReason, setReferralReason] = useState('');
  const [isLoadingReferral, setIsLoadingReferral] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [referralType, setReferralType] = useState<'same-hospital' | 'other-hospital'>('same-hospital');

  // Effect to load mock hospitals and departments data


  useEffect(() => {
    const loadAppointmentDetails = async () => {
      if (!appointmentId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointmentDetails(appointmentId);
        console.log('Appointment details:', data);
        console.log('symptoms:', data?.symptoms_data[0].description);
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
          patient_id: data.patient_id || data.patient?.id || data.appointment_id,
          symptoms: data.symptoms_data[0]?.description || data.chief_complaint
        };
        

        setAppointmentDetails(processedData);
        
        // If the appointment is in progress or completed, fetch prescriptions
        if (processedData.status === 'in_progress' || processedData.status === 'completed') {
          loadPrescriptions();
        }
      } catch (err: any) {
        console.error('Failed to load appointment details:', err);
        setError(err.message || 'Failed to load appointment details');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointmentDetails();
  }, [appointmentId]);

// Effect to load mock hospitals and departments data
  // In production, these would be fetched from an API
  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const response = await fetchHospitals();
        setHospitals(response.hospitals);
      } catch (error) {
        console.error('Failed to fetch hospitals:', error);
      }
    };
    
    loadHospitals();
  }, []);

  useEffect(() => {
    console.log('Start loading departments')
    if (selectedHospitalId) {
      setLoadingDepartments(true);
      
      const loadDepartments = async () => {
        try {
          const depts = await fetchDepartments(selectedHospitalId);
          setDepartments(depts);
          console.log(`Departments from hospital ${selectedHospitalId}:`, depts);
        } catch (error) {
          console.error(`Failed to fetch departments for hospital ${selectedHospitalId}:`, error);
        } finally {
          setLoadingDepartments(false);
        }
      };
      
      loadDepartments();
    } else if (appointmentDetails?.hospital) {
      console.log('No hospital selected, using appointment hospital')
      const loadDepartments = async () => {
        try {
          const depts = await fetchDepartments(Number(appointmentDetails?.hospital));
          setDepartments(depts);
          console.log(`Departments from hospital ${appointmentDetails?.hospital}:`, depts);
        } catch (error) {
          console.error(`Failed to fetch departments for hospital ${appointmentDetails?.hospital}:`, error);
        } finally {
          setLoadingDepartments(false);
        }
      };
  

      loadDepartments();
    }
  }, [selectedHospitalId, appointmentDetails?.hospital]);

  useEffect(() => {
    const loadAppointmentNotes = async () => {
      if (!appointmentId) return;
      
      setIsLoadingNotes(true);
      setNotesError(null);
      
      try {
        const notesData = await fetchAppointmentNotes(appointmentId);
        setAppointmentNotes(notesData);
      } catch (err: any) {
        console.error('Failed to load appointment notes:', err);
        setNotesError(err.message || 'Failed to load appointment notes');
      } finally {
        setIsLoadingNotes(false);
      }
    };
    
    loadAppointmentNotes();
  }, [appointmentId]);

  // Function to load prescriptions
  const loadPrescriptions = async () => {
    if (!appointmentId) return;
    
    setIsLoadingPrescriptions(true);
    
    try {
      const data = await getAppointmentPrescriptions(appointmentId);
      console.log('Loaded prescriptions for appointment:', data);
      
      // Just store the prescription response as is
      setPrescriptions([data]);
      
      // If we got prescriptions back, also update the appointment details
      if (appointmentDetails) {
        setAppointmentDetails({
          ...appointmentDetails,
          prescriptions: [data]
        });
      }
    } catch (err: any) {
      console.error('Failed to load prescriptions:', err);
      // We don't set the main error here to avoid disrupting the UI if only prescriptions fail
    } finally {
      setIsLoadingPrescriptions(false);
    }
  };

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
    
    setActionLoading('cancel');
    try {
      const reason = prompt('Please provide a reason for cancellation (required):');
      if (reason === null) {
        // User cancelled the prompt
        setActionLoading(null);
        return;
      }
      
      if (!reason.trim()) {
        // Empty reason provided
        setError('A cancellation reason is required');
        setTimeout(() => setError(null), 3000);
        setActionLoading(null);
        return;
      }
      
      const result = await cancelAppointment(appointmentId, reason);
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
      const result = await markAppointmentNoShow(appointmentId);
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
      
      // Use completeConsultation instead of updateAppointmentStatus
      const result = await completeConsultation(
        appointmentId, 
        enhancedSummary
      );
      
      // Process any notification response if applicable
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      // Update the appointment details with the completed status
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
      let result;
      
      if (isEditingNotes) {
        // Edit existing notes
        const notesData = {
          ...(editingNotesType === 'general' ? { general_notes: notes } : {}),
          ...(editingNotesType === 'doctor' ? { doctor_notes: notes } : {}),
        };
        
        result = await editAppointmentNotes(appointmentId, notesData);
        setStatusUpdateSuccess('Notes updated successfully');
      } else {
        // Add new doctor notes
        result = await addDoctorNotes(appointmentId, notes);
        setStatusUpdateSuccess('Notes added successfully');
      }
      
      // Refresh appointment notes
      const updatedNotes = await fetchAppointmentNotes(appointmentId);
      setAppointmentNotes(updatedNotes);
      
      // Update the appointment details with the result from the API if needed
      if (appointmentDetails && result) {
        setAppointmentDetails({
          ...appointmentDetails,
          // Update relevant fields from the API response
          important_notes: result.important_notes || appointmentDetails.important_notes
        });
      }
      
      setShowNotesModal(false);
      setNotes('');
      setIsEditingNotes(false);
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save notes');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteNotes = async (type: 'general' | 'doctor' = 'general') => {
    if (!appointmentId) return;
    
    if (!window.confirm(`Are you sure you want to delete the ${type === 'general' ? 'general' : 'doctor'} notes?`)) {
      return;
    }
    
    setActionLoading('delete-notes');
    try {
      await deleteAppointmentNotes(appointmentId);
      
      // Refresh appointment notes
      const updatedNotes = await fetchAppointmentNotes(appointmentId);
      setAppointmentNotes(updatedNotes);
      
      setStatusUpdateSuccess('Notes deleted successfully');
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to delete notes');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBack = () => {
    navigate('/professional/appointments');
  };

  // Add a new blank medication form
  const handleAddMedication = () => {
    setMedications([...medications, {
      medication_name: '',
      strength: '',
      form: '',
      route: '',
      dosage: '',
      frequency: '',
      duration: '',
      patient_instructions: '',
      indication: ''
    }]);
  };
  
  // Remove a medication form
  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };
  
  // Update a specific field in a medication form
  const handleMedicationChange = (index: number, field: keyof MedicationForm, value: string) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    setMedications(updatedMedications);
  };
  
  // Open the prescription modal
  const handleShowPrescriptionModal = () => {
    setShowPrescriptionModal(true);
  };
  
  // Open the referral modal
  const handleShowReferralModal = () => {
    setSelectedHospitalId(null);
    setSelectedDepartmentId(null);
    setReferralReason('');
    setShowReferralModal(true);
  };
  
  // Handle referral type change
  const handleReferralTypeChange = (type: 'same-hospital' | 'other-hospital') => {
    setSelectedHospitalId(null);
    setSelectedDepartmentId(null);
    setReferralType(type);
  };
  
  // Submit referral
  const handleSubmitReferral = async () => {
    if (!appointmentId) return;
    
    // Validate form
    if (
      (referralType === 'same-hospital' && !selectedDepartmentId) ||
      (referralType === 'other-hospital' && (!selectedHospitalId || !selectedDepartmentId)) ||
      !referralReason.trim()
    ) {
      setError('Please fill in all required fields');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setIsLoadingReferral(true);
    setActionLoading('refer');
    
    try {
      const referralData: ReferralRequest = {
        ...(referralType === 'same-hospital' 
          ? { referred_to_department: Number(selectedDepartmentId)}
          : { 
              referred_to_hospital: selectedHospitalId!,
              referred_to_department: selectedDepartmentId!
            }),
        referral_reason: referralReason
      };
      
      const result = await referAppointment(appointmentId, referralData);
      
      // Process notification response if applicable
      if (result.notification) {
        setNotificationStatus(processNotificationResponse(result.notification));
      }
      
      // Update appointment status to 'referred'
      if (appointmentDetails) {
        setAppointmentDetails({
          ...appointmentDetails,
          status: 'referred',
          status_display: 'Referred'
        });
      }
      
      setShowReferralModal(false);
      setReferralReason('');
      setSelectedHospitalId(null);
      setSelectedDepartmentId(null);
      
      setStatusUpdateSuccess('Appointment referred successfully');
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to refer appointment');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoadingReferral(false);
      setActionLoading(null);
    }
  };
  
  // Submit prescriptions
  const handleSubmitPrescriptions = async () => {
    if (!appointmentId) return;
    
    // Validate medications
    const invalidMedications = medications.filter(med => 
      !med.medication_name || !med.strength || !med.form || 
      !med.route || !med.dosage || !med.frequency || 
      !med.patient_instructions || !med.indication
    );
    
    if (invalidMedications.length > 0) {
      setError('Please fill out all required fields for all medications');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setActionLoading('prescriptions');
    
    try {
      // Map to the expected format
      const medicationsToSubmit = medications.map(med => ({
        // Using 0 as a temporary ID since the server will assign the real one
        id: 0,
        medication_name: med.medication_name,
        strength: med.strength,
        form: med.form,
        route: med.route,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration || undefined, // Don't send empty strings
        patient_instructions: med.patient_instructions,
        indication: med.indication
      }));
      console.log('Medications to submit:', medicationsToSubmit);
      const result = await addAppointmentPrescriptions(appointmentId, medicationsToSubmit);
      
      // Reset the form
      setMedications([{
        medication_name: '',
        strength: '',
        form: '',
        route: '',
        dosage: '',
        frequency: '',
        duration: '',
        patient_instructions: '',
        indication: ''
      }]);
      
      setShowPrescriptionModal(false);
      
      // Reload prescriptions
      loadPrescriptions();
      
      setStatusUpdateSuccess('Prescriptions added successfully');
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to add prescriptions');
      setTimeout(() => setError(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      
      {/* Tabs */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="appointment details tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Appointment Details" {...a11yProps(0)} />
            <Tab label="Patient Medical Records" {...a11yProps(1)} disabled={!appointmentDetails?.patient_id} />
            <Tab label="Medical Access" {...a11yProps(2)} disabled={!appointmentDetails?.patient_id} />
          </Tabs>
        </Box>
        
        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          {/* Original content goes here */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-base font-medium">
                  {appointmentDetails.status_display}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-base font-medium">
                  {appointmentDetails.formatted_date || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-base font-medium">
                  {appointmentDetails.formatted_time || 'Not specified'}
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
        </TabPanel>
        
        {/* Medical Records Tab */}
        <TabPanel value={tabValue} index={1}>
          {appointmentDetails?.patient_id ? (
            <MedicalRecordsTab 
              patientId={appointmentDetails.patient_id} 
              patientName={appointmentDetails.patient_name} 
            />
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No patient information available to view medical records.
              </Typography>
            </Box>
          )}
        </TabPanel>
        
        {/* Medical Access Tab */}
        <TabPanel value={tabValue} index={2}>
          {appointmentDetails?.patient_id ? (
            <MedicalAccessTab 
              patientId={appointmentDetails.patient_id} 
              patientName={appointmentDetails.patient_name}
              appointmentId={appointmentId || ''}
            />
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No patient information available for medical access management.
              </Typography>
            </Box>
          )}
        </TabPanel>
      </Box>
      
      {/* Rest of the content */}
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
              {appointmentDetails.status === 'accepted' || appointmentDetails.status === 'confirmed' || appointmentDetails.status === 'in_progress'  && (
                <button 
                  onClick={handleShowReferralModal}
                  disabled={actionLoading !== null}
                  className={`px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors ${
                    actionLoading === 'refer' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {actionLoading === 'refer' ? 'Referring...' : 'Refer Patient'}
                </button>
              )}
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
                onClick={handleShowReferralModal}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors ${
                  actionLoading === 'refer' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'refer' ? 'Referring...' : 'Refer Patient'}
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
          
          {/* In Progress Status Actions */}
          {appointmentDetails.status === 'in_progress' && (
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
              <button 
                onClick={handleShowReferralModal}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors ${
                  actionLoading === 'refer' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'refer' ? 'Referring...' : 'Refer Patient'}
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
              <button 
                onClick={handleShowPrescriptionModal}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors ${
                  actionLoading === 'prescriptions' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'prescriptions' ? 'Processing...' : 'Add Prescriptions'}
              </button>
            </>
          )}
          
          {/* Completed Status Actions */}
          {appointmentDetails.status === 'completed' && (
            <>
              <button 
                onClick={handleAddNotes}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors ${
                  actionLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Add Notes
              </button>
              <button 
                onClick={handleShowPrescriptionModal}
                disabled={actionLoading !== null}
                className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors ${
                  actionLoading === 'prescriptions' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'prescriptions' ? 'Processing...' : 'Add Prescriptions'}
              </button>
            </>
          )}
          
          {/* Other statuses */}
          {appointmentDetails.status !== 'pending' && 
            appointmentDetails.status !== 'confirmed' && 
            appointmentDetails.status !== 'in_progress' && 
            appointmentDetails.status !== 'completed' && (
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
      
      {/* Appointment Notes */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Notes</h2>
        {isLoadingNotes ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : notesError ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Could not load notes: {notesError}
                </p>
              </div>
            </div>
          </div>
        ) : appointmentNotes && (
          <div className="space-y-4">
            {appointmentNotes.notes && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">General Notes</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{appointmentNotes.notes}</p>
                <button
                  onClick={() => {
                    setNotes(appointmentNotes.notes || '');
                    setIsEditingNotes(true);
                    setEditingNotesType('general');
                    setShowNotesModal(true);
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 mr-3"
                >
                  Edit Notes
                </button>
                <button
                  onClick={() => handleDeleteNotes()}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Delete Notes
                </button>
              </div>
            )}
            {appointmentNotes.doctor_notes && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Doctor Notes</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{appointmentNotes.doctor_notes}</p>
                <button
                  onClick={() => {
                    setNotes(appointmentNotes.doctor_notes || '');
                    setIsEditingNotes(true);
                    setEditingNotesType('doctor');
                    setShowNotesModal(true);
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 mr-3"
                >
                  Edit Notes
                </button>
                <button
                  onClick={() => handleDeleteNotes('doctor')}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Delete Notes
                </button>
              </div>
            )}
            {!appointmentNotes?.notes && !appointmentNotes?.doctor_notes && (
              <p className="text-gray-500">No notes available for this appointment</p>
            )}
          </div>
        )}
      </div>
      
      {/* Prescriptions */}
      {(appointmentDetails.status === 'in_progress' || appointmentDetails.status === 'completed') && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-800">Prescriptions</h2>
            <button
              onClick={handleShowPrescriptionModal}
              disabled={actionLoading === 'prescriptions'}
              className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-sm ${
                actionLoading === 'prescriptions' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {actionLoading === 'prescriptions' ? 'Processing...' : 'Add New Prescription'}
            </button>
          </div>
          
          {isLoadingPrescriptions ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading prescriptions...</p>
            </div>
          ) : prescriptions && prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((prescription, index) => (
                <div key={index} className="border rounded-md p-4 bg-purple-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Prescription for {prescription.patient_name}</h3>
                    <span className="text-sm text-gray-500">
                      Prescribed on: {new Date(prescription.appointment_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-700 mb-2">Medications ({prescription.medication_count}):</h4>
                    {prescription.medications && prescription.medications.map((medication, medIndex) => (
                      <div key={medIndex} className="bg-white p-3 rounded-md mb-2 shadow-sm">
                        <div className="flex justify-between">
                          <h5 className="font-medium">{medication.medication_name}</h5>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {medication.form}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                          <div>
                            <span className="font-medium">Strength:</span> {medication.strength}
                          </div>
                          <div>
                            <span className="font-medium">Route:</span> {medication.route}
                          </div>
                          <div>
                            <span className="font-medium">Dosage:</span> {medication.dosage}
                          </div>
                          <div>
                            <span className="font-medium">Frequency:</span> {medication.frequency}
                          </div>
                          {medication.duration && (
                            <div>
                              <span className="font-medium">Duration:</span> {medication.duration}
                            </div>
                          )}
                          <div className="md:col-span-2">
                            <span className="font-medium">Indication:</span> {medication.indication}
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium">Instructions:</span> {medication.patient_instructions}
                          </div>
                          {medication.status && (
                            <div>
                              <span className="font-medium">Status:</span> {medication.status_display || medication.status}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    Prescribed by: {prescription.doctor_name || 'Doctor'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No prescriptions have been added yet.</p>
          )}
        </div>
      )}
      
      {/* Add/Edit Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              {isEditingNotes ? `Edit ${editingNotesType === 'general' ? 'General' : 'Doctor'} Notes` : 'Add Notes'}
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 h-32 mb-4"
              placeholder="Enter your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowNotesModal(false);
                  setIsEditingNotes(false);
                  setNotes('');
                }}
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
                {actionLoading === 'notes' ? 'Saving...' : isEditingNotes ? 'Update Notes' : 'Save Notes'}
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
      
      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Add Prescriptions</h3>
            
            <div className="mb-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
              <p>
                <strong>Note:</strong> Please fill out all required information for each medication. The medications will be added to the patient's medical record.
              </p>
            </div>
            
            <div className="space-y-6">
              {medications.map((medication, index) => (
                <div key={index} className="p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-700">Medication #{index + 1}</h4>
                    {medications.length > 1 && (
                      <button
                        onClick={() => handleRemoveMedication(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medication Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={medication.medication_name}
                        onChange={(e) => handleMedicationChange(index, 'medication_name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Strength <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., 500mg, 10mg/mL"
                        value={medication.strength}
                        onChange={(e) => handleMedicationChange(index, 'strength', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Form <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={medication.form}
                        onChange={(e) => handleMedicationChange(index, 'form', e.target.value)}
                        required
                      >
                        <option value="">Select form</option>
                        <option value="tablet">Tablet</option>
                        <option value="capsule">Capsule</option>
                        <option value="liquid">Liquid</option>
                        <option value="injection">Injection</option>
                        <option value="cream">Cream</option>
                        <option value="ointment">Ointment</option>
                        <option value="patch">Patch</option>
                        <option value="inhaler">Inhaler</option>
                        <option value="drops">Drops</option>
                        <option value="spray">Spray</option>
                        <option value="suppository">Suppository</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Route <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={medication.route}
                        onChange={(e) => handleMedicationChange(index, 'route', e.target.value)}
                        required
                      >
                        <option value="">Select route</option>
                        <option value="oral">Oral</option>
                        <option value="topical">Topical</option>
                        <option value="intravenous">Intravenous (IV)</option>
                        <option value="intramuscular">Intramuscular (IM)</option>
                        <option value="subcutaneous">Subcutaneous</option>
                        <option value="inhalation">Inhalation</option>
                        <option value="nasal">Nasal</option>
                        <option value="ophthalmic">Ophthalmic (Eye)</option>
                        <option value="otic">Otic (Ear)</option>
                        <option value="rectal">Rectal</option>
                        <option value="vaginal">Vaginal</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dosage <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., 1 tablet, 2 teaspoons"
                        value={medication.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., twice daily, every 8 hours"
                        value={medication.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., 7 days, 2 weeks"
                        value={medication.duration}
                        onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Indication <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Reason for prescription"
                        value={medication.indication}
                        onChange={(e) => handleMedicationChange(index, 'indication', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Patient Instructions <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        rows={2}
                        placeholder="Instructions for the patient"
                        value={medication.patient_instructions}
                        onChange={(e) => handleMedicationChange(index, 'patient_instructions', e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleAddMedication}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Another Medication
              </button>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowPrescriptionModal(false);
                  setMedications([{
                    medication_name: '',
                    strength: '',
                    form: '',
                    route: '',
                    dosage: '',
                    frequency: '',
                    duration: '',
                    patient_instructions: '',
                    indication: ''
                  }]);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPrescriptions}
                disabled={actionLoading === 'prescriptions'}
                className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors ${
                  actionLoading === 'prescriptions' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {actionLoading === 'prescriptions' ? 'Processing...' : 'Add Prescriptions'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Referral Modal */}
      {showReferralModal && (
        <Dialog open={showReferralModal} onClose={() => setShowReferralModal(false)}>
          <DialogTitle>Refer Appointment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Referral Reason"
              fullWidth
              value={referralReason}
              onChange={(e) => setReferralReason(e.target.value)}
              required
            />
            
            {/* Referral type selection */}
            <FormControl component="fieldset" fullWidth margin="dense">
              <FormLabel component="legend">Referral Type</FormLabel>
              <RadioGroup 
                value={referralType} 
                onChange={(e) => handleReferralTypeChange(e.target.value as 'same-hospital' | 'other-hospital')}
              >
                <FormControlLabel 
                  value="same-hospital" 
                  control={<Radio />} 
                  label="Refer to department within same hospital" 
                />
                <FormControlLabel 
                  value="other-hospital" 
                  control={<Radio />} 
                  label="Refer to another hospital" 
                />
              </RadioGroup>
            </FormControl>
            
            {/* Department selection for same hospital */}
            {referralType === 'same-hospital' && (
              <FormControl fullWidth margin="dense">
                <InputLabel>Select Department</InputLabel>
                <Select
                  value={selectedDepartmentId || ''}
                  onChange={(e) => setSelectedDepartmentId(Number(e.target.value))}
                  label="Select Department"
                  required
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            
            {/* Hospital and department selection for other hospital */}
            {referralType === 'other-hospital' && (
              <>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Select Hospital</InputLabel>
                  <Select
                    value={selectedHospitalId || ''}
                    onChange={(e) => setSelectedHospitalId(Number(e.target.value))}
                    label="Select Hospital"
                    required
                  >
                    {hospitals.map((hospital) => (
                      <MenuItem key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="dense">
                  <InputLabel>Select Department</InputLabel>
                  <Select
                    value={selectedDepartmentId || ''}
                    onChange={(e) => setSelectedDepartmentId(Number(e.target.value))}
                    label="Select Department"
                    required
                    disabled={!selectedHospitalId || loadingDepartments}
                  >
                    {loadingDepartments ? (
                      <MenuItem>Loading departments...</MenuItem>
                    ) : departments.length > 0 ? (
                      departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>No departments available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowReferralModal(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmitReferral} 
              disabled={!referralReason.trim() || 
                (referralType === 'same-hospital' && !selectedDepartmentId) || 
                (referralType === 'other-hospital' && (!selectedHospitalId || !selectedDepartmentId))}
            >
              Refer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ProfessionalAppointmentDetailPage;