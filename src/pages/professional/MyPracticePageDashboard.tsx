import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMyPracticePage,
  getPageAnalytics,
  togglePublished,
  PracticePageDetail,
  PageAnalytics,
} from '../../services/practicePageService';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface DashboardState {
  loading: boolean;
  error: string | null;
  hasPage: boolean;
  page: PracticePageDetail | null;
  analytics: PageAnalytics | null;
  publishLoading: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const MyPracticePageDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<DashboardState>({
    loading: true,
    error: null,
    hasPage: false,
    page: null,
    analytics: null,
    publishLoading: false,
  });
  const [copySuccess, setCopySuccess] = useState(false);

  // Load page data on mount
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const pageResult = await getMyPracticePage();

      if (pageResult.hasPage && pageResult.page) {
        const analyticsResult = await getPageAnalytics();

        setState({
          loading: false,
          error: null,
          hasPage: true,
          page: pageResult.page,
          analytics: analyticsResult,
          publishLoading: false,
        });
      } else {
        setState({
          loading: false,
          error: null,
          hasPage: false,
          page: null,
          analytics: null,
          publishLoading: false,
        });
      }
    } catch (err) {
      setState({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load practice page',
        hasPage: false,
        page: null,
        analytics: null,
        publishLoading: false,
      });
    }
  };

  // Handle publish toggle
  const handlePublishToggle = async () => {
    if (!state.page) return;

    setState((prev) => ({ ...prev, publishLoading: true }));

    try {
      const result = await togglePublished(!state.page.is_published);

      if (result.success) {
        setState((prev) => ({
          ...prev,
          page: prev.page ? { ...prev.page, is_published: result.is_published } : null,
          publishLoading: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to update publish status',
        publishLoading: false,
      }));
    }
  };

  // Handle copy to clipboard
  const handleCopyUrl = () => {
    if (!state.page) return;

    const url = `${window.location.origin}/practice-pages/${state.page.slug}/`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Navigation handlers
  const handleEditPage = () => navigate('/professional/practice-page/edit');
  const handleCreatePage = () => navigate('/professional/practice-page/create');
  const handlePreviewPage = () => navigate('/professional/practice-page/preview');
  const handleViewPublicPage = () => {
    if (state.page) window.open(`/practice-pages/${state.page.slug}/`, '_blank');
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const getVerificationConfig = (status: string) => {
    const configs = {
      pending: {
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: '⏳',
        label: 'Pending',
      },
      verified: {
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: '✓',
        label: 'Verified',
      },
      rejected: {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: '✕',
        label: 'Rejected',
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  // ============================================================================
  // LOADING STATE
  // ============================================================================

  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3">
            <div className="w-12 h-12 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-gray-600">Loading practice page...</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ERROR STATE
  // ============================================================================

  if (state.error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">Error loading practice page</h3>
              <p className="mt-1 text-sm text-red-700">{state.error}</p>
              <button
                onClick={() => setState((prev) => ({ ...prev, error: null }))}
                className="mt-3 text-sm font-medium text-red-600 hover:text-red-500"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // EMPTY STATE - NO PRACTICE PAGE
  // ============================================================================

  if (!state.hasPage) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Your Practice Page
            </h1>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Build your professional presence and connect with patients. Showcase your services, credentials, and expertise.
            </p>
            <button
              onClick={handleCreatePage}
              className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Practice Page
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: '👥',
                title: 'Patient Discovery',
                description: 'Be found by patients in your area',
              },
              {
                icon: '🎯',
                title: 'Professional Branding',
                description: 'Showcase your expertise',
              },
              {
                icon: '📊',
                title: 'Track Engagement',
                description: 'Monitor views and nominations',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // MAIN DASHBOARD - HAS PRACTICE PAGE
  // ============================================================================

  const { page, analytics } = state;
  if (!page) return null;

  const verificationConfig = getVerificationConfig(page.verification_status);

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Practice Page Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your professional presence and track patient engagement</p>
      </div>

      {/* Verification Alert */}
      {page.verification_status === 'pending' && (
        <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">
            <strong className="font-bold">Verification In Progress:</strong> Your practice page is being reviewed. This typically takes 24-48 hours.
          </span>
        </div>
      )}

      {page.verification_status === 'rejected' && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">
            <strong className="font-bold">Verification Rejected:</strong> {page.verification_notes || 'Your page did not meet verification requirements.'}
          </span>
          <button
            onClick={handleEditPage}
            className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Edit & Resubmit
          </button>
        </div>
      )}

      {page.verification_status === 'verified' && !page.is_published && (
        <div className="mb-6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">
            <strong className="font-bold">Ready to Publish:</strong> Your page is verified! Toggle the publish switch below to make it visible to patients.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2">
          {/* Practice Overview Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-800">{page.practice_name}</h2>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                page.verification_status === 'verified' ? 'bg-green-100 text-green-800' :
                page.verification_status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {verificationConfig.icon} {verificationConfig.label}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{page.tagline}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Service Type</p>
                <p className="text-sm text-gray-700">
                  {page.service_type === 'in_store' ? 'In-Store' : page.service_type === 'virtual' ? 'Virtual' : 'Both'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Location</p>
                <p className="text-sm text-gray-700">{page.city}, {page.state}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Created</p>
                <p className="text-sm text-gray-700">{new Date(page.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Last Updated</p>
                <p className="text-sm text-gray-700">{new Date(page.updated_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Public URL */}
            <div className="bg-gray-50 rounded-md p-3 mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Public Page URL</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs text-gray-600 font-mono bg-white px-3 py-2 rounded border border-gray-200 truncate">
                  {window.location.origin}/practice-pages/{page.slug}/
                </code>
                <button
                  onClick={handleCopyUrl}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    copySuccess
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {page.is_published ? 'Published' : 'Unpublished'}
                </p>
                <p className="text-xs text-gray-600">
                  {page.is_published ? 'Visible to patients' : 'Only visible to you'}
                </p>
              </div>
              <button
                onClick={handlePublishToggle}
                disabled={state.publishLoading || page.verification_status === 'rejected'}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  page.is_published ? 'bg-blue-600' : 'bg-gray-300'
                } ${state.publishLoading || page.verification_status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    page.is_published ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Analytics Stats */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <p className="text-lg font-bold text-blue-600">{analytics.view_count.toLocaleString()}</p>
                <p className="text-sm text-blue-700">Total Page Views</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                <p className="text-lg font-bold text-purple-600">{analytics.nomination_count.toLocaleString()}</p>
                <p className="text-sm text-purple-700">Patient Nominations</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div>
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleEditPage(); }}
                className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md flex items-center text-blue-700 transition"
              >
                <span className="mr-2">→</span>
                Edit Page
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handlePreviewPage(); }}
                className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md flex items-center text-blue-700 transition"
              >
                <span className="mr-2">→</span>
                Preview Page
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleViewPublicPage(); }}
                className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md flex items-center text-blue-700 transition"
              >
                <span className="mr-2">→</span>
                View Public Page
              </a>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Status Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Page Created</p>
                  <p className="text-sm text-gray-500">{new Date(page.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    page.verification_status === 'verified'
                      ? 'bg-green-100'
                      : page.verification_status === 'rejected'
                      ? 'bg-red-100'
                      : 'bg-yellow-100'
                  }`}>
                    {page.verification_status === 'verified' ? (
                      <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : page.verification_status === 'rejected' ? (
                      <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {page.verification_status === 'verified'
                      ? 'Verified'
                      : page.verification_status === 'rejected'
                      ? 'Rejected'
                      : 'Verification Pending'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {page.verified_date ? new Date(page.verified_date).toLocaleDateString() : 'Awaiting review'}
                  </p>
                </div>
              </div>

              {page.is_published && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Published</p>
                    <p className="text-sm text-gray-500">Live and visible</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPracticePageDashboard;
