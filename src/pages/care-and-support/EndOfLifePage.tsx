import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface EndOfLifeStage {
  stage: string;
  title: string;
  description: string;
  focus: string[];
  support: string[];
  timeframe: string;
}

const endOfLifeStages: EndOfLifeStage[] = [
  {
    stage: 'planning',
    title: 'Advance care planning',
    description: 'Having conversations and making decisions about future care preferences while you\'re able to do so.',
    focus: [
      'Discussing wishes with family and healthcare team',
      'Creating advance directives and living wills',
      'Appointing healthcare proxies',
      'Considering hospice and palliative care options',
      'Making financial and legal arrangements'
    ],
    support: [
      'Advance care planning consultations',
      'Legal assistance with documentation',
      'Family meeting facilitation',
      'Spiritual and emotional counseling',
      'Resource coordination'
    ],
    timeframe: 'Ideally while healthy, updated regularly'
  },
  {
    stage: 'comfort',
    title: 'Comfort and palliative care',
    description: 'Focusing on comfort, dignity, and quality of life while managing symptoms and providing emotional support.',
    focus: [
      'Managing pain and other symptoms effectively',
      'Maintaining dignity and personal preferences',
      'Supporting emotional and spiritual needs',
      'Facilitating meaningful connections with loved ones',
      'Providing respite and support for families'
    ],
    support: [
      'Specialized palliative care teams',
      'Pain and symptom management',
      'Emotional and spiritual counseling',
      'Respite care for families',
      'Home care and nursing support'
    ],
    timeframe: 'Weeks to months, sometimes longer'
  },
  {
    stage: 'final',
    title: 'Final days and moments',
    description: 'Providing comfort, love, and dignity during the final stage of life, supporting both the individual and family.',
    focus: [
      'Ensuring physical comfort and pain relief',
      'Honoring personal and cultural wishes',
      'Facilitating goodbyes and closure',
      'Supporting family presence and participation',
      'Providing spiritual and emotional comfort'
    ],
    support: [
      '24/7 nursing and medical support',
      'Bereavement counseling preparation',
      'Cultural and spiritual care',
      'Family guidance and support',
      'Aftercare planning assistance'
    ],
    timeframe: 'Days to weeks'
  }
];

const EndOfLifePage: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('planning');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentStage = endOfLifeStages.find(stage => stage.stage === selectedStage) || endOfLifeStages[0];

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
            <span>End-of-life care</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">End-of-life care and support</h1>
          <p className="text-xl font-medium">
            Compassionate guidance for life's final journey, honoring dignity, comfort, and meaningful connections
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Understanding end-of-life care */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Every life has meaning, every moment matters</h2>
          <p className="mb-4 text-gray-700">
            End-of-life care is about living as fully and comfortably as possible during life's final chapter. 
            It's not about giving up hope - it's about finding peace, comfort, and meaning in whatever time remains.
          </p>
          <p className="mb-4 text-gray-700">
            Whether you're facing your own end-of-life journey or supporting a loved one, you don't have to 
            navigate this path alone. With the right care, support, and preparation, this time can be filled 
            with love, dignity, and precious moments of connection.
          </p>
          <p className="text-gray-700 font-medium">
            <strong>Remember:</strong> There is no "right" way to approach end-of-life. Your feelings, fears, 
            hopes, and wishes are all valid. We're here to honor your choices and support your journey.
          </p>
        </div>

        {/* What end-of-life care includes */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What end-of-life care encompasses</h2>
          <p className="text-gray-600 mb-4">
            End-of-life care is holistic, addressing all aspects of wellbeing during this important time:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">Physical comfort:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Expert pain and symptom management</li>
                <li>• Comfort medications and treatments</li>
                <li>• Personal care and hygiene assistance</li>
                <li>• Nutritional support and hydration</li>
                <li>• Environmental comfort measures</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Emotional support:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Counseling and emotional guidance</li>
                <li>• Mental health support</li>
                <li>• Family therapy and mediation</li>
                <li>• Grief counseling and preparation</li>
                <li>• Legacy planning and memory creation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Spiritual care:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Chaplaincy and spiritual counseling</li>
                <li>• Connection with faith communities</li>
                <li>• Meditation and mindfulness support</li>
                <li>• Meaning-making and reflection</li>
                <li>• Cultural and religious observances</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stages of end-of-life journey */}
        <h2 className="text-2xl font-bold mb-6">Stages of the end-of-life journey</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {endOfLifeStages.map((stage) => (
              <button
                key={stage.stage}
                onClick={() => setSelectedStage(stage.stage)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedStage === stage.stage
                    ? 'bg-[#005eb8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#005eb8] mb-2">{currentStage.title}</h3>
            <p className="text-gray-600 mb-4">{currentStage.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <strong>Typical timeframe:</strong> {currentStage.timeframe}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key focus areas:</h4>
              <ul className="space-y-1">
                {currentStage.focus.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Available support:</h4>
              <ul className="space-y-1">
                {currentStage.support.map((support, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {support}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Difficult conversations */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Having difficult conversations</h2>
          <p className="text-gray-600 mb-4">
            Talking about end-of-life wishes can feel overwhelming, but these conversations are gifts of love and preparation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Starting the conversation:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Choose a quiet, comfortable time and place</li>
                <li>• Start with your own feelings and concerns</li>
                <li>• Ask open-ended questions about their wishes</li>
                <li>• Listen without judgment or trying to "fix"</li>
                <li>• Take breaks if emotions become overwhelming</li>
                <li>• Return to the conversation multiple times</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Important topics to discuss:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Preferred location for end-of-life care</li>
                <li>• Pain management and comfort preferences</li>
                <li>• Spiritual or religious wishes</li>
                <li>• Who should be present during final moments</li>
                <li>• Memorial or funeral preferences</li>
                <li>• Messages or legacy wishes for loved ones</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Remember:</strong> These conversations are ongoing, not one-time events. Wishes may change, 
              and that's completely normal. The goal is understanding and connection, not perfection.
            </p>
          </div>
        </div>

        {/* Supporting families */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">Supporting families through the journey</h2>
          <p className="text-yellow-700 mb-4">
            End-of-life affects everyone who loves the person. Family members and friends need support too:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">For family members:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• It's okay to feel scared, sad, or angry</li>
                <li>• Take care of your own physical and emotional needs</li>
                <li>• Accept help from others when offered</li>
                <li>• Share memories and express your love</li>
                <li>• Don't try to "stay strong" all the time</li>
                <li>• Seek professional support when needed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">Ways to help and connect:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Be present - your presence is a gift</li>
                <li>• Share favorite memories and stories</li>
                <li>• Help create legacy projects or memory books</li>
                <li>• Assist with practical needs and coordination</li>
                <li>• Respect their wishes and autonomy</li>
                <li>• Continue normal conversations and activities when appropriate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB end-of-life care services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Palliative Care</h3>
            <p className="mb-4 text-sm">
              Specialized medical care focused on providing relief from symptoms and improving 
              quality of life for patients with serious illnesses.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Expert symptom and pain management</li>
              <li>• Multidisciplinary care teams</li>
              <li>• Family support and counseling</li>
              <li>• Advance care planning assistance</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Palliative care consultation
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Hospice Care</h3>
            <p className="mb-4 text-sm">
              Compassionate care focused on comfort and dignity during the final stages 
              of life, available at home or in specialized facilities.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• 24/7 nursing and medical support</li>
              <li>• Spiritual and emotional counseling</li>
              <li>• Respite care for families</li>
              <li>• Bereavement support</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Hospice care information
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Bereavement Support</h3>
            <p className="mb-4 text-sm">
              Ongoing support for families and loved ones before, during, and after 
              the loss of someone important to them.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Individual and group grief counseling</li>
              <li>• Memorial and celebration of life planning</li>
              <li>• Practical guidance for after death</li>
              <li>• Long-term bereavement support</li>
            </ul>
            <Link
              to="/help"
              className="phb-button inline-block text-sm"
            >
              Bereavement resources
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "When should we start talking about end-of-life care?",
              answer: "Ideally, these conversations should happen while someone is healthy and able to express their wishes clearly. However, it's never too late to start. Even during illness, people can often still participate in decisions about their care."
            },
            {
              question: "What's the difference between palliative care and hospice care?",
              answer: "Palliative care focuses on comfort and quality of life at any stage of serious illness and can be provided alongside curative treatments. Hospice care is specifically for the final stages of life when curative treatments are no longer pursued, focusing entirely on comfort and dignity."
            },
            {
              question: "How do I know when it's time for hospice care?",
              answer: "This decision is typically made when curative treatments are no longer effective or desired, and the focus shifts entirely to comfort. Your healthcare team can help assess when hospice care might be appropriate. It's about choosing quality of life over quantity."
            },
            {
              question: "Can someone change their mind about end-of-life decisions?",
              answer: "Absolutely. People have the right to change their minds about their care preferences at any time, as long as they're mentally capable of making decisions. Advance directives and care plans should be reviewed and updated regularly."
            },
            {
              question: "How can I support someone who is dying?",
              answer: "Your presence and love are the most important gifts. Listen without trying to fix, share memories, respect their wishes, help with practical needs, and take care of yourself too. Don't be afraid to say goodbye or express your love."
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

        {/* Support and comfort */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Every goodbye is also a celebration of love</h2>
            <p className="mb-6 text-gray-700">
              End-of-life is not just about dying - it's about living fully in whatever time remains. 
              It's about love, connection, dignity, and peace. PHB is honored to walk alongside you 
              during this sacred time, providing comfort, support, and compassionate care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-bold"
              >
                Palliative care consultation
              </Link>
              <a
                href="tel:0800-PEACEFUL-CARE"
                className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition-colors inline-block font-bold"
              >
                24/7 Peaceful Care Line
              </a>
              <Link
                to="/help"
                className="bg-transparent border-2 border-[#005eb8] text-[#005eb8] px-6 py-3 rounded-md hover:bg-[#005eb8] hover:text-white transition-colors inline-block font-bold"
              >
                Bereavement support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndOfLifePage;