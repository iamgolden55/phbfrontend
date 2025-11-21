import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const GenitalHerpesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Genital herpes', url: '/womens-health/sexual-health/stis/genital-herpes' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Genital Herpes</h1>
          <p className="text-xl font-medium">
            A common viral infection caused by the herpes simplex virus
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About genital herpes</h2>
              <p className="mb-4">
                Genital herpes is caused by the herpes simplex virus (HSV). There are two types:
                HSV-1 (usually causes cold sores) and HSV-2 (usually causes genital herpes),
                but both can infect the genital area.
              </p>
              <p>
                Once infected, the virus stays in your body for life and can cause recurrent
                outbreaks, though these usually become less frequent and less severe over time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                Many people with genital herpes don't know they have it because they have no
                symptoms or very mild symptoms.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">First outbreak (primary infection)</h3>
                  <p className="mb-2">Usually occurs 2-12 days after exposure and may include:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Small blisters that burst to leave red, open sores</li>
                    <li>Pain, itching, or tingling around the genitals</li>
                    <li>Pain when urinating</li>
                    <li>Unusual vaginal discharge</li>
                    <li>Flu-like symptoms (fever, body aches, swollen glands)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Recurrent outbreaks</h3>
                  <p className="mb-2">Usually milder than the first outbreak:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Warning signs (tingling, burning, itching) before blisters appear</li>
                    <li>Blisters typically heal within 10 days</li>
                    <li>Outbreaks become less frequent over time</li>
                    <li>Triggers include stress, illness, fatigue, menstruation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How you get genital herpes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Skin-to-skin contact with an infected area during vaginal, anal, or oral sex</li>
                <li>Receiving oral sex from someone with a cold sore</li>
                <li>Sharing sex toys</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                The virus is most contagious when sores are present but can also be passed when
                there are no visible symptoms (asymptomatic shedding).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Visual examination of sores</li>
                <li>Swab test from a blister or sore</li>
                <li>Blood test (can show past infection but less useful for diagnosing current outbreak)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                It's best to get tested while you have symptoms, as the virus is easier to detect.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                There is no cure for genital herpes, but antiviral medications can help manage symptoms:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Aciclovir</strong> - most commonly used</li>
                <li><strong>Valaciclovir</strong></li>
                <li><strong>Famciclovir</strong></li>
              </ul>
              <div className="mt-4 space-y-2">
                <p><strong>Episodic treatment:</strong> Taking antivirals when you have an outbreak</p>
                <p><strong>Suppressive treatment:</strong> Daily antivirals to prevent outbreaks (for frequent recurrences)</p>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm">
                  <strong>Self-care during outbreaks:</strong> Keep the area clean and dry, wear loose
                  clothing, use ice packs wrapped in cloth, take painkillers if needed.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Living with genital herpes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Outbreaks typically become less frequent and less severe over time</li>
                <li>Many people have very few or no recurrences after the first year</li>
                <li>The condition doesn't affect long-term health</li>
                <li>It's possible to have healthy relationships and sex life</li>
                <li>Counselling can help with emotional aspects</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-700">Pregnancy and herpes</h3>
              <p className="text-sm mb-4">
                If you have genital herpes and are pregnant, tell your doctor. The virus can
                be passed to your baby during birth. Antiviral treatment in late pregnancy
                can reduce this risk.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Reducing transmission</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Avoid sex during outbreaks</li>
                <li>Use condoms (reduces but doesn't eliminate risk)</li>
                <li>Take daily suppressive therapy</li>
                <li>Tell sexual partners about your diagnosis</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/stis/genital-warts" className="text-[#d8157d] hover:underline">
                    Genital warts
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
                <li>Centers for Disease Control and Prevention (CDC)</li>
                <li>International Herpes Alliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenitalHerpesPage;
