import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const EndometriosisPage: React.FC = () => {
  const symptoms = [
    'Very painful periods (dysmenorrhea)',
    'Pelvic pain and cramping, which may begin before and extend several days into a menstrual period',
    'Pain with intercourse',
    'Pain with bowel movements or urination, especially during periods',
    'Excessive bleeding during periods (menorrhagia) or bleeding between periods',
    'Infertility',
    'Fatigue',
    'Diarrhea, constipation, bloating, or nausea, especially during menstrual periods'
  ];

  const riskFactors = [
    {
      factor: 'Never giving birth',
      description: 'Women who have never given birth are at higher risk of endometriosis.'
    },
    {
      factor: 'Earlier start of periods',
      description: 'Starting your period at an early age puts you at higher risk.'
    },
    {
      factor: 'Later menopause',
      description: 'Experiencing menopause at an older age increases your risk.'
    },
    {
      factor: 'Short menstrual cycles',
      description: 'Cycles shorter than 27 days with bleeding lasting longer than 7 days increases risk.'
    },
    {
      factor: 'Family history',
      description: 'If your mother, aunt, or sister has endometriosis, you\'re more likely to develop it.'
    },
    {
      factor: 'Low body mass index',
      description: 'Having a low BMI or body fat percentage can increase your risk.'
    },
    {
      factor: 'Reproductive tract abnormalities',
      description: 'Structural abnormalities of the reproductive tract can increase risk.'
    }
  ];

  const diagnosisTests = [
    {
      name: 'Pelvic exam',
      description: 'Your doctor will manually feel (palpate) areas in your pelvis for abnormalities, such as cysts on your reproductive organs or scars behind your uterus.',
      limitations: 'Small areas of endometriosis are often difficult to feel during a pelvic exam.'
    },
    {
      name: 'Ultrasound',
      description: 'A transducer, a device that uses high-frequency sound waves to create images of the inside of your body, is pressed against your abdomen or inserted into your vagina (transvaginal ultrasound).',
      limitations: 'Not effective at detecting small endometrial implants, but can identify cysts associated with endometriosis (endometriomas).'
    },
    {
      name: 'MRI',
      description: 'Magnetic resonance imaging (MRI) uses radio waves and a strong magnetic field to create detailed images of the organs and tissues within your body.',
      limitations: 'More expensive than ultrasound and primarily used for larger or deeper areas of endometriosis.'
    },
    {
      name: 'Laparoscopy',
      description: 'The only way to definitively diagnose endometriosis is through laparoscopy, a minimally invasive surgery that allows the surgeon to view inside your abdomen.',
      limitations: 'As a surgical procedure, it comes with risks, recovery time, and expense.'
    }
  ];

  const treatments = [
    {
      category: 'Pain medications',
      description: 'Over-the-counter pain medications such as nonsteroidal anti-inflammatory drugs (NSAIDs) may help with painful periods. These include ibuprofen (Advil, Motrin IB) and naproxen sodium (Aleve).',
      suitableFor: 'Mild to moderate pain; often used as first-line treatment.'
    },
    {
      category: 'Hormone therapy',
      description: 'Supplemental hormones can sometimes reduce or eliminate the pain of endometriosis. Hormone therapy helps your body regulate the monthly changes in hormones that promote the tissue growth that occurs when you have endometriosis.',
      options: [
        {
          name: 'Hormonal contraceptives',
          description: 'Birth control pills, patches, and vaginal rings can reduce or eliminate the pain of mild to moderate endometriosis by preventing the monthly buildup and breakdown of endometrial tissue.'
        },
        {
          name: 'Progestin therapy',
          description: 'Progestin-only contraceptives, such as the Depo-Provera injection, implant, or intrauterine device (IUD), can halt periods and the growth of endometrial implants.'
        },
        {
          name: 'Gonadotropin-releasing hormone (GnRH) agonists and antagonists',
          description: 'These medications block the production of ovarian-stimulating hormones, which prevents menstruation and creates an artificial menopause. This shrinks endometrial tissue.'
        },
        {
          name: 'Aromatase inhibitors',
          description: 'These medicines reduce estrogen production in the body, which can shrink endometrial implants.'
        }
      ],
      suitableFor: 'Varying degrees of severity; side effects and effectiveness vary by method.'
    },
    {
      category: 'Conservative surgery',
      description: 'Surgery to remove endometrial implants while preserving the uterus and ovaries. This is typically done via laparoscopy (minimally invasive surgery).',
      suitableFor: 'Women who want to become pregnant or those with severe pain despite medical treatment.'
    },
    {
      category: 'Hysterectomy with oophorectomy',
      description: 'Surgery to remove the uterus (hysterectomy) and ovaries (oophorectomy). This is considered a last resort for women who have not responded to other treatments.',
      suitableFor: 'Women with severe symptoms who have completed childbearing and have not found relief from other treatments.'
    }
  ];

  const selfCareTips = [
    {
      category: 'Managing pain',
      tips: [
        'Take warm baths',
        'Use a heating pad on your abdomen',
        'Practice relaxation techniques like deep breathing or meditation',
        'Try gentle exercises like walking or swimming',
        'Get regular exercise to help improve pain'
      ]
    },
    {
      category: 'Dietary changes',
      tips: [
        'Consider an anti-inflammatory diet rich in fruits, vegetables, and omega-3 fatty acids',
        'Reduce intake of red meat and processed foods',
        'Limit caffeine and alcohol, which can worsen pain',
        'Consider eliminating gluten if you have sensitivity',
        'Stay hydrated'
      ]
    },
    {
      category: 'Complementary approaches',
      tips: [
        'Acupuncture may help relieve pain',
        'Yoga and gentle stretching can help with pain management',
        'Mindfulness and stress-reduction techniques',
        'Massage therapy focused on pelvic pain',
        'Pelvic floor physical therapy can help with pain'
      ]
    }
  ];

  const supportResources = [
    {
      name: 'Endometriosis UK',
      description: 'Support network and information for people affected by endometriosis.',
      link: 'https://www.endometriosis-uk.org/'
    },
    {
      name: 'Endometriosis Association',
      description: 'International organization that provides support, education, and research.',
      link: 'https://endometriosisassn.org/'
    },
    {
      name: 'PHB Endometriosis Support Group',
      description: 'Connect with others who have endometriosis through our online forum.',
      link: '/support-groups/endometriosis'
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
              { label: 'Endometriosis', url: '/womens-health/periods/endometriosis' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Endometriosis</h1>
          <p className="text-xl font-medium">
            Information about endometriosis, its symptoms, diagnosis, and treatment options
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">What is endometriosis?</h2>
              <p className="mb-4">
                Endometriosis is a condition where tissue similar to the lining of the womb (endometrium) grows outside the uterus, commonly on the ovaries, fallopian tubes, and tissues lining the pelvis. In rare cases, it can grow beyond the pelvic region.
              </p>
              <p className="mb-4">
                This tissue acts like normal endometrial tissue — it thickens, breaks down, and bleeds with each menstrual cycle. However, because it has no way to exit the body, it becomes trapped. When endometriosis involves the ovaries, cysts called endometriomas may form. Surrounding tissue can become irritated, eventually developing scar tissue and adhesions.
              </p>
              <p>
                Endometriosis can cause pain, sometimes severe, especially during menstrual periods. It can also lead to fertility problems. Fortunately, effective treatments are available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Symptoms of endometriosis</h2>
              <p className="mb-6">
                The primary symptom of endometriosis is pelvic pain, often associated with menstrual periods. Although many women experience cramping during their periods, women with endometriosis typically describe menstrual pain that's far worse than usual. Common signs and symptoms include:
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
                  <strong>Important:</strong> The severity of pain isn't necessarily a reliable indicator of the extent or stage of the condition. Some women with mild endometriosis have intense pain, while others with severe endometriosis may have little pain or even no pain at all.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">How common is endometriosis?</h2>
              <p className="mb-4">
                Endometriosis affects approximately 1 in 10 women of reproductive age worldwide. It's estimated that around 190 million women globally have this condition.
              </p>
              <p>
                Despite being one of the most common gynecological conditions, it's often undiagnosed or misdiagnosed. On average, it takes 7-10 years from the onset of symptoms to receive a definitive diagnosis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h2>
              <p className="mb-4">
                See your doctor if you have:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Severe menstrual pain that affects your quality of life</li>
                <li>Pain during intercourse</li>
                <li>Painful urination or bowel movements during periods</li>
                <li>Heavy periods or bleeding between periods</li>
                <li>Difficulty getting pregnant</li>
                <li>Pelvic pain that doesn't go away</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Risk factors</h2>
              <p className="mb-4">
                Several factors may place you at greater risk of developing endometriosis:
              </p>
              <ul className="space-y-3">
                {riskFactors.map((factor, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-bold text-[#d8157d] block">{factor.factor}</span>
                    <p className="text-sm">{factor.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">How is endometriosis diagnosed?</h2>
          <p className="mb-6">
            Diagnosing endometriosis can be challenging because symptoms vary widely and can resemble other conditions. Your doctor may use the following methods:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diagnosisTests.map((test, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">{test.name}</h3>
                <p className="mb-3">{test.description}</p>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm"><strong>Limitations:</strong> {test.limitations}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#fdf2f8] p-4 rounded-md">
            <p>
              The stage of endometriosis (I to IV, minimal to severe) depends on factors including location, extent, and depth of growths, presence of cysts, and severity of adhesions. However, the stage doesn't necessarily correlate with symptoms — a person with Stage I might have severe pain, while someone with Stage IV might have minimal symptoms.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Treatment options</h2>
          <p className="mb-6">
            Treatment for endometriosis usually involves medication, surgery, or both. The approach depends on the severity of your symptoms, whether you want to become pregnant, and how extensive the endometriosis is.
          </p>

          {treatments.map((treatment, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold text-[#d8157d] mb-4">{treatment.category}</h3>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
                <p className="mb-3">{treatment.description}</p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm"><strong>Suitable for:</strong> {treatment.suitableFor}</p>
                </div>
              </div>

              {treatment.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-6">
                  {treatment.options.map((option, optIndex) => (
                    <div key={optIndex} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-lg font-bold mb-2">{option.name}</h4>
                      <p>{option.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#fdf2f8] rounded-lg p-8 border border-pink-100 mb-10">
          <h2 className="text-2xl font-bold mb-6">Living with endometriosis</h2>
          <p className="mb-6">
            In addition to medical treatments, many women find relief through self-care measures and lifestyle changes.
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
          <h2 className="text-2xl font-bold mb-6">Endometriosis and fertility</h2>
          <p className="mb-4">
            Endometriosis can affect fertility in several ways, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Damaging or blocking the fallopian tubes</li>
            <li>Altering egg quality</li>
            <li>Affecting implantation of a fertilized egg</li>
            <li>Causing inflammation that can impact the function of the ovaries, eggs, fallopian tubes, or uterus</li>
            <li>Creating hormonal imbalances that may interfere with ovulation</li>
          </ul>
          <p className="mb-4">
            If you have endometriosis and are trying to become pregnant, it's important to consult with a reproductive endocrinologist. Treatment options for endometriosis-related infertility include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Surgery to remove endometrial tissue</li>
            <li>Fertility treatments, including medication to stimulate ovulation</li>
            <li>Assisted reproductive technologies, such as intrauterine insemination (IUI) or in vitro fertilization (IVF)</li>
          </ul>
          <p>
            Many women with endometriosis can and do become pregnant naturally or with assistance. The likelihood depends on the severity of the condition, age, and other fertility factors.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Finding support</h2>
          <p className="mb-6">
            Living with endometriosis can be challenging both physically and emotionally. Finding support can make a significant difference to your wellbeing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportResources.map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-2 text-[#d8157d]">{resource.name}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                >
                  Visit website
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
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

export default EndometriosisPage;
