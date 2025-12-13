import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, Filter, Download } from 'lucide-react';

const EmployeeAttendancePage: React.FC = () => {
    const [view, setView] = useState<'list' | 'calendar'>('list');

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Attendance | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
                    <p className="text-gray-500 text-sm">View your attendance history and working hours.</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
                        <button
                            onClick={() => setView('list')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'calendar' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Calendar
                        </button>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download size={18} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-xs mb-1">Total Working Days</p>
                    <p className="text-2xl font-bold text-gray-800">24</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-xs mb-1">Present Days</p>
                    <p className="text-2xl font-bold text-green-600">22</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-xs mb-1">Absent Days</p>
                    <p className="text-2xl font-bold text-red-600">1</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-xs mb-1">Late Arrivals</p>
                    <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {view === 'list' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Punch In</th>
                                    <th className="px-6 py-4">Punch Out</th>
                                    <th className="px-6 py-4">Production</th>
                                    <th className="px-6 py-4">Break</th>
                                    <th className="px-6 py-4">Overtime</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">Mar {i + 10}, 2025</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">09:00 AM</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">06:00 PM</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">8h 15m</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">45m</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">0h 0m</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                Present
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Calendar view is under development.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeAttendancePage;
