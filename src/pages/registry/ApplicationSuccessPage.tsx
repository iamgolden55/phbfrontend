import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { registryService } from '../../services/registryService';

/**
 * Application Success Page
 *
 * Shown after successful professional registration.
 * Validates application status and shows appropriate message.
 */
export default function ApplicationSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('id');

  const [applicationStatus, setApplicationStatus] = useState<'loading' | 'pending' | 'approved' | 'rejected' | 'error'>('loading');
  const [licenseNumber, setLicenseNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // If no application ID, redirect to apply page
    if (!applicationId) {
      navigate('/registry/apply');
      return;
    }

    // Fetch application status from backend
    const checkApplicationStatus = async () => {
      try {
        // Call backend to get application status
        const response = await registryService.getApplicationStatus(applicationId);

        if (response.status === 'approved' && response.license_number) {
          setApplicationStatus('approved');
          setLicenseNumber(response.license_number);
        } else if (response.status === 'rejected') {
          setApplicationStatus('rejected');
          setErrorMessage(response.reason || 'Application was not approved');
        } else {
          setApplicationStatus('pending');
        }
      } catch (error: any) {
        console.error('Error fetching application status:', error);
        // If the application doesn't exist or there's an error, still show pending
        // This maintains backwards compatibility with old URLs
        setApplicationStatus('pending');
      }
    };

    checkApplicationStatus();
  }, [applicationId, navigate]);

  // Show loading state
  if (applicationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Checking application status...</p>
        </div>
      </div>
    );
  }

  // Show approved/licensed status
  if (applicationStatus === 'approved' && licenseNumber) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your License is Active!
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Your professional registration has been approved and your license is now active.
            </p>

            {/* License Number */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">PHB License Number</p>
              <p className="text-2xl font-mono font-bold text-green-900">
                {licenseNumber}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ✨ What's Next?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your profile is now visible in the public registry</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access your professional dashboard to manage your practice</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Keep your license details safe and readily available</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/professional/dashboard')}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate(`/registry/professional/${applicationId}`)}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                View Public Profile
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need help? Contact support at{' '}
                <a href="mailto:support@phb.ng" className="text-blue-600 hover:underline">
                  support@phb.ng
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show rejected status
  if (applicationStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <XCircle className="w-16 h-16 text-red-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Not Approved
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Unfortunately, your application could not be approved at this time.
            </p>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                <p className="text-sm font-semibold text-gray-700 mb-2">Reason:</p>
                <p className="text-gray-800">{errorMessage}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/registry/apply')}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Apply Again
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show pending status (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Pending Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <Clock className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          {/* Pending Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Under Review
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Your professional registration application is currently being reviewed by our team.
          </p>

          {/* Application ID */}
          {applicationId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600 mb-2">Application ID</p>
              <p className="text-lg font-mono font-semibold text-blue-900">
                {applicationId}
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📋 What Happens Next
            </h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">1.</span>
                <span>Check your email for login credentials and updates</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">2.</span>
                <span>Log in to upload any required documents</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">3.</span>
                <span>Review typically takes 3-5 business days</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">4.</span>
                <span>You'll receive an email when your application is processed</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/professional/login')}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Professional Login
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              Return to Home
            </button>
          </div>

          {/* Contact Support */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Contact support at{' '}
              <a href="mailto:support@phb.ng" className="text-blue-600 hover:underline">
                support@phb.ng
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
