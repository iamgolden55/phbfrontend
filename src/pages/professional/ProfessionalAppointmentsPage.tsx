import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointments } from '../../features/professional/appointmentsService';
import { useAuth } from '../../features/auth/authContext';

// Define appointment type based on the API response
interface Appointment {
  id: number;
  appointment_id: string;
  doctor_full_name: string;
  patient_name: string;
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
  // Add patient information
  patient?: {
    id: number;
    name: string;
    age?: number;
    gender?: string;
  };
}

const ProfessionalAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('upcoming');
  const { user } = useAuth();

  // Fetch appointments on component mount
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointments();
        console.log('Appointments data:', data);
        setAppointments(data);
      } catch (err: any) {
        console.error('Failed to load doctor appointments:', err);
        setError(err.message || 'Failed to load doctor appointments');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, []);

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

  // Handle status change
  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    // Implementation will be added later
    console.log(`Changing status of appointment ${appointmentId} to ${newStatus}`);
  };

  return (
    <div>
      <Helmet>
        <title>My Appointments | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>
        <p className="mt-2 text-gray-600">
          Manage appointments for Dr. {user?.full_name}
        </p>
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
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital / Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
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
                        {appointment.patient_name || appointment.patient?.name || "Patient Name"}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {appointment.appointment_id}
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
                      <div className="text-sm text-gray-900">{appointment.formatted_appointment_type}</div>
                      <div className="text-sm text-gray-500">{appointment.formatted_priority}</div>
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
                        href={`/professional/appointments/${appointment.appointment_id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </a>
                      
                      {appointment.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(appointment.appointment_id, 'confirmed')}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => handleStatusChange(appointment.appointment_id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <button 
                          onClick={() => handleStatusChange(appointment.appointment_id, 'completed')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Complete
                        </button>
                      )}
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

export default ProfessionalAppointmentsPage; 