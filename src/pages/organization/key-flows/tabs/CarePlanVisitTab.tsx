import React from 'react';
import { Calendar, Clock, User, Clipboard, FileText, CheckSquare } from 'lucide-react';

const CarePlanVisitTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Current Visit</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Calendar size={14} /> June 24, 2024</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> 10:00 AM - 11:00 AM</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">Scheduled Visit</div>
                            <div className="text-xs text-gray-500">Routine Checkup</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            <User size={20} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Col: Vitals & Notes */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                <Clipboard size={16} className="text-indigo-600" /> Vitals Check
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Blood Pressure</label>
                                    <input type="text" placeholder="120/80" className="w-full text-sm p-2 rounded border border-gray-300 focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Heart Rate</label>
                                    <input type="text" placeholder="bpm" className="w-full text-sm p-2 rounded border border-gray-300 focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Temp</label>
                                    <input type="text" placeholder="°C" className="w-full text-sm p-2 rounded border border-gray-300 focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">O2 Sat</label>
                                    <input type="text" placeholder="%" className="w-full text-sm p-2 rounded border border-gray-300 focus:border-indigo-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                <FileText size={16} className="text-indigo-600" /> Clinical Notes
                            </h3>
                            <textarea
                                className="w-full h-32 p-3 text-sm border border-gray-300 rounded-lg focus:border-indigo-500 outline-none resize-none"
                                placeholder="Enter visit observations, patient complaints, and assessment notes..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Col: Visit Focus / Interventions */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <CheckSquare size={16} className="text-indigo-600" /> Visit Tasks / Interventions
                        </h3>
                        <div className="space-y-3">
                            {[
                                { text: "Check blood pressure and review logs", completed: false },
                                { text: "Review medication adherence for Metformin", completed: true },
                                { text: "Discuss dietary changes (low sodium)", completed: false },
                                { text: "Inspect feet for any sores or irritation", completed: false }
                            ].map((task, i) => (
                                <label key={i} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${task.completed ? 'bg-green-50 border-green-100' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="checkbox" defaultChecked={task.completed} className="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                                    <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{task.text}</span>
                                </label>
                            ))}
                        </div>
                        <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-shadow shadow-md">
                            Complete Visit & Sign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarePlanVisitTab;
