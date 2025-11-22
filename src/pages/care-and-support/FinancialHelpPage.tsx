import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FinancialSupport {
  type: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  howToApply: string[];
  amount: string;
}

const financialSupports: FinancialSupport[] = [
  {
    type: 'care-benefits',
    title: 'Care and disability benefits',
    description: 'Financial support for people with care needs, disabilities, or long-term health conditions.',
    eligibility: [
      'Have a physical or mental health condition affecting daily life',
      'Need help with personal care or mobility',
      'Are over 16 years old (different support for under 16s)',
      'Live in the UK and meet residency requirements',
      'May be working or not working'
    ],
    benefits: [
      'Personal Independence Payment (PIP) - up to £184.30/week',
      'Disability Living Allowance (DLA) - various rates',
      'Attendance Allowance - up to £108.55/week (over 65s)',
      'Employment and Support Allowance (ESA)',
      'Universal Credit disability elements'
    ],
    howToApply: [
      'Contact DWP or use online application',
      'Complete detailed application form',
      'Provide medical evidence and supporting documents',
      'Attend assessment appointment if required',
      'Await decision and start of payments'
    ],
    amount: 'Varies from £28.70 to £184.30 per week depending on needs'
  },
  {
    type: 'carer-benefits',
    title: 'Carer benefits and support',
    description: 'Financial support for people who provide unpaid care for family members, friends, or neighbors.',
    eligibility: [
      'Care for someone at least 35 hours per week',
      'The person you care for receives certain benefits',
      'Are 16 years old or over',
      'Not earning more than £139 per week after expenses',
      'Not in full-time education'
    ],
    benefits: [
      "Carer's Allowance - £81.90 per week",
      "Carer's Credit - protects your State Pension",
      'Council Tax reduction',
      'Carer premium in other benefits',
      'Support for Mortgage Interest'
    ],
    howToApply: [
      'Apply online or by phone to DWP',
      'Provide details about your caring role',
      'Provide information about the person you care for',
      'Submit proof of identity and bank details',
      'Attend interview if required'
    ],
    amount: '£81.90 per week, plus potential additional support'
  },
  {
    type: 'care-funding',
    title: 'Care services funding',
    description: 'Financial help to pay for care and support services, equipment, and home adaptations.',
    eligibility: [
      'Have assessed care and support needs',
      'Have assets and savings below certain thresholds',
      'Need help with daily living activities',
      'Live in the local authority area',
      'May include self-funders needing advice'
    ],
    benefits: [
      'Direct payments to arrange your own care',
      'Council-arranged care services',
      'Equipment and home adaptations',
      'Respite care and day services',
      'Supported living and residential care'
    ],
    howToApply: [
      'Request a care needs assessment',
      'Complete financial assessment',
      'Develop care and support plan',
      'Choose how to receive support',
      'Regular reviews of care and funding'
    ],
    amount: 'Contribution based on income and savings - many pay nothing'
  }
];

const FinancialHelpPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('care-benefits');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentType = financialSupports.find(support => support.type === selectedType) || financialSupports[0];

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
            <span>Financial help</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Financial help and benefits</h1>
          <p className="text-xl font-medium">
            Understanding your entitlements and getting the financial support you deserve for care and disability needs
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Financial support overview */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Financial support is your right, not charity</h2>
          <p className="mb-4 text-gray-700">
            If you have care needs, are disabled, or care for someone else, there may be financial support 
            available to help you. These benefits and services exist because society recognizes that 
            everyone deserves support when they need it - it's not charity, it's your entitlement.
          </p>
          <p className="mb-4 text-gray-700">
            The benefits system can seem complex and overwhelming, but you don't have to navigate it alone. 
            There are people and services available to help you understand what you might be entitled to 
            and support you through the application process.
          </p>
          <p className="text-gray-700 font-medium">
            <strong>Remember:</strong> You deserve financial security and support. Don't let pride, 
            confusion, or fear of the system stop you from getting help that could make a real difference to your life.
          </p>
        </div>

        {/* Why financial support matters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Why financial support matters</h2>
          <p className="text-gray-600 mb-4">
            Financial support for care and disability isn't just about money - it's about independence, 
            choice, and dignity:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Independence:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ability to make choices about your care</li>
                <li>• Freedom to live where and how you want</li>
                <li>• Control over your daily routine and activities</li>
                <li>• Reduced dependence on family and friends</li>
                <li>• Participation in community and social activities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Quality of life:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Access to appropriate care and support</li>
                <li>• Ability to maintain relationships</li>
                <li>• Opportunities for education and employment</li>
                <li>• Participation in hobbies and interests</li>
                <li>• Reduced stress and anxiety about finances</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">Dignity:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Recognition of your worth and contribution</li>
                <li>• Respect for your choices and preferences</li>
                <li>• Protection from poverty and hardship</li>
                <li>• Ability to give as well as receive support</li>
                <li>• Maintenance of your identity and role in society</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Types of financial support */}
        <h2 className="text-2xl font-bold mb-6">Types of financial support available</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {financialSupports.map((support) => (
              <button
                key={support.type}
                onClick={() => setSelectedType(support.type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === support.type
                    ? 'bg-[#0891b2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {support.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#0891b2] mb-2">{currentType.title}</h3>
            <p className="text-gray-600 mb-4">{currentType.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <strong>Typical amount:</strong> {currentType.amount}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Who can apply:</h4>
              <ul className="space-y-1">
                {currentType.eligibility.map((criteria, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Available support:</h4>
              <ul className="space-y-1">
                {currentType.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Application process:</h4>
              <ul className="space-y-1">
                {currentType.howToApply.map((step, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Getting help with applications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Getting help with your applications</h2>
          <p className="text-gray-600 mb-4">
            Applying for benefits can feel overwhelming, but you don't have to do it alone. There's lots of help available:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Free help available:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Citizens Advice Bureau - free, independent advice</li>
                <li>• Disability benefits advisors</li>
                <li>• Local council welfare rights teams</li>
                <li>• Charity-based benefits advice services</li>
                <li>• Age UK, Carers UK, and other specialist charities</li>
                <li>• Online benefits calculators and guides</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What help includes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Benefits checks to see what you might be entitled to</li>
                <li>• Help completing application forms</li>
                <li>• Support gathering evidence and medical information</li>
                <li>• Representation at assessments and appeals</li>
                <li>• Advice on managing money and budgeting</li>
                <li>• Information about other sources of help</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Don't struggle alone:</strong> Professional advisors know the system inside out and can 
              significantly improve your chances of a successful application. Their help is free and confidential.
            </p>
          </div>
        </div>

        {/* Common concerns */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">Addressing common concerns and fears</h2>
          <p className="text-yellow-700 mb-4">
            Many people have worries about applying for financial support. Here are some common concerns and the reality:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">Common worries:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• "I don't want to be a burden or take from others"</li>
                <li>• "The process seems too complicated and stressful"</li>
                <li>• "I might not qualify or be entitled to anything"</li>
                <li>• "I'm worried about intrusive questions and assessments"</li>
                <li>• "What if my condition gets better - will I have to pay back?"</li>
                <li>• "I'm embarrassed about needing help with money"</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">The reality:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• You've contributed to this system - it's there for when you need it</li>
                <li>• Free help is available to guide you through every step</li>
                <li>• You might be surprised by what you're entitled to</li>
                <li>• Assessments are designed to understand your needs</li>
                <li>• Most benefits adjust to changes in your circumstances</li>
                <li>• Needing support is normal - millions of people receive benefits</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800 text-sm font-medium">
              Remember: These benefits exist because society recognizes that life can be unpredictable. 
              Using them when you need them is exactly what they're designed for.
            </p>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB financial support services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Benefits Advice</h3>
            <p className="mb-4 text-sm">
              Free, confidential advice about benefits and financial support. We'll help you 
              understand what you might be entitled to and support you through applications.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Benefits eligibility checks</li>
              <li>• Application support and form filling</li>
              <li>• Appeals and tribunal representation</li>
              <li>• Ongoing benefit reviews</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Get benefits advice
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Financial Assessments</h3>
            <p className="mb-4 text-sm">
              Fair and transparent assessments for care service funding. We'll work with you 
              to understand your financial situation and ensure you pay a fair contribution.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Care funding assessments</li>
              <li>• Direct payment arrangements</li>
              <li>• Deferred payment schemes</li>
              <li>• Financial advocacy support</li>
            </ul>
            <Link
              to="/care-and-support/assessment"
              className="phb-button inline-block text-sm"
            >
              Financial assessment info
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Emergency Support</h3>
            <p className="mb-4 text-sm">
              Immediate help in crisis situations, including emergency payments, food vouchers, 
              and connections to local hardship funds and charitable support.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Crisis loans and grants</li>
              <li>• Food bank referrals</li>
              <li>• Utility bill support</li>
              <li>• Emergency accommodation help</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Emergency support
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "How do I know if I'm entitled to benefits?",
              answer: "The best way to find out is to have a benefits check with an advisor. They'll look at your circumstances and health conditions to see what you might be entitled to. Many people are surprised to discover they qualify for support they didn't know existed."
            },
            {
              question: "Will applying for benefits affect other support I receive?",
              answer: "Sometimes benefits can affect each other, but often in positive ways - receiving one benefit can increase your entitlement to others. An advisor can help you understand how different benefits work together and ensure you get your maximum entitlement."
            },
            {
              question: "What if my application is refused?",
              answer: "Many initial applications are refused, but this doesn't mean you're not entitled. You have the right to ask for the decision to be reconsidered and to appeal if necessary. Advisors can help you through this process, and many appeals are successful."
            },
            {
              question: "How long does it take to get benefits?",
              answer: "It varies by benefit type, but most decisions are made within a few weeks to a few months. Some benefits can provide emergency payments while you wait. If you're in immediate need, let your advisor know as there may be quicker forms of support available."
            },
            {
              question: "Will I have to pay benefits back if my situation improves?",
              answer: "Generally, no. Most benefits are designed to change with your circumstances - if you get better, payments may reduce or stop, but you usually don't have to repay what you've already received. The important thing is to report changes when they happen."
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
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">You deserve financial security and support</h2>
            <p className="mb-6 text-gray-700">
              Financial support isn't about charity - it's about recognizing that everyone deserves dignity, 
              independence, and the ability to participate fully in society. Don't let pride, fear, or confusion 
              stop you from getting support that could transform your life. PHB is here to help you understand 
              your rights and access what you're entitled to.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/help"
                className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-bold"
              >
                Get benefits advice
              </Link>
              <a
                href="tel:0800-BENEFITS-HELP"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Benefits Helpline
              </a>
              <Link
                to="/care-and-support/assessment"
                className="bg-transparent border-2 border-[#0891b2] text-[#0891b2] px-6 py-3 rounded-md hover:bg-[#0891b2] hover:text-white transition-colors inline-block font-bold"
              >
                Care funding assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHelpPage;