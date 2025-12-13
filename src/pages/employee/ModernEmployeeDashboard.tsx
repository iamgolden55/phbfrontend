import React from 'react';
import { Helmet } from 'react-helmet';
import {
    ProfileCard,
    AttendanceCard,
    LeaveDetailsCard,
    LeaveBalanceCard,
    StatCardSmall,
    ProjectCard,
    TaskListItem
} from '../../components/organization/EmployeeWidgets';
import {
    Clock,
    CheckCircle,
    Calendar,
    AlertCircle
} from 'lucide-react';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';

const ModernEmployeeDashboard: React.FC = () => {
    const { userData } = useOrganizationAuth();

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Employee Dashboard | SmartHR</title>
            </Helmet>

            {/* Top Row: Profile, Leave Stats, Leave Balance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ProfileCard user={userData} />
                </div>
                <div className="lg:col-span-1">
                    <LeaveDetailsCard />
                </div>
                <div className="lg:col-span-1">
                    <LeaveBalanceCard />
                </div>
            </div>

            {/* Second Row: Attendance & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <AttendanceCard />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCardSmall
                            title="Total Hours Today"
                            value="8.36 / 9"
                            subtext="Target 9 hrs"
                            icon={Clock}
                            trend="15% by Yesterday"
                            trendUp={true}
                            color="bg-orange-50"
                        />
                        <StatCardSmall
                            title="Total Hours Week"
                            value="24.426 / 40"
                            subtext="Target 40 hrs"
                            icon={CheckCircle}
                            trend="15% by Last Week"
                            trendUp={true}
                            color="bg-green-50"
                        />
                        <StatCardSmall
                            title="Total Hours Month"
                            value="126 / 160"
                            subtext="Target 160 hrs"
                            icon={Calendar}
                            trend="21% by Last Month"
                            trendUp={false}
                            color="bg-blue-50"
                        />
                        <StatCardSmall
                            title="Overtime this Month"
                            value="16 / 28"
                            subtext="Target 28 hrs"
                            icon={AlertCircle}
                            trend="8% by Last Month"
                            trendUp={false}
                            color="bg-pink-50"
                        />
                    </div>

                    {/* Timeline / Working Hours Chart Placeholder */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-6 text-sm">
                                <div>
                                    <span className="text-gray-500 block text-xs">Total Working hours</span>
                                    <span className="font-bold text-gray-800">12h 36m</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block text-xs">Productive Hours</span>
                                    <span className="font-bold text-gray-800">08h 36m</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block text-xs">Break hours</span>
                                    <span className="font-bold text-gray-800">22m 15s</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block text-xs">Overtime</span>
                                    <span className="font-bold text-gray-800">02h 15m</span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Visualization Placeholder */}
                        <div className="h-12 w-full bg-gray-50 rounded-lg flex items-center px-2 relative overflow-hidden">
                            <div className="absolute left-0 h-full bg-green-500 w-[30%] opacity-20"></div>
                            <div className="absolute left-[30%] h-full bg-yellow-500 w-[10%] opacity-20"></div>
                            <div className="absolute left-[40%] h-full bg-green-500 w-[40%] opacity-20"></div>
                            <div className="w-full flex justify-between text-[10px] text-gray-400 z-10">
                                <span>08:00</span>
                                <span>10:00</span>
                                <span>12:00</span>
                                <span>14:00</span>
                                <span>16:00</span>
                                <span>18:00</span>
                            </div>
                            {/* Actual bars */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-[5%] w-[25%] h-2 bg-green-500 rounded-full"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[35%] w-[35%] h-2 bg-green-500 rounded-full"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-[15%] h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Row: Projects & Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Projects */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Projects</h3>
                        <button className="text-xs text-gray-500 flex items-center gap-1">
                            Ongoing Projects
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProjectCard
                            title="Office Management"
                            role="Project Leader"
                            deadline="14/01/2024"
                            tasksCompleted={6}
                            totalTasks={10}
                            timeSpent="65/120 Hrs"
                        />
                        <ProjectCard
                            title="Hospital Admin"
                            role="Project Leader"
                            deadline="20/02/2024"
                            tasksCompleted={3}
                            totalTasks={15}
                            timeSpent="25/150 Hrs"
                        />
                    </div>
                </div>

                {/* Tasks */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Tasks</h3>
                        <button className="text-xs text-gray-500">All Projects</button>
                    </div>
                    <div className="space-y-1">
                        <TaskListItem title="Patient appointment booking" status="OnHold" />
                        <TaskListItem title="Appointment booking with payment" status="InProgress" />
                        <TaskListItem title="Patient and Doctor video conferencing" status="Completed" />
                        <TaskListItem title="Private chat module" status="InProgress" />
                        <TaskListItem title="Go-Live and Post-Implementation" status="InProgress" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernEmployeeDashboard;
