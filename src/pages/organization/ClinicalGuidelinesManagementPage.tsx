import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import ErrorBoundary from '../../components/ErrorBoundary';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import guidelinesService, { ClinicalGuideline, GuidelineStats, GuidelineCreateData } from '../../services/guidelinesService';
import GuidelineUploadModal from '../../components/guidelines/GuidelineUploadModal';
import GuidelineEditModal from '../../components/guidelines/GuidelineEditModal';

interface GuidelineFilter {
  category: string;
  specialty: string;
  approval_status: string;
  priority: string;
  search: string;
}

const ClinicalGuidelinesManagementPage: React.FC = () => {
  const { userData, isAuthenticated } = useOrganizationAuth();
  const [guidelines, setGuidelines] = useState<ClinicalGuideline[]>([]);
  const [stats, setStats] = useState<GuidelineStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGuideline, setSelectedGuideline] = useState<ClinicalGuideline | null>(null);
  const [editingGuideline, setEditingGuideline] = useState<ClinicalGuideline | null>(null);
  const [filters, setFilters] = useState<GuidelineFilter>({
    category: '',
    specialty: '',
    approval_status: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    if (isAuthenticated && userData?.role === 'hospital_admin') {
      loadGuidelines();
      loadStats();
    }
  }, [isAuthenticated, userData, filters]);

  const loadGuidelines = async () => {
    try {
      setLoading(true);
      const filterParams = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      const data = await guidelinesService.getGuidelines(filterParams);
      setGuidelines(data);
      setError(null);
    } catch (err) {
      setError('Failed to load clinical guidelines');
      console.error('Error loading guidelines:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await guidelinesService.getGuidelinesStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleApproveGuideline = async (guidelineId: string) => {
    try {
      await guidelinesService.approveGuideline(guidelineId);
      loadGuidelines();
      loadStats();
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to approve guideline');
      console.error('Error approving guideline:', err);
    }
  };

  const handlePublishGuideline = async (guidelineId: string) => {
    try {
      await guidelinesService.publishGuideline(guidelineId);
      loadGuidelines();
      loadStats();
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to publish guideline');
      console.error('Error publishing guideline:', err);
    }
  };

  const handleEditGuideline = (guideline: ClinicalGuideline) => {
    setEditingGuideline(guideline);
    setShowEditModal(true);
  };

  const handleSaveGuideline = async (guidelineId: string, data: Partial<GuidelineCreateData>) => {
    try {
      await guidelinesService.updateGuideline(guidelineId, data);
      setShowEditModal(false);
      setEditingGuideline(null);
      loadGuidelines();
      loadStats();
      setError(null);
    } catch (err) {
      throw err; // Let the modal handle the error display
    }
  };

  const handleDeleteGuideline = async (guidelineId: string) => {
    if (window.confirm('Are you sure you want to archive this guideline?')) {
      try {
        await guidelinesService.deleteGuideline(guidelineId);
        loadGuidelines();
        loadStats();
      } catch (err) {
        setError('Failed to archive guideline');
        console.error('Error archiving guideline:', err);
      }
    }
  };

  const handleDownloadGuideline = async (guideline: ClinicalGuideline) => {
    try {
      const blob = await guidelinesService.downloadGuideline(guideline.guideline_id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${guideline.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download guideline');
      console.error('Error downloading guideline:', err);
    }
  };

  const getStatusBadge = (guideline: ClinicalGuideline) => {
    const status = guideline.approval_status;
    const isPublished = guideline.is_published;
    
    if (status === 'approved' && isPublished) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Published</span>;
    } else if (status === 'approved') {
      return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Approved</span>;
    } else if (status === 'pending_review') {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending Review</span>;
    } else if (status === 'draft') {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Draft</span>;
    } else if (status === 'rejected') {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Rejected</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Unknown</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority as keyof typeof colors] || colors.medium}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  if (!isAuthenticated || userData?.role !== 'hospital_admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Only hospital administrators can access clinical guidelines management.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Helmet>
          <title>Clinical Guidelines Management - PHB Hospital System</title>
          <meta name="description" content="Manage clinical guidelines and protocols for your hospital" />
        </Helmet>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <FileText className="mr-3 h-8 w-8 text-blue-600" />
                  Clinical Guidelines Management
                </h1>
                <p className="text-gray-600 mt-2">Manage clinical protocols and guidelines for your medical staff</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Upload New Guideline
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Total Guidelines</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_guidelines}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Published</p>
                    <p className="text-2xl font-bold text-green-600">{stats.published_guidelines}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Drafts</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.draft_guidelines}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Most Accessed</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{stats.most_accessed?.title || 'None'}</p>
                    <p className="text-xs text-gray-500">{stats.most_accessed?.access_count || 0} views</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guidelines..."
                  className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
              
              <select
                className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">All Categories</option>
                <option value="emergency">Emergency Protocols</option>
                <option value="surgery">Surgical Procedures</option>
                <option value="medication">Medication Guidelines</option>
                <option value="diagnosis">Diagnostic Protocols</option>
                <option value="treatment">Treatment Plans</option>
                <option value="prevention">Preventive Care</option>
                <option value="infection_control">Infection Control</option>
                <option value="patient_safety">Patient Safety</option>
              </select>
              
              <select
                className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.approval_status}
                onChange={(e) => setFilters({...filters, approval_status: e.target.value})}
              >
                <option value="">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="pending_review">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <select
                className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
              >
                <option value="">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Guidelines List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading guidelines...</p>
              </div>
            ) : guidelines.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No guidelines found</h3>
                <p className="text-gray-600 mb-4">Create your first clinical guideline to get started.</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Upload First Guideline
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Effective Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Access Count
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guidelines.map((guideline) => (
                      <tr key={guideline.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{guideline.title}</div>
                            <div className="text-sm text-gray-500">v{guideline.version}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{guideline.category.replace('_', ' ')}</span>
                          {guideline.specialty && (
                            <div className="text-xs text-gray-500">{guideline.specialty}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPriorityBadge(guideline.priority)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(guideline)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(guideline.effective_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {guideline.access_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedGuideline(guideline)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            
                            {guideline.file_url && (
                              <button
                                onClick={() => handleDownloadGuideline(guideline)}
                                className="text-green-600 hover:text-green-900"
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleEditGuideline(guideline)}
                              className="text-gray-600 hover:text-gray-900"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            
                            {guideline.approval_status === 'draft' && (
                              <button
                                onClick={() => handleApproveGuideline(guideline.guideline_id)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Approve"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            
                            {guideline.approval_status === 'approved' && !guideline.is_published && (
                              <button
                                onClick={() => handlePublishGuideline(guideline.guideline_id)}
                                className="text-purple-600 hover:text-purple-900"
                                title="Publish"
                              >
                                <BookOpen className="h-4 w-4" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleDeleteGuideline(guideline.guideline_id)}
                              className="text-red-600 hover:text-red-900"
                              title="Archive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        <GuidelineUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            loadGuidelines();
            loadStats();
          }}
        />

        {/* Edit Modal */}
        <GuidelineEditModal
          guideline={editingGuideline}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingGuideline(null);
          }}
          onSave={handleSaveGuideline}
        />

        {/* Detail Modal - Placeholder for now */}
        {selectedGuideline && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{selectedGuideline.title}</h2>
                <button
                  onClick={() => setSelectedGuideline(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-gray-600">{selectedGuideline.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Category</h3>
                    <p className="text-gray-600">{selectedGuideline.category.replace('_', ' ')}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Priority</h3>
                    <p className="text-gray-600">{selectedGuideline.priority}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Effective Date</h3>
                    <p className="text-gray-600">{new Date(selectedGuideline.effective_date).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Version</h3>
                    <p className="text-gray-600">{selectedGuideline.version}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Target Roles</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedGuideline.target_roles.map((role) => (
                      <span
                        key={role}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Keywords</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedGuideline.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setSelectedGuideline(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
                {selectedGuideline.file_url && (
                  <button
                    onClick={() => handleDownloadGuideline(selectedGuideline)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ClinicalGuidelinesManagementPage;