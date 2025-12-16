import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Plus,
    Check,
    MessageSquare,
    FileText,
    Database,
    Shield,
    MoreHorizontal,
    Key,
    RefreshCw,
    Globe,
    Lock
} from 'lucide-react';

// Reusable Components
const DashboardCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-[30px] p-6 shadow-sm border border-slate-100 ${className}`}>
        {children}
    </div>
);

const Badge = ({ text, color = "blue" }: { text: string; color?: "blue" | "green" | "gray" | "slate" }) => {
    const colors = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        gray: "bg-slate-100 text-slate-500",
        slate: "bg-slate-800 text-white",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${colors[color]}`}>
            {text}
        </span>
    );
};

// Reused Header
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
                        placeholder="Search integrations..."
                        className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm transition-shadow"
                    />
                </div>
            </div>
        </div>
    );
};

const EmployeeIntegrationsPage: React.FC = () => {
    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>Integrations | SmartHR</title>
            </Helmet>

            <PageHeader />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left Col: Active Connections & API Key (Stacked) */}
                <div className="lg:col-span-5 space-y-8">

                    {/* Active Connections Section */}
                    <div>
                        <div className="flex justify-between items-center px-1 mb-4">
                            <h3 className="font-bold text-lg">Active Connections</h3>
                            <button className="text-xs text-slate-400 hover:text-slate-600 font-medium">Manage</button>
                        </div>

                        <div className="relative isolate">
                            {/* Connection 1 (Google) */}
                            <div className="bg-white rounded-[30px] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative z-20 border border-slate-50">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg font-bold text-orange-600 font-serif">G</div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-800">Google Workspace</h4>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                <p className="text-[10px] text-slate-400 font-medium">Synced 2m ago</p>
                                            </div>
                                        </div>
                                    </div>
                                    <MoreHorizontal size={16} className="text-slate-300 cursor-pointer hover:text-slate-500" />
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] text-slate-500 font-bold border border-slate-100">Calendar</span>
                                    <span className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] text-slate-500 font-bold border border-slate-100">Drive</span>
                                </div>
                            </div>
                            {/* Connection 2 (Peeking) */}
                            <div className="bg-white rounded-[30px] absolute top-24 left-4 right-4 z-10 h-24 shadow-sm border border-slate-50 opacity-60 scale-95 origin-top"></div>
                        </div>

                        {/* Recent Activity List */}
                        <div className="mt-4">
                            <DashboardCard className="!p-0 overflow-hidden">
                                {[
                                    { app: "Slack", action: "Posted notification", time: "10m ago", icon: <MessageSquare size={14} className="text-purple-600" /> },
                                    { app: "QuickBooks", action: "Export failed", time: "1h ago", icon: <FileText size={14} className="text-green-600" />, error: true },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">{item.icon}</div>
                                            <div>
                                                <h4 className="font-bold text-xs text-slate-800">{item.app}</h4>
                                                <p className={`text-[10px] font-medium ${item.error ? 'text-red-500' : 'text-slate-400'}`}>{item.action}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-300">{item.time}</span>
                                    </div>
                                ))}
                            </DashboardCard>
                        </div>
                    </div>

                    {/* API Key Widget (Replacing large section) */}
                    <div>
                        <div className="flex justify-between items-center px-1 mb-2">
                            <h3 className="font-bold text-lg">Developer</h3>
                        </div>
                        <DashboardCard className="!p-5 bg-slate-900 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="font-bold text-sm mb-1">Production Key</h4>
                                    <p className="text-[10px] text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded inline-block">pk_live_...934s</p>
                                </div>
                                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
                                    <RefreshCw size={14} />
                                </div>
                            </div>
                            <div className="flex gap-2 relative z-10">
                                <button className="flex-1 bg-white text-slate-900 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">Docs</button>
                                <button className="flex-1 bg-slate-800 text-white py-2 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors">Logs</button>
                            </div>
                        </DashboardCard>
                    </div>
                </div>

                {/* Right Col: Discovery Grid & Premium */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Premium / Pro Integrations */}
                    <div className="bg-gradient-to-r from-[#6c5dd3] to-indigo-600 rounded-[30px] p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-200 group cursor-pointer">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <Badge text="New" color="slate" />
                                <h3 className="text-2xl font-bold mt-2 mb-1">Enterprise Connectors</h3>
                                <p className="text-indigo-100 text-xs max-w-sm mb-4 leading-relaxed opacity-90">
                                    Unlock SAP, Oracle, and Salesforce bi-directional sync with our new Enterprise plan.
                                </p>
                                <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">Upgrade Plan</button>
                            </div>
                            <div className="hidden sm:block">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 transform rotate-6 group-hover:rotate-0 transition-transform">
                                    <Globe size={32} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Discovery List (Dense) */}
                    <div>
                        <div className="flex justify-between items-center px-1 mb-4">
                            <h3 className="font-bold text-lg">Available Apps</h3>
                            <button className="text-xs text-blue-600 font-bold hover:underline">View Directory</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* App Card 1 */}
                            <DashboardCard className="!p-4 hover:shadow-md transition-all cursor-pointer group flex gap-4 items-start">
                                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">QuickBooks Online</h4>
                                    <p className="text-[10px] text-slate-400 mb-2 leading-tight">Accounting software for small businesses.</p>
                                    <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold transition-colors">Connect</button>
                                </div>
                            </DashboardCard>

                            {/* App Card 2 */}
                            <DashboardCard className="!p-4 hover:shadow-md transition-all cursor-pointer group flex gap-4 items-start">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Database size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">PostgreSQL</h4>
                                    <p className="text-[10px] text-slate-400 mb-2 leading-tight">Direct read access to your databases.</p>
                                    <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold transition-colors">Connect</button>
                                </div>
                            </DashboardCard>

                            {/* App Card 3 */}
                            <DashboardCard className="!p-4 hover:shadow-md transition-all cursor-pointer group flex gap-4 items-start">
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">Auth0</h4>
                                    <p className="text-[10px] text-slate-400 mb-2 leading-tight">Secure authentication and user management.</p>
                                    <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold transition-colors">Connect</button>
                                </div>
                            </DashboardCard>

                            {/* App Card 4 (Locked) */}
                            <DashboardCard className="!p-4 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-not-allowed group flex gap-4 items-start border-dashed">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                                    <Lock size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-500">Salesforce</h4>
                                    <p className="text-[10px] text-slate-400 mb-2 leading-tight">Requires Enterprise Plan</p>
                                    <span className="text-[10px] font-bold text-indigo-500">Unlock</span>
                                </div>
                            </DashboardCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeIntegrationsPage;
