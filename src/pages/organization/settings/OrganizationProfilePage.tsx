import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Edit,
  ArrowLeft,
  Loader2,
  Shield,
  Activity,
  Users,
  Bed
} from 'lucide-react';
import { OrganizationProfileService, OrganizationProfile } from '../../../services/organizationProfileService';

const OrganizationProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await OrganizationProfileService.getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Failed to load organization profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Failed to load profile</p>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Organization Profile | PHB</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/organization/settings')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Organisation Profile</h1>
            <p className="text-gray-500 text-sm">View your organization's information and settings</p>
          </div>
        </div>
        {profile.is_verified && (
          <div className="mt-4 md:mt-0 flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
            <Shield size={16} className="text-green-600" />
            <span className="text-green-700 text-sm font-medium">Verified</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          {/* Logo Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Organization Logo</h3>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-lg bg-orange-50 flex items-center justify-center mb-4 border border-orange-100">
                <Building2 className="w-16 h-16 text-orange-400" />
              </div>
              <p className="text-sm text-gray-500 text-center">Logo upload coming soon</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Basic Information</h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Organization Name</p>
                <p className="text-gray-800 font-semibold">{profile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Organization Type</p>
                <p className="text-gray-800 font-semibold capitalize">{profile.type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Registration Code</p>
                <p className="text-gray-800 font-mono text-sm">{profile.code}</p>
              </div>
            </div>
          </div>

          {/* Operational Statistics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Activity className="text-purple-600" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Operational Info</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bed size={16} className="text-gray-400" />
                  <p className="text-sm text-gray-600">Bed Capacity</p>
                </div>
                <p className="text-gray-800 font-semibold">{profile.bed_capacity}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Emergency Unit</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  profile.emergency_unit ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {profile.emergency_unit ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">ICU Unit</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  profile.icu_unit ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {profile.icu_unit ? 'Available' : 'Not Available'}
                </span>
              </div>
              {profile.accreditation_status && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600">Accredited</p>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                    Yes
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Contact & Address Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Phone className="text-green-600" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Contact */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Main Contact</p>
                <div className="space-y-2">
                  {profile.phone && (
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-800">{profile.phone}</p>
                        <p className="text-xs text-gray-500">Main Phone</p>
                      </div>
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-start gap-2">
                      <Mail size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-800 break-all">{profile.email}</p>
                        <p className="text-xs text-gray-500">Main Email</p>
                      </div>
                    </div>
                  )}
                  {profile.emergency_contact && (
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-800">{profile.emergency_contact}</p>
                        <p className="text-xs text-red-500">Emergency Contact</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Website */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Online Presence</p>
                {profile.website ? (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <Globe size={16} />
                    {profile.website}
                  </a>
                ) : (
                  <p className="text-gray-500 text-sm">No website provided</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <MapPin className="text-purple-600" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Address</h3>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-800">{profile.address}</p>
                {profile.city && profile.postal_code && (
                  <p className="text-gray-800">
                    {profile.city}{profile.state && `, ${profile.state}`} {profile.postal_code}
                  </p>
                )}
                {profile.country && <p className="text-gray-800">{profile.country}</p>}
              </div>
            </div>
          </div>

          {/* Contact Persons */}
          {(profile.primary_contact || profile.administrative_contact || profile.medical_director) && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Users className="text-indigo-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Key Personnel</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Contact */}
                {profile.primary_contact && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Primary Contact</p>
                    <div className="space-y-1">
                      <p className="text-gray-800 font-medium">{profile.primary_contact.name}</p>
                      {profile.primary_contact.title && (
                        <p className="text-sm text-gray-600">{profile.primary_contact.title}</p>
                      )}
                      {profile.primary_contact.phone && (
                        <p className="text-sm text-gray-600">{profile.primary_contact.phone}</p>
                      )}
                      {profile.primary_contact.email && (
                        <p className="text-sm text-gray-600">{profile.primary_contact.email}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Administrative Contact */}
                {profile.administrative_contact && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Administrative Contact</p>
                    <div className="space-y-1">
                      <p className="text-gray-800 font-medium">{profile.administrative_contact.name}</p>
                      {profile.administrative_contact.title && (
                        <p className="text-sm text-gray-600">{profile.administrative_contact.title}</p>
                      )}
                      {profile.administrative_contact.phone && (
                        <p className="text-sm text-gray-600">{profile.administrative_contact.phone}</p>
                      )}
                      {profile.administrative_contact.email && (
                        <p className="text-sm text-gray-600">{profile.administrative_contact.email}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Medical Director */}
                {profile.medical_director && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Medical Director</p>
                    <div className="space-y-1">
                      <p className="text-gray-800 font-medium">{profile.medical_director.name}</p>
                      {profile.medical_director.specialization && (
                        <p className="text-sm text-gray-600">{profile.medical_director.specialization}</p>
                      )}
                      {profile.medical_director.license && (
                        <p className="text-sm text-gray-600">License: {profile.medical_director.license}</p>
                      )}
                      {profile.medical_director.years_experience > 0 && (
                        <p className="text-sm text-gray-600">{profile.medical_director.years_experience} years experience</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Digital Capabilities */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-50 rounded-lg">
                <Activity className="text-cyan-600" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Digital Capabilities</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries({
                'HIS': profile.digital_infrastructure.his,
                'EMR': profile.digital_infrastructure.emr,
                'Telemedicine': profile.digital_infrastructure.telemedicine,
                'API Integration': profile.digital_infrastructure.api_integration,
                'Online Booking': profile.digital_infrastructure.online_booking,
                'Patient Portal': profile.digital_infrastructure.patient_portal,
                'Mobile App': profile.digital_infrastructure.mobile_app,
              }).map(([name, enabled]) => (
                <div key={name} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`text-sm ${enabled ? 'text-gray-700' : 'text-gray-400'}`}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfilePage;
