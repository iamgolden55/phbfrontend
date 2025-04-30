import React from 'react';
import { Link } from 'react-router-dom';

interface CareTopicType {
  id: string;
  title: string;
  description: string;
  recommendations?: string[];
  tips?: string[];
  whenToSeekHelp?: string[];
}

const PregnancyCarePage: React.FC = () => {
  const careTopics: CareTopicType[] = [
    {
      id: 'prenatal-care',
      title: 'Prenatal Care',
      description: 'Prenatal care is the healthcare you receive during pregnancy. Regular check-ups are essential to monitor your health and your baby\'s development. These visits allow healthcare providers to identify and address potential concerns early.',
      recommendations: [
        'Schedule your first prenatal appointment as soon as you know you\'re pregnant',
        'Attend all recommended appointments even if you feel well',
        'First trimester: monthly visits',
        'Second trimester: visits every 2-4 weeks',
        'Third trimester: weekly visits as you approach your due date',
        'Bring your partner or a support person to appointments when possible'
      ],
      tips: [
        'Prepare questions for your healthcare provider before each visit',
        'Keep a journal of symptoms or concerns to discuss during appointments',
        'Take prenatal vitamins as prescribed',
        'Follow your healthcare provider\'s guidance on screenings and tests'
      ]
    },
    {
      id: 'self-care',
      title: 'Self-Care During Pregnancy',
      description: 'Taking care of yourself is essential during pregnancy. Self-care practices can help you manage stress, maintain physical health, and prepare mentally for childbirth and parenthood.',
      recommendations: [
        'Get adequate rest and sleep (7-9 hours per night)',
        'Stay hydrated by drinking 8-10 glasses of water daily',
        'Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins',
        'Engage in moderate, pregnancy-safe exercise as approved by your healthcare provider',
        'Practice stress-reduction techniques like meditation, gentle yoga, or deep breathing'
      ],
      tips: [
        'Listen to your body and rest when needed',
        'Accept help from friends and family',
        'Set boundaries to protect your energy and wellbeing',
        'Schedule time for activities you enjoy',
        'Connect with other expectant parents through classes or support groups'
      ]
    },
    {
      id: 'emotional-wellbeing',
      title: 'Emotional Wellbeing',
      description: 'Pregnancy can bring a range of emotions, from joy and excitement to anxiety and worry. Hormonal changes can also affect your mood and emotions. Taking care of your mental health is just as important as your physical health during pregnancy.',
      recommendations: [
        'Communicate openly with your partner about your feelings and concerns',
        'Stay connected with supportive friends and family members',
        'Consider joining a pregnancy support group',
        'Prioritize activities that bring you joy and relaxation',
        'Prepare for parenthood by reading books or taking classes'
      ],
      tips: [
        'Acknowledge your feelings without judgment',
        'Practice self-compassion',
        'Set realistic expectations for pregnancy and parenthood',
        'Take breaks from social media if it increases anxiety',
        'Focus on the present moment rather than worrying about the future'
      ],
      whenToSeekHelp: [
        'If you feel persistently sad, anxious, or hopeless',
        'If you have trouble sleeping or concentrating',
        'If you have thoughts of harming yourself or others',
        'If you feel overwhelmed by worry or fear',
        'If you are experiencing significant stress or relationship problems'
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutrition and Hydration',
      description: 'Proper nutrition during pregnancy is crucial for your health and your baby\'s development. Your nutritional needs increase during pregnancy, and certain nutrients become even more important.',
      recommendations: [
        'Increase calorie intake by about 300-500 calories per day (second and third trimesters)',
        'Focus on nutrient-dense foods rather than empty calories',
        'Include protein-rich foods at every meal',
        'Eat a variety of fruits and vegetables daily',
        'Choose whole grains over refined carbohydrates',
        'Include healthy fats from sources like avocados, nuts, and olive oil',
        'Stay hydrated with water, milk, and limited amounts of fruit juice'
      ],
      tips: [
        'Eat small, frequent meals if you experience nausea or heartburn',
        'Keep healthy snacks accessible for hunger between meals',
        'Limit caffeine to 200mg per day (about one 12oz cup of coffee)',
        'Avoid alcohol completely during pregnancy',
        'Speak with your healthcare provider before taking any supplements beyond prenatal vitamins'
      ]
    },
    {
      id: 'physical-activity',
      title: 'Physical Activity and Rest',
      description: 'Regular physical activity during pregnancy can improve your health, reduce discomfort, and prepare your body for labor and delivery. However, it\'s important to balance activity with adequate rest.',
      recommendations: [
        'Aim for 150 minutes of moderate activity per week (if approved by your healthcare provider)',
        'Choose low-impact activities like walking, swimming, or prenatal yoga',
        'Avoid activities with high fall risk or potential for abdominal trauma',
        'Modify exercises as your pregnancy progresses',
        'Listen to your body and stop if you feel pain, dizziness, or excessive fatigue'
      ],
      tips: [
        'Wear supportive shoes and comfortable clothing',
        'Stay cool and hydrated during exercise',
        'Use proper form to avoid injury',
        'Consider pregnancy support belts for comfort as your belly grows',
        'Incorporate rest periods throughout the day',
        'Sleep on your side (preferably left side) after the first trimester'
      ],
      whenToSeekHelp: [
        'If you experience vaginal bleeding or fluid leakage during or after exercise',
        'If you have persistent pain or contractions during or after activity',
        'If you feel extremely short of breath, dizzy, or faint',
        'If you notice decreased fetal movement after exercise',
        'If you have chest pain or rapid heartbeat that doesn\'t quickly resolve with rest'
      ]
    },
    {
      id: 'partner-involvement',
      title: 'Partner Involvement and Support',
      description: 'Involving your partner in your pregnancy journey can strengthen your relationship and help them bond with the baby before birth. Partners play a crucial role in providing emotional and practical support.',
      recommendations: [
        'Invite your partner to prenatal appointments when possible',
        'Share information about the baby\'s development',
        'Discuss parenting approaches and expectations',
        'Attend childbirth and parenting classes together',
        'Plan for your partner\'s role during labor and delivery'
      ],
      tips: [
        'Communicate openly about your needs and feelings',
        'Assign specific responsibilities to help your partner feel involved',
        'Create opportunities for your partner to bond with the baby (talking to your belly, feeling kicks)',
        'Make important decisions together',
        'Plan time to connect as a couple before the baby arrives'
      ]
    }
  ];

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Pregnancy Care</h1>
          <p className="text-xl font-medium">
            Essential guidance for taking care of yourself and your baby during pregnancy
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">About Pregnancy Care</h2>
              <p className="mb-4">
                Pregnancy is a time of significant change for both your body and your life. Taking proper
                care of yourself during pregnancy is essential for your health and your baby's development.
              </p>
              <p>
                This guide covers key aspects of pregnancy care, including prenatal appointments,
                self-care practices, emotional wellbeing, nutrition, physical activity, and more.
                Following these recommendations can help you have a healthier and more comfortable pregnancy.
              </p>
            </div>

            {careTopics.map((topic) => (
              <div key={topic.id} id={topic.id} className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-bold mb-4">{topic.title}</h2>
                <p className="mb-6">{topic.description}</p>

                {topic.recommendations && (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Recommendations</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {topic.recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {topic.tips && (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Helpful Tips</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {topic.tips.map((tip, index) => (
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
              <h2 className="text-xl font-bold mb-4">Preparing for Your Baby's Arrival</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#005eb8]">Create a birth plan</h3>
                  <p className="text-gray-600 mt-1">
                    A birth plan outlines your preferences for labor and delivery. Discuss your plan with your healthcare provider to ensure it's realistic and safe.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#005eb8]">Pack your hospital bag</h3>
                  <p className="text-gray-600 mt-1">
                    Have your hospital bag packed by 36 weeks with essentials for you, your baby, and your partner. Include important documents, comfort items, and necessities for your stay.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#005eb8]">Prepare your home</h3>
                  <p className="text-gray-600 mt-1">
                    Set up the nursery, stock up on baby supplies, and prepare meals that can be frozen and easily reheated after your baby arrives.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#005eb8]">Arrange for help</h3>
                  <p className="text-gray-600 mt-1">
                    Organize support for the early weeks after birth. Consider who can help with household tasks, meal preparation, and giving you time to rest.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
              <div className="bg-[#005eb8] text-white p-4">
                <h2 className="text-xl font-bold">On This Page</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {careTopics.map((topic) => (
                    <li key={topic.id}>
                      <a href={`#${topic.id}`} className="text-[#005eb8] hover:underline">
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 mb-4">
                  <h3 className="font-bold mb-3">Related Pages</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/pregnancy/health" className="text-[#005eb8] hover:underline">
                        Health in Pregnancy
                      </Link>
                    </li>
                    <li>
                      <Link to="/pregnancy/nutrition-guide" className="text-[#005eb8] hover:underline">
                        Pregnancy Nutrition Guide
                      </Link>
                    </li>
                    <li>
                      <Link to="/pregnancy/birth-plan-creator" className="text-[#005eb8] hover:underline">
                        Birth Plan Creator
                      </Link>
                    </li>
                    <li>
                      <Link to="/tools/weight-gain-calculator" className="text-[#005eb8] hover:underline">
                        Weight Gain Calculator
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
                    <li>Contractions before 37 weeks</li>
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

export default PregnancyCarePage;
