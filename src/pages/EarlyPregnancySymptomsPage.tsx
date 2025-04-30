import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SymptomType {
  id: string;
  title: string;
  description: string;
  whenItStarts: string;
  howCommon: 'Very common' | 'Common' | 'Less common' | 'Varies';
  managementTips: string[];
}

const earlySymptoms: SymptomType[] = [
  {
    id: 'missed-period',
    title: 'Missed period',
    description: 'A missed period is often the first sign of pregnancy that women notice. If you have a regular menstrual cycle, a missed period can be a reliable indicator that you might be pregnant.',
    whenItStarts: 'When your period is due, typically around 2 weeks after conception',
    howCommon: 'Very common',
    managementTips: [
      'Take a home pregnancy test if your period is late',
      'Remember that stress, significant weight changes, and certain medical conditions can also cause missed periods'
    ]
  },
  {
    id: 'nausea',
    title: 'Nausea and vomiting (morning sickness)',
    description: 'Despite being called "morning sickness," nausea during pregnancy can occur at any time of day. The severity varies widely among women. Some experience only mild queasiness, while others have frequent vomiting.',
    whenItStarts: 'Usually begins around weeks 4-6 and peaks between weeks 8-12',
    howCommon: 'Very common',
    managementTips: [
      'Eat small, frequent meals rather than large ones',
      'Try bland foods like crackers, especially before getting out of bed',
      'Stay hydrated with small sips of water or ginger tea',
      'Avoid foods with strong smells that trigger nausea',
      'Consider vitamin B6 supplements (after consulting with your healthcare provider)',
      'Wear acupressure wristbands designed for motion sickness',
      'Ask your doctor about anti-nausea medications if symptoms are severe'
    ]
  },
  {
    id: 'fatigue',
    title: 'Extreme tiredness and fatigue',
    description: 'Feeling unusually tired is a common early pregnancy symptom. The dramatic rise in progesterone levels, increased blood production, lower blood sugar, and lower blood pressure can all contribute to pregnancy fatigue.',
    whenItStarts: 'Can begin as early as week 1 and is often most pronounced in the first trimester',
    howCommon: 'Very common',
    managementTips: [
      'Listen to your body and rest when you need to',
      'Try to get at least 8 hours of sleep at night',
      'Take short naps during the day if possible',
      'Eat iron-rich foods to prevent anemia',
      'Stay hydrated and maintain a balanced diet',
      'Moderate exercise can actually help boost energy levels',
      'Ask for help with household tasks and other responsibilities'
    ]
  },
  {
    id: 'breast-changes',
    title: 'Breast changes',
    description: 'Hormonal changes in early pregnancy can make your breasts feel tender, swollen, or unusually sensitive. You may notice your breasts feeling heavier, fuller, or sore to the touch. The areolas (the skin around your nipples) may darken, and the veins in your breasts may become more visible.',
    whenItStarts: 'Often one of the earliest signs, starting 1-2 weeks after conception',
    howCommon: 'Very common',
    managementTips: [
      'Wear a supportive, comfortable bra (possibly a size larger than usual)',
      'Avoid sleeping on your stomach if it causes discomfort',
      'Wear a soft cotton sports bra or sleep bra at night if needed',
      'Use warm or cold compresses for comfort',
      'Avoid harsh soaps that might increase sensitivity'
    ]
  },
  {
    id: 'frequent-urination',
    title: 'Frequent urination',
    description: 'You may find yourself needing to urinate more often than usual. This happens because the growing uterus puts pressure on your bladder, and your kidneys are working harder to filter the increased blood volume in your body.',
    whenItStarts: 'Can begin as early as weeks 4-6',
    howCommon: 'Common',
    managementTips: [
      'Stay hydrated despite the inconvenience',
      'Reduce fluid intake before bedtime to minimize nighttime trips to the bathroom',
      'Empty your bladder completely when you urinate',
      'Avoid caffeine, which can increase urination',
      'Practice pelvic floor exercises (Kegels) to strengthen bladder control'
    ]
  },
  {
    id: 'food-aversions',
    title: 'Food aversions and cravings',
    description: 'Many pregnant women develop aversions to certain foods or smells, often foods they previously enjoyed. At the same time, you might experience unusual food cravings. These changes are related to hormonal fluctuations affecting your sense of taste and smell.',
    whenItStarts: 'Typically begins in the first trimester, around weeks 4-8',
    howCommon: 'Common',
    managementTips: [
      'Follow your cravings in moderation as long as they\'re for actual food items',
      'Try to maintain a balanced diet despite food aversions',
      'Find nutritious substitutes for foods you can no longer tolerate',
      'Avoid places with strong food smells if they trigger nausea',
      'Keep healthy snacks on hand for sudden cravings'
    ]
  },
  {
    id: 'spotting',
    title: 'Spotting and light bleeding',
    description: 'Light spotting or bleeding that occurs when the fertilized egg implants in the uterine lining (implantation bleeding) can be an early sign of pregnancy. This spotting is usually lighter than a normal period and may be pink or brown in color.',
    whenItStarts: 'Usually occurs 6-12 days after conception, when implantation happens',
    howCommon: 'Less common',
    managementTips: [
      'Use panty liners for light spotting',
      'Note the timing, amount, and color of spotting to discuss with your healthcare provider',
      'Contact your doctor if bleeding becomes heavy or is accompanied by pain',
      'Understand that some spotting can be normal, but it should always be mentioned to your healthcare provider'
    ]
  },
  {
    id: 'cramping',
    title: 'Mild cramping',
    description: 'Some women experience mild uterine cramping in early pregnancy. These cramps may feel similar to menstrual cramps and are caused by the uterus expanding or implantation of the fertilized egg.',
    whenItStarts: 'Can occur during implantation (6-12 days after conception) or as the uterus begins to expand',
    howCommon: 'Common',
    managementTips: [
      'Use a heating pad on a low setting on your abdomen or lower back',
      'Take a warm (not hot) bath',
      'Practice relaxation techniques like deep breathing',
      'Get plenty of rest',
      'Contact your doctor if cramping becomes severe or is accompanied by heavy bleeding'
    ]
  },
  {
    id: 'mood-changes',
    title: 'Mood swings',
    description: 'Hormonal changes can cause mood swings similar to those experienced before a period. You might feel unusually emotional, irritable, or have sudden shifts in mood.',
    whenItStarts: 'Can begin as early as the first few weeks',
    howCommon: 'Common',
    managementTips: [
      'Get adequate rest and sleep',
      'Practice stress-reduction techniques like gentle yoga, meditation, or prenatal massage',
      'Stay physically active with gentle exercise',
      'Talk about your feelings with a supportive partner, friend, or counselor',
      'Join a pregnancy support group to connect with others going through similar experiences'
    ]
  },
  {
    id: 'bloating',
    title: 'Bloating and constipation',
    description: 'Hormonal changes can slow down your digestive system, leading to feelings of bloating and constipation even in early pregnancy.',
    whenItStarts: 'Can begin shortly after conception',
    howCommon: 'Common',
    managementTips: [
      'Eat high-fiber foods like fruits, vegetables, and whole grains',
      'Drink plenty of water throughout the day',
      'Engage in regular, gentle physical activity',
      'Avoid gas-producing foods if they cause discomfort',
      'Talk to your healthcare provider before taking any over-the-counter remedies'
    ]
  },
  {
    id: 'headaches',
    title: 'Headaches',
    description: 'Increased blood volume and hormonal changes can lead to headaches during early pregnancy.',
    whenItStarts: 'Can occur throughout the first trimester',
    howCommon: 'Common',
    managementTips: [
      'Maintain good hydration',
      'Get adequate rest and reduce stress',
      'Apply a cold or warm compress to your head',
      'Practice good posture to prevent tension headaches',
      'Talk to your doctor before taking any pain medication'
    ]
  },
  {
    id: 'heightened-smell',
    title: 'Heightened sense of smell',
    description: 'Many women report having a more sensitive sense of smell during early pregnancy. Certain odors that never bothered you before might suddenly seem overwhelming or trigger nausea.',
    whenItStarts: 'Often begins in the first trimester',
    howCommon: 'Common',
    managementTips: [
      'Avoid strong-smelling foods or environments when possible',
      'Open windows for ventilation when cooking',
      'Keep rooms well-ventilated',
      'Use unscented personal care products',
      'Keep some lemon or mint scent nearby, as these can sometimes help counteract unpleasant smells'
    ]
  }
];

const EarlyPregnancySymptomsPage: React.FC = () => {
  const [expandedSymptom, setExpandedSymptom] = useState<string | null>(null);

  const toggleSymptom = (id: string) => {
    if (expandedSymptom === id) {
      setExpandedSymptom(null);
    } else {
      setExpandedSymptom(id);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Early Pregnancy Symptoms</h1>
          <p className="text-xl font-medium">
            Understanding the first signs and symptoms of pregnancy
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <p className="text-lg mb-4">
            The early weeks of pregnancy bring many changes to your body. While a missed period is often the first sign that prompts women to take a pregnancy test, there are many other symptoms that can appear even before your period is due.
          </p>
          <p className="text-lg mb-4">
            Every woman's experience of pregnancy is unique. You may experience all, some, or none of these symptoms. The absence of symptoms doesn't mean there's a problem with your pregnancy.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-3">When do early pregnancy symptoms start?</h2>
            <p className="mb-2">
              Some women notice pregnancy symptoms as early as one week after conception, while others may not experience any symptoms until weeks later. Typically:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Some symptoms, like breast tenderness, can start as early as 1-2 weeks after conception</li>
              <li>Nausea often begins around weeks 4-6</li>
              <li>Most women will notice at least some symptoms by weeks 7-8</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Common early pregnancy symptoms</h2>

        <div className="space-y-4 mb-8">
          {earlySymptoms.map((symptom) => (
            <div key={symptom.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSymptom(symptom.id)}
                className="w-full text-left p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold">{symptom.title}</h3>
                <span>
                  <svg
                    className={`h-6 w-6 text-gray-500 transform transition-transform ${expandedSymptom === symptom.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {expandedSymptom === symptom.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="mb-4">{symptom.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="font-bold mb-1">When it usually starts:</p>
                      <p>{symptom.whenItStarts}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="font-bold mb-1">How common:</p>
                      <p>{symptom.howCommon}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-bold mb-2">Managing this symptom:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {symptom.managementTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-amber-50 p-6 rounded-lg mb-8 border-l-4 border-amber-500">
          <h2 className="text-xl font-bold mb-3">When to contact your healthcare provider</h2>
          <p className="mb-4">
            While many early pregnancy symptoms are normal, contact your healthcare provider if you experience:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Severe abdominal pain or cramping</li>
            <li>Heavy bleeding (more than a light spotting)</li>
            <li>Severe vomiting that prevents you from keeping any fluids down</li>
            <li>High fever (over 38°C/100.4°F)</li>
            <li>Fainting or severe dizziness</li>
            <li>Painful urination</li>
            <li>Any symptoms that severely impact your daily functioning</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Am I pregnant? Confirming your pregnancy</h2>
          <p className="mb-4">
            If you're experiencing several early pregnancy symptoms, you may want to confirm your pregnancy by:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">Home pregnancy test</h3>
              <p>
                Home pregnancy tests detect the pregnancy hormone hCG in your urine. They are most accurate after your missed period, but some sensitive tests can detect pregnancy a few days before your period is due.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">Blood test at healthcare provider</h3>
              <p>
                Blood tests can detect pregnancy earlier than urine tests and can measure the exact amount of hCG, which can help determine how far along you are.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">Ultrasound</h3>
              <p>
                An early ultrasound can confirm pregnancy and check for a heartbeat, typically visible from around 6-7 weeks.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Related pregnancy information</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li>
              <Link to="/pregnancy/first-prenatal-visit" className="text-[#005eb8] hover:underline">Your first prenatal visit</Link>
            </li>
            <li>
              <Link to="/pregnancy/prenatal-tests" className="text-[#005eb8] hover:underline">Prenatal tests explained</Link>
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

export default EarlyPregnancySymptomsPage;
