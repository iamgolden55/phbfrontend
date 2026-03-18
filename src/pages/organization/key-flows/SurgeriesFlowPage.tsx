import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
    StatCard,
    ListCard,
    ListItem
} from '../../../components/organization/DashboardWidgets';
import {
    Activity,
    Clock,
    Building2,
    ClipboardList,
    AlertCircle
} from 'lucide-react';

const SurgeriesFlowPage: React.FC = () => {
    const navigate = useNavigate();

    // Mock Data
    const todaysSchedule: ListItem[] = [
        {
            id: '1',
            title: '08:00 AM - OR 1',
            subtitle: 'Appendectomy • Dr. Smith',
            rightContent: <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">In Progress</span>
        },
        {
            id: '2',
            title: '10:30 AM - OR 2',
            subtitle: 'Hip Replacement • Dr. Johnson',
            rightContent: <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Pre-op</span>
        },
        {
            id: '3',
            title: '01:00 PM - OR 1',
            subtitle: 'Hernia Repair • Dr. Smith',
            rightContent: <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Scheduled</span>
        }
    ];

    const recoveryStatus: ListItem[] = [
        {
            id: '1',
            title: 'John Doe',
            subtitle: 'PACU Bed 3 • Stable',
            rightContent: <span className="text-gray-500 text-sm">Since 09:15 AM</span>
        },
        {
            id: '2',
            title: 'Jane Smith',
            subtitle: 'PACU Bed 1 • Awaiting Ward Transfer',
            rightContent: <span className="text-green-600 text-sm font-medium">Ready</span>
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <Helmet>
                <title>Surgical Unit Overview | PHB</title>
            </Helmet>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Surgical Unit Overview</h1>
                    <p className="text-gray-500">Manage surgical schedules, OR occupancy, and post-op recovery.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2 transition-colors">
                        <ClipboardList size={16} />
                        View Requests
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2 shadow-sm transition-colors">
                        <Activity size={16} />
                        Schedule Surgery
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Scheduled Today"
                    value="12"
                    trend="3 emergency"
                    trendDirection="up"
                    icon={Clock}
                    iconColor="text-blue-500"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    title="OR Occupancy"
                    value="4/6"
                    trend="Operating Rooms"
                    trendDirection="up"
                    icon={Building2}
                    iconColor="text-orange-500"
                    bgColor="bg-orange-50"
                />
                <StatCard
                    title="Recovery Room"
                    value="85%"
                    trend="Capacity"
                    trendDirection="up"
                    icon={Activity}
                    iconColor="text-green-500"
                    bgColor="bg-green-50"
                />
                <StatCard
                    title="Pre-op Pending"
                    value="5"
                    trend="Clearance needed"
                    trendDirection="down" // action needed
                    icon={AlertCircle}
                    iconColor="text-red-500"
                    bgColor="bg-red-50"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <ListCard
                    title="Today's Schedule"
                    items={todaysSchedule}
                    action={
                        <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            Full Schedule
                        </button>
                    }
                />

                {/* Recovery Status */}
                <ListCard
                    title="Post-op Recovery Monitor"
                    items={recoveryStatus}
                    action={
                        <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            View Ward
                        </button>
                    }
                />
            </div>
        </div>
    );
};

export default SurgeriesFlowPage;
