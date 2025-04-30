import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import FeedbackPopup from '../../components/FeedbackPopup';
import {
  shouldShowFeedbackPopup,
  dismissFeedbackPopup,
  recordFeedbackSubmission,
  getFeedbackPopupDelay
} from '../../utils/feedbackService';

// Create context
interface FeedbackContextType {
  showFeedbackPopup: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

// Provider component
interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to show the popup manually (if needed)
  const showFeedbackPopup = () => {
    setIsPopupVisible(true);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    dismissFeedbackPopup();
    setIsPopupVisible(false);
  };

  // Handle feedback submission
  const handleFeedbackSubmitted = () => {
    recordFeedbackSubmission();
  };

  // Set up timer to show the popup after delay
  useEffect(() => {
    // Don't show popup immediately
    if (!shouldShowFeedbackPopup()) {
      return;
    }

    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, getFeedbackPopupDelay());

    // Clean up timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <FeedbackContext.Provider value={{ showFeedbackPopup }}>
      {children}

      {isPopupVisible && (
        <FeedbackPopup
          onClose={handleClosePopup}
        />
      )}
    </FeedbackContext.Provider>
  );
};

// Custom hook to use the feedback context
export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);

  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }

  return context;
};
