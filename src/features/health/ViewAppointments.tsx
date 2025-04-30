import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

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
}

// Sample appointments for demonstration
const mockAppointments: AppointmentType[] = [
  {
    id: 'APP-123456',
    date: '2025-04-15',
    time: '09:30',
    duration: '20 min',
    type: 'in-person',
    provider: 'Dr. Sarah Johnson',
    speciality: 'General Practice',
    location: 'PHB Medical Center - North Wing',
    status: 'scheduled',
    reason: 'Annual check-up'
  },
  {
    id: 'APP-123457',
    date: '2025-04-22',
    time: '14:00',
    duration: '30 min',
    type: 'video',
    provider: 'Dr. Michael Chen',
    speciality: 'Dermatology',
    location: 'PHB Virtual Care',
    status: 'scheduled',
    reason: 'Skin condition follow-up'
  },
  {
    id: 'APP-123458',
    date: '2025-03-10',
    time: '11:15',
    duration: '15 min',
    type: 'phone',
    provider: 'Dr. Emily Rodriguez',
    speciality: 'Psychiatry',
    location: 'PHB Telehealth Services',
    status: 'completed',
    reason: 'Medication review'
  },
  {
    id: 'APP-123459',
    date: '2025-03-05',
    time: '16:30',
    duration: '45 min',
    type: 'in-person',
    provider: 'Dr. James Wilson',
    speciality: 'Cardiology',
    location: 'PHB Heart Center',
    status: 'completed',
    reason: 'Echocardiogram and consultation'
  },
  {
    id: 'APP-123460',
    date: '2025-02-28',
    time: '09:00',
    duration: '20 min',
    type: 'video',
    provider: 'Dr. Sarah Johnson',
    speciality: 'General Practice',
    location: 'PHB Virtual Care',
    status: 'cancelled',
    reason: 'Cold and flu symptoms'
  },
  {
    id: 'APP-123461',
    date: '2025-02-15',
    time: '13:45',
    duration: '30 min',
    type: 'in-person',
    provider: 'Dr. Robert Thompson',
    speciality: 'Orthopedics',
    location: 'PHB Medical Center - East Wing',
    status: 'missed',
    reason: 'Knee pain assessment'
  },
  {
    id: 'APP-123462',
    date: '2025-04-30',
    time: '10:15',
    duration: '20 min',
    type: 'phone',
    provider: 'Dr. Lisa Anderson',
    speciality: 'Neurology',
    location: 'PHB Telehealth Services',
    status: 'scheduled',
    reason: 'Headache consultation'
  }
];

const ViewAppointments: React.FC = () => {
  const [view, setView] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  // Filter appointments based on current view and search term
  const filteredAppointments = mockAppointments
    .filter(appointment => {
      // Filter by view type
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison

      if (view === 'upcoming') {
        return appointmentDate >= today && appointment.status === 'scheduled';
      }
      if (view === 'past') {
        return appointmentDate < today || appointment.status !== 'scheduled';
      }
      return true; // 'all' view
    })
    .filter(appointment => {
      // Filter by search term
      if (!searchTerm) return true;
      const searchTermLower = searchTerm.toLowerCase();
      return (
        appointment.provider.toLowerCase().includes(searchTermLower) ||
        appointment.speciality.toLowerCase().includes(searchTermLower) ||
        appointment.location.toLowerCase().includes(searchTermLower) ||
        appointment.reason?.toLowerCase().includes(searchTermLower) ||
        appointment.id.toLowerCase().includes(searchTermLower)
      );
    })
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatDateTime = (date: string, time: string) => {
    return `${formatDate(date)} at ${time}`;
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'in-person':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'phone':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        );
      case 'video':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      case 'missed': return 'Missed';
      case 'rescheduled': return 'Rescheduled';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'missed': return 'text-yellow-600 bg-yellow-50';
      case 'rescheduled': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleCancelAppointment = (appointment: AppointmentType) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleRescheduleAppointment = (appointment: AppointmentType) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const submitCancellation = () => {
    console.log('Cancellation submitted for:', selectedAppointment?.id, 'Reason:', cancelReason);

    // In a real app, this would be an API call
    // For now we'll just close the modal and show success message
    setShowCancelModal(false);
    setCancelSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setCancelSuccess(false), 3000);

    // Reset
    setCancelReason('');
    setSelectedAppointment(null);
  };

  const canCancelAppointment = (appointment: AppointmentType) => {
    // Only scheduled appointments can be cancelled
    if (appointment.status !== 'scheduled') return false;

    // Check if appointment is within 24 hours
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const timeDifference = appointmentDateTime.getTime() - now.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    // Can't cancel if less than 24 hours before appointment
    return hoursDifference > 24;
  };

  return (
    <AccountHealthLayout title="View Appointments">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Your Appointments</h2>

        {cancelSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-100 rounded-md">
            <p className="text-green-700">
              Your appointment has been successfully cancelled. You'll receive a confirmation email shortly.
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setView('upcoming')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                view === 'upcoming'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setView('past')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                view === 'past'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setView('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                view === 'all'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
          </div>

          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Link
            to="/account/appointments/book"
            className="inline-flex items-center bg-[#005eb8] text-white px-4 py-2 rounded hover:bg-[#004c93] transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Book New Appointment
          </Link>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-gray-500">
              {view === 'upcoming'
                ? 'You have no upcoming appointments scheduled.'
                : view === 'past'
                  ? 'You have no past appointments.'
                  : 'No appointments match your search criteria.'}
            </p>
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

                    <div className="flex flex-wrap gap-2">
                      {appointment.status === 'scheduled' && (
                        <>
                          <button
                            onClick={() => handleRescheduleAppointment(appointment)}
                            className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            Reschedule
                          </button>

                          <button
                            onClick={() => handleCancelAppointment(appointment)}
                            disabled={!canCancelAppointment(appointment)}
                            className={`px-3 py-1 text-sm rounded border ${
                              canCancelAppointment(appointment)
                                ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            } transition-colors`}
                          >
                            Cancel
                          </button>

                          {!canCancelAppointment(appointment) && appointment.status === 'scheduled' && (
                            <span className="text-xs text-gray-500 ml-2 self-center">
                              Cannot cancel within 24 hours
                            </span>
                          )}
                        </>
                      )}

                      {appointment.type === 'video' && appointment.status === 'scheduled' && (
                        <a
                          href="#join-video-call"
                          className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100 transition-colors"
                        >
                          Join Video Call
                        </a>
                      )}

                      {appointment.status === 'completed' && (
                        <Link
                          to={`/account/appointments/${appointment.id}/summary`}
                          className="px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded border border-purple-200 hover:bg-purple-100 transition-colors"
                        >
                          View Summary
                        </Link>
                      )}

                      <Link
                        to={`/account/appointments/${appointment.id}`}
                        className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancel Appointment Modal */}
        {showCancelModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-4">Cancel Appointment</h3>

              <div className="mb-4">
                <p className="text-gray-700">
                  Are you sure you want to cancel your appointment with {selectedAppointment.provider} on {formatDateTime(selectedAppointment.date, selectedAppointment.time)}?
                </p>
              </div>

              <div className="mb-4">
                <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for cancellation (optional)
                </label>
                <select
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a reason...</option>
                  <option value="schedule_conflict">Schedule conflict</option>
                  <option value="feeling_better">Feeling better</option>
                  <option value="found_alternative">Found alternative care</option>
                  <option value="transportation_issue">Transportation issue</option>
                  <option value="other">Other reason</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={submitCancellation}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-4">Reschedule Appointment</h3>

              <div className="mb-4">
                <p className="text-gray-700">
                  You're about to reschedule your appointment with {selectedAppointment.provider} on {formatDateTime(selectedAppointment.date, selectedAppointment.time)}.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-700">
                  To reschedule, we'll need to cancel your current appointment and help you book a new one.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <Link
                  to="/account/appointments/book"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book New Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountHealthLayout>
  );
};

export default ViewAppointments;
