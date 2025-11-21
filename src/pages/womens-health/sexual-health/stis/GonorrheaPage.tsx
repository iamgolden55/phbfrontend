import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const GonorrheaPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Gonorrhea', url: '/womens-health/sexual-health/stis/gonorrhea' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Gonorrhea</h1>
          <p className="text-xl font-medium">
            A bacterial STI that can infect the genitals, rectum, and throat
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About gonorrhea</h2>
              <p className="mb-4">
                Gonorrhea is a common bacterial sexually transmitted infection caused by Neisseria
                gonorrhoeae bacteria. It can infect the cervix, urethra, rectum, throat, and eyes.
              </p>
              <p>
                Like chlamydia, gonorrhea often has no symptoms but can cause serious complications
                if left untreated, including infertility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                About 50% of women and 10% of men with gonorrhea have no symptoms.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Symptoms in women</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Unusual vaginal discharge (watery, yellow, or green)</li>
                    <li>Pain or burning when urinating</li>
                    <li>Pain in the lower abdomen</li>
                    <li>Bleeding between periods or heavier periods</li>
                    <li>Bleeding after sex</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Symptoms in men</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>White, yellow, or green discharge from the penis</li>
                    <li>Pain or burning when urinating</li>
                    <li>Pain or swelling in the testicles</li>
                    <li>Inflammation of the foreskin</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Infection in other areas</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Rectum:</strong> Discharge, itching, pain, bleeding, painful bowel movements</li>
                    <li><strong>Throat:</strong> Usually no symptoms, sometimes sore throat</li>
                    <li><strong>Eyes:</strong> Pain, swelling, discharge (conjunctivitis)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How you get gonorrhea</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unprotected vaginal, anal, or oral sex</li>
                <li>Sharing sex toys without washing or covering with a new condom</li>
                <li>From mother to baby during childbirth</li>
                <li>Touching infected genitals and then touching your eyes</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Testing</h2>
              <p className="mb-4">Testing is done using:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Urine sample</li>
                <li>Swab from the cervix, urethra, throat, or rectum</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                If you have gonorrhea, you'll also be tested for chlamydia as they often occur together.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Gonorrhea is treated with antibiotics, usually:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A single injection of ceftriaxone</li>
                <li>Sometimes combined with azithromycin tablets</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm">
                  <strong>Antibiotic resistance:</strong> Some strains of gonorrhea are becoming
                  resistant to antibiotics. It's important to have a test of cure (follow-up test)
                  about 2 weeks after treatment to make sure the infection has cleared.
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
                    <li>Epididymitis</li>
                    <li>Reduced fertility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other complications</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Disseminated gonococcal infection (spread to blood, joints, heart)</li>
                    <li>Increased risk of HIV transmission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">Important</h3>
              <p className="text-sm">
                Avoid sex (including oral and anal sex) until you and your partner(s) have
                finished treatment and had a negative test of cure.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Prevention</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Use condoms for vaginal, anal, and oral sex</li>
                <li>Use dental dams for oral sex on a vulva or anus</li>
                <li>Get tested regularly</li>
                <li>Don't share sex toys</li>
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

export default GonorrheaPage;
