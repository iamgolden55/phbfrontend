import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../features/auth/authContext';
import { fetchAppointments } from '../../features/professional/appointmentsService';

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
}

const AccountAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('upcoming');
  const { user, isDoctor } = useAuth();
  
  // For doctor users, allow toggling between patient/doctor appointments
  const [viewAsDoctor, setViewAsDoctor] = useState<boolean>(false);
  
  // Check local storage for view preference on component mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('phb_view_preference');
    // If user has doctor role and has saved preference for doctor view
    if (isDoctor && savedPreference === 'doctor') {
      setViewAsDoctor(true);
    }
  }, [isDoctor]);

  // Fetch appointments on component mount and when view toggles
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchAppointments(viewAsDoctor);
        setAppointments(data);
      } catch (err: any) {
        console.error('Failed to load appointments:', err);
        setError(err.message || 'Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, [viewAsDoctor]);

  // Filter appointments based on active filter
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    const now = new Date();
    
    if (activeFilter === 'upcoming') {
      return appointmentDate >= now && appointment.status !== 'cancelled';
    } else if (activeFilter === 'past') {
      return appointmentDate < now || appointment.status === 'completed';
    } else if (activeFilter === 'cancelled') {
      return appointment.status === 'cancelled';
    } else if (activeFilter === 'all') {
      return true;
    }
    
    return false;
  });
  
  // Toggle between patient and doctor views
  const toggleDoctorView = () => {
    const newValue = !viewAsDoctor;
    setViewAsDoctor(newValue);
    localStorage.setItem('phb_view_preference', newValue ? 'doctor' : 'patient');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>My Appointments | PHB</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">My Appointments</h1>
        <p className="text-gray-600">
          View and manage your upcoming and past appointments
        </p>
        
        {/* Toggle for doctors to switch appointment view */}
        {isDoctor && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800">Doctor Access</h3>
                <p className="text-sm text-blue-600">
                  You can view appointments as a doctor or as a patient
                </p>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 text-sm ${!viewAsDoctor ? 'font-medium' : ''}`}>
                  Patient
                </span>
                <button
                  onClick={toggleDoctorView}
                  className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: viewAsDoctor ? '#1E40AF' : '#9CA3AF',
                  }}
                  aria-pressed={viewAsDoctor}
                >
                  <span className="sr-only">
                    {viewAsDoctor ? 'View as patient' : 'View as doctor'}
                  </span>
                  <span
                    className={`
                      ${viewAsDoctor ? 'translate-x-6' : 'translate-x-1'}
                      inline-block w-4 h-4 transform bg-white rounded-full transition-transform
                    `}
                  />
                </button>
                <span className={`ml-2 text-sm ${viewAsDoctor ? 'font-medium' : ''}`}>
                  Doctor
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'upcoming'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveFilter('past')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'past'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setActiveFilter('cancelled')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'cancelled'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Cancelled
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            <p>{error}</p>
            <button 
              className="mt-2 text-blue-600 hover:underline"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No appointments found.</p>
            <p className="mt-2 text-gray-500">
              {activeFilter === 'upcoming' 
                ? "You don't have any upcoming appointments." 
                : activeFilter === 'past'
                ? "You don't have any past appointments."
                : activeFilter === 'cancelled'
                ? "You don't have any cancelled appointments."
                : "You don't have any appointments."}
            </p>
            {!viewAsDoctor && (
              <a href="/account/book-appointment" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Book an appointment
              </a>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {viewAsDoctor ? 'Patient' : 'Appointment'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital / Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {viewAsDoctor ? 'Type' : 'Doctor'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {viewAsDoctor ? 'Patient Name' : appointment.appointment_id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {viewAsDoctor ? `ID: ${appointment.appointment_id}` : appointment.chief_complaint}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.formatted_date}</div>
                      <div className="text-sm text-gray-500">{appointment.formatted_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.hospital_name}</div>
                      <div className="text-sm text-gray-500">{appointment.department_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {viewAsDoctor ? (
                        <>
                          <div className="text-sm text-gray-900">{appointment.formatted_appointment_type}</div>
                          <div className="text-sm text-gray-500">{appointment.formatted_priority}</div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-900">{appointment.doctor_full_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status_display}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a 
                        href={viewAsDoctor 
                          ? `/professional/appointments/${appointment.appointment_id}` 
                          : `/account/appointments/${appointment.appointment_id}`
                        } 
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountAppointmentsPage; 