import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AssessmentType {
  type: string;
  title: string;
  description: string;
  whoFor: string[];
  process: string[];
  outcomes: string[];
  duration: string;
}

const assessmentTypes: AssessmentType[] = [
  {
    type: 'care-needs',
    title: 'Care needs assessment',
    description: 'A comprehensive evaluation of your daily living needs, health conditions, and support requirements to determine what help you might benefit from.',
    whoFor: [
      'Adults with physical or mental health conditions',
      'People struggling with daily activities',
      'Those leaving hospital or changing circumstances',
      'Anyone feeling they need support or care',
      'Family members concerned about a loved one'
    ],
    process: [
      'Initial contact and appointment scheduling',
      'Detailed discussion about your daily life and challenges',
      'Assessment of your physical and mental wellbeing',
      'Review of your social situation and support network',
      'Discussion of your goals and preferences',
      'Development of personalized care plan'
    ],
    outcomes: [
      'Clear understanding of your support needs',
      'Personalized care and support plan',
      'Information about available services',
      'Referrals to appropriate support providers',
      'Financial assessment for funding eligibility',
      'Regular review dates scheduled'
    ],
    duration: '1-2 hours, sometimes multiple visits'
  },
  {
    type: 'mental-health',
    title: 'Mental health assessment',
    description: 'A specialized evaluation focusing on your emotional wellbeing, mental health conditions, and psychological support needs.',
    whoFor: [
      'People experiencing depression, anxiety, or other mental health issues',
      'Those with thoughts of self-harm or suicide',
      'Individuals with eating disorders or addiction',
      'People experiencing trauma or grief',
      'Anyone concerned about their mental wellbeing'
    ],
    process: [
      'Safe, confidential environment for discussion',
      'Exploration of your mental health history',
      'Assessment of current symptoms and triggers',
      'Evaluation of risk factors and safety',
      'Discussion of coping strategies and support',
      'Development of mental health support plan'
    ],
    outcomes: [
      'Better understanding of your mental health needs',
      'Safety planning and crisis support information',
      'Referrals to mental health services',
      'Recommendations for therapy or treatment',
      'Peer support and community resource connections',
      'Follow-up and monitoring arrangements'
    ],
    duration: '45-90 minutes, ongoing as needed'
  },
  {
    type: 'occupational',
    title: 'Occupational therapy assessment',
    description: 'An evaluation of how health conditions or disabilities affect your ability to perform daily activities, work, and participate in meaningful occupations.',
    whoFor: [
      'People with physical disabilities or injuries',
      'Those recovering from illness or surgery',
      'Individuals with cognitive or neurological conditions',
      'People wanting to return to work or education',
      'Anyone needing equipment or home modifications'
    ],
    process: [
      'Discussion of your daily routine and challenges',
      'Observation of functional activities',
      'Assessment of physical and cognitive abilities',
      'Evaluation of your home and work environment',
      'Trial of assistive equipment or adaptations',
      'Goal setting and intervention planning'
    ],
    outcomes: [
      'Improved ability to perform daily activities',
      'Recommendations for equipment and adaptations',
      'Workplace or educational accommodations',
      'Skills training and rehabilitation programs',
      'Environmental modifications for safety',
      'Strategies for energy conservation and pain management'
    ],
    duration: '1-2 hours, plus follow-up sessions as needed'
  }
];

const AssessmentPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('care-needs');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentType = assessmentTypes.find(type => type.type === selectedType) || assessmentTypes[0];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/care-and-support" className="hover:underline">Care and support</Link>
            <span className="mx-2">›</span>
            <span>Care assessments</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Care and support assessments</h1>
          <p className="text-xl font-medium">
            Understanding your needs to provide the right support at the right time for your unique situation
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Understanding assessments */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Assessments are about understanding you as a whole person</h2>
          <p className="mb-4 text-gray-700">
            A care assessment isn't a test you can pass or fail - it's a conversation about you, your life, 
            your needs, and your goals. We want to understand what matters most to you and how we can best 
            support you to live the life you want to live.
          </p>
          <p className="mb-4 text-gray-700">
            The assessment process is designed to be respectful, person-centered, and focused on your 
            strengths as well as areas where you might need support. You are the expert on your own life, 
            and we're here to listen and understand.
          </p>
          <p className="text-gray-700 font-medium">
            <strong>Remember:</strong> You have the right to ask questions, take breaks, have someone with 
            you for support, and request information in formats that work for you. This is your assessment.
          </p>
        </div>

        {/* Assessment principles */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Our assessment principles</h2>
          <p className="text-gray-600 mb-4">
            Every assessment we conduct is guided by these fundamental principles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Person-centered:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your goals and wishes come first</li>
                <li>• We focus on what matters to you</li>
                <li>• Your strengths and abilities are recognized</li>
                <li>• You maintain choice and control</li>
                <li>• Family and friends are included as you wish</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Holistic approach:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• We consider all aspects of your wellbeing</li>
                <li>• Physical, mental, and social needs are assessed</li>
                <li>• Your environment and relationships matter</li>
                <li>• Cultural and spiritual needs are respected</li>
                <li>• Prevention and early intervention are prioritized</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">Strengths-based:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• We build on what you can do</li>
                <li>• Your existing support network is valued</li>
                <li>• Resilience and coping skills are recognized</li>
                <li>• Community resources are identified</li>
                <li>• Independence is promoted where possible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Types of assessments */}
        <h2 className="text-2xl font-bold mb-6">Types of assessments available</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {assessmentTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setSelectedType(type.type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === type.type
                    ? 'bg-[#005eb8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#005eb8] mb-2">{currentType.title}</h3>
            <p className="text-gray-600 mb-4">{currentType.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <strong>Typical duration:</strong> {currentType.duration}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Who this assessment is for:</h4>
              <ul className="space-y-1">
                {currentType.whoFor.map((person, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {person}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Assessment process:</h4>
              <ul className="space-y-1">
                {currentType.process.map((step, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Possible outcomes:</h4>
              <ul className="space-y-1">
                {currentType.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Preparing for assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Preparing for your assessment</h2>
          <p className="text-gray-600 mb-4">
            You don't need to do anything special to prepare, but these tips might help you feel more confident:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Before the assessment:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Think about what you'd like to achieve</li>
                <li>• Make notes about your daily routine and challenges</li>
                <li>• Gather any relevant medical information</li>
                <li>• Consider who you'd like to have with you</li>
                <li>• Prepare any questions you want to ask</li>
                <li>• Let us know about any communication needs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">During the assessment:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be honest about your needs and concerns</li>
                <li>• Share what's working well in your life</li>
                <li>• Ask questions if you don't understand something</li>
                <li>• Take breaks if you need them</li>
                <li>• Speak up about your preferences and goals</li>
                <li>• Remember - you're the expert on your life</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-800 text-sm">
              <strong>Don't worry:</strong> There are no wrong answers in an assessment. We're here to understand 
              and support you, not to judge. If you forget something or think of it later, you can always contact us.
            </p>
          </div>
        </div>

        {/* After the assessment */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">What happens after your assessment</h2>
          <p className="text-yellow-700 mb-4">
            The assessment is just the beginning of getting the right support for your needs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">Immediate next steps:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• You'll receive a copy of your assessment</li>
                <li>• A personalized support plan will be created</li>
                <li>• Funding eligibility will be determined</li>
                <li>• Service options will be explained to you</li>
                <li>• Contact details for services will be provided</li>
                <li>• Any urgent needs will be addressed quickly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">Ongoing support:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Regular reviews of your support plan</li>
                <li>• Adjustments as your needs change</li>
                <li>• Advocacy and guidance when needed</li>
                <li>• Connection to community resources</li>
                <li>• Support to access services</li>
                <li>• A named contact person for questions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB assessment services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Free Assessments</h3>
            <p className="mb-4 text-sm">
              All care and support assessments are completely free, regardless of your 
              financial situation. We believe everyone deserves access to assessment.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• No charge for assessment</li>
              <li>• No obligation to accept services</li>
              <li>• Professional, qualified assessors</li>
              <li>• Available in your home or our offices</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Request assessment
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Specialist Assessments</h3>
            <p className="mb-4 text-sm">
              Access to specialist assessments including occupational therapy, 
              mental health, and disability-specific evaluations.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Occupational therapy assessments</li>
              <li>• Mental health evaluations</li>
              <li>• Autism and learning disability assessments</li>
              <li>• Sensory impairment assessments</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Specialist assessment info
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Assessment Support</h3>
            <p className="mb-4 text-sm">
              Support throughout the assessment process, including advocacy, 
              interpretation services, and accessible formats.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Independent advocacy support</li>
              <li>• Interpretation and translation services</li>
              <li>• Easy-read and accessible formats</li>
              <li>• Support for family members</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Get assessment support
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "Who can request a care assessment?",
              answer: "Anyone can request an assessment - you can ask for one yourself, or family members, friends, or professionals can request one on your behalf (with your permission). There's no minimum age or specific criteria - if you think you might need support, you're entitled to an assessment."
            },
            {
              question: "How long does it take to get an assessment?",
              answer: "We aim to complete assessments within 28 days of your request, but urgent situations are prioritized and can often be seen within a few days. The timeframe may vary depending on the complexity of your needs and the type of assessment required."
            },
            {
              question: "Will I have to pay for services after the assessment?",
              answer: "Whether you pay for services depends on your financial situation and the type of support you need. Some services are free, others are means-tested. We'll explain all costs clearly and help you understand what financial support might be available."
            },
            {
              question: "Can I refuse services after an assessment?",
              answer: "Absolutely. The assessment helps identify what support might help you, but you're not obligated to accept any services. You have the right to make your own choices about your care and support, and these choices will be respected."
            },
            {
              question: "How often are assessments reviewed?",
              answer: "We review assessments regularly to make sure your support plan still meets your needs. The frequency depends on your situation - some people need reviews every few months, others annually. You can also request a review anytime if your circumstances change."
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className={`transform transition-transform ${activeAccordion === index ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              {activeAccordion === index && (
                <div className="p-4 pt-0 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Getting started */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Getting the right support starts with understanding your needs</h2>
            <p className="mb-6">
              An assessment is a conversation, not a test. It's about understanding you as a person and 
              identifying how we can best support you to live the life you want to live. PHB is here to 
              listen, understand, and walk alongside you on your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Request assessment
              </Link>
              <a
                href="tel:0800-ASSESSMENT-HELP"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Assessment Helpline
              </a>
              <Link
                to="/care-and-support"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#005eb8] transition-colors inline-block font-bold"
              >
                All care support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;