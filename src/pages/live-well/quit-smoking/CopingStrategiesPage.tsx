import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CopingStrategy {
  title: string;
  description: string;
  technique: string;
  whenToUse: string;
  effectiveness: string;
  tips: string[];
  imageSrc?: string;
  category: 'immediate' | 'behavioral' | 'physical' | 'mental';
}

const copingStrategies: CopingStrategy[] = [
  {
    title: 'Deep Breathing Exercise',
    description: 'Simple breathing technique to reduce stress and manage sudden cravings in 3-5 minutes.',
    technique: 'Breathe in slowly for 4 counts, hold for 4, exhale for 6. Repeat 5-10 times.',
    whenToUse: 'When you feel a sudden urge to smoke or experience anxiety',
    effectiveness: '85% effective for immediate craving relief',
    tips: ['Practice when calm to master the technique', 'Use anywhere - nobody will notice', 'Combine with positive self-talk'],
    imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'immediate'
  },
  {
    title: 'The 5-4-3-2-1 Grounding',
    description: 'Distraction technique that redirects your mind away from cravings using your senses.',
    technique: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
    whenToUse: 'During intense cravings or when feeling overwhelmed',
    effectiveness: '78% effective for craving distraction',
    tips: ['Take your time with each sense', 'Really focus on the details', 'Can be done silently anywhere'],
    imageSrc: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'mental'
  },
  {
    title: 'Physical Activity Burst',
    description: 'Quick 2-5 minute physical movements to release tension and reduce nicotine cravings.',
    technique: 'Do jumping jacks, push-ups, walk briskly, or stretch for 2-5 minutes.',
    whenToUse: 'When restless, anxious, or experiencing moderate cravings',
    effectiveness: '92% effective for stress reduction',
    tips: ['Even 2 minutes helps', 'Choose activities you enjoy', 'Start small and build up'],
    imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'physical'
  },
  {
    title: 'Healthy Hand Habits',
    description: 'Replace the hand-to-mouth action of smoking with healthier alternatives.',
    technique: 'Use stress ball, fidget toy, toothpick, carrot sticks, or practice pen tricks.',
    whenToUse: 'During habitual smoking times or when hands feel restless',
    effectiveness: '80% effective for habit replacement',
    tips: ['Keep alternatives handy', 'Change items weekly to maintain interest', 'Practice new hand skills'],
    imageSrc: 'https://images.unsplash.com/photo-1565052264068-e6549b7b6b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'behavioral'
  },
  {
    title: 'Positive Visualization',
    description: 'Mental imagery technique to reinforce your motivation and see yourself succeeding.',
    technique: 'Spend 3-5 minutes visualizing yourself smoke-free, healthy, and proud.',
    whenToUse: 'During moments of doubt or when motivation feels low',
    effectiveness: '75% effective for motivation boost',
    tips: ['Make images vivid and detailed', 'Include how success feels', 'Practice daily for best results'],
    imageSrc: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'mental'
  },
  {
    title: 'STOP Technique',
    description: 'Structured approach to handle strong urges: Stop, Take a breath, Observe, Proceed mindfully.',
    technique: 'STOP what you\'re doing → Take 3 deep breaths → Observe the craving → Proceed with healthy choice.',
    whenToUse: 'When caught off-guard by sudden, intense cravings',
    effectiveness: '88% effective for impulse control',
    tips: ['Remember: cravings peak and pass', 'The urge will decrease in 3-5 minutes', 'Celebrate each successful STOP'],
    imageSrc: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'immediate'
  }
];

const CopingStrategiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCravingTimer, setShowCravingTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes

  const categories = [
    { id: 'all', label: 'All Strategies', color: 'bg-gray-100' },
    { id: 'immediate', label: 'Immediate Relief', color: 'bg-red-100' },
    { id: 'behavioral', label: 'Habit Replacement', color: 'bg-blue-100' },
    { id: 'physical', label: 'Physical Activity', color: 'bg-green-100' },
    { id: 'mental', label: 'Mental Techniques', color: 'bg-purple-100' }
  ];

  const filteredStrategies = selectedCategory === 'all' 
    ? copingStrategies 
    : copingStrategies.filter(strategy => strategy.category === selectedCategory);

  const startCravingTimer = () => {
    setShowCravingTimer(true);
    setTimerSeconds(300);
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowCravingTimer(false);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/quit-smoking" className="hover:underline">Quit smoking</Link>
            <span className="mx-2">›</span>
            <span>Coping strategies</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Coping with cravings and triggers</h1>
          <p className="text-xl font-medium">
            Practical techniques to manage urges and build healthy habits during your quit journey
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Understanding cravings section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Understanding cravings</h2>
          <p className="mb-4 text-blue-700">
            Cravings are temporary - they typically peak within 3-5 minutes and then fade naturally. Think of them like waves: they build up, reach a peak, then crash down.
          </p>
          <p className="mb-4 text-blue-700">
            Most people experience 3-5 cravings per day in the first week, decreasing to 1-2 per day by week 3. Each craving you successfully navigate makes the next one easier.
          </p>
          <p className="text-blue-700">
            <strong>Remember:</strong> You've already survived 100% of your worst cravings. You can do this!
          </p>
        </div>

        {/* Emergency craving help */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-red-800">Having a craving right now?</h2>
          <p className="mb-4 text-red-700">
            <strong>Don't panic!</strong> This feeling will pass. Use our 5-minute craving timer and try one of the immediate relief techniques below.
          </p>
          {!showCravingTimer ? (
            <button 
              onClick={startCravingTimer}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-bold"
            >
              Start 5-minute craving timer
            </button>
          ) : (
            <div className="bg-white p-4 rounded-lg">
              <p className="text-red-800 text-lg font-bold mb-2">Craving timer: {formatTime(timerSeconds)}</p>
              <p className="text-red-700 text-sm">Breathe deeply and use a coping technique. This will pass!</p>
            </div>
          )}
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Choose your coping strategy</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#005eb8] text-white'
                    : `${category.color} text-gray-700 hover:bg-gray-200`
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Coping strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredStrategies.map((strategy, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {strategy.imageSrc && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={strategy.imageSrc}
                    alt={strategy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#005eb8]">{strategy.title}</h3>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {strategy.effectiveness}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{strategy.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How to do it:</h4>
                    <p className="text-sm text-gray-600">{strategy.technique}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best used when:</h4>
                    <p className="text-sm text-gray-600">{strategy.whenToUse}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pro tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {strategy.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-[#005eb8] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Common triggers */}
        <h2 className="text-2xl font-bold mb-6">Managing common triggers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-bold mb-2 text-orange-800">Stress at Work</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Take micro-breaks every hour</li>
              <li>• Practice desk stretches</li>
              <li>• Use the STOP technique</li>
              <li>• Keep healthy snacks nearby</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold mb-2 text-purple-800">Social Situations</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Practice saying "I don't smoke anymore"</li>
              <li>• Bring a friend for support</li>
              <li>• Hold a drink or snack</li>
              <li>• Plan your exit strategy</li>
            </ul>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h3 className="font-bold mb-2 text-teal-800">After Meals</h3>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• Brush teeth immediately</li>
              <li>• Chew sugar-free gum</li>
              <li>• Take a short walk</li>
              <li>• Call a supportive friend</li>
            </ul>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <h3 className="font-bold mb-2 text-pink-800">Driving/Commuting</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Clean your car thoroughly</li>
              <li>• Keep hands busy with radio</li>
              <li>• Play engaging podcasts</li>
              <li>• Use different routes</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className="font-bold mb-2 text-indigo-800">Feeling Bored</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Keep a list of 5-minute activities</li>
              <li>• Learn a new skill online</li>
              <li>• Organize a small space</li>
              <li>• Text someone you care about</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold mb-2 text-green-800">Emotional Upset</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Journal your feelings</li>
              <li>• Use the 5-4-3-2-1 technique</li>
              <li>• Talk to someone you trust</li>
              <li>• Practice self-compassion</li>
            </ul>
          </div>
        </div>

        {/* Building resilience */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-800">Building long-term resilience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Daily habits that help:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Morning meditation (even 5 minutes)</li>
                <li>• Regular exercise routine</li>
                <li>• Healthy sleep schedule</li>
                <li>• Nutritious meals and snacks</li>
                <li>• Connect with supportive people</li>
                <li>• Practice gratitude</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Warning signs to watch for:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Increased stress or anxiety</li>
                <li>• Isolation from support network</li>
                <li>• Romanticizing smoking memories</li>
                <li>• Skipping healthy habits</li>
                <li>• "Just one won't hurt" thinking</li>
                <li>• Feeling overconfident too early</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency support */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need immediate support?</h2>
            <p className="mb-6">
              When coping strategies aren't enough, reach out for professional help. You're not alone in this journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0800-QUIT-NOW"
                className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                24/7 Quit Line: 0800-QUIT-NOW
              </a>
              <Link
                to="/account/appointments/book"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Book counseling session
              </Link>
              <Link
                to="/live-well/quit-smoking"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#005eb8] transition-colors inline-block font-bold"
              >
                More quit resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopingStrategiesPage;