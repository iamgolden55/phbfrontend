import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { PatientProvider } from '../../features/professional/patients/patientContext';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';
import { fetchDoctorAppointments } from '../../features/professional/appointmentsService';

const PatientManagementPage: React.FC = () => {
  const { professionalUser } = useProfessionalAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Trying to call the fetchDoctorAppointments function")
      const data = await fetchDoctorAppointments();
      console.log("Data received:", data)
      setAppointments(data.my_appointments?.all || []);
    } catch (err) {
      console.error('Failed to load appointments:', err);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  if (!professionalUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Not Authenticated</h2>
        <p className="text-gray-600">Please <a href="/professional/login" className="text-blue-600 hover:underline">log in</a> to access patient management.</p>
      </div>
    );
  }

  return (
    <PatientProvider>
      <div className="max-w-8xl mx-auto px-4 py-8">
        <Helmet>
          <title>Patient Management | PHB Professional</title>
        </Helmet>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>
        </div>

        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            {loading ? (
              <div className="text-center py-8">Loading appointments...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chief Complaint</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment.appointment_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.patient_name || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.chief_complaint}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              appointment.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {appointment.status_display}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.formatted_date_time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => navigate(`/professional/appointments/${appointment.appointment_id}`)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {appointments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No appointments found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PatientProvider>
  );
};

export default PatientManagementPage;
