import React, { useState } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Link } from 'react-router-dom';

const ContactSupportPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const supportTopics = [
    { value: 'account', label: 'Account & Login Issues' },
    { value: 'appointments', label: 'Appointments & Bookings' },
    { value: 'prescriptions', label: 'Prescriptions & Medications' },
    { value: 'medical-records', label: 'Medical Records Access' },
    { value: 'technical', label: 'Technical Issues' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual support ticket submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedTopic('');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Contact Support</h1>
        <p className="text-gray-600 mt-2">
          Get help with your PHB account and healthcare services
        </p>
      </div>

      {submitted && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-green-700">
                Your message has been sent successfully! Our support team will get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-2xl font-bold text-blue-600 mb-2">0800 123 4567</p>
          <p className="text-sm text-gray-600 mb-1">Available 8am - 8pm</p>
          <p className="text-sm text-gray-600">7 days a week</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
          <a href="mailto:support@phb.org.uk" className="text-lg font-bold text-blue-600 hover:underline mb-2 block">
            support@phb.org.uk
          </a>
          <p className="text-sm text-gray-600 mb-1">Response within 24 hours</p>
          <p className="text-sm text-gray-600">Mon - Sun</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-3">Chat with our team</p>
          <p className="text-sm text-gray-600 mb-3">9am - 5pm, Mon - Fri</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
            Start Chat
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user?.full_name || ''}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user?.email || ''}
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Topic <span className="text-red-500">*</span>
              </label>
              <select
                id="topic"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                required
              >
                <option value="">Select a topic</option>
                {supportTopics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe your issue or question in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Please include as much detail as possible to help us assist you better.
              </p>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Emergency Medical Help</h3>
            <div className="text-sm text-blue-700 mt-1">
              <p className="mb-2">
                If you have a life-threatening emergency, call <strong>999</strong> immediately.
              </p>
              <p>
                For urgent medical problems that are not life-threatening, call <strong>111</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-4">
            Before contacting support, you might find the answer to your question in our help center.
          </p>
          <div className="space-y-3">
            <Link
              to="/help"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Browse Help Center
            </Link>
            <Link
              to="/help/find-phb-number"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              How to find your HPN number
            </Link>
            <Link
              to="/help/appointments/how-to-book"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              How to book an appointment
            </Link>
            <Link
              to="/help/prescriptions/how-to-request"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to request a prescription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportPage;
