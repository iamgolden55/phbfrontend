/**
 * Professional Registry Dashboard - AWS Console Style
 *
 * Clean, professional dashboard for healthcare professionals
 * Features:
 * - Widget-based layout similar to AWS Console
 * - Summary statistics
 * - Quick actions
 * - Application status overview
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registryService, {
  ProfessionalApplication,
  RegistryServiceError,
} from '../../services/registryService';

const RegistryDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ProfessionalApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await registryService.professional.getMyApplications();

      // Handle both array and paginated response formats
      const apps = Array.isArray(response) ? response : response.applications || [];
      setApplications(apps);
    } catch (err) {
      console.error('❌ Registry Dashboard: Error loading applications:', err);
      if (err instanceof RegistryServiceError) {
        setError(err.message);
      } else {
        setError('Failed to load applications');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'text-gray-600 bg-gray-50 border-gray-200',
      submitted: 'text-blue-600 bg-blue-50 border-blue-200',
      under_review: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      approved: 'text-green-600 bg-green-50 border-green-200',
      rejected: 'text-red-600 bg-red-50 border-red-200',
      clarification_requested: 'text-orange-600 bg-orange-50 border-orange-200',
    };
    return colors[status] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStats = () => {
    const total = applications.length;
    const draft = applications.filter(a => a.status === 'draft' || a.is_draft).length;
    const submitted = applications.filter(a => a.status === 'submitted' || a.is_submitted).length;
    const underReview = applications.filter(a => a.status === 'under_review').length;
    const approved = applications.filter(a => a.status === 'approved' || a.is_approved).length;

    return { total, draft, submitted, underReview, approved };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AWS-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Professional Registry</h1>
              <p className="text-sm text-gray-500 mt-1">
                View your applications and upload required verification documents
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Statistics Widgets - AWS Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Applications */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total applications</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Under Review */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Under review</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.underReview}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Draft */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Draft</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.draft}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Approved */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Widget */}
        <div className="bg-white border border-gray-200 rounded">
          {/* Widget Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-medium text-gray-900">
                Applications ({applications.length})
              </h2>
            </div>
          </div>

          {/* Widget Content */}
          <div className="p-6">
            {applications.length === 0 ? (
              /* Empty State */
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications found
                </h3>
                <p className="text-sm text-gray-500">
                  Your professional registration application will appear here after you complete the registration process.
                </p>
              </div>
            ) : (
              /* Applications Table */
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/registry/applications/${app.id}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button
                              className="text-sm font-medium text-blue-600 hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/registry/applications/${app.id}`);
                              }}
                            >
                              {app.application_reference || 'N/A'}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {(app.professional_type || 'professional')
                              .replace('_', ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getStatusColor(
                              app.status || 'draft'
                            )}`}
                          >
                            {(app.status || 'draft').replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.submitted_date
                            ? new Date(app.submitted_date).toLocaleDateString('en-NG', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Not submitted'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/registry/applications/${app.id}`);
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Help Widget */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-blue-800">Need help?</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  If you have questions about your application status or need assistance,
                  contact our registry support team at{' '}
                  <a href="mailto:registry@phb.ng" className="underline font-medium">
                    registry@phb.ng
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryDashboardPage;
