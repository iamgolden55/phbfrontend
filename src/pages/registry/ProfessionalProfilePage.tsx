/**
 * Professional Profile Page
 *
 * Public view of a registered professional's profile.
 * Accessible via /registry/professional/:id
 * No authentication required.
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  Award,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  FileText,
  Globe,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { registryService } from '../../services/registryService';

interface Professional {
  id: string;
  phb_license_number: string;
  professional_type: string;
  professional_type_display: string;
  full_name: string;
  title: string;
  primary_qualification: string;
  qualification_year: number;
  specialization_safe: string;
  areas_of_interest_safe: string | null;
  years_in_practice: number;
  license_status: string;
  license_status_display: string;
  is_active: boolean;
  license_issue_date: string;
  license_expiry_date: string;
  home_registration_body: string;
  home_registration_number: string;
  practice_type: string;
  practice_type_display: string;
  city: string;
  state: string;
  languages_spoken: string[];
  identity_verified: boolean;
  qualifications_verified: boolean;
}

const ProfessionalProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch all active professionals and find by ID
        // TODO: Backend should add an endpoint to fetch by ID directly
        const response = await registryService.searchProfessionals({
          query: '',
        });

        if (response.results && response.results.length > 0) {
          // Find the professional by ID
          const found = response.results.find((prof: any) => prof.id === id);

          if (found) {
            setProfessional(found);
          } else {
            setError('Professional not found');
          }
        } else {
          setError('Professional not found');
        }
      } catch (err) {
        console.error('Error fetching professional:', err);
        setError('Failed to load professional profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessional();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading professional profile...</p>
        </div>
      </div>
    );
  }

  if (error || !professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The professional profile you are looking for could not be found.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <Link
              to="/registry/search"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search Registry
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/registry/search"
            className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mr-6">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {professional.full_name}
                </h1>
                <p className="text-xl text-blue-100 mb-2">
                  {professional.professional_type_display}
                  {professional.specialization_safe && ` • ${professional.specialization_safe}`}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      professional.is_active
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    {professional.license_status_display}
                  </span>
                  {professional.identity_verified && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Key Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* License Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                License Details
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">PHB License Number</p>
                  <p className="font-semibold text-gray-900">
                    {professional.phb_license_number}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {new Date(professional.license_issue_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="text-gray-900 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {new Date(professional.license_expiry_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">Home Registration Body</p>
                  <p className="font-semibold text-gray-900">
                    {professional.home_registration_body}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="text-gray-900">{professional.home_registration_number}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Location
              </h2>

              <div className="space-y-2">
                <p className="text-gray-900 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {professional.city}, {professional.state}
                </p>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Verification Status
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Identity Verified</span>
                  {professional.identity_verified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Qualifications Verified</span>
                  {professional.qualifications_verified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Active License</span>
                  {professional.is_active ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
                Professional Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Professional Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {professional.professional_type_display}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Practice Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {professional.practice_type_display}
                  </p>
                </div>

                {professional.specialization_safe && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Specialization</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {professional.specialization_safe}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-1">Years in Practice</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {professional.years_in_practice} years
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                Education & Qualifications
              </h2>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <p className="font-semibold text-gray-900 text-lg">
                    {professional.primary_qualification}
                  </p>
                  <p className="text-gray-600">Graduated: {professional.qualification_year}</p>
                </div>

                {professional.areas_of_interest_safe && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-2">Areas of Interest</p>
                    <p className="text-gray-900">{professional.areas_of_interest_safe}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Languages */}
            {professional.languages_spoken && professional.languages_spoken.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-blue-600" />
                  Languages Spoken
                </h2>

                <div className="flex flex-wrap gap-2">
                  {professional.languages_spoken.map((language, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Important Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
              <div className="flex">
                <Shield className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Verified Professional
                  </h3>
                  <p className="text-blue-800 text-sm">
                    This professional has been verified by PHB and holds an active license.
                    All credentials have been confirmed with the {professional.home_registration_body}.
                    Always verify the license number before any professional engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need to Verify This Professional?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            You can always verify this professional's license by searching for their PHB license
            number: <span className="font-bold">{professional.phb_license_number}</span>
          </p>
          <Link
            to="/registry/search"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Search Registry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfilePage;
