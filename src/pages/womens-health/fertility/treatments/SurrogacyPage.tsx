import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const SurrogacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Surrogacy', url: '/womens-health/fertility/treatments/surrogacy' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Surrogacy</h1>
          <p className="text-xl font-medium">
            When another woman carries and gives birth to a baby for you
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About surrogacy</h2>
              <p className="mb-4">
                Surrogacy is an arrangement where a woman (the surrogate) carries and gives birth
                to a baby for another person or couple (the intended parents). The surrogate may
                use her own eggs (traditional surrogacy) or carry an embryo created using eggs
                from the intended mother or a donor (gestational surrogacy).
              </p>
              <p>
                Surrogacy is a complex process with medical, legal, and emotional considerations
                that require careful planning and professional support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of surrogacy</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Gestational surrogacy</h3>
                  <p className="mb-2">
                    The surrogate carries an embryo created using IVF. The embryo may be made from:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Intended mother's eggs + intended father's sperm</li>
                    <li>Intended mother's eggs + donor sperm</li>
                    <li>Donor eggs + intended father's sperm</li>
                    <li>Donor eggs + donor sperm</li>
                    <li>Previously frozen embryos</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    The surrogate has no genetic connection to the baby.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Traditional surrogacy</h3>
                  <p>
                    The surrogate's own eggs are used, making her the genetic mother. This is
                    achieved through IUI or IVF. Traditional surrogacy is less common due to
                    the genetic and emotional complexities involved.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Who might consider surrogacy?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Women born without a uterus or who have had a hysterectomy</li>
                <li>Women with medical conditions making pregnancy dangerous</li>
                <li>Women with uterine abnormalities that prevent implantation</li>
                <li>Women who have had recurrent pregnancy loss</li>
                <li>Women who have had repeated IVF failures</li>
                <li>Same-sex male couples</li>
                <li>Single men wishing to become fathers</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">The surrogacy process</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">1. Finding a surrogate</h3>
                  <p>
                    You may use a known surrogate (friend or family member) or find one through
                    a surrogacy agency. Agencies provide matching services, screening, and support.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">2. Medical and psychological screening</h3>
                  <p>
                    Both intended parents and surrogate undergo comprehensive evaluation:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Medical history and physical examination</li>
                    <li>Infectious disease testing</li>
                    <li>Psychological evaluation</li>
                    <li>Assessment of the surrogate's previous pregnancies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">3. Legal agreements</h3>
                  <p>
                    Detailed contracts are essential to establish rights, responsibilities,
                    and expectations of all parties. Legal representation is strongly recommended
                    for both intended parents and surrogate.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">4. IVF and embryo transfer</h3>
                  <p>
                    For gestational surrogacy, the intended mother or egg donor undergoes ovarian
                    stimulation and egg collection. Embryos are created and transferred to the
                    surrogate's uterus after she prepares her uterine lining with hormones.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">5. Pregnancy and birth</h3>
                  <p>
                    The surrogate receives prenatal care throughout the pregnancy. Intended
                    parents are typically involved in appointments and present at the birth.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">6. Legal parentage</h3>
                  <p>
                    After birth, legal processes establish the intended parents as the legal
                    parents. This varies significantly by jurisdiction.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Success rates</h2>
              <p className="mb-4">
                Success rates for gestational surrogacy depend on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Age of the egg provider (intended mother or donor)</li>
                <li>Quality of embryos</li>
                <li>Surrogate's previous pregnancy history</li>
                <li>Clinic's expertise</li>
              </ul>
              <p className="mt-4">
                With young, healthy surrogates and quality embryos, success rates can be
                40-50% per embryo transfer cycle. Many intended parents achieve pregnancy
                within 1-2 transfer cycles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Surrogate requirements</h2>
              <p className="mb-4">
                Most fertility clinics and agencies require surrogates to meet criteria such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Age 21-40 years</li>
                <li>Have had at least one successful pregnancy and delivery</li>
                <li>No major pregnancy complications in previous pregnancies</li>
                <li>Healthy BMI</li>
                <li>Non-smoker, no recreational drug use</li>
                <li>Stable living situation and support system</li>
                <li>Pass psychological evaluation</li>
                <li>Clear medical and infectious disease screening</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Considerations and challenges</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Emotional considerations</h3>
                  <p>
                    Surrogacy involves complex emotions for all parties. Counselling is important
                    before, during, and after the process. Building a positive relationship
                    between intended parents and surrogate contributes to a better experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Legal complexity</h3>
                  <p>
                    Surrogacy laws vary widely by country and region. Some jurisdictions
                    prohibit surrogacy entirely, while others allow only altruistic (unpaid)
                    surrogacy. Legal advice specific to your jurisdiction is essential.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Financial costs</h3>
                  <p>
                    Surrogacy is typically the most expensive fertility treatment option,
                    including agency fees, surrogate compensation (where legal), medical
                    expenses, legal fees, and insurance.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">International surrogacy</h3>
                  <p>
                    Some intended parents pursue surrogacy abroad due to legal restrictions
                    or costs in their home country. This adds complexity around citizenship,
                    travel, and legal parentage across borders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-700">Legal status in Nigeria</h3>
              <p className="text-sm mb-4">
                Nigeria does not have specific legislation governing surrogacy. Commercial
                surrogacy occurs but exists in a legal grey area. This means:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>No legal framework protecting parties</li>
                <li>Potential custody disputes</li>
                <li>Difficulty establishing legal parentage</li>
                <li>Lack of regulation of agencies</li>
              </ul>
              <p className="mt-2 text-xs text-gray-600">
                Legal advice is strongly recommended before pursuing surrogacy in Nigeria.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Choosing between known and agency surrogates</h3>
              <p className="text-sm mb-2"><strong>Known surrogate (friend/family):</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
                <li>Existing relationship and trust</li>
                <li>Lower costs</li>
                <li>May have complex relationship dynamics</li>
              </ul>
              <p className="text-sm mb-2"><strong>Agency surrogate:</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Pre-screened candidates</li>
                <li>Professional support</li>
                <li>Clear boundaries</li>
                <li>Higher costs</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Questions to ask</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>What are the laws in my jurisdiction?</li>
                <li>What screening is performed?</li>
                <li>How are intended parents and surrogates matched?</li>
                <li>What support is provided during pregnancy?</li>
                <li>What are the total estimated costs?</li>
                <li>What happens if medical issues arise?</li>
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
                    Donor eggs/sperm
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
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>International Federation of Fertility Societies (IFFS)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurrogacyPage;
