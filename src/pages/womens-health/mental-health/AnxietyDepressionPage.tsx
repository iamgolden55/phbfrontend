import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const AnxietyDepressionPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Mental health', url: '/womens-health/mental-health' },
              { label: 'Anxiety and depression', url: '/womens-health/mental-health/anxiety-depression' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Anxiety and Depression in Women</h1>
          <p className="text-xl font-medium">
            How these common mental health conditions may affect women differently
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About anxiety and depression in women</h2>
              <p className="mb-4">
                Anxiety and depression are the most common mental health conditions. Women are about
                twice as likely as men to be diagnosed with these conditions, though this may partly
                reflect differences in how men and women seek help.
              </p>
              <p>
                These conditions can occur at any age but may be influenced by hormonal changes,
                life events, and social factors that particularly affect women.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Depression in women</h2>
              <p className="mb-4">
                Depression is more than just feeling sad. It's a persistent low mood that affects
                your daily life and can last for weeks or months.
              </p>

              <h3 className="font-bold text-[#d8157d] mb-2">Common symptoms</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Persistent low mood or sadness</li>
                  <li>Loss of interest in activities</li>
                  <li>Fatigue and low energy</li>
                  <li>Sleep problems</li>
                  <li>Changes in appetite</li>
                </ul>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Difficulty concentrating</li>
                  <li>Feelings of guilt or worthlessness</li>
                  <li>Low self-esteem</li>
                  <li>Physical aches and pains</li>
                  <li>Thoughts of self-harm</li>
                </ul>
              </div>

              <h3 className="font-bold text-[#d8157d] mb-2">How depression may differ in women</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Women may be more likely to experience guilt, worthlessness, and feeling overwhelmed</li>
                <li>Symptoms may fluctuate with hormonal changes</li>
                <li>Women may be more likely to have co-occurring anxiety</li>
                <li>Seasonal patterns may be more common in women</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Anxiety in women</h2>
              <p className="mb-4">
                Anxiety is a feeling of unease, worry, or fear. While some anxiety is normal,
                it becomes a problem when it's excessive, hard to control, and affects daily life.
              </p>

              <h3 className="font-bold text-[#d8157d] mb-2">Types of anxiety disorders</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Generalised anxiety disorder (GAD):</strong> Persistent worry about many things</li>
                <li><strong>Panic disorder:</strong> Sudden attacks of intense fear with physical symptoms</li>
                <li><strong>Social anxiety:</strong> Fear of social situations and being judged</li>
                <li><strong>Phobias:</strong> Intense fear of specific things or situations</li>
                <li><strong>Health anxiety:</strong> Excessive worry about having a serious illness</li>
              </ul>

              <h3 className="font-bold text-[#d8157d] mb-2">Common symptoms</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-1">Physical symptoms:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Racing heart</li>
                    <li>Difficulty breathing</li>
                    <li>Sweating</li>
                    <li>Trembling</li>
                    <li>Nausea or stomach problems</li>
                    <li>Headaches</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Psychological symptoms:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Constant worry</li>
                    <li>Feeling on edge</li>
                    <li>Difficulty concentrating</li>
                    <li>Sleep problems</li>
                    <li>Irritability</li>
                    <li>Fear of the worst happening</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Why women may be more affected</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Hormonal factors</h3>
                  <p>
                    Hormonal fluctuations during the menstrual cycle, pregnancy, postpartum period,
                    perimenopause, and menopause can influence mood and increase vulnerability
                    to anxiety and depression.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Life events</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Pregnancy and childbirth</li>
                    <li>Infertility and pregnancy loss</li>
                    <li>Caregiving responsibilities</li>
                    <li>Relationship difficulties</li>
                    <li>Work-life balance challenges</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Social factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Gender inequality and discrimination</li>
                    <li>Body image pressures</li>
                    <li>Multiple role demands</li>
                    <li>Higher rates of sexual violence and abuse</li>
                    <li>Economic inequalities</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment options</h2>
              <p className="mb-4">
                Both anxiety and depression are highly treatable conditions:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Talking therapies</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Cognitive behavioural therapy (CBT):</strong> Helps change unhelpful thought patterns and behaviours</li>
                    <li><strong>Counselling:</strong> Talk through your problems with a trained therapist</li>
                    <li><strong>Interpersonal therapy:</strong> Focuses on relationship issues</li>
                    <li><strong>Mindfulness-based therapies:</strong> Uses meditation and awareness techniques</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Available through PHB talking therapies - you can self-refer in most areas.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medication</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Antidepressants:</strong> SSRIs are commonly prescribed and can help both depression and anxiety</li>
                    <li><strong>Beta-blockers:</strong> Can help with physical symptoms of anxiety</li>
                    <li><strong>Benzodiazepines:</strong> Short-term use only for severe anxiety</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Your doctor will discuss benefits, risks, and whether medication is safe during pregnancy or breastfeeding.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Self-help</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Regular physical activity</li>
                    <li>Healthy sleep habits</li>
                    <li>Balanced diet</li>
                    <li>Limiting alcohol and caffeine</li>
                    <li>Relaxation techniques</li>
                    <li>Connecting with others</li>
                    <li>Self-help books and apps</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Self-care strategies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Stay active:</strong> Even a short walk can help improve mood</li>
                <li><strong>Prioritise sleep:</strong> Aim for consistent bedtimes and wind-down routines</li>
                <li><strong>Connect with others:</strong> Social support is protective against mental health problems</li>
                <li><strong>Set boundaries:</strong> Learn to say no and protect your time</li>
                <li><strong>Practice self-compassion:</strong> Be kind to yourself as you would to a friend</li>
                <li><strong>Limit social media:</strong> Take breaks from screens and comparison</li>
                <li><strong>Seek help early:</strong> Don't wait until you're in crisis</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-600">When to get urgent help</h3>
              <p className="mb-4">
                If you're having thoughts of harming yourself or ending your life:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Call 999 or go to A&E</li>
                <li>Call Samaritans on 116 123</li>
                <li>Text SHOUT to 85258</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Get support</h3>
              <p className="mb-4">
                Talk to your GP if you're experiencing symptoms of anxiety or depression
                for more than two weeks.
              </p>
              <p className="text-sm text-gray-600">
                You can also self-refer to PHB talking therapies without seeing your GP first.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Helplines</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Women's Mental Health Helpline</p>
                  <p>0800 123 4567</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
                <div>
                  <p className="font-bold">Anxiety UK</p>
                  <p>03444 775 774</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9:30am-5:30pm</p>
                </div>
                <div>
                  <p className="font-bold">Samaritans</p>
                  <p>116 123</p>
                  <p className="text-sm text-gray-500">24 hours, 7 days a week</p>
                </div>
              </div>
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
                  <Link to="/womens-health/mental-health/perinatal" className="text-[#d8157d] hover:underline">
                    Perinatal mental health
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/menopause#mental-health" className="text-[#d8157d] hover:underline">
                    Menopause and mental health
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/mental-wellbeing" className="text-[#d8157d] hover:underline">
                    Mental wellbeing
                  </Link>
                </li>
                <li>
                  <Link to="/services/talking-therapies" className="text-[#d8157d] hover:underline">
                    PHB Talking Therapies
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

export default AnxietyDepressionPage;
