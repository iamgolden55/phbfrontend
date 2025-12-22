import React, { useState, useEffect } from 'react';
import PatientHPNSearch from '../search/PatientHPNSearch';
import { debounce } from 'lodash';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import { DepartmentData } from '../../hooks/useDepartmentStats'; // Import from hook

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  hospital: number;
}

interface Patient {
  id: number;
  hpn: string;
  first_name: string;
  last_name: string;
  age?: number;
  date_of_birth?: string;
  gender?: string;
  email?: string;
}

interface NewAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (admissionData: any) => void;
  departments: DepartmentData[]; // Receive departments as prop
}

const NewAdmissionModal: React.FC<NewAdmissionModalProps> = ({ isOpen, onClose, onSubmit, departments = [] }) => {
  const { userData, isAuthenticated } = useOrganizationAuth(); // Use secure cookie-based auth
  const [admissionType, setAdmissionType] = useState<'regular' | 'emergency'>('regular');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  // Form state
  const [formData, setFormData] = useState({
    // Emergency Patient Information
    first_name: '',
    last_name: '',
    age: '',
    date_of_birth: '',
    gender: 'male',
    phone_number: '',
    city: '',
    address: '',
    emergency_contact: '',
    emergency_contact_name: '',

    // Admission Details
    department_id: '',
    attending_doctor_id: '',
    reason_for_admission: '',
    diagnosis: '',
    chief_complaint: '',
    priority: 'elective',
    admission_type_detail: 'inpatient',
    is_icu_bed: false,
    admission_action: 'admit_immediately', // Default to immediate admission
    expected_discharge_date: '',
    additional_notes: '',

    // Medical Information
    allergies: '',
    current_medications: '',
    brief_history: '',

    // Insurance
    insurance_provider: '',
    insurance_id: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Get hospital ID from context
  const hospitalId = userData?.hospital?.id;
  // Fetch departments and doctors when modal opens
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      // Don't fetch departments anymore, we have them from props!
      console.log('🚀 Modal opened with ', departments.length, ' departments');

      // Reset form when modal opens
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setSelectedPatient(null);
    setAdmissionType('regular');
    setFormData({
      first_name: '',
      last_name: '',
      age: '',
      date_of_birth: '',
      gender: 'male',
      phone_number: '',
      city: '',
      address: '',
      emergency_contact: '',
      emergency_contact_name: '',
      department_id: '',
      attending_doctor_id: '',
      reason_for_admission: '',
      diagnosis: '',
      chief_complaint: '',
      priority: 'elective',
      admission_type_detail: 'inpatient',
      is_icu_bed: false,
      admission_action: 'admit_immediately',
      expected_discharge_date: '',
      additional_notes: '',
      allergies: '',
      current_medications: '',
      brief_history: '',
      insurance_provider: '',
      insurance_id: ''
    });
  };
  const fetchDoctors = async (departmentId: string) => {
    try {
      if (!hospitalId) {
        console.error('No hospital ID found in auth data');
        return;
      }

      // Include both hospital ID and department ID to fetch filtered doctors
      const response = await fetch(`${API_BASE_URL}/api/doctors/department/${departmentId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send HTTP-only cookies automatically
      });

      if (response.ok) {
        const data = await response.json();
        console.log('👨‍⚕️ Doctors fetched for hospital', hospitalId, ':', data);

        // Handle both array and paginated responses
        let doctorList = [];
        if (Array.isArray(data)) {
          doctorList = data;
        } else if (data.results && Array.isArray(data.results)) {
          doctorList = data.results;
        } else if (data.data && Array.isArray(data.data)) {
          doctorList = data.data;
        }

        console.log('📦 Parsed doctors:', doctorList);
        setDoctors(doctorList);
      } else {
        const errorData = await response.text();
        console.error('Failed to fetch doctors:', response.status, response.statusText, errorData);

        // Try parsing error response
        try {
          const errorJson = JSON.parse(errorData);
          console.log('📢 Error response:', errorJson);
        } catch {
          console.log('📢 Raw error:', errorData);
        }

        if (userData?.role === 'hospital_admin' && response.status === 404) {
          console.log('📢 No doctors found for this hospital yet');
          setDoctors([]);
        }
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Auto-calculate age when date of birth changes
    if (name === 'date_of_birth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Adjust age if birthday hasn't occurred this year yet
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Update age field automatically
      setFormData(prev => ({
        ...prev,
        age: age.toString()
      }));

      console.log(`🎂 Auto-calculated age: ${age} years from DOB: ${value}`);
    }

    // If department is selected, fetch doctors for that department
    if (name === 'department_id' && value) {
      console.log('🏥 Department selected, fetching doctors for department:', value);
      fetchDoctors(value);
    } else if (name === 'department_id' && !value) {
      // Clear doctors list if no department is selected
      setDoctors([]);
    }
  };
  const handlePatientSelect = (patient: Patient | null) => {
    setSelectedPatient(patient);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // hospitalId is already available from useOrganizationAuth() hook

      if (!hospitalId) {
        alert('Hospital ID not found. Please log in again.');
        return;
      }

      // Prepare data based on admission type
      const shouldAssignBed = formData.admission_action === 'admit_immediately';

      const admissionData = admissionType === 'emergency'
        ? {
          // Emergency admission data - FIXED admission_type per backend AI
          hospital_id: hospitalId,
          department_id: parseInt(formData.department_id),
          attending_doctor_id: parseInt(formData.attending_doctor_id) || null,
          reason_for_admission: formData.reason_for_admission,
          admission_type: 'inpatient',  // FIXED: Changed from 'emergency' to 'inpatient'
          priority: 'emergency',        // CORRECT: This indicates emergency priority
          assign_bed: shouldAssignBed,
          temp_patient_details: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            age: parseInt(formData.age) || null,  // FIXED: Ensure age is sent as number, not undefined
            date_of_birth: formData.date_of_birth || null,  // FIXED: Send as null instead of undefined
            gender: formData.gender,
            phone_number: formData.phone_number,
            city: formData.city,
            address: formData.address,
            emergency_contact: formData.emergency_contact,
            emergency_contact_name: formData.emergency_contact_name,
            chief_complaint: formData.chief_complaint,
            allergies: formData.allergies,
            current_medications: formData.current_medications,
            brief_history: formData.brief_history,
            insurance_provider: formData.insurance_provider,
            insurance_id: formData.insurance_id
          }
        } : {
          // Regular admission data - Fixed to match backend expectations
          patient: selectedPatient?.id,
          hospital: hospitalId,
          department: parseInt(formData.department_id),
          attending_doctor: parseInt(formData.attending_doctor_id) || null,
          reason_for_admission: formData.reason_for_admission,
          diagnosis: formData.diagnosis,
          priority: formData.priority,
          admission_type: formData.admission_type_detail,
          assign_bed: shouldAssignBed  // Use user's choice
        };

      const endpoint = admissionType === 'emergency'
        ? `${API_BASE_URL}/api/admissions/emergency_admission/`
        : `${API_BASE_URL}/api/admissions/`;

      console.log('🚀 Submitting admission:', {
        endpoint,
        admissionType,
        shouldAssignBed,
        hospitalId,
        departmentId: formData.department_id,
        patientAge: formData.age,
        patientDOB: formData.date_of_birth,
        admissionData
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send HTTP-only cookies automatically
        body: JSON.stringify(admissionData)
      });

      if (response.ok) {
        const newAdmission = await response.json();
        console.log('✅ Admission created:', newAdmission);

        // Show success message based on what action was taken
        const actionMessage = shouldAssignBed
          ? `Patient admitted successfully! Bed assigned in ${newAdmission.admission?.department_name || 'department'}.`
          : `Admission created as pending. Patient can be admitted later when bed is available.`;

        alert(actionMessage);
        onSubmit(newAdmission);
        onClose();
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('❌ Admission creation failed:', errorData);
        alert(`Failed to create admission: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error creating admission:', error);
      alert('An error occurred while creating the admission.');
    } finally {
      setLoading(false);
    }
  };
  // Calculate min date for expected discharge (today)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">New Patient Admission</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Admission Type Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setAdmissionType('regular')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${admissionType === 'regular'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
              <span className="material-icons text-sm mr-2">person</span>
              Registered Patient
            </button>
            <button
              type="button"
              onClick={() => setAdmissionType('emergency')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${admissionType === 'emergency'
                ? 'bg-red-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
              <span className="material-icons text-sm mr-2">local_hospital</span>
              Emergency Admission
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Patient Information Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {admissionType === 'emergency' ? 'Patient Information' : 'Registered Patient'}
              </h3>

              {admissionType === 'regular' ? (
                <div className="grid grid-cols-1 gap-4">
                  <PatientHPNSearch
                    onPatientSelect={handlePatientSelect}
                    required={true}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age {formData.date_of_birth && <span className="text-xs text-green-600">(auto-calculated)</span>}
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="150"
                      placeholder={formData.date_of_birth ? "Auto-calculated" : "Enter age or use DOB"}
                      readOnly={!!formData.date_of_birth} // Make read-only if DOB is filled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth <span className="text-xs text-blue-600">(will auto-calculate age)</span>
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="+1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      name="emergency_contact_name"
                      value={formData.emergency_contact_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="emergency_contact"
                      value={formData.emergency_contact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Medical Information Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Admission *
                  </label>
                  <textarea
                    name="reason_for_admission"
                    value={formData.reason_for_admission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                    placeholder="Primary reason for hospital admission"
                  />
                </div>                {admissionType === 'regular' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diagnosis
                    </label>
                    <textarea
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Initial diagnosis"
                    />
                  </div>
                )}
                {admissionType === 'emergency' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chief Complaint *
                    </label>
                    <textarea
                      name="chief_complaint"
                      value={formData.chief_complaint}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      required
                      placeholder="Patient's main concern or symptoms"
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Known Allergies
                    </label>
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Separate multiple allergies with commas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Medications
                    </label>                    <input
                      type="text"
                      name="current_medications"
                      value={formData.current_medications}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Separate multiple medications with commas"
                    />
                  </div>
                </div>
                {admissionType === 'emergency' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brief Medical History
                    </label>
                    <textarea
                      name="brief_history"
                      value={formData.brief_history}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Relevant medical history"
                    />
                  </div>
                )}
                {admissionType === 'regular' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="additional_notes"
                      value={formData.additional_notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Any additional notes or special instructions"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Admission Details Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Admission Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>                  <select
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.length === 0 ? (
                      <option value="" disabled>
                        Loading departments... (If this persists, check console)
                      </option>
                    ) : (
                      departments.map(dept => {
                        // Safely calculate available beds to avoid NaN
                        const total = dept.total_beds || dept.bed_capacity || 0;
                        const occupied = dept.occupied_beds || 0;
                        const available = dept.available_beds !== undefined
                          ? dept.available_beds
                          : Math.max(0, total - occupied);

                        return (
                          <option key={dept.id} value={dept.id}>
                            {dept.name} ({available} beds available)
                          </option>
                        )
                      })
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attending Doctor
                  </label>
                  <select
                    name="attending_doctor_id"
                    value={formData.attending_doctor_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.length === 0 ? (
                      <option value="" disabled>
                        No doctors available
                      </option>
                    ) : (
                      doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          Dr. {doctor.first_name} {doctor.last_name} - {doctor.specialization}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                {admissionType === 'regular' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="elective">Elective</option>
                        <option value="urgent">Urgent</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Type
                      </label>
                      <select
                        name="admission_type_detail"
                        value={formData.admission_type_detail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="inpatient">Inpatient</option>
                        <option value="observation">Observation</option>
                        <option value="day_case">Day Case</option>
                        <option value="respite">Respite Care</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Discharge Date
                      </label>
                      <input
                        type="date"
                        name="expected_discharge_date"
                        value={formData.expected_discharge_date}
                        onChange={handleInputChange}
                        min={getTodayDate()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_icu_bed"
                    checked={formData.is_icu_bed}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Requires ICU Bed</span>
                </label>

                {/* Admission Action Selection */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <label className="block text-sm font-medium text-blue-800 mb-2">
                    Admission Action
                  </label>
                  {admissionType === 'emergency' && (
                    <div className="mb-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                      💡 <strong>Emergency cases</strong> typically require immediate bed assignment for patient safety
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="admission_action"
                        value="admit_immediately"
                        checked={formData.admission_action === 'admit_immediately'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        <span className="font-medium">Admit Immediately</span> - Assign bed and admit patient now
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="admission_action"
                        value="create_pending"
                        checked={formData.admission_action === 'create_pending'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        <span className="font-medium">Create Pending</span> - Schedule for later admission
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Insurance Section */}
            {admissionType === 'emergency' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      name="insurance_provider"
                      value={formData.insurance_provider}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Insurance company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance ID
                    </label>
                    <input
                      type="text"
                      name="insurance_id"
                      value={formData.insurance_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Policy or member ID"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (admissionType === 'regular' && !selectedPatient)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >                {loading && <span className="material-icons animate-spin text-sm mr-2">refresh</span>}
                {admissionType === 'emergency'
                  ? (formData.admission_action === 'admit_immediately'
                    ? 'Create & Admit Emergency Patient'
                    : 'Create Pending Emergency Admission')
                  : (formData.admission_action === 'admit_immediately'
                    ? 'Create & Admit Patient'
                    : 'Create Pending Admission')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAdmissionModal;