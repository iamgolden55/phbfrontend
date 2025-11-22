import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  availability: string;
  contactInfo: string;
  tags: string[];
  url: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'General Health Check-ups',
    description: 'Comprehensive health assessments and routine medical examinations for adults and children.',
    category: 'Primary Care',
    location: 'All PHB Centers',
    availability: 'Mon-Fri 8AM-6PM, Sat 9AM-2PM',
    contactInfo: '0800-PHB-HEALTH',
    tags: ['health check', 'medical exam', 'preventive care'],
    url: '/account/appointments/book'
  },
  {
    id: '2',
    title: 'Mental Health Counseling',
    description: 'Professional counseling and therapy services for depression, anxiety, and other mental health concerns.',
    category: 'Mental Health',
    location: 'Lagos, Abuja, Port Harcourt',
    availability: 'Mon-Fri 9AM-7PM',
    contactInfo: '0800-MENTAL-HEALTH',
    tags: ['counseling', 'therapy', 'depression', 'anxiety'],
    url: '/mental-health'
  },
  {
    id: '3',
    title: 'Pharmacy Services',
    description: 'Prescription medications, over-the-counter drugs, and pharmaceutical consultations.',
    category: 'Pharmacy',
    location: 'Multiple locations nationwide',
    availability: 'Mon-Sun 24/7 (Emergency locations)',
    contactInfo: '0800-PHARMACY',
    tags: ['medications', 'prescriptions', 'pharmacy'],
    url: '/find-pharmacy'
  },
  {
    id: '4',
    title: 'Dementia Support Services',
    description: 'Specialized care and support for individuals with dementia and their families.',
    category: 'Elderly Care',
    location: 'Specialized centers',
    availability: 'Mon-Fri 8AM-5PM',
    contactInfo: '0800-DEMENTIA-HELP',
    tags: ['dementia', 'elderly care', 'family support'],
    url: '/care-and-support/dementia'
  },
  {
    id: '5',
    title: 'Emergency Medical Services',
    description: '24/7 emergency medical care and ambulance services for urgent health situations.',
    category: 'Emergency Care',
    location: 'All major cities',
    availability: '24/7 Emergency Response',
    contactInfo: '999 or 0800-EMERGENCY',
    tags: ['emergency', 'ambulance', 'urgent care'],
    url: '/emergency-services'
  },
  {
    id: '6',
    title: 'Maternal Health Services',
    description: 'Prenatal care, delivery services, and postnatal support for mothers and babies.',
    category: "Women's Health",
    location: 'Maternity centers',
    availability: 'Mon-Sun 24/7',
    contactInfo: '0800-MATERNITY',
    tags: ['pregnancy', 'prenatal', 'maternity', 'delivery'],
    url: '/pregnancy'
  },
  {
    id: '7',
    title: 'Vaccination Services',
    description: 'Childhood immunizations, adult vaccines, and travel vaccination consultations.',
    category: 'Preventive Care',
    location: 'All PHB Centers',
    availability: 'Mon-Fri 8AM-4PM',
    contactInfo: '0800-VACCINES',
    tags: ['vaccines', 'immunization', 'travel health'],
    url: '/vaccinations'
  },
  {
    id: '8',
    title: 'Nutrition Counseling',
    description: 'Professional dietary guidance and meal planning for health and weight management.',
    category: 'Wellness',
    location: 'Selected centers',
    availability: 'Mon-Fri 9AM-5PM',
    contactInfo: '0800-NUTRITION',
    tags: ['nutrition', 'diet', 'weight management'],
    url: '/live-well/healthy-eating'
  }
];

const categories = [
  'All Services',
  'Primary Care',
  'Mental Health',
  'Emergency Care',
  "Women's Health",
  'Elderly Care',
  'Pharmacy',
  'Preventive Care',
  'Wellness'
];

const FindServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const locations = [
    'All Locations',
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Kano',
    'Ibadan',
    'Nationwide'
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Services' || service.category === selectedCategory;
    
    const matchesLocation = selectedLocation === 'All Locations' || 
                           service.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                           service.location.includes('All') ||
                           service.location.includes('nationwide') ||
                           service.location.includes('Multiple');

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span>Find services</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Find PHB Services</h1>
          <p className="text-xl font-medium">
            Discover healthcare services, support programs, and resources available through PHB
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Search and filters */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Search for services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search services
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by service name or keyword..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0891b2] focus:border-[#0891b2]"
              />
            </div>

            {/* Category filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0891b2] focus:border-[#0891b2]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0891b2] focus:border-[#0891b2]"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredServices.length} of {services.length} services
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#0891b2] flex-grow">{service.title}</h3>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0">
                    {service.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start">
                  <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">Location:</span>
                  <span className="text-gray-700 text-xs">{service.location}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">Hours:</span>
                  <span className="text-gray-700 text-xs">{service.availability}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">Contact:</span>
                  <span className="text-gray-700 text-xs">{service.contactInfo}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {service.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={service.url}
                className="w-full bg-[#0891b2] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center font-medium text-sm inline-block"
              >
                Access Service
              </Link>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Services');
                setSelectedLocation('All Locations');
              }}
              className="bg-[#0891b2] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Quick access */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/account/appointments/book"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium text-sm">Book Appointment</div>
            </Link>
            <Link
              to="/emergency-services"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">🚨</div>
              <div className="font-medium text-sm">Emergency Services</div>
            </Link>
            <Link
              to="/find-pharmacy"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">💊</div>
              <div className="font-medium text-sm">Find Pharmacy</div>
            </Link>
            <Link
              to="/help"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">❓</div>
              <div className="font-medium text-sm">Get Help</div>
            </Link>
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg mt-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="mb-6">
              Our customer service team is here to help you find the right PHB service for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0800-PHB-HELP"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Call: 0800-PHB-HELP
              </a>
              <Link
                to="/help"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindServicesPage;