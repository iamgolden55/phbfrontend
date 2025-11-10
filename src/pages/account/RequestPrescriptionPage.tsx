import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  Pill,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import {
  fetchPatientPrescriptions,
  requestNewPrescription,
  isControlledMedication,
  validateQuantities,
  ApiMedication,
  MedicationRequestItem,
  PrescriptionRequest
} from '../../features/health/prescriptionsService';
import { getCurrentNomination } from '../../services/pharmacyService';

interface PrescriptionRequestFormData {
  // Step 1: Medication Selection
  selectedMedications: SelectedMedication[];
  customMedications: CustomMedicationRequest[];

  // Step 2: Details
  requestType: 'repeat' | 'new' | 'dosage_change';
  urgency: 'routine' | 'urgent';
  additionalNotes: string;

  // Step 3: Review
  confirmationChecked: boolean;
}

interface SelectedMedication {
  prescriptionId: string;
  medicationName: string;
  strength: string;
  form: string;
  dosage: string;
  isControlled: boolean;
  // Note: Quantity is determined by the prescribing doctor during review
}

interface CustomMedicationRequest {
  medicationName: string;
  strength: string;
  form: string;
  reason: string;
  additionalInfo: string;
  // Note: Quantity is determined by the prescribing doctor during review
}

const RequestPrescriptionPage: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PrescriptionRequestFormData>({
    selectedMedications: [],
    customMedications: [],
    requestType: 'repeat',
    urgency: 'routine',
    additionalNotes: '',
    confirmationChecked: false
  });

  const [currentPrescriptions, setCurrentPrescriptions] = useState<ApiMedication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [requestResponse, setRequestResponse] = useState<any>(null);

  // Load current prescriptions on mount
  useEffect(() => {
    loadCurrentPrescriptions();
  }, []);

  const loadCurrentPrescriptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetchPatientPrescriptions();
      // Filter to only show active prescriptions that can be refilled
      const refillable = response.medications.filter(
        med => med.status === 'active' || med.status === 'dispensed'
      );
      setCurrentPrescriptions(refillable);
    } catch (err: any) {
      setError('Failed to load your prescriptions. Please try again.');
      console.error('Error loading prescriptions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step navigation
  const goToNextStep = () => {
    setValidationError(null);
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    setValidationError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const validateCurrentStep = (): boolean => {
    try {
      switch (currentStep) {
        case 1:
          return validateStep1();
        case 2:
          return validateStep2();
        case 3:
          return validateStep3();
        default:
          return false;
      }
    } catch (err: any) {
      setValidationError(err.message);
      return false;
    }
  };

  const validateStep1 = (): boolean => {
    const hasSelectedMedications = formData.selectedMedications.length > 0;
    const hasCustomMedications = formData.customMedications.length > 0;

    if (!hasSelectedMedications && !hasCustomMedications) {
      setValidationError('Please select at least one medication or add a new medication request');
      return false;
    }

    // Validate custom medications - only check required fields
    const invalidCustomMed = formData.customMedications.find(
      med => !med.medicationName.trim() ||
             !med.reason.trim() ||
             !med.form.trim()
    );

    if (invalidCustomMed) {
      setValidationError('Please fill in all required fields for custom medication requests');
      return false;
    }

    // Check maximum medication limits
    const totalMedications = formData.selectedMedications.length + formData.customMedications.length;
    if (totalMedications > 10) {
      setValidationError('Maximum 10 medications per request');
      return false;
    }

    // Check controlled medication limits
    const controlledCount = [
      ...formData.selectedMedications.filter(m => m.isControlled),
      ...formData.customMedications.filter(m => isControlledMedication(m.medicationName))
    ].length;

    if (controlledCount > 2) {
      setValidationError('Maximum 2 controlled medications per request. Please submit controlled medications in a separate request.');
      return false;
    }

    return true;
  };

  const validateStep2 = (): boolean => {
    // Basic validation - all fields are pre-selected or optional
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.confirmationChecked) {
      setValidationError('Please confirm that the information is accurate');
      return false;
    }
    return true;
  };

  // Medication selection handlers
  const handleMedicationToggle = (prescription: ApiMedication) => {
    const exists = formData.selectedMedications.find(
      m => m.prescriptionId === prescription.id
    );

    if (exists) {
      setFormData(prev => ({
        ...prev,
        selectedMedications: prev.selectedMedications.filter(
          m => m.prescriptionId !== prescription.id
        )
      }));
    } else {
      const newMedication: SelectedMedication = {
        prescriptionId: prescription.id,
        medicationName: prescription.medication_name,
        strength: prescription.strength,
        form: prescription.form,
        dosage: prescription.dosage,
        isControlled: isControlledMedication(prescription.medication_name)
      };
      setFormData(prev => ({
        ...prev,
        selectedMedications: [...prev.selectedMedications, newMedication]
      }));
    }
  };

  const handleAddCustomMedication = () => {
    const newMedication: CustomMedicationRequest = {
      medicationName: '',
      strength: '',
      form: 'tablet',
      reason: '',
      additionalInfo: ''
    };
    setFormData(prev => ({
      ...prev,
      customMedications: [...prev.customMedications, newMedication]
    }));
  };

  const handleRemoveCustomMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customMedications: prev.customMedications.filter((_, i) => i !== index)
    }));
  };

  const handleCustomMedicationChange = (
    index: number,
    field: keyof CustomMedicationRequest,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      customMedications: prev.customMedications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  // Form submission
  const handleSubmit = async () => {
    setValidationError(null);

    if (!formData.confirmationChecked) {
      setValidationError('Please confirm that the information is accurate');
      return;
    }

    try {
      setIsSubmitting(true);

      // Build request payload - quantity will be determined by doctor during review
      const medications: MedicationRequestItem[] = [
        ...formData.selectedMedications.map(m => ({
          medication_id: m.prescriptionId,
          medication_name: m.medicationName,
          strength: m.strength,
          form: m.form,
          quantity: 0, // Placeholder - doctor determines actual quantity
          dosage: m.dosage,
          is_repeat: true
        })),
        ...formData.customMedications.map(m => ({
          medication_name: m.medicationName,
          strength: m.strength,
          form: m.form,
          quantity: 0, // Placeholder - doctor determines actual quantity
          is_repeat: false,
          reason: m.reason
        }))
      ];

      const requestPayload: PrescriptionRequest = {
        medications,
        request_type: formData.requestType,
        urgency: formData.urgency,
        additional_notes: formData.additionalNotes
      };

      const response = await requestNewPrescription(requestPayload);
      setRequestResponse(response);
      setShowSuccessModal(true);

    } catch (err: any) {
      setValidationError(err.message || 'Failed to submit prescription request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <AccountHealthLayout title="Request Prescription">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading your prescriptions...</span>
        </div>
      </AccountHealthLayout>
    );
  }

  // Render error state
  if (error) {
    return (
      <AccountHealthLayout title="Request Prescription">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <p className="text-red-800 font-medium mb-4">{error}</p>
          <button
            onClick={loadCurrentPrescriptions}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </AccountHealthLayout>
    );
  }

  return (
    <AccountHealthLayout title="Request Prescription">
      <div className="max-w-3xl mx-auto">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Validation Error Display */}
        {validationError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
            <AlertCircle className="w-4 h-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{validationError}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          {currentStep === 1 && (
            <Step1MedicationSelection
              formData={formData}
              currentPrescriptions={currentPrescriptions}
              onMedicationToggle={handleMedicationToggle}
              onAddCustomMedication={handleAddCustomMedication}
              onRemoveCustomMedication={handleRemoveCustomMedication}
              onCustomMedicationChange={handleCustomMedicationChange}
            />
          )}
          {currentStep === 2 && (
            <Step2Details formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 3 && (
            <Step3Review formData={formData} setFormData={setFormData} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>

          {currentStep < 3 ? (
            <button
              onClick={goToNextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <CheckCircle2 className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && requestResponse && (
        <SuccessModal
          requestReference={requestResponse.request_reference}
          urgency={formData.urgency}
          onViewPrescriptions={() => navigate('/account/prescriptions')}
          onGoToDashboard={() => navigate('/account')}
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/account/prescriptions');
          }}
        />
      )}
    </AccountHealthLayout>
  );
};

// Progress Indicator Component
const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Select' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Review' }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.number <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-xs mt-1.5 ${
                  step.number <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 ${
                  step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Step 1: Medication Selection Component
interface Step1Props {
  formData: PrescriptionRequestFormData;
  currentPrescriptions: ApiMedication[];
  onMedicationToggle: (prescription: ApiMedication) => void;
  onAddCustomMedication: () => void;
  onRemoveCustomMedication: (index: number) => void;
  onCustomMedicationChange: (
    index: number,
    field: keyof CustomMedicationRequest,
    value: string | number
  ) => void;
}

const Step1MedicationSelection: React.FC<Step1Props> = ({
  formData,
  currentPrescriptions,
  onMedicationToggle,
  onAddCustomMedication,
  onRemoveCustomMedication,
  onCustomMedicationChange
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Medications</h2>

      {/* Current Prescriptions Section */}
      {currentPrescriptions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Your Current Prescriptions
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Select what you need refilled
          </p>

          <div className="grid grid-cols-1 gap-4">
            {currentPrescriptions.map(prescription => {
              const isSelected = formData.selectedMedications.some(
                m => m.prescriptionId === prescription.id
              );
              const selectedMed = formData.selectedMedications.find(
                m => m.prescriptionId === prescription.id
              );
              const isControlled = isControlledMedication(prescription.medication_name);

              return (
                <div
                  key={prescription.id}
                  className={`border rounded-md p-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onMedicationToggle(prescription)}
                      className="mt-0.5 mr-2.5 w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 text-sm">
                              {prescription.medication_name}
                            </p>
                            {isControlled && (
                              <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                                Controlled
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {prescription.strength && `${prescription.strength} • `}
                            {prescription.form} • {prescription.dosage}
                          </p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                        )}
                      </div>

                      {/* Compact info for selected medications */}
                      {isSelected && (
                        <p className="text-xs text-gray-500 mt-2">
                          Quantity will be determined by your doctor
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state if no current prescriptions */}
      {currentPrescriptions.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center mb-6">
          <Pill className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            No active prescriptions to refill
          </p>
        </div>
      )}

      {/* Custom Medication Request Section */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Request New Medication</h3>
        <p className="text-xs text-gray-500 mb-3">
          Need something new? Explain what you need and why
        </p>

        <button
          onClick={onAddCustomMedication}
          className="flex items-center px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 text-gray-600 hover:text-gray-700 transition-colors w-full justify-center text-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Request
        </button>

        {/* Custom medication forms */}
        {formData.customMedications.map((med, index) => {
          const isControlled = isControlledMedication(med.medicationName);

          return (
            <div key={index} className="mt-3 border border-blue-200 rounded-md p-3 bg-blue-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-900">
                  New Request #{index + 1}
                  {isControlled && med.medicationName && (
                    <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                      Controlled
                    </span>
                  )}
                </h4>
                <button
                  onClick={() => onRemoveCustomMedication(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={med.medicationName}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'medicationName', e.target.value)
                    }
                    placeholder="e.g., Amoxicillin"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Strength
                  </label>
                  <input
                    type="text"
                    value={med.strength}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'strength', e.target.value)
                    }
                    placeholder="e.g., 500mg"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Form <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={med.form}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'form', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="tablet">Tablet</option>
                    <option value="capsule">Capsule</option>
                    <option value="liquid">Liquid</option>
                    <option value="inhaler">Inhaler</option>
                    <option value="injection">Injection</option>
                    <option value="patch">Patch</option>
                    <option value="cream">Cream</option>
                    <option value="ointment">Ointment</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Why do you need this? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={med.reason}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'reason', e.target.value)
                    }
                    rows={2}
                    placeholder="Explain your symptoms and why you need this..."
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Additional notes
                  </label>
                  <textarea
                    value={med.additionalInfo}
                    onChange={(e) =>
                      onCustomMedicationChange(index, 'additionalInfo', e.target.value)
                    }
                    rows={2}
                    placeholder="Any other relevant information..."
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary info */}
      {(formData.selectedMedications.length > 0 || formData.customMedications.length > 0) && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-2.5">
          <p className="text-xs text-blue-800">
            {formData.selectedMedications.length + formData.customMedications.length} selected
            {formData.selectedMedications.some(m => m.isControlled) ||
            formData.customMedications.some(m => isControlledMedication(m.medicationName)) ? (
              <span className="ml-1">• Includes controlled med</span>
            ) : null}
          </p>
        </div>
      )}
    </div>
  );
};

// Step 2: Request Details Component
interface Step2Props {
  formData: PrescriptionRequestFormData;
  setFormData: React.Dispatch<React.SetStateAction<PrescriptionRequestFormData>>;
}

const Step2Details: React.FC<Step2Props> = ({ formData, setFormData }) => {
  const [currentNomination, setCurrentNomination] = useState<any>(null);
  const [showPharmacySearch, setShowPharmacySearch] = useState(false);
  const [isLoadingPharmacy, setIsLoadingPharmacy] = useState(true);

  // Load nominated pharmacy
  useEffect(() => {
    loadNominatedPharmacy();
  }, []);

  const loadNominatedPharmacy = async () => {
    try {
      setIsLoadingPharmacy(true);
      const response = await getCurrentNomination();
      if (response.nomination) {
        setCurrentNomination(response.nomination);
      }
    } catch (err) {
      console.error('Error loading nominated pharmacy:', err);
    } finally {
      setIsLoadingPharmacy(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>

      {/* Request Type */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          What type of request is this?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {[
            { value: 'repeat', label: 'Repeat', icon: '🔄' },
            { value: 'new', label: 'New', icon: '✨' },
            { value: 'dosage_change', label: 'Dosage Change', icon: '⚖️' }
          ].map(option => (
            <label
              key={option.value}
              className={`p-3 border rounded-md cursor-pointer transition-all ${
                formData.requestType === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="requestType"
                value={option.value}
                checked={formData.requestType === option.value}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    requestType: e.target.value as any
                  }))
                }
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-xl mb-1">{option.icon}</div>
                <p className="text-sm font-medium text-gray-900">{option.label}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Urgency */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          When do you need this?
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { value: 'routine', label: 'Routine', sub: '7-10 days', icon: '📅' },
            { value: 'urgent', label: 'Urgent', sub: '1-3 days', icon: '🚨' }
          ].map(option => (
            <label
              key={option.value}
              className={`p-3 border rounded-md cursor-pointer transition-all ${
                formData.urgency === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={option.value}
                checked={formData.urgency === option.value}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    urgency: e.target.value as any
                  }))
                }
                className="sr-only"
              />
              <div className="flex items-center">
                <div className="text-xl mr-2">{option.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500">{option.sub}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Additional notes (optional)
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) =>
            setFormData(prev => ({
              ...prev,
              additionalNotes: e.target.value
            }))
          }
          rows={3}
          placeholder="Any other information to help your doctor review this..."
          className="w-full border border-gray-300 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          {formData.additionalNotes.length} / 500
        </p>
      </div>

      {/* Nominated Pharmacy */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Your Pharmacy</h3>

        {isLoadingPharmacy ? (
          <div className="border border-gray-200 rounded-md p-4 flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">Loading...</span>
          </div>
        ) : currentNomination ? (
          <div className="border border-green-200 rounded-md p-3 bg-green-50">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {currentNomination.pharmacy.name}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {currentNomination.pharmacy.address_line_1}, {currentNomination.pharmacy.city} {currentNomination.pharmacy.postcode}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPharmacySearch(true)}
              className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            <Pill className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-700 mb-2">No pharmacy set</p>
            <button
              onClick={() => setShowPharmacySearch(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Select One
            </button>
          </div>
        )}
      </div>

      {/* Pharmacy Search Modal (will be implemented with existing patterns) */}
      {showPharmacySearch && (
        <PharmacySearchModal
          onClose={() => setShowPharmacySearch(false)}
          onSelect={(pharmacy) => {
            setCurrentNomination({ pharmacy });
            setShowPharmacySearch(false);
          }}
        />
      )}
    </div>
  );
};

// Pharmacy Search Modal Placeholder (reuse from NominatedPharmacyPage)
const PharmacySearchModal: React.FC<any> = ({ onClose, onSelect }) => {
  // This will use the existing pharmacy search pattern from NominatedPharmacyPage.tsx
  // Implementation will reuse that code
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h3 className="text-xl font-bold mb-4">Select Pharmacy</h3>
        <p className="text-gray-600 mb-4">
          Search and select your preferred pharmacy
        </p>
        {/* Reuse pharmacy search implementation from NominatedPharmacyPage.tsx */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Step 3: Review Component
interface Step3Props {
  formData: PrescriptionRequestFormData;
  setFormData: React.Dispatch<React.SetStateAction<PrescriptionRequestFormData>>;
}

const Step3Review: React.FC<Step3Props> = ({ formData, setFormData }) => {
  const [currentNomination, setCurrentNomination] = useState<any>(null);
  const [isLoadingPharmacy, setIsLoadingPharmacy] = useState(true);

  useEffect(() => {
    loadNominatedPharmacy();
  }, []);

  const loadNominatedPharmacy = async () => {
    try {
      setIsLoadingPharmacy(true);
      const response = await getCurrentNomination();
      if (response.nomination) {
        setCurrentNomination(response.nomination);
      }
    } catch (err) {
      console.error('Error loading pharmacy:', err);
    } finally {
      setIsLoadingPharmacy(false);
    }
  };

  const hasControlledMedications =
    formData.selectedMedications.some(m => m.isControlled) ||
    formData.customMedications.some(m => isControlledMedication(m.medicationName));

  const totalMedications =
    formData.selectedMedications.length + formData.customMedications.length;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Review & Submit</h2>
      <p className="text-xs text-gray-500 mb-4">
        Check everything looks right before submitting
      </p>

      {/* Selected Medications Section */}
      {formData.selectedMedications.length > 0 && (
        <div className="mb-4 bg-white border border-gray-200 rounded-md p-3">
          <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mr-1.5" />
            Refills ({formData.selectedMedications.length})
          </h3>
          <div className="space-y-2">
            {formData.selectedMedications.map(med => (
              <div
                key={med.prescriptionId}
                className="p-2.5 rounded-md border border-gray-200 bg-gray-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-gray-900 truncate">{med.medicationName}</p>
                      {med.isControlled && (
                        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded flex-shrink-0">
                          Controlled
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {med.strength} • {med.form} • {med.dosage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Medication Requests */}
      {formData.customMedications.length > 0 && (
        <div className="mb-4 bg-white border border-gray-200 rounded-md p-3">
          <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
            <Plus className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
            New Requests ({formData.customMedications.length})
          </h3>
          <div className="space-y-2">
            {formData.customMedications.map((med, index) => {
              const isControlled = isControlledMedication(med.medicationName);
              return (
                <div key={index} className="p-2.5 rounded-md border border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-sm font-medium text-gray-900">{med.medicationName}</p>
                    {isControlled && (
                      <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                        Controlled
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {med.strength && `${med.strength} • `}{med.form}
                  </p>
                  <p className="text-xs text-gray-700 italic">"{med.reason}"</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Request Details */}
      <div className="mb-4 bg-white border border-gray-200 rounded-md p-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium text-gray-900 capitalize">
            {formData.requestType.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Urgency:</span>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-900 capitalize">{formData.urgency}</span>
            {formData.urgency === 'urgent' && (
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                Priority
              </span>
            )}
          </div>
        </div>
        {formData.additionalNotes && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Notes:</p>
            <p className="text-xs text-gray-700 italic">"{formData.additionalNotes}"</p>
          </div>
        )}
      </div>

      {/* Nominated Pharmacy */}
      {currentNomination && (
        <div className="mb-4 bg-white border border-gray-200 rounded-md p-3">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-green-600" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{currentNomination.pharmacy.name}</p>
              <p className="text-xs text-gray-600 truncate">
                {currentNomination.pharmacy.city}, {currentNomination.pharmacy.postcode}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Simple Info */}
      <div className="mb-4 bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-xs text-blue-800">
          Your GP will review this in{' '}
          <span className="font-medium">
            {formData.urgency === 'urgent' ? '1-3 days' : '7-10 days'}
          </span>
          . You'll get an email when it's ready to collect.
          {hasControlledMedications && ' Controlled meds may need extra checks.'}
        </p>
      </div>

      {/* Confirmation Checkbox */}
      <div className="bg-gray-50 border border-gray-300 rounded-md p-3">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={formData.confirmationChecked}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                confirmationChecked: e.target.checked
              }))
            }
            className="mt-0.5 mr-2.5 w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-xs text-gray-700">
            I confirm this information is accurate and I'll collect from my pharmacy when ready
          </span>
        </label>
      </div>
    </div>
  );
};

// Success Modal Component
interface SuccessModalProps {
  requestReference: string;
  urgency: 'routine' | 'urgent';
  onViewPrescriptions: () => void;
  onGoToDashboard: () => void;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  requestReference,
  urgency,
  onViewPrescriptions,
  onGoToDashboard,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-scale-in">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          Request Submitted!
        </h2>

        {/* Reference Number */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-xs text-gray-600 text-center mb-1">Your reference number:</p>
          <p className="text-lg font-mono font-bold text-blue-900 text-center tracking-wide">
            {requestReference}
          </p>
        </div>

        {/* Information */}
        <div className="mb-6 space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Your GP will review your request in{' '}
              <span className="font-medium">
                {urgency === 'urgent' ? '1-3 working days' : '7-10 working days'}
              </span>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              You'll receive an <span className="font-medium">email notification</span> when your prescription is ready
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Collect from your nominated pharmacy once approved
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onViewPrescriptions}
            className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
          >
            View My Prescriptions
          </button>
          <button
            onClick={onGoToDashboard}
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RequestPrescriptionPage;
