import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SleepTechnique {
  title: string;
  description: string;
  steps: string[];
  duration: string;
  effectiveness: string;
  whenToUse: string;
  category: 'relaxation' | 'breathing' | 'environment' | 'routine';
}

const sleepTechniques: SleepTechnique[] = [
  {
    title: '4-7-8 Breathing Technique',
    description: 'A powerful breathing pattern that naturally calms the nervous system and promotes sleep.',
    steps: [
      'Exhale completely through your mouth',
      'Close mouth and inhale through nose for 4 counts',
      'Hold breath for 7 counts',
      'Exhale through mouth for 8 counts',
      'Repeat cycle 3-4 times'
    ],
    duration: '2-3 minutes',
    effectiveness: '87% find it helpful for falling asleep',
    whenToUse: 'When lying in bed unable to fall asleep',
    category: 'breathing'
  },
  {
    title: 'Progressive Muscle Relaxation',
    description: 'Systematically tense and release muscle groups to achieve deep physical relaxation.',
    steps: [
      'Start with your toes, tense for 5 seconds',
      'Release and notice the relaxation',
      'Move up to feet, calves, thighs',
      'Continue through abdomen, arms, shoulders',
      'Finish with face and head muscles'
    ],
    duration: '10-20 minutes',
    effectiveness: '82% report improved sleep quality',
    whenToUse: 'When feeling physically tense or stressed',
    category: 'relaxation'
  },
  {
    title: 'Sleep Environment Setup',
    description: 'Optimize your bedroom conditions for the best possible sleep quality.',
    steps: [
      'Keep room temperature between 16-19°C (60-67°F)',
      'Use blackout curtains or eye mask',
      'Minimize noise or use white noise',
      'Remove electronic devices 1 hour before bed',
      'Ensure comfortable mattress and pillows'
    ],
    duration: 'One-time setup',
    effectiveness: '78% notice improved sleep within a week',
    whenToUse: 'For ongoing sleep quality improvement',
    category: 'environment'
  }
];

const BetterSleepTechniquesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Techniques' },
    { id: 'breathing', label: 'Breathing Exercises' },
    { id: 'relaxation', label: 'Relaxation Methods' },
    { id: 'environment', label: 'Sleep Environment' },
    { id: 'routine', label: 'Sleep Routines' }
  ];

  const filteredTechniques = selectedCategory === 'all' 
    ? sleepTechniques 
    : sleepTechniques.filter(technique => technique.category === selectedCategory);

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/sleep" className="hover:underline">Sleep</Link>
            <span className="mx-2">›</span>
            <span>Better sleep techniques</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Better sleep techniques</h1>
          <p className="text-xl font-medium">
            Evidence-based methods to improve your sleep quality and fall asleep faster
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Sleep importance */}
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Why good sleep matters</h2>
          <p className="mb-4 text-gray-700">
            Quality sleep is essential for physical health, mental wellbeing, and daily performance. 
            During sleep, your body repairs tissues, consolidates memories, and recharges for the next day.
          </p>
          <p className="text-gray-700">
            Adults need 7-9 hours of sleep per night, but it's not just about quantity - quality matters too. 
            These techniques will help you achieve both better and deeper sleep.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Choose your approach</h2>
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

        {/* Sleep techniques */}
        <div className="space-y-8 mb-12">
          {filteredTechniques.map((technique, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#0891b2] mb-2">{technique.title}</h3>
                <p className="text-gray-600 mb-4">{technique.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Duration</div>
                    <div className="font-semibold">{technique.duration}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Effectiveness</div>
                    <div className="font-semibold text-green-600">{technique.effectiveness}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Best used when</div>
                    <div className="font-semibold">{technique.whenToUse}</div>
                  </div>
                </div>

                <h4 className="font-semibold mb-3">Step-by-step instructions:</h4>
                <ol className="space-y-2">
                  {technique.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="flex items-start">
                      <span className="bg-[#0891b2] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                        {stepIdx + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* Support section */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Still having trouble sleeping?</h2>
            <p className="mb-6">
              If sleep problems persist despite trying these techniques, it may be time 
              to speak with a healthcare professional about underlying sleep disorders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Book sleep consultation
              </Link>
              <Link
                to="/live-well/sleep"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#0891b2] transition-colors inline-block font-bold"
              >
                More sleep resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetterSleepTechniquesPage;