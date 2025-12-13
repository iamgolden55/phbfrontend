import React from 'react';
import { Helmet } from 'react-helmet';
import {
    CreditCard,
    DollarSign,
    FileText,
    TrendingUp,
    Download,
    Plus,
    Search,
    Filter
} from 'lucide-react';
import { StatCard } from '../../components/organization/DashboardWidgets';

const BillingManagementPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Helmet>
                <title>Billing & Finance | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Billing & Finance</h1>
                    <p className="text-gray-500 text-sm">Manage invoices, payments, and insurance claims.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download size={18} />
                        <span>Export Report</span>
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus size={18} />
                        <span>New Invoice</span>
                    </button>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="$124,500"
                    trend="+12%"
                    trendDirection="up"
                    icon={DollarSign}
                    iconColor="text-green-600"
                    bgColor="bg-green-50"
                />
                <StatCard
                    title="Pending Payments"
                    value="$12,340"
                    trend="23 Invoices"
                    trendDirection="down"
                    icon={CreditCard}
                    iconColor="text-orange-500"
                    bgColor="bg-orange-50"
                />
                <StatCard
                    title="Insurance Claims"
                    value="$45,200"
                    trend="Processing"
                    trendDirection="up"
                    icon={FileText}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    title="Expenses"
                    value="$32,100"
                    trend="+5%"
                    trendDirection="down"
                    icon={TrendingUp}
                    iconColor="text-red-500"
                    bgColor="bg-red-50"
                />
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Invoices</h3>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search invoices..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                            <Filter size={18} />
                            <span className="hidden md:inline">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Invoice ID</th>
                                <th className="px-6 py-4">Patient</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Payment Method</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { id: 'INV-2023-001', patient: 'James Wilson', date: '2023-12-01', amount: '$150.00', status: 'Paid', method: 'Credit Card' },
                                { id: 'INV-2023-002', patient: 'Sarah Johnson', date: '2023-12-02', amount: '$75.00', status: 'Pending', method: 'Insurance' },
                                { id: 'INV-2023-003', patient: 'Michael Brown', date: '2023-12-03', amount: '$1,200.00', status: 'Paid', method: 'Bank Transfer' },
                                { id: 'INV-2023-004', patient: 'Emily Davis', date: '2023-12-04', amount: '$450.00', status: 'Overdue', method: 'Cash' },
                                { id: 'INV-2023-005', patient: 'David Miller', date: '2023-12-04', amount: '$200.00', status: 'Pending', method: 'Insurance' },
                            ].map((invoice, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-blue-600">{invoice.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{invoice.patient}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{invoice.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`
                      px-2.5 py-1 rounded-full text-xs font-medium
                      ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                invoice.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-red-100 text-red-700'}
                    `}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.method}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BillingManagementPage;
