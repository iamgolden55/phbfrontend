import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const BreastCancerPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Breast health', url: '/womens-health/breast-health' },
              { label: 'Breast cancer', url: '/womens-health/breast-health/breast-cancer' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Breast Cancer</h1>
          <p className="text-xl font-medium">
            Understanding breast cancer symptoms, diagnosis, treatment and support
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About breast cancer</h2>
              <p className="mb-4">
                Breast cancer develops when cells in the breast begin to grow uncontrollably.
                It is the most common cancer among women in Nigeria and worldwide, but with
                early detection and treatment, many women survive and live healthy lives.
              </p>
              <p>
                Breast cancer can occur in both women and men, though it is rare in men.
                Understanding the symptoms and risk factors can help with early detection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                The most common symptoms of breast cancer include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A new lump or area of thickened tissue in either breast that wasn't there before</li>
                <li>A change in the size or shape of one or both breasts</li>
                <li>A discharge from either nipple (which may be blood-stained)</li>
                <li>A lump or swelling in either armpit</li>
                <li>Dimpling or puckering of the skin on your breast</li>
                <li>A rash on or around your nipple</li>
                <li>A change in the appearance of your nipple (becoming sunken or inverted)</li>
                <li>Pain in either breast or armpit unrelated to your period</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Many breast changes are not cancer, but any changes should be checked by a doctor promptly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of breast cancer</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Non-invasive breast cancer</h3>
                  <p>
                    Cancer cells are contained within the milk ducts or lobules and haven't spread
                    to surrounding tissue. Also called carcinoma in situ or pre-cancerous changes.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Invasive breast cancer</h3>
                  <p>
                    Cancer cells have spread beyond the ducts or lobules into surrounding breast tissue.
                    This is the most common type and can spread to other parts of the body.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Inflammatory breast cancer</h3>
                  <p>
                    A rare, aggressive form where cancer cells block lymph vessels in the skin,
                    causing the breast to look red and swollen.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Paget's disease of the nipple</h3>
                  <p>
                    A rare type that affects the nipple and the area around it (areola),
                    often appearing as a red, scaly rash.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risk factors</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Factors you cannot change</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Age - risk increases as you get older (most common over 50)</li>
                    <li>Family history - close relatives with breast or ovarian cancer</li>
                    <li>Genetic mutations (BRCA1, BRCA2)</li>
                    <li>Previous breast cancer or certain non-cancerous conditions</li>
                    <li>Dense breast tissue</li>
                    <li>Early menstruation or late menopause</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Factors you can change</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Being overweight or obese (especially after menopause)</li>
                    <li>Lack of physical activity</li>
                    <li>Drinking alcohol</li>
                    <li>Smoking</li>
                    <li>Taking certain hormone treatments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">If you notice symptoms, your doctor may use several tests:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Clinical breast examination</strong> - doctor examines your breasts</li>
                <li><strong>Mammogram</strong> - X-ray of the breast</li>
                <li><strong>Ultrasound</strong> - uses sound waves to create images</li>
                <li><strong>Biopsy</strong> - removing a small sample of tissue for testing</li>
                <li><strong>MRI scan</strong> - may be used in certain cases</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                If cancer is found, further tests determine the stage and type to plan treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Treatment depends on the type, stage, and individual factors. Options include:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Surgery</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Lumpectomy - removing the tumor and some surrounding tissue</li>
                    <li>Mastectomy - removing the whole breast</li>
                    <li>Lymph node removal - checking if cancer has spread</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Radiotherapy</h3>
                  <p>
                    Using high-energy rays to kill cancer cells, often after surgery
                    to destroy any remaining cancer cells.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Chemotherapy</h3>
                  <p>
                    Using anti-cancer drugs to kill cancer cells. May be given before
                    surgery to shrink tumors or after to reduce recurrence risk.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Hormone therapy</h3>
                  <p>
                    For hormone receptor-positive cancers, blocking hormones that help
                    cancer grow.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Targeted therapy</h3>
                  <p>
                    Drugs that target specific features of cancer cells, such as
                    HER2-positive breast cancer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">When to see a doctor</h3>
              <p className="text-sm mb-4">
                See your doctor immediately if you notice:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Any new lump in your breast or armpit</li>
                <li>Changes in breast size or shape</li>
                <li>Skin changes (dimpling, puckering)</li>
                <li>Nipple discharge or changes</li>
                <li>Persistent breast pain</li>
              </ul>
              <p className="text-sm mt-4 font-medium">
                Early detection saves lives. Don't delay getting checked.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Survival rates</h3>
              <p className="text-sm mb-4">
                When breast cancer is found early and treated:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Stage 1: Over 90% survival rate</li>
                <li>Stage 2: Around 80-90% survival rate</li>
                <li>Early detection dramatically improves outcomes</li>
              </ul>
              <p className="text-sm mt-4">
                Regular screening and being breast aware are key to early detection.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Living with breast cancer</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Join a support group</li>
                <li>Talk to family and friends</li>
                <li>Maintain a healthy diet</li>
                <li>Stay physically active as able</li>
                <li>Attend all follow-up appointments</li>
                <li>Seek counselling if needed</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/breast-health/screening" className="text-[#d8157d] hover:underline">
                    Breast screening
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health/risk-assessment" className="text-[#d8157d] hover:underline">
                    Risk assessment
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health/benign-lumps" className="text-[#d8157d] hover:underline">
                    Benign breast lumps
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
                <li>Nigeria National Cancer Control Programme</li>
                <li>World Health Organization (WHO)</li>
                <li>American Cancer Society</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastCancerPage;
