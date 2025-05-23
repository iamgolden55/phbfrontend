import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointmentDetails, updateAppointmentStatus } from '../../features/professional/appointmentsService';

const ProfessionalAppointmentReschedulePage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');
  const navigate = useNavigate();

  // Load appointment details
  useEffect(() => {
    const loadAppointmentDetails = async () => {
      if (!appointmentId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointmentDetails(appointmentId);
        setAppointmentDetails(data);
        
        // Set default date and time (add 1 day to current appointment date)
        if (data.appointment_details && data.appointment_details.appointment_date) {
          const currentDate = new Date(data.appointment_details.appointment_date);
          currentDate.setDate(currentDate.getDate() + 1);
          
          // Format date for date input (YYYY-MM-DD)
          const formattedDate = currentDate.toISOString().split('T')[0];
          setNewDate(formattedDate);
          
          // Set default time (same as current appointment time)
          if (data.appointment_details.formatted_time) {
            // Convert time format if needed (e.g., "2:30 PM" to "14:30")
            const timeParts = data.appointment_details.formatted_time.match(/(\d+):(\d+) ([AP]M)/);
            if (timeParts) {
              let hours = parseInt(timeParts[1], 10);
              const minutes = timeParts[2];
              const ampm = timeParts[3];
              
              if (ampm === 'PM' && hours < 12) hours += 12;
              if (ampm === 'AM' && hours === 12) hours = 0;
              
              const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
              setNewTime(formattedTime);
            }
          }
        }
      } catch (err: any) {
        console.error('Failed to load appointment details:', err);
        setError(err.message || 'Failed to load appointment details');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointmentDetails();
  }, [appointmentId]);

  // Handle back button click
  const handleBack = () => {
    navigate(`/professional/appointments/${appointmentId}`);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appointmentId || !newDate || !newTime) {
      setError('Please select a new date and time');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // For demonstration, we're just setting the status to 'rescheduled'
      // In a real app, you would call an API to update the appointment date and time
      await updateAppointmentStatus(appointmentId, 'rescheduled', 
        `Rescheduled to ${newDate} at ${newTime}`);
      
      setSuccess('Appointment rescheduled successfully');
      
      // Redirect back to appointment details after 2 seconds
      setTimeout(() => {
        navigate(`/professional/appointments/${appointmentId}`);
      }, 2000);
    } catch (err: any) {
      console.error('Failed to reschedule appointment:', err);
      setError(err.message || 'Failed to reschedule appointment');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !appointmentDetails) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading appointment details...</p>
      </div>
    );
  }

  if (error && !appointmentDetails) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button 
          className="mt-2 text-blue-600 hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (!appointmentDetails) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Appointment not found</p>
        <a 
          href="/professional/appointments" 
          className="mt-2 text-blue-600 hover:underline"
        >
          Back to appointments
        </a>
      </div>
    );
  }

  const { appointment_details, patient_details } = appointmentDetails;

  return (
    <div>
      <Helmet>
        <title>Reschedule Appointment | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Reschedule Appointment</h1>
          <p className="mt-2 text-gray-600">
            Appointment ID: {appointmentId}
          </p>
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Appointment Details
        </button>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Patient</p>
            <p className="text-base font-medium">
              {patient_details?.name || appointmentDetails?.patient?.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Date & Time</p>
            <p className="text-base font-medium">
              {appointment_details?.formatted_date} at {appointment_details?.formatted_time}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hospital</p>
            <p className="text-base font-medium">{appointment_details?.hospital_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-base font-medium">{appointment_details?.department_name}</p>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-blue-800 mb-4">Reschedule to:</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="newDate" className="block text-sm font-medium text-gray-700 mb-1">
                New Date
              </label>
              <input
                type="date"
                id="newDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="newTime" className="block text-sm font-medium text-gray-700 mb-1">
                New Time
              </label>
              <input
                type="time"
                id="newTime"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleBack}
              className="mr-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Reschedule Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessionalAppointmentReschedulePage; 