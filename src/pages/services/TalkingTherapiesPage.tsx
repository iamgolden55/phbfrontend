import React from 'react';
import { Link } from 'react-router-dom';

const TalkingTherapiesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Talking therapies on the PHB</h1>
          <p className="text-xl font-medium">
            Find out about talking therapies available through the PHB and how to access them
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <Link to="/mental-health" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                    Mental health
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-gray-500 md:ml-2">Talking therapies</span>
                </div>
              </li>
            </ol>
          </nav>

          <h2 className="text-2xl font-bold mb-4">What are talking therapies?</h2>
          <p className="mb-4">
            Talking therapies, also known as psychological therapies, involve talking to a trained professional about your thoughts, feelings, and behaviors. They can help you understand and manage your mental health difficulties.
          </p>
          <p className="mb-4">
            The PHB offers various talking therapies to help people deal with mental health problems like depression, anxiety, stress, and other emotional difficulties.
          </p>
          <p>
            Talking therapies can help you develop coping strategies, change negative thought patterns, and improve your overall wellbeing.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Types of talking therapies available</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="text-xl font-bold ml-3">Cognitive Behavioural Therapy (CBT)</h3>
              </div>
              <p className="text-gray-600 mb-3">
                CBT helps you understand how your thoughts, feelings, and behaviors are connected. It teaches practical skills to change negative thinking patterns and develop coping strategies.
              </p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium mb-1">Best for:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Depression and anxiety</li>
                  <li>• Panic attacks and phobias</li>
                  <li>• OCD and PTSD</li>
                  <li>• Eating disorders</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-xl font-bold ml-3">Counselling</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Counselling provides a safe, confidential space to talk about your problems with a trained therapist who will listen without judging and help you find your own solutions.
              </p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium mb-1">Best for:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Life transitions and changes</li>
                  <li>• Relationship problems</li>
                  <li>• Bereavement and loss</li>
                  <li>• Work-related stress</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <h3 className="text-xl font-bold ml-3">Psychotherapy</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Psychotherapy explores deeper emotional and psychological issues, often focusing on past experiences and how they affect your present. It typically involves longer-term treatment.
              </p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium mb-1">Best for:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Long-standing emotional problems</li>
                  <li>• Complex trauma</li>
                  <li>• Personality difficulties</li>
                  <li>• Recurring patterns of behavior</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-xl font-bold ml-3">Group therapy</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Group therapy involves meeting with a therapist and a small group of people with similar issues. You can learn from others' experiences and provide mutual support.
              </p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium mb-1">Best for:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Social anxiety</li>
                  <li>• Substance misuse</li>
                  <li>• Bereavement support</li>
                  <li>• Building social skills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How to access talking therapies</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Self-referral (IAPT Services)
            </h3>
            <p className="text-gray-700 mb-3">
              You can refer yourself directly to Improving Access to Psychological Therapies (IAPT) services without seeing your GP first.
            </p>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
              <li>Find your local IAPT service through the PHB service finder</li>
              <li>Call or complete an online self-referral form</li>
              <li>You'll be contacted within a few weeks for an initial assessment</li>
              <li>Based on your needs, you'll be offered appropriate therapy</li>
            </ol>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              GP referral
            </h3>
            <p className="text-gray-700 mb-3">
              Your GP can refer you to talking therapy services and help you decide which type of therapy is most suitable.
            </p>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
              <li>Book an appointment with your GP</li>
              <li>Discuss your mental health concerns</li>
              <li>Your GP will assess your needs and refer you to appropriate services</li>
              <li>Wait for the service to contact you (usually 2-4 weeks)</li>
            </ol>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Online therapy services
            </h3>
            <p className="text-gray-700 mb-3">
              The PHB provides free online mental health resources including:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li><strong>PHB Mindfulness app:</strong> Guided meditation and mindfulness exercises</li>
              <li><strong>MoodZone:</strong> Self-help tools for stress, anxiety, and depression</li>
              <li><strong>Online CBT courses:</strong> Structured programs you can complete at your own pace</li>
              <li><strong>Mental health forums:</strong> Connect with others experiencing similar issues</li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What to expect</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Initial assessment</h3>
              <p className="text-gray-600 mb-3">
                Before starting therapy, you'll have an initial assessment (usually 30-60 minutes) where a therapist will:
              </p>
              <ul className="list-disc ml-6 text-gray-600 space-y-1">
                <li>Ask about your current difficulties and symptoms</li>
                <li>Discuss your medical and mental health history</li>
                <li>Explore what you hope to achieve from therapy</li>
                <li>Recommend the most suitable type of therapy</li>
                <li>Explain how the therapy works and what to expect</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">During therapy sessions</h3>
              <p className="text-gray-600 mb-3">
                Therapy sessions typically last 50-60 minutes and may be:
              </p>
              <ul className="list-disc ml-6 text-gray-600 space-y-1">
                <li><strong>Face-to-face:</strong> At a clinic or therapy center</li>
                <li><strong>Video call:</strong> Via secure online platforms</li>
                <li><strong>Telephone:</strong> Over the phone</li>
                <li><strong>Group sessions:</strong> With other people experiencing similar issues</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Duration of treatment</h3>
              <p className="text-gray-600 mb-3">
                The length of therapy varies depending on your needs and the type of therapy:
              </p>
              <ul className="list-disc ml-6 text-gray-600 space-y-1">
                <li><strong>Brief therapy:</strong> 6-8 sessions for specific issues</li>
                <li><strong>Short-term therapy:</strong> 12-20 sessions for moderate difficulties</li>
                <li><strong>Long-term therapy:</strong> 6 months to several years for complex issues</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Preparing for your first session</h2>

          <div className="bg-gray-50 rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Think about what you want to say</p>
                  <p className="text-sm text-gray-600">Write down key points you want to discuss</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Be honest and open</p>
                  <p className="text-sm text-gray-600">The more honest you are, the more your therapist can help</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Ask questions</p>
                  <p className="text-sm text-gray-600">Don't hesitate to ask about anything you don't understand</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Give it time</p>
                  <p className="text-sm text-gray-600">It may take a few sessions to feel comfortable and see progress</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Remember it's confidential</p>
                  <p className="text-sm text-gray-600">What you discuss stays between you and your therapist (with rare exceptions for safety)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h3 className="text-lg font-bold mb-2 text-red-800">If you're in crisis</h3>
          <p className="text-red-700 mb-3">
            If you're having thoughts of suicide or self-harm, or you're in immediate distress:
          </p>
          <ul className="space-y-2 text-red-700">
            <li>• <strong>Call 999</strong> for immediate emergency help</li>
            <li>• <strong>Call Samaritans on 116 123</strong> (24 hours, free from any phone)</li>
            <li>• <strong>Text SHOUT to 85258</strong> for 24/7 crisis text support</li>
            <li>• Go to your nearest A&E department</li>
            <li>• Contact your GP or out-of-hours service</li>
          </ul>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related mental health information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/mental-health/depression" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-600 mb-1">Depression</h3>
              <p className="text-sm text-gray-600">Symptoms, causes, and treatments for depression</p>
            </Link>
            <Link to="/mental-health/anxiety" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-600 mb-1">Anxiety</h3>
              <p className="text-sm text-gray-600">Understanding and managing anxiety disorders</p>
            </Link>
            <Link to="/mental-health/stress" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-600 mb-1">Stress</h3>
              <p className="text-sm text-gray-600">How to recognize and reduce stress</p>
            </Link>
            <Link to="/mental-health/ptsd" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-600 mb-1">PTSD</h3>
              <p className="text-sm text-gray-600">Post-traumatic stress disorder information and support</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkingTherapiesPage;
