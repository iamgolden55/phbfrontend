import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  ArrowLeft,
  Loader2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { UserManagementService, OrganizationUser } from '../../../services/userManagementService';
import { StatCard } from '../../../components/organization/DashboardWidgets';
import AddUserModal from '../../../features/organization/components/UserManagement/AddUserModal';
import EditUserModal from '../../../features/organization/components/UserManagement/EditUserModal';
import BulkActionConfirmModal from '../../../features/organization/components/UserManagement/BulkActionConfirmModal';

const UserManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<OrganizationUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState({ total_admins: 0, general_admins: 0, department_heads: 0 });

  // Modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<OrganizationUser | null>(null);
  const [showBulkConfirmModal, setShowBulkConfirmModal] = useState(false);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | 'delete' | null>(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  // Data for dropdowns
  const [departments, setDepartments] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, roleFilter, statusFilter]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [usersData, departmentsData] = await Promise.all([
        UserManagementService.listUsers(),
        // Only fetch ADMINISTRATIVE departments for organization admins
        UserManagementService.getDepartments('administrative'),
      ]);

      setUsers(usersData.users);
      setStats(usersData.summary);
      setDepartments(departmentsData);
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get role display name
  const getRoleDisplayName = (user: OrganizationUser): string => {
    if (user.is_department_head && user.department) {
      return `${user.department.name} Head`;
    }
    return 'Organization Administrator';
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      if (roleFilter !== 'all') params.role = roleFilter;
      if (statusFilter !== 'all') params.status = statusFilter;

      const data = await UserManagementService.listUsers(params);
      setUsers(data.users);
      setStats(data.summary);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(u => u.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-600',
      pending: 'bg-yellow-100 text-yellow-600',
      inactive: 'bg-gray-100 text-gray-600',
      suspended: 'bg-red-100 text-red-600',
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={14} />;
      case 'pending':
        return <Clock size={14} />;
      case 'inactive':
      case 'suspended':
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Bulk action handlers
  const handleBulkActivate = () => {
    setBulkAction('activate');
    setShowBulkConfirmModal(true);
  };

  const handleBulkDeactivate = () => {
    setBulkAction('deactivate');
    setShowBulkConfirmModal(true);
  };

  const handleBulkDelete = () => {
    setBulkAction('delete');
    setShowBulkConfirmModal(true);
  };

  const confirmBulkAction = async () => {
    if (!bulkAction) return;

    setBulkActionLoading(true);

    try {
      await UserManagementService.bulkAction(
        bulkAction,
        Array.from(selectedUsers).map(id => id.toString())
      );

      // Refresh user list
      await fetchUsers();

      // Clear selection
      setSelectedUsers(new Set());

      // Show success (you can add toast notification here)
      alert(`Successfully ${bulkAction}d ${selectedUsers.size} user(s)`);
    } catch (error) {
      console.error('Bulk action failed:', error);
      alert(`Failed to ${bulkAction} users. Please try again.`);
    } finally {
      setBulkActionLoading(false);
      setShowBulkConfirmModal(false);
      setBulkAction(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>User Management | PHB</title>
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
              <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
              <p className="text-gray-500 text-sm">Manage users, roles, and permissions</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors flex items-center gap-2"
            >
              <UserPlus size={16} />
              Invite Users
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Admins"
          value={stats.total_admins.toString()}
          icon={Users}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="General Admins"
          value={stats.general_admins.toString()}
          icon={CheckCircle}
          iconColor="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          title="Department Heads"
          value={stats.department_heads.toString()}
          icon={Users}
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
        />
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="general">General Admins</option>
            <option value="department_head">Department Heads</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === users.length && users.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.full_name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-800">{getRoleDisplayName(user)}</p>
                      {user.is_department_head && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          Head
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{user.department?.name || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusBadge(user.status)}`}>
                      {getStatusIcon(user.status)}
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{formatLastLogin(user.last_login)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setShowEditUserModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Edit user"
                      >
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="More options">
                        <MoreVertical size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions Bar */}
        {selectedUsers.size > 0 && (
          <div className="bg-blue-50 border-t border-blue-100 px-6 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-blue-800">
              {selectedUsers.size} user{selectedUsers.size > 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleBulkActivate}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg text-xs font-medium hover:bg-yellow-700 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddUserModal && (
        <AddUserModal
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onSuccess={(newUser) => {
            setUsers([newUser, ...users]);
            setShowAddUserModal(false);
            alert('User invitation sent successfully!');
          }}
          departments={departments}
        />
      )}

      {showEditUserModal && editingUser && (
        <EditUserModal
          isOpen={showEditUserModal}
          onClose={() => {
            setShowEditUserModal(false);
            setEditingUser(null);
          }}
          onSuccess={(updatedUser) => {
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            setShowEditUserModal(false);
            setEditingUser(null);
            alert('User updated successfully!');
          }}
          user={editingUser}
          departments={departments}
        />
      )}

      {showBulkConfirmModal && (
        <BulkActionConfirmModal
          isOpen={showBulkConfirmModal}
          onClose={() => {
            setShowBulkConfirmModal(false);
            setBulkAction(null);
          }}
          onConfirm={confirmBulkAction}
          action={bulkAction}
          userCount={selectedUsers.size}
          isLoading={bulkActionLoading}
        />
      )}
    </div>
  );
};

export default UserManagementPage;