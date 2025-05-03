/**
 * Application configuration based on environment variables
 */

// API URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5000/auth';
export const HEALTH_API_URL = import.meta.env.VITE_HEALTH_API_URL || 'http://localhost:5000/health';
export const ORGANIZATION_API_URL = import.meta.env.VITE_ORGANIZATION_API_URL || 'http://localhost:5000/organization';

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