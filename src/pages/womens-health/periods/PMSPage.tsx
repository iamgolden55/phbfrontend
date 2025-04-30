import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const PMSPage: React.FC = () => {
  const symptoms = [
    {
      category: 'Emotional symptoms',
      examples: [
        'Mood swings',
        'Irritability or anger',
        'Anxiety or tension',
        'Depressed mood',
        'Crying spells',
        'Feeling overwhelmed',
        'Social withdrawal',
        'Poor concentration',
        'Changes in libido'
      ]
    },
    {
      category: 'Physical symptoms',
      examples: [
        'Breast tenderness or swelling',
        'Bloating or fluid retention',
        'Abdominal cramps',
        'Headaches or migraines',
        'Joint or muscle pain',
        'Weight gain',
        'Fatigue or low energy',
        'Sleep problems (insomnia or excessive sleeping)',
        'Food cravings, especially for sweet or salty foods'
      ]
    },
    {
      category: 'Behavioral symptoms',
      examples: [
        'Changes in appetite',
        'Food cravings or overeating',
        'Reduced interest in usual activities',
        'Difficulty concentrating',
        'Decreased efficiency or productivity',
        'Avoiding social activities'
      ]
    }
  ];

  const pmddSymptoms = [
    'Severe mood swings, depression, or hopelessness',
    'Intense anger or irritability that causes conflict with others',
    'Marked anxiety, tension, or feelings of being "on edge"',
    'Decreased interest in usual activities',
    'Difficulty concentrating',
    'Fatigue or low energy',
    'Changes in appetite, food cravings, or overeating',
    'Sleep problems (too much or too little)',
    'Feeling overwhelmed or out of control',
    'Physical symptoms that significantly impact daily life'
  ];

  const treatments = [
    {
      category: 'Lifestyle changes',
      options: [
        {
          name: 'Diet modifications',
          description: 'Reducing salt, sugar, caffeine, and alcohol can help minimize bloating and mood swings.',
          tips: 'Aim for small, frequent meals rich in complex carbohydrates, lean protein, fruits, and vegetables. Stay hydrated with water.'
        },
        {
          name: 'Regular exercise',
          description: 'Physical activity can help reduce PMS symptoms by releasing endorphins and reducing stress.',
          tips: 'Aim for at least 30 minutes of moderate exercise most days. Activities like walking, swimming, yoga, and cycling are good options.'
        },
        {
          name: 'Stress management',
          description: 'Stress can worsen PMS symptoms, so practicing stress reduction techniques can be helpful.',
          tips: 'Try meditation, deep breathing exercises, progressive muscle relaxation, yoga, or mindfulness practices. Taking time for self-care is important.'
        },
        {
          name: 'Sleep improvements',
          description: 'Getting adequate, quality sleep can help manage mood symptoms and fatigue associated with PMS.',
          tips: 'Establish a regular sleep schedule, create a relaxing bedtime routine, and aim for 7-9 hours of sleep each night.'
        }
      ]
    },
    {
      category: 'Supplements and natural remedies',
      options: [
        {
          name: 'Calcium',
          description: 'Some studies suggest calcium supplements may help reduce physical and mood symptoms of PMS.',
          tips: 'Typical dosage is 1,000-1,200 mg daily. Food sources include dairy products, fortified plant milks, and leafy greens.'
        },
        {
          name: 'Magnesium',
          description: 'May help reduce water retention, bloating, breast tenderness, and mood symptoms.',
          tips: 'Typical dosage is 200-360 mg daily. Food sources include nuts, seeds, legumes, and whole grains.'
        },
        {
          name: 'Vitamin B6',
          description: 'May help with mood-related PMS symptoms and energy levels.',
          tips: 'Typical dosage is 50-100 mg daily. Food sources include fish, poultry, potatoes, and bananas.'
        },
        {
          name: 'Chasteberry (Vitex)',
          description: 'An herbal supplement that may help balance hormones and reduce PMS symptoms.',
          tips: 'Speak with a healthcare provider before taking, as it can interact with certain medications like hormonal contraceptives.'
        }
      ]
    },
    {
      category: 'Over-the-counter medications',
      options: [
        {
          name: 'Pain relievers',
          description: 'Nonsteroidal anti-inflammatory drugs (NSAIDs) can help with cramps, headaches, and muscle pain.',
          tips: 'Options include ibuprofen (Advil, Motrin), naproxen (Aleve), and aspirin. Take as directed on the package.'
        },
        {
          name: 'Diuretics',
          description: 'May help reduce bloating and water retention.',
          tips: 'Speak to a healthcare provider before taking, as they can affect your electrolyte balance and interact with medications.'
        }
      ]
    },
    {
      category: 'Prescription treatments',
      options: [
        {
          name: 'Hormonal contraceptives',
          description: 'Birth control pills, patches, or rings can help stabilize hormone levels and reduce PMS symptoms.',
          tips: 'Continuous or extended-cycle contraceptives that reduce the number of periods may be especially helpful.'
        },
        {
          name: 'Antidepressants',
          description: 'Selective serotonin reuptake inhibitors (SSRIs) can be effective for severe emotional symptoms, especially for PMDD.',
          tips: 'These may be prescribed for continuous use or just during the luteal phase (2 weeks before period).'
        },
        {
          name: 'Anti-anxiety medications',
          description: 'May be prescribed for severe anxiety symptoms.',
          tips: 'Usually only prescribed for short-term use during the symptomatic phase.'
        },
        {
          name: 'Gonadotropin-releasing hormone (GnRH) agonists',
          description: 'For severe cases, these medications temporarily stop ovulation and the hormonal cycle.',
          tips: 'These create a temporary menopause-like state and are typically only used for severe cases unresponsive to other treatments.'
        }
      ]
    }
  ];

  const trackingItems = [
    'The first day of your period (to identify your cycle length)',
    'Physical symptoms: bloating, breast tenderness, headaches, etc.',
    'Emotional symptoms: mood swings, irritability, anxiety, sadness',
    'Sleep patterns: quality, duration, and any disturbances',
    'Energy levels throughout the day',
    'Dietary intake: note any trigger foods or cravings',
    'Exercise and physical activity',
    'Stress levels and potential stressors',
    'Treatments or remedies tried and their effectiveness'
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
              { label: 'Premenstrual syndrome (PMS)', url: '/womens-health/periods/pms' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Premenstrual Syndrome (PMS)</h1>
          <p className="text-xl font-medium">
            Information about PMS symptoms, causes, and management strategies
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">What is PMS?</h2>
              <p className="mb-4">
                Premenstrual syndrome (PMS) refers to a group of physical and emotional symptoms that many women experience in the days or weeks before their period starts. Symptoms typically begin 5-11 days before menstruation and usually resolve once menstruation begins or shortly after.
              </p>
              <p className="mb-4">
                PMS affects up to 75% of women of reproductive age, with symptoms ranging from mild to severe. While the exact cause isn't fully understood, it's believed to be related to the hormonal changes that occur during the menstrual cycle.
              </p>
              <p>
                For most women, PMS symptoms are manageable, but for some, they can be severe enough to affect daily life, work, and relationships. Understanding and tracking your symptoms can help you find effective management strategies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Common PMS symptoms</h2>
              <p className="mb-6">
                PMS can include over 150 different symptoms, which vary from person to person. The most common symptoms fall into these categories:
              </p>

              <div className="space-y-8">
                {symptoms.map((category, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-[#d8157d] mb-3">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.examples.map((symptom, idx) => (
                        <div key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">PMS vs. PMDD</h2>
              <p className="mb-4">
                Premenstrual Dysphoric Disorder (PMDD) is a more severe form of PMS that affects about 3-8% of women. PMDD causes extreme mood shifts that can disrupt daily life and relationships.
              </p>
              <p className="mb-4">
                PMDD symptoms include:
              </p>
              <ul className="space-y-2">
                {pmddSymptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-white p-4 rounded-md">
                <p className="text-sm">
                  <strong>Important:</strong> If you think you may have PMDD, speak to your healthcare provider. It's a recognized medical condition that can be diagnosed and treated.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h2>
              <p className="mb-4">
                Consider seeing a healthcare provider if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your symptoms interfere with your daily activities or relationships</li>
                <li>Self-care measures don't help manage your symptoms</li>
                <li>You experience severe depression, anxiety, or irritability</li>
                <li>You have thoughts of harming yourself</li>
                <li>Your symptoms have changed or worsened suddenly</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">What causes PMS?</h2>
          <p className="mb-4">
            The exact cause of PMS is not fully understood, but several factors are believed to contribute:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-[#d8157d] mb-2">Hormonal changes</h3>
              <p>
                Fluctuations in estrogen and progesterone levels throughout the menstrual cycle affect brain chemicals (neurotransmitters) that regulate mood, such as serotonin. Lower levels of serotonin are associated with depression, fatigue, food cravings, and sleep problems.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-[#d8157d] mb-2">Chemical changes in the brain</h3>
              <p>
                Fluctuations in serotonin, a brain chemical that influences mood states, could trigger PMS symptoms. Insufficient amounts of serotonin may contribute to premenstrual depression, fatigue, food cravings, and sleep problems.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-[#d8157d] mb-2">Genetic factors</h3>
              <p>
                PMS tends to run in families, suggesting that genetic factors may play a role. If your mother or sister experiences PMS, you may be more likely to experience it too.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-[#d8157d] mb-2">Lifestyle factors</h3>
              <p>
                Poor diet, lack of exercise, and high stress levels can all contribute to or worsen PMS symptoms. These factors may influence how your body responds to hormonal changes.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#fdf2f8] p-4 rounded-md">
            <p>
              While PMS can't be prevented, understanding these potential causes can help you develop effective management strategies for your symptoms.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Treatment and management options</h2>

          {treatments.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <h3 className="text-xl font-bold text-[#d8157d] mb-4">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.options.map((option, optIndex) => (
                  <div key={optIndex} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-lg font-bold mb-2">{option.name}</h4>
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
          <h2 className="text-2xl font-bold mb-6">Tracking your PMS symptoms</h2>
          <p className="mb-6">
            Keeping track of your symptoms can help you identify patterns, prepare for upcoming symptoms, and provide valuable information to your healthcare provider. Consider tracking:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">What to track</h3>
              <ul className="space-y-2">
                {trackingItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Benefits of tracking</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Identify patterns</span>
                    <p className="text-sm text-gray-700">See when symptoms typically occur in your cycle</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Plan ahead</span>
                    <p className="text-sm text-gray-700">Prepare for symptoms and adjust activities when needed</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Identify triggers</span>
                    <p className="text-sm text-gray-700">Recognize foods, activities, or situations that worsen symptoms</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Evaluate treatments</span>
                    <p className="text-sm text-gray-700">See which management strategies work best for your symptoms</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Medical assistance</span>
                    <p className="text-sm text-gray-700">Provide accurate information to your healthcare provider</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/account/health-records"
              className="inline-flex items-center bg-[#d8157d] text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Track your symptoms with the PHB app
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

export default PMSPage;
