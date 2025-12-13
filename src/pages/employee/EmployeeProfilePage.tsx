import React from 'react';
import { Helmet } from 'react-helmet';
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';

const EmployeeProfilePage: React.FC = () => {
    const { userData } = useOrganizationAuth();

    return (
        <div className="space-y-6">
            <Helmet>
                <title>My Profile | SmartHR</title>
            </Helmet>

            {/* Header / Cover */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="px-6 pb-6">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-4">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                                    {userData?.full_name?.charAt(0) || 'E'}
                                </div>
                            </div>
                            <div className="mb-1">
                                <h1 className="text-2xl font-bold text-gray-800">{userData?.full_name || 'Employee Name'}</h1>
                                <p className="text-gray-500">{userData?.role || 'Designation'}</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Department</p>
                                <p className="font-medium">Design Team</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Location</p>
                                <p className="font-medium">New York, USA</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="font-medium">employee@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Date Joined</p>
                                <p className="font-medium">15 Jan, 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Passport No.</label>
                                <p className="font-medium text-gray-800">9876543210</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Passport Exp Date.</label>
                                <p className="font-medium text-gray-800">12 Mar 2028</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Tel</label>
                                <p className="font-medium text-gray-800">+1 987 654 3210</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Nationality</label>
                                <p className="font-medium text-gray-800">American</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Religion</label>
                                <p className="font-medium text-gray-800">Christian</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Marital status</label>
                                <p className="font-medium text-gray-800">Married</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Employment of spouse</label>
                                <p className="font-medium text-gray-800">No</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">No. of children</label>
                                <p className="font-medium text-gray-800">2</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Primary Name</label>
                                <p className="font-medium text-gray-800">John Doe</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Relationship</label>
                                <p className="font-medium text-gray-800">Father</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Phone</label>
                                <p className="font-medium text-gray-800">+1 234 567 8900</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Bank Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Bank Name</label>
                                <p className="font-medium text-gray-800">Bank of America</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Account Number</label>
                                <p className="font-medium text-gray-800">**** **** **** 1234</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">IFSC Code</label>
                                <p className="font-medium text-gray-800">BOFA0001234</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">PAN No</label>
                                <p className="font-medium text-gray-800">ABCDE1234F</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfilePage;
