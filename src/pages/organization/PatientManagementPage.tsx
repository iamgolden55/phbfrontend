import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    FileText,
    Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data
const mockPatients = [
    { id: 'P-1001', name: 'James Wilson', age: 45, gender: 'Male', phone: '+234 801 234 5678', lastVisit: '2023-12-01', status: 'Admitted', condition: 'Malaria' },
    { id: 'P-1002', name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '+234 802 345 6789', lastVisit: '2023-11-28', status: 'Outpatient', condition: 'Checkup' },
    { id: 'P-1003', name: 'Michael Brown', age: 58, gender: 'Male', phone: '+234 803 456 7890', lastVisit: '2023-12-03', status: 'Discharged', condition: 'Hypertension' },
    { id: 'P-1004', name: 'Emily Davis', age: 24, gender: 'Female', phone: '+234 804 567 8901', lastVisit: '2023-12-02', status: 'Admitted', condition: 'Typhoid' },
    { id: 'P-1005', name: 'David Miller', age: 12, gender: 'Male', phone: '+234 805 678 9012', lastVisit: '2023-11-30', status: 'Outpatient', condition: 'Flu' },
];

const PatientManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredPatients = mockPatients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || patient.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Admission Modal State
    const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
    const [selectedPatientForAdmission, setSelectedPatientForAdmission] = useState<any | null>(null);
    const [selectedWard, setSelectedWard] = useState('General Ward');
    const [selectedBed, setSelectedBed] = useState<string | null>(null);

    const handleOpenAdmitModal = (patient: any) => {
        setSelectedPatientForAdmission(patient);
        setIsAdmitModalOpen(true);
    };

    const handleCloseAdmitModal = () => {
        setIsAdmitModalOpen(false);
        setSelectedPatientForAdmission(null);
        setSelectedBed(null);
    };

    const handleAdmitPatient = () => {
        // Logic to update patient status and assign bed would go here
        alert(`Admitting ${selectedPatientForAdmission.name} to ${selectedWard} - Bed ${selectedBed}`);
        handleCloseAdmitModal();
    };

    // Mock Wards & Beds
    const wards = ['General Ward', 'ICU', 'Maternity', 'Pediatrics'];
    const beds = Array.from({ length: 10 }, (_, i) => ({ id: `B-${i + 1}`, status: i % 3 === 0 ? 'Occupied' : 'Available' }));

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Patient Management | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
                    <p className="text-gray-500 text-sm">Manage patient records, admissions, and history.</p>
                </div>
                <Link
                    to="/organization/patients/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>New Patient</span>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search patients by name or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Filter size={18} />
                        <span className="text-sm font-medium">Filter:</span>
                    </div>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Admitted">Admitted</option>
                        <option value="Outpatient">Outpatient</option>
                        <option value="Discharged">Discharged</option>
                    </select>
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Patient ID</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Age/Gender</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Last Visit</th>
                                <th className="px-6 py-4">Condition</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{patient.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                    {patient.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-800">{patient.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{patient.age} / {patient.gender}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{patient.lastVisit}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{patient.condition}</td>
                                        <td className="px-6 py-4">
                                            <span className={`
                        px-2.5 py-1 rounded-full text-xs font-medium
                        ${patient.status === 'Admitted' ? 'bg-red-100 text-red-700' :
                                                    patient.status === 'Outpatient' ? 'bg-green-100 text-green-700' :
                                                        'bg-gray-100 text-gray-700'}
                      `}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Record">
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenAdmitModal(patient)}
                                                    className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                    title="Admit Patient"
                                                >
                                                    <FileText size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        No patients found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{mockPatients.length}</span> patients</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>

            {/* Admission Modal */}
            {isAdmitModalOpen && selectedPatientForAdmission && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Admit Patient</h2>
                            <button onClick={handleCloseAdmitModal} className="text-gray-400 hover:text-gray-600">
                                <Trash2 size={24} className="transform rotate-45" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-600 font-medium">Patient</p>
                                <p className="text-lg font-bold text-blue-900">{selectedPatientForAdmission.name}</p>
                                <p className="text-xs text-blue-500 mt-1">ID: {selectedPatientForAdmission.id}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Ward</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedWard}
                                    onChange={(e) => setSelectedWard(e.target.value)}
                                >
                                    {wards.map(ward => (
                                        <option key={ward} value={ward}>{ward}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Bed</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {beds.map(bed => (
                                        <button
                                            key={bed.id}
                                            disabled={bed.status === 'Occupied'}
                                            onClick={() => setSelectedBed(bed.id)}
                                            className={`
                                                p-2 rounded-lg text-xs font-medium border transition-colors
                                                ${bed.status === 'Occupied' ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' :
                                                    selectedBed === bed.id ? 'bg-blue-600 text-white border-blue-600' :
                                                        'bg-white text-gray-600 border-gray-200 hover:border-blue-500'}
                                            `}
                                        >
                                            {bed.id}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-gray-200 rounded"></div> Available</div>
                                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded"></div> Occupied</div>
                                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded"></div> Selected</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Admission Notes</label>
                                <textarea className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" placeholder="Reason for admission..."></textarea>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={handleCloseAdmitModal}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdmitPatient}
                                disabled={!selectedBed}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Admission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientManagementPage;
