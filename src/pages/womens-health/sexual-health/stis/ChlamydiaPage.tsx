import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const ChlamydiaPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Chlamydia', url: '/womens-health/sexual-health/stis/chlamydia' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Chlamydia</h1>
          <p className="text-xl font-medium">
            A common bacterial sexually transmitted infection
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About chlamydia</h2>
              <p className="mb-4">
                Chlamydia is one of the most common sexually transmitted infections (STIs). It's caused
                by bacteria called Chlamydia trachomatis. It's especially common in sexually active
                teenagers and young adults.
              </p>
              <p>
                Most people with chlamydia don't have any symptoms, so they may not know they have it.
                However, if left untreated, it can cause serious long-term health problems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                Most people with chlamydia don't notice any symptoms. At least 70% of women and 50%
                of men with chlamydia have no symptoms at all.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Symptoms in women</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Unusual vaginal discharge</li>
                    <li>Pain when urinating</li>
                    <li>Bleeding between periods or after sex</li>
                    <li>Pain during sex</li>
                    <li>Lower abdominal pain</li>
                    <li>Heavier periods than usual</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Symptoms in men</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Discharge from the penis</li>
                    <li>Pain when urinating</li>
                    <li>Pain and swelling in the testicles</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other possible symptoms</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Rectal pain, discharge, or bleeding (if infected in the rectum)</li>
                    <li>Conjunctivitis if infected semen or vaginal fluid gets into the eyes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How you get chlamydia</h2>
              <p className="mb-4">
                Chlamydia is passed through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unprotected vaginal, anal, or oral sex</li>
                <li>Sharing sex toys that aren't washed or covered with a new condom each time</li>
                <li>Infected semen or vaginal fluid getting into the eye</li>
                <li>From mother to baby during childbirth</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                You cannot get chlamydia from kissing, hugging, sharing towels, toilet seats,
                swimming pools, or cutlery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Testing for chlamydia</h2>
              <p className="mb-4">
                Testing for chlamydia is simple and painless:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Urine test:</strong> You provide a urine sample</li>
                <li><strong>Swab test:</strong> A swab is used to collect cells from the vagina, cervix, urethra, rectum, or throat</li>
              </ul>
              <p className="mt-4">
                You can get tested at sexual health clinics, some GP surgeries, pharmacies,
                and contraception clinics. Home testing kits are also available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Chlamydia is easily treated with antibiotics:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Single dose:</strong> Azithromycin (1g) - most common treatment</li>
                <li><strong>Course:</strong> Doxycycline (100mg twice daily for 7 days)</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm">
                  <strong>Important:</strong> Avoid having sex (including oral sex) until you and
                  your partner(s) have finished treatment. If you took a single-dose treatment,
                  wait 7 days before having sex.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Complications if untreated</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">In women</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Pelvic inflammatory disease (PID)</li>
                    <li>Ectopic pregnancy</li>
                    <li>Infertility</li>
                    <li>Chronic pelvic pain</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">In men</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Epididymitis (swollen and painful testicles)</li>
                    <li>Reactive arthritis (rare)</li>
                    <li>Reduced fertility (rare)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">When to get tested</h3>
              <p className="text-sm mb-4">Get tested for chlamydia if:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>You have symptoms</li>
                <li>You've had unprotected sex</li>
                <li>A sexual partner has chlamydia</li>
                <li>You're starting a new relationship</li>
                <li>You're under 25 and sexually active (yearly screening recommended)</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Prevention</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Use condoms consistently and correctly</li>
                <li>Get tested regularly</li>
                <li>Limit number of sexual partners</li>
                <li>Don't share sex toys (or wash and cover with condom)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Partner notification</h3>
              <p className="text-sm">
                If you test positive, your recent sexual partners should be informed so they
                can get tested and treated. Sexual health clinics can help you notify partners
                anonymously if you prefer.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/stis/gonorrhea" className="text-[#d8157d] hover:underline">
                    Gonorrhea
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/sexual-health" className="text-[#d8157d] hover:underline">
                    Sexual health overview
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility" className="text-[#d8157d] hover:underline">
                    Fertility
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>World Health Organization (WHO)</li>
                <li>Centers for Disease Control and Prevention (CDC)</li>
                <li>Nigerian Centre for Disease Control (NCDC)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChlamydiaPage;
