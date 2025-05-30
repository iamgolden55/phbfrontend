import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Types for the registration data - Updated to match actual backend response
interface UserRegistration {
  id: number;
  user: {
    email: string;
    date_of_birth: string;
    gender: string;
    country: string;
    city: string;
    phone: string;
    state: string;
    nin: string;
    hpn: string;
    consent_terms: boolean;
    consent_hipaa: boolean;
    consent_data_processing: boolean;
    preferred_language: string;
    secondary_languages: string[];
    custom_language: string | null;
  };
  hospital: {
    id: number;
    name: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  is_primary: boolean;
  created_at: string;
  approved_date?: string;
}

interface UserRegistrationsPanelProps {
  className?: string;
}

// Reusable Card Component
const DashboardCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ 
  title, children, className 
}) => (
  <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 ${className}`}>
    <h2 className="text-lg font-semibold text-blue-900 mb-4 tracking-tight">{title}</h2>
    {children}
  </div>
);

const UserRegistrationsPanel: React.FC<UserRegistrationsPanelProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [pendingRegistrations, setPendingRegistrations] = useState<UserRegistration[]>([]);
  const [approvedRegistrations, setApprovedRegistrations] = useState<UserRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  // 🎉 NEW: Pagination and Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRegistrations, setFilteredRegistrations] = useState<UserRegistration[]>([]);
  const itemsPerPage = 10;

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Fetch registrations from backend
  const fetchRegistrations = async (status: 'pending' | 'approved') => {
    try {
      let token = null;
      const organizationAuth = localStorage.getItem('organizationAuth');
      if (organizationAuth) {
        try {
          const authData = JSON.parse(organizationAuth);
          token = authData.tokens?.access;
        } catch (e) {
          console.error('Failed to parse organization auth data:', e);
        }
      }
      
      const apiUrl = `${API_BASE_URL}/api/hospitals/registrations/?status=${status}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch ${status} registrations: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error(`Error fetching ${status} registrations:`, err);
      throw err;
    }
  };

  // 🔍 NEW: Search and Filter Logic
  const performSearch = (registrations: UserRegistration[], query: string) => {
    if (!query.trim()) return registrations;
    
    const searchTerm = query.toLowerCase().trim();
    
    return registrations.filter((registration) => {
      const email = registration.user?.email?.toLowerCase() || '';
      const phone = registration.user?.phone?.toLowerCase() || '';
      const nin = registration.user?.nin?.toLowerCase() || '';
      const hpn = registration.user?.hpn?.toLowerCase() || '';
      const city = registration.user?.city?.toLowerCase() || '';
      
      // Extract potential first/last name from email (before @)
      const emailName = email.split('@')[0].toLowerCase();
      
      return (
        email.includes(searchTerm) ||
        phone.includes(searchTerm) ||
        nin.includes(searchTerm) ||
        hpn.includes(searchTerm) ||
        city.includes(searchTerm) ||
        emailName.includes(searchTerm)
      );
    });
  };
  
  // 📊 NEW: Update filtered data when search or tab changes
  useEffect(() => {
    const currentRegistrations = activeTab === 'pending' ? pendingRegistrations : approvedRegistrations;
    const filtered = performSearch(currentRegistrations, searchQuery);
    setFilteredRegistrations(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [activeTab, pendingRegistrations, approvedRegistrations, searchQuery]);
  
  // 📊 NEW: Pagination Logic
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredRegistrations.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [pending, approved] = await Promise.all([
          fetchRegistrations('pending'),
          fetchRegistrations('approved')
        ]);

        setPendingRegistrations(pending);
        setApprovedRegistrations(approved);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load registrations');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Approve registration
  const handleApprove = async (registrationId: number) => {
    setActionLoading(registrationId);
    try {
      let token = null;
      const organizationAuth = localStorage.getItem('organizationAuth');
      if (organizationAuth) {
        try {
          const authData = JSON.parse(organizationAuth);
          token = authData.tokens?.access;
        } catch (e) {
          console.error('Failed to parse organization auth data:', e);
        }
      }

      const response = await fetch(`${API_BASE_URL}/api/hospitals/registrations/${registrationId}/approve/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve registration');
      }

      // Refresh data after successful approval
      const [pending, approved] = await Promise.all([
        fetchRegistrations('pending'),
        fetchRegistrations('approved')
      ]);

      setPendingRegistrations(pending);
      setApprovedRegistrations(approved);

      console.log('Registration approved successfully! 🎉');
    } catch (err) {
      console.error('Error approving registration:', err);
      setError(err instanceof Error ? err.message : 'Failed to approve registration');
    } finally {
      setActionLoading(null);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get user's full name
  const getUserFullName = (registration: UserRegistration) => {
    const email = registration.user?.email || 'Unknown User';
    const displayName = email.split('@')[0];
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  };

  // Render comprehensive registration row with full patient details
  const renderRegistrationRow = (registration: UserRegistration, isPending: boolean = false) => {
    const user = registration.user;
    const fullName = getUserFullName(registration);
    
    return (
      <tr key={registration.id} className="hover:bg-gray-50">
        {/* Patient Details Column */}
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-bold text-gray-900">
                {fullName}
              </div>
              <div className="text-xs text-gray-500">
                {user?.email}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Registered: {formatDate(registration.created_at)}
              </div>
            </div>
          </div>
        </td>
        
        {/* Contact Info Column */}
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            <div className="flex items-center mb-1">
              <span className="material-icons text-xs text-gray-400 mr-1">phone</span>
              <span>{user?.phone || 'Not provided'}</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="material-icons text-xs text-gray-400 mr-1">location_on</span>
              <span className="text-xs">
                {user?.city}, {user?.state}<br/>
                {user?.country}
              </span>
            </div>
          </div>
        </td>
        
        {/* Demographics Column */}
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            <div className="flex items-center mb-1">
              <span className="material-icons text-xs text-gray-400 mr-1">cake</span>
              <span className="text-xs">{user?.date_of_birth || 'Not provided'}</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="material-icons text-xs text-gray-400 mr-1">person</span>
              <span className="text-xs capitalize">{user?.gender || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-xs text-gray-400 mr-1">language</span>
              <span className="text-xs capitalize">{user?.preferred_language || 'English'}</span>
            </div>
          </div>
        </td>
        
        {/* ID Numbers Column */}
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            <div className="mb-2">
              <div className="text-xs font-medium text-gray-700">NIN:</div>
              <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                {user?.nin || 'Not provided'}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-700">HPN:</div>
              <div className="text-xs font-mono bg-blue-100 px-2 py-1 rounded text-blue-800">
                {user?.hpn || 'Not assigned'}
              </div>
            </div>
          </div>
        </td>
        
        {/* Status Column */}
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex flex-col items-start">
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full mb-2 ${
              registration.status === 'approved' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {registration.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
            </span>
            {registration.approved_date && (
              <span className="text-xs text-gray-500">
                Approved: {formatDate(registration.approved_date)}
              </span>
            )}
            <span className={`text-xs px-2 py-1 rounded-full mt-1 ${
              registration.is_primary 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {registration.is_primary ? 'Primary Hospital' : 'Secondary'}
            </span>
          </div>
        </td>
        
        {/* Actions Column */}
        {isPending && (
          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              onClick={() => handleApprove(registration.id)}
              disabled={actionLoading === registration.id}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {actionLoading === registration.id ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Approving...
                </>
              ) : (
                <>
                  <span className="material-icons text-sm mr-2">check_circle</span>
                  Approve Patient
                </>
              )}
            </button>
          </td>
        )}
      </tr>
    );
  };

  if (loading) {
    return (
      <DashboardCard title="User Registrations" className={className}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-gray-600">Loading registrations...</span>
        </div>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard title="User Registrations" className={className}>
        <div className="text-center py-12">
          <span className="material-icons text-red-500 text-4xl mb-4">error_outline</span>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="User Registrations" className={className}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Approvals
            {pendingRegistrations.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 py-0.5 px-2 rounded-full text-xs font-medium">
                {pendingRegistrations.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'approved'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Users
            {approvedRegistrations.length > 0 && (
              <span className="ml-2 bg-green-100 text-green-800 py-0.5 px-2 rounded-full text-xs font-medium">
                {approvedRegistrations.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <span className="material-icons text-yellow-600 mr-2">schedule</span>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingRegistrations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <span className="material-icons text-green-600 mr-2">check_circle</span>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{approvedRegistrations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <span className="material-icons text-blue-600 mr-2">people</span>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-blue-600">
                {pendingRegistrations.length + approvedRegistrations.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 NEW: Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons text-gray-400 text-sm">search</span>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, phone, NIN, HPN, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <span className="material-icons text-gray-400 hover:text-gray-600 text-sm">clear</span>
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            {filteredRegistrations.length} result{filteredRegistrations.length !== 1 ? 's' : ''} found for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Registrations Table */}
      {currentPageData.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-icons text-gray-400 text-4xl mb-4">
            {searchQuery ? 'search_off' : (activeTab === 'pending' ? 'schedule' : 'people')}
          </span>
          <p className="text-gray-500">
            {searchQuery 
              ? `No results found for "${searchQuery}"` 
              : (activeTab === 'pending' 
                ? 'No pending registrations' 
                : 'No active users found'
              )
            }
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-blue-600 hover:underline text-sm"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demographics
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Numbers
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {activeTab === 'pending' && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPageData.map((registration) => 
                renderRegistrationRow(registration, activeTab === 'pending')
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 📊 NEW: Pagination Controls */}
      {filteredRegistrations.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            {/* Mobile pagination */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{startIndex + 1}</span>
                {' '}to{' '}
                <span className="font-medium">
                  {Math.min(endIndex, filteredRegistrations.length)}
                </span>
                {' '}of{' '}
                <span className="font-medium">{filteredRegistrations.length}</span>
                {' '}results
                {searchQuery && (
                  <span className="text-gray-500"> for "{searchQuery}"</span>
                )}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <span className="material-icons text-sm">chevron_left</span>
                </button>
                
                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isCurrentPage = page === currentPage;
                  const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  
                  if (!showPage && page !== currentPage - 2 && page !== currentPage + 2) {
                    return null;
                  }
                  
                  if ((page === currentPage - 2 && currentPage > 3) || (page === currentPage + 2 && currentPage < totalPages - 2)) {
                    return (
                      <span key={page} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                    );
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        isCurrentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <span className="material-icons text-sm">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>
          {searchQuery ? (
            <>Showing {currentPageData.length} of {filteredRegistrations.length} filtered results</>
          ) : (
            <>Showing {currentPageData.length} {activeTab} registration{currentPageData.length !== 1 ? 's' : ''}</>
          )}
        </span>
        <Link 
          to="/organization/user-management" 
          className="text-blue-600 hover:underline flex items-center"
        >
          <span className="material-icons text-sm mr-1">settings</span>
          Manage Users
        </Link>
      </div>
    </DashboardCard>
  );
};

export default UserRegistrationsPanel;
