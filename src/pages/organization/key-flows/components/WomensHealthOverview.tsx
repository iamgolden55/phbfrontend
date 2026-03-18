import React from 'react';
import {
    StatCard,
    ListCard,
    ListItem
} from '../../../../components/organization/DashboardWidgets';
import {
    Users,
    Calendar,
    AlertTriangle,
    Heart,
    FileText
} from 'lucide-react';

const WomensHealthOverview: React.FC = () => {
    // Mock Data
    const recentScreenings: ListItem[] = [
        {
            id: '1',
            title: 'Sarah Jenkins',
            subtitle: 'Mammogram Screening • Normal',
            rightContent: <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Completed</span>
        },
        {
            id: '2',
            title: 'Emily Rodriguez',
            subtitle: 'Pap Smear • Awaiting Results',
            rightContent: <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">Processing</span>
        },
        {
            id: '3',
            title: 'Michelle Chang',
            subtitle: 'Bone Density Scan • Normal',
            rightContent: <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Completed</span>
        },
        {
            id: '4',
            title: 'Patricia Wilson',
            subtitle: 'Genetic Counseling • Scheduled',
            rightContent: <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Upcoming</span>
        }
    ];

    const criticalFollowups: ListItem[] = [
        {
            id: '1',
            title: 'Jessica Thompson',
            subtitle: 'Abnormal Mammogram • High Priority',
            rightContent: <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded flex items-center gap-1"><AlertTriangle size={10} /> Action Req</span>
        },
        {
            id: '2',
            title: 'Amanda Lee',
            subtitle: 'Pap Smear Results • HSIL',
            rightContent: <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded flex items-center gap-1"><AlertTriangle size={10} /> Urgent</span>
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-gray-500">Monitor screenings, preventive care, and critical follow-ups.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2 transition-colors">
                        <FileText size={16} />
                        Reports
                    </button>
                    <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-medium text-sm flex items-center gap-2 shadow-sm transition-colors">
                        <Calendar size={16} />
                        Schedule Screening
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Patients"
                    value="1,248"
                    trend="+12 this month"
                    trendDirection="up"
                    icon={Users}
                    iconColor="text-pink-500"
                    bgColor="bg-pink-50"
                />
                <StatCard
                    title="Screenings Due"
                    value="86"
                    trend="14 overdue"
                    trendDirection="down" // down is usually bad, but red icon indicates urgency
                    icon={Calendar}
                    iconColor="text-orange-500"
                    bgColor="bg-orange-50"
                />
                <StatCard
                    title="Abnormal Results"
                    value="5"
                    trend="Requires attention"
                    trendDirection="down"
                    icon={AlertTriangle}
                    iconColor="text-red-500"
                    bgColor="bg-red-50"
                />
                <StatCard
                    title="Preventive Care"
                    value="94%"
                    trend="Compliance rate"
                    trendDirection="up"
                    icon={Heart}
                    iconColor="text-green-500"
                    bgColor="bg-green-50"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Critical Follow-ups */}
                <ListCard
                    title="Critical Follow-ups"
                    items={criticalFollowups}
                    action={
                        <button className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors">
                            View All Risks
                        </button>
                    }
                />

                {/* Recent Screenings */}
                <ListCard
                    title="Recent Screenings"
                    items={recentScreenings}
                    action={
                        <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            View Schedule
                        </button>
                    }
                />
            </div>
        </div>
    );
};

export default WomensHealthOverview;
