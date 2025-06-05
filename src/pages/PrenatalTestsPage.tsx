import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface TestType {
  id: string;
  title: string;
  description: string;
  whenPerformed: string;
  purpose: string[];
  procedure: string;
  risks: string[];
  results: string;
  category: 'screening' | 'diagnostic' | 'routine' | 'specialized';
}

const prenatalTests: TestType[] = [
  {
    id: 'first-trimester-screening',
    title: 'First Trimester Combined Screening',
    description: 'A combination of a blood test and an ultrasound scan that assesses the risk of certain chromosomal abnormalities, including Down syndrome, Edwards syndrome, and Patau syndrome.',
    whenPerformed: '11-14 weeks',
    purpose: [
      'Screen for Down syndrome (trisomy 21)',
      'Screen for Edwards syndrome (trisomy 18)',
      'Screen for Patau syndrome (trisomy 13)',
      'Check the baby\'s development',
      'Confirm pregnancy dating'
    ],
    procedure: 'The screening involves a blood test to measure pregnancy-associated plasma protein-A (PAPP-A) and human chorionic gonadotropin (hCG) levels, combined with an ultrasound scan to measure the nuchal translucency (fluid at the back of the baby\'s neck).',
    risks: [
      'This is a screening test, not a diagnostic test, so it cannot provide a definite answer about whether your baby has a chromosomal condition',
      'May cause anxiety if results indicate an increased risk',
      'No physical risks to mother or baby'
    ],
    results: 'Results are usually given as a probability or risk factor. If the screening indicates a higher risk, you will be offered diagnostic testing like CVS or amniocentesis for confirmation.',
    category: 'screening'
  },
  {
    id: 'nipt',
    title: 'Non-Invasive Prenatal Testing (NIPT)',
    description: 'A blood test that analyzes cell-free DNA from the placenta that circulates in the mother\'s bloodstream. It is highly accurate in screening for the most common chromosomal conditions.',
    whenPerformed: 'From 10 weeks onwards',
    purpose: [
      'Screen for Down syndrome (trisomy 21) with high accuracy (>99%)',
      'Screen for Edwards syndrome (trisomy 18)',
      'Screen for Patau syndrome (trisomy 13)',
      'Optional screening for sex chromosome abnormalities',
      'Can determine the baby\'s sex (if desired)'
    ],
    procedure: 'A simple blood sample is taken from the mother\'s arm, and the fetal DNA in the mother\'s blood is analyzed.',
    risks: [
      'No physical risks to mother or baby',
      'Although highly accurate, it is still a screening test, not a diagnostic test',
      'Possibility of inconclusive results (more common in women with high BMI)',
      'Can be expensive if not covered by insurance'
    ],
    results: 'Results typically take 1-2 weeks and are reported as "high risk" or "low risk" for each condition. A "high risk" result should be confirmed with a diagnostic test.',
    category: 'screening'
  },
  {
    id: 'cvs',
    title: 'Chorionic Villus Sampling (CVS)',
    description: 'A diagnostic test that involves taking a small sample of placental tissue for chromosomal and genetic analysis.',
    whenPerformed: '10-13 weeks',
    purpose: [
      'Diagnose chromosomal conditions such as Down syndrome',
      'Diagnose genetic disorders that run in families',
      'Provide definitive results earlier than amniocentesis'
    ],
    procedure: 'Using ultrasound guidance, a thin needle is inserted either through the abdomen or through the cervix to collect a small sample of placental tissue (chorionic villi).',
    risks: [
      'Miscarriage risk of approximately 1 in 100 (1%)',
      'Slight risk of infection',
      'Rarely, limb defects have been reported when performed very early (before 10 weeks)'
    ],
    results: 'Preliminary results (FISH analysis) can be available within days, with full results usually taking 2-3 weeks.',
    category: 'diagnostic'
  },
  {
    id: 'amniocentesis',
    title: 'Amniocentesis',
    description: 'A diagnostic procedure that involves collecting a small amount of amniotic fluid, which contains cells from the baby, for chromosomal and genetic testing.',
    whenPerformed: '15-20 weeks (typically around 16 weeks)',
    purpose: [
      'Diagnose chromosomal abnormalities like Down syndrome',
      'Test for genetic disorders',
      'Assess fetal lung maturity (if performed later in pregnancy)',
      'Check for certain infections'
    ],
    procedure: 'Using ultrasound guidance, a thin needle is inserted through the abdomen into the amniotic sac to withdraw a small amount of amniotic fluid.',
    risks: [
      'Miscarriage risk of approximately 1 in 200 (0.5%)',
      'Slight risk of infection',
      'Leakage of amniotic fluid',
      'Needle injury to the baby (extremely rare)'
    ],
    results: 'Preliminary results can be available within 3 days, with full results usually taking 2-3 weeks.',
    category: 'diagnostic'
  },
  {
    id: 'dating-scan',
    title: 'Dating Scan',
    description: 'An ultrasound scan performed in early pregnancy to determine the gestational age and expected due date.',
    whenPerformed: '8-14 weeks (typically around 12 weeks)',
    purpose: [
      'Confirm the pregnancy',
      'Determine how many weeks pregnant you are',
      'Calculate your due date more accurately',
      'Check if you\'re carrying more than one baby',
      'Check for some major physical abnormalities'
    ],
    procedure: 'An ultrasound transducer is moved over your abdomen, or a transvaginal ultrasound may be used for clearer early images.',
    risks: [
      'No known risks to mother or baby',
      'Ultrasound has been used for decades with no evidence of harm'
    ],
    results: 'Results are immediate, and you typically receive printed ultrasound images.',
    category: 'routine'
  },
  {
    id: 'anatomy-scan',
    title: 'Anatomy Scan (20-Week Scan)',
    description: 'A detailed ultrasound examination that checks the baby\'s physical development and screens for structural abnormalities.',
    whenPerformed: '18-22 weeks (typically around 20 weeks)',
    purpose: [
      'Check the baby\'s physical development and growth',
      'Examine the baby\'s organs and structures',
      'Look for structural abnormalities',
      'Check the position of the placenta',
      'Measure the amount of amniotic fluid',
      'Find out the baby\'s sex (if desired and if visible)'
    ],
    procedure: 'An ultrasound transducer is moved over your abdomen to capture detailed images of the baby\'s anatomy.',
    risks: [
      'No known physical risks to mother or baby',
      'May cause anxiety if potential abnormalities are identified that require follow-up'
    ],
    results: 'Results are typically discussed immediately during the scan, with a formal report provided to your healthcare provider.',
    category: 'routine'
  },
  {
    id: 'glucose-test',
    title: 'Glucose Challenge Test & Glucose Tolerance Test',
    description: 'These tests screen for and diagnose gestational diabetes, a type of diabetes that develops during pregnancy.',
    whenPerformed: '24-28 weeks (earlier if high risk)',
    purpose: [
      'Screen for gestational diabetes',
      'Identify women who need additional monitoring during pregnancy',
      'Help prevent complications related to high blood sugar'
    ],
    procedure: 'The initial screening (glucose challenge test) involves drinking a sweet glucose solution and having your blood tested one hour later. If results are abnormal, a longer glucose tolerance test is performed, involving fasting, drinking glucose solution, and multiple blood tests over 2-3 hours.',
    risks: [
      'No significant risks',
      'Some women feel nauseous after drinking the glucose solution',
      'Discomfort from multiple blood draws'
    ],
    results: 'Results are usually available within a few days. If diagnosed with gestational diabetes, you\'ll receive guidance on monitoring blood sugar and managing the condition.',
    category: 'routine'
  },
  {
    id: 'gbs-screening',
    title: 'Group B Streptococcus (GBS) Screening',
    description: 'A test to check for the presence of GBS bacteria, which can cause serious infections in newborns if transmitted during childbirth.',
    whenPerformed: '35-37 weeks',
    purpose: [
      'Identify women who carry Group B Streptococcus bacteria',
      'Determine who needs antibiotics during labor to prevent transmission to the baby'
    ],
    procedure: 'A swab sample is taken from the vagina and rectum.',
    risks: [
      'No risks associated with the test itself',
      'False negative results are possible'
    ],
    results: 'Results are usually available within a few days. If positive, antibiotics will be recommended during labor.',
    category: 'routine'
  },
  {
    id: 'nst',
    title: 'Non-Stress Test (NST)',
    description: 'A simple, non-invasive test that monitors the baby\'s heart rate in response to its movements to check on well-being.',
    whenPerformed: 'Third trimester, particularly for high-risk pregnancies',
    purpose: [
      'Monitor the baby\'s heart rate and how it changes with movement',
      'Assess fetal well-being',
      'Check for signs of fetal distress'
    ],
    procedure: 'While you recline, two belts are placed around your abdomen: one to monitor the baby\'s heart rate and another to detect contractions. You may be asked to press a button when you feel the baby move.',
    risks: [
      'No physical risks to mother or baby',
      'False positive results may lead to unnecessary interventions'
    ],
    results: 'Results are available immediately and categorized as "reactive" (normal) or "non-reactive" (may require additional testing).',
    category: 'specialized'
  },
  {
    id: 'bpp',
    title: 'Biophysical Profile (BPP)',
    description: 'A prenatal ultrasound evaluation of fetal well-being that combines an NST with assessment of fetal breathing, movement, tone, and amniotic fluid volume.',
    whenPerformed: 'Third trimester for high-risk pregnancies',
    purpose: [
      'Evaluate the baby\'s physical movements and surroundings',
      'Assess the amount of amniotic fluid',
      'Identify potential problems that require intervention',
      'Determine if early delivery might be necessary'
    ],
    procedure: 'An ultrasound examines five components: fetal heart rate (via NST), fetal breathing movements, fetal body movements, fetal muscle tone, and amniotic fluid volume.',
    risks: [
      'No physical risks to mother or baby',
      'False results may lead to unnecessary interventions or missed problems'
    ],
    results: 'Each component is scored 0 or 2, with a total possible score of 10. A score of 8-10 is generally considered normal.',
    category: 'specialized'
  },
  {
    id: 'carrier-screening',
    title: 'Carrier Screening',
    description: 'Genetic testing that determines if you or your partner carry genes for certain genetic disorders that could be passed to your child.',
    whenPerformed: 'Before pregnancy or in early pregnancy',
    purpose: [
      'Identify if parents are carriers for recessive genetic disorders',
      'Assess the risk of having a child with genetic conditions like cystic fibrosis, sickle cell anemia, or Tay-Sachs disease',
      'Inform reproductive decisions and pregnancy management'
    ],
    procedure: 'A blood sample or cheek swab is collected from one or both parents for DNA analysis.',
    risks: [
      'No physical risks',
      'Potential anxiety or distress from results',
      'Ethical considerations about reproductive decisions'
    ],
    results: 'Results typically take 2-4 weeks. If both parents are carriers of the same recessive condition, there is a 25% chance of having an affected child.',
    category: 'specialized'
  }
];

const PrenatalTestsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const filteredTests = selectedCategory === 'all'
    ? prenatalTests
    : prenatalTests.filter(test => test.category === selectedCategory);

  const toggleTest = (id: string) => {
    if (expandedTest === id) {
      setExpandedTest(null);
    } else {
      setExpandedTest(id);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Prenatal Tests Explained</h1>
          <p className="text-xl font-medium">
            Understanding the tests offered during pregnancy and what they mean for you and your baby
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <p className="text-lg mb-4">
            Prenatal tests are medical tests you receive during pregnancy to check your health and your baby\'s health. Some tests are routine, offered to all pregnant women, while others might be recommended based on your age, health history, family history, or previous test results.
          </p>
          <p className="text-lg mb-4">
            This guide explains the most common prenatal tests, when they\'re performed, and what they can tell you about your pregnancy and your baby\'s health.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-3">Types of prenatal tests</h2>
            <p className="mb-3">Prenatal tests generally fall into two main categories:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Screening tests</h3>
                <p>
                  These tests can identify if your baby is at risk for certain health conditions, but they cannot diagnose conditions with certainty. Screening tests are typically non-invasive and carry no risk to the pregnancy.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Diagnostic tests</h3>
                <p>
                  These tests can provide more definitive information about your baby\'s health and can diagnose certain conditions. Some diagnostic tests are invasive and carry a small risk of complications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">Filter by category:</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'all'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All tests
            </button>
            <button
              onClick={() => setSelectedCategory('screening')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'screening'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Screening tests
            </button>
            <button
              onClick={() => setSelectedCategory('diagnostic')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'diagnostic'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Diagnostic tests
            </button>
            <button
              onClick={() => setSelectedCategory('routine')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'routine'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Routine tests
            </button>
            <button
              onClick={() => setSelectedCategory('specialized')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'specialized'
                  ? 'bg-[#005eb8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Specialized tests
            </button>
          </div>
        </div>

        {/* Tests by trimester timeline */}
        <div className="mb-12 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">Prenatal tests timeline</h2>
          <div className="relative min-w-[768px]">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 w-full h-1 bg-gray-200"></div>

            {/* Trimester sections */}
            <div className="grid grid-cols-3 gap-4 relative">
              {/* First trimester */}
              <div>
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full z-10"></div>
                  <h3 className="text-center font-bold mt-8 mb-4 text-blue-600">First Trimester<br />(Weeks 1-12)</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="text-sm">Initial blood tests (blood type, Rh, infections, etc.)</li>
                    <li className="text-sm">Dating ultrasound (8-14 weeks)</li>
                    <li className="text-sm">First trimester screening (11-14 weeks)</li>
                    <li className="text-sm">NIPT (from 10 weeks)</li>
                    <li className="text-sm">CVS (10-13 weeks)</li>
                    <li className="text-sm">Carrier screening</li>
                  </ul>
                </div>
              </div>

              {/* Second trimester */}
              <div>
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full z-10"></div>
                  <h3 className="text-center font-bold mt-8 mb-4 text-blue-600">Second Trimester<br />(Weeks 13-26)</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="text-sm">Quad/Triple Screen (15-20 weeks)</li>
                    <li className="text-sm">Amniocentesis (15-20 weeks)</li>
                    <li className="text-sm">Anatomy ultrasound (18-22 weeks)</li>
                    <li className="text-sm">Glucose screening test (24-28 weeks)</li>
                  </ul>
                </div>
              </div>

              {/* Third trimester */}
              <div>
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full z-10"></div>
                  <h3 className="text-center font-bold mt-8 mb-4 text-blue-600">Third Trimester<br />(Weeks 27-40+)</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="text-sm">Growth ultrasounds</li>
                    <li className="text-sm">Group B Strep test (35-37 weeks)</li>
                    <li className="text-sm">Non-stress tests (as needed)</li>
                    <li className="text-sm">Biophysical profiles (as needed)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed test information */}
        <h2 className="text-2xl font-bold mb-6">Detailed test information</h2>
        <div className="space-y-4 mb-12">
          {filteredTests.map((test) => (
            <div key={test.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleTest(test.id)}
                className="w-full text-left p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-bold">{test.title}</h3>
                  <p className="text-sm text-gray-600">
                    Typically performed: {test.whenPerformed}
                    <span className="ml-3 inline-block px-2 py-1 text-xs rounded-full
                      ${test.category === 'screening' ? 'bg-green-100 text-green-800' :
                      test.category === 'diagnostic' ? 'bg-blue-100 text-blue-800' :
                      test.category === 'routine' ? 'bg-gray-100 text-gray-800' :
                      'bg-purple-100 text-purple-800'}"
                    >
                      {test.category.charAt(0).toUpperCase() + test.category.slice(1)}
                    </span>
                  </p>
                </div>
                <span>
                  <svg
                    className={`h-6 w-6 text-gray-500 transform transition-transform ${expandedTest === test.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {expandedTest === test.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="mb-4">{test.description}</p>

                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Purpose:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {test.purpose.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Procedure:</h4>
                    <p>{test.procedure}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Potential risks:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {test.risks.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Results:</h4>
                    <p>{test.results}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-amber-50 p-6 rounded-lg mb-8 border-l-4 border-amber-500">
          <h2 className="text-xl font-bold mb-3">Your choices matter</h2>
          <p className="mb-4">
            It\'s important to remember that most prenatal tests are optional. You have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Decide which tests you want to have</li>
            <li>Decline any test that you don\'t want</li>
            <li>Ask questions about the purpose, procedure, risks, and limitations of any test</li>
            <li>Seek a second opinion if you\'re unsure</li>
          </ul>
          <p>
            Discuss your options with your healthcare provider, who can provide guidance based on your individual circumstances.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Related pregnancy information</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li>
              <Link to="/pregnancy/first-prenatal-visit" className="text-[#005eb8] hover:underline">Your first prenatal visit</Link>
            </li>
            <li>
              <Link to="/pregnancy/early-pregnancy-symptoms" className="text-[#005eb8] hover:underline">Early pregnancy symptoms</Link>
            </li>
            <li>
              <Link to="/pregnancy/nutrition-guide" className="text-[#005eb8] hover:underline">Nutrition during pregnancy</Link>
            </li>
            <li>
              <Link to="/pregnancy/common-concerns" className="text-[#005eb8] hover:underline">Common pregnancy concerns</Link>
            </li>
            <li>
              <Link to="/pregnancy/calendar" className="text-[#005eb8] hover:underline">Pregnancy calendar</Link>
            </li>
            <li>
              <Link to="/tools/due-date-calculator" className="text-[#005eb8] hover:underline">Due date calculator</Link>
            </li>
          </ul>
          <div className="mt-4">
            <Link to="/pregnancy" className="text-[#005eb8] font-medium hover:underline flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to pregnancy home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrenatalTestsPage;
