import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ChildrenVaccinePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Vaccinations', url: '/vaccinations' },
              { label: "Children's vaccines", url: '/vaccinations/children' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Children's vaccines</h1>
          <p className="text-xl font-medium">
            Information about the vaccines that are routinely offered to all children and how to get them
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About children's vaccines</h2>
              <p className="mb-4">
                Vaccines protect children from serious diseases and complications. The childhood vaccination schedule includes vaccines for diseases such as measles, mumps, rubella, polio, diphtheria, tetanus, whooping cough, and more.
              </p>
              <p className="mb-4">
                Vaccines are given at different ages, starting from birth through the teenage years, to provide the best protection as early as possible.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Who should get children's vaccines</h2>
              <p className="mb-4">
                All children are eligible for routine vaccinations, which are provided for free on the PHB. Some children with certain health conditions may need additional vaccines or a different schedule.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Babies and young children (from 8 weeks old)</li>
                <li>Children starting school</li>
                <li>Teenagers (for boosters and additional vaccines)</li>
                <li>Children with certain health conditions (may need extra vaccines)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">How to get children's vaccines</h2>
              <p className="mb-4">
                Routine childhood vaccines are usually given at your GP surgery or health clinic. Some vaccines are also given at school as part of the school vaccination programme.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>GP surgery or health centre</li>
                <li>School vaccination programme (for certain ages)</li>
                <li>Community clinics (in some areas)</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h3 className="font-bold text-lg mb-2">Check your child's vaccination schedule</h3>
                <p className="mb-2">Your GP or health visitor can provide you with your child's vaccination record and schedule. Make sure your child is up to date with all recommended vaccines.</p>
                <div className="flex space-x-4 mt-4">
                  <Link
                    to="/find-a-gp"
                    className="bg-[#0891b2] text-white px-6 py-2 rounded-md hover:bg-[#004b93] transition-colors"
                  >
                    Find a GP
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Common questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-1">Are childhood vaccines safe?</h3>
                  <p className="text-sm">Yes. All vaccines are thoroughly tested for safety and effectiveness before being approved for use.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">What if my child misses a vaccine?</h3>
                  <p className="text-sm">If your child misses a vaccine, contact your GP to arrange a catch-up appointment. It's never too late to get vaccinated.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Are vaccines free for children?</h3>
                  <p className="text-sm">Yes. All routine childhood vaccines are free on the PHB.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Can vaccines overload my child's immune system?</h3>
                  <p className="text-sm">No. Children's immune systems can safely handle many vaccines at once. Vaccines are scheduled to provide the best protection at the right time.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#e8edee] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Related information</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/vaccinations" className="text-[#0891b2] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    All vaccinations
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/flu-vaccine" className="text-[#0891b2] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Flu vaccine
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/covid-19-vaccine" className="text-[#0891b2] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    COVID-19 vaccine
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

export default ChildrenVaccinePage; 