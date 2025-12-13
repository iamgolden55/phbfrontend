import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Eye,
  Edit,
  Copy,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  format: string;
  category: string;
  status: 'ready' | 'draft';
  usage_count: number;
  last_modified: string;
}

const TemplateLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState<'location' | 'role'>('location');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const templates: Template[] = [
    {
      id: '1',
      name: 'General Consultation Note',
      format: 'SOAP',
      category: 'Consultation',
      status: 'ready',
      usage_count: 245,
      last_modified: '2024-12-05',
    },
    {
      id: '2',
      name: 'Patient Intake Form',
      format: 'Custom',
      category: 'Forms',
      status: 'ready',
      usage_count: 189,
      last_modified: '2024-12-01',
    },
    {
      id: '3',
      name: 'Discharge Summary',
      format: 'DAP',
      category: 'Discharge',
      status: 'ready',
      usage_count: 156,
      last_modified: '2024-11-28',
    },
    {
      id: '4',
      name: 'Mental Health Assessment',
      format: 'BIRP',
      category: 'Consultation',
      status: 'draft',
      usage_count: 0,
      last_modified: '2024-12-08',
    },
    {
      id: '5',
      name: 'Physical Therapy Note',
      format: 'SOAP',
      category: 'Therapy',
      status: 'ready',
      usage_count: 98,
      last_modified: '2024-11-25',
    },
  ];

  const stats = {
    ready: templates.filter(t => t.status === 'ready').length,
    draft: templates.filter(t => t.status === 'draft').length,
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Template Library | PHB</title>
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
              <h1 className="text-2xl font-bold text-gray-800">Template Library</h1>
              <p className="text-gray-500 text-sm">
                {stats.ready} ready to use, {stats.draft} drafts
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Plus size={16} />
            Create Template
          </button>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterMode('location')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterMode === 'location'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              By Location
            </button>
            <button
              onClick={() => setFilterMode('role')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterMode === 'role'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              By Role
            </button>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              {template.status === 'ready' ? (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">
                  <CheckCircle size={12} />
                  Ready
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs font-medium">
                  <Clock size={12} />
                  Draft
                </span>
              )}
            </div>

            {/* Info */}
            <h3 className="text-lg font-bold text-gray-800 mb-1">{template.name}</h3>
            <p className="text-sm text-gray-500 mb-3">
              {template.format} • {template.category}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
              <span>Used {template.usage_count} times</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Eye size={14} />
                Preview
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Edit size={16} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Copy size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibraryPage;