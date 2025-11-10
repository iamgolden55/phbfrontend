import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const AlcoholPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Alcohol Support</h1>
          <p className="text-xl font-medium">
            Help and information about drinking alcohol safely
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Live Well', href: '/live-well' },
              { label: 'Alcohol support', href: '/live-well/alcohol' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">What You Should Know</h2>
              <p className="mb-4">
                Many Nigerians drink alcohol at parties, weddings, and social gatherings. This is normal. But it's good to know how much is too much.
              </p>
              <p className="mb-4">
                Health experts say you should not drink more than <strong>14 units per week</strong>. If you drink this much, spread it over 3 or more days. Don't drink everything in one or two days.
              </p>
              <p>
                Whether you want to drink less, stop drinking, or just learn more, we are here to help you.
              </p>
            </div>

            {/* Recommended drinking limits */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">How Much Is Safe?</h2>
              <p className="mb-4">
                To stay healthy:
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-3">Simple Rules</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Don't drink more than <strong>14 units every week</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Spread your drinking over <strong>3 or more days</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Have some days without alcohol</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If you are pregnant or trying to get pregnant, don't drink at all</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">What is one unit?</h3>
                <p className="mb-3">
                  Here are some common drinks in Nigeria and their units:
                </p>
                <ul className="space-y-2">
                  <li>• Half bottle (330ml) of Star, Gulder, or Trophy = <strong>2 units</strong></li>
                  <li>• One small glass of wine = <strong>1.5 units</strong></li>
                  <li>• One tot (25ml) of gin, vodka, or whisky = <strong>1 unit</strong></li>
                  <li>• One bottle (330ml) of beer = <strong>1.7 units</strong></li>
                  <li>• One large glass of wine = <strong>3 units</strong></li>
                  <li>• One bottle of Orijin or other malt drinks = check the label</li>
                </ul>
              </div>
            </div>

            {/* Health risks */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">What Can Go Wrong?</h2>
              <p className="mb-4">
                Drinking too much can damage your body and mind. The more you drink, the bigger the problem.
              </p>

              <h3 className="text-xl font-semibold mb-2">What can happen immediately</h3>
              <p className="mb-4">
                If you drink too much in one day, you can have:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Accidents - falling down, car crashes</li>
                <li>Alcohol poisoning (very dangerous)</li>
                <li>Fights or violence</li>
                <li>Unsafe sex - can lead to pregnancy or HIV/STIs</li>
                <li>Miscarriage if you are pregnant</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">What can happen over time</h3>
              <p className="mb-4">
                If you drink too much regularly:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>High blood pressure and heart problems</li>
                <li>Liver damage (your liver can stop working)</li>
                <li>Cancer (mouth, throat, liver, breast)</li>
                <li>Weak immune system (you get sick easily)</li>
                <li>Depression and anxiety</li>
                <li>Memory loss</li>
                <li>Addiction (you can't stop even if you want to)</li>
              </ul>
            </div>

            {/* Cutting down */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">How to Drink Less</h2>
              <p className="mb-4">
                If you want to reduce how much you drink, try these:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Decide your limit before you start drinking</li>
                <li>Count your drinks - write them down if it helps</li>
                <li>Have days when you don't drink at all</li>
                <li>Drink water or soft drinks between alcoholic drinks</li>
                <li>Use small cups, not big ones</li>
                <li>Don't keep alcohol in your house</li>
                <li>Tell your family and friends - they can help you</li>
                <li>Do other things that don't need alcohol (sport, church, hobby)</li>
                <li>When going to owambe or party, plan how much you will drink</li>
              </ul>
            </div>

            {/* When to seek help */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">When to Get Help</h2>
              <p className="mb-4">
                Talk to a doctor if:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You can't stop drinking even when you try</li>
                <li>Your body shakes or you sweat when you don't drink</li>
                <li>You need more and more alcohol to feel the same</li>
                <li>Drinking is affecting your work or family</li>
                <li>You keep drinking even though it's making you sick</li>
                <li>You need alcohol just to feel normal</li>
              </ul>
              <p className="mb-4">
                <strong>A doctor can help you:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Check how alcohol is affecting your health</li>
                <li>Give you advice on how to stop safely</li>
                <li>Connect you with alcohol support services</li>
                <li>Give you medicine to help with withdrawal</li>
                <li>Help with depression or anxiety from drinking</li>
              </ul>
              <p>
                <Link to="/account/appointments/book" className="text-[#005eb8] font-medium hover:underline">
                  Book appointment with doctor →
                </Link>
              </p>
            </div>

            {/* Alcohol and mental health */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Alcohol and Your Mind</h2>
              <p className="mb-4">
                Alcohol can affect how you feel:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>It can make depression and worry worse</li>
                <li>Drinking a lot can cause mental health problems</li>
                <li>You may feel worse after the alcohol wears off</li>
                <li>Some people drink when they are stressed, but this makes things worse</li>
              </ul>
              <p className="mb-4">
                If alcohol is affecting your mind and how you feel, get help for both problems together. Don't suffer alone.
              </p>
              <p>
                <Link to="/services/mental-health-support" className="text-[#005eb8] font-medium hover:underline">
                  Talk to someone now →
                </Link>
              </p>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Urgent Help */}
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded">
              <h3 className="text-lg font-bold mb-2 text-red-800">Emergency?</h3>
              <p className="text-sm text-red-700 mb-3">
                If someone drank too much and is unconscious or shaking badly:
              </p>
              <ul className="text-sm text-red-700 mb-4 space-y-2">
                <li>• Call <strong>112</strong> now</li>
                <li>• Stay with them - don't leave them alone</li>
              </ul>
              <a
                href="tel:112"
                className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-center font-bold text-sm"
              >
                Call 112
              </a>
            </div>

            {/* Related Topics */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/live-well/quit-smoking" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Quit smoking
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/mental-wellbeing" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Mental wellbeing
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/healthy-eating" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Healthy eating
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/sleep" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Sleep
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured Content */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Mental health support"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">Need someone to talk to?</h3>
                <p className="text-gray-600 mb-4">
                  Our team is here to help if you're struggling. Talk to us anytime.
                </p>
                <Link to="/services/mental-health-support" className="text-[#005eb8] font-medium hover:underline">
                  Talk to someone
                </Link>
              </div>
            </div>

            {/* Helplines */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Call for help</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">PHB Alcohol Help</p>
                  <a href="tel:0800-HELP-ALC" className="text-[#005eb8] hover:underline">
                    0800-HELP-ALC
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Free, private help anytime</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Talk to Someone</p>
                  <Link to="/services/mental-health-support" className="text-[#005eb8] hover:underline">
                    Chat with counselor
                  </Link>
                </div>
              </div>
            </div>

            {/* Health Tools */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Check yourself</h3>
              <p className="mb-4">Check how you are feeling and get advice.</p>
              <Link
                to="/tools/mental-wellbeing-assessment"
                className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] inline-block w-full text-center"
              >
                Take the check
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlcoholPage;
