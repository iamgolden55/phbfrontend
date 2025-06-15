import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CarerType {
  type: string;
  title: string;
  description: string;
  challenges: string[];
  support: string[];
  color: string;
}

const carerTypes: CarerType[] = [
  {
    type: 'elderly',
    title: 'Caring for elderly parents or relatives',
    description: 'Supporting older family members with daily activities, health needs, and maintaining their independence.',
    challenges: [
      'Balancing work and caring responsibilities',
      'Managing multiple medical appointments',
      'Dealing with cognitive changes or dementia',
      'Making difficult decisions about care levels',
      'Watching a loved one\'s independence decline'
    ],
    support: [
      'Adult day care services',
      'Home care assistance',
      'Respite care arrangements',
      'Elder care support groups',
      'Financial assistance programs'
    ],
    color: 'blue'
  },
  {
    type: 'disability',
    title: 'Caring for someone with disabilities',
    description: 'Supporting family members or friends with physical, intellectual, or developmental disabilities.',
    challenges: [
      'Navigating complex benefit systems',
      'Finding appropriate services and equipment',
      'Advocating for inclusive opportunities',
      'Managing long-term care planning',
      'Dealing with societal attitudes and barriers'
    ],
    support: [
      'Disability support services',
      'Adaptive equipment and aids',
      'Advocacy and rights support',
      'Peer support networks',
      'Transition planning services'
    ],
    color: 'green'
  },
  {
    type: 'chronic',
    title: 'Caring for someone with chronic illness',
    description: 'Supporting loved ones managing long-term health conditions that affect daily life.',
    challenges: [
      'Managing complex medication regimens',
      'Coordinating with multiple healthcare providers',
      'Dealing with unpredictable symptoms',
      'Managing financial impact of illness',
      'Providing emotional support during flare-ups'
    ],
    support: [
      'Disease-specific support groups',
      'Home nursing services',
      'Medication management support',
      'Counseling and mental health services',
      'Financial assistance programs'
    ],
    color: 'purple'
  }
];

const CarersPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('elderly');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentType = carerTypes.find(type => type.type === selectedType) || carerTypes[0];

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
            <span>Support for carers</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Support for carers</h1>
          <p className="text-xl font-medium">
            Recognizing, supporting, and celebrating the incredible people who care for others
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Recognition for carers */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500 p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">You are a hero, and your care matters</h2>
          <p className="mb-4 text-gray-700">
            Whether you're caring for a parent, partner, child, friend, or family member, you are making 
            an extraordinary difference in someone's life. Caring for another person is one of the most 
            meaningful yet challenging roles anyone can take on.
          </p>
          <p className="mb-4 text-gray-700">
            It's completely normal to feel overwhelmed, exhausted, or even frustrated sometimes. These 
            feelings don't make you any less caring or loving - they make you human. You deserve support, 
            recognition, and care too.
          </p>
          <p className="text-gray-700 font-medium">
            <strong>Remember:</strong> Taking care of yourself isn't selfish - it's essential. You can't 
            pour from an empty cup, and you matter just as much as the person you're caring for.
          </p>
        </div>

        {/* Understanding caring roles */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Understanding your caring role</h2>
          <p className="text-gray-600 mb-4">
            Caring takes many forms and affects every aspect of your life. You might be providing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Personal care:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Help with washing and dressing</li>
                <li>• Assistance with eating and drinking</li>
                <li>• Support with mobility and movement</li>
                <li>• Managing incontinence needs</li>
                <li>• Medication administration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Practical support:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Household tasks and cleaning</li>
                <li>• Shopping and meal preparation</li>
                <li>• Managing finances and bills</li>
                <li>• Transportation to appointments</li>
                <li>• Coordinating with healthcare providers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">Emotional support:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Providing companionship and comfort</li>
                <li>• Listening and emotional support</li>
                <li>• Maintaining social connections</li>
                <li>• Advocating for their needs</li>
                <li>• Being there during difficult times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Types of caring situations */}
        <h2 className="text-2xl font-bold mb-6">Different caring situations</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {carerTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setSelectedType(type.type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === type.type
                    ? 'bg-[#005eb8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.title.split(' ')[2]} {type.title.split(' ')[3] || ''}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-[#005eb8] mb-3">{currentType.title}</h3>
          <p className="text-gray-600 mb-6">{currentType.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Common challenges you might face:</h4>
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
              <h4 className="font-semibold text-gray-900 mb-3">Support available for you:</h4>
              <ul className="space-y-2">
                {currentType.support.map((support, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {support}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Self-care for carers */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">Your wellbeing matters too</h2>
          <p className="text-yellow-700 mb-4">
            Caring for someone else can be physically and emotionally exhausting. It's not selfish to 
            take care of your own needs - it's essential for being able to continue caring effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">Signs you need support:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Feeling constantly tired or overwhelmed</li>
                <li>• Isolating yourself from friends and family</li>
                <li>• Neglecting your own health needs</li>
                <li>• Feeling angry, resentful, or guilty</li>
                <li>• Having trouble sleeping or concentrating</li>
                <li>• Losing interest in activities you used to enjoy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">Self-care strategies:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Schedule regular breaks and respite care</li>
                <li>• Join a carer support group</li>
                <li>• Maintain your own healthcare appointments</li>
                <li>• Stay connected with friends and family</li>
                <li>• Accept help when it's offered</li>
                <li>• Practice stress management techniques</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800 text-sm font-medium">
              Remember: You are not alone in this journey. There are people, services, and resources 
              available to support you. Asking for help is a sign of strength, not weakness.
            </p>
          </div>
        </div>

        {/* Practical support */}
        <h2 className="text-2xl font-bold mb-6">Practical support and resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-600">Respite Care</h3>
            <p className="text-sm text-gray-600 mb-3">
              Short-term care that gives you a break while ensuring your loved one is safe and cared for.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Day care centers</li>
              <li>• In-home respite services</li>
              <li>• Short-term residential care</li>
              <li>• Volunteer companion programs</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-green-600">Financial Support</h3>
            <p className="text-sm text-gray-600 mb-3">
              Financial assistance and benefits that can help reduce the financial burden of caring.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Carer's allowance</li>
              <li>• Direct payments</li>
              <li>• Council tax reduction</li>
              <li>• Benefits for the person you care for</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-purple-600">Equipment & Aids</h3>
            <p className="text-sm text-gray-600 mb-3">
              Equipment and home adaptations that can make caring easier and safer for everyone.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Mobility aids and equipment</li>
              <li>• Bathroom safety equipment</li>
              <li>• Home adaptations</li>
              <li>• Assistive technology</li>
            </ul>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB carer support services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Carer Assessments</h3>
            <p className="mb-4 text-sm">
              Free assessments to understand your needs as a carer and identify what 
              support could help you continue caring effectively.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Personal carer assessment</li>
              <li>• Support planning</li>
              <li>• Review of caring arrangements</li>
              <li>• Access to carer services</li>
            </ul>
            <Link
              to="/care-and-support/carers-assessment"
              className="phb-button inline-block text-sm"
            >
              Request assessment
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Support Groups</h3>
            <p className="mb-4 text-sm">
              Connect with other carers who understand your journey. Share experiences, 
              tips, and emotional support in a safe, understanding environment.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Weekly carer support groups</li>
              <li>• Online support communities</li>
              <li>• Condition-specific groups</li>
              <li>• Peer mentoring programs</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Find support groups
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Training & Education</h3>
            <p className="mb-4 text-sm">
              Practical training and education to help you feel more confident 
              and capable in your caring role.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Caring skills workshops</li>
              <li>• First aid training</li>
              <li>• Managing challenging behaviors</li>
              <li>• Understanding conditions and treatments</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Book training
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "Am I entitled to support as a carer?",
              answer: "Yes! As a carer, you have rights to assessment and support. If you provide regular care for someone, you're entitled to a carer's assessment to identify what support could help you. This is free and doesn't depend on your financial situation."
            },
            {
              question: "How do I know if I need a break from caring?",
              answer: "If you're feeling constantly exhausted, overwhelmed, isolated, or resentful, these are signs you need support. Everyone needs breaks - it's not about being weak, it's about being human. Regular respite helps you recharge and continue caring effectively."
            },
            {
              question: "What if I can't afford to pay for care services?",
              answer: "Many support services are free or means-tested. You might be entitled to benefits like Carer's Allowance, or the person you care for might qualify for funding for their care. A carer's assessment can help identify what financial support is available."
            },
            {
              question: "How do I balance caring with work and family life?",
              answer: "This is one of the biggest challenges carers face. Flexible working arrangements, respite care, and sharing caring responsibilities with family members can help. Many employers also offer carer-friendly policies - don't be afraid to discuss your needs."
            },
            {
              question: "What if the person I care for refuses help?",
              answer: "This is common and can be frustrating. Try to understand their concerns - they might feel they're losing independence. Start small, involve them in decisions, and emphasize that accepting help means they can stay more independent for longer."
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

        {/* Emergency support */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">You don't have to do this alone</h2>
            <p className="mb-6">
              Caring for someone you love is both a privilege and a responsibility. It takes courage, 
              compassion, and strength. But you don't have to carry this burden alone. PHB is here 
              to support you, celebrate your dedication, and ensure you get the help you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/care-and-support/carers-assessment"
                className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Get carer assessment
              </Link>
              <a
                href="tel:0800-CARERS-LINE"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                24/7 Carer Support Line
              </a>
              <Link
                to="/care-and-support/financial-help"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#005eb8] transition-colors inline-block font-bold"
              >
                Financial assistance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarersPage;