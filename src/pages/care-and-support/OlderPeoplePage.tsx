import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CareArea {
  title: string;
  description: string;
  keyPoints: string[];
  tips: string[];
  category: 'health' | 'safety' | 'social' | 'practical';
}

const careAreas: CareArea[] = [
  {
    title: 'Health & Medical Care',
    description: 'Supporting physical health and managing medical needs as we age.',
    keyPoints: [
      'Regular health check-ups and screenings',
      'Medication management and adherence',
      'Chronic condition monitoring',
      'Vision and hearing health maintenance'
    ],
    tips: [
      'Keep a medication schedule and pill organizer',
      'Maintain a list of all medications and dosages',
      'Schedule regular eye and hearing tests',
      'Stay up-to-date with vaccinations'
    ],
    category: 'health'
  },
  {
    title: 'Home Safety & Mobility',
    description: 'Creating a safe living environment and maintaining independence.',
    keyPoints: [
      'Fall prevention and home modifications',
      'Mobility aids and accessibility features',
      'Emergency preparedness and alert systems',
      'Safe driving assessment and alternatives'
    ],
    tips: [
      'Install grab bars in bathrooms and stairways',
      'Ensure good lighting throughout the home',
      'Remove tripping hazards like loose rugs',
      'Consider a medical alert system'
    ],
    category: 'safety'
  },
  {
    title: 'Mental Health & Wellbeing',
    description: 'Supporting emotional health and cognitive function in later life.',
    keyPoints: [
      'Social connection and community engagement',
      'Mental stimulation and cognitive activities',
      'Depression and anxiety awareness',
      'Grief and loss support'
    ],
    tips: [
      'Encourage regular social activities and visits',
      'Provide puzzles, books, and brain games',
      'Watch for signs of depression or isolation',
      'Connect with support groups and counseling'
    ],
    category: 'social'
  }
];

const OlderPeoplePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Areas' },
    { id: 'health', label: 'Health & Medical' },
    { id: 'safety', label: 'Safety & Mobility' },
    { id: 'social', label: 'Mental & Social' },
    { id: 'practical', label: 'Practical Support' }
  ];

  const filteredAreas = selectedCategory === 'all' 
    ? careAreas 
    : careAreas.filter(area => area.category === selectedCategory);

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
            <span>Older people</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Care and support for older people</h1>
          <p className="text-xl font-medium">
            Compassionate guidance for caring for elderly family members and maintaining independence
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Introduction */}
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Supporting our elders with dignity</h2>
          <p className="mb-4 text-gray-700">
            Caring for older adults requires understanding their unique needs while respecting their 
            independence and dignity. Every person ages differently, and care should be personalized 
            to individual circumstances and preferences.
          </p>
          <p className="text-gray-700">
            Whether you're caring for a family member or planning for your own future, this guide 
            provides evidence-based information to help maintain health, safety, and quality of life.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Areas of care and support</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#005eb8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Care areas */}
        <div className="space-y-6 mb-12">
          {filteredAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-[#005eb8] mb-3">{area.title}</h3>
              <p className="text-gray-600 mb-4">{area.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key considerations:</h4>
                  <ul className="space-y-1">
                    {area.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="w-2 h-2 bg-[#005eb8] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Practical tips:</h4>
                  <ul className="space-y-1">
                    {area.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warning signs */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">When to seek additional support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Physical warning signs:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Frequent falls or near-falls</li>
                <li>• Unexplained weight loss or poor appetite</li>
                <li>• Difficulty managing medications</li>
                <li>• Poor personal hygiene or grooming</li>
                <li>• Confusion or memory problems</li>
                <li>• Mobility difficulties or pain</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Emotional warning signs:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Social withdrawal or isolation</li>
                <li>• Changes in mood or personality</li>
                <li>• Loss of interest in activities</li>
                <li>• Anxiety about daily tasks</li>
                <li>• Signs of depression or hopelessness</li>
                <li>• Increased irritability or agitation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resources and support */}
        <h2 className="text-2xl font-bold mb-6">PHB support services for older adults</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Medical Care</h3>
            <p className="mb-4 text-sm">
              Specialized healthcare services for older adults, including geriatric assessments 
              and chronic disease management.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Comprehensive geriatric assessments</li>
              <li>• Medication reviews and management</li>
              <li>• Chronic condition monitoring</li>
              <li>• Preventive care and screenings</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Book appointment
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Mental Health Support</h3>
            <p className="mb-4 text-sm">
              Counseling and support services for older adults facing mental health challenges 
              or life transitions.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Depression and anxiety counseling</li>
              <li>• Grief and loss support</li>
              <li>• Cognitive behavioral therapy</li>
              <li>• Support groups and peer connections</li>
            </ul>
            <Link
              to="/mental-health"
              className="phb-button inline-block text-sm"
            >
              Mental health resources
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Family Support</h3>
            <p className="mb-4 text-sm">
              Resources and guidance for families caring for older relatives, including 
              caregiver support and respite services.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Caregiver education and training</li>
              <li>• Family counseling and mediation</li>
              <li>• Respite care arrangements</li>
              <li>• Care planning and coordination</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Get support
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "How do I know if my elderly parent needs more help?",
              answer: "Look for changes in their ability to manage daily activities, personal care, medications, or finances. Signs of confusion, frequent falls, poor nutrition, or social withdrawal may indicate need for additional support."
            },
            {
              question: "What home modifications can help prevent falls?",
              answer: "Install grab bars in bathrooms, improve lighting, remove tripping hazards like loose rugs, add stair railings, and consider a shower chair. A home safety assessment can identify specific needs."
            },
            {
              question: "How can I help an older adult stay socially connected?",
              answer: "Encourage participation in community activities, religious services, or senior centers. Help them maintain friendships through phone calls or visits, and consider technology training for video calls with family."
            },
            {
              question: "When should I consider professional care services?",
              answer: "Consider professional help when safety becomes a concern, medical needs become complex, or when family caregivers feel overwhelmed. Start with an assessment to determine the level of care needed."
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

        {/* Support and resources */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need guidance or support?</h2>
            <p className="mb-6">
              Caring for older adults can be challenging. PHB healthcare professionals can help 
              you navigate care options and provide support for both patients and families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Schedule consultation
              </Link>
              <Link
                to="/care-and-support/dementia"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Dementia support
              </Link>
              <a
                href="tel:0800-ELDER-CARE"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#005eb8] transition-colors inline-block font-bold"
              >
                24/7 Elder Care Line
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlderPeoplePage;