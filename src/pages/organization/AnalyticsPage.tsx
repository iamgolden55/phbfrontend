import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  FaBed,
  FaUserMd,
  FaProcedures,
  FaChartLine,
  FaPrint,
  FaFileExport,
  FaCalendarAlt,
  FaFilter,
  FaHospitalUser,
  FaUserInjured,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import { format, subDays, parseISO, eachDayOfInterval, isWithinInterval } from 'date-fns';

// Hooks and Services
import { useAdmissionData } from '../../hooks/useAdmissionData';
import { useDepartmentStats } from '../../hooks/useDepartmentStats';
import { useOrganizationTour } from '../../features/organization/context/OrganizationTourContext';
import { StaffService } from '../../services/staffService';
import { AppointmentService } from '../../services/appointmentService';

// Define StaffMember type if not available from types
interface StaffMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on_leave';
}

// Define the complete department data structure from the API
type DepartmentData = {
  id: number;
  name: string;
  code: string;
  department_type: string;
  is_active: boolean;
  description: string;
  floor_number: string;
  wing: string;
  extension_number: string;
  emergency_contact: string;
  email: string;
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  icu_beds: number;
  occupied_icu_beds: number;
  available_icu_beds: number;
  bed_capacity: number;
  total_available_beds: number;
  bed_utilization_rate: number;
  current_staff_count: number;
  minimum_staff_required: number;
  is_understaffed: boolean;
  recommended_staff_ratio: number;
  staff_utilization_rate: number;
  current_patient_count: number;
  utilization_rate: number;
  is_24_hours: boolean;
  operating_hours: Record<string, { start: string; end: string }>;
  appointment_duration: number;
  max_daily_appointments: number;
  requires_referral: boolean;
  annual_budget: number;
  budget_year: number | null;
  budget_utilized: number;
  budget_utilization_rate: number;
  remaining_budget: number;
  is_clinical: boolean;
  is_support: boolean;
  is_administrative: boolean;
  is_available_for_appointments: boolean;
  [key: string]: any; // Allow additional properties
};

// Define DepartmentStats interface for aggregated stats
interface DepartmentStats {
  totalBeds: number;
  availableBeds: number;
  occupiedBeds: number; // Added from hook
  totalPatients: number;
  bed_utilization_rate: number;
}

// Extended types to match the actual data structure
interface ExtendedAdmissionStats {
  admissions: AdmissionData[];
  totalAdmissions: number;
  statusCounts: Record<string, number>;
  emergencyCount: number;
  loading: boolean;
  error: string | null;
}

interface ExtendedDepartmentStats {
  departments: DepartmentData[];
  stats: {
    totalBeds: number;
    availableBeds: number;
    occupiedBeds: number;
    totalPatients: number;
    bed_utilization_rate: number;
  };
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Types for admission data
interface AdmissionData {
  id: string;
  admission_date: string;
  actual_discharge_date?: string; // Changed from discharge_date to match backend
  expected_discharge_date?: string; // Added expected discharge date
  updated_at?: string; // Added for fallback logic
  patient_name: string;
  department_name: string; // FIXED: Changed from 'department' to match API response
  status: string;
  is_emergency: boolean;
}

interface PerformanceMetric {
  metric: string;
  value: string;
  change: number;
  unit: string;
}

interface ChartDataPoint {
  date: string;
  dateFormatted: string;
  admissions: number;
  discharges: number;
  cumulativeAdmissions: number;
  cumulativeDischarges: number;
  netPatients: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsPage: React.FC = () => {
  // State for filters
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  // Fetch data using custom hooks
  const {
    admissions: allAdmissions = [],
    totalAdmissions = allAdmissions.length,
    statusCounts = { admitted: 0, discharged: 0, transferred: 0 },
    emergencyCount = 0,
    loading: admissionsLoading,
    error: admissionsError
  } = useAdmissionData() as unknown as ExtendedAdmissionStats;

  const {
    departments: allDepartmentStats = [],
    stats: allDepartmentAggregates = {
      totalBeds: 0,
      availableBeds: 0,
      occupiedBeds: 0,
      totalPatients: 0,
      bed_utilization_rate: 0
    },
    loading: deptStatsLoading,
    error: deptStatsError,
    refetch: refetchDeptStats
  } = useDepartmentStats() as unknown as ExtendedDepartmentStats;

  // Filter data based on department selection using switch statement
  const { admissions, departmentStats, departmentAggregates } = useMemo(() => {
    switch (departmentFilter) {
      case 'all':
        // Return all data when "All Departments" is selected
        return {
          admissions: allAdmissions,
          departmentStats: allDepartmentStats,
          departmentAggregates: allDepartmentAggregates
        };

      default:
        // Filter by specific department name
        // FIXED: Use department_name field instead of department
        const filteredAdmissions = allAdmissions.filter((adm: AdmissionData) =>
          adm.department_name?.toLowerCase() === departmentFilter.toLowerCase()
        );

        // Filter department stats by name
        const filteredDeptStats = allDepartmentStats.filter((dept: DepartmentData) =>
          dept.name.toLowerCase() === departmentFilter.toLowerCase()
        );

        // Recalculate aggregates for the selected department
        const filteredAggregates = filteredDeptStats.reduce((acc, dept) => {
          const safeInt = (val: any) => {
            if (typeof val === 'number') return val;
            const parsed = parseInt(String(val || 0).replace(/[^0-9]/g, '') || '0', 10);
            return isNaN(parsed) ? 0 : parsed;
          };

          return {
            totalBeds: acc.totalBeds + safeInt(dept.total_beds),
            availableBeds: acc.availableBeds + safeInt(dept.available_beds),
            occupiedBeds: acc.occupiedBeds + safeInt(dept.occupied_beds),
            totalPatients: acc.totalPatients + safeInt(dept.current_patient_count),
            bed_utilization_rate: filteredDeptStats.length > 0
              ? (acc.bed_utilization_rate + (dept.bed_utilization_rate || 0)) / filteredDeptStats.length
              : 0
          };
        }, {
          totalBeds: 0,
          availableBeds: 0,
          occupiedBeds: 0,
          totalPatients: 0,
          bed_utilization_rate: 0
        });

        console.log(`🔍 Filtering by department: "${departmentFilter}"`);
        console.log(`  Total admissions found: ${filteredAdmissions.length}`);
        console.log(`  Department stats found: ${filteredDeptStats.length}`);

        return {
          admissions: filteredAdmissions,
          departmentStats: filteredDeptStats,
          departmentAggregates: filteredAggregates
        };
    }
  }, [departmentFilter, allAdmissions, allDepartmentStats, allDepartmentAggregates]);

  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Joyride tour state
  const [runTour, setRunTour] = useState<boolean>(false);
  const { tourTrigger } = useOrganizationTour();

  // Tour steps - 10 steps total
  const tourSteps: Step[] = [
    {
      target: '.analytics-dashboard-title',
      content: 'Welcome to the Analytics Dashboard! This is your central hub for monitoring hospital performance, patient flow, and key metrics. Let me guide you through the key features.',
      disableBeacon: true,
    },
    {
      target: '.department-filter',
      content: 'Use this dropdown to filter analytics by specific departments. You can view data for individual departments or see aggregated hospital-wide statistics.',
    },
    {
      target: '.kpi-cards',
      content: 'These KPI cards show your most important metrics at a glance: Active Admitted Patients, Bed Occupancy Rate, and Staff Utilization Rate.',
    },
    {
      target: '.staff-utilization-kpi',
      content: 'Staff Utilization shows how efficiently your staff are deployed. 80-120% is optimal (green), below 50% indicates critical shortage (red), above 200% suggests overstaffing (yellow/amber).',
    },
    {
      target: '.patient-flow-chart',
      content: 'This chart visualizes patient flow over time. Blue shows daily admissions, green shows daily discharges, and purple shows the net patient count (cumulative).',
    },
    {
      target: '.key-insights-section',
      content: 'Key Insights provide intelligent analysis of your hospital operations. These insights highlight important trends and actionable recommendations.',
    },
    {
      target: '.staff-utilization-insight',
      content: 'This dynamic insight decodes your staff utilization percentage with contextual messages. The color indicates severity: red (critical shortage), orange (understaffed), green (optimal), yellow (overstaffed).',
    },
    {
      target: '.staff-utilization-insight',
      content: 'The insight shows: current staff count, patient count, recommended staff levels, and specific action items (e.g., "hire 7 more"). Messages change based on your utilization rate.',
    },
    {
      target: '.time-range-filter',
      content: 'Control the time period for your analytics. Choose Day, Week, Month, or Year to see trends over different timeframes.',
    },
    {
      target: '.analytics-dashboard-title',
      content: 'Tour complete! You now know how to navigate the Analytics Dashboard. Click the "?" button in the top-right to restart this tour anytime.',
    },
  ];

  // Joyride callback handler
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRunTour(false);
    }
  };

  // Auto-start tour on first visit
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('analytics-tour-completed');

    if (!hasSeenTour) {
      // Small delay before starting tour to ensure page is fully rendered
      const timer = setTimeout(() => {
        setRunTour(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for global tour trigger
  useEffect(() => {
    if (tourTrigger > 0) {
      setRunTour(true);
    }
  }, [tourTrigger]);

  // Mark tour as completed when finished
  useEffect(() => {
    if (!runTour) {
      localStorage.setItem('analytics-tour-completed', 'true');
    }
  }, [runTour]);

  // Calculate date range based on filter
  const dateRange = useMemo(() => {
    const today = new Date();
    switch (timeRange) {
      case 'week':
        return { start: subDays(today, 7), end: today };
      case 'month':
        return { start: subDays(today, 30), end: today };
      case 'quarter':
        return { start: subDays(today, 90), end: today };
      case 'year':
        return { start: subDays(today, 365), end: today };
      default:
        return { start: subDays(today, 30), end: today };
    }
  }, [timeRange]);

  // Process admissions data for charts with cumulative tracking
  const chartData = useMemo<ChartDataPoint[]>(() => {
    const { start, end } = dateRange;
    const days = eachDayOfInterval({ start, end });

    // Calculate baseline active patients before the start of this period
    // This ensures the "Net Patients" line starts at the correct number, not 0
    const admissionsBeforeStart = admissions.filter((adm: AdmissionData) =>
      adm.admission_date && parseISO(adm.admission_date) < start
    ).length;

    const dischargesBeforeStart = admissions.filter((adm: AdmissionData) => {
      // Must be discharged
      if (adm.status?.toLowerCase() !== 'discharged') return false;

      // Determine effective discharge date using our fallback logic
      let dischargeDate: Date | null = null;
      if (adm.actual_discharge_date) {
        dischargeDate = parseISO(adm.actual_discharge_date);
      } else if (adm.updated_at) {
        dischargeDate = parseISO(adm.updated_at);
      } else if (adm.admission_date) {
        dischargeDate = parseISO(adm.admission_date);
      }

      // Count if discharged before period start
      return dischargeDate && dischargeDate < start;
    }).length;

    const baselineActivePatients = admissionsBeforeStart - dischargesBeforeStart;

    // Initialize cumulative admissions with the historical total
    let cumulativeAdmissions = admissionsBeforeStart;
    let cumulativeDischarges = 0; // We keep discharges per period usually, or we can make it cumulative too? User only asked for "Sum of patients admitted"
    // Actually, usually cumulative charts start from 0 for the period, OR total. 
    // Given user said "Full sum of patients admitted", they likely want the Running Total of ALL time.

    let currentNetPatients = baselineActivePatients;

    // Debug logging
    console.log('📊 Chart Data Calculation:');
    console.log(`  Date range: ${format(start, 'yyyy-MM-dd')} to ${format(end, 'yyyy-MM-dd')}`);
    console.log(`  Baseline Active Patients: ${baselineActivePatients}`);
    console.log(`  Historical Total Admissions: ${admissionsBeforeStart}`);

    const chartDataPoints = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayAdmissions = admissions.filter((adm: AdmissionData) =>
        adm.admission_date && format(parseISO(adm.admission_date), 'yyyy-MM-dd') === dateStr
      );

      const dayDischarges = admissions.filter((adm: AdmissionData) =>
        adm.status?.toLowerCase() === 'discharged' &&
        (
          (adm.actual_discharge_date && format(parseISO(adm.actual_discharge_date), 'yyyy-MM-dd') === dateStr) ||
          // Fallback 1: updated_at
          (!adm.actual_discharge_date && adm.updated_at && format(parseISO(adm.updated_at), 'yyyy-MM-dd') === dateStr) ||
          // Fallback 2: admission_date (Last resort for missing data)
          (!adm.actual_discharge_date && !adm.updated_at && adm.admission_date && format(parseISO(adm.admission_date), 'yyyy-MM-dd') === dateStr)
        )
      );

      // Update cumulative counts (for this period only)
      cumulativeAdmissions += dayAdmissions.length;
      cumulativeDischarges += dayDischarges.length;

      // Calculate net patients (Baseline + Change)
      currentNetPatients += (dayAdmissions.length - dayDischarges.length);

      return {
        date: dateStr,
        dateFormatted: format(day, 'MMM d'),
        admissions: dayAdmissions.length,
        discharges: dayDischarges.length,
        cumulativeAdmissions, // Now holds Total Historical Admissions
        cumulativeDischarges,
        netPatients: currentNetPatients // Use the tracked net count
      };
    });

    return chartDataPoints;
  }, [admissions, dateRange]);

  // Calculate department discharge statistics from PatientAdmission data
  const departmentDischargeStats = useMemo(() => {
    const { start, end } = dateRange;

    // Group discharges by department
    const dischargesByDept: Record<string, {
      total: number;
      today: number;
      thisWeek: number;
      thisMonth: number;
      averageLengthOfStay: number;
    }> = {};

    const today = new Date();
    const weekAgo = subDays(today, 7);
    const monthAgo = subDays(today, 30);

    admissions.forEach((adm: AdmissionData) => {
      // Only process discharged patients - Make insensitive check
      // Allow fallback to updated_at if actual_discharge_date is missing
      if (adm.status?.toLowerCase() === 'discharged') {
        let dischargeDate: Date;

        if (adm.actual_discharge_date) {
          dischargeDate = parseISO(adm.actual_discharge_date);
        } else if (adm.updated_at) {
          // Fallback to updated_at if discharge date is missing
          dischargeDate = parseISO(adm.updated_at);
        } else if (adm.admission_date) {
          // Fallback to admission_date if everything else is missing
          dischargeDate = parseISO(adm.admission_date);
        } else {
          return; // Skip if no date available at all
        }

        const deptName = adm.department_name || 'Unknown'; // FIXED: Use department_name

        // Initialize department stats if not exists
        if (!dischargesByDept[deptName]) {
          dischargesByDept[deptName] = {
            total: 0,
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            averageLengthOfStay: 0
          };
        }

        // Count total discharges in date range
        if (isWithinInterval(dischargeDate, { start, end })) {
          dischargesByDept[deptName].total += 1;
        }

        // Count today's discharges
        if (format(dischargeDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
          dischargesByDept[deptName].today += 1;
        }

        // Count this week's discharges
        if (isWithinInterval(dischargeDate, { start: weekAgo, end: today })) {
          dischargesByDept[deptName].thisWeek += 1;
        }

        // Count this month's discharges
        if (isWithinInterval(dischargeDate, { start: monthAgo, end: today })) {
          dischargesByDept[deptName].thisMonth += 1;
        }
      }
    });

    return dischargesByDept;
  }, [admissions, dateRange]);

  // Debug: Log discharge statistics when calculated
  useEffect(() => {
    if (Object.keys(departmentDischargeStats).length > 0) {
      console.log('📊 Department Discharge Statistics:', departmentDischargeStats);
      console.log(`Total departments with discharges: ${Object.keys(departmentDischargeStats).length}`);

      // Log summary for each department
      Object.entries(departmentDischargeStats).forEach(([dept, stats]) => {
        console.log(`  ${dept}:`, {
          'Total (in range)': stats.total,
          'Today': stats.today,
          'This Week': stats.thisWeek,
          'This Month': stats.thisMonth
        });
      });
    }
  }, [departmentDischargeStats]);

  // Process department data for pie chart
  const departmentData = useMemo(() => {
    if (!departmentStats?.length) return [];

    // Log the raw department data for debugging
    console.log('Raw department stats from API:', JSON.stringify(departmentStats, null, 2));

    // Transform department data for the pie chart
    const data = departmentStats
      // Filter out departments with no patients or beds
      .filter((dept: DepartmentData) => {
        const hasPatients = (dept.current_patient_count ?? 0) > 0 || dept.occupied_beds > 0;
        const isRelevantDepartment = dept.is_clinical || dept.total_beds > 0;
        return hasPatients && isRelevantDepartment;
      })
      .map((dept: DepartmentData) => {
        // Use current_patient_count if available and > 0, otherwise use occupied_beds as fallback
        const patientCount = (dept.current_patient_count ?? 0) > 0
          ? dept.current_patient_count!
          : dept.occupied_beds;

        // Calculate bed utilization manually if rate is 0/missing, to be robust
        let bedUtilization = dept.bed_utilization_rate || 0;
        if (bedUtilization === 0 && dept.total_beds > 0) {
          bedUtilization = Math.round(((dept.occupied_beds || 0) / dept.total_beds) * 100);
        }

        console.log(`Processing department - Name: ${dept.name}, Patient Count: ${patientCount}, Occupied Beds: ${dept.occupied_beds}`);

        return {
          name: dept.name,
          value: patientCount,
          utilization: bedUtilization,
          rawData: dept // Include raw data for debugging
        };
      });

    console.log('Processed department data for chart:', data);

    // Sort by patient count (descending)
    return [...data].sort((a, b) => b.value - a.value);
  }, [departmentStats]);

  // Process bed occupancy data
  const bedOccupancyData = useMemo(() => {
    if (!departmentAggregates) return [];

    const totalBeds = departmentAggregates.totalBeds || 1;
    const availableBeds = departmentAggregates.availableBeds || 0;
    const occupied = totalBeds - availableBeds;

    return [
      { name: 'Occupied', value: occupied },
      { name: 'Available', value: availableBeds }
    ];
  }, [departmentAggregates]);

  // Process performance metrics
  const performanceMetrics = useMemo<PerformanceMetric[]>(() => {
    if (!departmentAggregates) return [];

    // FIXED: Use totalPatients from department aggregates (summed from dept.current_patient_count)
    // This provides accurate count of active patients from department records
    const activeAdmissions = departmentAggregates.totalPatients || 0;

    // Calculate metrics from available data
    // Bed utilization: Calculate from occupied/total beds as percentage
    const bedUtilization = departmentAggregates.totalBeds > 0
      ? ((departmentAggregates.occupiedBeds || 0) / departmentAggregates.totalBeds) * 100
      : 0;

    // Staff utilization: Average the staff_utilization_rate across all departments
    const staffUtilization = departmentStats.length > 0
      ? (departmentStats.reduce((sum, dept) => sum + (dept.staff_utilization_rate || 0), 0) / departmentStats.length)
      : 0;

    return [
      {
        metric: 'Active Admitted Patients',
        value: activeAdmissions.toString(),
        change: 0,
        unit: 'patients'
      },
      {
        metric: 'Bed Occupancy',
        value: `${bedUtilization.toFixed(1)}%`,
        change: 0,
        unit: '%'
      },
      {
        metric: 'Staff Utilization',
        value: `${staffUtilization.toFixed(1)}%`,
        change: 0,
        unit: '%'
      }
    ];
  }, [departmentAggregates, departmentStats, admissions]);

  // Generate dynamic staff utilization insight
  const staffUtilizationInsight = useMemo(() => {
    if (!departmentStats.length) return null;

    // Calculate average staff utilization
    const staffUtilization = departmentStats.length > 0
      ? (departmentStats.reduce((sum, dept) => sum + (dept.staff_utilization_rate || 0), 0) / departmentStats.length)
      : 0;

    // Calculate total current and recommended staff across all departments
    const totalCurrentStaff = departmentStats.reduce((sum, dept) => sum + (dept.current_staff_count || 0), 0);
    const totalPatients = departmentStats.reduce((sum, dept) => sum + (dept.current_patient_count || 0), 0);
    const avgStaffRatio = departmentStats.length > 0
      ? (departmentStats.reduce((sum, dept) => sum + (dept.recommended_staff_ratio || 0), 0) / departmentStats.length)
      : 0;
    const recommendedStaff = Math.ceil(totalPatients * avgStaffRatio);

    // Define message arrays for different utilization ranges
    const criticallyUnderstaffed = [ // < 50%
      `⚠️ Critical shortage detected. You require approximately ${recommendedStaff} staff for ${totalPatients} patients, but only have ${totalCurrentStaff}. Immediate action required to prevent patient dissatisfaction and safety concerns.`,
      `🚨 Severely understaffed. Current staff count (${totalCurrentStaff}) is critically below recommended levels (${recommendedStaff}). Quality of care is at significant risk - each staff member is stretched too thin.`,
      `⛔ Emergency staffing situation. With ${totalPatients} patients, you need ${recommendedStaff} staff, but have only ${totalCurrentStaff}. Staff burnout is inevitable at this level - urgent hiring required.`,
      `🔴 Patient safety alert. Current staffing (${totalCurrentStaff}) cannot adequately serve ${totalPatients} patients. Recommended: ${recommendedStaff} staff. Consider temporary patient transfers or department closures.`,
      `⚠️ Dangerous staff-to-patient ratio detected. You have ${totalCurrentStaff} staff covering ${totalPatients} patients. ${recommendedStaff} staff members are recommended for safe operations.`
    ];

    const understaffed = [ // 50-79%
      `⚠️ Below optimal staffing. You need ${recommendedStaff} staff for ${totalPatients} patients but have ${totalCurrentStaff}. Staff are working harder than ideal - consider hiring ${recommendedStaff - totalCurrentStaff} more.`,
      `🟠 Understaffed operations. Current staff (${totalCurrentStaff}) is below the recommended ${recommendedStaff} for ${totalPatients} patients. Patient wait times may be longer than desired.`,
      `📉 Suboptimal staff distribution. With ${totalPatients} patients, ${recommendedStaff} staff members would ensure better service quality. Currently have: ${totalCurrentStaff}.`,
      `⚠️ Staffing concerns identified. Your ${totalCurrentStaff} staff are managing ${totalPatients} patients, but ${recommendedStaff} would provide better coverage and prevent staff fatigue.`
    ];

    const adequate = [ // 80-120%
      `✅ Well-staffed department. Your ${totalCurrentStaff} staff are efficiently serving ${totalPatients} patients (recommended: ${recommendedStaff}). Operations running smoothly with high efficiency.`,
      `🟢 Optimal staff distribution. Current staffing (${totalCurrentStaff}) aligns well with patient load (${totalPatients} patients). Team is performing duties with excellent balance.`,
      `✨ Excellent staffing balance achieved. With ${recommendedStaff} staff recommended and ${totalCurrentStaff} currently assigned, your team is operating at peak efficiency.`,
      `👍 Proper staff allocation. Your ${totalCurrentStaff} staff members are well-distributed across ${totalPatients} patients, maintaining high-quality patient care standards.`,
      `🎯 Target staffing levels met. Current staff count (${totalCurrentStaff}) perfectly matches operational needs for ${totalPatients} patients. Keep up the good work!`
    ];

    const slightlyOverstaffed = [ // 121-200%
      `📊 Above recommended staffing. You have ${totalCurrentStaff} staff for ${totalPatients} patients (recommended: ${recommendedStaff}). While patient care is excellent, consider cost optimization.`,
      `💼 Comfortable staffing levels. Current staff (${totalCurrentStaff}) exceeds recommended (${recommendedStaff}) for ${totalPatients} patients. Good for quality but watch operational costs.`,
      `🟡 Higher than optimal staffing. With ${totalCurrentStaff} staff serving ${totalPatients} patients, you have ${totalCurrentStaff - recommendedStaff} more than the ${recommendedStaff} recommended. Premium care quality achieved.`
    ];

    const overstaffed = [ // > 200%
      `⚠️ Significantly overstaffed. You require ${recommendedStaff} staff for ${totalPatients} patients but have ${totalCurrentStaff}. Some staff may be idle - consider reallocation to prevent complacency.`,
      `🟡 Excess staffing detected. Current ${totalCurrentStaff} staff far exceeds the ${recommendedStaff} needed for ${totalPatients} patients. ${totalCurrentStaff - recommendedStaff} staff could be better utilized elsewhere.`,
      `💰 High staff-to-patient ratio. With only ${totalPatients} patients, ${recommendedStaff} staff would suffice, but you have ${totalCurrentStaff}. Review resource allocation to optimize costs.`,
      `📈 Overstaffing situation. Current staffing (${totalCurrentStaff}) is significantly above recommended levels (${recommendedStaff}) for ${totalPatients} patients. Action needed to prevent staff underutilization.`
    ];

    // Determine utilization category and select random message
    let messages: string[];
    let colorClass: string;
    let bgColorClass: string;

    if (staffUtilization < 50) {
      messages = criticallyUnderstaffed;
      colorClass = 'border-red-500';
      bgColorClass = 'bg-red-50';
    } else if (staffUtilization < 80) {
      messages = understaffed;
      colorClass = 'border-orange-500';
      bgColorClass = 'bg-orange-50';
    } else if (staffUtilization <= 120) {
      messages = adequate;
      colorClass = 'border-green-500';
      bgColorClass = 'bg-green-50';
    } else if (staffUtilization <= 200) {
      messages = slightlyOverstaffed;
      colorClass = 'border-yellow-500';
      bgColorClass = 'bg-yellow-50';
    } else {
      messages = overstaffed;
      colorClass = 'border-amber-500';
      bgColorClass = 'bg-amber-50';
    }

    // Randomly select a message from the appropriate array
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return {
      message: randomMessage,
      colorClass,
      bgColorClass,
      utilization: staffUtilization
    };
  }, [departmentStats]);

  // Fetch additional data on component mount or when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only show loading on initial load, not on filter changes to prevent flickering
        if (appointments.length === 0) {
          setLoading(true);
        }

        // Fetch staff data if not already loaded
        if (staff.length === 0) {
          const staffResponse = await StaffService.fetchStaffMembers();
          if (staffResponse?.staff_members) {
            setStaff(staffResponse.staff_members);
          }
        }

        // Fetch appointments based on current date range
        const { start, end } = dateRange;
        console.log(`📅 Fetching appointments from ${format(start, 'yyyy-MM-dd')} to ${format(end, 'yyyy-MM-dd')}`);

        const appointmentsResponse = await AppointmentService.getAppointments({
          date_from: format(start, 'yyyy-MM-dd'),
          date_to: format(end, 'yyyy-MM-dd')
        });

        if (appointmentsResponse?.appointments) {
          setAppointments(appointmentsResponse.appointments);
        }

        setError(null);
        setLastUpdated(new Date()); // Update timestamp when data is successfully fetched
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]); // Re-fetch when date range changes

  // Time range filter handler
  const handleTimeRangeChange = (range: 'week' | 'month' | 'quarter' | 'year') => {
    setTimeRange(range);
    setLastUpdated(new Date()); // Update timestamp when filter changes
  };

  // Handle day filter by defaulting to week view
  const handleDayFilter = () => {
    setTimeRange('week');
    setLastUpdated(new Date()); // Update timestamp when filter changes
  };

  // Handle department filter change
  const handleDepartmentFilterChange = (newDepartment: string) => {
    setDepartmentFilter(newDepartment);
    setLastUpdated(new Date()); // Update timestamp when department filter changes
  };

  // Operation trends chart
  const renderOperationTrends = () => {
    // Generate operation trends from appointments data
    const operationTrends = appointments.reduce((acc, appt) => {
      if (!appt.date) return acc;

      // Group by Month Year to handle multiple years correctly
      // Format: "Jan 2024", "Feb 2024"
      const date = parseISO(appt.date);
      const key = format(date, 'yyyy-MM'); // Sortable key
      const displayLabel = format(date, 'MMM yyyy');

      const isEmergency = appt.type === 'emergency';

      if (!acc[key]) {
        acc[key] = {
          key, // For sorting
          month: displayLabel,
          planned: 0,
          emergency: 0
        };
      }

      if (isEmergency) {
        acc[key].emergency += 1;
      } else {
        acc[key].planned += 1;
      }

      return acc;
    }, {} as Record<string, { key: string; month: string; planned: number; emergency: number }>);

    // Sort by date key (yyyy-MM)
    const operationTrendData = Object.values(operationTrends)
      .sort((a: any, b: any) => a.key.localeCompare(b.key));

    if (!operationTrendData.length) return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Operation Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={operationTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="planned" fill="#8884d8" name="Planned" />
            <Bar dataKey="emergency" fill="#ff7300" name="Emergency" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Loading state
  if (loading || admissionsLoading || deptStatsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        <span className="ml-2 text-gray-600">Loading analytics data...</span>
      </div>
    );
  }

  // Error state
  if (error || admissionsError || deptStatsError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error || admissionsError || deptStatsError}
            </p>
            <button
              onClick={() => {
                setError(null);
                refetchDeptStats();
              }}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Try again <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/organization/dashboard"
            className="mr-4 bg-blue-50 hover:bg-blue-100 p-2 rounded-full"
          >
            <span className="material-icons text-blue-700">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-800 analytics-dashboard-title">Analytics Dashboard</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/organization/emergency" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Emergency Protocols">
            <span className="material-icons text-blue-700">emergency</span>
          </Link>
          <Link to="/organization/staffing" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Staff Roster">
            <span className="material-icons text-blue-700">badge</span>
          </Link>
          <Link to="/organization/departments" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Department Management">
            <span className="material-icons text-blue-700">bed</span>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('analytics-tour-completed');
              setRunTour(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            title="Start Tour"
          >
            <span className="material-icons text-white">help_outline</span>
          </button>
        </div>
      </div>

      {/* Filter section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-blue-800 mr-4">Hospital Analytics</h2>
            <span className="text-sm text-gray-500">
              Last updated: {format(lastUpdated, 'MMM d, yyyy h:mm a')}
            </span>
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <div className="flex items-center department-filter">
              <label className="text-sm font-medium text-gray-700 mr-2">Department:</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                value={departmentFilter}
                onChange={(e) => handleDepartmentFilterChange(e.target.value)}
              >
                <option value="all">All Departments</option>
                {allDepartmentStats
                  .filter((dept: DepartmentData) => dept.is_active)
                  .sort((a: DepartmentData, b: DepartmentData) => a.name.localeCompare(b.name))
                  .map((dept: DepartmentData) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="flex items-center time-range-filter">
              <label className="text-sm font-medium text-gray-700 mr-2">Time Range:</label>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  className={`px-3 py-1 text-sm font-medium ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={handleDayFilter}
                >
                  Day
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium border-l border-gray-300 ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => handleTimeRangeChange('week')}
                >
                  Week
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium border-l border-gray-300 ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => handleTimeRangeChange('month')}
                >
                  Month
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium border-l border-gray-300 ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => handleTimeRangeChange('year')}
                >
                  Year
                </button>
              </div>
            </div>
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center">
              <span className="material-icons text-sm mr-1">download</span>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 kpi-cards">
        {performanceMetrics.map((metric, index) => (
          <div
            key={index}
            className={`bg-white p-5 rounded-lg shadow-md ${metric.metric === 'Staff Utilization' ? 'staff-utilization-kpi' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{metric.metric}</h3>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${metric.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="material-icons text-xs mr-0.5">
                  {metric.change >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {Math.abs(metric.change)}{metric.unit}
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${metric.change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${metric.change >= 0 ? 65 + Math.min(metric.change * 10, 30) : 65 - Math.min(Math.abs(metric.change) * 10, 30)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Patient Admissions Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 patient-flow-chart">
        <div className="bg-white p-4 rounded-lg shadow-md patient-flow-chart">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">trending_up</span>
            Patient Flow Progression
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                          <p className="text-sm font-semibold mb-1">{payload[0].payload.dateFormatted}</p>
                          <p className="text-sm text-blue-600">Daily Admissions: {payload[0].payload.admissions}</p>
                          <p className="text-sm text-green-600">Daily Discharges: {payload[0].payload.discharges}</p>
                          <p className="text-sm text-purple-600 font-medium mt-1">Total Admissions: {payload[0].payload.cumulativeAdmissions}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="admissions"
                  stroke="#3B82F6" // bright blue
                  strokeWidth={3}
                  name="Daily Admissions"
                  activeDot={{ r: 6 }}
                  dot={{ r: 4, strokeWidth: 2 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="discharges"
                  stroke="#10B981" // emerald green
                  strokeWidth={3}
                  strokeDasharray="5 5" // Dashed line to show underlying admission line if overlapping
                  name="Daily Discharges"
                  activeDot={{ r: 6 }}
                  dot={{ r: 4, strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulativeAdmissions" // CHANGED from netPatients
                  stroke="#8B5CF6" // violet
                  strokeWidth={4}
                  name="Total Admissions" // CHANGED label
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  strokeOpacity={0.8}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Admissions</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Discharges</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span>Total Admissions</span>
            </div>
          </div>
        </div>

        {/* Department Admissions Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">pie_chart</span>
            Admissions by Department
          </h3>
          <div className="h-80 flex flex-col md:flex-row items-center justify-around">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="md:w-1/3">
              <ul className="space-y-2">
                {departmentData.map((dept, index) => (
                  <li key={index} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-sm mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm">{dept.name}: <strong>{dept.value}</strong></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bed Occupancy and Operations Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">bed</span>
            Bed Occupancy Rate (%)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={bedOccupancyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">medical_services</span>
            Operations Trend
          </h3>
          {renderOperationTrends()}
        </div>
      </div>

      {/* Additional Analysis Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 key-insights-section">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <span className="material-icons mr-2">insights</span>
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-l-4 border-blue-500 p-3 bg-blue-50 rounded-r-md">
            <h4 className="font-semibold mb-1">Patient Admissions</h4>
            <p className="text-sm text-gray-700">
              Admissions increased by 8.2% compared to last year with the highest growth in Cardiology.
            </p>
          </div>
          <div className="border-l-4 border-green-500 p-3 bg-green-50 rounded-r-md">
            <h4 className="font-semibold mb-1">Operational Efficiency</h4>
            <p className="text-sm text-gray-700">
              Average length of stay decreased by 0.3 days while maintaining high patient satisfaction.
            </p>
          </div>
          <div className="border-l-4 border-amber-500 p-3 bg-amber-50 rounded-r-md">
            <h4 className="font-semibold mb-1">Capacity Planning</h4>
            <p className="text-sm text-gray-700">
              Peak bed occupancy occurs on Wednesdays (92%). Consider staff adjustments for mid-week capacity.
            </p>
          </div>
          {staffUtilizationInsight && (
            <div className={`border-l-4 ${staffUtilizationInsight.colorClass} p-3 ${staffUtilizationInsight.bgColorClass} rounded-r-md staff-utilization-insight`}>
              <h4 className="font-semibold mb-1 flex items-center">
                <span className="material-icons text-sm mr-1">groups</span>
                Staff Utilization
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded bg-white">
                  {staffUtilizationInsight.utilization.toFixed(1)}%
                </span>
              </h4>
              <p className="text-sm text-gray-700">
                {staffUtilizationInsight.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Joyride Tour Component */}
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        scrollToFirstStep={true}
        scrollOffset={120}
        disableScrolling={false}
        scrollDuration={300}
        spotlightClicks={false}
        spotlightPadding={10}
        disableOverlayClose={true}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip Tour'
        }}
        styles={{
          options: {
            overlayColor: 'rgba(0, 0, 0, 0.7)',
            primaryColor: '#2563eb',
            textColor: '#1f2937',
            zIndex: 10000,
          },
          spotlight: {
            borderRadius: 8,
          },
          tooltip: {
            borderRadius: 8,
          },
          buttonNext: {
            backgroundColor: '#2563eb',
            fontSize: 14,
            padding: '8px 16px',
            borderRadius: 6,
          },
          buttonBack: {
            color: '#6b7280',
            fontSize: 14,
            padding: '8px 16px',
          },
          buttonSkip: {
            color: '#9ca3af',
            fontSize: 14,
          },
        }}
      />

      {/* Reports Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-800 flex items-center">
            <span className="material-icons mr-2">description</span>
            Available Reports
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center">
            <span className="material-icons text-sm mr-1">add</span>
            New Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Monthly Performance Report</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All Departments</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 28, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Quarterly Financial Analysis</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Finance</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Emergency Department Metrics</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Emergency</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 10, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Surgical Outcomes Review</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Surgery</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 05, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
