import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  shift: 'Morning' | 'Afternoon' | 'Night' | 'On Call';
  status: 'On Duty' | 'Off Duty' | 'On Leave' | 'Training';
  contactNumber: string;
  email: string;
  specialty?: string;
  notes?: string;
}

const StaffRosterPage: React.FC = () => {
  // Current date for the roster
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Mock data for staff members
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: 'S001',
      name: 'Dr. John Wilson',
      role: 'Physician',
      department: 'Surgery',
      shift: 'Morning',
      status: 'On Duty',
      contactNumber: '555-1234',
      email: 'john.wilson@hospital.org',
      specialty: 'General Surgery'
    },
    {
      id: 'S002',
      name: 'Dr. Maria Martinez',
      role: 'Physician',
      department: 'Orthopedics',
      shift: 'Morning',
      status: 'On Duty',
      contactNumber: '555-2345',
      email: 'maria.martinez@hospital.org',
      specialty: 'Orthopedic Surgery'
    },
    {
      id: 'S003',
      name: 'Dr. David Patel',
      role: 'Physician',
      department: 'Ophthalmology',
      shift: 'Afternoon',
      status: 'Off Duty',
      contactNumber: '555-3456',
      email: 'david.patel@hospital.org',
      specialty: 'Cataract Surgery'
    },
    {
      id: 'S004',
      name: 'Dr. Sarah Johnson',
      role: 'Physician',
      department: 'Internal Medicine',
      shift: 'Night',
      status: 'On Duty',
      contactNumber: '555-4567',
      email: 'sarah.johnson@hospital.org',
      specialty: 'Pulmonology'
    },
    {
      id: 'S005',
      name: 'Nurse Robert Brown',
      role: 'Nurse',
      department: 'ICU',
      shift: 'Morning',
      status: 'On Duty',
      contactNumber: '555-5678',
      email: 'robert.brown@hospital.org'
    },
    {
      id: 'S006',
      name: 'Nurse Emily Davis',
      role: 'Nurse',
      department: 'Emergency',
      shift: 'Afternoon',
      status: 'On Duty',
      contactNumber: '555-6789',
      email: 'emily.davis@hospital.org'
    },
    {
      id: 'S007',
      name: 'Nurse Michael Lee',
      role: 'Nurse',
      department: 'Pediatrics',
      shift: 'Night',
      status: 'On Duty',
      contactNumber: '555-7890',
      email: 'michael.lee@hospital.org'
    },
    {
      id: 'S008',
      name: 'Nurse Jennifer Kim',
      role: 'Nurse',
      department: 'General Ward',
      shift: 'Morning',
      status: 'On Leave',
      contactNumber: '555-8901',
      email: 'jennifer.kim@hospital.org',
      notes: 'Annual leave until 07/25'
    },
    {
      id: 'S009',
      name: 'Tech James Wilson',
      role: 'Technician',
      department: 'Radiology',
      shift: 'Morning',
      status: 'On Duty',
      contactNumber: '555-9012',
      email: 'james.wilson@hospital.org'
    },
    {
      id: 'S010',
      name: 'Admin Lisa Chen',
      role: 'Administrative',
      department: 'Front Desk',
      shift: 'Afternoon',
      status: 'Training',
      contactNumber: '555-0123',
      email: 'lisa.chen@hospital.org',
      notes: 'New system training'
    }
  ]);
  
  // Filter states
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [shiftFilter, setShiftFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
  const StatusBadge: React.FC<{ status: StaffMember['status'] }> = ({ status }) => {
    const badgeClasses = {
      'On Duty': 'bg-green-100 text-green-800',
      'Off Duty': 'bg-gray-100 text-gray-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Training': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[status]}`}>
        {status}
      </span>
    );
  };
  
  // Shift badge component
  const ShiftBadge: React.FC<{ shift: StaffMember['shift'] }> = ({ shift }) => {
    const badgeClasses = {
      'Morning': 'bg-blue-50 text-blue-600',
      'Afternoon': 'bg-orange-50 text-orange-600',
      'Night': 'bg-indigo-50 text-indigo-600',
      'On Call': 'bg-purple-50 text-purple-600'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[shift]}`}>
        {shift}
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
  
  // Filter staff members
  const filteredStaff = staffMembers.filter(staff => {
    const matchesDepartment = departmentFilter ? staff.department === departmentFilter : true;
    const matchesRole = roleFilter ? staff.role === roleFilter : true;
    const matchesStatus = statusFilter ? staff.status === statusFilter : true;
    const matchesShift = shiftFilter ? staff.shift === shiftFilter : true;
    const matchesSearch = searchQuery 
      ? staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        staff.id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesDepartment && matchesRole && matchesStatus && matchesShift && matchesSearch;
  });
  
  // Get unique values for filters
  const departments = Array.from(new Set(staffMembers.map(staff => staff.department)));
  const roles = Array.from(new Set(staffMembers.map(staff => staff.role)));
  const statuses = Array.from(new Set(staffMembers.map(staff => staff.status)));
  const shifts = Array.from(new Set(staffMembers.map(staff => staff.shift)));

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
          <Link to="/organization/wards" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Ward Management">
            <span className="material-icons text-blue-700">bed</span>
          </Link>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end mb-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <span className="material-icons text-sm mr-1">add</span>
          Add Staff Member
        </button>
      </div>
      
      {/* Date Navigation */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex space-x-2">
            <button 
              onClick={goToPreviousDay}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center"
            >
              <span className="material-icons text-sm">chevron_left</span>
            </button>
            <button 
              onClick={goToToday}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md flex items-center"
            >
              <span className="material-icons text-sm mr-1">today</span>
              Today
            </button>
            <button 
              onClick={goToNextDay}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center"
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
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <span className="material-icons mr-2">summarize</span>
          Today's Staff Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">10</p>
            <p className="text-sm text-gray-600">Total Staff</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-green-600">7</p>
            <p className="text-sm text-gray-600">On Duty</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-gray-600">1</p>
            <p className="text-sm text-gray-600">Off Duty</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-yellow-600">2</p>
            <p className="text-sm text-gray-600">On Leave/Training</p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-2.5 text-gray-400">search</span>
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-md pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
            >
              <option value="">All Shifts</option>
              {shifts.map(shift => (
                <option key={shift} value={shift}>{shift}</option>
              ))}
            </select>
          </div>
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center"
            onClick={() => {
              setDepartmentFilter('');
              setRoleFilter('');
              setStatusFilter('');
              setShiftFilter('');
              setSearchQuery('');
            }}
          >
            <span className="material-icons text-sm mr-1">clear</span>
            Clear Filters
          </button>
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
                    {staff.name}
                    {staff.specialty && (
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <span className="material-icons text-xs mr-1 text-gray-400">star</span>
                        {staff.specialty}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{staff.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{staff.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ShiftBadge shift={staff.shift} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={staff.status} />
                    {staff.notes && (
                      <div className="text-xs text-gray-500 mt-1 italic">{staff.notes}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className="material-icons text-xs mr-1 text-gray-400">phone</span>
                      {staff.contactNumber}
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
                setShiftFilter('');
                setSearchQuery('');
              }}
            >
              <span className="material-icons text-sm mr-1">clear_all</span>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffRosterPage; 