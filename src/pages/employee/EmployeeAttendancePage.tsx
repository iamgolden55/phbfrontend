import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Bell,
    Calendar,
    Clock,
    Filter,
    Download,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    MapPin,
    ArrowRight
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

// Unified Navigation Header
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

const EmployeeAttendancePage: React.FC = () => {
    const [view, setView] = useState<'list' | 'calendar'>('list');

    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>Attendance | SmartHR</title>
            </Helmet>

            <PageHeader />

            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Attendance Log</h1>
                    <p className="text-slate-400 text-sm">March 2025 • 22 Working Days</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors">
                        <Filter size={14} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-900 text-white text-xs font-bold hover:bg-black transition-colors shadow-lg shadow-slate-200">
                        <Download size={14} /> Export Report
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Present", value: "22", sub: "Days", color: "green", icon: CheckCircle2 },
                    { label: "Absent", value: "01", sub: "Day", color: "red", icon: XCircle },
                    { label: "Late Arrivals", value: "03", sub: "Days", color: "amber", icon: AlertCircle },
                    { label: "Avg. Hours", value: "8h 45m", sub: "Per Day", color: "blue", icon: Clock },
                ].map((stat, idx) => (
                    <DashboardCard key={idx} className="!p-4 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value} <span className="text-xs text-slate-400 font-normal">{stat.sub}</span></h3>
                        </div>
                        <div className={`w-10 h-10 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <stat.icon size={20} />
                        </div>
                    </DashboardCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content: Calendar/List Hybrid */}
                <div className="lg:col-span-8 space-y-6">
                    <DashboardCard className="min-h-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-4">
                                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"><ChevronLeft size={20} /></button>
                                <h3 className="text-lg font-bold text-slate-800">March 2025</h3>
                                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"><ChevronRight size={20} /></button>
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button onClick={() => setView('list')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>List</button>
                                <button onClick={() => setView('calendar')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Calendar</button>
                            </div>
                        </div>

                        {view === 'list' ? (
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-600 font-bold">
                                                <span className="text-xs text-slate-400 font-medium uppercase">Mar</span>
                                                <span className="text-lg leading-none">{10 + i}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-slate-800 text-sm">Regular Shift</h4>
                                                    {i === 3 ? <Badge text="Late" color="amber" /> : <Badge text="On Time" color="green" />}
                                                </div>
                                                <p className="text-xs text-slate-400 flex items-center gap-2">
                                                    <Clock size={12} /> 09:00 AM - 06:00 PM • 9h
                                                </p>
                                            </div>
                                        </div>

                                        <div className="hidden sm:flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Production</p>
                                                <p className="text-sm font-bold text-slate-800">8h 15m</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Overtime</p>
                                                <p className="text-sm font-bold text-slate-400">-</p>
                                            </div>
                                            <button className="p-2 hover:bg-blue-50 text-slate-300 hover:text-blue-600 rounded-lg transition-colors">
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                                <Calendar size={48} className="mb-4 text-slate-200" />
                                <p className="text-sm font-bold">Calendar View Mode</p>
                            </div>
                        )}
                    </DashboardCard>
                </div>

                {/* Right Sidebar: Today's Log */}
                <div className="lg:col-span-4 space-y-6">
                    <DashboardCard className="bg-slate-900 text-white relative overflow-hidden border-none shadow-2xl shadow-slate-900/20">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

                        <h3 className="font-bold text-lg mb-6 relative z-10">Today's Activity</h3>
                        <div className="relative pl-4 space-y-8 z-10">
                            {/* Vertical Line */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-700 rounded-full"></div>

                            {[
                                { time: "09:00 AM", title: "Punched In", desc: "Office - Main Entrance", icon: CheckCircle2, color: "text-green-400" },
                                { time: "01:00 PM", title: "Break Start", desc: "Lunch Break", icon: Clock, color: "text-amber-400" },
                                { time: "02:00 PM", title: "Break End", desc: "Resumed Work", icon: Clock, color: "text-blue-400" },
                                { time: "Currently", title: "Working", desc: "Since 2:00 PM", icon: Clock, color: "text-white animate-pulse" },
                            ].map((event, idx) => (
                                <div key={idx} className="relative flex items-start gap-4 group">
                                    <div className={`absolute -left-[13px] top-0 w-3 h-3 rounded-full border-2 border-slate-900 custom-timeline-dot ${idx === 3 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-600'}`}></div>
                                    <div>
                                        <p className="text-xs font-mono text-slate-400 mb-0.5">{event.time}</p>
                                        <h4 className={`font-bold text-sm ${event.color}`}>{event.title}</h4>
                                        <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1"><MapPin size={8} /> {event.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>

                    <DashboardCard>
                        <h3 className="font-bold text-lg text-slate-800 mb-4">Location</h3>
                        <div className="h-40 bg-slate-100 rounded-2xl relative overflow-hidden group">
                            <img src="https://static.maps-generator.com/google-maps-bg.png" alt="Map" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white animate-bounce">
                                <MapPin size={14} fill="currentColor" />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">IP: 192.168.1.1</span>
                            <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Within Geofence</span>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default EmployeeAttendancePage;
