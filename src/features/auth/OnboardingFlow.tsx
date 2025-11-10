import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './authContext';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  image: string;
  details: React.ReactNode;
}

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});
  const [copyStatus, setCopyStatus] = useState('Copy to clipboard');
  const navigate = useNavigate();
  const { completeOnboarding, user, createTestUser } = useAuth();

  // Debug logging
  useEffect(() => {
    console.log('OnboardingFlow mounted');
    console.log('User data:', user);
  }, [user]);

  // Fix: Create a test user if none exists and we're on the onboarding page
  useEffect(() => {
    if (!user) {
      console.log('No user found in context, but on onboarding page - creating test user');
      try {
        createTestUser?.();
      } catch (error) {
        console.error('Failed to create test user:', error);
      }
    }
  }, [user, createTestUser]);

  // Define handleComplete before it's used in the steps array
  const handleComplete = async () => {
    console.log('Completing onboarding');
    try {
      // Call the completeOnboarding function from auth context
      const result = await completeOnboarding();
      
      console.log('Onboarding completion result:', result);
      
      // Set the temporary flag in localStorage to prevent redirect loops
      // This is redundant since completeOnboarding already sets it, but keeping for safety
      localStorage.setItem('phb_onboarding_completed', 'true');
      
      // Navigate to account page regardless of API success
      console.log('Navigating to account page');
      
      // Use navigate if possible, with a fallback to window.location
      try {
        navigate('/account');
      } catch (navError) {
        console.error('Navigation error, using fallback:', navError);
        window.location.href = '/account';
      }
    } catch (error) {
      console.error("Error during completeOnboarding call:", error);
      
      // Set the flag even if there was an error to prevent loops
      localStorage.setItem('phb_onboarding_completed', 'true');
      
      // Still navigate to account page even if there was an error
      console.log('Navigating to account page despite error');
      try {
        navigate('/account');
      } catch (navError) {
        window.location.href = '/account';
      }
    }
  };

  // Function to handle copying HPN
  const handleCopyHpn = () => {
    if (user?.hpn) {
      navigator.clipboard.writeText(user.hpn)
        .then(() => {
          setCopyStatus('Copied!');
          setTimeout(() => setCopyStatus('Copy to clipboard'), 2000); // Reset after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy HPN: ', err);
          setCopyStatus('Failed to copy');
           setTimeout(() => setCopyStatus('Copy to clipboard'), 2000);
        });
    } else {
      console.warn('Cannot copy HPN, user or hpn field is missing');
       setCopyStatus('Nothing to copy');
       setTimeout(() => setCopyStatus('Copy to clipboard'), 2000);
    }
  };

  // Function to navigate to Hospital Registration page
  const handleFindHospital = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Navigating to Hospital Registration page');
    window.location.href = '/account/link-phb';
  };

  // Function to navigate to Health Records page
  const handleUploadRecords = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Navigating to Health Records page');
    window.location.href = '/account/health-records';
  };

  // Onboarding steps data
  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to PHB',
      description: 'Your comprehensive health management platform',
      image: '/images/welcome-illustration.svg',
      details: (
        <div className="space-y-4">
          <p>
            Thank you for joining PHB{user ? `, ${user?.full_name}` : ''}! We're excited to help you manage your health journey
            more effectively. This quick guide will walk you through the key features of our platform.
          </p>
          <p className="font-medium">
            Let's get started and explore what PHB can do for you!
          </p>
        </div>
      ),
    },
    {
      id: 'hpn',
      title: 'Your Health Point Number (HPN)',
      description: 'Your unique healthcare identifier',
      image: '/images/hpn-illustration.svg',
      details: (
        <div className="space-y-4">
          <p>
            Your <span className="font-semibold">Health Point Number (HPN)</span> is a unique identifier that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Securely links all your medical records</li>
            <li>Enables quick access by healthcare providers</li>
            <li>Ensures accurate patient identification</li>
            <li>Facilitates seamless care coordination</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-700">
              <span className="font-bold">Pro Tip:</span> Share this number with healthcare providers to access your complete medical history.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Your Health Point Number</p>
              <p className="font-mono font-bold text-lg">{user?.hpn || 'Not Available'}</p>
            </div>
            <button
              onClick={handleCopyHpn}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user?.hpn || copyStatus !== 'Copy to clipboard'}
            >
              {copyStatus}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'primary-hospital',
      title: 'Register with a Primary Hospital',
      description: 'Set up your healthcare network',
      image: '/images/hospital-illustration.svg',
      details: (
        <div className="space-y-4">
          <p>
            Before you can book appointments and access full PHB services, you'll need to register with a primary hospital in your area.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Why register with a primary hospital?</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Book appointments directly through PHB</li>
              <li>Access your care team in one place</li>
              <li>Ensure continuity of care</li>
              <li>Receive personalized health recommendations</li>
              <li>Simplify referrals to specialists</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors"
              onClick={handleFindHospital}
            >
              Find hospitals near me
            </button>
            <button
              onClick={() => handleNext()}
              className="flex-1 border border-[#005eb8] text-[#005eb8] py-2 px-4 rounded hover:bg-blue-50 transition-colors"
            >
              Set up later
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'medical-records',
      title: 'Manage Your Medical Records',
      description: 'Keep your health history in one place',
      image: '/images/records-illustration.svg',
      details: (
        <div className="space-y-4">
          <p>
            PHB makes it easy to store, access, and share your medical records. Our Elara AI technology helps analyze and organize your health information.
          </p>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Upload and manage your records</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload past medical records securely</li>
              <li>Elara AI analyzes and categorizes your documents</li>
              <li>Access test results, prescriptions, and diagnoses</li>
              <li>Share specific records with healthcare providers</li>
              <li>Receive insights about your health patterns</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors"
              onClick={handleUploadRecords}
            >
              Upload records now
            </button>
            <button
              onClick={() => handleNext()}
              className="flex-1 border border-[#005eb8] text-[#005eb8] py-2 px-4 rounded hover:bg-blue-50 transition-colors"
            >
              Explore later
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'emergency',
      title: 'Emergency Assistance',
      description: 'Quick access to help when you need it most',
      image: '/images/emergency-illustration.svg',
      details: (
        <div className="space-y-4">
          <p>
            PHB provides tools to help during medical emergencies such as immediate labor, asthma attacks, or other urgent situations.
          </p>

          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
            <h4 className="font-medium text-red-700 mb-2">Remember:</h4>
            <p className="text-red-700">For life-threatening emergencies, always call your local emergency number (e.g., 911) first.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md mt-2">
            <h4 className="font-medium mb-2">PHB Emergency Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>One-tap emergency contacts</li>
              <li>Quick access to your medical info for first responders</li>
              <li>Emergency symptom assessment</li>
              <li>Location sharing with emergency contacts</li>
              <li>Special workflows for pregnancy, chronic conditions</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
              Set up emergency contacts
            </button>
            <button className="flex-1 border border-red-600 text-red-600 py-2 px-4 rounded hover:bg-red-50 transition-colors">
              Configure later
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: "You're All Set!",
      description: 'Start exploring PHB',
      image: '/images/complete-illustration.svg',
      details: (
        <div className="space-y-4">
          <p>
            Congratulations! You're now ready to start using PHB. Here are some next steps you might want to take:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-medium mb-2 text-green-700">Complete your profile</h4>
              <p className="text-sm">Add more health details for better personalization.</p>
              <Link to="/account" className="mt-2 text-green-700 hover:text-green-900 text-sm font-medium inline-block">
                Go to profile →
              </Link>
            </div>

            <div className="bg-purple-50 p-4 rounded-md">
              <h4 className="font-medium mb-2 text-purple-700">Find a doctor</h4>
              <p className="text-sm">Search for healthcare providers in your area.</p>
              <Link to="/find-a-gp" className="mt-2 text-purple-700 hover:text-purple-900 text-sm font-medium inline-block">
                Search now →
              </Link>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2 text-blue-700">Explore health resources</h4>
              <p className="text-sm">Access articles, videos, and tools for better health.</p>
              <Link to="/health-a-z" className="mt-2 text-blue-700 hover:text-blue-900 text-sm font-medium inline-block">
                Browse resources →
              </Link>
            </div>

            <div className="bg-orange-50 p-4 rounded-md">
              <h4 className="font-medium mb-2 text-orange-700">Set health goals</h4>
              <p className="text-sm">Define and track your health objectives.</p>
              <Link to="/account" className="mt-2 text-orange-700 hover:text-orange-900 text-sm font-medium inline-block">
                Start now →
              </Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-[#005eb8] text-white py-3 px-8 rounded-full hover:bg-[#004c93] transition-colors text-lg font-medium"
              onClick={handleComplete}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < 2) {
      setShowSkipWarning(true);
    } else {
      handleComplete();
    }
  };

  const closeWarning = () => {
    setShowSkipWarning(false);
  };

  const confirmSkip = () => {
    setShowSkipWarning(false);
    handleComplete();
  };

  const handleImageError = (imagePath: string) => {
    console.error(`Error loading image: ${imagePath}`);
    setImageLoadError(prev => ({ ...prev, [imagePath]: true }));
  };

  // Debug the component rendering
  console.log('Rendering OnboardingFlow, currentStep:', currentStep);

  // Check if user is not authenticated, provide a way to test
  if (!user && !createTestUser) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the onboarding flow. Please log in or register first.
          </p>
          <div className="space-y-4">
            <Link
              to="/login"
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
            >
              Go to Login
            </Link>
            <Link
              to="/register"
              className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700"
            >
              Go to Register
            </Link>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-700 mb-2">Debug Information</h3>
            <p className="text-sm text-gray-600">
              The onboarding flow requires a logged-in user to function properly.
              The component is receiving: <code className="bg-gray-100 px-1 py-0.5 rounded">user = {String(user)}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Debug information */}
      {Object.keys(imageLoadError).length > 0 && (
        <div className="bg-red-100 text-red-700 p-2 text-sm">
          Error loading images: {Object.keys(imageLoadError).join(', ')}
        </div>
      )}

      {/* Progress bar */}
      <div className="bg-gray-50 py-4 px-6 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Skip tour
              </button>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#005eb8] h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left side - Illustration */}
          <div className="w-full md:w-2/5 flex justify-center">
            {/* Fallback in case image doesn't load */}
            {imageLoadError[steps[currentStep].image] ? (
              <div className="w-64 h-64 bg-blue-50 flex items-center justify-center rounded-full">
                <div className="text-center p-4">
                  <div className="text-5xl text-blue-500 mb-2">
                    {currentStep + 1}
                  </div>
                  <div className="text-blue-700 font-medium">
                    {steps[currentStep].title}
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={steps[currentStep].image}
                alt={`Illustration for ${steps[currentStep].title}`}
                className="w-64 h-64 object-contain"
                onError={() => handleImageError(steps[currentStep].image)}
              />
            )}
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-3/5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 mb-6">
              {steps[currentStep].description}
            </p>

            <div className="mb-8">
              {steps[currentStep].details}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className={`px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[#005eb8] text-white rounded hover:bg-[#004c93] transition-colors"
              >
                {currentStep < steps.length - 1 ? 'Continue' : 'Finish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skip warning modal */}
      {showSkipWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">Skip the onboarding tour?</h3>
            <p className="text-gray-600 mb-6">
              The onboarding tour provides important information about key PHB features.
              Are you sure you want to skip it?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeWarning}
                className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
              >
                Continue tour
              </button>
              <button
                onClick={confirmSkip}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Skip anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
