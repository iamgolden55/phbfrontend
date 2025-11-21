import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const SurgeryPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Surgical procedures', url: '/womens-health/fertility/treatments/surgery' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Fertility Surgery</h1>
          <p className="text-xl font-medium">
            Surgical procedures to diagnose and treat conditions affecting fertility
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About fertility surgery</h2>
              <p className="mb-4">
                Surgery may be used to diagnose fertility problems, treat conditions affecting
                conception, or improve the chances of success with other fertility treatments.
              </p>
              <p>
                Most fertility surgeries are performed as minimally invasive (keyhole) procedures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Laparoscopy</h2>
              <p className="mb-4">
                A keyhole surgery where a camera and instruments are inserted through small
                incisions in the abdomen.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Used for</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Diagnosing endometriosis, adhesions, fibroids</li>
                    <li>Treating endometriosis (excision or ablation)</li>
                    <li>Removing adhesions (adhesiolysis)</li>
                    <li>Removing ovarian cysts or endometriomas</li>
                    <li>Ovarian drilling for PCOS</li>
                    <li>Tubal surgery</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Recovery</h3>
                  <p>
                    Usually 1-2 weeks. Most women can try to conceive immediately after,
                    though your doctor will advise.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Hysteroscopy</h2>
              <p className="mb-4">
                A camera inserted through the vagina and cervix to view and treat problems
                inside the uterus.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Used for</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Removing polyps</li>
                    <li>Removing submucosal fibroids (myomectomy)</li>
                    <li>Treating adhesions in the uterus (Asherman's syndrome)</li>
                    <li>Removing uterine septum</li>
                    <li>Investigating abnormal bleeding or recurrent miscarriage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Recovery</h3>
                  <p>
                    Usually a few days. Most women can try to conceive in the next cycle.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Myomectomy</h2>
              <p className="mb-4">
                Surgical removal of uterine fibroids while preserving the uterus.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Types</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Hysteroscopic:</strong> For submucosal fibroids (inside cavity)</li>
                    <li><strong>Laparoscopic:</strong> For small subserosal/intramural fibroids</li>
                    <li><strong>Open (abdominal):</strong> For large or multiple fibroids</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Success rates</h3>
                  <p>
                    Pregnancy rates after myomectomy are 40-60% in previously infertile women.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Recovery</h3>
                  <p>
                    2-6 weeks depending on the approach. May need to wait 3-6 months before
                    conceiving after open surgery.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Tubal surgery</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Types of tubal surgery</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Salpingostomy:</strong> Creating opening in blocked tube</li>
                    <li><strong>Fimbrioplasty:</strong> Repairing damaged fimbriae</li>
                    <li><strong>Tubal reanastomosis:</strong> Reversing sterilisation</li>
                    <li><strong>Salpingectomy:</strong> Removing damaged tubes before IVF</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Success rates</h3>
                  <p>
                    Varies widely depending on the extent of damage:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Sterilisation reversal: 50-80% pregnancy rate</li>
                    <li>Mild tubal damage: 40-60%</li>
                    <li>Severe damage: 10-20% (IVF often preferred)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Considerations</h3>
                  <p>
                    Women who have tubal surgery have a higher risk of ectopic pregnancy and
                    should be monitored closely in early pregnancy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Ovarian drilling</h2>
              <p className="mb-4">
                A laparoscopic procedure for women with PCOS who haven't responded to
                clomifene or letrozole.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">How it works</h3>
                  <p>
                    Small holes are made in the ovarian surface using heat (diathermy) or laser.
                    This reduces androgen production and can restore ovulation.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Success rates</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>50% of women will ovulate spontaneously</li>
                    <li>Others may respond better to medications after drilling</li>
                    <li>Effects may wear off over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Surgery vs IVF</h3>
              <p className="text-sm mb-4">
                Your doctor will help you decide between surgery and IVF based on:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Your age</li>
                <li>Duration of infertility</li>
                <li>Severity of condition</li>
                <li>Other fertility factors</li>
                <li>Your preferences</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Risks of surgery</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Infection</li>
                <li>Bleeding</li>
                <li>Damage to surrounding organs</li>
                <li>Formation of new adhesions</li>
                <li>Reduced ovarian reserve (after ovarian surgery)</li>
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
                  <Link to="/womens-health/fertility/problems/endometriosis" className="text-[#d8157d] hover:underline">
                    Endometriosis
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/problems/uterine-fibroids" className="text-[#d8157d] hover:underline">
                    Fibroids
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

export default SurgeryPage;
