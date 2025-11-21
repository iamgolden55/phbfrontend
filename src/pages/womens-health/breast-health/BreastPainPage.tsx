import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const BreastPainPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Breast health', url: '/womens-health/breast-health' },
              { label: 'Breast pain', url: '/womens-health/breast-health/breast-pain' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Breast Pain (Mastalgia)</h1>
          <p className="text-xl font-medium">
            Understanding and managing breast pain and discomfort
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About breast pain</h2>
              <p className="mb-4">
                Breast pain (mastalgia) is a very common condition. Most women experience
                breast pain at some point in their lives. It's usually not a sign of
                breast cancer.
              </p>
              <p>
                Breast pain can range from mild discomfort to severe pain that affects
                daily activities. Understanding the type of pain can help with treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of breast pain</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Cyclical breast pain</h3>
                  <p className="mb-2">
                    The most common type, related to your menstrual cycle:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Usually affects both breasts</li>
                    <li>Worst in the week before your period</li>
                    <li>Improves when your period starts</li>
                    <li>May spread to your armpit</li>
                    <li>Breasts may feel heavy, swollen or lumpy</li>
                    <li>Most common in women aged 30-50</li>
                    <li>Usually stops after menopause</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Non-cyclical breast pain</h3>
                  <p className="mb-2">
                    Not related to your menstrual cycle:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Can occur at any time</li>
                    <li>Usually affects one breast</li>
                    <li>May be in one specific area</li>
                    <li>Can be constant or come and go</li>
                    <li>More common in women aged 40-50</li>
                    <li>May continue after menopause</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Chest wall pain</h3>
                  <p className="mb-2">
                    Pain that feels like it's in the breast but comes from the chest wall:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Sharp, burning pain in a specific area</li>
                    <li>Worse with movement or pressure</li>
                    <li>May be caused by muscle strain</li>
                    <li>Can be due to costochondritis (rib inflammation)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Causes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Common causes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Hormonal changes during menstrual cycle</li>
                    <li>Starting or changing hormonal contraception</li>
                    <li>Hormone replacement therapy (HRT)</li>
                    <li>Pregnancy</li>
                    <li>Breastfeeding</li>
                    <li>Menopause</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other causes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Poor-fitting bra</li>
                    <li>Large breasts (causing strain on muscles)</li>
                    <li>Breast cysts or fibroadenomas</li>
                    <li>Injury to the breast</li>
                    <li>Previous breast surgery</li>
                    <li>Certain medications</li>
                    <li>Stress</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Rarely</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Breast cancer (usually painless, but can cause pain in some cases)</li>
                    <li>Mastitis (breast infection)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment and management</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Self-care measures</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Wear a well-fitted, supportive bra (get professionally fitted)</li>
                    <li>Wear a sports bra during exercise</li>
                    <li>Wear a soft bra at night if needed</li>
                    <li>Apply warm or cold compresses</li>
                    <li>Reduce caffeine intake</li>
                    <li>Eat a healthy, low-fat diet</li>
                    <li>Take regular exercise</li>
                    <li>Maintain a healthy weight</li>
                    <li>Try relaxation techniques to reduce stress</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Pain relief</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Paracetamol or ibuprofen</li>
                    <li>Topical anti-inflammatory gels applied to the breast</li>
                    <li>Evening primrose oil (limited evidence but may help some women)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical treatments</h3>
                  <p className="text-sm mb-2">
                    If self-care doesn't help, your doctor may suggest:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Changing contraception or HRT</li>
                    <li>Prescription medications (rarely needed)</li>
                    <li>Treatment for underlying conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Keeping a pain diary</h2>
              <p className="mb-4">
                A pain diary can help identify patterns and triggers. Record:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>When pain occurs (time of month, time of day)</li>
                <li>Where the pain is (one or both breasts, specific areas)</li>
                <li>What the pain feels like (sharp, dull, aching)</li>
                <li>How severe it is (scale of 1-10)</li>
                <li>What makes it better or worse</li>
                <li>Any medications taken</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Bring your pain diary to doctor appointments - it can help with diagnosis.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Reassurance</h3>
              <p className="text-sm mb-4">
                Breast pain is rarely a sign of cancer:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Breast cancer is usually painless</li>
                <li>Pain alone is rarely the only symptom of cancer</li>
                <li>Most breast pain has a benign cause</li>
                <li>Cyclical pain almost never indicates cancer</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h3>
              <p className="text-sm mb-4">
                See your doctor if:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Pain is severe or affecting daily life</li>
                <li>Pain doesn't improve with self-care</li>
                <li>You notice a new lump</li>
                <li>There's nipple discharge</li>
                <li>There are skin changes</li>
                <li>Pain is in one specific area and doesn't go away</li>
                <li>You're unsure about the cause</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Bra fitting tips</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Get measured by a professional fitter</li>
                <li>The band should be firm but comfortable</li>
                <li>Underwires shouldn't dig in or sit on breast tissue</li>
                <li>Straps should stay in place without digging</li>
                <li>Breasts should be fully enclosed by cups</li>
                <li>Replace bras when they lose support</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/breast-health/benign-lumps" className="text-[#d8157d] hover:underline">
                    Benign breast lumps
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health/mastitis" className="text-[#d8157d] hover:underline">
                    Mastitis
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health/breast-cancer" className="text-[#d8157d] hover:underline">
                    Breast cancer
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health" className="text-[#d8157d] hover:underline">
                    Breast health overview
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>American College of Obstetricians and Gynecologists (ACOG)</li>
                <li>World Health Organization (WHO)</li>
                <li>Mayo Clinic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastPainPage;
