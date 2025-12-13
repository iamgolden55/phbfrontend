/**
 * DepartmentFilters Component (Redesigned)
 *
 * Provides comprehensive filtering controls with collapsible panel.
 * Features search, type/status/location filters, and category chips.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  X,
  HelpCircle
} from 'lucide-react';
import {
  DepartmentType,
  DepartmentFilters as DepartmentFiltersType,
  Wing,
  DEPARTMENT_TYPE_LABELS,
  DEPARTMENT_TYPE_CATEGORIES,
  WING_LABELS
} from '../../../types/department';

interface DepartmentFiltersProps {
  filters: DepartmentFiltersType;
  onChange: (filters: DepartmentFiltersType) => void;
  onReset: () => void;
  departmentCount?: number;
}

/**
 * DepartmentFilters Component
 *
 * Features:
 * - Collapsible filter panel
 * - Search by name or code
 * - Filter by department type (with optgroups)
 * - Filter by active status
 * - Filter by wing/location
 * - Category chips (Clinical, Support, Administrative)
 * - Active filter indicators with clear buttons
 * - Help tooltips
 */
const DepartmentFilters: React.FC<DepartmentFiltersProps> = ({
  filters,
  onChange,
  onReset,
  departmentCount
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      search: event.target.value
    });
  };

  // Handle department type change
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange({
      ...filters,
      department_type: value === 'all' ? 'all' : (value as DepartmentType)
    });
  };

  // Handle status filter change
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange({
      ...filters,
      is_active: value === 'all' ? 'all' : value === 'true'
    });
  };

  // Handle wing filter change
  const handleWingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange({
      ...filters,
      wing: value === 'all' ? 'all' : (value as Wing)
    });
  };

  // Handle category toggle
  const handleCategoryToggle = (category: 'is_clinical' | 'is_support' | 'is_administrative') => {
    onChange({
      ...filters,
      [category]: !filters[category]
    });
  };

  // Count active filters
  const getActiveFilterCount = (): number => {
    let count = 0;
    if (filters.search) count++;
    if (filters.department_type && filters.department_type !== 'all') count++;
    if (filters.is_active !== undefined && filters.is_active !== 'all') count++;
    if (filters.wing && filters.wing !== 'all') count++;
    if (filters.is_clinical) count++;
    if (filters.is_support) count++;
    if (filters.is_administrative) count++;
    return count;
  };

  // Get active filter chips
  const getActiveFilterChips = () => {
    const chips: { label: string; onRemove: () => void }[] = [];

    if (filters.search) {
      chips.push({
        label: `Search: "${filters.search}"`,
        onRemove: () => onChange({ ...filters, search: '' })
      });
    }

    if (filters.department_type && filters.department_type !== 'all') {
      chips.push({
        label: `Type: ${DEPARTMENT_TYPE_LABELS[filters.department_type]}`,
        onRemove: () => onChange({ ...filters, department_type: 'all' })
      });
    }

    if (filters.is_active !== undefined && filters.is_active !== 'all') {
      chips.push({
        label: `Status: ${filters.is_active ? 'Active' : 'Inactive'}`,
        onRemove: () => onChange({ ...filters, is_active: 'all' })
      });
    }

    if (filters.wing && filters.wing !== 'all') {
      chips.push({
        label: `Wing: ${WING_LABELS[filters.wing]}`,
        onRemove: () => onChange({ ...filters, wing: 'all' })
      });
    }

    if (filters.is_clinical) {
      chips.push({
        label: 'Clinical',
        onRemove: () => handleCategoryToggle('is_clinical')
      });
    }

    if (filters.is_support) {
      chips.push({
        label: 'Support',
        onRemove: () => handleCategoryToggle('is_support')
      });
    }

    if (filters.is_administrative) {
      chips.push({
        label: 'Administrative',
        onRemove: () => handleCategoryToggle('is_administrative')
      });
    }

    return chips;
  };

  const activeFilterCount = getActiveFilterCount();
  const hasActiveFilters = activeFilterCount > 0;
  const activeFilterChips = getActiveFilterChips();

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
      data-tour="filters"
    >
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
            >
              {isExpanded ? (
                <ChevronDown size={20} className="text-gray-600" />
              ) : (
                <ChevronRight size={20} className="text-gray-600" />
              )}
            </button>

            <Filter size={20} className="text-gray-600" />

            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800">Filters</h3>
              {hasActiveFilters && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  {activeFilterCount} active
                </span>
              )}
            </div>

            {departmentCount !== undefined && (
              <span className="text-sm text-gray-500">
                ({departmentCount} departments)
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X size={16} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls (Collapsible) */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or code..."
              value={filters.search || ''}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Department Type Dropdown */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                Department Type
                <div className="group relative">
                  <HelpCircle size={14} className="text-gray-400 hover:text-gray-600" />
                  <div className="absolute left-0 top-6 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Filter by specific department type (e.g., Cardiology, Radiology)
                  </div>
                </div>
              </label>
              <select
                value={filters.department_type || 'all'}
                onChange={handleTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Types</option>

                <optgroup label="Clinical Departments">
                  {DEPARTMENT_TYPE_CATEGORIES.CLINICAL.map((type) => (
                    <option key={type} value={type}>
                      {DEPARTMENT_TYPE_LABELS[type]}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="Support Departments">
                  {DEPARTMENT_TYPE_CATEGORIES.SUPPORT.map((type) => (
                    <option key={type} value={type}>
                      {DEPARTMENT_TYPE_LABELS[type]}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="Administrative Departments">
                  {DEPARTMENT_TYPE_CATEGORIES.ADMINISTRATIVE.map((type) => (
                    <option key={type} value={type}>
                      {DEPARTMENT_TYPE_LABELS[type]}
                    </option>
                  ))}
                </optgroup>

                <option value="custom">{DEPARTMENT_TYPE_LABELS['custom']}</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                Status
                <div className="group relative">
                  <HelpCircle size={14} className="text-gray-400 hover:text-gray-600" />
                  <div className="absolute left-0 top-6 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Filter by active or inactive departments
                  </div>
                </div>
              </label>
              <select
                value={
                  filters.is_active === undefined || filters.is_active === 'all'
                    ? 'all'
                    : filters.is_active
                    ? 'true'
                    : 'false'
                }
                onChange={handleStatusChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="true">Active Only</option>
                <option value="false">Inactive Only</option>
              </select>
            </div>

            {/* Wing/Location Dropdown */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                Wing/Location
                <div className="group relative">
                  <HelpCircle size={14} className="text-gray-400 hover:text-gray-600" />
                  <div className="absolute left-0 top-6 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Filter by hospital wing or location
                  </div>
                </div>
              </label>
              <select
                value={filters.wing || 'all'}
                onChange={handleWingChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Locations</option>
                {Object.entries(WING_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Category Filters */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryToggle('is_clinical')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border-2 transition-colors ${
                    filters.is_clinical
                      ? 'bg-orange-100 text-orange-700 border-orange-500'
                      : 'bg-gray-100 text-gray-600 border-transparent hover:border-gray-300'
                  }`}
                >
                  Clinical
                </button>
                <button
                  onClick={() => handleCategoryToggle('is_support')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border-2 transition-colors ${
                    filters.is_support
                      ? 'bg-orange-100 text-orange-700 border-orange-500'
                      : 'bg-gray-100 text-gray-600 border-transparent hover:border-gray-300'
                  }`}
                >
                  Support
                </button>
                <button
                  onClick={() => handleCategoryToggle('is_administrative')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border-2 transition-colors ${
                    filters.is_administrative
                      ? 'bg-orange-100 text-orange-700 border-orange-500'
                      : 'bg-gray-100 text-gray-600 border-transparent hover:border-gray-300'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-600">Active filters:</span>
                {activeFilterChips.map((chip, index) => (
                  <button
                    key={index}
                    onClick={chip.onRemove}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <span>{chip.label}</span>
                    <X size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DepartmentFilters;
