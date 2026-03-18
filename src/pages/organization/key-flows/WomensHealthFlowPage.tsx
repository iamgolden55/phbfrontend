import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    LayoutDashboard,
    CalendarDays,
    ClipboardList,
    Users,
    Settings,
    Menu,
    CheckSquare,
    Pill // Added Pill icon
} from 'lucide-react';
import WomensHealthOverview from './components/WomensHealthOverview';
import WomensHealthSchedule from './components/WomensHealthSchedule';
import WomensHealthActivityCalendar from './components/WomensHealthActivityCalendar';
import WomensHealthPatients from './components/WomensHealthPatients';
import WomensHealthTaskPlanner from './components/WomensHealthTaskPlanner';
import WomensHealthMedication from './components/WomensHealthMedication'; // Added Medication import

const WomensHealthFlowPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'activities' | 'patients' | 'tasks' | 'medication'>('overview'); // Updated activeTab type
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <WomensHealthOverview />;
            case 'schedule':
                return <WomensHealthSchedule />;
            case 'activities':
                return <WomensHealthActivityCalendar />;
            case 'tasks':
                return <WomensHealthTaskPlanner />;
            case 'medication': // Added medication case
                return <WomensHealthMedication />;
            case 'patients':
                return <WomensHealthPatients />;
            default:
                return <WomensHealthOverview />;
        }
    };

    const NavItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === id
                ? 'bg-pink-50 text-pink-700 border-r-4 border-pink-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            <Icon size={20} className={activeTab === id ? 'text-pink-600' : 'text-gray-400'} />
            {isSidebarOpen && <span>{label}</span>}
        </button>
    );

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-50 -m-6 relative overflow-hidden">
            <Helmet>
                <title>Women's Health Management | PHB</title>
            </Helmet>

            {/* Sidebar */}
            <div
                className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'
                    } flex flex-col`}
            >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    {isSidebarOpen && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                <Users size={18} className="text-pink-600" />
                            </div>
                            <span className="font-bold text-gray-800">Women's Health</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-gray-100 rounded-md text-gray-500"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <div className="flex-1 py-4 space-y-1">
                    <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
                    <NavItem id="patients" icon={Users} label="Patients" />
                    <NavItem id="schedule" icon={CalendarDays} label="Visit Schedule" />
                    <NavItem id="activities" icon={ClipboardList} label="Care Templates" />
                    <NavItem id="tasks" icon={CheckSquare} label="Task Planner" />
                    <NavItem id="medication" icon={Pill} label="Medication" /> {/* Added Medication NavItem */}
                </div>

                <div className="p-4 border-t border-gray-200">
                    <button className={`w-full flex items-center space-x-3 px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors ${!isSidebarOpen && 'justify-center'}`}>
                        <Settings size={20} className="text-gray-400" />
                        {isSidebarOpen && <span>Settings</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden bg-gray-50 p-4 min-w-0">
                <div className="h-full flex flex-col min-w-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default WomensHealthFlowPage;
