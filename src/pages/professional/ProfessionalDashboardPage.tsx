import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointments } from '../../features/professional/appointmentsService';

// Define appointment type based on the API response
interface Appointment {
  id: number;
  appointment_id: string;
  doctor_full_name: string;
  hospital_name: string;
  department_name: string;
  appointment_date: string;
  formatted_date: string;
  formatted_time: string;
  formatted_date_time: string;
  duration: number;
  appointment_type: string;
  formatted_appointment_type: string;
  priority: string;
  formatted_priority: string;
  status: string;
  status_display: string;
  chief_complaint: string;
  created_at: string;
  patient_name?: string;
  patient_full_name?: string;
  patient_id?: string;
}

// Mock data for a doctor dashboard
const mockDoctorData = {
  name: 'Dr. Sarah Johnson',
  role: 'Doctor',
  specialty: 'Cardiology',
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
    { label: 'Doctor Resources', path: '/professional/doctor-resources' },
    { label: 'Clinical Calculators', path: '/professional/calculators' },
    { label: 'Professional Forum', path: '/professional/forum' },
  ],
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
  // Use mock data directly without authentication
  const userData = mockDoctorData;
  
  // State for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState<boolean>(true);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);

  // Fetch appointments on component mount
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoadingAppointments(true);
      setAppointmentsError(null);
      
      try {
        // Fetch appointments from API
        const data = await fetchDoctorAppointments();
        
        // Process the data to properly handle patient information
        const processedData = data.map((appointment: any) => {
          // Make a copy to avoid mutating the original
          const processed = { ...appointment };
          
          // Extract patient name based on multiple possible data structures
          let patientName = processed.patient_name || 
                          processed.patient_full_name || 
                          (processed.patient && (processed.patient.name || processed.patient.full_name)) ||
                          processed.name ||
                          processed.full_name ||
                          processed.customer_name || 
                          processed.user_name ||
                          processed.client_name;
          
          // If no patient name found, use a fallback
          if (!patientName) {
            patientName = `Patient #${processed.appointment_id?.slice(-6) || Math.floor(Math.random() * 1000)}`;
          }
          
          // Add the extracted patient name to the processed appointment
          processed.patient_name = patientName;
          
          return processed;
        });
        
        setAppointments(processedData);
      } catch (err: any) {
        console.error('Failed to load doctor appointments:', err);
        setAppointmentsError(err.message || 'Failed to load appointments. Please try again later.');
        
        // If API call fails, use mock data for development/demo
        setAppointments([
          {
            id: 1,
            appointment_id: 'APT123456',
            doctor_full_name: 'Dr. Sarah Johnson',
            hospital_name: 'St. Nicholas Hospital Lagos',
            department_name: 'Cardiology',
            appointment_date: '2023-05-24T14:30:00Z',
            formatted_date: 'May 24, 2023',
            formatted_time: '2:30 PM',
            formatted_date_time: 'May 24, 2023 at 2:30 PM',
            duration: 30,
            appointment_type: 'in_person',
            formatted_appointment_type: 'In-person',
            priority: 'normal',
            formatted_priority: 'Normal',
            status: 'scheduled',
            status_display: 'Scheduled',
            chief_complaint: 'Regular check-up',
            created_at: '2023-05-10T09:15:00Z',
            patient_name: 'John Smith'
          },
          {
            id: 2,
            appointment_id: 'APT123457',
            doctor_full_name: 'Dr. Sarah Johnson',
            hospital_name: 'St. Nicholas Hospital Lagos',
            department_name: 'Cardiology',
            appointment_date: '2023-05-22T10:00:00Z',
            formatted_date: 'May 22, 2023',
            formatted_time: '10:00 AM',
            formatted_date_time: 'May 22, 2023 at 10:00 AM',
            duration: 45,
            appointment_type: 'video',
            formatted_appointment_type: 'Video call',
            priority: 'high',
            formatted_priority: 'High',
            status: 'scheduled',
            status_display: 'Scheduled',
            chief_complaint: 'Chest pain, shortness of breath',
            created_at: '2023-05-15T14:30:00Z',
            patient_name: 'Jane Doe'
          },
          {
            id: 3,
            appointment_id: 'APT123458',
            doctor_full_name: 'Dr. Sarah Johnson',
            hospital_name: 'St. Nicholas Hospital Lagos',
            department_name: 'Cardiology',
            appointment_date: '2023-05-20T15:45:00Z',
            formatted_date: 'May 20, 2023',
            formatted_time: '3:45 PM',
            formatted_date_time: 'May 20, 2023 at 3:45 PM',
            duration: 30,
            appointment_type: 'phone',
            formatted_appointment_type: 'Phone call',
            priority: 'urgent',
            formatted_priority: 'Urgent',
            status: 'scheduled',
            status_display: 'Scheduled',
            chief_complaint: 'Follow-up regarding test results',
            created_at: '2023-05-18T11:20:00Z',
            patient_name: 'Robert Johnson'
          }
        ]);
      } finally {
        setIsLoadingAppointments(false);
      }
    };
    
    loadAppointments();
  }, []);

  // Get recent appointments (sorted by date, most recent first)
  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime())
    .slice(0, 5); // Get top 5 most recent

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

  return (
    <div>
      <Helmet>
        <title>Professional Dashboard | PHB</title>
      </Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">{userData.welcomeMessage}</h1>
        <p className="mt-2 text-gray-600">
          {userData.name} | {userData.role}
          {userData.specialty ? ` | ${userData.specialty}` : ''}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {userData.stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-blue-600">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Links */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 gap-2">
            {userData.quickLinks.map((link, index) => (
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
          <h2 className="text-xl font-bold text-blue-800 mb-4">Latest Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-b pb-3 last:border-0">
                <h3 className="text-md font-semibold">{announcement.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{announcement.date}</p>
                <p className="text-sm text-gray-700">{announcement.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a href="#" className="text-blue-600 hover:underline text-sm">View all announcements</a>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border-b pb-3 last:border-0">
                <h3 className="text-md font-semibold">{event.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{event.date}</p>
                <p className="text-sm text-gray-700">{event.time}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a href="#" className="text-blue-600 hover:underline text-sm">View all events</a>
          </div>
        </div>
      </div>

      {/* Your Patients Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Your Recent Patients</h2>
        
        {isLoadingAppointments ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : appointmentsError ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            <p>There was an error loading your recent patients: {appointmentsError}</p>
            <p className="mt-2">Showing sample data instead</p>
          </div>
        ) : recentAppointments.length === 0 ? (
          <div className="bg-gray-50 p-4 rounded-md text-gray-600">
            No recent patients found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.appointment_id}>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.patient_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.formatted_date || new Date(appointment.appointment_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusTagClassName(appointment)}`}>
                        {getStatusDisplay(appointment)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                      <a href={`/professional/appointments/${appointment.appointment_id}`}>View Records</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4">
          <a href="/professional/patients" className="text-blue-600 hover:underline text-sm">View all patients</a>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboardPage;
