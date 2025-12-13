import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';
import { OrganizationChatBot } from '../features/organization/components/OrganizationChatBot';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
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
  Bed,
  Package,
  UserCheck,
  ClipboardList,
  CheckSquare,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Shield
} from 'lucide-react';

const ModernOrganizationLayout: React.FC = () => {
  console.log('🚀 ModernOrganizationLayout is rendering!');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Overview': true,
    'Patient Management': false,
    'Clinical & Care': false,
    'Services': false,
    'Operations': false,
    'Staff & Admin': false,
    'System': false,
  });
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

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  // Navigation items organized by sections
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
          {navSections.map((section, sectionIndex) => {
            const isExpanded = expandedSections[section.title];
            const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

            return (
              <div key={section.title} className={sectionIndex > 0 ? 'mt-4' : ''}>
                {/* Section Header */}
                {isSidebarOpen ? (
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span>{section.title}</span>
                      {!isExpanded && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-gray-500 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                          {section.items.length}
                        </span>
                      )}
                    </div>
                    <ChevronIcon size={14} className="text-gray-400 group-hover:text-gray-600" />
                  </button>
                ) : (
                  <div className="h-px bg-gray-200 my-2 mx-2"></div>
                )}

                {/* Section Items */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${(isExpanded || !isSidebarOpen) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="space-y-1 py-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        title={!isSidebarOpen ? item.label : undefined}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                          ${isActive(item.path)
                            ? 'bg-orange-50 text-orange-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                        `}
                      >
                        <item.icon size={20} className={isActive(item.path) ? 'text-orange-500' : 'text-gray-400'} />
                        {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

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
                <p className="text-sm font-semibold text-gray-800">{userData?.full_name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{userData?.role || 'Administrator'}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                {userData?.full_name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Organization Guide Chatbot */}
      <OrganizationChatBot />

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

export default ModernOrganizationLayout;
