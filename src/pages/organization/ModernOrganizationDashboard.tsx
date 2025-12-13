import React from 'react';
import { Helmet } from 'react-helmet';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import { useOrganizationDashboardStats } from '../../hooks/useOrganizationDashboardStats';
import {
    StatCard,
    EmployeeStatusChart,
    AttendanceChart,
    DepartmentChart,
    ListCard,
    ChartCard
} from '../../components/organization/DashboardWidgets';
import {
    Users,
    Briefcase,
    CheckSquare,
    UserPlus,
    DollarSign,
    TrendingUp,
    FileText,
    Clock,
    Calendar,
    MoreHorizontal,
    HelpCircle,
    Settings,
    RefreshCw,
    Plus,
    AlertCircle,
    Heart
} from 'lucide-react';

const ModernOrganizationDashboard: React.FC = () => {
    const { userData } = useOrganizationAuth();
    const stats = useOrganizationDashboardStats();

    // Mock Data for Lists
    const clockInList = [
        {
            id: 1,
            title: 'Daniel Esbella',
            subtitle: 'UI/UX Designer',
            rightContent: <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">09:15 AM</span>
        },
        {
            id: 2,
            title: 'Doglas Martini',
            subtitle: 'Project Manager',
            rightContent: <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">09:30 AM</span>
        },
        {
            id: 3,
            title: 'Brian Villalobos',
            subtitle: 'PHP Developer',
            rightContent: <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">09:45 AM</span>
        },
    ];

    // Loading state
    if (stats.loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-blue-600 font-medium">Loading dashboard data...</p>
                    <p className="mt-2 text-gray-500 text-sm">Please wait a moment</p>
                </div>
            </div>
        );
    }

    // Error state
    if (stats.error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center bg-red-50 p-8 rounded-xl max-w-md">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
                    <p className="text-red-600 text-sm mb-4">{stats.error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Get pending counts based on organization type
    const pendingCount = stats.hospital?.pendingRegistrations || stats.hospital?.criticalAlertCount || 0;
    const leaveRequests = 14; // TODO: Add leave requests API when available

    return (
        <div className="space-y-6">
            <Helmet>
                <title>{stats.organizationName} Dashboard | PHB</title>
            </Helmet>

            {/* Critical Alerts Banner */}
            {stats.hospital && stats.hospital.criticalAlertCount > 0 && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-red-800">Critical Alerts</h3>
                        <p className="text-sm text-red-700 mt-1">
                            {stats.hospital.hasLowBedAvailability && `Low bed availability (${stats.hospital.availableBeds} beds). `}
                            {stats.hospital.hasUnderstaffedDepartments && `${stats.hospital.understaffedDepartments} departments understaffed.`}
                        </p>
                    </div>
                </div>
            )}

            {/* Welcome Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back, {stats.userFullName}!</h1>
                    <p className="text-gray-500 mt-1">
                        {pendingCount > 0 ? (
                            <>You have <span className="text-orange-500 font-medium">{pendingCount} Pending Approvals</span></>
                        ) : (
                            <>All caught up!</>
                        )}
                        {leaveRequests > 0 && <> & <span className="text-orange-500 font-medium">{leaveRequests} Leave Requests</span></>}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">{stats.organizationName}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                        Add Schedule
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                        Add Requests
                    </button>
                </div>
            </div>

            {/* Stats Grid Row 1 - Hospital Specific */}
            {stats.hospital && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Patient Occupancy"
                        value={`${stats.hospital.activePatients}/${stats.hospital.totalBeds}`}
                        trend={stats.hospital.attendanceOverview.trend}
                        trendDirection={stats.hospital.attendanceOverview.percentage > 70 ? "up" : "down"}
                        icon={Users}
                        iconColor="text-orange-500"
                        bgColor="bg-orange-50"
                    />
                    <StatCard
                        title="Available Beds"
                        value={`${stats.hospital.availableBeds}`}
                        trend={`${stats.hospital.bedUtilization.toFixed(1)}% utilized`}
                        trendDirection={stats.hospital.bedUtilization > 80 ? "up" : "down"}
                        icon={Briefcase}
                        iconColor="text-blue-900"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Active Departments"
                        value={`${stats.hospital.activeDepartments}/${stats.hospital.totalDepartments}`}
                        trend={stats.hospital.understaffedDepartments > 0 ? `${stats.hospital.understaffedDepartments} understaffed` : "All staffed"}
                        trendDirection={stats.hospital.understaffedDepartments > 0 ? "down" : "up"}
                        icon={Users}
                        iconColor="text-blue-500"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Staff On Duty"
                        value={`${stats.hospital.staffOnDuty}`}
                        trend={`${stats.hospital.staffUtilization.toFixed(1)}% capacity`}
                        trendDirection="up"
                        icon={CheckSquare}
                        iconColor="text-pink-500"
                        bgColor="bg-pink-50"
                    />
                </div>
            )}

            {/* NGO Stats */}
            {stats.ngo && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Active Programs"
                        value={stats.ngo.activePrograms.toString()}
                        trend="+2.1%"
                        trendDirection="up"
                        icon={Briefcase}
                        iconColor="text-orange-500"
                        bgColor="bg-orange-50"
                    />
                    <StatCard
                        title="Beneficiaries Reached"
                        value={stats.ngo.beneficiariesReached.toLocaleString()}
                        trend="+5.2%"
                        trendDirection="up"
                        icon={Users}
                        iconColor="text-blue-900"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Active Volunteers"
                        value={stats.ngo.activeVolunteers.toString()}
                        trend="+8.1%"
                        trendDirection="up"
                        icon={UserPlus}
                        iconColor="text-blue-500"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Funds Raised"
                        value={`$${stats.ngo.fundsRaised.toLocaleString()}`}
                        trend="+12.5%"
                        trendDirection="up"
                        icon={DollarSign}
                        iconColor="text-pink-500"
                        bgColor="bg-pink-50"
                    />
                </div>
            )}

            {/* Pharmacy Stats */}
            {stats.pharmacy && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Clinical Trials"
                        value={stats.pharmacy.activeClinicalTrials.toString()}
                        trend="+3.2%"
                        trendDirection="up"
                        icon={FileText}
                        iconColor="text-orange-500"
                        bgColor="bg-orange-50"
                    />
                    <StatCard
                        title="Products in Pipeline"
                        value={stats.pharmacy.productsInPipeline.toString()}
                        trend="+1.8%"
                        trendDirection="up"
                        icon={Briefcase}
                        iconColor="text-blue-900"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Pending Submissions"
                        value={stats.pharmacy.pendingSubmissions.toString()}
                        trend="-0.5%"
                        trendDirection="down"
                        icon={CheckSquare}
                        iconColor="text-blue-500"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Research Publications"
                        value={stats.pharmacy.researchPublications.toString()}
                        trend="+6.7%"
                        trendDirection="up"
                        icon={TrendingUp}
                        iconColor="text-pink-500"
                        bgColor="bg-pink-50"
                    />
                </div>
            )}

            {/* Stats Grid Row 2 - Hospital Specific */}
            {stats.hospital && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="ICU Beds Available"
                        value={`${stats.hospital.availableICUBeds}/${stats.hospital.totalICUBeds}`}
                        trend={`${stats.hospital.occupiedICUBeds} occupied`}
                        trendDirection={stats.hospital.availableICUBeds < 5 ? "down" : "up"}
                        icon={Heart}
                        iconColor="text-purple-500"
                        bgColor="bg-purple-50"
                    />
                    <StatCard
                        title="Recent Admissions"
                        value={stats.hospital.recentAdmissions.toString()}
                        trend={`${stats.hospital.emergencyAdmissions} emergency cases`}
                        trendDirection="up"
                        icon={TrendingUp}
                        iconColor="text-red-500"
                        bgColor="bg-red-50"
                    />
                    <StatCard
                        title="Pending Registrations"
                        value={stats.hospital.pendingRegistrations.toString()}
                        trend={`${stats.hospital.approvedRegistrations} approved`}
                        trendDirection="up"
                        icon={FileText}
                        iconColor="text-green-500"
                        bgColor="bg-green-50"
                    />
                    <StatCard
                        title="Total Patients"
                        value={stats.hospital.totalPatients.toString()}
                        trend={`${stats.hospital.activePatients} currently admitted`}
                        trendDirection="up"
                        icon={UserPlus}
                        iconColor="text-gray-800"
                        bgColor="bg-gray-100"
                    />
                </div>
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard
                    title="Employee Status"
                    action={
                        <button className="text-gray-400 hover:text-gray-600">
                            <Calendar size={18} />
                        </button>
                    }
                >
                    <EmployeeStatusChart />
                </ChartCard>

                <ChartCard
                    title="Attendance Overview"
                    action={
                        <button className="text-gray-400 hover:text-gray-600">
                            <Calendar size={18} />
                        </button>
                    }
                >
                    <AttendanceChart />
                </ChartCard>

                <ChartCard
                    title="Employees By Department"
                    action={
                        <button className="text-gray-400 hover:text-gray-600">
                            <Calendar size={18} />
                        </button>
                    }
                >
                    <DepartmentChart />
                </ChartCard>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ListCard
                    title="Clock-In/Out"
                    items={clockInList}
                    action={
                        <div className="flex gap-2">
                            <button className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-500">All Departments</button>
                            <button className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-500">Today</button>
                        </div>
                    }
                />
                {/* Placeholders for other lists to match grid */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex items-center justify-center text-gray-400">
                    More Widgets Coming Soon
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex items-center justify-center text-gray-400">
                    More Widgets Coming Soon
                </div>
            </div>
        </div>
    );
};

export default ModernOrganizationDashboard;
