import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';

const SafetyPage: React.FC = () => {
  const safetyCategories = [
    {
      id: 'home-safety',
      title: 'Home safety',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      tips: [
        'Use safety gates at the top and bottom of stairs',
        'Install safety catches on cupboards and drawers',
        'Cover electrical sockets with safety plugs',
        'Secure heavy furniture and appliances to the wall',
        'Keep small objects that could be choking hazards out of reach',
        'Install window locks or safety catches',
        'Use corner guards on sharp table edges'
      ]
    },
    {
      id: 'sleep-safety',
      title: 'Safe sleep',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      tips: [
        'Always place your baby on their back to sleep',
        'Use a firm, flat mattress with a fitted sheet',
        'Keep the cot clear of blankets, pillows, bumpers and toys',
        'Make sure your baby\'s feet touch the foot of the cot',
        'Keep your baby\'s head uncovered during sleep',
        'Room temperature should be 16-20°C (61-68°F)',
        'Consider using a baby sleeping bag instead of blankets'
      ]
    },
    {
      id: 'car-safety',
      title: 'Car safety',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      tips: [
        'Always use an appropriate car seat for your baby\'s age and weight',
        'Ensure the car seat is properly installed and secured',
        'Rear-facing car seats are safest for babies under 15 months',
        'Never place a rear-facing car seat in front of an active airbag',
        'Check that the harness straps are at or below shoulder level',
        'The chest clip should be at armpit level',
        'Avoid bulky coats - they can affect harness fit'
      ]
    },
    {
      id: 'feeding-safety',
      title: 'Feeding safety',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      tips: [
        'Always test the temperature of formula or heated breast milk',
        'Use sterile equipment when preparing formula',
        'Never prop up a bottle - always hold your baby during feeding',
        'Introduce solid foods gradually from around 6 months',
        'Cut food into small pieces to prevent choking',
        'Supervise your baby during mealtimes',
        'Avoid honey, nuts, and small hard foods until 12 months'
      ]
    },
    {
      id: 'bath-safety',
      title: 'Bath safety',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      tips: [
        'Never leave your baby alone in the bath, even for a second',
        'Use a non-slip mat in the bath',
        'Check water temperature with your elbow or a thermometer (37°C)',
        'Fill the bath with only 5cm (2 inches) of water for babies',
        'Support your baby\'s head and neck at all times',
        'Have everything you need within reach before starting the bath',
        'Consider using a baby bath seat for extra support'
      ]
    },
    {
      id: 'outdoor-safety',
      title: 'Outdoor safety',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      tips: [
        'Always use sun protection - hat, long sleeves, and shade',
        'Apply baby-safe sunscreen to exposed skin (babies over 6 months)',
        'Check playground equipment for sharp edges or broken parts',
        'Always supervise your baby around water, including paddling pools',
        'Keep babies under 6 months out of direct sunlight',
        'Ensure pushchair brakes are working and straps are secure',
        'Be aware of choking hazards like stones or leaves'
      ]
    }
  ];

  const emergencySteps = [
    {
      title: 'Choking',
      steps: [
        'Turn the baby face down along your forearm, supporting their head',
        'Give 5 sharp back blows between the shoulder blades',
        'Turn the baby face up and give 5 chest thrusts',
        'Check the mouth and remove any visible obstruction',
        'If unsuccessful, call 999 and repeat the process'
      ]
    },
    {
      title: 'Burns and scalds',
      steps: [
        'Remove your baby from danger immediately',
        'Cool the burn with cold running water for 10-20 minutes',
        'Do not use ice, butter, or lotions',
        'Remove any clothing not stuck to the burn',
        'Call 999 for serious burns or seek medical attention'
      ]
    },
    {
      title: 'Falls',
      steps: [
        'Stay calm and check your baby for injuries',
        'Look for signs of head injury: vomiting, drowsiness, irritability',
        'Call 999 if your baby loses consciousness',
        'Seek medical attention for any concerns about head injury',
        'Monitor your baby closely for 24 hours after a fall'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#1e88e5] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Conditions', url: '/health-a-z' },
              { label: 'Baby', url: '/conditions/baby' },
              { label: 'Safety', url: '/conditions/baby/safety' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Baby safety</h1>
          <p className="text-xl font-medium">
            Essential safety information to keep your baby safe at home and when out and about
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        {/* Introduction */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">About baby safety</h2>
          <p className="mb-4">
            Keeping your baby safe is one of your most important responsibilities as a parent. Babies are naturally curious 
            and will explore their environment as they grow and develop. This means taking steps to baby-proof your home 
            and being aware of potential hazards.
          </p>
          <p className="mb-4">
            Most accidents involving babies can be prevented by taking simple safety precautions. This includes everything 
            from safe sleeping practices to childproofing your home and knowing what to do in an emergency.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">Important</h3>
                <p className="text-yellow-700">
                  This information provides general safety guidance. Always trust your instincts and seek medical help 
                  if you're concerned about your baby's safety or wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Safety by area</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {safetyCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1e88e5]">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Age-specific safety */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Safety by age</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold text-blue-800 mb-3">0-3 months</h3>
              <ul className="space-y-2 text-sm">
                <li>• Safe sleep practices are crucial</li>
                <li>• Always support the head and neck</li>
                <li>• Check car seat installation</li>
                <li>• Never shake a baby</li>
                <li>• Supervise pets around baby</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-3">3-6 months</h3>
              <ul className="space-y-2 text-sm">
                <li>• Baby may start rolling over</li>
                <li>• Never leave alone on high surfaces</li>
                <li>• Remove mobiles from cot</li>
                <li>• Begin introducing solid foods safely</li>
                <li>• Baby-proof within arm's reach</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-lg font-bold text-orange-800 mb-3">6-12 months</h3>
              <ul className="space-y-2 text-sm">
                <li>• Baby will be mobile - crawling/walking</li>
                <li>• Install safety gates</li>
                <li>• Secure cabinets and drawers</li>
                <li>• Watch for choking hazards</li>
                <li>• Supervise around stairs and water</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency situations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Emergency situations</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">When to call 999</h3>
                <p className="text-red-700 mb-2">Call for immediate medical help if your baby:</p>
                <ul className="text-red-700 space-y-1">
                  <li>• Is having difficulty breathing or has stopped breathing</li>
                  <li>• Is unconscious or unresponsive</li>
                  <li>• Has a suspected serious injury</li>
                  <li>• Is choking and back blows are not working</li>
                  <li>• Has severe burns or scalds</li>
                  <li>• Has signs of severe allergic reaction</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencySteps.map((emergency, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1e88e5] mb-4">{emergency.title}</h3>
                <ol className="space-y-2 text-sm">
                  {emergency.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <span className="bg-[#1e88e5] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Safety equipment */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Essential safety equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Safety gates', description: 'For stairs and doorways' },
              { name: 'Socket covers', description: 'Protect from electrical hazards' },
              { name: 'Cabinet locks', description: 'Secure cupboards and drawers' },
              { name: 'Corner guards', description: 'Protect from sharp edges' },
              { name: 'Window locks', description: 'Prevent falls from windows' },
              { name: 'Smoke alarms', description: 'Early fire detection' },
              { name: 'Carbon monoxide detector', description: 'Detect dangerous gas levels' },
              { name: 'First aid kit', description: 'For minor injuries' }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
                <h3 className="font-semibold text-[#1e88e5] mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#e3f2fd] p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-[#1e88e5]">First aid training</h3>
            <p className="mb-4">
              Consider taking a baby and child first aid course. These courses teach you how to deal with common 
              emergencies and could save your baby's life.
            </p>
            <p className="mb-4">
              Many organizations offer first aid courses specifically for parents and carers, including the Red Cross, 
              St. John Ambulance, and local children's centers.
            </p>
            <a
              href="/find-first-aid-courses"
              className="inline-flex items-center text-[#1e88e5] font-medium hover:underline"
            >
              Find first aid courses near you
              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-[#1e88e5]">Safety checks and recalls</h3>
            <p className="mb-4">
              Regularly check that baby equipment and toys are in good condition and meet current safety standards. 
              Stay informed about product recalls that might affect items you own.
            </p>
            <p className="mb-4">
              Look for the CE mark on toys and equipment, which shows they meet European safety standards.
            </p>
            <a
              href="/product-safety-recalls"
              className="inline-flex items-center text-[#1e88e5] font-medium hover:underline"
            >
              Check for product recalls
              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <svg className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <h3 className="text-lg font-bold mb-2 text-blue-800">Need help or advice?</h3>
              <div className="space-y-2 text-blue-700">
                <p><strong>Emergency:</strong> Call 999</p>
                <p><strong>Health visitor:</strong> Contact through your GP surgery for ongoing support</p>
                <p><strong>PHB Safety Helpline:</strong> 0300 123 1044 for safety advice and guidance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;