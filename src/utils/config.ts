/**
 * Application configuration based on environment variables
 */

// API URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5000/auth';
export const HEALTH_API_URL = import.meta.env.VITE_HEALTH_API_URL || 'http://localhost:5000/health';
export const ORGANIZATION_API_URL = import.meta.env.VITE_ORGANIZATION_API_URL || 'http://localhost:5000/organization';

/**
 * Utility function to create a properly formatted API URL
 * Ensures consistent handling of slashes between base URL and endpoint
 */
export const createApiUrl = (endpoint: string): string => {
  // Remove trailing slash from base URL if present
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.replace(/^\//, '');
  
  // Combine with a single slash
  return `${baseUrl}/${cleanEndpoint}`;
};

// Environment
export const IS_DEVELOPMENT = import.meta.env.NODE_ENV === 'development';
export const IS_PRODUCTION = import.meta.env.NODE_ENV === 'production';

/**
 * Get the appropriate API URL based on the endpoint type
 */
export const getApiUrl = (type: 'default' | 'auth' | 'health' | 'organization' = 'default'): string => {
  switch (type) {
    case 'auth':
      return AUTH_API_URL;
    case 'health':
      return HEALTH_API_URL;
    case 'organization':
      return ORGANIZATION_API_URL;
    default:
      return API_URL;
  }
}; 