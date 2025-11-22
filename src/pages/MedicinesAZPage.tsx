import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMedicinesByLetter } from '../features/medicines/medicinesDataUtils';
import { useDebounce } from '../hooks/useDebounce';

interface MedicineItem {
  name: string;
  href: string;
  id: string;
}

interface FilteredMedicineGroup {
  letter: string;
  medicines: MedicineItem[];
}

interface MedicineData {
  id: string;
  name: string;
  // Add other medicine properties as needed
}

const MedicinesAZPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [medicines, setMedicines] = useState<Record<string, MedicineItem[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const medicinesByLetter = getMedicinesByLetter();
        const formattedMedicines: Record<string, MedicineItem[]> = {};

        Object.keys(medicinesByLetter).forEach(letter => {
          formattedMedicines[letter] = (medicinesByLetter[letter] as MedicineData[]).map((medicine: MedicineData) => ({
            name: medicine.name,
            href: `/medicines-a-z/${medicine.id}`,
            id: medicine.id
          }));
        });

        setMedicines(formattedMedicines);
      } catch (err) {
        setError('Failed to load medicines. Please try again later.');
        console.error('Error loading medicines:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicines();
  }, []);

  // Check if user has already accepted the disclaimer
  useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem('medicineDisclaimerAccepted');
    if (hasAcceptedDisclaimer === 'true') {
      setDisclaimerAccepted(true);
      setShowDisclaimer(false);
    } else {
      setShowDisclaimer(true);
    }
  }, []);

  const filteredMedicines = useMemo<FilteredMedicineGroup[]>(() => {
    if (!debouncedSearchTerm) {
      return Object.entries(medicines)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([letter, medicines]) => ({
          letter,
          medicines
        }));
    }
    
    const term = debouncedSearchTerm.toLowerCase();
    const result: FilteredMedicineGroup[] = [];

    Object.entries(medicines).forEach(([letter, medicines]) => {
      const matchingMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(term)
      );

      if (matchingMedicines.length > 0) {
        result.push({
          letter,
          medicines: matchingMedicines
        });
      }
    });

    return result.sort((a, b) => a.letter.localeCompare(b.letter));
  }, [medicines, debouncedSearchTerm]);

  const highlightMatch = useCallback((text: string, term: string): React.ReactNode => {
    if (!term || term.trim() === '') return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    return text.split(regex).map((part, i) => 
      part.toLowerCase() === term.toLowerCase() 
        ? <span key={i} className="bg-yellow-200">{part}</span> 
        : part
    );
  }, []);

  const handleAcceptDisclaimer = () => {
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
    // Save to localStorage so it doesn't show again
    localStorage.setItem('medicineDisclaimerAccepted', 'true');
  };

  const handleAlphabetClick = (letter: string) => {
    setActiveFilter(letter === activeFilter ? null : letter);
    setSearchTerm('');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setActiveFilter(null);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white relative">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Medicines A to Z</h1>
          <p className="text-xl font-medium">
            Information about medicines, how they work, and possible side effects
          </p>
        </div>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-2xl mx-auto my-4 md:my-8">
            <div className="p-4 md:p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <svg className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Important Medical Disclaimer</h3>
              </div>
              
              <div className="text-gray-700 mb-5 space-y-2 text-sm md:text-base">
                <p>The information provided on PHB about medicines is for educational purposes only and is not intended as medical advice.</p>
                <p className="font-medium mt-3"><strong>PHB does not support or endorse:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Self-diagnosis or self-medication based on the information provided</li>
                  <li>Changing or stopping any prescribed medication without consulting a healthcare professional</li>
                  <li>Using medicines without proper medical guidance</li>
                </ul>
                <p className="font-medium mt-3">Always consult with a qualified healthcare professional before taking any medication or making any changes to your treatment plan.</p>
                
                <div className="bg-yellow-100 p-3 rounded-md mt-4 border border-yellow-300">
                  <p className="text-xs md:text-sm font-medium text-yellow-800">
                    <strong>Pidgin Summary:</strong> Make you no go take any medicine by yourself o! Always talk to doctor first. PHB no go de responsible if you take medicine wey no good for your body. Na only qualified doctor fit tell you which medicine good for you. No change or stop any medicine wey doctor don give you without asking dem first. Your health na important thing, so make you dey careful well well!
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <button 
                  onClick={() => navigate('/')}
                  className="w-full py-2 md:py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 text-sm md:text-base"
                >
                  Back to Home
                </button>
                <button 
                  onClick={handleAcceptDisclaimer}
                  className="w-full py-2 md:py-3 px-4 bg-[#0891b2] hover:bg-[#0e7490] text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0891b2] text-sm md:text-base"
                >
                  I understand and accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`phb-container py-8 ${!disclaimerAccepted ? 'pointer-events-none filter blur-sm' : ''}`}>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Disclaimer:</strong> This information is not a substitute for professional medical advice. Always consult a healthcare professional before stopping or changing any medicines. Always follow the instructions provided by your doctor or pharmacist and read the patient information leaflet that comes with your medicine.
              </p>
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="mb-8">
          <label htmlFor="medicine-search" className="block font-bold mb-2">Search for a medicine</label>
          <div className="flex max-w-xl">
            <input
              type="search"
              id="medicine-search"
              placeholder="Enter medicine name"
              className="px-4 py-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search medicines input"
            />
            <button
              type="submit"
              className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-4 py-2 rounded-r-md"
              aria-label="Search medicines"
            >
              Search
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading medicines...</div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            {/* Alphabet navigation */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Browse by letter</h2>
              <div className="flex flex-wrap gap-2">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleAlphabetClick(letter)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md font-bold text-lg
                      ${activeFilter === letter
                        ? 'bg-[#0891b2] text-white'
                        : medicines[letter] && medicines[letter].length > 0
                          ? 'bg-gray-100 hover:bg-gray-200 text-[#0891b2]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    disabled={!medicines[letter] || medicines[letter].length === 0}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Medicines list */}
              <div className="lg:col-span-2">
            {filteredMedicines.map(({ letter, medicines }) => (
              <div key={letter} className="mb-8">
                <h2 id={`letter-${letter}`} className="text-2xl font-bold mb-4 text-[#0891b2] border-b border-gray-200 pb-2">
                  {letter}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medicines.map((medicine) => (
                    <li key={medicine.id}>
                      <Link
                        to={medicine.href}
                        className="text-[#0891b2] hover:underline font-medium flex items-center"
                      >
                        <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {highlightMatch(medicine.name, debouncedSearchTerm)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {filteredMedicines.length === 0 && (
              <div className="bg-gray-100 p-6 rounded-md">
                <h3 className="text-lg font-bold mb-2">No medicines found</h3>
                <p>Try searching with a different term or browse by letter.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
              <div className="bg-[#0891b2] text-white p-4">
                <h2 className="text-xl font-bold">Useful Information</h2>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-3">Related Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/health-a-z" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Health A to Z
                    </Link>
                  </li>
                  <li>
                    <Link to="/find-pharmacy" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Find a pharmacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/phb-medicines-information" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      PHB medicines information
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                  <h3 className="font-bold mb-2">Important notice</h3>
                  <p className="text-sm">
                    This information is not a substitute for professional medical advice. Always consult a healthcare
                    professional before stopping or changing any medicines.
                  </p>
                </div>
              </div>
            </div>
          </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicinesAZPage;
