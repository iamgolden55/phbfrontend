/**
 * Professional Practice Page View
 *
 * Public page for viewing verified healthcare practice pages.
 * Design matches RegistrySearchPage pattern.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  MessageCircle,
  CheckCircle,
  Shield,
  Award,
  Heart,
  Share2,
  Calendar,
  CreditCard,
  Languages,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import {
  fetchPublicPracticePageDetail,
  PracticePageDetail,
} from '../../services/practicePageService';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface PageState {
  loading: boolean;
  error: string | null;
  page: PracticePageDetail | null;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PracticePageView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<PageState>({
    loading: true,
    error: null,
    page: null,
  });

  // Load page data
  useEffect(() => {
    if (slug) {
      loadPageData(slug);
    }
  }, [slug]);

  const loadPageData = async (pageSlug: string) => {
    setState({ loading: true, error: null, page: null });

    try {
      const pageData = await fetchPublicPracticePageDetail(pageSlug);
      setState({ loading: false, error: null, page: pageData });
    } catch (err) {
      setState({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load practice page',
        page: null,
      });
    }
  };

  // Handle share
  const handleShare = async () => {
    if (!state.page) return;

    const url = window.location.href;
    const text = `Check out ${state.page.practice_name} on PHB`;

    if (navigator.share) {
      try {
        await navigator.share({ title: state.page.practice_name, text, url });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // Handle nominate
  const handleNominate = () => {
    navigate('/account/nominated-pharmacy', { state: { practicePageId: state.page?.id } });
  };

  // ============================================================================
  // LOADING & ERROR STATES
  // ============================================================================

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading practice page...</p>
        </div>
      </div>
    );
  }

  if (state.error || !state.page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {state.error || 'Practice page not found'}
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  The practice page you're looking for doesn't exist or has been removed.
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/practice-pages"
            className="mt-4 block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Practice Pages
          </Link>
        </div>
      </div>
    );
  }

  const page = state.page;

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link
            to="/practice-pages"
            className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </Link>

          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{page.practice_name}</h1>
              {page.tagline && (
                <p className="text-xl text-blue-100 mb-4">{page.tagline}</p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {page.verification_status === 'verified' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified Professional
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                  {page.service_type === 'in_store'
                    ? 'In-Store Service'
                    : page.service_type === 'virtual'
                    ? 'Virtual Service'
                    : 'In-Store & Virtual'}
                </span>
                {page.is_open_now && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                    <Clock className="w-4 h-4 mr-1" />
                    Open Now
                  </span>
                )}
              </div>

              <p className="text-blue-100 text-sm">
                {page.view_count.toLocaleString()} views • {page.nomination_count} nominations
              </p>
            </div>

            <button
              onClick={handleShare}
              className="ml-4 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Credentials */}
            {page.professional_credentials && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Credentials
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">PHB License Number</p>
                    <p className="font-mono font-semibold text-gray-900">
                      {page.professional_credentials.phb_license_number}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Professional Type</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {page.professional_credentials.professional_type}
                    </p>
                  </div>
                  {page.professional_credentials.specialization && (
                    <div>
                      <p className="text-sm text-gray-500">Specialization</p>
                      <p className="font-semibold text-gray-900">
                        {page.professional_credentials.specialization}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Primary Qualification</p>
                    <p className="font-semibold text-gray-900">
                      {page.professional_credentials.primary_qualification}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year Qualified</p>
                    <p className="font-semibold text-gray-900">
                      {page.professional_credentials.qualification_year}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      page.professional_credentials.license_status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {page.professional_credentials.license_status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            {page.about && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {page.about}
                </p>
              </div>
            )}

            {/* Services & Information */}
            {((page.services_offered && page.services_offered.length > 0) ||
              (page.payment_methods && page.payment_methods.length > 0) ||
              (page.languages_spoken && page.languages_spoken.length > 0)) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Services & Information</h2>

                {page.services_offered && page.services_offered.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Services Offered
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {page.services_offered.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {page.payment_methods && page.payment_methods.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Payment Methods
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {page.payment_methods.map((method, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {page.languages_spoken && page.languages_spoken.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Languages className="w-4 h-4 mr-1" />
                      Languages Spoken
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {page.languages_spoken.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Opening Hours */}
            {page.opening_hours && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Opening Hours
                </h2>

                <div className="space-y-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                    const dayHours = page.opening_hours?.[day];
                    return (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-700 capitalize font-medium">{day}</span>
                        <span className="text-gray-900">
                          {dayHours && !dayHours.closed
                            ? `${dayHours.open} - ${dayHours.close}`
                            : 'Closed'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions Card */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>

              {(page.service_type === 'in_store' || page.service_type === 'both') && (
                <button
                  onClick={handleNominate}
                  className="w-full mb-3 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Nominate This Pharmacy
                </button>
              )}

              {(page.service_type === 'virtual' || page.service_type === 'both') && (
                <button className="w-full mb-3 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Virtual Consultation
                </button>
              )}

              <p className="text-sm text-gray-500 text-center mt-4">
                {page.nomination_count} patients have nominated this practice
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Contact & Location
              </h2>

              {/* Address */}
              {(page.service_type === 'in_store' || page.service_type === 'both') && page.address_line_1 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
                  <p className="text-gray-900">
                    {page.address_line_1}
                    {page.address_line_2 && <><br />{page.address_line_2}</>}
                    <br />
                    {page.city}, {page.state} {page.postcode}
                  </p>
                </div>
              )}

              {/* Contact Details */}
              <div className="space-y-3">
                {page.phone && (
                  <a
                    href={`tel:${page.phone}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{page.phone}</span>
                  </a>
                )}

                {page.email && (
                  <a
                    href={`mailto:${page.email}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{page.email}</span>
                  </a>
                )}

                {page.whatsapp_number && (
                  <a
                    href={`https://wa.me/${page.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-3 text-gray-400" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {page.website && (
                  <a
                    href={page.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Globe className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="truncate">Visit Website</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Are you a healthcare professional?
          </h3>
          <p className="text-blue-100 mb-6">
            Create your own practice page and connect with patients across Nigeria
          </p>
          <Link
            to="/professional/my-practice"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Create Your Practice Page - It's FREE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PracticePageView;
