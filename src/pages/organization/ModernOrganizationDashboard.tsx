import React from 'react';
import { Helmet } from 'react-helmet';
import Joyride, { STATUS } from 'react-joyride';
import { useDashboardTour } from '../../features/organization/hooks/useDashboardTour';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import { useOrganizationDashboardStats } from '../../hooks/useOrganizationDashboardStats';
import {
    StatCard,
    EmployeeStatusChart,
    AttendanceChart,
    DepartmentChart,
    ListCard,
    ChartCard,
    ListItem
} from '../../components/organization/DashboardWidgets';
import { useNavigate } from 'react-router-dom';
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
    Heart,
    Building2
} from 'lucide-react';

const ModernOrganizationDashboard: React.FC = () => {
    const { userData } = useOrganizationAuth();
    const stats = useOrganizationDashboardStats();
    const { run, steps, handleTourFinish } = useDashboardTour();
    const navigate = useNavigate();

    // Recent Admissions List Adapter
    const recentAdmissionsList: ListItem[] = stats.hospital?.recentAdmissionList?.map(adm => ({
        id: adm.id,
        title: adm.patient_name,
        subtitle: `${adm.department_name} • ${adm.status}`,
        rightContent: <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">
            {new Date(adm.admission_date).toLocaleDateString()}
        </span>,
        // Optional: Add image/avatar logic if available
    })) || [];

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
    const leaveRequests = 0; // Set to 0 as backend API is not yet available

    return (
        <div className="space-y-6">
            <Helmet>
                <title>{stats.organizationName} Dashboard | PHB</title>
            </Helmet>

            <Joyride
                steps={steps}
                run={run}
                continuous
                showProgress
                showSkipButton
                scrollToFirstStep
                scrollOffset={150}
                disableScrollParentFix={true}
                styles={{
                    options: {
                        primaryColor: '#2563eb',
                        zIndex: 1000,
                        arrowColor: '#fff',
                        backgroundColor: '#fff',
                        overlayColor: 'rgba(0, 0, 0, 0.5)',
                        textColor: '#374151',
                        width: 400,
                    },
                    tooltip: {
                        fontSize: '14px',
                        borderRadius: '16px',
                        padding: '20px',
                    },
                    buttonNext: {
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '8px 16px',
                    },
                    buttonBack: {
                        color: '#6b7280',
                        fontSize: '13px',
                        marginRight: '10px',
                    }
                }}
                callback={(data) => {
                    const { status } = data;
                    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
                        handleTourFinish();
                    }
                }}
            />

            {/* Critical Alerts Banner (Premium Redesign) */}
            {stats.hospital && stats.hospital.criticalAlertCount > 0 && (
                <div data-tour="critical-alerts" className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertCircle className="w-32 h-32 text-red-500 -mr-10 -mt-10" />
                    </div>
                    <div className="relative z-10 p-5 flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red-100/80 text-red-600 ring-4 ring-white/50">
                                <AlertCircle className="h-6 w-6 animate-pulse" />
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                Critical Attention Required
                                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider border border-red-200">Urgent</span>
                            </h3>
                            <div className="mt-2 space-y-1">
                                {stats.hospital.hasLowBedAvailability && (
                                    <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                        Low bed availability: Only <span className="font-bold underline">{stats.hospital.availableBeds} beds</span> remaining.
                                    </p>
                                )}
                                {stats.hospital.hasUnderstaffedDepartments && (
                                    <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                        Staffing Alert: <span className="font-bold underline">{stats.hospital.understaffedDepartments} departments</span> are currently understaffed.
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/organization/departments')}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-red-600 text-sm font-semibold rounded-lg border border-red-100 shadow-sm hover:bg-red-50 transition-colors"
                        >
                            View Details <TrendingUp size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Welcome Section (Premium Redesign) */}
            <div data-tour="welcome-actions" className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm border border-white/60 ring-1 ring-black/5 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gradient-to-bl from-blue-100/50 to-purple-100/50 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-gradient-to-tr from-orange-100/50 to-pink-100/50 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-xs font-semibold mb-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        System Online
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{stats.userFullName}</span>
                        <span className="ml-2 text-2xl">👋</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg max-w-xl">
                        {pendingCount > 0 ? (
                            <>
                                Action items pending: <span className="font-semibold text-gray-800">{pendingCount} Approvals</span>
                                {leaveRequests > 0 && <span className="mx-2 text-gray-300">|</span>}
                                {leaveRequests > 0 && <span className="font-semibold text-gray-800">{leaveRequests} Leave Requests</span>}
                            </>
                        ) : (
                            "You're all caught up! Great job keeping the dashboard clean."
                        )}
                    </p>
                    <p className="text-sm font-medium text-blue-600/80 mt-3 flex items-center gap-2">
                        <Building2 size={14} />
                        {stats.organizationName}
                    </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-3 justify-center md:justify-end">
                    <button
                        onClick={() => navigate('/organization/roster')}
                        className="group px-5 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <Clock size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                        Add Schedule
                    </button>
                    <button
                        onClick={() => navigate('/organization/staff')}
                        className="group px-5 py-3 bg-white text-gray-700 border border-gray-200 hover:border-orange-200 hover:bg-orange-50 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <FileText size={16} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                        Manage Requests
                        {leaveRequests > 0 && (
                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full ml-1 border border-orange-200">
                                {leaveRequests}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Stats Grid Row 1 - Hospital Specific */}
            {
                stats.hospital && (
                    <div data-tour="key-metrics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Patient Occupancy"
                            value={`${stats.hospital.activePatients}/${stats.hospital.totalBeds}`}
                            trend={stats.hospital.attendanceOverview.trend}
                            trendDirection={stats.hospital.attendanceOverview.percentage > 70 ? "up" : "down"}
                            icon={Users}
                            iconColor="text-orange-500"
                            bgColor="bg-orange-50"
                            onClick={() => navigate('/organization/admissions')}
                        />
                        <StatCard
                            title="Available Beds"
                            value={`${stats.hospital.availableBeds}`}
                            trend={`${stats.hospital.bedUtilization.toFixed(1)}% utilized`}
                            trendDirection={stats.hospital.bedUtilization > 80 ? "up" : "down"}
                            icon={Briefcase}
                            iconColor="text-blue-900"
                            bgColor="bg-blue-50"
                            onClick={() => navigate('/organization/departments')}
                        />
                        <StatCard
                            title="Active Departments"
                            value={`${stats.hospital.activeDepartments}/${stats.hospital.totalDepartments}`}
                            trend={stats.hospital.understaffedDepartments > 0 ? `${stats.hospital.understaffedDepartments} understaffed` : "All staffed"}
                            trendDirection={stats.hospital.understaffedDepartments > 0 ? "down" : "up"}
                            icon={Users}
                            iconColor="text-blue-500"
                            bgColor="bg-blue-50"
                            onClick={() => navigate('/organization/departments')}
                        />
                        <StatCard
                            title="Staff On Duty"
                            value={`${stats.hospital.staffOnDuty}`}
                            trend={`${stats.hospital.staffUtilization.toFixed(1)}% capacity`}
                            trendDirection="up"
                            icon={CheckSquare}
                            iconColor="text-pink-500"
                            bgColor="bg-pink-50"
                            onClick={() => navigate('/organization/staff')}
                        />
                    </div>
                )
            }

            {/* NGO Stats */}
            {
                stats.ngo && (
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
                )
            }

            {/* Pharmacy Stats */}
            {
                stats.pharmacy && (
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
                )
            }

            {/* Stats Grid Row 2 - Hospital Specific */}
            {
                stats.hospital && (
                    <div data-tour="department-stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="ICU Beds Available"
                            value={`${stats.hospital.availableICUBeds}/${stats.hospital.totalICUBeds}`}
                            trend={`${stats.hospital.occupiedICUBeds} occupied`}
                            trendDirection={stats.hospital.availableICUBeds < 5 ? "down" : "up"}
                            icon={Heart}
                            iconColor="text-purple-500"
                            bgColor="bg-purple-50"
                            onClick={() => navigate('/organization/departments')}
                        />
                        <StatCard
                            title="Recent Admissions"
                            value={stats.hospital.recentAdmissions.toString()}
                            trend={`${stats.hospital.emergencyAdmissions} emergency cases`}
                            trendDirection="up"
                            icon={TrendingUp}
                            iconColor="text-red-500"
                            bgColor="bg-red-50"
                            onClick={() => navigate('/organization/admissions')}
                        />
                        <StatCard
                            title="Pending Registrations"
                            value={stats.hospital.pendingRegistrations.toString()}
                            trend={`${stats.hospital.approvedRegistrations} approved`}
                            trendDirection="up"
                            icon={FileText}
                            iconColor="text-green-500"
                            bgColor="bg-green-50"
                            onClick={() => navigate('/organization/registration-approvals')}
                        />
                        <StatCard
                            title="Total Patients"
                            value={stats.hospital.totalPatients.toString()}
                            trend={`${stats.hospital.activePatients} currently admitted`}
                            trendDirection="up"
                            icon={UserPlus}
                            iconColor="text-gray-800"
                            bgColor="bg-gray-100"
                            onClick={() => navigate('/organization/patients')}
                        />
                    </div>
                )
            }

            {/* Charts Row */}
            <div data-tour="analytics-charts" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard
                    title="Staff Distribution"
                    action={
                        <button className="text-gray-400 hover:text-gray-600">
                            <Users size={18} />
                        </button>
                    }
                >
                    <EmployeeStatusChart data={stats.hospital?.staffDistribution} />
                </ChartCard>

                <ChartCard
                    title="Bed Occupancy"
                    action={
                        <button className="text-gray-400 hover:text-gray-600">
                            <Briefcase size={18} />
                        </button>
                    }
                >
                    <AttendanceChart data={stats.hospital?.bedOccupancy} />
                </ChartCard>

                <ChartCard
                    title="Employees By Department"
                    action={
                        <button className="text-gray-400 hover:text-gray-600">
                            <Calendar size={18} />
                        </button>
                    }
                >
                    <DepartmentChart data={stats.hospital?.departmentChartData} />
                </ChartCard>
            </div>

            {/* Bottom Row */}
            <div data-tour="daily-logs" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ListCard
                    title="Recent Admissions"
                    items={recentAdmissionsList}
                    action={
                        <div className="flex gap-2">
                            <button onClick={() => navigate('/organization/admissions')} className="text-xs border border-gray-200 hover:bg-gray-50 rounded px-2 py-1 text-gray-500 transition-colors">View All</button>
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
        </div >
    );
};

export default ModernOrganizationDashboard;
