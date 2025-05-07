import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchDoctorAppointmentDetails, updateAppointmentStatus } from '../../features/professional/appointmentsService';

const ProfessionalAppointmentDetailPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      if (!appointmentId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDoctorAppointmentDetails(appointmentId);
        console.log('Appointment details:', data);
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

  const handleConfirmAppointment = async () => {
    if (!appointmentId) return;
    
    setActionLoading('confirm');
    try {
      const updatedAppointment = await updateAppointmentStatus(appointmentId, 'confirmed');
      setAppointmentDetails(updatedAppointment);
      alert('Appointment confirmed successfully!');
    } catch (err: any) {
      console.error('Failed to confirm appointment:', err);
      alert(`Error: ${err.message || 'Failed to confirm appointment'}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelAppointment = async () => {
    if (!appointmentId) return;
    
    const reason = prompt('Please provide a reason for cancellation:');
    if (reason === null) return; // User clicked cancel on prompt
    
    setActionLoading('cancel');
    try {
      const updatedAppointment = await updateAppointmentStatus(appointmentId, 'cancelled', reason);
      setAppointmentDetails(updatedAppointment);
      alert('Appointment cancelled successfully!');
      // Redirect back to appointments list after cancellation
      navigate('/professional/appointments');
    } catch (err: any) {
      console.error('Failed to cancel appointment:', err);
      alert(`Error: ${err.message || 'Failed to cancel appointment'}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRescheduleAppointment = () => {
    // For simplicity, we'll just navigate to a hypothetical reschedule page
    // In a real app, this would open a modal or navigate to a form
    alert('Reschedule functionality would be implemented here.');
    // navigate(`/professional/appointments/${appointmentId}/reschedule`);
  };

  const handleAddNotes = () => {
    setShowNotesModal(true);
  };

  const handleSaveNotes = async () => {
    if (!appointmentId || !notes.trim()) {
      setShowNotesModal(false);
      return;
    }
    
    setActionLoading('notes');
    try {
      // This assumes your API supports adding notes via the update status endpoint
      // You might need a separate endpoint for notes
      const updatedAppointment = await updateAppointmentStatus(
        appointmentId, 
        appointmentDetails.status, 
        notes
      );
      setAppointmentDetails(updatedAppointment);
      setShowNotesModal(false);
      setNotes('');
      alert('Notes added successfully!');
    } catch (err: any) {
      console.error('Failed to add notes:', err);
      alert(`Error: ${err.message || 'Failed to add notes'}`);
    } finally {
      setActionLoading(null);
    }
  };

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

  return (
    <div>
      <Helmet>
        <title>Appointment {appointmentId} | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Appointment Details</h1>
        <p className="mt-2 text-gray-600">
          Appointment ID: {appointmentDetails.appointment_id}
        </p>
      </div>
      
      {/* Appointment Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Appointment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-base font-medium">{appointmentDetails.formatted_date_time || `${appointmentDetails.formatted_date} at ${appointmentDetails.formatted_time}`}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base font-medium">{appointmentDetails.status_display || appointmentDetails.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hospital</p>
            <p className="text-base font-medium">{appointmentDetails.hospital_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-base font-medium">{appointmentDetails.department_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-base font-medium">{appointmentDetails.formatted_appointment_type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="text-base font-medium">{appointmentDetails.formatted_priority}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-base font-medium">{appointmentDetails.appointment_duration_display || `${appointmentDetails.duration} minutes`}</p>
          </div>
        </div>
      </div>
      
      {/* Patient Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Patient Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Patient Name</p>
            <p className="text-base font-medium">{appointmentDetails.patient_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Chief Complaint</p>
            <p className="text-base font-medium">{appointmentDetails.chief_complaint || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Symptoms</p>
            <p className="text-base font-medium">{appointmentDetails.symptoms || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Medical History</p>
            <p className="text-base font-medium">{appointmentDetails.medical_history || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Allergies</p>
            <p className="text-base font-medium">{appointmentDetails.allergies || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Medications</p>
            <p className="text-base font-medium">{appointmentDetails.current_medications || 'None'}</p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button 
          className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors ${
            actionLoading === 'confirm' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleConfirmAppointment}
          disabled={actionLoading !== null || appointmentDetails.status === 'confirmed'}
        >
          {actionLoading === 'confirm' ? 'Confirming...' : 'Confirm Appointment'}
        </button>
        <button 
          className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors ${
            actionLoading === 'cancel' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleCancelAppointment}
          disabled={actionLoading !== null || appointmentDetails.status === 'cancelled'}
        >
          {actionLoading === 'cancel' ? 'Cancelling...' : 'Cancel Appointment'}
        </button>
        <button 
          className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors ${
            actionLoading === 'reschedule' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleRescheduleAppointment}
          disabled={actionLoading !== null || appointmentDetails.status === 'cancelled'}
        >
          {actionLoading === 'reschedule' ? 'Rescheduling...' : 'Reschedule Appointment'}
        </button>
        <button 
          className={`px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors ${
            actionLoading === 'notes' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleAddNotes}
          disabled={actionLoading !== null}
        >
          {actionLoading === 'notes' ? 'Adding...' : 'Add Notes'}
        </button>
      </div>
      
      {/* Important Notes */}
      {appointmentDetails.important_notes && appointmentDetails.important_notes.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Important Notes</h2>
          <ul className="list-disc pl-5 space-y-2">
            {appointmentDetails.important_notes.map((note: string, index: number) => (
              <li key={index} className="text-gray-700">{note}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Payment Information */}
      {appointmentDetails.payment_status && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="text-base font-medium capitalize">{appointmentDetails.payment_status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurance Based</p>
              <p className="text-base font-medium">{appointmentDetails.is_insurance_based ? 'Yes' : 'No'}</p>
            </div>
            {appointmentDetails.insurance_details && (
              <div>
                <p className="text-sm text-gray-500">Insurance Details</p>
                <p className="text-base font-medium">{JSON.stringify(appointmentDetails.insurance_details)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Doctor's Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Add Notes</h3>
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                onClick={() => setShowNotesModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={handleSaveNotes}
                disabled={!notes.trim()}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalAppointmentDetailPage; 