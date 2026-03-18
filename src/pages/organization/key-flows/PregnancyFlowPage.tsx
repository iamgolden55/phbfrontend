import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
    StatCard,
    ListCard,
    ListItem
} from '../../../components/organization/DashboardWidgets';
import {
    Baby,
    Calendar,
    Activity,
    Users,
    AlertTriangle,
    Stethoscope,
    Clock,
    Heart
} from 'lucide-react';

const PregnancyFlowPage: React.FC = () => {
    const navigate = useNavigate();

    // Mock Data
    const highRiskWatchlist: ListItem[] = [
        {
            id: '1',
            title: 'Maria Garcia',
            subtitle: 'Week 34 • Pre-eclampsia Warning',
            rightContent: <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded flex items-center gap-1"><AlertTriangle size={10} /> Daily Monitoring</span>
        },
        {
            id: '2',
            title: 'Hanna Kim',
            subtitle: 'Week 28 • Gestational Diabetes',
            rightContent: <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Dietary Review</span>
        },
        {
            id: '3',
            title: 'Sarah Jones',
            subtitle: 'Week 38 • Previous C-Section',
            rightContent: <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Birth Plan Ready</span>
        }
    ];

    const upcomingDueDates: ListItem[] = [
        {
            id: '1',
            title: 'Jennifer Wu',
            subtitle: 'Due: Oct 24 • First Baby',
            rightContent: <span className="text-gray-500 text-sm">3 days</span>
        },
        {
            id: '2',
            title: 'Rachel Green',
            subtitle: 'Due: Oct 26 • VBAC',
            rightContent: <span className="text-gray-500 text-sm">5 days</span>
        },
        {
            id: '3',
            title: 'Monica Geller',
            subtitle: 'Due: Oct 30 • Twins',
            rightContent: <span className="text-gray-500 text-sm">9 days</span>
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <Helmet>
                <title>Maternity Care Board | PHB</title>
            </Helmet>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Maternity Care Board</h1>
                    <p className="text-gray-500">Track pregnancies, high-risk cases, and upcoming deliveries.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2 transition-colors">
                        <Users size={16} />
                        Patient List
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm flex items-center gap-2 shadow-sm transition-colors">
                        <Baby size={16} />
                        New Pregnancy
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Pregnancies"
                    value="342"
                    trend="+5 this week"
                    trendDirection="up"
                    icon={Baby}
                    iconColor="text-purple-500"
                    bgColor="bg-purple-50"
                />
                <StatCard
                    title="High Risk Cases"
                    value="28"
                    trend="8.1% of total"
                    trendDirection="down" // neutral
                    icon={Activity}
                    iconColor="text-red-500"
                    bgColor="bg-red-50"
                />
                <StatCard
                    title="Due This Month"
                    value="45"
                    trend="12 next week"
                    trendDirection="up"
                    icon={Calendar}
                    iconColor="text-blue-500"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    title="Post-natal Care"
                    value="118"
                    trend="Active monitoring"
                    trendDirection="up"
                    icon={Heart}
                    iconColor="text-pink-500"
                    bgColor="bg-pink-50"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* High Risk Watchlist */}
                <ListCard
                    title="High Risk Watchlist"
                    items={highRiskWatchlist}
                    action={
                        <button className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors">
                            View All High Risk
                        </button>
                    }
                />

                {/* Upcoming Due Dates */}
                <ListCard
                    title="Upcoming Due Dates"
                    items={upcomingDueDates}
                    action={
                        <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            View Calendar
                        </button>
                    }
                />
            </div>
        </div>
    );
};

export default PregnancyFlowPage;
