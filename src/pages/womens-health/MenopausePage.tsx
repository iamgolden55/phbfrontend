import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const MenopausePage: React.FC = () => {
  const menopauseSymptoms = [
    {
      category: 'Physical symptoms',
      symptoms: [
        {
          name: 'Hot flushes',
          description: 'A sudden feeling of heat that spreads through your body, often causing sweating, redness in your face, and heart palpitations'
        },
        {
          name: 'Night sweats',
          description: 'Hot flushes that occur at night, often disrupting sleep'
        },
        {
          name: 'Irregular periods',
          description: 'Periods become less frequent and eventually stop altogether'
        },
        {
          name: 'Vaginal dryness',
          description: 'The vagina becomes drier, which can cause discomfort, itching, or pain during sex'
        },
        {
          name: 'Urinary problems',
          description: 'Increased need to urinate, urinary tract infections, or leaking of urine'
        },
        {
          name: 'Headaches',
          description: 'Increased frequency or intensity of headaches'
        },
        {
          name: 'Joint and muscle pain',
          description: 'Aches and pains in the joints and muscles'
        },
        {
          name: 'Changes in skin, hair, and body',
          description: 'Skin becomes drier and thinner, hair may become thinner, and weight gain may occur'
        }
      ]
    },
    {
      category: 'Emotional and mental symptoms',
      symptoms: [
        {
          name: 'Mood changes',
          description: 'Mood swings, irritability, and feelings of sadness or anxiety'
        },
        {
          name: 'Sleep problems',
          description: 'Difficulty sleeping or insomnia, often due to night sweats'
        },
        {
          name: 'Difficulty concentrating',
          description: 'Problems with memory and concentration'
        },
        {
          name: 'Reduced sex drive',
          description: 'Decreased interest in sex'
        },
        {
          name: 'Anxiety',
          description: 'Increased feelings of anxiety or worry'
        },
        {
          name: 'Depression',
          description: 'Feelings of sadness, low mood, or depression'
        }
      ]
    }
  ];

  const treatmentOptions = [
    {
      id: 'hrt',
      title: 'Hormone replacement therapy (HRT)',
      description: 'HRT replaces the hormones that are at a lower level as you approach the menopause. It can help relieve most menopausal symptoms, including hot flushes, night sweats, mood swings, vaginal dryness, and reduced sex drive.',
      types: [
        'Combined HRT (estrogen and progestogen) - for women who still have their womb',
        'Estrogen-only HRT - for women who have had their womb removed (hysterectomy)',
        'Vaginal estrogen - creams, pessaries, or rings that can help relieve vaginal dryness'
      ],
      benefits: [
        'Reduces symptoms of menopause',
        'Helps prevent bone thinning (osteoporosis)',
        'May reduce risk of heart disease if started early in menopause'
      ],
      risks: [
        'Slightly increased risk of breast cancer (combined HRT)',
        'Slightly increased risk of blood clots',
        'Slightly increased risk of stroke'
      ]
    },
    {
      id: 'non-hormonal',
      title: 'Non-hormonal treatments',
      description: 'There are several non-hormonal treatments that can help with menopausal symptoms if you cannot or do not want to take HRT.',
      types: [
        'Tibolone - a medication similar to combined HRT but may have fewer side effects',
        'Clonidine - can help reduce hot flushes and night sweats',
        'Antidepressants - certain types can help with hot flushes (usually only recommended if HRT cannot be taken)',
        'Vaginal moisturizers and lubricants - for vaginal dryness'
      ],
      benefits: [
        'Alternative for women who cannot take HRT',
        'May have fewer risks than HRT',
        'Can target specific symptoms'
      ],
      risks: [
        'May not be as effective as HRT for all symptoms',
        'Can have their own side effects',
        'Do not protect against osteoporosis or heart disease'
      ]
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle changes',
      description: 'Making changes to your lifestyle can help manage menopausal symptoms and improve your overall health.',
      types: [
        'Regular physical activity',
        'Maintaining a healthy weight',
        'Eating a balanced diet',
        'Reducing stress',
        'Avoiding triggers for hot flushes (e.g., spicy foods, caffeine, alcohol)',
        'Stopping smoking',
        'Improving sleep habits'
      ],
      benefits: [
        'No medical side effects',
        'Beneficial for overall health',
        'Can be used alongside other treatments',
        'May help prevent other health conditions'
      ],
      risks: [
        'May not be sufficient for severe symptoms',
        'Takes time to see results',
        'Requires commitment and lifestyle changes'
      ]
    },
    {
      id: 'complementary',
      title: 'Complementary therapies',
      description: 'Some women find that complementary therapies help with menopausal symptoms, although there is limited scientific evidence for their effectiveness.',
      types: [
        'Herbal supplements (e.g., black cohosh, red clover)',
        'Acupuncture',
        'Cognitive behavioral therapy (CBT)',
        'Mindfulness and meditation',
        'Yoga and tai chi'
      ],
      benefits: [
        'May help some women manage symptoms',
        'Generally fewer side effects than medications',
        'Can be used alongside conventional treatments'
      ],
      risks: [
        'Limited scientific evidence for effectiveness',
        'Not regulated in the same way as conventional medicines',
        'Can interact with other medications',
        'May not be suitable for all women'
      ]
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
              { label: 'Menopause', url: '/womens-health/menopause' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Menopause</h1>
          <p className="text-xl font-medium">
            Information about the menopause, including symptoms, treatments, and coping strategies
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About menopause</h2>
              <p className="mb-4">
                Menopause is when a woman stops having periods and is no longer able to get pregnant naturally. It's a natural part of aging that usually occurs between 45 and 55 years of age, as a woman's estrogen levels decline.
              </p>
              <p className="mb-4">
                The menopause is a natural transition in a woman's life. It occurs when the ovaries stop producing eggs and levels of the hormones estrogen and progesterone fall.
              </p>
              <p className="mb-4">
                Menopause is often diagnosed after you've gone 12 months without a menstrual period. Many women experience symptoms in the time leading up to menopause, known as perimenopause, which can last for several years.
              </p>
              <p>
                For some women, the symptoms of menopause can be quite severe and have a significant impact on everyday activities. However, there are treatments and lifestyle changes that can help manage these symptoms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Stages of menopause</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Perimenopause</h3>
                  <p>
                    This is the time leading up to menopause when you may start experiencing menopausal symptoms. Your periods may become irregular, but they haven't stopped. This stage can last for several years.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Menopause</h3>
                  <p>
                    Menopause is officially diagnosed when you've gone 12 months without a menstrual period. At this stage, the ovaries have stopped releasing eggs and producing most of their estrogen.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Postmenopause</h3>
                  <p>
                    This is the time after menopause when menopausal symptoms often ease for many women. However, due to the lower levels of estrogen, postmenopausal women are at increased risk for a number of health conditions, such as osteoporosis and heart disease.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h3>
              <p className="mb-4">
                It's worth talking to a doctor if you experience:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Symptoms that interfere with your daily life</li>
                <li>Symptoms that you find difficult to manage</li>
                <li>Symptoms that concern you</li>
                <li>Vaginal bleeding after menopause</li>
                <li>Periods that become very heavy, occur more frequently than every 3 weeks, or last longer than 7 days</li>
              </ul>
              <p className="text-sm text-gray-600">
                Your doctor can offer advice, support, and treatments to help you manage your symptoms and maintain your quality of life during this transition.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Premature menopause</h3>
              <p className="mb-4">
                Some women experience menopause before the age of 40. This is known as premature menopause or premature ovarian insufficiency.
              </p>
              <p className="mb-4">
                Causes include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Genetic factors</li>
                <li>Autoimmune diseases</li>
                <li>Certain medical treatments (e.g., chemotherapy, radiotherapy)</li>
                <li>Surgery to remove the ovaries</li>
              </ul>
              <p className="mb-2">
                If you experience menopausal symptoms before the age of 40, you should see your doctor for advice and support.
              </p>
              <Link
                to="/womens-health/menopause/premature-menopause"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center mt-2"
              >
                Learn more about premature menopause
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Symptoms of menopause</h2>
          <p className="mb-6">
            The experience of menopause is different for every woman. Some women have few or no symptoms, while others have severe symptoms that significantly impact their daily lives. Most women experience some symptoms, which can include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menopauseSymptoms.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.symptoms.map((symptom, i) => (
                    <div key={i}>
                      <h4 className="font-bold mb-1">{symptom.name}</h4>
                      <p className="text-sm text-gray-600">{symptom.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Treatment options</h2>
          <p className="mb-6">
            There are various treatments available to help manage menopausal symptoms. The right treatment for you depends on your symptoms, health history, and personal preferences. It's important to discuss your options with a healthcare professional.
          </p>
          <div className="space-y-6">
            {treatmentOptions.map((treatment) => (
              <div key={treatment.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-2">{treatment.title}</h3>
                <p className="mb-4">{treatment.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Types/Methods</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {treatment.types.map((type, index) => (
                        <li key={index}>{type}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Benefits</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        {treatment.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Risks/Considerations</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        {treatment.risks.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/womens-health/menopause/treatments/${treatment.id}`}
                    className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                  >
                    Learn more about {treatment.title}
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
          <h2 className="text-2xl font-bold mb-6">Coping with menopause</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Managing hot flushes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Identify triggers</span>
                    <p className="text-sm text-gray-600">Keep a diary to identify what triggers your hot flushes, such as spicy foods, alcohol, caffeine, or stress.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Dress in layers</span>
                    <p className="text-sm text-gray-600">Wear layers of lightweight clothing that can be easily removed when a hot flush starts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Stay cool</span>
                    <p className="text-sm text-gray-600">Use a fan, drink cold water, or wear natural fibers like cotton to help manage hot flushes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Relaxation techniques</span>
                    <p className="text-sm text-gray-600">Try deep breathing, meditation, or yoga to help manage stress and reduce hot flushes.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Emotional wellbeing</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Talk about your feelings</span>
                    <p className="text-sm text-gray-600">Share your experiences with friends, family, or a support group.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Prioritize sleep</span>
                    <p className="text-sm text-gray-600">Establish a regular sleep routine and create a cool, comfortable sleeping environment.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Practice self-care</span>
                    <p className="text-sm text-gray-600">Make time for activities you enjoy and that help you relax.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Seek professional help</span>
                    <p className="text-sm text-gray-600">If you're experiencing depression or anxiety, talk to your doctor about treatment options.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-md">
            <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Maintaining bone health after menopause</h3>
            <p className="mb-4">
              The decrease in estrogen during menopause can lead to bone loss and increase the risk of osteoporosis. Here are some ways to maintain bone health:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Get enough calcium (dairy products, leafy green vegetables, calcium-fortified foods)</li>
              <li>Ensure adequate vitamin D intake (sunlight, fatty fish, fortified foods)</li>
              <li>Engage in weight-bearing exercise (walking, dancing, resistance training)</li>
              <li>Avoid smoking and limit alcohol consumption</li>
              <li>Consider bone density screening, especially if you have risk factors for osteoporosis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenopausePage;
