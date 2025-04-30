import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const PeriodsPage: React.FC = () => {
  const periodProblems = [
    {
      id: 'heavy-periods',
      title: 'Heavy periods (menorrhagia)',
      description: 'When you lose an unusually heavy amount of blood during your period',
      symptoms: ['Using lots of sanitary products', 'Passing large blood clots', 'Bleeding through to clothes or bedding', 'Having to change sanitary products during the night', 'Periods lasting longer than 7 days'],
      treatments: ['Hormonal contraception (pill, coil)', 'Tranexamic acid tablets', 'Anti-inflammatory painkillers', 'Surgery if other treatments don\'t help']
    },
    {
      id: 'painful-periods',
      title: 'Painful periods (dysmenorrhea)',
      description: 'When you have severe pain during your period',
      symptoms: ['Cramps in lower abdomen', 'Pain in lower back', 'Pain in thighs', 'Nausea or vomiting', 'Headaches', 'Diarrhea'],
      treatments: ['Over-the-counter painkillers', 'Hormonal contraception', 'Heat (hot water bottle)', 'Exercise', 'Relaxation techniques']
    },
    {
      id: 'irregular-periods',
      title: 'Irregular periods',
      description: 'When the length of your menstrual cycle changes significantly',
      symptoms: ['Periods that come early or late', 'Missing periods', 'Varying cycle length from month to month'],
      treatments: ['Hormonal contraception', 'Treating underlying conditions like PCOS', 'Lifestyle changes (weight management, stress reduction)']
    },
    {
      id: 'pms',
      title: 'Premenstrual syndrome (PMS)',
      description: 'When you have symptoms before your period starts',
      symptoms: ['Mood swings', 'Feeling upset, irritable or anxious', 'Tiredness', 'Bloating', 'Breast tenderness', 'Headaches', 'Spotty skin or greasy hair'],
      treatments: ['Lifestyle changes (exercise, healthy eating)', 'Over-the-counter painkillers', 'Hormonal contraception', 'Cognitive behavioral therapy (CBT)', 'SSRIs (antidepressants) in severe cases']
    },
    {
      id: 'endometriosis',
      title: 'Endometriosis',
      description: 'A condition where tissue similar to the lining of the womb grows elsewhere in the body',
      symptoms: ['Severe period pain', 'Pain during or after sex', 'Pain when peeing or pooing during your period', 'Feeling sick, constipated, having diarrhea, or blood in your pee during your period', 'Difficulty getting pregnant'],
      treatments: ['Painkillers', 'Hormonal contraception', 'Surgery to cut away patches of endometriosis tissue', 'Surgery to remove part or all of the organs affected by endometriosis']
    },
    {
      id: 'pcos',
      title: 'Polycystic ovary syndrome (PCOS)',
      description: 'A condition that affects how the ovaries work',
      symptoms: ['Irregular periods or no periods', 'Difficulty getting pregnant', 'Excessive hair growth', 'Weight gain', 'Thinning hair on head', 'Oily skin or acne'],
      treatments: ['Weight loss if overweight', 'Medication to treat symptoms', 'Medication to help with fertility', 'Surgery on the ovaries']
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Periods and period problems', url: '/womens-health/periods' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Periods and period problems</h1>
          <p className="text-xl font-medium">
            Information about periods, including heavy periods, irregular periods, and painful periods
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About periods</h2>
              <p className="mb-4">
                A period is the part of the menstrual cycle where a woman bleeds from her vagina for a few days. For most women this happens every 28 days or so, but it's common for periods to be more or less frequent than this, ranging from day 21 to day 40 of their menstrual cycle.
              </p>
              <p className="mb-4">
                Your period is a monthly release of blood and the lining from your uterus (womb) through your vagina. The first day of your period is the first day of your menstrual cycle.
              </p>
              <p className="mb-4">
                Periods usually begin when girls are 11-14 years old and continue until menopause, which usually occurs between the ages of 45-55.
              </p>
              <p>
                Most periods last 3 to 7 days. The bleeding is usually heaviest during the first 2 days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Normal changes during your menstrual cycle</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Premenstrual phase (before your period)</h3>
                  <p>
                    You might have sore breasts, bloating, mood swings, and feel irritable. These symptoms are known as premenstrual syndrome (PMS) and are caused by hormonal changes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">During your period</h3>
                  <p>
                    You might have cramps, lower backache, headaches, and tiredness. This is caused by the uterus contracting to shed its lining.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Ovulation (middle of your cycle)</h3>
                  <p>
                    Some women experience pain in the lower abdomen when an egg is released from the ovaries. You might also notice changes in your vaginal discharge, which becomes clearer, stretchy, and more slippery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h3>
              <p className="mb-4">
                See a doctor if:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your periods suddenly become irregular</li>
                <li>Your periods are unusually heavy or painful</li>
                <li>You bleed between periods or after sex</li>
                <li>You have severe pain during your period</li>
                <li>You have symptoms of PMS that affect your daily life</li>
                <li>You experience any unusual changes in your periods</li>
                <li>You haven't had a period for 3 months and you're not pregnant, breastfeeding, or reached menopause</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Period products</h3>
              <p className="mb-4">
                There are several types of period products to choose from:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Sanitary pads</strong> - worn inside your underwear</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Tampons</strong> - worn inside your vagina</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Menstrual cups</strong> - reusable cups worn inside your vagina</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Period underwear</strong> - reusable, absorbent underwear</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Reusable pads</strong> - washable pads worn inside your underwear</span>
                </li>
              </ul>
              <Link
                to="/womens-health/period-products"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center mt-4"
              >
                Learn more about period products
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Common period problems</h2>
          <div className="space-y-6">
            {periodProblems.map((problem) => (
              <div key={problem.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-2">{problem.title}</h3>
                <p className="mb-4">{problem.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Symptoms</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {problem.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Treatments</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {problem.treatments.map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/womens-health/periods/${problem.id}`}
                    className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                  >
                    Learn more about {problem.title}
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#fdf2f8] rounded-lg p-8 border border-pink-100">
          <h2 className="text-2xl font-bold mb-6">Managing period pain</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Self-care measures</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Exercise</span>
                    <p className="text-sm text-gray-600">Regular exercise may help reduce period pain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Heat</span>
                    <p className="text-sm text-gray-600">Apply a heat pad or hot water bottle to your abdomen.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Warm bath or shower</span>
                    <p className="text-sm text-gray-600">The heat can help relax your muscles and ease pain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Massage</span>
                    <p className="text-sm text-gray-600">Gently massage your lower abdomen to help reduce pain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Rest</span>
                    <p className="text-sm text-gray-600">Get plenty of rest and avoid strenuous activities if needed.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Medications</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Over-the-counter painkillers</span>
                    <p className="text-sm text-gray-600">Ibuprofen, paracetamol, or aspirin can help reduce pain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Hormonal contraception</span>
                    <p className="text-sm text-gray-600">The combined pill, patch, or ring can help reduce period pain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Prescription medications</span>
                    <p className="text-sm text-gray-600">Your doctor may prescribe stronger pain medication if needed.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 bg-pink-50 p-4 rounded-md">
                <p className="text-sm">
                  <strong>Important:</strong> Always follow the dosage instructions on medication packaging or as directed by your healthcare provider. If you're unsure which medication to take, speak to a pharmacist or doctor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodsPage;
