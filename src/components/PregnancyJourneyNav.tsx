import React from 'react';
import { Link } from 'react-router-dom';

// Define the pregnancy journey steps
export const pregnancyJourneySteps = [
  { label: 'Planning', path: '/pregnancy/planning' },
  { label: 'Early pregnancy', path: '/pregnancy/early' },
  { label: 'Middle pregnancy', path: '/pregnancy/middle' },
  { label: 'Late pregnancy', path: '/pregnancy/late' },
  { label: 'Labor and birth', path: '/pregnancy/labor-and-birth' },
  { label: 'After birth', path: '/pregnancy/after-birth' },
];

interface PregnancyJourneyNavProps {
  currentStepIndex: number;
  showProgressBar?: boolean;
  showPrevNext?: boolean;
  className?: string;
}

const PregnancyJourneyNav: React.FC<PregnancyJourneyNavProps> = ({
  currentStepIndex,
  showProgressBar = true,
  showPrevNext = true,
  className = '',
}) => {
  // Get previous and next steps
  const prevStep = currentStepIndex > 0 ? pregnancyJourneySteps[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < pregnancyJourneySteps.length - 1 ? pregnancyJourneySteps[currentStepIndex + 1] : null;
  const currentStep = pregnancyJourneySteps[currentStepIndex];

  return (
    <div className={`pregnancy-journey-nav ${className}`}>
      {showProgressBar && (
        <>
          <h2 className="text-xl font-bold mb-4">Your pregnancy journey</h2>
          <div className="relative mb-4">
            {/* Progress bar */}
            <div className="h-2 bg-gray-200 rounded-full absolute w-full top-4 z-0"></div>
            <div
              className="h-2 bg-[#005eb8] rounded-full absolute top-4 z-0"
              style={{ width: `${(currentStepIndex / (pregnancyJourneySteps.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="flex justify-between relative z-10">
              {pregnancyJourneySteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Link to={step.path} className="block">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === currentStepIndex
                          ? 'bg-[#005eb8] text-white'
                          : index < currentStepIndex
                            ? 'bg-[#005eb8] text-white opacity-70'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </Link>
                  <span className={`text-xs mt-2 ${index === currentStepIndex ? 'font-bold' : ''}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6 mb-6">
            You are at the <span className="font-bold">{currentStep.label}</span> stage of your pregnancy journey
          </div>
        </>
      )}

      {showPrevNext && (
        <div className="flex justify-between border-t border-b border-gray-200 py-4 my-6">
          {prevStep ? (
            <Link to={prevStep.path} className="flex items-center text-[#005eb8] hover:underline">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous: {prevStep.label}
            </Link>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}

          {nextStep ? (
            <Link to={nextStep.path} className="flex items-center text-[#005eb8] hover:underline">
              Next: {nextStep.label}
              <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}
        </div>
      )}
    </div>
  );
};

export default PregnancyJourneyNav;
