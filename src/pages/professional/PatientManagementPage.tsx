import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { PatientProvider } from '../../features/professional/patients/patientContext';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';
import { fetchDoctorAppointments, fetchDoctorAppointmentDetails } from '../../features/professional/appointmentsService';

interface Appointment {
  appointment_id: string;
  patient_name?: string;
  patient?: {
    first_name: string;
    last_name: string;
  };
  chief_complaint: string;
  status: string;
  status_display: string;
  formatted_date_time: string;
  details?: {
    patient_name: string;
    patient_dob?: string;
    patient_gender?: string;
  };
}

interface FilterState {
  patientName: string;
  chiefComplaint: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
}

const PatientManagementPage: React.FC = () => {
  const { professionalUser } = useProfessionalAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    patientName: '',
    chiefComplaint: '',
    status: '',
    dateRange: { start: '', end: '' }
  });

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesPatient = !filters.patientName || 
        (appointment.details?.patient_name?.toLowerCase().includes(filters.patientName.toLowerCase()) ||
         appointment.patient_name?.toLowerCase().includes(filters.patientName.toLowerCase()));
      
      const matchesComplaint = !filters.chiefComplaint || 
        appointment.chief_complaint?.toLowerCase().includes(filters.chiefComplaint.toLowerCase());
      
      const matchesStatus = !filters.status || 
        appointment.status === filters.status;
      
      const matchesDate = !filters.dateRange.start || !filters.dateRange.end || 
        (new Date(appointment.formatted_date_time) >= new Date(filters.dateRange.start) &&
         new Date(appointment.formatted_date_time) <= new Date(filters.dateRange.end));
      
      return matchesPatient && matchesComplaint && matchesStatus && matchesDate;
    });
  }, [appointments, filters]);

  const loadAppointmentDetails = async (appointmentId: string) => {
    setDetailsLoading(prev => ({ ...prev, [appointmentId]: true }));
    try {
      const details = await fetchDoctorAppointmentDetails(appointmentId);
      setAppointments(prev => prev.map(appt => 
        appt.appointment_id === appointmentId 
          ? { ...appt, details } 
          : appt
      ));
    } catch (err) {
      console.error(`Failed to load details for appointment ${appointmentId}:`, err);
    } finally {
      setDetailsLoading(prev => ({ ...prev, [appointmentId]: false }));
    }
  };

  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDoctorAppointments();
      const initialAppointments = data.my_appointments?.all || [];
      setAppointments(initialAppointments);
      
      // Load details for all appointments in parallel
      await Promise.all(
        initialAppointments.map(appt => loadAppointmentDetails(appt.appointment_id))
      );
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
          <title>Patient Management | PHforB Professional</title>
        </Helmet>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">My Patients</h1>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by name"
                value={filters.patientName}
                onChange={(e) => setFilters({...filters, patientName: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaint</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by complaint"
                value={filters.chiefComplaint}
                onChange={(e) => setFilters({...filters, chiefComplaint: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, start: e.target.value}})}
                />
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, end: e.target.value}})}
                />
              </div>
            </div>
          </div>
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
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.appointment_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {detailsLoading[appointment.appointment_id] ? (
                              <span className="text-gray-400">Loading...</span>
                            ) : (
                              appointment.details?.patient_name || 
                              appointment.patient_name || 
                              (appointment.patient?.first_name + ' ' + appointment.patient?.last_name) || 
                              'N/A'
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {appointment.chief_complaint}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              appointment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 
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
                            disabled={detailsLoading[appointment.appointment_id]}
                          >
                            View
                            {detailsLoading[appointment.appointment_id] && (
                              <span className="ml-2">...</span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAppointments.length === 0 && (
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