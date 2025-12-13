import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Lock,
  Unlock
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  user_count: number;
  is_system_role: boolean;
  color: string;
}

const RoleManagementPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Hospital Administrator',
      description: 'Full system access and management capabilities',
      user_count: 5,
      is_system_role: true,
      color: 'purple',
    },
    {
      id: '2',
      name: 'Doctor',
      description: 'Access to patient records, appointments, and clinical features',
      user_count: 24,
      is_system_role: true,
      color: 'blue',
    },
    {
      id: '3',
      name: 'Nurse',
      description: 'Patient care, medication administration, and vital signs',
      user_count: 38,
      is_system_role: true,
      color: 'green',
    },
    {
      id: '4',
      name: 'Receptionist',
      description: 'Patient registration, appointment scheduling, and front desk',
      user_count: 12,
      is_system_role: true,
      color: 'orange',
    },
    {
      id: '5',
      name: 'Lab Technician',
      description: 'Laboratory test management and result entry',
      user_count: 8,
      is_system_role: false,
      color: 'pink',
    },
    {
      id: '6',
      name: 'Pharmacist',
      description: 'Medication dispensing and pharmacy management',
      user_count: 6,
      is_system_role: false,
      color: 'indigo',
    },
  ]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string }> = {
      purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
      blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
      pink: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200' },
      indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Role Management | PHB</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/organization/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Roles</h1>
              <p className="text-gray-500 text-sm">Manage user roles and permissions for your organization</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Plus size={16} />
            Create Role
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-medium text-blue-800">Role-Based Access Control</p>
          <p className="text-sm text-blue-600 mt-1">
            System roles are predefined and cannot be deleted. Custom roles can be created to match your organization's needs.
          </p>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const colors = getColorClasses(role.color);

          return (
            <div
              key={role.id}
              className={`bg-white p-6 rounded-xl shadow-sm border ${colors.border} hover:shadow-md transition-all`}
            >
              {/* Role Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${colors.bg} rounded-lg`}>
                  <Shield className={colors.icon} size={24} />
                </div>
                {role.is_system_role ? (
                  <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    <Lock size={12} />
                    System
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">
                    <Unlock size={12} />
                    Custom
                  </span>
                )}
              </div>

              {/* Role Info */}
              <h3 className="text-lg font-bold text-gray-800 mb-2">{role.name}</h3>
              <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{role.description}</p>

              {/* User Count */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                <Users size={16} />
                <span>{role.user_count} {role.user_count === 1 ? 'user' : 'users'}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  View Details
                </button>
                {!role.is_system_role && (
                  <>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Permission Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-1">Resources</p>
            <p className="text-xs text-gray-500">Patients, Appointments, Medical Records, Prescriptions, Lab Results, etc.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-1">Actions</p>
            <p className="text-xs text-gray-500">Read, Write, Delete, Approve, Export</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-1">Data Scope</p>
            <p className="text-xs text-gray-500">Own, Department, Organization-wide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPage;