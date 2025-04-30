import React from 'react';

const FeedbackButton: React.FC = () => {
  return (
    <div className="fixed right-4 bottom-4 z-40">
      <a
        href="mailto:publichealthbureau@hotmail.com?subject=PHB Website Feedback&body=Please share your feedback about the PHB website here. What did you like? What could be improved?"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-lg"
        title="Send us your feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Feedback
      </a>
    </div>
  );
};

export default FeedbackButton;
