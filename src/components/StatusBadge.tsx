import React from 'react';

interface StatusBadgeProps {
  isAvailable: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isAvailable }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isAvailable ? 'Available' : 'Not Available'}
    </span>
  );
};
