import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Folder,
    Clock,
    CheckCircle2,
    Users,
    Calendar,
    ArrowUpRight,
    MessageSquare,
    Paperclip
} from 'lucide-react';

// Reusable Components (matching other pages)
const DashboardCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-[30px] p-6 shadow-sm border border-slate-100 ${className}`}>
        {children}
    </div>
);

const Badge = ({ text, color = "blue" }: { text: string; color?: "blue" | "green" | "orange" | "purple" | "slate" }) => {
    const colors = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        orange: "bg-orange-100 text-orange-600",
        purple: "bg-purple-100 text-purple-600",
        slate: "bg-slate-100 text-slate-500",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${colors[color]}`}>
            {text}
        </span>
    );
};

// Navigation Component
const PageHeader = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-8">
                <Link to="/employee/dashboard" className={`text-xl font-bold pb-1 transition-colors ${location.pathname === '/employee/dashboard' ? 'border-b-2 border-slate-800 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    Dashboard
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
                <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm transition-shadow"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold">
                    <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
                </button>
            </div>
        </div>
    );
};

const EmployeeProjectsPage: React.FC = () => {
    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>Projects | SmartHR</title>
            </Helmet>

            <PageHeader />

            {/* Header & New Project */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                <div className="lg:col-span-8">
                    <h1 className="text-4xl font-bold leading-tight text-slate-900 mb-2">
                        Project<br />
                        Overview
                    </h1>
                    <p className="text-slate-400 text-sm max-w-md">
                        Track progress, manage deadlines, and collaborate with your team across all active initiatives.
                    </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <button className="bg-slate-900 text-white px-6 py-4 rounded-[20px] font-bold hover:bg-black transition-colors flex items-center gap-3 shadow-lg shadow-slate-200 w-full sm:w-auto justify-center">
                        <div className="bg-white/20 p-1 rounded-full"><Plus size={16} /></div>
                        <span>Create New Project</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left Col: Priority Project & List */}
                <div className="lg:col-span-7 space-y-8">

                    {/* Priority Project (Stacked) */}
                    <div>
                        <div className="flex justify-between items-center px-1 mb-4">
                            <h3 className="font-bold text-lg">Priority Focus</h3>
                            <button className="text-xs text-slate-400 hover:text-slate-600 font-medium">View Details</button>
                        </div>

                        <div className="relative isolate">
                            {/* Card 1 (Main) */}
                            <div className="bg-white rounded-[30px] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative z-20 border border-slate-50">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Folder size={24} />
                                        </div>
                                        <div>
                                            <Badge text="In Progress" color="blue" />
                                            <h2 className="font-bold text-xl text-slate-800 mt-1">Office Management System</h2>
                                        </div>
                                    </div>
                                    <MoreHorizontal size={20} className="text-slate-300 cursor-pointer hover:text-slate-500" />
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-slate-50 rounded-2xl p-3">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Deadline</p>
                                        <div className="flex items-center gap-1.5 font-bold text-sm text-slate-700">
                                            <Calendar size={14} className="text-slate-400" /> 14 Jan
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-3">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Time Spent</p>
                                        <div className="flex items-center gap-1.5 font-bold text-sm text-slate-700">
                                            <Clock size={14} className="text-slate-400" /> 65h
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-3">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Team</p>
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-100 text-[8px] flex items-center justify-center text-blue-600 font-bold">+3</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-500">Progress</span>
                                        <span className="text-blue-600">60%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full w-[60%] shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 (Stacked Behind) */}
                            <div className="bg-white rounded-[30px] absolute top-24 left-4 right-4 z-10 h-24 shadow-sm border border-slate-50 opacity-60 scale-95 origin-top"></div>
                        </div>
                    </div>

                    {/* All Projects Grid */}
                    <div>
                        <div className="flex justify-between items-center px-1 mb-4">
                            <h3 className="font-bold text-lg">All Projects</h3>
                            <button className="flex items-center gap-1 text-xs text-blue-600 font-bold hover:underline">Sort by deadline <ArrowUpRight size={12} /></button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Project Card 1 */}
                            <DashboardCard className="!p-5 hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                                        <Users size={20} />
                                    </div>
                                    <Badge text="Admin" color="orange" />
                                </div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">Hospital Admin</h4>
                                <p className="text-xs text-slate-400 mb-4">Internal staff management portal update.</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                        <span>Tasks: 3/15</span>
                                        <span>20%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 rounded-full w-[20%]"></div>
                                    </div>
                                </div>
                            </DashboardCard>

                            {/* Project Card 2 */}
                            <DashboardCard className="!p-5 hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform">
                                        <MessageSquare size={20} />
                                    </div>
                                    <Badge text="Design" color="purple" />
                                </div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">Video Conferencing</h4>
                                <p className="text-xs text-slate-400 mb-4">Telehealth module UI/UX overhaul.</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                        <span>Tasks: 8/12</span>
                                        <span>66%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full w-[66%]"></div>
                                    </div>
                                </div>
                            </DashboardCard>

                            {/* Project Card 3 */}
                            <DashboardCard className="!p-5 hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-105 transition-transform">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <Badge text="Dev" color="green" />
                                </div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">Patient Portal</h4>
                                <p className="text-xs text-slate-400 mb-4">Frontend integration with EMR API.</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                        <span>Tasks: 2/20</span>
                                        <span>10%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full w-[10%]"></div>
                                    </div>
                                </div>
                            </DashboardCard>

                            {/* Project Card 4 */}
                            <DashboardCard className="!p-5 hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:scale-105 transition-transform">
                                        <Folder size={20} />
                                    </div>
                                    <Badge text="Mobile" color="slate" />
                                </div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">Mobile App</h4>
                                <p className="text-xs text-slate-400 mb-4">iOS and Android beta release.</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                        <span>Tasks: 12/12</span>
                                        <span className="text-green-600">Done</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-800 rounded-full w-full"></div>
                                    </div>
                                </div>
                            </DashboardCard>
                        </div>
                    </div>
                </div>

                {/* Right Col: Team & Widgets */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Team Activity Widget */}
                    <div className="bg-[#1e1e2d] rounded-[30px] p-6 text-white shadow-xl shadow-slate-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Team Activity</h3>
                            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><MoreHorizontal size={16} /></button>
                        </div>

                        <div className="space-y-6 relative">
                            {/* Timeline Line */}
                            <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10"></div>

                            {[
                                { user: "Sarah K.", action: "Commented on", target: "UI Tasks", time: "5m ago", type: "comment" },
                                { user: "Mike R.", action: "Uploaded file", target: "Spec_v2.pdf", time: "32m ago", type: "file" },
                                { user: "Dev Team", action: "Completed", target: "Sprint 4", time: "2h ago", type: "check" }
                            ].map((item, idx) => (
                                <div key={idx} className="relative pl-10">
                                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#1e1e2d] border-2 border-indigo-500 flex items-center justify-center z-10">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-slate-300"><span className="font-bold text-white">{item.user}</span> {item.action}</p>
                                            <p className="text-xs font-bold text-indigo-400">{item.target}</p>
                                        </div>
                                        <span className="text-[10px] text-slate-500">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3 bg-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors">View All Activity</button>
                    </div>

                    {/* Files / Resources Widget */}
                    <div>
                        <div className="flex justify-between items-center px-1 mb-4">
                            <h3 className="font-bold text-lg">Recent Files</h3>
                        </div>
                        <DashboardCard className="!p-0 overflow-hidden">
                            {[
                                { name: "Project_Brief_2025.pdf", size: "2.4 MB", type: "PDF" },
                                { name: "Design_Assets.zip", size: "145 MB", type: "ZIP" },
                                { name: "Budget_Sheet.xlsx", size: "12 KB", type: "XLS" }
                            ].map((file, idx) => (
                                <div key={idx} className="p-4 flex items-center gap-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                        <Paperclip size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xs text-slate-800">{file.name}</h4>
                                        <p className="text-[10px] text-slate-400">{file.size}</p>
                                    </div>
                                    <button className="text-slate-400 hover:text-blue-600"><ArrowUpRight size={14} /></button>
                                </div>
                            ))}
                        </DashboardCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProjectsPage;
