import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const LossOfDesirePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Loss of desire', url: '/womens-health/sexual-health/problems/loss-of-desire' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Loss of Sexual Desire</h1>
          <p className="text-xl font-medium">
            Understanding and addressing reduced interest in sex
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About loss of sexual desire</h2>
              <p className="mb-4">
                Loss of interest in sex (low libido) is common and can affect anyone at some
                point in their life. It's only a problem if it bothers you or your partner.
              </p>
              <p>
                Sexual desire naturally fluctuates over time and can be influenced by many
                factors including stress, relationships, hormones, and life events.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Common causes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Relationship factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Relationship problems or conflict</li>
                    <li>Poor communication</li>
                    <li>Lack of emotional intimacy</li>
                    <li>Boredom or routine</li>
                    <li>Trust issues or infidelity</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Hormonal changes (menopause, pregnancy, breastfeeding)</li>
                    <li>Medical conditions (diabetes, thyroid problems, heart disease)</li>
                    <li>Medications (antidepressants, blood pressure drugs, hormonal contraceptives)</li>
                    <li>Pain during sex</li>
                    <li>Fatigue or lack of sleep</li>
                    <li>Excessive alcohol or drug use</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychological factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Stress (work, finances, family)</li>
                    <li>Anxiety or depression</li>
                    <li>Poor body image or low self-esteem</li>
                    <li>Past sexual trauma or abuse</li>
                    <li>Negative attitudes about sex</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Life stages</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Having a new baby</li>
                    <li>Caring for elderly parents</li>
                    <li>Major life changes</li>
                    <li>Menopause</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment and management</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Self-help strategies</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Communicate openly with your partner</li>
                    <li>Schedule quality time together</li>
                    <li>Reduce stress through exercise, relaxation, or hobbies</li>
                    <li>Improve sleep habits</li>
                    <li>Limit alcohol consumption</li>
                    <li>Focus on intimacy without pressure for sex</li>
                    <li>Try new things to reduce routine</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical treatments</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Treating underlying medical conditions</li>
                    <li>Hormone therapy for menopausal symptoms</li>
                    <li>Reviewing or changing medications</li>
                    <li>Treating depression or anxiety</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychological support</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Sex therapy</li>
                    <li>Cognitive behavioral therapy (CBT)</li>
                    <li>Couples counselling</li>
                    <li>Individual therapy for trauma or mental health issues</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Understanding desire</h2>
              <p className="mb-4">
                It's important to understand that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>There's no "normal" amount of sexual desire</li>
                <li>Desire often responds to arousal (rather than preceding it)</li>
                <li>Emotional intimacy often needs to come before physical intimacy</li>
                <li>Desire can change throughout your life and relationships</li>
                <li>Mismatched desire levels in relationships are common and manageable</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to seek help</h3>
              <p className="text-sm mb-4">
                Consider speaking to a healthcare provider if:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Low desire is causing you distress</li>
                <li>It's affecting your relationship</li>
                <li>You suspect a medical cause</li>
                <li>Self-help strategies haven't worked</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Tips for couples</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Talk openly about your needs</li>
                <li>Don't blame yourself or your partner</li>
                <li>Be patient - changes take time</li>
                <li>Focus on connection, not just sex</li>
                <li>Consider couples therapy</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/problems/difficulty-orgasm" className="text-[#d8157d] hover:underline">
                    Difficulty reaching orgasm
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/menopause" className="text-[#d8157d] hover:underline">
                    Menopause
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/mental-health" className="text-[#d8157d] hover:underline">
                    Mental health
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>International Society for Sexual Medicine</li>
                <li>American College of Obstetricians and Gynecologists (ACOG)</li>
                <li>Mayo Clinic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossOfDesirePage;
