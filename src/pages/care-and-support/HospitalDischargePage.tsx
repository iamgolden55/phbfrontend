import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DischargeChecklist {
  category: string;
  items: string[];
}

const dischargeChecklists: DischargeChecklist[] = [
  {
    category: 'Before leaving hospital',
    items: [
      'Understand your discharge summary and treatment plan',
      'Collect all prescribed medications and instructions',
      'Know when and where your follow-up appointments are',
      'Have emergency contact numbers saved',
      'Understand warning signs to watch for',
      'Arrange transportation home',
      'Ensure someone can help you at home initially'
    ]
  },
  {
    category: 'First week at home',
    items: [
      'Take medications exactly as prescribed',
      'Follow activity and diet restrictions',
      'Keep follow-up appointments',
      'Monitor for warning signs',
      'Rest and allow your body to heal',
      'Ask for help with daily tasks when needed',
      'Contact healthcare team with any concerns'
    ]
  },
  {
    category: 'Ongoing recovery',
    items: [
      'Gradually increase activity as advised',
      'Continue prescribed medications',
      'Attend all follow-up appointments',
      'Follow lifestyle recommendations',
      'Join support groups if recommended',
      'Communicate openly with your care team',
      'Celebrate small improvements in your recovery'
    ]
  }
];

const HospitalDischargePage: React.FC = () => {
  const [selectedChecklist, setSelectedChecklist] = useState<string>('before');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentChecklist = dischargeChecklists.find(list => 
    list.category.toLowerCase().includes(selectedChecklist.split('-')[0])
  ) || dischargeChecklists[0];

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
            <span>Hospital discharge</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Hospital discharge guidance</h1>
          <p className="text-xl font-medium">
            Supporting your safe transition from hospital to home with confidence and peace of mind
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Understanding hospital discharge */}
        <div className="bg-gray-50 border-l-4 border-green-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-800">You're ready to go home - that's wonderful news!</h2>
          <p className="mb-4 text-gray-700">
            Being discharged from hospital is a positive step in your recovery journey. While it's natural 
            to feel a mix of excitement and anxiety about going home, proper preparation can help ensure 
            a smooth and safe transition.
          </p>
          <p className="mb-4 text-gray-700">
            Your healthcare team has determined that you're well enough to continue your recovery at home, 
            where you'll be surrounded by familiar faces and comfort. With the right support and information, 
            you can feel confident about this next step.
          </p>
          <p className="text-gray-700">
            <strong>Remember:</strong> Going home is part of getting better. You're not alone in this journey, 
            and help is always available when you need it.
          </p>
        </div>

        {/* Discharge process */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What happens during discharge</h2>
          <p className="text-gray-600 mb-4">
            The discharge process is designed to ensure you're fully prepared for a safe transition home:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Your medical team will:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Review your progress and recovery</li>
                <li>• Explain your discharge summary in detail</li>
                <li>• Provide clear medication instructions</li>
                <li>• Schedule necessary follow-up appointments</li>
                <li>• Discuss activity and dietary guidelines</li>
                <li>• Ensure you understand warning signs to watch for</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">You and your family can:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ask questions about your care plan</li>
                <li>• Request written instructions for clarity</li>
                <li>• Discuss any concerns about going home</li>
                <li>• Arrange help and support at home</li>
                <li>• Get contact information for emergencies</li>
                <li>• Plan your transportation home</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-800 text-sm">
              <strong>Take your time:</strong> Don't hesitate to ask questions or request explanations. 
              It's important that you feel confident and prepared before leaving.
            </p>
          </div>
        </div>

        {/* Discharge checklists */}
        <h2 className="text-2xl font-bold mb-6">Your step-by-step discharge checklist</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'before', label: 'Before leaving' },
              { key: 'first-week', label: 'First week home' },
              { key: 'ongoing', label: 'Ongoing recovery' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedChecklist(option.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedChecklist === option.key
                    ? 'bg-[#005eb8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-[#005eb8] mb-4">{currentChecklist.category}</h3>
          <div className="space-y-3">
            {currentChecklist.items.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className="w-5 h-5 border-2 border-green-400 rounded mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Medication safety */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Medication safety at home</h2>
          <p className="text-gray-600 mb-4">
            Managing your medications safely is crucial for your recovery. Here's how to stay on track:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Before leaving hospital:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Get a complete list of all medications</li>
                <li>• Understand what each medication is for</li>
                <li>• Know the correct dosages and timing</li>
                <li>• Ask about potential side effects</li>
                <li>• Get contact info for medication questions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">At home medication tips:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use a pill organizer or medication schedule</li>
                <li>• Take medications at the same times daily</li>
                <li>• Keep medications in their original containers</li>
                <li>• Store medications safely and properly</li>
                <li>• Never skip doses without consulting your doctor</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Important:</strong> If you're confused about any medication, don't guess. 
              Contact your pharmacist or healthcare provider immediately.
            </p>
          </div>
        </div>

        {/* Warning signs */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">When to seek immediate help</h2>
          <p className="text-gray-600 mb-4">
            While most recoveries go smoothly, it's important to know when to contact your healthcare team:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-red-600">Call 999 immediately if you have:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Severe chest pain or difficulty breathing</li>
                <li>• Signs of stroke (sudden weakness, speech problems)</li>
                <li>• Severe allergic reaction to medication</li>
                <li>• Uncontrolled bleeding from surgical site</li>
                <li>• Loss of consciousness or severe confusion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-orange-600">Contact your healthcare team if you have:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fever over 38°C (100.4°F)</li>
                <li>• Worsening pain not relieved by medication</li>
                <li>• Signs of infection (redness, swelling, unusual discharge)</li>
                <li>• Persistent nausea or vomiting</li>
                <li>• Any concerns about your recovery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB discharge support services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Discharge Planning</h3>
            <p className="mb-4 text-sm">
              Our discharge coordinators work with you and your family to ensure you're 
              fully prepared for a safe transition home.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Personalized discharge planning</li>
              <li>• Medication counseling</li>
              <li>• Home care arrangements</li>
              <li>• Equipment and mobility aids</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Get discharge support
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Home Care Services</h3>
            <p className="mb-4 text-sm">
              Professional home care services to support your recovery in the 
              comfort and familiarity of your own home.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Skilled nursing visits</li>
              <li>• Physical therapy at home</li>
              <li>• Personal care assistance</li>
              <li>• 24/7 emergency support line</li>
            </ul>
            <Link
              to="/care-and-support/carers"
              className="phb-button inline-block text-sm"
            >
              Home care options
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Follow-up Care</h3>
            <p className="mb-4 text-sm">
              Comprehensive follow-up care to monitor your recovery and ensure 
              the best possible outcomes for your health.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Scheduled check-up appointments</li>
              <li>• Medication reviews</li>
              <li>• Specialist referrals when needed</li>
              <li>• Recovery progress monitoring</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Schedule follow-up
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "What if I don't feel ready to go home?",
              answer: "It's completely normal to feel anxious about leaving hospital. Speak with your discharge team about your concerns. They can provide additional support, arrange home care services, or in some cases, extend your stay if medically necessary."
            },
            {
              question: "How do I manage pain at home?",
              answer: "Follow your prescribed pain medication schedule exactly as directed. Use ice or heat as recommended, rest when needed, and gradually increase activity as advised. Contact your healthcare team if pain worsens or isn't controlled by your medications."
            },
            {
              question: "When can I return to normal activities?",
              answer: "This depends on your specific condition and treatment. Your healthcare team will provide clear guidelines about when you can drive, return to work, exercise, or resume other activities. Always follow their specific recommendations for your situation."
            },
            {
              question: "What if I need to return to hospital?",
              answer: "Don't hesitate to return if you're genuinely concerned about your health. It's better to be cautious. For emergencies, call 999. For urgent but non-emergency concerns, contact your GP or call NHS 111 for guidance."
            },
            {
              question: "How can my family help during recovery?",
              answer: "Family support is invaluable. They can help with medication reminders, transportation to appointments, household tasks, emotional support, and being advocates for your care. Include them in discharge planning when possible."
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

        {/* Support and emergency */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Your recovery journey continues at home</h2>
            <p className="mb-6">
              Leaving hospital is a positive milestone in your healing process. With proper preparation, 
              support, and care, you can recover safely and comfortably at home. PHB is here to support 
              you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Schedule follow-up
              </Link>
              <a
                href="tel:111"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                24/7 Health Helpline: 111
              </a>
              <Link
                to="/care-and-support"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#005eb8] transition-colors inline-block font-bold"
              >
                More care support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDischargePage;