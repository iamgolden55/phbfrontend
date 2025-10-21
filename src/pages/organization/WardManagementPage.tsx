import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrganizationAuth, HospitalInfo, UserData } from '../../features/organization/organizationAuthContext';
import { API_BASE_URL } from '../../utils/config';

// Define Department interface
interface Department {
  id: number;
  name: string;
  code: string;
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  icu_beds: number;
  occupied_icu_beds: number;
  available_icu_beds: number;
  bed_utilization_rate: number;
}

interface Department {
  id: number;
  name: string;
  code: string;
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  icu_beds: number;
  occupied_icu_beds: number;
  available_icu_beds: number;
  bed_utilization_rate: number;
}

const DepartmentCard: React.FC<{ department: Department }> = ({ department }) => {
  const utilizationRate = Math.round(department.bed_utilization_rate);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{department.name}</h3>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
          {department.code}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-gray-600">Total Beds: {department.total_beds}</p>
          <p className="text-gray-600">Occupied: {department.occupied_beds / 2}</p>
          <p className="text-gray-600">Available: {department.total_beds - (department.occupied_beds / 2)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-600">ICU Beds: {department.icu_beds}</p>
          <p className="text-gray-600">Occupied ICU: {department.occupied_icu_beds}</p>
          <p className="text-gray-600">Available ICU: {department.available_icu_beds}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((department.occupied_beds / 2) / department.total_beds) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Bed Utilization: {((department.occupied_beds / 2) / department.total_beds) * 100 || '0'}%
        </p>
      </div>
    </div>
  );
};

const DepartmentSummary: React.FC<{ departments: Department[] }> = ({ departments }) => {
  const totalBeds = departments.reduce((sum: number, dept: Department) => sum + dept.total_beds, 0);
  const totalOccupied = departments.reduce((sum: number, dept: Department) => sum + dept.occupied_beds / 2, 0);
  const totalAvailable = departments.reduce((sum: number, dept: Department) => sum + (dept.total_beds - (dept.occupied_beds / 2)), 0);
  const totalICU = departments.reduce((sum: number, dept: Department) => sum + dept.icu_beds, 0);
  const totalOccupiedICU = departments.reduce((sum: number, dept: Department) => sum + dept.occupied_icu_beds, 0);
  const totalAvailableICU = totalICU - totalOccupiedICU;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Hospital Overview</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">{totalBeds}</h3>
            <p className="text-gray-600">Total Beds</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-orange-600">{totalOccupied}</h3>
            <p className="text-gray-600">Occupied Beds</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-green-600">{totalAvailable}</h3>
            <p className="text-gray-600">Available Beds</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-purple-600">{totalICU}</h3>
            <p className="text-gray-600">Total ICU Beds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DepartmentFormData {
  name: string;
  code: string;
  department_type: string;
  floor_number: string;
  wing: string;
  total_beds: number;
  minimum_staff_required: number;
  is_24_hours: boolean;
  operating_hours: {
    monday: { start: string; end: string };
    tuesday: { start: string; end: string };
    wednesday: { start: string; end: string };
    thursday: { start: string; end: string };
    friday: { start: string; end: string };
    saturday: { start: string; end: string };
    sunday: { start: string; end: string };
  };
  emergency_contact: string;
  extension_number: string;
}

const WardManagementPage: React.FC = () => {
  const { userData, isAuthenticated } = useOrganizationAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch departments when component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/hospitals/departments/`, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Send cookies with request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }

        const data = await response.json();
        setDepartments(data.departments || data); // Handle both formats
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [departmentForm, setDepartmentForm] = useState<DepartmentFormData>({
    name: '',
    code: '',
    department_type: 'medical',
    floor_number: '1',
    wing: 'north',
    total_beds: 20,
    minimum_staff_required: 20,
    is_24_hours: false,
    operating_hours: {
      monday: { start: "09:00", end: "17:00" },
      tuesday: { start: "09:00", end: "17:00" },
      wednesday: { start: "09:00", end: "17:00" },
      thursday: { start: "09:00", end: "17:00" },
      friday: { start: "09:00", end: "17:00" },
      saturday: { start: "09:00", end: "17:00" },
      sunday: { start: "09:00", end: "17:00" },
    },
    emergency_contact: '',
    extension_number: ''
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/hospitals/departments/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
        body: JSON.stringify({
          ...departmentForm,
          hospital: userData?.hospital?.id
        })
      });

      console.log('response', response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create department');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setShowCreateForm(false);
        setDepartmentForm({
          name: '',
          code: '',
          department_type: 'medical',
          floor_number: '1',
          wing: 'north',
          total_beds: 20,
          minimum_staff_required: 20,
          is_24_hours: false,
          operating_hours: {
            monday: { start: "09:00", end: "17:00" },
            tuesday: { start: "09:00", end: "17:00" },
            wednesday: { start: "09:00", end: "17:00" },
            thursday: { start: "09:00", end: "17:00" },
            friday: { start: "09:00", end: "17:00" },
            saturday: { start: "09:00", end: "17:00" },
            sunday: { start: "09:00", end: "17:00" },
          },
          emergency_contact: '',
          extension_number: ''
        });
        setFormError('');
        // Refresh departments list
        const fetchDepartments = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/api/hospitals/departments/?hospital=${userData?.hospital?.id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // Send cookies with request
            });
            const data = await response.json();
            if (data.status === 'success') {
              setDepartments(data.departments);
            }
          } catch (err) {
            console.error('Error refreshing departments:', err);
          }
        };
        fetchDepartments();
      }
    } catch (err) {
      setFormError(err?.message || 'Failed to create department');
      console.error('Error creating department:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setDepartmentForm(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleOperatingHoursChange = (day: string, timeType: 'start' | 'end', value: string) => {
    setDepartmentForm(prev => ({
      ...prev,
      operating_hours: {
        ...prev.operating_hours,
        [day]: {
          ...prev.operating_hours[day as keyof typeof prev.operating_hours],
          [timeType]: value
        }
      }
    }));
  };

  const departmentTypes = ['medical', 'surgical', 'emergency'];
  const wings = ['north', 'south', 'east', 'west', 'central'];

  console.log('userData', userData);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Using the same API base URL as the auth context
        // Build URL with query parameters
        const url = new URL(`${API_BASE_URL}/api/hospitals/departments/`);
        url.searchParams.append('hospital', String(userData?.hospital?.id || ''));

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Send cookies with request
        });

        console.log('response', response);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Error fetching departments: ${response.status}`);
        }

        const data = await response.json();
        console.log('response data', data);
        if (data && data.status === 'success' && Array.isArray(data.departments)) {
          setDepartments(data.departments);
          setError('');
        } else {
          setError('Invalid response format from server');
        }
      } catch (err) {
        setError('Failed to fetch department data. Please try again.');
        console.error('Error fetching departments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.hospital?.id && isAuthenticated) {
      fetchDepartments();
    }
  }, [userData?.hospital?.id, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!Array.isArray(departments)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Invalid department data format</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Department Management</h1>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Create Department
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Department</h2>
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Department Name *</label>
                <input
                  type="text"
                  name="name"
                  value={departmentForm.name}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Department Code *</label>
                <input
                  type="text"
                  name="code"
                  value={departmentForm.code}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Department Type *</label>
                <select
                  name="department_type"
                  value={departmentForm.department_type}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {departmentTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)} Department
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Floor Number</label>
                <input
                  type="number"
                  name="floor_number"
                  value={departmentForm.floor_number}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Wing</label>
                <select
                  name="wing"
                  value={departmentForm.wing}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {wings.map(wing => (
                    <option key={wing} value={wing}>
                      {wing.charAt(0).toUpperCase() + wing.slice(1)} Wing
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">24/7 Operation</label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={departmentForm.is_24_hours}
                      onChange={(e) => setDepartmentForm(prev => ({ ...prev, is_24_hours: e.target.checked }))}
                      className="form-checkbox"
                    />
                    <span className="ml-2">24/7 Operation</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-4">Operating Hours</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <div key={day}>
                    <label className="block text-gray-600 text-sm mb-2">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={departmentForm.operating_hours[day].start}
                        onChange={(e) => handleOperatingHoursChange(day, 'start', e.target.value)}
                        className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <span className="text-gray-600">to</span>
                      <input
                        type="time"
                        value={departmentForm.operating_hours[day].end}
                        onChange={(e) => handleOperatingHoursChange(day, 'end', e.target.value)}
                        className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Emergency Contact *</label>
                <input
                  type="tel"
                  name="emergency_contact"
                  value={departmentForm.emergency_contact}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-xs text-gray-600 mt-1">Format: 08012345678</p>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Extension Number *</label>
                <input
                  type="text"
                  name="extension_number"
                  value={departmentForm.extension_number}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-xs text-gray-600 mt-1">Format: 200</p>
              </div>
            </div>

            {/* Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Total Beds</label>
                <input
                  type="number"
                  name="total_beds"
                  value={departmentForm.total_beds}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Minimum Staff Required</label>
                <input
                  type="number"
                  name="minimum_staff_required"
                  value={departmentForm.minimum_staff_required}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Create Department
              </button>
            </div>
          </form>
        </div>
      )}

      <DepartmentSummary departments={departments} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.length > 0 ? departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        )) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No departments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardManagementPage;
