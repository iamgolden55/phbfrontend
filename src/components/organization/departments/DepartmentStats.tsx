/**
 * DepartmentStats Component (Redesigned)
 *
 * Displays aggregate statistics about departments in a Tailwind-styled card grid.
 * Features clickable stat cards for filtering, trend indicators, and help tooltips.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React from 'react';
import {
  Building2,
  CheckCircle,
  Stethoscope,
  Wrench,
  Briefcase,
  Bed,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  HelpCircle
} from 'lucide-react';
import { DepartmentStats as DepartmentStatsType } from '../../../types/department';

interface DepartmentStatsProps {
  stats: DepartmentStatsType | null;
  loading?: boolean;
  onStatClick?: (filterType: string) => void;
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  iconColor: string;
  bgColor: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
  loading?: boolean;
  helpText?: string;
}

/**
 * Individual Stat Card Component
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
  subtitle,
  trend,
  onClick,
  loading,
  helpText
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={iconColor} size={24} />
        </div>
        <div className="flex items-center gap-2">
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
          {helpText && (
            <div className="group relative">
              <HelpCircle size={16} className="text-gray-400 hover:text-gray-600" />
              <div className="absolute right-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                {helpText}
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
};

/**
 * DepartmentStats Component
 *
 * Displays:
 * - Total departments (with active/inactive breakdown)
 * - Department categories (Clinical, Support, Administrative)
 * - Bed statistics and utilization
 * - Staff statistics and understaffing alerts
 */
const DepartmentStats: React.FC<DepartmentStatsProps> = ({
  stats,
  loading = false,
  onStatClick
}) => {
  if (!stats && !loading) {
    return null;
  }

  // Calculate bed utilization percentage
  const bedUtilizationRate =
    stats && stats.total_beds > 0
      ? ((stats.total_beds - stats.available_beds) / stats.total_beds) * 100
      : 0;

  return (
    <div className="mb-6" data-tour="stats-dashboard">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Department Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Departments */}
        <StatCard
          title="Total Departments"
          value={stats?.total_departments || 0}
          icon={Building2}
          iconColor="text-blue-500"
          bgColor="bg-blue-50"
          subtitle={`${stats?.active_departments || 0} active, ${
            stats?.inactive_departments || 0
          } inactive`}
          trend={{
            value: 5,
            isPositive: true
          }}
          onClick={() => onStatClick?.('all')}
          loading={loading}
          helpText="Total number of departments in your hospital, including both active and inactive ones."
        />

        {/* Active Departments */}
        <StatCard
          title="Active Departments"
          value={stats?.active_departments || 0}
          icon={CheckCircle}
          iconColor="text-green-500"
          bgColor="bg-green-50"
          subtitle={`${stats?.inactive_departments || 0} inactive`}
          onClick={() => onStatClick?.('active')}
          loading={loading}
          helpText="Departments that are currently operational and accepting patients or providing services."
        />

        {/* Clinical Departments */}
        <StatCard
          title="Clinical Departments"
          value={stats?.clinical_departments || 0}
          icon={Stethoscope}
          iconColor="text-red-500"
          bgColor="bg-red-50"
          trend={{
            value: 2,
            isPositive: true
          }}
          onClick={() => onStatClick?.('clinical')}
          loading={loading}
          helpText="Patient-facing departments that provide direct medical care and treatment."
        />

        {/* Support Services */}
        <StatCard
          title="Support Services"
          value={stats?.support_departments || 0}
          icon={Wrench}
          iconColor="text-orange-500"
          bgColor="bg-orange-50"
          onClick={() => onStatClick?.('support')}
          loading={loading}
          helpText="Departments that support clinical operations like radiology, laboratory, and pharmacy."
        />

        {/* Administrative */}
        <StatCard
          title="Administrative"
          value={stats?.administrative_departments || 0}
          icon={Briefcase}
          iconColor="text-blue-500"
          bgColor="bg-blue-50"
          onClick={() => onStatClick?.('administrative')}
          loading={loading}
          helpText="Administrative and management departments handling non-clinical operations."
        />

        {/* Total Bed Capacity */}
        <StatCard
          title="Total Bed Capacity"
          value={stats?.total_beds || 0}
          icon={Bed}
          iconColor="text-purple-500"
          bgColor="bg-purple-50"
          subtitle={`${stats?.available_beds || 0} available (${Math.round(
            bedUtilizationRate
          )}% utilized)`}
          trend={{
            value: Math.round(bedUtilizationRate - 70),
            isPositive: bedUtilizationRate < 70
          }}
          onClick={() => onStatClick?.('beds')}
          loading={loading}
          helpText="Total number of beds across all clinical departments and their current availability."
        />

        {/* Total Staff */}
        <StatCard
          title="Total Staff"
          value={stats?.total_staff || 0}
          icon={Users}
          iconColor="text-green-500"
          bgColor="bg-green-50"
          subtitle={
            stats && stats.understaffed_departments > 0
              ? `${stats.understaffed_departments} dept(s) understaffed`
              : 'All departments adequately staffed'
          }
          onClick={() => onStatClick?.('staff')}
          loading={loading}
          helpText="Total number of staff members assigned across all departments."
        />

        {/* Understaffed Alert (conditional) */}
        {stats && stats.understaffed_departments > 0 && (
          <StatCard
            title="Understaffed Alert"
            value={stats.understaffed_departments}
            icon={AlertTriangle}
            iconColor="text-orange-600"
            bgColor="bg-orange-50"
            subtitle="Departments requiring attention"
            trend={{
              value: 3,
              isPositive: false
            }}
            onClick={() => onStatClick?.('understaffed')}
            loading={loading}
            helpText="Departments that have fewer staff members than the minimum required for safe operations."
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentStats;
