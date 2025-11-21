import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const IUIPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'IUI', url: '/womens-health/fertility/treatments/iui' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Intrauterine Insemination (IUI)</h1>
          <p className="text-xl font-medium">
            A fertility treatment where prepared sperm is placed directly in the uterus
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About IUI</h2>
              <p className="mb-4">
                IUI (intrauterine insemination) is a fertility treatment where washed and
                concentrated sperm is placed directly into the uterus around the time of
                ovulation, bringing the sperm closer to the egg.
              </p>
              <p>
                It's less invasive and less expensive than IVF and is often tried before IVF.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Who is IUI suitable for?</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Commonly used for</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Unexplained infertility</li>
                    <li>Mild male factor infertility (slightly low sperm count or motility)</li>
                    <li>Cervical factor infertility</li>
                    <li>Ovulation disorders (with ovulation induction)</li>
                    <li>Same-sex couples or single women (with donor sperm)</li>
                    <li>Sexual dysfunction making intercourse difficult</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Requirements</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>At least one open fallopian tube</li>
                    <li>Normal or mildly abnormal semen analysis</li>
                    <li>Ovulation (natural or induced)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Not suitable for</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Blocked fallopian tubes</li>
                    <li>Severe male factor infertility</li>
                    <li>Moderate to severe endometriosis</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">The IUI process</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">1. Ovarian stimulation (optional)</h3>
                  <p>
                    IUI can be done in a natural cycle or with mild ovarian stimulation
                    (clomifene or gonadotrophins) to increase egg numbers. Stimulated
                    cycles have higher success rates but also higher multiple pregnancy risk.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">2. Monitoring</h3>
                  <p>
                    Ultrasound scans track follicle development. When follicles are mature
                    (usually 18-20mm), ovulation may be triggered with an hCG injection.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">3. Sperm preparation</h3>
                  <p>
                    The sperm sample is "washed" and concentrated in the laboratory. This
                    removes seminal fluid and selects the best motile sperm. The sample is
                    provided 1-2 hours before the procedure.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">4. Insemination</h3>
                  <p>
                    A thin catheter is passed through the cervix into the uterus, and the
                    prepared sperm is deposited. The procedure takes just a few minutes
                    and is usually painless (similar to a smear test).
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">5. After insemination</h3>
                  <p>
                    You may be asked to lie down for 10-15 minutes. A pregnancy test is done
                    about 2 weeks later.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Success rates</h2>
              <p className="mb-4">
                Success rates vary depending on the cause of infertility and whether
                stimulation is used:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#fdf2f8]">
                      <th className="border border-gray-200 px-4 py-2 text-left">Type</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Success rate per cycle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Natural cycle IUI</td>
                      <td className="border border-gray-200 px-4 py-2">5-10%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Stimulated IUI</td>
                      <td className="border border-gray-200 px-4 py-2">10-20%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">IUI with donor sperm</td>
                      <td className="border border-gray-200 px-4 py-2">15-25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Success rates decrease with age and after the first 3-4 cycles. Most
                guidelines recommend moving to IVF after 3-6 unsuccessful IUI cycles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risks and side effects</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Multiple pregnancy</h3>
                  <p>
                    If ovarian stimulation is used and multiple follicles develop, there's
                    a 10-20% risk of twins and higher-order multiples. Cycles may be
                    cancelled if too many follicles develop.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Ovarian hyperstimulation (OHSS)</h3>
                  <p>
                    Rare with IUI doses of medication, but possible. Symptoms include
                    abdominal bloating, nausea, and difficulty breathing.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Infection</h3>
                  <p>
                    Very low risk of infection from the procedure.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Cramping</h3>
                  <p>
                    Mild cramping during or after the procedure is common but usually brief.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">IUI vs IVF</h3>
              <p className="text-sm mb-4">
                IUI may be tried first because it's:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Less invasive</li>
                <li>Less expensive</li>
                <li>Requires fewer medications</li>
                <li>No egg collection needed</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                IVF is recommended if IUI fails or if certain conditions exist.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Sperm requirements</h3>
              <p className="text-sm mb-4">
                For IUI, the total motile sperm count after washing should be:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Minimum: 5 million</li>
                <li>Optimal: &gt;10 million</li>
              </ul>
              <p className="mt-2 text-xs text-gray-600">
                Lower counts may indicate need for IVF/ICSI.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related treatments</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/fertility/treatments/medication" className="text-[#d8157d] hover:underline">
                    Fertility medications
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/donor" className="text-[#d8157d] hover:underline">
                    Donor sperm
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>Human Fertilisation and Embryology Authority (HFEA)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IUIPage;
