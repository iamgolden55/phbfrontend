/**
 * ViewToggle Component
 *
 * Toggle switch for switching between card view and table view.
 * Features visual toggle with icons and smooth transitions.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'cards' | 'table';

interface ViewToggleProps {
  currentView: ViewMode;
  onChange: (view: ViewMode) => void;
}

/**
 * ViewToggle Component
 *
 * Displays a toggle button group for switching between cards and table views.
 * Active view is highlighted with a white background and blue text.
 */
const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onChange }) => {
  return (
    <div
      className="inline-flex bg-gray-100 rounded-lg p-1"
      data-tour="view-toggle"
      role="group"
      aria-label="View mode selector"
    >
      {/* Cards View Button */}
      <button
        onClick={() => onChange('cards')}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          currentView === 'cards'
            ? 'bg-white text-blue-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-pressed={currentView === 'cards'}
        aria-label="Card view"
      >
        <LayoutGrid size={16} />
        <span>Cards</span>
      </button>

      {/* Table View Button */}
      <button
        onClick={() => onChange('table')}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          currentView === 'table'
            ? 'bg-white text-blue-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-pressed={currentView === 'table'}
        aria-label="Table view"
      >
        <List size={16} />
        <span>Table</span>
      </button>
    </div>
  );
};

export default ViewToggle;
export { ViewToggle };
export type { ViewToggleProps };
