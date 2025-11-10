/**
 * InfoCard Component
 *
 * Display key-value information in a modern card layout
 * Used for application details, personal information, etc.
 */

import React from 'react';

export interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items, icon, action }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-blue-600">{icon}</div>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${item.fullWidth ? 'md:col-span-2' : ''} space-y-1`}
            >
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {item.label}
              </dt>
              <dd className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                {item.icon && <span className="text-gray-400">{item.icon}</span>}
                <span>{item.value || '—'}</span>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
