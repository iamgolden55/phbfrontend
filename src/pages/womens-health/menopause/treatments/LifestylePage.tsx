import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const LifestylePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Menopause', url: '/womens-health/menopause' },
              { label: 'Lifestyle changes', url: '/womens-health/menopause/treatments/lifestyle' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Lifestyle Changes for Menopause</h1>
          <p className="text-xl font-medium">
            Simple changes that can help manage menopausal symptoms and improve overall health
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Why Lifestyle Changes Matter</h2>
              <p className="mb-4">
                Making healthy lifestyle changes can help reduce menopausal symptoms and improve
                your overall wellbeing. These changes can be used alongside other treatments or
                on their own for milder symptoms.
              </p>
              <p>
                The benefits extend beyond menopause - they can help reduce your risk of heart
                disease, osteoporosis, and other health conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Physical Activity</h2>
              <p className="mb-4">Regular exercise can help with hot flushes, mood, sleep, and weight management.</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Aim for</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>At least 150 minutes of moderate activity per week</li>
                    <li>Strength exercises on 2 or more days per week</li>
                    <li>Activities to improve balance and flexibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Good options include</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Brisk walking, cycling, swimming</li>
                    <li>Yoga, Pilates, tai chi</li>
                    <li>Dancing, gardening</li>
                    <li>Weight training or resistance exercises</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diet and Nutrition</h2>
              <p className="mb-4">A healthy, balanced diet can help manage symptoms and protect long-term health.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Include more</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Calcium-rich foods (dairy, leafy greens)</li>
                    <li>Vitamin D sources</li>
                    <li>Fruits and vegetables</li>
                    <li>Whole grains</li>
                    <li>Lean protein and oily fish</li>
                    <li>Phytoestrogen foods (soy, flaxseed)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Reduce</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Spicy foods (can trigger hot flushes)</li>
                    <li>Caffeine</li>
                    <li>Alcohol</li>
                    <li>Sugary foods and drinks</li>
                    <li>Processed foods</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Sleep Improvements</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep your bedroom cool - use a fan or keep windows open</li>
                <li>Wear light, breathable nightwear</li>
                <li>Use cotton sheets</li>
                <li>Stick to a regular sleep schedule</li>
                <li>Avoid caffeine and alcohol before bed</li>
                <li>Try relaxation techniques before sleep</li>
                <li>Keep a cool drink of water by your bed</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Managing Hot Flushes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identify and avoid your triggers</li>
                <li>Wear layers so you can remove clothing</li>
                <li>Keep your environment cool</li>
                <li>Use a handheld fan</li>
                <li>Drink cold water when a flush starts</li>
                <li>Try slow, deep breathing when you feel a flush coming</li>
                <li>Reduce stress where possible</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Mental Wellbeing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Practice stress management techniques</li>
                <li>Try mindfulness or meditation</li>
                <li>Stay socially connected</li>
                <li>Consider joining a menopause support group</li>
                <li>Talk about your feelings with someone you trust</li>
                <li>Prioritise activities you enjoy</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Stop Smoking</h2>
              <p className="mb-4">
                Smoking can make menopausal symptoms worse and increases the risk of heart disease,
                osteoporosis, and other health problems. If you smoke, quitting is one of the best
                things you can do for your health.
              </p>
              <Link to="/live-well/quit-smoking" className="text-[#d8157d] font-medium hover:underline">
                Get help to stop smoking →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Small Changes Add Up</h3>
              <p>
                You don't need to change everything at once. Start with one or two changes
                and build from there. Even small improvements can make a difference.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Other Treatments</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/menopause/treatments/hrt" className="text-[#d8157d] hover:underline">
                    Hormone replacement therapy (HRT)
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/menopause/treatments/non-hormonal" className="text-[#d8157d] hover:underline">
                    Non-hormonal treatments
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/menopause/treatments/complementary" className="text-[#d8157d] hover:underline">
                    Complementary therapies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related Information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/live-well/exercise" className="text-[#d8157d] hover:underline">
                    Exercise and fitness
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/healthy-eating" className="text-[#d8157d] hover:underline">
                    Healthy eating
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/sleep" className="text-[#d8157d] hover:underline">
                    Sleep and tiredness
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

export default LifestylePage;
