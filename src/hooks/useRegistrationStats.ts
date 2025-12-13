import { useState, useEffect } from 'react';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';

interface RegistrationStats {
  pending: number;
  approved: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export const useRegistrationStats = (): RegistrationStats => {
  const { isInitialized, isLoading: authLoading } = useOrganizationAuth();
  const [stats, setStats] = useState<RegistrationStats>({
    pending: 0,
    approved: 0,
    total: 0,
    loading: true,
    error: null,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const fetchRegistrationCount = async (status: 'pending' | 'approved'): Promise<number> => {
    try {
      const apiUrl = `${API_BASE_URL}/api/hospitals/registrations/?status=${status}`;
      console.log('🌐 Registration Stats API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      console.log(`📡 Registration Stats Response (${status}):`, response.status, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Registration Stats Error (${status}):`, errorText);
        throw new Error(`Failed to fetch ${status} registrations`);
      }

      const data = await response.json();
      console.log(`✅ Registration Stats Data (${status}):`, data);
      
      const count = Array.isArray(data) ? data.length : 0;
      console.log(`📊 Registration Stats Count (${status}):`, count);
      
      return count;
    } catch (err) {
      console.error(`Error fetching ${status} registrations:`, err);
      return 0;
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      setStats(prev => ({ ...prev, loading: true, error: null }));

      try {
        const [pendingCount, approvedCount] = await Promise.all([
          fetchRegistrationCount('pending'),
          fetchRegistrationCount('approved')
        ]);

        setStats({
          pending: pendingCount,
          approved: approvedCount,
          total: pendingCount + approvedCount,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load registration stats',
        }));
      }
    };

    // Only fetch stats when auth is fully initialized
    // This prevents race condition on page refresh
    if (isInitialized && !authLoading) {
      loadStats();
    }
  }, [isInitialized, authLoading]);

  return stats;
};
