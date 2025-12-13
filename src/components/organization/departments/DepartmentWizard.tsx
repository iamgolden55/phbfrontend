/**
 * DepartmentWizard Component
 *
 * Reusable wizard container for multi-step department forms.
 * Provides progress indicator, navigation, and step content area.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React from 'react';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface WizardStep {
  title: string;
  description: string;
}

interface DepartmentWizardProps {
  steps: WizardStep[];
  currentStep: number;
  children: React.ReactNode;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onStepClick?: (step: number) => void;
  canProceed: boolean;
  isSubmitting?: boolean;
  isLastStep: boolean;
}

/**
 * DepartmentWizard Component
 *
 * Features:
 * - Horizontal progress indicator with step numbers/checkmarks
 * - Step connector lines showing progress
 * - Current step highlighted in blue-900
 * - Completed steps in green with CheckCircle icon
 * - Step content area
 * - Navigation buttons (Cancel, Previous, Next/Submit)
 * - Disabled state handling
 * - Loading state support
 */
const DepartmentWizard: React.FC<DepartmentWizardProps> = ({
  steps,
  currentStep,
  children,
  onPrevious,
  onNext,
  onCancel,
  onSubmit,
  onStepClick,
  canProceed,
  isSubmitting = false,
  isLastStep
}) => {
  return (
    <div className="min-h-[600px] flex flex-col">
      {/* Progress Indicator */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isUpcoming = index > currentStep;

              return (
                <React.Fragment key={index}>
                  {/* Step Circle */}
                  <button
                    onClick={() => onStepClick?.(index)}
                    disabled={isSubmitting || isUpcoming}
                    className="flex flex-col items-center relative focus:outline-none disabled:cursor-not-allowed group"
                    title={isUpcoming ? 'Complete previous steps first' : isCompleted ? 'Go back to this step' : isCurrent ? 'Current step' : ''}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                        transition-all duration-200
                        ${
                          isCompleted
                            ? 'bg-green-500 text-white group-hover:bg-green-600 cursor-pointer'
                            : isCurrent
                            ? 'bg-blue-900 text-white ring-4 ring-blue-100 cursor-default'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }
                        ${!isUpcoming && !isCurrent && !isSubmitting ? 'hover:scale-105' : ''}
                      `}
                    >
                      {isCompleted ? <Check size={20} /> : index + 1}
                    </div>

                    {/* Step Label */}
                    <div className="mt-2 text-center">
                      <div
                        className={`text-xs font-medium ${
                          isCurrent ? 'text-blue-900' : isCompleted ? 'text-green-600 group-hover:text-green-700' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 max-w-[100px] hidden md:block">
                        {step.description}
                      </div>
                    </div>
                  </button>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 px-2">
                      <div
                        className={`h-0.5 transition-colors duration-200 ${
                          index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Cancel Button */}
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Previous Button */}
            {currentStep > 0 && (
              <button
                onClick={onPrevious}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
            )}

            {/* Next/Submit Button */}
            {isLastStep ? (
              <button
                onClick={onSubmit}
                disabled={!canProceed || isSubmitting}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Create Department</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={!canProceed || isSubmitting}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentWizard;
