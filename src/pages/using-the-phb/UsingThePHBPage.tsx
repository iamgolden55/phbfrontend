import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define types for our services
interface PHBService {
  id: string;
  title: string;
  description: string;
  category: 'healthcare' | 'digital' | 'international' | 'information';
  summary: string;
  imageUrl?: string;
  link: string;
  tags: string[];
  featured?: boolean;
}

const UsingThePHBPage: React.FC = () => {
  // Sample service data
  const services: PHBService[] = [
    {
      id: 'service-001',
      title: 'Emergency Services',
      description: 'Access emergency contact numbers and life-saving information',
      category: 'healthcare',
      summary: 'Get immediate access to emergency medical services, police, fire department, and crisis support numbers. Available 24/7 with comprehensive guidance for emergency situations.',
      imageUrl: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&h=250&fit=crop',
      link: '/emergency-services',
      tags: ['Emergency', '24/7', 'Medical Emergency', 'Crisis Support'],
      featured: true
    },
    {
      id: 'service-002',
      title: 'Find a Pharmacy',
      description: 'Locate pharmacies and medication services nearby',
      category: 'healthcare',
      summary: 'Use our interactive map to find pharmacies near you, check opening hours, and locate specific medications. Integrated with Google Maps for accurate directions.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      link: '/find-pharmacy',
      tags: ['Pharmacy', 'Medications', 'Map Search', 'Healthcare'],
      featured: true
    },
    {
      id: 'service-003',
      title: 'Apply for GHIC',
      description: 'Global Health Insurance Card for African travelers',
      category: 'international',
      summary: 'Apply for comprehensive health insurance coverage across 35+ African countries. Three coverage levels available with family discounts and emergency evacuation.',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
      link: '/using-the-phb/healthcare-abroad/apply-for-ghic',
      tags: ['Travel Insurance', 'Africa', 'Health Coverage', 'GHIC'],
      featured: true
    },
    {
      id: 'service-004',
      title: 'Health Assessments',
      description: 'Take interactive health assessments and screenings',
      category: 'digital',
      summary: 'Complete comprehensive health assessments including BMI calculations, mental health screenings, and general health check questionnaires with instant results.',
      link: '/tools/health-assessments',
      tags: ['Health Assessment', 'Screening', 'BMI', 'Mental Health']
    },
    {
      id: 'service-005',
      title: 'Book Appointments',
      description: 'Schedule consultations with healthcare providers',
      category: 'healthcare',
      summary: 'Book appointments with doctors, specialists, and healthcare providers in your area. View available slots and manage your appointment history.',
      link: '/account/appointments/book',
      tags: ['Appointments', 'Doctors', 'Booking', 'Healthcare']
    },
    {
      id: 'service-006',
      title: 'Healthcare Abroad Guide',
      description: 'Essential information for healthcare while traveling',
      category: 'international',
      summary: 'Comprehensive guide for accessing healthcare while traveling internationally, including vaccination requirements, insurance options, and emergency procedures.',
      link: '/using-the-phb/healthcare-abroad',
      tags: ['Travel Health', 'International', 'Vaccinations', 'Insurance']
    },
    {
      id: 'service-007',
      title: 'Medical Records',
      description: 'Access and manage your digital health records',
      category: 'digital',
      summary: 'Securely access your complete medical history, test results, prescriptions, and health documents from anywhere. Share with healthcare providers as needed.',
      link: '/account/medical-records',
      tags: ['Medical Records', 'Digital Health', 'Test Results', 'Health History']
    },
    {
      id: 'service-008',
      title: 'Health A-Z',
      description: 'Comprehensive guide to health conditions and treatments',
      category: 'information',
      summary: 'Browse our extensive database of health conditions, symptoms, treatments, and preventive care information. Expert-reviewed and regularly updated.',
      link: '/health-a-z',
      tags: ['Health Information', 'Conditions', 'Symptoms', 'Treatment']
    },
    {
      id: 'service-009',
      title: 'Prescription Management',
      description: 'Order prescriptions and manage medications',
      category: 'digital',
      summary: 'Manage your prescriptions online, set medication reminders, order refills, and track your medication history. Connect with your nominated pharmacy.',
      link: '/account/prescriptions',
      tags: ['Prescriptions', 'Medications', 'Pharmacy', 'Refills']
    },
    {
      id: 'service-010',
      title: 'Vaccinations Guide',
      description: 'Stay up to date with recommended vaccinations',
      category: 'information',
      summary: 'Complete vaccination information including COVID-19, flu shots, travel vaccines, and childhood immunizations. Find vaccination centers near you.',
      link: '/vaccinations',
      tags: ['Vaccinations', 'Immunization', 'COVID-19', 'Travel Vaccines']
    },
    {
      id: 'service-011',
      title: 'Mental Health Resources',
      description: 'Support and information for mental wellbeing',
      category: 'information',
      summary: 'Access mental health resources, crisis support, therapy options, and wellness tools. Connect with mental health professionals and support groups.',
      link: '/mental-health',
      tags: ['Mental Health', 'Therapy', 'Crisis Support', 'Wellness']
    },
    {
      id: 'service-012',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and health metrics',
      category: 'digital',
      summary: 'Calculate your BMI, understand your health metrics, and get personalized recommendations for maintaining a healthy weight and lifestyle.',
      link: '/tools/bmi-calculator',
      tags: ['BMI', 'Health Calculator', 'Weight Management', 'Health Metrics']
    }
  ];

  // State for filtering
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter services based on category and search term
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Handler for category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Handler for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="phb-container">
          <h1 className="text-4xl font-bold mb-4">Using the PHB</h1>
          <p className="text-xl max-w-3xl">
            Access comprehensive healthcare services, digital tools, and resources designed to keep you healthy wherever you are in Africa.
          </p>
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div className="bg-gray-100 py-3">
        <div className="phb-container">
          <nav className="text-sm">
            <ol className="flex flex-wrap items-center">
              <li className="flex items-center">
                <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <span className="text-gray-600">Using the PHB</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Filter Services</h2>

              {/* Search input */}
              <div className="mb-6">
                <label htmlFor="search-services" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search-services"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Search by service or topic"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Category filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('all')}
                    >
                      All Services
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'healthcare' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('healthcare')}
                    >
                      Healthcare Services
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'digital' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('digital')}
                    >
                      Digital Health Tools
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'international' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('international')}
                    >
                      Healthcare Abroad
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'information' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('information')}
                    >
                      Health Information
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to action for support */}
            <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                Our support team is available 24/7 to help you navigate PHB services and answer any questions.
              </p>
              <Link
                to="/help"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
              >
                Get Support
              </Link>
            </div>
          </div>

          {/* Services listing */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeCategory === 'all'
                  ? 'All Services'
                  : activeCategory === 'healthcare'
                    ? 'Healthcare Services'
                    : activeCategory === 'digital'
                      ? 'Digital Health Tools'
                      : activeCategory === 'international'
                        ? 'Healthcare Abroad'
                        : 'Health Information'}
              </h2>
              <p className="text-gray-600">{filteredServices.length} services</p>
            </div>

            {filteredServices.length > 0 ? (
              <div className="space-y-8">
                {filteredServices.map(service => (
                  <div key={service.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <div className="flex flex-col md:flex-row gap-4">
                      {service.imageUrl && (
                        <div className="md:w-1/4">
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className={service.imageUrl ? "md:w-3/4" : "w-full"}>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{service.title}</h3>
                          {service.featured && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{service.description}</p>
                        <p className="text-gray-700 mb-4">{service.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.tags.map(tag => (
                            <span
                              key={tag}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={service.link}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Access Service
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No services found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <div className="bg-blue-50 py-12 mt-8">
        <div className="phb-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get Started with PHB</h2>
            <p className="text-lg text-gray-700 mb-6">
              Join the PHB network to access comprehensive healthcare services across Africa. Register today and take control of your health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Register with PHB
              </Link>
              <Link
                to="/emergency-services"
                className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Emergency Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsingThePHBPage;