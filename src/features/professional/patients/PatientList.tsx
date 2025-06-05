import React, { useState } from 'react';
import { Patient, PatientFilter } from './patientTypes';
import { usePatients } from './patientContext';

interface PatientListProps {
  onSelectPatient: (patientId: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ onSelectPatient }) => {
  const {
    filteredPatients,
    loading,
    error,
    patientFilter,
    setPatientFilter
  } = usePatients();

  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Handles changes to the search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientFilter({
      ...patientFilter,
      searchTerm: e.target.value
    });
  };

  // Handles changes to the status filter
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatientFilter({
      ...patientFilter,
      status: e.target.value as any
    });
  };

  // Handles changes to the risk level filter
  const handleRiskLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatientFilter({
      ...patientFilter,
      riskLevel: e.target.value as any
    });
  };

  // Handles changes to the flagged filter
  const handleFlaggedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientFilter({
      ...patientFilter,
      flagged: e.target.checked
    });
  };

  // Handles changes to the sort criteria
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatientFilter({
      ...patientFilter,
      sortBy: e.target.value as any
    });
  };

  // Toggles the sort order
  const toggleSortOrder = () => {
    setPatientFilter({
      ...patientFilter,
      sortOrder: patientFilter.sortOrder === 'asc' ? 'desc' : 'asc'
    });
  };

  // Renders the risk level badge
  const renderRiskBadge = (riskLevel?: string) => {
    if (!riskLevel) return null;

    const badgeColor =
      riskLevel === 'high' ? 'bg-red-100 text-red-800' :
      riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
      'bg-green-100 text-green-800';

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </span>
    );
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'None';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filter Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Patient List</h2>
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
          >
            <span className="material-icons text-sm mr-1">
              {isFilterExpanded ? 'expand_less' : 'expand_more'}
            </span>
            {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients by name, PHB ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={patientFilter.searchTerm || ''}
            onChange={handleSearchChange}
          />
          <span className="material-icons absolute left-3 top-2.5 text-gray-400">search</span>
        </div>

        {/* Expanded Filter Options */}
        {isFilterExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={patientFilter.status || 'all'}
                onChange={handleStatusChange}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            <div>
              <label htmlFor="risk-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Risk Level
              </label>
              <select
                id="risk-filter"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={patientFilter.riskLevel || 'all'}
                onChange={handleRiskLevelChange}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <div className="flex">
                <select
                  id="sort-by"
                  className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={patientFilter.sortBy || 'name'}
                  onChange={handleSortByChange}
                >
                  <option value="name">Patient Name</option>
                  <option value="lastAppointment">Last Appointment</option>
                  <option value="nextAppointment">Next Appointment</option>
                  <option value="riskLevel">Risk Level</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 hover:bg-gray-200 focus:outline-none"
                >
                  <span className="material-icons">
                    {patientFilter.sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="flagged-filter"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={patientFilter.flagged || false}
                onChange={handleFlaggedChange}
              />
              <label htmlFor="flagged-filter" className="ml-2 block text-sm text-gray-700">
                Show flagged patients only
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Patient List */}
      <div className="overflow-hidden">
        {filteredPatients.length === 0 ? (
          <div className="p-8 text-center">
            <span className="material-icons text-gray-400 text-5xl mb-2">person_search</span>
            <p className="text-gray-500">No patients found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PHB ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Appointment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Appointment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className={`hover:bg-blue-50 cursor-pointer ${patient.flagged ? 'bg-red-50' : ''}`}
                    onClick={() => onSelectPatient(patient.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full">
                          {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            DOB: {formatDate(patient.dateOfBirth)}
                          </div>
                        </div>
                        {patient.flagged && (
                          <span className="ml-2 material-icons text-red-500" title={patient.flagReason || 'Flagged patient'}>
                            flag
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.hpn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.lastAppointment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.nextAppointment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderRiskBadge(patient.riskLevel)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${patient.status === 'active' ? 'bg-green-100 text-green-800' :
                          patient.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'}`}
                      >
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
