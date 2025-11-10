import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock, CheckCircle, Shield } from 'lucide-react';
import { previewMyPracticePage, PracticePageDetail } from '../../services/practicePageService';

/**
 * Practice Page Preview Component
 *
 * Allows professionals to preview their practice page even when:
 * - Status is "pending verification"
 * - Page is unpublished
 *
 * Uses the authenticated preview endpoint instead of public endpoint.
 */
export const PracticePagePreview: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PracticePageDetail | null>(null);

  useEffect(() => {
    loadPreview();
  }, []);

  const loadPreview = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await previewMyPracticePage();
      setPageData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load preview');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded">
            <h3 className="font-semibold text-red-800 mb-2">Error Loading Preview</h3>
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={() => navigate('/professional/practice-page')}
            className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
            <h3 className="font-semibold text-blue-800 mb-2">No Practice Page Found</h3>
            <p className="text-blue-700">You haven't created a practice page yet.</p>
          </div>
          <button
            onClick={() => navigate('/professional/practice-page')}
            className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Notice Banner */}
      <div className="bg-yellow-500 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-600">
                PREVIEW MODE
              </span>
              <span className="text-sm">This is how your page will look to patients after verification and publishing.</span>
            </div>
            <button
              onClick={() => navigate('/professional/practice-page')}
              className="flex items-center px-4 py-2 bg-white text-yellow-600 rounded-lg font-medium hover:bg-yellow-50 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Practice Page Content */}
      <PracticePageViewWrapper pageData={pageData} />
    </div>
  );
};

/**
 * Wrapper component to display practice page with pre-loaded data
 */
const PracticePageViewWrapper: React.FC<{ pageData: PracticePageDetail }> = ({ pageData }) => {
  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              {pageData.practice_name}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {pageData.tagline}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {pageData.verification_status === 'verified' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </span>
              )}
              {pageData.verification_status === 'pending' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
                  <Clock className="w-4 h-4 mr-1" />
                  Pending Verification
                </span>
              )}
              {pageData.is_published ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500 text-white">
                  Unpublished
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {pageData.about || 'No description provided.'}
              </p>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h2>
              <div className="space-y-3">
                {pageData.services_offered && pageData.services_offered.length > 0 ? (
                  pageData.services_offered.map((service, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No services listed.</p>
                )}
              </div>
            </div>

            {/* Additional Certifications Section */}
            {pageData.additional_certifications && pageData.additional_certifications.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Certifications</h2>
                <div className="space-y-3">
                  {pageData.additional_certifications.map((cert, index) => (
                    <div key={index} className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{typeof cert === 'string' ? cert : cert.name || cert.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {pageData.address && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-gray-700">{pageData.address}</p>
                      <p className="text-gray-700">{pageData.city}, {pageData.state}</p>
                    </div>
                  </div>
                )}

                {pageData.phone && (
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-gray-700">{pageData.phone}</p>
                    </div>
                  </div>
                )}

                {pageData.email && (
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-700">{pageData.email}</p>
                    </div>
                  </div>
                )}

                {pageData.website && (
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Website</p>
                      <a
                        href={pageData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {pageData.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Type */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service Type</h3>
              <div className="flex flex-wrap gap-2">
                {pageData.service_type === 'in_store' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    In-Store Only
                  </span>
                )}
                {pageData.service_type === 'virtual' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    Virtual Only
                  </span>
                )}
                {pageData.service_type === 'both' && (
                  <>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      In-Store
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Virtual
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Languages */}
            {pageData.languages_spoken && pageData.languages_spoken.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Languages Spoken</h3>
                <div className="flex flex-wrap gap-2">
                  {pageData.languages_spoken.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePagePreview;
