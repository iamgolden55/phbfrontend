import React from 'react';
import {
    Clock,
    Calendar,
    Briefcase,
    CheckSquare,
    User,
    TrendingUp,
    MoreHorizontal,
    Play,
    Pause
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- Profile Card ---
export const ProfileCard: React.FC<{ user: any }> = ({ user }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {/* Placeholder for user image */}
                            <span className="text-2xl font-bold text-gray-700">{user?.full_name?.charAt(0) || 'E'}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{user?.full_name || 'Stephan Peralt'}</h3>
                        <p className="text-sm text-gray-500">{user?.role || 'Senior Product Designer'}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="space-y-3 mt-2 flex-1">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phone Number</span>
                    <span className="font-medium text-gray-800">+1 324 3453 545</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email Address</span>
                    <span className="font-medium text-gray-800">stephan.p@example.com</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Report Office</span>
                    <span className="font-medium text-gray-800">Doglas Martini</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Joined on</span>
                    <span className="font-medium text-gray-800">15 Jan 2024</span>
                </div>
            </div>
        </div>
    );
};

// --- Attendance Card ---
export const AttendanceCard: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Attendance</h3>
            <p className="text-lg font-bold text-gray-800 mb-6">08:35 AM, 11 Mar 2025</p>

            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                {/* Circular Progress Placeholder */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                <div className="text-center z-10">
                    <p className="text-xs text-gray-400">Total Hours</p>
                    <p className="text-xl font-bold text-gray-800">5:45:32</p>
                </div>
            </div>

            <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full mb-4">
                Production: 3.45 hrs
            </div>

            <p className="text-xs text-gray-500 mb-4">Punch In at 10:00 AM</p>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors shadow-lg shadow-orange-200">
                Punch Out
            </button>
        </div>
    );
};

// --- Leave Details Card ---
export const LeaveDetailsCard: React.FC = () => {
    const data = [
        { name: 'On Time', value: 1254, color: '#10B981' },
        { name: 'Late', value: 32, color: '#F59E0B' },
        { name: 'Absent', value: 14, color: '#EF4444' },
        { name: 'Sick Leave', value: 68, color: '#6366F1' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Leave Details</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">2025</span>
            </div>

            <div className="flex items-center">
                <div className="flex-1 space-y-3">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="font-bold text-gray-800">{item.value}</span>
                            <span className="text-gray-500">{item.name}</span>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-green-500 font-bold">Better</span> than 85% of Employees
                    </div>
                </div>

                <div className="w-32 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// --- Leave Balance Card ---
export const LeaveBalanceCard: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Leave Details</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">2024</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Total Leaves</p>
                    <p className="text-xl font-bold text-gray-800">16</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Taken</p>
                    <p className="text-xl font-bold text-gray-800">10</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Absent</p>
                    <p className="text-xl font-bold text-gray-800">2</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Request</p>
                    <p className="text-xl font-bold text-gray-800">0</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4 text-sm">
                <div>
                    <p className="text-gray-500 text-xs">Worked Days</p>
                    <p className="font-bold text-gray-800">240</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs">Loss of Pay</p>
                    <p className="font-bold text-gray-800">2</p>
                </div>
            </div>

            <button className="mt-auto w-full bg-gray-900 hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                Apply New Leave
            </button>
        </div>
    );
};

// --- Stat Card Small ---
export const StatCardSmall: React.FC<{
    title: string;
    value: string;
    subtext: string;
    icon: any;
    trend: string;
    trendUp: boolean;
    color: string;
}> = ({ title, value, subtext, icon: Icon, trend, trendUp, color }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                    <p className="text-xs text-gray-500">{subtext}</p>
                </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs">
                <span className={trendUp ? 'text-green-500' : 'text-red-500'}>
                    {trend}
                </span>
                <span className="text-gray-400">{title}</span>
            </div>
        </div>
    );
};

// --- Project Card ---
export const ProjectCard: React.FC<{
    title: string;
    role: string;
    deadline: string;
    tasksCompleted: number;
    totalTasks: number;
    timeSpent: string;
}> = ({ title, role, deadline, tasksCompleted, totalTasks, timeSpent }) => {
    const progress = (tasksCompleted / totalTasks) * 100;

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                <MoreHorizontal size={16} className="text-gray-400" />
            </div>

            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div>
                    <p className="text-xs font-bold text-gray-700">Anthony Lewis</p>
                    <p className="text-[10px] text-gray-500">{role}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Calendar size={12} />
                <span>{deadline}</span>
                <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Deadline</span>
            </div>

            <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Tasks: {tasksCompleted}/{totalTasks}</span>
                    <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500 border border-white"></div>
                        <div className="w-4 h-4 rounded-full bg-green-500 border border-white"></div>
                    </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                <span className="text-xs text-gray-600">Time Spent</span>
                <span className="text-xs font-bold text-blue-600">{timeSpent}</span>
            </div>
        </div>
    );
};

// --- Task List Item ---
export const TaskListItem: React.FC<{
    title: string;
    status: 'OnHold' | 'InProgress' | 'Completed';
}> = ({ title, status }) => {
    const statusColors = {
        OnHold: 'bg-red-100 text-red-600',
        InProgress: 'bg-purple-100 text-purple-600',
        Completed: 'bg-green-100 text-green-600'
    };

    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center">
                    {status === 'Completed' && <div className="w-2 h-2 bg-green-500 rounded-sm"></div>}
                </div>
                <span className={`text-sm ${status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{title}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[status]}`}>
                    {status}
                </span>
                <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-gray-200 border border-white"></div>
                    <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                </div>
            </div>
        </div>
    );
};
