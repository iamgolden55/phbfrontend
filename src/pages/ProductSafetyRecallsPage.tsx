import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { AlertTriangle, Search, Filter, ExternalLink, Baby, Home, Utensils, Package, ShieldAlert, Clock, Phone } from 'lucide-react';

interface RecallItem {
  id: string;
  title: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
  description: string;
  action: string;
  affectedProducts: string[];
}

const ProductSafetyRecallsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: Package },
    { id: 'baby', name: 'Baby Products', icon: Baby },
    { id: 'food', name: 'Food & Drink', icon: Utensils },
    { id: 'home', name: 'Home & Garden', icon: Home },
    { id: 'toys', name: 'Toys', icon: Package }
  ];

  // Sample recall data - in production this would come from an API
  const recalls: RecallItem[] = [
    {
      id: '1',
      title: 'Baby Sleep Positioner Recall',
      category: 'baby',
      severity: 'high',
      date: '2024-11-01',
      description: 'Certain baby sleep positioners have been recalled due to suffocation risk. The products may allow babies to roll into positions that can restrict breathing.',
      action: 'Stop using immediately. Return to retailer for full refund.',
      affectedProducts: ['Brand X Sleep Positioner Model A', 'Brand X Sleep Positioner Model B']
    },
    {
      id: '2',
      title: 'Children\'s Toy Set - Choking Hazard',
      category: 'toys',
      severity: 'high',
      date: '2024-10-28',
      description: 'Small parts may detach from the toy set, presenting a choking hazard for children under 3 years.',
      action: 'Return to place of purchase for replacement or refund.',
      affectedProducts: ['Fun Time Building Blocks Set - 50 pieces', 'Fun Time Building Blocks Set - 100 pieces']
    },
    {
      id: '3',
      title: 'Infant Formula - Potential Contamination',
      category: 'food',
      severity: 'high',
      date: '2024-10-20',
      description: 'Specific batches recalled due to potential bacterial contamination. Affected batch numbers listed below.',
      action: 'Do not consume. Return for refund. Consult doctor if your baby has consumed the product and shows symptoms.',
      affectedProducts: ['Batch numbers: 2024-A123, 2024-A124, 2024-A125']
    },
    {
      id: '4',
      title: 'Cot Mattress Recall',
      category: 'baby',
      severity: 'medium',
      date: '2024-10-15',
      description: 'Mattresses may not meet firmness standards, potentially increasing SIDS risk.',
      action: 'Contact manufacturer for free replacement mattress.',
      affectedProducts: ['SafeSleep Cot Mattress 60x120cm', 'SafeSleep Cot Mattress 70x140cm']
    },
    {
      id: '5',
      title: 'Baby Bottle Steriliser - Electrical Fault',
      category: 'baby',
      severity: 'medium',
      date: '2024-10-10',
      description: 'Potential electrical fault may cause overheating. No injuries reported to date.',
      action: 'Unplug and stop using. Contact manufacturer for repair or replacement.',
      affectedProducts: ['QuickSteam Bottle Steriliser Model QS-100']
    },
    {
      id: '6',
      title: 'Garden Furniture - Collapse Risk',
      category: 'home',
      severity: 'medium',
      date: '2024-10-05',
      description: 'Certain folding chairs may collapse unexpectedly due to faulty hinge mechanism.',
      action: 'Stop using immediately. Return to retailer for refund.',
      affectedProducts: ['Outdoor Comfort Folding Chair - Blue', 'Outdoor Comfort Folding Chair - Green']
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">High Priority</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">Medium Priority</span>;
      case 'low':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Low Priority</span>;
      default:
        return null;
    }
  };

  const filteredRecalls = recalls.filter(recall => {
    const matchesSearch = recall.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recall.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recall.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Product Safety', url: '/product-safety-recalls' }
            ]}
            textColor="text-white"
          />
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <ShieldAlert className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Product Safety Recalls</h1>
            </div>
            <p className="text-xl text-amber-100 max-w-3xl">
              Stay informed about product recalls that may affect your family's safety.
              Check here regularly for the latest safety notices.
            </p>
          </div>
        </div>
      </div>

      <div className="phb-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Search Recalls
              </h3>
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter by Category
              </h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                        selectedCategory === category.id
                          ? 'bg-amber-100 text-amber-800'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Report Concern */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report a Safety Concern
              </h3>
              <p className="text-red-700 text-sm mb-4">
                If you've discovered a potentially unsafe product, report it to help protect others.
              </p>
              <a
                href="tel:0800-XXX-XXXX"
                className="block w-full text-center py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                <Phone className="h-4 w-4 inline mr-2" />
                0800 XXX XXXX
              </a>
            </div>

            {/* External Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">External Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.gov.uk/product-safety-alerts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Gov.uk Product Alerts
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.which.co.uk/reviews/product-recalls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Which? Product Recalls
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content - Recall List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredRecalls.length} {filteredRecalls.length === 1 ? 'recall' : 'recalls'}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800">Important</h3>
                  <p className="text-amber-700 text-sm">
                    If you have any of the recalled products, follow the recommended action immediately.
                    When in doubt, stop using the product and contact the manufacturer.
                  </p>
                </div>
              </div>
            </div>

            {/* Recall Cards */}
            {filteredRecalls.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No recalls found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecalls.map(recall => (
                  <div key={recall.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg text-gray-900">{recall.title}</h3>
                      {getSeverityBadge(recall.severity)}
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(recall.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>

                    <p className="text-gray-700 mb-4">{recall.description}</p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Affected Products:</h4>
                      <ul className="list-disc list-inside text-gray-700 text-sm">
                        {recall.affectedProducts.map((product, index) => (
                          <li key={index}>{product}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${
                      recall.severity === 'high' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <h4 className={`font-medium mb-1 ${
                        recall.severity === 'high' ? 'text-red-800' : 'text-amber-800'
                      }`}>
                        Action Required:
                      </h4>
                      <p className={recall.severity === 'high' ? 'text-red-700' : 'text-amber-700'}>
                        {recall.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Safety Tips */}
            <section className="bg-white rounded-lg shadow-sm p-8 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">General Product Safety Tips</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Before You Buy</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Look for CE or UKCA safety marks</li>
                    <li>• Check age recommendations</li>
                    <li>• Read reviews and safety warnings</li>
                    <li>• Buy from reputable retailers</li>
                    <li>• Keep receipts for warranty claims</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">After You Buy</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Register your product with the manufacturer</li>
                    <li>• Follow assembly and use instructions</li>
                    <li>• Regularly check for wear and damage</li>
                    <li>• Subscribe to recall alerts</li>
                    <li>• Report any safety concerns</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Information</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/conditions/baby/safety" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Baby className="h-6 w-6 text-pink-500 mb-2" />
              <h3 className="font-medium text-gray-900">Baby Safety</h3>
              <p className="text-sm text-gray-600">Safety tips for your home</p>
            </Link>
            <Link to="/emergency-services" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Phone className="h-6 w-6 text-red-500 mb-2" />
              <h3 className="font-medium text-gray-900">Emergency Services</h3>
              <p className="text-sm text-gray-600">When to seek urgent help</p>
            </Link>
            <Link to="/conditions/baby" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Home className="h-6 w-6 text-blue-500 mb-2" />
              <h3 className="font-medium text-gray-900">Baby Health</h3>
              <p className="text-sm text-gray-600">Complete baby care guide</p>
            </Link>
            <Link to="/using-the-phb/family-health" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <ShieldAlert className="h-6 w-6 text-green-500 mb-2" />
              <h3 className="font-medium text-gray-900">Family Health</h3>
              <p className="text-sm text-gray-600">All family health services</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSafetyRecallsPage;
