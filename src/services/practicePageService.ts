import { API_BASE_URL } from '../utils/config';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ServiceType = 'in_store' | 'virtual' | 'both';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface PracticePage {
  id: string;
  practice_name: string;
  slug: string;
  tagline: string;
  service_type: ServiceType;
  city: string;
  state: string;
  is_published: boolean;
  verification_status: VerificationStatus;
  owner_name: string;
  professional_type: string;
  license_number: string;
  is_open_now: boolean;
  view_count: number;
  created_at: string;
}

export interface PracticePageDetail extends PracticePage {
  about: string;
  address_line_1: string;
  address_line_2: string;
  postcode: string;
  country: string;
  latitude: string | null;
  longitude: string | null;
  phone: string;
  email: string;
  website: string;
  whatsapp_number: string;
  opening_hours: Record<string, { open?: string; close?: string; closed?: boolean }>;
  virtual_consultation_hours: Record<string, any>;
  online_booking_url: string;
  video_platform: string;
  services_offered: string[];
  payment_methods: string[];
  additional_certifications: any[];
  languages_spoken: string[];
  professional_credentials: {
    phb_license_number: string;
    professional_type: string;
    specialization: string;
    qualification_year: number;
    primary_qualification: string;
    license_status: string;
    license_expiry_date: string;
  };
  nomination_count: number;
  updated_at: string;
  owner: number;
  linked_registry_entry: string;
  verified_by: number | null;
  verification_notes: string;
  verified_date: string | null;
  meta_keywords: string;
  owner_email: string;
}

export interface CreatePracticePageRequest {
  practice_name: string;
  slug?: string;
  tagline: string;
  about: string;
  service_type: ServiceType;
  // Physical location (required if service_type includes 'in_store')
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  // Contact
  phone?: string;
  email?: string;
  website?: string;
  whatsapp_number?: string;
  // Hours
  opening_hours?: Record<string, { open?: string; close?: string; closed?: boolean }>;
  virtual_consultation_hours?: Record<string, any>;
  online_booking_url?: string;
  video_platform?: string;
  // Services & Pricing
  services_offered?: string[];
  payment_methods?: string[];
  // Additional Info
  additional_certifications?: any[];
  languages_spoken?: string[];
  // Publication
  is_published?: boolean;
  meta_keywords?: string;
}

export interface EligibilityCheckResponse {
  canCreate: boolean;
  reason?: string;
  applicationStatus?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  professionalType?: string;
  specialization?: string;
}

export interface PageAnalytics {
  view_count: number;
  nomination_count: number;
  is_published: boolean;
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// API HELPER FUNCTIONS
// ============================================================================

const fixApiUrl = (endpoint: string): string => {
  if (API_BASE_URL.endsWith('/') && endpoint.startsWith('/')) {
    return `${API_BASE_URL}${endpoint.substring(1)}`;
  }
  return `${API_BASE_URL}${endpoint}`;
};

const getAuthConfig = () => ({
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// PUBLIC API (No authentication required)
// ============================================================================

export async function fetchPublicPracticePages(filters?: {
  service_type?: ServiceType;
  state?: string;
  city?: string;
  professional_type?: string;
  search?: string;
  page?: number;
}): Promise<{ results: PracticePage[]; count: number; next: string | null; previous: string | null }> {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      if (filters.service_type) queryParams.append('service_type', filters.service_type);
      if (filters.state) queryParams.append('state', filters.state);
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.professional_type) queryParams.append('professional_type', filters.professional_type);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.page) queryParams.append('page', filters.page.toString());
    }

    const url = fixApiUrl(`/api/practice-pages/?${queryParams.toString()}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching public practice pages:', error);
    throw error;
  }
}

export async function fetchPublicPracticePageDetail(slug: string): Promise<PracticePageDetail> {
  try {
    const url = fixApiUrl(`/api/practice-pages/${slug}/`);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Practice page not found');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching practice page detail:', error);
    throw error;
  }
}

// ============================================================================
// PROFESSIONAL API (Requires authentication)
// ============================================================================

export async function checkEligibility(): Promise<EligibilityCheckResponse> {
  try {
    const url = fixApiUrl('/api/practice-pages/check-eligibility/');
    const response = await fetch(url, {
      method: 'GET',
      ...getAuthConfig(),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return {
          canCreate: false,
          reason: 'You must be logged in as a professional to create a practice page.',
        };
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking eligibility:', error);
    throw error;
  }
}

export async function createPracticePage(
  data: CreatePracticePageRequest
): Promise<{ success: boolean; page: PracticePageDetail; message: string }> {
  try {
    const url = fixApiUrl('/api/practice-pages/create/');
    const response = await fetch(url, {
      method: 'POST',
      ...getAuthConfig(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating practice page:', error);
    throw error;
  }
}

export async function getMyPracticePage(): Promise<{
  hasPage: boolean;
  page?: PracticePageDetail;
}> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/');
    const response = await fetch(url, {
      method: 'GET',
      ...getAuthConfig(),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication required');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching my practice page:', error);
    throw error;
  }
}

export async function previewMyPracticePage(): Promise<PracticePageDetail> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/preview/');
    const response = await fetch(url, {
      method: 'GET',
      ...getAuthConfig(),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication required');
      }
      if (response.status === 404) {
        throw new Error('No practice page found');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error previewing practice page:', error);
    throw error;
  }
}

export async function updatePracticePage(
  data: Partial<CreatePracticePageRequest>
): Promise<{ success: boolean; page: PracticePageDetail; message: string }> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/update/');
    const response = await fetch(url, {
      method: 'PATCH',
      ...getAuthConfig(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating practice page:', error);
    throw error;
  }
}

export async function togglePublished(
  is_published: boolean
): Promise<{ success: boolean; is_published: boolean; message: string }> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/publish/');
    const response = await fetch(url, {
      method: 'POST',
      ...getAuthConfig(),
      body: JSON.stringify({ is_published }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling published status:', error);
    throw error;
  }
}

export async function getPageAnalytics(): Promise<PageAnalytics> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/analytics/');
    const response = await fetch(url, {
      method: 'GET',
      ...getAuthConfig(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching page analytics:', error);
    throw error;
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function generateSlugFromName(practiceName: string): string {
  return practiceName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

export function formatAddress(page: PracticePageDetail): string {
  const parts = [
    page.address_line_1,
    page.address_line_2,
    page.city,
    page.state,
    page.postcode,
    page.country,
  ].filter(Boolean);

  return parts.join(', ');
}

export function isPageOpenNow(opening_hours: Record<string, any>): boolean {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  const dayHours = opening_hours[dayName];
  if (!dayHours || dayHours.closed) {
    return false;
  }

  return currentTime >= dayHours.open && currentTime <= dayHours.close;
}
