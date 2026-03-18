import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, User, Circle } from 'lucide-react';

interface Patient {
    id: string;
    name: string;
    keyId: string; // e.g., "AS"
    status: 'Active' | 'Inactive' | 'On Hold';
    groups: string[];
    tags: string[];
    lastVisit?: string;
}

const WomensHealthPatients: React.FC = () => {
    // Mock Data
    const patients: Patient[] = [
        {
            id: '1',
            name: 'Annie Smith',
            keyId: 'AS',
            status: 'Active',
            groups: ['Women\'s Health', 'Morning Care'],
            tags: ['Risk: Low', 'Mobility'],
            lastVisit: 'Today, 09:00'
        },
        {
            id: '2',
            name: 'Dorothy Jones',
            keyId: 'DJ',
            status: 'Active',
            groups: ['Women\'s Health'],
            tags: ['Dementia', 'Risk: High'],
            lastVisit: 'Yesterday, 14:00'
        },
        {
            id: '3',
            name: 'Emily Davis',
            keyId: 'ED',
            status: 'On Hold',
            groups: ['Post-natal'],
            tags: [],
            lastVisit: '2 days ago'
        },
        {
            id: '4',
            name: 'Margaret Thatcher', // Keeping it realistic :)
            keyId: 'MT',
            status: 'Active',
            groups: ['Surgery Recovery'],
            tags: ['Medication', 'Assisted'],
            lastVisit: 'Today, 11:30'
        },
        {
            id: '5',
            name: 'Sarah Connor',
            keyId: 'SC',
            status: 'Inactive',
            groups: [],
            tags: ['Discharged'],
            lastVisit: 'Last week'
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.keyId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            'Active': 'bg-green-100 text-green-700',
            'Inactive': 'bg-gray-100 text-gray-600',
            'On Hold': 'bg-orange-100 text-orange-700'
        };
        const style = styles[status as keyof typeof styles] || styles['Inactive'];

        return (
            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${style}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Patients</h1>
                    <p className="text-gray-500">Manage all women's health patients and their care details.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-pink-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-pink-700 transition-colors flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Add Patient
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Groups</th>
                                <th className="px-6 py-4">Tags</th>
                                <th className="px-6 py-4">Last Visit</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm mr-3">
                                                {patient.keyId}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{patient.name}</div>
                                                <div className="text-xs text-gray-400">ID: #{patient.id.padStart(4, '0')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={patient.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {patient.groups.length > 0 ? patient.groups.map(group => (
                                                <span key={group} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                                    {group}
                                                </span>
                                            )) : <span className="text-gray-400 text-xs">-</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {patient.tags.length > 0 ? patient.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium border border-blue-100">
                                                    {tag}
                                                </span>
                                            )) : <span className="text-gray-400 text-xs">-</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {patient.lastVisit}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredPatients.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No patients found matching your search.
                    </div>
                )}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                    <span>Showing {filteredPatients.length} of {patients.length} patients</span>

                    <div className="flex space-x-1">
                        <button className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
                        <button className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WomensHealthPatients;
