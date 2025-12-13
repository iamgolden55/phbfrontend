import React from 'react';
import { Helmet } from 'react-helmet';
import {
    BarChart3,
    PieChart,
    TrendingUp,
    Calendar,
    Download
} from 'lucide-react';
import {
    ChartCard,
    AttendanceChart,
    DepartmentChart,
    EmployeeStatusChart
} from '../../components/organization/DashboardWidgets';

const ReportsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Helmet>
                <title>Reports & Analytics | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
                    <p className="text-gray-500 text-sm">View hospital performance, patient statistics, and financial reports.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Calendar size={18} />
                        <span>This Month</span>
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Download size={18} />
                        <span>Export All</span>
                    </button>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Patient Admissions Trend">
                    <EmployeeStatusChart />
                </ChartCard>
                <ChartCard title="Revenue by Department">
                    <DepartmentChart />
                </ChartCard>
                <ChartCard title="Appointment Status">
                    <AttendanceChart />
                </ChartCard>
                <ChartCard title="Inventory Usage">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400">
                        Inventory Chart Placeholder
                    </div>
                </ChartCard>
            </div>
        </div>
    );
};

export default ReportsPage;
