import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import PregnancyJourneyNav from '../../components/PregnancyJourneyNav';

interface SectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

const LaborAndBirthPage: React.FC = () => {
  // Custom breadcrumbs for this page
  const customBreadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Pregnancy', path: '/pregnancy' },
    { label: 'Pregnancy journey', path: '/pregnancy#journey' },
    { label: 'Labor and birth', path: '/pregnancy/labor-and-birth' },
  ];

  const sections: SectionType[] = [
    {
      id: 'stages-of-labor',
      title: 'Stages of labor',
      content: (
        <div>
          <p className="mb-4">
            Labor is the process that leads to the birth of your baby. Understanding the different stages of labor can help you prepare for what to expect during childbirth.
          </p>

          <h3 className="font-medium text-lg mb-3">The three stages of labor</h3>
          <p className="mb-4">
            Labor is divided into three main stages, each serving a different purpose in the birth process:
          </p>

          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">First stage: Dilation of the cervix</h3>
            </div>
            <div className="p-4 space-y-3">
              <p>This is the longest stage and has three phases:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-medium">Early or latent phase</span> - Your cervix dilates to 3cm. Contractions are usually mild and may be irregular.</li>
                <li><span className="font-medium">Active phase</span> - Your cervix dilates from 3cm to 7cm. Contractions become more regular, stronger, and longer.</li>
                <li><span className="font-medium">Transition phase</span> - Your cervix dilates from 7cm to 10cm. Contractions are very strong and close together.</li>
              </ul>
            </div>
          </div>

          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">Second stage: Pushing and birth</h3>
            </div>
            <div className="p-4 space-y-3">
              <p>This is when you push your baby through the birth canal and give birth.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your cervix is fully dilated at 10cm</li>
                <li>You'll feel an urge to push with each contraction</li>
                <li>This stage can last from a few minutes to a few hours</li>
                <li>Your baby is born during this stage</li>
              </ul>
            </div>
          </div>

          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">Third stage: Delivery of the placenta</h3>
            </div>
            <div className="p-4 space-y-3">
              <p>After your baby is born, you deliver the placenta.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Usually happens within 30 minutes after birth</li>
                <li>You may feel mild contractions</li>
                <li>Your midwife or doctor will check that all of the placenta has been delivered</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    // Add more sections as needed
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs customItems={customBreadcrumbs} />
          <h1 className="text-3xl font-bold mb-4 mt-4">Labor and Birth</h1>
          <p className="text-xl">
            Information on labor signs, what to expect during childbirth, pain relief options, and more
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Journey progress indicator and prev/next navigation */}
        <PregnancyJourneyNav currentStepIndex={4} />

        {/* On this page navigation */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-bold mb-2">On this page:</h2>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[#0891b2] hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="prose max-w-none">{section.content}</div>
          </div>
        ))}

        {/* Related topics */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">
                <Link to="/pregnancy/signs-of-labor" className="text-[#0891b2] hover:underline">
                  Signs of labor
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                How to recognize when labor is beginning and what to expect.
              </p>
              <Link to="/pregnancy/signs-of-labor" className="text-sm text-[#0891b2] hover:underline flex items-center">
                Read more
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">
                <Link to="/tools/contraction-timer" className="text-[#0891b2] hover:underline">
                  Contraction timer
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Track the frequency and duration of your contractions with our timer tool.
              </p>
              <Link to="/tools/contraction-timer" className="text-sm text-[#0891b2] hover:underline flex items-center">
                Try it now
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">
                <Link to="/pregnancy/birth-plan-creator" className="text-[#0891b2] hover:underline">
                  Birth plan creator
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Create a personalized birth plan to share with your healthcare team.
              </p>
              <Link to="/pregnancy/birth-plan-creator" className="text-sm text-[#0891b2] hover:underline flex items-center">
                Create your plan
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

export default LaborAndBirthPage;
