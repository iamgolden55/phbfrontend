import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ScreeningsPage: React.FC = () => {
  const screeningTypes = [
    {
      id: 'cervical',
      title: 'Cervical screening (smear test)',
      description: 'Checks for certain types of HPV that can cause changes to cells in the cervix and lead to cervical cancer.',
      ageGroup: 'Ages 25-64',
      frequency: 'Every 3-5 years, depending on age',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'breast',
      title: 'Breast screening (mammogram)',
      description: 'X-ray of the breast to check for signs of breast cancer.',
      ageGroup: 'Ages 50-70',
      frequency: 'Every 3 years',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      id: 'bowel',
      title: 'Bowel cancer screening',
      description: 'Tests for signs of bowel cancer using home test kits and/or colonoscopy.',
      ageGroup: 'Ages 60-74',
      frequency: 'Every 2 years',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'osteoporosis',
      title: 'Bone density screening',
      description: 'DEXA scan to measure bone mineral density and assess risk of osteoporosis.',
      ageGroup: 'Post-menopausal women with risk factors',
      frequency: 'As recommended by doctor',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2v-8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: "What should I do if I miss a screening appointment?",
      answer: "If you miss your screening appointment, contact your GP or screening center to reschedule as soon as possible. Regular screening is important for early detection of health issues."
    },
    {
      question: "Will screening tests be uncomfortable?",
      answer: "Some screening tests may cause temporary discomfort, but they're usually quick procedures. Staff are trained to make you as comfortable as possible. You can always ask for more information or support if you're anxious."
    },
    {
      question: "What if I get an abnormal result?",
      answer: "An abnormal result doesn't necessarily mean you have a health condition - it means further tests may be needed. Your healthcare provider will explain the next steps and provide support."
    },
    {
      question: "How do I prepare for a screening appointment?",
      answer: "Preparation varies by screening type. For example, avoid using vaginal medications or having sex 48 hours before a cervical screening. You'll receive specific instructions when your appointment is scheduled."
    },
    {
      question: "Can I request a female healthcare professional for my screening?",
      answer: "Yes, you can request a female healthcare professional for your screening. Make this request when you book your appointment to ensure availability."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Health screenings', url: '/womens-health/screenings' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Women's Health Screenings</h1>
          <p className="text-xl font-medium">
            Information about health screening programs available for women
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="bg-[#fdf2f8] p-6 rounded-lg mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Why screening is important</h2>
          <p className="mb-4">
            Health screening tests can help find problems early, when they may be easier to treat. Many conditions that affect
            women have no symptoms in early stages, which is why regular screening is important even if you feel healthy.
          </p>
          <p>
            The PHB offers several screening programs specifically for women's health. Different screenings are recommended
            at different ages and intervals. This page explains what screenings are available and when you should have them.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Types of screenings</h2>
          {screeningTypes.map((screening, index) => (
            <div
              key={screening.id}
              className={`border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              id={screening.id}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start">
                  <div className="mb-4 sm:mb-0 sm:mr-6">
                    {screening.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#d8157d] mb-3">{screening.title}</h3>
                    <p className="text-gray-700 mb-4">{screening.description}</p>
                    <div className="flex flex-col sm:flex-row sm:space-x-6 mb-4">
                      <div className="mb-2 sm:mb-0">
                        <span className="font-bold text-gray-700">Who: </span>
                        <span>{screening.ageGroup}</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-700">How often: </span>
                        <span>{screening.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    to={`/womens-health/screenings/${screening.id}`}
                    className="inline-flex items-center text-[#d8157d] font-medium hover:underline"
                  >
                    Learn more about {screening.title.toLowerCase()}
                    <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What to expect during screening</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Before your appointment</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>You'll receive an invitation letter when you're due for screening</li>
                <li>Follow any preparation instructions included with your appointment</li>
                <li>Consider bringing a friend or family member for support</li>
                <li>Write down any questions you have to ask the healthcare professional</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">During your appointment</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>A healthcare professional will explain the procedure</li>
                <li>You can ask questions or raise concerns at any time</li>
                <li>The screening test itself usually only takes a few minutes</li>
                <li>Your privacy and dignity will be respected throughout</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">After your screening</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>You'll be told how and when you'll receive your results</li>
                <li>For most screenings, you'll receive results by letter within 2-3 weeks</li>
                <li>If further tests are needed, you'll be contacted to arrange these</li>
                <li>Your GP will also receive a copy of your results</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Support available</h3>
              <p className="mb-4">
                If you're anxious about screening or have questions, support is available:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Speak to your GP or practice nurse</li>
                <li>Contact the screening center directly</li>
                <li>Call the PHB women's health helpline: 0800 123 4567</li>
                <li>Access information and support online through the PHB website</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#d8157d]">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Managing your screening appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">View your screening history</h3>
              <p className="mb-4">
                PHB users can view their screening history and upcoming appointments in their account.
              </p>
              <Link
                to="/account/health-records"
                className="inline-flex items-center text-[#d8157d] font-medium hover:underline"
              >
                View your health records
                <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Set screening reminders</h3>
              <p className="mb-4">
                Set up reminders for your next screening appointment to ensure you don't miss it.
              </p>
              <Link
                to="/account/health-goals"
                className="inline-flex items-center text-[#d8157d] font-medium hover:underline"
              >
                Set health reminders
                <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningsPage;
