import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    FileText,
    Activity,
    Pill,
    Search,
    Plus,
    Calendar,
    User
} from 'lucide-react';

const ClinicalManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('ehr');

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Clinical Management | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Clinical Management</h1>
                    <p className="text-gray-500 text-sm">Manage patient health records, vitals, and prescriptions.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Search size={18} />
                        <span>Find Patient</span>
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus size={18} />
                        <span>New Encounter</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('ehr')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'ehr' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                    >
                        <FileText size={18} />
                        <span>Electronic Health Records</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('vitals')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'vitals' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                    >
                        <Activity size={18} />
                        <span>Vitals & Observations</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('prescriptions')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'prescriptions' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                    >
                        <Pill size={18} />
                        <span>Prescriptions</span>
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'ehr' && <EHRTab />}
                    {activeTab === 'vitals' && <VitalsTab />}
                    {activeTab === 'prescriptions' && <PrescriptionsTab />}
                </div>
            </div>
        </div>
    );
};

// Sub-components for Tabs
const EHRTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Recent Encounters</h3>
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                    type="text"
                    placeholder="Search records..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                JD
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800">John Doe</h4>
                                <p className="text-xs text-gray-500">ID: P-100{i}</p>
                            </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Completed</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span>Dec {i + 1}, 2023 - 09:30 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={14} className="text-gray-400" />
                            <span>Dr. Sarah Smith</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="font-medium text-gray-700">Diagnosis:</p>
                            <p>Acute Bronchitis</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const VitalsTab = () => (
    <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
            <Activity className="text-blue-600 mt-1" size={20} />
            <div>
                <h4 className="font-medium text-blue-800">Vitals Monitoring</h4>
                <p className="text-sm text-blue-600 mt-1">Select a patient to view or record vital signs including blood pressure, temperature, pulse, and respiratory rate.</p>
            </div>
        </div>

        <div className="text-center py-12 text-gray-500">
            <Activity size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium">No patient selected</p>
            <p className="text-sm">Please search for a patient to view vitals history.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Select Patient
            </button>
        </div>
    </div>
);

const PrescriptionsTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Active Prescriptions</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All History</button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="px-6 py-4">Medication</th>
                        <th className="px-6 py-4">Patient</th>
                        <th className="px-6 py-4">Dosage</th>
                        <th className="px-6 py-4">Frequency</th>
                        <th className="px-6 py-4">Prescribed By</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3, 4].map((i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                                        <Pill size={16} />
                                    </div>
                                    <span className="font-medium text-gray-800">Amoxicillin</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">James Wilson</td>
                            <td className="px-6 py-4 text-sm text-gray-600">500mg</td>
                            <td className="px-6 py-4 text-sm text-gray-600">3x Daily</td>
                            <td className="px-6 py-4 text-sm text-gray-600">Dr. Smith</td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Refill</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ClinicalManagementPage;
