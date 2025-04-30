import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';
import { Link } from 'react-router-dom';

// List of countries
const countries = [
  { value: 'nigeria', label: 'Nigeria', requiresNIN: true },
  { value: 'ghana', label: 'Ghana' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'south-africa', label: 'South Africa' },
  { value: 'united-states', label: 'United States', requiresSSN: true },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'india', label: 'India' },
  { value: 'china', label: 'China' },
  // Add more countries as needed
];

// List of languages
const languages = [
  { value: 'english', label: 'English' },
  { value: 'yoruba', label: 'Yoruba' },
  { value: 'igbo', label: 'Igbo' },
  { value: 'ikwerre', label: 'Ikwerre' },
  { value: 'ìjò', label: 'Ijọ (Ijaw)' },
  { value: 'isoko', label: 'Isoko' },
  { value: 'itsekiri', label: 'Itsekiri' },
  { value: 'hausa', label: 'Hausa' },
  { value: 'madinawa', label: 'Madinawa' },
  { value: 'margi', label: 'Margi' },
  { value: 'other', label: 'Other' },
];

// List of Nigerian states
const nigerianStates = [
  { value: 'abia', label: 'Abia' },
  { value: 'adamawa', label: 'Adamawa' },
  { value: 'akwa-ibom', label: 'Akwa Ibom' },
  { value: 'anambra', label: 'Anambra' },
  { value: 'bauchi', label: 'Bauchi' },
  { value: 'bayelsa', label: 'Bayelsa' },
  { value: 'benue', label: 'Benue' },
  { value: 'borno', label: 'Borno' },
  { value: 'cross-river', label: 'Cross River' },
  { value: 'delta', label: 'Delta' },
  { value: 'ebonyi', label: 'Ebonyi' },
  { value: 'edo', label: 'Edo' },
  { value: 'ekiti', label: 'Ekiti' },
  { value: 'enugu', label: 'Enugu' },
  { value: 'fct', label: 'Federal Capital Territory' },
  { value: 'gombe', label: 'Gombe' },
  { value: 'imo', label: 'Imo' },
  { value: 'jigawa', label: 'Jigawa' },
  { value: 'kaduna', label: 'Kaduna' },
  { value: 'kano', label: 'Kano' },
  { value: 'katsina', label: 'Katsina' },
  { value: 'kebbi', label: 'Kebbi' },
  { value: 'kogi', label: 'Kogi' },
  { value: 'kwara', label: 'Kwara' },
  { value: 'lagos', label: 'Lagos' },
  { value: 'nasarawa', label: 'Nasarawa' },
  { value: 'niger', label: 'Niger' },
  { value: 'ogun', label: 'Ogun' },
  { value: 'ondo', label: 'Ondo' },
  { value: 'osun', label: 'Osun' },
  { value: 'oyo', label: 'Oyo' },
  { value: 'plateau', label: 'Plateau' },
  { value: 'rivers', label: 'Rivers' },
  { value: 'sokoto', label: 'Sokoto' },
  { value: 'taraba', label: 'Taraba' },
  { value: 'yobe', label: 'Yobe' },
  { value: 'zamfara', label: 'Zamfara' },
];

const RegisterForm: React.FC = () => {
  // Basic info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Personal info
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Location info
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [nin, setNin] = useState(''); // For Nigeria
  const [ssn, setSsn] = useState(''); // For US

  // Language preferences
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [customLanguage, setCustomLanguage] = useState('');
  const [secondaryLanguages, setSecondaryLanguages] = useState<string[]>([]);

  // Consent agreements
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentHipaa, setConsentHipaa] = useState(false);
  const [consentDataProcessing, setConsentDataProcessing] = useState(false);

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState('basic');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const { register, isLoading, error, clearError } = useAuth();

  // Update selected country when country changes
  useEffect(() => {
    const selected = countries.find(c => c.value === country);
    setSelectedCountry(selected || null);
    
    // Reset state field when country changes
    setState('');
  }, [country]);

  // Helper for handling secondary language selection
  const handleSecondaryLanguageChange = (language: string) => {
    if (secondaryLanguages.includes(language)) {
      setSecondaryLanguages(secondaryLanguages.filter(lang => lang !== language));
    } else {
      setSecondaryLanguages([...secondaryLanguages, language]);
    }
  };

  const validateBasicStep = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate name
    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    // Validate email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    // Validate password
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePersonalStep = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate gender
    if (!gender) {
      errors.gender = 'Please select your gender';
    }

    // Validate date of birth
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    // Validate phone number (simple validation)
    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number with country code';
    }

    // Validate preferred language
    if (!preferredLanguage) {
      errors.preferredLanguage = 'Please select your preferred language';
    }

    // If 'other' is selected for preferred language, validate custom language
    if (preferredLanguage === 'other' && !customLanguage.trim()) {
      errors.customLanguage = 'Please specify your preferred language';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateLocationStep = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate country
    if (!country) {
      errors.country = 'Please select your country';
    }

    // Validate state
    if (!state) {
      errors.state = 'State/Province is required';
    }

    // Validate city
    if (!city) {
      errors.city = 'City is required';
    }

    // Validate NIN if country is Nigeria
    if (selectedCountry?.requiresNIN && (!nin || nin.length !== 11)) {
      errors.nin = 'Valid 11-digit NIN is required for Nigerian citizens';
    }

    // Validate SSN if country is US
    if (selectedCountry?.requiresSSN && (!ssn || ssn.length !== 9)) {
      errors.ssn = 'Valid 9-digit SSN is required for US residents';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateVerificationStep = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate consent agreements
    if (!consentTerms) {
      errors.consentTerms = 'You must agree to the terms and conditions';
    }

    if (!consentHipaa) {
      errors.consentHipaa = 'You must acknowledge the HIPAA agreement';
    }

    if (!consentDataProcessing) {
      errors.consentDataProcessing = 'You must consent to data processing';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    clearError();

    let isValid = false;

    switch (currentStep) {
      case 'basic':
        isValid = validateBasicStep();
        if (isValid) setCurrentStep('personal');
        break;
      case 'personal':
        isValid = validatePersonalStep();
        if (isValid) setCurrentStep('location');
        break;
      case 'location':
        isValid = validateLocationStep();
        if (isValid) setCurrentStep('verification');
        break;
      default:
        break;
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'personal':
        setCurrentStep('basic');
        break;
      case 'location':
        setCurrentStep('personal');
        break;
      case 'verification':
        setCurrentStep('location');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (validateVerificationStep()) {
      // Combine all data for registration with snake_case field names as required by the backend
      const userData = {
        full_name: name,
        email,
        password,
        gender,
        date_of_birth: dateOfBirth,
        phone: phoneNumber,
        country,
        state,
        city,
        preferred_language: preferredLanguage === 'other' ? customLanguage : preferredLanguage,
        secondary_languages: secondaryLanguages,
        ...(preferredLanguage === 'other' && { custom_language: customLanguage }),
        ...(selectedCountry?.requiresNIN && { nin }),
        ...(selectedCountry?.requiresSSN && { ssn }),
        // Include individual consent fields
        consent_terms: consentTerms,
        consent_hipaa: consentHipaa,
        consent_data_processing: consentDataProcessing,
        // Also include nested consents object as an alternative
        consents: {
          terms: consentTerms,
          hipaa: consentHipaa,
          dataProcessing: consentDataProcessing
        }
      };

      // Call the register function with the complete user data
      await register(userData);
    }
  };

  // Render progress indicator
  const renderStepIndicator = () => {
    const steps = [
      { id: 'basic', label: 'Account' },
      { id: 'personal', label: 'Personal' },
      { id: 'location', label: 'Location' },
      { id: 'verification', label: 'Verify' },
    ];

    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => {
            // Find the current step index
            const currentStepIndex = steps.findIndex(s => s.id === currentStep);

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep === step.id
                      ? 'bg-[#005eb8] text-white'
                      : currentStepIndex > index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'}`}
                >
                  {currentStepIndex > index
                    ? '✓'
                    : index + 1}
                </div>
                <div className="text-xs mt-1 font-medium text-gray-600">{step.label}</div>
              </div>
            );
          })}
        </div>
        <div className="relative flex mt-2">
          {steps.map((step, index) => {
            // Find the current step index
            const currentStepIndex = steps.findIndex(s => s.id === currentStep);

            return index < steps.length - 1 && (
              <div
                key={`line-${index}`}
                className={`h-1 flex-1 ${
                  currentStepIndex > index
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Account Information</h3>

            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-1">
                Full name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                value={name}
                onChange={(e) => { setName(e.target.value); clearError(); }}
                placeholder="Enter your full name"
              />
              {formErrors.name && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                placeholder="Enter your email"
              />
              {formErrors.email && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                placeholder="Create a password"
              />
              {formErrors.password ? (
                <p className="mt-1 text-red-500 text-sm">{formErrors.password}</p>
              ) : (
                <p className="mt-1 text-gray-500 text-sm">Password must be at least 8 characters long</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block font-medium mb-1">
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                placeholder="Confirm your password"
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.confirmPassword}</p>
              )}
            </div>
          </>
        );

      case 'personal':
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>

            <div className="mb-4">
              <label htmlFor="gender" className="block font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {formErrors.gender && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.gender}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split('T')[0]} // Prevent future dates
              />
              {formErrors.dateOfBirth && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.dateOfBirth}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +1 234 567 8901"
              />
              {formErrors.phoneNumber && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.phoneNumber}</p>
              )}
              <p className="mt-1 text-gray-500 text-sm">Include country code (e.g. +1, +44, +234)</p>
            </div>

            <div className="mb-4">
              <label htmlFor="preferredLanguage" className="block font-medium mb-1">
                Preferred Language
              </label>
              <select
                id="preferredLanguage"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.preferredLanguage ? 'border-red-500' : 'border-gray-300'
                }`}
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
              >
                <option value="">Select your preferred language</option>
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
              {formErrors.preferredLanguage && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.preferredLanguage}</p>
              )}
            </div>

            {preferredLanguage === 'other' && (
              <div className="mb-4">
                <label htmlFor="customLanguage" className="block font-medium mb-1">
                  Specify Language
                </label>
                <input
                  type="text"
                  id="customLanguage"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                    formErrors.customLanguage ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  placeholder="Please specify your preferred language"
                />
                {formErrors.customLanguage && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.customLanguage}</p>
                )}
              </div>
            )}

            <div className="mb-6">
              <label className="block font-medium mb-1">Secondary Languages (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {languages
                  .filter(lang => lang.value !== 'other' && lang.value !== preferredLanguage)
                  .map((language) => (
                    <div key={language.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`lang-${language.value}`}
                        checked={secondaryLanguages.includes(language.value)}
                        onChange={() => handleSecondaryLanguageChange(language.value)}
                        className="h-4 w-4 text-[#005eb8] border-gray-300 rounded focus:ring-[#005eb8]"
                      />
                      <label htmlFor={`lang-${language.value}`} className="ml-2 text-sm">
                        {language.label}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </>
        );

      case 'location':
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Location Information</h3>

            <div className="mb-4">
              <label htmlFor="country" className="block font-medium mb-1">
                Country
              </label>
              <select
                id="country"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {formErrors.country && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.country}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block font-medium mb-1">
                State/Province
              </label>
              
              {selectedCountry?.value === 'nigeria' ? (
                <>
                  <select
                    id="state"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                      formErrors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select a state</option>
                    {nigerianStates.map((stateOption) => (
                      <option key={stateOption.value} value={stateOption.value}>
                        {stateOption.label}
                      </option>
                    ))}
                  </select>
                  {formErrors.state && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.state}</p>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    id="state"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                      formErrors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter your state or province"
                  />
                  {formErrors.state && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.state}</p>
                  )}
                </>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block font-medium mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                  formErrors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
              />
              {formErrors.city && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.city}</p>
              )}
            </div>

            {/* Conditional NIN field for Nigeria */}
            {selectedCountry?.requiresNIN && (
              <div className="mb-6">
                <label htmlFor="nin" className="block font-medium mb-1">
                  National Identification Number (NIN)
                </label>
                <input
                  type="text"
                  id="nin"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                    formErrors.nin ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={nin}
                  onChange={(e) => setNin(e.target.value)}
                  placeholder="Enter your 11-digit NIN"
                  maxLength={11}
                />
                {formErrors.nin && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.nin}</p>
                )}
                <p className="mt-1 text-gray-500 text-sm">Nigerian citizens must provide their 11-digit NIN</p>
              </div>
            )}

            {/* Conditional SSN field for US */}
            {selectedCountry?.requiresSSN && (
              <div className="mb-6">
                <label htmlFor="ssn" className="block font-medium mb-1">
                  Social Security Number (SSN)
                </label>
                <input
                  type="text"
                  id="ssn"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8] ${
                    formErrors.ssn ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  placeholder="Enter your 9-digit SSN"
                  maxLength={9}
                />
                {formErrors.ssn && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.ssn}</p>
                )}
              </div>
            )}
          </>
        );

      case 'verification':
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Final Verification</h3>

            <div className="p-4 bg-gray-50 rounded-md mb-6">
              <h4 className="font-medium mb-2">Review Your Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-medium">Full Name:</p>
                  <p>{name}</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p>{email}</p>
                </div>
                <div>
                  <p className="font-medium">Gender:</p>
                  <p>{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium">Date of Birth:</p>
                  <p>{dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium">Phone Number:</p>
                  <p>{phoneNumber || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium">Country:</p>
                  <p>{selectedCountry?.label || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium">State/Province:</p>
                  <p>
                    {selectedCountry?.value === 'nigeria' 
                      ? nigerianStates.find(s => s.value === state)?.label || state
                      : state || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">City:</p>
                  <p>{city || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium">Preferred Language:</p>
                  <p>
                    {preferredLanguage === 'other'
                      ? customLanguage
                      : preferredLanguage.charAt(0).toUpperCase() + preferredLanguage.slice(1) || 'Not specified'}
                  </p>
                </div>
                {secondaryLanguages.length > 0 && (
                  <div>
                    <p className="font-medium">Secondary Languages:</p>
                    <p>{secondaryLanguages.map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(', ')}</p>
                  </div>
                )}
                {selectedCountry?.requiresNIN && (
                  <div>
                    <p className="font-medium">NIN:</p>
                    <p>{nin || 'Not specified'}</p>
                  </div>
                )}
                {selectedCountry?.requiresSSN && (
                  <div>
                    <p className="font-medium">SSN:</p>
                    <p>{ssn ? '•••••' + ssn.slice(-4) : 'Not specified'}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-[#005eb8] border-gray-300 rounded focus:ring-[#005eb8]"
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#005eb8] hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                  {formErrors.consentTerms && (
                    <p className="mt-1 text-red-500">{formErrors.consentTerms}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="hipaa"
                    className="h-4 w-4 text-[#005eb8] border-gray-300 rounded focus:ring-[#005eb8]"
                    checked={consentHipaa}
                    onChange={(e) => setConsentHipaa(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="hipaa" className="text-gray-700">
                    I acknowledge the{' '}
                    <Link to="/hipaa" className="text-[#005eb8] hover:underline">
                      HIPAA Privacy Policy
                    </Link>
                    {' '}and agree that my health information may be used or disclosed as described
                  </label>
                  {formErrors.consentHipaa && (
                    <p className="mt-1 text-red-500">{formErrors.consentHipaa}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="dataProcessing"
                    className="h-4 w-4 text-[#005eb8] border-gray-300 rounded focus:ring-[#005eb8]"
                    checked={consentDataProcessing}
                    onChange={(e) => setConsentDataProcessing(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="dataProcessing" className="text-gray-700">
                    I consent to my personal data being processed in accordance with the{' '}
                    <Link to="/privacy" className="text-[#005eb8] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                  {formErrors.consentDataProcessing && (
                    <p className="mt-1 text-red-500">{formErrors.consentDataProcessing}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Create your PHB account</h2>
      <p className="text-gray-600 mb-6">Please complete all steps to register</p>

      {error && (
        <div className={`${error.toLowerCase().includes('successful') ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'} p-4 mb-6`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {error.toLowerCase().includes('successful') ? (
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className={error.toLowerCase().includes('successful') ? 'text-green-700' : 'text-red-700'}>{error}</p>
            </div>
          </div>
        </div>
      )}

      {renderStepIndicator()}

      <form onSubmit={currentStep === 'verification' ? handleSubmit : (e) => e.preventDefault()}>
        {renderStepContent()}

        <div className="flex justify-between mt-6">
          {currentStep !== 'basic' && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}

          {currentStep !== 'verification' ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="ml-auto px-6 py-2 bg-[#005eb8] text-white rounded hover:bg-[#003f7e] transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-[#005eb8] text-white rounded hover:bg-[#003f7e] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#005eb8] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
