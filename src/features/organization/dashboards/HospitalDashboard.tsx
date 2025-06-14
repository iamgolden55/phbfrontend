import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../organizationAuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { useRegistrationStats } from '../../../hooks/useRegistrationStats';
import { useDepartmentStats, DepartmentStats as DepartmentStatsType } from '../../../hooks/useDepartmentStats';
import { useAdmissionData } from '../../../hooks/useAdmissionData';
import { StaffMember, StaffService } from '../../../services/staffService';

// --- Initial Stats ---
const INITIAL_STATS = {
  activePatients: 0,
  availableBeds: 0,
  scheduledSurgeries: 0,
  staffOnDuty: 0,
  trendPatients: { trend: 'up', value: '0% from last week' },
  trendBeds: { trend: 'stable', value: '0% from last week' },
};

// Custom hook to fetch staff data
const useStaffData = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const response = await StaffService.fetchStaffMembers();
        if (response.status === 'success') {
          setStaff(response.staff_members);
          // Update staff on duty count (filtering by availability status)
          const staffOnDuty = response.staff_members.filter(
            member => member.availability_status?.is_available
          ).length;
          
          INITIAL_STATS.staffOnDuty = staffOnDuty;
        }
      } catch (err) {
        console.error('Error fetching staff data:', err);
        setError('Failed to load staff data');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return { staff, loading, error };
};

const MOCK_NOTIFICATIONS = [
  { level: 'urgent', title: 'Urgent: Low Blood Supply', desc: 'Type O- critically low. Contact blood bank.' },
  { level: 'warning', title: 'Staffing Alert', desc: 'Night shift nurses needed for tomorrow.' },
  { level: 'info', title: 'System Maintenance', desc: 'Scheduled for tonight 2-4 AM.' },
];

const MOCK_ADMISSIONS = [
  { id: 'P7890', time: '10:30 AM', department: 'Emergency', status: 'Emergency' },
  { id: 'P7891', time: '09:15 AM', department: 'General', status: 'Regular' },
  { id: 'P7892', time: 'Yesterday', department: 'Pediatrics', status: 'Regular' },
  { id: 'P7893', time: 'Yesterday', department: 'Surgery', status: 'Pre-Op' },
];

const MOCK_ACTIVITIES = [
  { activity: 'Patient Admitted', department: 'Emergency', time: '10:30 AM', status: 'Completed' },
  { activity: 'Medication Dispensed', department: 'Pharmacy', time: '9:45 AM', status: 'Completed' },
  { activity: 'Surgery Scheduled', department: 'Surgery', time: '9:15 AM', status: 'Pending' },
  { activity: 'Lab Results Updated', department: 'Laboratory', time: '8:50 AM', status: 'Reviewed' },
];

const MOCK_OCCUPANCY = [
  { ward: 'General Ward', percent: 82, color: 'blue' },
  { ward: 'ICU', percent: 65, color: 'green' },
  { ward: 'Pediatric Ward', percent: 45, color: 'indigo' },
  { ward: 'Maternity', percent: 90, color: 'orange' },
];

const MOCK_SURGERY_OVERVIEW = {
  scheduled: 15,
  completed: 8,
  inProgress: 4,
  upcoming: 3,
  next: { procedure: 'Appendectomy', time: '11:30 AM • OR-2', doctor: 'Dr. Martinez' },
};

// Generate avatar URL from name as a fallback
const getAvatarUrl = (name: string) => {
  const names = name.split(' ');
  const firstName = names[0] || '';
  const lastName = names[names.length - 1] || '';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random`;
};

const TRENDS_DATA = [
  { name: 'Mon', Patients: 1300, Beds: 100 },
  { name: 'Tue', Patients: 1280, Beds: 97 },
  { name: 'Wed', Patients: 1275, Beds: 95 },
  { name: 'Thu', Patients: 1330, Beds: 93 },
  { name: 'Fri', Patients: 1250, Beds: 85 },
  { name: 'Sat', Patients: 1235, Beds: 90 },
  { name: 'Sun', Patients: 1250, Beds: 85 }
];

// --- Reusable Components (Can be moved to a shared location later) ---
const DashboardCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 ${className}`}>
    <h2 className="text-lg font-semibold text-blue-900 mb-4 tracking-tight">{title}</h2>
    {children}
  </div>
);

const StatCard: React.FC<{ label: string; value: string | number; icon?: string; trend?: string; trendValue?: string }> = ({
  label, value, icon, trend, trendValue
}) => (
  <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100 text-center md:text-left">
    <div className="flex justify-between items-center mb-2">
      <p className="text-2xl font-bold text-blue-700">{value}</p>
      {icon && <span className="material-icons text-blue-500 text-2xl">{icon}</span>}
    </div>
    <p className="text-sm text-gray-600">{label}</p>
    {trend && (
      <div className={`flex items-center mt-2 text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        <span className="material-icons text-xs mr-1">
          {trend === 'up' ? 'trending_up' : 'trending_down'}
        </span>
        <span>{trendValue}</span>
      </div>
    )}
  </div>
);

interface TrendsChartProps {
  departmentStats: DepartmentStatsType | null;
  loading: boolean;
  error: string | null;
}

// --- Trends Chart Panel ---
const TrendsChart: React.FC<TrendsChartProps> = ({ departmentStats, loading, error }) => {
  // Early return if no department stats
  if (!departmentStats) {
    return (
      <DashboardCard title="Resource Utilization" className="h-full">
        <div className="h-[220px] flex items-center justify-center text-gray-500">
          No department data available
        </div>
      </DashboardCard>
    );
  }

  // Destructure criticalAlerts after null check
  const { criticalAlerts } = departmentStats;
  // Transform department stats into chart data
  const getChartData = () => {
    if (!departmentStats) return [];
    
    return [
      {
        name: 'Beds',
        total: departmentStats.totalBeds,
        available: departmentStats.availableBeds,
        occupied: departmentStats.occupiedBeds,
        utilization: departmentStats.overallBedUtilization
      },
      {
        name: 'ICU Beds',
        total: departmentStats.totalICUBeds,
        available: departmentStats.availableICUBeds,
        occupied: departmentStats.occupiedICUBeds,
        utilization: departmentStats.overallBedUtilization * 0.8 // Assuming 80% of total utilization for ICU
      },
      {
        name: 'Staff',
        current: departmentStats.totalStaff,
        required: departmentStats.totalMinimumStaff,
        utilization: departmentStats.overallStaffUtilization
      },
      {
        name: 'Patients',
        current: departmentStats.totalPatients,
        capacity: Math.round(departmentStats.totalBeds * 0.8), // Assuming 80% capacity target
        utilization: departmentStats.overallUtilization
      }
    ];
  };

  const chartData = getChartData();

  if (loading) {
    return (
      <DashboardCard title="Trends & Analytics" className="h-full">
        <div className="h-[220px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard title="Resource Utilization" className="h-full">
        <div className="h-[220px] flex flex-col items-center justify-center text-red-500">
          <p>Failed to load data</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Retry
          </button>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Resource Utilization" className="h-full">
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 16, left: -22, bottom: 5 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              wrapperClassName="!text-sm"
              formatter={(value: number, name: string) => {
                if (name === 'utilization') return [`${value}%`, 'Utilization'];
                return [value, name];
              }}
            />
            <Legend />
            <Bar dataKey="utilization" name="Utilization %" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="available" name="Available" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="occupied" name="Occupied" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current" name="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="required" name="Required" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        {criticalAlerts?.understaffedDepartments?.length > 0 && (
          <span className="text-amber-600">
            ⚠️ {criticalAlerts.understaffedDepartments.length} departments understaffed
          </span>
        )}
        {criticalAlerts?.highUtilization?.length > 0 && (
          <span className="ml-2 text-red-600">
            ⚠️ {criticalAlerts.highUtilization.length} departments at high utilization
          </span>
        )}
      </div>
    </DashboardCard>
  );
};

// --- Staff on Duty Panel ---
const StaffOnDuty: React.FC<{ staff: StaffMember[] }> = ({ staff }) => (
  <DashboardCard title="Staff On Duty">
    <ul className="divide-y divide-gray-100">
      {staff.map((member) => (
        <div key={member.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg transition-colors">
          <img 
            src={getAvatarUrl(member.full_name)} 
            alt={member.full_name} 
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-white"
          />
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{member.full_name}</p>
            <p className="text-sm text-gray-500 truncate">{member.role_display}</p>
            {member.department_name && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mt-1">
                {member.department_name}
              </span>
            )}
          </div>
        </div>
      ))}
    </ul>
    <Link to="/organization/staffing" className="text-blue-600 hover:underline text-sm mt-4 inline-block">View Staff Roster</Link>
  </DashboardCard>
);

// --- Updated Functional Components with Props ---

// --- Updated Functional Components with Real Data ---

interface HospitalStatsProps {
  stats?: typeof INITIAL_STATS;
  departmentStats: DepartmentStatsType | null;
  loading: boolean;
  error: string | null;
}

const HospitalStats: React.FC<HospitalStatsProps> = ({ 
  stats, 
  departmentStats, 
  loading: departmentLoading, 
  error: departmentError 
}) => {
  // Use the registration stats hook
  const { approved: approvedRegistrations } = useRegistrationStats();

  // Define the shape of our display stats
  type Trend = 'up' | 'down';
  
  interface DisplayStats {
    activePatients: number | string;
    availableBeds: number | string;
    totalBeds: number | string;
    scheduledSurgeries: number | string;
    staffOnDuty: number | string;
    trendPatients: { trend: Trend; value: string };
    trendBeds: { trend: Trend; value: string };
  }

  // Helper function to safely convert to number or return 0
  const toNumber = (value: number | string): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && !isNaN(parseInt(value))) return parseInt(value);
    return 0;
  };

  // Use the admission data hook to get the correct patient count
  const { admissions = [], loading: admissionsLoading } = useAdmissionData();

  // Use REAL data if available, otherwise fallback to loading states
  const displayStats = React.useMemo<DisplayStats>(() => {
    console.log('🏥 Computing display stats:', {
      departmentLoading,
      admissionsLoading,
      departmentStats,
      admissions: admissions?.length,
    });

    // If we have department stats, use them immediately regardless of loading state
    if (departmentStats && !departmentError) {
      console.log('🏥 Using REAL department stats:', departmentStats);
      
      // Count active admissions
      const activeAdmissions = admissions.filter(
        adm => adm.status.toLowerCase() === 'admitted'
      ).length;
      
      return {
        activePatients: activeAdmissions,
        availableBeds: departmentStats.availableBeds,
        totalBeds: departmentStats.totalBeds,
        scheduledSurgeries: stats?.scheduledSurgeries || 15,
        staffOnDuty: departmentStats.totalStaff,
        trendPatients: { 
          trend: (activeAdmissions / Math.max(1, departmentStats.totalBeds) * 100) > 70 ? 'up' as const : 'down' as const, 
          value: `${Math.round((activeAdmissions / Math.max(1, departmentStats.totalBeds)) * 100) || 0}% capacity` 
        },
        trendBeds: { 
          trend: departmentStats.overallBedUtilization < 80 ? 'down' as const : 'up' as const, 
          value: `${departmentStats.overallBedUtilization.toFixed(1)}% occupied` 
        },
      };
    }

    // Loading state - but keep trying
    if (departmentLoading || admissionsLoading) {
      return {
        activePatients: '...',
        availableBeds: '...',
        totalBeds: '...',
        scheduledSurgeries: '...',
        staffOnDuty: '...',
        trendPatients: { trend: 'up', value: 'Loading...' },
        trendBeds: { trend: 'down', value: 'Loading...' },
      };
    }

    // Error state
    console.error('🏥 Display stats error state:', departmentError);
    return {
      activePatients: 'Error',
      availableBeds: 'Error',
      totalBeds: 'Error',
      scheduledSurgeries: stats?.scheduledSurgeries || 15,
      staffOnDuty: 'Error',
      trendPatients: { trend: 'down' as Trend, value: 'Data error' },
      trendBeds: { trend: 'down' as Trend, value: 'Data error' },
    };
  }, [departmentStats, departmentLoading, departmentError, admissions, admissionsLoading, stats]);

  // 🔥 Show critical alerts
  const criticalAlerts = departmentStats?.criticalAlerts;
  const showUrgentAlert = criticalAlerts?.lowBedAvailability || (criticalAlerts?.understaffedDepartments && criticalAlerts.understaffedDepartments.length > 0);

  return (
    <div className="mb-8">
      {/* 🔥 Critical Alert Banner */}
      {showUrgentAlert && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <span className="material-icons text-red-500 mr-3 text-2xl">priority_high</span>
            <div>
              <p className="text-sm font-medium text-red-800">Critical Alert</p>
              <p className="text-xs text-red-700">
                {criticalAlerts?.lowBedAvailability && `Low bed availability (${departmentStats?.availableBeds} beds left). `}
                {criticalAlerts?.understaffedDepartments && criticalAlerts.understaffedDepartments.length > 0 && 
                  `${criticalAlerts.understaffedDepartments.length} departments are understaffed.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Desktop Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Active Patients - Enhanced Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <span className="material-icons text-white text-2xl">personal_injury</span>
            </div>
            <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
              displayStats.trendPatients.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <span className="material-icons text-xs mr-1">
                {displayStats.trendPatients.trend === 'up' ? 'trending_up' : 'trending_down'}
              </span>
              <span className="font-medium">
                {typeof displayStats.activePatients === 'number' ? `${displayStats.activePatients} admitted` : 'Loading'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-800">
              {typeof displayStats.activePatients === 'number' ? displayStats.activePatients.toLocaleString() : displayStats.activePatients}
            </p>
            <p className="text-sm font-medium text-blue-700">Active Admitted Patients</p>
            <p className="text-xs text-blue-600">{displayStats.trendPatients.value}</p>
          </div>
        </div>
        
        {/* Available Beds - Enhanced Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl">
              <span className="material-icons text-white text-2xl">hotel</span>
            </div>
            <div className="flex items-center text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
              <span className="material-icons text-xs mr-1">check_circle</span>
              <span className="font-medium">Available</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-green-800">
              {typeof displayStats.availableBeds === 'number' && typeof displayStats.totalBeds === 'number'
                ? `${displayStats.availableBeds} / ${displayStats.totalBeds}`
                : `${displayStats.availableBeds} / ${displayStats.totalBeds}`}
            </p>
            <p className="text-sm font-medium text-green-700">Available Beds</p>
            <p className="text-xs text-green-600">
              {typeof displayStats.availableBeds === 'number' 
                ? `${displayStats.availableBeds} beds ready` 
                : 'Loading availability'}
            </p>
          </div>
        </div>
        
        {/* Bed Utilization - Enhanced Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <span className="material-icons text-white text-2xl">airline_seat_recline_extra</span>
            </div>
            <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
              displayStats.trendBeds.trend === 'up' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
            }`}>
              <span className="material-icons text-xs mr-1">
                {displayStats.trendBeds.trend === 'up' ? 'trending_up' : 'trending_down'}
              </span>
              <span className="font-medium">
                {displayStats.trendBeds.trend === 'up' ? 'High' : 'Good'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-purple-800">{displayStats.trendBeds.value}</p>
            <p className="text-sm font-medium text-purple-700">Bed Utilization</p>
            <p className="text-xs text-purple-600">
              {typeof displayStats.availableBeds === 'number' && typeof displayStats.totalBeds === 'number'
                ? `${Math.max(0, displayStats.totalBeds - displayStats.availableBeds)} occupied`
                : 'Calculating occupancy'}
            </p>
          </div>
        </div>
        
        {/* Staff On Duty - Enhanced Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-lg border border-indigo-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-500 rounded-xl">
              <span className="material-icons text-white text-2xl">groups</span>
            </div>
            <div className="flex items-center text-sm px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
              <span className="material-icons text-xs mr-1">schedule</span>
              <span className="font-medium">On Duty</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-indigo-800">
              {typeof displayStats.staffOnDuty === 'number' 
                ? displayStats.staffOnDuty.toLocaleString() 
                : displayStats.staffOnDuty}
            </p>
            <p className="text-sm font-medium text-indigo-700">Staff On Duty</p>
            <p className="text-xs text-indigo-600">Across all departments</p>
          </div>
        </div>

        {/* Approved Registrations - Enhanced Card */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <span className="material-icons text-white text-2xl">how_to_reg</span>
            </div>
            <div className="flex items-center text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-700">
              <span className="material-icons text-xs mr-1">trending_up</span>
              <span className="font-medium">New</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-orange-800">
              {approvedRegistrations?.toString() || 'N/A'}
            </p>
            <p className="text-sm font-medium text-orange-700">Approved Registrations</p>
            <p className="text-xs text-orange-600">
              <Link to="/organization/user-registrations" className="hover:underline">
                View all registrations →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickLink {
  label: string;
  path: string;
  icon: string;
  highlight?: boolean;
  badge?: string | number;
}

const HospitalQuickLinks: React.FC = () => {
  // Use the registration stats hook
  const { pending, approved } = useRegistrationStats();

  const quickLinks: QuickLink[] = [
    { 
      label: 'Patient Admissions', 
      path: '/organization/admissions', 
      icon: 'person_add' 
    },
    { 
      label: 'User Registrations', 
      path: '/organization/user-registrations', 
      icon: 'how_to_reg',
      highlight: pending > 0
    },
    { 
      label: 'Appointments', 
      path: '/organization/appointments', 
      icon: 'event_available' 
    },
    { 
      label: 'Department Management', 
      path: '/organization/wards', 
      icon: 'bed' 
    },
    { 
      label: 'Staff Roster', 
      path: '/organization/staff-roster', 
      icon: 'people' 
    },
    { 
      label: 'Analytics Dashboard', 
      path: '/organization/analytics', 
      icon: 'analytics' 
    },
    { 
      label: 'Emergency Protocols', 
      path: '/organization/emergency', 
      icon: 'emergency' 
    },
    { 
      label: 'Surgery Schedule', 
      path: '/organization/surgery-schedule', 
      icon: 'event' 
    },
  ];

  return (
    <DashboardCard title="Hospital Quick Links" className="h-full">
      <div className="space-y-2">
        {quickLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
            className={`${
              link.highlight 
                ? 'bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200' 
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
            } p-3 rounded-md flex items-center justify-between transition`}
          >
            <div className="flex items-center">
              <span className="material-icons mr-3 text-lg">{link.icon}</span> 
              <span className="font-medium">{link.label}</span>
            </div>
            {link.badge && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                link.highlight 
                  ? 'bg-orange-200 text-orange-800' 
                  : 'bg-blue-200 text-blue-800'
              }`}>
                {link.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
};

const RecentActivities: React.FC<{ activities: typeof MOCK_ACTIVITIES }> = ({ activities }) => (
  <DashboardCard title="Recent Activities">
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.map((a, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{a.activity}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{a.department}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{a.time}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span className={
                  `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ` +
                  (a.status === 'Completed' ? 'bg-green-100 text-green-800' :
                   a.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-blue-100 text-blue-800')
                }>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Link to="/organization/activities" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
      View All Activities
    </Link>
  </DashboardCard>
);

const OccupancyChart: React.FC<{ data: typeof MOCK_OCCUPANCY }> = ({ data }) => (
  <DashboardCard title="Ward Occupancy">
    <div className="space-y-4">
      {data.map(({ ward, percent, color }) => (
        <React.Fragment key={ward}>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">{ward}</span>
            <span className="text-sm font-medium text-gray-900">{percent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`bg-${color}-600 h-2.5 rounded-full`} style={{ width: `${percent}%` }}></div>
          </div>
        </React.Fragment>
      ))}
    </div>
    <Link to="/organization/wards" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
      View Detailed Report
    </Link>
  </DashboardCard>
);

const Notifications: React.FC<{ notifications: typeof MOCK_NOTIFICATIONS }> = ({ notifications }) => (
  <DashboardCard title="Notifications">
    <div className="space-y-3">
      {notifications.map((n, idx) => (
        <div key={idx} className={
          `p-3 rounded border-l-4 ` +
          (n.level === 'urgent' ? 'bg-red-50 border-red-400' :
           n.level === 'warning' ? 'bg-yellow-50 border-yellow-400' :
           'bg-blue-50 border-blue-400')
        }>
          <div className="flex items-center">
            <span className={
              'material-icons mr-2 ' +
              (n.level === 'urgent' ? 'text-red-500' :
               n.level === 'warning' ? 'text-yellow-500' :
               'text-blue-500')
            }>
              {n.level === 'urgent' ? 'priority_high' : n.level === 'warning' ? 'warning' : 'info'}
            </span>
            <div>
              <p className={
                'text-sm font-medium ' +
                (n.level === 'urgent' ? 'text-red-800' :
                 n.level === 'warning' ? 'text-yellow-800' :
                 'text-blue-800')
              }>{n.title}</p>
              <p className={
                'text-xs ' +
                (n.level === 'urgent' ? 'text-red-700' :
                 n.level === 'warning' ? 'text-yellow-700' :
                 'text-blue-700')
              }>{n.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-3 flex justify-end">
      <button className="text-blue-600 text-sm hover:underline flex items-center">
        <span className="material-icons text-sm mr-1">mark_email_read</span>
        Mark all as read
      </button>
    </div>
  </DashboardCard>
);

interface Admission {
  id: number;
  admission_id: string;
  patient_name: string;
  admission_date: string;
  status: string;
  department_name: string;
  priority: string;
}

const RecentAdmissions: React.FC<{ admissions: Admission[] }> = ({ admissions }) => {
  // Format date to display time since admission
  const formatTimeSince = (dateString: string) => {
    const now = new Date();
    const admissionDate = new Date(dateString);
    const diffHours = Math.floor((now.getTime() - admissionDate.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return admissionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffHours < 48) {
      return 'Yesterday';
    } else {
      return `${Math.floor(diffHours / 24)}d ago`;
    }
  };

  // Get status display and color
  const getStatusInfo = (status: string, priority: string) => {
    if (priority.toLowerCase() === 'emergency') {
      return { text: 'Emergency', className: 'bg-red-100 text-red-800' };
    } else if (status.toLowerCase() === 'admitted') {
      return { text: 'Admitted', className: 'bg-blue-100 text-blue-800' };
    } else if (status.toLowerCase() === 'discharged') {
      return { text: 'Discharged', className: 'bg-green-100 text-green-800' };
    } else {
      return { text: status, className: 'bg-gray-100 text-gray-800' };
    }
  };

  // Sort admissions by date (newest first)
  const sortedAdmissions = [...admissions].sort((a, b) => 
    new Date(b.admission_date).getTime() - new Date(a.admission_date).getTime()
  );

  return (
    <DashboardCard title="Recent Admissions">
      <div className="overflow-hidden">
        {sortedAdmissions.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No recent admissions found
          </div>
        ) : (
          <ul className="space-y-3 text-sm">
            {sortedAdmissions.slice(0, 5).map((admission) => {
              const statusInfo = getStatusInfo(admission.status, admission.priority);
              return (
                <li key={admission.admission_id} className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="flex items-center">
                    <span className="material-icons text-blue-500 mr-2 text-sm">person</span>
                    <div>
                      <div className="font-medium">{admission.patient_name}</div>
                      <div className="text-xs text-gray-500">{admission.department_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-3 mt-1 sm:mt-0">
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {formatTimeSince(admission.admission_date)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.className}`}>
                      {statusInfo.text}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Link to="/organization/admissions" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
        View All Admissions
      </Link>
    </DashboardCard>
  );
};

const SurgeryOverview: React.FC<{ overview: typeof MOCK_SURGERY_OVERVIEW }> = ({ overview }) => (
  <DashboardCard title="Today's Surgery Overview">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-lg font-semibold text-center">{overview.scheduled}</p>
        <p className="text-xs text-center">Total Scheduled</p>
      </div>
      <div className="bg-green-50 p-3 rounded-lg">
        <p className="text-lg font-semibold text-green-600 text-center">{overview.completed}</p>
        <p className="text-xs text-center">Completed</p>
      </div>
      <div className="bg-yellow-50 p-3 rounded-lg">
        <p className="text-lg font-semibold text-yellow-600 text-center">{overview.inProgress}</p>
        <p className="text-xs text-center">In Progress</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-lg font-semibold text-blue-600 text-center">{overview.upcoming}</p>
        <p className="text-xs text-center">Upcoming</p>
      </div>
    </div>

    <div className="space-y-3">
      <div className="text-sm font-medium">Next scheduled:</div>
      <div className="p-3 bg-blue-50 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center">
          <span className="material-icons text-blue-500 mr-2">schedule</span>
          <div>
            <p className="text-sm font-medium">{overview.next.procedure}</p>
            <p className="text-xs text-gray-600">{overview.next.time}</p>
          </div>
        </div>
        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-2 sm:mt-0 inline-block sm:inline">
          {overview.next.doctor}
        </span>
      </div>
    </div>

    <Link to="/organization/surgery-schedule" className="text-blue-600 hover:underline text-sm mt-4 inline-block">View Full Schedule</Link>
  </DashboardCard>
);

// --- Hospital Dashboard Main Component ---
interface HospitalDashboardProps {
  userData: UserData; // Pass user data including hospital info
}

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ userData }) => {
  // Get admission data from the API
  const { admissions } = useAdmissionData();
  const { staff, loading: staffLoading, error: staffError } = useStaffData();
  const availableStaff = staff.filter(member => member.availability_status?.is_available);
  
  // Use INITIAL_STATS instead of MOCK_STATS
  const stats = INITIAL_STATS;
  
  // Use the registration stats hook
  const registrationStats = useRegistrationStats();
  
  // Use the department stats hook with enhanced error handling
  const { 
    stats: departmentStats, 
    loading: departmentLoading, 
    error: departmentError,
    refetch: refetchDepartmentStats
  } = useDepartmentStats();
  
  // Enhanced debugging
  React.useEffect(() => {
    console.log('🏥 Hospital Dashboard Auth Debug:', {
      userDataAvailable: !!userData,
      userRole: userData?.role,
      hospitalId: userData?.hospital?.id,
      hospitalName: userData?.hospital?.name,
    });
    
    console.log('🏥 Department Stats Debug:', {
      departmentStats,
      departmentLoading,
      departmentError,
    });
  }, [userData, departmentStats, departmentLoading, departmentError]);
  
  // Unified loading state - wait for critical data
  const [isDataReady, setIsDataReady] = React.useState(false);
  
  React.useEffect(() => {
    // Enhanced debug logging
    console.log('🏥 Dashboard State Check:', {
      departmentLoading,
      staffLoading,
      staffError,
      userData: !!userData,
      departmentStats: !!departmentStats,
      departmentError,
    });

    // More lenient data ready check - don't wait for everything
    const criticalDataReady = !departmentLoading || departmentStats !== null;
    
    if (criticalDataReady && userData) {
      console.log('🏥 Setting dashboard as ready!');
      // Immediate update - no delay needed since data is already loaded
      setIsDataReady(true);
    }
  }, [departmentLoading, staffLoading, staffError, userData, departmentStats]);

  // Add error recovery mechanism - NO MORE REFRESH!
  const retryDataLoading = React.useCallback(() => {
    console.log('🔄 Retrying data loading WITHOUT refresh...');
    setIsDataReady(false);
    
    // Just retry the data fetch, don't refresh the page
    if (refetchDepartmentStats) {
      refetchDepartmentStats();
    }
    
    // Reset the data ready state after a short delay
    setTimeout(() => {
      setIsDataReady(true);
    }, 1000);
  }, [refetchDepartmentStats]);
  
  // If user data is not available, show loading state
  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hospital data...</p>
        </div>
      </div>
    );
  }

  // Show loading until critical data is ready
  if (!isDataReady && !departmentStats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading dashboard data...</p>
          <p className="mt-2 text-gray-500 text-sm">This may take a few moments</p>
          
          {/* Show debug info for data loading issues */}
          {departmentError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
              <p className="text-red-600 text-sm font-medium">Data Loading Error:</p>
              <p className="text-red-500 text-xs mt-1">{departmentError}</p>
              <button
                onClick={retryDataLoading}
                className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Retry Loading
              </button>
            </div>
          )}
          
          {/* Show what data we have */}
          <div className="mt-4 text-xs text-gray-500">
            Debug: Departments loaded: {departmentStats ? 'Yes' : 'No'}, 
            Loading: {departmentLoading ? 'Yes' : 'No'},
            Error: {departmentError || 'None'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">{/* Improved spacing and removed debug box */}
      {/* Hospital Stats - Enhanced */}
      <HospitalStats 
        stats={stats} 
        departmentStats={departmentStats}
        loading={departmentLoading}
        error={departmentError}
      />

      {/* Charts and Notifications Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <TrendsChart 
            departmentStats={departmentStats}
            loading={departmentLoading}
            error={departmentError}
          />
        </div>
        <div className="xl:col-span-1">
          <Notifications notifications={MOCK_NOTIFICATIONS} />
        </div>
      </div>

      {/* Main Content Grid - Enhanced responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Column 1 - Quick Links and Occupancy */}
        <div className="space-y-6">
          <HospitalQuickLinks />
          <OccupancyChart data={MOCK_OCCUPANCY} />
        </div>
        
        {/* Column 2 - Admissions and Surgery */}
        <div className="space-y-6">
          <RecentAdmissions admissions={admissions} />
          <SurgeryOverview overview={MOCK_SURGERY_OVERVIEW} />
        </div>
        
        {/* Column 3 - Activities and Staff */}
        <div className="lg:col-span-2 xl:col-span-1 space-y-6">
          <RecentActivities activities={MOCK_ACTIVITIES} />
          <div>
            {staffLoading ? (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">Staff On Duty</h2>
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading staff data...</p>
                </div>
              </div>
            ) : staffError ? (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">Staff On Duty</h2>
                <div className="text-center py-4 text-red-500">
                  <p>Error loading staff data</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : availableStaff.length > 0 ? (
              <StaffOnDuty staff={availableStaff} />
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">Staff On Duty</h2>
                <div className="text-center py-4 text-gray-500">
                  <span className="material-icons text-4xl text-gray-300 mb-2">people_outline</span>
                  <p>No staff members currently on duty</p>
                </div>
              </div>
            )}
            <div className="mt-4 text-sm text-right">
              <Link to="/organization/staff" className="text-blue-600 hover:underline">
                View all staff ({staff.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
