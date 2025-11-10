import { useState, useEffect } from 'react';
import {
  hospitalLicenseService,
  HospitalLicense,
  HospitalInfo,
  UploadLicenseData
} from '../../services/hospitalLicenseService';

export default function HospitalLicensesPage() {
  const [loading, setLoading] = useState(true);
  const [licenses, setLicenses] = useState<HospitalLicense[]>([]);
  const [hospital, setHospital] = useState<HospitalInfo | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<UploadLicenseData>({
    license_number: '',
    license_type: 'operating',
    license_name: '',
    license_category: '',
    license_status: 'active',
    issue_date: '',
    effective_date: '',
    expiration_date: '',
    healthcare_authority_id: undefined,
    conditions: ''
  });
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [isQuickUpload, setIsQuickUpload] = useState(false); // Track if opened via quick upload buttons

  useEffect(() => {
    loadLicenses();
  }, []);

  const loadLicenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hospitalLicenseService.getMyLicenses();
      setLicenses(response.licenses);
      setHospital(response.hospital);
    } catch (err: any) {
      setError(err.message || 'Failed to load licenses');
      console.error('Error loading licenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const uploadData: UploadLicenseData = {
        ...formData,
        license_certificate: licenseFile || undefined
      };

      await hospitalLicenseService.uploadLicense(uploadData);
      setSuccess('License uploaded successfully!');
      setShowUploadForm(false);

      // Reset form
      setFormData({
        license_number: '',
        license_type: 'operating',
        license_name: '',
        license_category: '',
        license_status: 'active',
        issue_date: '',
        effective_date: '',
        expiration_date: '',
        healthcare_authority_id: undefined,
        conditions: ''
      });
      setLicenseFile(null);

      // Reload licenses
      await loadLicenses();
    } catch (err: any) {
      setError(err.message || 'Failed to upload license');
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading licenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hospital Licenses</h1>
              {hospital && (
                <div className="mt-2 space-y-1">
                  <p className="text-lg text-gray-600">{hospital.name}</p>
                  <p className="text-sm text-gray-500">
                    Registration Number: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{hospital.registration_number}</span>
                  </p>
                  <p className="text-sm">
                    Status: {hospital.is_verified ? (
                      <span className="text-green-600 font-semibold">✓ Verified</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">⏳ Pending Verification</span>
                    )}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors"
            >
              {showUploadForm ? '✕ Cancel' : '+ Upload New License'}
            </button>
          </div>
        </div>

        {/* Quick Upload Cards for Required Documents */}
        {!hospital?.is_verified && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Required Documents for Verification</h2>
            <p className="text-gray-600 mb-4">Upload these documents to complete your hospital verification (based on Nigerian healthcare regulations):</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* CAC Certificate Card */}
              <div className={`border-2 rounded-lg p-4 ${licenses.some(l => l.license_category?.toLowerCase().includes('cac') || l.license_name?.toLowerCase().includes('cac')) ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`text-2xl mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('cac') || l.license_name?.toLowerCase().includes('cac')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('cac') || l.license_name?.toLowerCase().includes('cac')) ? '✓' : '○'}
                      </span>
                      <h3 className="font-bold text-lg">CAC Registration Certificate</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-11 mb-3">
                      Corporate Affairs Commission business incorporation document (REQUIRED)
                    </p>
                    {licenses.some(l => l.license_category?.toLowerCase().includes('cac') || l.license_name?.toLowerCase().includes('cac')) ? (
                      <div className="ml-11 text-green-600 text-sm font-semibold">✓ Uploaded</div>
                    ) : (
                      <button
                        onClick={() => {
                          setFormData({
                            license_number: '',
                            license_type: 'business_registration',
                            license_name: 'CAC Registration Certificate',
                            license_category: 'Corporate Affairs Commission (CAC)',
                            license_status: 'active',
                            issue_date: '',
                            effective_date: '',
                            expiration_date: '',
                            healthcare_authority_id: undefined,
                            conditions: ''
                          });
                          setIsQuickUpload(true); // Lock License Name field for quick uploads
                          setShowUploadForm(true);
                        }}
                        className="ml-11 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        + Upload CAC Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* State Registration Card */}
              <div className={`border-2 rounded-lg p-4 ${licenses.some(l => l.license_type === 'operating' || l.license_category?.toLowerCase().includes('state')) ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`text-2xl mr-3 ${licenses.some(l => l.license_type === 'operating' || l.license_category?.toLowerCase().includes('state')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_type === 'operating' || l.license_category?.toLowerCase().includes('state')) ? '✓' : '○'}
                      </span>
                      <h3 className="font-bold text-lg">State Health Facility Registration</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-11 mb-1">
                      From your State Health Authority (REQUIRED)
                    </p>
                    <p className="text-xs text-blue-600 ml-11 mb-3">
                      💡 Nigeria has state-based regulation (e.g., HEFAMAA in Lagos)
                    </p>
                    {licenses.some(l => l.license_type === 'operating' || l.license_category?.toLowerCase().includes('state')) ? (
                      <div className="ml-11 text-green-600 text-sm font-semibold">✓ Uploaded</div>
                    ) : (
                      <button
                        onClick={() => {
                          setFormData({
                            license_number: '',
                            license_type: 'operating',
                            license_name: `${hospital?.state || 'State'} Health Facility Registration`,
                            license_category: 'State Health Facility Registration',
                            license_status: 'active',
                            issue_date: '',
                            effective_date: '',
                            expiration_date: '',
                            healthcare_authority_id: undefined,
                            conditions: ''
                          });
                          setIsQuickUpload(true); // Lock License Name field for quick uploads
                          setShowUploadForm(true);
                        }}
                        className="ml-11 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        + Upload State Registration
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Optional Documents */}
        {!hospital?.is_verified && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-3">📄 Optional Professional Council Registrations</h3>
                <p className="text-blue-800 mb-4">
                  Upload certificates from Nigerian professional councils for specialized services you offer:
                </p>

                <div className="bg-white rounded-lg p-4">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('pcn') || l.license_category?.toLowerCase().includes('pharmacy')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('pcn') || l.license_category?.toLowerCase().includes('pharmacy')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">PCN (Pharmaceutical Council of Nigeria)</span>
                        <span className="text-gray-600"> - Required if you operate an in-house pharmacy</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('mlscn') || l.license_category?.toLowerCase().includes('laboratory')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('mlscn') || l.license_category?.toLowerCase().includes('laboratory')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">MLSCN (Medical Laboratory Science Council)</span>
                        <span className="text-gray-600"> - Required for diagnostic laboratory services</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('mdcn')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('mdcn')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">MDCN Staff Practicing Licenses</span>
                        <span className="text-gray-600"> - Current practicing licenses for all medical/dental staff</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('lawma') || l.license_category?.toLowerCase().includes('waste')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('lawma') || l.license_category?.toLowerCase().includes('waste')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">LAWMA Certificate</span>
                        <span className="text-gray-600"> - Medical waste management (Lagos) or state equivalent</span>
                      </div>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      setIsQuickUpload(false); // Allow editing License Name for manual uploads
                      setShowUploadForm(true);
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    + Upload Additional License
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Removed old checklist - now using cards above */}
        {!hospital?.is_verified && false && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-3">📋 PHB Hospital Verification Requirements</h3>
                <p className="text-blue-800 mb-4">
                  To complete your hospital verification and begin accepting patients through PHB, please upload copies of the following documents.
                  These are based on actual Nigerian healthcare regulations:
                </p>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">✅ Required Documents (Core):</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className={`mr-3 text-xl ${licenses.some(l => l.license_category?.toLowerCase().includes('cac') || l.license_name?.toLowerCase().includes('cac')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('cac') || l.license_name?.toLowerCase().includes('cac')) ? '✓' : '○'}
                      </span>
                      <div className="flex-1">
                        <span className="font-medium">CAC Registration Certificate</span>
                        <p className="text-sm text-gray-600">Corporate Affairs Commission - Business incorporation document</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-3 text-xl ${licenses.some(l => l.license_type === 'operating' || l.license_category?.toLowerCase().includes('state') || l.license_category?.toLowerCase().includes('hefamaa')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_type === 'operating' || l.license_category?.toLowerCase().includes('state') || l.license_category?.toLowerCase().includes('hefamaa')) ? '✓' : '○'}
                      </span>
                      <div className="flex-1">
                        <span className="font-medium">State Health Facility Registration</span>
                        <p className="text-sm text-gray-600">
                          From your State Health Authority (e.g., HEFAMAA in Lagos, Edo Health Reg in Edo State, etc.)
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          💡 <strong>Note:</strong> Nigeria has state-based healthcare regulation. Each state issues its own facility registration.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">📄 Professional Council Registrations (If Applicable):</h4>
                  <p className="text-sm text-gray-600 mb-3">Upload certificates from Nigerian professional councils for specialized services you offer:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('pcn') || l.license_category?.toLowerCase().includes('pharmacy')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('pcn') || l.license_category?.toLowerCase().includes('pharmacy')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">PCN (Pharmaceutical Council of Nigeria)</span>
                        <span className="text-gray-600"> - Required if you operate an in-house pharmacy</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('mlscn') || l.license_category?.toLowerCase().includes('laboratory')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('mlscn') || l.license_category?.toLowerCase().includes('laboratory')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">MLSCN (Medical Laboratory Science Council)</span>
                        <span className="text-gray-600"> - Required for diagnostic laboratory services</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('mdcn')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('mdcn')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">MDCN Staff Practicing Licenses</span>
                        <span className="text-gray-600"> - Current practicing licenses for all medical/dental staff</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-3 ${licenses.some(l => l.license_category?.toLowerCase().includes('lawma') || l.license_category?.toLowerCase().includes('waste')) ? 'text-green-600' : 'text-gray-400'}`}>
                        {licenses.some(l => l.license_category?.toLowerCase().includes('lawma') || l.license_category?.toLowerCase().includes('waste')) ? '✓' : '○'}
                      </span>
                      <div>
                        <span className="font-medium">LAWMA Certificate</span>
                        <span className="text-gray-600"> - Medical waste management certification (Lagos) or state equivalent</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">⚠️ Next Steps:</span> Once you've uploaded your required license(s),
                    our PHB admin team will review your application within 2-3 business days. You'll receive an email notification
                    when your hospital is verified and the official PHB Professional Certificate is issued.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Success</p>
            <p>{success}</p>
          </div>
        )}

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New License</h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* License Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., NG-HOS-2025-001"
                  />
                </div>

                {/* License Name (Conditional based on upload method) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="license_name"
                    value={formData.license_name}
                    disabled={isQuickUpload}
                    onChange={!isQuickUpload ? handleInputChange : undefined}
                    required
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                      isQuickUpload
                        ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                        : 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder={isQuickUpload
                      ? "Set automatically by upload buttons"
                      : "e.g., Hospital Operating License"
                    }
                  />
                  {isQuickUpload && (
                    <p className="mt-1 text-xs text-gray-500">💡 License name is pre-filled when using quick upload buttons (CAC Certificate, State Registration)</p>
                  )}
                </div>

                {/* License Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="license_type"
                    value={formData.license_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="operating">Operating License</option>
                    <option value="specialist">Specialist Service</option>
                    <option value="pharmacy">Pharmacy License</option>
                    <option value="laboratory">Laboratory License</option>
                    <option value="radiology">Radiology License</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* License Category (Conditional based on upload method) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Category
                  </label>
                  <input
                    type="text"
                    name="license_category"
                    value={formData.license_category}
                    disabled={isQuickUpload}
                    onChange={!isQuickUpload ? handleInputChange : undefined}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                      isQuickUpload
                        ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                        : 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder={isQuickUpload
                      ? "Set automatically by upload buttons"
                      : "e.g., State Health Facility License"
                    }
                  />
                  {isQuickUpload && (
                    <p className="mt-1 text-xs text-gray-500">💡 Category is pre-filled when using quick upload buttons (CAC Certificate, State Registration)</p>
                  )}
                </div>

                {/* Issue Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    name="issue_date"
                    value={formData.issue_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Effective Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    name="effective_date"
                    value={formData.effective_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* License Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="license_status"
                    value={formData.license_status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* License Certificate File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Certificate (PDF/Image)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {licenseFile && (
                  <p className="mt-2 text-sm text-gray-600">Selected: {licenseFile.name}</p>
                )}
              </div>

              {/* Conditions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conditions
                </label>
                <textarea
                  name="conditions"
                  value={formData.conditions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any conditions attached to this license..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {uploading ? 'Uploading...' : 'Upload License'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Licenses List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Current Licenses ({licenses.length})</h2>
          </div>

          {licenses.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Licenses Yet</h3>
              <p className="text-gray-500 mb-6">Upload your first license to get started</p>
              <button
                onClick={() => {
                  setIsQuickUpload(false); // Allow editing License Name for manual uploads
                  setShowUploadForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                + Upload License
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {licenses.map((license) => (
                <div key={license.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{license.license_name}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(license.license_status)}`}>
                          {license.license_status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">License Number</p>
                          <p className="font-mono text-sm font-semibold">{license.license_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="text-sm font-semibold capitalize">{license.license_type}</p>
                        </div>
                        {license.license_category && (
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="text-sm font-semibold">{license.license_category}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="text-sm font-semibold">{formatDate(license.issue_date)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Effective Date</p>
                          <p className="text-sm font-semibold">{formatDate(license.effective_date)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Expiration Date</p>
                          <p className="text-sm font-semibold">{formatDate(license.expiration_date)}</p>
                        </div>
                      </div>

                      {license.healthcare_authority && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Issuing Authority</p>
                          <p className="text-sm font-semibold">{license.healthcare_authority.name}</p>
                        </div>
                      )}

                      {/* Show rejection reason prominently for revoked licenses */}
                      {license.license_status === 'revoked' && license.conditions && license.conditions.startsWith('REJECTED:') && (
                        <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <span className="text-red-600 text-xl">⚠️</span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-red-900 mb-1">Rejection Reason</p>
                              <p className="text-sm text-red-700">{license.conditions.replace('REJECTED: ', '')}</p>
                              <p className="text-xs text-red-600 mt-2">
                                💡 Please upload a new certificate that addresses the issue above
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {license.conditions && !license.conditions.startsWith('REJECTED:') && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Conditions</p>
                          <p className="text-sm text-gray-700">{license.conditions}</p>
                        </div>
                      )}

                      {license.limitations && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Limitations</p>
                          <p className="text-sm text-gray-700">{license.limitations}</p>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex flex-col gap-2">
                      {license.license_certificate && (
                        <a
                          href={license.license_certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-center"
                        >
                          📄 View Certificate
                        </a>
                      )}

                      {/* Show resubmit button for revoked licenses */}
                      {license.license_status === 'revoked' && (
                        <button
                          onClick={() => {
                            // Pre-fill form with existing license data but allow certificate update
                            setFormData({
                              license_number: license.license_number,
                              license_type: license.license_type,
                              license_name: license.license_name,
                              license_category: license.license_category || '',
                              license_status: 'pending', // Will be set to pending on resubmit
                              issue_date: license.issue_date || '',
                              effective_date: license.effective_date || '',
                              expiration_date: license.expiration_date || '',
                              healthcare_authority_id: license.healthcare_authority?.id,
                              conditions: ''
                            });
                            setIsQuickUpload(false); // Allow editing all fields
                            setShowUploadForm(true);
                          }}
                          className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          🔄 Upload New Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
