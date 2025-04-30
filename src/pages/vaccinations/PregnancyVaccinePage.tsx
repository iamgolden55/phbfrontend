import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const PregnancyVaccinePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Vaccinations', url: '/vaccinations' },
              { label: 'Vaccines in pregnancy', url: '/vaccinations/pregnancy' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Vaccines in pregnancy</h1>
          <p className="text-xl font-medium">
            Comprehensive information about vaccines recommended during pregnancy, their safety, timing, and how they protect you and your baby.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Why vaccines are important in pregnancy */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Why vaccines are important in pregnancy</h2>
              <p className="mb-4">
                Vaccines given during pregnancy help protect both you and your baby from serious diseases. Some infections can cause severe complications for pregnant women and can also harm the developing baby. By getting vaccinated, you pass on antibodies to your baby, giving them protection in the first few months of life when they are most vulnerable.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Reduces risk of severe illness in pregnancy</li>
                <li>Protects your baby before they are old enough to be vaccinated</li>
                <li>Prevents complications such as premature birth, low birth weight, and birth defects</li>
              </ul>
            </div>

            {/* Which vaccines are recommended */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Which vaccines are recommended in pregnancy?</h2>
              <p className="mb-4">
                The following vaccines are routinely recommended during pregnancy in the UK:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <span className="font-bold">Whooping cough (pertussis) vaccine</span>: Recommended in every pregnancy, ideally between 16 and 32 weeks. Protects your baby from whooping cough in the first weeks of life.
                </li>
                <li>
                  <span className="font-bold">Flu vaccine</span>: Recommended during the flu season (usually October to March) at any stage of pregnancy. Protects against serious complications from flu.
                </li>
                <li>
                  <span className="font-bold">COVID-19 vaccine</span>: Strongly recommended for pregnant women at any stage of pregnancy. Protects against severe COVID-19 illness and complications.
                </li>
              </ul>
              <p className="mb-4">
                Other vaccines may be recommended in special circumstances, such as travel or underlying health conditions. Always consult your healthcare provider for personalized advice.
              </p>
            </div>

            {/* Vaccine safety in pregnancy */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Are vaccines safe in pregnancy?</h2>
              <p className="mb-4">
                Yes. The vaccines recommended in pregnancy have been shown to be safe for both mother and baby. They do not contain live viruses and cannot cause the diseases they protect against. Extensive research and monitoring have found no increased risk of miscarriage, birth defects, or pregnancy complications from these vaccines.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Vaccines are thoroughly tested and monitored for safety</li>
                <li>Side effects are usually mild, such as a sore arm or mild fever</li>
                <li>Serious side effects are extremely rare</li>
              </ul>
            </div>

            {/* When to get vaccinated */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">When should I get vaccinated during pregnancy?</h2>
              <p className="mb-4">
                Timing depends on the vaccine:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><span className="font-bold">Whooping cough</span>: Best between 16 and 32 weeks, but can be given later if missed.</li>
                <li><span className="font-bold">Flu</span>: Any stage of pregnancy during flu season.</li>
                <li><span className="font-bold">COVID-19</span>: Any stage of pregnancy.</li>
              </ul>
              <p className="mb-4">
                If you miss a recommended vaccine, speak to your midwife or GP as soon as possible.
              </p>
            </div>

            {/* How to get vaccinated */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">How to get vaccinated in pregnancy</h2>
              <p className="mb-4">
                You can get recommended vaccines at:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your GP surgery</li>
                <li>Midwifery service (some vaccines may be offered at antenatal appointments)</li>
                <li>Pharmacies (for flu and COVID-19 vaccines)</li>
                <li>Vaccination clinics</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h3 className="font-bold text-lg mb-2">Book your pregnancy vaccines</h3>
                <p className="mb-2">Speak to your midwife, GP, or pharmacist to arrange your recommended vaccines. You can also book online for some vaccines.</p>
                <div className="flex space-x-4 mt-4">
                  <Link
                    to="/find-a-pharmacy"
                    className="bg-[#005eb8] text-white px-6 py-2 rounded-md hover:bg-[#004b93] transition-colors"
                  >
                    Find a pharmacy
                  </Link>
                  <Link
                    to="/find-a-gp"
                    className="bg-[#005eb8] text-white px-6 py-2 rounded-md hover:bg-[#004b93] transition-colors"
                  >
                    Find a GP
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-1">Can vaccines harm my baby?</h3>
                  <p className="text-sm">No. The recommended vaccines do not harm your baby. They help protect your baby from serious diseases in the first few months of life.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Can I have vaccines if I have allergies?</h3>
                  <p className="text-sm">Most people with allergies can safely receive vaccines. If you have a history of severe allergic reactions, discuss this with your healthcare provider.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">What if I miss a vaccine?</h3>
                  <p className="text-sm">If you miss a recommended vaccine, contact your midwife or GP as soon as possible. It's important to catch up to ensure protection for you and your baby.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Are vaccines free in pregnancy?</h3>
                  <p className="text-sm">Yes. All recommended vaccines in pregnancy are free on the PHB.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Can I get vaccinated if I am breastfeeding?</h3>
                  <p className="text-sm">Yes. Vaccines such as flu and COVID-19 are safe while breastfeeding. They do not affect your milk or your baby.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Related information</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/vaccinations" className="text-[#005eb8] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    All vaccinations
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/flu-vaccine" className="text-[#005eb8] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Flu vaccine
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/covid-19-vaccine" className="text-[#005eb8] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    COVID-19 vaccine
                  </Link>
                </li>
                <li>
                  <Link to="/pregnancy" className="text-[#005eb8] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Pregnancy health
                  </Link>
                </li>
                <li>
                  <Link to="/pregnancy/health" className="text-[#005eb8] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Pregnancy care
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

export default PregnancyVaccinePage; 