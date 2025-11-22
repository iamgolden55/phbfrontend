import React, { useState, useEffect } from 'react';
import { getConditionsByLetter } from '../features/health/healthConditionsData';
import { HealthCondition } from '../features/health/healthConditionsData';

type HealthConditionsType = Record<string, { name: string; href: string; id: string }[]>;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const HealthAZPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [healthConditions, setHealthConditions] = useState<HealthConditionsType>({});

  // Load and prepare health conditions data when component mounts
  useEffect(() => {
    const conditionsByLetter = getConditionsByLetter();
    const formattedConditions: HealthConditionsType = {};

    // Format data for our component structure
    Object.keys(conditionsByLetter).forEach(letter => {
      formattedConditions[letter] = conditionsByLetter[letter].map(condition => ({
        name: condition.name,
        href: `/health-a-z/${condition.id}`,
        id: condition.id
      }));
    });

    setHealthConditions(formattedConditions);
  }, []);

  const handleAlphabetClick = (letter: string) => {
    setActiveFilter(letter === activeFilter ? null : letter);
    setSearchTerm('');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setActiveFilter(null);
  };

  // Filter conditions based on search or active filter
  const filteredConditions = () => {
    const result: { letter: string; conditions: { name: string; href: string; id: string }[] }[] = [];

    if (searchTerm) {
      // Search through all conditions
      Object.entries(healthConditions).forEach(([letter, conditions]) => {
        const matchingConditions = conditions.filter(condition =>
          condition.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matchingConditions.length > 0) {
          result.push({ letter, conditions: matchingConditions });
        }
      });
    } else if (activeFilter && healthConditions[activeFilter]) {
      // Show only the active filter letter
      result.push({
        letter: activeFilter,
        conditions: healthConditions[activeFilter]
      });
    } else {
      // Show all conditions organized by letter
      Object.entries(healthConditions).forEach(([letter, conditions]) => {
        result.push({ letter, conditions });
      });
    }

    return result;
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Health A to Z</h1>
          <p className="text-xl font-medium">Find conditions and treatments information by selecting a letter</p>
        </div>
      </div>

      <div className="phb-container py-8">
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
                <strong>Disclaimer:</strong> All health information provided is for reading and educational purposes only. If you take any action based on this information, including medication decisions or self-diagnosis, PHB shall not be held liable. Always consult with a qualified healthcare professional before making health-related decisions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="mb-8">
          <label htmlFor="health-search" className="block font-bold mb-2">Search health conditions</label>
          <div className="flex max-w-xl">
            <input
              type="search"
              id="health-search"
              placeholder="Search by condition or symptom"
              className="px-4 py-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-4 py-2 rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>

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
                    : healthConditions[letter] && healthConditions[letter].length > 0
                      ? 'bg-gray-100 hover:bg-gray-200 text-[#0891b2]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!healthConditions[letter] || healthConditions[letter].length === 0}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Conditions list */}
        <div>
          {filteredConditions().map(({ letter, conditions }) => (
            <div key={letter} className="mb-8">
              <h2 id={`letter-${letter}`} className="text-2xl font-bold mb-4 text-[#0891b2] border-b border-gray-200 pb-2">
                {letter}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {conditions.map((condition) => (
                  <li key={condition.id}>
                    <a
                      href={condition.href}
                      className="text-[#0891b2] hover:underline font-medium flex items-center"
                    >
                      <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {condition.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {filteredConditions().length === 0 && (
            <div className="bg-gray-100 p-6 rounded-md">
              <h3 className="text-lg font-bold mb-2">No conditions found</h3>
              <p>Try searching with a different term or browse by letter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthAZPage;
