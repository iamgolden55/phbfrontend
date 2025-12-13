import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StaffService, type StaffMember, type Department } from '../../services/staffService';
import { StatusBadge } from '../../components/StatusBadge';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
// Using material-icons instead of heroicons
import { PlusOne as PlusIcon, Close as XMarkIcon } from '@mui/icons-material';

// Department state will be fetched from API

// Role options
interface RoleOption {
  value: string;
  label: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  { value: 'doctor', label: 'Doctor' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'staff', label: 'Staff' },
];

// Gender options
const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

// Language options
const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'other', label: 'Other' },
];

interface DoctorProfile {
  specialization: string;
  medical_license_number: string;
  license_expiry_date: string;
  years_of_experience: string;
}

interface StaffFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'doctor' | 'nurse' | 'staff';
  department: string;
  date_of_birth: string;
  gender: string;
  preferred_language: string;
  custom_language: string;
  doctor_profile: DoctorProfile;
}

interface AddStaffFormProps {
  onClose: () => void;
  onStaffAdded: (newStaff: StaffMember) => void;
  departments: Department[];
  departmentsLoading: boolean;
  departmentsError: string | null;
}

const AddStaffForm: React.FC<AddStaffFormProps> = ({ 
  onClose, 
  onStaffAdded,
  departments,
  departmentsLoading,
  departmentsError 
}) => {
  const [formData, setFormData] = useState<StaffFormData>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'staff',
    department: '',
    date_of_birth: '',
    gender: '',
    preferred_language: 'en',
    custom_language: '',
    doctor_profile: {
      specialization: '',
      medical_license_number: '',
      license_expiry_date: '',
      years_of_experience: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showCustomLanguage, setShowCustomLanguage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'preferred_language') {
      setShowCustomLanguage(value === 'other');
      if (value !== 'other') {
        setFormData(prev => ({ ...prev, [name]: value, custom_language: '' }));
        return;
      }
    }
    
    // Handle doctor profile fields
    if (name.startsWith('doctor_profile.')) {
      const fieldName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        doctor_profile: {
          ...prev.doctor_profile,
          [fieldName]: value
        }
      }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Prepare the data for the API
      const staffData: Record<string, any> = {
        ...formData,
        department: parseInt(formData.department),
        // Only include preferred_language if it's not empty
        ...(formData.preferred_language === 'other' && formData.custom_language
          ? { preferred_language: formData.custom_language }
          : formData.preferred_language
          ? { preferred_language: formData.preferred_language }
          : {})
      };
      
      // Convert empty string to null for optional fields
      if (staffData.phone === '') {
        staffData.phone = null;
      }
      
      // Convert years_of_experience to number if it exists
      if (staffData.doctor_profile?.years_of_experience) {
        staffData.doctor_profile.years_of_experience = parseInt(staffData.doctor_profile.years_of_experience);
      }

      // Remove empty optional fields
      Object.keys(staffData).forEach(key => {
        if (staffData[key] === '') {
          delete staffData[key];
        }
      });
      
      // Clean up doctor_profile if all fields are empty
      if (staffData.doctor_profile) {
        const hasDoctorProfileData = Object.values(staffData.doctor_profile).some(val => val !== '');
        if (!hasDoctorProfileData) {
          delete staffData.doctor_profile;
        }
      }
      
      console.log('Staff data:', staffData);
      const response = await StaffService.createStaffMember(staffData as any);
      onStaffAdded(response.staff_member);
      onClose();
    } catch (err) {
      console.error('Error creating staff member:', err);
      setError(err instanceof Error ? err.message : 'Failed to create staff member');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Add New Staff Member</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            disabled={isSubmitting}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Personal Information</h4>
              
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
              </div>
            </div>
            
            {/* Professional Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Professional Information</h4>
              
              {formData.role === 'doctor' && (
                <>
                  <div>
                    <label htmlFor="doctor_profile.medical_license_number" className="block text-sm font-medium text-gray-700">
                      Medical License Number *
                    </label>
                    <input
                      type="text"
                      id="doctor_profile.medical_license_number"
                      name="doctor_profile.medical_license_number"
                      required={formData.role === 'doctor'}
                      value={formData.doctor_profile.medical_license_number}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter medical license number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="doctor_profile.license_expiry_date" className="block text-sm font-medium text-gray-700">
                      License Expiry Date *
                    </label>
                    <input
                      type="date"
                      id="doctor_profile.license_expiry_date"
                      name="doctor_profile.license_expiry_date"
                      required={formData.role === 'doctor'}
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.doctor_profile.license_expiry_date}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="doctor_profile.specialization" className="block text-sm font-medium text-gray-700">
                      Specialization *
                    </label>
                    <input
                      type="text"
                      id="doctor_profile.specialization"
                      name="doctor_profile.specialization"
                      required={formData.role === 'doctor'}
                      value={formData.doctor_profile.specialization}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter specialization"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="doctor_profile.years_of_experience" className="block text-sm font-medium text-gray-700">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      id="doctor_profile.years_of_experience"
                      name="doctor_profile.years_of_experience"
                      required={formData.role === 'doctor'}
                      min="0"
                      max="100"
                      value={formData.doctor_profile.years_of_experience}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter years of experience"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {ROLE_OPTIONS.map((option, index) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Clinical Department *
                </label>
                <p className="text-xs text-gray-500 mb-1">
                  Select the clinical or support department (Emergency, Surgery, Laboratory, etc.)
                </p>
                {departmentsLoading ? (
                  <div className="mt-1 text-sm text-gray-500">Loading departments...</div>
                ) : departmentsError ? (
                  <div className="mt-1 text-sm text-red-500">{departmentsError}</div>
                ) : (
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    disabled={departmentsLoading || !!departmentsError}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  >
                    <option value="">Select a department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-1 space-y-2">
                  {GENDER_OPTIONS.map(option => (
                    <label key={option.value} className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value={option.value}
                        checked={formData.gender === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="preferred_language" className="block text-sm font-medium text-gray-700">
                  Preferred Language
                </label>
                <select
                  id="preferred_language"
                  name="preferred_language"
                  value={formData.preferred_language}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {LANGUAGE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                {showCustomLanguage && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="custom_language"
                      value={formData.custom_language}
                      onChange={handleChange}
                      placeholder="Please specify language"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Staff Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper function to determine if a staff member is currently active
const isStaffActive = (staff: StaffMember) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  if (!staff.availability_status.consultation_hours_start || !staff.availability_status.consultation_hours_end) {
    return true;
  }

  const [startHour, startMinute] = staff.availability_status.consultation_hours_start.split(':').map(Number);
  const [endHour, endMinute] = staff.availability_status.consultation_hours_end.split(':').map(Number);
  
  const currentTime = currentHour * 60 + currentMinute;
  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;
  
  return currentTime >= startTime && currentTime <= endTime;
};

interface StaffMember {
  id: number;
  email: string;
  full_name: string;
  role: string;
  role_display: string;
  department_name: string | null;
  is_available: boolean;
  availability_status: {
    is_available: boolean;
    consultation_hours_start: string | null;
    consultation_hours_end: string | null;
    next_available_slot: string | null;
  };
  phone: string | null;
  last_login: string;
  date_joined: string;
}

// Helper function to format time string to HH:MM:SS
const formatTimeString = (dateTimeString: string): string => {
  try {
    // Handle both full datetime and time-only strings
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      // If it's already in HH:MM:SS format, return as is
      if (/^\d{2}:\d{2}:\d{2}$/.test(dateTimeString)) {
        return dateTimeString;
      }
      return 'Invalid time';
    }
    return date.toTimeString().split(' ')[0]; // Returns HH:MM:SS
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid time';
  }
};

const StaffRosterPage: React.FC = () => {
  // Get organization authentication context
  const { userData, isAuthenticated } = useOrganizationAuth();
  const hospitalId = userData?.hospital?.id;

  // Current date for the roster
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Staff data from API
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for departments and loading
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentsLoading, setDepartmentsLoading] = useState<boolean>(true);
  const [departmentsError, setDepartmentsError] = useState<string | null>(null);

  // Filter states
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle adding a new staff member
  const handleStaffAdded = (newStaff: StaffMember) => {
    setStaffMembers(prev => [newStaff, ...prev]);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Status badge component
  const StatusBadge: React.FC<{ isAvailable: boolean }> = ({ isAvailable }) => {
    const badgeClass = isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        {isAvailable ? 'Available' : 'Not Available'}
      </span>
    );
  };
  
  // Date navigation functions
  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };
  
  const goToPreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Filter staff members based on search query and filters
  const filteredStaff = staffMembers.filter(staff => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      staff.full_name.toLowerCase().includes(searchLower) ||
      staff.email.toLowerCase().includes(searchLower) ||
      (staff.phone ? staff.phone.toLowerCase().includes(searchLower) : false) ||
      (staff.role_display ? staff.role_display.toLowerCase().includes(searchLower) : false) ||
      (staff.department_name ? staff.department_name.toLowerCase().includes(searchLower) : false);
      
    const matchesDepartment = !departmentFilter || staff.department_name === departmentFilter;
    const matchesRole = !roleFilter || staff.role_display === roleFilter;
    const matchesStatus = !statusFilter || 
      (statusFilter === 'true' ? staff.is_available : !staff.is_available);
    const matchesActive = !activeFilter || 
      (activeFilter === 'true' ? isStaffActive(staff) : !isStaffActive(staff));
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus && matchesActive;
  });
  
  // Get unique roles from staff members
  const roles = Array.from(
    new Set(staffMembers.map(staff => staff.role_display).filter((r): r is string => Boolean(r)))
  );

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setDepartmentsLoading(true);

        // hospitalId is already available from useOrganizationAuth() hook

        if (!hospitalId) {
          throw new Error('Hospital ID not found');
        }
        
        // Fetch departments and staff members in parallel
        // Only fetch clinical and support departments (not administrative ones like IT/HR)
        const [departmentsData, staffResponse] = await Promise.all([
          StaffService.getHospitalDepartments(hospitalId, 'clinical_and_support'),
          StaffService.fetchStaffMembers()
        ]);
        
        setDepartments(departmentsData);
        setDepartmentsError(null);
        
        // Update staff members from the response
        if (staffResponse && staffResponse.staff_members) {
          setStaffMembers(staffResponse.staff_members);
        }
        
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setDepartmentsError('Failed to load departments. Please try again later.');
      } finally {
        setLoading(false);
        setDepartmentsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/organization/dashboard" 
            className="mr-4 bg-blue-50 hover:bg-blue-100 p-2 rounded-full"
          >
            <span className="material-icons text-blue-700">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-800">Staff Roster</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/organization/admissions" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Patient Admissions">
            <span className="material-icons text-blue-700">person_add</span>
          </Link>
          <Link to="/organization/surgery-schedule" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Surgery Schedule">
            <span className="material-icons text-blue-700">event</span>
          </Link>
          <Link to="/organization/departments" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Department Management">
            <span className="material-icons text-blue-700">bed</span>
          </Link>
        </div>
      </div>
      
     <div className='flex justify-end mb-6'>
     <button 
              onClick={() => setShowAddStaffForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Staff
            </button>
     </div>
      
      {/* Date Navigation */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex space-x-2">
            <button 
              onClick={goToPreviousDay}
              disabled={loading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-icons text-sm">chevron_left</span>
            </button>
            <button 
              onClick={goToToday}
              disabled={loading}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-icons text-sm mr-1">today</span>
              Today
            </button>
            <button 
              onClick={goToNextDay}
              disabled={loading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-icons text-sm">chevron_right</span>
            </button>
          </div>
          
          <h2 className="text-lg font-semibold text-center flex-grow flex items-center justify-center">
            <span className="material-icons mr-2">calendar_month</span>
            {formatDate(currentDate)}
          </h2>
          
          <div className="flex space-x-2">
          
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center">
              <span className="material-icons text-sm mr-1">print</span>
              Print Roster
            </button>
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center">
              <span className="material-icons text-sm mr-1">download</span>
              Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Staff Summary */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-700">
          <span className="material-icons mr-2">error</span>
          {error}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <span className="material-icons mr-2">summarize</span>
            Today's Staff Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-md text-center">
              <p className="text-2xl font-bold text-blue-600">{staffMembers.length}</p>
              <p className="text-sm text-gray-600">Total Staff</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md text-center">
              <p className="text-2xl font-bold text-green-600">
                {staffMembers.filter(isStaffActive).length}
              </p>
              <p className="text-sm text-gray-600">Currently Active</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md text-center">
              <p className="text-2xl font-bold text-green-600">
                {staffMembers.filter(staff => staff.is_available).length}
              </p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-2xl font-bold text-gray-600">
                {staffMembers.filter(staff => !staff.is_available).length}
              </p>
              <p className="text-sm text-gray-600">Not Available</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <span className="material-icons mr-2">filter_alt</span>
          Filters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {departmentsLoading ? (
                <option>Loading departments...</option>
              ) : departmentsError ? (
                <option>Error loading departments</option>
              ) : (
                departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              {ROLE_OPTIONS.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Active Status</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="">All Active Statuses</option>
              <option value="true">Currently Active</option>
              <option value="false">Currently Inactive</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search staff..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center h-10"
              onClick={() => {
                setDepartmentFilter('');
                setRoleFilter('');
                setStatusFilter('');
                setActiveFilter('');
                setSearchQuery('');
              }}
            >
              <span className="material-icons text-sm mr-1">clear</span>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Staff Roster Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{staff.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {staff.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{staff.role_display}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{staff.department_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {staff.availability_status.consultation_hours_start && staff.availability_status.consultation_hours_end ? (
                      <div className="text-sm text-gray-600">
                        {formatTimeString(staff.availability_status.consultation_hours_start)} - {formatTimeString(staff.availability_status.consultation_hours_end)}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">Not specified</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge isAvailable={isStaffActive(staff)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge isAvailable={staff.is_available} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className="material-icons text-xs mr-1 text-gray-400">phone</span>
                      {staff.phone ? staff.phone : 'Not specified'}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <span className="material-icons text-xs mr-1 text-gray-400">email</span>
                      {staff.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button className="text-blue-600 hover:text-blue-800 mr-3 flex items-center">
                      <span className="material-icons text-sm mr-1">visibility</span>
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                      <span className="material-icons text-sm mr-1">edit</span>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredStaff.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <span className="material-icons text-4xl mb-2 text-gray-400">person_search</span>
            <p>No staff members match your filters.</p>
            <button 
              className="text-blue-600 hover:text-blue-800 mt-2 flex items-center justify-center mx-auto"
              onClick={() => {
                setDepartmentFilter('');
                setRoleFilter('');
                setStatusFilter('');
                setSearchQuery('');
              }}
            >
              <span className="material-icons text-sm mr-1">clear_all</span>
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Add Staff Modal */}
      {showAddStaffForm && (
        <AddStaffForm
          onClose={() => setShowAddStaffForm(false)}
          onStaffAdded={handleStaffAdded}
          departments={departments}
          departmentsLoading={departmentsLoading}
          departmentsError={departmentsError}
        />
      )}
    </div>
  );
};

export default StaffRosterPage; 