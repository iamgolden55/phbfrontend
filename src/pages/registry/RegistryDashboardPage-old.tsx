/**
 * Professional Registry Dashboard
 *
 * Dashboard for healthcare professionals to manage their registry applications
 * Features:
 * - View all applications and their status
 * - Upload required documents
 * - Track verification progress
 * - Download approved license
 *
 * MICROSERVICE-READY: Uses isolated registryService
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

  console.log('🎨 RegistryDashboardPage: Component rendered');
  console.log('🎨 RegistryDashboardPage: loading =', loading);
  console.log('🎨 RegistryDashboardPage: applications =', applications);
  console.log('🎨 RegistryDashboardPage: error =', error);

  useEffect(() => {
    console.log('🎨 RegistryDashboardPage: useEffect triggered');
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Registry Dashboard: Loading applications...');
      const response = await registryService.professional.getMyApplications();
      console.log('✅ Registry Dashboard: Response received:', response);

      // Handle both array and paginated response formats
      const apps = Array.isArray(response) ? response : response.applications || [];
      console.log('✅ Registry Dashboard: Applications extracted:', apps);

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
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      clarification_requested: 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      draft: '📝',
      submitted: '📤',
      under_review: '🔍',
      approved: '✅',
      rejected: '❌',
      clarification_requested: '⚠️',
    };
    return icons[status] || '📋';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Registry Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your professional registry applications
              </p>
            </div>
            <button
              onClick={() => navigate('/registry/apply')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <span>➕</span>
              <span>New Application</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Applications Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start your professional registry application to join PHB's verified
              network of healthcare professionals.
            </p>
            <button
              onClick={() => navigate('/registry/apply')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Start Application
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              console.log('🔍 Rendering application:', app);
              return (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/registry/applications/${app.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getStatusIcon(app.application_status || 'draft')}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {(app.professional_type || 'professional')
                            .replace('_', ' ')
                            .replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                          Registration
                        </h3>
                        <p className="text-sm text-gray-600">
                          Application #{app.phb_application_number || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">
                          Applicant
                        </p>
                        <p className="font-medium text-gray-900">
                          {app.first_name} {app.last_name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase">
                          Submitted
                        </p>
                        <p className="font-medium text-gray-900">
                          {app.submitted_at
                            ? formatDate(app.submitted_at)
                            : 'Not yet submitted'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase">
                          Regulatory Body
                        </p>
                        <p className="font-medium text-gray-900">
                          {app.regulatory_body}
                        </p>
                      </div>
                    </div>

                    {app.phb_license_number && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-800">
                          <strong>PHB License Number:</strong>{' '}
                          {app.phb_license_number}
                        </p>
                      </div>
                    )}

                    {app.rejection_reason && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-800">
                          <strong>Rejection Reason:</strong> {app.rejection_reason}
                        </p>
                      </div>
                    )}

                    {app.reviewer_notes && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                          <strong>Reviewer Notes:</strong> {app.reviewer_notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        app.application_status || 'draft'
                      )}`}
                    >
                      {(app.application_status || 'draft').replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Progress Indicator */}
                {app.application_status === 'under_review' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Review Progress</span>
                      <span>In Progress</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse w-2/3"></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/registry/applications/${app.id}`);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    View Details
                  </button>

                  {app.application_status === 'approved' && app.phb_license_number && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Download license certificate
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Download License
                    </button>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Need Help with Your Application?
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            If you have questions about your application status or need assistance,
            our registry support team is here to help.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:registry@phb.ng"
              className="text-sm text-blue-600 hover:underline"
            >
              📧 registry@phb.ng
            </a>
            <span className="text-sm text-blue-600">📞 +234 800 PHB HELP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryDashboardPage;
