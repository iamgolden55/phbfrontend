import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const PrematureMenopausePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Menopause', url: '/womens-health/menopause' },
              { label: 'Premature menopause', url: '/womens-health/menopause/premature-menopause' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Premature Menopause</h1>
          <p className="text-xl font-medium">
            When menopause occurs before the age of 40, also known as premature ovarian insufficiency (POI)
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What is Premature Menopause?</h2>
              <p className="mb-4">
                Premature menopause, also called premature ovarian insufficiency (POI), is when
                menopause occurs before the age of 40. It affects about 1 in 100 women under 40,
                and 1 in 1,000 women under 30.
              </p>
              <p className="mb-4">
                In premature menopause, the ovaries stop working properly and stop producing normal
                levels of hormones, particularly estrogen. This can happen suddenly or develop
                gradually over time.
              </p>
              <p>
                Early menopause refers to menopause that occurs between ages 40 and 45, which
                affects about 5% of women.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Causes</h2>
              <p className="mb-4">
                In many cases, the cause of premature menopause is unknown. Known causes include:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical Treatments</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Surgery to remove the ovaries (oophorectomy)</li>
                    <li>Chemotherapy or radiotherapy to the pelvic area</li>
                    <li>Surgery to remove the womb (hysterectomy) - may cause earlier menopause</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Autoimmune Conditions</h3>
                  <p>
                    The immune system attacks the ovaries. More common in women with other autoimmune
                    conditions like thyroid disease, rheumatoid arthritis, or diabetes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Genetic Factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Family history of premature menopause</li>
                    <li>Chromosome abnormalities (e.g., Turner syndrome, Fragile X)</li>
                    <li>Certain genetic conditions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other Factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Viral infections (rarely)</li>
                    <li>Some enzyme deficiencies</li>
                    <li>Unknown causes (most common)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                Symptoms are similar to natural menopause but may be more sudden or severe:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Irregular or absent periods</li>
                  <li>Hot flushes and night sweats</li>
                  <li>Vaginal dryness</li>
                  <li>Sleep problems</li>
                  <li>Mood changes</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reduced sex drive</li>
                  <li>Difficulty concentrating</li>
                  <li>Fertility problems</li>
                  <li>Dry skin</li>
                  <li>Urinary symptoms</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">
                If you're experiencing symptoms of menopause under age 40, see your GP. They may:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ask about your symptoms and menstrual history</li>
                <li>Take blood tests to measure hormone levels (FSH, estrogen)</li>
                <li>Repeat tests 4-6 weeks later to confirm</li>
                <li>Test for underlying causes (autoimmune conditions, genetic factors)</li>
                <li>Refer you to a specialist for further assessment</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Health Implications</h2>
              <p className="mb-4">
                Premature menopause increases the risk of certain health conditions due to longer
                exposure to low estrogen levels:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Osteoporosis</h3>
                  <p>
                    Lower estrogen leads to faster bone loss, increasing fracture risk. Regular
                    bone density scans may be recommended.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Cardiovascular Disease</h3>
                  <p>
                    Earlier loss of estrogen's protective effects on the heart and blood vessels.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Cognitive Health</h3>
                  <p>
                    Some studies suggest a possible link with cognitive changes, though this is
                    still being researched.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Treatment aims to replace the hormones your body is no longer producing and
                protect against long-term health risks.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">HRT or Hormonal Contraception</h3>
                  <p className="mb-2">
                    Usually recommended until at least age 51 (average age of natural menopause).
                    Benefits generally outweigh risks for women with premature menopause.
                  </p>
                  <p>
                    The combined contraceptive pill can also be used if you need contraception.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Lifestyle Measures</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Regular weight-bearing exercise for bone health</li>
                    <li>Calcium and vitamin D supplements if needed</li>
                    <li>Healthy diet</li>
                    <li>Not smoking</li>
                    <li>Limiting alcohol</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Emotional Support</h3>
                  <p>
                    Premature menopause can be emotionally challenging. Counselling or support
                    groups can help you cope with the diagnosis and its implications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Fertility</h2>
              <p className="mb-4">
                Premature menopause significantly affects fertility, but options may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Egg donation and IVF</li>
                <li>Embryo donation</li>
                <li>Surrogacy</li>
                <li>Adoption</li>
              </ul>
              <p>
                In some cases, spontaneous pregnancy can occur as the ovaries occasionally release
                eggs unpredictably. Discuss contraception if you don't want to become pregnant.
              </p>
              <p className="mt-4">
                If you're hoping to have children, ask for a referral to a fertility specialist
                to discuss your options.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">See Your GP</h3>
              <p className="mb-4">
                If you're under 40 and experiencing menopausal symptoms or irregular periods,
                see your GP for assessment.
              </p>
              <p className="text-sm text-gray-600">
                Early diagnosis allows earlier treatment to protect your health.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Support Groups</h3>
              <p className="mb-4 text-sm">
                Connecting with others who understand what you're going through can help.
              </p>
              <p className="text-sm text-gray-600">
                Ask your doctor about local support groups or look for online communities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Treatment Options</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/menopause/treatments/hrt" className="text-[#d8157d] hover:underline">
                    Hormone replacement therapy (HRT)
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/menopause/treatments/lifestyle" className="text-[#d8157d] hover:underline">
                    Lifestyle changes
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility" className="text-[#d8157d] hover:underline">
                    Fertility information
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related Information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/menopause" className="text-[#d8157d] hover:underline">
                    Menopause overview
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/mental-health" className="text-[#d8157d] hover:underline">
                    Women's mental health
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health" className="text-[#d8157d] hover:underline">
                    Women's health
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrematureMenopausePage;
