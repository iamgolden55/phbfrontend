import { useState, useEffect } from 'react';

interface AdmissionData {
  id: number;
  admission_id: string;
  patient_name: string; // This comes from backend serializer ✅
  patient_age: number | null; // NEW: Age from backend serializer ✅
  department_name: string; // This comes from backend serializer ✅
  attending_doctor_name: string; // This comes from backend serializer ✅
  status: 'pending' | 'admitted' | 'discharged' | 'transferred' | 'deceased' | 'left_ama';
  admission_type: string;
  priority: string;
  reason_for_admission: string;
  admission_date: string;
  is_icu_bed: boolean;
  is_registered_patient: boolean;
  temp_patient_details?: {
    first_name: string;
    last_name: string;
    age?: number;
    date_of_birth?: string;
    gender: string;
    phone_number: string;
    city: string;
    chief_complaint: string;
    emergency_contact: string;
    emergency_contact_name: string;
  }; // For emergency patients
  bed_identifier?: string;
  registration_status?: 'complete' | 'partial' | 'pending';
  created_at: string;
  updated_at: string;
}

interface AdmissionStats {
  admissions: AdmissionData[];
  totalCount: number;
  statusCounts: {
    pending: number;
    admitted: number;
    discharged: number;
    transferred: number;
  };
  emergencyCount: number;
  loading: boolean;
  error: string | null;
}

export const useAdmissionData = (): AdmissionStats => {
  const [stats, setStats] = useState<AdmissionStats>({
    admissions: [],
    totalCount: 0,
    statusCounts: {
      pending: 0,
      admitted: 0,
      discharged: 0,
      transferred: 0,
    },
    emergencyCount: 0,
    loading: true,
    error: null,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const fetchAdmissions = async (): Promise<AdmissionData[]> => {
    try {
      const apiUrl = `${API_BASE_URL}/api/admissions/`;
      console.log('🌐 Admission Data API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      console.log('📡 Admission Data Response:', response.status, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Admission Data Error:', errorText);
        throw new Error('Failed to fetch admissions');
      }

      const data = await response.json();
      console.log('✅ Admission Data:', data);
      
      // Handle both paginated and direct array responses
      const admissions = Array.isArray(data) ? data : (data.results || []);
      console.log('📊 Parsed Admissions Count:', admissions.length);
      
      return admissions;
    } catch (err) {
      console.error('Error fetching admissions:', err);
      return [];
    }
  };

  useEffect(() => {
    const loadAdmissions = async () => {
      setStats(prev => ({ ...prev, loading: true, error: null }));

      try {
        const admissions = await fetchAdmissions();

        // Calculate statistics
        const statusCounts = {
          pending: admissions.filter(a => a.status === 'pending').length,
          admitted: admissions.filter(a => a.status === 'admitted').length,
          discharged: admissions.filter(a => a.status === 'discharged').length,
          transferred: admissions.filter(a => a.status === 'transferred').length,
        };

        // Fix: Count emergency cases by priority OR admission_type, not registration status
        const emergencyCount = admissions.filter(a => 
          a.priority === 'emergency' || 
          a.admission_type === 'emergency' ||
          a.priority === 'urgent' // Include urgent cases as emergency-level
        ).length;

        setStats({
          admissions,
          totalCount: admissions.length,
          statusCounts,
          emergencyCount,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load admission data',
        }));
      }
    };

    loadAdmissions();
  }, []);

  return stats;
};
