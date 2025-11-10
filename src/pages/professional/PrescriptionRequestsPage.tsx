import React, { useState, useEffect } from 'react';
import {
  fetchDoctorPrescriptionRequests,
  DoctorPrescriptionRequest,
  DoctorPrescriptionRequestsResponse
} from '../../features/health/prescriptionsService';
import { Alert, AlertCircle, Search, Filter, Clock, User, AlertTriangle } from 'lucide-react';
import PrescriptionRequestModal from '../../components/PrescriptionRequestModal';

type TabView = 'pending' | 'approved' | 'rejected' | 'all';
type UrgencyFilter = 'all' | 'urgent' | 'routine';

const PrescriptionRequestsPage: React.FC = () => {
  const [view, setView] = useState<TabView>('pending');
  const [requests, setRequests] = useState<DoctorPrescriptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    urgent: 0,
    total: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>('all');

  // Modal state
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Load requests on mount and when view changes
  useEffect(() => {
    loadRequests();
  }, [view]);

  const loadRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      // Map tab view to API status filter
      const statusMap: Record<TabView, 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'ALL'> = {
        pending: 'REQUESTED',
        approved: 'APPROVED',
        rejected: 'REJECTED',
        all: 'ALL',
      };

      const response: DoctorPrescriptionRequestsResponse = await fetchDoctorPrescriptionRequests(
        statusMap[view]
      );

      setRequests(response.requests || []);
      setSummary({
        pending: response.pending_count || 0,
        approved: 0, // TODO: backend should provide this
        rejected: 0, // TODO: backend should provide this
        urgent: response.urgent_count || 0,
        total: response.total_count || 0,
      });
    } catch (err) {
      console.error('Error loading prescription requests:', err);
      setError('Failed to load prescription requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter requests based on search and urgency
  const filteredRequests = requests.filter(request => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      request.patient_name.toLowerCase().includes(searchLower) ||
      request.patient_hpn.toLowerCase().includes(searchLower) ||
      request.request_reference.toLowerCase().includes(searchLower);

    // Urgency filter
    const matchesUrgency =
      urgencyFilter === 'all' ||
      request.urgency === urgencyFilter;

    return matchesSearch && matchesUrgency;
  });

  // Sort: urgent first, then by date (newest first)
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    // Urgent requests always come first
    if (a.urgency === 'urgent' && b.urgency !== 'urgent') return -1;
    if (a.urgency !== 'urgent' && b.urgency === 'urgent') return 1;

    // Then sort by date (newest first)
    return new Date(b.request_date).getTime() - new Date(a.request_date).getTime();
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      REQUESTED: 'bg-blue-100 text-blue-800 border-blue-200',
      APPROVED: 'bg-green-100 text-green-800 border-green-200',
      REJECTED: 'bg-red-100 text-red-800 border-red-200',
      DISPENSED: 'bg-purple-100 text-purple-800 border-purple-200',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescription Requests</h1>
          <p className="text-gray-600">Review and manage prescription requests from patients</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{summary.pending}</p>
            <p className="text-sm text-gray-600">Pending Requests</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
            <p className="text-2xl font-bold text-red-600 flex items-center gap-2">
              {summary.urgent}
              {summary.urgent > 0 && <AlertTriangle className="w-5 h-5" />}
            </p>
            <p className="text-sm text-gray-600">🚨 Urgent Requests</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-2xl font-bold text-green-600">{summary.approved}</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-gray-400">
            <p className="text-2xl font-bold text-gray-700">{summary.total}</p>
            <p className="text-sm text-gray-600">Total Requests</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setView('pending')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  view === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending ({summary.pending})
              </button>
              <button
                onClick={() => setView('approved')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  view === 'approved'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setView('rejected')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  view === 'rejected'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rejected
              </button>
              <button
                onClick={() => setView('all')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  view === 'all'
                    ? 'border-gray-500 text-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Requests
              </button>
            </nav>
          </div>

          {/* Filters */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search patient name, HPN, or reference..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Urgency Filter */}
              <div className="w-full md:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={urgencyFilter}
                    onChange={(e) => setUrgencyFilter(e.target.value as UrgencyFilter)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Urgency</option>
                    <option value="urgent">🚨 Urgent Only</option>
                    <option value="routine">Routine Only</option>
                  </select>
                </div>
              </div>

              {/* Refresh Button */}
              <button
                onClick={loadRequests}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Requests Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Error Loading Requests</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            ) : sortedRequests.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">No prescription requests found</p>
                <p className="text-gray-500 text-sm mt-1">
                  {searchQuery || urgencyFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'New requests will appear here'}
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedRequests.map((request) => (
                    <tr
                      key={request.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        request.urgency === 'urgent' ? 'bg-red-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{request.patient_name}</p>
                            <p className="text-sm text-gray-500">{request.patient_hpn}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm text-gray-700">
                          {request.request_reference}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {formatDate(request.request_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          {request.medications.length} medication{request.medications.length !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.urgency === 'urgent' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold border border-red-200">
                            🚨 URGENT
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            Routine
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedRequestId(request.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Prescription Request Modal */}
      {selectedRequestId && (
        <PrescriptionRequestModal
          requestId={selectedRequestId}
          onClose={() => setSelectedRequestId(null)}
          onApprove={() => {
            setSelectedRequestId(null);
            loadRequests(); // Refresh the list after approval
          }}
          onReject={() => {
            setSelectedRequestId(null);
            loadRequests(); // Refresh the list after rejection
          }}
        />
      )}
    </div>
  );
};

export default PrescriptionRequestsPage;
