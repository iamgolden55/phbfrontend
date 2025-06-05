import React, { useState, useEffect } from 'react';
import PatientHPNSearch from '../search/PatientHPNSearch';
import { debounce } from 'lodash';

interface Department {
  id: number;
  name: string;
  total_beds: number;
  occupied_beds: number;
}

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
}

const NewAdmissionModal: React.FC<NewAdmissionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [admissionType, setAdmissionType] = useState<'regular' | 'emergency'>('regular');
  const [departments, setDepartments] = useState<Department[]>([]);
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

  // Get auth token and hospital ID
  const getAuthData = () => {
    const organizationAuth = localStorage.getItem('organizationAuth');
    if (organizationAuth) {
      try {
        const authData = JSON.parse(organizationAuth);
        return {
          token: authData.tokens?.access,
          hospitalId: authData.hospital?.id || authData.userData?.hospital?.id || authData.userData?.hospital_id
        };
      } catch (e) {
        console.error('Failed to parse organization auth data:', e);
      }
    }
    return { token: null, hospitalId: null };
  };
  // Fetch departments and doctors when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('🚀 Modal opened, fetching data...');
      const authData = getAuthData();
      console.log('🔐 Auth data:', authData);
      console.log('🏥 Hospital ID:', authData.hospitalId);
      console.log('👤 User role:', authData.token ? 'Has token' : 'No token');
      
      // Add small delay to ensure modal is fully rendered
      setTimeout(() => {
        console.log('🚀 Starting API calls...');
        fetchDepartments();
        // Don't fetch doctors until a department is selected
      }, 100);
      
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
      expected_discharge_date: '',
      additional_notes: '',
      allergies: '',
      current_medications: '',
      brief_history: '',
      insurance_provider: '',
      insurance_id: ''
    });
  };
  const fetchDepartments = async () => {
    try {
      const { token, hospitalId } = getAuthData();
      
      if (!hospitalId) {
        console.error('No hospital ID found in auth data');
        return;
      }
      
      // For hospital admins, try the hospitals/departments endpoint first
      const organizationAuth = localStorage.getItem('organizationAuth');
      const authData = organizationAuth ? JSON.parse(organizationAuth) : null;
      const isHospitalAdmin = authData?.userData?.role === 'hospital_admin';
      
      let url = `${API_BASE_URL}/api/departments/?hospital=${hospitalId}`;
      
      // If we're a hospital admin, try the hospital-specific endpoint
      if (isHospitalAdmin) {
        // First try to get departments for the hospital admin's hospital
        url = `${API_BASE_URL}/api/hospitals/departments/${hospitalId}`;
      }
      
      console.log('🏥 Fetching departments from:', url);
      console.log('🔐 User role:', authData?.userData?.role);
      console.log('🏥 Hospital ID being sent:', hospitalId);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      // If hospital admin endpoint failed, try the regular endpoint
      if (!response.ok && isHospitalAdmin) {
        console.log('🔄 Hospital admin endpoint failed, trying regular departments endpoint...');
        const fallbackResponse = await fetch(`${API_BASE_URL}/api/departments/?hospital=${hospitalId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          console.log('✅ Departments fetched from fallback:', data);
          handleDepartmentsResponse(data);
        } else {
          const errorData = await fallbackResponse.text();
          console.error('❌ Both endpoints failed:', fallbackResponse.status, errorData);
        }
      } else if (response.ok) {
        const data = await response.json();
        console.log('✅ Departments fetched successfully:', data);
        handleDepartmentsResponse(data);
      } else {
        const errorData = await response.text();
        console.error('❌ Failed to fetch departments:', response.status, response.statusText, errorData);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  
  const handleDepartmentsResponse = (data: any) => {
    // Handle both array and paginated responses
    let departmentList = [];
    
    console.log('🔍 Raw response structure:', {
      hasDepartments: !!data.departments,
      isArray: Array.isArray(data),
      hasResults: !!data.results,
      hasData: !!data.data,
      keys: Object.keys(data)
    });
    
    // Check if it's wrapped in a response object
    if (data.departments && Array.isArray(data.departments)) {
      departmentList = data.departments;
      console.log('✅ Found departments in data.departments');
    } else if (Array.isArray(data)) {
      departmentList = data;
      console.log('✅ Data is already an array');
    } else if (data.results && Array.isArray(data.results)) {
      departmentList = data.results;
      console.log('✅ Found departments in data.results');
    } else if (data.data && Array.isArray(data.data)) {
      departmentList = data.data;
      console.log('✅ Found departments in data.data');
    } else {
      console.error('❌ Could not parse departments from response:', data);
    }
    
    console.log('📦 Parsed departments:', departmentList);
    console.log('📦 Department count:', departmentList.length);
    setDepartments(departmentList);
  };

  const fetchDoctors = async (departmentId: string) => {
    try {
      const { token, hospitalId } = getAuthData();
      
      if (!hospitalId) {
        console.error('No hospital ID found in auth data');
        return;
      }
      
      // Include both hospital ID and department ID to fetch filtered doctors
      const response = await fetch(`${API_BASE_URL}/api/doctors/department/${departmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
        
        // For hospital admins, doctors might be empty if none are registered yet
        const organizationAuth = localStorage.getItem('organizationAuth');
        const authData = organizationAuth ? JSON.parse(organizationAuth) : null;
        
        // Try parsing error response
        try {
          const errorJson = JSON.parse(errorData);
          console.log('📢 Error response:', errorJson);
        } catch {
          console.log('📢 Raw error:', errorData);
        }
        
        if (authData?.userData?.role === 'hospital_admin' && response.status === 404) {
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
      const { token, hospitalId } = getAuthData();
      
      if (!hospitalId) {
        alert('Hospital ID not found. Please log in again.');
        return;
      }

      // Prepare data based on admission type
      const admissionData = admissionType === 'emergency' 
        ? {
            // Emergency admission data
            is_registered_patient: false,
            temp_patient_details: {
              first_name: formData.first_name,
              last_name: formData.last_name,
              age: parseInt(formData.age) || undefined,
              date_of_birth: formData.date_of_birth || undefined,
              gender: formData.gender,
              phone_number: formData.phone_number,
              city: formData.city,
              address: formData.address,
              emergency_contact: formData.emergency_contact,
              emergency_contact_name: formData.emergency_contact_name,
              chief_complaint: formData.chief_complaint,
              allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a),
              current_medications: formData.current_medications.split(',').map(m => m.trim()).filter(m => m),
              brief_history: formData.brief_history,
              insurance_provider: formData.insurance_provider,
              insurance_id: formData.insurance_id
            },
            department: parseInt(formData.department_id),
            attending_doctor: parseInt(formData.attending_doctor_id) || null,
            reason_for_admission: formData.reason_for_admission,
            priority: 'emergency',
            admission_type: 'emergency',
            is_icu_bed: formData.is_icu_bed
          }        : {
            // Regular admission data - Fixed to match backend expectations
            patient_id: selectedPatient?.id,
            hospital_id: hospitalId,
            department_id: parseInt(formData.department_id),
            attending_doctor_id: parseInt(formData.attending_doctor_id) || null,
            reason_for_admission: formData.reason_for_admission,
            diagnosis: formData.diagnosis,
            priority: formData.priority,
            admission_type: formData.admission_type_detail,
            is_icu_bed: formData.is_icu_bed,
            expected_discharge_date: formData.expected_discharge_date || null,
            additional_notes: formData.additional_notes || null
          };

      const endpoint = admissionType === 'emergency' 
        ? `${API_BASE_URL}/api/admissions/emergency/`
        : `${API_BASE_URL}/api/admissions/`;

      console.log('🚀 Submitting admission:', { endpoint, admissionData });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admissionData)
      });

      if (response.ok) {
        const newAdmission = await response.json();
        console.log('✅ Admission created:', newAdmission);
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
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                admissionType === 'regular'
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
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                admissionType === 'emergency'
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
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
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
                      departments.map(dept => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} ({dept.total_beds - dept.occupied_beds} beds available)
                        </option>
                      ))
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
              
              <div className="mt-4">
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
                {admissionType === 'emergency' ? 'Create Emergency Admission' : 'Create Admission'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAdmissionModal;