import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

interface SelectedSymptom {
  bodyPartId: string;
  bodyPartName: string;
  symptomName: string;
  description: string;
}

interface AppointmentDetails {
  appointmentId: string;
  preferredLanguage: string;
  urgency: string;
  selectedSymptoms: SelectedSymptom[];
  additionalNotes: string;
  departmentName: string;
  location: string;
  dateConfirmed: string;
  timeConfirmed: string;
}

const AppointmentConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { appointmentDetails: AppointmentDetails } | undefined;
  
  if (!state || !state.appointmentDetails) {
    // Redirect if there are no appointment details
    React.useEffect(() => {
      navigate('/account/appointments');
    }, [navigate]);
    
    return null;
  }
  
  const { appointmentDetails } = state;
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  
  // Add to calendar function
  const addToCalendar = () => {
    // Create calendar event - would be implemented with actual calendar API
    // For now just a stub function
    alert('Calendar integration would be implemented here.');
  };
  
  return (
    <AccountHealthLayout title="Appointment Confirmed">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="bg-green-50 p-4 rounded-md mb-6 flex items-center">
          <div className="bg-green-100 rounded-full p-2 mr-3">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-800">Appointment Successfully Booked</h2>
            <p className="text-green-700">
              Your appointment has been confirmed. A confirmation has been sent to your email.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>
        
        <div className="bg-gray-50 p-6 rounded-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Appointment Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Appointment ID</p>
                  <p className="font-medium">{appointmentDetails.appointmentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {formatDate(appointmentDetails.dateConfirmed)} at {appointmentDetails.timeConfirmed}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{appointmentDetails.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Urgency Level</p>
                  <p className="font-medium capitalize">{appointmentDetails.urgency}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Department Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{appointmentDetails.departmentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assignment</p>
                  <p className="font-medium">First available healthcare provider</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-medium">{appointmentDetails.preferredLanguage}</p>
                </div>
              </div>
            </div>
          </div>
          
          {appointmentDetails.selectedSymptoms && appointmentDetails.selectedSymptoms.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Reported Symptoms</p>
              <div className="space-y-3">
                {appointmentDetails.selectedSymptoms.map((symptom, index) => (
                  <div key={index} className="p-3 bg-white border border-gray-200 rounded-md">
                    <p className="font-medium">{symptom.bodyPartName} - {symptom.symptomName}</p>
                    <p className="text-gray-600 mt-1">{symptom.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {appointmentDetails.additionalNotes && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-1">Additional Notes</p>
              <p>{appointmentDetails.additionalNotes}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button 
            onClick={addToCalendar}
            className="flex items-center justify-center px-4 py-2 border border-[#005eb8] text-[#005eb8] rounded-md hover:bg-blue-50 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Add to Calendar
          </button>
          
          <Link
            to="/account/appointments"
            className="flex items-center justify-center px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#004c93] transition-colors"
          >
            View All Appointments
          </Link>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h3 className="font-bold text-blue-800 mb-2">What to expect next</h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-700">
            <li>You'll receive a confirmation email with these appointment details.</li>
            <li>We'll send you a reminder 24 hours before your appointment.</li>
            <li>For video appointments, you'll receive a link to join the call 15 minutes before the scheduled time.</li>
            <li>The healthcare provider from the department will be assigned to your appointment.</li>
            <li>If you need to reschedule or cancel, please do so at least 24 hours in advance.</li>
          </ul>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold mb-4">Need help?</h3>
          <p className="mb-4">
            If you have any questions about your appointment or need assistance, please contact our support team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/help/appointments/preparing"
              className="text-[#005eb8] hover:underline"
            >
              How to prepare for your appointment
            </Link>
            <Link
              to="/help/appointments/cancel-change"
              className="text-[#005eb8] hover:underline"
            >
              How to cancel or change your appointment
            </Link>
          </div>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default AppointmentConfirmation; 