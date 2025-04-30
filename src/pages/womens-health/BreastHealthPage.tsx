import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const BreastHealthPage: React.FC = () => {
  const breastConditions = [
    {
      id: 'breast-cancer',
      title: 'Breast cancer',
      description: 'Breast cancer occurs when abnormal cells in the breast grow in an uncontrolled way. It is the most common cancer in women in the UK.',
      symptoms: [
        'A new lump or area of thickened tissue in either breast that wasn\'t there before',
        'A change in the size or shape of one or both breasts',
        'A discharge of fluid from either of your nipples',
        'A lump or swelling in either of your armpits',
        'A change in the look or feel of your skin, such as puckering or dimpling, a rash or redness',
        'A rash (like eczema), crusting, scaly or itchy skin or redness on or around your nipple',
        'A change in the appearance of your nipple, such as becoming sunken into your breast'
      ],
      risk_factors: [
        'Getting older – 80% of breast cancers occur in women over 50',
        'Family history – having close relatives with breast cancer',
        'Previous breast cancer or non-cancerous breast conditions',
        'Dense breast tissue',
        'Exposure to estrogen (early periods, late menopause, HRT)',
        'Lifestyle factors (obesity, alcohol, lack of exercise)'
      ]
    },
    {
      id: 'benign-lumps',
      title: 'Benign breast lumps',
      description: 'Most breast lumps are benign (not cancerous). There are several types of benign breast lumps, including cysts, fibroadenomas, and areas of normal lumpiness that can occur due to hormonal changes.',
      symptoms: [
        'A smooth, rounded lump in the breast',
        'Lumps that move easily under the skin',
        'Breast pain or tenderness',
        'Lumps that change size with the menstrual cycle'
      ],
      risk_factors: [
        'Hormonal fluctuations',
        'Age (more common in women aged 35 to 50)',
        'Previous benign breast conditions'
      ]
    },
    {
      id: 'mastitis',
      title: 'Mastitis',
      description: 'Mastitis is inflammation of breast tissue that sometimes involves an infection. It most commonly affects women who are breastfeeding (lactation mastitis).',
      symptoms: [
        'Breast pain or tenderness',
        'Swelling of the breast',
        'Warmth or redness of the breast',
        'Fever and flu-like symptoms',
        'A wedge-shaped area of redness on the breast'
      ],
      risk_factors: [
        'Breastfeeding (especially in the first few weeks)',
        'A cracked or damaged nipple',
        'Poor drainage of milk',
        'Previous mastitis'
      ]
    },
    {
      id: 'breast-pain',
      title: 'Breast pain (mastalgia)',
      description: 'Breast pain is a common condition that affects most women at some point in their lives. The pain can be cyclical (related to the menstrual cycle) or non-cyclical.',
      symptoms: [
        'Pain in one or both breasts',
        'Dull, aching pain',
        'Pain that may spread to the armpit',
        'Pain that comes and goes with the menstrual cycle'
      ],
      risk_factors: [
        'Hormonal fluctuations',
        'Certain medications',
        'Breast size (larger breasts may cause more pain)',
        'Stress'
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
              { label: 'Breast health', url: '/womens-health/breast-health' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Breast health</h1>
          <p className="text-xl font-medium">
            Information about breast cancer screening, breast lumps, and other breast conditions
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About breast health</h2>
              <p className="mb-4">
                Taking care of your breast health is an important part of overall wellness for women. Being breast aware means knowing what your breasts normally look and feel like, so you can recognize any unusual changes and get them checked by a doctor.
              </p>
              <p className="mb-4">
                Most breast changes are not cancer. However, it's important to get any unusual changes checked, as finding breast cancer early gives the best chance of successful treatment.
              </p>
              <p>
                This page provides information about breast cancer screening, common breast conditions, and what to do if you notice a change in your breasts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Being breast aware</h2>
              <p className="mb-4">
                Being breast aware means getting to know how your breasts normally look and feel at different times of the month. This will help you recognize any unusual changes.
              </p>
              <div className="bg-[#fdf2f8] p-4 rounded-md mb-4">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">How to check your breasts</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Look at your breasts in the mirror with your arms by your side.</li>
                  <li>Raise your arms above your head and look for any changes in shape or size, or any skin changes or dimpling.</li>
                  <li>Feel your breasts while lying down, using the flat part of your fingers. Move your fingers in a circle around the breast, spiraling in towards the nipple.</li>
                  <li>Feel all parts of your breasts, including your armpits and up to your collarbone.</li>
                  <li>Repeat these checks regularly, ideally once a month, to become familiar with your breasts.</li>
                </ol>
              </div>
              <p className="text-sm text-gray-600">
                There is no right or wrong way to check your breasts, and you don't need any special training. Just get to know what is normal for you. Do this regularly - for example, when you're in the bath or shower, or when getting dressed.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h3>
              <p className="mb-4">
                See your doctor if you notice any of these changes in your breast:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>A new lump or area of thickened tissue</li>
                <li>A change in size or shape</li>
                <li>A change in skin texture (such as puckering or dimpling)</li>
                <li>A rash, redness, or crusting around the nipple</li>
                <li>Discharge from the nipple</li>
                <li>A nipple that's turned in (inverted)</li>
                <li>Pain in the breast or armpit that's there all or most of the time</li>
                <li>A swelling in the armpit or around the collarbone</li>
              </ul>
              <p className="text-sm text-gray-600">
                Most breast changes are not cancer, but it's important to get them checked as soon as possible. If it is cancer, finding it early gives the best chance of successful treatment.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Breast cancer risk factors</h3>
              <p className="mb-4">
                Several factors can increase your risk of developing breast cancer:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Age</strong> - risk increases with age</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Family history</strong> - having close relatives with breast cancer</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Previous breast cancer</strong> or non-cancerous breast conditions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Hormonal factors</strong> - early periods, late menopause, HRT</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Lifestyle factors</strong> - obesity, alcohol, lack of exercise</span>
                </li>
              </ul>
              <Link
                to="/womens-health/breast-health/risk-assessment"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center mt-4"
              >
                Assess your breast cancer risk
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Breast screening</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-bold mb-4 text-[#d8157d]">PHB Breast Screening Programme</h3>
            <p className="mb-4">
              Breast screening is a way of finding breast cancers early, when they're too small to see or feel. The PHB Breast Screening Programme invites all women aged 50 to 70 for breast screening every 3 years.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">What happens during breast screening?</h4>
                <p className="mb-4">
                  Breast screening involves having an X-ray (mammogram) of your breasts at a special clinic or mobile unit. The mammogram can detect small changes in breast tissue that may indicate cancer before it can be felt or noticed.
                </p>
                <p className="mb-2">
                  Each breast is placed in turn on the X-ray machine and gently but firmly compressed with a clear plate. Two images of each breast are taken, one from top to bottom and one from side to side.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Who is invited for breast screening?</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All women aged 50 to 70 are invited for breast screening every 3 years</li>
                  <li>You'll first be invited within 3 years of your 50th birthday</li>
                  <li>If you're over 70, you won't automatically be invited, but you can still request screening</li>
                  <li>Some women may be invited from age 47 as part of an ongoing trial</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/womens-health/breast-health/screening"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
              >
                Learn more about breast screening
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Common breast conditions</h2>
          <p className="mb-6">
            Most breast changes are not cancer. Here are some common breast conditions and their symptoms:
          </p>
          <div className="space-y-6">
            {breastConditions.map((condition) => (
              <div key={condition.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-2">{condition.title}</h3>
                <p className="mb-4">{condition.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Symptoms</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {condition.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Risk factors</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {condition.risk_factors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/womens-health/breast-health/${condition.id}`}
                    className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                  >
                    Learn more about {condition.title}
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
          <h2 className="text-2xl font-bold mb-6">Reducing your risk of breast cancer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Lifestyle changes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Maintain a healthy weight</span>
                    <p className="text-sm text-gray-600">Being overweight after menopause can increase your risk of breast cancer.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Exercise regularly</span>
                    <p className="text-sm text-gray-600">Regular physical activity can help reduce the risk of breast cancer.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Limit alcohol</span>
                    <p className="text-sm text-gray-600">Drinking alcohol increases the risk of breast cancer. The more you drink, the greater the risk.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Stop smoking</span>
                    <p className="text-sm text-gray-600">There is evidence that smoking may increase the risk of breast cancer.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Healthcare measures</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Attend breast screening</span>
                    <p className="text-sm text-gray-600">Regular breast screening can help find breast cancer early when it's most treatable.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Know your family history</span>
                    <p className="text-sm text-gray-600">If you have a strong family history of breast cancer, talk to your doctor about your risk.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Consider risks of HRT</span>
                    <p className="text-sm text-gray-600">Hormone replacement therapy can increase the risk of breast cancer. Discuss the risks and benefits with your doctor.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Breastfeed if possible</span>
                    <p className="text-sm text-gray-600">Breastfeeding may slightly reduce the risk of breast cancer.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold mb-2">Genetic testing for breast cancer risk</h3>
                <p className="mb-4">
                  If you have a strong family history of breast cancer, you may be eligible for genetic testing. This can identify whether you have inherited a gene mutation that increases your risk of breast cancer, such as BRCA1 or BRCA2.
                </p>
                <p className="mb-2">
                  Speak to your GP if you're concerned about your family history of breast cancer. They can refer you to a specialist genetic service if appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastHealthPage;
