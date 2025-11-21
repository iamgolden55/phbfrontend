import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const PremenstrualDisordersPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Mental health', url: '/womens-health/mental-health' },
              { label: 'Premenstrual disorders', url: '/womens-health/mental-health/premenstrual-disorders' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Premenstrual Disorders</h1>
          <p className="text-xl font-medium">
            Information about PMS and PMDD - premenstrual conditions that affect mood and wellbeing
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What are premenstrual disorders?</h2>
              <p className="mb-4">
                Premenstrual disorders are conditions that cause physical and emotional symptoms
                in the days before your period. These symptoms improve once your period starts.
              </p>
              <p>
                While many women experience mild premenstrual symptoms, some have more severe
                symptoms that significantly affect their daily lives and relationships.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Premenstrual Syndrome (PMS)</h2>
              <p className="mb-4">
                PMS is a common condition affecting up to 75% of women. Symptoms usually occur
                1-2 weeks before your period and can include:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical symptoms</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Bloating</li>
                    <li>Breast tenderness</li>
                    <li>Headaches</li>
                    <li>Fatigue</li>
                    <li>Muscle and joint pain</li>
                    <li>Changes in appetite</li>
                    <li>Skin problems</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Emotional symptoms</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Mood swings</li>
                    <li>Irritability</li>
                    <li>Anxiety</li>
                    <li>Feeling upset or tearful</li>
                    <li>Difficulty concentrating</li>
                    <li>Low mood</li>
                    <li>Sleep problems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#d8157d]">Premenstrual Dysphoric Disorder (PMDD)</h2>
              <p className="mb-4">
                PMDD is a severe form of PMS that affects about 5-8% of women. It's characterized
                by intense mood symptoms that significantly impact daily functioning.
              </p>

              <h3 className="font-bold text-[#d8157d] mb-2">Key features of PMDD</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Severe depression, anxiety, or mood swings</li>
                <li>Marked irritability or anger</li>
                <li>Feeling overwhelmed or out of control</li>
                <li>Difficulty with relationships during this time</li>
                <li>Trouble functioning at work or school</li>
                <li>Symptoms may include thoughts of self-harm</li>
              </ul>

              <p className="text-sm">
                PMDD is a recognised medical condition. If you think you may have PMDD,
                speak to your GP about getting a diagnosis and treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Causes</h2>
              <p className="mb-4">
                The exact cause of premenstrual disorders isn't fully understood, but they appear
                to be linked to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Hormonal sensitivity:</strong> Some women are more sensitive to the normal
                  hormonal changes during the menstrual cycle
                </li>
                <li>
                  <strong>Serotonin changes:</strong> Fluctuations in serotonin levels may contribute
                  to mood symptoms
                </li>
                <li>
                  <strong>Genetic factors:</strong> Family history may increase risk
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">
                There's no specific test for PMS or PMDD. Diagnosis is based on:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Keeping a symptom diary for at least 2-3 months</li>
                <li>Pattern of symptoms occurring before periods and improving after</li>
                <li>Ruling out other conditions</li>
              </ul>
              <p>
                Your GP may ask you to track your symptoms daily, noting when they occur
                and how severe they are in relation to your menstrual cycle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment options</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Lifestyle changes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Regular exercise - can help improve mood and reduce bloating</li>
                    <li>Healthy diet - reduce salt, caffeine, and alcohol</li>
                    <li>Good sleep habits</li>
                    <li>Stress management techniques</li>
                    <li>Supplements like vitamin B6, calcium, or evening primrose oil (talk to your doctor first)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Psychological treatments</h3>
                  <p className="mb-2">
                    Cognitive behavioural therapy (CBT) can help you develop coping strategies
                    and change negative thought patterns related to your symptoms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Medications</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>SSRIs:</strong> Antidepressants that can be taken continuously or just during the luteal phase</li>
                    <li><strong>Hormonal treatments:</strong> Combined contraceptive pill, patches, or implants</li>
                    <li><strong>Pain relief:</strong> NSAIDs for physical symptoms like pain and bloating</li>
                    <li><strong>GnRH analogues:</strong> For severe PMDD that hasn't responded to other treatments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Self-help strategies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Track your symptoms to identify patterns and triggers</li>
                <li>Plan ahead - schedule important events for times when you feel better</li>
                <li>Practice relaxation techniques like yoga or meditation</li>
                <li>Join a support group to connect with others who understand</li>
                <li>Communicate with family, friends, and employers about your condition</li>
                <li>Be kind to yourself during difficult days</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">See your GP if</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your symptoms are affecting your daily life</li>
                <li>Lifestyle changes aren't helping</li>
                <li>You're having difficulty at work or in relationships</li>
                <li>You're experiencing severe mood symptoms</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-600">Urgent help</h3>
              <p className="mb-2">
                If you're having thoughts of harming yourself, contact your GP urgently,
                call 111, or go to A&E.
              </p>
              <p className="text-sm">
                You can also call Samaritans on 116 123 (24 hours).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Symptom diary</h3>
              <p className="mb-4 text-sm">
                Keeping a daily record of your symptoms can help with diagnosis and treatment.
                Note:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Date and day of cycle</li>
                <li>Physical symptoms</li>
                <li>Mood symptoms</li>
                <li>Severity (mild, moderate, severe)</li>
                <li>Impact on daily life</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/mental-health" className="text-[#d8157d] hover:underline">
                    Women's mental health
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/periods" className="text-[#d8157d] hover:underline">
                    Periods
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/mental-health/anxiety-depression" className="text-[#d8157d] hover:underline">
                    Anxiety and depression
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/mental-wellbeing" className="text-[#d8157d] hover:underline">
                    Mental wellbeing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremenstrualDisordersPage;
