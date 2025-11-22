import React from 'react';
import { Link } from 'react-router-dom';

interface HealthTopicType {
  id: string;
  title: string;
  description: string;
  symptoms?: string[];
  management?: string[];
  whenToSeekHelp?: string[];
}

const PregnancyHealthPage: React.FC = () => {
  const healthTopics: HealthTopicType[] = [
    {
      id: 'anemia',
      title: 'Anemia in pregnancy',
      description: 'Anemia occurs when you have a lower than normal number of red blood cells or your red blood cells don\'t contain enough hemoglobin. During pregnancy, your body produces more blood to support your baby, which can dilute your iron levels and lead to anemia.',
      symptoms: [
        'Fatigue and weakness',
        'Pale skin, lips, and nails',
        'Dizziness or lightheadedness',
        'Shortness of breath',
        'Rapid heartbeat'
      ],
      management: [
        'Take prenatal vitamins with iron as recommended by your healthcare provider',
        'Eat iron-rich foods such as lean red meat, poultry, fish, beans, and iron-fortified cereals',
        'Include vitamin C in your diet to help with iron absorption',
        'Your doctor may prescribe additional iron supplements if needed'
      ],
      whenToSeekHelp: [
        'If you experience severe fatigue that doesn\'t improve with rest',
        'If you feel dizzy or faint',
        'If you have difficulty breathing'
      ]
    },
    {
      id: 'gestational-diabetes',
      title: 'Gestational diabetes',
      description: 'Gestational diabetes is high blood sugar that develops during pregnancy. It usually shows up in the middle or late part of pregnancy. Most of the time, it goes away after your baby is born.',
      symptoms: [
        'Often there are no symptoms',
        'Increased thirst',
        'Frequent urination',
        'Fatigue'
      ],
      management: [
        'Monitor your blood sugar levels regularly',
        'Follow a healthy eating plan designed for gestational diabetes',
        'Stay physically active with safe exercises for pregnancy',
        'Take medication if prescribed by your doctor'
      ],
      whenToSeekHelp: [
        'If your blood sugar levels are consistently higher than your target range',
        'If you experience excessive thirst or urination',
        'If you notice decreased fetal movement'
      ]
    },
    {
      id: 'hypertension',
      title: 'High blood pressure (hypertension)',
      description: 'High blood pressure during pregnancy can lead to reduced blood flow to the placenta, affecting your baby\'s supply of oxygen and nutrients. It can also affect your kidneys and increase your risk of future cardiovascular disease.',
      symptoms: [
        'Often there are no symptoms',
        'Severe headaches',
        'Visual disturbances',
        'Upper abdominal pain',
        'Swelling in face and hands'
      ],
      management: [
        'Attend all prenatal appointments to monitor your blood pressure',
        'Take prescribed medications as directed',
        'Reduce sodium intake',
        'Stay physically active with safe exercises',
        'Get plenty of rest'
      ],
      whenToSeekHelp: [
        'If you have a severe headache that doesn\'t go away with pain relief',
        'If you have visual disturbances such as blurred vision or seeing spots',
        'If you experience sudden swelling in your face, hands, or feet',
        'If you have upper abdominal pain, especially on the right side'
      ]
    },
    {
      id: 'urinary-tract-infections',
      title: 'Urinary tract infections (UTIs)',
      description: 'UTIs are common during pregnancy due to changes in the urinary tract. The growing uterus can put pressure on the bladder, and hormonal changes can slow the flow of urine, increasing the risk of infection.',
      symptoms: [
        'Burning sensation when urinating',
        'Frequent urge to urinate',
        'Cloudy, strong-smelling urine',
        'Pain in the lower abdomen',
        'Fever and chills (if infection has reached kidneys)'
      ],
      management: [
        'Take antibiotics as prescribed by your healthcare provider',
        'Drink plenty of water',
        'Urinate frequently and completely empty your bladder',
        'Wipe from front to back after using the toilet'
      ],
      whenToSeekHelp: [
        'If you have pain or burning during urination',
        'If you have frequent urges to urinate',
        'If you have fever, chills, or back pain',
        'If you notice blood in your urine'
      ]
    },
    {
      id: 'heartburn',
      title: 'Heartburn and acid reflux',
      description: 'Heartburn is common during pregnancy because pregnancy hormones relax the valve between your stomach and esophagus, and your growing uterus puts pressure on your stomach.',
      symptoms: [
        'Burning sensation in the chest or throat',
        'Regurgitation of food or sour liquid',
        'Bitter taste in your mouth',
        'Discomfort that worsens when lying down or bending over'
      ],
      management: [
        'Eat smaller, more frequent meals',
        'Avoid spicy, fatty or fried foods',
        'Stay upright after eating',
        'Sleep with your head elevated',
        'Avoid eating 2-3 hours before bedtime',
        'Take antacids that are safe during pregnancy (ask your healthcare provider)'
      ],
      whenToSeekHelp: [
        'If heartburn is severe and persistent despite home remedies',
        'If you have difficulty swallowing',
        'If you have severe nausea or vomiting',
        'If you experience weight loss due to poor eating'
      ]
    },
    {
      id: 'constipation',
      title: 'Constipation',
      description: 'Constipation is common during pregnancy due to hormonal changes that slow digestion, prenatal vitamins with iron, and pressure from the growing uterus on the intestines.',
      symptoms: [
        'Infrequent bowel movements',
        'Hard, dry stools',
        'Straining during bowel movements',
        'Abdominal discomfort'
      ],
      management: [
        'Increase fiber intake with fruits, vegetables, and whole grains',
        'Drink plenty of water (at least 8-10 glasses daily)',
        'Regular physical activity like walking',
        'Don\'t ignore the urge to have a bowel movement',
        'Ask your doctor about pregnancy-safe stool softeners if needed'
      ],
      whenToSeekHelp: [
        'If constipation is severe and persists despite home remedies',
        'If you have abdominal pain or cramping',
        'If you notice blood in your stool',
        'If constipation alternates with diarrhea'
      ]
    }
  ];

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Health in Pregnancy</h1>
          <p className="text-xl font-medium">
            Advice on managing common health problems in pregnancy and when to get help
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">About Health in Pregnancy</h2>
              <p className="mb-4">
                During pregnancy, your body undergoes significant changes that can sometimes lead to health challenges.
                Many health issues during pregnancy are common and manageable, but it's important to know what to expect
                and when to seek help.
              </p>
              <p>
                This guide covers common health conditions that pregnant women may experience, along with
                symptoms, management strategies, and when you should contact your healthcare provider.
                Always consult with your midwife or doctor about any health concerns during pregnancy.
              </p>
            </div>

            {healthTopics.map((topic) => (
              <div key={topic.id} id={topic.id} className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-bold mb-4">{topic.title}</h2>
                <p className="mb-6">{topic.description}</p>

                {topic.symptoms && (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Common symptoms</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {topic.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {topic.management && (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Management</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {topic.management.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {topic.whenToSeekHelp && (
                  <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500">
                    <h3 className="font-bold mb-2">When to seek help</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {topic.whenToSeekHelp.map((sign, index) => (
                        <li key={index}>{sign}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">General Tips for a Healthy Pregnancy</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#0891b2]">Attend all prenatal appointments</h3>
                  <p className="text-gray-600 mt-1">
                    Regular check-ups allow your healthcare provider to monitor your health and your baby's development.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#0891b2]">Stay hydrated</h3>
                  <p className="text-gray-600 mt-1">
                    Drink at least 8-10 glasses of water daily to support your increased blood volume and help prevent constipation and UTIs.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#0891b2]">Eat a balanced diet</h3>
                  <p className="text-gray-600 mt-1">
                    Focus on fruits, vegetables, whole grains, lean proteins, and healthy fats to provide essential nutrients for you and your baby.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#0891b2]">Take prenatal vitamins</h3>
                  <p className="text-gray-600 mt-1">
                    These supplements contain important nutrients like folic acid, iron, and calcium that support your baby's development.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#0891b2]">Stay active safely</h3>
                  <p className="text-gray-600 mt-1">
                    Regular, moderate exercise can help manage weight, reduce stress, and prepare your body for birth. Always consult your healthcare provider before starting or continuing an exercise routine.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#0891b2]">Get adequate rest</h3>
                  <p className="text-gray-600 mt-1">
                    Aim for 7-9 hours of sleep per night, and take short rests during the day if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
              <div className="bg-[#0891b2] text-white p-4">
                <h2 className="text-xl font-bold">On This Page</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {healthTopics.map((topic) => (
                    <li key={topic.id}>
                      <a href={`#${topic.id}`} className="text-[#0891b2] hover:underline">
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 mb-4">
                  <h3 className="font-bold mb-3">Related Pages</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/pregnancy/care" className="text-[#0891b2] hover:underline">
                        Pregnancy Care
                      </Link>
                    </li>
                    <li>
                      <Link to="/pregnancy/nutrition-guide" className="text-[#0891b2] hover:underline">
                        Pregnancy Nutrition Guide
                      </Link>
                    </li>
                    <li>
                      <Link to="/pregnancy/concerns" className="text-[#0891b2] hover:underline">
                        Pregnancy Concerns
                      </Link>
                    </li>
                    <li>
                      <Link to="/pregnancy/prenatal-tests" className="text-[#0891b2] hover:underline">
                        Prenatal Tests Explained
                      </Link>
                    </li>
                    <li>
                      <Link to="/pregnancy/first-prenatal-visit" className="text-[#0891b2] hover:underline">
                        Your First Prenatal Visit
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-md">
                  <h3 className="font-bold text-red-800 mb-2">When to Get Immediate Help</h3>
                  <p className="text-sm text-red-700 mb-3">
                    Some symptoms require urgent medical attention. Contact your healthcare provider immediately if you experience:
                  </p>
                  <ul className="text-sm text-red-700 list-disc pl-4 space-y-1">
                    <li>Vaginal bleeding</li>
                    <li>Severe abdominal pain</li>
                    <li>Severe headache with vision changes</li>
                    <li>Decreased baby movement</li>
                    <li>Fever above 38°C (100.4°F)</li>
                    <li>Sudden swelling of face, hands, or feet</li>
                    <li>Thoughts of harming yourself or your baby</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyHealthPage;
