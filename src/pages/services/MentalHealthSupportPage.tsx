import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const MentalHealthSupportPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Mental Health Support</h1>
          <p className="text-xl font-medium">
            Talk to someone who can help. We are here for you 24/7
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Mental Health Support', href: '/services/mental-health-support' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">You Are Not Alone</h2>
              <p className="mb-4">
                Feeling sad, worried, stressed, or confused is normal. Everyone goes through hard times. But you don't have to face it alone.
              </p>
              <p className="mb-4">
                Our mental health team is here to listen and help you. All conversations are private and confidential. We speak English, Yoruba, Igbo, and Hausa.
              </p>
              <p>
                Whether you want to talk once or need ongoing support, we are here for you.
              </p>
            </div>

            {/* How to Get Help */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">How to Get Help</h2>
              <p className="mb-4">
                You can reach out to us in different ways. Choose what feels comfortable for you:
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-3">Ways to Connect</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong>Call us:</strong> 0800-PHB-HELP (0800-742-4357) - Free, anytime
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong>Chat with us:</strong> Quick text support from trained counselors
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong>Video call:</strong> Face-to-face support via secure video
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <strong>Book appointment:</strong> Schedule a session that works for you
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Who Can Help */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Who Will Help You</h2>
              <p className="mb-4">
                Our team includes trained mental health professionals who understand Nigerian culture and speak your language.
              </p>

              <h3 className="text-xl font-semibold mb-2">Our team can help with:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Depression and sadness</li>
                <li>Anxiety and worry</li>
                <li>Stress from work, school, or family</li>
                <li>Relationship problems</li>
                <li>Grief and loss</li>
                <li>Trauma and difficult experiences</li>
                <li>Self-esteem and confidence</li>
                <li>Life changes and difficult decisions</li>
              </ul>
            </div>

            {/* What to Expect */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">What to Expect</h2>
              <p className="mb-4">
                When you reach out to us:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You will speak with a trained counselor</li>
                <li>They will listen without judging you</li>
                <li>Everything you say is private and confidential</li>
                <li>You can talk in English, Yoruba, Igbo, or Hausa</li>
                <li>You can stay anonymous if you want</li>
                <li>They will help you understand your feelings</li>
                <li>They will suggest ways to feel better</li>
                <li>They can connect you with more support if needed</li>
              </ul>
            </div>

            {/* Taking First Step */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Taking the First Step</h2>
              <p className="mb-4">
                We know it can be hard to ask for help. But reaching out is a sign of strength, not weakness.
              </p>
              <p className="mb-4">
                You don't need to explain everything perfectly. Just start by saying how you feel. Our team will help guide the conversation.
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="font-semibold mb-2">Remember:</p>
                <ul className="space-y-2">
                  <li>• You deserve support</li>
                  <li>• Your feelings matter</li>
                  <li>• It's okay to not be okay</li>
                  <li>• Help is available</li>
                  <li>• Things can get better</li>
                </ul>
              </div>
            </div>

            {/* For Family and Friends */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Helping Someone Else</h2>
              <p className="mb-4">
                Worried about a family member or friend? You can also reach out to us for advice on how to help them.
              </p>
              <p className="mb-4">
                Signs someone might need help:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Withdrawing from family and friends</li>
                <li>Not eating or sleeping well</li>
                <li>Losing interest in things they used to enjoy</li>
                <li>Talking about feeling hopeless</li>
                <li>Behaving differently than usual</li>
                <li>Using alcohol or drugs more</li>
              </ul>
              <p>
                If you're concerned, encourage them to reach out or contact us yourself for guidance.
              </p>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Emergency Help */}
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded">
              <h3 className="text-lg font-bold mb-2 text-red-800">Emergency?</h3>
              <p className="text-sm text-red-700 mb-3">
                If you or someone is in immediate danger or thinking about suicide:
              </p>
              <ul className="text-sm text-red-700 mb-4 space-y-2">
                <li>• Call <strong>112</strong> now</li>
                <li>• Go to the nearest emergency room</li>
                <li>• Don't leave them alone</li>
              </ul>
              <a
                href="tel:112"
                className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-center font-bold text-sm"
              >
                Call 112
              </a>
            </div>

            {/* Quick Contact */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Contact Us Now</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Call 24/7</p>
                  <a href="tel:0800-742-4357" className="text-[#0891b2] hover:underline text-lg font-medium">
                    0800-PHB-HELP
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Free from any phone</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Email Us</p>
                  <a href="mailto:support@phb.ng" className="text-[#0891b2] hover:underline">
                    support@phb.ng
                  </a>
                  <p className="text-sm text-gray-600 mt-1">We reply within 24 hours</p>
                </div>
                <div>
                  <Link
                    to="/account/appointments/book"
                    className="block bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] text-center font-medium"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Topics */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/mental-health/depression" className="text-[#0891b2] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Depression
                  </Link>
                </li>
                <li>
                  <Link to="/mental-health/anxiety" className="text-[#0891b2] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Anxiety
                  </Link>
                </li>
                <li>
                  <Link to="/services/talking-therapies" className="text-[#0891b2] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Talking therapies
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/mental-wellbeing" className="text-[#0891b2] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Mental wellbeing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured Content */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Mental wellbeing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0891b2] mb-3">Check Your Wellbeing</h3>
                <p className="text-gray-600 mb-4">
                  Take a few minutes to check in with yourself and get personalized guidance.
                </p>
                <Link to="/tools/mental-wellbeing-assessment" className="text-[#0891b2] font-medium hover:underline">
                  Take the check
                </Link>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h4 className="font-bold mb-1 text-sm">Your Privacy</h4>
                  <p className="text-xs text-gray-700">
                    Everything you share is private and confidential. We only share information if there's a risk of serious harm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthSupportPage;
