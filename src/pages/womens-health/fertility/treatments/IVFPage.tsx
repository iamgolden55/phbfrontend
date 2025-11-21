import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const IVFPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'IVF', url: '/womens-health/fertility/treatments/ivf' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">In Vitro Fertilisation (IVF)</h1>
          <p className="text-xl font-medium">
            A fertility treatment where eggs are fertilised outside the body
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About IVF</h2>
              <p className="mb-4">
                IVF (in vitro fertilisation) is a process where eggs are collected from the
                ovaries and fertilised with sperm in a laboratory. The resulting embryo(s)
                are then transferred to the uterus.
              </p>
              <p>
                IVF is one of the most effective forms of assisted reproductive technology.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Who is IVF suitable for?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Blocked or damaged fallopian tubes</li>
                <li>Severe male factor infertility</li>
                <li>Advanced endometriosis</li>
                <li>Unexplained infertility (after failed IUI)</li>
                <li>Ovulation disorders not responding to other treatments</li>
                <li>Premature ovarian failure (with donor eggs)</li>
                <li>Uterine fibroids</li>
                <li>Genetic conditions (with preimplantation genetic testing)</li>
                <li>Same-sex couples and single women</li>
                <li>Fertility preservation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">The IVF process</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">1. Ovarian stimulation (8-14 days)</h3>
                  <p>
                    Daily hormone injections (gonadotrophins) stimulate the ovaries to produce
                    multiple eggs. GnRH agonists or antagonists prevent premature ovulation.
                    Regular monitoring with ultrasound and blood tests tracks progress.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">2. Trigger injection</h3>
                  <p>
                    When follicles are mature (typically 18-20mm), an hCG injection triggers
                    final egg maturation. Egg collection is scheduled 34-36 hours later.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">3. Egg collection</h3>
                  <p>
                    A minor surgical procedure under sedation. A needle guided by ultrasound
                    collects eggs from the follicles through the vaginal wall. Takes about
                    20-30 minutes. Most women go home a few hours later.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">4. Sperm collection and preparation</h3>
                  <p>
                    A sperm sample is provided (or thawed if previously frozen). The sperm
                    is washed and prepared in the laboratory.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">5. Fertilisation</h3>
                  <p>
                    Eggs and sperm are combined in the laboratory. In conventional IVF,
                    sperm is placed with the eggs and fertilisation occurs naturally.
                    Alternatively, ICSI may be used.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">6. Embryo development (3-6 days)</h3>
                  <p>
                    Fertilised eggs (embryos) develop in the laboratory. Embryologists
                    monitor development and select the best quality embryo(s) for transfer.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">7. Embryo transfer</h3>
                  <p>
                    A thin catheter places the embryo(s) in the uterus. The procedure is
                    usually painless and takes just a few minutes. Single embryo transfer
                    is recommended to reduce multiple pregnancy risk.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">8. Luteal phase support</h3>
                  <p>
                    Progesterone (and sometimes estrogen) supplements support the uterine
                    lining. A pregnancy test is done about 2 weeks after transfer.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Success rates</h2>
              <p className="mb-4">
                Success rates depend mainly on the woman's age (or egg donor's age):
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#fdf2f8]">
                      <th className="border border-gray-200 px-4 py-2 text-left">Age</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Live birth rate per cycle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Under 35</td>
                      <td className="border border-gray-200 px-4 py-2">40-43%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">35-37</td>
                      <td className="border border-gray-200 px-4 py-2">31-36%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">38-40</td>
                      <td className="border border-gray-200 px-4 py-2">21-27%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">41-42</td>
                      <td className="border border-gray-200 px-4 py-2">11-18%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Over 42</td>
                      <td className="border border-gray-200 px-4 py-2">5-9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Source: Global IVF registries. Rates vary between clinics and depend on
                diagnosis and embryo quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risks and considerations</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Ovarian hyperstimulation syndrome (OHSS)</h3>
                  <p>
                    Ovaries over-respond to medication, causing abdominal pain, bloating,
                    nausea. Mild OHSS is common; severe OHSS is rare (1-2%) but can be serious.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Multiple pregnancy</h3>
                  <p>
                    Risk increases if more than one embryo is transferred. Single embryo
                    transfer is recommended for most women to minimise this risk.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Ectopic pregnancy</h3>
                  <p>
                    Slightly increased risk (2-5%) compared to natural conception.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg collection risks</h3>
                  <p>
                    Small risks of bleeding, infection, or damage to surrounding structures.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Emotional impact</h3>
                  <p>
                    IVF can be emotionally challenging. Support and counselling are important.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Choosing a clinic</h3>
              <p className="text-sm mb-4">
                When choosing a fertility clinic, consider:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Success rates for your age group</li>
                <li>Experience and qualifications</li>
                <li>Range of services offered</li>
                <li>Costs and what's included</li>
                <li>Location and accessibility</li>
                <li>Patient reviews</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Frozen embryo transfer</h3>
              <p className="text-sm">
                Surplus embryos can be frozen for future use. Frozen embryo transfers have
                similar success rates to fresh transfers and may be safer for women at
                risk of OHSS.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related treatments</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/fertility/treatments/icsi" className="text-[#d8157d] hover:underline">
                    ICSI
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/donor" className="text-[#d8157d] hover:underline">
                    Donor eggs/sperm
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/age-and-fertility" className="text-[#d8157d] hover:underline">
                    Age and fertility
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>International Committee Monitoring ART (ICMART)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVFPage;
