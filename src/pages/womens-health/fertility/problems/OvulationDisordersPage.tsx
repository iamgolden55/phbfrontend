import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const OvulationDisordersPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Ovulation disorders', url: '/womens-health/fertility/problems/ovulation-disorders' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Ovulation Disorders</h1>
          <p className="text-xl font-medium">
            Problems with ovulation are the most common cause of female infertility
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About ovulation disorders</h2>
              <p className="mb-4">
                Ovulation disorders account for about 25% of female infertility cases. They occur
                when a woman doesn't ovulate (release an egg) regularly or at all.
              </p>
              <p>
                Without ovulation, there's no egg available for fertilisation, making pregnancy
                impossible during that cycle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of ovulation disorders</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Polycystic ovary syndrome (PCOS)</h3>
                  <p className="mb-2">
                    The most common cause of anovulation. PCOS causes hormonal imbalances that
                    prevent regular ovulation. Affects about 1 in 10 women in the UK.
                  </p>
                  <p className="text-sm text-gray-600">
                    Symptoms include irregular periods, excess hair growth, acne, and weight gain.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Hypothalamic dysfunction</h3>
                  <p className="mb-2">
                    The hypothalamus controls hormones that trigger ovulation. Dysfunction can
                    be caused by:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Excessive physical or emotional stress</li>
                    <li>Very high or very low body weight</li>
                    <li>Recent significant weight loss or gain</li>
                    <li>Excessive exercise</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Premature ovarian insufficiency (POI)</h3>
                  <p className="mb-2">
                    Also called premature ovarian failure. The ovaries stop working normally
                    before age 40. This results in reduced egg quantity and quality.
                  </p>
                  <p className="text-sm text-gray-600">
                    Causes include genetic factors, autoimmune disease, and cancer treatment.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Hyperprolactinaemia</h3>
                  <p className="mb-2">
                    High levels of prolactin (the hormone that stimulates milk production) can
                    suppress ovulation. May be caused by a pituitary gland tumour (usually benign)
                    or certain medications.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Thyroid disorders</h3>
                  <p className="mb-2">
                    Both overactive (hyperthyroidism) and underactive (hypothyroidism) thyroid
                    can affect ovulation and menstrual regularity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Signs and symptoms</h2>
              <p className="mb-4">
                The main sign of an ovulation disorder is irregular or absent periods:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Periods that occur more than 35 days apart</li>
                <li>Periods that occur less than 21 days apart</li>
                <li>Absent periods (amenorrhoea)</li>
                <li>Very light or very heavy bleeding</li>
                <li>Lack of premenstrual symptoms (breast tenderness, bloating)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">
                Your GP or fertility specialist may use the following tests:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Blood tests</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Progesterone:</strong> Measured on day 21 of your cycle to confirm ovulation</li>
                    <li><strong>FSH and LH:</strong> Measured on days 2-5 to assess ovarian function</li>
                    <li><strong>Prolactin:</strong> To check for hyperprolactinaemia</li>
                    <li><strong>Thyroid function:</strong> TSH and T4 levels</li>
                    <li><strong>Testosterone:</strong> Elevated in PCOS</li>
                    <li><strong>AMH:</strong> To assess ovarian reserve</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Ultrasound scan</h3>
                  <p>
                    A transvaginal ultrasound can visualise the ovaries and check for polycystic
                    ovaries (multiple small follicles) or other abnormalities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Treatment depends on the underlying cause:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Lifestyle changes</h3>
                  <p className="mb-2">
                    May be sufficient for some women, particularly those with PCOS or
                    hypothalamic dysfunction:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Achieving a healthy BMI (18.5-24.9)</li>
                    <li>Regular moderate exercise</li>
                    <li>Reducing excessive exercise if applicable</li>
                    <li>Stress management</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Ovulation induction medications</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Clomifene citrate:</strong> First-line treatment for PCOS, taken for 5 days at the start of your cycle</li>
                    <li><strong>Letrozole:</strong> Alternative to clomifene, may be more effective for some women with PCOS</li>
                    <li><strong>Metformin:</strong> May be used alongside clomifene for women with PCOS</li>
                    <li><strong>Gonadotrophins:</strong> Injections of FSH/LH if tablets don't work</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Treatment for specific conditions</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Thyroid medication:</strong> To correct thyroid imbalances</li>
                    <li><strong>Dopamine agonists:</strong> For hyperprolactinaemia</li>
                    <li><strong>Laparoscopic ovarian drilling:</strong> For PCOS not responding to medication</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Assisted reproduction</h3>
                  <p>
                    If medications don't result in pregnancy, IUI or IVF may be recommended.
                    For POI, donor eggs may be necessary.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Success rates</h2>
              <p className="mb-4">
                Success rates for ovulation induction vary depending on the cause:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With clomifene, about 70-80% of women with PCOS will ovulate</li>
                <li>Of those who ovulate, about 30-40% will become pregnant over 6 cycles</li>
                <li>Multiple pregnancies occur in about 10% of clomifene cycles</li>
                <li>Success is highest in younger women and when no other fertility factors exist</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Source: NICE Fertility Guidelines CG156
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">See your GP if</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your periods are irregular or absent</li>
                <li>You've been trying to conceive for 12 months (or 6 months if over 35)</li>
                <li>You have PCOS symptoms</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related conditions</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/periods/pcos" className="text-[#d8157d] hover:underline">
                    Polycystic ovary syndrome
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/menopause/premature-menopause" className="text-[#d8157d] hover:underline">
                    Premature ovarian insufficiency
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/periods/irregular-periods" className="text-[#d8157d] hover:underline">
                    Irregular periods
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Treatment options</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/fertility/treatments/medication" className="text-[#d8157d] hover:underline">
                    Fertility medications
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/iui" className="text-[#d8157d] hover:underline">
                    IUI
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>NICE Fertility Guidelines (CG156)</li>
                <li>Royal College of Obstetricians and Gynaecologists</li>
                <li>British Fertility Society</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvulationDisordersPage;
