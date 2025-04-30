import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const PainfulPeriodsPage: React.FC = () => {
  const commonCauses = [
    {
      title: 'Primary dysmenorrhea',
      description: 'Pain caused by the normal contractions of the uterus during menstruation. It often begins within 1-2 years after your first period.',
      details: 'This is the most common type of period pain. The pain is caused by the uterus contracting to help shed its lining. These contractions are triggered by substances called prostaglandins. Higher levels of prostaglandins are associated with more severe menstrual pain.'
    },
    {
      title: 'Secondary dysmenorrhea',
      description: 'Pain caused by a disorder in the reproductive organs. It usually begins later in life.',
      details: 'This type of period pain is caused by conditions that affect the uterus or other reproductive organs. The pain may begin earlier in the menstrual cycle and last longer than usual period cramps.'
    }
  ];

  const secondaryCauses = [
    {
      title: 'Endometriosis',
      description: 'A condition where tissue similar to the lining of the womb grows elsewhere in the body, such as the ovaries or fallopian tubes.',
      symptoms: ['Very painful periods', 'Pain during or after sex', 'Pain when urinating or having bowel movements during your period', 'Heavy periods', 'Difficulty getting pregnant']
    },
    {
      title: 'Fibroids',
      description: 'Non-cancerous growths that develop in or around the uterus.',
      symptoms: ['Heavy or painful periods', 'Abdominal or lower back pain', 'Frequent urination', 'Constipation', 'Pain during sex']
    },
    {
      title: 'Adenomyosis',
      description: 'A condition where the tissue that normally lines the uterus grows into the muscular wall of the uterus.',
      symptoms: ['Heavy and painful periods', 'Chronic pelvic pain', 'Pain during sex', 'Blood clots during menstruation', 'Enlarged uterus']
    },
    {
      title: 'Pelvic inflammatory disease (PID)',
      description: 'An infection of the female reproductive organs, usually caused by sexually transmitted infections.',
      symptoms: ['Pain in the lower abdomen', 'Fever', 'Unusual vaginal discharge', 'Pain during sex', 'Painful urination', 'Irregular periods']
    }
  ];

  const treatments = [
    {
      category: 'Over-the-counter pain relief',
      options: [
        {
          name: 'Nonsteroidal anti-inflammatory drugs (NSAIDs)',
          examples: 'Ibuprofen (Advil, Motrin), naproxen (Aleve)',
          description: 'NSAIDs work by reducing the production of prostaglandins, which cause period pain. They are most effective when taken at the first sign of your period or pain.',
          tips: 'Take as directed on the package. These are most effective when started before your period begins or at the first sign of pain.'
        },
        {
          name: 'Paracetamol',
          examples: 'Paracetamol (Tylenol)',
          description: 'May help with mild period pain, though NSAIDs are generally more effective for menstrual cramps.',
          tips: 'Can be taken alongside NSAIDs if needed, but always follow package instructions and don\'t exceed recommended doses.'
        },
        {
          name: 'Heat therapy',
          examples: 'Hot water bottle, heating pad, heat patches',
          description: 'Heat helps relax the uterine muscles and increase blood flow, which can reduce pain.',
          tips: 'Apply to your lower abdomen or lower back for 15-20 minutes at a time.'
        }
      ]
    },
    {
      category: 'Hormonal treatments',
      options: [
        {
          name: 'Combined hormonal contraceptives',
          examples: 'Birth control pills, patches, vaginal rings',
          description: 'Hormonal contraceptives prevent ovulation and reduce the thickness of the uterine lining, which can lead to lighter, less painful periods.',
          tips: 'Requires prescription. Can be used continuously to skip periods entirely.'
        },
        {
          name: 'Progestin-only contraceptives',
          examples: 'Progestin-only pills, hormonal IUD, contraceptive implant, contraceptive injection',
          description: 'These can reduce or eliminate periods in some people, which can help with period pain.',
          tips: 'Requires prescription. Side effects and effectiveness vary by method.'
        }
      ]
    },
    {
      category: 'Lifestyle changes',
      options: [
        {
          name: 'Exercise',
          examples: 'Walking, swimming, yoga, stretching',
          description: 'Regular physical activity can help reduce menstrual pain by releasing endorphins and improving blood circulation.',
          tips: 'Even light exercise during your period can help alleviate cramps.'
        },
        {
          name: 'Dietary changes',
          examples: 'Anti-inflammatory foods, reduced salt, caffeine, and alcohol',
          description: 'Some foods may worsen inflammation and bloating, while others can help reduce it.',
          tips: 'Consider eating more omega-3 fatty acids, fruits, vegetables, and whole grains. Try to avoid or reduce salt, caffeine, alcohol, and highly processed foods during your period.'
        },
        {
          name: 'Stress reduction',
          examples: 'Meditation, deep breathing, progressive muscle relaxation',
          description: 'Stress can worsen the perception of pain. Stress-reduction techniques may help manage pain.',
          tips: 'Practice relaxation techniques regularly, not just during your period.'
        }
      ]
    },
    {
      category: 'Medical procedures',
      options: [
        {
          name: 'Treating underlying conditions',
          examples: 'Surgery for endometriosis, fibroid removal',
          description: 'If an underlying condition is causing painful periods, treating that condition may help reduce pain.',
          tips: 'Discuss with your healthcare provider if you suspect you have an underlying condition.'
        },
        {
          name: 'TENS (Transcutaneous Electrical Nerve Stimulation)',
          examples: 'Small, portable TENS machines for home use',
          description: 'A small device that delivers mild electrical pulses to relieve pain.',
          tips: 'Can be purchased over the counter or prescribed by a healthcare provider.'
        }
      ]
    }
  ];

  const whenToSeeDoctor = [
    'Your pain is severe enough to interfere with your daily activities',
    'Over-the-counter pain medications don\'t provide relief',
    'Your painful periods started after age 25',
    'You experience pain at times other than menstruation',
    'There has been a change in your usual pain pattern',
    'You have heavy bleeding (changing pad/tampon every hour) or bleeding that lasts longer than 7 days',
    'You have fever or unusual discharge along with period pain'
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Periods', url: '/womens-health/periods' },
              { label: 'Painful periods', url: '/womens-health/periods/painful-periods' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Painful periods (dysmenorrhea)</h1>
          <p className="text-xl font-medium">
            Information about period pain, its causes, and treatment options
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About painful periods</h2>
              <p className="mb-4">
                Painful periods, or dysmenorrhea, affect many women and people who menstruate. The pain is usually felt as cramping in the lower abdomen, but can also be experienced as aching in the lower back and thighs.
              </p>
              <p className="mb-4">
                For some, period pain is a minor inconvenience. For others, it can be severe enough to interfere with daily activities for several days each month. Period pain typically begins 1-2 days before your period starts and peaks within the first 24 hours of your period.
              </p>
              <p>
                While uncomfortable, period pain is usually not a cause for concern and can often be managed with simple treatments. However, severe pain or changes in your usual pattern may indicate an underlying condition that requires medical attention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Types and causes of period pain</h2>
              {commonCauses.map((cause, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-bold text-[#d8157d] mb-2">{cause.title}</h3>
                  <p className="font-bold mb-2">{cause.description}</p>
                  <p>{cause.details}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Common symptoms of painful periods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Pain symptoms</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Cramping pain in the lower abdomen</li>
                    <li>Pain that radiates to the lower back and thighs</li>
                    <li>Pain that typically begins just before or at the start of your period</li>
                    <li>Pain that peaks within 24 hours and subsides after 2-3 days</li>
                    <li>A dull, constant ache</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Other symptoms</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Headache</li>
                    <li>Nausea and vomiting</li>
                    <li>Dizziness or lightheadedness</li>
                    <li>Diarrhea or constipation</li>
                    <li>Fatigue</li>
                    <li>Bloating</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Quick relief tips</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Take over-the-counter NSAIDs like ibuprofen at the first sign of pain</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Apply a hot water bottle or heating pad to your lower abdomen</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Try gentle exercise like walking or stretching</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Practice relaxation techniques or deep breathing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Massage your lower abdomen in a circular motion</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h2>
              <ul className="list-disc pl-6 space-y-2">
                {whenToSeeDoctor.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">Underlying conditions that can cause painful periods</h2>
          <p className="mb-6">
            Sometimes, painful periods can be a sign of an underlying condition. This is known as secondary dysmenorrhea. Some common conditions include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryCauses.map((cause, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">{cause.title}</h3>
                <p className="mb-3">{cause.description}</p>
                <h4 className="font-bold mb-1">Common symptoms:</h4>
                <ul className="list-disc pl-6">
                  {cause.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Treatment options for painful periods</h2>

          {treatments.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <h3 className="text-xl font-bold text-[#d8157d] mb-4">{category.category}</h3>
              <div className="space-y-6">
                {category.options.map((option, optIndex) => (
                  <div key={optIndex} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-lg font-bold mb-2">{option.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">Examples: {option.examples}</p>
                    <p className="mb-3">{option.description}</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm"><strong>Tips:</strong> {option.tips}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#fdf2f8] rounded-lg p-8 border border-pink-100">
          <h2 className="text-2xl font-bold mb-6">Tracking your period pain</h2>
          <p className="mb-6">
            Keeping track of your period pain can help you and your healthcare provider better understand your symptoms and find effective treatments. Consider recording:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Symptoms and timing</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>When your pain starts and ends</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Pain intensity (on a scale of 1-10)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Location of pain</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Other symptoms (nausea, headache, etc.)</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Treatments used</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Medications taken and doses</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>When you took medications</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Other treatments used (heat, exercise, etc.)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>How effective treatments were</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Lifestyle factors</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Stress levels</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Diet and any food triggers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Exercise and physical activity</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Sleep quality and quantity</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/account/health-records"
              className="inline-flex items-center bg-[#d8157d] text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Track your period with the PHB app
              <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainfulPeriodsPage;
