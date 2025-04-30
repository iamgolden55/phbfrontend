import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const IrregularPeriodsPage: React.FC = () => {
  const possibleCauses = [
    {
      title: 'Hormonal imbalances',
      description: 'Changes in hormone levels can affect your menstrual cycle, especially estrogen and progesterone which regulate ovulation and menstruation.',
      examples: [
        'Polycystic ovary syndrome (PCOS)',
        'Thyroid disorders (hypothyroidism or hyperthyroidism)',
        'Primary ovarian insufficiency',
        'Hyperprolactinemia (high prolactin levels)'
      ]
    },
    {
      title: 'Lifestyle factors',
      description: 'Your daily habits and lifestyle can impact your menstrual cycle.',
      examples: [
        'Significant weight loss or gain',
        'Extreme exercise (such as in professional athletes)',
        'High stress levels',
        'Poor nutrition or eating disorders',
        'Travel and time zone changes',
        'Shift work that affects sleep patterns'
      ]
    },
    {
      title: 'Reproductive conditions',
      description: 'Various conditions affecting the reproductive system can disrupt your menstrual cycle.',
      examples: [
        'Endometriosis',
        'Uterine fibroids or polyps',
        'Pelvic inflammatory disease (PID)',
        'Adenomyosis'
      ]
    },
    {
      title: 'Medications and contraceptives',
      description: 'Some medications and contraceptive methods can cause menstrual irregularities.',
      examples: [
        'Hormonal contraceptives (when starting or stopping)',
        'Some antipsychotics and antidepressants',
        'Blood thinners',
        'Chemotherapy drugs',
        'Some anti-inflammatory medications'
      ]
    },
    {
      title: 'Age-related factors',
      description: 'Your age and stage of reproductive life can affect your menstrual regularity.',
      examples: [
        'Puberty (first few years of periods)',
        'Perimenopause (years leading up to menopause)',
        'Postpartum period (after childbirth)',
        'Breastfeeding'
      ]
    },
    {
      title: 'Other medical conditions',
      description: 'Conditions not directly related to the reproductive system can also affect your periods.',
      examples: [
        'Diabetes',
        'Celiac disease',
        'Uncontrolled diabetes',
        'Cushing syndrome',
        'Congenital adrenal hyperplasia',
        'Chronic liver or kidney disease'
      ]
    }
  ];

  const diagnosisTests = [
    {
      name: 'Physical examination',
      description: 'Your doctor will perform a complete physical exam, including a pelvic examination to check for any visible abnormalities in your reproductive organs.',
      preparation: 'None specific, but it\'s helpful to track your menstrual cycles before your appointment.'
    },
    {
      name: 'Blood tests',
      description: 'Blood tests can check hormone levels, including thyroid hormones, prolactin, androgens (male hormones which can be elevated in PCOS), and other reproductive hormones.',
      preparation: 'Some hormone tests need to be done on specific days of your menstrual cycle. Your doctor will advise when to schedule these tests.'
    },
    {
      name: 'Ultrasound',
      description: 'A pelvic ultrasound can visualize your reproductive organs to check for structural abnormalities like fibroids, polyps, or ovarian cysts.',
      preparation: 'For a transabdominal ultrasound, you may need a full bladder. For a transvaginal ultrasound, no special preparation is needed.'
    },
    {
      name: 'Endometrial biopsy',
      description: 'A small sample of your endometrium (the lining of your uterus) is taken to check for abnormal cells or hormonal effects on the uterine lining.',
      preparation: 'Usually scheduled when you\'re not menstruating. You may be advised to take pain relievers before the procedure.'
    },
    {
      name: 'Hysteroscopy',
      description: 'A thin, lighted camera is inserted through your cervix to examine the inside of your uterus for fibroids, polyps, or other abnormalities.',
      preparation: 'Usually done when you\'re not menstruating. You may need to avoid eating or drinking for a certain period before if anesthesia will be used.'
    },
    {
      name: 'MRI scan',
      description: 'In some cases, magnetic resonance imaging may be used to get detailed images of your reproductive organs.',
      preparation: 'You\'ll need to remove all metal objects. Inform your doctor if you have any implanted metal devices.'
    }
  ];

  const treatments = [
    {
      category: 'Lifestyle changes',
      options: [
        {
          name: 'Maintaining a healthy weight',
          description: 'Being significantly underweight or overweight can disrupt hormone balance and affect menstrual regularity. Achieving and maintaining a healthy weight through balanced diet and regular exercise can help regulate periods.'
        },
        {
          name: 'Regular exercise',
          description: 'Moderate, regular exercise can help regulate hormones and reduce stress. However, excessive exercise can disrupt your cycle, so balance is key.'
        },
        {
          name: 'Stress management',
          description: 'Chronic stress can affect hormone levels and disrupt your menstrual cycle. Techniques like meditation, yoga, deep breathing, or talking to a therapist can help manage stress.'
        },
        {
          name: 'Healthy sleep habits',
          description: 'Poor sleep can affect hormone regulation. Aim for 7-9 hours of quality sleep per night and try to maintain a consistent sleep schedule.'
        }
      ]
    },
    {
      category: 'Medical treatments',
      options: [
        {
          name: 'Hormonal contraceptives',
          description: 'Birth control pills, patches, vaginal rings, or hormonal IUDs can help regulate menstrual cycles by providing consistent hormone levels. They\'re often prescribed for irregular periods, even if contraception isn\'t needed.'
        },
        {
          name: 'Progestin therapy',
          description: 'Taking progestin for 10-14 days each month can help trigger menstrual periods and make them more regular. This is often used when estrogen therapy isn\'t appropriate.'
        },
        {
          name: 'Treating underlying conditions',
          description: 'If your irregular periods are caused by a condition like PCOS, thyroid disorders, or endometriosis, treating the underlying condition can help regulate your cycle.'
        },
        {
          name: 'Metformin',
          description: 'This diabetes medication can help improve insulin resistance, which may help regulate menstrual cycles in women with PCOS.'
        }
      ]
    },
    {
      category: 'Surgical options',
      options: [
        {
          name: 'Endometrial ablation',
          description: 'This procedure destroys the uterine lining, which can reduce or stop menstrual bleeding. It\'s usually only considered for women who don\'t want future pregnancies.'
        },
        {
          name: 'Removal of polyps or fibroids',
          description: 'If irregular bleeding is caused by uterine polyps or fibroids, surgical removal may help regulate periods.'
        },
        {
          name: 'Hysterectomy',
          description: 'Removal of the uterus is a permanent solution that ends menstruation completely. It\'s typically only considered when other treatments haven\'t worked and for women who don\'t want future pregnancies.'
        }
      ]
    }
  ];

  const whenToSeeDoctor = [
    'Your periods suddenly become irregular after having been regular',
    'You go more than 90 days without a period (and aren\'t pregnant, breastfeeding, or in menopause)',
    'Your periods become very heavy or painful',
    'You bleed between periods or after sex',
    'Your periods last more than 7 days',
    'You have post-menopausal bleeding (bleeding after you\'ve been without a period for 12 months or more)',
    'You experience severe symptoms that interfere with daily life'
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
              { label: 'Irregular periods', url: '/womens-health/periods/irregular-periods' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Irregular periods</h1>
          <p className="text-xl font-medium">
            Information about irregular menstrual cycles, their causes, and treatment options
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About irregular periods</h2>
              <p className="mb-4">
                Irregular periods are menstrual cycles that vary significantly in length, or when the time between periods keeps changing. While some variation is normal, consistently irregular periods may indicate an underlying health issue.
              </p>
              <p className="mb-4">
                A normal menstrual cycle typically lasts 21 to 35 days, measured from the first day of one period to the first day of the next. Periods are considered irregular when they:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Come more frequently than 21 days apart</li>
                <li>Occur more than 35 days apart</li>
                <li>Vary significantly in length from month to month</li>
                <li>Skip months entirely (oligomenorrhea)</li>
                <li>Are absent for 3 months or more (amenorrhea, if you're not pregnant)</li>
                <li>Have unpredictable timing</li>
              </ul>
              <p>
                It's common for teenagers to have irregular periods for the first few years after menstruation begins, and for women approaching menopause to experience changes in their cycle. However, irregular periods at other times may need medical attention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-6">Possible causes of irregular periods</h2>
              <div className="space-y-6">
                {possibleCauses.map((cause, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold text-[#d8157d] mb-2">{cause.title}</h3>
                    <p className="mb-3">{cause.description}</p>
                    <h4 className="font-bold mb-1">Examples include:</h4>
                    <ul className="list-disc pl-6">
                      {cause.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Is my period irregular?</h2>
              <p className="mb-4">
                You may have irregular periods if:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>The time between your periods keeps changing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You regularly go more than 35 days between periods</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Your periods come less than 21 days apart</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You occasionally skip periods (when not pregnant)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>The number of days your period lasts changes significantly</span>
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

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Track your periods</h2>
              <p className="mb-4">
                Keeping a record of your menstrual cycles can help identify patterns and provide valuable information for your healthcare provider.
              </p>
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

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">How irregular periods are diagnosed</h2>
          <p className="mb-6">
            If you're experiencing irregular periods, your doctor may perform several tests to determine the cause. These may include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diagnosisTests.map((test, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">{test.name}</h3>
                <p className="mb-3">{test.description}</p>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm"><strong>Preparation:</strong> {test.preparation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Treatment options for irregular periods</h2>

          {treatments.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <h3 className="text-xl font-bold text-[#d8157d] mb-4">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.options.map((option, optIndex) => (
                  <div key={optIndex} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-lg font-bold mb-2">{option.name}</h4>
                    <p>{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#fdf2f8] rounded-lg p-8 border border-pink-100">
          <h2 className="text-2xl font-bold mb-6">Living with irregular periods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Be prepared</h3>
              <p className="mb-4">
                When your periods are unpredictable:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Keep period products in multiple locations (purse, car, workplace)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Consider wearing period underwear as backup on days you might start</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Use a period tracking app to note symptoms that might indicate your period is coming</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Emotional wellbeing</h3>
              <p className="mb-4">
                Managing the impact on mental health:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Practice self-compassion when dealing with unpredictable cycles</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Consider joining support groups for conditions like PCOS if relevant</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Communicate with partners, family, or friends about how irregular periods affect you</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Fertility awareness</h3>
              <p className="mb-4">
                If planning pregnancy or using fertility awareness methods:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Track additional fertility signs like basal body temperature and cervical mucus</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Consider using ovulation predictor kits to help identify fertile windows</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Consult with a fertility specialist if trying to conceive with irregular cycles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrregularPeriodsPage;
