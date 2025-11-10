import { API_BASE_URL } from '../utils/config';

// Fix API URL to avoid double slashes
const fixApiUrl = (endpoint: string): string => {
  if (API_BASE_URL.endsWith('/') && endpoint.startsWith('/')) {
    return `${API_BASE_URL}${endpoint.substring(1)}`;
  }
  return `${API_BASE_URL}${endpoint}`;
};

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface Pharmacy {
  id: number | string; // Can be number (admin pharmacy) or string (practice-{id})
  phb_pharmacy_code: string;
  name: string;
  description?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state?: string;
  postcode: string;
  country?: string;
  phone: string;
  email?: string;
  website?: string;
  electronic_prescriptions_enabled: boolean;
  opening_hours: OpeningHours;
  services_offered: string[];
  latitude?: number;
  longitude?: number;
  hospital?: number;
  hospital_name?: string;
  is_active: boolean;
  verified: boolean;
  is_open?: boolean;
  distance?: number;
  full_address?: string;
  created_at?: string;
  updated_at?: string;
  // Fields for distinguishing pharmacy sources
  source?: 'admin_pharmacy' | 'practice_page';
  pharmacy_id?: number; // Original ID for admin pharmacies
  practice_page_id?: string; // UUID for practice pages
}

export interface OpeningHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  closed?: boolean;
}

export interface NominatedPharmacy {
  id: number;
  user: number;
  user_email: string;
  user_hpn: string;
  pharmacy: Pharmacy;
  nomination_type: 'repeat' | 'acute';
  is_current: boolean;
  nominated_at: string;
  ended_at?: string;
  notes?: string;
}

export interface NominatedPharmacyHistory {
  id: number;
  pharmacy_name: string;
  pharmacy_code: string;
  nomination_type: 'repeat' | 'acute';
  is_current: boolean;
  nominated_at: string;
  ended_at?: string;
}

// API Response types
export interface PharmacyListResponse {
  success: boolean;
  count: number;
  pharmacies: Pharmacy[];
}

export interface PharmacyDetailResponse {
  success: boolean;
  pharmacy: Pharmacy;
}

export interface NominationResponse {
  success: boolean;
  has_nomination?: boolean;
  nomination?: NominatedPharmacy;
  message?: string;
}

export interface NominationHistoryResponse {
  success: boolean;
  count: number;
  nominations: NominatedPharmacyHistory[];
}

export interface NearbyPharmaciesResponse {
  success: boolean;
  count: number;
  pharmacies: Pharmacy[];
  radius_km: number;
}

export interface NominatablePharmaciesResponse {
  success: boolean;
  count: number;
  pharmacies: Pharmacy[];
  user_location: {
    city: string | null;
    state: string | null;
  };
}

// Search parameters
export interface PharmacySearchParams {
  search?: string;
  city?: string;
  state?: string;
  electronic_prescriptions?: boolean;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export interface NearbyPharmaciesParams {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}

export interface NominatePharmacyRequest {
  pharmacy_id?: number; // For admin pharmacies
  practice_page_id?: string; // For practice page pharmacies
  nomination_type?: 'repeat' | 'acute';
  notes?: string;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Get list of pharmacies with optional search/filter parameters
 */
export async function getPharmacies(params?: PharmacySearchParams): Promise<PharmacyListResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append('search', params.search);
    if (params?.city) queryParams.append('city', params.city);
    if (params?.electronic_prescriptions !== undefined) {
      queryParams.append('electronic_prescriptions', params.electronic_prescriptions.toString());
    }
    if (params?.latitude) queryParams.append('latitude', params.latitude.toString());
    if (params?.longitude) queryParams.append('longitude', params.longitude.toString());
    if (params?.radius) queryParams.append('radius', params.radius.toString());

    const url = fixApiUrl(`/api/pharmacies/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching pharmacies: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    throw error;
  }
}

/**
 * Get nearby pharmacies based on user location
 */
export async function getNearbyPharmacies(params: NearbyPharmaciesParams): Promise<NearbyPharmaciesResponse> {
  try {
    const queryParams = new URLSearchParams({
      latitude: params.latitude.toString(),
      longitude: params.longitude.toString(),
    });

    if (params.radius) queryParams.append('radius', params.radius.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const url = fixApiUrl(`/api/pharmacies/nearby/?${queryParams.toString()}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching nearby pharmacies: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching nearby pharmacies:', error);
    throw error;
  }
}

/**
 * Get nominatable pharmacies (includes both admin pharmacies and professional practice pages)
 * Filtered by user's location (city/state)
 */
export async function getNominatablePharmacies(params?: PharmacySearchParams): Promise<NominatablePharmaciesResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append('search', params.search);
    if (params?.city) queryParams.append('city', params.city);
    if (params?.state) queryParams.append('state', params.state);

    const url = fixApiUrl(`/api/practice-pages/nominatable-pharmacies/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching nominatable pharmacies: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching nominatable pharmacies:', error);
    throw error;
  }
}

/**
 * Get pharmacy details by ID
 */
export async function getPharmacyById(id: number, userLocation?: { latitude: number; longitude: number }): Promise<PharmacyDetailResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (userLocation) {
      queryParams.append('latitude', userLocation.latitude.toString());
      queryParams.append('longitude', userLocation.longitude.toString());
    }

    const url = fixApiUrl(`/api/pharmacies/${id}/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching pharmacy: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pharmacy details:', error);
    throw error;
  }
}

/**
 * Get current nominated pharmacy
 */
export async function getCurrentNomination(): Promise<NominationResponse> {
  try {
    const url = fixApiUrl('/api/pharmacies/nominated/');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching nomination: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching nominated pharmacy:', error);
    throw error;
  }
}

/**
 * Nominate a pharmacy
 */
export async function nominatePharmacy(request: NominatePharmacyRequest): Promise<NominationResponse> {
  try {
    const url = fixApiUrl('/api/pharmacies/nominated/');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error nominating pharmacy: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error nominating pharmacy:', error);
    throw error;
  }
}

/**
 * Remove current pharmacy nomination
 */
export async function removeNomination(): Promise<NominationResponse> {
  try {
    const url = fixApiUrl('/api/pharmacies/nominated/');

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error removing nomination: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing nomination:', error);
    throw error;
  }
}

/**
 * Get nomination history
 */
export async function getNominationHistory(): Promise<NominationHistoryResponse> {
  try {
    const url = fixApiUrl('/api/pharmacies/nomination-history/');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching nomination history: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching nomination history:', error);
    throw error;
  }
}

/**
 * Helper function to format pharmacy address
 */
export function formatPharmacyAddress(pharmacy: Pharmacy): string {
  const parts = [
    pharmacy.address_line_1,
    pharmacy.address_line_2,
    pharmacy.city,
    pharmacy.state,
    pharmacy.postcode,
    pharmacy.country,
  ].filter(Boolean);

  return parts.join(', ');
}

/**
 * Helper function to check if pharmacy is currently open
 */
export function isPharmacyOpen(opening_hours: OpeningHours): boolean {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof OpeningHours;
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  const dayHours = opening_hours[dayName];

  if (!dayHours || dayHours.closed) {
    return false;
  }

  return currentTime >= dayHours.open && currentTime <= dayHours.close;
}

/**
 * Helper function to get today's hours
 */
export function getTodayHours(opening_hours: OpeningHours): string {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof OpeningHours;
  const dayHours = opening_hours[dayName];

  if (!dayHours || dayHours.closed) {
    return 'Closed';
  }

  return `${dayHours.open} - ${dayHours.close}`;
}
