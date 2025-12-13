import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, User, AlertCircle } from 'lucide-react';
import { UserManagementService, Department, OrganizationUser } from '../../../../services/userManagementService';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: OrganizationUser) => void;
  user: OrganizationUser;
  departments: Department[];
}

interface EditFormData {
  full_name: string;
  phone: string;
  position: string;
  department: string;
  is_department_head: boolean;
  status: 'active' | 'inactive' | 'suspended';
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  user,
  departments,
}) => {
  const [formData, setFormData] = useState<EditFormData>({
    full_name: user.full_name,
    phone: user.phone || '',
    position: user.position || '',
    department: user.department?.id.toString() || '',
    is_department_head: user.is_department_head,
    status: user.status,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EditFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reset form when user changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: user.full_name,
        phone: user.phone || '',
        position: user.position || '',
        department: user.department?.id.toString() || '',
        is_department_head: user.is_department_head,
        status: user.status,
      });
      setErrors({});
      setSubmitError(null);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EditFormData, string>> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    } else if (formData.full_name.length < 2) {
      newErrors.full_name = 'Name must be at least 2 characters';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (formData.phone && !/^\+?[\d\s()-]{10,20}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        full_name: formData.full_name.trim(),
        phone: formData.phone.trim() || undefined,
        position: formData.position.trim(),
        department: formData.department,
        status: formData.status,
      };

      const updatedUser = await UserManagementService.updateUser(user.id.toString(), payload);
      onSuccess(updatedUser);
      onClose();
    } catch (error: any) {
      console.error('Failed to update user:', error);
      setSubmitError(
        error.message || 'Failed to update user. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof EditFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <User className="text-orange-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
              <p className="text-sm text-gray-500">
                Update user information and permissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Alert */}
          {submitError && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="text-red-800 text-sm font-semibold">Error</p>
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (Read-only)
            </label>
            <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              {user.email}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Email addresses cannot be changed for security reasons
            </p>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.full_name
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                {errors.full_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.phone
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position/Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.position
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                {errors.position && (
                  <p className="text-red-600 text-sm mt-1">{errors.position}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Department Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Department Assignment</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.department
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-600 text-sm mt-1">{errors.department}</p>
              )}
            </div>

            {/* Department Head Checkbox */}
            {formData.department && (
              <label className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                <input
                  type="checkbox"
                  name="is_department_head"
                  checked={formData.is_department_head}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="text-sm font-medium text-purple-900">
                    Department Head
                  </span>
                  <p className="text-xs text-purple-700 mt-0.5">
                    This user will lead and manage the selected department
                  </p>
                </div>
              </label>
            )}
          </div>

          {/* Info about last login */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Last Login:</span>
                <p className="font-medium text-gray-800 mt-1">
                  {user.last_login
                    ? new Date(user.last_login).toLocaleDateString()
                    : 'Never'}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Joined:</span>
                <p className="font-medium text-gray-800 mt-1">
                  {user.joined_date
                    ? new Date(user.joined_date).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
