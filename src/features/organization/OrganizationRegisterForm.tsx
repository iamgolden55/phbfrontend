import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganizationAuth, OrganizationRegistrationData } from './organizationAuthContext';

const OrganizationRegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState<OrganizationRegistrationData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'hospital', // Default selection
    address: '',
    contactNumber: '',
    website: '',
    registrationNumber: '',
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register, error, isLoading, clearError } = useOrganizationAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    clearError();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(e.target.checked);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== totalSteps) {
      nextStep();
      return;
    }
    
    try {
      await register(formData);
      navigate('/organization/dashboard');
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  // Validate current step to enable/disable next button
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && 
               formData.type.trim() !== '' && 
               formData.registrationNumber.trim() !== '';
      case 2:
        return formData.email.trim() !== '' && 
               formData.contactNumber.trim() !== '' && 
               formData.address.trim() !== '';
      case 3:
        return formData.password.trim() !== '' && 
               formData.confirmPassword.trim() !== '' && 
               formData.password === formData.confirmPassword &&
               agreedToTerms;
      default:
        return false;
    }
  };

  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="flex justify-center mb-8">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${currentStep > index + 1 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : currentStep === index + 1 
                  ? 'border-blue-500 text-blue-500' 
                  : 'border-gray-300 text-gray-300'}`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`w-12 h-1 ${currentStep > index + 1 ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Step 1: Organization Information
  const renderStepOne = () => {
    return (
      <>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Organization Information</h3>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
                Organization Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="hospital">Hospital</option>
                <option value="ngo">NGO</option>
                <option value="pharmaceutical">Pharmaceutical</option>
              </select>
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-gray-700 font-medium mb-2">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Step 2: Contact Information
  const renderStepTwo = () => {
    return (
      <>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="website" className="block text-gray-700 font-medium mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </>
    );
  };

  // Step 3: Security & Agreement
  const renderStepThree = () => {
    return (
      <>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security & Agreement</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo();
      case 3:
        return renderStepThree();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Register Your Organization</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {renderStepIndicators()}

      <form onSubmit={handleSubmit}>
        {renderStepContent()}

        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Previous
            </button>
          ) : (
            <div></div> // Empty div to maintain flex spacing
          )}
          
          <button
            type={currentStep === totalSteps ? "submit" : "button"}
            onClick={currentStep === totalSteps ? undefined : nextStep}
            disabled={isLoading || !validateCurrentStep()}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (isLoading || !validateCurrentStep()) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Processing...' : 
             currentStep === totalSteps ? 'Register Organization' : 'Next'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/organization/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrganizationRegisterForm; 