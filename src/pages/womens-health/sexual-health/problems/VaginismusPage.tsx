import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const VaginismusPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Vaginismus', url: '/womens-health/sexual-health/problems/vaginismus' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Vaginismus</h1>
          <p className="text-xl font-medium">
            Involuntary tightening of vaginal muscles that makes penetration difficult or impossible
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About vaginismus</h2>
              <p className="mb-4">
                Vaginismus is the involuntary tightening or spasm of the muscles around the
                vaginal entrance. This makes penetration painful or impossible, affecting
                sexual intercourse, using tampons, and gynecological examinations.
              </p>
              <p>
                Vaginismus is not your fault and not something you're doing deliberately.
                It's a treatable condition and many women recover fully with appropriate treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of vaginismus</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Primary vaginismus:</strong> Lifelong - you've never been able to have penetrative sex or insert anything into the vagina</li>
                <li><strong>Secondary vaginismus:</strong> Develops after previously having no problems with penetration</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pain, burning, or stinging during attempted penetration</li>
                <li>Feeling like there's a "wall" at the vaginal entrance</li>
                <li>Inability to insert tampons</li>
                <li>Difficulty with gynecological exams</li>
                <li>Fear or anxiety about vaginal penetration</li>
                <li>Stopping breathing or holding breath during attempted penetration</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Many women with vaginismus can still become aroused, produce lubrication, and
                enjoy non-penetrative sexual activity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Common causes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychological factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fear or anxiety about sex or pain</li>
                    <li>Past sexual trauma or abuse</li>
                    <li>Negative messages about sex during upbringing</li>
                    <li>Relationship problems</li>
                    <li>Fear of pregnancy</li>
                    <li>Anxiety disorders</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Previous painful experiences (first sex, childbirth, surgery)</li>
                    <li>Infections or skin conditions</li>
                    <li>Insufficient lubrication</li>
                    <li>Medical conditions affecting the pelvic area</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Often no specific cause is found, and that's okay - treatment can still be effective.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Treatment is usually very effective and involves a combination of approaches:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychosexual therapy</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Exploring fears and beliefs about sex</li>
                    <li>Education about sexual response and anatomy</li>
                    <li>Cognitive behavioral therapy (CBT)</li>
                    <li>Relaxation techniques</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Vaginal trainers (dilators)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Set of smooth, tube-shaped devices in graduated sizes</li>
                    <li>Used at home to gradually get used to insertion</li>
                    <li>Start with smallest and progress at your own pace</li>
                    <li>Focus on relaxation and control</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Pelvic floor physiotherapy</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Learn to relax and control pelvic floor muscles</li>
                    <li>Exercises to reduce muscle tension</li>
                    <li>Biofeedback techniques</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other treatments</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Treatment of any underlying infections</li>
                    <li>Topical anesthetics (short-term)</li>
                    <li>Botox injections (in some cases)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Partner involvement</h2>
              <p className="mb-4">
                Partner support is important but not essential for treatment:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Partners often attend some therapy sessions</li>
                <li>Focus on intimacy and pleasure without pressure</li>
                <li>Progress at a pace that feels comfortable</li>
                <li>Open communication is key</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Success rates</h3>
              <p className="text-sm">
                With proper treatment, success rates are very high. Most women are able to
                have comfortable penetrative sex after treatment. Treatment typically takes
                several weeks to months.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Self-help tips</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Learn about your anatomy</li>
                <li>Practice relaxation and breathing</li>
                <li>Start with finger exploration when comfortable</li>
                <li>Use lubricant</li>
                <li>Go at your own pace - don't rush</li>
                <li>Join support groups</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Getting help</h3>
              <p className="text-sm mb-4">
                Talk to your GP or a sexual health clinic. You can ask to see a female doctor
                if you prefer. You may be referred to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Psychosexual therapist</li>
                <li>Pelvic floor physiotherapist</li>
                <li>Gynecologist</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related conditions</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/problems/pain-during-sex" className="text-[#d8157d] hover:underline">
                    Pain during sex
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/sexual-health/problems/loss-of-desire" className="text-[#d8157d] hover:underline">
                    Loss of sexual desire
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
                <li>International Society for the Study of Vulvovaginal Disease</li>
                <li>American College of Obstetricians and Gynecologists (ACOG)</li>
                <li>International Society for Sexual Medicine</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaginismusPage;
