import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Plus,
  Search,
  Upload,
  Download,
  Edit,
  Trash2,
  ArrowLeft,
  Tag
} from 'lucide-react';

interface PriceItem {
  id: string;
  code: string;
  name: string;
  category: string;
  base_price: number;
  currency: string;
  is_active: boolean;
}

const PriceListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data
  const priceItems: PriceItem[] = [
    {
      id: '1',
      code: 'CONS-GP',
      name: 'General Consultation',
      category: 'Consultation',
      base_price: 50,
      currency: 'GBP',
      is_active: true,
    },
    {
      id: '2',
      code: 'LAB-CBC',
      name: 'Complete Blood Count',
      category: 'Lab Test',
      base_price: 25,
      currency: 'GBP',
      is_active: true,
    },
    {
      id: '3',
      code: 'XRAY-CHE',
      name: 'Chest X-Ray',
      category: 'Imaging',
      base_price: 75,
      currency: 'GBP',
      is_active: true,
    },
    {
      id: '4',
      code: 'CONS-CARD',
      name: 'Cardiology Consultation',
      category: 'Consultation',
      base_price: 120,
      currency: 'GBP',
      is_active: true,
    },
    {
      id: '5',
      code: 'VAC-FLU',
      name: 'Flu Vaccination',
      category: 'Vaccination',
      base_price: 30,
      currency: 'GBP',
      is_active: true,
    },
  ];

  const categories = ['All', 'Consultation', 'Lab Test', 'Imaging', 'Vaccination', 'Procedure'];

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Price List | PHB</title>
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
              <h1 className="text-2xl font-bold text-gray-800">Price List</h1>
              <p className="text-gray-500 text-sm">Manage service pricing with multiple tiers</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Upload size={16} />
              Import CSV
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
              <Plus size={16} />
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by service name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {priceItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono text-gray-800">{item.code}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      <Tag size={12} />
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">
                      £{item.base_price.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {item.is_active ? (
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <DollarSign className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-medium text-blue-800">Pricing Tiers</p>
          <p className="text-sm text-blue-600 mt-1">
            Define multiple pricing tiers (Standard, Urgent, After Hours) to charge different rates based on service conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceListPage;