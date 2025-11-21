import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const TrichomoniasisPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Trichomoniasis', url: '/womens-health/sexual-health/stis/trichomoniasis' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Trichomoniasis</h1>
          <p className="text-xl font-medium">
            A common STI caused by a tiny parasite
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About trichomoniasis</h2>
              <p className="mb-4">
                Trichomoniasis (also called "trich") is caused by a tiny parasite called
                Trichomonas vaginalis. It's one of the most common curable STIs worldwide.
              </p>
              <p>
                It mainly infects the vagina and urethra in women, and the urethra in men.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                About 50% of people with trichomoniasis have no symptoms. When symptoms occur,
                they usually develop within a month of infection.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Symptoms in women</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Abnormal vaginal discharge (often frothy, yellow-green, with fishy smell)</li>
                    <li>Increased amount of discharge</li>
                    <li>Soreness, swelling, and itching around the vagina</li>
                    <li>Pain or discomfort when urinating or having sex</li>
                    <li>Lower abdominal pain (rare)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Symptoms in men</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Pain when urinating or ejaculating</li>
                    <li>Needing to urinate more frequently</li>
                    <li>Thin, white discharge from the penis</li>
                    <li>Soreness, swelling, and redness around the head of the penis</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How you get trichomoniasis</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unprotected vaginal sex</li>
                <li>Sharing sex toys</li>
                <li>Vulva-to-vulva contact</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                It's not usually spread through oral or anal sex. You cannot get it from
                kissing, hugging, sharing towels, toilet seats, or swimming pools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">Testing involves:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Swab from the vagina, urethra, or penis</li>
                <li>Urine sample</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                You may also be tested for other STIs like chlamydia and gonorrhea.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Trichomoniasis is easily treated with antibiotics:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Metronidazole</strong> - single dose or 5-7 day course</li>
                <li><strong>Tinidazole</strong> - alternative option</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm">
                  <strong>Important:</strong> Avoid alcohol during treatment and for 24-72 hours
                  after, as it can cause severe nausea and vomiting.
                </p>
              </div>
              <p className="mt-4 text-sm">
                Your sexual partner(s) should also be treated even if they have no symptoms.
                Avoid sex until both you and your partner(s) have completed treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Complications if untreated</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Increased risk of getting or spreading HIV</li>
                <li>In pregnancy: premature birth and low birth weight</li>
                <li>Pelvic inflammatory disease (rare)</li>
                <li>Prostatitis in men</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Reinfection</h3>
              <p className="text-sm">
                You can get trichomoniasis again after treatment. About 1 in 5 people get
                reinfected within 3 months. Make sure your partner(s) are treated.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Prevention</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Use condoms</li>
                <li>Don't share sex toys</li>
                <li>Get tested regularly</li>
                <li>Limit number of sexual partners</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related infections</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/stis/chlamydia" className="text-[#d8157d] hover:underline">
                    Chlamydia
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrichomoniasisPage;
