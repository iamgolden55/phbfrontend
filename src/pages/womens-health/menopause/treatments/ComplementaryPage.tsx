import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const ComplementaryPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Menopause', url: '/womens-health/menopause' },
              { label: 'Complementary therapies', url: '/womens-health/menopause/treatments/complementary' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Complementary Therapies for Menopause</h1>
          <p className="text-xl font-medium">
            Alternative approaches that some women find helpful for managing menopausal symptoms
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Important Information</h2>
              <p className="mb-4">
                Complementary therapies are not regulated in the same way as conventional medicines.
                Scientific evidence for their effectiveness is often limited or mixed.
              </p>
              <p>
                Always tell your doctor about any complementary treatments you're using, as some can
                interact with other medications or may not be suitable for certain health conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Herbal Remedies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Black Cohosh</h3>
                  <p className="mb-2">
                    A plant extract sometimes used for hot flushes and mood symptoms. Some studies
                    show modest benefits, but results are mixed. May cause side effects like
                    stomach upset and headaches.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Red Clover</h3>
                  <p className="mb-2">
                    Contains isoflavones (plant estrogens). Evidence for effectiveness is limited.
                    Generally considered safe but may interact with some medications.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Evening Primrose Oil</h3>
                  <p className="mb-2">
                    Sometimes used for hot flushes and breast pain. Evidence of benefit is limited.
                    May interact with blood-thinning medications.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">St John's Wort</h3>
                  <p className="mb-2">
                    May help with mild mood symptoms. However, it can interact with many medications
                    including antidepressants, blood thinners, and contraceptives.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Mind-Body Therapies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Cognitive Behavioural Therapy (CBT)</h3>
                  <p>
                    Has good evidence for helping with hot flushes, night sweats, sleep problems,
                    and mood. Available through the PHB or privately.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Mindfulness and Meditation</h3>
                  <p>
                    Can help with stress, anxiety, and sleep. May help you respond better to hot
                    flushes. Many free apps and online resources available.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Yoga and Tai Chi</h3>
                  <p>
                    Combine physical activity with relaxation and mindfulness. May help with sleep,
                    mood, and overall wellbeing. Also good for flexibility and balance.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Hypnotherapy</h3>
                  <p>
                    Some evidence that clinical hypnotherapy may help reduce hot flushes. Should be
                    done with a qualified practitioner.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Physical Therapies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Acupuncture</h3>
                  <p>
                    Some women find it helps with hot flushes, but scientific evidence is limited.
                    Generally safe when done by a qualified practitioner.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Reflexology</h3>
                  <p>
                    A type of foot massage. Some women find it relaxing, but there's little evidence
                    it helps with menopausal symptoms specifically.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Aromatherapy</h3>
                  <p>
                    Essential oils may help with relaxation and mood. No strong evidence for
                    menopausal symptoms. Some oils can irritate skin or cause allergic reactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Safety Considerations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tell your doctor about all complementary therapies you're using</li>
                <li>Check for interactions with any medications you take</li>
                <li>Buy products from reputable sources</li>
                <li>Be cautious of products making strong health claims</li>
                <li>Stop using and seek advice if you experience side effects</li>
                <li>Choose qualified, registered practitioners</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Finding Practitioners</h3>
              <p className="mb-4">
                If you want to try a complementary therapy, look for practitioners registered
                with a professional body and check their qualifications.
              </p>
              <p className="text-sm text-gray-600">
                Your GP may be able to recommend local practitioners.
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
                  <Link to="/womens-health/menopause/treatments/lifestyle" className="text-[#d8157d] hover:underline">
                    Lifestyle changes
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related Information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/menopause" className="text-[#d8157d] hover:underline">
                    Menopause overview
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

export default ComplementaryPage;
