import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const ICSIPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'ICSI', url: '/womens-health/fertility/treatments/icsi' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Intracytoplasmic Sperm Injection (ICSI)</h1>
          <p className="text-xl font-medium">
            A specialised IVF technique where a single sperm is injected directly into an egg
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About ICSI</h2>
              <p className="mb-4">
                ICSI (intracytoplasmic sperm injection) is a form of IVF where a single sperm
                is injected directly into the cytoplasm of an egg using a fine needle. This
                bypasses the natural process where sperm must penetrate the egg.
              </p>
              <p>
                ICSI was developed in 1992 and has revolutionised treatment for male factor infertility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">When is ICSI used?</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Primary indications</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Severe male factor infertility (very low sperm count, motility, or morphology)</li>
                    <li>Previous failed fertilisation with conventional IVF</li>
                    <li>Surgically retrieved sperm (PESA, TESA, micro-TESE)</li>
                    <li>Frozen sperm with poor post-thaw quality</li>
                    <li>Obstructive azoospermia</li>
                    <li>Anti-sperm antibodies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other uses</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Preimplantation genetic testing (PGT)</li>
                    <li>Low number of eggs collected</li>
                    <li>Using frozen eggs</li>
                    <li>Unexplained failed fertilisation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">The ICSI procedure</h2>
              <p className="mb-4">
                The process is the same as IVF except for the fertilisation step:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg preparation</h3>
                  <p>
                    After egg collection, the cumulus cells surrounding each egg are removed
                    so the egg can be assessed and injected.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Sperm selection</h3>
                  <p>
                    An embryologist selects the best quality sperm based on appearance and
                    movement. For very severe male factor, specialised selection techniques
                    (IMSI, PICSI) may be used.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Injection</h3>
                  <p>
                    Using a very fine needle and high-powered microscope, a single sperm is
                    injected directly into the cytoplasm of each mature egg. This is done
                    for each egg collected.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Fertilisation check</h3>
                  <p>
                    Eggs are checked the next day for signs of fertilisation. Not all eggs
                    will fertilise - typical fertilisation rates are 70-80%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Surgical sperm retrieval</h2>
              <p className="mb-4">
                For men with no sperm in the ejaculate (azoospermia), sperm can be retrieved surgically:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">PESA (Percutaneous Epididymal Sperm Aspiration)</h3>
                  <p>
                    Sperm is extracted from the epididymis using a needle. Used for
                    obstructive azoospermia.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">TESA (Testicular Sperm Aspiration)</h3>
                  <p>
                    Sperm is extracted directly from the testicle using a needle.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Micro-TESE (Microscopic Testicular Sperm Extraction)</h3>
                  <p>
                    A surgical procedure where tissue is taken from the testicle under a microscope
                    to find sperm. Used for non-obstructive azoospermia with better sperm retrieval rates.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Success rates</h2>
              <p className="mb-4">
                ICSI success rates are similar to conventional IVF:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fertilisation rate: 70-80% of injected eggs</li>
                <li>Clinical pregnancy rates: similar to standard IVF for the woman's age</li>
                <li>Success depends primarily on the woman's age and egg quality</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                The main benefit of ICSI is enabling fertilisation when conventional IVF would fail.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risks and considerations</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg damage</h3>
                  <p>
                    About 2-3% of eggs may be damaged during the injection process.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Birth defects</h3>
                  <p>
                    Some studies have shown a slightly increased risk of birth defects with
                    ICSI (about 1% higher than natural conception). This may be related to
                    the underlying cause of infertility rather than the procedure itself.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Genetic concerns</h3>
                  <p>
                    Some genetic causes of male infertility can be passed on. Genetic
                    counselling may be recommended before treatment.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other risks</h3>
                  <p>
                    Same as IVF: OHSS, multiple pregnancy, ectopic pregnancy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">ICSI vs conventional IVF</h3>
              <p className="text-sm mb-4">
                ICSI is not always better than conventional IVF. It's specifically recommended
                for male factor infertility. For normal sperm parameters, conventional IVF
                has similar success rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Before ICSI</h3>
              <p className="text-sm mb-4">
                Men with severe male factor infertility may need:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Karyotype testing</li>
                <li>Y chromosome microdeletion testing</li>
                <li>Cystic fibrosis testing</li>
                <li>Genetic counselling</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
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
                <li>
                  <Link to="/womens-health/fertility" className="text-[#d8157d] hover:underline">
                    Fertility overview
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>Practice Committee Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICSIPage;
