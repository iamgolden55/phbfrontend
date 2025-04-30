// Constants
const FEEDBACK_POPUP_DELAY = 2 * 60 * 1000; // 2 minutes in milliseconds
const FEEDBACK_POPUP_STORAGE_KEY = 'phb_feedback_popup';
const FEEDBACK_POPUP_DISMISSED_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Checks if the feedback popup should be shown based on:
 * 1. Whether the user has dismissed it previously and when
 * 2. Whether they have already submitted feedback
 */
export const shouldShowFeedbackPopup = (): boolean => {
  try {
    const savedData = localStorage.getItem(FEEDBACK_POPUP_STORAGE_KEY);

    if (!savedData) {
      return true; // No saved data, show the popup
    }

    const feedbackData = JSON.parse(savedData);

    // Check if user has submitted feedback
    if (feedbackData.submitted) {
      return false; // User already submitted feedback
    }

    // Check if the popup was dismissed within the duration window
    if (feedbackData.dismissed) {
      const dismissedTime = new Date(feedbackData.dismissedAt).getTime();
      const currentTime = new Date().getTime();

      if (currentTime - dismissedTime < FEEDBACK_POPUP_DISMISSED_DURATION) {
        return false; // Popup was dismissed recently, don't show again yet
      }
    }

    return true; // Default to showing the popup
  } catch (error) {
    console.error('Error checking feedback popup status:', error);
    return false; // On error, don't show popup
  }
};

/**
 * Records when the user dismisses the popup without submitting feedback
 */
export const dismissFeedbackPopup = (): void => {
  try {
    const currentData = localStorage.getItem(FEEDBACK_POPUP_STORAGE_KEY);
    const feedbackData = currentData ? JSON.parse(currentData) : {};

    feedbackData.dismissed = true;
    feedbackData.dismissedAt = new Date().toISOString();

    localStorage.setItem(FEEDBACK_POPUP_STORAGE_KEY, JSON.stringify(feedbackData));
  } catch (error) {
    console.error('Error saving feedback popup dismissal:', error);
  }
};

/**
 * Records when the user submits feedback
 */
export const recordFeedbackSubmission = (): void => {
  try {
    const currentData = localStorage.getItem(FEEDBACK_POPUP_STORAGE_KEY);
    const feedbackData = currentData ? JSON.parse(currentData) : {};

    feedbackData.submitted = true;
    feedbackData.submittedAt = new Date().toISOString();

    localStorage.setItem(FEEDBACK_POPUP_STORAGE_KEY, JSON.stringify(feedbackData));
  } catch (error) {
    console.error('Error saving feedback submission:', error);
  }
};

/**
 * Get the delay time for showing the popup
 */
export const getFeedbackPopupDelay = (): number => {
  return FEEDBACK_POPUP_DELAY;
};
