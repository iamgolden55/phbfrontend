import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const UterineFibroidsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Uterine fibroids', url: '/womens-health/fertility/problems/uterine-fibroids' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Uterine Fibroids and Fertility</h1>
          <p className="text-xl font-medium">
            How fibroids can affect your ability to conceive and treatment options
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About fibroids and fertility</h2>
              <p className="mb-4">
                Uterine fibroids are non-cancerous growths in or around the uterus. They're very
                common, particularly in women of African descent, affecting up to 70-80% of women
                by age 50. Fibroids are especially prevalent in Nigerian women.
              </p>
              <p>
                While many women with fibroids conceive and have healthy pregnancies, fibroids
                can sometimes cause fertility problems depending on their size and location.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of fibroids</h2>
              <p className="mb-4">
                The effect on fertility depends largely on the location of the fibroid:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Submucosal fibroids</h3>
                  <p>
                    Grow into the uterine cavity. These have the greatest impact on fertility as
                    they can prevent implantation or cause miscarriage. They affect only 5-10% of
                    fibroids but are the most important to treat for fertility.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Intramural fibroids</h3>
                  <p>
                    Grow within the muscular wall of the uterus. Large intramural fibroids
                    (over 4-5cm) may affect fertility by distorting the uterine cavity or
                    affecting blood supply to the lining.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Subserosal fibroids</h3>
                  <p>
                    Grow on the outer surface of the uterus. These generally don't affect
                    fertility unless they're very large or located near the fallopian tubes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How fibroids affect fertility</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Interference with implantation</h3>
                  <p>
                    Submucosal fibroids can distort the uterine cavity, making it difficult for
                    an embryo to implant in the uterine lining.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Blocked fallopian tubes</h3>
                  <p>
                    Large fibroids near the tubes can compress or block them, preventing the
                    egg and sperm from meeting.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Altered blood supply</h3>
                  <p>
                    Fibroids may affect blood flow to the endometrium, impacting implantation.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Increased miscarriage risk</h3>
                  <p>
                    Submucosal and large intramural fibroids may increase the risk of miscarriage.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Studies suggest fibroids are the sole cause of infertility in only 2-3% of cases,
                but they may contribute to infertility in up to 10% of cases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Ultrasound</h3>
                  <p>
                    Transvaginal or abdominal ultrasound can identify fibroids and their location.
                    This is usually the first test performed.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Saline infusion sonography (SIS)</h3>
                  <p>
                    Saline is injected into the uterus during ultrasound to better visualise
                    submucosal fibroids and their impact on the uterine cavity.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Hysteroscopy</h3>
                  <p>
                    A camera inserted through the cervix allows direct visualisation of the
                    uterine cavity and any submucosal fibroids.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">MRI</h3>
                  <p>
                    May be used to map multiple fibroids before surgery or for complex cases.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment for fertility</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">No treatment needed</h3>
                  <p>
                    Many women with small fibroids that don't distort the cavity can conceive
                    without treatment. Your doctor may recommend trying naturally first.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Myomectomy</h3>
                  <p className="mb-2">
                    Surgical removal of fibroids while preserving the uterus. This is the
                    main treatment for fibroids affecting fertility.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Hysteroscopic:</strong> For submucosal fibroids, done through the vagina</li>
                    <li><strong>Laparoscopic:</strong> For subserosal/intramural fibroids, through small incisions</li>
                    <li><strong>Open (abdominal):</strong> For large or multiple fibroids</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    After myomectomy, pregnancy rates improve to 40-60% in previously infertile women.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical treatment</h3>
                  <p>
                    GnRH agonists can temporarily shrink fibroids before surgery. However,
                    medical treatments are not used when trying to conceive as they prevent
                    ovulation.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">IVF</h3>
                  <p>
                    May be recommended if fibroids are not causing significant uterine cavity
                    distortion, or after myomectomy if other fertility factors exist.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-md border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">Important note</h4>
                <p className="text-sm text-yellow-700">
                  Uterine artery embolisation (UAE) and focused ultrasound surgery are not
                  recommended for women who want to become pregnant, as they may affect
                  fertility and pregnancy outcomes.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Fibroids during pregnancy</h2>
              <p className="mb-4">
                Many women with fibroids have uncomplicated pregnancies, but fibroids may:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Grow during pregnancy due to increased estrogen</li>
                <li>Increase risk of miscarriage (especially submucosal)</li>
                <li>Cause pain (fibroid degeneration)</li>
                <li>Affect baby's position</li>
                <li>Increase risk of preterm birth</li>
                <li>Increase likelihood of caesarean section</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Your pregnancy will be monitored closely if you have fibroids.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">See your doctor if</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have heavy periods and difficulty conceiving</li>
                <li>You've been diagnosed with fibroids and want to get pregnant</li>
                <li>You've had recurrent miscarriages</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Which fibroids need treatment?</h3>
              <p className="text-sm mb-4">
                Consider treatment before trying to conceive if you have:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Submucosal fibroids (any size)</li>
                <li>Large intramural fibroids (&gt;4-5cm)</li>
                <li>Fibroids distorting the uterine cavity</li>
                <li>Fibroids blocking tubes</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/fertility" className="text-[#d8157d] hover:underline">
                    Fertility overview
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/surgery" className="text-[#d8157d] hover:underline">
                    Fertility surgery
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/periods/heavy-periods" className="text-[#d8157d] hover:underline">
                    Heavy periods
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>Society of Gynecologic Surgeons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UterineFibroidsPage;
