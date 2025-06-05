import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMedicineById } from '../features/medicines/medicinesData';
import { Medicine, MedicineReference } from '../features/medicines/medicineTypes';

// Function to remove citation numbers from text
const removeTextCitations = (text?: string) => {
  if (!text) return null;
  
  // Replace citation pattern [n] with empty string
  return text.replace(/\[(\d+)\]/g, '');
};

const MedicineDetailPage: React.FC = () => {
  const { medicineId } = useParams<{ medicineId: string }>();

  // Get medicine data based on the ID parameter
  const medicine = medicineId ? getMedicineById(medicineId) : null;

  if (!medicine) {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Medicine not found</h1>
          </div>
        </div>
        <div className="phb-container py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-700">
              Sorry, we couldn't find information about this medicine.
            </p>
          </div>
          <Link to="/medicines-a-z" className="phb-link">
            Return to Medicines A-Z
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/medicines-a-z" className="text-white hover:underline">
              Medicines A-Z
            </Link>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>{medicine.name}</span>
          </div>
          <h1 className="text-3xl font-bold">{medicine.name}</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="phb-container py-8">
        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Disclaimer:</strong> All health information provided is for reading and educational purposes only. If you take any action based on this information, including medication decisions or self-diagnosis, PHB shall not be held liable. Always consult with a qualified healthcare professional before making health-related decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Two-column layout with sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with "On this page" quick links */}
          <div className="md:w-1/4 order-2 md:order-1">
            <div className="sticky top-4 bg-gray-50 p-5 rounded-md border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-[#005eb8]">On this page</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    About
                  </a>
                </li>
                <li>
                  <a href="#uses" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Uses
                  </a>
                </li>
                <li>
                  <a href="#dosage" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Dosage
                  </a>
                </li>
                <li>
                  <a href="#side-effects" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Side Effects
                  </a>
                </li>
                <li>
                  <a href="#warnings" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Warnings
                  </a>
                </li>
                {medicine.pregnancy && (
                  <li>
                    <a href="#pregnancy" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Pregnancy
                    </a>
                  </li>
                )}
                {medicine.breastfeeding && (
                  <li>
                    <a href="#breastfeeding" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Breastfeeding
                    </a>
                  </li>
                )}
                {medicine.references && medicine.references.length > 0 && (
                  <li>
                    <a href="#references" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      References
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:w-3/4 order-1 md:order-2">
            {/* About */}
            <section id="about" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4">About {medicine.name}</h2>
              <p className="text-lg mb-4">
                {removeTextCitations(medicine.description)}
              </p>
              
              {/* Citation message */}
              <div className="bg-gray-50 border-l-4 border-blue-300 p-3 mb-4 text-sm">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>For references and citations, please scroll to the bottom of the page.</p>
                </div>
              </div>
              
              {/* Category */}
              {medicine.category && (
                <div className="bg-blue-50 p-3 rounded-md mb-4">
                  <p className="text-blue-800 font-medium">
                    <strong>Category:</strong> {medicine.category}
                  </p>
                </div>
              )}
            </section>

            {/* Uses */}
            <section id="uses" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Uses of {medicine.name}</h2>
              <p className="mb-4">{medicine.name} is used to treat or manage:</p>
              <ul className="list-disc pl-6 space-y-2">
                {medicine.indications?.map((indication: string, index: number) => (
                  <li key={index}>{indication}</li>
                ))}
              </ul>
            </section>

            {/* Dosage */}
            <section id="dosage" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Dosage Information</h2>
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="font-medium text-blue-800">{removeTextCitations(medicine.dosage)}</p>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Always follow your doctor's instructions regarding dosage. Never adjust your medication without consulting a healthcare professional.
              </p>
            </section>

            {/* Side Effects */}
            <section id="side-effects" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Possible Side Effects</h2>
              <p className="mb-4">Common side effects of {medicine.name} may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                {medicine.sideEffects?.map((effect: string, index: number) => (
                  <li key={index}>{removeTextCitations(effect)}</li>
                ))}
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-yellow-700">
                  <strong>Important:</strong> If you experience severe side effects or allergic reactions (difficulty breathing, swelling of face/lips/tongue, severe rash), seek medical attention immediately.
                </p>
              </div>
            </section>

            {/* Warnings */}
            <section id="warnings" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Warnings and Precautions</h2>
              <ul className="list-disc pl-6 space-y-2">
                {medicine.warnings?.map((warning: string, index: number) => (
                  <li key={index}>{removeTextCitations(warning)}</li>
                ))}
              </ul>
            </section>

            {/* Pregnancy */}
            {medicine.pregnancy && (
              <section id="pregnancy" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Use During Pregnancy</h2>
                <p>{removeTextCitations(medicine.pregnancy)}</p>
              </section>
            )}

            {/* Breastfeeding */}
            {medicine.breastfeeding && (
              <section id="breastfeeding" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Use While Breastfeeding</h2>
                <p>{removeTextCitations(medicine.breastfeeding)}</p>
              </section>
            )}


            
            {/* References and Resources */}
            {medicine.wikipediaUrl && (
              <section id="references" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">External Resources</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <ul className="space-y-3">
                    {/* Wikipedia link */}
                    <li className="flex items-start scroll-mt-20">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center">
                        <svg className="h-3 w-3 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                          <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#2563eb" fontFamily="Arial">W</text>
                        </svg>
                      </span>
                      <div>
                        <a href={medicine.wikipediaUrl} target="_blank" rel="noopener noreferrer" className="phb-link">
                          Wikipedia: {medicine.name}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailPage;
