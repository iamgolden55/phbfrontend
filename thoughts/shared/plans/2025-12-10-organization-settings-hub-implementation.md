---
date: 2025-12-10T19:30:00+0000
author: Claude (Sonnet 4.5)
status: ready_for_implementation
priority: critical
estimated_effort: 2-3 days
tags: [implementation-plan, organization, settings, frontend, react, typescript]
related_research: thoughts/shared/research/2025-12-10-organization-dashboard-missing-features.md
---

# Implementation Plan: Organization Settings Hub

**Priority**: 🚨 Critical
**Estimated Effort**: 2-3 days
**Dependencies**: None (foundational feature)
**Related Research**: `thoughts/shared/research/2025-12-10-organization-dashboard-missing-features.md`

## Overview

Create a centralized Organization Settings Hub page that serves as the main entry point for all organizational configuration. Similar to Medesk's comprehensive settings interface, this hub will organize settings into logical categories and provide quick access to all configuration pages.

## Goals

1. Create a single source of truth for all organization settings
2. Improve discoverability of configuration options
3. Organize settings into logical categories (Basic, Service Provision, Payments, Labs)
4. Provide visual navigation with card-based interface
5. Show quick stats and status indicators
6. Enable search functionality for finding settings quickly

## File Structure

```
src/pages/organization/
├── OrganizationSettingsPage.tsx          # Main settings hub (NEW)
└── settings/                              # Settings subdirectory (NEW)
    ├── OrganizationProfilePage.tsx       # Profile/practice details
    ├── UserManagementPage.tsx            # User administration
    ├── RoleManagementPage.tsx            # Role definitions
    ├── LocationsRoomsPage.tsx            # Facility management
    ├── ScheduleSettingsPage.tsx          # Global scheduling
    ├── TagManagementPage.tsx             # Reference data
    ├── OnlineBookingSettingsPage.tsx     # Booking configuration
    ├── SubscriptionPage.tsx              # Billing/subscription
    ├── PriceListPage.tsx                 # Service pricing
    ├── TemplateLibraryPage.tsx           # Clinical templates
    └── HealthPackagesPage.tsx            # Service bundles

src/components/organization/settings/
├── SettingsCard.tsx                      # Reusable settings card
├── SettingsCategory.tsx                  # Category section
├── SettingsStats.tsx                     # Quick stats widget
└── SettingsSearch.tsx                    # Search functionality

src/types/
└── organizationSettings.ts               # TypeScript interfaces
```

## Component Specifications

### 1. OrganizationSettingsPage.tsx (Main Hub)

**Location**: `src/pages/organization/OrganizationSettingsPage.tsx`

**Purpose**: Main landing page for all organization settings with categorized navigation.

**Component Structure**:
```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganizationAuth } from '@/features/organization/organizationAuthContext';
import SettingsCard from '@/components/organization/settings/SettingsCard';
import SettingsCategory from '@/components/organization/settings/SettingsCategory';
import SettingsStats from '@/components/organization/settings/SettingsStats';
import SettingsSearch from '@/components/organization/settings/SettingsSearch';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  badge?: string;
  enabled: boolean;
  category: 'basic' | 'service_provision' | 'payments' | 'labs';
}

const OrganizationSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useOrganizationAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'basic',
    'service_provision'
  ]);

  // Settings configuration
  const settings: SettingItem[] = [
    // Basic category
    {
      id: 'profile',
      title: 'My Practice',
      description: 'Practice profile and details',
      icon: <BuildingIcon />,
      route: '/organization/settings/profile',
      badge: null,
      enabled: true,
      category: 'basic'
    },
    {
      id: 'locations',
      title: 'Locations & Rooms',
      description: 'Manage rooms and departments',
      icon: <LocationIcon />,
      route: '/organization/settings/locations-rooms',
      badge: '5 locations',
      enabled: true,
      category: 'basic'
    },
    {
      id: 'roles',
      title: 'Roles',
      description: 'Manage available user roles',
      icon: <ShieldIcon />,
      route: '/organization/settings/roles',
      badge: '8 roles',
      enabled: true,
      category: 'basic'
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Management and registration of users',
      icon: <UsersIcon />,
      route: '/organization/settings/users',
      badge: '24 users',
      enabled: true,
      category: 'basic'
    },
    {
      id: 'schedule',
      title: 'Schedule',
      description: 'Schedule management for users',
      icon: <CalendarIcon />,
      route: '/organization/settings/schedule',
      badge: null,
      enabled: true,
      category: 'basic'
    },
    {
      id: 'tags',
      title: 'Tag Management',
      description: 'Tag and reference management',
      icon: <TagIcon />,
      route: '/organization/settings/tags',
      badge: null,
      enabled: true,
      category: 'basic'
    },
    {
      id: 'online_booking',
      title: 'Online Appointment Booking',
      description: 'Management of online booking settings',
      icon: <GlobeIcon />,
      route: '/organization/settings/online-booking',
      badge: 'Enabled',
      enabled: true,
      category: 'basic'
    },
    {
      id: 'subscription',
      title: 'Subscription Details',
      description: 'Your pricing plan and terms of use',
      icon: <CreditCardIcon />,
      route: '/organization/settings/subscription',
      badge: 'Pro Plan',
      enabled: true,
      category: 'basic'
    },

    // Service Provision category
    {
      id: 'price_list',
      title: 'Price List',
      description: 'View and edit price list items',
      icon: <CurrencyIcon />,
      route: '/organization/settings/price-list',
      badge: '150 items',
      enabled: true,
      category: 'service_provision'
    },
    {
      id: 'templates',
      title: 'Consultation Notes Templates and Forms',
      description: 'Manage templates and forms',
      icon: <DocumentIcon />,
      route: '/organization/settings/templates',
      badge: '93 templates',
      enabled: true,
      category: 'service_provision'
    },
    {
      id: 'health_packages',
      title: 'Health Packages',
      description: 'Management of health packages available to patients',
      icon: <PackageIcon />,
      route: '/organization/settings/health-packages',
      badge: '12 packages',
      enabled: true,
      category: 'service_provision'
    },

    // Payments category
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Payment methods and accounting',
      icon: <ReceiptIcon />,
      route: '/organization/billing',
      badge: null,
      enabled: true,
      category: 'payments'
    },

    // Labs category
    {
      id: 'lab_settings',
      title: 'Laboratory Settings',
      description: 'Lab configuration and test catalog',
      icon: <BeakerIcon />,
      route: '/organization/lab',
      badge: null,
      enabled: true,
      category: 'labs'
    }
  ];

  // Filter settings based on search
  const filteredSettings = settings.filter(setting =>
    setting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    setting.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category
  const groupedSettings = filteredSettings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SettingItem[]>);

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Organisation Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your organization configuration and preferences
              </p>
            </div>

            {/* Help button */}
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <QuestionMarkCircleIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <SettingsStats />

        {/* Search */}
        <div className="mt-6">
          <SettingsSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search settings..."
          />
        </div>

        {/* Settings Categories */}
        <div className="mt-8 space-y-6">
          {/* Basic Settings */}
          <SettingsCategory
            title="Basic"
            isExpanded={expandedCategories.includes('basic')}
            onToggle={() => toggleCategory('basic')}
            itemCount={groupedSettings.basic?.length || 0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSettings.basic?.map(setting => (
                <SettingsCard
                  key={setting.id}
                  title={setting.title}
                  description={setting.description}
                  icon={setting.icon}
                  badge={setting.badge}
                  onClick={() => handleCardClick(setting.route)}
                  enabled={setting.enabled}
                />
              ))}
            </div>
          </SettingsCategory>

          {/* Service Provision */}
          <SettingsCategory
            title="Service Provision"
            isExpanded={expandedCategories.includes('service_provision')}
            onToggle={() => toggleCategory('service_provision')}
            itemCount={groupedSettings.service_provision?.length || 0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSettings.service_provision?.map(setting => (
                <SettingsCard
                  key={setting.id}
                  title={setting.title}
                  description={setting.description}
                  icon={setting.icon}
                  badge={setting.badge}
                  onClick={() => handleCardClick(setting.route)}
                  enabled={setting.enabled}
                />
              ))}
            </div>
          </SettingsCategory>

          {/* Payments and Accounting */}
          <SettingsCategory
            title="Payments and Accounting"
            isExpanded={expandedCategories.includes('payments')}
            onToggle={() => toggleCategory('payments')}
            itemCount={groupedSettings.payments?.length || 0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSettings.payments?.map(setting => (
                <SettingsCard
                  key={setting.id}
                  title={setting.title}
                  description={setting.description}
                  icon={setting.icon}
                  badge={setting.badge}
                  onClick={() => handleCardClick(setting.route)}
                  enabled={setting.enabled}
                />
              ))}
            </div>
          </SettingsCategory>

          {/* Labs */}
          <SettingsCategory
            title="Labs"
            isExpanded={expandedCategories.includes('labs')}
            onToggle={() => toggleCategory('labs')}
            itemCount={groupedSettings.labs?.length || 0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSettings.labs?.map(setting => (
                <SettingsCard
                  key={setting.id}
                  title={setting.title}
                  description={setting.description}
                  icon={setting.icon}
                  badge={setting.badge}
                  onClick={() => handleCardClick(setting.route)}
                  enabled={setting.enabled}
                />
              ))}
            </div>
          </SettingsCategory>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettingsPage;
```

**Key Features**:
- Card-based navigation to all settings pages
- Categorized sections (collapsible)
- Search functionality for quick access
- Badge indicators showing counts/status
- Responsive grid layout
- Help button for documentation

---

### 2. SettingsCard.tsx (Reusable Card Component)

**Location**: `src/components/organization/settings/SettingsCard.tsx`

**Purpose**: Reusable card component for each setting item.

```tsx
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface SettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string | null;
  onClick: () => void;
  enabled?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  icon,
  badge,
  onClick,
  enabled = true
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className={`
        w-full text-left p-4 rounded-lg border border-gray-200
        hover:border-orange-300 hover:shadow-md transition-all
        bg-white group
        ${!enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
            <div className="w-5 h-5 text-orange-600">
              {icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2">
              {description}
            </p>

            {/* Badge */}
            {badge && (
              <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded">
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0 ml-2" />
      </div>
    </button>
  );
};

export default SettingsCard;
```

**Props**:
- `title`: Setting name
- `description`: Short description of what this setting does
- `icon`: React icon component
- `badge`: Optional badge text (e.g., "5 users", "Enabled")
- `onClick`: Navigation handler
- `enabled`: Whether the setting is accessible

---

### 3. SettingsCategory.tsx (Collapsible Section)

**Location**: `src/components/organization/settings/SettingsCategory.tsx`

**Purpose**: Collapsible category section with expand/collapse.

```tsx
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface SettingsCategoryProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  itemCount: number;
  children: React.ReactNode;
}

const SettingsCategory: React.FC<SettingsCategoryProps> = ({
  title,
  isExpanded,
  onToggle,
  itemCount,
  children
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingsCategory;
```

**Props**:
- `title`: Category name (e.g., "Basic", "Service Provision")
- `isExpanded`: Whether category is expanded
- `onToggle`: Expand/collapse handler
- `itemCount`: Number of settings in this category
- `children`: Settings cards to display

---

### 4. SettingsStats.tsx (Quick Stats Widget)

**Location**: `src/components/organization/settings/SettingsStats.tsx`

**Purpose**: Display quick statistics about the organization.

```tsx
import React, { useEffect, useState } from 'react';
import {
  UsersIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const SettingsStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        // TODO: Replace with actual API call
        const mockStats: Stat[] = [
          {
            label: 'Active Users',
            value: 24,
            icon: <UsersIcon className="w-6 h-6" />,
            color: 'blue'
          },
          {
            label: 'Locations',
            value: 5,
            icon: <BuildingOfficeIcon className="w-6 h-6" />,
            color: 'green'
          },
          {
            label: 'Templates',
            value: 93,
            icon: <DocumentTextIcon className="w-6 h-6" />,
            color: 'purple'
          },
          {
            label: 'User Roles',
            value: 8,
            icon: <ShieldCheckIcon className="w-6 h-6" />,
            color: 'orange'
          }
        ];

        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch settings stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SettingsStats;
```

**Features**:
- Displays 4 key metrics (users, locations, templates, roles)
- Color-coded icons
- Loading state with skeleton
- Hover effects
- Fetches from API (mock data shown)

---

### 5. SettingsSearch.tsx (Search Component)

**Location**: `src/components/organization/settings/SettingsSearch.tsx`

**Purpose**: Search/filter settings by name or description.

```tsx
import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SettingsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SettingsSearch: React.FC<SettingsSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search settings...'
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
        placeholder={placeholder}
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SettingsSearch;
```

**Props**:
- `value`: Current search query
- `onChange`: Search query change handler
- `placeholder`: Placeholder text

---

## TypeScript Interfaces

**Location**: `src/types/organizationSettings.ts`

```typescript
export interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  badge?: string | null;
  enabled: boolean;
  category: SettingCategory;
  requiredRole?: OrganizationRole[];
}

export type SettingCategory =
  | 'basic'
  | 'service_provision'
  | 'payments'
  | 'labs';

export type OrganizationRole =
  | 'hospital_admin'
  | 'ngo_admin'
  | 'pharmacy_admin';

export interface SettingsStat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface SettingsSearchResult {
  item: SettingItem;
  matchedText: string;
}
```

---

## Routing Configuration

**Update**: `src/App.tsx`

Add the following routes under the `/organization` path:

```tsx
// In App.tsx organization routes section
<Route path="/organization/settings" element={<OrganizationSettingsPage />} />

// Settings sub-pages (to be implemented in subsequent phases)
<Route path="/organization/settings/profile" element={<OrganizationProfilePage />} />
<Route path="/organization/settings/users" element={<UserManagementPage />} />
<Route path="/organization/settings/roles" element={<RoleManagementPage />} />
<Route path="/organization/settings/locations-rooms" element={<LocationsRoomsPage />} />
<Route path="/organization/settings/schedule" element={<ScheduleSettingsPage />} />
<Route path="/organization/settings/tags" element={<TagManagementPage />} />
<Route path="/organization/settings/online-booking" element={<OnlineBookingSettingsPage />} />
<Route path="/organization/settings/subscription" element={<SubscriptionPage />} />
<Route path="/organization/settings/price-list" element={<PriceListPage />} />
<Route path="/organization/settings/templates" element={<TemplateLibraryPage />} />
<Route path="/organization/settings/health-packages" element={<HealthPackagesPage />} />
```

---

## Navigation Integration

**Update**: `src/layouts/ModernOrganizationLayout.tsx`

Add a "Settings" menu item to the sidebar:

```tsx
const menuItems = [
  // ... existing items
  {
    label: 'Settings',
    icon: <CogIcon className="w-5 h-5" />,
    path: '/organization/settings',
    active: location.pathname.startsWith('/organization/settings')
  }
];
```

---

## API Requirements

**Endpoints needed** (backend implementation):

```typescript
// Get organization settings metadata
GET /api/organizations/settings/metadata
Response: {
  stats: {
    active_users: number;
    locations: number;
    templates: number;
    roles: number;
  },
  enabled_settings: string[];
  subscription_plan: string;
}

// Get setting status
GET /api/organizations/settings/{setting_id}/status
Response: {
  enabled: boolean;
  badge: string | null;
  last_updated: string;
}
```

---

## Styling Guidelines

**Tailwind Classes**:
- Primary color: `orange-500`, `orange-600` (brand color)
- Hover states: `hover:border-orange-300`, `hover:shadow-md`
- Background: `bg-gray-50` (page), `bg-white` (cards)
- Borders: `border-gray-200`
- Text hierarchy: `text-gray-900` (headings), `text-gray-600` (labels), `text-gray-500` (descriptions)

**Icons**:
- Use Heroicons v2 (outline style)
- Icon size in cards: `w-5 h-5`
- Icon size in stats: `w-6 h-6`

---

## Responsive Design

**Breakpoints**:
- Mobile (`< 768px`): Single column grid
- Tablet (`768px - 1024px`): 2-column grid
- Desktop (`> 1024px`): 3-column grid

**Example**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## State Management

**Local State**:
- Search query: `useState<string>`
- Expanded categories: `useState<string[]>`
- Stats data: `useState<SettingsStat[]>`

**Context**:
- Use `useOrganizationAuth()` for user data and permissions
- Check `userData.role` to show/hide certain settings

**Example**:
```tsx
const { userData } = useOrganizationAuth();

// Only show certain settings for hospital_admin
const filteredSettings = settings.filter(setting => {
  if (setting.requiredRole) {
    return setting.requiredRole.includes(userData.role);
  }
  return true;
});
```

---

## Accessibility

**Requirements**:
- All interactive elements must be keyboard accessible
- ARIA labels for icon buttons
- Focus visible states
- Screen reader announcements for dynamic content

**Example**:
```tsx
<button
  onClick={onToggle}
  aria-expanded={isExpanded}
  aria-controls={`category-${title}`}
  className="focus:outline-none focus:ring-2 focus:ring-orange-500"
>
```

---

## Testing Checklist

**Functional Testing**:
- [ ] All settings cards navigate to correct routes
- [ ] Search filters settings correctly
- [ ] Category expand/collapse works
- [ ] Stats load and display correctly
- [ ] Badges show correct counts
- [ ] Disabled settings are not clickable

**Visual Testing**:
- [ ] Layout is responsive (mobile, tablet, desktop)
- [ ] Hover states work on all interactive elements
- [ ] Icons render correctly
- [ ] Colors match design system
- [ ] Loading states display properly

**Permission Testing**:
- [ ] Hospital admin sees all relevant settings
- [ ] NGO admin sees NGO-specific settings
- [ ] Pharmacy admin sees pharmacy-specific settings
- [ ] Settings marked as disabled are grayed out

---

## Implementation Steps

### Day 1: Core Structure
1. Create file structure and component files
2. Implement `SettingsCard` component
3. Implement `SettingsCategory` component
4. Implement `SettingsSearch` component
5. Create TypeScript interfaces

### Day 2: Main Page
1. Implement `OrganizationSettingsPage` with all settings
2. Add routing to App.tsx
3. Integrate with ModernOrganizationLayout
4. Implement search functionality
5. Test navigation

### Day 3: Polish & Stats
1. Implement `SettingsStats` component
2. Add loading states
3. Add responsive design adjustments
4. Test accessibility
5. Add error handling
6. Documentation

---

## Next Steps

After completing the Settings Hub, implement in this order:

1. **Organization Profile Page** (Low complexity, high visibility)
2. **User Management Page** (High priority)
3. **Role Management Page** (Foundation for permissions)
4. **Template Library** (High value for clinical workflows)
5. **Price List Management** (Revenue generation)

---

## Notes for Developers

**Component Reusability**:
- `SettingsCard` can be used anywhere settings cards are needed
- `SettingsCategory` can be used for any collapsible section
- Icons can be swapped easily by passing different React components

**Performance**:
- Settings array is static and can be memoized with `useMemo`
- Stats are fetched once on mount
- Search is client-side (instant filtering)

**Extensibility**:
- New settings can be added by adding items to the `settings` array
- New categories can be added by adding to the `SettingCategory` type
- Role-based filtering is already built in

**Design System**:
- Follow existing PHB color scheme (orange primary)
- Match card styles from existing dashboard pages
- Use consistent spacing (gap-4, p-4, p-6)