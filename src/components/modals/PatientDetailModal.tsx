import React, { useState, useEffect } from 'react';

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  onUpdate: (updatedData: any) => void;
}

interface PatientDetail {
  id: string;
  admission_id: string;
  patient_name: string;
  patient_age?: number;
  status: string;
  admission_date: string;
  reason_for_admission: string;
  department_name: string;
  attending_doctor_name: string;
  bed_identifier?: string;
  is_icu_bed: boolean;
  priority: string;
  admission_type: string;
  temp_patient_details?: any;
  is_registered_patient: boolean;
  diagnosis?: string;
  discharge_summary?: string;
  followup_instructions?: string;
}

const PatientDetailModal: React.FC<PatientDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  patientId, 
  onUpdate 
}) => {
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    status: '',
    diagnosis: '',
    bed_identifier: '',
    is_icu_bed: false,
    discharge_summary: '',
    followup_instructions: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Get auth token
  const getAuthToken = () => {
    const organizationAuth = localStorage.getItem('organizationAuth');
    if (organizationAuth) {
      try {
        const authData = JSON.parse(organizationAuth);
        return authData.tokens?.access;
      } catch (e) {
        console.error('Failed to parse organization auth data:', e);
      }
    }
    return null;
  };

  // Fetch patient details when modal opens
  useEffect(() => {
    if (isOpen && patientId) {
      fetchPatientDetails();
    }
  }, [isOpen, patientId]);

  const fetchPatientDetails = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/admissions/${patientId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPatient(data);
        setEditForm({
          status: data.status || '',
          diagnosis: data.diagnosis || '',
          bed_identifier: data.bed_identifier || '',
          is_icu_bed: data.is_icu_bed || false,
          discharge_summary: data.discharge_summary || '',
          followup_instructions: data.followup_instructions || ''
        });
      } else {
        console.error('Failed to fetch patient details');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/admissions/${patientId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedData = await response.json();
        setPatient(updatedData);
        setIsEditing(false);
        onUpdate(updatedData);
      } else {
        console.error('Failed to update patient');
        alert('Failed to update patient information');
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('An error occurred while updating patient information');
    } finally {
      setLoading(false);
    }
  };

  const handleAdmit = async () => {
    await updatePatientStatus('admitted');
  };

  const handleDischarge = async () => {
    if (!editForm.discharge_summary) {
      alert('Please provide a discharge summary before discharging the patient.');
      return;
    }
    await updatePatientStatus('discharged');
  };

  const updatePatientStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const endpoint = newStatus === 'admitted' 
        ? `${API_BASE_URL}/api/admissions/${patientId}/admit/`
        : `${API_BASE_URL}/api/admissions/${patientId}/discharge/`;

      const body = newStatus === 'discharged' 
        ? {
            discharge_summary: editForm.discharge_summary,
            followup_instructions: editForm.followup_instructions,
            discharge_destination: 'Home' // Default
          }
        : {};

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const updatedData = await response.json();
        setPatient(updatedData);
        onUpdate(updatedData);
        alert(`Patient ${newStatus} successfully!`);
      } else {
        console.error(`Failed to ${newStatus} patient`);
        alert(`Failed to ${newStatus} patient`);
      }
    } catch (error) {
      console.error(`Error ${newStatus} patient:`, error);
      alert(`An error occurred while updating patient status`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const badgeClasses = {
      admitted: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      discharged: 'bg-gray-100 text-gray-800',
      transferred: 'bg-blue-100 text-blue-800',
      deceased: 'bg-red-100 text-red-800',
      left_ama: 'bg-orange-100 text-orange-800'
    };
    
    const displayStatus = status === 'left_ama' ? 'Left AMA' : status.charAt(0).toUpperCase() + status.slice(1);
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[status as keyof typeof badgeClasses] || 'bg-gray-100 text-gray-800'}`}>
        {displayStatus}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">
              {patient ? `Patient Details - ${patient.patient_name}` : 'Patient Details'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : patient ? (
            <>
              {/* Action Buttons */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  {patient.status === 'pending' && (
                    <button
                      onClick={handleAdmit}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <span className="material-icons text-sm mr-1">check</span>
                      Admit Patient
                    </button>
                  )}
                  {patient.status === 'admitted' && (
                    <button
                      onClick={handleDischarge}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <span className="material-icons text-sm mr-1">exit_to_app</span>
                      Discharge Patient
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <span className="material-icons text-sm mr-1">
                    {isEditing ? 'close' : 'edit'}
                  </span>
                  {isEditing ? 'Cancel Edit' : 'Edit Details'}
                </button>
              </div>

              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Admission ID</label>
                      <p className="text-blue-600 font-medium">{patient.admission_id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Patient Name</label>
                      <p className="font-medium">{patient.patient_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Age</label>
                      <p>{patient.patient_age || patient.temp_patient_details?.age || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <div className="mt-1">
                        <StatusBadge status={patient.status} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Admission Date</label>
                      <p>{formatDate(patient.admission_date)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Priority</label>
                      <p className="capitalize">{patient.priority}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Department</label>
                      <p>{patient.department_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Attending Doctor</label>
                      <p>{patient.attending_doctor_name || 'Not assigned'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Room/Bed</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bed_identifier"
                          value={editForm.bed_identifier}
                          onChange={handleInputChange}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Room 101-A"
                        />
                      ) : (
                        <p>{patient.bed_identifier || 'Not assigned'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">ICU Bed</label>
                      {isEditing ? (
                        <label className="flex items-center mt-1">
                          <input
                            type="checkbox"
                            name="is_icu_bed"
                            checked={editForm.is_icu_bed}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm">Patient is in ICU</span>
                        </label>
                      ) : (
                        <p>{patient.is_icu_bed ? 'Yes' : 'No'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Admission Details */}
                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Admission Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Reason for Admission</label>
                      <p className="mt-1">{patient.reason_for_admission}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Diagnosis</label>
                      {isEditing ? (
                        <textarea
                          name="diagnosis"
                          value={editForm.diagnosis}
                          onChange={handleInputChange}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Current diagnosis..."
                        />
                      ) : (
                        <p className="mt-1">{patient.diagnosis || 'No diagnosis recorded'}</p>
                      )}
                    </div>

                    {/* Emergency Patient Details */}
                    {!patient.is_registered_patient && patient.temp_patient_details && (
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-2">Emergency Patient Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium">Phone:</span> {patient.temp_patient_details.phone_number}
                          </div>
                          <div>
                            <span className="font-medium">Gender:</span> {patient.temp_patient_details.gender}
                          </div>
                          <div>
                            <span className="font-medium">City:</span> {patient.temp_patient_details.city}
                          </div>
                          <div>
                            <span className="font-medium">Emergency Contact:</span> {patient.temp_patient_details.emergency_contact_name}
                          </div>
                          {patient.temp_patient_details.chief_complaint && (
                            <div className="md:col-span-2">
                              <span className="font-medium">Chief Complaint:</span> {patient.temp_patient_details.chief_complaint}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Discharge Information */}
                    {(patient.status === 'admitted' || patient.status === 'discharged') && (
                      <>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Discharge Summary</label>
                          {isEditing ? (
                            <textarea
                              name="discharge_summary"
                              value={editForm.discharge_summary}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                              placeholder="Summary of treatment and patient condition..."
                            />
                          ) : (
                            <p className="mt-1">{patient.discharge_summary || 'No discharge summary available'}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Follow-up Instructions</label>
                          {isEditing ? (
                            <textarea
                              name="followup_instructions"
                              value={editForm.followup_instructions}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                              placeholder="Follow-up care instructions..."
                            />
                          ) : (
                            <p className="mt-1">{patient.followup_instructions || 'No follow-up instructions provided'}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button for Edit Mode */}
              {isEditing && (
                <div className="flex justify-end mt-6 pt-6 border-t">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center disabled:opacity-50"
                  >
                    {loading && <span className="material-icons animate-spin text-sm mr-2">refresh</span>}
                    Save Changes
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <span className="material-icons text-6xl text-gray-300 mb-4">error</span>
              <h3 className="text-lg font-medium text-gray-600">Patient Not Found</h3>
              <p className="text-gray-500">The patient details could not be loaded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailModal;
