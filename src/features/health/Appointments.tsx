import React from 'react';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import { useAppointments } from './useAppointments';

const Appointments: React.FC = () => {
  const { appointments, loading, error } = useAppointments('upcoming');
  const summaryAppointments = appointments.slice(0, 3);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  const formatDateTime = (date: string, time: string) => `${formatDate(date)} at ${time}`;

  return (
    <AccountHealthLayout title="Appointments">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Your Appointments</h2>
        <div className="mb-6">
          <p>
            Book and manage appointments with your GP, nurse, or other healthcare professionals. You can view your upcoming and past appointments, reschedule or cancel appointments as needed.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Upcoming Appointments</h3>
            <Link
              to="/account/appointments/view"
              className="text-[#0891b2] hover:text-[#0e7490] font-medium text-sm"
            >
              View all appointments →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-700 text-center">{error}</div>
          ) : summaryAppointments.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming appointments</h3>
              <p className="mt-1 text-gray-500">To view or book appointments, use the links below.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {summaryAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="font-bold text-gray-900">{appointment.provider}</div>
                      <div className="text-sm text-gray-600">{appointment.speciality}</div>
                      <div className="text-gray-800">{formatDateTime(appointment.date, appointment.time)}</div>
                      <div className="text-sm text-gray-600">{appointment.location}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <Link
                        to={`/account/appointments/${appointment.id}`}
                        className="text-sm text-[#0891b2] hover:text-[#0e7490] font-medium"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Book an appointment</h3>
            <p className="mb-4">
              Book an appointment with your GP, nurse, or other healthcare professionals. We'll match you with the right provider based on your needs.
            </p>
            <Link
              to="/account/appointments/book"
              className="inline-block bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] transition-colors"
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
              className="inline-block bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] transition-colors"
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
              <h4 className="font-bold text-[#0891b2] mb-2">How to book</h4>
              <p className="text-sm text-gray-600">Learn how to book appointments online with your GP practice.</p>
            </Link>
            <Link
              to="/help/appointments/managing"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#0891b2] mb-2">Managing appointments</h4>
              <p className="text-sm text-gray-600">Information about rescheduling or cancelling appointments.</p>
            </Link>
            <Link
              to="/help/appointments/types"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#0891b2] mb-2">Appointment types</h4>
              <p className="text-sm text-gray-600">Find out about different types of appointments available.</p>
            </Link>
          </div>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default Appointments;
