/**
 * LocationSearchFilter - Reusable search and filter component
 *
 * Provides search input and category filtering for location lists.
 * Supports both desktop (expanded) and mobile (compact) layouts.
 */

import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { LocationCategory } from '../../types/location';

interface LocationSearchFilterProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;

  // Filters
  categories: LocationCategory[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;

  // Layout
  variant?: 'desktop' | 'mobile';
}

/**
 * Search and filter UI for location directories
 */
export const LocationSearchFilter: React.FC<LocationSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search locations...',
  categories,
  selectedCategories,
  onCategoryToggle,
  showFilters,
  onToggleFilters,
  variant = 'desktop',
}) => {
  if (variant === 'desktop') {
    return (
      <div>
        {/* Desktop Search Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
            />
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="p-6 border-b border-gray-100">
          <button
            onClick={onToggleFilters}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900"
          >
            <span className="flex items-center">
              <Filter className="w-5 h-5 mr-3 text-gray-600" />
              Filter by Category
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform text-gray-400 ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showFilters && (
            <div className="mt-4 space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryToggle(category.id)}
                    className="mr-3 rounded text-blue-600 w-4 h-4"
                  />
                  <span className="text-lg mr-3">{category.icon}</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">
                      {category.name}
                    </span>
                    {category.count !== undefined && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({category.count})
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  return (
    <div className="p-4 border-b border-gray-200 bg-white rounded-t-2xl">
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className={`px-3 py-2 rounded-lg border flex items-center ${
            showFilters
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-300'
          }`}
        >
          <Filter className="w-4 h-4 mr-1" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Mobile Filter Tags */}
      {showFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryToggle(category.id)}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs border transition-colors ${
                selectedCategories.includes(category.id)
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-gray-100 text-gray-600 border-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
