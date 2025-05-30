import { useState, useEffect } from 'react';

interface RegistrationStats {
  pending: number;
  approved: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export const useRegistrationStats = (): RegistrationStats => {
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
      // Get token from organization auth context
      let token = null;
      const organizationAuth = localStorage.getItem('organizationAuth');
      if (organizationAuth) {
        try {
          const authData = JSON.parse(organizationAuth);
          token = authData.tokens?.access;
          console.log('🔑 Registration Stats - Token found:', token ? 'Yes' : 'No');
        } catch (e) {
          console.error('Failed to parse organization auth data:', e);
        }
      }

      const apiUrl = `${API_BASE_URL}/api/hospitals/registrations/?status=${status}`;
      console.log('🌐 Registration Stats API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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

    loadStats();
  }, []);

  return stats;
};
