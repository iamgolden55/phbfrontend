import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calendar, Plus, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { LeaveBalanceCard } from '../../components/organization/EmployeeWidgets';

const EmployeeLeavesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('history');

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Leaves | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Leaves</h1>
                    <p className="text-gray-500 text-sm">Manage your leave applications and view history.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={18} />
                    <span>Apply Leave</span>
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-2">Annual Leave</p>
                    <p className="text-3xl font-bold text-blue-600">12</p>
                    <p className="text-xs text-gray-400 mt-2">Days Available</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-2">Medical Leave</p>
                    <p className="text-3xl font-bold text-green-600">8</p>
                    <p className="text-xs text-gray-400 mt-2">Days Available</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-2">Casual Leave</p>
                    <p className="text-3xl font-bold text-orange-600">3</p>
                    <p className="text-xs text-gray-400 mt-2">Days Available</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-2">Used Leaves</p>
                    <p className="text-3xl font-bold text-gray-800">5</p>
                    <p className="text-xs text-gray-400 mt-2">Days Taken</p>
                </div>
            </div>

            {/* Leave History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Leave History</h3>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Leave Type</th>
                                <th className="px-6 py-4">From</th>
                                <th className="px-6 py-4">To</th>
                                <th className="px-6 py-4">Days</th>
                                <th className="px-6 py-4">Reason</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Approved By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { type: 'Medical Leave', from: '2025-03-10', to: '2025-03-12', days: 3, reason: 'Fever', status: 'Approved', by: 'Dr. Smith' },
                                { type: 'Casual Leave', from: '2025-02-15', to: '2025-02-15', days: 1, reason: 'Personal', status: 'Approved', by: 'HR Manager' },
                                { type: 'Annual Leave', from: '2025-04-20', to: '2025-04-25', days: 5, reason: 'Vacation', status: 'Pending', by: '-' },
                                { type: 'Medical Leave', from: '2025-01-05', to: '2025-01-06', days: 2, reason: 'Flu', status: 'Rejected', by: 'Dr. Smith' },
                            ].map((leave, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{leave.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{leave.from}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{leave.to}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{leave.days}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{leave.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full w-fit
                      ${leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                leave.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-red-100 text-red-700'}
                    `}>
                                            {leave.status === 'Approved' && <CheckCircle size={12} />}
                                            {leave.status === 'Pending' && <Clock size={12} />}
                                            {leave.status === 'Rejected' && <XCircle size={12} />}
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{leave.by}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLeavesPage;
