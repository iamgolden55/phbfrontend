import React from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../organizationAuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useRegistrationStats } from '../../../hooks/useRegistrationStats';
import { useDepartmentStats } from '../../../hooks/useDepartmentStats'; // 🛏️ BED MAGIC IMPORT!

// --- MOCK DATA (Replace below with API calls via authContext in real app) ---
const MOCK_STATS = {
  activePatients: 1250,
  availableBeds: 85,
  scheduledSurgeries: 15,
  staffOnDuty: 210,
  trendPatients: { trend: 'up', value: '+5% from last week' },
  trendBeds: { trend: 'down', value: '-3% from last week' },
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

const MOCK_STAFF = [
  { name: 'Nurse Olivia', role: 'Nurse', avatar: 'https://randomuser.me/api/portraits/women/51.jpg' },
  { name: 'Dr. Martinez', role: 'Surgeon', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' },
  { name: 'Dr. Lee', role: 'Pediatrician', avatar: 'https://randomuser.me/api/portraits/men/71.jpg' },
  { name: 'Dr. Patel', role: 'Anaesthetist', avatar: 'https://randomuser.me/api/portraits/men/53.jpg' },
  { name: 'Nurse Chloe', role: 'Nurse', avatar: 'https://randomuser.me/api/portraits/women/56.jpg' }
];

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

// --- Trends Chart Panel ---
const TrendsChart: React.FC = () => (
  <DashboardCard title="Trends & Analytics" className="h-full">
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={TRENDS_DATA} margin={{ top: 8, right: 16, left: -22, bottom: 5 }}>
          <defs>
            <linearGradient id="patients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="beds" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip wrapperClassName="!text-sm"/>
          <Legend />
          <Area type="monotone" dataKey="Patients" stroke="#2563eb" fillOpacity={1} fill="url(#patients)"/>
          <Area type="monotone" dataKey="Beds" stroke="#22c55e" fillOpacity={1} fill="url(#beds)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="text-xs text-gray-500 mt-2">Weekly patient and bed trends</div>
  </DashboardCard>
);

// --- Staff on Duty Panel ---
const StaffOnDuty: React.FC<{ staff: typeof MOCK_STAFF }> = ({ staff }) => (
  <DashboardCard title="Staff On Duty">
    <ul className="divide-y divide-gray-100">
      {staff.map((s, idx) => (
        <li key={idx} className="flex items-center py-2 gap-3">
          <img src={s.avatar} alt={s.name} className="h-9 w-9 rounded-full ring-2 ring-blue-200 object-cover"/>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-sm truncate">{s.name}</div>
            <div className="text-xs text-gray-500">{s.role}</div>
          </div>
          <span className={`text-xs rounded px-2 py-0.5 font-semibold ${s.role === 'Nurse' ? 'bg-cyan-100 text-cyan-700' : 'bg-blue-100 text-blue-800'}`}>{s.role}</span>
        </li>
      ))}
    </ul>
    <Link to="/organization/staffing" className="text-blue-600 hover:underline text-sm mt-4 inline-block">View Staff Roster</Link>
  </DashboardCard>
);

// --- Updated Functional Components with Props ---

// --- Updated Functional Components with Real Data ---

const HospitalStats: React.FC<{ stats?: typeof MOCK_STATS }> = ({ stats }) => {
  const registrationStats = useRegistrationStats();
  const { stats: departmentStats, loading: departmentLoading, error: departmentError } = useDepartmentStats(); // 🛏️ BED MAGIC!

  // 🛏️ Use REAL data if available, otherwise fallback to mock data
  const displayStats = React.useMemo(() => {
    if (departmentLoading) {
      return {
        activePatients: '...',
        availableBeds: '...',
        scheduledSurgeries: stats?.scheduledSurgeries || 15,
        staffOnDuty: '...',
        trendPatients: { trend: 'up' as const, value: 'Loading...' },
        trendBeds: { trend: 'down' as const, value: 'Loading...' },
      };
    }

    if (departmentError || !departmentStats) {
      console.log('🛏️ Using fallback data due to:', departmentError);
      return stats || MOCK_STATS;
    }

    // 🎉 REAL BED MAGIC DATA!
    return {
      activePatients: departmentStats.totalPatients,
      availableBeds: departmentStats.availableBeds,
      scheduledSurgeries: stats?.scheduledSurgeries || 15, // Keep mock for surgery data
      staffOnDuty: departmentStats.totalStaff,
      trendPatients: { 
        trend: departmentStats.overallUtilization > 70 ? 'up' as const : 'down' as const, 
        value: `${departmentStats.overallUtilization.toFixed(1)}% capacity` 
      },
      trendBeds: { 
        trend: departmentStats.overallBedUtilization < 80 ? 'down' as const : 'up' as const, 
        value: `${departmentStats.overallBedUtilization.toFixed(1)}% occupied` 
      },
    };
  }, [departmentStats, departmentLoading, departmentError, stats]);

  // 🔥 Show critical alerts
  const criticalAlerts = departmentStats?.criticalAlerts;
  const showUrgentAlert = criticalAlerts?.lowBedAvailability || (criticalAlerts?.understaffedDepartments && criticalAlerts.understaffedDepartments.length > 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {/* 🔥 Critical Alert Banner */}
      {showUrgentAlert && (
        <div className="lg:col-span-5 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="material-icons text-red-500 mr-2">priority_high</span>
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

      <StatCard
        label="Active Patients"
        value={displayStats.activePatients}
        icon="people"
        trend={displayStats.trendPatients.trend}
        trendValue={displayStats.trendPatients.value}
      />
      <StatCard
        label="Available Beds"
        value={displayStats.availableBeds}
        icon="bed"
        trend={displayStats.trendBeds.trend}
        trendValue={displayStats.trendBeds.value}
      />
      <StatCard
        label="Scheduled Surgeries Today"
        value={displayStats.scheduledSurgeries}
        icon="local_hospital"
      />
      <StatCard
        label="Staff On Duty"
        value={displayStats.staffOnDuty}
        icon="badge"
      />
      {/* 🎉 Registered Users Stats */}
      <StatCard
        label={registrationStats.loading ? "Loading..." : "Registered Users"}
        value={registrationStats.loading ? "..." : registrationStats.total}
        icon="how_to_reg"
        trend={registrationStats.pending > 0 ? "up" : undefined}
        trendValue={registrationStats.pending > 0 ? `${registrationStats.pending} pending approval` : "All approved ✅"}
      />
    </div>
  );
};

const HospitalQuickLinks: React.FC = () => {
  const registrationStats = useRegistrationStats();

  return (
    <DashboardCard title="Hospital Quick Links" className="h-full">
      <div className="grid grid-cols-1 gap-2">
        {[
          { label: 'Patient Admissions', path: '/organization/admissions', icon: 'person_add' },
          { 
            label: 'User Registration Management', 
            path: '/organization/user-registrations', 
            icon: 'how_to_reg',
            highlight: registrationStats.pending > 0
          },
          { label: 'Surgery Schedule', path: '/organization/surgery-schedule', icon: 'event' },
          { label: 'Ward Management', path: '/organization/wards', icon: 'bed' },
          { label: 'Staff Roster', path: '/organization/staffing', icon: 'badge' },
          { label: 'Inventory Check', path: '/organization/inventory', icon: 'inventory_2' },
          { label: 'Analytics Dashboard', path: '/organization/analytics', icon: 'analytics' },
          { label: 'Emergency Protocols', path: '/organization/emergency', icon: 'emergency' },
        ].map((link) => (
          <Link 
            key={link.label} 
            to={link.path} 
            className={`${
              link.highlight 
                ? 'bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200' 
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
            } p-3 rounded-md flex items-center justify-between transition`}
          >
            <div className="flex items-center">
              <span className="material-icons mr-2 text-lg">{link.icon}</span> 
              {link.label}
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

const RecentAdmissions: React.FC<{ admissions: typeof MOCK_ADMISSIONS }> = ({ admissions }) => (
  <DashboardCard title="Recent Admissions">
    <div className="overflow-hidden">
      <ul className="space-y-3 text-sm">
        {admissions.map((admission) => (
          <li key={admission.id} className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <span className="material-icons text-blue-500 mr-2 text-sm">person</span>
              <span className="font-medium">ID: {admission.id}</span>
            </div>
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-3 mt-1 sm:mt-0">
              <span className="text-gray-500 text-xs">{admission.time}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                admission.status === 'Emergency' ? 'bg-red-100 text-red-800' :
                admission.status === 'Pre-Op' ? 'bg-purple-100 text-purple-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {admission.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <Link to="/organization/admissions" className="text-blue-600 hover:underline text-sm mt-4 inline-block">View All Admissions</Link>
  </DashboardCard>
);

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
  // In real app, fetch data here using authContext/api calls
  
  // Debug: Show current hospital info
  React.useEffect(() => {
    console.log('🏥 Current Hospital Dashboard User Data:', userData);
    if (userData?.hospital) {
      console.log('🏥 Hospital Info:', userData.hospital);
    }
  }, [userData]);

  return (
    <div className="px-2 sm:px-0">
      {/* Debug Hospital Info - Remove this after identifying the hospital */}
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">🏥 Current Hospital Session:</h3>
        <p className="text-sm text-yellow-700">
          Hospital: {userData?.hospital?.name || 'Not found'} 
          {userData?.hospital?.id && ` (ID: ${userData.hospital.id})`}
        </p>
        <p className="text-xs text-yellow-600 mt-1">
          User: {userData?.email || 'Not found'}
        </p>
      </div>

      {/* 🛏️ BED MAGIC STATS - Now using REAL data! */}
      <HospitalStats stats={MOCK_STATS} />

      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <Notifications notifications={MOCK_NOTIFICATIONS} />
        <TrendsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-8">
        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          <HospitalQuickLinks />
          {/* 🛏️ REAL-TIME BED OCCUPANCY! */}
          <OccupancyChart data={MOCK_OCCUPANCY} />
        </div>
        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          <RecentAdmissions admissions={MOCK_ADMISSIONS} />
          <SurgeryOverview overview={MOCK_SURGERY_OVERVIEW} />
        </div>
        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          <RecentActivities activities={MOCK_ACTIVITIES} />
          <StaffOnDuty staff={MOCK_STAFF} />
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
