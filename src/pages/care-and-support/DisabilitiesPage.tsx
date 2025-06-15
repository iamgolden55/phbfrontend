import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DisabilityType {
  type: string;
  title: string;
  description: string;
  challenges: string[];
  support: string[];
  empowerment: string[];
}

const disabilityTypes: DisabilityType[] = [
  {
    type: 'physical',
    title: 'Physical disabilities',
    description: 'Supporting individuals with mobility, dexterity, or physical function differences to live independently and participate fully in community life.',
    challenges: [
      'Accessibility barriers in buildings and transport',
      'Finding appropriate equipment and adaptations',
      'Workplace accommodations and employment',
      'Managing pain or fatigue',
      'Navigating healthcare and support systems'
    ],
    support: [
      'Occupational therapy and physiotherapy',
      'Assistive technology and equipment',
      'Home and workplace modifications',
      'Accessible transport options',
      'Disability benefits and financial support'
    ],
    empowerment: [
      'Developing independence skills',
      'Connecting with peer support networks',
      'Advocating for accessibility improvements',
      'Exploring adaptive sports and recreation',
      'Building confidence and self-advocacy skills'
    ]
  },
  {
    type: 'learning',
    title: 'Learning disabilities',
    description: 'Supporting individuals with learning differences to develop skills, achieve goals, and participate meaningfully in education, work, and community.',
    challenges: [
      'Access to appropriate education and training',
      'Communication and social interaction',
      'Independent living skills development',
      'Employment opportunities and support',
      'Understanding rights and self-advocacy'
    ],
    support: [
      'Person-centered planning and support',
      'Skills development and training programs',
      'Supported employment services',
      'Easy-read information and communication aids',
      'Family and carer support services'
    ],
    empowerment: [
      'Celebrating individual strengths and talents',
      'Developing self-advocacy and choice-making',
      'Building meaningful relationships and friendships',
      'Participating in community activities and groups',
      'Achieving personal goals and aspirations'
    ]
  },
  {
    type: 'sensory',
    title: 'Sensory disabilities',
    description: 'Supporting individuals who are blind, deaf, deafblind, or have other sensory impairments to access information, communicate, and participate fully.',
    challenges: [
      'Communication barriers and access to information',
      'Navigation and mobility in unfamiliar environments',
      'Access to technology and digital services',
      'Educational and employment accommodations',
      'Social isolation and building relationships'
    ],
    support: [
      'Communication support (interpreters, Braille, audio)',
      'Orientation and mobility training',
      'Assistive technology and adaptive equipment',
      'Guide dog services and support',
      'Environmental modifications and accessibility'
    ],
    empowerment: [
      'Developing alternative communication methods',
      'Building independence and confidence',
      'Connecting with deaf and blind communities',
      'Accessing arts, culture, and recreation',
      'Mentoring and peer support opportunities'
    ]
  }
];

const DisabilitiesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('physical');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentType = disabilityTypes.find(type => type.type === selectedType) || disabilityTypes[0];

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
            <span>Disability support</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Disability support and inclusion</h1>
          <p className="text-xl font-medium">
            Empowering individuals with disabilities to live independently, pursue their goals, and participate fully in community life
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Disability rights and empowerment */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Every person has unique abilities and unlimited potential</h2>
          <p className="mb-4 text-gray-700">
            Disability is a natural part of human diversity. People with disabilities have the same rights 
            to dignity, respect, choice, and full participation in society as everyone else. Our role is 
            to remove barriers and provide support that enables independence and empowerment.
          </p>
          <p className="mb-4 text-gray-700">
            We believe in the social model of disability - that barriers in society, not individual 
            impairments, are what disable people. When we remove these barriers and provide appropriate 
            support, people with disabilities can achieve anything they set their minds to.
          </p>
          <p className="text-gray-700 font-medium">
            <strong>Remember:</strong> You are the expert on your own life. You have the right to make 
            choices about your care, support, and how you want to live. We're here to listen and support your goals.
          </p>
        </div>

        {/* Understanding disability support */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Our approach to disability support</h2>
          <p className="text-gray-600 mb-4">
            Quality disability support is person-centered, rights-based, and focused on what matters most to you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Person-centered:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your goals and aspirations come first</li>
                <li>• Support is tailored to your individual needs</li>
                <li>• You maintain choice and control</li>
                <li>• Family and friends are included as you wish</li>
                <li>• Support changes as your needs change</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Rights-based:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Equal access to services and opportunities</li>
                <li>• Protection from discrimination</li>
                <li>• Advocacy and self-advocacy support</li>
                <li>• Respect for your dignity and privacy</li>
                <li>• Freedom from abuse and neglect</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">Strengths-focused:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Building on your existing abilities</li>
                <li>• Celebrating achievements and progress</li>
                <li>• Focusing on possibilities, not limitations</li>
                <li>• Developing independence and confidence</li>
                <li>• Supporting community connections</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Types of disability support */}
        <h2 className="text-2xl font-bold mb-6">Support for different types of disabilities</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {disabilityTypes.map((type) => (
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
          <h3 className="text-xl font-bold text-[#005eb8] mb-3">{currentType.title}</h3>
          <p className="text-gray-600 mb-6">{currentType.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Common challenges:</h4>
              <ul className="space-y-2">
                {currentType.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available support:</h4>
              <ul className="space-y-2">
                {currentType.support.map((support, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {support}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Empowerment opportunities:</h4>
              <ul className="space-y-2">
                {currentType.empowerment.map((empowerment, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {empowerment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Independent living */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Supporting independent living</h2>
          <p className="text-gray-600 mb-4">
            Independent living means having choice and control over your life, with the right support when you need it:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Home and daily living:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accessible housing and home modifications</li>
                <li>• Personal care and support services</li>
                <li>• Assistive technology and equipment</li>
                <li>• Meal preparation and household management</li>
                <li>• Financial management and budgeting support</li>
                <li>• Health and medication management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Community participation:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accessible transportation options</li>
                <li>• Employment and volunteer opportunities</li>
                <li>• Education and training programs</li>
                <li>• Social and recreational activities</li>
                <li>• Building friendships and relationships</li>
                <li>• Advocacy and civic participation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rights and advocacy */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Your rights and advocacy</h2>
          <p className="text-blue-700 mb-4">
            Understanding your rights is empowering. You have legal protections and entitlements that ensure equal treatment and access:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-800">Your fundamental rights:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Equal treatment and non-discrimination</li>
                <li>• Reasonable adjustments and accommodations</li>
                <li>• Privacy and confidentiality</li>
                <li>• Choice and control over your life</li>
                <li>• Access to information in accessible formats</li>
                <li>• Freedom from abuse, neglect, and exploitation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-800">Advocacy support available:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Independent advocacy services</li>
                <li>• Self-advocacy training and support</li>
                <li>• Legal advice and representation</li>
                <li>• Complaints and appeals assistance</li>
                <li>• Disability rights education</li>
                <li>• Peer advocacy and mentoring</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-blue-800 text-sm font-medium">
              If you feel your rights have been violated or you need help advocating for yourself, 
              we can connect you with independent advocacy services. You deserve to be heard and treated with respect.
            </p>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB disability support services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Assessment & Planning</h3>
            <p className="mb-4 text-sm">
              Comprehensive assessments to understand your needs, goals, and preferences, 
              developing personalized support plans that put you in control.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Person-centered assessments</li>
              <li>• Support planning and coordination</li>
              <li>• Equipment and adaptation assessments</li>
              <li>• Regular reviews and updates</li>
            </ul>
            <Link
              to="/care-and-support/assessment"
              className="phb-button inline-block text-sm"
            >
              Request assessment
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Support Services</h3>
            <p className="mb-4 text-sm">
              Flexible support services that adapt to your changing needs and help you 
              achieve your goals for independence and community participation.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Personal care and daily living support</li>
              <li>• Community access and social support</li>
              <li>• Respite care for families</li>
              <li>• Specialist therapy services</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Explore support options
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Empowerment Programs</h3>
            <p className="mb-4 text-sm">
              Programs and activities designed to build skills, confidence, and connections, 
              helping you achieve your personal goals and aspirations.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Skills development and training</li>
              <li>• Peer support and mentoring</li>
              <li>• Self-advocacy training</li>
              <li>• Community engagement activities</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Join programs
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "How do I access disability support services?",
              answer: "Start by contacting PHB for a needs assessment. This is free and helps us understand your situation, goals, and what support might help. From there, we can connect you with appropriate services and help you navigate the system."
            },
            {
              question: "What financial support is available for people with disabilities?",
              answer: "There are various benefits and financial supports available, including disability benefits, personal independence payments, access to work schemes, and direct payments for care. We can help you understand what you might be entitled to and assist with applications."
            },
            {
              question: "Can I choose my own support workers?",
              answer: "Yes, you should have choice and control over who supports you. Many funding arrangements allow you to recruit and manage your own support workers, or you can work with agencies that involve you in the selection process."
            },
            {
              question: "What if I'm not happy with the support I'm receiving?",
              answer: "You have the right to complain and seek changes to your support. We can help you raise concerns, access advocacy support, and work towards solutions. Your feedback helps us improve services for everyone."
            },
            {
              question: "How can family members get support?",
              answer: "Families and carers can access their own support, including respite care, carer assessments, support groups, and training. Supporting someone with a disability affects the whole family, and everyone deserves support."
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

        {/* Empowerment and inclusion */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your potential is unlimited</h2>
            <p className="mb-6 text-gray-700">
              Disability does not define your worth or limit your possibilities. With the right support, 
              understanding, and opportunities, you can achieve your goals and live the life you choose. 
              PHB is committed to walking alongside you on this journey, removing barriers and celebrating your achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/care-and-support/assessment"
                className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-bold"
              >
                Get assessment
              </Link>
              <a
                href="tel:0800-DISABILITY-SUPPORT"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                24/7 Disability Support Line
              </a>
              <Link
                to="/help"
                className="bg-transparent border-2 border-[#005eb8] text-[#005eb8] px-6 py-3 rounded-md hover:bg-[#005eb8] hover:text-white transition-colors inline-block font-bold"
              >
                Rights & advocacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisabilitiesPage;