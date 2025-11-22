import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CarerAssessmentArea {
  area: string;
  title: string;
  description: string;
  questions: string[];
  support: string[];
  outcomes: string[];
}

const assessmentAreas: CarerAssessmentArea[] = [
  {
    area: 'wellbeing',
    title: 'Your physical and mental wellbeing',
    description: 'How caring is affecting your health, energy levels, and emotional state.',
    questions: [
      'How is your physical health? Are you getting enough sleep?',
      'Do you feel stressed, anxious, or overwhelmed?',
      'Are you able to maintain your own healthcare appointments?',
      'Do you have time to relax and do things you enjoy?',
      'How are you coping emotionally with your caring role?'
    ],
    support: [
      'Respite care to give you regular breaks',
      'Health and wellbeing checks',
      'Stress management and counseling support',
      'Exercise and wellness programs',
      'Mental health services'
    ],
    outcomes: [
      'Better physical and mental health',
      'Reduced stress and improved coping',
      'Regular breaks and respite care',
      'Access to healthcare and support services',
      'Improved quality of life'
    ]
  },
  {
    area: 'practical',
    title: 'Practical support and daily life',
    description: 'The practical challenges of caring and how they affect your daily routine.',
    questions: [
      'How much time do you spend caring each week?',
      'What caring tasks do you help with?',
      'Are you able to work, study, or pursue other interests?',
      'Do you have help with household tasks and responsibilities?',
      'Are there practical challenges that make caring difficult?'
    ],
    support: [
      'Direct payments for care services',
      'Home care assistance',
      'Equipment and adaptations',
      'Transport and mobility support',
      'Household help and practical assistance'
    ],
    outcomes: [
      'Reduced caring responsibilities',
      'More time for work, education, or personal interests',
      'Practical support with daily tasks',
      'Better work-life balance',
      'Improved independence for both you and the person you care for'
    ]
  },
  {
    area: 'social',
    title: 'Social connections and relationships',
    description: 'How caring affects your relationships, social life, and connection to your community.',
    questions: [
      'Do you feel isolated or cut off from friends and family?',
      'Are you able to maintain social activities and hobbies?',
      'How has caring affected your relationships?',
      'Do you have people you can talk to about your caring role?',
      'Are you connected with other carers or support groups?'
    ],
    support: [
      'Carer support groups and social activities',
      'Volunteer befriending services',
      'Community activities and day centers',
      'Online support communities',
      'Family mediation and relationship support'
    ],
    outcomes: [
      'Reduced isolation and loneliness',
      'Stronger social connections',
      'Peer support from other carers',
      'Maintained relationships with family and friends',
      'Sense of community and belonging'
    ]
  }
];

const CarersAssessmentPage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('wellbeing');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentArea = assessmentAreas.find(area => area.area === selectedArea) || assessmentAreas[0];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/care-and-support" className="hover:underline">Care and support</Link>
            <span className="mx-2">›</span>
            <span>Carer assessments</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Carer assessments</h1>
          <p className="text-xl font-medium">
            Your own assessment to understand your needs as a carer and get the support you deserve
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Carer assessment rights */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">You have the right to your own assessment - you matter too</h2>
          <p className="mb-4 text-gray-700">
            As a carer, you are entitled to your own assessment regardless of how much care you provide 
            or your financial situation. This isn't about the person you care for - it's about YOU, 
            your needs, your wellbeing, and how we can support you in your caring role.
          </p>
          <p className="mb-4 text-gray-700">
            Many carers don't realize they have this right, or feel guilty about asking for help for 
            themselves. But supporting you helps you continue caring effectively while maintaining 
            your own health and wellbeing. You deserve care and support too.
          </p>
          <p className="text-gray-700 font-medium">
            <strong>Remember:</strong> Taking care of yourself isn't selfish - it's essential. You 
            can't pour from an empty cup. By getting support, you're actually helping the person you care for too.
          </p>
        </div>

        {/* What is a carer assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What is a carer assessment?</h2>
          <p className="text-gray-600 mb-4">
            A carer assessment is a conversation about your life as a carer and how we can support you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">It's about you:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your physical and mental health</li>
                <li>• Your goals and aspirations</li>
                <li>• Your work, education, or other interests</li>
                <li>• Your relationships and social life</li>
                <li>• Your financial situation and needs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">It considers:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• How much care you provide</li>
                <li>• The impact caring has on your life</li>
                <li>• What support would help you most</li>
                <li>• Your ability to continue caring</li>
                <li>• Your willingness to continue caring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-600">It can lead to:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Respite care and breaks</li>
                <li>• Financial support and benefits</li>
                <li>• Training and information</li>
                <li>• Support groups and counseling</li>
                <li>• Practical help and equipment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assessment areas */}
        <h2 className="text-2xl font-bold mb-6">Areas covered in your carer assessment</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {assessmentAreas.map((area) => (
              <button
                key={area.area}
                onClick={() => setSelectedArea(area.area)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedArea === area.area
                    ? 'bg-[#0891b2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {area.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-[#0891b2] mb-3">{currentArea.title}</h3>
          <p className="text-gray-600 mb-6">{currentArea.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Questions we might discuss:</h4>
              <ul className="space-y-2">
                {currentArea.questions.map((question, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support available:</h4>
              <ul className="space-y-2">
                {currentArea.support.map((support, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {support}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Possible outcomes:</h4>
              <ul className="space-y-2">
                {currentArea.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Who can have assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Who can have a carer assessment?</h2>
          <p className="text-gray-600 mb-4">
            You're entitled to a carer assessment if you provide care for another adult, regardless of:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">You qualify if you:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Provide regular care for an adult (family member, friend, or neighbor)</li>
                <li>• Are caring for someone with physical or mental health needs</li>
                <li>• Are caring for someone with a disability or long-term condition</li>
                <li>• Help with daily activities, emotional support, or supervision</li>
                <li>• Are 16 years old or over (young carers have different support)</li>
                <li>• Live in our area (or the person you care for does)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">It doesn't matter if:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You live with the person you care for or separately</li>
                <li>• You're related to them or not</li>
                <li>• You provide care for just a few hours or full-time</li>
                <li>• The person you care for refuses services</li>
                <li>• You work or claim benefits</li>
                <li>• You have your own health conditions or disabilities</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-800 text-sm">
              <strong>Important:</strong> Even if the person you care for doesn't want or qualify for 
              services, you can still have your own carer assessment. Your rights are independent of theirs.
            </p>
          </div>
        </div>

        {/* The assessment process */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">What to expect from the assessment process</h2>
          <p className="text-yellow-700 mb-4">
            The carer assessment process is designed to be supportive and understanding:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">The conversation will cover:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Your caring role and responsibilities</li>
                <li>• How caring affects your daily life</li>
                <li>• Your physical and mental wellbeing</li>
                <li>• Your work, education, and social life</li>
                <li>• Your goals and what you'd like to achieve</li>
                <li>• What support would help you most</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">We will discuss:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Respite care and breaks from caring</li>
                <li>• Support services for the person you care for</li>
                <li>• Training and information to help you</li>
                <li>• Financial support and benefits you might be entitled to</li>
                <li>• Support groups and counseling services</li>
                <li>• Emergency planning and contingency arrangements</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800 text-sm font-medium">
              Remember: This assessment is confidential and focuses on your needs. You won't be judged, 
              and there's no obligation to accept any services offered.
            </p>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB carer assessment services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Free Carer Assessments</h3>
            <p className="mb-4 text-sm">
              All carer assessments are completely free and confidential. We can meet 
              you at home, in our offices, or wherever is most convenient for you.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• No cost or obligation</li>
              <li>• Confidential and person-centered</li>
              <li>• Available at convenient times</li>
              <li>• Can be done over the phone if preferred</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Request carer assessment
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Carer Support Plans</h3>
            <p className="mb-4 text-sm">
              Following your assessment, we'll work with you to create a personalized 
              support plan that addresses your specific needs and goals.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Personalized support planning</li>
              <li>• Regular reviews and updates</li>
              <li>• Direct payments for services</li>
              <li>• Coordination with other services</li>
            </ul>
            <Link
              to="/care-and-support/carers"
              className="phb-button inline-block text-sm"
            >
              Carer support services
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Ongoing Support</h3>
            <p className="mb-4 text-sm">
              Your needs as a carer may change over time. We provide ongoing support 
              and regular reviews to ensure you continue to get the help you need.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Regular assessment reviews</li>
              <li>• Crisis and emergency support</li>
              <li>• Advocacy and rights information</li>
              <li>• Connection to carer networks</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Ongoing carer support
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "Will the person I care for know about my assessment?",
              answer: "Your carer assessment is confidential, but we encourage open communication when possible. You can choose whether to tell the person you care for about your assessment. Sometimes involving them can help them understand your needs better."
            },
            {
              question: "What if I feel guilty about asking for help for myself?",
              answer: "Feeling guilty is very common among carers, but remember that taking care of yourself helps you provide better care. You deserve support, and getting help isn't selfish - it's responsible. Many carers find that support actually improves their caring relationship."
            },
            {
              question: "Will I have to pay for services after my assessment?",
              answer: "Whether you pay for services depends on your financial situation and the type of support. Many carer services are free, and we'll clearly explain any costs. Financial assessments are separate and optional - you won't be forced to pay more than you can afford."
            },
            {
              question: "How long does a carer assessment take?",
              answer: "A typical carer assessment takes 45-90 minutes, but we can take as long as you need. We can also split it across multiple sessions if that works better for you. The important thing is that you have time to discuss everything that matters to you."
            },
            {
              question: "What if my caring situation changes after the assessment?",
              answer: "You can request a review of your assessment anytime your situation changes. This might be due to changes in your health, the health of the person you care for, your work situation, or any other significant life changes."
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

        {/* Call to action */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">You deserve support too</h2>
            <p className="mb-6 text-gray-700">
              Caring for someone else is one of the most selfless things you can do, but you shouldn't 
              have to sacrifice your own wellbeing to do it. A carer assessment is your opportunity to 
              get the support you need to continue caring while living your own life too.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-bold"
              >
                Request carer assessment
              </Link>
              <a
                href="tel:0800-CARER-ASSESSMENT"
                className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition-colors inline-block font-bold"
              >
                Carer Assessment Helpline
              </a>
              <Link
                to="/care-and-support/carers"
                className="bg-transparent border-2 border-[#0891b2] text-[#0891b2] px-6 py-3 rounded-md hover:bg-[#0891b2] hover:text-white transition-colors inline-block font-bold"
              >
                All carer support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarersAssessmentPage;