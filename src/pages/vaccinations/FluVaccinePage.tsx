import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const FluVaccinePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Vaccinations', url: '/vaccinations' },
              { label: 'Flu vaccine', url: '/vaccinations/flu-vaccine' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Flu vaccine</h1>
          <p className="text-xl font-medium">
            Information about the flu vaccine, including who should have it and how to get it
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About the flu vaccine</h2>
              <p className="mb-4">
                The flu vaccine is a safe and effective vaccine that helps protect people against
                influenza (flu) and its complications.
              </p>
              <p className="mb-4">
                Flu is an unpredictable virus that can be unpleasant, but if you're otherwise healthy
                it'll usually clear up on its own in about a week. However, it can cause severe illness,
                and even death, among vulnerable groups including older people, pregnant women and people
                with an underlying health condition.
              </p>
              <p className="mb-4">
                The best time to have the flu vaccine is in the autumn before flu starts spreading. But you
                can get the vaccine later.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Who should get the flu vaccine</h2>
              <p className="mb-4">
                The flu vaccine is given free on the PHB to adults who:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>are 65 and over (including those who'll be 65 by 31 March 2026)</li>
                <li>have certain health conditions</li>
                <li>are pregnant</li>
                <li>are in long-stay residential care</li>
                <li>receive a carer's allowance, or are the main carer for an older or disabled person who may be at risk if you get sick</li>
                <li>live with someone who is more likely to get infections</li>
                <li>frontline health or social care workers</li>
              </ul>

              <p className="mb-4">
                The flu vaccine is also given to children who:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>are aged 2 or 3 years on 31 August 2025</li>
                <li>are in primary school</li>
                <li>are in secondary school (years 7 to 11)</li>
                <li>have a health condition that puts them at greater risk from flu</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">How to get the flu vaccine</h2>
              <p className="mb-4">
                You can have the PHB flu vaccine at:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>your GP surgery</li>
                <li>a pharmacy offering the service</li>
                <li>your midwifery service if you're pregnant</li>
                <li>a hospital appointment</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h3 className="font-bold text-lg mb-2">Book your flu vaccine</h3>
                <p className="mb-2">If you're eligible for a free flu vaccine, you can book an appointment at your GP surgery or a pharmacy that offers it.</p>
                <div className="flex space-x-4 mt-4">
                  <Link
                    to="/find-pharmacy"
                    className="bg-[#005eb8] text-white px-6 py-2 rounded-md hover:bg-[#004b93] transition-colors"
                  >
                    Find a pharmacy
                  </Link>
                  <Link
                    to="/find-a-gp"
                    className="bg-[#005eb8] text-white px-6 py-2 rounded-md hover:bg-[#004b93] transition-colors"
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
                  <h3 className="font-bold mb-1">Can the flu vaccine give you flu?</h3>
                  <p className="text-sm">No. The vaccine contains an inactivated virus that cannot give you flu.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">How effective is the flu vaccine?</h3>
                  <p className="text-sm">The flu vaccine gives the best protection against the strains of flu that are likely to circulate each year.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Are there any side effects?</h3>
                  <p className="text-sm">The most common side effects are mild and include a slight temperature, muscle aches, and a sore arm where the injection was given.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Can I get the flu vaccine if I have an egg allergy?</h3>
                  <p className="text-sm">Most people with egg allergies can receive the flu vaccine. Speak to your doctor if you have a severe egg allergy.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#e8edee] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Related information</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/vaccinations" className="text-[#005eb8] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    All vaccinations
                  </Link>
                </li>
                <li>
                  <Link to="/health-a-z/flu" className="text-[#005eb8] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Flu (influenza)
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/covid-19-vaccine" className="text-[#005eb8] hover:underline font-medium flex items-center">
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

export default FluVaccinePage;
