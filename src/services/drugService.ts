import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

export interface DrugSearchResult {
  id: string;
  name: string;
  description: string;
  brand_names: string;
  category: string;
  is_controlled: boolean;
  requires_physician: boolean;
  nafdac_schedule: string;
}

export interface DrugDetail {
  id: string;
  generic_name: string;
  brand_names: string[];
  therapeutic_class: string;
  pharmacological_class: string;
  mechanism_of_action: string;

  // Regulatory
  nafdac_approved: boolean;
  nafdac_registration_number: string;
  nafdac_schedule: string;
  is_controlled: boolean;

  // Prescribing
  requires_physician_only: boolean;
  pharmacist_can_prescribe: boolean;
  requires_special_prescription: boolean;
  maximum_days_supply: number | null;

  // Risk
  is_high_risk: boolean;
  requires_monitoring: boolean;
  monitoring_type: string;
  addiction_risk: boolean;
  abuse_potential: string;

  // Contraindications
  major_contraindications: string[];
  black_box_warning: boolean;
  black_box_warning_text: string;

  // Interactions
  major_drug_interactions: string[];
  food_interactions: string[];

  // Age & Pregnancy
  minimum_age: number | null;
  pregnancy_category: string;
  breastfeeding_safe: boolean;

  // Alternatives
  safer_alternatives: string[];
  cheaper_alternatives: string[];
}

export interface DrugStatistics {
  total_drugs: number;
  controlled_substances: number;
  high_risk_medications: number;
  nafdac_compliant: number;
  by_schedule: Array<{ nafdac_schedule: string; count: number }>;
  top_therapeutic_classes: Array<{ therapeutic_class: string; count: number }>;
}

/**
 * Search for drugs in the database
 */
export const searchDrugs = async (query: string, limit: number = 10): Promise<{ count: number; results: DrugSearchResult[]; query: string }> => {
  try {
    // Remove trailing slash from base URL to avoid double slashes
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}/api/drugs/search/`;

    console.log('[DrugService] Searching drugs:', { url, query, limit });
    console.log('[DrugService] Cookies:', document.cookie);

    const response = await axios.get(url, {
      params: { q: query, limit },
      withCredentials: true, // Use cookies instead of Authorization header
    });

    console.log('[DrugService] Search successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[DrugService] Error searching drugs:', error);
    console.error('[DrugService] Error response:', error.response);
    console.error('[DrugService] Error details:', error.response?.data);
    console.error('[DrugService] Request URL:', error.config?.url);

    if (error.response?.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }

    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error(error.response?.data?.error || 'Failed to search drugs. Please check your connection.');
  }
};

/**
 * Get detailed information about a specific drug
 */
export const getDrugDetail = async (drugId: string): Promise<DrugDetail> => {
  try {
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}/api/drugs/${drugId}/`;

    console.log('[DrugService] Fetching drug detail:', { url, drugId });

    const response = await axios.get(url, {
      withCredentials: true, // Use cookies instead of Authorization header
    });

    console.log('[DrugService] Drug detail fetched successfully');
    return response.data;
  } catch (error: any) {
    console.error('[DrugService] Error fetching drug detail:', error);
    console.error('[DrugService] Request URL:', error.config?.url);

    if (error.response?.status === 404) {
      throw new Error('Drug not found');
    }

    if (error.response?.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }

    throw new Error('Failed to fetch drug details');
  }
};

/**
 * Get drug database statistics
 */
export const getDrugStatistics = async (): Promise<DrugStatistics> => {
  try {
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}/api/drugs/statistics/`;

    console.log('[DrugService] Fetching drug statistics:', { url });
    console.log('[DrugService] API_BASE_URL:', API_BASE_URL);

    const response = await axios.get(url, {
      withCredentials: true, // Use cookies instead of Authorization header
    });

    console.log('[DrugService] Statistics fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[DrugService] Error fetching drug statistics:', error);
    console.error('[DrugService] Request URL:', error.config?.url);
    console.error('[DrugService] Error status:', error.response?.status);

    if (error.response?.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }

    throw new Error('Failed to fetch drug statistics');
  }
};
