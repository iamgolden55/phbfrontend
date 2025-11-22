import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Benefit {
  title: string;
  description: string;
  eligibility: string[];
  howToApply: string;
  amount: string;
  category: 'financial' | 'support' | 'training' | 'health';
}

const carersBenefits: Benefit[] = [
  {
    title: 'Carer Allowance',
    description: 'Financial support for those providing substantial care to someone with a disability or health condition.',
    eligibility: [
      'Caring for someone at least 35 hours per week',
      'The person you care for receives qualifying benefits',
      'You are not in full-time education or earning above the threshold',
      'You are aged 16 or over'
    ],
    howToApply: 'Apply online through PHB portal or visit your local PHB center with required documentation.',
    amount: '₦45,000 per month',
    category: 'financial'
  },
  {
    title: 'Respite Care Services',
    description: 'Temporary care relief allowing carers to take breaks while ensuring their loved one receives quality care.',
    eligibility: [
      'Registered as a primary carer with PHB',
      'Caring for someone with assessed care needs',
      'Available for emergency or planned respite',
      'Assessment of carer stress and needs'
    ],
    howToApply: 'Contact PHB carer support team for assessment and scheduling of respite care services.',
    amount: 'Up to 14 days per month covered',
    category: 'support'
  },
  {
    title: 'Carer Training Programs',
    description: 'Free training courses to help carers develop skills and knowledge for providing better care.',
    eligibility: [
      'Registered carers with PHB',
      'Family members providing unpaid care',
      'Professional carers seeking additional training',
      'Available to all skill levels'
    ],
    howToApply: 'Enroll online or contact training coordinators at local PHB centers.',
    amount: 'Free of charge',
    category: 'training'
  },
  {
    title: 'Carer Health Checks',
    description: 'Annual health assessments specifically designed for carers to monitor their physical and mental wellbeing.',
    eligibility: [
      'Registered carers aged 18 and over',
      'Providing care for at least 6 months',
      'Available regardless of other health insurance',
      'Includes mental health screening'
    ],
    howToApply: 'Book through PHB appointments system or carer support helpline.',
    amount: 'Fully covered by PHB',
    category: 'health'
  },
  {
    title: 'Emergency Carer Support',
    description: '24/7 support line and emergency care arrangements when carers face unexpected situations.',
    eligibility: [
      'All registered carers',
      'Emergency situations affecting care provision',
      'Available for medical emergencies of carer or care recipient',
      'Crisis intervention support'
    ],
    howToApply: 'Call emergency carer hotline: 0800-CARER-HELP for immediate assistance.',
    amount: 'Emergency services covered',
    category: 'support'
  },
  {
    title: 'Carer Support Groups',
    description: 'Peer support groups and counseling services for carers dealing with stress and isolation.',
    eligibility: [
      'All carers welcome regardless of situation',
      'Virtual and in-person options available',
      'Specific groups for different care situations',
      'Professional facilitation provided'
    ],
    howToApply: 'Register through PHB mental health services or join drop-in sessions.',
    amount: 'Free participation',
    category: 'support'
  }
];

const CarersBenefitsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Benefits' },
    { id: 'financial', label: 'Financial Support' },
    { id: 'support', label: 'Care Support' },
    { id: 'training', label: 'Training & Education' },
    { id: 'health', label: 'Health & Wellbeing' }
  ];

  const filteredBenefits = selectedCategory === 'all' 
    ? carersBenefits 
    : carersBenefits.filter(benefit => benefit.category === selectedCategory);

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
            <span>Carers benefits</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Benefits and support for carers</h1>
          <p className="text-xl font-medium">
            Financial assistance, respite care, and support services for those caring for others
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Introduction */}
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Supporting our carers</h2>
          <p className="mb-4 text-gray-700">
            Caring for a family member or friend is both rewarding and challenging. PHB recognizes 
            the vital role carers play and provides comprehensive support to help you in your caring journey.
          </p>
          <p className="mb-4 text-gray-700">
            Whether you're caring for someone with a disability, chronic illness, mental health condition, 
            or age-related needs, you may be entitled to various benefits and support services.
          </p>
          <p className="text-gray-700">
            <strong>You matter too.</strong> Taking care of yourself is essential for providing the best care to others.
          </p>
        </div>

        {/* Who is a carer */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Are you a carer?</h2>
          <p className="text-gray-600 mb-4">
            You may be a carer if you provide unpaid help and support to a family member or friend who:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Physical conditions:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Has a physical disability or mobility issues</li>
                <li>• Lives with a chronic illness</li>
                <li>• Is recovering from surgery or injury</li>
                <li>• Has age-related frailty or dementia</li>
                <li>• Requires help with daily activities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Mental health or learning needs:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Has a mental health condition</li>
                <li>• Lives with learning disabilities</li>
                <li>• Has addiction or substance use issues</li>
                <li>• Requires emotional or behavioral support</li>
                <li>• Needs help with decision-making</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Remember:</strong> You don't need to live with the person you care for, and caring can 
              include emotional support, help with appointments, managing finances, or coordinating care.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Available benefits and support</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#0891b2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-6 mb-12">
          {filteredBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0891b2] flex-grow">{benefit.title}</h3>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium ml-4">
                  {benefit.amount}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{benefit.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility criteria:</h4>
                  <ul className="space-y-1">
                    {benefit.eligibility.map((criterion, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="w-2 h-2 bg-[#0891b2] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How to apply:</h4>
                  <p className="text-sm text-gray-600">{benefit.howToApply}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application process */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">How to apply for carer benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#0891b2] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Check Eligibility</h3>
              <p className="text-sm text-gray-600">
                Review the eligibility criteria for each benefit and gather required documentation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#0891b2] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Submit Application</h3>
              <p className="text-sm text-gray-600">
                Apply online through PHB portal, by phone, or visit your local PHB center.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#0891b2] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Assessment & Approval</h3>
              <p className="text-sm text-gray-600">
                PHB will assess your application and notify you of the decision within 14 days.
              </p>
            </div>
          </div>
        </div>

        {/* Required documents */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Required documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">For the carer:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Valid identification (passport, driver's license, or national ID)</li>
                <li>• Proof of address (utility bill, bank statement)</li>
                <li>• Bank account details for benefit payments</li>
                <li>• Employment or education status documentation</li>
                <li>• Income details if applicable</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">For the person receiving care:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Medical reports or disability assessments</li>
                <li>• Current medication list</li>
                <li>• Care needs assessment from healthcare professional</li>
                <li>• Any existing benefit or insurance documentation</li>
                <li>• Consent form for carer to act on their behalf</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "How long does it take to receive carer benefits?",
              answer: "Most applications are processed within 14 days. Emergency situations may be fast-tracked. Payments typically begin within 1-2 weeks of approval, and you may receive back-dated payments from your application date."
            },
            {
              question: "Can I work and still receive carer allowance?",
              answer: "Yes, you can work and receive carer allowance, but there are earning limits. You can earn up to ₦150,000 per month without affecting your allowance. Any earnings above this may reduce your benefit amount."
            },
            {
              question: "What if the person I care for goes into hospital?",
              answer: "You can continue to receive carer allowance for up to 4 weeks if the person you care for is in hospital. After this period, you'll need to contact PHB to discuss your situation and available support."
            },
            {
              question: "Do I need to be related to the person I care for?",
              answer: "No, you don't need to be related. You can receive carer benefits for caring for friends, neighbors, or anyone who needs support, as long as you meet the eligibility criteria and provide substantial care."
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

        {/* Additional support */}
        <h2 className="text-2xl font-bold mb-6">Additional carer support services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Legal Advice</h3>
            <p className="mb-4 text-sm">
              Free legal guidance on power of attorney, care arrangements, and 
              benefits applications.
            </p>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Get legal support
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Equipment & Aids</h3>
            <p className="mb-4 text-sm">
              Access to mobility aids, home adaptations, and assistive technology 
              to support both carer and care recipient.
            </p>
            <Link
              to="/care-and-support/older-people"
              className="phb-button inline-block text-sm"
            >
              Equipment services
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Emergency Planning</h3>
            <p className="mb-4 text-sm">
              Help creating emergency care plans for when the usual carer 
              cannot provide care due to illness or other circumstances.
            </p>
            <Link
              to="/emergency-services"
              className="phb-button inline-block text-sm"
            >
              Emergency planning
            </Link>
          </div>
        </div>

        {/* Contact and support */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need help with your application?</h2>
            <p className="mb-6">
              Our carer support team is here to help you access the benefits and support you deserve. 
              Don't struggle alone - we're here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0800-CARER-HELP"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Call: 0800-CARER-HELP
              </a>
              <Link
                to="/account/appointments/book"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Book support appointment
              </Link>
              <Link
                to="/help"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#0891b2] transition-colors inline-block font-bold"
              >
                Online support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarersBenefitsPage;