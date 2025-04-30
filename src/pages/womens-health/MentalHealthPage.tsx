import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const MentalHealthPage: React.FC = () => {
  const mentalHealthTopics = [
    {
      title: 'Perinatal mental health',
      description: 'Mental health concerns during pregnancy and after childbirth, including depression and anxiety.',
      link: '/womens-health/mental-health/perinatal'
    },
    {
      title: 'Premenstrual disorders',
      description: 'Information about premenstrual syndrome (PMS) and premenstrual dysphoric disorder (PMDD).',
      link: '/womens-health/mental-health/premenstrual-disorders'
    },
    {
      title: 'Menopause and mental health',
      description: 'How menopause can affect your mental wellbeing and strategies to manage these changes.',
      link: '/womens-health/menopause#mental-health'
    },
    {
      title: 'Eating disorders',
      description: 'Information about eating disorders, which disproportionately affect women.',
      link: '/womens-health/mental-health/eating-disorders'
    },
    {
      title: 'Anxiety and depression',
      description: 'Common mental health conditions that may present differently in women.',
      link: '/womens-health/mental-health/anxiety-depression'
    }
  ];

  const supportResources = [
    {
      title: 'Women\'s Mental Health Helpline',
      description: 'Confidential support for women experiencing mental health issues.',
      contact: '0800 123 4567',
      hours: 'Available 24/7'
    },
    {
      title: 'Perinatal Mental Health Support',
      description: 'Specialized support for mental health during pregnancy and postpartum.',
      contact: '0800 765 4321',
      hours: 'Monday to Friday, 9am to 5pm'
    },
    {
      title: 'Online Support Communities',
      description: 'Connect with other women experiencing similar mental health challenges.',
      link: '/support-communities'
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
              { label: 'Mental health', url: '/womens-health/mental-health' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Women's Mental Health</h1>
          <p className="text-xl font-medium">
            Information and support for mental health issues that commonly affect women
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="bg-[#fdf2f8] p-6 rounded-lg mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About women's mental health</h2>
          <p className="mb-4">
            Women can experience specific mental health challenges related to hormonal changes, reproductive events,
            and societal pressures. Some mental health conditions are more common in women, while others may present
            with different symptoms compared to men.
          </p>
          <p>
            Seeking help early is important. If you're experiencing mental health difficulties,
            speak to your GP or contact one of the support services listed on this page.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common mental health issues affecting women</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentalHealthTopics.map((topic, index) => (
              <Link key={index} to={topic.link} className="block group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-pink-300 h-full p-6">
                  <h3 className="text-xl font-bold text-[#d8157d] mb-3 group-hover:underline">{topic.title}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="flex justify-end">
                    <span className="text-[#d8157d] font-medium flex items-center">
                      Learn more
                      <svg className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Factors that can impact women's mental health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Hormonal changes</h3>
              <p className="mb-4">
                Fluctuations in hormones during the menstrual cycle, pregnancy, postpartum period,
                and menopause can influence mood and mental wellbeing.
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Premenstrual mood changes</li>
                <li>Pregnancy and postpartum hormonal shifts</li>
                <li>Menopausal mood symptoms</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Life events and transitions</h3>
              <p className="mb-4">
                Significant life events and transitions can create stress that impacts mental health.
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Pregnancy and becoming a parent</li>
                <li>Infertility and pregnancy loss</li>
                <li>Menopause</li>
                <li>Caring responsibilities</li>
                <li>Career and work-life balance</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Societal factors</h3>
              <p className="mb-4">
                Social and cultural factors can create additional pressures on women's mental health.
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Body image expectations</li>
                <li>Gender inequality and discrimination</li>
                <li>Juggling multiple roles</li>
                <li>Social media pressures</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Health conditions</h3>
              <p className="mb-4">
                Certain physical health conditions that affect women can also impact mental health.
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Endometriosis and chronic pelvic pain</li>
                <li>Polycystic ovary syndrome (PCOS)</li>
                <li>Thyroid disorders</li>
                <li>Autoimmune conditions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Getting help and support</h2>
          <p className="mb-6">
            It's important to seek help if you're experiencing mental health difficulties.
            There are many resources available specifically for women.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportResources.map((resource, index) => (
              <div key={index} className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-[#d8157d]">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                {resource.contact && (
                  <>
                    <p className="font-bold">Call: {resource.contact}</p>
                    <p className="text-sm text-gray-500">{resource.hours}</p>
                  </>
                )}
                {resource.link && (
                  <Link
                    to={resource.link}
                    className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                  >
                    Visit website
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Self-care strategies for mental wellbeing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Physical wellbeing</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Regular physical activity</li>
                <li>Nutritious diet</li>
                <li>Adequate sleep</li>
                <li>Limiting alcohol and caffeine</li>
              </ul>
              <Link
                to="/live-well"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
              >
                More healthy living tips
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Stress management</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Mindfulness and meditation</li>
                <li>Breathing exercises</li>
                <li>Setting boundaries</li>
                <li>Time management</li>
              </ul>
              <Link
                to="/live-well/mental-wellbeing"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
              >
                Stress management techniques
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Social connection</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Building a support network</li>
                <li>Connecting with like-minded women</li>
                <li>Community involvement</li>
                <li>Support groups</li>
              </ul>
              <Link
                to="/find-support-groups"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
              >
                Find support groups
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

export default MentalHealthPage;
