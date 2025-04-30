import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const GHICPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Using the PHB', url: '/using-the-phb' },
              { label: 'Healthcare abroad', url: '/using-the-phb/healthcare-abroad' },
              { label: 'Healthcare for Nigerians abroad', url: '/using-the-phb/healthcare-abroad/nigerian-travel-health' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Healthcare for Nigerians travelling abroad</h1>
          <p className="text-xl font-medium">
            Essential information for Nigerian citizens seeking healthcare while traveling internationally
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Healthcare coverage for Nigerians abroad</h2>
              <p className="mb-4">
                Unlike some countries, Nigeria does not have comprehensive reciprocal healthcare agreements with most nations that would entitle Nigerian citizens to free or subsidized healthcare abroad. This means that as a Nigerian traveler, you are generally responsible for covering your own healthcare costs when visiting other countries.
              </p>
              <p className="mb-4">
                International travel health insurance is therefore essential for all Nigerians traveling abroad to avoid potentially high medical expenses. Some countries may even require proof of adequate health insurance coverage before granting a visa or entry permit.
              </p>
              <div className="bg-yellow-50 p-4 rounded-md mt-2 mb-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p>
                    <strong>Important:</strong> Medical care abroad can be extremely expensive, particularly in countries like the United States, where a simple emergency room visit can cost thousands of dollars. Never travel without adequate health insurance coverage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Travel health insurance options</h2>
              <p className="mb-4">
                Several Nigerian and international insurance companies offer travel health insurance policies specifically designed for Nigerians traveling abroad. When selecting travel insurance, consider:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Coverage limits:</strong> Ensure the policy has adequate coverage limits for your destination (minimum of $50,000 for most countries, $100,000+ for the USA)</li>
                <li><strong>Medical evacuation:</strong> Coverage for emergency medical evacuation back to Nigeria or to a country with better medical facilities</li>
                <li><strong>Pre-existing conditions:</strong> Whether any pre-existing medical conditions you have are covered</li>
                <li><strong>Coverage area:</strong> Whether the policy covers all countries you plan to visit</li>
                <li><strong>Duration:</strong> The length of coverage matches your travel plans</li>
                <li><strong>Activities:</strong> Coverage for any special activities you plan to engage in (sports, adventure activities, etc.)</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h3 className="font-bold text-lg mb-2">Recommended Nigerian insurance providers</h3>
                <p className="mb-4">Several Nigerian insurance companies offer travel health insurance:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>AXA Mansard Insurance</li>
                  <li>Leadway Assurance</li>
                  <li>AIICO Insurance</li>
                  <li>Cornerstone Insurance</li>
                  <li>NEM Insurance</li>
                </ul>
                <p className="mb-2">International providers that serve Nigerian travelers include:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Allianz Global Assistance</li>
                  <li>AIG Travel Guard</li>
                  <li>World Nomads</li>
                </ul>
                <p className="text-sm italic">
                  Note: The PHB does not endorse specific insurance providers. Always research and compare policies to find the one that best meets your needs.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Required vaccinations for Nigerian travelers</h2>
              <p className="mb-4">
                Depending on your destination, you may need specific vaccinations or preventative medications. Some countries require proof of vaccination as a condition of entry, particularly for Yellow Fever.
              </p>

              <h3 className="text-lg font-bold mb-2">Common required vaccinations:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Yellow Fever:</strong> Required for entry to many countries when traveling from Nigeria, which is considered a Yellow Fever endemic country. You must obtain an International Certificate of Vaccination or Prophylaxis (ICVP)</li>
                <li><strong>COVID-19:</strong> Many countries require proof of COVID-19 vaccination for entry</li>
                <li><strong>Meningococcal Meningitis:</strong> Required for pilgrims traveling to Saudi Arabia for Hajj or Umrah</li>
                <li><strong>Polio:</strong> Some countries may require proof of polio vaccination for travelers from Nigeria</li>
              </ul>

              <h3 className="text-lg font-bold mb-2">Recommended vaccinations based on destination:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Hepatitis A and B</strong></li>
                <li><strong>Typhoid</strong></li>
                <li><strong>Tetanus</strong></li>
                <li><strong>Influenza</strong></li>
                <li><strong>Rabies</strong> (for certain destinations)</li>
              </ul>
              <p className="mb-2">
                Visit a travel health clinic or consult with your healthcare provider at least 4-6 weeks before your trip to receive appropriate vaccinations and preventative medications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Accessing healthcare abroad</h2>
              <p className="mb-4">
                When you need medical care while traveling:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li><strong>Contact your insurance provider:</strong> Before seeking non-emergency care, contact your insurance provider's 24-hour helpline. They can direct you to approved healthcare facilities and advise on claim procedures</li>
                <li><strong>Embassies and consulates:</strong> Nigerian embassies and consulates can provide lists of local medical facilities and English-speaking doctors</li>
                <li><strong>Keep all documentation:</strong> Retain all medical reports, prescriptions, receipts, and invoices for insurance claims</li>
                <li><strong>Emergency services:</strong> In emergencies, seek medical attention immediately and contact your insurance provider as soon as possible afterward</li>
              </ol>
              <p className="mb-4">
                For emergency situations, familiarize yourself with the local emergency number of your destination country (equivalent to Nigeria's 112).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Countries with healthcare agreements</h2>
              <p className="mb-4">
                While Nigeria has limited formal reciprocal healthcare agreements, Nigerian citizens may have access to certain healthcare benefits in some countries:
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">ECOWAS countries</h3>
                <p className="mb-2">
                  Under the ECOWAS (Economic Community of West African States) protocols, Nigerian citizens may be entitled to certain emergency healthcare services in member states, though implementation varies by country:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Benin</li>
                      <li>Burkina Faso</li>
                      <li>Cabo Verde</li>
                      <li>Côte d'Ivoire</li>
                      <li>The Gambia</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Ghana</li>
                      <li>Guinea</li>
                      <li>Guinea-Bissau</li>
                      <li>Liberia</li>
                      <li>Mali</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Niger</li>
                      <li>Senegal</li>
                      <li>Sierra Leone</li>
                      <li>Togo</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm italic">
                  Note: Despite ECOWAS protocols, healthcare access and quality vary significantly across member states. Always confirm the current situation with the Nigerian embassy in your destination country and maintain private travel health insurance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Commonwealth nations</h3>
                <p className="mb-2">
                  While being a Commonwealth member does not automatically grant healthcare rights, some Commonwealth nations may offer limited healthcare services to Nigerian citizens, particularly in emergency situations. However, comprehensive travel insurance is still essential.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-1">Do I need travel insurance if I'm only visiting for a short time?</h3>
                  <p className="text-sm">Yes, even for short trips, travel insurance is essential. Medical emergencies can happen at any time, and costs can be substantial regardless of your length of stay.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Can I use my Nigerian HMO coverage abroad?</h3>
                  <p className="text-sm">Most Nigerian HMOs do not provide coverage outside Nigeria. Check with your provider as some premium plans may offer limited international coverage or discounted access to affiliated networks abroad.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Where can I get Yellow Fever vaccination in Nigeria?</h3>
                  <p className="text-sm">Yellow Fever vaccinations are available at designated centers certified by the Nigeria Port Health Services, including ports of entry, teaching hospitals, and certain private clinics.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">How much does travel health insurance typically cost?</h3>
                  <p className="text-sm">Costs vary based on age, destination, duration, and coverage level. For a 2-week trip, prices typically range from ₦15,000 to ₦50,000, with higher costs for travel to the US or for older travelers.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Do I need medical evacuation coverage?</h3>
                  <p className="text-sm">Yes, medical evacuation coverage is highly recommended, especially when traveling to countries with limited healthcare facilities. Medical evacuations can cost ₦10-40 million without insurance.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#e8edee] p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Pre-travel checklist</h2>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Purchase comprehensive travel health insurance</span>
                </li>
                <li className="flex">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Check required vaccinations for your destination</span>
                </li>
                <li className="flex">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Obtain Yellow Fever certificate if required</span>
                </li>
                <li className="flex">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pack sufficient supply of regular medications</span>
                </li>
                <li className="flex">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Carry medical history and prescriptions</span>
                </li>
                <li className="flex">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Research healthcare facilities at your destination</span>
                </li>
                <li className="flex">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save emergency numbers and insurance contacts</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Need more help?</h2>
              <p className="mb-4">
                For questions about healthcare abroad:
              </p>
              <p className="font-medium">Nigerian Ministry of Health</p>
              <p className="mb-2">Federal Ministry of Health Complex, Phase 3, Federal Secretariat</p>
              <p className="mb-4">Telephone: +234 (0)9 290 3078</p>

              <p className="font-medium">Nigerian Immigration Service</p>
              <p className="mb-4">Telephone: +234 (0)7080607900</p>

              <Link
                to="/contact-us"
                className="text-[#005eb8] hover:underline font-medium flex items-center"
              >
                Contact PHB for assistance
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

export default GHICPage;
