import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const GenitalWartsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Genital warts', url: '/womens-health/sexual-health/stis/genital-warts' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Genital Warts</h1>
          <p className="text-xl font-medium">
            A common viral STI caused by certain types of HPV
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About genital warts</h2>
              <p className="mb-4">
                Genital warts are caused by certain strains of human papillomavirus (HPV),
                most commonly types 6 and 11. They're one of the most common STIs.
              </p>
              <p>
                The strains that cause genital warts are different from those that cause
                cervical cancer, but you can be infected with multiple HPV types.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                Warts may appear weeks, months, or even years after infection. Some people
                never develop visible warts.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Small, flesh-colored or gray growths</li>
                <li>May be flat or raised</li>
                <li>Can appear singly or in clusters (cauliflower-like)</li>
                <li>Usually painless but may itch</li>
                <li>Located on vulva, vagina, cervix, penis, scrotum, anus, or thighs</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How you get genital warts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Skin-to-skin contact during vaginal or anal sex</li>
                <li>Sharing sex toys</li>
                <li>Rarely, oral sex (can cause warts in mouth or throat)</li>
                <li>From mother to baby during delivery (rare)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                You don't need to have penetrative sex to pass on HPV. Condoms reduce but
                don't eliminate risk as they don't cover all affected skin.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">
                Genital warts are usually diagnosed by visual examination. In some cases:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A mild acidic solution may be applied to make warts more visible</li>
                <li>A biopsy may be taken if diagnosis is uncertain</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Treatment removes visible warts but doesn't eliminate the virus. Options include:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Topical treatments (applied at home)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Podophyllotoxin cream or solution</li>
                    <li>Imiquimod cream</li>
                    <li>Sinecatechins ointment</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical treatments (done by healthcare provider)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Cryotherapy (freezing)</li>
                    <li>Electrocautery (burning)</li>
                    <li>Surgical excision</li>
                    <li>Laser treatment</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Multiple treatments may be needed. Warts can recur even after successful treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">HPV and cancer</h2>
              <p className="mb-4">
                The HPV strains that cause genital warts (types 6 and 11) are considered
                low-risk and don't cause cancer. However:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You can be infected with multiple HPV types</li>
                <li>High-risk HPV types (16 and 18) can cause cervical and other cancers</li>
                <li>Regular cervical screening is important regardless of wart status</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">HPV vaccination</h3>
              <p className="text-sm mb-4">
                The HPV vaccine protects against strains that cause genital warts and cervical
                cancer. It's most effective when given before becoming sexually active.
              </p>
              <p className="text-sm">
                In Nigeria, HPV vaccination is available through some healthcare providers.
                Ask your doctor about availability.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Natural clearance</h3>
              <p className="text-sm">
                In most people, the immune system clears HPV within 2 years. Warts may
                disappear on their own without treatment, though this can take time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to avoid treatment</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>During pregnancy (some treatments)</li>
                <li>If warts are inside vagina or cervix (see specialist)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/stis/genital-herpes" className="text-[#d8157d] hover:underline">
                    Genital herpes
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/screenings" className="text-[#d8157d] hover:underline">
                    Cervical screening
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

export default GenitalWartsPage;
