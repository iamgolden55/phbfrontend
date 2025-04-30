import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

interface Resource {
  id: number;
  title: string;
  category: string;
  type: 'pdf' | 'video' | 'webinar' | 'tool' | 'article';
  description: string;
  url: string;
  date: string;
  featured?: boolean;
}

const DoctorResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for resources
  const resources: Resource[] = [
    {
      id: 1,
      title: 'Best Practices for Digital Patient Communication',
      category: 'Communication',
      type: 'pdf',
      description: 'A comprehensive guide on effective digital communication with patients, including email, messaging, and telehealth best practices.',
      url: '/resources/digital-communication-guide.pdf',
      date: 'June 10, 2023',
      featured: true
    },
    {
      id: 2,
      title: 'Interpreting Laboratory Results: A Clinical Approach',
      category: 'Clinical Skills',
      type: 'pdf',
      description: 'Guide to understanding and interpreting common laboratory test results with clinical context and decision-making guidance.',
      url: '/resources/lab-results-interpretation.pdf',
      date: 'May 15, 2023'
    },
    {
      id: 3,
      title: 'Managing Difficult Patient Encounters',
      category: 'Communication',
      type: 'video',
      description: 'Video series on strategies for managing challenging patient interactions, including de-escalation techniques and communication approaches.',
      url: '/resources/difficult-encounters.mp4',
      date: 'April 22, 2023'
    },
    {
      id: 4,
      title: 'Advanced Clinical Assessment Skills',
      category: 'Clinical Skills',
      type: 'webinar',
      description: 'Recorded webinar covering advanced physical examination techniques and clinical assessment skills.',
      url: '/resources/advanced-assessment-webinar.mp4',
      date: 'March 30, 2023',
      featured: true
    },
    {
      id: 5,
      title: 'Drug Interaction Checker Tool',
      category: 'Tools',
      type: 'tool',
      description: 'Interactive tool for checking potential interactions between medications in complex patient regimens.',
      url: '/resources/drug-interaction-tool',
      date: 'March 15, 2023'
    },
    {
      id: 6,
      title: 'Medical Documentation and Coding Guide',
      category: 'Administration',
      type: 'pdf',
      description: 'Comprehensive guide to effective documentation and coding practices for primary care physicians.',
      url: '/resources/documentation-coding-guide.pdf',
      date: 'February 28, 2023'
    },
    {
      id: 7,
      title: 'Building Trust with Patients: Evidence-based Approaches',
      category: 'Communication',
      type: 'article',
      description: 'Article on research-backed methods for establishing and maintaining trust in the doctor-patient relationship.',
      url: '/resources/building-patient-trust.html',
      date: 'February 10, 2023'
    },
    {
      id: 8,
      title: 'Clinical Procedure Videos: Common Office Procedures',
      category: 'Clinical Skills',
      type: 'video',
      description: 'Video demonstrations of common procedures performed in primary care settings with step-by-step instructions.',
      url: '/resources/office-procedures-videos.html',
      date: 'January 25, 2023'
    },
    {
      id: 9,
      title: 'Motivational Interviewing for Behavior Change',
      category: 'Communication',
      type: 'webinar',
      description: 'Recorded webinar on using motivational interviewing techniques to encourage patient behavior change.',
      url: '/resources/motivational-interviewing.mp4',
      date: 'January 15, 2023'
    },
    {
      id: 10,
      title: 'Clinical Calculators and Decision Support Tools',
      category: 'Tools',
      type: 'tool',
      description: 'Collection of commonly used clinical calculators and decision support tools for everyday practice.',
      url: '/professional/calculators',
      date: 'December 10, 2022',
      featured: true
    },
  ];

  // Available categories
  const categories = ['all', ...new Set(resources.map(resource => resource.category))];

  // Filter resources based on active category and search term
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Featured resources
  const featuredResources = resources.filter(resource => resource.featured);

  // Get icon for resource type
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'video':
        return 'videocam';
      case 'webinar':
        return 'video_library';
      case 'tool':
        return 'build';
      case 'article':
        return 'article';
      default:
        return 'description';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>Doctor Resources | PHB Professional</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Doctor Resources</h1>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map(resource => (
              <div key={resource.id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded text-blue-700 mr-4">
                    <span className="material-icons">{getResourceIcon(resource.type)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">{resource.title}</h3>
                    <p className="text-sm text-gray-500">{resource.category} • {resource.date}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{resource.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={resource.url}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    Access Resource
                    <span className="material-icons text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Category Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="material-icons absolute left-3 top-2.5 text-gray-400">search</span>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resource List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">All Resources</h2>

        {filteredResources.length === 0 ? (
          <div className="text-center py-6">
            <span className="material-icons text-gray-400 text-5xl mb-2">search_off</span>
            <p className="text-gray-600">No resources found matching your criteria.</p>
            <button
              onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
              className="mt-3 text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredResources.map(resource => (
              <div key={resource.id} className="py-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-3 rounded text-blue-700 mr-4">
                    <span className="material-icons">{getResourceIcon(resource.type)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-800">{resource.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {resource.category}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {resource.date}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{resource.description}</p>
                    <div className="mt-2">
                      <a
                        href={resource.url}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        Access Resource
                        <span className="material-icons text-sm ml-1">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorResourcesPage;
