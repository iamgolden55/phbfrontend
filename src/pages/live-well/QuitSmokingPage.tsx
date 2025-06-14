import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface QuitResource {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  tags?: string[];
}

const quitSmokingResources: QuitResource[] = [
  {
    title: 'Nicotine Replacement Therapy',
    description: 'Learn about patches, gum, lozenges, and sprays that help manage withdrawal symptoms safely and effectively.',
    href: '/live-well/quit-smoking/nicotine-replacement',
    imageSrc: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Medical support', '95% effective']
  },
  {
    title: 'Prescription Medications',
    description: 'Varenicline and bupropion prescribed by your doctor to reduce cravings and withdrawal symptoms.',
    href: '/live-well/quit-smoking/prescription-medications',
    imageSrc: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Medical support', '85% effective']
  },
  {
    title: 'Behavioral Support',
    description: 'Counseling, support groups, and quit-smoking programs to help you change habits and cope with triggers.',
    href: '/live-well/quit-smoking/behavioral-support',
    imageSrc: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Counseling', '80% effective']
  },
  {
    title: 'Coping with Cravings',
    description: 'Practical strategies to handle urges and triggers in daily situations like stress, meals, and social events.',
    href: '/live-well/quit-smoking/coping-strategies',
    imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Self-help', 'Daily support']
  },
  {
    title: 'Health Benefits Timeline',
    description: 'Discover the amazing improvements your body experiences from 20 minutes to 5 years after quitting.',
    href: '/live-well/quit-smoking/health-benefits',
    imageSrc: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Health improvement', 'Motivation']
  },

];

const QuitSmokingPage: React.FC = () => {
  const [quitDate, setQuitDate] = useState<string>('');
  const [cigarettesPerDay, setCigarettesPerDay] = useState<number>(10);
  const [costPerPack, setCostPerPack] = useState<number>(12);

  const calculateSavings = () => {
    const dailySavings = (cigarettesPerDay / 20) * costPerPack;
    return {
      weekly: (dailySavings * 7).toFixed(0),
      monthly: (dailySavings * 30).toFixed(0),
      yearly: (dailySavings * 365).toFixed(0)
    };
  };

  const savings = calculateSavings();

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Quit smoking</h1>
          <p className="text-xl font-medium">
            Evidence-based support and resources to help you quit smoking for good
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Urgent help section */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-green-800">Ready to quit smoking today?</h2>
          <p className="mb-4 text-green-700">
            If you're ready to start your smoke-free journey, PHB offers immediate support and resources to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:0800-QUIT-NOW"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center font-bold"
            >
              Call PHB Quit Line: 0800-QUIT-NOW
            </a>
            <Link
              to="/account/appointments/book"
              className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] transition-colors text-center font-bold"
            >
              Book Quit Smoking Appointment
            </Link>
          </div>
        </div>

        {/* Cultural context section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Understanding smoking in our communities</h2>
          <p className="mb-4 text-blue-700">
            Smoking habits and attitudes vary across different communities in Africa. Cultural practices, social pressures, and economic factors all influence smoking behaviors and quit attempts.
          </p>
          <p className="mb-4 text-blue-700">
            Quitting smoking is one of the best decisions you can make for your health, regardless of how long you've been smoking. Every cigarette you don't smoke helps your body heal and saves you money.
          </p>
          <p className="text-blue-700">
            PHB supports evidence-based quit methods while respecting individual preferences and cultural considerations in your quit journey.
          </p>
        </div>

        {/* Interactive Savings Calculator */}


        {/* Personal Quit Plan */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-800">Create your personal quit plan</h2>
          <p className="mb-4 text-green-700">Setting a quit date increases your chances of success by 60%. Choose your quit date below:</p>
          <div className="max-w-md">
            <input
              type="date"
              value={quitDate}
              onChange={(e) => setQuitDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005eb8] focus:border-transparent"
            />
            {quitDate && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <h3 className="font-bold text-green-800 mb-2">
                  Your Quit Date: {new Date(quitDate).toLocaleDateString('en-GB', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </h3>
                <p className="text-green-700 mb-3">
                  That's {Math.ceil((new Date(quitDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days from now
                </p>
                <Link 
                  to="/account/health-goals" 
                  className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] transition-colors inline-block text-sm font-bold"
                >
                  Save to My Health Goals
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quit smoking methods and resources */}
        <h2 className="text-2xl font-bold mb-6">Quit smoking methods and support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quitSmokingResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {resource.imageSrc && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={resource.imageSrc}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[#005eb8] mb-2">
                  <Link to={resource.href} className="hover:underline">
                    {resource.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>

                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={resource.href}
                  className="text-[#005eb8] font-medium hover:underline flex items-center mt-auto"
                >
                  Read more
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Support services */}
        <h2 className="text-2xl font-bold mb-6">PHB quit smoking services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">PHB quit smoking counseling</h3>
            <p className="mb-4">
              PHB provides specialized quit smoking counseling through community health centers and mobile health units.
              Our trained counselors offer personalized support and proven strategies.
            </p>
            <Link
              to="/services/quit-smoking-counseling"
              className="phb-button inline-block"
            >
              Find PHB counseling services
            </Link>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Youth smoking prevention</h3>
            <p className="mb-4">
              If you're a young person who smokes, PHB offers specialized programs in schools and community centers 
              designed specifically for youth smoking cessation.
            </p>
            <Link
              to="/services/youth-smoking-prevention"
              className="phb-button inline-block"
            >
              Youth smoking prevention programs
            </Link>
          </div>
        </div>

        {/* Health benefits timeline */}
        <h2 className="text-2xl font-bold mb-6">What happens when you quit</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <p className="mb-4">
            Your body starts healing immediately when you quit smoking. Here's the amazing timeline of health improvements:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3 text-red-600">20 minutes - 12 hours</h3>
              <p className="text-sm text-gray-600 mb-2">
                Heart rate and blood pressure drop. Carbon monoxide level in blood drops to normal.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-blue-600">2 weeks - 1 month</h3>
              <p className="text-sm text-gray-600 mb-2">
                Circulation improves and lung function increases. Coughing and shortness of breath decrease.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-green-600">1 year - 5 years</h3>
              <p className="text-sm text-gray-600 mb-2">
                Risk of heart disease cut in half. Stroke risk reduced to that of a non-smoker.
              </p>
            </div>
          </div>
        </div>

        {/* Community and family support */}
        <h2 className="text-2xl font-bold mb-6">Community and family support</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <p className="mb-4">
            Family and community support play a crucial role in successful smoking cessation. Involving your support network can significantly improve your chances of quitting permanently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3">Family support</h3>
              <p className="text-sm text-gray-600 mb-2">
                Learn how family members can help create a supportive environment for your quit journey.
              </p>
              <Link to="/live-well/quit-smoking/family-support" className="text-[#005eb8] text-sm hover:underline">
                Family support guide
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Workplace programs</h3>
              <p className="text-sm text-gray-600 mb-2">
                Many workplaces offer smoking cessation programs and support for employees who want to quit.
              </p>
              <Link to="/live-well/quit-smoking/workplace-support" className="text-[#005eb8] text-sm hover:underline">
                Workplace quit programs
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Support groups</h3>
              <p className="text-sm text-gray-600 mb-2">
                Join others on the same journey. Share experiences, strategies, and encouragement with people who understand.
              </p>
              <Link to="/live-well/quit-smoking/support-groups" className="text-[#005eb8] text-sm hover:underline">
                Find local support groups
              </Link>
            </div>
          </div>
        </div>

        {/* Self-help and coping strategies */}
        <h2 className="text-2xl font-bold mb-6">Self-help and coping strategies</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3">Managing cravings</h3>
              <p className="text-sm text-gray-600 mb-2">
                Learn the "4 D's" technique: Delay, Deep breathe, Drink water, Do something else. Most cravings last only 3-5 minutes.
              </p>
              <Link to="/live-well/quit-smoking/managing-cravings" className="text-[#005eb8] text-sm hover:underline">
                Craving management tips
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Stress management</h3>
              <p className="text-sm text-gray-600 mb-2">
                Since many people smoke when stressed, learning healthy stress management techniques is crucial for success.
              </p>
              <Link to="/live-well/quit-smoking/stress-management" className="text-[#005eb8] text-sm hover:underline">
                Stress management guide
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Avoiding weight gain</h3>
              <p className="text-sm text-gray-600 mb-2">
                Learn practical strategies to maintain a healthy weight while quitting smoking through diet and exercise.
              </p>
              <Link to="/live-well/quit-smoking/weight-management" className="text-[#005eb8] text-sm hover:underline">
                Weight management tips
              </Link>
            </div>
          </div>
        </div>

        {/* Quit smoking assessment tool */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Quit smoking readiness assessment</h2>
            <p className="mb-6">
              Take our assessment to get a personalized quit plan and find the support methods that work best for you.
            </p>
            <Link
              to="/tools/quit-smoking-assessment"
              className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
            >
              Take the assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuitSmokingPage;