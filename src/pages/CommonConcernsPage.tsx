import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ConcernType {
  id: string;
  title: string;
  description: string;
  remedies: string[];
  whenToSeekHelp: string[];
  category: 'physical' | 'emotional' | 'sleep' | 'digestive' | 'other';
}

const commonConcerns: ConcernType[] = [
  {
    id: 'morning-sickness',
    title: 'Morning sickness',
    description: 'Nausea and vomiting in pregnancy, often called "morning sickness," can happen at any time of the day. It\'s very common in early pregnancy and usually clears up by weeks 16 to 20.',
    remedies: [
      'Eat small, frequent meals rather than large ones',
      'Avoid foods or smells that trigger your nausea',
      'Eat cold foods rather than hot ones if the smell of hot meals makes you feel sick',
      'Try ginger tea, biscuits or supplements',
      'Rest and get plenty of sleep',
      'Avoid alcohol, caffeine and spicy foods',
      'Try acupressure bands designed for travel sickness'
    ],
    whenToSeekHelp: [
      'If you can\'t keep any food or fluids down',
      'If you\'re vomiting blood',
      'If you have severe vomiting and can\'t stop',
      'If you have abdominal pain',
      'If you have a high temperature',
      'If you have pain when urinating'
    ],
    category: 'digestive'
  },
  {
    id: 'tiredness',
    title: 'Extreme tiredness',
    description: 'Feeling extremely tired is very common during pregnancy, especially in the first 12 weeks. This is due to hormonal changes and your body working hard to support your growing baby.',
    remedies: [
      'Rest when you can and get more sleep at night',
      'Ask for help with other children or household chores',
      'Eat a healthy, balanced diet with plenty of iron-rich foods',
      'Stay hydrated',
      'Exercise regularly but gently',
      'Take short naps when possible'
    ],
    whenToSeekHelp: [
      'If you feel extremely tired along with feeling faint or dizzy',
      'If tiredness is accompanied by shortness of breath',
      'If you\'re so tired you can\'t function at all',
      'If you also have pale skin, lips and nails (possible anemia)'
    ],
    category: 'physical'
  },
  {
    id: 'back-pain',
    title: 'Back pain',
    description: 'Back pain is common during pregnancy as your body\'s center of gravity changes. The extra weight you\'re carrying, hormonal changes, and your altered posture all contribute to back pain.',
    remedies: [
      'Maintain good posture',
      'Wear supportive shoes with low heels',
      'Use a maternity support belt',
      'Sleep on your side with pillows between your knees',
      'Apply heat or cold to the painful area',
      'Try gentle exercises or pregnancy yoga',
      'Ask a healthcare professional about safe pain relief options'
    ],
    whenToSeekHelp: [
      'If you have severe back pain that doesn\'t improve with rest',
      'If you have back pain with vaginal bleeding',
      'If you have back pain with fever',
      'If you have pain that radiates down your legs, especially with numbness or weakness'
    ],
    category: 'physical'
  },
  {
    id: 'heartburn',
    title: 'Heartburn and indigestion',
    description: 'Heartburn causes a burning feeling in your chest or throat. It happens when stomach acid flows back up into your esophagus. It\'s common in pregnancy because of hormonal changes and pressure from the growing baby.',
    remedies: [
      'Eat smaller, more frequent meals',
      'Avoid spicy, fatty or fried foods',
      'Cut out caffeine and alcohol',
      'Don\'t eat within 3 hours of going to bed',
      'Prop yourself up with pillows in bed',
      'Ask your healthcare provider about safe antacids'
    ],
    whenToSeekHelp: [
      'If symptoms are severe and interfere with eating or sleeping',
      'If you have severe chest pain that spreads to your jaw, arms or back',
      'If you have trouble swallowing',
      'If you\'re vomiting blood or material that looks like coffee grounds'
    ],
    category: 'digestive'
  },
  {
    id: 'constipation',
    title: 'Constipation',
    description: 'Constipation is a common problem during pregnancy due to hormonal changes that slow down your digestive system. The growing baby also puts pressure on your intestines.',
    remedies: [
      'Drink plenty of water and other fluids',
      'Increase fiber in your diet with fruits, vegetables, whole grains',
      'Exercise regularly',
      'Don\'t ignore the urge to go to the bathroom',
      'Ask your healthcare provider about safe laxatives or stool softeners'
    ],
    whenToSeekHelp: [
      'If constipation is severe and doesn\'t improve with home remedies',
      'If you have blood in your stool',
      'If constipation alternates with diarrhea',
      'If you have severe abdominal pain with constipation'
    ],
    category: 'digestive'
  },
  {
    id: 'swelling',
    title: 'Swelling',
    description: 'Swelling (edema) of the feet, ankles, and hands is common during pregnancy. It\'s caused by extra fluid in your body and the pressure of your growing uterus on the veins that return blood from your legs.',
    remedies: [
      'Avoid standing for long periods',
      'Wear comfortable shoes and loose clothing',
      'Elevate your feet when sitting',
      'Rest with your feet up several times a day',
      'Sleep on your left side to improve circulation',
      'Exercise regularly',
      'Reduce salt intake'
    ],
    whenToSeekHelp: [
      'If swelling is sudden or severe',
      'If you have swelling in your face or around your eyes',
      'If swelling is accompanied by headaches, vision changes, or abdominal pain',
      'If one leg is significantly more swollen than the other'
    ],
    category: 'physical'
  },
  {
    id: 'insomnia',
    title: 'Sleep problems',
    description: 'Many pregnant women have trouble sleeping. This can be due to physical discomfort, the need to urinate frequently, leg cramps, or anxiety about pregnancy and birth.',
    remedies: [
      'Create a comfortable sleeping environment',
      'Use extra pillows for support',
      'Establish a relaxing bedtime routine',
      'Avoid caffeine and large meals before bed',
      'Exercise regularly but not close to bedtime',
      'Limit fluid intake before bed',
      'Try relaxation techniques like deep breathing'
    ],
    whenToSeekHelp: [
      'If you have severe ongoing insomnia that affects your daily life',
      'If you snore loudly or gasp for breath during sleep (possible sleep apnea)',
      'If you have restless leg syndrome symptoms that disrupt your sleep'
    ],
    category: 'sleep'
  },
  {
    id: 'anxiety',
    title: 'Anxiety and mood changes',
    description: 'Mood swings and feelings of anxiety are common during pregnancy. Hormonal changes, physical discomfort, and worries about childbirth and parenting can all contribute.',
    remedies: [
      'Talk about your feelings with your partner, friends, or family',
      'Join a pregnancy support group',
      'Practice relaxation techniques like meditation or prenatal yoga',
      'Get regular exercise',
      'Make sure you get enough rest',
      'Eat a healthy diet',
      'Limit stressful activities and commitments'
    ],
    whenToSeekHelp: [
      'If you feel anxious most of the time for more than two weeks',
      'If anxiety is interfering with your daily life',
      'If you have panic attacks',
      'If you have thoughts of harming yourself',
      'If you feel depressed or have lost interest in things you used to enjoy'
    ],
    category: 'emotional'
  },
  {
    id: 'headaches',
    title: 'Headaches',
    description: 'Headaches are common during pregnancy, especially in the first and third trimesters. They can be caused by hormonal changes, increased blood volume, stress, poor posture, or lack of sleep.',
    remedies: [
      'Apply a warm or cold compress to your head or neck',
      'Rest in a dark, quiet room',
      'Practice relaxation techniques',
      'Maintain good posture',
      'Get enough sleep and stay hydrated',
      'Ask your healthcare provider about safe pain relief options'
    ],
    whenToSeekHelp: [
      'If your headache is severe or comes on suddenly',
      'If you have a headache with blurred vision, stomach pain, or swelling',
      'If you have a fever with your headache',
      'If your headache doesn\'t go away after rest and simple measures'
    ],
    category: 'physical'
  },
  {
    id: 'cravings',
    title: 'Food cravings and aversions',
    description: 'Many pregnant women experience strong food cravings or sudden dislike of certain foods. These are thought to be linked to hormonal changes affecting taste and smell.',
    remedies: [
      'Try to maintain a balanced diet despite cravings',
      'Give in to cravings in moderation as long as they\'re not harmful',
      'Find healthier alternatives to unhealthy cravings',
      'If you have aversions to healthy foods, find alternative sources of those nutrients',
      'Keep crackers handy if food aversions make you feel nauseated'
    ],
    whenToSeekHelp: [
      'If you have cravings for non-food items like dirt, clay, or soap (known as pica)',
      'If food aversions are so severe that you can\'t maintain a healthy diet',
      'If you\'re losing weight due to food aversions'
    ],
    category: 'other'
  }
];

const CommonConcernsPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredConcerns = filterCategory === 'all'
    ? commonConcerns
    : commonConcerns.filter(concern => concern.category === filterCategory);

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Common pregnancy concerns</h1>
          <p className="text-xl font-medium">
            Advice on managing common pregnancy symptoms and when to seek help
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <p className="text-lg mb-4">
            Pregnancy brings many changes to your body, and with them come a variety of new sensations and discomforts.
            Most of these are completely normal, though they may be uncomfortable.
          </p>
          <p className="text-lg mb-4">
            This guide covers common concerns during pregnancy, with advice on how to manage them and when you should talk to your midwife or doctor.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">Filter by category:</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterCategory === 'all'
                  ? 'bg-[#0891b2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All concerns
            </button>
            <button
              onClick={() => setFilterCategory('physical')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterCategory === 'physical'
                  ? 'bg-[#0891b2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Physical discomfort
            </button>
            <button
              onClick={() => setFilterCategory('digestive')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterCategory === 'digestive'
                  ? 'bg-[#0891b2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Digestive issues
            </button>
            <button
              onClick={() => setFilterCategory('emotional')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterCategory === 'emotional'
                  ? 'bg-[#0891b2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Emotional health
            </button>
            <button
              onClick={() => setFilterCategory('sleep')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterCategory === 'sleep'
                  ? 'bg-[#0891b2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sleep problems
            </button>
            <button
              onClick={() => setFilterCategory('other')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterCategory === 'other'
                  ? 'bg-[#0891b2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Other concerns
            </button>
          </div>
        </div>

        {/* Common concerns list */}
        <div className="space-y-8 mb-8">
          {filteredConcerns.map((concern) => (
            <div key={concern.id} id={concern.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#0891b2]">{concern.title}</h2>
              </div>
              <div className="p-6">
                <p className="mb-6">{concern.description}</p>

                <h3 className="font-bold text-lg mb-3">What might help:</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {concern.remedies.map((remedy, idx) => (
                    <li key={idx}>{remedy}</li>
                  ))}
                </ul>

                <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500">
                  <h3 className="font-bold text-lg mb-3">When to get medical advice:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {concern.whenToSeekHelp.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Not finding what you're looking for?</h2>
          <p className="mb-4">
            If you're experiencing a symptom not covered here or are concerned about your health, don't hesitate to contact your healthcare provider.
          </p>
          <div className="mb-4">
            <Link to="/pregnancy/concerns" className="text-[#0891b2] font-medium hover:underline">
              View symptoms not to ignore during pregnancy
            </Link>
          </div>
          <div className="mt-4">
            <Link to="/pregnancy" className="text-[#0891b2] font-medium hover:underline flex items-center">
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

export default CommonConcernsPage;
