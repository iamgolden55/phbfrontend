import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Filter, Scan, CheckCircle, Clock, AlertCircle, FileText, Upload, X, Eye } from 'lucide-react';

// Mock Data for Radiology Requests
const mockRadiologyRequests = [
    { id: 'RAD-2024-001', patientName: 'James Wilson', patientId: 'P-1001', type: 'X-Ray', bodyPart: 'Chest', priority: 'Routine', status: 'Pending', requestedBy: 'Dr. Smith', date: '2024-03-20' },
    { id: 'RAD-2024-002', patientName: 'Sarah Johnson', patientId: 'P-1002', type: 'MRI', bodyPart: 'Brain', priority: 'Urgent', status: 'Processing', requestedBy: 'Dr. Jones', date: '2024-03-20' },
    { id: 'RAD-2024-003', patientName: 'Michael Brown', patientId: 'P-1003', type: 'CT Scan', bodyPart: 'Abdomen', priority: 'Routine', status: 'Completed', requestedBy: 'Dr. Smith', date: '2024-03-19' },
    { id: 'RAD-2024-004', patientName: 'Emily Davis', patientId: 'P-1004', type: 'Ultrasound', bodyPart: 'Pelvis', priority: 'Routine', status: 'Pending', requestedBy: 'Dr. Wilson', date: '2024-03-20' },
    { id: 'RAD-2024-005', patientName: 'David Miller', patientId: 'P-1005', type: 'X-Ray', bodyPart: 'Left Leg', priority: 'Urgent', status: 'Pending', requestedBy: 'Dr. Jones', date: '2024-03-20' },
];

const RadiologyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'queue' | 'history'>('queue');
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleOpenUploadModal = (request: any) => {
        setSelectedRequest(request);
        setIsUploadModalOpen(true);
    };

    const handleCloseUploadModal = () => {
        setSelectedRequest(null);
        setIsUploadModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Radiology & Imaging | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Radiology & Imaging</h1>
                    <p className="text-gray-500 text-sm">Manage imaging requests, upload scans, and write reports.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Scan size={18} />
                        <span>New Request</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Scan size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Pending Scans</p>
                        <p className="text-2xl font-bold text-gray-800">8</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">In Progress</p>
                        <p className="text-2xl font-bold text-gray-800">3</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Completed Today</p>
                        <p className="text-2xl font-bold text-gray-800">15</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Reports Pending</p>
                        <p className="text-2xl font-bold text-gray-800">4</p>
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
                            Request Queue
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
                            placeholder="Search by patient name, ID, or scan type..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Request ID</th>
                                <th className="px-6 py-4">Patient</th>
                                <th className="px-6 py-4">Scan Type</th>
                                <th className="px-6 py-4">Body Part</th>
                                <th className="px-6 py-4">Priority</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockRadiologyRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{request.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{request.patientName}</p>
                                            <p className="text-xs text-gray-500">{request.patientId}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{request.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{request.bodyPart}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${request.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {request.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                request.status === 'Processing' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {request.status !== 'Completed' ? (
                                            <button
                                                onClick={() => handleOpenUploadModal(request)}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Upload Scan
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="text-gray-400 hover:text-blue-600" title="View Scan">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="text-gray-400 hover:text-blue-600" title="View Report">
                                                    <FileText size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && selectedRequest && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Upload Imaging & Report</h2>
                            <button onClick={handleCloseUploadModal} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Patient Info Summary */}
                            <div className="bg-purple-50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-purple-600 font-medium">Patient</p>
                                    <p className="text-lg font-bold text-purple-900">{selectedRequest.patientName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-purple-600 font-medium">Scan</p>
                                    <p className="text-lg font-bold text-purple-900">{selectedRequest.type} - {selectedRequest.bodyPart}</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload DICOM/Image Files</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                        <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                                        <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400 mt-1">DICOM, JPG, PNG (Max 50MB)</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Radiologist Report</label>
                                    <textarea className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="Enter findings, impressions, and recommendations..."></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Preliminary Report</option>
                                        <option>Final Report</option>
                                        <option>Addendum</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={handleCloseUploadModal}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCloseUploadModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RadiologyPage;
