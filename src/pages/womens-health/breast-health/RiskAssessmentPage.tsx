import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const RiskAssessmentPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Breast health', url: '/womens-health/breast-health' },
              { label: 'Risk assessment', url: '/womens-health/breast-health/risk-assessment' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Breast Cancer Risk Assessment</h1>
          <p className="text-xl font-medium">
            Understanding your personal risk factors for breast cancer
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About breast cancer risk</h2>
              <p className="mb-4">
                All women have some risk of developing breast cancer. Understanding your personal
                risk factors can help you make informed decisions about screening and prevention.
              </p>
              <p>
                Having risk factors doesn't mean you will get breast cancer. Many women with
                risk factors never develop it, while some women with no known risk factors do.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risk factors you cannot change</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Age</h3>
                  <p className="text-sm">
                    The risk of breast cancer increases with age. Most breast cancers are
                    diagnosed in women over 50.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Family history</h3>
                  <p className="text-sm mb-2">
                    Your risk is higher if you have close relatives with breast cancer:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Mother, sister, or daughter with breast cancer</li>
                    <li>Multiple relatives on same side of family</li>
                    <li>Relatives diagnosed before age 50</li>
                    <li>Male relatives with breast cancer</li>
                    <li>Relatives with ovarian cancer</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Genetic factors</h3>
                  <p className="text-sm mb-2">
                    About 5-10% of breast cancers are linked to inherited gene mutations:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>BRCA1 and BRCA2 - significant increase in risk</li>
                    <li>Other genes: TP53, PTEN, PALB2</li>
                    <li>Genetic testing may be recommended for high-risk families</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Previous breast conditions</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Previous breast cancer</li>
                    <li>Ductal carcinoma in situ (DCIS)</li>
                    <li>Lobular carcinoma in situ (LCIS)</li>
                    <li>Atypical hyperplasia</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Dense breast tissue</h3>
                  <p className="text-sm">
                    Women with dense breasts have higher risk and cancers can be harder
                    to see on mammograms.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Reproductive factors</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Starting periods before age 12</li>
                    <li>Menopause after age 55</li>
                    <li>Never having children</li>
                    <li>First pregnancy after age 30</li>
                    <li>Never breastfeeding</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Previous radiation treatment</h3>
                  <p className="text-sm">
                    Radiation to the chest before age 30 (e.g., for Hodgkin lymphoma)
                    increases risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risk factors you can change</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Weight</h3>
                  <p className="text-sm">
                    Being overweight or obese, especially after menopause, increases risk.
                    Fat tissue produces estrogen which can fuel some breast cancers.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical activity</h3>
                  <p className="text-sm">
                    Regular exercise reduces breast cancer risk. Aim for at least 150 minutes
                    of moderate activity per week.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Alcohol</h3>
                  <p className="text-sm">
                    Drinking alcohol increases risk. The more you drink, the higher the risk.
                    Even small amounts increase risk slightly.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Smoking</h3>
                  <p className="text-sm">
                    Smoking is linked to increased breast cancer risk, especially if you
                    started smoking young.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Hormone use</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Combined HRT increases risk (returns to normal within 5 years of stopping)</li>
                    <li>Some hormonal contraceptives may slightly increase risk</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risk reduction strategies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">For all women</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Maintain a healthy weight</li>
                    <li>Exercise regularly</li>
                    <li>Limit alcohol consumption</li>
                    <li>Don't smoke</li>
                    <li>Breastfeed if possible</li>
                    <li>Eat a healthy diet</li>
                    <li>Attend regular screening</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">For high-risk women</h3>
                  <p className="text-sm mb-2">
                    Additional options may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>More frequent screening (including MRI)</li>
                    <li>Risk-reducing medications (tamoxifen, raloxifene)</li>
                    <li>Preventive surgery (mastectomy, oophorectomy)</li>
                    <li>Genetic counselling and testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Genetic testing</h2>
              <p className="mb-4">
                Genetic testing may be recommended if you have:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Strong family history of breast or ovarian cancer</li>
                <li>Breast cancer diagnosed before age 50</li>
                <li>Triple-negative breast cancer</li>
                <li>Ashkenazi Jewish heritage</li>
                <li>Male family member with breast cancer</li>
                <li>Known BRCA mutation in the family</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Genetic counselling is recommended before and after testing to help understand
                the results and implications.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Perspective</h3>
              <p className="text-sm mb-4">
                Most women will not get breast cancer:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>About 1 in 8 women develop breast cancer</li>
                <li>This means 7 in 8 will not</li>
                <li>Many risk factors only slightly increase risk</li>
                <li>Healthy lifestyle can reduce risk</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Talk to your doctor if</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>You have multiple relatives with breast cancer</li>
                <li>Relatives were diagnosed young (under 50)</li>
                <li>You have relatives with ovarian cancer</li>
                <li>There's male breast cancer in family</li>
                <li>You're worried about your risk</li>
              </ul>
              <p className="text-sm mt-4">
                Your doctor can assess your risk and discuss appropriate screening and prevention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Risk assessment tools</h3>
              <p className="text-sm mb-4">
                Several tools can estimate breast cancer risk:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Gail Model</li>
                <li>Tyrer-Cuzick Model</li>
                <li>BOADICEA</li>
              </ul>
              <p className="text-sm mt-4">
                These provide estimates only. Your doctor can help interpret results.
              </p>
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
                <li>American Cancer Society</li>
                <li>World Health Organization (WHO)</li>
                <li>National Cancer Institute</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentPage;
