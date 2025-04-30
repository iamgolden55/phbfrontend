import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  age: number;
  admissionDate: string;
  status: 'Admitted' | 'Pending' | 'Discharged';
  reason: string;
  room?: string;
  doctor?: string;
}

const PatientAdmissionsPage: React.FC = () => {
  // Mock data for patient admissions
  const [patients, setPatients] = useState<Patient[]>([
    { 
      id: 'P7890', 
      name: 'John Smith', 
      age: 45, 
      admissionDate: '2023-07-15T10:30:00',
      status: 'Admitted',
      reason: 'Scheduled Surgery',
      room: '304A',
      doctor: 'Dr. Wilson'
    },
    { 
      id: 'P7891', 
      name: 'Maria Garcia', 
      age: 62, 
      admissionDate: '2023-07-15T09:15:00',
      status: 'Admitted',
      reason: 'Pneumonia',
      room: '212B',
      doctor: 'Dr. Johnson'
    },
    { 
      id: 'P7892', 
      name: 'David Lee', 
      age: 28, 
      admissionDate: '2023-07-14T15:45:00',
      status: 'Admitted',
      reason: 'Appendicitis',
      room: '105C',
      doctor: 'Dr. Martinez'
    },
    { 
      id: 'P7893', 
      name: 'Sarah Williams', 
      age: 35, 
      admissionDate: '2023-07-15T11:00:00',
      status: 'Pending',
      reason: 'Diagnostic Tests',
    },
    { 
      id: 'P7894', 
      name: 'Robert Brown', 
      age: 71, 
      admissionDate: '2023-07-14T08:30:00',
      status: 'Discharged',
      reason: 'Cardiac Monitoring',
      doctor: 'Dr. Patel'
    },
  ]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: Patient['status'] }> = ({ status }) => {
    const badgeClasses = {
      Admitted: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Discharged: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[status]}`}>
        {status}
      </span>
    );
  };

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
          <Link to="/organization/wards" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Ward Management">
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
      
      {/* Action buttons */}
      <div className="flex justify-end mb-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <span className="material-icons text-sm mr-1">add</span>
          New Admission
        </button>
      </div>
      
      {/* Filters/Search - can be expanded */}
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
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">filter_list</span>
              </span>
              <select className="pl-10 px-3 py-2 border border-gray-300 rounded-md">
                <option value="">All Statuses</option>
                <option value="Admitted">Admitted</option>
                <option value="Pending">Pending</option>
                <option value="Discharged">Discharged</option>
              </select>
            </div>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">date_range</span>
              </span>
              <select className="pl-10 px-3 py-2 border border-gray-300 rounded-md">
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md flex items-center">
            <span className="material-icons text-sm mr-1">filter_alt</span>
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Patient Admissions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
              {patients.map((patient) => (
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
        
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
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
      </div>
    </div>
  );
};

export default PatientAdmissionsPage; 