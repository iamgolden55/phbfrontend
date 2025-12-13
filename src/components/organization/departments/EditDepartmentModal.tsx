/**
 * EditDepartmentModal Component (Multi-Step Wizard)
 *
 * 4-step wizard for editing an existing department.
 * Protects immutable fields (department_type, code) from modification.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  MapPin,
  Phone,
  Clock,
  Bed,
  Users,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Lock,
  AlertTriangle
} from 'lucide-react';
import DepartmentWizard, { WizardStep } from './DepartmentWizard';
import {
  Department,
  DepartmentFormData,
  Wing,
  DEPARTMENT_TYPE_LABELS,
  WING_LABELS,
  isClinicalDepartment,
  getDepartmentCategory
} from '../../../types/department';

interface EditDepartmentModalProps {
  open: boolean;
  department: Department | null;
  onClose: () => void;
  onSubmit: (departmentId: number, data: Partial<DepartmentFormData>) => Promise<void>;
}

/**
 * Wizard Steps Configuration
 */
const WIZARD_STEPS: WizardStep[] = [
  {
    title: 'Basic Info',
    description: 'Name and details'
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
    description: 'Confirm changes'
  }
];

/**
 * EditDepartmentModal Component
 *
 * Features:
 * - 4-step wizard interface
 * - Pre-populated with existing department data
 * - Immutable field protection (type, code)
 * - "Current: X" value helpers
 * - Understaffed warning
 * - Per-step validation
 * - Help tooltips
 */
const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({
  open,
  department,
  onClose,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<DepartmentFormData>>({});

  // Initialize form when department changes
  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        floor_number: department.floor_number,
        wing: department.wing,
        extension_number: department.extension_number,
        emergency_contact: department.emergency_contact,
        email: department.email,
        is_24_hours: department.is_24_hours,
        operating_hours: department.operating_hours,
        minimum_staff_required: department.minimum_staff_required,
        // Only include bed fields for clinical departments
        ...(isClinicalDepartment(department.department_type) && {
          total_beds: department.total_beds,
          icu_beds: department.icu_beds
        })
      });
    }
  }, [department]);

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
      is_24_hours: checked
    }));
  };

  // Pure validation function for render-time checks (no state changes)
  const checkStepValidity = (step: number): boolean => {
    switch (step) {
      case 0: // Basic Info
        if (!formData.name?.trim()) return false;
        if (!formData.description?.trim()) return false;
        return true;

      case 1: // Location & Contact
        if (!formData.floor_number?.trim()) return false;
        if (!formData.extension_number?.trim()) return false;
        if (!formData.emergency_contact?.trim()) return false;
        if (!formData.email?.trim()) return false;
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return false;
        return true;

      case 2: // Operations
        if (formData.minimum_staff_required !== undefined && formData.minimum_staff_required < 1) return false;
        // Clinical department validations
        if (department && isClinicalDepartment(department.department_type)) {
          if (formData.total_beds !== undefined && formData.total_beds < 0) return false;
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
        if (!formData.name?.trim()) {
          setError('Department name is required');
          return false;
        }
        if (!formData.description?.trim()) {
          setError('Description is required');
          return false;
        }
        return true;

      case 1: // Location & Contact
        if (!formData.floor_number?.trim()) {
          setError('Floor number is required');
          return false;
        }
        if (!formData.extension_number?.trim()) {
          setError('Extension number is required');
          return false;
        }
        if (!formData.emergency_contact?.trim()) {
          setError('Emergency contact is required');
          return false;
        }
        if (!formData.email?.trim()) {
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
        if (formData.minimum_staff_required !== undefined && formData.minimum_staff_required < 1) {
          setError('Minimum staff must be at least 1');
          return false;
        }
        // Clinical department validations
        if (department && isClinicalDepartment(department.department_type)) {
          if (formData.total_beds !== undefined && formData.total_beds < 0) {
            setError('Total beds cannot be negative');
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
    if (!department || !validateStep(currentStep)) return;

    setLoading(true);
    setError(null);

    try {
      await onSubmit(department.id, formData);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update department');
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      setCurrentStep(0);
      setError(null);
      onClose();
    }
  };

  // Check if current step can proceed (use pure validation to avoid re-renders)
  const canProceed = checkStepValidity(currentStep);

  if (!department || !open) return null;

  const isClinical = isClinicalDepartment(department.department_type);
  const category = getDepartmentCategory(department.department_type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="text-blue-900" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Edit Department</h2>
              <p className="text-sm text-gray-500">Step {currentStep + 1} of {WIZARD_STEPS.length}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
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
                  Update the department's name and description. Type and code cannot be changed.
                </p>
              </div>

              {/* Immutable Info Alert */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Protected Fields</h4>
                    <p className="text-xs text-blue-700">
                      Department Type and Code cannot be changed after creation for data integrity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Read-Only Fields */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                    <Lock size={12} />
                    Department Type
                  </label>
                  <p className="text-sm font-semibold text-gray-800">
                    {DEPARTMENT_TYPE_LABELS[department.department_type]}
                  </p>
                </div>
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                    <Lock size={12} />
                    Department Code
                  </label>
                  <p className="text-sm font-mono font-bold text-blue-700">{department.code}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Category</label>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    category === 'Clinical' ? 'bg-red-100 text-red-700' :
                    category === 'Support' ? 'bg-orange-100 text-orange-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {category}
                  </span>
                </div>
              </div>

              {/* Department Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Department Name *
                  <div className="group relative">
                    <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      The official name of the department
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g., Cardiology Department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Current: {department.name}</p>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Description *
                  <div className="group relative">
                    <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      Brief description of the department's purpose and services
                    </div>
                  </div>
                </label>
                <textarea
                  value={formData.description || ''}
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
                  Update the department's location and contact details.
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
                          Floor where the department is located
                        </div>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={formData.floor_number || ''}
                      onChange={(e) => handleChange('floor_number', e.target.value)}
                      placeholder="e.g., 1, 2, G, B1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Current: {department.floor_number}</p>
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
                      value={formData.wing || 'central'}
                      onChange={(e) => handleChange('wing', e.target.value as Wing)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(WING_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Current: {WING_LABELS[department.wing]}</p>
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
                        Internal hospital phone extension
                      </div>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.extension_number || ''}
                    onChange={(e) => handleChange('extension_number', e.target.value)}
                    placeholder="e.g., 2301 or +1234567890"
                    maxLength={20}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current: {department.extension_number}</p>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact *
                    <div className="group relative">
                      <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                      <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        Direct phone number for urgent matters
                      </div>
                    </div>
                  </label>
                  <input
                    type="tel"
                    value={formData.emergency_contact || ''}
                    onChange={(e) => handleChange('emergency_contact', e.target.value)}
                    placeholder="e.g., +234 xxx xxx xxxx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current: {department.emergency_contact}</p>
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
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="dept@hospital.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current: {department.email}</p>
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
                  Update operating hours, bed capacity, and staffing requirements.
                </p>
              </div>

              {/* Understaffed Warning */}
              {department.is_understaffed && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-orange-900 mb-1">Understaffed Department</h4>
                      <p className="text-xs text-orange-700">
                        Current staff: {department.current_staff_count || 0} | Required: {department.minimum_staff_required}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                      checked={formData.is_24_hours || false}
                      onChange={(e) => handle24HoursToggle(e.target.checked)}
                      className="h-5 w-5 text-blue-900 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800">24/7 Operations</span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formData.is_24_hours
                          ? 'Department operates 24 hours a day, 7 days a week'
                          : 'Department has specific operating hours'}
                      </p>
                    </div>
                  </label>

                  <p className="text-xs text-gray-500 pl-8">
                    Current: {department.is_24_hours ? '24/7 Operations' : 'Business Hours'}
                  </p>
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
                            Total number of beds in the department
                          </div>
                        </div>
                      </label>
                      <input
                        type="number"
                        value={formData.total_beds ?? ''}
                        onChange={(e) => handleChange('total_beds', parseInt(e.target.value) || 0)}
                        min="0"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Current: {department.total_beds || 0}</p>
                    </div>

                    {/* ICU Beds */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        ICU Beds
                        <div className="group relative">
                          <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                          <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Number of intensive care unit beds
                          </div>
                        </div>
                      </label>
                      <input
                        type="number"
                        value={formData.icu_beds ?? ''}
                        onChange={(e) => handleChange('icu_beds', parseInt(e.target.value) || 0)}
                        min="0"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Current: {department.icu_beds || 0}</p>
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
                        Minimum number of staff members needed for safe operation
                      </div>
                    </div>
                  </label>
                  <input
                    type="number"
                    value={formData.minimum_staff_required ?? ''}
                    onChange={(e) => handleChange('minimum_staff_required', parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {department.minimum_staff_required} | Actual Staff: {department.current_staff_count || 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Changes</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Review all changes before saving. Click on any section to edit.
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
                    {formData.name !== department.name && (
                      <p className="text-xs text-orange-600 mt-0.5">
                        Changed from: {department.name}
                      </p>
                    )}
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
                      Floor {formData.floor_number}, {WING_LABELS[formData.wing || 'central']} Wing
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
                      {formData.is_24_hours ? '24/7 Operations' : 'Business Hours'}
                    </p>
                    {formData.is_24_hours !== department.is_24_hours && (
                      <p className="text-xs text-orange-600 mt-0.5">
                        Changed from: {department.is_24_hours ? '24/7' : 'Business Hours'}
                      </p>
                    )}
                  </div>
                  {isClinical && (
                    <>
                      <div>
                        <span className="text-xs text-gray-500">Total Beds</span>
                        <p className="text-sm font-medium text-gray-800">{formData.total_beds || 0}</p>
                        {formData.total_beds !== department.total_beds && (
                          <p className="text-xs text-orange-600 mt-0.5">
                            Changed from: {department.total_beds || 0}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">ICU Beds</span>
                        <p className="text-sm font-medium text-gray-800">{formData.icu_beds || 0}</p>
                        {formData.icu_beds !== department.icu_beds && (
                          <p className="text-xs text-orange-600 mt-0.5">
                            Changed from: {department.icu_beds || 0}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  <div>
                    <span className="text-xs text-gray-500">Minimum Staff</span>
                    <p className="text-sm font-medium text-gray-800">{formData.minimum_staff_required}</p>
                    {formData.minimum_staff_required !== department.minimum_staff_required && (
                      <p className="text-xs text-orange-600 mt-0.5">
                        Changed from: {department.minimum_staff_required}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Ready to Save Alert */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-green-900 mb-1">Ready to Save</h4>
                    <p className="text-xs text-green-700">
                      Review the changes above and click "Save Changes" to update the department.
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

export default EditDepartmentModal;
