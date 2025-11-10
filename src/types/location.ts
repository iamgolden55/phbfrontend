/**
 * Generic location types for reusable map system
 *
 * This module provides type-safe interfaces for any location-based entity
 * displayed on maps throughout the PHB application (pharmacies, practice pages,
 * hospitals, clinics, etc.)
 */

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationCategory {
  id: string;
  name: string;
  icon: string; // Emoji or icon name
  color: string; // Hex color for marker border
  count?: number; // Number of locations in this category
}

export interface BaseLocation extends LocationCoordinates {
  id: string;
  name: string;
  category: string; // Category ID
  address: string;
  city?: string;
  state?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  distance?: string; // e.g., "0.3 miles"
  isOpen?: boolean;
  hours?: string; // e.g., "8:00 AM - 10:00 PM"
}

/**
 * Generic location with type-specific details
 * @template T Type of additional details object
 */
export interface LocationWithDetails<T = any> extends BaseLocation {
  details: T; // Type-specific additional data
}

// Pharmacy-specific details
export interface PharmacyDetails {
  services: string[];
  is24h: boolean;
}

// Practice page-specific details
export interface PracticePageDetails {
  serviceType: 'in_store' | 'virtual' | 'both';
  professionalType: string;
  licenseNumber: string;
  specialization: string;
  servicesOffered: Array<{ service: string; price: number }>;
  languages: string[];
}

// Hospital-specific details
export interface HospitalDetails {
  departments: string[];
  emergencyServices: boolean;
  bedCount: number;
}

// Convenience type aliases
export type Pharmacy = LocationWithDetails<PharmacyDetails>;
export type PracticePage = LocationWithDetails<PracticePageDetails>;
export type Hospital = LocationWithDetails<HospitalDetails>;

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapConfig {
  accessToken: string;
  style: 'streets' | 'outdoors' | 'light' | 'dark' | 'satellite';
  initialCenter: [number, number]; // [lng, lat]
  initialZoom: number;
  minZoom?: number;
  maxZoom?: number;
}
