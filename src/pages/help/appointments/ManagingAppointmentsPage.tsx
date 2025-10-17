import React from 'react';
import { Link } from 'react-router-dom';

const ManagingAppointmentsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/help" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Help
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/help/appointments" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Appointments
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">Managing appointments</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Managing your appointments</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              You can view, cancel, or reschedule your appointments anytime through your PHB account.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Viewing your appointments</h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">How to view your appointments</h3>
            <ol className="relative border-l border-gray-200 ml-3 space-y-6">
              <li className="mb-4 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="text-blue-600 font-bold">1</span>
                </span>
                <h4 className="font-medium mb-1">Sign in to your PHB account</h4>
                <p className="text-gray-600">
                  Log in using your username and password to access your account dashboard
                </p>
              </li>

              <li className="mb-4 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="text-blue-600 font-bold">2</span>
                </span>
                <h4 className="font-medium mb-1">Go to 'My Appointments'</h4>
                <p className="text-gray-600 mb-2">
                  Navigate to the appointments section from your account menu
                </p>
                <Link to="/account/appointments" className="text-blue-600 hover:underline inline-flex items-center">
                  <span>View my appointments</span>
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </li>

              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="text-blue-600 font-bold">3</span>
                </span>
                <h4 className="font-medium mb-1">Review your appointments</h4>
                <p className="text-gray-600">
                  You'll see a list of all upcoming and past appointments with details including:
                </p>
                <ul className="list-disc ml-6 mt-2 text-gray-600">
                  <li>Date and time</li>
                  <li>Healthcare professional name</li>
                  <li>Appointment type (video, phone, in-person)</li>
                  <li>Location (for in-person appointments)</li>
                  <li>Appointment status</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cancelling an appointment</h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  Please cancel at least 24 hours before your appointment to avoid being charged a cancellation fee and to allow other patients to use the slot.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-3">Steps to cancel</h3>
          <ol className="list-decimal ml-6 space-y-3 text-gray-600 mb-6">
            <li>Navigate to 'My Appointments' in your PHB account</li>
            <li>Find the appointment you wish to cancel</li>
            <li>Click the 'Cancel Appointment' button</li>
            <li>Confirm the cancellation when prompted</li>
            <li>You'll receive a confirmation email</li>
          </ol>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Cancellation policy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4 bg-green-50">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="ml-3">
                    <h4 className="font-medium">More than 24 hours notice</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Free cancellation. No charges apply.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-red-50">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div className="ml-3">
                    <h4 className="font-medium">Less than 24 hours notice</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      May incur a cancellation fee. Emergency exceptions may apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Rescheduling an appointment</h2>

          <p className="text-gray-600 mb-4">
            Need to change your appointment time? You can easily reschedule without having to cancel and rebook.
          </p>

          <h3 className="text-lg font-medium mb-3">How to reschedule</h3>
          <ol className="list-decimal ml-6 space-y-3 text-gray-600 mb-6">
            <li>Go to 'My Appointments' in your account</li>
            <li>Select the appointment you want to reschedule</li>
            <li>Click 'Reschedule Appointment'</li>
            <li>Choose a new date and time from the available slots</li>
            <li>Confirm your new appointment time</li>
            <li>You'll receive updated confirmation details</li>
          </ol>

          <div className="bg-gray-50 border rounded-md p-4">
            <h4 className="font-medium mb-2">Rescheduling limitations</h4>
            <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
              <li>Same cancellation policy applies (24-hour notice recommended)</li>
              <li>Rescheduling depends on availability of your healthcare professional</li>
              <li>Emergency appointments may have limited rescheduling options</li>
              <li>Multiple reschedules may require rebooking instead</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Appointment reminders</h2>

          <p className="text-gray-600 mb-4">
            We'll help you remember your appointments with automatic reminders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded-md p-4 text-center">
              <svg className="h-8 w-8 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h4 className="font-medium mb-1">Email reminder</h4>
              <p className="text-sm text-gray-600">24 hours before</p>
            </div>

            <div className="border rounded-md p-4 text-center">
              <svg className="h-8 w-8 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h4 className="font-medium mb-1">SMS reminder</h4>
              <p className="text-sm text-gray-600">2 hours before</p>
            </div>

            <div className="border rounded-md p-4 text-center">
              <svg className="h-8 w-8 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h4 className="font-medium mb-1">Calendar invite</h4>
              <p className="text-sm text-gray-600">Add to your calendar</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-sm text-blue-800">
              You can manage your reminder preferences in your account settings under 'Contact Preferences'.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">What if I miss my appointment?</h2>

          <p className="text-gray-600 mb-4">
            If you miss an appointment without cancelling, this is called a 'Did Not Attend' (DNA).
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <h4 className="font-medium text-red-800 mb-2">Consequences of missed appointments</h4>
            <ul className="list-disc ml-6 text-sm text-red-700 space-y-1">
              <li>May be charged a missed appointment fee</li>
              <li>Multiple DNAs may affect your ability to book future appointments</li>
              <li>Takes up a slot that another patient could have used</li>
              <li>May require additional documentation for future bookings</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h4 className="font-medium text-green-800 mb-2">What to do if you miss an appointment</h4>
            <ul className="list-disc ml-6 text-sm text-green-700 space-y-1">
              <li>Contact your healthcare provider as soon as possible</li>
              <li>Explain the reason for missing the appointment</li>
              <li>Rebook at the earliest available time</li>
              <li>Set up appointment reminders to avoid future missed appointments</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related help guides</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/appointments/how-to-book" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to book an appointment
            </Link>
          </li>
          <li>
            <Link to="/help/appointments/types" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Appointment types explained
            </Link>
          </li>
          <li>
            <Link to="/help/appointments/prepare" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to prepare for your appointment
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManagingAppointmentsPage;
