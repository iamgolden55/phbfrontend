import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Building2, Users, Shield, FileText, DollarSign, Package,
  ChevronRight
} from 'lucide-react';

// Settings hub page - Main navigation for all settings
const OrganizationSettingsPage: React.FC = () => {
  const settingsCards = [
    {
      title: 'Organization Profile',
      description: 'Edit organization details, contacts, address, and bank information',
      icon: Building2,
      link: '/organization/settings/profile',
      color: 'blue'
    },
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions across your organization',
      icon: Users,
      link: '/organization/settings/users',
      color: 'green'
    },
    {
      title: 'Role Management',
      description: 'Create custom roles with specific permissions',
      icon: Shield,
      link: '/organization/settings/roles',
      color: 'purple'
    },
    {
      title: 'Template Library',
      description: 'View and organize clinical note templates',
      icon: FileText,
      link: '/organization/settings/templates',
      color: 'indigo'
    },
    {
      title: 'Price List',
      description: 'Manage service pricing with multiple tiers',
      icon: DollarSign,
      link: '/organization/settings/price-list',
      color: 'orange'
    },
    {
      title: 'Health Packages',
      description: 'Create bundled services with discounted pricing',
      icon: Package,
      link: '/organization/settings/health-packages',
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', icon: 'text-blue-600', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', icon: 'text-green-600', hover: 'hover:bg-green-100' },
      purple: { bg: 'bg-purple-50', icon: 'text-purple-600', hover: 'hover:bg-purple-100' },
      indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', hover: 'hover:bg-indigo-100' },
      orange: { bg: 'bg-orange-50', icon: 'text-orange-600', hover: 'hover:bg-orange-100' },
      pink: { bg: 'bg-pink-50', icon: 'text-pink-600', hover: 'hover:bg-pink-100' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Organization Settings | PHB</title>
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Organization Settings</h1>
        <p className="text-gray-500 text-sm">
          Manage your organization's configuration, users, and services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => {
          const colors = getColorClasses(card.color);
          const Icon = card.icon;

          return (
            <Link
              key={card.link}
              to={card.link}
              className={`block p-6 bg-white border border-gray-200 rounded-xl transition-all ${colors.hover} hover:shadow-lg hover:border-gray-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${colors.bg} rounded-lg`}>
                  <Icon className={`${colors.icon}`} size={24} />
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizationSettingsPage;