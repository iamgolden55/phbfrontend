import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';

const HealthChecksPage: React.FC = () => {
  const healthChecks = [
    {
      age: 'Newborn (birth - 2 weeks)',
      timing: 'Within 72 hours of birth, then at 2 weeks',
      checks: [
        'Physical examination including weight, length, and head circumference',
        'Heart rate and breathing check',
        'Reflexes and muscle tone assessment',
        'Eye examination for cataracts and other problems',
        'Hip examination for developmental dysplasia',
        'Hearing screening test',
        'Blood spot test (heel prick) for genetic conditions',
        'Vitamin K injection to prevent bleeding',
        'Feeding and weight gain assessment',
        'Jaundice check',
        'Umbilical cord care',
        'General health and development discussion'
      ],
      concerns: [
        'Difficulty feeding or poor weight gain',
        'Jaundice (yellowing of skin or eyes)',
        'Breathing difficulties',
        'Excessive crying or sleeping',
        'Signs of infection',
        'Hip problems or leg length differences'
      ]
    },
    {
      age: '6-8 weeks',
      timing: 'Around 6-8 weeks of age',
      checks: [
        'Physical examination and weight check',
        'Growth and development assessment',
        'Hip examination',
        'Heart examination',
        'Eye examination',
        'Discussion about feeding, sleeping, and crying',
        'First immunizations',
        'Hearing test results review',
        'Developmental milestones check',
        'Safety advice (car seats, sleep safety)',
        'Postnatal depression screening for parents'
      ],
      concerns: [
        'Poor weight gain or feeding difficulties',
        'Excessive crying or colic',
        'Sleep problems',
        'Development concerns',
        'Hip problems',
        'Hearing concerns',
        'Parent mental health concerns'
      ]
    },
    {
      age: '3-4 months',
      timing: 'Around 3-4 months of age',
      checks: [
        'Physical examination and growth measurements',
        'Developmental milestones assessment',
        'Second round of immunizations',
        'Head control and motor skills check',
        'Social interaction and communication development',
        'Vision and hearing assessment',
        'Feeding and weaning discussion',
        'Sleep pattern review',
        'Safety updates (rolling, reaching)'
      ],
      concerns: [
        'Delayed head control',
        'Not responding to sounds or voices',
        'Not following objects with eyes',
        'Not smiling or interacting socially',
        'Feeding difficulties',
        'Growth concerns'
      ]
    },
    {
      age: '12-15 months',
      timing: 'Around 12-15 months of age',
      checks: [
        'Comprehensive physical examination',
        'Growth and nutrition assessment',
        'MMR and other immunizations',
        'Walking and mobility assessment',
        'Speech and communication development',
        'Social and emotional development',
        'Fine motor skills (pincer grasp)',
        'Behavior and temperament discussion',
        'Nutrition and feeding advice',
        'Safety updates for mobile toddlers'
      ],
      concerns: [
        'Not walking or showing mobility progress',
        'Limited or no speech development',
        'Not responding to name',
        'Loss of previously acquired skills',
        'Extreme behavior or developmental concerns',
        'Nutrition or growth issues'
      ]
    }
  ];

  const redFlags = [
    {
      category: 'Physical Development',
      signs: [
        'Significant weight loss or poor weight gain',
        'Difficulty feeding or refusing feeds',
        'Breathing difficulties or unusual breathing patterns',
        'Persistent high fever',
        'Rashes that don\'t improve or spread rapidly',
        'Unusual swelling or lumps'
      ]
    },
    {
      category: 'Neurological Development',
      signs: [
        'Loss of skills previously acquired',
        'No eye contact or social smiling by 2 months',
        'Not responding to loud sounds',
        'Floppy or very stiff muscle tone',
        'Unusual movements or seizures',
        'Significant head size changes'
      ]
    },
    {
      category: 'Behavioral/Social',
      signs: [
        'Extreme difficulty in calming or soothing',
        'No interest in surroundings',
        'Not responding to familiar voices',
        'Excessive sleepiness or difficulty waking',
        'Unusual crying patterns',
        'No social interaction or engagement'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Conditions', url: '/conditions' },
              { label: 'Baby', url: '/conditions/baby' },
              { label: 'Health Checks', url: '/conditions/baby/health-checks' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Baby health checks</h1>
          <p className="text-xl font-medium">
            Regular health and development checks to monitor your baby's growth and wellbeing
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        {/* Introduction */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">About baby health checks</h2>
          <p className="mb-4">
            Regular health checks are an important part of your baby's care. These checks help ensure your baby 
            is growing and developing normally, and provide opportunities to discuss any concerns you may have.
          </p>
          <p className="mb-4">
            Health checks are usually carried out by a health visitor, practice nurse, or doctor. They include 
            physical examinations, growth measurements, developmental assessments, and immunizations.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Important</h3>
                <p className="text-blue-700">
                  Keep your baby's personal child health record (red book) up to date and bring it to all 
                  appointments. This helps track your baby's progress over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Check Schedule */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Health check schedule</h2>
          <div className="space-y-8">
            {healthChecks.map((check, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0891b2] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0891b2]">{check.age}</h3>
                    <p className="text-gray-600">{check.timing}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">What happens during this check:</h4>
                    <ul className="space-y-2">
                      {check.checks.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Things to discuss or watch for:</h4>
                    <ul className="space-y-2">
                      {check.concerns.map((concern, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span className="text-sm text-gray-700">{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flag Signs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">When to seek immediate medical attention</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Red flag warning signs</h3>
                <p className="text-red-700 mb-4">
                  Contact your healthcare provider immediately or call 999 if your baby shows any of these signs:
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {redFlags.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-sm text-gray-700">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Preparing for Health Checks */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Preparing for health checks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f0f4f5] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#0891b2]">What to bring</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Your baby's personal child health record (red book)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>List of any questions or concerns</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Any medications your baby is taking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Extra nappies and wipes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comfort items (favorite toy, blanket)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#0891b2]">Questions to consider asking</h3>
              <ul className="space-y-2 text-sm">
                <li>• Is my baby's growth and development on track?</li>
                <li>• Are there any activities I can do to support development?</li>
                <li>• When should I start weaning and how?</li>
                <li>• How can I establish good sleep routines?</li>
                <li>• What signs should I watch for between now and the next check?</li>
                <li>• Are there any safety precautions I should be taking?</li>
                <li>• When are the next immunizations due?</li>
                <li>• How can I access support if I have concerns?</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <svg className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <h3 className="text-lg font-bold mb-2 text-blue-800">Getting help and advice</h3>
              <div className="space-y-2 text-blue-700">
                <p><strong>Health Visitor:</strong> Contact through your GP surgery or local health center</p>
                <p><strong>GP Surgery:</strong> For medical concerns and appointment bookings</p>
                <p><strong>PHB 111:</strong> For urgent but non-emergency health concerns</p>
                <p><strong>Emergency:</strong> Call 999 for life-threatening situations</p>
                <p><strong>PHB Parent Helpline:</strong> 0300 123 1044 for parenting support and advice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthChecksPage;