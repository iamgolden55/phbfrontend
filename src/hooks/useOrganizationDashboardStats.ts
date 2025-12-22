import { useMemo } from 'react';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';
import { useRegistrationStats } from './useRegistrationStats';
import { useDepartmentStats } from './useDepartmentStats';
import { useAdmissionData, AdmissionData } from './useAdmissionData';


export interface DashboardStats {
  // Organization info
  organizationName: string;
  organizationType: 'hospital' | 'ngo' | 'pharmacy' | 'unknown';
  userFullName: string;
  userRole: string;

  // Common stats
  loading: boolean;
  error: string | null;

  // Hospital-specific stats
  hospital?: {
    // Overview stats
    attendanceOverview: {
      current: number;
      total: number;
      percentage: number;
      trend: string;
    };

    // Patient stats
    totalPatients: number;
    activePatients: number;

    // Bed stats
    totalBeds: number;
    availableBeds: number;
    occupiedBeds: number;
    bedUtilization: number;

    // ICU stats
    totalICUBeds: number;
    availableICUBeds: number;
    occupiedICUBeds: number;

    // Staff stats
    totalStaff: number;
    staffOnDuty: number;
    minimumStaffRequired: number;
    staffUtilization: number;

    // Department stats
    totalDepartments: number;
    activeDepartments: number;
    understaffedDepartments: number;

    // Registration stats
    pendingRegistrations: number;
    approvedRegistrations: number;
    totalRegistrations: number;

    // Admission stats
    recentAdmissions: number;
    emergencyAdmissions: number;

    // Critical alerts
    hasLowBedAvailability: boolean;
    hasUnderstaffedDepartments: boolean;
    criticalAlertCount: number;
    recentAdmissionList: AdmissionData[];
    departmentChartData: { name: string; value: number }[];
    staffDistribution: { name: string; value: number; color: string }[];
    bedOccupancy: { name: string; value: number; color: string }[];
  };

  // NGO-specific stats (placeholder for future implementation)
  ngo?: {
    activePrograms: number;
    beneficiariesReached: number;
    activeVolunteers: number;
    fundsRaised: number;
  };

  // Pharmacy-specific stats (placeholder for future implementation)
  pharmacy?: {
    activeClinicalTrials: number;
    productsInPipeline: number;
    pendingSubmissions: number;
    researchPublications: number;
  };
}

export const useOrganizationDashboardStats = (): DashboardStats => {
  const { userData } = useOrganizationAuth();

  // Fetch data from all hooks
  const registrationStats = useRegistrationStats();
  const departmentStats = useDepartmentStats();
  const admissionStats = useAdmissionData();

  // Determine organization type
  const organizationType = useMemo(() => {
    if (!userData) return 'unknown' as const;
    if (userData.role === 'hospital_admin') return 'hospital' as const;
    if (userData.role === 'ngo_admin') return 'ngo' as const;
    if (userData.role === 'pharmacy_admin') return 'pharmacy' as const;
    return 'unknown' as const;
  }, [userData]);

  // Get organization name
  const organizationName = useMemo(() => {
    if (!userData) return 'Organization';
    return userData.hospital?.name || userData.ngo?.name || userData.pharmacy?.name || 'Organization';
  }, [userData]);

  // Calculate loading state (wait for critical data)
  const loading = useMemo(() => {
    if (organizationType === 'hospital') {
      return registrationStats.loading || departmentStats.loading || admissionStats.loading;
    }
    return false;
  }, [organizationType, registrationStats.loading, departmentStats.loading, admissionStats.loading]);

  // Aggregate errors
  const error = useMemo(() => {
    if (registrationStats.error) return registrationStats.error;
    if (departmentStats.error) return departmentStats.error;
    if (admissionStats.error) return admissionStats.error;
    return null;
  }, [registrationStats.error, departmentStats.error, admissionStats.error]);

  // Hospital-specific calculations
  const hospitalStats = useMemo(() => {
    if (organizationType !== 'hospital' || !departmentStats.stats) return undefined;

    const stats = departmentStats.stats;
    const activePatients = admissionStats.admissions.filter(
      adm => adm.status.toLowerCase() === 'admitted'
    ).length;

    // Calculate attendance overview (patients vs bed capacity)
    const attendancePercentage = stats.totalBeds > 0
      ? Math.round((activePatients / stats.totalBeds) * 100)
      : 0;

    const attendanceTrend = attendancePercentage > 70 ? '+2.1%' : '-2.1%';

    // Critical alerts
    const hasLowBedAvailability = stats.criticalAlerts?.lowBedAvailability || false;
    const hasUnderstaffedDepartments = (stats.criticalAlerts?.understaffedDepartments?.length || 0) > 0;
    const criticalAlertCount =
      (hasLowBedAvailability ? 1 : 0) +
      (hasUnderstaffedDepartments ? 1 : 0) +
      (stats.criticalAlerts?.highUtilization?.length || 0);

    const recentAdmissionList = [...admissionStats.admissions]
      .sort((a, b) => new Date(b.admission_date).getTime() - new Date(a.admission_date).getTime())
      .slice(0, 5);

    // Compute department chart data (Employees by Department)
    const departmentChartData = departmentStats.departments
      .filter(d => d.is_active && d.current_staff_count > 0)
      .map(d => ({ name: d.name.substring(0, 10), value: d.current_staff_count })) // Truncate name for chart
      .sort((a, b) => b.value - a.value)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    // Compute Staff Distribution
    const clinicalStaff = departmentStats.departments.filter(d => d.is_clinical).reduce((sum, d) => sum + d.current_staff_count, 0);
    const adminStaff = departmentStats.departments.filter(d => d.is_administrative).reduce((sum, d) => sum + d.current_staff_count, 0);
    const supportStaff = departmentStats.departments.filter(d => d.is_support).reduce((sum, d) => sum + d.current_staff_count, 0);
    // Fallback for undefined types
    const otherStaff = Math.max(0, stats.totalStaff - (clinicalStaff + adminStaff + supportStaff));

    const staffDistribution = [
      { name: 'Clinical', value: clinicalStaff, color: '#10B981' }, // Green
      { name: 'Admin', value: adminStaff, color: '#3B82F6' }, // Blue
      { name: 'Support', value: supportStaff, color: '#F59E0B' }, // Orange
      { name: 'Other', value: otherStaff, color: '#6B7280' }, // Gray
    ].filter(i => i.value > 0);

    // Compute Bed Occupancy
    const bedOccupancy = [
      { name: 'Occupied', value: stats.occupiedBeds, color: '#EF4444' }, // Red
      { name: 'Available', value: stats.availableBeds, color: '#10B981' }, // Green
    ];

    return {
      // Overview
      attendanceOverview: {
        current: activePatients,
        total: stats.totalBeds,
        percentage: attendancePercentage,
        trend: attendanceTrend,
      },

      // Patients
      totalPatients: stats.totalPatients,
      activePatients,

      // Beds
      totalBeds: stats.totalBeds,
      availableBeds: stats.availableBeds,
      occupiedBeds: stats.occupiedBeds,
      bedUtilization: stats.overallBedUtilization,

      // ICU
      totalICUBeds: stats.totalICUBeds,
      availableICUBeds: stats.availableICUBeds,
      occupiedICUBeds: stats.occupiedICUBeds,

      // Staff
      totalStaff: stats.totalStaff,
      staffOnDuty: stats.totalStaff, // All staff counted as on duty for now
      minimumStaffRequired: stats.totalMinimumStaff,
      staffUtilization: stats.overallStaffUtilization,

      // Departments
      totalDepartments: stats.totalDepartments,
      activeDepartments: stats.activeDepartments,
      understaffedDepartments: stats.understaffedDepartments,

      // Registrations
      pendingRegistrations: registrationStats.pending,
      approvedRegistrations: registrationStats.approved,
      totalRegistrations: registrationStats.total,

      // Admissions
      recentAdmissions: admissionStats.admissions.length,
      emergencyAdmissions: admissionStats.emergencyCount,

      // Alerts
      hasLowBedAvailability,
      hasUnderstaffedDepartments,
      criticalAlertCount,
      recentAdmissionList,
      departmentChartData,
      staffDistribution,
      bedOccupancy,
    };
  }, [organizationType, departmentStats.stats, admissionStats, registrationStats]);

  // NGO stats (mock for now - will be replaced when backend APIs are available)
  const ngoStats = useMemo(() => {
    if (organizationType !== 'ngo') return undefined;

    return {
      activePrograms: 12,
      beneficiariesReached: 5400,
      activeVolunteers: 75,
      fundsRaised: 28500,
    };
  }, [organizationType]);

  // Pharmacy stats (mock for now - will be replaced when backend APIs are available)
  const pharmacyStats = useMemo(() => {
    if (organizationType !== 'pharmacy') return undefined;

    return {
      activeClinicalTrials: 8,
      productsInPipeline: 25,
      pendingSubmissions: 5,
      researchPublications: 18,
    };
  }, [organizationType]);

  return {
    // Organization info
    organizationName,
    organizationType,
    userFullName: userData?.full_name || 'Admin',
    userRole: userData?.role || '',

    // Status
    loading,
    error,

    // Type-specific stats
    hospital: hospitalStats,
    ngo: ngoStats,
    pharmacy: pharmacyStats,
  };
};
