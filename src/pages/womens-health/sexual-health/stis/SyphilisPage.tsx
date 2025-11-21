import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const SyphilisPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Syphilis', url: '/womens-health/sexual-health/stis/syphilis' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Syphilis</h1>
          <p className="text-xl font-medium">
            A bacterial infection that progresses through stages if untreated
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About syphilis</h2>
              <p className="mb-4">
                Syphilis is caused by the bacterium Treponema pallidum. It progresses through
                stages (primary, secondary, latent, and tertiary) and can cause serious health
                problems if left untreated.
              </p>
              <p>
                Syphilis is easily treated with antibiotics, especially in the early stages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Stages and symptoms</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Primary syphilis (10-90 days after infection)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Painless sore (chancre) on genitals, rectum, or mouth</li>
                    <li>Sore heals on its own in 3-6 weeks</li>
                    <li>May go unnoticed, especially if inside vagina or rectum</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Secondary syphilis (weeks to months later)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Non-itchy rash, often on palms and soles</li>
                    <li>Flu-like symptoms (fever, fatigue, sore throat)</li>
                    <li>Swollen lymph nodes</li>
                    <li>Patchy hair loss</li>
                    <li>Wart-like growths in warm, moist areas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Latent syphilis</h3>
                  <p>
                    No symptoms, but the infection remains in the body. Can last for years.
                    Still contagious in early latent stage.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Tertiary syphilis (years to decades later)</h3>
                  <p className="mb-2">Rare if treated, but serious if it develops:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Damage to heart and blood vessels</li>
                    <li>Damage to brain and nervous system (neurosyphilis)</li>
                    <li>Damage to eyes (ocular syphilis)</li>
                    <li>Gummas (soft tissue growths)</li>
                    <li>Can be fatal</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How you get syphilis</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Direct contact with a syphilis sore during vaginal, anal, or oral sex</li>
                <li>From mother to baby during pregnancy or childbirth (congenital syphilis)</li>
                <li>Rarely, through blood transfusion</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Blood test</strong> - most common method</li>
                <li><strong>Swab</strong> from sore if present</li>
                <li><strong>Lumbar puncture</strong> if neurosyphilis suspected</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                It can take up to 12 weeks after infection for syphilis to show on a blood test.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Syphilis is treated with antibiotics, typically penicillin:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Early syphilis:</strong> Single injection of benzathine penicillin G</li>
                <li><strong>Late or unknown duration:</strong> Three injections, one week apart</li>
                <li><strong>Neurosyphilis:</strong> IV penicillin for 10-14 days</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Alternative antibiotics are available for those allergic to penicillin.
              </p>
              <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm">
                  <strong>Jarisch-Herxheimer reaction:</strong> Some people experience flu-like
                  symptoms within 24 hours of treatment. This is not an allergic reaction and
                  usually resolves quickly.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Congenital syphilis</h2>
              <p className="mb-4">
                Untreated syphilis during pregnancy can pass to the baby, causing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Miscarriage or stillbirth</li>
                <li>Low birth weight</li>
                <li>Premature birth</li>
                <li>Serious health problems in the baby</li>
              </ul>
              <p className="mt-4 font-medium">
                All pregnant women should be tested for syphilis. Treatment during pregnancy
                can prevent transmission to the baby.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">HIV risk</h3>
              <p className="text-sm">
                Having syphilis increases your risk of getting or transmitting HIV. Syphilis
                sores make it easier for HIV to enter or exit the body.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Follow-up testing</h3>
              <p className="text-sm">
                After treatment, you'll need blood tests at 3, 6, and 12 months to make sure
                the infection has cleared. If you have HIV, more frequent testing is recommended.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Prevention</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Use condoms</li>
                <li>Get tested regularly</li>
                <li>Ask partners about their STI status</li>
                <li>Limit number of sexual partners</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related infections</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/stis/hiv" className="text-[#d8157d] hover:underline">
                    HIV
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/sexual-health/stis/gonorrhea" className="text-[#d8157d] hover:underline">
                    Gonorrhea
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

export default SyphilisPage;
