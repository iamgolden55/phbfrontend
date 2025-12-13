/**
 * useDepartmentTour Hook
 *
 * Manages the guided tour for the Department Management page.
 * Uses react-joyride for the tour implementation with localStorage persistence.
 *
 * Features:
 * - Auto-start tour on first visit
 * - localStorage persistence for tour completion
 * - Manual tour restart functionality
 * - 5 interactive tour steps
 *
 * @author AI Assistant
 * @date December 2025
 */

import { useState, useEffect, useCallback } from 'react';
import { CallBackProps, Step, STATUS } from 'react-joyride';

const TOUR_STORAGE_KEY = 'phb_department_tour_completed';

interface TourState {
  run: boolean;
  stepIndex: number;
}

/**
 * Custom hook for managing the Department Management page tour
 *
 * @returns {Object} Tour state and controls
 * @returns {boolean} run - Whether the tour should be running
 * @returns {number} stepIndex - Current step index
 * @returns {Step[]} steps - Array of tour steps
 * @returns {Function} handleJoyrideCallback - Callback handler for joyride events
 * @returns {Function} restartTour - Function to manually restart the tour
 */
export const useDepartmentTour = () => {
  const [tourState, setTourState] = useState<TourState>({
    run: false,
    stepIndex: 0
  });

  // Define tour steps
  const steps: Step[] = [
    {
      target: '[data-tour="stats-dashboard"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Department Statistics</h3>
          <p>
            Get a quick overview of your hospital departments. Click on any stat card
            to filter departments by that category. Watch for the trend indicators
            showing how your metrics change over time.
          </p>
        </div>
      ),
      disableBeacon: true,
      placement: 'bottom'
    },
    {
      target: '[data-tour="view-toggle"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">View Toggle</h3>
          <p>
            Switch between card view and table view based on your preference.
            Card view provides a visual, scannable layout, while table view
            offers a detailed data-focused perspective.
          </p>
        </div>
      ),
      placement: 'bottom'
    },
    {
      target: '[data-tour="filters"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Filter Departments</h3>
          <p>
            Use these filters to quickly find specific departments. Filter by type,
            status, location, or search by name. Active filters are shown as chips
            below the filter controls for easy reference.
          </p>
        </div>
      ),
      placement: 'bottom'
    },
    {
      target: '[data-tour="add-button"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Add New Department</h3>
          <p>
            Click here to create a new department. You'll be guided through a
            4-step wizard that makes it easy to set up all the necessary details,
            from basic information to capacity and operations.
          </p>
        </div>
      ),
      placement: 'left'
    },
    {
      target: '[data-tour="department-card"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Department Cards</h3>
          <p>
            Each card shows key information at a glance. Click the expand button
            to see detailed information, or use the quick action buttons to edit
            or deactivate departments. Select multiple departments using the
            checkboxes for bulk actions.
          </p>
        </div>
      ),
      placement: 'top'
    }
  ];

  // Check if tour has been completed before
  useEffect(() => {
    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY);

    // Auto-start tour after 1 second delay if not completed before
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        setTourState({ run: true, stepIndex: 0 });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle joyride callback events
  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, index, type } = data;

    // Handle tour completion or skip
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as STATUS)) {
      setTourState({ run: false, stepIndex: 0 });
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
    // Handle step changes
    else if (type === 'step:after') {
      setTourState(prev => ({
        ...prev,
        stepIndex: index + (data.action === 'prev' ? -1 : 1)
      }));
    }
  }, []);

  // Function to manually restart the tour
  const restartTour = useCallback(() => {
    setTourState({ run: true, stepIndex: 0 });
    // Don't mark as completed yet - let the user finish or skip
  }, []);

  return {
    run: tourState.run,
    stepIndex: tourState.stepIndex,
    steps,
    handleJoyrideCallback,
    restartTour
  };
};
