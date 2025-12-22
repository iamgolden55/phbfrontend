/**
 * DepartmentCardView Component
 *
 * Displays departments as visual cards in a grid layout with expandable details.
 * Features multi-select, quick actions, and comprehensive department information.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Bed,
  Users,
  ChevronDown,
  ChevronUp,
  Edit,
  ToggleLeft,
  ToggleRight,
  AlertTriangle
} from 'lucide-react';
import {
  Department,
  DEPARTMENT_TYPE_LABELS,
  getDepartmentCategory
} from '../../../types/department';

interface DepartmentCardViewProps {
  departments: Department[];
  loading?: boolean;
  selectedIds: number[];
  onSelect: (departmentIds: number[]) => void;
  onEdit: (department: Department) => void;
  onDeactivate: (department: Department) => void;
  onReactivate: (department: Department) => void;
}

interface DepartmentCardProps {
  department: Department;
  isSelected: boolean;
  isFirst: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
}

/**
 * Individual Department Card Component
 */
const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  isSelected,
  isFirst,
  onSelect,
  onEdit,
  onToggleStatus
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const category = getDepartmentCategory(department.department_type);

  // Get category color
  const getCategoryColor = () => {
    switch (category) {
      case 'Clinical':
        return {
          bg: 'bg-red-50',
          icon: 'text-red-500',
          border: 'border-red-200'
        };
      case 'Support':
        return {
          bg: 'bg-orange-50',
          icon: 'text-orange-500',
          border: 'border-orange-200'
        };
      case 'Administrative':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-500',
          border: 'border-purple-200'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-500',
          border: 'border-gray-200'
        };
    }
  };

  const colors = getCategoryColor();

  // Calculate bed utilization
  const bedUtilization = department.total_beds > 0
    ? Math.round(((department.occupied_beds || 0) / department.total_beds) * 100)
    : 0;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border transition-all ${isSelected ? 'border-orange-500 shadow-md' : 'border-gray-100'
        } ${!department.is_active ? 'opacity-70' : ''}`}
      data-tour={isFirst ? 'department-card' : undefined}
    >
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
          />

          {/* Icon */}
          <div className={`p-2 rounded-lg ${colors.bg}`}>
            <Building2 className={colors.icon} size={20} />
          </div>

          {/* Department Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {department.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                    {department.code}
                  </span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.icon}`}>
                    {category}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${department.is_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {department.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
              <MapPin size={12} />
              <span>
                Floor {department.floor_number} • {department.wing.charAt(0).toUpperCase() + department.wing.slice(1)} Wing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="grid grid-cols-3 gap-3 text-xs">
          {/* Beds (Clinical only condition relaxed to check for bed count) */}
          {department.total_beds > 0 ? (
            <div className="flex items-center gap-1">
              <Bed size={14} className="text-gray-400" />
              <span className="text-gray-600">
                <span className="font-semibold text-gray-800">{department.occupied_beds || 0}</span>
                /{department.total_beds}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-400">
              <Bed size={14} />
              <span>N/A</span>
            </div>
          )}

          {/* Staff */}
          <div className="flex items-center gap-1">
            <Users size={14} className="text-gray-400" />
            <span className="text-gray-600">
              <span className="font-semibold text-gray-800">{department.current_staff_count || 0}</span>
              {department.is_understaffed && (
                <AlertTriangle size={12} className="inline ml-1 text-orange-500" />
              )}
            </span>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-gray-400" />
            <span className="text-gray-600 truncate">
              {department.is_24_hours ? '24/7' : 'Limited'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              <span>Show More</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Department"
          >
            <Edit size={16} />
          </button>

          {/* Deactivate/Reactivate Button */}
          <button
            onClick={onToggleStatus}
            className={`p-2 rounded-lg transition-colors ${department.is_active
              ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            title={department.is_active ? 'Deactivate' : 'Reactivate'}
          >
            {department.is_active ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Details Panel */}
      {isExpanded && (
        <div className="p-4 bg-gray-50 space-y-4">
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Description</h4>
            <p className="text-sm text-gray-600">{department.description}</p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400" />
                <span className="text-gray-600">Ext: {department.extension_number}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{department.emergency_contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-400" />
                <span className="text-gray-600">{department.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-gray-600">
                  {department.is_24_hours ? '24/7 Operations' : 'Custom hours'}
                </span>
              </div>
            </div>
          </div>

          {/* Bed Utilization (Any department with beds) */}
          {department.total_beds > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Bed Utilization</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {department.occupied_beds || 0} / {department.total_beds} beds occupied
                  </span>
                  <span className="font-semibold text-gray-800">{bedUtilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${bedUtilization >= 85
                        ? 'bg-red-500'
                        : bedUtilization >= 70
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      }`}
                    style={{ width: `${bedUtilization}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Staffing Status */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Staffing</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Staff:</span>
                <span className="font-semibold text-gray-800">{department.current_staff_count || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Required:</span>
                <span className="font-semibold text-gray-800">{department.minimum_staff_required}</span>
              </div>
              {department.is_understaffed && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle size={14} className="text-orange-600" />
                  <span className="text-xs text-orange-700 font-medium">
                    Understaffed - Below minimum requirement
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * DepartmentCardView Container Component
 */
const DepartmentCardView: React.FC<DepartmentCardViewProps> = ({
  departments,
  loading = false,
  selectedIds,
  onSelect,
  onEdit,
  onDeactivate,
  onReactivate
}) => {
  // Handle individual card selection
  const handleCardSelect = (departmentId: number) => {
    if (selectedIds.includes(departmentId)) {
      onSelect(selectedIds.filter(id => id !== departmentId));
    } else {
      onSelect([...selectedIds, departmentId]);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse"
          >
            <div className="h-20 bg-gray-200 rounded mb-3"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-12 text-center">
        <Building2 className="mx-auto text-blue-400 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No Departments Found
        </h3>
        <p className="text-gray-600">
          No departments match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {departments.map((department, index) => (
        <DepartmentCard
          key={department.id}
          department={department}
          isSelected={selectedIds.includes(department.id)}
          isFirst={index === 0}
          onSelect={() => handleCardSelect(department.id)}
          onEdit={() => onEdit(department)}
          onToggleStatus={() =>
            department.is_active ? onDeactivate(department) : onReactivate(department)
          }
        />
      ))}
    </div>
  );
};

export default DepartmentCardView;
