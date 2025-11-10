/**
 * MapContext - Centralized state management for map system
 *
 * Provides shared state for desktop and mobile map instances,
 * selected locations, and map control actions.
 */

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { BaseLocation } from '../types/location';

interface MapContextValue {
  // Map instances (desktop & mobile)
  desktopMap: React.MutableRefObject<any>;
  mobileMap: React.MutableRefObject<any>;

  // Map state
  center: [number, number];
  zoom: number;
  isLoading: boolean;

  // Selected location
  selectedLocation: BaseLocation | null;
  setSelectedLocation: (location: BaseLocation | null) => void;

  // Map actions
  flyToLocation: (lng: number, lat: number, zoom?: number) => void;
  fitBounds: (bounds: number[][]) => void;

  // Setters
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  setIsLoading: (loading: boolean) => void;
}

const MapContext = createContext<MapContextValue | null>(null);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const desktopMap = useRef<any>(null);
  const mobileMap = useRef<any>(null);

  const [center, setCenter] = useState<[number, number]>([-0.1278, 51.5074]); // Default: London
  const [zoom, setZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<BaseLocation | null>(null);

  const flyToLocation = useCallback((lng: number, lat: number, targetZoom = 15) => {
    if (desktopMap.current) {
      desktopMap.current.flyTo({ center: [lng, lat], zoom: targetZoom });
    }
    if (mobileMap.current) {
      mobileMap.current.flyTo({ center: [lng, lat], zoom: targetZoom });
    }
  }, []);

  const fitBounds = useCallback((bounds: number[][]) => {
    if (desktopMap.current) {
      desktopMap.current.fitBounds(bounds, { padding: 50 });
    }
    if (mobileMap.current) {
      mobileMap.current.fitBounds(bounds, { padding: 50 });
    }
  }, []);

  return (
    <MapContext.Provider
      value={{
        desktopMap,
        mobileMap,
        center,
        zoom,
        isLoading,
        selectedLocation,
        setSelectedLocation,
        flyToLocation,
        fitBounds,
        setCenter,
        setZoom,
        setIsLoading,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

/**
 * Hook to access map context
 * @throws Error if used outside MapProvider
 */
export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within MapProvider');
  }
  return context;
};
