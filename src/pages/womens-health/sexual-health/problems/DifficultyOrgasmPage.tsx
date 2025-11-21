import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const DifficultyOrgasmPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Difficulty reaching orgasm', url: '/womens-health/sexual-health/problems/difficulty-orgasm' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Difficulty Reaching Orgasm (Anorgasmia)</h1>
          <p className="text-xl font-medium">
            Understanding and overcoming difficulty with orgasm
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About anorgasmia</h2>
              <p className="mb-4">
                Anorgasmia is difficulty reaching orgasm despite adequate sexual stimulation.
                It's a common concern that can affect women at any age and may be lifelong
                (primary) or develop after previously having orgasms (secondary).
              </p>
              <p>
                Many women don't orgasm from penetrative sex alone - this is normal. Most
                women need clitoral stimulation to reach orgasm.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of anorgasmia</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Primary:</strong> Never experienced an orgasm</li>
                <li><strong>Secondary:</strong> Used to orgasm but now cannot</li>
                <li><strong>Situational:</strong> Can orgasm only in certain circumstances (e.g., with masturbation but not with a partner)</li>
                <li><strong>Generalized:</strong> Difficulty orgasming in any situation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Common causes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Medical conditions (diabetes, multiple sclerosis, spinal cord injury)</li>
                    <li>Medications (antidepressants, blood pressure medications)</li>
                    <li>Hormonal changes (menopause)</li>
                    <li>Pelvic surgery or injury</li>
                    <li>Alcohol or drug use</li>
                    <li>Aging-related changes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychological factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Anxiety about sexual performance</li>
                    <li>Stress</li>
                    <li>Depression</li>
                    <li>Body image concerns</li>
                    <li>Negative attitudes or guilt about sex</li>
                    <li>Past sexual trauma or abuse</li>
                    <li>Relationship problems</li>
                    <li>Lack of trust or emotional intimacy</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Insufficient stimulation</li>
                    <li>Lack of knowledge about own body</li>
                    <li>Poor communication with partner</li>
                    <li>Unrealistic expectations from media</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment approaches</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Self-exploration</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Learn about your body and what feels pleasurable</li>
                    <li>Masturbation to understand your response patterns</li>
                    <li>Focus on pleasure rather than orgasm as the goal</li>
                    <li>Use vibrators or other aids</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Communication</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Talk to your partner about what feels good</li>
                    <li>Guide your partner during sexual activity</li>
                    <li>Remove pressure and performance anxiety</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Professional help</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Sex therapy or psychosexual counselling</li>
                    <li>Cognitive behavioral therapy (CBT)</li>
                    <li>Treatment for underlying depression or anxiety</li>
                    <li>Medical review of medications</li>
                    <li>Hormone therapy if appropriate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Important points</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Most women need direct clitoral stimulation to orgasm</li>
                <li>Only about 25% of women reliably orgasm from penetration alone</li>
                <li>Orgasm is not necessary for satisfying sex</li>
                <li>Many women who don't orgasm still enjoy sexual activity</li>
                <li>Anxiety about orgasm often makes it harder to achieve</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Shifting focus</h3>
              <p className="text-sm">
                Try focusing on pleasure and connection rather than orgasm as the goal.
                Paradoxically, removing the pressure often makes orgasm more likely.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to see a doctor</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>The issue is causing distress</li>
                <li>You suspect a medical cause</li>
                <li>You've started new medication</li>
                <li>Self-help hasn't worked</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/problems/loss-of-desire" className="text-[#d8157d] hover:underline">
                    Loss of sexual desire
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/sexual-health/problems/pain-during-sex" className="text-[#d8157d] hover:underline">
                    Pain during sex
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/sexual-health" className="text-[#d8157d] hover:underline">
                    Sexual health overview
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>International Society for Sexual Medicine</li>
                <li>American Association of Sexuality Educators (AASECT)</li>
                <li>Mayo Clinic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultyOrgasmPage;
