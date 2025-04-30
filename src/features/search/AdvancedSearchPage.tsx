import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchContent } from '../../utils/searchService';
import { SearchResultItem } from '../../components/SearchResults';
import MedicalTermHighlighter from './MedicalTermHighlighter';
import BodyMapSearch from './BodyMapSearch';
import SymptomChecker from './SymptomChecker';
import DidYouMean, { generateSymptomSuggestions } from './DidYouMean';
import { getMedicalTermDefinition } from './medicalDictionary';
import AdvancedHealthSearchComponent from './AdvancedHealthSearchComponent';

const AdvancedSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [activeTab, setActiveTab] = useState<'text' | 'body' | 'checker' | 'health'>('text');
  const [didYouMeanSuggestions, setDidYouMeanSuggestions] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract search query from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      performSearch(q);

      // Generate "Did you mean" suggestions
      const suggestions = generateSymptomSuggestions(q);
      setDidYouMeanSuggestions(suggestions);
    }

    // Check if tab is specified in URL
    const tab = params.get('tab');
    if (tab === 'health' || tab === 'body' || tab === 'checker') {
      setActiveTab(tab);
    }
  }, [location.search]);

  const performSearch = async (query: string) => {
    if (!query?.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchContent(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/advanced-search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}`);
      performSearch(searchQuery);

      // Generate "Did you mean" suggestions
      const suggestions = generateSymptomSuggestions(searchQuery);
      setDidYouMeanSuggestions(suggestions);
    }
  };

  const handleBodyPartSelect = (bodyPart: any) => {
    // When a body part is selected, update the search query
    setSearchQuery(`${bodyPart.name} symptoms`);
  };

  const handleSymptomSelect = (symptom: string, bodyPart: any) => {
    // When a symptom is selected, update the search query and perform search
    const query = `${bodyPart.name} ${symptom}`;
    setSearchQuery(query);

    // Switch to text search tab to display results
    setActiveTab('text');

    // Update URL with the new query and tab
    navigate(`/advanced-search?q=${encodeURIComponent(query)}&tab=text`);

    // Perform the search
    performSearch(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/advanced-search?q=${encodeURIComponent(suggestion)}&tab=${activeTab}`);
    performSearch(suggestion);
    setDidYouMeanSuggestions([]);
  };

  const handleCheckerResults = (results: any[]) => {
    // Update the search results with symptom checker results
    if (results && results.length > 0) {
      const checkerResults: SearchResultItem[] = results.map(result => ({
        title: result.name,
        description: result.description,
        url: result.url,
        category: 'Symptom Checker Results'
      }));

      setSearchResults(checkerResults);
    }
  };

  const handleTabChange = (tab: 'text' | 'body' | 'checker' | 'health') => {
    setActiveTab(tab);
    // Update URL with tab parameter
    const params = new URLSearchParams(location.search);
    params.set('tab', tab);
    navigate(`/advanced-search?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Advanced Health Search
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Find health information in multiple ways - search, health conditions database, body map, or symptom checker
        </p>
      </div>

      {/* Search form - only show for text search tab */}
      {activeTab === 'text' && (
        <div className="max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symptoms, conditions or body parts..."
                className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
              />
              {searchQuery.trim() && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setSearchQuery('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              className="flex-none bg-blue-600 px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>

          {/* Did you mean suggestions */}
          {didYouMeanSuggestions.length > 0 && (
            <DidYouMean
              originalQuery={searchQuery}
              suggestions={didYouMeanSuggestions}
              onSuggestionClick={handleSuggestionClick}
              className="mt-2"
            />
          )}
        </div>
      )}

      {/* Tabs for different search methods */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange('text')}
            className={`${
              activeTab === 'text'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Text Search
          </button>
          <button
            onClick={() => handleTabChange('health')}
            className={`${
              activeTab === 'health'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Health Conditions
          </button>
          <button
            onClick={() => handleTabChange('body')}
            className={`${
              activeTab === 'body'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Body Map
          </button>
          <button
            onClick={() => handleTabChange('checker')}
            className={`${
              activeTab === 'checker'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Symptom Checker
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      <div className="mb-12">
        {activeTab === 'text' && (
          <div>
            {/* Text search results */}
            {isSearching ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  Search results for "{searchQuery}"
                </h2>
                <div className="grid gap-6">
                  {searchResults.map((result, index) => (
                    <div key={index} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-blue-600">
                            <a href={result.url} className="hover:underline">
                              {result.title}
                            </a>
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                            {result.category}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <MedicalTermHighlighter text={result.description} />
                        </div>
                        <div className="mt-3">
                          <a
                            href={result.url}
                            className="text-sm text-blue-600 hover:text-blue-900 font-medium hover:underline"
                          >
                            Read more →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                <p className="mt-1 text-gray-500">
                  We couldn't find any results for "{searchQuery}". Please try a different search term or use the health conditions, body map, or symptom checker.
                </p>
              </div>
            ) : (
              <div className="text-center py-12 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  Enter a search term above or try the health conditions, body map, or symptom checker.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Health Conditions Database */}
        {activeTab === 'health' && (
          <div>
            <AdvancedHealthSearchComponent
              title="Health Conditions Database"
              description="Search our comprehensive database of health conditions by symptoms, causes, or treatments"
              showCategoryFilters={true}
            />
          </div>
        )}

        {activeTab === 'body' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Select a body part to find related symptoms
            </h2>
            <BodyMapSearch
              onBodyPartSelect={handleBodyPartSelect}
              onSymptomSelect={handleSymptomSelect}
            />
          </div>
        )}

        {activeTab === 'checker' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Answer questions to identify possible conditions
            </h2>
            <SymptomChecker onResultsGenerated={handleCheckerResults} />
          </div>
        )}
      </div>

      {/* Help section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Search Tips</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Text Search</h3>
            <p className="text-gray-600 text-sm">
              Enter symptoms, conditions, or health topics. Our search understands misspellings and everyday language like "serious headache".
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Health Conditions</h3>
            <p className="text-gray-600 text-sm">
              Search our database of detailed health conditions. Filter by category or search for specific symptoms, causes or treatments.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Body Map</h3>
            <p className="text-gray-600 text-sm">
              Click on a body part to see related symptoms. Select a symptom to search for information about that specific issue.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Symptom Checker</h3>
            <p className="text-gray-600 text-sm">
              Answer a series of questions about your symptoms to get a list of possible conditions. This is not a diagnosis but can help guide your research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
