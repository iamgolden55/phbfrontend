import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy StatusBadge component for demonstration
const StatusBadge = ({ status }) => {
  let color = '';
  let label = status;
  switch (status) {
    case 'Available':
      color = 'bg-green-100 text-green-700';
      break;
    case 'Occupied':
      color = 'bg-orange-100 text-orange-700';
      break;
    case 'Reserved':
      color = 'bg-blue-100 text-blue-700';
      break;
    case 'Maintenance':
      color = 'bg-gray-100 text-gray-700';
      break;
    default:
      color = 'bg-gray-100 text-gray-700';
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

// Dummy data for demonstration
const dummyWards = [
  {
    id: 1,
    name: 'ICU North',
    type: 'ICU',
    floor: '2nd Floor',
    capacity: 10,
    bedsOccupied: 8,
    bedsAvailable: 2,
    occupancyRate: 80,
    chargeNurse: 'Nurse Joy',
    beds: [
      {
        id: 101,
        bedNumber: 'ICU-1',
        status: 'Occupied',
        patientName: 'John Doe',
        patientId: 'P123',
        doctorName: 'Dr. Smith',
        careLevel: 'Critical',
        admissionDate: '2024-06-01',
        expectedDischarge: '2024-06-10',
        notes: '',
      },
      {
        id: 102,
        bedNumber: 'ICU-2',
        status: 'Available',
        patientName: null,
        patientId: null,
        doctorName: null,
        careLevel: null,
        admissionDate: null,
        expectedDischarge: null,
        notes: '',
      },
      // ...more beds
    ],
  },
  {
    id: 2,
    name: 'Pediatric West',
    type: 'Pediatric',
    floor: '3rd Floor',
    capacity: 12,
    bedsOccupied: 6,
    bedsAvailable: 6,
    occupancyRate: 50,
    chargeNurse: 'Nurse Jenny',
    beds: [
      {
        id: 201,
        bedNumber: 'PED-1',
        status: 'Occupied',
        patientName: 'Jane Smith',
        patientId: 'P456',
        doctorName: 'Dr. Adams',
        careLevel: 'Moderate',
        admissionDate: '2024-06-03',
        expectedDischarge: '2024-06-12',
        notes: '',
      },
      {
        id: 202,
        bedNumber: 'PED-2',
        status: 'Available',
        patientName: null,
        patientId: null,
        doctorName: null,
        careLevel: null,
        admissionDate: null,
        expectedDischarge: null,
        notes: '',
      },
      // ...more beds
    ],
  },
  // ...more wards
];

const WardManagementPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWardId, setActiveWardId] = useState(dummyWards[0]?.id || null);
  const [filterStatus, setFilterStatus] = useState('');

  const filteredWards = dummyWards.filter(ward =>
    ward.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeWard = dummyWards.find(ward => ward.id === activeWardId);

  // Calculate hospital overview stats
  const totalBeds = dummyWards.reduce((sum, ward) => sum + ward.capacity, 0);
  const totalAvailable = dummyWards.reduce((sum, ward) => sum + ward.bedsAvailable, 0);
  const totalOccupied = dummyWards.reduce((sum, ward) => sum + ward.bedsOccupied, 0);
  const totalReservedMaintenance = dummyWards.reduce(
    (sum, ward) =>
      sum +
      (ward.beds
        ? ward.beds.filter(
            bed => bed.status === 'Reserved' || bed.status === 'Maintenance'
          ).length
        : 0),
    0
  );

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
          <h1 className="text-2xl font-bold text-blue-800">Ward Management</h1>
        </div>
        <div className="flex space-x-2">
          <Link
            to="/organization/admissions"
            className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full"
            title="Patient Admissions"
          >
            <span className="material-icons text-blue-700">person_add</span>
          </Link>
          <Link
            to="/organization/surgery-schedule"
            className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full"
            title="Surgery Schedule"
          >
            <span className="material-icons text-blue-700">calendar_month</span>
          </Link>
          <Link
            to="/organization/staffing"
            className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full"
            title="Staff Roster"
          >
            <span className="material-icons text-blue-700">badge</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WardManagementPage;
