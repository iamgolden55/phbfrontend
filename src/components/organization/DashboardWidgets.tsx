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
    onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    trend,
    trendDirection,
    icon: Icon,
    iconColor,
    bgColor,
    linkText = "View Details",
    onClick
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
            <button
                onClick={onClick}
                className="text-blue-600 text-xs font-medium hover:underline focus:outline-none"
            >
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
export const EmployeeStatusChart: React.FC<{ data?: any[] }> = ({ data }) => {
    const chartData = data || [];

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="text-2xl font-bold">{total}</span>
            </div>

            {/* Custom Bar Visualization */}
            <div className="flex h-4 rounded-full overflow-hidden mb-6 bg-gray-100">
                {total > 0 ? chartData.map((item, index) => (
                    <div
                        key={index}
                        style={{ width: `${(item.value / total) * 100}%`, backgroundColor: item.color }}
                        className="h-full"
                    />
                )) : (
                    <div className="h-full w-full bg-gray-200" />
                )}
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-4">
                {chartData.map((item, index) => (
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
export const AttendanceChart: React.FC<{ data?: any[] }> = ({ data }) => {
    const chartData = data || [];
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="relative h-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-2xl font-bold">{total}</p>
            </div>
        </div>
    );
};

// --- Department Chart ---
export const DepartmentChart: React.FC<{ data?: any[] }> = ({ data }) => {
    const chartData = data || [];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                layout="vertical"
                data={chartData}
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
export interface ListItem {
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
