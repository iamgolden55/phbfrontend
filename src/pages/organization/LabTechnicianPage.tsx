import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Filter, FlaskConical, CheckCircle, Clock, AlertCircle, FileText, Upload, X } from 'lucide-react';

// Mock Data for Lab Tests
const mockLabTests = [
    { id: 'LAB-2024-001', patientName: 'John Doe', patientId: 'P-1001', testName: 'Complete Blood Count (CBC)', priority: 'Routine', status: 'Pending', requestedBy: 'Dr. Smith', date: '2024-03-20' },
    { id: 'LAB-2024-002', patientName: 'Sarah Johnson', patientId: 'P-1002', testName: 'Lipid Profile', priority: 'Urgent', status: 'Processing', requestedBy: 'Dr. Jones', date: '2024-03-20' },
    { id: 'LAB-2024-003', patientName: 'Michael Brown', patientId: 'P-1003', testName: 'Blood Glucose (Fasting)', priority: 'Routine', status: 'Completed', requestedBy: 'Dr. Smith', date: '2024-03-19' },
    { id: 'LAB-2024-004', patientName: 'Emily Davis', patientId: 'P-1004', testName: 'Thyroid Function Test', priority: 'Routine', status: 'Pending', requestedBy: 'Dr. Wilson', date: '2024-03-20' },
    { id: 'LAB-2024-005', patientName: 'David Miller', patientId: 'P-1005', testName: 'Urinalysis', priority: 'Urgent', status: 'Pending', requestedBy: 'Dr. Jones', date: '2024-03-20' },
];

const LabTechnicianPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'queue' | 'history'>('queue');
    const [selectedTest, setSelectedTest] = useState<any | null>(null);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);

    const handleOpenResultModal = (test: any) => {
        setSelectedTest(test);
        setIsResultModalOpen(true);
    };

    const handleCloseResultModal = () => {
        setSelectedTest(null);
        setIsResultModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Lab Technician Dashboard | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Laboratory Management</h1>
                    <p className="text-gray-500 text-sm">Manage test requests, enter results, and view history.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <FlaskConical size={18} />
                        <span>New Test</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <FlaskConical size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Pending Tests</p>
                        <p className="text-2xl font-bold text-gray-800">12</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Processing</p>
                        <p className="text-2xl font-bold text-gray-800">5</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Completed Today</p>
                        <p className="text-2xl font-bold text-gray-800">28</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Critical Results</p>
                        <p className="text-2xl font-bold text-gray-800">2</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-100">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('queue')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'queue' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Test Queue
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            History
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by patient name, ID, or test type..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Test ID</th>
                                <th className="px-6 py-4">Patient</th>
                                <th className="px-6 py-4">Test Name</th>
                                <th className="px-6 py-4">Priority</th>
                                <th className="px-6 py-4">Requested By</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockLabTests.map((test) => (
                                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{test.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{test.patientName}</p>
                                            <p className="text-xs text-gray-500">{test.patientId}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{test.testName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${test.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {test.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{test.requestedBy}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${test.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                test.status === 'Processing' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {test.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {test.status !== 'Completed' ? (
                                            <button
                                                onClick={() => handleOpenResultModal(test)}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Enter Result
                                            </button>
                                        ) : (
                                            <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                                                View Report
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Result Entry Modal */}
            {isResultModalOpen && selectedTest && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Enter Test Results</h2>
                            <button onClick={handleCloseResultModal} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Patient Info Summary */}
                            <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-blue-600 font-medium">Patient</p>
                                    <p className="text-lg font-bold text-blue-900">{selectedTest.patientName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-blue-600 font-medium">Test</p>
                                    <p className="text-lg font-bold text-blue-900">{selectedTest.testName}</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Result Value</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 14.5 g/dL" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Range</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 13.5 - 17.5 g/dL" defaultValue="13.5 - 17.5 g/dL" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes</label>
                                    <textarea className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" placeholder="Enter any observations..."></textarea>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                        <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={handleCloseResultModal}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCloseResultModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Submit Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabTechnicianPage;
