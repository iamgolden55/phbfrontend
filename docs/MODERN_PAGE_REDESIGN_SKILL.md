# Modern Page Redesign Skill Guide

**Version:** 1.0
**Created:** December 2025
**Based On:** Department Management Page Redesign
**Author:** AI Assistant

---

## Overview

This guide provides a comprehensive template for redesigning legacy Material-UI pages to modern Tailwind CSS designs with enhanced UX features. Use this as a blueprint for consistent, professional page redesigns across the PHB platform.

---

## Design System Standards

### Color Palette

```typescript
// Primary Colors
'bg-blue-900'        // Primary brand color (buttons, highlights)
'bg-blue-800'        // Hover state for primary buttons
'bg-blue-50'         // Light blue backgrounds
'text-blue-900'      // Primary text color for headings

// Active/Selected States
'bg-orange-50'       // Active state background
'text-orange-600'    // Active state text
'border-orange-500'  // Active state border

// Status Colors
'bg-green-50 text-green-700'    // Success/Active
'bg-red-50 text-red-700'        // Error/Inactive/Danger
'bg-gray-50 text-gray-600'      // Neutral/Info
'bg-purple-50 text-purple-700'  // Administrative

// Text Colors
'text-gray-800'      // Primary text (headings)
'text-gray-700'      // Secondary text
'text-gray-500'      // Tertiary text (labels, captions)
'text-gray-400'      // Disabled/placeholder text
```

### Typography Scale

```typescript
// Headings
'text-2xl font-bold text-gray-800'     // Page title (h1)
'text-xl font-bold text-gray-800'      // Modal title (h2)
'text-lg font-semibold text-gray-800'  // Section title (h3)
'text-base font-medium text-gray-700'  // Card title (h4)

// Body Text
'text-sm text-gray-600'    // Regular body text
'text-xs text-gray-500'    // Small text, captions
'text-xs text-gray-400'    // Helper text, hints
```

### Spacing System

```typescript
// Container Padding
'max-w-[1400px] mx-auto px-4 py-6'  // Main page container

// Component Spacing
'gap-6'    // Between major sections
'gap-4'    // Between related components
'gap-2'    // Between small elements
'gap-1'    // Between tightly coupled elements

// Component Padding
'p-6'      // Card padding
'p-4'      // Modal content padding
'px-4 py-2'  // Button padding
'px-3 py-1.5'  // Small button padding
```

### Card Pattern

```typescript
// Standard Card
className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"

// Selected Card
className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-500"

// Alert Card - Success
className="p-4 bg-green-50 border border-green-200 rounded-lg"

// Alert Card - Error
className="p-4 bg-red-50 border border-red-200 rounded-lg"

// Alert Card - Info
className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
```

### Button Patterns

```typescript
// Primary Button
className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"

// Secondary Button
className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"

// Danger Button
className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"

// Icon Button
className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"

// Disabled State
className="... disabled:opacity-50 disabled:cursor-not-allowed"

// Loading State
{loading ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} />}
```

### Icon Standards

```typescript
// Icon Library: lucide-react
import { Icon1, Icon2 } from 'lucide-react';

// Icon Sizes
<Icon size={16} />  // Small buttons, inline text
<Icon size={20} />  // Regular buttons, cards
<Icon size={24} />  // Page headers, modal headers
<Icon size={40} />  // Loading spinners
<Icon size={48} />  // Empty states

// Icon Colors
className="text-blue-900"    // Primary
className="text-orange-600"  // Active
className="text-green-600"   // Success
className="text-red-600"     // Error
className="text-gray-500"    // Neutral
```

---

## Component Patterns

### 1. Page Structure

```typescript
// Main Page Container
<div className="max-w-[1400px] mx-auto px-4 py-6">
  {/* Joyride Tour */}
  <Joyride steps={steps} run={run} callback={handleCallback} {...} />

  {/* Page Header */}
  <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Page Title</h1>
      <p className="text-gray-500 mt-1">Page description</p>
    </div>

    <div className="flex items-center gap-2">
      <button onClick={restartTour} className="...">
        <HelpCircle size={16} />
        <span>Tour</span>
      </button>
      <button onClick={handleRefresh} className="...">
        <RefreshCw size={16} />
        <span>Refresh</span>
      </button>
      <button onClick={handleAdd} data-tour="add-button" className="...">
        <Plus size={16} />
        <span>Add Item</span>
      </button>
    </div>
  </div>

  {/* Stats Dashboard */}
  <StatsComponent data-tour="stats-dashboard" />

  {/* Filters */}
  <FiltersComponent data-tour="filters" />

  {/* View Toggle */}
  <div className="flex items-center justify-between mb-6">
    <ViewToggle currentView={viewMode} onChange={setViewMode} />
    <p className="text-sm text-gray-500">Showing {count} items</p>
  </div>

  {/* Content Area - Cards or Table */}
  {items.length > 0 ? (
    viewMode === 'cards' ? <CardView /> : <TableView />
  ) : (
    <EmptyState />
  )}

  {/* Bulk Actions Bar */}
  <BulkActionsBar selectedItems={selected} />

  {/* Modals */}
  <AddModal />
  <EditModal />
  <DeleteModal />

  {/* Notifications */}
  {notification.open && <NotificationToast />}
</div>
```

### 2. Loading States

```typescript
// Full Page Loading
if (loading) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 size={40} className="text-blue-900 animate-spin" />
      </div>
    </div>
  );
}

// Component Loading
{loading ? (
  <div className="flex items-center justify-center py-6">
    <Loader2 size={40} className="text-blue-900 animate-spin" />
  </div>
) : (
  <Content />
)}

// Button Loading
<button disabled={loading}>
  {loading ? (
    <>
      <Loader2 size={16} className="animate-spin" />
      <span>Loading...</span>
    </>
  ) : (
    <>
      <Icon size={16} />
      <span>Action</span>
    </>
  )}
</button>
```

### 3. Empty States

```typescript
<div className="bg-blue-50 border border-blue-200 rounded-xl p-12 text-center">
  <Icon size={48} className="text-blue-400 mx-auto mb-4" />
  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Items Found</h3>
  <p className="text-gray-600 mb-4">
    {hasFilters
      ? "No items match your current filters."
      : "Get started by creating your first item."}
  </p>
  {hasFilters ? (
    <button onClick={clearFilters} className="...">Clear Filters</button>
  ) : (
    <button onClick={handleAdd} className="...">
      <Plus size={16} />
      <span>Add Item</span>
    </button>
  )}
</div>
```

### 4. Notification Toast

```typescript
// State
const [notification, setNotification] = useState<{
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}>({ open: false, message: '', severity: 'success' });

// Component
{notification.open && (
  <div className="fixed bottom-4 right-4 z-50 max-w-md">
    <div className={`p-4 rounded-lg shadow-lg flex items-start gap-3 ${
      notification.severity === 'success' ? 'bg-green-500 text-white' :
      notification.severity === 'error' ? 'bg-red-500 text-white' :
      notification.severity === 'warning' ? 'bg-orange-500 text-white' :
      'bg-blue-500 text-white'
    }`}>
      <p className="flex-1 text-sm">{notification.message}</p>
      <button onClick={handleClose} className="text-white hover:text-gray-200">
        ✕
      </button>
    </div>
  </div>
)}
```

---

## Advanced Components

### 1. Stats Dashboard

```typescript
// Stats Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  iconColor: string;
  bgColor: string;
  subtitle?: string;
  trend?: { value: number; isPositive: boolean };
  onClick?: () => void;
  helpText?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title, value, icon: Icon, iconColor, bgColor,
  subtitle, trend, onClick, helpText
}) => (
  <div
    data-tour="stats-dashboard"
    onClick={onClick}
    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${
      onClick ? 'cursor-pointer' : ''
    }`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <Icon className={iconColor} size={24} />
      </div>
      {helpText && (
        <div className="group relative">
          <HelpCircle size={14} className="text-gray-400" />
          <div className="absolute right-0 top-6 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            {helpText}
          </div>
        </div>
      )}
    </div>

    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
    <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>

    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}

    {trend && (
      <div className="flex items-center gap-1 mt-2">
        {trend.isPositive ? (
          <TrendingUp size={14} className="text-green-600" />
        ) : (
          <TrendingDown size={14} className="text-red-600" />
        )}
        <span className={`text-xs font-medium ${
          trend.isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend.value}%
        </span>
      </div>
    )}
  </div>
);

// Stats Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  <StatCard {...} />
  <StatCard {...} />
  <StatCard {...} />
  <StatCard {...} />
</div>
```

### 2. Enhanced Filters

```typescript
// Collapsible Filter Panel
const Filters: React.FC = ({ filters, onChange, onReset, itemCount }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6" data-tour="filters">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            <Filter size={20} className="text-gray-600" />
            <h3 className="text-base font-semibold text-gray-800">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button onClick={onReset} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              <X size={16} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.search || ''}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Dropdowns */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>All</option>
                {/* Options */}
              </select>
            </div>

            {/* Quick Filters */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <button className={`px-3 py-1.5 text-xs font-medium rounded-lg border-2 ${
                  filters.isActive ? 'bg-orange-100 text-orange-700 border-orange-500' : 'bg-gray-100 text-gray-600'
                }`}>
                  Active
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-600">Active filters:</span>
                {getActiveFilterChips().map((chip, i) => (
                  <button key={i} onClick={chip.onRemove} className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                    <span>{chip.label}</span>
                    <X size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

### 3. View Toggle

```typescript
// ViewToggle Component
export type ViewMode = 'cards' | 'table';

const ViewToggle: React.FC<{ currentView: ViewMode; onChange: (view: ViewMode) => void }> = ({
  currentView, onChange
}) => (
  <div className="inline-flex bg-gray-100 rounded-lg p-1" data-tour="view-toggle">
    <button
      onClick={() => onChange('cards')}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        currentView === 'cards' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600'
      }`}
    >
      <LayoutGrid size={16} />
      <span>Cards</span>
    </button>
    <button
      onClick={() => onChange('table')}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        currentView === 'table' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600'
      }`}
    >
      <List size={16} />
      <span>Table</span>
    </button>
  </div>
);
```

### 4. Card View Layout

```typescript
// Card Grid Container
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {items.map(item => (
    <ItemCard key={item.id} item={item} {...handlers} />
  ))}
</div>

// Individual Card
const ItemCard: React.FC = ({ item, onEdit, onDelete, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      data-tour="item-card"
      className={`bg-white rounded-xl shadow-sm border transition-all ${
        isSelected ? 'border-orange-500 shadow-md' : 'border-gray-100 hover:shadow-md'
      }`}
    >
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(item.id, e.target.checked)}
            className="mt-1"
          />

          <div className={`p-2 rounded-lg ${getBgColor(item.category)}`}>
            <Icon className={getIconColor(item.category)} size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-800 truncate">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.code}</p>
          </div>

          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {item.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Metric 1</p>
            <p className="text-sm font-semibold text-gray-800">{item.metric1}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Metric 2</p>
            <p className="text-sm font-semibold text-gray-800">{item.metric2}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Metric 3</p>
            <p className="text-sm font-semibold text-gray-800">{item.metric3}</p>
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Detail 1:</span>
              <span className="text-gray-800 font-medium">{item.detail1}</span>
            </div>
            {/* More details */}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-900 font-medium hover:text-blue-700"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>

        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(item)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
```

### 5. Pagination

```typescript
// Pagination Component
interface PaginationProps {
  page: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min((page + 1) * rowsPerPage, totalItems);

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-600">
        {startIndex}-{endIndex} of {totalItems}
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(0)}
          disabled={page === 0}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {getPageNumbers(page, totalPages).map((pageNum, i) =>
          pageNum === '...' ? (
            <span key={i} className="px-3 py-1">...</span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(Number(pageNum) - 1)}
              className={`px-3 py-1 text-sm rounded ${
                page === Number(pageNum) - 1
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};
```

---

## Modal Patterns

### 1. Multi-Step Wizard Modal

```typescript
// Wizard Container Component
interface WizardStep {
  title: string;
  description: string;
}

interface WizardProps {
  steps: WizardStep[];
  currentStep: number;
  children: React.ReactNode;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  canProceed: boolean;
  isSubmitting?: boolean;
  isLastStep: boolean;
}

const Wizard: React.FC<WizardProps> = ({
  steps, currentStep, children, onPrevious, onNext,
  onCancel, onSubmit, canProceed, isSubmitting, isLastStep
}) => (
  <div className="min-h-[600px] flex flex-col">
    {/* Progress Indicator */}
    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  index < currentStep ? 'bg-green-500 text-white' :
                  index === currentStep ? 'bg-blue-900 text-white ring-4 ring-blue-100' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? <Check size={20} /> : index + 1}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-medium ${
                    index === currentStep ? 'text-blue-900' :
                    index < currentStep ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 max-w-[100px] hidden md:block">
                    {step.description}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 px-2">
                  <div className={`h-0.5 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>

    {/* Step Content */}
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">{children}</div>
    </div>

    {/* Navigation Buttons */}
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <button onClick={onCancel} disabled={isSubmitting} className="...">
          <X size={16} />
          <span>Cancel</span>
        </button>

        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <button onClick={onPrevious} disabled={isSubmitting} className="...">
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
          )}

          {isLastStep ? (
            <button onClick={onSubmit} disabled={!canProceed || isSubmitting} className="...">
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /><span>Submitting...</span></>
              ) : (
                <><Check size={16} /><span>Submit</span></>
              )}
            </button>
          ) : (
            <button onClick={onNext} disabled={!canProceed} className="...">
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
```

### 2. Standard Modal

```typescript
// Modal Component
interface ModalProps {
  open: boolean;
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  iconBgColor: string;
  iconColor: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open, title, icon: Icon, iconBgColor, iconColor,
  children, onClose, footer
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${iconBgColor}`}>
              <Icon className={iconColor} size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
```

### 3. Confirmation Modal

```typescript
// Confirmation Modal
const ConfirmModal: React.FC = ({ open, title, message, onConfirm, onCancel, isDestructive }) => (
  <Modal
    open={open}
    title={title}
    icon={AlertTriangle}
    iconBgColor={isDestructive ? 'bg-red-50' : 'bg-orange-50'}
    iconColor={isDestructive ? 'text-red-600' : 'text-orange-600'}
    onClose={onCancel}
    footer={
      <div className="flex items-center justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={onConfirm} className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
          isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-900 hover:bg-blue-800'
        }`}>
          Confirm
        </button>
      </div>
    }
  >
    <p className="text-gray-700">{message}</p>
  </Modal>
);
```

---

## Tour Implementation

### 1. Install Dependencies

```bash
npm install react-joyride
npm install --save-dev @types/react-joyride
```

### 2. Create Tour Hook

```typescript
// hooks/useTour.tsx
import { useState, useEffect, useCallback } from 'react';
import { CallBackProps, Step, STATUS } from 'react-joyride';

const TOUR_STORAGE_KEY = 'phb_[page]_tour_completed';

export const useTour = () => {
  const [tourState, setTourState] = useState({
    run: false,
    stepIndex: 0
  });

  const steps: Step[] = [
    {
      target: '[data-tour="stats"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Statistics</h3>
          <p>View key metrics at a glance. Click to filter by category.</p>
        </div>
      ),
      disableBeacon: true,
      placement: 'bottom'
    },
    {
      target: '[data-tour="view-toggle"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">View Toggle</h3>
          <p>Switch between card and table views.</p>
        </div>
      ),
      placement: 'bottom'
    },
    {
      target: '[data-tour="filters"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Filters</h3>
          <p>Use filters to find specific items quickly.</p>
        </div>
      ),
      placement: 'bottom'
    },
    {
      target: '[data-tour="add-button"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Add New</h3>
          <p>Click here to create a new item.</p>
        </div>
      ),
      placement: 'left'
    },
    {
      target: '[data-tour="item-card"]',
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Item Cards</h3>
          <p>View and interact with items. Click to expand details.</p>
        </div>
      ),
      placement: 'top'
    }
  ];

  useEffect(() => {
    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        setTourState({ run: true, stepIndex: 0 });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, index, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as STATUS)) {
      setTourState({ run: false, stepIndex: 0 });
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    } else if (type === 'step:after') {
      setTourState(prev => ({
        ...prev,
        stepIndex: index + (data.action === 'prev' ? -1 : 1)
      }));
    }
  }, []);

  const restartTour = useCallback(() => {
    setTourState({ run: true, stepIndex: 0 });
  }, []);

  return {
    run: tourState.run,
    stepIndex: tourState.stepIndex,
    steps,
    handleJoyrideCallback,
    restartTour
  };
};
```

### 3. Integrate Tour

```typescript
// In your page component
import Joyride from 'react-joyride';
import { useTour } from './hooks/useTour';

const MyPage: React.FC = () => {
  const { run, stepIndex, steps, handleJoyrideCallback, restartTour } = useTour();

  return (
    <div>
      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            primaryColor: '#1e3a8a',
            zIndex: 10000,
          },
        }}
      />

      {/* Tour restart button in header */}
      <button onClick={restartTour} className="...">
        <HelpCircle size={16} />
        <span>Tour</span>
      </button>

      {/* Rest of page */}
    </div>
  );
};
```

---

## Form Validation Pattern

### Critical Pattern: Avoiding Infinite Re-renders

```typescript
// ❌ WRONG - Causes infinite re-render loop
const canProceed = validateStep(currentStep);

const validateStep = (step: number): boolean => {
  setError(null); // ⚠️ State change during render!
  // validation logic
};

// ✅ CORRECT - Separate pure validation from state changes
const canProceed = checkStepValidity(currentStep);

// Pure validation (no state changes)
const checkStepValidity = (step: number): boolean => {
  switch (step) {
    case 0:
      return !!(formData.name.trim() && formData.email.trim());
    case 1:
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(formData.email);
    default:
      return false;
  }
};

// Validation with error messages (for button handlers)
const validateStep = (step: number): boolean => {
  setError(null); // ✅ Safe - only called on user action

  switch (step) {
    case 0:
      if (!formData.name.trim()) {
        setError('Name is required');
        return false;
      }
      return true;
    // ...
  }
};

// Usage
const handleNext = () => {
  if (validateStep(currentStep)) {
    setCurrentStep(prev => prev + 1);
  }
};
```

### Form Input Patterns

```typescript
// Text Input with Help Tooltip
<div>
  <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
    Field Name
    <div className="group relative">
      <HelpCircle size={14} className="text-gray-400 hover:text-gray-600" />
      <div className="absolute left-0 top-6 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
        Help text here
      </div>
    </div>
  </label>
  <input
    type="text"
    value={formData.field}
    onChange={(e) => handleChange('field', e.target.value)}
    placeholder="Enter value..."
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</div>

// Select Dropdown with Optgroups
<select
  value={formData.category}
  onChange={(e) => handleChange('category', e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select category</option>

  <optgroup label="Group 1">
    <option value="opt1">Option 1</option>
    <option value="opt2">Option 2</option>
  </optgroup>

  <optgroup label="Group 2">
    <option value="opt3">Option 3</option>
  </optgroup>
</select>

// Toggle Switch
<div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
  <div>
    <label className="text-sm font-medium text-gray-700">Enable Feature</label>
    <p className="text-xs text-gray-500">Description of the feature</p>
  </div>
  <button
    onClick={() => handleChange('isEnabled', !formData.isEnabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      formData.isEnabled ? 'bg-blue-900' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        formData.isEnabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
</div>

// Number Input with Min/Max
<div>
  <label className="text-sm font-medium text-gray-700 mb-1 block">
    Quantity
  </label>
  <input
    type="number"
    min={1}
    max={100}
    value={formData.quantity}
    onChange={(e) => handleChange('quantity', Number(e.target.value))}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
  />
  <p className="text-xs text-gray-500 mt-1">Current: {initialValue}</p>
</div>

// Textarea
<div>
  <label className="text-sm font-medium text-gray-700 mb-1 block">
    Description
  </label>
  <textarea
    value={formData.description}
    onChange={(e) => handleChange('description', e.target.value)}
    rows={4}
    placeholder="Enter description..."
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  />
  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
</div>
```

---

## Bulk Actions Bar

```typescript
// Floating Bulk Actions Bar
const BulkActionsBar: React.FC<{
  selectedItems: Item[];
  onClearSelection: () => void;
  onBulkComplete: (action: string, results: any) => void;
}> = ({ selectedItems, onClearSelection, onBulkComplete }) => {
  const [loading, setLoading] = useState(false);

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] max-w-[800px] w-[calc(100%-48px)]">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200">
        <div className="flex items-center gap-4 p-4">
          {/* Selection Count */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              {selectedItems.length}
            </span>
            <span className="text-sm text-gray-500">selected</span>
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="...">
              <Download size={14} />
              <span>Export</span>
            </button>

            <button onClick={handleBulkAction} className="...">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}
              <span>Action</span>
            </button>
          </div>

          {/* Clear Selection */}
          <button onClick={onClearSelection} className="...">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## Responsive Design Guidelines

### Breakpoints

```typescript
// Tailwind Breakpoints
sm: '640px'   // Small devices (landscape phones)
md: '768px'   // Medium devices (tablets)
lg: '1024px'  // Large devices (desktops)
xl: '1280px'  // Extra large devices (large desktops)

// Usage
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="flex flex-col md:flex-row"
className="hidden md:block"
className="text-sm md:text-base"
```

### Mobile-First Patterns

```typescript
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">

// 1 column on mobile, 2 on tablet, 4 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="block md:hidden">

// Responsive text size
<h1 className="text-xl md:text-2xl lg:text-3xl">

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">

// Responsive max width
<div className="max-w-full md:max-w-2xl lg:max-w-4xl">
```

---

## Accessibility Guidelines

### ARIA Labels

```typescript
// Buttons
<button aria-label="Close modal">
  <X size={20} />
</button>

// Toggle
<button
  role="switch"
  aria-checked={isEnabled}
  aria-label="Enable notifications"
>

// Navigation
<nav aria-label="Main navigation">

// Sections
<section aria-labelledby="section-title">
  <h2 id="section-title">Title</h2>
</section>

// Loading states
<div role="status" aria-live="polite">
  <Loader2 className="animate-spin" />
  <span className="sr-only">Loading...</span>
</div>
```

### Keyboard Navigation

```typescript
// Ensure focusable elements
<button tabIndex={0}>Click me</button>

// Skip to content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Trap focus in modals
// Use libraries like react-focus-lock or react-focus-trap

// Keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
    if (e.ctrlKey && e.key === 'k') handleSearch();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Screen Reader Support

```typescript
// Hide decorative elements
<div aria-hidden="true">
  <DecorativeIcon />
</div>

// Screen reader only text
<span className="sr-only">Additional context for screen readers</span>

// Announce changes
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>

<div role="status" aria-live="polite">
  {successMessage}
</div>
```

---

## Performance Optimization

### Lazy Loading

```typescript
// Lazy load components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### Memoization

```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedComponent = React.memo(Component);
```

### Debouncing Search

```typescript
// Debounce search input
const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm]);

// Use debouncedSearchTerm for API calls
useEffect(() => {
  if (debouncedSearchTerm) {
    performSearch(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);
```

---

## Testing Checklist

### Visual Testing

- [ ] Matches design system colors and typography
- [ ] Cards have proper spacing and shadows
- [ ] Icons are consistent size (16-24px)
- [ ] Hover states work smoothly
- [ ] Active states use orange highlighting
- [ ] Loading skeletons display properly
- [ ] Empty states look good
- [ ] Buttons align properly

### Functional Testing

- [ ] Stats cards filter items when clicked
- [ ] View toggle switches between cards and table
- [ ] Card expand/collapse works
- [ ] Card quick actions work
- [ ] Table view maintains functionality
- [ ] Filters work in both views
- [ ] Selection persists across view changes
- [ ] Bulk actions work on selected items
- [ ] Add wizard completes successfully
- [ ] Edit wizard pre-populates correctly
- [ ] Form validation works per step
- [ ] Tour starts on first visit
- [ ] Tour can be restarted
- [ ] Tour completion persists
- [ ] Help tooltips display

### Responsive Testing

- [ ] Mobile (< 768px) - Single column layout
- [ ] Tablet (768px - 1024px) - 2 column layout
- [ ] Desktop (> 1024px) - 4 column layout
- [ ] Text remains readable at all sizes
- [ ] Buttons remain clickable
- [ ] Modals fit on screen

### Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces changes
- [ ] ARIA labels present
- [ ] Focus visible
- [ ] Color contrast meets WCAG AA

---

## Migration Checklist

### Step 1: Install Dependencies

```bash
npm install react-joyride
npm install --save-dev @types/react-joyride
```

### Step 2: Create Reusable Components

- [ ] Create `ViewToggle.tsx`
- [ ] Create `Wizard.tsx` container
- [ ] Create `useTour.tsx` hook
- [ ] Create stats card components
- [ ] Create filter components
- [ ] Create card view components

### Step 3: Redesign Main Page

- [ ] Remove Material-UI imports
- [ ] Add lucide-react icons
- [ ] Add Joyride integration
- [ ] Replace Container/Box with divs
- [ ] Replace Typography with heading elements
- [ ] Replace Button with button elements
- [ ] Add view mode state
- [ ] Add pagination state
- [ ] Add stat filter handler
- [ ] Add data-tour attributes

### Step 4: Redesign Modals

- [ ] Convert to Tailwind overlay
- [ ] Implement wizard if multi-step
- [ ] Add help tooltips
- [ ] Fix validation pattern
- [ ] Test form submission

### Step 5: Redesign Supporting Components

- [ ] Stats dashboard
- [ ] Filters panel
- [ ] Bulk actions bar
- [ ] Confirmation modals

### Step 6: Test & Polish

- [ ] Run TypeScript check
- [ ] Test all functionality
- [ ] Test responsive design
- [ ] Test accessibility
- [ ] Optimize performance

---

## Common Pitfalls & Solutions

### Pitfall 1: Infinite Re-render Loops

**Problem:** Calling state-changing functions during render

**Solution:** Separate pure validation from state changes
```typescript
// ❌ Wrong
const canProceed = validateStep(); // calls setError() during render

// ✅ Correct
const canProceed = checkStepValidity(); // pure function
```

### Pitfall 2: Module Export Errors

**Problem:** Component exported as default but imported as named

**Solution:** Export both ways
```typescript
export default Component;
export { Component };
```

### Pitfall 3: JSX in .ts Files

**Problem:** React components with JSX in `.ts` files

**Solution:** Rename to `.tsx`
```bash
mv Component.ts Component.tsx
```

### Pitfall 4: Missing data-tour Attributes

**Problem:** Tour can't find target elements

**Solution:** Add data-tour attributes to all tour targets
```typescript
<div data-tour="step-id">
```

### Pitfall 5: Inconsistent Styling

**Problem:** Mixing Material-UI and Tailwind

**Solution:** Completely remove Material-UI, use only Tailwind
```typescript
// ❌ Wrong
<Box sx={{ p: 2 }}>

// ✅ Correct
<div className="p-4">
```

---

## Quick Reference

### Color Classes

```typescript
// Backgrounds
'bg-white', 'bg-gray-50', 'bg-blue-50', 'bg-orange-50',
'bg-green-50', 'bg-red-50', 'bg-blue-900'

// Text
'text-gray-800', 'text-gray-700', 'text-gray-600', 'text-gray-500',
'text-blue-900', 'text-orange-600', 'text-green-700', 'text-red-700'

// Borders
'border-gray-100', 'border-gray-200', 'border-orange-500'
```

### Icon Imports

```typescript
import {
  Plus, Edit, Trash2, X, Check, ChevronDown, ChevronRight,
  ChevronLeft, ChevronsLeft, ChevronsRight, Search, Filter,
  RefreshCw, HelpCircle, Download, Upload, AlertTriangle,
  CheckCircle, XCircle, Loader2, Eye, EyeOff, MoreVertical,
  LayoutGrid, List, Building2, Users, User, Settings
} from 'lucide-react';
```

### Common Patterns

```typescript
// Loading spinner
<Loader2 size={40} className="text-blue-900 animate-spin" />

// Active badge
<span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
  Active
</span>

// Status badge
<span className={`px-2 py-1 text-xs font-medium rounded-full ${
  isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
}`}>
  {isActive ? 'Active' : 'Inactive'}
</span>

// Card hover
className="hover:shadow-md transition-shadow cursor-pointer"

// Disabled state
className="disabled:opacity-50 disabled:cursor-not-allowed"

// Focus ring
className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
```

---

## File Structure

```
src/
├── components/
│   └── [feature]/
│       ├── [Feature]CardView.tsx
│       ├── [Feature]Stats.tsx
│       ├── [Feature]Filters.tsx
│       ├── ViewToggle.tsx
│       ├── [Feature]Wizard.tsx
│       ├── Add[Feature]Modal.tsx
│       ├── Edit[Feature]Modal.tsx
│       ├── Delete[Feature]Modal.tsx
│       └── BulkActionsBar.tsx
├── hooks/
│   └── use[Feature]Tour.tsx
├── pages/
│   └── [Feature]ManagementPage.tsx
└── types/
    └── [feature].ts
```

---

## Conclusion

This guide provides a complete template for modernizing legacy Material-UI pages to professional Tailwind CSS designs with enhanced UX features. Follow the patterns, checklist, and guidelines to ensure consistency across the platform.

For questions or updates to this guide, contact the development team.

---

**Last Updated:** December 2025
**Next Review:** March 2026