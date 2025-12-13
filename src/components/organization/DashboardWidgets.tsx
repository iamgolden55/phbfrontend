import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import { ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';

// --- Stat Card Component ---
interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendDirection?: 'up' | 'down';
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
    linkText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    trend,
    trendDirection,
    icon: Icon,
    iconColor,
    bgColor,
    linkText = "View Details"
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${bgColor}`}>
                    <Icon className={iconColor} size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trendDirection === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        <span className="ml-1">{trend}</span>
                    </div>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 mb-4">{value}</p>
            <button className="text-blue-600 text-xs font-medium hover:underline">
                {linkText}
            </button>
        </div>
    );
};

// --- Chart Card Wrapper ---
interface ChartCardProps {
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, action, children }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {action}
            </div>
            <div className="h-64 w-full">
                {children}
            </div>
        </div>
    );
};

// --- Employee Status Chart ---
export const EmployeeStatusChart: React.FC = () => {
    const data = [
        { name: 'Fulltime', value: 112, color: '#F59E0B' },
        { name: 'Contract', value: 21, color: '#10B981' },
        { name: 'Probation', value: 12, color: '#EF4444' },
        { name: 'WFH', value: 4, color: '#EC4899' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">Total Employees</span>
                <span className="text-2xl font-bold">154</span>
            </div>

            {/* Custom Bar Visualization */}
            <div className="flex h-4 rounded-full overflow-hidden mb-6">
                {data.map((item, index) => (
                    <div
                        key={index}
                        style={{ width: `${(item.value / 149) * 100}%`, backgroundColor: item.color }}
                        className="h-full"
                    />
                ))}
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-4">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-gray-500">{item.name}</span>
                        </div>
                        <span className="text-lg font-bold ml-4">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Attendance Chart ---
export const AttendanceChart: React.FC = () => {
    const data = [
        { name: 'Early', value: 30, color: '#10B981' },
        { name: 'On Time', value: 50, color: '#F59E0B' },
        { name: 'Late', value: 10, color: '#EF4444' },
        { name: 'Absent', value: 10, color: '#3B82F6' },
    ];

    return (
        <div className="relative h-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
                <p className="text-xs text-gray-500">Total Attendance</p>
                <p className="text-2xl font-bold">120</p>
            </div>
        </div>
    );
};

// --- Department Chart ---
export const DepartmentChart: React.FC = () => {
    const data = [
        { name: 'UI/UX', value: 60 },
        { name: 'Dev', value: 85 },
        { name: 'Mgmt', value: 45 },
        { name: 'HR', value: 20 },
        { name: 'Test', value: 35 },
        { name: 'Mktg', value: 55 },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    width={40}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#F97316" radius={[0, 4, 4, 0]} barSize={10} />
            </BarChart>
        </ResponsiveContainer>
    );
};

// --- List Card Component ---
interface ListItem {
    id: string | number;
    title: string;
    subtitle?: string;
    image?: string;
    rightContent?: React.ReactNode;
    status?: 'active' | 'inactive' | 'pending';
}

interface ListCardProps {
    title: string;
    items: ListItem[];
    action?: React.ReactNode;
}

export const ListCard: React.FC<ListCardProps> = ({ title, items, action }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {action}
            </div>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {item.title.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                                {item.subtitle && <p className="text-xs text-gray-500">{item.subtitle}</p>}
                            </div>
                        </div>
                        <div>
                            {item.rightContent}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
