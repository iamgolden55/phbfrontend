import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DementiaStage {
  stage: string;
  title: string;
  description: string;
  symptoms: string[];
  careStrategies: string[];
  duration: string;
}

const dementiaStages: DementiaStage[] = [
  {
    stage: 'Early',
    title: 'Early Stage Dementia',
    description: 'Mild cognitive changes that may be subtle but noticeable to family and friends.',
    symptoms: [
      'Occasional memory lapses with recent events',
      'Difficulty finding the right words',
      'Taking longer to complete familiar tasks',
      'Mild confusion about time or place',
      'Changes in mood or personality'
    ],
    careStrategies: [
      'Maintain routines and familiar environments',
      'Use calendars, notes, and reminders',
      'Encourage continued social activities',
      'Focus on abilities rather than limitations',
      'Plan for future care needs'
    ],
    duration: '2-4 years typically'
  },
  {
    stage: 'Middle',
    title: 'Middle Stage Dementia',
    description: 'More pronounced symptoms requiring increased support and supervision.',
    symptoms: [
      'Significant memory loss affecting daily life',
      'Confusion about people, places, and events',
      'Difficulty with complex tasks and decision-making',
      'Changes in sleep patterns',
      'Increased anxiety or agitation'
    ],
    careStrategies: [
      'Simplify daily routines and environments',
      'Use clear, simple communication',
      'Provide gentle reminders and assistance',
      'Create a safe, structured environment',
      'Focus on comfort and emotional connection'
    ],
    duration: '2-10 years typically'
  },
  {
    stage: 'Late',
    title: 'Late Stage Dementia',
    description: 'Extensive care needs with significant cognitive and physical decline.',
    symptoms: [
      'Severe memory loss and confusion',
      'Difficulty communicating verbally',
      'Need for assistance with basic activities',
      'Physical complications may develop',
      'May not recognize family members'
    ],
    careStrategies: [
      'Focus on comfort and dignity',
      'Use non-verbal communication and touch',
      'Maintain personal care and hygiene',
      'Provide familiar music or sensory experiences',
      'Consider professional care support'
    ],
    duration: '1-3 years typically'
  }
];

const DementiaPage: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('early');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentStage = dementiaStages.find(stage => stage.stage.toLowerCase() === selectedStage) || dementiaStages[0];

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
            <span>Dementia support</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Dementia support and care</h1>
          <p className="text-xl font-medium">
            Compassionate guidance for families navigating dementia and cognitive decline
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Understanding dementia */}
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Understanding dementia</h2>
          <p className="mb-4 text-gray-700">
            Dementia is not a single disease, but a term describing symptoms of cognitive decline 
            that interfere with daily life. Alzheimer's disease is the most common type, accounting 
            for 60-80% of cases.
          </p>
          <p className="mb-4 text-gray-700">
            While there's currently no cure, early diagnosis and appropriate care can significantly 
            improve quality of life for both patients and families. Each person's journey with 
            dementia is unique.
          </p>
          <p className="text-gray-700">
            <strong>Remember:</strong> The person you love is still there. Dementia changes abilities, 
            but the essence of who they are remains.
          </p>
        </div>

        {/* Early signs */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Early warning signs</h2>
          <p className="text-gray-600 mb-4">
            While everyone experiences occasional memory lapses, these signs may indicate something more serious:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Memory and thinking changes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Memory loss that disrupts daily life</li>
                <li>• Difficulty planning or solving problems</li>
                <li>• Confusion with time or place</li>
                <li>• Trouble understanding visual/spatial relationships</li>
                <li>• Problems with words in speaking or writing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Behavioral and mood changes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Changes in mood or personality</li>
                <li>• Withdrawal from work or social activities</li>
                <li>• Decreased or poor judgment</li>
                <li>• Misplacing things and losing ability to retrace steps</li>
                <li>• Difficulty completing familiar tasks</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Important:</strong> If you notice several of these signs, consult a healthcare 
              professional. Early diagnosis can help with planning and accessing support services.
            </p>
          </div>
        </div>

        {/* Stages of dementia */}
        <h2 className="text-2xl font-bold mb-6">Understanding the stages of dementia</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {dementiaStages.map((stage) => (
              <button
                key={stage.stage.toLowerCase()}
                onClick={() => setSelectedStage(stage.stage.toLowerCase())}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedStage === stage.stage.toLowerCase()
                    ? 'bg-[#0891b2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage.stage} Stage
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#0891b2] mb-2">{currentStage.title}</h3>
            <p className="text-gray-600 mb-4">{currentStage.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <strong>Typical duration:</strong> {currentStage.duration}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Common symptoms:</h4>
              <ul className="space-y-1">
                {currentStage.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Care strategies:</h4>
              <ul className="space-y-1">
                {currentStage.careStrategies.map((strategy, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {strategy}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Daily care tips */}
        <h2 className="text-2xl font-bold mb-6">Daily care and communication tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Communication</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Speak slowly and clearly</li>
              <li>• Use simple words and short sentences</li>
              <li>• Make eye contact and use gentle touch</li>
              <li>• Be patient and allow time to respond</li>
              <li>• Avoid arguing or correcting</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Daily Activities</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Maintain familiar routines</li>
              <li>• Break tasks into simple steps</li>
              <li>• Provide gentle guidance and assistance</li>
              <li>• Encourage independence when possible</li>
              <li>• Use visual cues and reminders</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Creating a Safe Environment</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Remove tripping hazards</li>
              <li>• Install good lighting</li>
              <li>• Use locks on cabinets with dangerous items</li>
              <li>• Consider wandering prevention measures</li>
              <li>• Keep environment calm and familiar</li>
            </ul>
          </div>
        </div>

        {/* Support for caregivers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Support for caregivers</h2>
          <p className="text-gray-600 mb-4">
            Caring for someone with dementia can be emotionally and physically demanding. 
            Taking care of yourself is essential for providing the best care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Self-care strategies:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Take regular breaks and ask for help</li>
                <li>• Join a caregiver support group</li>
                <li>• Maintain your own health appointments</li>
                <li>• Stay connected with friends and family</li>
                <li>• Consider respite care services</li>
                <li>• Practice stress management techniques</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Warning signs of caregiver burnout:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Feeling overwhelmed or constantly worried</li>
                <li>• Difficulty sleeping or changes in appetite</li>
                <li>• Losing interest in activities you used to enjoy</li>
                <li>• Feeling angry, sad, or hopeless</li>
                <li>• Getting sick more often</li>
                <li>• Thinking about harming yourself or the person you care for</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB dementia support services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Diagnosis & Assessment</h3>
            <p className="mb-4 text-sm">
              Comprehensive cognitive assessments and early diagnosis services to help 
              families understand and plan for the journey ahead.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Memory and cognitive testing</li>
              <li>• Brain imaging and blood tests</li>
              <li>• Specialist referrals when needed</li>
              <li>• Care planning and coordination</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Book assessment
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Family Support</h3>
            <p className="mb-4 text-sm">
              Education, counseling, and support groups for families affected by dementia, 
              helping navigate the emotional and practical challenges.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Family education workshops</li>
              <li>• Caregiver support groups</li>
              <li>• Individual and family counseling</li>
              <li>• Respite care coordination</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Get family support
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Ongoing Care</h3>
            <p className="mb-4 text-sm">
              Continuous medical care and monitoring throughout the dementia journey, 
              adapting support as needs change over time.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Regular health monitoring</li>
              <li>• Medication management</li>
              <li>• Behavioral intervention support</li>
              <li>• End-of-life care planning</li>
            </ul>
            <Link
              to="/care-and-support/older-people"
              className="phb-button inline-block text-sm"
            >
              Elderly care resources
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "What's the difference between dementia and normal aging?",
              answer: "Normal aging might include occasionally forgetting names or appointments but remembering them later. Dementia involves memory loss and confusion that disrupts daily life, affects judgment, and progressively worsens over time."
            },
            {
              question: "How long do people live with dementia?",
              answer: "This varies greatly depending on the type of dementia, overall health, and age at diagnosis. On average, people live 4-8 years after diagnosis, but some live much longer. Quality of life can be maintained with proper care and support."
            },
            {
              question: "Can dementia be prevented?",
              answer: "While there's no guaranteed prevention, research suggests that regular exercise, social engagement, mental stimulation, healthy diet, and managing cardiovascular risk factors may help reduce risk or delay onset."
            },
            {
              question: "When should we consider professional care?",
              answer: "Consider professional care when safety becomes a concern, caregiving becomes overwhelming, behavioral symptoms are difficult to manage, or when the person needs assistance with most daily activities."
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

        {/* Emergency and support */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">You don't have to face this alone</h2>
            <p className="mb-6">
              Dementia affects the whole family, but with the right support, care, and resources, 
              you can navigate this journey with dignity and hope. PHB is here to help every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Schedule consultation
              </Link>
              <a
                href="tel:0800-DEMENTIA-HELP"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                24/7 Dementia Helpline
              </a>
              <Link
                to="/care-and-support/older-people"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#0891b2] transition-colors inline-block font-bold"
              >
                General elderly care
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DementiaPage;