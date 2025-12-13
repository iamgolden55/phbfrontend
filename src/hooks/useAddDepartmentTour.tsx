/**
 * useAddDepartmentTour Hook
 *
 * Provides guided tour for the Add Department Modal
 * Helps users understand the difference between department name and classification
 *
 * @author AI Assistant
 * @date December 2025
 */

import { useState, useEffect, useCallback } from 'react';
import { CallBackProps, Step, STATUS } from 'react-joyride';

const TOUR_STORAGE_KEY = 'phb_add_department_tour_completed';

export const useAddDepartmentTour = () => {
  const [tourState, setTourState] = useState({
    run: false,
    stepIndex: 0
  });

  const steps: Step[] = [
    {
      target: '[data-tour="dept-name"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">📝 Custom Department Name</h3>
          <p className="text-gray-700 mb-2">
            This is <strong>your unique name</strong> for this specific department instance.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg mt-2 border border-blue-200">
            <p className="text-xs text-blue-800 font-medium mb-1">💡 Pro Tip:</p>
            <p className="text-xs text-blue-700">
              You can create multiple departments with the same classification but different names:
            </p>
            <ul className="text-xs text-blue-700 mt-1 ml-4 list-disc">
              <li>"Main Cardiology Department"</li>
              <li>"Pediatric Cardiology"</li>
              <li>"Cardiac Surgery Unit"</li>
            </ul>
          </div>
        </div>
      ),
      disableBeacon: true,
      placement: 'bottom',
      styles: {
        options: {
          width: 400,
        },
      },
    },
    {
      target: '[data-tour="dept-type"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">🏷️ Department Classification</h3>
          <p className="text-gray-700 mb-2">
            This is a <strong>template/category</strong> that determines what features your department has.
          </p>
          <div className="bg-orange-50 p-3 rounded-lg mt-2 border border-orange-200">
            <p className="text-xs text-orange-800 font-medium mb-1">🎯 What This Controls:</p>
            <ul className="text-xs text-orange-700 ml-4 list-disc space-y-1">
              <li><strong>Clinical</strong> departments get bed capacity, patient appointments</li>
              <li><strong>Support</strong> departments get specialized workflows (labs, pharmacy)</li>
              <li><strong>Administrative</strong> departments focus on management tasks</li>
            </ul>
          </div>
        </div>
      ),
      placement: 'bottom',
      styles: {
        options: {
          width: 400,
        },
      },
    },
    {
      target: '[data-tour="dept-code"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">🔢 Auto-Generated Code</h3>
          <p className="text-gray-700 mb-2">
            This code is <strong>automatically created</strong> based on your department name and classification.
          </p>
          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2">
            It ensures each department has a unique identifier in the system.
          </p>
        </div>
      ),
      placement: 'top',
      styles: {
        options: {
          width: 350,
        },
      },
    },
    {
      target: '[data-tour="dept-description"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">📋 Department Description</h3>
          <p className="text-gray-700 mb-2">
            Provide details about what this department does, services offered, and any specialties.
          </p>
          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2">
            This helps staff and patients understand the department's purpose.
          </p>
        </div>
      ),
      placement: 'top',
      styles: {
        options: {
          width: 350,
        },
      },
    },
  ];

  // Auto-start tour on first modal open (if not completed before)
  useEffect(() => {
    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!tourCompleted) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        setTourState({ run: true, stepIndex: 0 });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, index, type, action } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as STATUS)) {
      setTourState({ run: false, stepIndex: 0 });
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    } else if (type === 'step:after') {
      // Handle step navigation
      const nextIndex = action === 'prev' ? index - 1 : index + 1;
      setTourState(prev => ({
        ...prev,
        stepIndex: nextIndex
      }));
    }
  }, []);

  const startTour = useCallback(() => {
    setTourState({ run: true, stepIndex: 0 });
  }, []);

  const stopTour = useCallback(() => {
    setTourState({ run: false, stepIndex: 0 });
  }, []);

  return {
    run: tourState.run,
    stepIndex: tourState.stepIndex,
    steps,
    handleJoyrideCallback,
    startTour,
    stopTour
  };
};
