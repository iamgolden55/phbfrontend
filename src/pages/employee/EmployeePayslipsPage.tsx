import React from 'react';
import { Helmet } from 'react-helmet';
import { Download, Eye, FileText } from 'lucide-react';

const EmployeePayslipsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Helmet>
                <title>Payslips | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Payslips</h1>
                    <p className="text-gray-500 text-sm">View and download your monthly payslips.</p>
                </div>
            </div>

            {/* Payslips List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Payslip ID</th>
                                <th className="px-6 py-4">Month</th>
                                <th className="px-6 py-4">Year</th>
                                <th className="px-6 py-4">Net Salary</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { id: '#PAY-00123', month: 'February', year: '2025', salary: '$4,500', status: 'Paid' },
                                { id: '#PAY-00122', month: 'January', year: '2025', salary: '$4,500', status: 'Paid' },
                                { id: '#PAY-00121', month: 'December', year: '2024', salary: '$4,200', status: 'Paid' },
                                { id: '#PAY-00120', month: 'November', year: '2024', salary: '$4,200', status: 'Paid' },
                                { id: '#PAY-00119', month: 'October', year: '2024', salary: '$4,200', status: 'Paid' },
                            ].map((payslip, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{payslip.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{payslip.month}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{payslip.year}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{payslip.salary}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            {payslip.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg" title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Download PDF">
                                                <Download size={18} />
                                            </button>
                                        </div>
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

export default EmployeePayslipsPage;
