import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Bell,
    Clock,
    Calendar,
    CheckCircle2,
    Briefcase,
    MoreHorizontal,
    ArrowRight,
    Zap,
    Coffee,
    AlertCircle,
    Play,
    Pause,
    FileText,
    LogOut,
    User,
    ChevronRight,
    PieChart,
    HelpCircle
} from 'lucide-react';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import Joyride, { STATUS } from 'react-joyride';
import { useEmployeeDashboardTour } from '../../features/employee/hooks/useEmployeeDashboardTour';

// Reusable Components (Consistent with Design System)
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

// Unified Navigation Header
const PageHeader = ({ onStartTour }: { onStartTour: () => void }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.includes(path);

    // Helper to check for exact match or general section
    const isExact = (path: string) => location.pathname === path;

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8" data-tour="emp-header">
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
                <button
                    onClick={onStartTour}
                    className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-blue-500 rounded-full transition-colors relative"
                    title="Start Tour"
                >
                    <HelpCircle size={20} />
                </button>
                <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm transition-shadow"
                    />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-200 border-2 border-white ring-2 ring-slate-100">
                    JD
                </div>
            </div>
        </div>
    );
};

const ModernEmployeeDashboard: React.FC = () => {
    const { userData } = useOrganizationAuth();
    const { run, steps, handleTourFinish, startTour } = useEmployeeDashboardTour();

    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>Overview | SmartHR</title>
            </Helmet>

            <Joyride
                steps={steps}
                run={run}
                continuous
                showProgress
                showSkipButton
                scrollToFirstStep
                scrollOffset={100} // Account for sticky header
                disableOverlayClose
                spotlightClicks
                callback={(data) => {
                    const { status } = data;
                    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
                        handleTourFinish();
                    }
                }}
                styles={{
                    options: {
                        primaryColor: '#3b82f6',
                        zIndex: 1000,
                        backgroundColor: '#ffffff',
                        textColor: '#1e293b',
                        overlayColor: 'rgba(15, 23, 42, 0.6)', // Darker overlay for better focus
                    },
                    spotlight: {
                        borderRadius: '20px',
                    },
                    tooltip: {
                        borderRadius: '20px',
                        padding: '20px',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                    },
                    buttonNext: {
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        padding: '10px 20px',
                    },
                    buttonBack: {
                        marginRight: '10px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#64748b'
                    }
                }}
            />

            <PageHeader onStartTour={startTour} />

            {/* Hero Section: Welcome & Shift Status (Stacked) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8 flex flex-col justify-between" data-tour="emp-welcome">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold leading-tight text-slate-900">
                            Good Morning,<br />
                            James
                        </h1>
                        <p className="text-slate-400 text-sm mt-2">
                            You're on track for a productive day. Here's your summary.
                        </p>
                    </div>

                    {/* High Density Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-tour="emp-stats">
                        <DashboardCard className="!p-4 flex flex-col justify-between h-28 hover:shadow-md transition-shadow group cursor-pointer bg-blue-50/50 border-blue-100">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Clock size={16} /></div>
                                <span className="text-[10px] font-bold text-blue-400 bg-white px-1.5 py-0.5 rounded-md">+12%</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">08:42</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Hrs Worked</p>
                            </div>
                        </DashboardCard>

                        <DashboardCard className="!p-4 flex flex-col justify-between h-28 hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-slate-50 rounded-xl text-slate-600 group-hover:scale-110 transition-transform"><CheckCircle2 size={16} /></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">12</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Tasks Done</p>
                            </div>
                        </DashboardCard>

                        <DashboardCard className="!p-4 flex flex-col justify-between h-28 hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-slate-50 rounded-xl text-slate-600 group-hover:scale-110 transition-transform"><Coffee size={16} /></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">22m</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Break Time</p>
                            </div>
                        </DashboardCard>

                        <DashboardCard className="!p-4 flex flex-col justify-between h-28 hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-slate-50 rounded-xl text-slate-600 group-hover:scale-110 transition-transform"><Calendar size={16} /></div>
                                <span className="text-[10px] font-bold text-red-400 bg-red-50 px-1.5 py-0.5 rounded-md">Expiring</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">2.5</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Leave Bal</p>
                            </div>
                        </DashboardCard>
                    </div>
                </div>

                {/* Right Hero: Shift Status Stacked Card */}
                <div className="lg:col-span-4 relative isolate min-h-[250px] lg:min-h-0" data-tour="emp-clock">
                    <div className="bg-slate-900 text-white rounded-[30px] p-6 shadow-2xl shadow-indigo-200 relative z-20 h-full flex flex-col justify-between overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Current Shift</span>
                                </div>
                                <h2 className="text-2xl font-bold">Clocked In</h2>
                            </div>
                            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                                <Zap size={20} className="text-yellow-400" />
                            </div>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-mono font-bold tracking-tighter">09:12<span className="text-lg text-slate-400">am</span></span>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 bg-white hover:bg-slate-100 text-slate-900 py-3 rounded-2xl font-bold text-xs transition-colors flex items-center justify-center gap-2">
                                    <Pause size={14} /> Break
                                </button>
                                <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 py-3 rounded-2xl font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-red-500/20">
                                    <LogOut size={14} /> Clock Out
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Stacked element */}
                    <div className="bg-slate-200 rounded-[30px] absolute top-4 -right-2 bottom-4 w-4 z-10 shadow-sm opacity-50"></div>
                </div>
            </div>

            {/* Central Hub: Timeline & Priority Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left: Working Hours Timeline (Vitals Style) */}
                <div className="lg:col-span-8" data-tour="emp-timeline">
                    <div className="flex justify-between items-center px-1 mb-4">
                        <h3 className="font-bold text-lg">Shift Timeline</h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Work</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Break</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Meeting</span>
                        </div>
                    </div>

                    <DashboardCard className="!p-8 relative overflow-hidden bg-white">
                        {/* Subtle Grid Bg */}
                        <div className="absolute inset-0 bg-slate-50 opacity-50" style={{ backgroundImage: 'linear-gradient(to right, #f1f5f9 1px, transparent 1px)', backgroundSize: '10% 100%' }}></div>

                        <div className="relative z-10">
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                                <span>8 AM</span>
                                <span>10 AM</span>
                                <span>12 PM</span>
                                <span>2 PM</span>
                                <span>4 PM</span>
                                <span>6 PM</span>
                            </div>

                            {/* The Timeline Bar */}
                            <div className="h-16 w-full bg-slate-100 rounded-2xl relative overflow-hidden mb-6 shadow-inner">
                                {/* Segments */}
                                <div className="absolute top-2 bottom-2 left-[5%] w-[25%] bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center group cursor-pointer hover:bg-indigo-400 transition-colors">
                                    <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">Deep Work</span>
                                </div>
                                <div className="absolute top-2 bottom-2 left-[32%] w-[10%] bg-amber-400 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center group cursor-pointer hover:bg-amber-300 transition-colors">
                                    <Coffee size={12} className="text-amber-900 opacity-60" />
                                </div>
                                <div className="absolute top-2 bottom-2 left-[44%] w-[30%] bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20"></div>
                                <div className="absolute top-2 bottom-2 left-[76%] w-[15%] bg-emerald-400 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center group cursor-pointer hover:bg-emerald-300 transition-colors">
                                    <span className="text-[10px] font-bold text-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity">Weekly Sync</span>
                                </div>

                                {/* Current Time Marker */}
                                <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-red-500 z-20">
                                    <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                                </div>
                            </div>

                            {/* Stats below timeline */}
                            <div className="flex items-center gap-8 border-t border-slate-100 pt-6">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Productivity</p>
                                    <h4 className="text-2xl font-bold text-slate-800 flex items-end gap-2">86% <span className="text-xs text-green-500 font-bold mb-1.5">High</span></h4>
                                </div>
                                <div className="h-8 w-px bg-slate-200"></div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Overtime</p>
                                    <h4 className="text-2xl font-bold text-slate-800 flex items-end gap-2">0h <span className="text-xs text-slate-400 font-bold mb-1.5">No OT</span></h4>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>

                {/* Right: Notification / Priority Actions */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-lg">Action Required</h3>
                        <Badge text="3 Pending" color="red" />
                    </div>

                    <div className="relative isolate" data-tour="emp-action-card">
                        {/* Priority Card 1 */}
                        <div className="bg-white rounded-[30px] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative z-20 border border-slate-50">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 flex-shrink-0">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 leading-tight mb-1">Sign Contract Amendment</h4>
                                    <p className="text-xs text-slate-400">Updated terms for 2025 fiscal year.</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-colors">Review & Sign</button>
                                <button className="px-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">Skip</button>
                            </div>
                        </div>
                        {/* Stacked Cards */}
                        <div className="bg-white rounded-[30px] absolute top-24 left-4 right-4 z-10 h-24 shadow-sm border border-slate-50 opacity-60 scale-95 origin-top"></div>
                        <div className="bg-white rounded-[30px] absolute top-28 left-8 right-8 z-0 h-24 shadow-sm border border-slate-50 opacity-30 scale-90 origin-top"></div>
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="grid grid-cols-2 gap-3 mt-2" data-tour="emp-shortcuts">
                        <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group">
                            <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><Briefcase size={16} /></div>
                            <span className="text-xs font-bold text-slate-700 block">Request Leave</span>
                        </button>
                        <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group">
                            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><PieChart size={16} /></div>
                            <span className="text-xs font-bold text-slate-700 block">View Payslip</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Recent Projects (Dense List) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard className="!p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Recent Projects</h3>
                        <Link to="/employee/projects" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">View All <ArrowRight size={12} /></Link>
                    </div>
                    <div>
                        {[
                            { name: "Office Mgmt", role: "Leader", progress: 60, color: "blue" },
                            { name: "Hospital Admin", role: "Member", progress: 20, color: "orange" },
                            { name: "Patient Portal", role: "Dev", progress: 10, color: "green" },
                        ].map((p, idx) => (
                            <div key={idx} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold bg-${p.color}-100 text-${p.color}-600`}>
                                        {p.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800">{p.name}</h4>
                                        <p className="text-[10px] text-slate-400">{p.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full bg-${p.color}-500`} style={{ width: `${p.progress}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 w-8 text-right">{p.progress}%</span>
                                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardCard>

                <div className="relative rounded-[30px] overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Badge text="Announcement" color="blue" />
                            <span className="text-slate-300 text-xs font-bold">Today</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Q1 Town Hall Meeting</h3>
                        <p className="text-slate-300 text-sm mb-6 line-clamp-2">Join us for a review of the past quarter's achievements and a look ahead at our 2025 roadmap...</p>
                        <button className="flex items-center gap-2 text-sm font-bold hover:text-blue-300 transition-colors">Read More <ArrowRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernEmployeeDashboard;
