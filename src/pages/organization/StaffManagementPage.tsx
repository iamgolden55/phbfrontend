import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    Mail,
    Phone,
    AlertCircle
} from 'lucide-react';
import { StaffService, type StaffMember as StaffServiceMember } from '../../services/staffService';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';

interface StaffMember extends StaffServiceMember {
    specialization?: string;
}

const StaffManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { userData } = useOrganizationAuth();
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'doctors' | 'nurses' | 'admin'>('all');

    useEffect(() => {
        fetchStaffData();
    }, []);

    const fetchStaffData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch all staff members using the staff service
            const staffResponse = await StaffService.fetchStaffMembers();

            console.log('Staff response:', staffResponse);

            if (staffResponse?.staff_members) {
                setStaffMembers(staffResponse.staff_members);
            } else {
                setStaffMembers([]);
            }
        } catch (err) {
            console.error('Error fetching staff:', err);
            setError('Failed to load staff data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredStaff = staffMembers.filter((staff) => {
        // Filter by tab
        if (activeTab === 'doctors' && staff.role !== 'doctor') return false;
        if (activeTab === 'nurses' && staff.role !== 'nurse') return false;
        if (activeTab === 'admin' && staff.role !== 'hospital_admin') return false;

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                staff.full_name.toLowerCase().includes(query) ||
                staff.email.toLowerCase().includes(query) ||
                (staff.department_name?.toLowerCase().includes(query)) ||
                (staff.specialization?.toLowerCase().includes(query))
            );
        }

        return true;
    });

    const getInitials = (name: string, role: string) => {
        if (role === 'doctor') return 'DR';
        if (role === 'nurse') return 'RN';
        if (role === 'staff') return 'ST';
        if (role === 'hospital_admin') return 'HA';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    const getAvatarColor = (role: string) => {
        if (role === 'doctor') return 'bg-blue-100 text-blue-600';
        if (role === 'nurse') return 'bg-green-100 text-green-600';
        if (role === 'staff') return 'bg-orange-100 text-orange-600';
        if (role === 'hospital_admin') return 'bg-purple-100 text-purple-600';
        return 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Staff Management | PHB</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
                    <p className="text-gray-500 text-sm">Manage doctors, nurses, and administrative staff.</p>
                </div>
                <button
                    onClick={() => navigate('/organization/staff')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <UserPlus size={18} />
                    <span>Add Staff</span>
                </button>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            All Staff ({staffMembers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('doctors')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Doctors ({staffMembers.filter(s => s.role === 'doctor').length})
                        </button>
                        <button
                            onClick={() => setActiveTab('nurses')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'nurses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Nurses ({staffMembers.filter(s => s.role === 'nurse').length})
                        </button>
                        <button
                            onClick={() => setActiveTab('admin')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'admin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Admin ({staffMembers.filter(s => s.role === 'hospital_admin').length})
                        </button>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search staff..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="p-12 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-500">Loading staff members...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-12 flex flex-col items-center justify-center text-red-600">
                        <AlertCircle size={48} className="mb-4" />
                        <p>{error}</p>
                        <button
                            onClick={fetchStaffData}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Staff Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filteredStaff.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">No staff members found</p>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="mt-2 text-blue-600 hover:underline"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        ) : (
                            filteredStaff.map((staff) => (
                                <div key={`${staff.role}-${staff.id}`} className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                    <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-2xl font-bold ${getAvatarColor(staff.role)}`}>
                                        {getInitials(staff.full_name, staff.role)}
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-lg">{staff.full_name}</h3>
                                    <p className="text-blue-600 text-sm font-medium">
                                        {staff.role_display}
                                    </p>
                                    {staff.department_name && (
                                        <p className="text-gray-500 text-xs mt-1">{staff.department_name}</p>
                                    )}

                                    <div className="flex gap-2 w-full mt-4">
                                        <button
                                            onClick={() => window.location.href = `mailto:${staff.email}`}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm"
                                            title={staff.email}
                                        >
                                            <Mail size={16} />
                                            Email
                                        </button>
                                        {staff.phone && (
                                            <button
                                                onClick={() => window.location.href = `tel:${staff.phone}`}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm"
                                            >
                                                <Phone size={16} />
                                                Call
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffManagementPage;