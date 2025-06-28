import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';
import guidelinesService, { ClinicalGuideline } from '../../services/guidelinesService';
import MarkdownRenderer from '../../components/guidelines/MarkdownRenderer';
import { 
  Search, 
  Download, 
  Eye, 
  Bookmark, 
  Calendar, 
  Tag, 
  Users, 
  FileText,
  AlertCircle,
  BookOpen,
  Heart,
  Star
} from 'lucide-react';

interface GuidelineFilter {
  category: string;
  specialty: string;
  priority: string;
  search: string;
}

const ClinicalGuidelinesPage: React.FC = () => {
  const { user, isAuthenticated } = useProfessionalAuth();
  const [guidelines, setGuidelines] = useState<ClinicalGuideline[]>([]);
  const [bookmarkedGuidelines, setBookmarkedGuidelines] = useState<ClinicalGuideline[]>([]);
  const [selectedGuideline, setSelectedGuideline] = useState<ClinicalGuideline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarked'>('all');
  const [filters, setFilters] = useState<GuidelineFilter>({
    category: '',
    specialty: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadGuidelines();
      loadBookmarkedGuidelines();
    }
  }, [isAuthenticated, filters]);

  const loadGuidelines = async () => {
    try {
      setLoading(true);
      const filterParams = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      // Only show published guidelines to professionals
      filterParams.is_published = true;
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

  const loadBookmarkedGuidelines = async () => {
    try {
      const bookmarked = await guidelinesService.getBookmarkedGuidelines();
      setBookmarkedGuidelines(bookmarked);
    } catch (err) {
      console.error('Error loading bookmarked guidelines:', err);
    }
  };

  const handleBookmarkToggle = async (guideline: ClinicalGuideline) => {
    try {
      if (guideline.is_bookmarked) {
        await guidelinesService.removeBookmark(guideline.guideline_id);
      } else {
        await guidelinesService.toggleBookmark(guideline.guideline_id);
      }
      
      // Refresh both lists
      loadGuidelines();
      loadBookmarkedGuidelines();
      
      // Update selected guideline if it's the same one
      if (selectedGuideline?.id === guideline.id) {
        setSelectedGuideline({
          ...guideline,
          is_bookmarked: !guideline.is_bookmarked
        });
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
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
      console.error('Error downloading guideline:', err);
    }
  };

  const getStatusBadge = (guideline: ClinicalGuideline) => {
    if (guideline.is_expired) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>;
    } else if (!guideline.is_effective) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Not Yet Effective</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${colors[priority as keyof typeof colors] || colors.medium}`}>
        {priority === 'critical' && <AlertCircle className="w-3 h-3 mr-1" />}
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const currentGuidelines = activeTab === 'all' ? guidelines : bookmarkedGuidelines;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Please log in as a medical professional to access clinical guidelines.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Helmet>
        <title>Clinical Guidelines - PHB Hospital System</title>
        <meta name="description" content="Access clinical guidelines and medical protocols" />
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText className="mr-3 h-8 w-8 text-blue-600" />
          Clinical Guidelines
        </h1>
        <p className="text-gray-600 mt-2">Access evidence-based clinical protocols and medical guidelines</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="inline-block w-4 h-4 mr-2" />
              All Guidelines ({guidelines.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('bookmarked');
                loadBookmarkedGuidelines(); // Refresh bookmarks when switching to tab
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookmarked'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="inline-block w-4 h-4 mr-2" />
              Bookmarked ({bookmarkedGuidelines.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Filters */}
      {activeTab === 'all' && (
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
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Guidelines List */}
        <div className={`lg:col-span-1 ${selectedGuideline ? 'hidden lg:block' : ''}`}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              {activeTab === 'all' ? 'Available Guidelines' : 'Bookmarked Guidelines'}
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading guidelines...</p>
              </div>
            ) : currentGuidelines.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {activeTab === 'all' ? 'No guidelines found matching your criteria.' : 'No bookmarked guidelines found.'}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {currentGuidelines.map(guideline => (
                  <li key={guideline.id} className="py-3">
                    <div
                      className={`cursor-pointer hover:bg-blue-50 p-3 rounded transition ${
                        selectedGuideline?.id === guideline.id ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                      onClick={() => setSelectedGuideline(guideline)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-blue-700 text-sm">{guideline.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkToggle(guideline);
                          }}
                          className={`ml-2 ${guideline.is_bookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                        >
                          {guideline.is_bookmarked ? <Star className="h-4 w-4 fill-current" /> : <Star className="h-4 w-4" />}
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {guideline.category.replace('_', ' ')}
                        </span>
                        {getPriorityBadge(guideline.priority)}
                        {getStatusBadge(guideline)}
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        Updated: {formatDate(guideline.updated_at)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {guideline.access_count} views • v{guideline.version}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Guideline Detail */}
        <div className={`lg:col-span-2 ${selectedGuideline ? '' : 'hidden lg:block'}`}>
          {selectedGuideline ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-800 mb-2">{selectedGuideline.title}</h2>
                  <p className="text-gray-600">{selectedGuideline.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleBookmarkToggle(selectedGuideline)}
                    className={`p-2 rounded-full ${selectedGuideline.is_bookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
                  >
                    {selectedGuideline.is_bookmarked ? <Star className="h-5 w-5 fill-current" /> : <Star className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => setSelectedGuideline(null)}
                    className="lg:hidden p-2 rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Tag className="h-5 w-5 mx-auto text-gray-600 mb-1" />
                  <p className="text-xs text-gray-600">Category</p>
                  <p className="text-sm font-medium">{selectedGuideline.category.replace('_', ' ')}</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 mx-auto text-gray-600 mb-1" />
                  <p className="text-xs text-gray-600">Effective Date</p>
                  <p className="text-sm font-medium">{formatDate(selectedGuideline.effective_date)}</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Eye className="h-5 w-5 mx-auto text-gray-600 mb-1" />
                  <p className="text-xs text-gray-600">Access Count</p>
                  <p className="text-sm font-medium">{selectedGuideline.access_count}</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 mx-auto text-gray-600 mb-1" />
                  <p className="text-xs text-gray-600">Version</p>
                  <p className="text-sm font-medium">{selectedGuideline.version}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {getPriorityBadge(selectedGuideline.priority)}
                  {getStatusBadge(selectedGuideline)}
                  {selectedGuideline.specialty && (
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      {selectedGuideline.specialty}
                    </span>
                  )}
                </div>

                {selectedGuideline.target_roles.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Target Roles:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedGuideline.target_roles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                        >
                          {role.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedGuideline.keywords.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Keywords:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedGuideline.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Content Display */}
              {selectedGuideline.content_type === 'text' && selectedGuideline.text_content ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Content</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <MarkdownRenderer content={selectedGuideline.text_content} />
                  </div>
                </div>
              ) : selectedGuideline.content_type === 'pdf' && selectedGuideline.file_path ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Document</h3>
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
                    <FileText className="mx-auto h-12 w-12 text-blue-600 mb-3" />
                    <p className="text-blue-800 font-medium mb-2">PDF Document Available</p>
                    <p className="text-blue-600 text-sm mb-4">
                      This guideline is available as a downloadable PDF document.
                    </p>
                    <button
                      onClick={() => handleDownloadGuideline(selectedGuideline)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center mx-auto transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    {/* Additional download button for file-based guidelines */}
                    {selectedGuideline.content_type === 'pdf' && selectedGuideline.file_path && (
                      <button
                        onClick={() => handleDownloadGuideline(selectedGuideline)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Document</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Created by: {selectedGuideline.created_by_name}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Select a guideline to view details</h3>
              <p className="text-gray-500">Choose from the list on the left to view the full clinical guideline.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalGuidelinesPage;