import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Plus,
    Bot,
    Zap,
    MoreHorizontal,
    Play,
    Clock,
    CheckCircle2,
    FileText,
    ArrowRight
} from 'lucide-react';

// Reusable Components
const DashboardCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-[30px] p-6 shadow-sm border border-slate-100 ${className}`}>
        {children}
    </div>
);

const Badge = ({ text, color = "blue" }: { text: string; color?: "blue" | "violet" | "green" | "amber" }) => {
    const colors = {
        blue: "bg-blue-100 text-blue-600",
        violet: "bg-violet-100 text-violet-600",
        green: "bg-green-100 text-green-600",
        amber: "bg-amber-100 text-amber-700"
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${colors[color]}`}>
            {text}
        </span>
    );
};

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
                        placeholder="Search workflows..."
                        className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm transition-shadow"
                    />
                </div>
            </div>
        </div>
    );
};

const EmployeeWorkflowsPage: React.FC = () => {
    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>Workflows | SmartHR</title>
            </Helmet>

            <PageHeader />

            {/* Welcome / Stats Section - Compact 3 Col */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-4 pt-2">
                    <h1 className="text-4xl font-bold leading-tight text-slate-900">
                        Automation<br />
                        Center
                    </h1>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                        Manage your AI agents and automated tax pipelines from one central hub.
                    </p>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-colors flex items-center gap-2 text-sm shadow-lg shadow-slate-200 mt-2">
                        <Plus size={18} /> New Workflow
                    </button>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Stat 1 */}
                    <DashboardCard className="flex flex-col items-center justify-center text-center p-4 hover:shadow-md transition-shadow cursor-pointer group h-full">
                        <div className="mb-3 relative">
                            <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform">
                                <Bot size={24} />
                            </div>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <h3 className="font-bold text-2xl mb-0.5">12</h3>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Active Agents</p>
                    </DashboardCard>

                    {/* Stat 2 */}
                    <DashboardCard className="flex flex-col items-center justify-center text-center p-4 hover:shadow-md transition-shadow cursor-pointer group h-full">
                        <div className="mb-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <Zap size={24} />
                            </div>
                        </div>
                        <h3 className="font-bold text-2xl mb-0.5">2.4s</h3>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Avg. Response</p>
                    </DashboardCard>

                    {/* Stat 3 (Premium Style) */}
                    <DashboardCard className="relative overflow-hidden bg-slate-900 text-white flex flex-col items-center justify-center text-center p-4 h-full border-none shadow-lg shadow-slate-200">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="mb-3 relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                                <Play size={24} fill="currentColor" />
                            </div>
                        </div>
                        <h3 className="font-bold text-sm mb-1 relative z-10">Run Audit</h3>
                        <p className="text-[10px] text-slate-400 relative z-10">Manual Trigger</p>
                    </DashboardCard>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left Column: Running Workflows (Stacked Effect) */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-lg">Running Now</h3>
                        <button className="text-xs text-slate-400 hover:text-slate-600 font-medium">View Log</button>
                    </div>

                    <div className="relative isolate">
                        {/* Card 1 (Top) */}
                        <div className="bg-white rounded-[30px] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative z-20 border border-slate-50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                                        <Bot size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800">Tax Generator</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Batch #9021</p>
                                    </div>
                                </div>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-2"></div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-slate-500">Processing W-2s</span>
                                    <span className="text-slate-800 font-bold">84%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-violet-500 rounded-full w-[84%]"></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold">AI</div>
                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-600">JD</div>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"><MoreHorizontal size={16} /></button>
                            </div>
                        </div>

                        {/* Card 2 (Stacked Behind) */}
                        <div className="bg-white rounded-[30px] absolute top-24 left-4 right-4 z-10 h-24 shadow-sm border border-slate-50 opacity-60 scale-95 origin-top"></div>
                    </div>

                    {/* Recent Runs List */}
                    <DashboardCard className="!p-0 overflow-hidden">
                        {[
                            { name: "Payroll Sync", status: "Success", time: "2m ago", color: "green" },
                            { name: "Audit Check", status: "Failed", time: "1h ago", color: "red" },
                            { name: "Inv. Processing", status: "Success", time: "3h ago", color: "green" },
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">{item.time}</span>
                            </div>
                        ))}
                    </DashboardCard>
                </div>

                {/* Middle Column: Templates (Dense List) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-lg">Templates</h3>
                        <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"><Search size={14} className="text-slate-400" /></button>
                            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Template Item 1 */}
                        <DashboardCard className="!p-4 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform flex-shrink-0">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm text-slate-800 truncate">Quarterly Tax Prep</h4>
                                    <Badge text="Finance" color="violet" />
                                </div>
                                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                                    Automates data extraction from Q3 spreadsheets and prepares draft 941 forms.
                                </p>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                    <span className="flex items-center gap-1"><Clock size={10} /> 5m saved</span>
                                    <span className="flex items-center gap-1"><Zap size={10} /> 98% acc.</span>
                                </div>
                            </div>
                        </DashboardCard>

                        {/* Template Item 2 */}
                        <DashboardCard className="!p-4 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform flex-shrink-0">
                                <CheckCircle2 size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm text-slate-800 truncate">Compliance Check</h4>
                                    <Badge text="Legal" color="amber" />
                                </div>
                                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                                    Scans all generated forms for regulatory compliance before final submission.
                                </p>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                    <span className="flex items-center gap-1"><Clock size={10} /> Real-time</span>
                                </div>
                            </div>
                        </DashboardCard>

                        {/* Template Item 3 */}
                        <DashboardCard className="!p-4 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-105 transition-transform flex-shrink-0">
                                <Bot size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm text-slate-800 truncate">Staff Onboarding</h4>
                                    <Badge text="HR" color="green" />
                                </div>
                                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                                    Triggers provisioning workflows for new hires across all systems.
                                </p>
                            </div>
                        </DashboardCard>
                    </div>
                </div>

                {/* Right Column: Mini Canvas Widget */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-lg">Quick Edit</h3>
                    </div>

                    <DashboardCard className="!p-0 overflow-hidden relative min-h-[300px] flex flex-col">
                        {/* Mini Grid Canvas Background */}
                        <div className="absolute inset-0 bg-slate-50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '12px 12px', opacity: 0.5 }}></div>

                        <div className="relative z-10 flex-1 p-4">
                            {/* Small floating nodes */}
                            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 w-24 mb-4 mx-auto">
                                <div className="h-1 w-8 bg-slate-200 rounded-full mb-1"></div>
                                <div className="h-1 w-12 bg-slate-100 rounded-full"></div>
                            </div>
                            <div className="w-px h-6 bg-slate-300 mx-auto mb-1"></div>
                            <div className="bg-white p-2 rounded-xl shadow-md border border-violet-200 w-28 mx-auto ring-2 ring-violet-50">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-4 rounded-md bg-violet-100 flex items-center justify-center text-violet-600"><Bot size={10} /></div>
                                    <div className="h-1 w-10 bg-slate-800 rounded-full"></div>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded-full"></div>
                            </div>
                            <div className="w-px h-6 bg-slate-300 mx-auto mt-1 mb-1"></div>
                            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 w-24 mx-auto">
                                <div className="h-1 w-8 bg-slate-200 rounded-full mb-1"></div>
                                <div className="h-1 w-12 bg-slate-100 rounded-full"></div>
                            </div>
                        </div>

                        <div className="bg-white p-4 border-t border-slate-100 relative z-20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-400">Payroll_Flow_v2</span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                            </div>
                            <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-black transition-colors">
                                Open Designer <ArrowRight size={12} />
                            </button>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default EmployeeWorkflowsPage;
