import React from 'react';
import { Helmet } from 'react-helmet';
import { Download, Eye, Calendar, DollarSign, Clock, FileText, ChevronRight, TrendingUp } from 'lucide-react';

const EmployeePayslipsPage: React.FC = () => {
    // Mock data for the statistics
    const stats = {
        hoursWorked: 1600,
        netSalary: 54000,
        nextPaymentDate: '28 Dec 2025',
        federalTaxes: 12500,
        stateTaxes: 4200,
        employerCost: 78000
    };

    // Mock data for payslips
    const payslips = [
        { id: '#PAY-2025-02', month: 'February', year: '2025', amount: '$4,500.00', date: '28 Feb 2025', status: 'Paid' },
        { id: '#PAY-2025-01', month: 'January', year: '2025', amount: '$4,500.00', date: '31 Jan 2025', status: 'Paid' },
        { id: '#PAY-2024-12', month: 'December', year: '2024', amount: '$4,200.00', date: '31 Dec 2024', status: 'Paid' },
        { id: '#PAY-2024-11', month: 'November', year: '2024', amount: '$4,200.00', date: '30 Nov 2024', status: 'Paid' },
        { id: '#PAY-2024-10', month: 'October', year: '2024', amount: '$4,200.00', date: '31 Oct 2024', status: 'Paid' },
        { id: '#PAY-2024-09', month: 'September', year: '2024', amount: '$4,200.00', date: '30 Sep 2024', status: 'Paid' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Helmet>
                <title>Payslips | SmartHR</title>
            </Helmet>

            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payslip</h1>
                <p className="text-gray-500 text-lg">Detailed records of employment earnings and deductions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Content: Playslips List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Policy / Info Card (Optional context) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Schedule</h3>
                        <p className="text-gray-500">
                            Employees operate on a monthly pay cycle. Direct deposits are processed on the last working day of each month.
                            Please ensure your banking details are up to date.
                        </p>
                    </div>

                    {/* Payslips Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900">Recent Paystubs</h2>
                            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                Download All
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Ref ID</th>
                                        <th className="px-6 py-4">Month</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Payment Date</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {payslips.map((payslip, i) => (
                                        <tr key={i} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                                        <FileText size={18} />
                                                    </div>
                                                    <span className="font-medium text-gray-700">{payslip.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{payslip.month}</div>
                                                <div className="text-xs text-gray-500">{payslip.year}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-gray-900">{payslip.amount}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">
                                                {payslip.date}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors flex items-center justify-end gap-1 ml-auto">
                                                    View Paystub
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Calendar className="text-gray-400" size={20} />
                            <h2 className="font-bold text-gray-900 text-lg">Year to date statistics</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Hours Worked</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-gray-900">{stats.hoursWorked}</span>
                                    <span className="text-sm text-green-600 font-medium flex items-center">
                                        <TrendingUp size={14} className="mr-1" /> +12%
                                    </span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            <div>
                                <p className="text-sm text-gray-500 mb-1">Net Salary</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-gray-900">${stats.netSalary.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            <div>
                                <p className="text-sm text-gray-500 mb-1">Next Payment Date</p>
                                <div className="flex items-center gap-2 text-gray-900 font-medium">
                                    <Clock size={16} className="text-primary" />
                                    {stats.nextPaymentDate}
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Federal Taxes (YTD)</p>
                                    <p className="font-semibold text-gray-900 text-lg">${stats.federalTaxes.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">State Taxes (YTD)</p>
                                    <p className="font-semibold text-gray-900 text-lg">${stats.stateTaxes.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            <div className="bg-gray-50 -mx-6 -mb-6 p-6 border-t border-gray-100 rounded-b-xl">
                                <p className="text-sm text-gray-500 mb-1">Employer Cost</p>
                                <p className="text-xl font-bold text-gray-900">${stats.employerCost.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Promo/Help Card */}
                    <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-6 text-white shadow-md">
                        <h3 className="font-bold text-lg mb-2">Need a detailed report?</h3>
                        <p className="text-blue-100 text-sm mb-4">You can request a comprehensive breakdown of your annual earnings for loan applications or visa requirements.</p>
                        <button className="w-full py-2.5 bg-white text-primary font-semibold rounded-lg text-sm hover:bg-blue-50 transition-colors">
                            Request Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeePayslipsPage;
