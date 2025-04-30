import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define emergency protocol types
interface EmergencyProtocol {
  id: string;
  title: string;
  type: 'medical' | 'disaster' | 'security' | 'facility';
  priority: 'critical' | 'high' | 'medium' | 'standard';
  updatedDate: string;
  version: string;
  description: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  department: string;
  primaryPhone: string;
  secondaryPhone?: string;
  email: string;
  isOnCall: boolean;
}

const EmergencyPage: React.FC = () => {
  // Sample emergency protocols
  const [protocols, setProtocols] = useState<EmergencyProtocol[]>([
    {
      id: 'EP001',
      title: 'Code Blue: Cardiac Arrest',
      type: 'medical',
      priority: 'critical',
      updatedDate: '2025-04-15',
      version: '2.3',
      description: 'Immediate response protocol for cardiac arrest situations. Requires crash cart, defibrillator, and ACLS-certified personnel.'
    },
    {
      id: 'EP002',
      title: 'Mass Casualty Incident Response',
      type: 'disaster',
      priority: 'critical',
      updatedDate: '2025-03-22',
      version: '3.1',
      description: 'Comprehensive response plan for handling large numbers of injured patients simultaneously. Includes triage procedures and resource allocation guidelines.'
    },
    {
      id: 'EP003',
      title: 'Hospital Evacuation Plan',
      type: 'facility',
      priority: 'high',
      updatedDate: '2025-02-10',
      version: '1.7',
      description: 'Step-by-step procedures for safely evacuating patients, visitors, and staff during emergencies requiring building evacuation.'
    },
    {
      id: 'EP004',
      title: 'Hazardous Material Spill',
      type: 'facility',
      priority: 'high',
      updatedDate: '2025-01-28',
      version: '2.0',
      description: 'Containment and cleanup protocols for chemical, biological, or radioactive material spills within hospital facilities.'
    },
    {
      id: 'EP005',
      title: 'Code Silver: Active Shooter',
      type: 'security',
      priority: 'critical',
      updatedDate: '2025-04-02',
      version: '2.5',
      description: 'Response procedures for active shooter or armed threat situations. Follows Run-Hide-Fight principles and coordinates with law enforcement.'
    },
    {
      id: 'EP006',
      title: 'Severe Weather Response',
      type: 'disaster',
      priority: 'medium',
      updatedDate: '2024-12-15',
      version: '1.4',
      description: 'Preparedness and response plan for hurricanes, tornadoes, severe storms, and other extreme weather events affecting the facility.'
    },
    {
      id: 'EP007',
      title: 'Utility Failure Protocol',
      type: 'facility',
      priority: 'medium',
      updatedDate: '2025-01-05',
      version: '1.2',
      description: 'Procedures for responding to power outages, water supply disruptions, HVAC failures, or medical gas system failures.'
    },
    {
      id: 'EP008',
      title: 'Code Pink: Infant/Child Abduction',
      type: 'security',
      priority: 'critical',
      updatedDate: '2025-03-10',
      version: '2.1',
      description: 'Immediate lockdown and search protocols to prevent unauthorized removal of infants or children from the facility.'
    },
    {
      id: 'EP009',
      title: 'Pandemic/Epidemic Response',
      type: 'medical',
      priority: 'high',
      updatedDate: '2025-02-18',
      version: '4.2',
      description: 'Comprehensive infection control, patient surge management, and resource allocation plan for widespread infectious disease outbreaks.'
    },
    {
      id: 'EP010',
      title: 'Bomb Threat Protocol',
      type: 'security',
      priority: 'high',
      updatedDate: '2024-11-30',
      version: '1.6',
      description: 'Procedures for threat assessment, facility searches, and evacuation decisions in response to bomb threats.'
    },
  ]);

  // Sample emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: 'EC001',
      name: 'Dr. Samuel Wilson',
      role: 'Emergency Management Director',
      department: 'Administration',
      primaryPhone: '555-123-4567',
      secondaryPhone: '555-987-6543',
      email: 'samuel.wilson@hospital.org',
      isOnCall: true
    },
    {
      id: 'EC002',
      name: 'Dr. Jennifer Martinez',
      role: 'Chief of Emergency Medicine',
      department: 'Emergency',
      primaryPhone: '555-234-5678',
      email: 'jennifer.martinez@hospital.org',
      isOnCall: true
    },
    {
      id: 'EC003',
      name: 'Michael Chang',
      role: 'Security Director',
      department: 'Security',
      primaryPhone: '555-345-6789',
      secondaryPhone: '555-888-9999',
      email: 'michael.chang@hospital.org',
      isOnCall: true
    },
    {
      id: 'EC004',
      name: 'Sarah Johnson',
      role: 'Facilities Manager',
      department: 'Facilities',
      primaryPhone: '555-456-7890',
      email: 'sarah.johnson@hospital.org',
      isOnCall: false
    },
    {
      id: 'EC005',
      name: 'Robert Davis',
      role: 'Chief Nursing Officer',
      department: 'Nursing',
      primaryPhone: '555-567-8901',
      email: 'robert.davis@hospital.org',
      isOnCall: true
    }
  ]);

  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'protocols' | 'contacts' | 'drills'>('protocols');

  // Filter protocols
  const filteredProtocols = protocols.filter(protocol => {
    const matchesType = typeFilter === 'all' || protocol.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || protocol.priority === priorityFilter;
    const matchesSearch = searchQuery === '' ||
      protocol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesPriority && matchesSearch;
  });

  // Helper for priority badge colors
  const getPriorityBadgeColor = (priority: EmergencyProtocol['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper for type badge colors
  const getTypeBadgeColor = (type: EmergencyProtocol['type']) => {
    switch (type) {
      case 'medical':
        return 'bg-blue-50 text-blue-700';
      case 'disaster':
        return 'bg-purple-50 text-purple-700';
      case 'security':
        return 'bg-red-50 text-red-700';
      case 'facility':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Type badge component
  const TypeBadge: React.FC<{ type: EmergencyProtocol['type'] }> = ({ type }) => {
    const colorClass = getTypeBadgeColor(type);
    const typeLabels = {
      medical: 'Medical',
      disaster: 'Disaster',
      security: 'Security',
      facility: 'Facility'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {typeLabels[type]}
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge: React.FC<{ priority: EmergencyProtocol['priority'] }> = ({ priority }) => {
    const colorClass = getPriorityBadgeColor(priority);
    const priorityLabels = {
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      standard: 'Standard'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {priorityLabels[priority]}
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
          <h1 className="text-2xl font-bold text-blue-800">Emergency Protocols</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/organization/analytics" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Analytics Dashboard">
            <span className="material-icons text-blue-700">analytics</span>
          </Link>
          <Link to="/organization/staffing" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Staff Roster">
            <span className="material-icons text-blue-700">badge</span>
          </Link>
          <Link to="/organization/inventory" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Inventory">
            <span className="material-icons text-blue-700">inventory_2</span>
          </Link>
        </div>
      </div>

      {/* Emergency Alert Banner */}
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="material-icons text-red-600">warning</span>
          </div>
          <div className="ml-3">
            <h3 className="text-red-800 font-medium">No Active Emergencies</h3>
            <p className="text-red-700 text-sm">
              No emergency protocols are currently activated. Use this dashboard to review and manage protocols.
            </p>
            <button className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm flex items-center">
              <span className="material-icons text-sm mr-1">notifications_active</span>
              Activate Emergency Protocol
            </button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end mb-6 space-x-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <span className="material-icons text-sm mr-1">add</span>
          New Protocol
        </button>
        <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md flex items-center">
          <span className="material-icons text-sm mr-1">print</span>
          Print All
        </button>
        <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md flex items-center">
          <span className="material-icons text-sm mr-1">play_arrow</span>
          Start Drill
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('protocols')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'protocols'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="material-icons text-sm mr-1 align-text-bottom">description</span>
            Protocols
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contacts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="material-icons text-sm mr-1 align-text-bottom">contacts</span>
            Emergency Contacts
          </button>
          <button
            onClick={() => setActiveTab('drills')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'drills'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="material-icons text-sm mr-1 align-text-bottom">event</span>
            Scheduled Drills
          </button>
        </nav>
      </div>

      {activeTab === 'protocols' && (
        <>
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Protocols</label>
                <div className="relative">
                  <span className="material-icons absolute left-3 top-2.5 text-gray-400">search</span>
                  <input
                    type="text"
                    placeholder="Search by title or description..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Protocol Type</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="medical">Medical</option>
                  <option value="disaster">Disaster</option>
                  <option value="security">Security</option>
                  <option value="facility">Facility</option>
                </select>
              </div>
              <div className="w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center"
                onClick={() => {
                  setTypeFilter('all');
                  setPriorityFilter('all');
                  setSearchQuery('');
                }}
              >
                <span className="material-icons text-sm mr-1">clear</span>
                Clear Filters
              </button>
            </div>
          </div>

          {/* Protocol Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProtocols.map(protocol => (
              <div key={protocol.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <TypeBadge type={protocol.type} />
                  <PriorityBadge priority={protocol.priority} />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">{protocol.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{protocol.description}</p>
                  <div className="text-xs text-gray-500 mb-3 flex items-center">
                    <span className="material-icons text-xs mr-1">update</span>
                    Updated: {protocol.updatedDate} (v{protocol.version})
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <span className="material-icons text-sm mr-1">visibility</span>
                      View Details
                    </button>
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100">
                        <span className="material-icons text-sm">file_download</span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100">
                        <span className="material-icons text-sm">print</span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100">
                        <span className="material-icons text-sm">share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProtocols.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <span className="material-icons text-6xl text-gray-400 mb-3">folder_open</span>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No protocols found</h3>
              <p className="text-gray-500 mb-4">We couldn't find any protocols matching your filters.</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center mx-auto"
                onClick={() => {
                  setTypeFilter('all');
                  setPriorityFilter('all');
                  setSearchQuery('');
                }}
              >
                <span className="material-icons text-sm mr-1">refresh</span>
                Reset Filters
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === 'contacts' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                <span className="material-icons mr-2">contacts</span>
                Emergency Response Team
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center mt-2 sm:mt-0">
                <span className="material-icons text-sm mr-1">add</span>
                Add Contact
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              These individuals are responsible for coordinating emergency responses within the hospital.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {emergencyContacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-800 font-bold">{contact.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{contact.department}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <span className="material-icons text-xs mr-1 text-gray-400">phone</span>
                        {contact.primaryPhone}
                      </div>
                      {contact.secondaryPhone && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="material-icons text-xs mr-1 text-gray-400">phone</span>
                          {contact.secondaryPhone}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="material-icons text-xs mr-1 text-gray-400">email</span>
                        {contact.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {contact.isOnCall ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          On Call
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                          <span className="material-icons text-sm">call</span>
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                          <span className="material-icons text-sm">mail</span>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100">
                          <span className="material-icons text-sm">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'drills' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                <span className="material-icons mr-2">event</span>
                Emergency Drill Schedule
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center mt-2 sm:mt-0">
                <span className="material-icons text-sm mr-1">add</span>
                Schedule New Drill
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Regular drills ensure staff readiness for emergency situations. All departments must participate.
            </p>
          </div>

          <div className="p-8 text-center">
            <div className="inline-block bg-blue-50 rounded-full p-8 mb-4">
              <span className="material-icons text-blue-500 text-5xl">calendar_month</span>
            </div>
            <h3 className="text-lg font-medium mb-2">No upcoming drills scheduled</h3>
            <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
              Regular emergency drills are critical for maintaining readiness. Schedule your next drill using the button above.
            </p>
            <div className="inline-block bg-gray-100 rounded-md p-4 text-sm text-gray-700 mb-4">
              <p className="font-medium">Last Completed Drill:</p>
              <p>Code Blue Response Drill - March 15, 2025</p>
              <p className="text-xs text-green-600 mt-1">All teams passed assessment</p>
            </div>

            <div className="flex flex-wrap justify-center mt-4 gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm flex items-center">
                <span className="material-icons text-sm mr-1">description</span>
                View Past Drill Reports
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm flex items-center">
                <span className="material-icons text-sm mr-1">play_circle</span>
                Start Unannounced Drill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyPage;
