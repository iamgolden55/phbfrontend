// Constants
const SEARCH_HISTORY_KEY = 'phb-search-history';
const MAX_HISTORY_ITEMS = 10;

// Types
export interface SearchHistoryItem {
  term: string;
  timestamp: number;
}

// Get search history from localStorage
export const getSearchHistory = (): SearchHistoryItem[] => {
  try {
    const historyString = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!historyString) return [];
    return JSON.parse(historyString);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    return [];
  }
};

// Add a search term to history
export const addToSearchHistory = (term: string): SearchHistoryItem[] => {
  if (!term || term.trim() === '') return getSearchHistory();

  try {
    const normalizedTerm = term.trim().toLowerCase();
    const currentHistory = getSearchHistory();

    // Remove the term if it already exists
    const filteredHistory = currentHistory.filter(item => item.term.toLowerCase() !== normalizedTerm);

    // Add the term to the beginning of the array
    const newHistory = [
      { term: term.trim(), timestamp: Date.now() },
      ...filteredHistory
    ].slice(0, MAX_HISTORY_ITEMS); // Keep only the most recent searches

    // Save to localStorage
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));

    return newHistory;
  } catch (error) {
    console.error('Error adding to search history:', error);
    return getSearchHistory();
  }
};

// Clear search history
export const clearSearchHistory = (): void => {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};

// Remove a specific search term from history
export const removeFromSearchHistory = (term: string): SearchHistoryItem[] => {
  try {
    const normalizedTerm = term.trim().toLowerCase();
    const currentHistory = getSearchHistory();

    const filteredHistory = currentHistory.filter(item => item.term.toLowerCase() !== normalizedTerm);

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filteredHistory));

    return filteredHistory;
  } catch (error) {
    console.error('Error removing from search history:', error);
    return getSearchHistory();
  }
};
