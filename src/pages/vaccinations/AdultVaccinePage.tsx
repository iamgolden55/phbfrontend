import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const AdultVaccinePage: React.FC = () => {
  const vaccineCategories = [
    {
      title: 'Annual Flu Vaccine',
      description: 'Recommended yearly for all adults to protect against seasonal influenza viruses.',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'COVID-19 Vaccine',
      description: 'Essential protection against COVID-19, including booster doses as recommended.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Tetanus, Diphtheria & Pertussis (Tdap)',
      description: 'Booster vaccination needed every 10 years to maintain protection against these diseases.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Pneumococcal Vaccine',
      description: 'Protects against serious pneumococcal infections, especially important for older adults.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Adult Vaccinations</h1>
          <p className="text-xl font-medium">
            Essential vaccines to protect your health throughout adulthood
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
              { label: 'Adult Vaccinations', href: '/vaccinations/adults' }
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
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">About Adult Vaccinations</h2>
              <p className="mb-4">
                Adult vaccinations are crucial for maintaining lifelong immunity and protection against serious
                diseases. Many vaccines received in childhood provide immunity that decreases over time, requiring
                booster doses to maintain protection throughout adulthood.
              </p>
              <p className="mb-4">
                The adult vaccination schedule is tailored to your age, health conditions, occupation, lifestyle,
                and travel plans. Regular consultation with your healthcare provider ensures you stay up-to-date
                with recommended vaccines and maintain optimal protection.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Why Adult Vaccinations Matter</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Maintain immunity as childhood vaccines wear off</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Protect against age-related disease risks</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prevent complications from vaccine-preventable diseases</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Protect vulnerable family members and community</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Reduce healthcare costs from preventable illnesses</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Core Adult Vaccines</h2>
              <p className="mb-6">
                These vaccines are recommended for most healthy adults as part of routine healthcare:
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
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Adult Vaccination Schedule</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Ages 19-26 Years</h3>
                  <p>
                    Focus on completing missed childhood vaccines, annual flu shots, and catch-up vaccinations.
                    HPV vaccine is recommended if not previously received. Consider meningococcal vaccine
                    for those in high-risk groups.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Ages 27-59 Years</h3>
                  <p>
                    Maintain routine vaccinations including annual flu vaccine and Tdap booster every 10 years.
                    Pregnant women should receive Tdap during each pregnancy and annual flu vaccine.
                    Consider additional vaccines based on health conditions and risk factors.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Ages 60-64 Years</h3>
                  <p>
                    Continue routine vaccines and consider age-specific recommendations. Shingles vaccine
                    is recommended starting at age 60. Evaluate need for pneumococcal vaccine based on
                    health conditions and risk factors.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Ages 65+ Years</h3>
                  <p>
                    Enhanced vaccination schedule including annual flu vaccine, pneumococcal vaccines,
                    and shingles vaccine. High-dose flu vaccines may be recommended. Regular review
                    of vaccination status with healthcare provider is essential.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Special Considerations</h2>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-xl font-semibold mb-3">High-Risk Groups:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Adults with chronic conditions (diabetes, heart disease, lung disease)</li>
                  <li>Immunocompromised individuals</li>
                  <li>Healthcare workers and caregivers</li>
                  <li>Adults living in long-term care facilities</li>
                  <li>Pregnant women (specific vaccine recommendations)</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-xl font-semibold mb-3">Occupational Vaccines:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Healthcare workers (Hepatitis B, annual flu, COVID-19)</li>
                  <li>Laboratory workers (specialized vaccines based on exposure)</li>
                  <li>International travelers (destination-specific vaccines)</li>
                  <li>Military personnel (anthrax, meningococcal, others)</li>
                  <li>First responders and emergency workers</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">Catch-Up Vaccinations:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Missed childhood vaccines (MMR, varicella, hepatitis A & B)</li>
                  <li>Incomplete vaccine series completion</li>
                  <li>Unknown vaccination history assessment</li>
                  <li>International adoptees and immigrants</li>
                  <li>Adults with no vaccination records</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h2 className="text-xl font-bold text-[#0891b2] mb-2">Stay Up-to-Date</h2>
              <p className="mb-4">
                Adult vaccination needs can change based on age, health conditions, and new vaccine
                recommendations. Regular check-ups with your healthcare provider ensure you receive
                appropriate vaccinations at the right time.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <Link 
                  to="/find-pharmacy"
                  className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors font-medium text-center"
                >
                  Find Vaccination Clinic
                </Link>
                <Link 
                  to="/account/appointments/book"
                  className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors font-medium text-center"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Vaccination Reminders */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Vaccination Reminders</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[#0891b2] font-bold">Annual Vaccines</div>
                  <div className="text-sm">Flu vaccine every fall season</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">10-Year Boosters</div>
                  <div className="text-sm">Tetanus, diphtheria, pertussis (Tdap)</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Age-Specific</div>
                  <div className="text-sm">Shingles vaccine at 60+, pneumococcal at 65+</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Risk-Based</div>
                  <div className="text-sm">Additional vaccines for high-risk groups</div>
                </div>
              </div>
            </div>

            {/* Vaccine Safety */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Vaccine Safety</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Extensive safety testing before approval</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Continuous safety monitoring</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mild side effects are normal and temporary</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Serious adverse events are extremely rare</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Benefits far outweigh risks for most people</span>
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
                    <Link to="/vaccinations/travel" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Travel Vaccines
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
              <h3 className="text-lg font-bold mb-4">Adult Vaccination Services</h3>
              <p className="mb-4">For adult vaccination consultations and schedules:</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#0891b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>adult.vaccines@phb.gov.ng</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#0891b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+234 (0) 800 ADULTS (238587)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultVaccinePage;