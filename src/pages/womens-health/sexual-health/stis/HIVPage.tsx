import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const HIVPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'HIV', url: '/womens-health/sexual-health/stis/hiv' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">HIV</h1>
          <p className="text-xl font-medium">
            Human Immunodeficiency Virus - a manageable condition with proper treatment
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About HIV</h2>
              <p className="mb-4">
                HIV (Human Immunodeficiency Virus) attacks the immune system, specifically
                CD4 cells. Without treatment, it can lead to AIDS (Acquired Immunodeficiency
                Syndrome).
              </p>
              <p>
                With modern treatment (antiretroviral therapy), people with HIV can live long,
                healthy lives and cannot pass on the virus when their viral load is undetectable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Acute HIV infection (2-4 weeks after infection)</h3>
                  <p className="mb-2">Most people experience flu-like symptoms:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fever</li>
                    <li>Fatigue</li>
                    <li>Sore throat</li>
                    <li>Swollen lymph nodes</li>
                    <li>Rash</li>
                    <li>Muscle and joint aches</li>
                    <li>Night sweats</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Clinical latency (chronic HIV)</h3>
                  <p>
                    The virus is still active but reproduces at low levels. May last for years
                    with no symptoms. Without treatment, progresses to AIDS.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">AIDS</h3>
                  <p className="mb-2">When the immune system is severely damaged (CD4 count below 200):</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Rapid weight loss</li>
                    <li>Recurring fever or night sweats</li>
                    <li>Extreme fatigue</li>
                    <li>Prolonged swelling of lymph nodes</li>
                    <li>Opportunistic infections</li>
                    <li>Certain cancers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How HIV is transmitted</h2>
              <p className="mb-4">HIV is transmitted through specific body fluids:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unprotected vaginal or anal sex (most common)</li>
                <li>Sharing needles or syringes</li>
                <li>Mother to baby during pregnancy, birth, or breastfeeding</li>
                <li>Blood transfusion (rare with screening)</li>
                <li>Occupational exposure in healthcare settings</li>
              </ul>
              <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                <p className="text-sm">
                  <strong>HIV is NOT transmitted through:</strong> Casual contact, kissing, sharing
                  food/drinks, toilet seats, mosquito bites, air, water, or saliva.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Testing for HIV</h2>
              <p className="mb-4">Testing options include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Rapid test:</strong> Results in 20 minutes (finger prick)</li>
                <li><strong>Laboratory blood test:</strong> Most accurate, results in a few days</li>
                <li><strong>Self-test kits:</strong> Available for home use</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Window period:</strong> It can take 2-12 weeks after exposure for HIV
                to be detected. Repeat testing may be needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                HIV is treated with antiretroviral therapy (ART):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usually a combination of 3 drugs taken daily</li>
                <li>Reduces viral load to undetectable levels</li>
                <li>Restores and preserves immune function</li>
                <li>Prevents transmission to others</li>
                <li>Must be taken for life</li>
              </ul>
              <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm">
                  <strong>U=U (Undetectable = Untransmittable):</strong> People with HIV who take
                  ART as prescribed and achieve an undetectable viral load cannot sexually
                  transmit HIV to their partners.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Prevention</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">PrEP (Pre-Exposure Prophylaxis)</h3>
                  <p>
                    Daily medication for HIV-negative people at high risk. Highly effective when
                    taken as prescribed.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">PEP (Post-Exposure Prophylaxis)</h3>
                  <p>
                    Emergency medication taken within 72 hours of possible exposure. Must be
                    taken for 28 days.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other prevention methods</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Consistent condom use</li>
                    <li>Never share needles</li>
                    <li>Regular testing</li>
                    <li>Treatment as prevention (for HIV-positive individuals)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">HIV in Nigeria</h2>
              <p className="mb-4">
                Nigeria has one of the highest HIV burdens globally, but significant progress
                has been made:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free HIV testing widely available</li>
                <li>Free antiretroviral therapy through government programs</li>
                <li>Prevention of mother-to-child transmission programs</li>
                <li>Support from organizations like NACA (National Agency for the Control of AIDS)</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Living with HIV</h3>
              <p className="text-sm">
                With proper treatment, people with HIV can expect a near-normal lifespan.
                Early diagnosis and consistent treatment are key.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Why get tested?</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Early treatment improves outcomes</li>
                <li>Prevents transmission to others</li>
                <li>Allows access to support services</li>
                <li>Peace of mind</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Support resources</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>NACA (National Agency for the Control of AIDS)</li>
                <li>State AIDS Control Agencies</li>
                <li>Network of People Living with HIV (NEPWHAN)</li>
                <li>Local HIV support groups</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/stis/syphilis" className="text-[#d8157d] hover:underline">
                    Syphilis
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/sexual-health" className="text-[#d8157d] hover:underline">
                    Sexual health overview
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>World Health Organization (WHO)</li>
                <li>UNAIDS</li>
                <li>Nigerian Centre for Disease Control (NCDC)</li>
                <li>National Agency for the Control of AIDS (NACA)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIVPage;
