/**
 * Professional Application Form
 *
 * Multi-step form for healthcare professionals to apply for PHB registry
 * Supports: Pharmacists, Doctors, Nurses, and other healthcare professionals
 *
 * MICROSERVICE-READY:
 * - Uses isolated registryService
 * - No dependencies on main app
 * - Can be deployed separately
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import registryService, {
  ProfessionalType,
  RegulatoryBody,
  Gender,
  ProfessionalApplicationData,
  RegistryServiceError,
} from '../../services/registryService';
import {
  PersonalInfoStep,
  ContactInfoStep,
  RegulatoryInfoStep,
  EducationInfoStep,
  ProfessionalInfoStep,
  ReviewStep,
} from './ApplicationFormSteps';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface FormData extends Partial<ProfessionalApplicationData> {
  // Add frontend-only fields
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
}

type FormStep =
  | 'personal_info'
  | 'contact_info'
  | 'regulatory_info'
  | 'education_info'
  | 'professional_info'
  | 'review';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProfessionalApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [currentStep, setCurrentStep] = useState<FormStep>('personal_info');
  const [formData, setFormData] = useState<FormData>({
    professional_type: 'pharmacist',
    nationality: 'Nigerian',
    residential_country: 'Nigeria',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reference data from backend
  const [nigerianStates, setNigerianStates] = useState<string[]>([
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load reference data on mount
  useEffect(() => {
    loadReferenceData();
    // Also load specializations on mount if professional_type is already set
    if (formData.professional_type) {
      loadSpecializations(formData.professional_type);
    }
  }, []);

  // Load specializations when professional type changes
  useEffect(() => {
    if (formData.professional_type) {
      loadSpecializations(formData.professional_type);
    }
  }, [formData.professional_type]);

  // Debug: Log when step changes
  useEffect(() => {
    console.log('🔄 Current step changed to:', currentStep);
    console.log('📋 Form data:', formData);
  }, [currentStep]);

  // Restore saved form data if user returns after logging in
  useEffect(() => {
    const savedData = sessionStorage.getItem('pending_professional_application');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        sessionStorage.removeItem('pending_professional_application');

        // Show notification
        alert('✓ Your form data has been restored. Please review and submit your application.');
      } catch (e) {
        console.error('Failed to restore form data:', e);
      }
    }
  }, []);

  const loadReferenceData = async () => {
    try {
      // Try to load from backend (will update if available)
      const states = await registryService.public.getNigerianStates();
      if (states && states.length > 0) {
        setNigerianStates(states);
      }
    } catch (error) {
      console.error('Failed to load reference data from backend, using fallback:', error);
      // Already initialized with fallback data
    }
  };

  const loadSpecializations = async (type: ProfessionalType) => {
    // Define fallback specializations
    const fallbackSpecs: Record<ProfessionalType, string[]> = {
      pharmacist: [
        'Clinical Pharmacy',
        'Community Pharmacy',
        'Hospital Pharmacy',
        'Industrial Pharmacy',
        'Pharmaceutical Regulatory Affairs',
        'Pharmaceutical Quality Assurance',
        'Pharmacoeconomics',
        'Other',
      ],
      doctor: [
        'General Practice',
        'Internal Medicine',
        'Surgery',
        'Pediatrics',
        'Obstetrics & Gynecology',
        'Cardiology',
        'Neurology',
        'Other',
      ],
      nurse: [
        'General Nursing',
        'Pediatric Nursing',
        'Critical Care Nursing',
        'Psychiatric Nursing',
        'Community Health Nursing',
        'Other',
      ],
      midwife: ['Community Midwifery', 'Hospital Midwifery', 'Other'],
      dentist: ['General Dentistry', 'Orthodontics', 'Oral Surgery', 'Other'],
      physiotherapist: [
        'Musculoskeletal Physiotherapy',
        'Neurological Physiotherapy',
        'Pediatric Physiotherapy',
        'Sports Physiotherapy',
        'Other',
      ],
      medical_laboratory_scientist: [
        'Clinical Chemistry',
        'Hematology',
        'Microbiology',
        'Histopathology',
        'Other',
      ],
      radiographer: ['Diagnostic Radiography', 'Therapeutic Radiography', 'Other'],
      optometrist: ['General Optometry', 'Contact Lens Practice', 'Low Vision', 'Other'],
    };

    // Set fallback immediately
    const fallbackOptions = fallbackSpecs[type] || ['Other'];
    console.log('🔍 Loading specializations for:', type);
    console.log('📋 Fallback options:', fallbackOptions);
    setSpecializations(fallbackOptions);

    // Try to load from backend (will update if available)
    try {
      const specs = await registryService.public.getSpecializations(type);
      if (specs && specs.length > 0) {
        console.log('✅ Loaded specializations from backend:', specs);
        setSpecializations(specs);
      }
    } catch (error) {
      console.warn('⚠️ Failed to load specializations from backend, using fallback:', error);
      // Fallback already set above
    }
  };

  // ============================================================================
  // FORM STEPS CONFIGURATION
  // ============================================================================

  const steps: { key: FormStep; title: string; icon: string }[] = [
    { key: 'personal_info', title: 'Personal Information', icon: '👤' },
    { key: 'contact_info', title: 'Contact Details', icon: '📍' },
    { key: 'regulatory_info', title: 'Regulatory Information', icon: '📋' },
    { key: 'education_info', title: 'Education', icon: '🎓' },
    { key: 'professional_info', title: 'Professional Details', icon: '💼' },
    { key: 'review', title: 'Review & Submit', icon: '✓' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 'personal_info':
        if (!formData.professional_type) newErrors.professional_type = 'Professional type is required';
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
        if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;

      case 'contact_info':
        if (!formData.residential_address) newErrors.residential_address = 'Address is required';
        if (!formData.residential_city) newErrors.residential_city = 'City is required';
        if (!formData.residential_state) newErrors.residential_state = 'State is required';
        if (!formData.postcode) newErrors.postcode = 'Postal code is required';
        break;

      case 'regulatory_info':
        if (!formData.regulatory_body) newErrors.regulatory_body = 'Regulatory body is required';
        if (!formData.registration_number) newErrors.registration_number = 'Registration number is required';
        break;

      case 'education_info':
        if (!formData.highest_degree) newErrors.highest_degree = 'Highest degree is required';
        if (!formData.university) newErrors.university = 'University is required';
        if (!formData.graduation_year) newErrors.graduation_year = 'Graduation year is required';
        else if (formData.graduation_year > new Date().getFullYear())
          newErrors.graduation_year = 'Invalid graduation year';
        break;

      case 'professional_info':
        if (!formData.years_experience) newErrors.years_experience = 'Years of experience is required';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        // If "Other" is selected, require the custom specialization field
        if (formData.specialization === 'Other' && !formData.other_specialization) {
          newErrors.other_specialization = 'Please specify your specialization';
        }
        if (!formData.current_practice_address)
          newErrors.current_practice_address = 'Current practice address is required';
        if (!formData.current_practice_city)
          newErrors.current_practice_city = 'Current practice city is required';
        if (!formData.current_practice_state)
          newErrors.current_practice_state = 'Current practice state is required';
        break;

      case 'review':
        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log('Current step:', currentStep);
    console.log('Validation result:', validateStep(currentStep));

    if (validateStep(currentStep)) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        const nextStep = steps[nextIndex].key;
        console.log('Moving to next step:', nextStep);
        setCurrentStep(nextStep);
      }
    } else {
      console.log('Validation failed, staying on current step');
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('review')) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('📤 Submitting application...', formData);
      console.log('[Registry] Authentication status:', { isAuthenticated, user });

      let result;

      // Check authentication using context (cookies handled automatically)
      if (isAuthenticated) {
        // User is logged in - use authenticated endpoint
        console.log('[Registry] User authenticated - using authenticated endpoint');
        console.log('[Registry] User info:', user);

        try {
          result = await registryService.professional.createApplication(
            formData as ProfessionalApplicationData
          );

          // Success message for existing user
          const successMessage = `✅ Application Submitted Successfully!

Application Number: ${result.application.phb_application_number || result.application.application_reference}

${result.message}

📧 A confirmation email has been sent to ${user?.email}.

You can track your application status in your dashboard.`;

          alert(successMessage);
          navigate(`/registry/application-success?id=${result.application.id}`);
        } catch (error: any) {
          if (error.message?.includes('Application already exists')) {
            const existingAppMessage = `⚠️ You Already Have an Application

Status: ${error.details?.status || 'Pending Review'}
Application ID: ${error.details?.application_id || 'Unknown'}

Please check your dashboard to view your application status.`;

            alert(existingAppMessage);
            navigate('/professional/applications');
            return;
          }
          throw error;
        }
      } else {
        // User is not logged in - use public endpoint
        console.log('[Registry] User not authenticated - using public endpoint');

        result = await registryService.public.submitNewApplication(
          formData as ProfessionalApplicationData
        );

        // Success message for new user
        const successMessage = `✅ Application Submitted Successfully!

Application Number: ${result.application.phb_application_number || result.application.application_reference}

${result.message}

📧 Login Credentials (SAVE THESE):
Username: ${result.login_credentials?.username || result.application.email}
Password: ${result.login_credentials?.password || '(as provided)'}

You will need these credentials to track your application and upload documents.`;

        alert(successMessage);
        navigate(`/registry/application-success?id=${result.application.id}`);
      }
    } catch (error: any) {
      console.error('[Registry] Application submission error:', error);

      if (error.message?.includes('Email already registered')) {
        // Suggest user to log in
        const loginPrompt = `⚠️ Account Already Exists

The email address you provided is already registered.

Please log in to submit your professional application.

Would you like to go to the login page?`;

        if (window.confirm(loginPrompt)) {
          // Save form data so user doesn't lose progress
          sessionStorage.setItem('pending_professional_application', JSON.stringify(formData));
          navigate('/login?redirect=/registry/apply');
        }
      } else if (error.message?.includes('Registration number already in use')) {
        setSubmitError('This registration number is already in our system. Please contact support if you believe this is an error.');
      } else if (error instanceof RegistryServiceError) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Failed to submit application. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const getRegulatoryBodyForType = (type: ProfessionalType): RegulatoryBody => {
    const mapping: Record<ProfessionalType, RegulatoryBody> = {
      doctor: 'MDCN',
      pharmacist: 'PCN',
      nurse: 'NMCN',
      midwife: 'NMCN',
      dentist: 'MDCN',
      physiotherapist: 'MPBN',
      medical_laboratory_scientist: 'MLSCN',
      radiographer: 'RRBN',
      optometrist: 'OPTON',
    };
    return mapping[type];
  };

  const getDegreeLabel = (type: ProfessionalType): string => {
    const labels: Record<ProfessionalType, string> = {
      doctor: 'Medical Degree (e.g., MBBS, MD)',
      pharmacist: 'Pharmacy Degree (e.g., B.Pharm, Pharm.D)',
      nurse: 'Nursing Degree (e.g., B.Sc Nursing, RN)',
      midwife: 'Midwifery Degree',
      dentist: 'Dental Degree (e.g., BDS, DDS)',
      physiotherapist: 'Physiotherapy Degree',
      medical_laboratory_scientist: 'Medical Laboratory Science Degree',
      radiographer: 'Radiography Degree',
      optometrist: 'Optometry Degree',
    };
    return labels[type] || 'Highest Degree';
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  index <= currentStepIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-xs mt-2 text-center ${
                  index <= currentStepIndex ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-full mt-5 -ml-full absolute ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{ left: '50%', width: `calc(100% / ${steps.length} - 2.5rem)` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {steps[currentStepIndex].title}
        </h2>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Step 1: Personal Information */}
          {currentStep === 'personal_info' && (
            <PersonalInfoStep
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 'contact_info' && (
            <ContactInfoStep
              formData={formData}
              errors={errors}
              onChange={handleChange}
              nigerianStates={nigerianStates || []}
            />
          )}

          {/* Step 3: Regulatory Information */}
          {currentStep === 'regulatory_info' && (
            <RegulatoryInfoStep
              formData={formData}
              errors={errors}
              onChange={handleChange}
              regulatoryBody={getRegulatoryBodyForType(formData.professional_type || 'pharmacist')}
            />
          )}

          {/* Step 4: Education */}
          {currentStep === 'education_info' && (
            <EducationInfoStep
              formData={formData}
              errors={errors}
              onChange={handleChange}
              degreeLabel={getDegreeLabel(formData.professional_type || 'pharmacist')}
            />
          )}

          {/* Step 5: Professional Information */}
          {currentStep === 'professional_info' && (
            <ProfessionalInfoStep
              formData={formData}
              errors={errors}
              onChange={handleChange}
              specializations={specializations || []}
              nigerianStates={nigerianStates || []}
            />
          )}

          {/* Step 6: Review */}
          {currentStep === 'review' && (
            <ReviewStep formData={formData} errors={errors} setFormData={setFormData} />
          )}

          {/* Debug: Show current step if no match */}
          {!['personal_info', 'contact_info', 'regulatory_info', 'education_info', 'professional_info', 'review'].includes(currentStep) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-800">Error: Invalid step "{currentStep}"</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className={`px-6 py-2 rounded-md ${
                currentStepIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Back
            </button>

            {currentStep !== 'review' ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessionalApplicationForm;
