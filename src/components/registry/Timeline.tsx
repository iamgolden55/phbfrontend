/**
 * Timeline Component
 *
 * Vertical timeline for tracking application progress
 * Inspired by modern dashboard designs
 */

import React from 'react';

export type TimelineStatus = 'completed' | 'current' | 'pending' | 'skipped';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: TimelineStatus;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const getStatusStyles = (status: TimelineStatus) => {
    switch (status) {
      case 'completed':
        return {
          dot: 'bg-green-500 ring-green-200',
          line: 'bg-green-200',
          text: 'text-green-700',
          icon: 'text-green-600',
        };
      case 'current':
        return {
          dot: 'bg-blue-500 ring-blue-200 animate-pulse',
          line: 'bg-gray-200',
          text: 'text-blue-700',
          icon: 'text-blue-600',
        };
      case 'pending':
        return {
          dot: 'bg-gray-300 ring-gray-100',
          line: 'bg-gray-200',
          text: 'text-gray-500',
          icon: 'text-gray-400',
        };
      case 'skipped':
        return {
          dot: 'bg-yellow-400 ring-yellow-100',
          line: 'bg-gray-200',
          text: 'text-yellow-700',
          icon: 'text-yellow-600',
        };
    }
  };

  const getStatusIcon = (status: TimelineStatus) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'current':
        return (
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
        );
      case 'pending':
        return null;
      case 'skipped':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {items.map((item, index) => {
          const styles = getStatusStyles(item.status);
          const isLast = index === items.length - 1;

          return (
            <li key={item.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className={`absolute left-4 top-4 -ml-px h-full w-0.5 ${styles.line}`}
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div
                      className={`h-8 w-8 rounded-full ${styles.dot} ring-4 flex items-center justify-center transition-all duration-300`}
                    >
                      {getStatusIcon(item.status)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold ${styles.text}`}>
                          {item.title}
                        </p>
                        {item.date && (
                          <time className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {item.date}
                          </time>
                        )}
                      </div>
                      {item.description && (
                        <p className="mt-0.5 text-sm text-gray-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Timeline;
