import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const FertilityPage: React.FC = () => {
  const fertilityProblems = [
    {
      id: 'ovulation-disorders',
      title: 'Ovulation disorders',
      description: 'Problems with the release of an egg from the ovaries.',
      causes: [
        'Polycystic ovary syndrome (PCOS)',
        'Thyroid problems (overactive or underactive)',
        'Premature ovarian failure',
        'Excessive exercise',
        'Being significantly underweight or overweight'
      ],
      treatments: [
        'Medication to stimulate ovulation',
        'Lifestyle changes',
        'Treating underlying medical conditions',
        'Surgery in some cases of PCOS'
      ]
    },
    {
      id: 'tubal-damage',
      title: 'Fallopian tube damage or blockage',
      description: 'Damage or blockage prevents the egg from traveling down the tube to meet the sperm.',
      causes: [
        'Pelvic inflammatory disease (PID)',
        'Previous surgery in the abdomen or pelvis',
        'Endometriosis',
        'Previous ectopic pregnancy'
      ],
      treatments: [
        'Surgery to repair the tubes in some cases',
        'In vitro fertilization (IVF) to bypass the tubes'
      ]
    },
    {
      id: 'endometriosis',
      title: 'Endometriosis',
      description: 'A condition where tissue similar to the lining of the womb grows in other places, such as the ovaries and fallopian tubes.',
      causes: [
        'The exact cause is unknown',
        'May be linked to retrograde menstruation',
        'May have genetic factors'
      ],
      treatments: [
        'Medication to suppress endometriosis',
        'Surgery to remove endometriosis tissue',
        'Fertility treatments including IVF'
      ]
    },
    {
      id: 'uterine-fibroids',
      title: 'Uterine fibroids',
      description: 'Non-cancerous growths in or around the womb that can affect fertility depending on their size and location.',
      causes: [
        'Genetic factors',
        'Hormonal factors',
        'More common in women of African-Caribbean origin'
      ],
      treatments: [
        'Medication to shrink fibroids',
        'Surgery to remove fibroids',
        'Fertility treatments if necessary'
      ]
    },
    {
      id: 'unexplained-infertility',
      title: 'Unexplained infertility',
      description: 'When no specific cause is found for fertility problems.',
      causes: [
        'May involve subtle problems with egg quality, fertilization, or implantation',
        'May involve issues not detectable by current tests'
      ],
      treatments: [
        'Lifestyle changes',
        'Medication to stimulate ovulation',
        'Intrauterine insemination (IUI)',
        'In vitro fertilization (IVF)'
      ]
    }
  ];

  const fertilityTreatments = [
    {
      id: 'medication',
      title: 'Fertility medications',
      description: 'Medications used to regulate or stimulate ovulation.',
      details: 'These medications can help women who have ovulation disorders like PCOS or irregular periods. Common medications include clomiphene citrate, letrozole, and gonadotropins.',
      success_rate: 'Varies depending on the cause of infertility. For ovulation disorders, success rates can be as high as 80%.'
    },
    {
      id: 'surgery',
      title: 'Surgical procedures',
      description: 'Surgery to correct issues that may affect fertility.',
      details: 'Procedures may include laparoscopy to remove endometriosis or scar tissue, hysteroscopy to remove fibroids or polyps, or tubal surgery to repair damaged fallopian tubes.',
      success_rate: 'Depends on the type of surgery and the severity of the condition. May improve natural conception rates or improve success rates of other fertility treatments.'
    },
    {
      id: 'iui',
      title: 'Intrauterine insemination (IUI)',
      description: 'A procedure where sperm is placed directly into the uterus during ovulation.',
      details: 'IUI is often used for couples with mild male factor infertility, cervical issues, or unexplained infertility. It may be combined with fertility medications.',
      success_rate: 'About 5-20% per cycle, depending on the cause of infertility and the woman\'s age.'
    },
    {
      id: 'ivf',
      title: 'In vitro fertilization (IVF)',
      description: 'A process where eggs are fertilized by sperm outside the body, then transferred to the uterus.',
      details: 'IVF involves stimulating the ovaries, retrieving eggs, fertilizing them in a lab, and transferring embryos to the uterus. It can be used for many types of infertility including tubal damage, endometriosis, and unexplained infertility.',
      success_rate: 'About 20-35% per cycle for women under 35, decreasing with age. Success rates also depend on the cause of infertility and the clinic.'
    },
    {
      id: 'icsi',
      title: 'Intracytoplasmic sperm injection (ICSI)',
      description: 'A specialized form of IVF where a single sperm is injected directly into an egg.',
      details: 'ICSI is used for severe male factor infertility or when previous IVF cycles have failed due to fertilization problems.',
      success_rate: 'Similar to IVF, about 20-35% per cycle for women under 35, decreasing with age.'
    },
    {
      id: 'donor',
      title: 'Donor eggs, sperm, or embryos',
      description: 'Using donated eggs, sperm, or embryos when a couple cannot use their own.',
      details: 'These options may be used for women with premature ovarian failure, women over 40, men with no sperm production, or couples with genetic disorders.',
      success_rate: 'Using donor eggs can result in success rates of 40-50% per cycle, regardless of the recipient\'s age.'
    },
    {
      id: 'surrogacy',
      title: 'Surrogacy',
      description: 'When another woman carries a pregnancy for a couple.',
      details: 'Gestational surrogacy involves using the intended parents\' embryo (or donor embryo) that is transferred to the surrogate. Traditional surrogacy (using the surrogate\'s own egg) is less common.',
      success_rate: 'Depends on the age of the woman providing the eggs and the specific circumstances.'
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
              { label: 'Fertility', url: '/womens-health/fertility' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Fertility</h1>
          <p className="text-xl font-medium">
            Information about getting pregnant, fertility problems, and treatments
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About fertility</h2>
              <p className="mb-4">
                Fertility is the ability to conceive children. For women, fertility involves the ability to get pregnant, and for men, it's the ability to fertilize an egg. Fertility declines with age, especially for women after the age of 35.
              </p>
              <p className="mb-4">
                Fertility problems are common – around 1 in 7 couples may have difficulty conceiving. These problems can affect either the man or the woman, or sometimes both partners. In some cases, no cause is found.
              </p>
              <p>
                This page provides information about fertility, the causes of fertility problems, and treatments that may help.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Getting pregnant</h2>
              <p className="mb-4">
                To get pregnant naturally, the following needs to happen:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>A woman's ovary must release an egg (ovulation)</li>
                <li>The egg must travel down the fallopian tube</li>
                <li>A man's sperm must fertilize the egg</li>
                <li>The fertilized egg must attach to the lining of the womb (implantation)</li>
              </ul>
              <p className="mb-4">
                Problems with any of these steps can cause fertility issues. The most common causes of fertility problems in women include issues with ovulation, damage to the fallopian tubes, and endometriosis.
              </p>

              <div className="bg-[#fdf2f8] p-4 rounded-md mb-4">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">Improving your chances of getting pregnant</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Have regular sex (every 2-3 days) throughout your cycle</li>
                  <li>Maintain a healthy weight – being overweight or underweight can affect ovulation</li>
                  <li>Stop smoking – smoking can reduce fertility in both men and women</li>
                  <li>Limit alcohol consumption</li>
                  <li>Reduce caffeine intake</li>
                  <li>For men, avoid wearing tight underwear that can increase testicle temperature</li>
                </ul>
              </div>

              <p>
                The best time to get pregnant is during the 'fertile window' – the days leading up to and including ovulation. Ovulation usually happens about 14 days before your next period starts, but this can vary.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to get help</h3>
              <p className="mb-4">
                Consider seeking medical advice if:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You've been trying to get pregnant for more than a year</li>
                <li>You're 36 or over and have been trying for more than 6 months</li>
                <li>You have irregular or no periods</li>
                <li>You have painful periods</li>
                <li>You've had previous surgery to your abdomen or pelvis</li>
                <li>You or your partner have a known medical condition that can affect fertility</li>
              </ul>
              <p className="text-sm text-gray-600">
                Your GP can provide initial advice and may refer you to a specialist if needed.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Fertility and age</h3>
              <p className="mb-4">
                Age is an important factor in fertility:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Women under 30</span>
                    <p className="text-sm text-gray-600">Have about a 25% chance of getting pregnant in any single menstrual cycle</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Women aged 30-35</span>
                    <p className="text-sm text-gray-600">Fertility begins to decline slightly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Women aged 35-40</span>
                    <p className="text-sm text-gray-600">Fertility declines more significantly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Women over 40</span>
                    <p className="text-sm text-gray-600">Chance of natural conception is much lower</p>
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <Link
                  to="/womens-health/fertility/age-and-fertility"
                  className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                >
                  Learn more about age and fertility
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Common fertility problems</h2>
          <p className="mb-6">
            There are many possible causes of fertility problems in both men and women. Here are some common causes in women:
          </p>
          <div className="space-y-6">
            {fertilityProblems.map((problem) => (
              <div key={problem.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-2">{problem.title}</h3>
                <p className="mb-4">{problem.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Causes</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {problem.causes.map((cause, index) => (
                        <li key={index}>{cause}</li>
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
                    to={`/womens-health/fertility/problems/${problem.id}`}
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

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Fertility treatments</h2>
          <p className="mb-6">
            If you're having difficulty getting pregnant, there are various treatments that may help. The right treatment for you will depend on the cause of your fertility problems and your personal circumstances.
          </p>
          <div className="space-y-6">
            {fertilityTreatments.map((treatment) => (
              <div key={treatment.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-2">{treatment.title}</h3>
                <p className="mb-4">{treatment.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Details</h4>
                    <p>{treatment.details}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Success rates</h4>
                    <p>{treatment.success_rate}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/womens-health/fertility/treatments/${treatment.id}`}
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
          <h2 className="text-2xl font-bold mb-6">Support and resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Fertility services</h3>
              <p className="mb-4">
                The PHB offers fertility services to help people who are having difficulty conceiving. These may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Initial fertility assessments and tests</li>
                <li>Advice on lifestyle changes to improve fertility</li>
                <li>Treatment for underlying medical conditions</li>
                <li>Referral to a specialist fertility clinic for further treatment</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Eligibility for fertility treatment on the PHB varies depending on your local clinical commissioning group (CCG). Talk to your GP about what's available in your area.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Emotional support</h3>
              <p className="mb-4">
                Fertility problems can be emotionally challenging. It's important to look after your mental wellbeing during this time.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Talk to your partner, friends, or family about how you're feeling</li>
                <li>Join a support group for people with fertility problems</li>
                <li>Consider counseling or therapy</li>
                <li>Practice self-care and stress-reduction techniques</li>
              </ul>
              <Link
                to="/find-support/fertility"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
              >
                Find fertility support groups
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold mb-2">Fertility preservation</h3>
                <p className="mb-4">
                  If you're concerned about your future fertility, for example if you're about to have treatment that might affect it (such as chemotherapy), you may want to consider fertility preservation options like egg, sperm, or embryo freezing.
                </p>
                <p>
                  Talk to your GP or specialist about fertility preservation options that might be available to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilityPage;
