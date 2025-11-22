import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const TravelVaccinePage: React.FC = () => {
  const vaccineCategories = [
    {
      title: 'Yellow Fever',
      description: 'Essential for travel to endemic areas in Africa and South America. Required for country entry.',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Hepatitis A & B',
      description: 'Protection against liver infections from contaminated food, water, or blood contact.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Typhoid',
      description: 'Prevents serious bacterial infection from contaminated food and water in developing countries.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Japanese Encephalitis',
      description: 'Critical for rural Asia travel, especially during monsoon season in rice-growing areas.',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Travel Vaccines</h1>
          <p className="text-xl font-medium">
            Essential vaccinations for safe international travel and health protection
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Vaccinations', href: '/vaccinations' },
              { label: 'Travel Vaccines', href: '/vaccinations/travel' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">About Travel Vaccines</h2>
              <p className="mb-4">
                Travel vaccines protect you from serious diseases that may not exist in your home country but are
                common in your travel destination. These vaccines are essential for maintaining your health while
                abroad and may be required for entry into certain countries.
              </p>
              <p className="mb-4">
                Proper vaccination planning should begin 4-6 weeks before travel to ensure adequate protection.
                Some vaccines require multiple doses over several weeks, while others need time for your immune
                system to develop full immunity.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Benefits of Travel Vaccination</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>95%+ protection against targeted diseases</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Peace of mind while traveling internationally</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Compliance with country entry requirements</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prevention of expensive medical emergencies abroad</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Protection against diseases with no treatment</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Essential Travel Vaccines</h2>
              <p className="mb-6">
                These vaccines are recommended based on your travel destination and activities:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vaccineCategories.map((vaccine, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={vaccine.image}
                        alt={vaccine.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{vaccine.title}</h3>
                      <p className="text-gray-600">{vaccine.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Travel Health Planning Timeline</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">4-6 Weeks Before Travel</h3>
                  <p>
                    Book your travel health consultation. This timing is essential for vaccines that require
                    multiple doses over several weeks and allows your immune system to develop full protection.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">2-4 Weeks Before Travel</h3>
                  <p>
                    Complete your vaccination series. Most vaccines need 2-4 weeks to provide full immunity.
                    This is also the time to start antimalarial medication if traveling to endemic areas.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">1-2 Weeks Before Travel</h3>
                  <p>
                    Collect any remaining medications and ensure you have proper documentation. Yellow fever
                    vaccination certificates take time to process and are required for entry to many countries.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">1 Week Before Travel</h3>
                  <p>
                    Final health kit review and documentation check. Ensure all vaccination certificates are
                    ready and medications are properly packed for travel.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Vaccine Requirements by Region</h2>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-xl font-semibold mb-3">Sub-Saharan Africa:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Yellow Fever (required for entry to most countries)</li>
                  <li>Hepatitis A & B</li>
                  <li>Typhoid</li>
                  <li>Meningitis ACWY</li>
                  <li>Polio booster</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-xl font-semibold mb-3">Southeast Asia:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Hepatitis A & B</li>
                  <li>Typhoid</li>
                  <li>Japanese Encephalitis (for rural areas)</li>
                  <li>Rabies (for adventure travelers)</li>
                  <li>Tick-borne Encephalitis (certain areas)</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">South America:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Yellow Fever (required for many countries)</li>
                  <li>Hepatitis A & B</li>
                  <li>Typhoid</li>
                  <li>Rabies (for wildlife/adventure travel)</li>
                  <li>Altitude sickness prevention advice</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h2 className="text-xl font-bold text-[#0891b2] mb-2">Important Notice</h2>
              <p className="mb-4">
                Travel health requirements change frequently. Always consult with a travel health specialist
                or visit a travel clinic for the most current recommendations based on your specific itinerary
                and health status.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <Link 
                  to="/find-pharmacy"
                  className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors font-medium text-center"
                >
                  Find Travel Clinic
                </Link>
                <Link 
                  to="/account/appointments/book"
                  className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors font-medium text-center"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Travel Health Tips */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Travel Health Tips</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[#0891b2] font-bold">Plan Early</div>
                  <div className="text-sm">Book consultation 4-6 weeks before travel</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Check Requirements</div>
                  <div className="text-sm">Verify destination-specific vaccine requirements</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Documentation</div>
                  <div className="text-sm">Carry vaccination certificates while traveling</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Follow-up Care</div>
                  <div className="text-sm">Monitor health during and after travel</div>
                </div>
              </div>
            </div>

            {/* Additional Protection */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Beyond Vaccines</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use DEET-based insect repellent (20-30%)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Drink bottled or properly treated water</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Eat thoroughly cooked, hot foods</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use treated bed nets in malaria areas</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Carry comprehensive travel health kit</span>
                </li>
              </ul>
            </div>

            {/* Related Pages */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0891b2] mb-3">Related Vaccinations</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/vaccinations/children" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Children's Vaccines
                    </Link>
                  </li>
                  <li>
                    <Link to="/vaccinations/flu-vaccine" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Flu Vaccine
                    </Link>
                  </li>
                  <li>
                    <Link to="/vaccinations/covid-19-vaccine" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      COVID-19 Vaccine
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Travel Health Services</h3>
              <p className="mb-4">For travel health consultations and vaccines:</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#0891b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>travel.health@phb.gov.ng</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#0891b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+234 (0) 800 TRAVEL (872835)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelVaccinePage;