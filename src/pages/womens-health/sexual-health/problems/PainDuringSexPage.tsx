import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const PainDuringSexPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' },
              { label: 'Pain during sex', url: '/womens-health/sexual-health/problems/pain-during-sex' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Pain During Sex (Dyspareunia)</h1>
          <p className="text-xl font-medium">
            Understanding and treating painful intercourse
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About pain during sex</h2>
              <p className="mb-4">
                Pain during or after sex (dyspareunia) is common and affects many women at some
                point. The pain can occur at the entrance of the vagina (superficial) or deeper
                inside (deep dyspareunia).
              </p>
              <p>
                Pain during sex is not something you should just put up with. There are many
                effective treatments available once the cause is identified.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of pain</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Superficial pain (entry pain)</h3>
                  <p>
                    Pain at the vaginal entrance during penetration. May be caused by insufficient
                    lubrication, infection, skin conditions, or vaginismus.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Deep pain</h3>
                  <p>
                    Pain during deep penetration or with certain positions. May be caused by
                    endometriosis, pelvic inflammatory disease, ovarian cysts, or fibroids.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Common causes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical causes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Insufficient lubrication (not enough arousal time)</li>
                    <li>Vaginal dryness (menopause, breastfeeding, medications)</li>
                    <li>Infections (thrush, bacterial vaginosis, STIs)</li>
                    <li>Skin conditions (eczema, lichen sclerosus)</li>
                    <li>Endometriosis</li>
                    <li>Pelvic inflammatory disease</li>
                    <li>Ovarian cysts</li>
                    <li>Fibroids</li>
                    <li>Vaginismus (involuntary tightening of vaginal muscles)</li>
                    <li>Scarring from childbirth or surgery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychological causes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Anxiety or stress</li>
                    <li>Relationship problems</li>
                    <li>Past sexual trauma or abuse</li>
                    <li>Fear of pain creating a cycle of tension</li>
                    <li>Body image issues</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">Your doctor will typically:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ask about your symptoms, medical history, and sexual history</li>
                <li>Perform a pelvic examination</li>
                <li>Take swabs to check for infection</li>
                <li>May recommend ultrasound or other imaging if needed</li>
                <li>May refer to a specialist (gynecologist, physiotherapist, psychosexual therapist)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">Treatment depends on the underlying cause:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Self-help measures</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use water-based lubricant</li>
                    <li>Allow more time for arousal before penetration</li>
                    <li>Try different positions</li>
                    <li>Communicate with your partner about what feels good</li>
                    <li>Practice relaxation techniques</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical treatments</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Treatment for infections</li>
                    <li>Hormone therapy for vaginal dryness</li>
                    <li>Treatment for underlying conditions (endometriosis, fibroids)</li>
                    <li>Pelvic floor physiotherapy</li>
                    <li>Surgery in some cases</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychological support</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Sex therapy or counselling</li>
                    <li>Cognitive behavioral therapy (CBT)</li>
                    <li>Couples therapy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">When to see a doctor</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Pain is persistent or severe</li>
                <li>Bleeding after sex</li>
                <li>Unusual discharge</li>
                <li>Pain is affecting your relationship or wellbeing</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Tips for talking to your partner</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Choose a relaxed time to talk</li>
                <li>Explain that the pain is not their fault</li>
                <li>Discuss what feels good and what doesn't</li>
                <li>Consider attending appointments together</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related conditions</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/sexual-health/problems/vaginismus" className="text-[#d8157d] hover:underline">
                    Vaginismus
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/problems/endometriosis" className="text-[#d8157d] hover:underline">
                    Endometriosis
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
                <li>American College of Obstetricians and Gynecologists (ACOG)</li>
                <li>International Society for Sexual Medicine</li>
                <li>Royal College of Obstetricians and Gynaecologists</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainDuringSexPage;
