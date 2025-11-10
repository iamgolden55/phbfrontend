import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMedicineById } from '../features/medicines/medicinesData';
import { Medicine, MedicineReference } from '../features/medicines/medicineTypes';
import { getDrugDetail, DrugDetail } from '../services/drugService';

// Function to remove citation numbers from text
const removeTextCitations = (text?: string) => {
  if (!text) return null;

  // Replace citation pattern [n] with empty string
  return text.replace(/\[(\d+)\]/g, '');
};

// Check if ID is a UUID (from drug database) or slug (from local medicines data)
const isUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const MedicineDetailPage: React.FC = () => {
  const { medicineId } = useParams<{ medicineId: string }>();
  const [drugData, setDrugData] = useState<DrugDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine if this is a drug database ID or local medicines ID
  const isDrugDatabaseId = medicineId ? isUUID(medicineId) : false;

  // Get medicine data based on the ID parameter
  const medicine = medicineId && !isDrugDatabaseId ? getMedicineById(medicineId) : null;

  // Fetch drug data from API if it's a UUID
  useEffect(() => {
    if (medicineId && isDrugDatabaseId) {
      setLoading(true);
      setError(null);
      getDrugDetail(medicineId)
        .then(data => {
          setDrugData(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message || 'Failed to load drug information');
          setLoading(false);
        });
    }
  }, [medicineId, isDrugDatabaseId]);

  // Loading state for drug database
  if (isDrugDatabaseId && loading) {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          </div>
        </div>
        <div className="phb-container py-8 text-center">
          <svg className="w-12 h-12 animate-spin text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading drug information...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if ((isDrugDatabaseId && error) || (!medicine && !drugData)) {
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
              {error || "Sorry, we couldn't find information about this medicine."}
            </p>
          </div>
          <Link to="/medicines-a-z" className="phb-link">
            Return to Medicines A-Z
          </Link>
        </div>
      </div>
    );
  }

  // If we have drug data from the database, render drug detail view
  if (drugData) {
    return <DrugDatabaseDetailView drug={drugData} />;
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

// Helper function to ensure array fields are always arrays
const ensureArray = (value: any): any[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

// Component to display drug information from DrugClassification database
const DrugDatabaseDetailView: React.FC<{ drug: DrugDetail }> = ({ drug }) => {
  // Ensure all array fields are actually arrays
  const brandNames = ensureArray(drug.brand_names);
  const majorContraindications = ensureArray(drug.major_contraindications);
  const majorDrugInteractions = ensureArray(drug.major_drug_interactions);
  const foodInteractions = ensureArray(drug.food_interactions);
  const saferAlternatives = ensureArray(drug.safer_alternatives);
  const cheaperAlternatives = ensureArray(drug.cheaper_alternatives);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/professional/pharmacy-resources" className="text-white hover:underline">
              Pharmacy Resources
            </Link>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>{drug.generic_name}</span>
          </div>
          <h1 className="text-3xl font-bold">{drug.generic_name}</h1>
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
                  <a href="#classification" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Classification
                  </a>
                </li>
                <li>
                  <a href="#prescribing" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Prescribing Info
                  </a>
                </li>
                {(drug.black_box_warning || majorContraindications.length > 0) && (
                  <li>
                    <a href="#safety" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Safety Information
                    </a>
                  </li>
                )}
                {(majorDrugInteractions.length > 0 || foodInteractions.length > 0) && (
                  <li>
                    <a href="#interactions" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Interactions
                    </a>
                  </li>
                )}
                {drug.pregnancy_category && (
                  <li>
                    <a href="#pregnancy" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Special Populations
                    </a>
                  </li>
                )}
                {(saferAlternatives.length > 0 || cheaperAlternatives.length > 0) && (
                  <li>
                    <a href="#alternatives" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Alternatives
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
              <h2 className="text-2xl font-bold mb-4">About {drug.generic_name}</h2>
              {brandNames.length > 0 && (
                <p className="text-lg mb-4">
                  <strong>Brand names:</strong> {brandNames.join(', ')}
                </p>
              )}
              {drug.mechanism_of_action && (
                <p className="mb-4">{drug.mechanism_of_action}</p>
              )}

              {/* Regulatory Status Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {drug.nafdac_approved && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ NAFDAC Approved
                  </span>
                )}
                {drug.is_controlled && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Controlled Substance
                  </span>
                )}
                {drug.is_high_risk && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    High Risk Medication
                  </span>
                )}
              </div>
            </section>

            {/* Classification */}
            <section id="classification" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Drug Classification</h2>
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drug.therapeutic_class && (
                    <div>
                      <p className="font-medium text-blue-800">
                        <strong>Therapeutic Class:</strong> {drug.therapeutic_class}
                      </p>
                    </div>
                  )}
                  {drug.pharmacological_class && (
                    <div>
                      <p className="font-medium text-blue-800">
                        <strong>Pharmacological Class:</strong> {drug.pharmacological_class}
                      </p>
                    </div>
                  )}
                  {drug.nafdac_schedule && (
                    <div>
                      <p className="font-medium text-blue-800">
                        <strong>NAFDAC Schedule:</strong> {drug.nafdac_schedule}
                      </p>
                    </div>
                  )}
                  {drug.nafdac_registration_number && (
                    <div>
                      <p className="font-medium text-blue-800">
                        <strong>NAFDAC Registration:</strong> {drug.nafdac_registration_number}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Prescribing Information */}
            <section id="prescribing" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Prescribing Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Physician Prescription Required:</strong> {drug.requires_physician_only ? 'Yes' : 'No'}
                </li>
                <li>
                  <strong>Pharmacist Can Prescribe:</strong> {drug.pharmacist_can_prescribe ? 'Yes' : 'No'}
                </li>
                {drug.maximum_days_supply && (
                  <li>
                    <strong>Maximum Days Supply:</strong> {drug.maximum_days_supply} days
                  </li>
                )}
                <li>
                  <strong>Special Prescription Required:</strong> {drug.requires_special_prescription ? 'Yes' : 'No'}
                </li>
                {drug.requires_monitoring && (
                  <li>
                    <strong>Monitoring Required:</strong> {drug.monitoring_type || 'Yes'}
                  </li>
                )}
              </ul>
            </section>

            {/* Safety Information */}
            {(drug.black_box_warning || majorContraindications.length > 0) && (
              <section id="safety" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Safety Information</h2>

                {drug.black_box_warning && drug.black_box_warning_text && (
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
                    <h3 className="font-bold text-red-900 mb-2">⚠️ BLACK BOX WARNING</h3>
                    <p className="text-red-800">{drug.black_box_warning_text}</p>
                  </div>
                )}

                {majorContraindications.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Major Contraindications</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {majorContraindications.map((contraindication, index) => (
                        <li key={index}>{contraindication}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(drug.addiction_risk || drug.is_high_risk) && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <p className="text-yellow-700">
                      <strong>Important:</strong> This medication {drug.addiction_risk && 'has addiction potential and '}requires careful monitoring. Always follow your healthcare provider's instructions.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Drug Interactions */}
            {(majorDrugInteractions.length > 0 || foodInteractions.length > 0) && (
              <section id="interactions" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Interactions</h2>

                {majorDrugInteractions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Major Drug Interactions</h3>
                    <p className="mb-2">This medication may interact with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      {majorDrugInteractions.map((interaction, index) => (
                        <li key={index}>{interaction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {foodInteractions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Food Interactions</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {foodInteractions.map((interaction, index) => (
                        <li key={index}>{interaction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Special Populations */}
            {drug.pregnancy_category && (
              <section id="pregnancy" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Special Populations</h2>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Pregnancy</h3>
                  <p className="mb-2">
                    <strong>Category:</strong> {drug.pregnancy_category}
                  </p>
                  {drug.minimum_age !== null && (
                    <p className="mb-2">
                      <strong>Minimum Age:</strong> {drug.minimum_age} years
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Breastfeeding</h3>
                  <p>
                    This medication is <strong>{drug.breastfeeding_safe ? 'considered safe' : 'not recommended'}</strong> during breastfeeding. Always consult your healthcare provider.
                  </p>
                </div>
              </section>
            )}

            {/* Alternatives */}
            {(saferAlternatives.length > 0 || cheaperAlternatives.length > 0) && (
              <section id="alternatives" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Alternative Medications</h2>

                {saferAlternatives.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Safer Alternatives</h3>
                    <p className="mb-2">The following medications may be safer alternatives:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      {saferAlternatives.map((alternative, index) => (
                        <li key={index}>{alternative}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {cheaperAlternatives.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">More Affordable Alternatives</h3>
                    <p className="mb-2">These medications may be more affordable options:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      {cheaperAlternatives.map((alternative, index) => (
                        <li key={index}>{alternative}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailPage;
