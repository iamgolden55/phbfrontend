import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
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

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const [view] = useState<'upcoming'>('upcoming');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('Loading...');

  // Get only upcoming appointments for display
  const upcomingAppointments = mockAppointments
    .filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison
      return appointmentDate >= today && appointment.status === 'scheduled';
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // Show only the next 3 upcoming appointments

  useEffect(() => {
    // Set debug info after component mounts
    const userStr = localStorage.getItem('phb_user');
    const isUserAuth = !!user;

    setDebugInfo(`
      User authenticated: ${isUserAuth}
      User from localStorage: ${userStr ? 'yes' : 'no'}
      Number of appointments: ${upcomingAppointments.length}
    `);
  }, [user, upcomingAppointments.length]);

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

  // For debugging purposes - show the coming soon message if button is clicked
  const toggleComingSoon = () => {
    setShowComingSoon(!showComingSoon);
  };

  return (
    <AccountHealthLayout title="Appointments">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Your Appointments</h2>

        {/* Debug section */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">Debug Information</h3>
          <pre className="text-sm whitespace-pre-wrap">{debugInfo}</pre>
          <button
            onClick={toggleComingSoon}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {showComingSoon ? "Show Real Appointments" : "Show Coming Soon"}
          </button>
        </div>

        <div className="mb-6">
          <p>
            Book and manage appointments with your GP, nurse, or other healthcare professionals. You can view your upcoming and past appointments, reschedule or cancel appointments as needed.
          </p>
        </div>

        {/* Coming Soon message - only shown if toggle is on */}
        {showComingSoon ? (
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-blue-800">Coming Soon</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>We're currently developing the appointments feature. You'll soon be able to book and manage appointments online.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Upcoming Appointments Section */
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Upcoming Appointments</h3>
              <Link
                to="/account/appointments/view"
                className="text-[#005eb8] hover:text-[#003f7e] font-medium text-sm"
              >
                View all appointments →
              </Link>
            </div>

            {upcomingAppointments.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming appointments</h3>
                <p className="mt-1 text-gray-500">You don't have any appointments scheduled at the moment.</p>
                <div className="mt-4">
                  <Link
                    to="/account/appointments/book"
                    className="inline-flex items-center bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#004c93] transition-colors"
                  >
                    Book an appointment
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getAppointmentTypeIcon(appointment.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-gray-900">{appointment.provider}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusLabel(appointment.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{appointment.speciality}</p>
                        <p className="mt-1 text-gray-800">{formatDateTime(appointment.date, appointment.time)}</p>
                        <p className="text-sm text-gray-600">{appointment.location}</p>
                        <div className="mt-3 flex gap-2">
                          <Link
                            to={`/account/appointments/${appointment.id}`}
                            className="text-sm text-[#005eb8] hover:text-[#003f7e] font-medium"
                          >
                            View details
                          </Link>
                          <span className="text-gray-300">|</span>
                          {appointment.type === 'video' && (
                            <>
                              <a
                                href="#join-video-call"
                                className="text-sm text-green-600 hover:text-green-700 font-medium"
                              >
                                Join video call
                              </a>
                              <span className="text-gray-300">|</span>
                            </>
                          )}
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Book an appointment</h3>
            <p className="mb-4">
              Book an appointment with your GP, nurse, or other healthcare professionals. We'll match you with the right provider based on your needs.
            </p>
            <Link
              to="/account/appointments/book"
              className="inline-block bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] transition-colors"
            >
              Book now
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">View your appointments</h3>
            <p className="mb-4">
              View your upcoming and past appointments, and manage your schedule. You can reschedule or cancel appointments as needed.
            </p>
            <Link
              to="/account/appointments/view"
              className="inline-block bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] transition-colors"
            >
              View appointments
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Need help with appointments?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/help/appointments/how-to-book"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#005eb8] mb-2">How to book</h4>
              <p className="text-sm text-gray-600">Learn how to book appointments online with your GP practice.</p>
            </Link>

            <Link
              to="/help/appointments/managing"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#005eb8] mb-2">Managing appointments</h4>
              <p className="text-sm text-gray-600">Information about rescheduling or cancelling appointments.</p>
            </Link>

            <Link
              to="/help/appointments/types"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#005eb8] mb-2">Appointment types</h4>
              <p className="text-sm text-gray-600">Find out about different types of appointments available.</p>
            </Link>
          </div>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default Appointments;
