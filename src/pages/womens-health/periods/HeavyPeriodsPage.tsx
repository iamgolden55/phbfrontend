import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const HeavyPeriodsPage: React.FC = () => {
  const symptoms = [
    'Needing to change your pad or tampon every hour or more frequently',
    'Needing to use double sanitary protection (tampons and pads together)',
    'Bleeding for longer than 7 days',
    'Passing blood clots larger than a 10p coin',
    'Bleeding that soaks through to your clothes or bedding',
    'Having to get up during the night to change your sanitary products',
    'Feeling tired, exhausted, or experiencing shortness of breath (signs of anemia from heavy blood loss)'
  ];

  const causes = [
    {
      category: 'Hormonal imbalances',
      description: 'Hormonal imbalances can affect the buildup of the uterine lining, leading to excessive shedding and heavy bleeding.',
      examples: [
        'Anovulation (when your ovaries don\'t release an egg)',
        'Thyroid problems',
        'Polycystic ovary syndrome (PCOS)',
        'Perimenopause (transition to menopause)',
        'Obesity (which can affect hormone production)'
      ]
    },
    {
      category: 'Uterine abnormalities',
      description: 'Structural issues with the uterus can cause heavy bleeding.',
      examples: [
        'Uterine fibroids (non-cancerous growths in the uterus)',
        'Uterine polyps (small, benign growths on the uterine lining)',
        'Adenomyosis (when the uterine lining grows into the muscular wall of the uterus)',
        'Structural abnormalities from birth',
        'Previous cesarean section'
      ]
    },
    {
      category: 'Reproductive conditions',
      description: 'Certain conditions affecting the reproductive system can lead to heavy periods.',
      examples: [
        'Endometriosis',
        'Pelvic inflammatory disease (PID)',
        'Complications from pregnancy (such as ectopic pregnancy or miscarriage)'
      ]
    },
    {
      category: 'Medications',
      description: 'Some medications can contribute to heavy menstrual bleeding.',
      examples: [
        'Anticoagulants (blood thinners)',
        'Some anti-inflammatory medications',
        'Hormonal medications',
        'Copper intrauterine device (IUD)'
      ]
    },
    {
      category: 'Systemic conditions',
      description: 'Conditions affecting the whole body can lead to heavy periods.',
      examples: [
        'Bleeding disorders (such as von Willebrand disease)',
        'Liver, kidney, or thyroid disease',
        'Cancer of the uterus or cervix (rare)'
      ]
    }
  ];

  const diagnosisTests = [
    {
      name: 'Medical history and physical exam',
      description: 'Your doctor will ask about your menstrual history and perform a physical examination to check for signs of conditions that might cause heavy bleeding.',
      what_to_expect: 'Be prepared to discuss your menstrual cycle, including frequency, duration, and amount of bleeding, and any other symptoms you experience.'
    },
    {
      name: 'Blood tests',
      description: 'These can check for anemia, thyroid disorders, bleeding disorders, and other conditions that may cause heavy periods.',
      what_to_expect: 'A small blood sample will be taken from your arm. Results may be available immediately or take a few days.'
    },
    {
      name: 'Pelvic ultrasound',
      description: 'This imaging test uses sound waves to create pictures of your uterus, ovaries, and pelvis, which can help identify fibroids, polyps, or other structural abnormalities.',
      what_to_expect: 'A transducer is moved over your abdomen or inserted into your vagina (transvaginal ultrasound). The procedure is not painful but may cause slight discomfort.'
    },
    {
      name: 'Endometrial biopsy',
      description: 'In this procedure, a small sample of tissue is taken from the lining of your uterus to check for abnormal cells or cancer.',
      what_to_expect: 'You may feel cramping or pinching during the procedure, which typically takes about 10 minutes. You might experience spotting afterward.'
    },
    {
      name: 'Hysteroscopy',
      description: 'A thin, lighted scope is inserted through your vagina and cervix into your uterus, allowing your doctor to examine the uterine lining directly.',
      what_to_expect: 'This can be done in a doctor\'s office or hospital, sometimes with local anesthesia. You might feel cramping during and after the procedure.'
    },
    {
      name: 'Sonohysterography',
      description: 'This enhanced ultrasound uses a small amount of fluid injected into the uterus to provide clearer images of the uterine cavity.',
      what_to_expect: 'Similar to a transvaginal ultrasound, but with the addition of saline solution to expand the uterine cavity. You may experience cramping and spotting afterward.'
    }
  ];

  const treatments = [
    {
      category: 'Medications',
      options: [
        {
          name: 'Nonsteroidal anti-inflammatory drugs (NSAIDs)',
          description: 'Medications like ibuprofen (Advil, Motrin) and naproxen sodium (Aleve) can reduce blood loss and help with pain.',
          best_for: 'Women with mild to moderate heavy bleeding.',
          how_it_works: 'NSAIDs reduce the production of prostaglandins, which contribute to heavy bleeding and pain. Take them at the first sign of your period or pain, and continue as directed for 3-5 days.'
        },
        {
          name: 'Tranexamic acid',
          description: 'This non-hormonal medication helps blood clot and can reduce menstrual blood loss by up to 50%.',
          best_for: 'Women who want a non-hormonal option to reduce heavy bleeding.',
          how_it_works: 'Taken only during your period (usually the first 3-4 days), this medication works by helping blood clot and reducing bleeding.'
        },
        {
          name: 'Hormonal birth control',
          description: 'Birth control pills, patches, vaginal rings, and hormonal IUDs can reduce heavy bleeding.',
          best_for: 'Women who also want contraception or have hormonal imbalances.',
          how_it_works: 'Hormonal methods thin the uterine lining, leading to lighter periods. Some may be used continuously to skip periods altogether.'
        },
        {
          name: 'Oral progesterone',
          description: 'Progesterone supplements can help balance hormones and reduce bleeding, especially if you have irregular periods.',
          best_for: 'Women with anovulatory bleeding (when you don\'t ovulate).',
          how_it_works: 'Usually taken for 10-14 days each month, progesterone helps regulate the menstrual cycle and prevents the uterine lining from becoming too thick.'
        },
        {
          name: 'Gonadotropin-releasing hormone (GnRH) agonists',
          description: 'These medications temporarily stop your periods by lowering estrogen levels.',
          best_for: 'Short-term treatment before surgery or in severe cases.',
          how_it_works: 'Creates a temporary menopause-like state. Usually limited to 3-6 months due to side effects like bone loss.'
        }
      ]
    },
    {
      category: 'Surgical treatments',
      options: [
        {
          name: 'Endometrial ablation',
          description: 'A procedure that destroys the uterine lining using heat, cold, microwave energy, or other methods.',
          best_for: 'Women who have completed childbearing.',
          how_it_works: 'By removing the endometrium (lining of the uterus), there\'s less tissue to shed during periods. About 50% of women have no periods after ablation, while others experience much lighter bleeding.'
        },
        {
          name: 'Uterine artery embolization (UAE)',
          description: 'A procedure that blocks the blood vessels supplying the uterus, causing fibroids to shrink.',
          best_for: 'Women with fibroids who want to avoid major surgery.',
          how_it_works: 'Small particles are injected into the blood vessels that supply the fibroids, cutting off their blood supply and causing them to shrink.'
        },
        {
          name: 'Myomectomy',
          description: 'Surgical removal of fibroids while leaving the uterus intact.',
          best_for: 'Women with fibroids who want to preserve fertility.',
          how_it_works: 'Depending on the size and location of fibroids, this can be done through hysteroscopy, laparoscopy, or open surgery.'
        },
        {
          name: 'Hysterectomy',
          description: 'Surgical removal of the uterus, which permanently stops periods.',
          best_for: 'Women with severe symptoms who have completed childbearing and haven\'t found relief with other treatments.',
          how_it_works: 'This major surgery completely removes the uterus. Recovery time varies depending on the type of hysterectomy performed.'
        }
      ]
    }
  ];

  const selfCareTips = [
    {
      tip: 'Keep track of your periods',
      description: 'Use a period tracking app or calendar to record the start date, duration, and heaviness of your periods, which can help identify patterns and prepare for heavy days.'
    },
    {
      tip: 'Be prepared',
      description: 'Keep extra sanitary products in your bag, car, workplace, and home. Consider using high-absorbency products, and on very heavy days, you might want to use both a tampon and pad together.'
    },
    {
      tip: 'Manage iron levels',
      description: 'Heavy periods can lead to iron deficiency anemia. Consider iron-rich foods (like lean meat, leafy greens, beans, and fortified cereals) or supplements if recommended by your doctor.'
    },
    {
      tip: 'Stay hydrated',
      description: 'Heavy blood loss can lead to dehydration. Drink plenty of water and limit caffeine and alcohol, which can worsen dehydration and period symptoms.'
    },
    {
      tip: 'Consider comfortable clothing',
      description: 'During your heaviest days, wear comfortable, dark-colored clothing to reduce stress about leakage.'
    },
    {
      tip: 'Manage stress',
      description: 'Stress can worsen menstrual symptoms. Practice relaxation techniques like deep breathing, meditation, or yoga.'
    },
    {
      tip: 'Try heat therapy',
      description: 'A heating pad or hot water bottle on your abdomen can help reduce cramping that often accompanies heavy periods.'
    }
  ];

  const whenToSeeDoctor = [
    'Your periods are so heavy they disrupt your life',
    'Your period lasts longer than 7 days',
    'You need to change your tampon or pad every hour for several consecutive hours',
    'You pass blood clots larger than a 10p coin',
    'You\'re experiencing symptoms of anemia, such as fatigue, weakness, or shortness of breath',
    'You have severe pain with your periods',
    'Your periods have suddenly become heavier than usual',
    'You\'re bleeding between periods or after menopause'
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
              { label: 'Heavy periods', url: '/womens-health/periods/heavy-periods' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Heavy periods (menorrhagia)</h1>
          <p className="text-xl font-medium">
            Information about heavy menstrual bleeding, its causes, and treatment options
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">What are heavy periods?</h2>
              <p className="mb-4">
                Heavy menstrual bleeding, also called menorrhagia, is when you lose an unusually large amount of blood during your period. You might also have periods that last longer than 7 days.
              </p>
              <p className="mb-4">
                While it\'s normal for flow to vary from month to month and person to person, heavy periods can disrupt daily life and may indicate an underlying health problem.
              </p>
              <p>
                Heavy menstrual bleeding affects about 1 in 5 women. It\'s one of the most common reasons women see their gynecologists. With proper diagnosis and treatment, heavy periods can be managed effectively.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Signs of heavy periods</h2>
              <p className="mb-6">
                How do you know if your periods are unusually heavy? Here are common signs:
              </p>

              <ul className="space-y-3">
                {symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 bg-[#fdf2f8] p-4 rounded-md">
                <p className="text-sm">
                  <strong>Note:</strong> The average woman loses about 30-40ml (2-3 tablespoons) of blood during her period. Menorrhagia is typically defined as losing more than 80ml (about 5-6 tablespoons) of blood.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-6">What causes heavy periods?</h2>
              <p className="mb-6">
                Heavy menstrual bleeding can have many causes. Sometimes, no specific cause is found, but often it\'s related to:
              </p>

              <div className="space-y-6">
                {causes.map((cause, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-bold text-[#d8157d] mb-2">{cause.category}</h3>
                    <p className="mb-3">{cause.description}</p>
                    <div>
                      <p className="font-medium mb-1">Examples include:</p>
                      <ul className="list-disc pl-6">
                        {cause.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Impact of heavy periods</h2>
              <p className="mb-4">
                Heavy periods can affect your quality of life in various ways:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Disruption to daily activities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Anxiety about leaking and staining</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Iron deficiency anemia</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fatigue and low energy</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Financial burden from sanitary products</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sleep disturbances from nighttime leaking</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h2>
              <p className="mb-4">
                Consult a healthcare provider if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {whenToSeeDoctor.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Measure your flow</h2>
              <p className="mb-4">
                It can be helpful to track your period flow to determine if it\'s truly heavy and to monitor changes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Count how many sanitary products you use daily</li>
                <li>Note if you need to change products more often than the manufacturer recommends</li>
                <li>Record how often you need to get up at night to change products</li>
                <li>Use a period tracking app to log details about your flow</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">How are heavy periods diagnosed?</h2>
          <p className="mb-6">
            If you\'re experiencing heavy periods, your doctor may use several methods to determine the cause:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diagnosisTests.map((test, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">{test.name}</h3>
                <p className="mb-3">{test.description}</p>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm"><strong>What to expect:</strong> {test.what_to_expect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Treatment options for heavy periods</h2>
          <p className="mb-6">
            Treatment depends on the cause of your heavy bleeding, your age, overall health, and whether you want to have children in the future. Options include:
          </p>

          {treatments.map((category, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold text-[#d8157d] mb-4">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.options.map((option, optIndex) => (
                  <div key={optIndex} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-lg font-bold mb-2">{option.name}</h4>
                    <p className="mb-3">{option.description}</p>
                    <div className="bg-gray-50 p-3 rounded mb-2">
                      <p className="text-sm"><strong>Best for:</strong> {option.best_for}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm"><strong>How it works:</strong> {option.how_it_works}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#fdf2f8] rounded-lg p-8 border border-pink-100 mb-10">
          <h2 className="text-2xl font-bold mb-6">Self-care tips for managing heavy periods</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selfCareTips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-[#d8157d]">{tip.tip}</h3>
                <p>{tip.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
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

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">Living with heavy periods</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Emotional impact</h3>
              <p className="mb-4">
                Heavy periods can take an emotional toll, causing feelings of embarrassment, frustration, or isolation. Remember:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You\'re not alone – heavy periods are common</li>
                <li>Effective treatments are available</li>
                <li>Connecting with others who experience heavy periods can provide support</li>
                <li>Being open with healthcare providers about how heavy periods affect your life can help you get appropriate care</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Work and social life</h3>
              <p className="mb-4">
                Managing heavy periods at work or during social activities can be challenging. Consider these strategies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep extra sanitary products at work or in your bag</li>
                <li>Wear dark clothing on your heaviest days</li>
                <li>Use period underwear as backup protection</li>
                <li>Know the location of restrooms when going to unfamiliar places</li>
                <li>Time medications to manage symptoms during important events</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-[#fdf2f8] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Talk to your doctor</h3>
            <p>
              If heavy periods are affecting your quality of life, don\'t hesitate to speak with your healthcare provider. Many women don\'t realize that very heavy periods aren\'t something they just have to live with. There are effective treatments available that can help you manage your symptoms and improve your quality of life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeavyPeriodsPage;
