import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchConditions, HealthCondition } from '../health/healthConditionsData';

interface AdvancedHealthSearchProps {
  title?: string;
  description?: string;
  showCategoryFilters?: boolean;
}

const AdvancedHealthSearchComponent: React.FC<AdvancedHealthSearchProps> = ({
  title = "Advanced Health Condition Search",
  description = "Search for health conditions by symptoms, causes, or treatments",
  showCategoryFilters = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<HealthCondition[]>([]);
  const [searchType, setSearchType] = useState<'all' | 'symptoms' | 'causes' | 'treatments'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Initialize categories from health conditions
  useEffect(() => {
    // Get unique categories from healthConditions
    const uniqueCategories = new Set<string>();

    // We'll use a timer to simulate fetching categories to avoid performance issues
    setIsLoading(true);

    setTimeout(() => {
      const results = searchConditions('');
      results.forEach(condition => {
        if (condition.category) {
          uniqueCategories.add(condition.category);
        }
      });

      setCategories(Array.from(uniqueCategories).sort());
      setIsLoading(false);
    }, 300);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    // Simulate a slight delay for better user experience
    setTimeout(() => {
      const results = searchConditions(searchTerm);

      // Filter by category if one is selected
      let filteredResults = selectedCategory
        ? results.filter(condition => condition.category === selectedCategory)
        : results;

      // Filter by search type if not "all"
      if (searchType !== 'all' && searchTerm) {
        filteredResults = filteredResults.filter(condition => {
          const normalizedSearchTerm = searchTerm.toLowerCase();

          switch (searchType) {
            case 'symptoms':
              return condition.symptoms?.some(symptom =>
                symptom.toLowerCase().includes(normalizedSearchTerm)
              );
            case 'causes':
              return condition.causes?.some(cause =>
                cause.toLowerCase().includes(normalizedSearchTerm)
              );
            case 'treatments':
              return condition.treatments?.some(treatment =>
                treatment.toLowerCase().includes(normalizedSearchTerm)
              );
            default:
              return true;
          }
        });
      }

      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };

  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <label htmlFor="health-search" className="block text-sm font-medium text-gray-700 mb-1">
              Search term
            </label>
            <input
              type="search"
              id="health-search"
              placeholder="Enter symptoms, condition name, or keywords"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/4">
            <label htmlFor="search-type" className="block text-sm font-medium text-gray-700 mb-1">
              Search in
            </label>
            <select
              id="search-type"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
            >
              <option value="all">All fields</option>
              <option value="symptoms">Symptoms only</option>
              <option value="causes">Causes only</option>
              <option value="treatments">Treatments only</option>
            </select>
          </div>

          {showCategoryFilters && (
            <div className="w-full md:w-1/4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={isLoading}
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {formatCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Health Conditions'}
        </button>
      </form>

      {/* Search results */}
      <div>
        {hasSearched && (
          <h3 className="text-lg font-semibold mb-4">
            {isLoading
              ? 'Searching...'
              : searchResults.length === 0
                ? 'No conditions found'
                : `Found ${searchResults.length} condition${searchResults.length === 1 ? '' : 's'}`
            }
          </h3>
        )}

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ul className="space-y-4">
            {searchResults.map((condition) => (
              <li key={condition.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                <Link to={`/health-a-z/${condition.id}`} className="block">
                  <h4 className="text-lg font-semibold text-blue-600 hover:underline mb-1">{condition.name}</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-blue-100 text-blue-800">
                      {formatCategoryName(condition.category)}
                    </span>
                    {condition.subcategory && (
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-800">
                        {formatCategoryName(condition.subcategory)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{condition.description}</p>

                  {searchType === 'symptoms' && condition.symptoms && condition.symptoms.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium text-gray-700">Common symptoms:</h5>
                      <ul className="text-sm text-gray-600">
                        {condition.symptoms.slice(0, 3).map((symptom, idx) => (
                          <li key={idx} className="inline-block mr-2">• {symptom}</li>
                        ))}
                        {condition.symptoms.length > 3 && <li className="inline-block text-blue-500">+ {condition.symptoms.length - 3} more</li>}
                      </ul>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {hasSearched && !isLoading && searchResults.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-md">
            <p className="text-gray-500 mb-4">No health conditions match your search criteria.</p>
            <p className="text-gray-600">Try:</p>
            <ul className="text-gray-600 list-disc list-inside mb-4">
              <li>Using more general terms</li>
              <li>Checking for spelling errors</li>
              <li>Searching in "All fields" instead of specific categories</li>
              <li>Removing category filters</li>
            </ul>
            <p className="text-sm text-gray-500">
              If you're experiencing symptoms and can't find relevant information, please consult a healthcare professional.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedHealthSearchComponent;
