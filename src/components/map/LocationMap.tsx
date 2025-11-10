/**
 * LocationMap - Reusable Mapbox GL map component
 *
 * Displays any location-based entities on a map with custom markers.
 * Handles map initialization, marker creation, and user interactions.
 */

import React, { useEffect, useRef } from 'react';
import { BaseLocation, LocationCategory, MapConfig } from '../../types/location';
import { useMap } from '../../contexts/MapContext';

interface LocationMapProps<T extends BaseLocation> {
  // Data
  locations: T[];
  categories: LocationCategory[];

  // Config
  config?: Partial<MapConfig>;

  // Callbacks
  onLocationSelect?: (location: T) => void;
  onMarkerCreate?: (location: T, element: HTMLDivElement) => HTMLDivElement;

  // Styling
  containerClassName?: string;

  // Device type
  deviceType: 'desktop' | 'mobile';
}

/**
 * Generic map component that displays location markers
 * @template T Type of location object
 */
export function LocationMap<T extends BaseLocation>({
  locations,
  categories,
  config,
  onLocationSelect,
  onMarkerCreate,
  containerClassName = '',
  deviceType,
}: LocationMapProps<T>) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const { setIsLoading, flyToLocation } = useMap();

  const defaultConfig: MapConfig = {
    accessToken: 'pk.eyJ1IjoiaWFtZ29sZGVuNTU1IiwiYSI6ImNtNWVqejJxdzE1anQybXFvM3E4djNyOGIifQ.LltJt0HC549Bc8n8eOmg6g',
    style: deviceType === 'desktop' ? 'outdoors' : 'streets',
    initialCenter: [-0.1278, 51.5074],
    initialZoom: 12,
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const mapboxgl = window.mapboxgl;
    if (!mapboxgl) {
      loadMapboxScript().then(() => initializeMap());
    } else {
      initializeMap();
    }
  }, []);

  const loadMapboxScript = () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = () => {
        const link = document.createElement('link');
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        setTimeout(() => resolve(), 500);
      };
      document.head.appendChild(script);
    });
  };

  const initializeMap = () => {
    if (!mapContainer.current) return;

    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken = finalConfig.accessToken;

    try {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${finalConfig.style}-v11`,
        center: finalConfig.initialCenter,
        zoom: finalConfig.initialZoom,
      });

      mapInstance.current.on('load', () => {
        setIsLoading(false);
        addMarkers();

        // Resize for mobile
        if (deviceType === 'mobile') {
          setTimeout(() => {
            mapInstance.current?.resize();
          }, 100);
        }
      });
    } catch (error) {
      console.error(`${deviceType} map initialization failed:`, error);
      setIsLoading(false);
    }
  };

  const addMarkers = () => {
    if (!mapInstance.current) return;

    locations.forEach((location) => {
      const category = categories.find((cat) => cat.id === location.category);

      // Create marker element
      const el = createMarkerElement(location, category);

      // Allow custom marker creation
      const finalEl = onMarkerCreate ? onMarkerCreate(location, el) : el;

      // Add marker to map
      new window.mapboxgl.Marker(finalEl)
        .setLngLat([location.longitude, location.latitude])
        .addTo(mapInstance.current);
    });
  };

  const createMarkerElement = (location: T, category?: LocationCategory) => {
    const el = document.createElement('div');
    el.className = 'location-marker';
    el.innerHTML = `
      <div style="
        background: white;
        border: 3px solid ${category?.color || '#003f7e'};
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        ${category?.icon || '📍'}
      </div>
    `;

    // Hover effects
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.1)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
    });

    // Click handler
    el.addEventListener('click', () => {
      if (onLocationSelect) {
        onLocationSelect(location);
      }
      flyToLocation(location.longitude, location.latitude, 15);
    });

    return el;
  };

  // Re-add markers when locations change
  useEffect(() => {
    if (mapInstance.current && mapInstance.current.loaded()) {
      // Clear existing markers
      const markers = document.querySelectorAll('.location-marker');
      markers.forEach((marker) => marker.remove());

      // Add new markers
      addMarkers();
    }
  }, [locations]);

  return (
    <div
      ref={mapContainer}
      className={containerClassName}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
