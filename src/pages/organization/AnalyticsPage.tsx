import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  discharge_date?: string;
  patient_name: string;
  department: string;
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
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsPage: React.FC = () => {
  // State for filters
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  
  // Fetch data using custom hooks
  const { 
    admissions = [], 
    totalAdmissions = admissions.length, 
    statusCounts = { admitted: 0, discharged: 0, transferred: 0 },
    emergencyCount = 0,
    loading: admissionsLoading,
    error: admissionsError
  } = useAdmissionData() as unknown as ExtendedAdmissionStats;

  const { 
    departments: departmentStats = [], 
    stats: departmentAggregates = {
      totalBeds: 0,
      availableBeds: 0,
      totalPatients: 0,
      bed_utilization_rate: 0
    },
    loading: deptStatsLoading,
    error: deptStatsError,
    refetch: refetchDeptStats
  } = useDepartmentStats() as unknown as ExtendedDepartmentStats;

  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Process admissions data for charts
  const chartData = useMemo<ChartDataPoint[]>(() => {
    const { start, end } = dateRange;
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayAdmissions = admissions.filter((adm: AdmissionData) => 
        adm.admission_date && format(parseISO(adm.admission_date), 'yyyy-MM-dd') === dateStr
      );
      const dayDischarges = admissions.filter((adm: AdmissionData) => 
        adm.discharge_date && format(parseISO(adm.discharge_date), 'yyyy-MM-dd') === dateStr
      );
      
      return {
        date: dateStr,
        dateFormatted: format(day, 'MMM d'),
        admissions: dayAdmissions.length,
        discharges: dayDischarges.length
      };
    });
  }, [admissions, dateRange]);

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
        
        const bedUtilization = dept.bed_utilization_rate || 0;
        
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
    if (!departmentAggregates || !admissions) return [];
    
    // Count active admissions (same as PatientAdmissionsPage)
    const activeAdmissions = admissions.filter(
      (adm: AdmissionData) => adm.status === 'admitted' || adm.status === 'Admitted'
    ).length;
    
    // Calculate metrics from available data
    const bedUtilization = departmentAggregates.totalBeds > 0 
      ? ((departmentAggregates.totalBeds - (departmentAggregates.availableBeds || 0)) / departmentAggregates.totalBeds) * 100 
      : 0;
    
    const staffUtilization = departmentStats.length > 0 
      ? (departmentStats.reduce((sum, dept) => sum + (dept.staff_count || 0), 0) / departmentStats.length) 
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

  // Fetch additional data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch staff data
        const staffResponse = await StaffService.fetchStaffMembers();
        if (staffResponse?.staff_members) {
          setStaff(staffResponse.staff_members);
        }
        
        // Fetch appointments
        const today = new Date();
        const thirtyDaysAgo = subDays(today, 30);
        const appointmentsResponse = await AppointmentService.getAppointments({
          date_from: format(thirtyDaysAgo, 'yyyy-MM-dd'),
          date_to: format(today, 'yyyy-MM-dd')
        });
        
        if (appointmentsResponse?.appointments) {
          setAppointments(appointmentsResponse.appointments);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Time range filter handler
  const handleTimeRangeChange = (range: 'week' | 'month' | 'quarter' | 'year') => {
    setTimeRange(range);
  };

  // Handle day filter by defaulting to week view
  const handleDayFilter = () => {
    setTimeRange('week');
  };

  // Operation trends chart
  const renderOperationTrends = () => {
    // Generate operation trends from appointments data
    const operationTrends = appointments.reduce((acc, appt) => {
      if (!appt.date) return acc;
      
      const month = format(parseISO(appt.date), 'MMM');
      const isEmergency = appt.type === 'emergency';
      
      if (!acc[month]) {
        acc[month] = { month, planned: 0, emergency: 0 };
      }
      
      if (isEmergency) {
        acc[month].emergency += 1;
      } else {
        acc[month].planned += 1;
      }
      
      return acc;
    }, {} as Record<string, { month: string; planned: number; emergency: number }>);
    
    const operationTrendData = Object.values(operationTrends);
    
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
          <h1 className="text-2xl font-bold text-blue-800">Analytics Dashboard</h1>
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
        </div>
      </div>

      {/* Filter section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-blue-800 mr-4">Hospital Analytics</h2>
            <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">Department:</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="oncology">Oncology</option>
                <option value="neurology">Neurology</option>
                <option value="obstetrics">Obstetrics</option>
              </select>
            </div>
            <div className="flex items-center">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-md">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">trending_up</span>
            Patient Admissions & Discharges
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="admissions" stroke="#0088FE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="discharges" stroke="#00C49F" />
              </LineChart>
            </ResponsiveContainer>
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
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <span className="material-icons mr-2">insights</span>
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>

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
