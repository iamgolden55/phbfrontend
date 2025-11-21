import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const BenignLumpsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Breast health', url: '/womens-health/breast-health' },
              { label: 'Benign breast lumps', url: '/womens-health/breast-health/benign-lumps' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Benign Breast Lumps</h1>
          <p className="text-xl font-medium">
            Understanding non-cancerous breast lumps and conditions
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About benign breast lumps</h2>
              <p className="mb-4">
                Most breast lumps are benign (not cancerous). Finding a lump can be worrying,
                but benign lumps are very common and usually don't increase your risk of
                breast cancer.
              </p>
              <p>
                It's still important to get any breast lump checked by a doctor to confirm
                it's benign and to determine if any treatment is needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of benign breast lumps</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Fibroadenomas</h3>
                  <p className="mb-2">
                    The most common benign breast tumour, especially in women under 30.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Feel firm, smooth, and rubbery</li>
                    <li>Move easily under the skin ("breast mouse")</li>
                    <li>Usually painless</li>
                    <li>Can be single or multiple</li>
                    <li>May shrink after menopause</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Breast cysts</h3>
                  <p className="mb-2">
                    Fluid-filled sacs that can develop in one or both breasts.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Most common in women aged 35-50</li>
                    <li>Feel smooth and round</li>
                    <li>Can be soft or firm</li>
                    <li>May change size with menstrual cycle</li>
                    <li>Often disappear after menopause</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Fibrocystic changes</h3>
                  <p className="mb-2">
                    Lumpy or rope-like breast tissue that changes with the menstrual cycle.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Very common - affects up to 50% of women</li>
                    <li>Breasts feel lumpy or nodular</li>
                    <li>May cause breast pain before periods</li>
                    <li>Usually affects both breasts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Fat necrosis</h3>
                  <p className="mb-2">
                    Firm, round lumps formed when fatty breast tissue is damaged.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Can occur after injury, surgery, or radiation</li>
                    <li>May feel hard and irregular</li>
                    <li>Can be mistaken for cancer on imaging</li>
                    <li>Usually doesn't need treatment</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Intraductal papillomas</h3>
                  <p className="mb-2">
                    Small, wart-like growths in the milk ducts.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Usually near the nipple</li>
                    <li>May cause nipple discharge</li>
                    <li>More common in women aged 35-55</li>
                    <li>Usually surgically removed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                Benign breast lumps may cause:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A smooth, rounded lump in the breast</li>
                <li>Lumps that move easily under the skin</li>
                <li>Breast pain or tenderness (especially before periods)</li>
                <li>Lumps that change size with the menstrual cycle</li>
                <li>Nipple discharge (sometimes)</li>
                <li>Areas of thickened breast tissue</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Many benign lumps cause no symptoms and are found during routine breast checks or screening.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">
                Your doctor will examine your breasts and may recommend:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ultrasound</strong> - shows if a lump is solid or fluid-filled</li>
                <li><strong>Mammogram</strong> - X-ray of the breast</li>
                <li><strong>Fine needle aspiration</strong> - removes fluid from a cyst</li>
                <li><strong>Core biopsy</strong> - removes a small tissue sample for testing</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                These tests can confirm whether a lump is benign or needs further investigation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Many benign lumps don't need treatment, but options include:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Watch and wait</h3>
                  <p className="text-sm">
                    If a lump is confirmed benign and causing no problems, it can be
                    monitored with regular checks.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Cyst aspiration</h3>
                  <p className="text-sm">
                    Fluid can be drained from cysts using a fine needle. This also relieves
                    any discomfort.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Surgical removal</h3>
                  <p className="text-sm">
                    May be recommended if a lump is large, growing, causing symptoms,
                    or if there's any uncertainty about the diagnosis.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Pain management</h3>
                  <p className="text-sm">
                    For painful fibrocystic changes: well-fitted bra, pain relief,
                    limiting caffeine may help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Good news</h3>
              <p className="text-sm mb-4">
                Most breast lumps are benign:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>About 80% of breast lumps are non-cancerous</li>
                <li>Benign lumps don't usually become cancer</li>
                <li>Many resolve on their own</li>
                <li>Treatment is usually simple if needed</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h3>
              <p className="text-sm mb-4">
                Always get a breast lump checked, especially if:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>It's a new lump</li>
                <li>It feels different from other breast tissue</li>
                <li>It's getting bigger</li>
                <li>There's skin dimpling or nipple changes</li>
                <li>You have bloody nipple discharge</li>
              </ul>
              <p className="text-sm mt-4">
                Don't delay - most lumps are benign, but checking gives peace of mind.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Self-care tips</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Wear a supportive, well-fitted bra</li>
                <li>Try reducing caffeine intake</li>
                <li>Use over-the-counter pain relief if needed</li>
                <li>Apply warm or cold compresses for comfort</li>
                <li>Keep track of your menstrual cycle and symptoms</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/breast-health/breast-pain" className="text-[#d8157d] hover:underline">
                    Breast pain
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health/breast-cancer" className="text-[#d8157d] hover:underline">
                    Breast cancer
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health/screening" className="text-[#d8157d] hover:underline">
                    Breast screening
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
                <li>American College of Radiology</li>
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

export default BenignLumpsPage;
