import React from 'react';
import { Link } from 'react-router-dom';

export type SearchResultItem = {
  title: string;
  description: string;
  url: string;
  category: string;
  concepts?: string[]; // Optional array of concepts related to this item
  symptoms?: string[]; // Optional array of symptoms related to this item
};

type SearchResultsProps = {
  results: SearchResultItem[];
  isLoading: boolean;
  searchTerm: string;
  onClose: () => void;
  onResultClick?: (url: string) => void; // Optional because we might not need it in all cases
  searchHistory?: { term: string; timestamp: number }[]; // New prop for search history
  onHistoryItemClick?: (term: string) => void; // Handler for clicking history items
  onClearHistory?: () => void; // Handler for clearing history
  onRemoveHistoryItem?: (term: string) => void; // Handler for removing a single history item
  activeFilter?: string; // Currently active filter category
  onFilterChange?: (filter: string) => void; // Handler for changing filter
};

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  searchTerm,
  onClose,
  onResultClick,
  searchHistory = [],
  onHistoryItemClick,
  onClearHistory,
  onRemoveHistoryItem,
  activeFilter = 'all',
  onFilterChange
}) => {
  if (searchTerm.length < 2 && searchHistory.length === 0) {
    return null;
  }

  // Extract unique categories for filter tabs
  const categories = ['all', ...new Set(results.map(result => result.category.toLowerCase()))];

  // Filter results based on the active filter
  const filteredResults = activeFilter === 'all'
    ? results
    : results.filter(result => result.category.toLowerCase() === activeFilter);

  // Handle result click with the custom handler if provided
  const handleResultClick = (url: string, event: React.MouseEvent) => {
    if (onResultClick) {
      event.preventDefault(); // Prevent default link behavior
      onResultClick(url);
    }
    onClose();
  };

  // Check if there is a notice in the first result
  const hasNotice = results.length > 0 &&
    (results[0].description.includes('Showing results for') ||
     results[0].description.includes('Showing similar results') ||
     results[0].description.includes('Showing results related to'));

  // Extract the notice if it exists
  let notice = '';
  let originalDescription = '';

  if (hasNotice && results.length > 0) {
    const desc = results[0].description;
    const noticePart = desc.substring(0, desc.indexOf('.') + 1);
    originalDescription = desc.substring(desc.indexOf('.') + 1).trim();
    notice = noticePart;
  }

  // Determine notice type for styling
  const isSpellingCorrection = notice.includes('Showing results for');
  const isConceptSearch = notice.includes('Showing results related to');
  const isFuzzySearch = notice.includes('Showing similar results');

  // Define notice style based on type
  let noticeStyle = "px-4 py-3 text-sm border-b";
  if (isSpellingCorrection) {
    noticeStyle += " bg-blue-50 text-blue-700 border-blue-100";
  } else if (isConceptSearch) {
    noticeStyle += " bg-green-50 text-green-700 border-green-100";
  } else if (isFuzzySearch) {
    noticeStyle += " bg-yellow-50 text-yellow-700 border-yellow-100";
  }

  // Format the timestamp to a readable format
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 z-50 pointer-events-auto max-w-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
        <h3 className="font-semibold truncate mr-2">
          {isLoading ? (
            'Searching...'
          ) : searchTerm.length >= 2 ? (
            `Results for "${searchTerm}"`
          ) : searchHistory.length > 0 ? (
            'Recent searches'
          ) : (
            `No results for "${searchTerm}"`
          )}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2"
          aria-label="Close search results"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search history section */}
      {searchTerm.length < 2 && searchHistory.length > 0 && (
        <div className="border-b border-gray-200">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700">Recent searches</h4>
            {onClearHistory && (
              <button
                onClick={onClearHistory}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            )}
          </div>
          <ul className="divide-y divide-gray-100">
            {searchHistory.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-3 hover:bg-gray-50">
                <button
                  className="flex items-center flex-grow text-left"
                  onClick={() => onHistoryItemClick && onHistoryItemClick(item.term)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="text-gray-800">{item.term}</span>
                  <span className="text-xs text-gray-500 ml-2">{formatDate(item.timestamp)}</span>
                </button>
                {onRemoveHistoryItem && (
                  <button
                    onClick={() => onRemoveHistoryItem(item.term)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    aria-label={`Remove ${item.term} from history`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notice (spelling correction, concept match, etc.) */}
      {hasNotice && searchTerm.length >= 2 && (
        <div className={noticeStyle}>
          {notice}
          {isSpellingCorrection && (
            <button className="underline hover:text-blue-900 ml-1">Search for exact term instead</button>
          )}
        </div>
      )}

      {/* Filter tabs - only show if we have results and multiple categories */}
      {categories.length > 1 && filteredResults.length > 0 && onFilterChange && (
        <div className="border-b border-gray-200 px-2 pt-2 overflow-x-auto whitespace-nowrap">
          <div className="inline-flex">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className={`px-3 py-2 text-sm font-medium rounded-t-md mr-1 ${
                  activeFilter === category
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-h-[60vh] overflow-y-auto">
        {isLoading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredResults.length > 0 && searchTerm.length >= 2 ? (
          <ul className="divide-y divide-gray-100">
            {filteredResults.map((result, index) => {
              // Use the original description for the first item if we extracted a notice
              const description = index === 0 && hasNotice ? originalDescription : result.description;

              return (
                <li key={index} className="hover:bg-gray-50 transition-colors">
                  <Link
                    to={result.url}
                    className="block p-4 md:p-3"
                    onClick={(e) => handleResultClick(result.url, e)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <span className="inline-block text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded mb-2">
                          {result.category}
                        </span>
                        <h4 className="font-medium text-[#005eb8] mb-2 text-base md:text-sm">{result.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3 md:line-clamp-2">{description}</p>

                        {/* Display concepts/symptoms if available */}
                        {(result.concepts?.length || result.symptoms?.length) && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {result.concepts?.map((concept, i) => (
                              <span key={`concept-${i}`} className="inline-block text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                {concept}
                              </span>
                            ))}
                            {result.symptoms?.map((symptom, i) => (
                              <span key={`symptom-${i}`} className="inline-block text-xs px-1.5 py-0.5 bg-red-50 text-red-600 rounded">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-1 ml-2 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : searchTerm.length >= 2 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 mb-4">We couldn't find any results matching your search.</p>
            <div className="text-sm text-gray-500">
              <p>Try:</p>
              <ul className="list-disc pl-5 mt-2 text-left mx-auto max-w-xs">
                <li className="mb-1">Checking your spelling</li>
                <li className="mb-1">Using fewer keywords</li>
                <li className="mb-1">Using more general terms</li>
                <li className="mb-1">Describing your symptoms more clearly</li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      {filteredResults.length > 0 && searchTerm.length >= 2 && (
        <div className="p-4 border-t border-gray-200 text-center sticky bottom-0 bg-white">
          <Link
            to={`/search?q=${encodeURIComponent(searchTerm)}`}
            className="text-[#005eb8] hover:underline text-sm font-medium"
            onClick={(e) => onResultClick ? handleResultClick(`/search?q=${encodeURIComponent(searchTerm)}`, e) : onClose()}
          >
            View all results
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
