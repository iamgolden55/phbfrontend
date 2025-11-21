import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const ScreeningPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Breast health', url: '/womens-health/breast-health' },
              { label: 'Breast screening', url: '/womens-health/breast-health/screening' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Breast Screening</h1>
          <p className="text-xl font-medium">
            Finding breast cancer early through mammography screening
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About breast screening</h2>
              <p className="mb-4">
                Breast screening uses mammography (X-rays of the breast) to find breast cancers
                early, when they are too small to see or feel. Finding breast cancer early means
                treatment is more likely to be successful.
              </p>
              <p>
                Breast screening is recommended for women aged 40 and above, with regular
                screenings every 1-2 years depending on individual risk factors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What is a mammogram?</h2>
              <p className="mb-4">
                A mammogram is an X-ray of the breast. It can detect cancers that are too
                small to see or feel.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Each breast is placed on a flat X-ray plate</li>
                <li>Another plate presses down on the breast to flatten it</li>
                <li>This can be uncomfortable but only lasts a few seconds</li>
                <li>Two images are usually taken of each breast (top-to-bottom and side-to-side)</li>
                <li>The whole process takes about 10-15 minutes</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Who should have breast screening?</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Standard recommendations</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Women aged 40-49: Discuss with your doctor based on risk factors</li>
                    <li>Women aged 50-70: Screening every 1-2 years recommended</li>
                    <li>Women over 70: Continue screening if in good health</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Higher risk women</h3>
                  <p className="text-sm mb-2">
                    You may need screening earlier or more often if you have:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Strong family history of breast cancer</li>
                    <li>Known genetic mutations (BRCA1, BRCA2)</li>
                    <li>Previous breast cancer or certain breast conditions</li>
                    <li>Previous radiation treatment to the chest</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Preparing for your mammogram</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule when your breasts are least likely to be tender (usually week after period)</li>
                <li>Don't wear deodorant, antiperspirant, powder, lotion or perfume on the day</li>
                <li>Wear a two-piece outfit for easy undressing from waist up</li>
                <li>Remove jewelry from neck and chest area</li>
                <li>Tell the radiographer if you have breast implants</li>
                <li>Inform them if you're pregnant or breastfeeding</li>
                <li>Bring previous mammogram images if available</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What to expect during the procedure</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>You'll undress from the waist up and wear a gown</li>
                <li>A radiographer will position your breast on the X-ray machine</li>
                <li>A plate will press down on your breast to flatten it</li>
                <li>The compression may be uncomfortable but lasts only seconds</li>
                <li>Stay still while the X-ray is taken</li>
                <li>The process is repeated for each breast and angle</li>
                <li>The whole appointment usually takes 15-30 minutes</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">
                Compression is necessary for clear images and actually reduces radiation exposure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Getting your results</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Normal results</h3>
                  <p className="text-sm">
                    Most mammograms show no sign of cancer. You'll receive a letter confirming
                    normal results and when your next screening is due.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Further tests needed</h3>
                  <p className="text-sm">
                    About 1 in 20 women are called back for further tests. This doesn't mean
                    you have cancer - most of these turn out to be normal. Additional tests may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                    <li>More mammogram images</li>
                    <li>Ultrasound scan</li>
                    <li>Biopsy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Benefits and limitations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-green-700 mb-2">Benefits</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Finds cancers early when most treatable</li>
                    <li>May mean less aggressive treatment needed</li>
                    <li>Can provide peace of mind</li>
                    <li>Reduces deaths from breast cancer</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-orange-700 mb-2">Limitations</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Can miss some cancers (false negative)</li>
                    <li>Can find things that look abnormal but aren't cancer (false positive)</li>
                    <li>May find slow-growing cancers that wouldn't cause problems</li>
                    <li>Involves small amount of radiation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Why screening matters</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Early detection saves lives</li>
                <li>Cancers found early are easier to treat</li>
                <li>May avoid mastectomy</li>
                <li>May not need chemotherapy</li>
                <li>Better survival rates</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Where to get screened</h3>
              <p className="text-sm mb-4">
                Mammograms are available at:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Teaching hospitals</li>
                <li>Private diagnostic centres</li>
                <li>Cancer screening centres</li>
                <li>Some private clinics</li>
              </ul>
              <p className="text-sm mt-4">
                Ask your doctor for a referral or contact facilities directly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Breast self-awareness</h3>
              <p className="text-sm mb-4">
                Between screenings, be breast aware:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Know how your breasts normally look and feel</li>
                <li>Check them regularly</li>
                <li>Report any changes to your doctor promptly</li>
                <li>Don't wait for next screening if you notice something</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/breast-health/risk-assessment" className="text-[#d8157d] hover:underline">
                    Breast cancer risk assessment
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
                <li>World Health Organization (WHO)</li>
                <li>American Cancer Society</li>
                <li>International Agency for Research on Cancer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningPage;
