import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StaffService, type StaffMember, type Department } from '../../services/staffService';
import { StatusBadge } from '../../components/StatusBadge';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
// Using material-icons instead of heroicons
import { PlusOne as PlusIcon, Close as XMarkIcon, ViewList, CalendarMonth } from '@mui/icons-material';
import StaffScheduleView from './components/StaffScheduleView';
import AddVisitModal from './components/AddVisitModal';

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

  // View Mode State
  const [viewMode, setViewMode] = useState<'list' | 'schedule'>('list');
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitModalDate, setVisitModalDate] = useState<Date>(new Date());
  const [visitModalStaffId, setVisitModalStaffId] = useState<number | null>(null);

  const handleAddVisit = (date: Date, staffId?: number) => {
    setVisitModalDate(date);
    setVisitModalStaffId(staffId || null);
    setShowVisitModal(true);
  };

  const handleSaveVisit = async (visit: any) => {
    try {
      await StaffService.createVisit(visit);
      // Refresh timeline would happen here (or handled inside component)
      setShowVisitModal(false);
      setVisitModalStaffId(null);
    } catch (e) {
      console.error(e);
    }
  };
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
    <div className={`${viewMode === 'schedule' ? 'w-full px-4' : 'container mx-auto px-4'} py-8`}>
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

      <div className='flex justify-between items-center mb-6'>
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${viewMode === 'list'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <ViewList className="w-4 h-4 mr-2" />
            Staff List
          </button>
          <button
            onClick={() => setViewMode('schedule')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${viewMode === 'schedule'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <CalendarMonth className="w-4 h-4 mr-2" />
            Roster Schedule
          </button>
        </div>

        <button
          onClick={() => setShowAddStaffForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Staff
        </button>
      </div>

      {viewMode === 'list' ? (
        <>
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
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-blue-800 font-medium mb-1 flex items-center">
                <span className="material-icons text-sm mr-1">people</span>
                Total Staff
              </h3>
              <p className="text-2xl font-bold text-blue-900">{staffMembers.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-green-800 font-medium mb-1 flex items-center">
                <span className="material-icons text-sm mr-1">verified_user</span>
                Currently Active
              </h3>
              <p className="text-2xl font-bold text-green-900">{staffMembers.filter(isStaffActive).length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-green-800 font-medium mb-1 flex items-center">
                <span className="material-icons text-sm mr-1">check_circle</span>
                Available
              </h3>
              <p className="text-2xl font-bold text-green-900">{staffMembers.filter(s => s.is_available).length}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="text-red-800 font-medium mb-1 flex items-center">
                <span className="material-icons text-sm mr-1">cancel</span>
                Not Available
              </h3>
              <p className="text-2xl font-bold text-red-900">{staffMembers.filter(s => !s.is_available).length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <span className="material-icons text-blue-700 mr-2">filter_list</span>
              <h3 className="font-semibold text-gray-800">Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
                <div className="relative">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                    disabled={departmentsLoading}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                  <span className="material-icons absolute right-2 top-2 text-gray-400 pointer-events-none text-lg">expand_more</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                  >
                    <option value="">All Roles</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <span className="material-icons absolute right-2 top-2 text-gray-400 pointer-events-none text-lg">expand_more</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                  <span className="material-icons absolute right-2 top-2 text-gray-400 pointer-events-none text-lg">expand_more</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Active Status</label>
                <div className="relative">
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                  >
                    <option value="">All Active Statuses</option>
                    <option value="true">Currently Active</option>
                    <option value="false">Not Active</option>
                  </select>
                  <span className="material-icons absolute right-2 top-2 text-gray-400 pointer-events-none text-lg">expand_more</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search staff..."
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <span className="material-icons absolute left-2 top-2 text-gray-400 text-lg">search</span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setDepartmentFilter('');
                    setRoleFilter('');
                    setStatusFilter('');
                    setActiveFilter('');
                    setSearchQuery('');
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-md transition-colors text-sm flex items-center"
                >
                  <span className="material-icons text-sm mr-1">close</span>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Staff Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-2"></div>
                  <p>Loading staff roster...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <span className="material-icons text-4xl mb-2">error_outline</span>
                  <p>{error}</p>
                </div>
              ) : filteredStaff.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <span className="material-icons text-4xl mb-2">people_outline</span>
                  <p>No staff members found matching your filters.</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {staff.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{staff.full_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {staff.role_display}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {staff.department_name || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {staff.availability_status?.consultation_hours_start ? (
                            `${staff.availability_status.consultation_hours_start} - ${staff.availability_status.consultation_hours_end}`
                          ) : (
                            <span className="text-gray-400 italic">Not specified</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isStaffActive(staff) ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Available
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Not Available
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge isAvailable={staff.is_available} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-col">
                            {staff.phone ? (
                              <div className="flex items-center mb-1">
                                <span className="material-icons text-xs mr-1 text-gray-400">phone</span>
                                {staff.phone}
                              </div>
                            ) : (
                              <div className="flex items-center mb-1 text-gray-400 italic">
                                <span className="material-icons text-xs mr-1">phone_disabled</span>
                                Not specified
                              </div>
                            )}
                            <div className="flex items-center">
                              <span className="material-icons text-xs mr-1 text-gray-400">email</span>
                              <span className="truncate max-w-[150px]" title={staff.email}>{staff.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <span className="material-icons text-lg">edit</span>
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <span className="material-icons text-lg">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination controls would go here */}
            {filteredStaff.length > 0 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStaff.length}</span> of <span className="font-medium">{filteredStaff.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <span className="material-icons text-sm">chevron_left</span>
                      </a>
                      <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        1
                      </a>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <span className="material-icons text-sm">chevron_right</span>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 w-full min-h-[calc(100vh-160px)] -mt-4">
          <StaffScheduleView
            staffMembers={staffMembers}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onAddVisit={handleAddVisit}
            onDownload={() => alert('Download feature coming soon!')}
          />
        </div>
      )}
      {/* Add Visit Modal */}
      <AddVisitModal
        isOpen={showVisitModal}
        onClose={() => setShowVisitModal(false)}
        onSave={handleSaveVisit}
        initialDate={visitModalDate}
        staffMembers={staffMembers}
      />

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