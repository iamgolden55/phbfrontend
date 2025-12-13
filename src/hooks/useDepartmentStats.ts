import { useState, useEffect } from 'react';
import { API_BASE_URL, createApiUrl } from '../utils/config';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';

// 🛏️ BED MAGIC HOOK! ✨
// This hook fetches real department data from the enhanced API endpoint

export interface DepartmentData {
  id: number;
  name: string;
  code: string;
  department_type: string;
  is_active: boolean;
  description: string;
  
  // Location & Contact
  floor_number: string;
  wing: string;
  extension_number: string;
  emergency_contact: string;
  email: string;
  
  // 🛏️ BED TRACKING MAGIC:
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  icu_beds: number;
  occupied_icu_beds: number;
  available_icu_beds: number;
  bed_capacity: number;
  total_available_beds: number;
  bed_utilization_rate: number;
  
  // 👥 STAFF MANAGEMENT MAGIC:
  current_staff_count: number;
  minimum_staff_required: number;
  is_understaffed: boolean;
  recommended_staff_ratio: number;
  staff_utilization_rate: number;
  
  // 🏥 PATIENT STATISTICS MAGIC:
  current_patient_count: number;
  utilization_rate: number;
  
  // ⏰ OPERATIONAL INFO:
  is_24_hours: boolean;
  operating_hours: Record<string, any>;
  appointment_duration: number;
  max_daily_appointments: number;
  requires_referral: boolean;
  
  // 💰 BUDGET TRACKING:
  annual_budget: number | null;
  budget_year: number | null;
  budget_utilized: number;
  budget_utilization_rate: number;
  remaining_budget: number | null;
  
  // 🏥 DEPARTMENT CLASSIFICATION:
  is_clinical: boolean;
  is_support: boolean;
  is_administrative: boolean;
  is_available_for_appointments: boolean;
}

export interface DepartmentStats {
  // 🛏️ Aggregated bed statistics
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  totalICUBeds: number;
  occupiedICUBeds: number;
  availableICUBeds: number;
  overallBedUtilization: number;
  
  // 👥 Aggregated staff statistics
  totalStaff: number;
  totalMinimumStaff: number;
  understaffedDepartments: number;
  overallStaffUtilization: number;
  
  // 🏥 Aggregated patient statistics
  totalPatients: number;
  overallUtilization: number;
  
  // 📊 Department counts
  totalDepartments: number;
  activeDepartments: number;
  clinicalDepartments: number;
  supportDepartments: number;
  administrativeDepartments: number;
  
  // 🔥 Critical alerts
  criticalAlerts: {
    lowBedAvailability: boolean;
    understaffedDepartments: DepartmentData[];
    highUtilization: DepartmentData[];
    emergencyDepartmentStatus: DepartmentData | null;
  };
}

export interface UseDepartmentStatsReturn {
  departments: DepartmentData[];
  stats: DepartmentStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDepartmentStats = (): UseDepartmentStatsReturn => {
  const { userData, isLoading: authLoading, isInitialized } = useOrganizationAuth();
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [stats, setStats] = useState<DepartmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartmentStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get hospital ID from organizationAuthContext
      const hospitalId = userData?.hospital?.id;

      console.log('🛏️ === BED STATS DEBUG ===');
      console.log('🛏️ Auth loading:', authLoading);
      console.log('🛏️ UserData:', userData);
      console.log('🛏️ Hospital data:', userData?.hospital);
      console.log('🛏️ Hospital ID from context:', hospitalId);

      if (!hospitalId) {
        console.error('🛏️ ❌ No hospital ID found in context');
        console.error('🛏️ UserData structure:', JSON.stringify(userData, null, 2));
        throw new Error('No hospital ID found');
      }
      
      // Use the createApiUrl utility to ensure proper URL construction
      const apiUrl = `${API_BASE_URL}/api/hospitals/departments/?hospital=${hospitalId}`;
      
      console.log('🛏️ Fetching department stats for hospital:', hospitalId);
      console.log('🛏️ Full API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      console.log('🛏️ Response Status:', response.status);
      console.log('🛏️ Response Headers:', Object.fromEntries(response.headers.entries()));

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('🛏️ Non-JSON response:', text);
        throw new Error(`Expected JSON response, got ${contentType}`);
      }

      const data = await response.json().catch(async (parseError) => {
        const text = await response.text();
        console.error('🛏️ Failed to parse JSON:', text);
        throw new Error(`Failed to parse response: ${parseError.message}`);
      });
      
      console.log('🛏️ Department API Response:', data);

      // Handle different response formats
      if (!response.ok) {
        console.error('🛏️ API Error Response:', data);
        throw new Error(data.detail || data.message || `HTTP error! status: ${response.status}`);
      }

      // Handle both array and object responses
      let departments = Array.isArray(data) ? data : data.departments || [];
      
      if (!departments || !Array.isArray(departments)) {
        console.error('🛏️ Invalid departments data:', departments);
        throw new Error('Invalid departments data received from server');
      }

      console.log(`🛏️ Found ${departments.length} departments`);
      setDepartments(departments);
      
      // 🧮 Calculate aggregated statistics
      const aggregatedStats = calculateAggregatedStats(departments);
      setStats(aggregatedStats);
      
      console.log('🛏️ Calculated Stats:', aggregatedStats);
    } catch (err) {
      console.error('🛏️ Error fetching department stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch department stats');
    } finally {
      setLoading(false);
    }
  };

  // 🧮 Calculate aggregated statistics from department data
  const calculateAggregatedStats = (departmentData: DepartmentData[]): DepartmentStats => {
    console.log('🛏️ Calculating stats for departments:', departmentData);
    
    // Safely filter and process departments
    const activeDepts = departmentData.filter(dept => dept?.is_active);
    console.log(`🛏️ Found ${activeDepts.length} active departments`);
    
    // Safely calculate bed statistics with fallback to 0 for undefined/null values
    const safeNumber = (value: any): number => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };
    
    // Log a sample department to see its structure
    if (activeDepts.length > 0) {
      console.log('🛏️ Sample department data:', activeDepts[0]);
    }
    
    // 🛏️ Bed statistics with safe number conversion
    const totalBeds = activeDepts.reduce((sum, dept) => {
      const beds = safeNumber(dept.total_beds || dept.bed_capacity);
      return sum + beds;
    }, 0);
    
    const occupiedBeds = activeDepts.reduce((sum, dept) => {
      return sum + safeNumber(dept.occupied_beds);
    }, 0);
    
    const availableBeds = activeDepts.reduce((sum, dept) => {
      return sum + safeNumber(dept.available_beds || (dept.total_beds - dept.occupied_beds));
    }, 0);
    
    const totalICUBeds = activeDepts.reduce((sum, dept) => {
      return sum + safeNumber(dept.icu_beds);
    }, 0);
    
    const occupiedICUBeds = activeDepts.reduce((sum, dept) => {
      return sum + safeNumber(dept.occupied_icu_beds);
    }, 0);
    
    const availableICUBeds = activeDepts.reduce((sum, dept) => {
      return sum + safeNumber(dept.available_icu_beds || (dept.icu_beds - dept.occupied_icu_beds));
    }, 0);
    
    console.log('🛏️ Bed Statistics:', { totalBeds, occupiedBeds, availableBeds, totalICUBeds, occupiedICUBeds, availableICUBeds });
    
    // 👥 Staff statistics
    const totalStaff = activeDepts.reduce((sum, dept) => sum + dept.current_staff_count, 0);
    const totalMinimumStaff = activeDepts.reduce((sum, dept) => sum + dept.minimum_staff_required, 0);
    const understaffedDepartments = activeDepts.filter(dept => dept.is_understaffed);
    
    // 🏥 Patient statistics - Use occupied_beds instead of current_patient_count to avoid double-counting
    // Note: current_patient_count might include outpatients or other non-bed patients
    const totalPatients = occupiedBeds; // Use occupiedBeds instead of summing current_patient_count
    
    console.log('🛏️ Total patients (using occupied beds):', totalPatients, 'Occupied beds:', occupiedBeds);
    
    // 📊 Department counts
    const clinicalDepartments = activeDepts.filter(dept => dept.is_clinical);
    const supportDepartments = activeDepts.filter(dept => dept.is_support);
    const administrativeDepartments = activeDepts.filter(dept => dept.is_administrative);
    
    // 🔥 Critical alerts
    const lowBedAvailability = availableBeds < 10; // Less than 10 beds available
    const highUtilization = activeDepts.filter(dept => dept.utilization_rate > 90);
    const emergencyDepartment = activeDepts.find(dept => dept.department_type === 'emergency') || null;
    
    // Calculate overall utilization rates
    const overallBedUtilization = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;
    const overallStaffUtilization = totalMinimumStaff > 0 ? (totalStaff / totalMinimumStaff) * 100 : 0;
    const overallUtilization = overallBedUtilization; // Use bed utilization for overall utilization

    return {
      // 🛏️ Bed statistics
      totalBeds,
      occupiedBeds,
      availableBeds,
      totalICUBeds,
      occupiedICUBeds,
      availableICUBeds,
      overallBedUtilization: Math.round(overallBedUtilization * 10) / 10,
      
      // 👥 Staff statistics
      totalStaff,
      totalMinimumStaff,
      understaffedDepartments: understaffedDepartments.length,
      overallStaffUtilization: Math.round(overallStaffUtilization * 10) / 10,
      
      // 🏥 Patient statistics
      totalPatients,
      overallUtilization: Math.round(overallUtilization * 10) / 10,
      
      // 📊 Department counts
      totalDepartments: departmentData.length,
      activeDepartments: activeDepts.length,
      clinicalDepartments: clinicalDepartments.length,
      supportDepartments: supportDepartments.length,
      administrativeDepartments: administrativeDepartments.length,
      
      // 🔥 Critical alerts
      criticalAlerts: {
        lowBedAvailability,
        understaffedDepartments,
        highUtilization,
        emergencyDepartmentStatus: emergencyDepartment,
      },
    };
  };

  useEffect(() => {
    // Fetch department stats when auth is fully initialized and userData with hospital ID is available
    // CRITICAL: Must wait for isInitialized to ensure session restoration is complete
    if (isInitialized && !authLoading && userData?.hospital?.id) {
      console.log('🛏️ ✅ Auth initialized, fetching department stats...');
      fetchDepartmentStats();
    } else {
      console.log('🛏️ ⏳ Waiting for auth...', {
        isInitialized,
        authLoading,
        hospitalId: userData?.hospital?.id
      });
    }
  }, [isInitialized, authLoading, userData?.hospital?.id]);

  const refetch = () => {
    fetchDepartmentStats();
  };

  return {
    departments,
    stats,
    loading,
    error,
    refetch,
  };
};

export default useDepartmentStats;
