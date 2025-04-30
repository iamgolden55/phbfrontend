import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfessionalAuth, ProfessionalRole } from './professionalAuthContext';

const ProfessionalRegisterForm: React.FC = () => {
  const [formStep, setFormStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<ProfessionalRole>('doctor');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { register, error, isLoading, clearError } = useProfessionalAuth();
  const navigate = useNavigate();

  // Mock verification code for demo purposes
  const mockVerificationCode = '123456';

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 0) {
      if (!name.trim()) errors.name = 'Name is required';
      if (!email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';

      if (!password) errors.password = 'Password is required';
      else if (password.length < 8) errors.password = 'Password must be at least 8 characters';

      if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    }

    if (step === 1) {
      if (!role) errors.role = 'Role is required';
      if (!licenseNumber.trim()) errors.licenseNumber = 'License number is required';
      if (role === 'doctor' && !specialty.trim()) errors.specialty = 'Specialty is required';
      if (!acceptedTerms) errors.terms = 'You must accept the terms and conditions';
    }

    if (step === 2) {
      if (!verificationCode.trim()) errors.verificationCode = 'Verification code is required';
      else if (verificationCode !== mockVerificationCode)
        errors.verificationCode = 'Invalid verification code';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(formStep)) return;

    try {
      await register(name, email, password, role, licenseNumber, specialty);
      navigate('/professional/dashboard');
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  const getSpecialtyOptions = () => {
    switch (role) {
      case 'doctor':
        return [
          'Cardiology', 'Dermatology', 'Emergency Medicine', 'Family Medicine',
          'Internal Medicine', 'Neurology', 'Obstetrics & Gynecology', 'Oncology',
          'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Other'
        ];
      case 'nurse':
        return [
          'Critical Care', 'Emergency', 'Family Practice', 'Geriatrics',
          'Medical-Surgical', 'Neonatal', 'Obstetrics', 'Oncology',
          'Pediatrics', 'Psychiatric', 'Other'
        ];
      case 'researcher':
        return [
          'Clinical Research', 'Epidemiology', 'Genomics', 'Health Services Research',
          'Medical Informatics', 'Pharmacology', 'Public Health', 'Other'
        ];
      case 'pharmacist':
        return [
          'Clinical Pharmacy', 'Community Pharmacy', 'Hospital Pharmacy',
          'Pharmaceutical Research', 'Regulatory Affairs', 'Other'
        ];
      default:
        return ['Other'];
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Healthcare Professional Registration</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            className="float-right text-red-700"
            onClick={clearError}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full flex-1 mx-1 ${formStep === step ? 'bg-blue-600' : formStep > step ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          {formStep === 0 && 'Step 1: Personal Information'}
          {formStep === 1 && 'Step 2: Professional Details'}
          {formStep === 2 && 'Step 3: Verification'}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {formStep === 0 && (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Dr. John Smith"
                required
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Professional Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="doctor@organization.org"
                required
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
            </div>
          </>
        )}

        {/* Step 2: Professional Details */}
        {formStep === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                Professional Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as ProfessionalRole)}
                className={`w-full px-3 py-2 border ${formErrors.role ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              >
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="researcher">Healthcare Researcher</option>
                <option value="pharmacist">Pharmacist</option>
              </select>
              {formErrors.role && <p className="text-red-500 text-xs mt-1">{formErrors.role}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="licenseNumber" className="block text-gray-700 font-medium mb-2">
                Professional License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.licenseNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., GMC #123456"
                required
              />
              {formErrors.licenseNumber && <p className="text-red-500 text-xs mt-1">{formErrors.licenseNumber}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="specialty" className="block text-gray-700 font-medium mb-2">
                Specialty
              </label>
              <select
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.specialty ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a specialty</option>
                {getSpecialtyOptions().map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {formErrors.specialty && <p className="text-red-500 text-xs mt-1">{formErrors.specialty}</p>}
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className={`h-4 w-4 text-blue-600 border ${formErrors.terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-blue-500`}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the terms and conditions and certify that I am a licensed healthcare professional
                </label>
              </div>
              {formErrors.terms && <p className="text-red-500 text-xs mt-1">{formErrors.terms}</p>}
            </div>
          </>
        )}

        {/* Step 3: Verification */}
        {formStep === 2 && (
          <>
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                For security purposes, we've sent a verification code to your email. Please enter it below.
                <br /><br />
                <span className="text-sm text-blue-600 italic">
                  (For demo purposes, use the code: 123456)
                </span>
              </p>

              <label htmlFor="verificationCode" className="block text-gray-700 font-medium mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.verificationCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {formErrors.verificationCode && <p className="text-red-500 text-xs mt-1">{formErrors.verificationCode}</p>}
            </div>
          </>
        )}

        <div className="flex justify-between">
          {formStep > 0 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Back
            </button>
          )}

          {formStep < 2 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ml-auto"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ml-auto ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Registering...' : 'Complete Registration'}
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/professional/login" className="text-blue-600 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProfessionalRegisterForm;
