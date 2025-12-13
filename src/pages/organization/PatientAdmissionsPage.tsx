import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmissionData } from '../../hooks/useAdmissionData';
import NewAdmissionModal from '../../components/modals/NewAdmissionModal';
import PatientDetailModal from '../../components/modals/PatientDetailModal';

interface Patient {
  id: string;
  name: string;
  age: number;
  admissionDate: string;
  status: 'Admitted' | 'Pending' | 'Discharged' | 'Transferred' | 'Deceased' | 'Left_ama';
  reason: string;
  room?: string;
  doctor?: string;
}

const PatientAdmissionsPage: React.FC = () => {
  // Get real admission data from our hook! 🚀
  const { admissions, statusCounts, emergencyCount, loading, error } = useAdmissionData();
  
  // Modal state
  const [isNewAdmissionModalOpen, setIsNewAdmissionModalOpen] = useState(false);
  const [isPatientDetailModalOpen, setIsPatientDetailModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  
  // Transform API data to match our Patient interface
  const transformToPatient = (admission: any): Patient => {
    console.log('🔍 Transforming admission:', admission); // Debug log
    
    // Backend sends patient_name directly from serializer! 🎉
    const patientName = admission.patient_name || 'Unknown Patient';
    
    // Backend now sends patient_age directly! 🎯
    const age = admission.patient_age || 0;
    
    // Backend sends admission_date correctly
    const admissionDate = admission.admission_date || admission.created_at;
    
    console.log('📊 Patient data:', { 
      name: patientName,
      age: age,
      doctor: admission.attending_doctor_name,
      reason: admission.reason_for_admission
    });
    
    return {
      id: admission.admission_id,
      name: patientName,
      age: age,
      admissionDate: admissionDate,
      status: admission.status.charAt(0).toUpperCase() + admission.status.slice(1) as Patient['status'],
      reason: admission.reason_for_admission || 'Not specified',
      room: admission.bed_identifier || undefined,
      doctor: admission.attending_doctor_name || 'Not assigned'
    };
  };
  
  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth?: string): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  // Convert real API data to Patient format
  const patients = admissions.map(transformToPatient);

  // Handle new admission submission
  const handleNewAdmissionSubmit = (newAdmissionData: any) => {
    console.log('✅ New admission created:', newAdmissionData);
    // Refresh the page or update the data
    window.location.reload(); // Simple refresh for now
  };

  // Handle patient detail actions
  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsPatientDetailModalOpen(true);
  };

  const handleEditPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsPatientDetailModalOpen(true);
  };

  const handlePatientUpdate = (updatedData: any) => {
    console.log('✅ Patient updated:', updatedData);
    // Refresh the page or update the data
    window.location.reload(); // Simple refresh for now
  };

  // Filter patients based on search and filters
  const filteredPatients = patients.filter(patient => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === '' || patient.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Date filter logic (simplified for now)
    const matchesDate = true; // For now, show all dates
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Format date for display - handle different date formats safely
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString);
        return 'Invalid Date';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid Date';
    }
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: Patient['status'] }> = ({ status }) => {
    const badgeClasses = {
      Admitted: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Discharged: 'bg-gray-100 text-gray-800',
      Transferred: 'bg-blue-100 text-blue-800',
      Deceased: 'bg-red-100 text-red-800',
      Left_ama: 'bg-orange-100 text-orange-800'
    };
    
    const displayStatus = status === 'Left_ama' ? 'Left AMA' : status;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {displayStatus}
      </span>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patient admissions... 🏥</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <span className="material-icons text-red-500 text-4xl mb-2">error</span>
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Admissions</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-blue-800">Patient Admissions</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/organization/departments" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Department Management">
            <span className="material-icons text-blue-700">bed</span>
          </Link>
          <Link to="/organization/surgery-schedule" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Surgery Schedule">
            <span className="material-icons text-blue-700">event</span>
          </Link>
          <Link to="/organization/staffing" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Staff Roster">
            <span className="material-icons text-blue-700 ">badge</span>
          </Link>
        </div>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-blue-600">{statusCounts.admitted}</div>
          <div className="text-sm text-gray-600">Currently Admitted</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
          <div className="text-sm text-gray-600">Pending Admission</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-red-600">{emergencyCount}</div>
          <div className="text-sm text-gray-600">Emergency/Urgent Cases</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{statusCounts.discharged}</div>
          <div className="text-sm text-gray-600">Discharged Today</div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setIsNewAdmissionModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <span className="material-icons text-sm mr-1">add</span>
          New Admission
        </button>
      </div>
      
      {/* Filters/Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">search</span>
              </span>
              <input 
                type="text" 
                placeholder="Search by ID or name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">filter_list</span>
              </span>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="admitted">Admitted</option>
                <option value="pending">Pending</option>
                <option value="discharged">Discharged</option>
                <option value="transferred">Transferred</option>
              </select>
            </div>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">date_range</span>
              </span>
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          <button 
            onClick={() => {
              // Apply filters - already applied via filteredPatients
              console.log('Filters applied:', { searchTerm, statusFilter, dateFilter });
            }}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md flex items-center"
          >
            <span className="material-icons text-sm mr-1">filter_alt</span>
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Patient Admissions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-icons text-6xl text-gray-300 mb-4">local_hospital</span>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {searchTerm || statusFilter ? 'No Matching Patients Found' : 'No Patients Currently'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'All patients have been discharged or there are no active admissions.'
                }
              </p>
              <button 
                onClick={() => setIsNewAdmissionModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center mx-auto"
              >
                <span className="material-icons text-sm mr-1">add</span>
                Add New Admission
              </button>
            </div>
          ) : (
            <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attending Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(patient.admissionDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.room || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.doctor || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleViewPatient(patient.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <span className="material-icons text-sm mr-1">visibility</span>
                        View
                      </button>
                      <button 
                        onClick={() => handleEditPatient(patient.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <span className="material-icons text-sm mr-1">edit</span>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{filteredPatients.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 bg-white text-sm rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center" disabled>
              <span className="material-icons text-sm mr-1">chevron_left</span>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-sm rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center" disabled>
              Next
              <span className="material-icons text-sm ml-1">chevron_right</span>
            </button>
          </div>
          </div>
          </> 
          )}
          </div>
          
          {/* New Admission Modal */}
          <NewAdmissionModal
            isOpen={isNewAdmissionModalOpen}
            onClose={() => setIsNewAdmissionModalOpen(false)}
            onSubmit={handleNewAdmissionSubmit}
          />
          
          {/* Patient Detail Modal */}
          <PatientDetailModal
            isOpen={isPatientDetailModalOpen}
            onClose={() => setIsPatientDetailModalOpen(false)}
            patientId={selectedPatientId}
            onUpdate={handlePatientUpdate}
          />
          </div>
          );
};

export default PatientAdmissionsPage; 