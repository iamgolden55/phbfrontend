import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import { createApiUrl } from '../../utils/config';
import { useAuth } from '../auth/authContext';
import { useAppointments } from './useAppointments';

interface AppointmentType {
  id: string;
  date: string;
  time: string;
  duration: string;
  type: 'in-person' | 'phone' | 'video';
  provider: string;
  speciality: string;
  location: string;
  status: 'scheduled' | 'cancelled' | 'completed' | 'missed' | 'rescheduled';
  reason?: string;
  formatted_date_time?: string; // For API response
  doctor_full_name?: string; // For API response
}

// API base URL from environment or fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.phb.health';

// This component shows appointments for the logged-in user as a patient, not as a doctor
const ViewAppointments: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [view, setView] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  
  // Use the shared hook - this will only show patient appointments, not doctor appointments
  const { appointments, loading, error } = useAppointments(view);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatDateTime = (date: string, time: string) => {
    return `${formatDate(date)} at ${time}`;
  };

  // Get icon for appointment type
  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'in-person':
        return (
          <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Get status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'missed':
        return 'bg-orange-100 text-orange-800';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status label 
  const getStatusLabel = (status: string) => {
    // Capitalize first letter
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Handle cancel appointment
  const handleCancelClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  // Handle submitting cancellation
  const handleCancelSubmit = async () => {
    if (!selectedAppointment) return;

    try {
      // Hard-coded success for now
      setTimeout(() => {
        setCancelSuccess(true);
        setTimeout(() => {
          setShowCancelModal(false);
          setCancelSuccess(false);
          // Would normally refresh appointments here
        }, 1500);
      }, 1000);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  // Handle reschedule click
  const handleRescheduleClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  // Close modals
  const handleCloseModals = () => {
    setShowCancelModal(false);
    setShowRescheduleModal(false);
    setCancelSuccess(false);
    setCancelReason('');
  };

  // Handle add to calendar
  const handleAddToCalendar = (appointmentId: string) => {
    window.open(createApiUrl(`api/appointments/${appointmentId}/calendar/`), '_blank');
  };

  // Filter appointments based on search term
  const filteredAppointments = appointments
    .filter(appointment => {
      if (!searchTerm) return true;
      const searchTermLower = searchTerm.toLowerCase();
      return (
        appointment.provider.toLowerCase().includes(searchTermLower) ||
        appointment.speciality.toLowerCase().includes(searchTermLower) ||
        appointment.location.toLowerCase().includes(searchTermLower) ||
        appointment.reason?.toLowerCase().includes(searchTermLower) ||
        appointment.id.toLowerCase().includes(searchTermLower)
      );
    });

  return (
    <AccountHealthLayout title="Your Appointments">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            Your Appointments
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            View and manage your appointments with healthcare professionals
          </p>
        </div>

        <div className="border-b border-gray-200">
          <div className="px-4 py-4 sm:px-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setView('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'past'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setView('past')}
              >
                Past
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setView('all')}
              >
                All
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search appointments..."
                className="border border-gray-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-3 text-gray-600">Loading your appointments...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-md p-6 text-center">
              <svg className="h-12 w-12 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-3 text-red-800">{error}</p>
              <button
                className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <svg className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-3 text-lg font-medium text-gray-900">No appointments found</h3>
              {searchTerm ? (
                <p className="mt-1 text-gray-500">No appointments match your search criteria.</p>
              ) : (
                <p className="mt-1 text-gray-500">
                  {view === 'upcoming'
                    ? "You don't have any upcoming appointments."
                    : view === 'past'
                    ? "You don't have any past appointments."
                    : "You don't have any appointments."}
                </p>
              )}
              <div className="mt-6">
                <Link
                  to="/account/appointments/book"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Book New Appointment
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-16 flex justify-center">
                      {getAppointmentTypeIcon(appointment.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{appointment.provider}</h3>
                          <p className="text-sm text-gray-600">{appointment.speciality}</p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusLabel(appointment.status)}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-800 font-medium">{formatDateTime(appointment.date, appointment.time)} ({appointment.duration})</p>
                        <p className="text-gray-600">{appointment.location}</p>
                        {appointment.reason && <p className="text-gray-600 mt-1">Reason: {appointment.reason}</p>}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Link
                          to={`/account/appointments/${appointment.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm"
                        >
                          View Details
                        </Link>

                        {appointment.status === 'scheduled' && new Date(appointment.date) > new Date() && (
                          <>
                            <button
                              onClick={() => handleRescheduleClick(appointment)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleCancelClick(appointment)}
                              className="inline-flex items-center px-3 py-1.5 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleAddToCalendar(appointment.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                        >
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Appointment</h3>
                    {cancelSuccess ? (
                      <div className="mt-4 text-green-600">
                        Appointment successfully cancelled!
                      </div>
                    ) : (
                      <>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to cancel your appointment with {selectedAppointment?.provider} on {formatDate(selectedAppointment?.date)} at {selectedAppointment?.time}?
                          </p>
                        </div>
                        <div className="mt-4">
                          <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700">
                            Reason for cancellation (optional)
                          </label>
                          <textarea
                            id="cancelReason"
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                          ></textarea>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {cancelSuccess ? (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCloseModals}
                  >
                    Close
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleCancelSubmit}
                    >
                      Cancel Appointment
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleCloseModals}
                    >
                      Keep Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Reschedule Appointment</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        To reschedule your appointment with {selectedAppointment?.provider}, please use the Book Appointment page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Link
                  to="/account/appointments/book"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModals}
                >
                  Book New Appointment
                </Link>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModals}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AccountHealthLayout>
  );
};

export default ViewAppointments;
