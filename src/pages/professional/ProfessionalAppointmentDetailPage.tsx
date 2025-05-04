import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointmentDetails } from '../../features/professional/appointmentsService';

const ProfessionalAppointmentDetailPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      if (!appointmentId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointmentDetails(appointmentId);
        setAppointmentDetails(data);
      } catch (err: any) {
        console.error('Failed to load appointment details:', err);
        setError(err.message || 'Failed to load appointment details');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointmentDetails();
  }, [appointmentId]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading appointment details...</p>
      </div>
    );
  }

  if (error) {
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

  // Destructure appointment details for easier access
  const { appointment_details, patient_details, important_notes, payment_info } = appointmentDetails;

  return (
    <div>
      <Helmet>
        <title>Appointment {appointmentId} | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Appointment Details</h1>
        <p className="mt-2 text-gray-600">
          Appointment ID: {appointmentId}
        </p>
      </div>
      
      {/* Appointment Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-base font-medium">{appointment_details?.formatted_date_time}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base font-medium">{appointment_details?.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hospital</p>
            <p className="text-base font-medium">{appointment_details?.hospital}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-base font-medium">{appointment_details?.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-base font-medium">{appointment_details?.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="text-base font-medium">{appointment_details?.priority}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-base font-medium">{appointment_details?.duration}</p>
          </div>
        </div>
      </div>
      
      {/* Patient Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Patient Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Patient Name</p>
            <p className="text-base font-medium">{patient_details?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Chief Complaint</p>
            <p className="text-base font-medium">{patient_details?.chief_complaint}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Symptoms</p>
            <p className="text-base font-medium">{patient_details?.symptoms || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Medical History</p>
            <p className="text-base font-medium">{patient_details?.medical_history || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Allergies</p>
            <p className="text-base font-medium">{patient_details?.allergies || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Medications</p>
            <p className="text-base font-medium">{patient_details?.current_medications || 'None'}</p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
          Confirm Appointment
        </button>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
          Cancel Appointment
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          Reschedule Appointment
        </button>
        <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
          Add Notes
        </button>
      </div>
      
      {/* Important Notes */}
      {important_notes && important_notes.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Important Notes</h2>
          <ul className="list-disc pl-5 space-y-2">
            {important_notes.map((note: string, index: number) => (
              <li key={index} className="text-gray-700">{note}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Payment Information */}
      {payment_info && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="text-base font-medium capitalize">{payment_info.payment_status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Required</p>
              <p className="text-base font-medium">{payment_info.payment_required ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurance Based</p>
              <p className="text-base font-medium">{payment_info.is_insurance_based ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalAppointmentDetailPage; 