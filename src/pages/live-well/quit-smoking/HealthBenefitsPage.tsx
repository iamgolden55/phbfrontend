import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HealthBenefit {
  timeframe: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
  achieved?: boolean;
}

interface PersonalStats {
  moneySaved: number;
  cigarettesNotSmoked: number;
  timeRegained: number;
  healthScore: number;
}

const healthBenefits: HealthBenefit[] = [
  {
    timeframe: '20 minutes',
    title: 'Heart rate and blood pressure drop',
    description: 'Your heart begins to recover from the stress of nicotine almost immediately.',
    details: [
      'Heart rate returns to normal levels',
      'Blood pressure starts to decrease',
      'Blood circulation begins to improve',
      'Hands and feet start to warm up'
    ],
    icon: '❤️',
    color: 'bg-red-50 border-red-200',
  },
  {
    timeframe: '8 hours',
    title: 'Carbon monoxide levels normalize',
    description: 'Dangerous carbon monoxide is cleared from your blood, improving oxygen delivery.',
    details: [
      'Carbon monoxide levels drop to normal',
      'Blood oxygen levels increase significantly',
      'Brain function improves with better oxygen',
      'Physical stamina begins to return'
    ],
    icon: '🫁',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    timeframe: '24 hours',
    title: 'Heart attack risk begins to decrease',
    description: 'Your risk of heart attack starts dropping within just one day.',
    details: [
      'Heart attack risk noticeably decreases',
      'Blood pressure continues to improve',
      'Heart works more efficiently',
      'Stress on cardiovascular system reduces'
    ],
    icon: '💪',
    color: 'bg-green-50 border-green-200',
  },
  {
    timeframe: '48 hours',
    title: 'Taste and smell start returning',
    description: 'Nerve endings begin to regrow, enhancing your senses of taste and smell.',
    details: [
      'Taste buds start to regenerate',
      'Smell sensitivity increases',
      'Food flavors become more intense',
      'Appetite may temporarily increase'
    ],
    icon: '👃',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    timeframe: '72 hours',
    title: 'Breathing becomes easier',
    description: 'Bronchial tubes relax and lung capacity starts to increase.',
    details: [
      'Bronchial tubes begin to relax',
      'Breathing becomes noticeably easier',
      'Lung capacity starts to increase',
      'Less shortness of breath during activity'
    ],
    icon: '🌬️',
    color: 'bg-teal-50 border-teal-200',
  },
  {
    timeframe: '2 weeks',
    title: 'Circulation and lung function improve',
    description: 'Major improvements in blood flow and breathing capacity become apparent.',
    details: [
      'Blood circulation significantly improved',
      'Lung function increases up to 30%',
      'Walking and exercise become easier',
      'Skin tone and complexion improve'
    ],
    icon: '🏃‍♀️',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    timeframe: '1 month',
    title: 'Coughing and fatigue reduce',
    description: 'Respiratory symptoms decrease as your lungs begin to heal and clean themselves.',
    details: [
      'Coughing fits become less frequent',
      'Fatigue and shortness of breath decrease',
      'Lung cilia regrow and function better',
      'Overall energy levels increase'
    ],
    icon: '✨',
    color: 'bg-indigo-50 border-indigo-200',
  },
  {
    timeframe: '3 months',
    title: 'Major lung and circulation gains',
    description: 'Substantial improvements in respiratory and cardiovascular health become evident.',
    details: [
      'Lung function improves up to 30%',
      'Blood circulation dramatically better',
      'Immune system becomes stronger',
      'Fertility begins to improve'
    ],
    icon: '🌟',
    color: 'bg-pink-50 border-pink-200',
  },
  {
    timeframe: '6 months',
    title: 'Stress levels normalize',
    description: 'Your body has adapted to life without nicotine, reducing stress and anxiety.',
    details: [
      'Stress levels return to normal',
      'Sleep quality significantly improves',
      'Anxiety related to smoking disappears',
      'Mental clarity and focus improve'
    ],
    icon: '🧘‍♀️',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    timeframe: '1 year',
    title: 'Heart disease risk cut in half',
    description: 'Your risk of coronary heart disease is now 50% lower than when you smoked.',
    details: [
      'Heart disease risk reduced by 50%',
      'Blood clot risk significantly decreased',
      'Stroke risk continues to decline',
      'Overall cardiovascular health greatly improved'
    ],
    icon: '💚',
    color: 'bg-green-50 border-green-200',
  },
  {
    timeframe: '5 years',
    title: 'Stroke risk equals non-smoker',
    description: 'Your stroke risk is now the same as someone who has never smoked.',
    details: [
      'Stroke risk equals that of non-smokers',
      'Cancer risk begins to decline significantly',
      'Lung cancer risk reduced by 50%',
      'Overall life expectancy increases'
    ],
    icon: '🎯',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    timeframe: '10 years',
    title: 'Cancer risks dramatically reduced',
    description: 'Your risk of lung cancer and other smoking-related cancers drops significantly.',
    details: [
      'Lung cancer risk reduced by 50-90%',
      'Risk of other cancers greatly decreased',
      'Pre-cancerous cells replaced with healthy ones',
      'Overall cancer mortality risk much lower'
    ],
    icon: '🛡️',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    timeframe: '15 years',
    title: 'Health risks equal to non-smoker',
    description: 'Your health risks are now virtually the same as someone who never smoked.',
    details: [
      'Heart disease risk equals non-smokers',
      'Most cancer risks return to normal levels',
      'Life expectancy restored to normal',
      'Complete reversal of most smoking damage'
    ],
    icon: '🏆',
    color: 'bg-gold-50 border-yellow-300',
  }
];

const HealthBenefitsPage: React.FC = () => {
  const [quitDate, setQuitDate] = useState<Date | null>(null);
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [personalStats, setPersonalStats] = useState<PersonalStats>({
    moneySaved: 0,
    cigarettesNotSmoked: 0,
    timeRegained: 0,
    healthScore: 0
  });
  const [cigarettesPerDay, setCigarettesPerDay] = useState(20);
  const [pricePerPack, setPricePerPack] = useState(1500); // Nigerian Naira

  useEffect(() => {
    if (quitDate) {
      calculatePersonalStats();
    }
  }, [quitDate, cigarettesPerDay, pricePerPack]);

  const calculatePersonalStats = () => {
    if (!quitDate) return;

    const now = new Date();
    const timeDiff = now.getTime() - quitDate.getTime();
    const daysSinceQuit = Math.max(0, Math.floor(timeDiff / (1000 * 3600 * 24)));
    const hoursSinceQuit = Math.max(0, Math.floor(timeDiff / (1000 * 3600)));

    const cigarettesNotSmoked = daysSinceQuit * cigarettesPerDay;
    const packsNotSmoked = cigarettesNotSmoked / 20;
    const moneySaved = packsNotSmoked * pricePerPack;
    const timeRegained = cigarettesNotSmoked * 5; // 5 minutes per cigarette
    const healthScore = Math.min(100, Math.floor((hoursSinceQuit / (24 * 365)) * 100)); // Percentage over a year

    setPersonalStats({
      moneySaved: Math.floor(moneySaved),
      cigarettesNotSmoked: Math.floor(cigarettesNotSmoked),
      timeRegained: Math.floor(timeRegained),
      healthScore
    });

    // Update current benefit based on time since quit
    updateCurrentBenefit(hoursSinceQuit);
  };

  const updateCurrentBenefit = (hoursSinceQuit: number) => {
    if (hoursSinceQuit >= 24 * 365 * 15) setCurrentBenefit(12); // 15 years
    else if (hoursSinceQuit >= 24 * 365 * 10) setCurrentBenefit(11); // 10 years
    else if (hoursSinceQuit >= 24 * 365 * 5) setCurrentBenefit(10); // 5 years
    else if (hoursSinceQuit >= 24 * 365) setCurrentBenefit(9); // 1 year
    else if (hoursSinceQuit >= 24 * 30 * 6) setCurrentBenefit(8); // 6 months
    else if (hoursSinceQuit >= 24 * 30 * 3) setCurrentBenefit(7); // 3 months
    else if (hoursSinceQuit >= 24 * 30) setCurrentBenefit(6); // 1 month
    else if (hoursSinceQuit >= 24 * 14) setCurrentBenefit(5); // 2 weeks
    else if (hoursSinceQuit >= 72) setCurrentBenefit(4); // 72 hours
    else if (hoursSinceQuit >= 48) setCurrentBenefit(3); // 48 hours
    else if (hoursSinceQuit >= 24) setCurrentBenefit(2); // 24 hours
    else if (hoursSinceQuit >= 8) setCurrentBenefit(1); // 8 hours
    else if (hoursSinceQuit >= 0.33) setCurrentBenefit(0); // 20 minutes
    else setCurrentBenefit(-1); // Not yet started
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
    return `${Math.floor(minutes / 1440)} days`;
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/quit-smoking" className="hover:underline">Quit smoking</Link>
            <span className="mx-2">›</span>
            <span>Health benefits</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Health benefits of quitting smoking</h1>
          <p className="text-xl font-medium">
            See how your body heals and recovers from the moment you quit smoking
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Why quit benefits matter */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Your body starts healing immediately</h2>
          <p className="mb-4 text-blue-700">
            The human body has an amazing ability to heal itself. Within just 20 minutes of your last cigarette, 
            your body begins the recovery process that continues for years.
          </p>
          <p className="mb-4 text-blue-700">
            Every cigarette you don't smoke is a victory for your health. The timeline below shows the remarkable 
            journey your body takes as it heals from smoking damage.
          </p>
          <p className="text-blue-700">
            <strong>Remember:</strong> These benefits happen regardless of how long you've smoked or how much. 
            It's never too late to quit and start healing!
          </p>
        </div>

        {/* Personal Progress Tracker */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-800">Track your personal progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                When did you quit smoking?
              </label>
              <input
                type="date"
                value={quitDate ? quitDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setQuitDate(e.target.value ? new Date(e.target.value) : null)}
                className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Cigarettes per day
                </label>
                <input
                  type="number"
                  value={cigarettesPerDay}
                  onChange={(e) => setCigarettesPerDay(Number(e.target.value))}
                  className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Price per pack (₦)
                </label>
                <input
                  type="number"
                  value={pricePerPack}
                  onChange={(e) => setPricePerPack(Number(e.target.value))}
                  className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  min="100"
                />
              </div>
            </div>
          </div>

          {quitDate && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600">{formatMoney(personalStats.moneySaved)}</div>
                <div className="text-sm text-green-700">Money saved</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-2xl font-bold text-blue-600">{personalStats.cigarettesNotSmoked.toLocaleString()}</div>
                <div className="text-sm text-blue-700">Cigarettes not smoked</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-2xl font-bold text-purple-600">{formatTime(personalStats.timeRegained)}</div>
                <div className="text-sm text-purple-700">Life time regained</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-2xl font-bold text-orange-600">{personalStats.healthScore}%</div>
                <div className="text-sm text-orange-700">Health recovery</div>
              </div>
            </div>
          )}
        </div>

        {/* Health Benefits Timeline */}
        <h2 className="text-2xl font-bold mb-6">Your health recovery timeline</h2>
        <div className="space-y-6 mb-12">
          {healthBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 transition-all duration-300 ${
                quitDate && currentBenefit >= index 
                  ? 'bg-green-50 border-green-300 shadow-md' 
                  : benefit.color
              } ${
                quitDate && currentBenefit === index 
                  ? 'ring-2 ring-green-400 ring-opacity-50' 
                  : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                    quitDate && currentBenefit >= index 
                      ? 'bg-green-100' 
                      : 'bg-white'
                  }`}>
                    {quitDate && currentBenefit >= index ? '✅' : benefit.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      quitDate && currentBenefit >= index
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {benefit.timeframe}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{benefit.description}</p>
                  <ul className="space-y-1">
                    {benefit.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className={`w-2 h-2 rounded-full mr-3 ${
                          quitDate && currentBenefit >= index ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {quitDate && currentBenefit === index && (
                    <div className="mt-4 p-3 bg-green-100 rounded-md">
                      <p className="text-green-800 font-medium">🎉 You're experiencing this benefit right now!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional benefits */}
        <h2 className="text-2xl font-bold mb-6">Additional benefits of quitting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold mb-2 text-blue-800">💰 Financial Benefits</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Average smoker saves ₦500,000+ per year</li>
              <li>• Reduced health insurance premiums</li>
              <li>• Lower life insurance costs</li>
              <li>• Less spending on breath mints, cleaning</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold mb-2 text-purple-800">👨‍👩‍👧‍👦 Social Benefits</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• No more smoking breaks isolation</li>
              <li>• Better breath and body odor</li>
              <li>• Setting good example for children</li>
              <li>• More social acceptance</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-bold mb-2 text-orange-800">🏠 Home Benefits</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Cleaner, fresher-smelling home</li>
              <li>• No burn holes in furniture</li>
              <li>• Reduced fire risk</li>
              <li>• Better air quality for family</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold mb-2 text-green-800">💪 Physical Benefits</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Increased energy and stamina</li>
              <li>• Better sleep quality</li>
              <li>• Improved immune system</li>
              <li>• Faster wound healing</li>
            </ul>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <h3 className="font-bold mb-2 text-pink-800">🧠 Mental Benefits</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Reduced anxiety and stress</li>
              <li>• Better concentration</li>
              <li>• Improved mood stability</li>
              <li>• Higher self-esteem</li>
            </ul>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h3 className="font-bold mb-2 text-teal-800">✨ Appearance Benefits</h3>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• Younger-looking skin</li>
              <li>• Whiter teeth and nails</li>
              <li>• Reduced wrinkles</li>
              <li>• Shinier, healthier hair</li>
            </ul>
          </div>
        </div>

        {/* Motivation section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">Your body is designed to heal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Amazing facts about recovery:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Lung cilia start regrowing within 1-9 months</li>
                <li>• New healthy cells replace damaged ones</li>
                <li>• Heart disease risk cuts in half after just 1 year</li>
                <li>• Lung cancer risk drops 50% after 10 years</li>
                <li>• Complete healing possible regardless of age</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Remember:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Every smoke-free day is a victory</li>
                <li>• Your body is healing right now</li>
                <li>• It's never too late to quit</li>
                <li>• Benefits start within 20 minutes</li>
                <li>• You're investing in your future self</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support and next steps */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start your health journey?</h2>
            <p className="mb-6">
              Every day smoke-free is a gift to your future self. Get the support you need to make quitting successful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/live-well/quit-smoking/coping-strategies"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Learn coping strategies
              </Link>
              <Link
                to="/live-well/quit-smoking/nicotine-replacement"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Explore NRT options
              </Link>
              <a
                href="tel:0800-QUIT-NOW"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#0891b2] transition-colors inline-block font-bold"
              >
                Call quit line: 0800-QUIT-NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthBenefitsPage;