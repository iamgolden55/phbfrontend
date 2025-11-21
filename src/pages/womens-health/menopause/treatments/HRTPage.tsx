import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const HRTPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Menopause', url: '/womens-health/menopause' },
              { label: 'HRT', url: '/womens-health/menopause/treatments/hrt' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Hormone Replacement Therapy (HRT)</h1>
          <p className="text-xl font-medium">
            Understanding HRT for menopause - types, benefits, risks, and who can take it
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* What is HRT */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What is HRT?</h2>
              <p className="mb-4">
                Hormone replacement therapy (HRT) is a treatment to relieve symptoms of the menopause.
                It replaces hormones that are at a lower level as you approach the menopause.
              </p>
              <p className="mb-4">
                HRT can help relieve most menopausal symptoms, including hot flushes, night sweats,
                mood swings, vaginal dryness, and reduced sex drive.
              </p>
              <p>
                Many women find that HRT significantly improves their quality of life during the
                menopause transition.
              </p>
            </div>

            {/* Types of HRT */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of HRT</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Combined HRT</h3>
                  <p className="mb-2">
                    Contains both estrogen and progestogen. Recommended for women who still have
                    their womb (uterus), as estrogen alone can increase the risk of womb cancer.
                  </p>
                  <p className="text-sm text-gray-600">
                    Available as tablets, patches, gels, or sprays.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Estrogen-only HRT</h3>
                  <p className="mb-2">
                    Contains only estrogen. Usually prescribed for women who have had a hysterectomy
                    (removal of the womb).
                  </p>
                  <p className="text-sm text-gray-600">
                    Available as tablets, patches, gels, sprays, or implants.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Vaginal Estrogen</h3>
                  <p className="mb-2">
                    Low-dose estrogen applied directly to the vagina. Helps with vaginal dryness,
                    discomfort during sex, and urinary symptoms.
                  </p>
                  <p className="text-sm text-gray-600">
                    Available as creams, pessaries, or vaginal rings.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Continuous vs Cyclical</h3>
                  <p className="mb-2">
                    <strong>Cyclical HRT:</strong> Progestogen is taken for part of the month. May cause
                    monthly bleeding. Usually recommended if you're still having periods or in perimenopause.
                  </p>
                  <p>
                    <strong>Continuous HRT:</strong> Both hormones are taken every day without a break.
                    Usually recommended if you're postmenopausal (haven't had a period for a year).
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Benefits of HRT</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Symptom Relief</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reduces hot flushes and night sweats</li>
                    <li>Improves mood and reduces anxiety</li>
                    <li>Helps with sleep problems</li>
                    <li>Relieves vaginal dryness</li>
                    <li>Improves sex drive</li>
                    <li>Reduces joint and muscle pain</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Long-term Benefits</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Helps prevent osteoporosis (bone thinning)</li>
                    <li>May reduce risk of heart disease if started early</li>
                    <li>May reduce risk of bowel cancer</li>
                    <li>May help maintain cognitive function</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Risks */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risks and Side Effects</h2>

              <div className="bg-[#fdf2f8] p-4 rounded-lg mb-4">
                <p className="text-sm">
                  <strong>Important:</strong> For most women, the benefits of HRT outweigh the risks.
                  Your doctor will help you weigh up the pros and cons based on your individual circumstances.
                </p>
              </div>

              <h3 className="font-bold mb-3">Possible Risks</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Breast cancer:</strong> Combined HRT slightly increases the risk. The risk
                  returns to normal within a few years of stopping. Estrogen-only HRT has little or no
                  increased risk.
                </li>
                <li>
                  <strong>Blood clots:</strong> HRT tablets slightly increase the risk. Patches, gels,
                  and sprays do not increase this risk.
                </li>
                <li>
                  <strong>Stroke:</strong> Tablets slightly increase the risk. Patches and gels do not
                  increase this risk if used at standard doses.
                </li>
              </ul>

              <h3 className="font-bold mb-3">Common Side Effects</h3>
              <p className="mb-2">These usually settle within a few months:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Breast tenderness</li>
                <li>Headaches</li>
                <li>Feeling sick</li>
                <li>Indigestion</li>
                <li>Leg cramps</li>
                <li>Vaginal bleeding</li>
              </ul>
            </div>

            {/* Who can take HRT */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Who can take HRT?</h2>

              <p className="mb-4">
                Most women can take HRT if they're experiencing menopausal symptoms. However,
                it may not be suitable if you:
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Have a history of breast cancer, ovarian cancer, or womb cancer</li>
                <li>Have a history of blood clots</li>
                <li>Have untreated high blood pressure</li>
                <li>Have liver disease</li>
                <li>Are pregnant</li>
              </ul>

              <p>
                Your doctor will discuss your medical history and help you decide if HRT is right for you.
                There may be safer alternatives or different types of HRT that are more suitable.
              </p>
            </div>

            {/* Starting HRT */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Starting and Stopping HRT</h2>

              <h3 className="font-bold mb-3">Starting HRT</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Usually started at a low dose and gradually increased</li>
                <li>May take a few weeks to feel the full benefits</li>
                <li>Your doctor will review your HRT at least once a year</li>
                <li>Different types can be tried to find what works best for you</li>
              </ul>

              <h3 className="font-bold mb-3">Stopping HRT</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usually recommended to gradually reduce the dose</li>
                <li>Symptoms may return after stopping</li>
                <li>There's no limit on how long you can take HRT</li>
                <li>Benefits and risks should be reviewed regularly</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Talk to your GP</h3>
              <p className="mb-4">
                If you're considering HRT, speak to your GP. They can discuss your symptoms,
                medical history, and the best treatment options for you.
              </p>
              <p className="text-sm text-gray-600">
                You may also be referred to a menopause specialist if needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Other Treatments</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/womens-health/menopause/treatments/non-hormonal"
                    className="text-[#d8157d] hover:underline"
                  >
                    Non-hormonal treatments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/womens-health/menopause/treatments/lifestyle"
                    className="text-[#d8157d] hover:underline"
                  >
                    Lifestyle changes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/womens-health/menopause/treatments/complementary"
                    className="text-[#d8157d] hover:underline"
                  >
                    Complementary therapies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related Information</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/womens-health/menopause"
                    className="text-[#d8157d] hover:underline"
                  >
                    Menopause overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/womens-health/menopause/premature-menopause"
                    className="text-[#d8157d] hover:underline"
                  >
                    Premature menopause
                  </Link>
                </li>
                <li>
                  <Link
                    to="/womens-health"
                    className="text-[#d8157d] hover:underline"
                  >
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

export default HRTPage;
