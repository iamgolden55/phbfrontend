/**
 * Professional Registry Application Page
 *
 * Public page where healthcare professionals can apply for PHB registry
 * Wraps the ProfessionalApplicationForm component with proper layout
 *
 * MICROSERVICE-READY: No dependencies on main app
 */

import React from 'react';
import ProfessionalApplicationForm from '../../features/registry/ProfessionalApplicationForm';

const ApplyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              PHB Professional Registry Application
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join Nigeria's trusted network of verified healthcare professionals.
              Your license will be verified and you'll receive a unique PHB number.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <span className="text-2xl">🔒</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Verified Profile</h3>
                <p className="text-sm text-gray-600">
                  Your credentials verified by regulatory bodies
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                  <span className="text-2xl">💼</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Professional Network</h3>
                <p className="text-sm text-gray-600">
                  Connect with healthcare facilities nationwide
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Career Opportunities</h3>
                <p className="text-sm text-gray-600">
                  Access exclusive job postings and triage requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfessionalApplicationForm />
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                📋 Required Documents
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Valid regulatory body certificate (PCN, MDCN, NMCN, etc.)</li>
                <li>• Highest degree certificate</li>
                <li>• Valid government-issued ID</li>
                <li>• Passport photograph</li>
                <li>• Current practice license (if applicable)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ⏱️ Application Process
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Complete the application form (15-20 minutes)</li>
                <li>• Upload required documents</li>
                <li>• Admin verification (2-5 business days)</li>
                <li>• Receive PHB professional number</li>
                <li>• Start accepting prescriptions and consultations</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Need help?</strong> Contact our support team at{' '}
              <a href="mailto:registry@phb.ng" className="underline">
                registry@phb.ng
              </a>{' '}
              or call <strong>+234 800 PHB HELP</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
