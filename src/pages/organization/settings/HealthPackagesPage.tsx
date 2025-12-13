import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Star,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface HealthPackage {
  id: string;
  name: string;
  description: string;
  total_value: number;
  package_price: number;
  discount_percentage: number;
  services_count: number;
  duration_days: number;
  is_active: boolean;
  is_featured: boolean;
  purchase_count: number;
}

const HealthPackagesPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data
  const packages: HealthPackage[] = [
    {
      id: '1',
      name: 'Annual Physical',
      description: 'Complete annual checkup with blood tests, ECG, and consultation',
      total_value: 375,
      package_price: 299,
      discount_percentage: 20,
      services_count: 5,
      duration_days: 365,
      is_active: true,
      is_featured: true,
      purchase_count: 142,
    },
    {
      id: '2',
      name: 'Diabetes Care Package',
      description: 'Regular monitoring and management for diabetic patients',
      total_value: 530,
      package_price: 450,
      discount_percentage: 15,
      services_count: 8,
      duration_days: 180,
      is_active: true,
      is_featured: false,
      purchase_count: 89,
    },
    {
      id: '3',
      name: 'Executive Health Screening',
      description: 'Comprehensive health screening for busy professionals',
      total_value: 850,
      package_price: 650,
      discount_percentage: 24,
      services_count: 12,
      duration_days: 365,
      is_active: true,
      is_featured: true,
      purchase_count: 67,
    },
    {
      id: '4',
      name: 'Women\'s Wellness',
      description: 'Specialized health package for women including gynecological screening',
      total_value: 425,
      package_price: 340,
      discount_percentage: 20,
      services_count: 6,
      duration_days: 365,
      is_active: true,
      is_featured: false,
      purchase_count: 124,
    },
  ];

  const totalRevenue = packages.reduce((sum, pkg) => sum + (pkg.package_price * pkg.purchase_count), 0);
  const totalPackages = packages.length;
  const activePackages = packages.filter(p => p.is_active).length;

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Health Packages | PHB</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/organization/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Health Packages</h1>
              <p className="text-gray-500 text-sm">Create bundled services with discounted pricing</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Plus size={16} />
            Create Package
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={20} />
            </div>
            <p className="text-sm font-medium text-gray-600">Total Packages</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalPackages}</p>
          <p className="text-xs text-gray-500 mt-1">{activePackages} active</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <p className="text-sm font-medium text-gray-600">Total Purchases</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {packages.reduce((sum, pkg) => sum + pkg.purchase_count, 0)}
          </p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">£{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">From packages</p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative"
          >
            {/* Featured Badge */}
            {pkg.is_featured && (
              <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs font-medium">
                  <Star size={12} fill="currentColor" />
                  Featured
                </span>
              </div>
            )}

            {/* Package Info */}
            <div className="mb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Package className="text-orange-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{pkg.name}</h3>
                  <p className="text-sm text-gray-600">{pkg.description}</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-500 line-through">£{pkg.total_value}</p>
                  <p className="text-2xl font-bold text-gray-800">£{pkg.package_price}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-bold">
                    {pkg.discount_percentage}% OFF
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Save £{pkg.total_value - pkg.package_price}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Services Included</p>
                <p className="text-sm font-semibold text-gray-800">{pkg.services_count} services</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Valid For</p>
                <p className="text-sm font-semibold text-gray-800">{pkg.duration_days} days</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Purchases</p>
                <p className="text-sm font-semibold text-gray-800">{pkg.purchase_count}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                {pkg.is_active ? (
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                View Details
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Edit size={16} />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Package className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-medium text-blue-800">Package Benefits</p>
          <p className="text-sm text-blue-600 mt-1">
            Health packages encourage preventive care and provide better value for patients while generating predictable revenue for your organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthPackagesPage;