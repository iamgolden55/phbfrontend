/**
 * LocationList - Reusable location list component
 *
 * Displays a scrollable list of locations with details.
 * Supports selection state and custom detail rendering.
 */

import React from 'react';
import { BaseLocation, LocationCategory } from '../../types/location';
import { Star, MapPin, Clock } from 'lucide-react';

interface LocationListProps<T extends BaseLocation> {
  locations: T[];
  categories: LocationCategory[];
  selectedLocation: T | null;
  onLocationSelect: (location: T) => void;
  renderLocationDetails?: (location: T) => React.ReactNode;
  variant?: 'desktop' | 'mobile';
}

/**
 * Scrollable list of locations with selection highlighting
 * @template T Type of location object
 */
export function LocationList<T extends BaseLocation>({
  locations,
  categories,
  selectedLocation,
  onLocationSelect,
  renderLocationDetails,
  variant = 'desktop',
}: LocationListProps<T>) {
  const getCategory = (location: T) =>
    categories.find((cat) => cat.id === location.category);

  if (variant === 'desktop') {
    return (
      <div className="flex-1 overflow-y-auto">
        {locations.map((location) => {
          const category = getCategory(location);
          return (
            <div
              key={location.id}
              onClick={() => onLocationSelect(location)}
              className={`p-6 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                selectedLocation?.id === location.id
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-3">{category?.icon}</span>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {location.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {location.address}
                  </p>

                  <div className="flex items-center space-x-4 text-sm mb-3">
                    {location.rating && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-medium text-gray-900">
                          {location.rating}
                        </span>
                        {location.reviewCount && (
                          <span className="text-gray-500 ml-1">
                            ({location.reviewCount})
                          </span>
                        )}
                      </div>
                    )}
                    {location.distance && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-600">{location.distance}</span>
                      </div>
                    )}
                  </div>

                  {location.isOpen !== undefined && location.hours && (
                    <div className="flex items-center">
                      <Clock
                        className={`w-4 h-4 mr-2 ${
                          location.isOpen ? 'text-green-500' : 'text-red-500'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          location.isOpen ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {location.isOpen ? `Open • ${location.hours}` : 'Closed'}
                      </span>
                    </div>
                  )}

                  {renderLocationDetails && renderLocationDetails(location)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Mobile variant
  return (
    <div className="flex-1 overflow-y-auto">
      {locations.map((location) => {
        const category = getCategory(location);
        return (
          <div
            key={location.id}
            onClick={() => onLocationSelect(location)}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
              selectedLocation?.id === location.id ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg flex-shrink-0 mt-0.5">{category?.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {location.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                  {location.address}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    {location.rating && (
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="font-medium text-gray-900">
                          {location.rating}
                        </span>
                      </div>
                    )}
                    {location.distance && (
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-gray-600">{location.distance}</span>
                      </div>
                    )}
                  </div>
                  {location.isOpen !== undefined && (
                    <div className="flex items-center">
                      <Clock
                        className={`w-3 h-3 mr-1 ${
                          location.isOpen ? 'text-green-500' : 'text-red-500'
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          location.isOpen ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {location.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  )}
                </div>

                {renderLocationDetails && renderLocationDetails(location)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
