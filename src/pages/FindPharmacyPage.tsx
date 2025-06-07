import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Navigation, Phone, Clock, Star, MapPin, ChevronDown, X } from 'lucide-react';

const FindPharmacyPage = () => {
  const desktopMapContainer = useRef(null);
  const mobileMapContainer = useRef(null);
  const desktopMap = useRef(null);
  const mobileMap = useRef(null);
  const [lng, setLng] = useState(-0.1278);
  const [lat, setLat] = useState(51.5074);
  const [zoom, setZoom] = useState(12);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pharmacy categories with icons and colors
  const categories = [
    { id: '24h', name: '24/7 Pharmacies', icon: '🌙', color: '#059669', count: 8 },
    { id: 'hospital', name: 'Hospital Pharmacies', icon: '🏥', color: '#dc2626', count: 12 },
    { id: 'drive', name: 'Drive-Through', icon: '🚗', color: '#7c3aed', count: 15 },
    { id: 'vaccine', name: 'Vaccination Centers', icon: '💉', color: '#ea580c', count: 6 },
    { id: 'specialty', name: 'Specialty Pharmacies', icon: '🧬', color: '#0891b2', count: 4 },
    { id: 'chain', name: 'Chain Pharmacies', icon: '🏪', color: '#065f46', count: 25 },
    { id: 'independent', name: 'Independent', icon: '🏠', color: '#7c2d12', count: 18 },
    { id: 'compounding', name: 'Compounding', icon: '🩺', color: '#581c87', count: 3 }
  ];

  // Sample pharmacy data (in real app, this would come from Google Places API)
  const pharmacies = [
    {
      id: 1,
      name: "Boots Pharmacy",
      category: 'chain',
      address: "123 Oxford Street, London",
      phone: "+44 20 7629 6557",
      rating: 4.5,
      reviews: 342,
      isOpen: true,
      hours: "8:00 AM - 10:00 PM",
      services: ['Prescription', 'Vaccination', 'Health Check'],
      distance: "0.3 miles",
      lat: 51.5155,
      lng: -0.1426,
      is24h: false
    },
    {
      id: 2,
      name: "Superdrug Pharmacy",
      category: 'chain',
      address: "456 King's Road, London",
      phone: "+44 20 7352 5706",
      rating: 4.2,
      reviews: 198,
      isOpen: true,
      hours: "9:00 AM - 9:00 PM",
      services: ['Prescription', 'Beauty', 'Health Advice'],
      distance: "0.5 miles",
      lat: 51.4875,
      lng: -0.1687,
      is24h: false
    },
    {
      id: 3,
      name: "PHB 24/7 Pharmacy",
      category: '24h',
      address: "789 Emergency Lane, London",
      phone: "+44 20 7946 0958",
      rating: 4.8,
      reviews: 567,
      isOpen: true,
      hours: "24 Hours",
      services: ['Emergency Prescription', 'First Aid', 'Consultation'],
      distance: "0.8 miles",
      lat: 51.5033,
      lng: -0.1195,
      is24h: true
    },
    {
      id: 4,
      name: "St. Mary's Hospital Pharmacy",
      category: 'hospital',
      address: "Praed Street, Paddington",
      phone: "+44 20 3312 6666",
      rating: 4.6,
      reviews: 234,
      isOpen: true,
      hours: "7:00 AM - 8:00 PM",
      services: ['Clinical Pharmacy', 'Specialist Medication', 'Patient Counseling'],
      distance: "1.2 miles",
      lat: 51.5162,
      lng: -0.1625,
      is24h: false
    },
    {
      id: 5,
      name: "QuickMeds Drive-Thru",
      category: 'drive',
      address: "321 Motor Way, London",
      phone: "+44 20 7123 4567",
      rating: 4.3,
      reviews: 189,
      isOpen: true,
      hours: "6:00 AM - 11:00 PM",
      services: ['Drive-Through', 'Quick Pickup', 'Mobile App'],
      distance: "0.7 miles",
      lat: 51.4968,
      lng: -0.1532,
      is24h: false
    },
    {
      id: 6,
      name: "Vaccine Express Clinic",
      category: 'vaccine',
      address: "555 Health Street, London",
      phone: "+44 20 8888 1234",
      rating: 4.7,
      reviews: 412,
      isOpen: true,
      hours: "8:00 AM - 6:00 PM",
      services: ['COVID-19 Vaccine', 'Flu Vaccine', 'Travel Vaccines'],
      distance: "1.5 miles",
      lat: 51.5020,
      lng: -0.1400,
      is24h: false
    }
  ];

  const [filteredPharmacies, setFilteredPharmacies] = useState(pharmacies);

  useEffect(() => {
    // Initialize MapBox
    const mapboxgl = window.mapboxgl;
    if (!mapboxgl) {
      // Load MapBox GL JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = () => {
        const link = document.createElement('link');
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        setTimeout(() => {
          initializeDesktopMap();
          initializeMobileMap();
        }, 500);
      };
      document.head.appendChild(script);
    } else {
      setTimeout(() => {
        initializeDesktopMap();
        initializeMobileMap();
      }, 500);
    }
  }, []);

  const initializeDesktopMap = () => {
    if (!desktopMapContainer.current || desktopMap.current) return;
    
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtZ29sZGVuNTU1IiwiYSI6ImNtNWVqejJxdzE1anQybXFvM3E4djNyOGIifQ.LltJt0HC549Bc8n8eOmg6g';
    
    try {
      desktopMap.current = new mapboxgl.Map({
        container: desktopMapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [lng, lat],
        zoom: zoom
      });

      desktopMap.current.on('load', () => {
        setIsLoading(false);
        addPharmacyMarkers(desktopMap.current);
      });

      desktopMap.current.on('move', () => {
        if (desktopMap.current) {
          setLng(desktopMap.current.getCenter().lng.toFixed(4));
          setLat(desktopMap.current.getCenter().lat.toFixed(4));
          setZoom(desktopMap.current.getZoom().toFixed(2));
        }
      });
    } catch (error) {
      console.error('Desktop map initialization failed:', error);
    }
  };

  const initializeMobileMap = () => {
    if (!mobileMapContainer.current || mobileMap.current) return;
    
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtZ29sZGVuNTU1IiwiYSI6ImNtNWVqejJxdzE1anQybXFvM3E4djNyOGIifQ.LltJt0HC549Bc8n8eOmg6g';
    
    try {
      mobileMap.current = new mapboxgl.Map({
        container: mobileMapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });

      mobileMap.current.on('load', () => {
        setIsLoading(false);
        addPharmacyMarkers(mobileMap.current);
        // Force resize for mobile
        setTimeout(() => {
          if (mobileMap.current) {
            mobileMap.current.resize();
          }
        }, 100);
      });

      mobileMap.current.on('move', () => {
        if (mobileMap.current) {
          setLng(mobileMap.current.getCenter().lng.toFixed(4));
          setLat(mobileMap.current.getCenter().lat.toFixed(4));
          setZoom(mobileMap.current.getZoom().toFixed(2));
        }
      });
    } catch (error) {
      console.error('Mobile map initialization failed:', error);
      setIsLoading(false);
    }
  };

  const addPharmacyMarkers = (mapInstance) => {
    if (!mapInstance) return;

    filteredPharmacies.forEach(pharmacy => {
      const category = categories.find(cat => cat.id === pharmacy.category);
      
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'pharmacy-marker';
      el.innerHTML = `
        <div style="
          background: white;
          border: 3px solid ${category?.color || '#003f7e'};
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          ${category?.icon || '💊'}
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedPharmacy(pharmacy);
        mapInstance.flyTo({
          center: [pharmacy.lng, pharmacy.lat],
          zoom: 15
        });
      });

      new window.mapboxgl.Marker(el)
        .setLngLat([pharmacy.lng, pharmacy.lat])
        .addTo(mapInstance);
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = pharmacies.filter(pharmacy =>
      pharmacy.name.toLowerCase().includes(query.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(query.toLowerCase()) ||
      pharmacy.services.some(service => service.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredPharmacies(filtered);
  };

  const toggleCategory = (categoryId) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelected);
    
    if (newSelected.length === 0) {
      setFilteredPharmacies(pharmacies);
    } else {
      const filtered = pharmacies.filter(pharmacy =>
        newSelected.includes(pharmacy.category)
      );
      setFilteredPharmacies(filtered);
    }
  };

  // Re-add markers when filtered pharmacies change
  useEffect(() => {
    if (desktopMap.current && desktopMap.current.loaded()) {
      // Clear existing markers
      const markers = document.querySelectorAll('.pharmacy-marker');
      markers.forEach(marker => marker.remove());
      
      // Add new markers to both maps
      addPharmacyMarkers(desktopMap.current);
    }
    
    if (mobileMap.current && mobileMap.current.loaded()) {
      // Clear existing markers
      const markers = document.querySelectorAll('.pharmacy-marker');
      markers.forEach(marker => marker.remove());
      
      // Add new markers to mobile map
      addPharmacyMarkers(mobileMap.current);
    }
  }, [filteredPharmacies]);

  return (
    <div className="h-screen bg-gray-100 relative overflow-hidden">
      <div className="h-full relative">
        {/* Desktop: Floating Sidebar */}
        <div className="hidden lg:block absolute left-4 top-1 h-[calc(100vh-6rem)] w-80 bg-white rounded-2xl shadow-2xl z-10 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search pharmacies, services..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-gray-100">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full text-left font-semibold text-gray-900"
              >
                <span className="flex items-center">
                  <Filter className="w-5 h-5 mr-3 text-gray-600" />
                  Filter by Category
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform text-gray-400 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="mt-4 space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="mr-3 rounded text-blue-600 w-4 h-4"
                      />
                      <span className="text-lg mr-3">{category.icon}</span>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({category.count})</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Pharmacy List */}
            <div className="flex-1 overflow-y-auto">
              {filteredPharmacies.map(pharmacy => {
                const category = categories.find(cat => cat.id === pharmacy.category);
                return (
                  <div
                    key={pharmacy.id}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                    className={`p-6 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                      selectedPharmacy?.id === pharmacy.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-xl mr-3">{category?.icon}</span>
                          <h3 className="font-semibold text-gray-900 text-base">{pharmacy.name}</h3>
                          {pharmacy.is24h && (
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">24/7</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{pharmacy.address}</p>
                        
                        <div className="flex items-center space-x-4 text-sm mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium text-gray-900">{pharmacy.rating}</span>
                            <span className="text-gray-500 ml-1">({pharmacy.reviews})</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-gray-600">{pharmacy.distance}</span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Clock className={`w-4 h-4 mr-2 ${pharmacy.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                          <span className={`text-sm font-medium ${pharmacy.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            {pharmacy.isOpen ? `Open • ${pharmacy.hours}` : 'Closed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Split View */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Mobile Map (Top Half) */}
          <div className="h-1/2 relative">
            <div ref={mobileMapContainer} className="w-full h-full" />
            
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Pharmacy List (Bottom Half) */}
          <div className="h-1/2 bg-white flex flex-col rounded-t-2xl shadow-lg">
            {/* Mobile Search & Filter Header */}
            <div className="p-4 border-b border-gray-200 bg-white rounded-t-2xl">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search pharmacies..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-2 rounded-lg border flex items-center ${
                    showFilters 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-1" />
                  <span className="text-sm">Filter</span>
                </button>
              </div>

              {/* Mobile Filter Categories */}
              {showFilters && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`flex items-center px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        selectedCategories.includes(category.id)
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Pharmacy List */}
            <div className="flex-1 overflow-y-auto">
              {filteredPharmacies.map(pharmacy => {
                const category = categories.find(cat => cat.id === pharmacy.category);
                return (
                  <div
                    key={pharmacy.id}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedPharmacy?.id === pharmacy.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg flex-shrink-0 mt-0.5">{category?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">{pharmacy.name}</h3>
                          {pharmacy.is24h && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium flex-shrink-0">24/7</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-1">{pharmacy.address}</p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 mr-1" />
                              <span className="font-medium text-gray-900">{pharmacy.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                              <span className="text-gray-600">{pharmacy.distance}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className={`w-3 h-3 mr-1 ${pharmacy.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                            <span className={`text-xs font-medium ${pharmacy.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                              {pharmacy.isOpen ? 'Open' : 'Closed'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Map Container */}
        <div className="hidden lg:block h-full relative p-6">
          <div ref={desktopMapContainer} className="w-full h-full rounded-2xl overflow-hidden shadow-lg" />
          
          
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          {/* Desktop Selected Pharmacy Info Card */}
          {selectedPharmacy && (
            <div className="hidden lg:block absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-md z-50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">
                      {categories.find(cat => cat.id === selectedPharmacy.category)?.icon}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{selectedPharmacy.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-3 leading-relaxed">{selectedPharmacy.address}</p>
                  
                  <div className="flex items-center space-x-4 text-sm mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{selectedPharmacy.rating}</span>
                      <span className="text-gray-500 ml-1">({selectedPharmacy.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-600">{selectedPharmacy.distance}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPharmacy.services.map(service => (
                      <span key={service} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedPharmacy(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.lat},${selectedPharmacy.lng}`, '_blank')}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Directions
                </button>
                <button 
                  onClick={() => window.open(`tel:${selectedPharmacy.phone}`, '_self')}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Selected Pharmacy Bottom Sheet */}
        {selectedPharmacy && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 z-50 max-h-60 overflow-y-auto">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2">
                    {categories.find(cat => cat.id === selectedPharmacy.category)?.icon}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{selectedPharmacy.name}</h3>
                </div>
                <p className="text-gray-600 mb-2 text-sm">{selectedPharmacy.address}</p>
                
                <div className="flex items-center space-x-4 text-sm mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{selectedPharmacy.rating}</span>
                    <span className="text-gray-500 ml-1">({selectedPharmacy.reviews})</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-gray-600">{selectedPharmacy.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className={`w-4 h-4 mr-1 ${selectedPharmacy.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm font-medium ${selectedPharmacy.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPharmacy.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedPharmacy(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.lat},${selectedPharmacy.lng}`, '_blank')}
                className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center font-medium text-sm"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Directions
              </button>
              <button 
                onClick={() => window.open(`tel:${selectedPharmacy.phone}`, '_self')}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center font-medium text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPharmacyPage;
