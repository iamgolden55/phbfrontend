/**
 * AddDepartmentModal Component (Multi-Step Wizard)
 *
 * 4-step wizard for creating a new department with comprehensive validation.
 * Auto-generates department code and provides smart defaults based on type.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';
import {
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Bed,
  Users,
  HelpCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import DepartmentWizard, { WizardStep } from './DepartmentWizard';
import {
  DepartmentType,
  DepartmentFormData,
  Wing,
  DEPARTMENT_TYPE_LABELS,
  DEPARTMENT_TYPE_CATEGORIES,
  WING_LABELS,
  DEFAULT_24_7_HOURS,
  DEFAULT_BUSINESS_HOURS,
  isClinicalDepartment
} from '../../../types/department';
import { useAddDepartmentTour } from '../../../hooks/useAddDepartmentTour';

interface AddDepartmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => Promise<void>;
  existingCodes?: string[];
}

/**
 * Wizard Steps Configuration
 */
const WIZARD_STEPS: WizardStep[] = [
  {
    title: 'Basic Info',
    description: 'Name and type'
  },
  {
    title: 'Location & Contact',
    description: 'Address and phone'
  },
  {
    title: 'Operations',
    description: 'Hours and capacity'
  },
  {
    title: 'Review',
    description: 'Confirm details'
  }
];

/**
 * AddDepartmentModal Component
 *
 * Features:
 * - 4-step wizard interface
 * - Auto-generate unique department code
 * - Smart defaults based on department type
 * - Per-step validation
 * - Help tooltips throughout
 * - Review step with editable sections
 */
const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({
  open,
  onClose,
  onSubmit,
  existingCodes = []
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tour hook
  const { run, stepIndex, steps, handleJoyrideCallback, startTour } = useAddDepartmentTour();

  // Form state
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: '',
    code: '',
    department_type: 'medical',
    description: '',
    floor_number: '1',
    wing: 'central',
    extension_number: '',
    emergency_contact: '',
    email: '',
    is_24_hours: false,
    operating_hours: DEFAULT_BUSINESS_HOURS,
    minimum_staff_required: 5,
    is_active: true
  });

  // Auto-generate department code when type or name changes
  useEffect(() => {
    if (formData.department_type && formData.name) {
      const code = generateDepartmentCode(formData.department_type, formData.name, existingCodes);
      setFormData(prev => ({ ...prev, code }));
    }
  }, [formData.department_type, formData.name, existingCodes]);

  // Update defaults when department type changes
  useEffect(() => {
    const isClinical = isClinicalDepartment(formData.department_type);

    // Set appropriate defaults based on type
    if (isClinical) {
      // Clinical departments typically need more staff
      if (formData.minimum_staff_required < 10) {
        setFormData(prev => ({ ...prev, minimum_staff_required: 10 }));
      }
    } else {
      // Non-clinical can have fewer staff
      if (formData.minimum_staff_required > 5) {
        setFormData(prev => ({ ...prev, minimum_staff_required: 5 }));
      }
    }

    // Emergency and Critical Care are 24/7 by default
    if (formData.department_type === 'emergency' || formData.department_type === 'critical_care') {
      setFormData(prev => ({
        ...prev,
        is_24_hours: true,
        operating_hours: DEFAULT_24_7_HOURS
      }));
    }
  }, [formData.department_type]);

  // Generate unique department code
  const generateDepartmentCode = (
    type: DepartmentType,
    name: string,
    existing: string[]
  ): string => {
    // Get first 3 letters of type
    const typePrefix = type.substring(0, 3).toUpperCase();

    // Get first 3 letters of name (removing spaces)
    const namePrefix = name
      .replace(/[^a-zA-Z]/g, '')
      .substring(0, 3)
      .toUpperCase();

    // Create base code
    let code = `${typePrefix}-${namePrefix}`;

    // Add number suffix if code exists
    let counter = 1;
    let finalCode = code;
    while (existing.includes(finalCode)) {
      finalCode = `${code}${counter}`;
      counter++;
    }

    return finalCode;
  };

  // Handle form field changes
  const handleChange = (field: keyof DepartmentFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  // Handle 24/7 toggle
  const handle24HoursToggle = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_24_hours: checked,
      operating_hours: checked ? DEFAULT_24_7_HOURS : DEFAULT_BUSINESS_HOURS
    }));
  };

  // Pure validation function for render-time checks (no state changes)
  const checkStepValidity = (step: number): boolean => {
    switch (step) {
      case 0: // Basic Info
        if (!formData.name.trim()) return false;
        if (!formData.code.trim()) return false;
        if (!formData.description.trim()) return false;
        return true;

      case 1: // Location & Contact
        if (!formData.floor_number.trim()) return false;
        if (!formData.extension_number.trim()) return false;
        if (!formData.emergency_contact.trim()) return false;
        if (!formData.email.trim()) return false;
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return false;
        return true;

      case 2: // Operations
        if (formData.minimum_staff_required < 1) return false;
        // Clinical department validations
        if (isClinicalDepartment(formData.department_type)) {
          if (formData.total_beds && formData.total_beds < 1) return false;
        }
        return true;

      case 3: // Review
        return true;

      default:
        return false;
    }
  };

  // Validate current step with error messages (for button handlers)
  const validateStep = (step: number): boolean => {
    setError(null);

    switch (step) {
      case 0: // Basic Info
        if (!formData.name.trim()) {
          setError('Department name is required');
          return false;
        }
        if (!formData.code.trim()) {
          setError('Department code is required');
          return false;
        }
        if (!formData.description.trim()) {
          setError('Description is required');
          return false;
        }
        return true;

      case 1: // Location & Contact
        if (!formData.floor_number.trim()) {
          setError('Floor number is required');
          return false;
        }
        if (!formData.extension_number.trim()) {
          setError('Extension number is required');
          return false;
        }
        if (!formData.emergency_contact.trim()) {
          setError('Emergency contact is required');
          return false;
        }
        if (!formData.email.trim()) {
          setError('Email is required');
          return false;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError('Invalid email address');
          return false;
        }
        return true;

      case 2: // Operations
        if (formData.minimum_staff_required < 1) {
          setError('Minimum staff must be at least 1');
          return false;
        }
        // Clinical department validations
        if (isClinicalDepartment(formData.department_type)) {
          if (formData.total_beds && formData.total_beds < 1) {
            setError('Total beds must be at least 1 for clinical departments');
            return false;
          }
        }
        return true;

      case 3: // Review
        return true;

      default:
        return false;
    }
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, WIZARD_STEPS.length - 1));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create department');
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      // Reset form
      setFormData({
        name: '',
        code: '',
        department_type: 'medical',
        description: '',
        floor_number: '1',
        wing: 'central',
        extension_number: '',
        emergency_contact: '',
        email: '',
        is_24_hours: false,
        operating_hours: DEFAULT_BUSINESS_HOURS,
        minimum_staff_required: 5,
        is_active: true
      });
      setCurrentStep(0);
      setError(null);
      onClose();
    }
  };

  // Check if current step can proceed (use pure validation to avoid re-renders)
  const canProceed = checkStepValidity(currentStep);
  const isClinical = isClinicalDepartment(formData.department_type);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Joyride Tour Component */}
        <Joyride
          steps={steps}
          run={run && currentStep === 0} // Only run tour on first step
          stepIndex={stepIndex}
          callback={handleJoyrideCallback}
          continuous
          showProgress
          showSkipButton
          scrollToFirstStep
          disableScrolling={false}
          styles={{
            options: {
              primaryColor: '#1e3a8a',
              zIndex: 10000,
            },
          }}
          locale={{
            back: 'Previous',
            close: 'Close',
            last: 'Finish',
            next: 'Next',
            skip: 'Skip Tour',
          }}
        />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="text-blue-900" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Create New Department</h2>
              <p className="text-sm text-gray-500">Step {currentStep + 1} of {WIZARD_STEPS.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Help/Tour Button */}
            {currentStep === 0 && (
              <button
                onClick={startTour}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Restart guided tour"
              >
                <HelpCircle size={20} />
              </button>
            )}
            <button
              onClick={handleClose}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <div className="flex-1">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="p-1 text-red-400 hover:text-red-600 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Wizard Container */}
        <DepartmentWizard
          steps={WIZARD_STEPS}
          currentStep={currentStep}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={handleClose}
          onSubmit={handleSubmit}
          onStepClick={setCurrentStep}
          canProceed={canProceed}
          isSubmitting={loading}
          isLastStep={currentStep === WIZARD_STEPS.length - 1}
        >
          {/* Step 1: Basic Information */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Enter the basic details about the department. The code will be auto-generated.
                </p>
              </div>

              {/* Department Name */}
              <div data-tour="dept-name">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Custom Department Name *
                  <div className="group relative">
                    <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    <div className="absolute left-0 top-6 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      <strong className="block mb-1">Your Unique Department Name</strong>
                      Enter a custom name for this specific department. You can have multiple departments of the same type with different names (e.g., "Main Cardiology", "Pediatric Cardiology").
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g., Main Cardiology Department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 You can create multiple departments of the same type with different names
                </p>
              </div>

              {/* Department Type */}
              <div data-tour="dept-type">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Department Classification *
                  <div className="group relative">
                    <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    <div className="absolute left-0 top-6 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      <strong className="block mb-1">Classification Template</strong>
                      Select the department category/template. This determines:
                      <ul className="list-disc ml-4 mt-2 space-y-1">
                        <li>Available features (beds, appointments, etc.)</li>
                        <li>Default staffing requirements</li>
                        <li>Operating hours defaults</li>
                      </ul>
                    </div>
                  </div>
                </label>
                <select
                  value={formData.department_type}
                  onChange={(e) => handleChange('department_type', e.target.value as DepartmentType)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <optgroup label="Clinical Departments">
                    {DEPARTMENT_TYPE_CATEGORIES.CLINICAL.map((type) => (
                      <option key={type} value={type}>
                        {DEPARTMENT_TYPE_LABELS[type]}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="Support Departments">
                    {DEPARTMENT_TYPE_CATEGORIES.SUPPORT.map((type) => (
                      <option key={type} value={type}>
                        {DEPARTMENT_TYPE_LABELS[type]}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="Administrative Departments">
                    {DEPARTMENT_TYPE_CATEGORIES.ADMINISTRATIVE.map((type) => (
                      <option key={type} value={type}>
                        {DEPARTMENT_TYPE_LABELS[type]}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  📋 This classification determines what features and settings are available
                </p>
              </div>

              {/* Auto-Generated Code Preview */}
              {formData.code && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg" data-tour="dept-code">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="text-blue-600" size={16} />
                    <span className="text-sm font-medium text-blue-900">Auto-Generated Code</span>
                  </div>
                  <code className="text-lg font-mono font-bold text-blue-700">{formData.code}</code>
                  <p className="text-xs text-blue-600 mt-1">This code will uniquely identify the department</p>
                </div>
              )}

              {/* Description */}
              <div data-tour="dept-description">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Description *
                  <div className="group relative">
                    <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      Brief description of the department's purpose, services, and specialties
                    </div>
                  </div>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  placeholder="Brief description of the department's purpose and services..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Location & Contact Information</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Specify where the department is located and how to contact them.
                </p>
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  Physical Location
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  {/* Floor Number */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      Floor Number *
                      <div className="group relative">
                        <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                        <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          Floor where the department is located (e.g., 1, 2, G for Ground, B1 for Basement)
                        </div>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={formData.floor_number}
                      onChange={(e) => handleChange('floor_number', e.target.value)}
                      placeholder="e.g., 1, 2, G, B1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Wing */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      Wing *
                      <div className="group relative">
                        <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                        <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          Hospital wing or section where the department is located
                        </div>
                      </div>
                    </label>
                    <select
                      value={formData.wing}
                      onChange={(e) => handleChange('wing', e.target.value as Wing)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(WING_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  Contact Details
                </h4>

                {/* Extension Number */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Extension Number *
                    <div className="group relative">
                      <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                      <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        Internal hospital phone extension for the department
                      </div>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.extension_number}
                    onChange={(e) => handleChange('extension_number', e.target.value)}
                    placeholder="e.g., 2301 or +1234567890"
                    maxLength={20}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact *
                    <div className="group relative">
                      <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                      <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        Direct phone number for urgent matters and emergencies
                      </div>
                    </div>
                  </label>
                  <input
                    type="tel"
                    value={formData.emergency_contact}
                    onChange={(e) => handleChange('emergency_contact', e.target.value)}
                    placeholder="e.g., +234 xxx xxx xxxx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                    <div className="group relative">
                      <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                      <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        Official email address for the department
                      </div>
                    </div>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="dept@hospital.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Capacity & Operations */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Capacity & Operations</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Configure operating hours, bed capacity, and staffing requirements.
                </p>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  Operating Hours
                </h4>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_24_hours}
                      onChange={(e) => handle24HoursToggle(e.target.checked)}
                      className="h-5 w-5 text-blue-900 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800">24/7 Operations</span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formData.is_24_hours
                          ? 'Department operates 24 hours a day, 7 days a week'
                          : 'Department has specific operating hours (default: Mon-Fri 8am-5pm)'}
                      </p>
                    </div>
                  </label>

                  {!formData.is_24_hours && (
                    <div className="pl-8 text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
                      Default hours: Monday - Friday, 8:00 AM - 5:00 PM
                    </div>
                  )}
                </div>
              </div>

              {/* Bed Capacity (Clinical Only) */}
              {isClinical && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Bed size={16} className="text-gray-500" />
                    Bed Capacity
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Total Beds */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        Total Beds
                        <div className="group relative">
                          <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                          <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Total number of beds in the department. Leave 0 for outpatient/non-ward departments.
                          </div>
                        </div>
                      </label>
                      <input
                        type="number"
                        value={formData.total_beds || ''}
                        onChange={(e) => handleChange('total_beds', parseInt(e.target.value) || 0)}
                        min="0"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* ICU Beds */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        ICU Beds
                        <div className="group relative">
                          <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                          <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Number of intensive care unit beds (if applicable)
                          </div>
                        </div>
                      </label>
                      <input
                        type="number"
                        value={formData.icu_beds || ''}
                        onChange={(e) => handleChange('icu_beds', parseInt(e.target.value) || 0)}
                        min="0"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Staffing */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users size={16} className="text-gray-500" />
                  Staffing Requirements
                </h4>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Minimum Staff Required *
                    <div className="group relative">
                      <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                      <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        Minimum number of staff members needed for the department to operate safely
                      </div>
                    </div>
                  </label>
                  <input
                    type="number"
                    value={formData.minimum_staff_required}
                    onChange={(e) => handleChange('minimum_staff_required', parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Default: {isClinical ? '10 staff (clinical)' : '5 staff (non-clinical)'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Review & Confirm</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Review all details before creating the department. Click on any section to edit.
                </p>
              </div>

              {/* Basic Information Summary */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="text-gray-600" size={20} />
                    <span className="font-semibold text-gray-800">Basic Information</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">Edit</span>
                </button>
                <div className="p-4 space-y-3 bg-white">
                  <div>
                    <span className="text-xs text-gray-500">Department Name</span>
                    <p className="text-sm font-medium text-gray-800">{formData.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Department Code</span>
                    <p className="text-sm font-mono font-bold text-blue-700">{formData.code}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Type</span>
                    <p className="text-sm font-medium text-gray-800">
                      {DEPARTMENT_TYPE_LABELS[formData.department_type]}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Description</span>
                    <p className="text-sm text-gray-700">{formData.description}</p>
                  </div>
                </div>
              </div>

              {/* Location & Contact Summary */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-600" size={20} />
                    <span className="font-semibold text-gray-800">Location & Contact</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">Edit</span>
                </button>
                <div className="p-4 space-y-3 bg-white">
                  <div>
                    <span className="text-xs text-gray-500">Location</span>
                    <p className="text-sm font-medium text-gray-800">
                      Floor {formData.floor_number}, {WING_LABELS[formData.wing]} Wing
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Extension</span>
                    <p className="text-sm font-medium text-gray-800">{formData.extension_number}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Emergency Contact</span>
                    <p className="text-sm font-medium text-gray-800">{formData.emergency_contact}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-sm font-medium text-gray-800">{formData.email}</p>
                  </div>
                </div>
              </div>

              {/* Operations Summary */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="text-gray-600" size={20} />
                    <span className="font-semibold text-gray-800">Operations</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">Edit</span>
                </button>
                <div className="p-4 space-y-3 bg-white">
                  <div>
                    <span className="text-xs text-gray-500">Operating Hours</span>
                    <p className="text-sm font-medium text-gray-800">
                      {formData.is_24_hours ? '24/7 Operations' : 'Business Hours (Mon-Fri 8am-5pm)'}
                    </p>
                  </div>
                  {isClinical && (
                    <>
                      <div>
                        <span className="text-xs text-gray-500">Total Beds</span>
                        <p className="text-sm font-medium text-gray-800">
                          {formData.total_beds || 0} {formData.total_beds === 0 && '(Outpatient)'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">ICU Beds</span>
                        <p className="text-sm font-medium text-gray-800">{formData.icu_beds || 0}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <span className="text-xs text-gray-500">Minimum Staff</span>
                    <p className="text-sm font-medium text-gray-800">{formData.minimum_staff_required}</p>
                  </div>
                </div>
              </div>

              {/* Ready to Create Alert */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-green-900 mb-1">Ready to Create</h4>
                    <p className="text-xs text-green-700">
                      All required information has been provided. Click "Create Department" to proceed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DepartmentWizard>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
