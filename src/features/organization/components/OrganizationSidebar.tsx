import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useOrganizationAuth } from '../organizationAuthContext';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    Calendar,
    Clock,
    CreditCard,
    BarChart3,
    Building2,
    Activity,
    Pill,
    Microscope,
    Scan,
    Package,
    UserCheck,
    ClipboardList,
    CheckSquare,
    TrendingUp,
    AlertTriangle,
    BookOpen,
    Shield
} from 'lucide-react';

interface OrganizationSidebarProps {
    isOpen: boolean;
    isMobileMenuOpen: boolean;
    onCloseMobile: () => void;
}

const navSections = [
    {
        title: 'Overview',
        items: [
            { label: 'Dashboard', path: '/organization/dashboard', icon: LayoutDashboard },
            { label: 'Analytics', path: '/organization/analytics', icon: TrendingUp },
        ]
    },
    {
        title: 'Patient Management',
        items: [
            { label: 'Patients', path: '/organization/patients', icon: Users },
            { label: 'User Registrations', path: '/organization/user-registrations', icon: UserCheck },
            { label: 'Patient Admissions', path: '/organization/admissions', icon: ClipboardList },
            { label: 'Registration Approvals', path: '/organization/registration-approvals', icon: CheckSquare },
        ]
    },
    {
        title: 'Clinical & Care',
        items: [
            { label: 'Clinical', path: '/organization/clinical', icon: FileText },
            { label: 'Clinical Guidelines', path: '/organization/clinical-guidelines', icon: BookOpen },
            { label: 'Appointments', path: '/organization/appointments', icon: Calendar },
            { label: 'Surgery', path: '/organization/surgery', icon: Activity },
            { label: 'Emergency', path: '/organization/emergency', icon: AlertTriangle },
        ]
    },
    {
        title: 'Services',
        items: [
            { label: 'Pharmacy', path: '/organization/pharmacy', icon: Pill },
            { label: 'Lab & Vitals', path: '/organization/lab', icon: Microscope },
            { label: 'Radiology', path: '/organization/radiology', icon: Scan },
        ]
    },
    {
        title: 'Operations',
        items: [
            { label: 'Billing', path: '/organization/billing', icon: CreditCard },
            { label: 'Inventory', path: '/organization/inventory', icon: Package },
            { label: 'Reports', path: '/organization/reports', icon: BarChart3 },
        ]
    },
    {
        title: 'Staff & Admin',
        items: [
            { label: 'Departments', path: '/organization/departments', icon: Building2 },
            { label: 'Staff Management', path: '/organization/staff', icon: Briefcase },
            { label: 'Staff Roster', path: '/organization/staffing', icon: Clock },
            { label: 'Hospital Licenses', path: '/organization/licenses', icon: Shield },
        ]
    },
    {
        title: 'System',
        items: [
            { label: 'Employee View', path: '/employee/dashboard', icon: Users },
            { label: 'Settings', path: '/organization/settings', icon: Settings },
        ]
    }
];

const OrganizationSidebar: React.FC<OrganizationSidebarProps> = ({
    isOpen,
    isMobileMenuOpen,
    onCloseMobile
}) => {
    const { logout } = useOrganizationAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
        const initialState: Record<string, boolean> = {};
        navSections.forEach(section => {
            initialState[section.title] = true;
        });
        return initialState;
    });

    const handleLogout = () => {
        logout();
        navigate('/organization/login');
    };

    const toggleSection = (sectionTitle: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionTitle]: !prev[sectionTitle]
        }));
    };

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    // Auto-expand section containing the current active page
    useEffect(() => {
        const currentPath = location.pathname;
        navSections.forEach(section => {
            const hasActivePage = section.items.some(item => isActive(item.path));
            if (hasActivePage && !expandedSections[section.title]) {
                setExpandedSections(prev => ({
                    ...prev,
                    [section.title]: true
                }));
            }
        });
    }, [location.pathname]);

    return (
        <>
            <aside
                data-tour="sidebar-nav"
                className={`
          fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-100 flex flex-col
          ${isOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-center border-b border-gray-50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <span className="font-bold text-lg">S</span>
                        </div>
                        {isOpen && (
                            <span className="font-bold text-xl text-gray-800 tracking-tight">SmartHR</span>
                        )}
                    </div>
                </div>

                {/* Scrollable Navigation */}
                <div className="flex-1 overflow-y-auto py-4 px-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {navSections.map((section, sectionIndex) => {
                        const isExpanded = expandedSections[section.title];
                        const hasActiveItem = section.items.some(item => isActive(item.path));

                        return (
                            <div key={section.title} className="mb-2">
                                {/* Section Header */}
                                {isOpen ? (
                                    <button
                                        data-tour={`sidebar-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                                        onClick={() => toggleSection(section.title)}
                                        className={`w-full flex items-center justify-between px-4 py-2 text-sm font-bold transition-colors group
                      ${hasActiveItem ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}
                    `}
                                    >
                                        <span>{section.title}</span>
                                        <div className="flex items-center gap-2">
                                            <ChevronDown
                                                size={16}
                                                className={`text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                                            />
                                        </div>
                                    </button>
                                ) : (
                                    <div className="px-2 mb-2 pt-2 border-t border-gray-100 first:border-0" />
                                )}

                                {/* Section Items */}
                                <div
                                    className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${(isExpanded || !isOpen) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                                >
                                    <div className="flex flex-col">
                                        {section.items.map((item) => {
                                            const active = isActive(item.path);
                                            return (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    onClick={() => isMobileMenuOpen && onCloseMobile()}
                                                    title={!isOpen ? item.label : undefined}
                                                    className={`
                            flex items-center gap-3 px-4 py-1.5 transition-all duration-200 relative
                            ${active
                                                            ? 'text-blue-700 font-medium bg-blue-50/50'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
                          `}
                                                >
                                                    {/* Active Border Indicator */}
                                                    {active && (
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                                                    )}

                                                    <item.icon
                                                        size={18}
                                                        className={`
                              shrink-0 transition-colors duration-200
                              ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                            `}
                                                    />
                                                    {isOpen && (
                                                        <span className="text-sm truncate">{item.label}</span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Actions */}
                <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                    <button
                        onClick={handleLogout}
                        className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
              text-red-600 hover:bg-red-50 hover:shadow-sm
            `}
                    >
                        <LogOut size={20} className="shrink-0" />
                        {isOpen && <span className="font-medium text-sm">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default OrganizationSidebar;
