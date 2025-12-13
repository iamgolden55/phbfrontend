import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Surgery {
  id: string;
  patientName: string;
  patientId: string;
  procedure: string;
  surgeon: string;
  surgeonId?: string;
  time: string;
  duration: number; // in minutes
  room: string;
  status: 'Completed' | 'In Progress' | 'Upcoming' | 'Canceled';
  notes?: string;
  priority?: 'Normal' | 'Urgent' | 'Emergency';
  anesthesiologist?: string;
}

const SurgerySchedulePage: React.FC = () => {
  // Current date for the schedule
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  // Mock data for surgeries
  const [surgeries, setSurgeries] = useState<Surgery[]>([
    {
      id: 'S1001',
      patientName: 'John Smith',
      patientId: 'P7890',
      procedure: 'Appendectomy',
      surgeon: 'Dr. Wilson',
      surgeonId: 'D112',
      time: '2023-07-15T08:00:00',
      duration: 60,
      room: 'OR-1',
      status: 'Completed',
      anesthesiologist: 'Dr. Reynolds'
    },
    {
      id: 'S1002',
      patientName: 'Maria Garcia',
      patientId: 'P7891',
      procedure: 'Knee Arthroscopy',
      surgeon: 'Dr. Martinez',
      surgeonId: 'D115',
      time: '2023-07-15T09:30:00',
      duration: 90,
      room: 'OR-2',
      status: 'Completed',
      anesthesiologist: 'Dr. Chang'
    },
    {
      id: 'S1003',
      patientName: 'David Lee',
      patientId: 'P7892',
      procedure: 'Cataract Surgery',
      surgeon: 'Dr. Patel',
      surgeonId: 'D118',
      time: '2023-07-15T11:00:00',
      duration: 45,
      room: 'OR-3',
      status: 'In Progress',
      anesthesiologist: 'Dr. Miller'
    },
    {
      id: 'S1004',
      patientName: 'Sarah Johnson',
      patientId: 'P7893',
      procedure: 'Coronary Bypass',
      surgeon: 'Dr. Rodriguez',
      surgeonId: 'D125',
      time: '2023-07-15T13:00:00',
      duration: 240,
      room: 'OR-1',
      status: 'Upcoming',
      priority: 'Urgent',
      notes: 'Patient has history of cardiac issues',
      anesthesiologist: 'Dr. Reynolds'
    },
    {
      id: 'S1005',
      patientName: 'Michael Brown',
      patientId: 'P7894',
      procedure: 'Hip Replacement',
      surgeon: 'Dr. Martinez',
      surgeonId: 'D115',
      time: '2023-07-15T14:30:00',
      duration: 120,
      room: 'OR-2',
      status: 'Upcoming',
      anesthesiologist: 'Dr. Chang'
    },
    {
      id: 'S1006',
      patientName: 'Jessica Taylor',
      patientId: 'P7895',
      procedure: 'Tonsillectomy',
      surgeon: 'Dr. Wilson',
      surgeonId: 'D112',
      time: '2023-07-15T16:00:00',
      duration: 45,
      room: 'OR-3',
      status: 'Upcoming',
      anesthesiologist: 'Dr. Miller'
    }
  ]);

  // Function to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Function to format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate end time
  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const startDate = new Date(startTime);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    return formatTime(endDate.toISOString());
  };

  // Function to get status badge styles
  const getStatusBadgeClasses = (status: Surgery['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'Canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to handle date change
  const handleDateChange = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Function to get priority badge if exists
  const renderPriorityBadge = (priority?: Surgery['priority']) => {
    if (!priority) return null;

    const classes = priority === 'Urgent'
      ? 'bg-orange-100 text-orange-800'
      : priority === 'Emergency'
        ? 'bg-red-100 text-red-800'
        : 'bg-blue-100 text-blue-800';

    return (
      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${classes}`}>
        {priority}
      </span>
    );
  };

  // Group surgeries by room for easier visualization
  const groupedByRoom = surgeries.reduce((acc, surgery) => {
    if (!acc[surgery.room]) {
      acc[surgery.room] = [];
    }
    acc[surgery.room].push(surgery);
    return acc;
  }, {} as Record<string, Surgery[]>);

  // Prepare schedule for visualization
  const rooms = Object.keys(groupedByRoom).sort();

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
          <h1 className="text-2xl font-bold text-blue-800">Surgery Schedule</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/organization/admissions" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Patient Admissions">
            <span className="material-icons text-blue-700">person_add</span>
          </Link>
          <Link to="/organization/departments" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Department Management">
            <span className="material-icons text-blue-700">bed</span>
          </Link>
          <Link to="/organization/staffing" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Staff Roster">
            <span className="material-icons text-blue-700">badge</span>
          </Link>
        </div>
      </div>

      {/* Date Navigation and Controls */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <button
              onClick={() => handleDateChange(-1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-l-md"
            >
              <span className="material-icons text-gray-600">chevron_left</span>
            </button>
            <div className="px-4 font-medium">
              {formatDate(currentDate)}
            </div>
            <button
              onClick={() => handleDateChange(1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-r-md"
            >
              <span className="material-icons text-gray-600">chevron_right</span>
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="ml-2 px-3 py-1 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md"
            >
              Today
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'day'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Week View
              </button>
            </div>

            <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              <span className="material-icons text-sm">add</span>
              <span>New Surgery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Surgeries</p>
              <p className="text-2xl font-bold text-gray-900">{surgeries.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="material-icons text-blue-500">event</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {surgeries.filter(s => s.status === 'Completed').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="material-icons text-green-500">check_circle</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {surgeries.filter(s => s.status === 'In Progress').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <span className="material-icons text-yellow-500">pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-indigo-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {surgeries.filter(s => s.status === 'Upcoming').length}
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <span className="material-icons text-indigo-500">schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">search</span>
              </span>
              <input
                type="text"
                placeholder="Search by ID, patient or surgeon..."
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Operating Room</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">meeting_room</span>
              </span>
              <select className="pl-10 px-3 py-2 border border-gray-300 rounded-md">
                <option value="">All ORs</option>
                {rooms.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
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
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md flex items-center">
            <span className="material-icons text-sm mr-1">filter_alt</span>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Surgery Schedule */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surgery ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procedure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surgeon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {surgeries.map((surgery) => (
                <tr key={surgery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{surgery.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{surgery.patientName}</div>
                      <div className="text-gray-500 text-xs">ID: {surgery.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium">
                      {surgery.procedure}
                      {renderPriorityBadge(surgery.priority)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div>{formatTime(surgery.time)}</div>
                      <div className="text-gray-500 text-xs">
                        ({surgery.duration} min) - {calculateEndTime(surgery.time, surgery.duration)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div className="font-medium">{surgery.surgeon}</div>
                      <div className="text-gray-500 text-xs">{surgery.anesthesiologist}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{surgery.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(surgery.status)}`}>
                      {surgery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View Details"
                      >
                        <span className="material-icons text-sm">visibility</span>
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Update Status"
                      >
                        <span className="material-icons text-sm">update</span>
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <span className="material-icons text-sm">edit</span>
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{surgeries.length}</span> of <span className="font-medium">{surgeries.length}</span> results
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

      {/* Visual Schedule (optional) */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Visual OR Schedule</h2>
        <div className="grid grid-cols-1 gap-4">
          {rooms.map(room => (
            <div key={room} className="border rounded-lg p-3">
              <div className="font-medium text-gray-900 mb-2">{room}</div>
              <div className="relative h-16 bg-gray-100 rounded">
                {groupedByRoom[room].map(surgery => {
                  // Calculate position and width based on time
                  const startTime = new Date(surgery.time);
                  const startHour = startTime.getHours() + startTime.getMinutes() / 60;
                  // Assuming 8am to 6pm (10 hour) schedule
                  const left = ((startHour - 8) / 10) * 100;
                  const width = (surgery.duration / 60 / 10) * 100;

                  // Limit width to stay within bounds
                  const cappedWidth = Math.min(width, 100 - left);

                  const bgColor = surgery.status === 'Completed' ? 'bg-green-200' :
                                 surgery.status === 'In Progress' ? 'bg-blue-200' :
                                 surgery.status === 'Upcoming' ? 'bg-yellow-100' : 'bg-gray-200';

                  return (
                    <div
                      key={surgery.id}
                      className={`absolute h-full ${bgColor} border rounded overflow-hidden text-xs`}
                      style={{
                        left: `${left}%`,
                        width: `${cappedWidth}%`,
                        minWidth: '3%'
                      }}
                      title={`${surgery.procedure} - ${surgery.patientName}`}
                    >
                      <div className="truncate px-1 py-0.5">
                        {surgery.procedure}
                      </div>
                    </div>
                  );
                })}
                {/* Time markers */}
                {[8, 10, 12, 14, 16, 18].map(hour => (
                  <div
                    key={hour}
                    className="absolute bottom-0 w-px h-2 bg-gray-400"
                    style={{ left: `${((hour - 8) / 10) * 100}%` }}
                  >
                    <div className="absolute -left-4 bottom-3 text-xs text-gray-500">
                      {hour > 12 ? `${hour-12}pm` : hour === 12 ? '12pm' : `${hour}am`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SurgerySchedulePage;
