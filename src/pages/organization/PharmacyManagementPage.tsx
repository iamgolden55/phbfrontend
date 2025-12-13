import React from 'react';
import { Helmet } from 'react-helmet';
import {
    Package,
    AlertTriangle,
    ShoppingCart,
    Search,
    Filter,
    Plus,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { StatCard } from '../../components/organization/DashboardWidgets';

const PharmacyManagementPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Helmet>
                <title>Pharmacy Management | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Pharmacy & Inventory</h1>
                    <p className="text-gray-500 text-sm">Manage medication stock, dispensing, and suppliers.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <ShoppingCart size={18} />
                        <span>Orders</span>
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus size={18} />
                        <span>Add Item</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Items"
                    value="1,245"
                    trend="+12"
                    trendDirection="up"
                    icon={Package}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    title="Low Stock Items"
                    value="23"
                    trend="Urgent"
                    trendDirection="down"
                    icon={AlertTriangle}
                    iconColor="text-orange-500"
                    bgColor="bg-orange-50"
                />
                <StatCard
                    title="Expiring Soon"
                    value="15"
                    trend="Check"
                    trendDirection="down"
                    icon={AlertTriangle}
                    iconColor="text-red-500"
                    bgColor="bg-red-50"
                />
                <StatCard
                    title="Dispensed Today"
                    value="145"
                    trend="+8%"
                    trendDirection="up"
                    icon={ShoppingCart}
                    iconColor="text-green-600"
                    bgColor="bg-green-50"
                />
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">Inventory List</h3>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search medications..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                            <Filter size={18} />
                            <span className="hidden md:inline">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Item Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Stock Level</th>
                                <th className="px-6 py-4">Unit Price</th>
                                <th className="px-6 py-4">Expiry Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { name: 'Paracetamol 500mg', category: 'Analgesic', stock: 5000, price: '$0.50', expiry: '2025-12-31', status: 'In Stock' },
                                { name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 120, price: '$2.00', expiry: '2024-06-15', status: 'Low Stock' },
                                { name: 'Ibuprofen 400mg', category: 'Analgesic', stock: 850, price: '$0.75', expiry: '2025-08-20', status: 'In Stock' },
                                { name: 'Metformin 500mg', category: 'Antidiabetic', stock: 45, price: '$1.50', expiry: '2024-11-10', status: 'Critical' },
                                { name: 'Omeprazole 20mg', category: 'Antacid', stock: 1200, price: '$1.20', expiry: '2026-01-05', status: 'In Stock' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Low Stock' ? 'bg-orange-500' : 'bg-green-500'}`}
                                                    style={{ width: item.status === 'Critical' ? '10%' : item.status === 'Low Stock' ? '30%' : '80%' }}
                                                ></div>
                                            </div>
                                            <span>{item.stock}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.expiry}</td>
                                    <td className="px-6 py-4">
                                        <span className={`
                      px-2.5 py-1 rounded-full text-xs font-medium
                      ${item.status === 'Critical' ? 'bg-red-100 text-red-700' :
                                                item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-green-100 text-green-700'}
                    `}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Restock</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PharmacyManagementPage;
