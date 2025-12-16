import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Bell,
    Plus,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    ChevronDown,
    MoreHorizontal,
    Plane,
    Stethoscope,
    Baby,
    Palmtree,
    AlertCircle
} from 'lucide-react';

// --- Reusable Components ---
const DashboardCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-[30px] p-6 shadow-sm border border-slate-100 ${className}`}>
        {children}
    </div>
);

const Badge = ({ text, color = "blue" }: { text: string; color?: "blue" | "green" | "amber" | "violet" | "red" | "slate" }) => {
    const colors = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        amber: "bg-amber-100 text-amber-700",
        violet: "bg-violet-100 text-violet-600",
        red: "bg-red-100 text-red-600",
        slate: "bg-slate-100 text-slate-500",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${colors[color]}`}>
            {text}
        </span>
    );
};

// Unified Navigation Header custom
const PageHeader = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.includes(path);

    // Helper to check for exact match or general section
    const isExact = (path: string) => location.pathname === path;

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-8">
                <Link to="/employee/dashboard" className={`text-xl font-bold pb-1 transition-colors ${isExact('/employee/dashboard') ? 'border-b-2 border-slate-800 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    Overview
                </Link>
                <Link to="/employee/tasks" className={`text-xl font-bold pb-1 transition-colors ${isActive('/tasks') ? 'border-b-2 border-slate-800 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    Tasks
                </Link>
                <Link to="/employee/projects" className={`text-xl font-bold pb-1 transition-colors ${isActive('/projects') ? 'border-b-2 border-slate-800 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    Projects
                </Link>
                <Link to="/employee/workflows" className={`text-xl font-bold pb-1 transition-colors ${isActive('/workflows') ? 'border-b-2 border-slate-800 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    Workflows
                </Link>
                <Link to="/employee/integrations" className={`text-xl font-bold pb-1 transition-colors ${isActive('/integrations') ? 'border-b-2 border-slate-800 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    Integrations
                </Link>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-200 border-2 border-white ring-2 ring-slate-100">
                    JD
                </div>
            </div>
        </div>
    );
};

const EmployeeLeavesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('history');

    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>Leaves | SmartHR</title>
            </Helmet>

            <PageHeader />

            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Leave Management</h1>
                    <p className="text-slate-400 text-sm">Plan and manage your time off requests.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[20px] font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    <Plus size={18} /> Apply for Leave
                </button>
            </div>

            {/* Balance Cards: Credit Card Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Annual Leave", balance: 12, total: 15, color: "blue", icon: Palmtree, bg: "from-blue-500 to-blue-600" },
                    { title: "Medical Leave", balance: 8, total: 10, color: "emerald", icon: Stethoscope, bg: "from-emerald-500 to-emerald-600" },
                    { title: "Casual Leave", balance: 3, total: 5, color: "amber", icon: Coffee, bg: "from-amber-400 to-orange-500" },
                ].map((leave, idx) => (
                    <div key={idx} className={`relative overflow-hidden rounded-[30px] p-6 text-white bg-gradient-to-br ${leave.bg} shadow-lg group hover:scale-[1.02] transition-transform`}>
                        {/* Abstract Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black rounded-full opacity-10 blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 flex justify-between items-start mb-8">
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                                <leave.icon size={24} className="text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-80">{leave.title}</span>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-4xl font-bold mb-1">{leave.balance} <span className="text-lg opacity-60 font-medium">/ {leave.total}</span></h3>
                            <p className="text-xs opacity-70 mb-4">Days Available</p>

                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white rounded-full" style={{ width: `${(leave.balance / leave.total) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* History Table */}
            <DashboardCard className="!p-0 overflow-hidden min-h-[400px]">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">Request History</h3>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100/50 text-xs uppercase text-slate-400 font-bold tracking-wider">
                                <th className="px-6 py-4 pl-8 rounded-tl-[30px]">Type</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Days</th>
                                <th className="px-6 py-4">Reason</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 pr-8 rounded-tr-[30px]">Approved By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { type: 'Medical Leave', from: '2025-03-10', to: '2025-03-12', days: 3, reason: 'Viral Fever', status: 'Approved', by: 'Dr. Sarah Smith', icon: Stethoscope, color: "emerald" },
                                { type: 'Casual Leave', from: '2025-02-15', to: '2025-02-15', days: 1, reason: 'Personal errands', status: 'Approved', by: 'HR Manager', icon: Coffee, color: "amber" },
                                { type: 'Annual Leave', from: '2025-04-20', to: '2025-04-25', days: 5, reason: 'Family Vacation', status: 'Pending', by: '-', icon: Palmtree, color: "blue" },
                                { type: 'Medical Leave', from: '2025-01-05', to: '2025-01-06', days: 2, reason: 'Seasonal Flu', status: 'Rejected', by: 'Dr. Sarah Smith', icon: Stethoscope, color: "red" },
                            ].map((leave, i) => (
                                <tr key={i} className="group hover:bg-slate-50/80 transition-colors cursor-default">
                                    <td className="px-6 py-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-2xl bg-${leave.color}-50 text-${leave.color}-600 flex items-center justify-center`}>
                                                <leave.icon size={18} />
                                            </div>
                                            <span className="font-bold text-sm text-slate-700">{leave.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                                        <div className="flex flex-col">
                                            <span>{leave.from}</span>
                                            <span className="text-[10px] text-slate-400">to {leave.to}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-bold text-slate-700">{leave.days} d</span>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-slate-500 max-w-[200px] truncate">{leave.reason}</td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                leave.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-red-50 text-red-600 border-red-100'
                                            }`}>
                                            {leave.status === 'Approved' && <CheckCircle size={12} />}
                                            {leave.status === 'Pending' && <Clock size={12} />}
                                            {leave.status === 'Rejected' && <XCircle size={12} />}
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 pr-8 text-sm text-slate-500">
                                        {leave.by !== '-' ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200">
                                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="approver" className="w-full h-full rounded-full" />
                                                </div>
                                                <span className="text-xs font-bold">{leave.by}</span>
                                            </div>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardCard>
        </div>
    );
};

// Start of Coffee icon definition to avoid missing imports if lucide-react doesn't have it (it usually does but just in case)
const Coffee = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
);

export default EmployeeLeavesPage;
