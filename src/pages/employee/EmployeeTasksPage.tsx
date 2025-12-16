import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Bell,
    Settings,
    Search,
    Plus,
    Calendar,
    MoreHorizontal,
    Edit2,
    Trash2,
    CheckCircle2,
    Share2,
    Clock,
    User,
    ChevronLeft,
    ChevronRight,
    Layout,
    FileText,
    Users
} from 'lucide-react';

// Reusable Card Component
const DashboardCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-[30px] p-6 shadow-sm border border-slate-100 ${className}`}>
        {children}
    </div>
);

// Badge Component
const Badge = ({ text, color = "blue" }: { text: string; color?: "blue" | "pink" | "green" }) => {
    const colors = {
        blue: "bg-blue-100 text-blue-600",
        pink: "bg-pink-100 text-pink-600",
        green: "bg-green-100 text-green-600"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[color]}`}>
            {text}
        </span>
    );
};

// Navigation Component (shared style)
const PageHeader = () => {
    const location = useLocation(); // Ensure useLocation is imported from 'react-router-dom'
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
                        placeholder="Search or type command"
                        className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm transition-shadow"
                    />
                </div>
            </div>
        </div>
    );
};

const EmployeeTasksPage: React.FC = () => {
    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>Dashboard | SmartHR</title>
            </Helmet>

            <PageHeader />

            {/* Welcome Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-4 pt-4">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                        Hi, James! 👋<br />
                        What are your<br />
                        plans for today?
                    </h1>
                    <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                        This platform is designed to revolutionize the<br />
                        way you organize and access your notes
                    </p>
                </div>

                <div className="lg:col-span-1 flex items-center justify-center">
                    <button className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 hover:scale-105 transition-transform hover:bg-indigo-100">
                        <Plus size={24} />
                    </button>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <DashboardCard className="flex flex-col items-center justify-center text-center p-6 hover:shadow-md transition-shadow cursor-pointer group h-full">
                        <div className="mb-4 relative">
                            <div className="w-12 h-12 border-2 border-slate-200 rounded-lg transform -rotate-6 transition-transform group-hover:rotate-0"></div>
                            <div className="w-12 h-12 border-2 border-slate-800 rounded-lg absolute top-0 left-0 bg-white flex items-center justify-center z-10">
                                <Edit2 size={20} className="text-slate-800" />
                            </div>
                        </div>
                        <h3 className="font-bold text-sm mb-1">Stay organized</h3>
                        <p className="text-[10px] text-slate-400">A clear structure for your notes</p>
                    </DashboardCard>

                    <DashboardCard className="flex flex-col items-center justify-center text-center p-6 hover:shadow-md transition-shadow cursor-pointer group h-full">
                        <div className="mb-4">
                            <div className="w-14 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="text-slate-800" size={32} strokeWidth={1.5} />
                            </div>
                        </div>
                        <h3 className="font-bold text-sm mb-1">Sync your notes</h3>
                        <p className="text-[10px] text-slate-400">Ensure that notes are synced</p>
                    </DashboardCard>

                    <DashboardCard className="flex flex-col items-center justify-center text-center p-6 hover:shadow-md transition-shadow cursor-pointer group h-full">
                        <div className="mb-4 relative group-hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-8 border-2 border-slate-800 rounded-md bg-white flex items-center justify-center z-10 relative">
                                <Users size={20} />
                            </div>
                            <div className="w-12 h-8 border-2 border-slate-200 rounded-md absolute -top-2 -right-2"></div>
                        </div>
                        <h3 className="font-bold text-sm mb-1">Collaborate and share</h3>
                        <p className="text-[10px] text-slate-400">Share notes with colleagues</p>
                    </DashboardCard>
                </div>
            </div>

            {/* Middle Section: Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Notifications Card */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="font-bold text-lg">Notifications</h3>
                        <button className="text-xs text-slate-400 hover:text-slate-600 font-medium">Clear</button>
                    </div>

                    <div className="relative isolate">
                        {/* Card 1 */}
                        <div className="bg-white rounded-[24px] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative z-20 border border-slate-50">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-800">Upcoming event</h4>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                </div>
                                <MoreHorizontal size={16} className="text-slate-300 cursor-pointer hover:text-slate-500" />
                            </div>
                            <p className="text-xs text-slate-400 mb-5 pl-0.5">Landing design meeting | Time: 120 min</p>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                    <Calendar size={14} className="text-slate-500" />
                                    <span>Sat, 10 May</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                    <Clock size={14} className="text-slate-500" />
                                    <span>11 AM - 11:45 AM</span>
                                </div>
                            </div>

                            {/* Action Buttons Floating Right */}
                            <div className="absolute right-4 top-16 flex flex-col gap-2">
                                <button className="p-2 bg-white border border-slate-100 shadow-sm rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all group"><Trash2 size={14} className="text-slate-400 group-hover:text-red-500" /></button>
                                <button className="p-2 bg-white border border-slate-100 shadow-sm rounded-full hover:bg-blue-50 hover:text-blue-500 hover:border-blue-100 transition-all group"><Edit2 size={14} className="text-slate-400 group-hover:text-blue-500" /></button>
                            </div>
                        </div>

                        {/* Card 2 (Underneath effect) */}
                        <div className="bg-white rounded-[24px] absolute top-24 left-4 right-4 z-10 h-24 shadow-sm border border-slate-50 opacity-60 scale-95 origin-top"></div>
                    </div>

                    {/* Message Card */}
                    <DashboardCard className="!p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors border-dashed">
                        <div className="flex justify-between items-start cursor-pointer">
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Message | Product design</h4>
                                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-[8px] font-bold text-blue-600">KS</div>
                                    <span>Message from Ken Smith</span>
                                </div>
                            </div>
                            <MoreHorizontal size={16} className="text-slate-300 hover:text-slate-500" />
                        </div>
                        <div className="mt-3 bg-white border border-slate-100 rounded-lg p-2.5 text-xs text-slate-500 italic truncate shadow-sm">
                            "Hey team, just wanted to check in and see how is..."
                        </div>
                    </DashboardCard>
                </div>

                {/* Assignments Card */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center px-2 mb-2">
                        <h3 className="font-bold text-lg">Assignments</h3>
                        <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium"><Edit2 size={12} /> Edit</button>
                    </div>

                    <DashboardCard className="!p-0 overflow-hidden group">
                        <div className="p-5 relative">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge text="Motion design" color="blue" />
                                <span className="text-xs font-bold text-slate-700">Logo</span>
                                <MoreHorizontal size={16} className="text-slate-300 ml-auto cursor-pointer hover:text-slate-500" />
                            </div>

                            <h4 className="font-bold text-lg mb-6 leading-snug">Design a packaging concept<br />for a new product</h4>

                            <div className="flex items-center justify-between mt-8">
                                <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                    Package design
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-600">Rachel Lee</span>
                                    <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xs">RL</div>
                                    </div>
                                </div>
                            </div>

                            {/* Priority Badge Absolute */}
                            <div className="absolute top-16 right-5">
                                <Badge text="High" color="pink" />
                            </div>
                        </div>
                    </DashboardCard>

                    <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-400 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-500 transition-all group">
                        <div className="w-6 h-6 bg-slate-100 group-hover:bg-blue-500 rounded-md text-slate-400 group-hover:text-white flex items-center justify-center transition-colors"><Plus size={16} /></div>
                        Add new assignment
                    </button>
                </div>

                {/* Calendar / Schedule Column */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="font-bold text-lg">May 2021</h3>
                        <div className="flex gap-1">
                            <button className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft size={16} className="text-slate-400" /></button>
                            <button className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"><ChevronRight size={16} className="text-slate-400" /></button>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs font-bold text-slate-400 px-1 select-none">
                        <div className="text-center cursor-pointer hover:text-blue-600 transition-colors group">Mon<br /><span className="text-slate-800 text-sm group-hover:text-blue-600">14</span></div>
                        <div className="text-center cursor-pointer hover:text-blue-600 transition-colors group">Tue<br /><span className="text-slate-800 text-sm group-hover:text-blue-600">15</span></div>
                        <div className="text-center cursor-pointer hover:text-blue-600 transition-colors group">Wed<br /><span className="text-slate-800 text-sm group-hover:text-blue-600">16</span></div>
                        <div className="text-center cursor-pointer hover:text-blue-600 transition-colors group">Thr<br /><span className="text-slate-800 text-sm group-hover:text-blue-600">17</span></div>
                        <div className="text-center cursor-pointer">Fr<br /><div className="w-7 h-7 bg-blue-600 rounded-full text-white flex items-center justify-center mx-auto mt-0.5 shadow-md shadow-blue-200">18</div></div>
                        <div className="text-center cursor-pointer hover:text-blue-600 transition-colors group">Sat<br /><span className="text-slate-800 text-sm group-hover:text-blue-600">19</span></div>
                        <div className="text-center cursor-pointer hover:text-blue-600 transition-colors group">Sun<br /><span className="text-slate-800 text-sm group-hover:text-blue-600">20</span></div>
                    </div>

                    <div className="relative pl-6 space-y-7 pt-4">
                        {/* Timeline Dotted Line */}
                        <div className="absolute left-2.5 top-2 bottom-0 w-px border-l-2 border-dotted border-slate-300"></div>

                        {/* Event 1 */}
                        <div className="relative">
                            <div className="absolute -left-[23px] top-9 w-3 h-3 bg-white border-2 border-slate-300 rounded-full z-10"></div>
                            <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wide">04:30-05:00 PM</div>
                            <div className="bg-white rounded-[20px] p-3 flex items-start gap-3 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors"><Users size={18} /></div>
                                <div className="flex-1 pt-0.5">
                                    <h4 className="font-bold text-sm text-slate-800">Team meeting</h4>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        <p className="text-[10px] text-slate-400 font-medium">12:00 - 12:30 • UX/UI design</p>
                                    </div>
                                </div>
                                <MoreHorizontal size={14} className="text-slate-300" />
                            </div>
                        </div>

                        {/* Event 2 */}
                        <div className="relative">
                            <div className="absolute -left-[23px] top-9 w-3 h-3 bg-white border-2 border-slate-300 rounded-full z-10"></div>
                            <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wide">11:30-12:30 PM</div>
                            <div className="bg-white rounded-[20px] p-3 flex items-start gap-3 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-100 transition-colors"><Briefcase size={18} /></div>
                                <div className="flex-1 pt-0.5">
                                    <h4 className="font-bold text-sm text-slate-800">Meeting with new client</h4>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        <p className="text-[10px] text-slate-400 font-medium">12:30 - 01:30 PM • Job interview</p>
                                    </div>
                                </div>
                                <MoreHorizontal size={14} className="text-slate-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                {/* Today Tasks List (5 cols) */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg">Today tasks</h3>
                            <div className="flex -space-x-2 pl-2">
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">A</div>
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">B</div>
                                <button className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg z-10">+</button>
                            </div>
                        </div>
                        <div className="flex gap-4 text-xs font-bold text-slate-500">
                            <button className="hover:text-blue-600 flex items-center gap-1 transition-colors"><Edit2 size={12} /> Edit</button>
                            <button className="hover:text-blue-600 flex items-center gap-1 transition-colors"><Share2 size={12} /> Share</button>
                        </div>
                    </div>

                    <DashboardCard className="!p-0 divide-y divide-slate-50 overflow-hidden">
                        {[
                            { title: "Conduct research", time: "4 May, 09:20 AM", duration: "02 h 45 m", progress: 90 },
                            { title: "Schedule a meeting", time: "14 May, 12:45 AM", duration: "06 h 55 m", progress: 50 },
                            { title: "Send out reminders", time: "21 May, 10:30 AM", duration: "01 h 30 m", progress: 10 },
                        ].map((task, idx) => (
                            <div key={idx} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                                <div className={`w-1 h-8 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm truncate text-slate-800 min-w-[120px]">{task.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium">{task.time}</p>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] text-slate-400 mb-1">Duration</p>
                                    <p className="text-xs font-bold text-slate-700">{task.duration}</p>
                                </div>
                                <div className="w-24 px-2 hidden sm:block">
                                    <div className="flex justify-between text-[10px] font-bold mb-1">
                                        <span className="text-slate-400">{task.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${task.progress}%` }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                                    <Users size={12} /> <span>{4 * (idx + 1) * 4}</span>
                                </div>
                            </div>
                        ))}
                    </DashboardCard>
                </div>

                {/* Premium Card (3 cols) */}
                <div className="lg:col-span-6 xl:col-span-3 h-full">
                    <div className="bg-[#6c5dd3] rounded-[30px] p-6 text-white text-center h-full flex flex-col items-center justify-between relative overflow-hidden group shadow-lg shadow-indigo-200">
                        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>

                        {/* Abstract shapes */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-900/20 rounded-full blur-xl"></div>

                        <div className="mt-8 mb-6 relative z-10">
                            {/* Illustration placeholder */}
                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-inner mx-auto">
                                <span className="text-4xl filter drop-shadow-md">🎁</span>
                            </div>
                        </div>

                        <div className="relative z-10 w-full">
                            <h3 className="text-xl font-bold mb-2">Go premium!</h3>
                            <p className="text-indigo-100 text-[11px] mb-6 max-w-[200px] mx-auto leading-relaxed opacity-90">Gain access to a range of benefits designed to enhance your user experience</p>
                            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-black transition-colors w-full max-w-[160px]">Find out more</button>
                        </div>
                    </div>
                </div>

                {/* Bottom Right: Charts & Meeting (4 cols) */}
                <div className="lg:col-span-6 xl:col-span-4 space-y-4 flex flex-col">
                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-4">
                        <DashboardCard className="!p-4 flex flex-col items-center justify-center min-h-[140px]">
                            <div className="relative w-16 h-16 mb-3">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="90, 100" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800">90%</div>
                            </div>
                            <p className="text-[9px] font-bold text-green-500 mb-0.5 tracking-wider">DATA RESEARCH</p>
                            <p className="text-xs font-bold text-slate-800">Marketing</p>
                        </DashboardCard>

                        <DashboardCard className="!p-4 flex flex-col items-center justify-center min-h-[140px]">
                            <div className="relative w-16 h-16 mb-3">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="65, 100" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800">65%</div>
                            </div>
                            <p className="text-[9px] font-bold text-red-500 mb-0.5 tracking-wider">UX/UI DESIGN</p>
                            <p className="text-xs font-bold text-slate-800">Typography</p>
                        </DashboardCard>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 px-2 py-1">
                        <p className="font-medium">You marked 5/5<br /><span className="text-slate-500">All assignments are done!</span></p>
                        <div className="text-right">
                            <p className="mb-1">You marked 3/5</p>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-600">2 assignments left</span>
                                <button className="bg-[#6c5dd3] text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm hover:bg-indigo-700 transition-colors">Check</button>
                            </div>
                        </div>
                    </div>

                    {/* Board Meeting Card */}
                    <DashboardCard className="!p-5 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-slate-800">Board meeting</h4>
                                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                                    <div className="w-2 h-2 bg-[#6c5dd3] rounded-full"></div>
                                    <span className="font-medium">March 24 at 4:00 PM</span>
                                </div>
                            </div>
                            <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"><Edit2 size={12} /> Edit</button>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-slate-500 leading-relaxed">Meeting with John Smith,<br />4th floor, room 159</p>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors">Reschedule</button>
                                <button className="flex-1 sm:flex-none px-4 py-2 bg-[#6c5dd3] text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-sm transition-all hover:shadow-indigo-200">Accept invite</button>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

// Simple Icon component for the timeline (reused)
const Briefcase = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export default EmployeeTasksPage;
