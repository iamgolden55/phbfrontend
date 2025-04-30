import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchContent } from '../utils/searchService';
import type { SearchResultItem } from '../components/SearchResults';
import Breadcrumbs from '../components/Breadcrumbs';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const searchResults = await searchContent(query);
        setResults(searchResults);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(searchResults.map(result => result.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Filter results based on selected category
  const filteredResults = selectedCategory === 'all'
    ? results
    : results.filter(result => result.category === selectedCategory);

  // Group results by category for the "all" view
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResultItem[]>);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <p className="text-xl font-medium">
            {query ? `Results for "${query}"` : 'Search the PHB website'}
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Search', href: '/search' }
            ]}
          />
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Search form */}
        <div className="mb-8">
          <form className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search PHB"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Search
            </button>
          </form>

          {/* Link to Advanced Search */}
          <div className="mt-3 text-right">
            <Link
              to={query ? `/advanced-search?q=${encodeURIComponent(query)}` : "/advanced-search"}
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center justify-end"
            >
              <span>Try our advanced search with body map and symptom checker</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Results section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category filter - sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-bold mb-4">Filter by category</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All categories ({results.length})
                  </button>
                </li>
                {categories.map(category => {
                  const count = results.filter(r => r.category === category).length;
                  return (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-800 font-medium'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category} ({count})
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Results list */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : results.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                <h2 className="text-xl font-bold mb-4">No results found</h2>
                {query ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any results for "{query}". Try another search term or browse our categories.
                    </p>
                    <div className="mb-6">
                      <Link
                        to={`/advanced-search?q=${encodeURIComponent(query)}`}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        <span>Try our advanced search tools</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Enter a search term to find information across the PHB website.
                  </p>
                )}
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Popular searches:</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Link to="/search?q=pregnancy" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">pregnancy</Link>
                    <Link to="/search?q=diabetes" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">diabetes</Link>
                    <Link to="/search?q=covid" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">covid-19</Link>
                    <Link to="/search?q=mental+health" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">mental health</Link>
                  </div>
                </div>
              </div>
            ) : selectedCategory === 'all' ? (
              // Display results grouped by category when showing all
              <div className="space-y-8">
                {Object.entries(groupedResults).map(([category, categoryResults]) => (
                  <div key={category}>
                    <h2 className="text-xl font-bold mb-4 text-[#005eb8] border-b pb-2">{category}</h2>
                    <ul className="divide-y divide-gray-100">
                      {categoryResults.map((result, index) => (
                        <li key={index} className="py-4">
                          <Link to={result.url} className="block">
                            <h3 className="text-lg font-medium text-blue-700 hover:underline">{result.title}</h3>
                            <p className="text-gray-600 mt-1">{result.description}</p>
                            <p className="text-sm text-gray-500 mt-2">{result.url}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              // Display filtered results when a category is selected
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#005eb8] border-b pb-2">
                  {selectedCategory} ({filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'})
                </h2>
                {filteredResults.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {filteredResults.map((result, index) => (
                      <li key={index} className="py-4">
                        <Link to={result.url} className="block">
                          <h3 className="text-lg font-medium text-blue-700 hover:underline">{result.title}</h3>
                          <p className="text-gray-600 mt-1">{result.description}</p>
                          <p className="text-sm text-gray-500 mt-2">{result.url}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 py-4">No results found in this category.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
