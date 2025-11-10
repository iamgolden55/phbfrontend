/**
 * MetricsCard Component
 *
 * Modern metrics display card with status indicators
 * Adapted from 21st.dev component
 */

import React from 'react';

export type MetricStatus = 'good' | 'warning' | 'alert' | 'info';

interface MetricsCardProps {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  unit?: string;
  status?: MetricStatus;
  statusText?: string;
  description?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  icon,
  title,
  value,
  unit,
  status = 'info',
  statusText,
  description,
}) => {
  const statusColors = {
    good: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-600',
      icon: 'text-green-500',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-600',
      icon: 'text-yellow-500',
    },
    alert: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-600',
      icon: 'text-red-500',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-600',
      icon: 'text-blue-500',
    },
  };

  const colors = statusColors[status];

  return (
    <div
      className={`bg-white border ${colors.border} rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <div className={`${colors.bg} p-2.5 rounded-lg`}>
              <div className={colors.icon}>{icon}</div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900 truncate">{value}</span>
              {unit && <span className="text-sm text-gray-500">{unit}</span>}
            </div>
          </div>
        </div>
      </div>

      {(statusText || description) && (
        <div className="flex items-center justify-between mt-4">
          {statusText && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md ${colors.bg}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${colors.icon} bg-current`} />
              <span className={`text-xs font-medium ${colors.text}`}>{statusText}</span>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
