import React, { useState } from 'react';
import { recordFeedbackSubmission } from '../utils/feedbackService';

interface FeedbackPopupProps {
  onClose: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setError('Please provide some feedback');
      return;
    }

    setSending(true);

    try {
      // Create the form data for Netlify Forms
      const formData = new FormData();
      formData.append('form-name', 'feedback');
      formData.append('feedback', feedback);
      formData.append('email', email);
      formData.append('recipient', 'publichealthbureau@hotmail.com');

      // Submit the form data to Netlify Forms
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      // Record that the user has submitted feedback
      recordFeedbackSubmission();

      setSubmitted(true);
      setSending(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send feedback. Please try again.');
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">We Value Your Feedback</h2>
            <p className="text-gray-600 mb-4">
              As the PHB website is still under development, we'd appreciate your honest thoughts on your experience so far.
            </p>

            {/* Use Netlify Forms with the proper data-netlify attribute */}
            <form
              onSubmit={handleSubmit}
              name="feedback"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              {/* Hidden fields required by Netlify */}
              <input type="hidden" name="form-name" value="feedback" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="mb-4">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What do you think about the PHB website? Any suggestions for improvement?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="We'll only use this to follow up if needed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4 text-xs text-gray-500">
                Your feedback will be sent to: publichealthbureau@hotmail.com
              </div>

              {error && (
                <div className="mb-4 text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been sent to our team at publichealthbureau@hotmail.com. We appreciate your help in improving the PHB website.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPopup;
