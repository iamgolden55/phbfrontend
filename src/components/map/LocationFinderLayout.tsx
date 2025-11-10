/**
 * LocationFinderLayout - Complete location finder solution
 *
 * Turn-key layout that combines map, search, filters, and location list
 * into a fully functional location finder page. Handles all layout logic
 * internally - pages only need to provide data and callbacks.
 */

import React, { useState } from 'react';
import { BaseLocation, LocationCategory } from '../../types/location';
import { MapProvider, useMap } from '../../contexts/MapContext';
import { LocationMap } from './LocationMap';
import { LocationSearchFilter } from './LocationSearchFilter';
import { LocationList } from './LocationList';
import { X, Navigation, Phone } from 'lucide-react';

interface LocationFinderLayoutProps<T extends BaseLocation> {
  // Data
  locations: T[];
  categories: LocationCategory[];

  // Callbacks
  onSearch: (query: string) => void;
  onFilter: (categoryIds: string[]) => void;

  // Customization
  searchPlaceholder?: string;
  renderLocationDetails?: (location: T) => React.ReactNode;
  renderSelectedCard?: (location: T, onClose: () => void) => React.ReactNode;

  // Title
  title?: string;
}

function LocationFinderLayoutInner<T extends BaseLocation>({
  locations,
  categories,
  onSearch,
  onFilter,
  searchPlaceholder,
  renderLocationDetails,
  renderSelectedCard,
  title = 'Find Locations',
}: LocationFinderLayoutProps<T>) {
  const { selectedLocation, setSelectedLocation, isLoading } = useMap();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelected);
    onFilter(newSelected);
  };

  const defaultSelectedCard = (location: T, onClose: () => void) => (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {location.name}
          </h3>
          <p className="text-gray-600 mb-3">{location.address}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`,
              '_blank'
            )
          }
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Directions
        </button>
        {location.phone && (
          <button
            onClick={() => window.open(`tel:${location.phone}`, '_self')}
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center font-medium"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-100 relative overflow-hidden">
      <div className="h-full relative">
        {/* Desktop: Floating Sidebar */}
        <div className="hidden lg:block absolute left-4 top-4 h-[calc(100vh-2rem)] w-80 bg-white rounded-2xl shadow-2xl z-10 overflow-hidden">
          <div className="h-full flex flex-col">
            <LocationSearchFilter
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              searchPlaceholder={searchPlaceholder}
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              variant="desktop"
            />

            <LocationList
              locations={locations}
              categories={categories}
              selectedLocation={selectedLocation as T}
              onLocationSelect={setSelectedLocation}
              renderLocationDetails={renderLocationDetails}
              variant="desktop"
            />
          </div>
        </div>

        {/* Mobile: Split View */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Mobile Map (Top Half) */}
          <div className="h-1/2 relative">
            <LocationMap
              locations={locations}
              categories={categories}
              onLocationSelect={setSelectedLocation}
              deviceType="mobile"
              containerClassName="w-full h-full"
            />

            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Location List (Bottom Half) */}
          <div className="h-1/2 bg-white flex flex-col rounded-t-2xl shadow-lg">
            <LocationSearchFilter
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              searchPlaceholder={searchPlaceholder}
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              variant="mobile"
            />

            <LocationList
              locations={locations}
              categories={categories}
              selectedLocation={selectedLocation as T}
              onLocationSelect={setSelectedLocation}
              renderLocationDetails={renderLocationDetails}
              variant="mobile"
            />
          </div>
        </div>

        {/* Desktop Map Container */}
        <div className="hidden lg:block h-full relative p-6">
          <LocationMap
            locations={locations}
            categories={categories}
            onLocationSelect={setSelectedLocation}
            deviceType="desktop"
            containerClassName="w-full h-full rounded-2xl overflow-hidden shadow-lg"
          />

          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          {/* Desktop Selected Location Card */}
          {selectedLocation && (
            <div className="hidden lg:block absolute bottom-6 left-6 right-6 max-w-md z-50">
              {renderSelectedCard
                ? renderSelectedCard(selectedLocation as T, () => setSelectedLocation(null))
                : defaultSelectedCard(selectedLocation as T, () => setSelectedLocation(null))}
            </div>
          )}
        </div>

        {/* Mobile Selected Location Bottom Sheet */}
        {selectedLocation && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 z-50 max-h-60 overflow-y-auto">
            {renderSelectedCard
              ? renderSelectedCard(selectedLocation as T, () => setSelectedLocation(null))
              : defaultSelectedCard(selectedLocation as T, () => setSelectedLocation(null))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Complete location finder layout with map provider
 * @template T Type of location object
 */
export function LocationFinderLayout<T extends BaseLocation>(
  props: LocationFinderLayoutProps<T>
) {
  return (
    <MapProvider>
      <LocationFinderLayoutInner {...props} />
    </MapProvider>
  );
}
