import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
    Search,
    Plus,
    Filter,
    Eye,
    Edit,
    Trash2,
    FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useOrganizationTour } from '../../features/organization/context/OrganizationTourContext';
import { useAdmissionData } from '../../hooks/useAdmissionData';
import PatientDetailModal from '../../components/modals/PatientDetailModal';

// Reusing the interface but mapped from AdmissionData
interface Patient {
    id: string;
    originalId: number; // Keep track of the numeric ID for finding
    name: string;
    age: string | number;
    gender: string;
    phone: string;
    lastVisit: string;
    status: string;
    condition: string;
}

const PatientManagementPage: React.FC = () => {
    const { admissions, loading, error } = useAdmissionData();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Detail/Edit Modal State
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detailModalMode, setDetailModalMode] = useState<{ id: string, edit: boolean } | null>(null);

    // Admission Modal State
    const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
    const [selectedPatientForAdmission, setSelectedPatientForAdmission] = useState<any | null>(null);
    const [selectedWard, setSelectedWard] = useState('General Ward');
    const [selectedBed, setSelectedBed] = useState<string | null>(null);

    // Joyride tour state
    const [runTour, setRunTour] = useState<boolean>(false);
    const { tourTrigger } = useOrganizationTour();

    // Tour steps
    const tourSteps: Step[] = [
        {
            target: '.patient-page-title',
            content: 'Welcome to Patient Management! Here you can view, manage, and admit patients to the hospital.',
            disableBeacon: true,
        },
        {
            target: '.new-patient-btn',
            content: 'Click here to register a new patient into the system.',
        },
        {
            target: '.patient-search',
            content: 'Search for patients by name or ID to quickly find who you are looking for.',
        },
        {
            target: '.patient-filter',
            content: 'Filter the patient list by their current status (Admitted, Outpatient, Discharged).',
        },
        {
            target: '.patients-table',
            content: 'View detailed patient information here. Use the action buttons to view details, edit records, or admit patients.',
        },
    ];

    // Joyride callback handler
    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;

        if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            setRunTour(false);
        }
    };

    // Auto-start tour on first visit
    useEffect(() => {
        const hasSeenTour = localStorage.getItem('patient-management-tour-completed');

        if (!hasSeenTour) {
            setRunTour(true);
        }
    }, []);

    // Manual Trigger from Global Context
    useEffect(() => {
        if (tourTrigger > 0) {
            setRunTour(true);
        }
    }, [tourTrigger]);

    // Mark tour as completed when finished
    useEffect(() => {
        if (!runTour) {
            localStorage.setItem('patient-management-tour-completed', 'true');
        }
    }, [runTour]);

    // Map admissions directly to patients - all data now comes from backend
    const patients: Patient[] = admissions.map(admission => {
        return {
            id: admission.admission_id || `A-${admission.id}`,
            originalId: admission.id,
            name: admission.patient_name,
            age: admission.patient_age || 'N/A',
            gender: admission.patient_gender || 'N/A',
            phone: admission.patient_phone || 'N/A',
            lastVisit: admission.admission_date ? admission.admission_date.split('T')[0] : 'N/A',
            status: admission.status.charAt(0).toUpperCase() + admission.status.slice(1),
            condition: admission.reason_for_admission || 'Checkup'
        };
    });

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || patient.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Handlers for Detail Modal
    const handleViewPatient = (id: string) => {
        setDetailModalMode({ id, edit: false });
        setIsDetailModalOpen(true);
    };

    const handleEditPatient = (id: string) => {
        setDetailModalMode({ id, edit: true });
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setDetailModalMode(null);
    };

    // Handlers for Admit Modal
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="text-red-500 mb-4">Error loading patients: {error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Patient Management | SmartHR</title>
            </Helmet>

            <Joyride
                steps={tourSteps}
                run={runTour}
                continuous
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                scrollToFirstStep={true}
                scrollOffset={120}
                disableScrolling={false}
                scrollDuration={300}
                spotlightClicks={false}
                spotlightPadding={10}
                disableOverlayClose={true}
                locale={{
                    back: 'Back',
                    close: 'Close',
                    last: 'Finish',
                    next: 'Next',
                    skip: 'Skip Tour'
                }}
                styles={{
                    options: {
                        overlayColor: 'rgba(0, 0, 0, 0.7)',
                        primaryColor: '#2563eb',
                        textColor: '#1f2937',
                        zIndex: 10000,
                    },
                    spotlight: {
                        borderRadius: 8,
                    },
                    tooltip: {
                        borderRadius: 8,
                    },
                    buttonNext: {
                        backgroundColor: '#2563eb',
                        fontSize: 14,
                        padding: '8px 16px',
                        borderRadius: 6,
                    },
                    buttonBack: {
                        color: '#6b7280',
                        fontSize: 14,
                        padding: '8px 16px',
                    },
                    buttonSkip: {
                        color: '#9ca3af',
                        fontSize: 14,
                    },
                }}
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 patient-page-title">Patient Management</h1>
                    <p className="text-gray-500 text-sm">Manage patient records, admissions, and history.</p>
                </div>
                <Link
                    to="/organization/patients/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors new-patient-btn"
                >
                    <Plus size={20} />
                    <span>New Patient</span>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96 patient-search">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search patients by name or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto patient-filter">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden patients-table">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-4 py-3">Patient ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Age/Gender</th>
                                <th className="px-4 py-3">Contact</th>
                                <th className="px-4 py-3">Last Visit</th>
                                <th className="px-4 py-3">Condition</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-4 py-3 text-sm font-medium text-blue-600 whitespace-nowrap box-border">
                                            <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{patient.id}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shadow-sm flex-shrink-0">
                                                    {patient.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{patient.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{patient.age !== 'N/A' ? `${patient.age} yrs` : '-'}</span>
                                                <span className="text-xs text-gray-500 capitalize">{patient.gender !== 'N/A' ? patient.gender : '-'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                            {patient.phone !== 'N/A' ? patient.phone : <span className="text-gray-400">-</span>}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                            {patient.lastVisit !== 'N/A' ? new Date(patient.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px]">
                                            <div className="truncate" title={patient.condition}>
                                                {patient.condition}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`
                        px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border
                        ${patient.status === 'Admitted' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                    patient.status === 'Outpatient' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                        'bg-gray-50 text-gray-600 border-gray-100'}
                      `}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleViewPatient(patient.id)}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEditPatient(patient.id)}
                                                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Edit Record"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenAdmitModal(patient)}
                                                    className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                    title="Admit Patient"
                                                >
                                                    <FileText size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="text-gray-300 mb-2" size={32} />
                                            <p>No patients found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {isDetailModalOpen && detailModalMode && (
                <PatientDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={handleCloseDetailModal}
                    patientId={detailModalMode.id}
                    onUpdate={() => {
                        window.location.reload(); // Simple reload to refresh data
                    }}
                    initialIsEditing={detailModalMode.edit}
                />
            )}

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
