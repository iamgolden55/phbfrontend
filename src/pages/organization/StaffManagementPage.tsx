import React from 'react';
import { Helmet } from 'react-helmet';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    Mail,
    Phone
} from 'lucide-react';

const StaffManagementPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Helmet>
                <title>Staff Management | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
                    <p className="text-gray-500 text-sm">Manage doctors, nurses, and administrative staff.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <UserPlus size={18} />
                    <span>Add Staff</span>
                </button>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">All Staff</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Doctors</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Nurses</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Admin</button>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search staff..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 rounded-full bg-gray-100 mb-4 flex items-center justify-center text-2xl text-gray-400 font-bold">
                                {i % 2 === 0 ? 'DR' : 'RN'}
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg">Dr. Sarah Smith</h3>
                            <p className="text-blue-600 text-sm font-medium mb-4">Cardiologist</p>

                            <div className="flex gap-2 w-full">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
                                    <Mail size={16} />
                                    Email
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
                                    <Phone size={16} />
                                    Call
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaffManagementPage;
