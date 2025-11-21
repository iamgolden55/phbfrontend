import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const MedicationPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Fertility medications', url: '/womens-health/fertility/treatments/medication' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Fertility Medications</h1>
          <p className="text-xl font-medium">
            Medications used to stimulate ovulation and improve fertility
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About fertility medications</h2>
              <p className="mb-4">
                Fertility medications are drugs that stimulate or regulate ovulation. They're
                often the first line of treatment for women who don't ovulate regularly or
                who have unexplained infertility.
              </p>
              <p>
                These medications may be used alone or as part of IUI or IVF treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Clomifene citrate (Clomid)</h2>
              <p className="mb-4">
                Clomifene is usually the first medication tried for ovulation problems.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">How it works</h3>
                  <p>
                    Blocks estrogen receptors in the brain, causing the pituitary gland to
                    release more FSH and LH, which stimulates the ovaries to produce eggs.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">How it's taken</h3>
                  <p>
                    Tablets taken for 5 days at the start of your cycle (usually days 2-6).
                    Treatment is typically for 6 cycles maximum.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Success rates</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>70-80% of women with PCOS will ovulate</li>
                    <li>About 30-40% will become pregnant over 6 cycles</li>
                    <li>10% chance of twins</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Side effects</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Hot flushes</li>
                    <li>Mood swings</li>
                    <li>Headaches</li>
                    <li>Breast tenderness</li>
                    <li>Visual disturbances (rare - stop medication if this occurs)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Letrozole</h2>
              <p className="mb-4">
                Originally a breast cancer drug, letrozole is now commonly used for ovulation
                induction, particularly in women with PCOS.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">How it works</h3>
                  <p>
                    Blocks estrogen production, causing the pituitary to release more FSH.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Advantages over clomifene</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>May have higher pregnancy rates in PCOS</li>
                    <li>Lower risk of multiple pregnancy</li>
                    <li>Doesn't thin the uterine lining</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Side effects</h3>
                  <p>
                    Similar to clomifene: hot flushes, headaches, fatigue.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Gonadotrophins</h2>
              <p className="mb-4">
                Injectable hormones (FSH and/or LH) that directly stimulate the ovaries.
                Used when tablets haven't worked or for IVF.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Types</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>FSH:</strong> Gonal-F, Puregon, Fostimon</li>
                    <li><strong>LH + FSH:</strong> Menopur, Pergoveris</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">How they're used</h3>
                  <p>
                    Daily injections (subcutaneous) with close monitoring via ultrasound
                    and blood tests to check follicle development.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Risks</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Higher risk of multiple pregnancy (20-30% twins)</li>
                    <li>Ovarian hyperstimulation syndrome (OHSS)</li>
                    <li>Requires frequent monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Other medications</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Metformin</h3>
                  <p>
                    Used alongside clomifene for women with PCOS. Helps regulate insulin
                    and may improve ovulation rates.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">hCG trigger injection</h3>
                  <p>
                    Given to trigger ovulation once follicles are mature. Used with timed
                    intercourse, IUI, or IVF egg collection.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Progesterone</h3>
                  <p>
                    May be given after ovulation to support the uterine lining (luteal phase support).
                    Commonly used in IVF cycles.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">GnRH agonists/antagonists</h3>
                  <p>
                    Used in IVF cycles to prevent premature ovulation and control the timing
                    of egg collection.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Monitoring during treatment</h2>
              <p className="mb-4">
                Monitoring is important to check response and reduce risks:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ultrasound scans:</strong> To count and measure developing follicles</li>
                <li><strong>Blood tests:</strong> To measure hormone levels (estradiol, LH)</li>
                <li><strong>Dose adjustments:</strong> Based on response</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                If too many follicles develop, the cycle may be cancelled to prevent multiple pregnancy.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-600">OHSS warning signs</h3>
              <p className="mb-4 text-sm">
                Ovarian hyperstimulation syndrome can be serious. Seek medical help if you experience:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Severe abdominal pain or bloating</li>
                <li>Nausea and vomiting</li>
                <li>Shortness of breath</li>
                <li>Reduced urine output</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Multiple pregnancy</h3>
              <p className="text-sm">
                Fertility medications increase the risk of twins or triplets.
                Multiple pregnancies carry higher risks for mother and babies.
                Careful monitoring helps minimise this risk.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related treatments</h3>
              <ul className="space-y-3">
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
                <li>
                  <Link to="/womens-health/fertility/problems/ovulation-disorders" className="text-[#d8157d] hover:underline">
                    Ovulation disorders
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>Cochrane Reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationPage;
