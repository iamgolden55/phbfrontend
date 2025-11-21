import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const NonHormonalPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Menopause', url: '/womens-health/menopause' },
              { label: 'Non-hormonal treatments', url: '/womens-health/menopause/treatments/non-hormonal' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Non-Hormonal Treatments for Menopause</h1>
          <p className="text-xl font-medium">
            Alternatives to HRT for managing menopausal symptoms
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About Non-Hormonal Treatments</h2>
              <p className="mb-4">
                If you cannot or prefer not to take HRT, there are several non-hormonal treatments
                that can help manage menopausal symptoms. These may be less effective than HRT for
                some symptoms but can be a good alternative.
              </p>
              <p>
                Your doctor can help you choose the most appropriate treatment based on your
                symptoms and medical history.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Prescription Medications</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Tibolone</h3>
                  <p className="mb-2">
                    A synthetic steroid that acts similarly to combined HRT. Can help with hot
                    flushes, mood, and sex drive. Only suitable for postmenopausal women.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Clonidine</h3>
                  <p className="mb-2">
                    Originally a blood pressure medication that can reduce hot flushes and night
                    sweats. May cause side effects like dry mouth and drowsiness.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Certain Antidepressants</h3>
                  <p className="mb-2">
                    SSRIs and SNRIs (like venlafaxine, paroxetine) can help reduce hot flushes.
                    Usually only recommended if HRT cannot be taken. Can also help with mood symptoms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Gabapentin</h3>
                  <p className="mb-2">
                    An anti-seizure medication that can help reduce hot flushes. May cause
                    dizziness and drowsiness.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Vaginal Treatments</h2>
              <p className="mb-4">
                For vaginal dryness and discomfort, non-hormonal options include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Vaginal moisturisers:</strong> Applied regularly (not just during sex)
                  to keep the vaginal area moist
                </li>
                <li>
                  <strong>Lubricants:</strong> Used during sex to reduce discomfort. Water-based
                  or silicone-based options available
                </li>
                <li>
                  <strong>Ospemifene:</strong> A non-hormonal tablet that can help with vaginal
                  dryness and painful sex
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Cognitive Behavioural Therapy (CBT)</h2>
              <p className="mb-4">
                CBT is a type of talking therapy that can help you manage the way you think about
                and respond to menopausal symptoms. It's been shown to help with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hot flushes and night sweats</li>
                <li>Low mood and anxiety</li>
                <li>Sleep problems</li>
                <li>Stress and coping</li>
              </ul>
              <p className="mt-4">
                CBT can be done individually or in groups, and is available through the PHB
                or privately.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Important Considerations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Non-hormonal treatments may not be as effective as HRT for all symptoms</li>
                <li>They don't protect against osteoporosis or heart disease</li>
                <li>Each treatment has its own potential side effects</li>
                <li>Some may interact with other medications</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Talk to your GP</h3>
              <p>
                Discuss your symptoms and medical history to find the most suitable treatment
                for you.
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
                  <Link to="/womens-health/menopause/treatments/lifestyle" className="text-[#d8157d] hover:underline">
                    Lifestyle changes
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
                  <Link to="/womens-health/menopause" className="text-[#d8157d] hover:underline">
                    Menopause overview
                  </Link>
                </li>
                <li>
                  <Link to="/services/talking-therapies" className="text-[#d8157d] hover:underline">
                    Talking therapies
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

export default NonHormonalPage;
