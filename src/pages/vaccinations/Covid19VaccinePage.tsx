import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const Covid19VaccinePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Vaccinations', url: '/vaccinations' },
              { label: 'COVID-19 vaccine', url: '/vaccinations/covid-19-vaccine' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">COVID-19 vaccine</h1>
          <p className="text-xl font-medium">
            Information about the COVID-19 vaccine, including who should have it and how to get it
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About the COVID-19 vaccine</h2>
              <p className="mb-4">
                The COVID-19 vaccine is a safe and effective way to help protect yourself and others from coronavirus (COVID-19) and its complications.
              </p>
              <p className="mb-4">
                COVID-19 can cause serious illness, hospitalisation, and even death, especially among older adults, people with certain health conditions, and those who are immunocompromised.
              </p>
              <p className="mb-4">
                Vaccination is the best way to build protection against COVID-19 and reduce the risk of severe outcomes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Who should get the COVID-19 vaccine</h2>
              <p className="mb-4">
                The COVID-19 vaccine is recommended for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Everyone aged 5 and over</li>
                <li>People at higher risk from COVID-19, including those with certain health conditions</li>
                <li>Pregnant women</li>
                <li>Frontline health and social care workers</li>
                <li>People living in care homes</li>
                <li>Carers and household contacts of people at higher risk</li>
              </ul>
              <p className="mb-4">
                Booster doses may be offered to those at increased risk, based on current public health guidance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">How to get the COVID-19 vaccine</h2>
              <p className="mb-4">
                You can get the COVID-19 vaccine at:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your GP surgery</li>
                <li>Pharmacies offering the vaccine</li>
                <li>Vaccination centres</li>
                <li>Some hospitals and community clinics</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h3 className="font-bold text-lg mb-2">Book your COVID-19 vaccine</h3>
                <p className="mb-2">If you're eligible, you can book an appointment online, through your GP, or at a participating pharmacy.</p>
                <div className="flex space-x-4 mt-4">
                  <Link
                    to="/find-pharmacy"
                    className="bg-[#0891b2] text-white px-6 py-2 rounded-md hover:bg-[#004b93] transition-colors"
                  >
                    Find a pharmacy
                  </Link>
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
                  <h3 className="font-bold mb-1">Can the COVID-19 vaccine give you COVID-19?</h3>
                  <p className="text-sm">No. The vaccine does not contain live coronavirus and cannot give you COVID-19.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">How effective is the COVID-19 vaccine?</h3>
                  <p className="text-sm">The vaccine is highly effective at preventing severe illness, hospitalisation, and death from COVID-19.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Are there any side effects?</h3>
                  <p className="text-sm">Most side effects are mild and short-lived, such as a sore arm, tiredness, or mild fever.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Do I need a booster?</h3>
                  <p className="text-sm">Booster doses are recommended for some people to maintain protection. Check current guidance for eligibility.</p>
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
                  <Link to="/health-a-z/covid-19" className="text-[#0891b2] hover:underline font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    COVID-19 (coronavirus)
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Covid19VaccinePage; 