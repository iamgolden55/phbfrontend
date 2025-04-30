import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const PCOSPage: React.FC = () => {
  const symptoms = [
    {
      name: 'Irregular periods',
      description: 'Infrequent, irregular, or prolonged menstrual cycles are the most common sign of PCOS. For example, you might have fewer than nine periods a year, more than 35 days between periods, and abnormally heavy periods.'
    },
    {
      name: 'Excess androgen',
      description: 'Elevated levels of male hormones may result in physical signs, such as excess facial and body hair (hirsutism), severe acne, and male-pattern baldness.'
    },
    {
      name: 'Polycystic ovaries',
      description: 'Your ovaries might be enlarged and contain follicles that surround the eggs. As a result, the ovaries might fail to function regularly.'
    },
    {
      name: 'Weight gain',
      description: 'Up to 80% of women with PCOS are overweight or have obesity.'
    },
    {
      name: 'Skin issues',
      description: 'Oily skin, acne, skin tags (small pieces of excess skin in the armpits or neck area), or dark or thick patches of skin on the back of the neck, in the armpits, and under the breasts.'
    },
    {
      name: 'Hair issues',
      description: 'Thinning hair on the scalp (male-pattern baldness) and excess hair growth on the face, chest, back, or other parts of the body (hirsutism).'
    }
  ];

  const complications = [
    {
      name: 'Infertility',
      description: 'PCOS is one of the most common causes of female infertility. The hormonal imbalance interferes with ovulation, which is necessary for pregnancy.'
    },
    {
      name: 'Metabolic syndrome',
      description: 'This cluster of conditions includes high blood pressure, high blood sugar, and abnormal cholesterol or triglyceride levels, which significantly increases your risk of cardiovascular disease.'
    },
    {
      name: 'Type 2 diabetes',
      description: 'More than half of women with PCOS develop type 2 diabetes by age 40.'
    },
    {
      name: 'Sleep apnea',
      description: 'This condition causes repeated pauses in breathing during the night, which interrupts sleep.'
    },
    {
      name: 'Depression and anxiety',
      description: 'Hormonal changes and symptoms like unwanted hair growth can affect emotions and mental health.'
    },
    {
      name: 'Endometrial cancer',
      description: 'The absence of ovulation for an extended period causes the endometrium to grow thicker, which can increase the risk of endometrial cancer.'
    }
  ];

  const diagnosisTests = [
    {
      name: 'Physical exam',
      description: 'Your doctor will measure your blood pressure, BMI, and waist circumference. They will also look for physical signs of PCOS, such as excess hair growth, acne, and insulin resistance.'
    },
    {
      name: 'Pelvic exam',
      description: 'Your doctor might check your reproductive organs for masses, growths, or other abnormalities.'
    },
    {
      name: 'Blood tests',
      description: 'Tests may include checking hormone levels (testosterone, FSH, LH, estrogen, etc.), cholesterol, insulin, and glucose.'
    },
    {
      name: 'Ultrasound',
      description: 'An ultrasound can check your ovaries for cysts and examine the thickness of the lining of your uterus.'
    }
  ];

  const treatments = [
    {
      category: 'Lifestyle changes',
      description: 'For many women with PCOS, especially those who are overweight, lifestyle changes can help reduce symptoms and improve overall health.',
      options: [
        {
          name: 'Weight loss',
          description: 'Losing 5% to 10% of your body weight can reduce insulin resistance, improve hormone levels, and may restore ovulation.',
          tips: 'Focus on gradual weight loss through a balanced diet and regular exercise.'
        },
        {
          name: 'Healthy diet',
          description: 'A low glycemic index diet can help manage insulin levels and improve PCOS symptoms.',
          tips: 'Include plenty of fruits, vegetables, whole grains, and lean protein. Limit processed foods, sugary drinks, and excessive carbohydrates.'
        },
        {
          name: 'Regular exercise',
          description: 'Physical activity helps with weight management and improves insulin sensitivity.',
          tips: 'Aim for at least 150 minutes of moderate-intensity activity per week, like brisk walking, swimming, or cycling.'
        }
      ]
    },
    {
      category: 'Medications for regulating menstrual cycles',
      description: 'Several medication options can help regulate your period and improve PCOS symptoms.',
      options: [
        {
          name: 'Combination birth control pills',
          description: 'These pills contain estrogen and progestin, which decrease androgen production and regulate estrogen, reducing hirsutism and acne and protecting against endometrial cancer.',
          tips: 'It may take a few months to see improvement in symptoms.'
        },
        {
          name: 'Progestin therapy',
          description: 'Taking progestin for 10-14 days every 1-3 months can regulate your periods and protect against endometrial cancer, but won\'t help with androgen-related symptoms.',
          tips: 'This is an option if you can\'t take combined hormonal birth control.'
        }
      ]
    },
    {
      category: 'Medications for reducing androgen',
      description: 'Some medications can block the effects of androgens or reduce their production.',
      options: [
        {
          name: 'Spironolactone',
          description: 'This medication blocks the effects of androgens on the skin and can improve hirsutism and acne.',
          tips: 'It\'s not recommended if you\'re pregnant or planning to become pregnant due to potential birth defects.'
        },
        {
          name: 'Flutamide',
          description: 'Another anti-androgen medication that helps reduce hirsutism.',
          tips: 'Less commonly used due to potential liver toxicity.'
        },
        {
          name: 'Eflornithine',
          description: 'A cream that can slow facial hair growth, though it doesn\'t remove hair.',
          tips: 'Results typically appear within 4-8 weeks and the cream needs to be used indefinitely.'
        }
      ]
    },
    {
      category: 'Medications for improving insulin resistance',
      description: 'Insulin-sensitizing medications can help improve insulin resistance, which is common in PCOS.',
      options: [
        {
          name: 'Metformin',
          description: 'An oral medication that improves insulin resistance and can help with ovulation, menstrual cycles, and potentially weight management.',
          tips: 'Start with a low dose to minimize side effects like nausea, vomiting, and diarrhea.'
        },
        {
          name: 'Inositol',
          description: 'A supplement that may improve insulin resistance, ovulation, and fertility in women with PCOS.',
          tips: 'Discuss appropriate dosage with your healthcare provider before starting any supplements.'
        }
      ]
    },
    {
      category: 'Fertility treatments',
      description: 'For women with PCOS who want to become pregnant, various fertility treatments may help.',
      options: [
        {
          name: 'Clomiphene',
          description: 'An oral anti-estrogen medication that encourages ovulation.',
          tips: 'Often the first treatment tried when fertility drugs are needed.'
        },
        {
          name: 'Letrozole',
          description: 'An aromatase inhibitor that may induce ovulation in women with PCOS.',
          tips: 'May be more effective than clomiphene in women with PCOS.'
        },
        {
          name: 'Gonadotropins',
          description: 'Follicle-stimulating hormone (FSH) and luteinizing hormone (LH) medications given by injection to stimulate ovulation.',
          tips: 'Requires careful monitoring due to increased risk of multiple pregnancies.'
        },
        {
          name: 'In vitro fertilization (IVF)',
          description: 'A procedure where eggs are removed from your ovaries, fertilized in a lab, and then transferred to your uterus.',
          tips: 'May be recommended if other fertility treatments are unsuccessful.'
        }
      ]
    }
  ];

  const selfCareTips = [
    {
      category: 'Nutrition',
      tips: [
        'Focus on low-glycemic index foods',
        'Increase fiber intake through fruits, vegetables, and whole grains',
        'Include lean proteins in your diet',
        'Limit processed foods and added sugars',
        'Stay hydrated by drinking plenty of water'
      ]
    },
    {
      category: 'Physical activity',
      tips: [
        'Aim for 30 minutes of moderate exercise most days',
        'Include both cardio and strength training',
        'Find activities you enjoy to maintain consistency',
        'Consider yoga, which may help reduce stress and improve hormonal balance',
        'Start slowly and gradually increase intensity if you\'re new to exercise'
      ]
    },
    {
      category: 'Mental wellbeing',
      tips: [
        'Practice stress management techniques like meditation or deep breathing',
        'Join a PCOS support group to connect with others',
        'Consider speaking with a mental health professional if you experience depression or anxiety',
        'Practice positive self-talk and body acceptance',
        'Prioritize sleep hygiene for better hormonal balance'
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
              { label: 'Periods', url: '/womens-health/periods' },
              { label: 'Polycystic ovary syndrome (PCOS)', url: '/womens-health/periods/pcos' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Polycystic Ovary Syndrome (PCOS)</h1>
          <p className="text-xl font-medium">
            Information about PCOS, a hormonal disorder common among women of reproductive age
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">What is PCOS?</h2>
              <p className="mb-4">
                Polycystic ovary syndrome (PCOS) is a common hormonal disorder affecting women of reproductive age. Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone (androgen) levels. The ovaries may develop numerous small collections of fluid (follicles) and fail to regularly release eggs.
              </p>
              <p className="mb-4">
                The exact cause of PCOS is unknown. Early diagnosis and treatment along with weight loss may reduce the risk of long-term complications such as type 2 diabetes and heart disease.
              </p>
              <p>
                PCOS affects approximately 1 in 10 women of childbearing age, making it one of the most common hormonal disorders among women.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Signs and symptoms of PCOS</h2>
              <p className="mb-6">
                Signs and symptoms of PCOS often develop around the time of the first menstrual period during puberty. Sometimes PCOS develops later, for example, in response to substantial weight gain. The signs and symptoms vary from mild to severe and include:
              </p>

              <div className="space-y-6">
                {symptoms.map((symptom, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-bold text-[#d8157d] mb-2">{symptom.name}</h3>
                    <p>{symptom.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">PCOS by the numbers</h2>
              <div className="space-y-4">
                <div className="border-b border-pink-200 pb-3">
                  <p className="text-3xl font-bold text-[#d8157d]">1 in 10</p>
                  <p>Women of childbearing age have PCOS</p>
                </div>
                <div className="border-b border-pink-200 pb-3">
                  <p className="text-3xl font-bold text-[#d8157d]">70%</p>
                  <p>Women with PCOS have insulin resistance</p>
                </div>
                <div className="border-b border-pink-200 pb-3">
                  <p className="text-3xl font-bold text-[#d8157d]">70%</p>
                  <p>Of cases go undiagnosed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#d8157d]">5-10%</p>
                  <p>Weight loss can improve symptoms in overweight women with PCOS</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h2>
              <p className="mb-4">
                See your doctor if you have:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Irregular or missed periods</li>
                <li>Difficulty getting pregnant</li>
                <li>Signs of excess androgen such as excess hair growth, acne, and male-pattern baldness</li>
                <li>Symptoms of diabetes, such as excessive thirst or hunger, blurred vision, or unexplained weight loss</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">Complications of PCOS</h2>
          <p className="mb-6">
            PCOS can lead to various health complications if not properly managed. These can include:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complications.map((complication, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">{complication.name}</h3>
                <p>{complication.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">How is PCOS diagnosed?</h2>
          <p className="mb-6">
            There's no single test to definitively diagnose PCOS. Your doctor will typically use a combination of methods to diagnose PCOS:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {diagnosisTests.map((test, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">{test.name}</h3>
                <p>{test.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#fdf2f8] p-4 rounded-md">
            <h3 className="font-bold mb-2">Rotterdam criteria for PCOS diagnosis</h3>
            <p>
              Currently, the Rotterdam criteria are used for diagnosing PCOS. According to these guidelines, you must have at least two of the following three criteria to be diagnosed with PCOS:
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Irregular or absent periods</li>
              <li>Elevated levels of androgens (male hormones) or physical signs of androgen excess (like excess hair growth)</li>
              <li>Polycystic ovaries as observed during an ultrasound</li>
            </ol>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Treatment options</h2>
          <p className="mb-6">
            PCOS treatment focuses on managing your individual concerns, such as infertility, hirsutism, acne, or obesity. Specific treatment approaches are aimed at addressing the various symptoms and potential complications:
          </p>

          {treatments.map((treatment, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold text-[#d8157d] mb-4">{treatment.category}</h3>
              <p className="mb-4">{treatment.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {treatment.options.map((option, optIndex) => (
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

        <div className="bg-[#fdf2f8] rounded-lg p-8 border border-pink-100 mb-10">
          <h2 className="text-2xl font-bold mb-6">Self-care and lifestyle management</h2>
          <p className="mb-6">
            In addition to medical treatments, lifestyle modifications play a crucial role in managing PCOS symptoms and reducing the risk of long-term complications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selfCareTips.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#d8157d]">{category.category}</h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">PCOS and fertility</h2>
          <p className="mb-4">
            PCOS is one of the most common causes of female infertility. The hormonal imbalances can prevent ovulation, making it difficult to get pregnant. However, with proper treatment, many women with PCOS can become pregnant.
          </p>
          <p className="mb-4">
            If you're trying to conceive, these approaches may help:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Weight loss (if overweight) can improve fertility and increase the chances of ovulation</li>
            <li>Medications to induce ovulation, such as clomiphene, letrozole, or gonadotropins</li>
            <li>Metformin may help some women with PCOS ovulate</li>
            <li>In vitro fertilization (IVF) may be an option if other treatments don't work</li>
          </ul>
          <p>
            If you have PCOS and want to get pregnant, it's best to work with a reproductive endocrinologist who specializes in PCOS-related infertility.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Living with PCOS</h2>
          <p className="mb-6">
            PCOS is a lifelong condition, but symptoms can be managed effectively with the right approach. Here are some strategies for living well with PCOS:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Regular monitoring</h3>
              <p className="mb-4">
                Regular check-ups with your healthcare provider are essential. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Blood pressure checks</li>
                <li>Cholesterol screening</li>
                <li>Blood glucose testing</li>
                <li>Hormone level monitoring as needed</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Finding support</h3>
              <p className="mb-4">
                PCOS can affect your emotional wellbeing. Consider:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Joining a PCOS support group</li>
                <li>Speaking with a mental health professional</li>
                <li>Connecting with others through online forums</li>
                <li>Involving friends and family in your journey</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
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

export default PCOSPage;
