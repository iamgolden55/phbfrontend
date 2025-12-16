import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Bell,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Shield,
    Award,
    Hash,
    CreditCard,
    Edit3,
    QrCode,
    CheckCircle2,
    Filter
} from 'lucide-react';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';

// --- Reusable Components (Local to keep self-contained for now, or import if preferred) ---
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
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search profile..."
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

const EmployeeProfilePage: React.FC = () => {
    const { userData } = useOrganizationAuth();

    return (
        <div className="space-y-8 pb-12 font-sans text-slate-800 animate-in fade-in duration-500">
            <Helmet>
                <title>My Profile | SmartHR</title>
            </Helmet>

            <PageHeader />

            {/* Hero Section: Digital Identity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                    <DashboardCard className="!p-0 overflow-hidden relative min-h-[300px] flex flex-col justify-end group">
                        {/* Background with abstract pattern */}
                        <div className="absolute inset-0 bg-slate-900">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                        </div>

                        <div className="relative z-10 p-8 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-32 h-32 rounded-[24px] bg-white p-1.5 shadow-2xl rotate-3 transition-transform group-hover:rotate-0">
                                    <div className="w-full h-full rounded-[20px] bg-slate-200 overflow-hidden relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-slate-900">
                                        <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                                    </div>
                                </div>
                                <div className="text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-bold">{userData?.full_name || 'James Anderson'}</h1>
                                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">Verified</span>
                                    </div>
                                    <p className="text-slate-300 text-lg flex items-center gap-2 mb-1"><Briefcase size={16} className="text-blue-400" /> {userData?.role || 'Senior Product Designer'}</p>
                                    <p className="text-slate-400 text-sm flex items-center gap-2"><MapPin size={14} /> New York, USA</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg shadow-white/10">
                                    <Edit3 size={16} /> Edit Profile
                                </button>
                                <button className="p-3 bg-white/10 text-white rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
                                    <QrCode size={20} />
                                </button>
                            </div>
                        </div>
                    </DashboardCard>
                </div>

                {/* Right Hero: Stats */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <DashboardCard className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-none shadow-lg shadow-blue-500/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <h3 className="text-5xl font-bold mb-1 relative z-10">4.8</h3>
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest relative z-10">Performance Rating</p>
                        <div className="flex gap-1 mt-4 relative z-10">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i === 5 ? 'bg-white/30' : 'bg-white'}`}></div>)}
                        </div>
                    </DashboardCard>

                    <div className="grid grid-cols-2 gap-4">
                        <DashboardCard className="!p-5 bg-slate-50 border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-sm mb-3">
                                <Calendar size={18} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800">2.5 Yrs</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Tenure</p>
                        </DashboardCard>
                        <DashboardCard className="!p-5 bg-slate-50 border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-sm mb-3">
                                <Award size={18} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800">12</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Projects</p>
                        </DashboardCard>
                    </div>
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <DashboardCard>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <User size={20} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                            {[
                                { label: "Passport No.", value: "9876543210", icon: Shield },
                                { label: "Passport Exp.", value: "12 Mar 2028", icon: Calendar },
                                { label: "Phone", value: "+1 987 654 3210", icon: Phone },
                                { label: "Email", value: "hello@james.design", icon: Mail },
                                { label: "Nationality", value: "American", icon: MapPin },
                                { label: "Marital Status", value: "Married", icon: User },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="mt-1 text-slate-300"><item.icon size={16} /></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{item.label}</p>
                                        <p className="font-bold text-slate-800">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DashboardCard>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                                    <Shield size={20} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">Emergency Contact</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Primary Contact</p>
                                    <p className="font-bold text-slate-900 text-lg">John Doe</p>
                                    <p className="text-sm text-slate-500">Father</p>
                                </div>
                                <div className="flex items-center gap-3 p-3 text-slate-600">
                                    <Phone size={16} />
                                    <span className="font-bold">+1 234 567 8900</span>
                                </div>
                            </div>
                        </DashboardCard>

                        <DashboardCard>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                    <CreditCard size={20} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">Bank Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white shadow-lg">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-xs font-mono opacity-50">BANK OF AMERICA</span>
                                        <CreditCard size={16} className="opacity-50" />
                                    </div>
                                    <p className="font-mono text-lg tracking-widest mb-2">**** **** **** 1234</p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] opacity-50 uppercase">Account Holder</p>
                                            <p className="text-xs font-bold">JAMES ANDERSON</p>
                                        </div>
                                        <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </DashboardCard>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <DashboardCard>
                        <h3 className="font-bold text-lg text-slate-800 mb-6">Team Members</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Collaborator" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Sarah Smith</p>
                                        <p className="text-xs text-slate-400">Product Manager</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfilePage;
