import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';

interface PatientRegistration {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

const PatientRegistrationApprovalPage: React.FC = () => {
  const { organizationInfo } = useOrganizationAuth();

  // Mock data for pending registrations
  const [registrations, setRegistrations] = useState<PatientRegistration[]>([
    {
      id: 'REG-7834',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      dateOfBirth: '1985-04-12',
      gender: 'Male',
      address: '123 Main St, Anytown, NY 10001',
      phoneNumber: '+1 555-123-4567',
      insuranceProvider: 'Blue Cross',
      insuranceNumber: 'BC-12345678',
      registrationDate: '2025-04-25T14:32:00',
      status: 'pending',
    },
    {
      id: 'REG-7835',
      name: 'Emma Thompson',
      email: 'emma.thompson@example.com',
      dateOfBirth: '1992-09-23',
      gender: 'Female',
      address: '456 Oak Ave, Springfield, IL 62701',
      phoneNumber: '+1 555-987-6543',
      insuranceProvider: 'Aetna',
      insuranceNumber: 'AET-87654321',
      registrationDate: '2025-04-25T16:45:00',
      status: 'pending',
    },
    {
      id: 'REG-7836',
      name: 'Michael Davis',
      email: 'michael.davis@example.com',
      dateOfBirth: '1978-11-30',
      gender: 'Male',
      address: '789 Pine Blvd, Metropolis, CA 90001',
      phoneNumber: '+1 555-456-7890',
      registrationDate: '2025-04-26T09:15:00',
      status: 'pending',
      notes: 'Previous patient returning after 3 years'
    },
    {
      id: 'REG-7837',
      name: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      dateOfBirth: '2001-02-14',
      gender: 'Female',
      address: '101 Cedar St, River City, TX 75001',
      phoneNumber: '+1 555-222-3333',
      insuranceProvider: 'United Healthcare',
      insuranceNumber: 'UH-11223344',
      registrationDate: '2025-04-26T11:20:00',
      status: 'pending',
    },
    {
      id: 'REG-7838',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      dateOfBirth: '1965-07-07',
      gender: 'Male',
      address: '202 Maple Dr, Lakeside, FL 33101',
      phoneNumber: '+1 555-888-9999',
      insuranceProvider: 'Medicare',
      insuranceNumber: 'MC-99887766',
      registrationDate: '2025-04-27T08:05:00',
      status: 'pending',
      notes: 'Patient has mobility issues'
    },
  ]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  // Handle approval action
  const handleApprove = (id: string) => {
    setRegistrations(registrations.map(reg =>
      reg.id === id ? { ...reg, status: 'approved' } : reg
    ));
  };

  // Handle rejection action
  const handleReject = (id: string) => {
    setRegistrations(registrations.map(reg =>
      reg.id === id ? { ...reg, status: 'rejected' } : reg
    ));
  };

  // Modal for viewing detailed patient information
  const [selectedPatient, setSelectedPatient] = useState<PatientRegistration | null>(null);

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
          <h1 className="text-2xl font-bold text-blue-800">Patient Registration Approval</h1>
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

      {/* Status summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Registrations</p>
              <p className="text-2xl font-bold text-gray-900">{registrations.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="material-icons text-blue-500">how_to_reg</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {registrations.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <span className="material-icons text-yellow-500">pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {registrations.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="material-icons text-green-500">check_circle</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {registrations.filter(r => r.status === 'rejected').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <span className="material-icons text-red-500">cancel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter controls */}
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
                placeholder="Search by name, ID or email..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
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

      {/* Patient Registrations Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{registration.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-3">
                        {registration.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{registration.name}</div>
                        <div className="text-gray-500 text-xs">{registration.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(registration.dateOfBirth).toLocaleDateString()}
                    <div className="text-xs">
                      ({registration.gender})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(registration.registrationDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          registration.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'}`}
                    >
                      {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {registration.insuranceProvider ? (
                      <div>
                        <div>{registration.insuranceProvider}</div>
                        <div className="text-xs text-gray-400">#{registration.insuranceNumber}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => setSelectedPatient(registration)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View Details"
                      >
                        <span className="material-icons text-sm">visibility</span>
                      </button>

                      {registration.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(registration.id)}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Approve"
                          >
                            <span className="material-icons text-sm">check_circle</span>
                          </button>

                          <button
                            onClick={() => handleReject(registration.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Reject"
                          >
                            <span className="material-icons text-sm">cancel</span>
                          </button>
                        </>
                      )}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{registrations.length}</span> of <span className="font-medium">{registrations.length}</span> results
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

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Patient Registration Details</h3>
                <button onClick={() => setSelectedPatient(null)} className="text-gray-400 hover:text-gray-500">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-3">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-medium">{selectedPatient.name}</h4>
                  <p className="text-gray-600">{selectedPatient.email}</p>
                </div>
                <div className="ml-auto">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${selectedPatient.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        selectedPatient.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}
                  >
                    {selectedPatient.status.charAt(0).toUpperCase() + selectedPatient.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Registration ID</h5>
                  <p className="mt-1">{selectedPatient.id}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Registration Date</h5>
                  <p className="mt-1">{formatDate(selectedPatient.registrationDate)}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Date of Birth</h5>
                  <p className="mt-1">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Gender</h5>
                  <p className="mt-1">{selectedPatient.gender}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Phone Number</h5>
                  <p className="mt-1">{selectedPatient.phoneNumber}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Address</h5>
                  <p className="mt-1">{selectedPatient.address}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Insurance Provider</h5>
                  <p className="mt-1">{selectedPatient.insuranceProvider || '—'}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500">Insurance Number</h5>
                  <p className="mt-1">{selectedPatient.insuranceNumber || '—'}</p>
                </div>
              </div>

              {selectedPatient.notes && (
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Notes</h5>
                  <p className="p-3 bg-gray-50 rounded-lg text-sm">{selectedPatient.notes}</p>
                </div>
              )}

              {selectedPatient.status === 'pending' && (
                <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      handleReject(selectedPatient.id);
                      setSelectedPatient(null);
                    }}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                  >
                    Reject Registration
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedPatient.id);
                      setSelectedPatient(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve Registration
                  </button>
                </div>
              )}

              {selectedPatient.status !== 'pending' && (
                <div className="border-t border-gray-200 pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRegistrationApprovalPage;
