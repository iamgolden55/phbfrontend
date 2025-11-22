import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OnboardingTestPage: React.FC = () => {
  const [imagesStatus, setImagesStatus] = useState<Record<string, 'loading' | 'success' | 'error'>>({
    welcome: 'loading',
    hpn: 'loading',
    hospital: 'loading',
    records: 'loading',
    emergency: 'loading',
    complete: 'loading',
  });

  const handleImageLoad = (key: string) => {
    setImagesStatus(prev => ({ ...prev, [key]: 'success' }));
  };

  const handleImageError = (key: string) => {
    setImagesStatus(prev => ({ ...prev, [key]: 'error' }));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Onboarding SVG Test Page</h1>

        <div className="mb-8">
          <Link to="/test" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Test Page
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test each SVG */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-bold mb-2">Welcome Illustration</h2>
            <div className="bg-white p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
              <img
                src="/images/welcome-illustration.svg"
                alt="Welcome"
                className="h-48 w-48 object-contain"
                onLoad={() => handleImageLoad('welcome')}
                onError={() => handleImageError('welcome')}
              />
            </div>
            <div className={`text-sm font-medium ${
              imagesStatus.welcome === 'loading' ? 'text-gray-500' :
              imagesStatus.welcome === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              Status: {imagesStatus.welcome}
            </div>
            <div className="mt-2 text-xs text-gray-500">Path: /images/welcome-illustration.svg</div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-bold mb-2">HPN Illustration</h2>
            <div className="bg-white p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
              <img
                src="/images/hpn-illustration.svg"
                alt="HPN"
                className="h-48 w-48 object-contain"
                onLoad={() => handleImageLoad('hpn')}
                onError={() => handleImageError('hpn')}
              />
            </div>
            <div className={`text-sm font-medium ${
              imagesStatus.hpn === 'loading' ? 'text-gray-500' :
              imagesStatus.hpn === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              Status: {imagesStatus.hpn}
            </div>
            <div className="mt-2 text-xs text-gray-500">Path: /images/hpn-illustration.svg</div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-bold mb-2">Hospital Illustration</h2>
            <div className="bg-white p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
              <img
                src="/images/hospital-illustration.svg"
                alt="Hospital"
                className="h-48 w-48 object-contain"
                onLoad={() => handleImageLoad('hospital')}
                onError={() => handleImageError('hospital')}
              />
            </div>
            <div className={`text-sm font-medium ${
              imagesStatus.hospital === 'loading' ? 'text-gray-500' :
              imagesStatus.hospital === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              Status: {imagesStatus.hospital}
            </div>
            <div className="mt-2 text-xs text-gray-500">Path: /images/hospital-illustration.svg</div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-bold mb-2">Records Illustration</h2>
            <div className="bg-white p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
              <img
                src="/images/records-illustration.svg"
                alt="Records"
                className="h-48 w-48 object-contain"
                onLoad={() => handleImageLoad('records')}
                onError={() => handleImageError('records')}
              />
            </div>
            <div className={`text-sm font-medium ${
              imagesStatus.records === 'loading' ? 'text-gray-500' :
              imagesStatus.records === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              Status: {imagesStatus.records}
            </div>
            <div className="mt-2 text-xs text-gray-500">Path: /images/records-illustration.svg</div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-bold mb-2">Emergency Illustration</h2>
            <div className="bg-white p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
              <img
                src="/images/emergency-illustration.svg"
                alt="Emergency"
                className="h-48 w-48 object-contain"
                onLoad={() => handleImageLoad('emergency')}
                onError={() => handleImageError('emergency')}
              />
            </div>
            <div className={`text-sm font-medium ${
              imagesStatus.emergency === 'loading' ? 'text-gray-500' :
              imagesStatus.emergency === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              Status: {imagesStatus.emergency}
            </div>
            <div className="mt-2 text-xs text-gray-500">Path: /images/emergency-illustration.svg</div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-bold mb-2">Complete Illustration</h2>
            <div className="bg-white p-4 rounded-lg mb-4 h-64 flex items-center justify-center">
              <img
                src="/images/complete-illustration.svg"
                alt="Complete"
                className="h-48 w-48 object-contain"
                onLoad={() => handleImageLoad('complete')}
                onError={() => handleImageError('complete')}
              />
            </div>
            <div className={`text-sm font-medium ${
              imagesStatus.complete === 'loading' ? 'text-gray-500' :
              imagesStatus.complete === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              Status: {imagesStatus.complete}
            </div>
            <div className="mt-2 text-xs text-gray-500">Path: /images/complete-illustration.svg</div>
          </div>
        </div>

        {/* Overall Status */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-bold mb-4">Overall Status</h2>
          <div className="space-y-2">
            {Object.entries(imagesStatus).map(([key, status]) => (
              <div key={key} className="flex items-center">
                <span className="w-32 font-medium">{key}:</span>
                <span className={`${
                  status === 'loading' ? 'text-gray-500' :
                  status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {status}
                </span>
                {status === 'error' && (
                  <span className="ml-2 text-xs text-red-500">
                    (Path may be incorrect or file missing)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">SVG Test Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold mb-2">Inline SVG Test</h3>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="50" fill="#0891b2"/>
                <circle cx="50" cy="50" r="30" fill="white"/>
              </svg>
              <p className="mt-2 text-sm">If you see a blue circle with white center, SVG rendering works.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTestPage;
