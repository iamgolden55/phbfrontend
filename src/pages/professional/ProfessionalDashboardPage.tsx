import React, { useState, useEffect, FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointments, acceptAppointment, AppointmentResponse, Appointment, DoctorInfo, AppointmentSummary } from '../../features/professional/appointmentsService';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';
import { useAuth } from '../../features/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns/format';
import { ProfessionalCalendar } from '../../components/ProfessionalCalendar';

// Function to get role-specific dashboard data
const getRoleSpecificData = (professionalType: string) => {
  switch (professionalType) {
    case 'pharmacist':
      return {
        welcomeMessage: 'Welcome to your pharmacist dashboard',
        stats: [
          { label: 'Clinical Guidelines Updates', value: '12 new' },
          { label: 'CME Opportunities', value: '8 available' },
          { label: 'Professional Forum Threads', value: '24 unread' },
          { label: 'Prescription Requests', value: '15 pending' },
        ],
        quickLinks: [
          { label: 'Prescription Requests', path: '/professional/prescription-triage' },
          { label: 'Practice Page', path: '/professional/practice-page' },
          { label: 'Clinical Guidelines', path: '/professional/guidelines' },
          { label: 'Pharmacy Resources', path: '/professional/resources' },
          { label: 'Professional Forum', path: '/professional/forum' },
        ],
      };

    case 'doctor':
      return {
        welcomeMessage: 'Welcome to your doctor dashboard',
        stats: [
          { label: 'Clinical Guidelines Updates', value: '12 new' },
          { label: 'CME Opportunities', value: '8 available' },
          { label: 'Professional Forum Threads', value: '24 unread' },
          { label: 'Research Collaborations', value: '5 open' },
        ],
        quickLinks: [
          { label: 'Appointments', path: '/professional/appointments' },
          { label: 'Clinical Guidelines', path: '/professional/guidelines' },
          { label: 'Doctor Resources', path: '/professional/resources' },
          { label: 'Clinical Calculators', path: '/professional/calculators' },
          { label: 'Professional Forum', path: '/professional/forum' },
        ],
      };

    default:
      // Default professional dashboard
      return {
        welcomeMessage: 'Welcome to your professional dashboard',
        stats: [
          { label: 'Clinical Guidelines Updates', value: '12 new' },
          { label: 'CME Opportunities', value: '8 available' },
          { label: 'Professional Forum Threads', value: '24 unread' },
          { label: 'Research Collaborations', value: '5 open' },
        ],
        quickLinks: [
          { label: 'Clinical Guidelines', path: '/professional/guidelines' },
          { label: 'Professional Forum', path: '/professional/forum' },
        ],
      };
  }
};

// Latest announcements - common for all roles
const announcements = [
  {
    id: 1,
    title: 'New Clinical Guidelines for Hypertension',
    date: 'May 15, 2023',
    summary: 'Updated clinical guidelines for the management of hypertension have been published.',
  },
  {
    id: 2,
    title: 'Professional Forum Update',
    date: 'May 10, 2023',
    summary: 'The professional forum has been updated with new features including direct messaging and topic subscriptions.',
  },
  {
    id: 3,
    title: 'COVID-19 Protocol Updates',
    date: 'May 5, 2023',
    summary: 'The COVID-19 treatment and prevention protocols have been updated based on the latest research findings.',
  },
];

// Upcoming events - common for all roles
const events = [
  {
    id: 1,
    title: 'Virtual Grand Rounds: Advanced Diabetes Management',
    date: 'June 15, 2023',
    time: '1:00 PM - 2:30 PM',
  },
  {
    id: 2,
    title: 'Research Methodology Workshop',
    date: 'June 22, 2023',
    time: '10:00 AM - 4:00 PM',
  },
  {
    id: 3,
    title: 'Professional Ethics Seminar',
    date: 'July 5, 2023',
    time: '2:00 PM - 4:00 PM',
  },
];

const ProfessionalDashboardPage: React.FC = () => {
  // Get data from both auth contexts
  const { user, isAuthenticated: mainIsAuthenticated, isLoading: mainIsLoading, isDoctor } = useAuth();
  const { professionalUser, isAuthenticated: profIsAuthenticated, isLoading: profIsLoading } = useProfessionalAuth();
  const navigate = useNavigate();
  
  // State for appointments
  const [appointmentData, setAppointmentData] = useState<AppointmentResponse | null>(null);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState<boolean>(true);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  const [processingAppointment, setProcessingAppointment] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [appointmentSummary, setAppointmentSummary] = useState<AppointmentSummary | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Check if the user is authenticated as ANY professional (not just doctors)
  const isAuthLoading = mainIsLoading || profIsLoading;
  const isAuthenticated = mainIsAuthenticated && (isDoctor || profIsAuthenticated || !!professionalUser);

  // Redirect if not authenticated as a professional
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  // Fetch appointments on component mount
  useEffect(() => {
    const loadAppointments = async () => {
      if (!isAuthenticated) return;

      setIsLoadingAppointments(true);
      setAppointmentsError(null);

      try {
        // Fetch appointments from API
        const data = await fetchDoctorAppointments();

        // Save the appointment data
        setAppointmentData(data);
        setDoctorInfo(data.doctor_info);
        setAppointmentSummary(data.summary);
      } catch (err: any) {
        console.error('Failed to load doctor appointments:', err);
        setAppointmentsError(err.message || 'Failed to load appointments. Please try again later.');

        // Create mock data structure for the new format
        setAppointmentData({
          pending_department_appointments: [],
          my_appointments: {
            confirmed: [],
            in_progress: [],
            completed: [],
            cancelled: [],
            no_show: [],
            all: []
          },
          doctor_info: {
            id: 0,
            name: user?.full_name || 'Doctor',
            email: user?.email || '',
            specialization: '',
            department: { id: 0, name: '' },
            hospital: { id: 0, name: '' }
          },
          summary: {
            pending_department_count: 0,
            my_appointments_count: {
              confirmed: 0,
              in_progress: 0,
              completed: 0,
              cancelled: 0,
              no_show: 0,
              total: 0
            },
            today_appointments: 0,
            upcoming_appointments: 0
          }
        });
      } finally {
        setIsLoadingAppointments(false);
      }
    };

    loadAppointments();
  }, [isAuthenticated]); // Fixed: Removed 'user' from dependencies to prevent infinite render loop

  // Handle accepting an appointment
  const handleAcceptAppointment = async (appointmentId: string) => {
    setProcessingAppointment(appointmentId);
    try {
      const result = await acceptAppointment(appointmentId);
      
      // Update the appointment data by moving the appointment from pending to confirmed
      if (appointmentData) {
        const acceptedAppointment = appointmentData.pending_department_appointments.find(
          app => app.appointment_id === appointmentId
        );
        
        if (acceptedAppointment) {
          // Create a copy of the appointment with updated status
          const updatedAppointment = {
            ...acceptedAppointment,
            status: 'confirmed',
            status_display: 'Confirmed'
          };
          
          // Remove from pending and add to confirmed
          setAppointmentData({
            ...appointmentData,
            pending_department_appointments: appointmentData.pending_department_appointments.filter(
              app => app.appointment_id !== appointmentId
            ),
            my_appointments: {
              ...appointmentData.my_appointments,
              confirmed: [...appointmentData.my_appointments.confirmed, updatedAppointment],
              all: [...appointmentData.my_appointments.all, updatedAppointment]
            },
            summary: {
              ...appointmentData.summary,
              pending_department_count: appointmentData.summary.pending_department_count - 1,
              my_appointments_count: {
                ...appointmentData.summary.my_appointments_count,
                confirmed: appointmentData.summary.my_appointments_count.confirmed + 1,
                total: appointmentData.summary.my_appointments_count.total + 1
              }
            }
          });
        }
      }
      
      setSuccessMessage(`Appointment #${appointmentId} has been accepted successfully`);
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error: any) {
      setAppointmentsError(error.message || 'Failed to accept appointment');
      // Clear error message after 5 seconds
      setTimeout(() => setAppointmentsError(null), 5000);
    } finally {
      setProcessingAppointment(null);
    }
  };

  // Status tag styling based on appointment priority/status
  const getStatusTagClassName = (appointment: Appointment) => {
    if (appointment.status === 'cancelled') {
      return 'bg-red-100 text-red-800';
    }
    
    switch (appointment.priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-yellow-100 text-yellow-800';
      case 'normal':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  // Format the status display text
  const getStatusDisplay = (appointment: Appointment) => {
    if (appointment.status === 'cancelled') {
      return 'Cancelled';
    }
    
    switch (appointment.priority) {
      case 'urgent':
        return 'Urgent';
      case 'high':
        return 'Follow-up';
      case 'normal':
      default: 
        return 'Stable';
    }
  };

  // Format date from ISO to readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#2196F3';
      case 'confirmed': return '#FFC107';
      case 'cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };
  // Handle event selection for the calendar
  const handleSelectEvent = (event: any) => {
    console.log('Event selected:', event.id);
    setSelectedEvent((prev: any) => prev?.id === event.id ? null : event);
    
    // If the event has an appointment_id, we can navigate to the detail page
    if (event.appointment_id && !event.appointment_id.startsWith('temp-')) {
      navigate(`/professional/appointments/${event.appointment_id}`);
    }
  };

  // Handle adding a new event to the calendar
  const handleAddEvent = (event: any) => {
    console.log('New event added:', event);
    
    // Add the new event to the appointments list
    if (appointmentData && appointmentData.my_appointments) {
      // Create a new appointment object from the event
      const newAppointment: Appointment = {
        appointment_id: event.appointment_id,
        appointment_date: event.date.toISOString(),
        chief_complaint: event.title,
        status: event.status,
        priority: event.priority,
        formatted_date: format(event.date, 'MMM d, yyyy'),
        formatted_time: event.time,
        notes: event.notes,
        location: event.location,
        // Add any other required fields with default values
        patient_name: event.event_type === 'personal' ? 'Personal Event' : 'Patient Name',
        doctor_full_name: doctorName,
        appointment_type: event.event_type === 'personal' ? 'Personal' : 'Consultation',
        // Add a custom field to identify personal events
        is_personal: event.event_type === 'personal'
      };
      
      // Update the appointment data state
      setAppointmentData({
        ...appointmentData,
        my_appointments: {
          ...appointmentData.my_appointments,
          all: [...appointmentData.my_appointments.all, newAppointment],
          // Safely update the status-specific array
          ...(event.status === 'confirmed' || event.status === 'in_progress' || 
             event.status === 'completed' || event.status === 'cancelled' || 
             event.status === 'no_show' ? 
            { [event.status]: [...(appointmentData.my_appointments[event.status as keyof typeof appointmentData.my_appointments] as Appointment[] || []), newAppointment] } : 
            {})
        }
      });
      
      // Show a success message based on event type
      if (event.event_type === 'personal') {
        alert('Personal event added successfully!');
      } else {
        alert('Appointment added successfully!');
      }
    }
  };



  // Show loading state while authentication is being checked
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated or not a doctor, this will redirect (see useEffect above)
  if (!isAuthenticated) {
    return null;
  }

  // Get the doctor's name from various sources
  const doctorName = doctorInfo?.name || professionalUser?.name || user?.full_name || 'Doctor';
  const doctorRole = professionalUser?.role || 'Doctor';
  const doctorSpecialty = doctorInfo?.specialization || professionalUser?.specialty || '';

  // Get department and hospital info
  const departmentName = doctorInfo?.department?.name || '';
  const hospitalName = doctorInfo?.hospital?.name || '';

  // Get professional type and role-specific dashboard data
  const professionalType = professionalUser?.professional_type || professionalUser?.role || user?.role || 'doctor';
  const dashboardData = getRoleSpecificData(professionalType);

  return (
    <div>
      <Helmet>
        <title>Professional Dashboard | PHB</title>
      </Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">{dashboardData.welcomeMessage}</h1>
        <p className="mt-2 text-gray-600">
          {doctorName} | {doctorRole}
          {doctorSpecialty ? ` | ${doctorSpecialty}` : ''}
        </p>
        {departmentName && hospitalName && (
          <p className="text-gray-500">
            {departmentName}, {hospitalName}
          </p>
        )}
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* Appointment Summary Stats - Only for doctors */}
      {(isDoctor || professionalType === 'doctor') && appointmentSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-blue-600">{appointmentSummary.pending_department_count}</p>
            <p className="text-sm text-blue-700">Pending in Department</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-green-600">{appointmentSummary.my_appointments_count.confirmed}</p>
            <p className="text-sm text-green-700">Confirmed Appointments</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-yellow-600">{appointmentSummary.my_appointments_count.in_progress}</p>
            <p className="text-sm text-yellow-700">In Progress</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-indigo-600">{appointmentSummary.today_appointments}</p>
            <p className="text-sm text-indigo-700">Today's Appointments</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-purple-600">{appointmentSummary.upcoming_appointments}</p>
            <p className="text-sm text-purple-700">Upcoming Appointments</p>
          </div>
        </div>
      )}

      {/* Static Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardData.stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-blue-600">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pending Department Appointments Section - Only for doctors */}
      {(isDoctor || professionalType === 'doctor') && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-800">Pending Department Appointments</h2>
            <a href="/professional/appointments?filter=pending" className="text-blue-600 hover:underline text-sm">View all pending</a>
          </div>
        
        {isLoadingAppointments ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : appointmentsError && (!appointmentData || appointmentData.pending_department_appointments.length === 0) ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            <p>{appointmentsError}</p>
          </div>
        ) : !appointmentData || appointmentData.pending_department_appointments.length === 0 ? (
          <div className="bg-gray-50 p-4 rounded-md text-gray-600">
            No pending appointments found in your department.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointmentData.pending_department_appointments.slice(0, 5).map((appointment: Appointment) => (
                  <tr key={appointment.appointment_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.patient?.full_name || 
                       appointment.patient_name || 
                       appointment.patient_full_name || 
                       `Patient #${appointment.appointment_id.slice(-6)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.formatted_date || formatDate(appointment.appointment_date)}
                      {appointment.formatted_time && ` at ${appointment.formatted_time}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.chief_complaint}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        appointment.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {appointment.formatted_priority || appointment.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAcceptAppointment(appointment.appointment_id)}
                        disabled={processingAppointment === appointment.appointment_id}
                        className={`bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm ${processingAppointment === appointment.appointment_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {processingAppointment === appointment.appointment_id ? 'Processing...' : 'Accept'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      )}

      {/* My Confirmed Appointments Section - Only for doctors */}
      {(isDoctor || professionalType === 'doctor') && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">My Confirmed Appointments</h2>
          <a href="/professional/appointments?filter=confirmed" className="text-blue-600 hover:underline text-sm">View all confirmed</a>
        </div>
        
        {isLoadingAppointments ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : appointmentData && appointmentData.my_appointments.confirmed.length === 0 ? (
          <div className="bg-gray-50 p-4 rounded-md text-gray-600">
            No confirmed appointments found.
          </div>
        ) : appointmentData && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointmentData.my_appointments.confirmed.slice(0, 5).map((appointment: Appointment) => (
                  <tr key={appointment.appointment_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.patient?.full_name || 
                       appointment.patient_name || 
                       appointment.patient_full_name || 
                       `Patient #${appointment.appointment_id.slice(-6)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.formatted_date || formatDate(appointment.appointment_date)}
                      {appointment.formatted_time && ` at ${appointment.formatted_time}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.formatted_appointment_type || appointment.appointment_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                      <a href={`/professional/appointments/${appointment.appointment_id}`}>View Details</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      )}

      {/* In Progress Appointments Section */}
      {appointmentData && appointmentData.my_appointments.in_progress.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-yellow-800">Active Consultations</h2>
            <a href="/professional/appointments?filter=in_progress" className="text-blue-600 hover:underline text-sm">View all active</a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointmentData.my_appointments.in_progress.slice(0, 3).map((appointment: Appointment) => (
                  <tr key={appointment.appointment_id} className="bg-yellow-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.patient?.full_name || 
                       appointment.patient_name || 
                       appointment.patient_full_name || 
                       `Patient #${appointment.appointment_id.slice(-6)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.formatted_date || formatDate(appointment.appointment_date)}
                      {appointment.formatted_time && ` at ${appointment.formatted_time}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.formatted_appointment_type || appointment.appointment_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a 
                        href={`/professional/appointments/${appointment.appointment_id}`}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded text-sm"
                      >
                        Complete Consultation
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Links and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Links */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 gap-2">
            {dashboardData.quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md flex items-center text-blue-700 transition"
              >
                <span className="mr-2">→</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Announcements Coming Soon</h3>
            <p className="text-gray-600 max-w-md">
              We're working on an announcements system to keep you updated with important practice news and updates.
            </p>
            <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Under Development
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-purple-50 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Events Coming Soon</h3>
            <p className="text-gray-600 max-w-md">
              Our events calendar will help you track important dates, meetings, and professional development opportunities.
            </p>
            <div className="mt-4 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Under Development
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Calendar */}
      <div className="mt-8">
        {appointmentData?.my_appointments?.all && (
          <ProfessionalCalendar
            appointments={appointmentData.my_appointments.all}
            onSelectEvent={handleSelectEvent}
            selectedEvent={selectedEvent}
            onAddEvent={handleAddEvent}
            className="mb-8"
          />
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboardPage;
