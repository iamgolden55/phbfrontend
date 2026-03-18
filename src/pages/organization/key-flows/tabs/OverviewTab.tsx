import React from 'react';
import { Activity, AlertTriangle, Calendar, CheckCircle, Clock } from 'lucide-react';

const OverviewTab = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Patient Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Vitals Summary */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="text-indigo-600" size={20} />
                        <h3 className="font-semibold text-gray-800">Latest Vitals</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                            <span className="text-gray-500 text-sm">Blood Pressure</span>
                            <span className="font-bold text-gray-900">120/80 <span className="text-xs font-normal text-gray-400">mmHg</span></span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                            <span className="text-gray-500 text-sm">Heart Rate</span>
                            <span className="font-bold text-gray-900">72 <span className="text-xs font-normal text-gray-400">bpm</span></span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                            <span className="text-gray-500 text-sm">Weight</span>
                            <span className="font-bold text-gray-900">185 <span className="text-xs font-normal text-gray-400">lbs</span></span>
                        </div>
                    </div>
                </div>

                {/* Adherence */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="text-green-600" size={20} />
                        <h3 className="font-semibold text-gray-800">Adherence</h3>
                    </div>
                    <div className="flex items-center justify-center p-4">
                        {/* Placeholder for Donut Chart */}
                        <div className="relative w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent rotation-45" style={{ transform: 'rotate(-45deg)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                            <div className="text-center">
                                <span className="text-2xl font-bold text-gray-900">85%</span>
                                <span className="text-[10px] text-gray-400 block uppercase tracking-wide">Overall</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Meds</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Vitals</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Activity</span>
                    </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="text-amber-500" size={20} />
                        <h3 className="font-semibold text-gray-800">Recent Alerts</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex gap-3 items-start">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                            <div>
                                <div className="text-sm font-semibold text-red-900">High BP Reading</div>
                                <div className="text-xs text-red-700">150/95 recorded yesterday at 2PM</div>
                            </div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex gap-3 items-start">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                            <div>
                                <div className="text-sm font-semibold text-amber-900">Missed Medication</div>
                                <div className="text-xs text-amber-700">Evening Metformin dose skipped.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Calendar size={18} className="text-gray-500" /> Upcoming Tasks
                    </h3>
                    <button className="text-sm text-indigo-600 hover:underline">View All</button>
                </div>
                <div className="overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-semibold">
                            <tr>
                                <th className="px-4 py-3">Task</th>
                                <th className="px-4 py-3">Due Date</th>
                                <th className="px-4 py-3">Assigned To</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="px-4 py-3 font-medium text-gray-900">Annual Foot Exam</td>
                                <td className="px-4 py-3">Jun 25, 2024</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">LM</div>
                                    Liam Malik
                                </td>
                                <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Scheduled</span></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium text-gray-900">Hba1c Lab Test</td>
                                <td className="px-4 py-3">Jun 28, 2024</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-[10px] font-bold">SJ</div>
                                    Sarah Jones
                                </td>
                                <td className="px-4 py-3"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">Pending Output</span></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium text-gray-900">Nutritionist Consultation</td>
                                <td className="px-4 py-3">Jul 02, 2024</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">DA</div>
                                    Dr. Adams
                                </td>
                                <td className="px-4 py-3"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Proposed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
