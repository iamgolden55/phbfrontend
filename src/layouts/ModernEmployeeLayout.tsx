import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';
import { EmployeeChatBot } from '../features/employee/components/EmployeeChatBot';
import {
    LayoutDashboard,
    User,
    Calendar,
    Briefcase,
    FileText,
    Clock,
    LogOut,
    Bell,
    Search,
    Menu,
    Settings,
    CreditCard,
    CheckSquare,
    Building2
} from 'lucide-react';

const ModernEmployeeLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { userData, logout } = useOrganizationAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/organization/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Employee-specific navigation items
    const navItems = [
        { label: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
        { label: 'My Profile', path: '/employee/profile', icon: User },
        { label: 'Attendance', path: '/employee/attendance', icon: Clock },
        { label: 'Leaves', path: '/employee/leaves', icon: Calendar },
        { label: 'Projects', path: '/employee/projects', icon: Briefcase },
        { label: 'Tasks', path: '/employee/tasks', icon: CheckSquare },
        { label: 'Payslips', path: '/employee/payslips', icon: FileText },
        { label: 'Admin View', path: '/organization/dashboard', icon: Building2 },
        { label: 'Settings', path: '/employee/settings', icon: Settings },
    ];

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            S
                        </div>
                        {isSidebarOpen && <span>SmartHR</span>}
                    </div>
                </div>

                {/* Navigation */}
                <div className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    <div className="mb-4">
                        {isSidebarOpen && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Employee Menu</p>}
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors mb-1
                  ${isActive(item.path)
                                        ? 'bg-orange-50 text-orange-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
                            >
                                <item.icon size={20} className={isActive(item.path) ? 'text-orange-500' : 'text-gray-400'} />
                                {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                            </Link>
                        ))}
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-red-600 hover:bg-red-50 mt-8
            `}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`
          flex-1 flex flex-col min-h-screen transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
        `}
            >
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (window.innerWidth >= 768) {
                                    toggleSidebar();
                                } else {
                                    toggleMobileMenu();
                                }
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-64 lg:w-96">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="p-2 hover:bg-gray-100 rounded-full relative text-gray-500">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-gray-800">{userData?.full_name || 'Employee'}</p>
                                <p className="text-xs text-gray-500">{userData?.role || 'Staff Member'}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                                {userData?.full_name?.charAt(0) || 'E'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>

            {/* Employee Assistant Chatbot */}
            <EmployeeChatBot />

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default ModernEmployeeLayout;
