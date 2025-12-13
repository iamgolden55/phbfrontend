import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  location: string;
  lastRestocked: string;
  expiryDate?: string;
  supplierInfo?: string;
  notes?: string;
}

const InventoryCheckPage: React.FC = () => {
  // Mock data for inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: 'MED001',
      name: 'Acetaminophen 500mg',
      category: 'Medication',
      currentStock: 250,
      minimumStock: 100,
      unit: 'Tablets',
      location: 'Pharmacy Store A',
      lastRestocked: '2023-07-01',
      expiryDate: '2025-05-15',
      supplierInfo: 'MedSupply Inc.'
    },
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      category: 'Medication',
      currentStock: 120,
      minimumStock: 150,
      unit: 'Capsules',
      location: 'Pharmacy Store A',
      lastRestocked: '2023-06-15',
      expiryDate: '2024-11-30',
      supplierInfo: 'PharmaWorld Ltd.',
      notes: 'Order placed for restock'
    },
    {
      id: 'MED003',
      name: 'Ibuprofen 200mg',
      category: 'Medication',
      currentStock: 380,
      minimumStock: 200,
      unit: 'Tablets',
      location: 'Pharmacy Store B',
      lastRestocked: '2023-07-10',
      expiryDate: '2025-08-22',
      supplierInfo: 'MedSupply Inc.'
    },
    {
      id: 'SUP001',
      name: 'Surgical Gloves (Medium)',
      category: 'Supplies',
      currentStock: 500,
      minimumStock: 300,
      unit: 'Pairs',
      location: 'Surgery Storage',
      lastRestocked: '2023-07-05',
      supplierInfo: 'MedEquip Co.'
    },
    {
      id: 'SUP002',
      name: 'Disposable Masks',
      category: 'Supplies',
      currentStock: 1200,
      minimumStock: 1000,
      unit: 'Pieces',
      location: 'General Storage',
      lastRestocked: '2023-07-12',
      supplierInfo: 'SafetyFirst Medical'
    },
    {
      id: 'SUP003',
      name: 'IV Fluid Bags',
      category: 'Supplies',
      currentStock: 80,
      minimumStock: 100,
      unit: 'Bags',
      location: 'Emergency Storage',
      lastRestocked: '2023-06-28',
      expiryDate: '2024-06-28',
      supplierInfo: 'MedEquip Co.',
      notes: 'Order more immediately'
    },
    {
      id: 'EQP001',
      name: 'Blood Pressure Monitor',
      category: 'Equipment',
      currentStock: 15,
      minimumStock: 10,
      unit: 'Units',
      location: 'Equipment Room 1',
      lastRestocked: '2023-05-20',
      supplierInfo: 'MedTech Devices'
    },
    {
      id: 'EQP002',
      name: 'Pulse Oximeter',
      category: 'Equipment',
      currentStock: 8,
      minimumStock: 5,
      unit: 'Units',
      location: 'Equipment Room 2',
      lastRestocked: '2023-06-10',
      supplierInfo: 'MedTech Devices'
    },
    {
      id: 'EQP003',
      name: 'Infusion Pump',
      category: 'Equipment',
      currentStock: 12,
      minimumStock: 15,
      unit: 'Units',
      location: 'Equipment Room 1',
      lastRestocked: '2023-06-05',
      supplierInfo: 'HealthEquip Inc.',
      notes: '3 units out for maintenance'
    }
  ]);
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Stock status calculation
  const getStockStatus = (current: number, minimum: number): 'Low' | 'Critical' | 'Adequate' => {
    if (current <= minimum * 0.5) return 'Critical';
    if (current < minimum) return 'Low';
    return 'Adequate';
  };
  
  // Status badge component
  const StatusBadge: React.FC<{ status: 'Low' | 'Critical' | 'Adequate' }> = ({ status }) => {
    const badgeClasses = {
      Critical: 'bg-red-100 text-red-800',
      Low: 'bg-yellow-100 text-yellow-800',
      Adequate: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[status]}`}>
        {status}
      </span>
    );
  };

  // Filter inventory items
  const filteredItems = inventoryItems.filter(item => {
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    const matchesLocation = locationFilter ? item.location === locationFilter : true;
    
    const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
    const matchesStatus = statusFilter ? stockStatus === statusFilter : true;
    
    const matchesSearch = searchQuery 
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesLocation && matchesStatus && matchesSearch;
  });
  
  // Get unique values for filters
  const categories = Array.from(new Set(inventoryItems.map(item => item.category)));
  const locations = Array.from(new Set(inventoryItems.map(item => item.location)));
  
  // Calculate inventory stats
  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => 
    getStockStatus(item.currentStock, item.minimumStock) === 'Low'
  ).length;
  const criticalStockItems = inventoryItems.filter(item => 
    getStockStatus(item.currentStock, item.minimumStock) === 'Critical'
  ).length;
  const adequateStockItems = totalItems - lowStockItems - criticalStockItems;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/organization/dashboard" 
            className="mr-4 bg-blue-50 hover:bg-blue-100 p-2 rounded-full"
          >
            <span className="material-icons text-blue-700">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-800">Inventory Check</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/organization/admissions" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Patient Admissions">
            <span className="material-icons text-blue-700">person_add</span>
          </Link>
          <Link to="/organization/surgery-schedule" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Surgery Schedule">
            <span className="material-icons text-blue-700">event</span>
          </Link>
          <Link to="/organization/departments" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Department Management">
            <span className="material-icons text-blue-700">bed</span>
          </Link>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end mb-6 space-x-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <span className="material-icons text-sm mr-1">add</span>
          Add Inventory Item
        </button>
        <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md flex items-center">
          <span className="material-icons text-sm mr-1">assignment</span>
          Generate Report
        </button>
      </div>
      
      {/* Inventory Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <span className="material-icons mr-2">summarize</span>
          Inventory Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            <p className="text-sm text-gray-600">Total Items</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-green-600">{adequateStockItems}</p>
            <p className="text-sm text-gray-600">Adequate Stock</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            <p className="text-sm text-gray-600">Low Stock</p>
          </div>
          <div className="bg-red-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-red-600">{criticalStockItems}</p>
            <p className="text-sm text-gray-600">Critical Stock</p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-2.5 text-gray-400">search</span>
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-md pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Adequate">Adequate</option>
              <option value="Low">Low</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center"
            onClick={() => {
              setCategoryFilter('');
              setLocationFilter('');
              setStatusFilter('');
              setSearchQuery('');
            }}
          >
            <span className="material-icons text-sm mr-1">clear</span>
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Critical Items Alert */}
      {criticalStockItems > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg shadow-sm mb-6 flex items-start">
          <span className="material-icons mr-2 text-red-600">warning</span>
          <div>
            <h4 className="font-medium mb-1">Critical Inventory Alert</h4>
            <p className="text-sm">
              {criticalStockItems} item{criticalStockItems > 1 ? 's' : ''} {criticalStockItems > 1 ? 'are' : 'is'} critically low and {criticalStockItems > 1 ? 'require' : 'requires'} immediate attention.
            </p>
          </div>
        </div>
      )}
      
      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{item.name}</div>
                      {item.notes && (
                        <div className="text-xs text-gray-500 mt-1 italic">{item.notes}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm flex items-center">
                        <span className="material-icons text-xs mr-1 text-gray-400">inventory</span>
                        {item.currentStock} / {item.minimumStock} {item.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={stockStatus} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center">
                      <span className="material-icons text-xs mr-1 text-gray-400">history_toggle_off</span>
                      {formatDate(item.lastRestocked)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center">
                      <span className="material-icons text-xs mr-1 text-gray-400">event_busy</span>
                      {formatDate(item.expiryDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <button className="text-blue-600 hover:text-blue-800 mr-3 flex items-center">
                        <span className="material-icons text-sm mr-1">visibility</span>
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <span className="material-icons text-sm mr-1">restart_alt</span>
                        Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <span className="material-icons text-4xl mb-2 text-gray-400">inventory_2</span>
            <p>No inventory items match your filters.</p>
            <button 
              className="text-blue-600 hover:text-blue-800 mt-2 flex items-center justify-center mx-auto"
              onClick={() => {
                setCategoryFilter('');
                setLocationFilter('');
                setStatusFilter('');
                setSearchQuery('');
              }}
            >
              <span className="material-icons text-sm mr-1">clear_all</span>
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Additional Actions */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <span className="material-icons mr-2">build_circle</span>
          Inventory Management Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md text-blue-700 text-sm text-left transition flex items-center">
            <span className="material-icons mr-2 text-lg">shopping_cart</span>
            <span>Order Supplies</span>
          </button>
          <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md text-blue-700 text-sm text-left transition flex items-center">
            <span className="material-icons mr-2 text-lg">local_shipping</span>
            <span>Manage Suppliers</span>
          </button>
          <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md text-blue-700 text-sm text-left transition flex items-center">
            <span className="material-icons mr-2 text-lg">history</span>
            <span>Inventory History</span>
          </button>
          <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md text-blue-700 text-sm text-left transition flex items-center">
            <span className="material-icons mr-2 text-lg">qr_code_scanner</span>
            <span>Scan Inventory</span>
          </button>
          <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md text-blue-700 text-sm text-left transition flex items-center">
            <span className="material-icons mr-2 text-lg">notifications</span>
            <span>Alert Settings</span>
          </button>
          <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md text-blue-700 text-sm text-left transition flex items-center">
            <span className="material-icons mr-2 text-lg">assessment</span>
            <span>Usage Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCheckPage; 