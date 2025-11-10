import React, { useState } from 'react';
import { LocationFinderLayout } from '../components/map/LocationFinderLayout';
import { Pharmacy, PharmacyDetails, LocationCategory } from '../types/location';

const FindPharmacyPage = () => {
  // Pharmacy categories with icons and colors
  const categories: LocationCategory[] = [
    { id: '24h', name: '24/7 Pharmacies', icon: '🌙', color: '#059669', count: 8 },
    { id: 'hospital', name: 'Hospital Pharmacies', icon: '🏥', color: '#dc2626', count: 12 },
    { id: 'drive', name: 'Drive-Through', icon: '🚗', color: '#7c3aed', count: 15 },
    { id: 'vaccine', name: 'Vaccination Centers', icon: '💉', color: '#ea580c', count: 6 },
    { id: 'specialty', name: 'Specialty Pharmacies', icon: '🧬', color: '#0891b2', count: 4 },
    { id: 'chain', name: 'Chain Pharmacies', icon: '🏪', color: '#065f46', count: 25 },
    { id: 'independent', name: 'Independent', icon: '🏠', color: '#7c2d12', count: 18 },
    { id: 'compounding', name: 'Compounding', icon: '🩺', color: '#581c87', count: 3 }
  ];

  // Sample pharmacy data (converted to new type structure)
  const pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: "Boots Pharmacy",
      category: 'chain',
      address: "123 Oxford Street, London",
      phone: "+44 20 7629 6557",
      rating: 4.5,
      reviewCount: 342,
      isOpen: true,
      hours: "8:00 AM - 10:00 PM",
      distance: "0.3 miles",
      latitude: 51.5155,
      longitude: -0.1426,
      details: {
        services: ['Prescription', 'Vaccination', 'Health Check'],
        is24h: false
      }
    },
    {
      id: '2',
      name: "Superdrug Pharmacy",
      category: 'chain',
      address: "456 King's Road, London",
      phone: "+44 20 7352 5706",
      rating: 4.2,
      reviewCount: 198,
      isOpen: true,
      hours: "9:00 AM - 9:00 PM",
      distance: "0.5 miles",
      latitude: 51.4875,
      longitude: -0.1687,
      details: {
        services: ['Prescription', 'Beauty', 'Health Advice'],
        is24h: false
      }
    },
    {
      id: '3',
      name: "PHB 24/7 Pharmacy",
      category: '24h',
      address: "789 Emergency Lane, London",
      phone: "+44 20 7946 0958",
      rating: 4.8,
      reviewCount: 567,
      isOpen: true,
      hours: "24 Hours",
      distance: "0.8 miles",
      latitude: 51.5033,
      longitude: -0.1195,
      details: {
        services: ['Emergency Prescription', 'First Aid', 'Consultation'],
        is24h: true
      }
    },
    {
      id: '4',
      name: "St. Mary's Hospital Pharmacy",
      category: 'hospital',
      address: "Praed Street, Paddington",
      phone: "+44 20 3312 6666",
      rating: 4.6,
      reviewCount: 234,
      isOpen: true,
      hours: "7:00 AM - 8:00 PM",
      distance: "1.2 miles",
      latitude: 51.5162,
      longitude: -0.1625,
      details: {
        services: ['Clinical Pharmacy', 'Specialist Medication', 'Patient Counseling'],
        is24h: false
      }
    },
    {
      id: '5',
      name: "QuickMeds Drive-Thru",
      category: 'drive',
      address: "321 Motor Way, London",
      phone: "+44 20 7123 4567",
      rating: 4.3,
      reviewCount: 189,
      isOpen: true,
      hours: "6:00 AM - 11:00 PM",
      distance: "0.7 miles",
      latitude: 51.4968,
      longitude: -0.1532,
      details: {
        services: ['Drive-Through', 'Quick Pickup', 'Mobile App'],
        is24h: false
      }
    },
    {
      id: '6',
      name: "Vaccine Express Clinic",
      category: 'vaccine',
      address: "555 Health Street, London",
      phone: "+44 20 8888 1234",
      rating: 4.7,
      reviewCount: 412,
      isOpen: true,
      hours: "8:00 AM - 6:00 PM",
      distance: "1.5 miles",
      latitude: 51.5020,
      longitude: -0.1400,
      details: {
        services: ['COVID-19 Vaccine', 'Flu Vaccine', 'Travel Vaccines'],
        is24h: false
      }
    }
  ];

  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>(pharmacies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedCategories);
  };

  const handleFilter = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    applyFilters(searchQuery, categoryIds);
  };

  const applyFilters = (query: string, categoryIds: string[]) => {
    let filtered = pharmacies;

    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(pharmacy =>
        pharmacy.name.toLowerCase().includes(query.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(query.toLowerCase()) ||
        pharmacy.details.services.some(service =>
          service.toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (categoryIds.length > 0) {
      filtered = filtered.filter(pharmacy =>
        categoryIds.includes(pharmacy.category)
      );
    }

    setFilteredPharmacies(filtered);
  };

  const renderPharmacyDetails = (pharmacy: Pharmacy) => (
    <div className="mt-2">
      {pharmacy.details.is24h && (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
          24/7
        </span>
      )}
    </div>
  );

  const renderSelectedCard = (pharmacy: Pharmacy, onClose: () => void) => {
    const category = categories.find(cat => cat.id === pharmacy.category);
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{category?.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
            </div>
            <p className="text-gray-600 mb-3 leading-relaxed">{pharmacy.address}</p>

            <div className="flex items-center space-x-4 text-sm mb-4">
              {pharmacy.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span className="font-medium">{pharmacy.rating}</span>
                  {pharmacy.reviewCount && (
                    <span className="text-gray-500 ml-1">({pharmacy.reviewCount} reviews)</span>
                  )}
                </div>
              )}
              {pharmacy.distance && (
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">📍</span>
                  <span className="text-gray-600">{pharmacy.distance}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {pharmacy.details.services.map(service => (
                <span key={service} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`,
              '_blank'
            )}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
          >
            <span className="mr-2">🧭</span>
            Directions
          </button>
          {pharmacy.phone && (
            <button
              onClick={() => window.open(`tel:${pharmacy.phone}`, '_self')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center font-medium"
            >
              <span className="mr-2">📞</span>
              Call
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <LocationFinderLayout
      locations={filteredPharmacies}
      categories={categories}
      onSearch={handleSearch}
      onFilter={handleFilter}
      searchPlaceholder="Search pharmacies, services..."
      renderLocationDetails={renderPharmacyDetails}
      renderSelectedCard={renderSelectedCard}
      title="Find Pharmacy"
    />
  );
};

export default FindPharmacyPage;
