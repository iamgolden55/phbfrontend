import React from 'react';
import { UserData } from '../organizationAuthContext';
import { 
  makeStyles,
  shorthands,
  tokens,
  Text,
  ProgressBar,
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent,
} from '@fluentui/react-components';
import { 
  People24Regular,
  Bed24Regular,
  Badge24Regular,
  CalendarLtr24Regular,
  Heart24Regular,
  PersonAdd24Regular,
  Alert24Regular,
  ChartMultiple24Regular,
  Stethoscope24Regular,
  Box24Regular,
  CheckmarkCircle24Regular,
  DataUsage24Regular,
} from '@fluentui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { FluentCard } from '../../../components/fluent/FluentCard';
import { FluentStatCard } from '../../../components/fluent/FluentStatCard';
import { FluentNotificationList, Notification } from '../../../components/fluent/FluentNotificationCard';
import { FluentQuickActionsGrid } from '../../../components/fluent/FluentQuickAction';
import { useRegistrationStats } from '../../../hooks/useRegistrationStats';
import { useDepartmentStats } from '../../../hooks/useDepartmentStats';
import { useAdmissionData } from '../../../hooks/useAdmissionData';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXL,
  },
  
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalL,
    
    '@media (max-width: 1200px)': {
      gridTemplateColumns: '1fr',
    },
  },
  
  chartContainer: {
    height: '300px',
    width: '100%',
  },
  
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground1,
    marginBottom: tokens.spacingVerticalS,
    transition: 'all 0.2s ease',
    
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: 'translateX(4px)',
    },
  },
  
  sectionTitle: {
    marginBottom: tokens.spacingVerticalM,
  },
  
  badge: {
    marginLeft: tokens.spacingHorizontalS,
  },
  
  progressSection: {
    marginTop: tokens.spacingVerticalM,
  },
  
  tabContent: {
    paddingTop: tokens.spacingVerticalL,
  },
});

interface FluentHospitalDashboardProps {
  userData: UserData;
}

const FluentHospitalDashboard: React.FC<FluentHospitalDashboardProps> = ({ userData }) => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState<string>('overview');
  
  // Hooks for data - same as original dashboard
  const { pending, approved } = useRegistrationStats();
  const { stats: departmentStats, loading: deptLoading, error: deptError } = useDepartmentStats();
  const { admissions, loading: admissionsLoading } = useAdmissionData();
  
  // Calculate data using same logic as original dashboard
  const activePatients = React.useMemo(() => {
    return admissions.filter(adm => adm.status.toLowerCase() === 'admitted').length;
  }, [admissions]);
  
  // Bed utilization calculation (occupied percentage, not available)
  const bedUtilization = React.useMemo(() => {
    if (!departmentStats) return null;
    return {
      available: departmentStats.availableBeds,
      total: departmentStats.totalBeds,
      occupied: departmentStats.totalBeds - departmentStats.availableBeds,
      utilization: departmentStats.overallBedUtilization, // This is the occupied percentage
    };
  }, [departmentStats]);
  
  // Mock notifications
  const notifications: Notification[] = [
    { 
      id: '1', 
      level: 'urgent', 
      title: 'Low Blood Supply', 
      description: 'Type O- blood critically low. Contact blood bank immediately.',
      timestamp: '5 minutes ago'
    },
    { 
      id: '2', 
      level: 'warning', 
      title: 'Staffing Alert', 
      description: 'Night shift nurses needed for tomorrow in ICU and Emergency.',
      timestamp: '1 hour ago'
    },
    { 
      id: '3', 
      level: 'info', 
      title: 'System Maintenance', 
      description: 'Scheduled maintenance tonight from 2-4 AM. Services may be interrupted.',
      timestamp: '2 hours ago'
    },
    {
      id: '4',
      level: 'success',
      title: 'Accreditation Renewed',
      description: 'Hospital accreditation successfully renewed for another 3 years.',
      timestamp: '1 day ago'
    },
  ];
  
  // Quick actions data
  const quickActions = [
    {
      icon: <PersonAdd24Regular />,
      label: 'Patient Admissions',
      description: 'Manage new patient admissions',
      path: '/organization/admissions',
    },
    {
      icon: <People24Regular />,
      label: 'User Registrations',
      description: `${pending} pending approvals`,
      path: '/organization/user-registrations',
      badge: pending > 0 ? pending : undefined,
      highlighted: pending > 0,
    },
    {
      icon: <CalendarLtr24Regular />,
      label: 'Surgery Schedule',
      description: 'View and manage surgeries',
      path: '/organization/surgery-schedule',
    },
    {
      icon: <Bed24Regular />,
      label: 'Ward Management',
      description: 'Manage departments and beds',
      path: '/organization/wards',
    },
    {
      icon: <Badge24Regular />,
      label: 'Staff Roster',
      description: 'View staff schedules',
      path: '/organization/staff-roster',
    },
    {
      icon: <ChartMultiple24Regular />,
      label: 'Analytics',
      description: 'View detailed reports',
      path: '/organization/analytics',
    },
  ];
  
  // Chart data
  const weeklyTrendData = [
    { day: 'Mon', patients: 245, admissions: 32, discharges: 28 },
    { day: 'Tue', patients: 252, admissions: 35, discharges: 30 },
    { day: 'Wed', patients: 248, admissions: 30, discharges: 34 },
    { day: 'Thu', patients: 255, admissions: 38, discharges: 31 },
    { day: 'Fri', patients: 260, admissions: 40, discharges: 35 },
    { day: 'Sat', patients: 258, admissions: 28, discharges: 30 },
    { day: 'Sun', patients: 262, admissions: 32, discharges: 28 },
  ];
  
  const departmentOccupancy = [
    { name: 'General Ward', value: 82, color: tokens.colorPaletteBlueForeground1 },
    { name: 'ICU', value: 65, color: tokens.colorPaletteGreenForeground1 },
    { name: 'Pediatrics', value: 45, color: tokens.colorPalettePurpleForeground1 },
    { name: 'Maternity', value: 90, color: tokens.colorPaletteOrangeForeground1 },
    { name: 'Emergency', value: 78, color: tokens.colorPaletteRedForeground1 },
  ];
  
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as string);
  };

  return (
    <div className={styles.root}>
      {/* Stats Grid */}
      <motion.div 
        className={styles.statsGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FluentStatCard
          icon={<People24Regular style={{ fontSize: '24px', color: tokens.colorNeutralForegroundOnBrand }} />}
          label="Active Admitted Patients"
          value={activePatients}
          trend="down"
          trendValue={`${Math.round((activePatients / Math.max(1, bedUtilization?.total || 1)) * 100)}% capacity`}
          footer="View all patients"
          onClick={() => {}}
          loading={admissionsLoading}
        />
        
        <FluentStatCard
          icon={<Bed24Regular style={{ fontSize: '24px', color: tokens.colorNeutralForegroundOnBrand }} />}
          label="Available Beds"
          value={bedUtilization ? `${bedUtilization.available} / ${bedUtilization.total}` : '...'}
          trend="stable"
          trendValue={bedUtilization ? `${bedUtilization.available} beds ready` : '...'}
          footer="Manage beds"
          onClick={() => {}}
          loading={deptLoading}
        />
        
        <FluentStatCard
          icon={<DataUsage24Regular style={{ fontSize: '24px', color: tokens.colorNeutralForegroundOnBrand }} />}
          label="Bed Utilization"
          value={bedUtilization ? `${bedUtilization.utilization.toFixed(1)}%` : '...'}
          trend={bedUtilization && bedUtilization.utilization > 80 ? 'up' : 'stable'}
          trendValue="occupied"
          footer={bedUtilization ? `${bedUtilization.occupied} occupied` : '...'}
          onClick={() => {}}
          loading={deptLoading}
        />
        
        <FluentStatCard
          icon={<Badge24Regular style={{ fontSize: '24px', color: tokens.colorNeutralForegroundOnBrand }} />}
          label="Staff On Duty"
          value={departmentStats?.totalStaff || 0}
          trend="stable"
          trendValue="On Duty"
          footer="Across all departments"
          onClick={() => {}}
          loading={deptLoading}
        />
        
        <FluentStatCard
          icon={<CheckmarkCircle24Regular style={{ fontSize: '24px', color: tokens.colorNeutralForegroundOnBrand }} />}
          label="Approved Registrations"
          value={approved || 0}
          trend="up"
          trendValue="New"
          footer="View all registrations →"
          onClick={() => {}}
          loading={false}
        />
      </motion.div>

      {/* Tabs for different views */}
      <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
        <Tab value="overview">Overview</Tab>
        <Tab value="operations">Operations</Tab>
        <Tab value="analytics">Analytics</Tab>
      </TabList>

      <div className={styles.tabContent}>
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.mainGrid}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
                  {/* Quick Actions */}
                  <FluentCard title="Quick Actions">
                    <FluentQuickActionsGrid actions={quickActions} columns={1} />
                  </FluentCard>
                  
                  {/* Recent Activity */}
                  <FluentCard title="Recent Admissions">
                    {admissions.slice(0, 5).map((admission) => (
                      <div key={admission.id} className={styles.listItem}>
                        <div>
                          <Text weight="semibold">{admission.patient_name}</Text>
                          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                            {admission.department_name} • {new Date(admission.admission_date).toLocaleTimeString()}
                          </Text>
                        </div>
                        <Text size={200} style={{ 
                          color: admission.priority === 'emergency' 
                            ? tokens.colorPaletteRedForeground1 
                            : tokens.colorNeutralForeground2 
                        }}>
                          {admission.priority.toUpperCase()}
                        </Text>
                      </div>
                    ))}
                    <Link 
                      to="/organization/admissions" 
                      style={{ 
                        color: tokens.colorBrandForeground1,
                        textDecoration: 'none',
                        fontSize: tokens.fontSizeBase300,
                        marginTop: tokens.spacingVerticalS,
                        display: 'inline-block'
                      }}
                    >
                      View all admissions →
                    </Link>
                  </FluentCard>
                </div>
                
                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
                  {/* Notifications */}
                  <FluentCard 
                    title="Notifications" 
                    headerAction={
                      <Text size={200} style={{ color: tokens.colorBrandForeground1, cursor: 'pointer' }}>
                        Mark all as read
                      </Text>
                    }
                  >
                    <FluentNotificationList 
                      notifications={notifications}
                      onDismiss={(id) => console.log('Dismiss:', id)}
                    />
                  </FluentCard>
                  
                  {/* Department Occupancy */}
                  <FluentCard title="Department Occupancy">
                    <div className={styles.chartContainer}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={departmentOccupancy}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {departmentOccupancy.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </FluentCard>
                </div>
              </div>
            </motion.div>
          )}
          
          {selectedTab === 'operations' && (
            <motion.div
              key="operations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.mainGrid}>
                <FluentCard title="Bed Utilization by Department">
                  {departmentStats?.departments.map((dept) => (
                    <div key={dept.id} className={styles.progressSection}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: tokens.spacingVerticalXS 
                      }}>
                        <Text size={300}>{dept.name}</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                          {dept.occupiedBeds}/{dept.totalBeds} beds
                        </Text>
                      </div>
                      <ProgressBar 
                        value={dept.occupiedBeds / dept.totalBeds} 
                        color={dept.utilizationRate > 0.9 ? 'error' : dept.utilizationRate > 0.7 ? 'warning' : 'success'}
                      />
                    </div>
                  ))}
                </FluentCard>
                
                <FluentCard title="Staff Distribution">
                  {departmentStats?.departments.map((dept) => (
                    <div key={dept.id} className={styles.listItem}>
                      <div>
                        <Text weight="semibold">{dept.name}</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                          Required: {dept.minimumStaff} • Current: {dept.currentStaff}
                        </Text>
                      </div>
                      {dept.isUnderstaffed && (
                        <Alert24Regular style={{ color: tokens.colorPaletteRedForeground1 }} />
                      )}
                    </div>
                  ))}
                </FluentCard>
              </div>
            </motion.div>
          )}
          
          {selectedTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FluentCard title="Weekly Patient Trends">
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyTrendData}>
                      <defs>
                        <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={tokens.colorBrandBackground} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={tokens.colorBrandBackground} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={tokens.colorPaletteGreenBackground2} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={tokens.colorPaletteGreenBackground2} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={tokens.colorNeutralStroke1} />
                      <XAxis dataKey="day" stroke={tokens.colorNeutralForeground3} />
                      <YAxis stroke={tokens.colorNeutralForeground3} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tokens.colorNeutralBackground1,
                          border: `1px solid ${tokens.colorNeutralStroke1}`,
                          borderRadius: tokens.borderRadiusMedium,
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="patients" 
                        stroke={tokens.colorBrandForeground1} 
                        fillOpacity={1} 
                        fill="url(#colorPatients)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="admissions" 
                        stroke={tokens.colorPaletteGreenForeground1} 
                        fillOpacity={1} 
                        fill="url(#colorAdmissions)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </FluentCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FluentHospitalDashboard;