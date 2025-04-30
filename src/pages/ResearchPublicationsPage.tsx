import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define types for our publications
interface Publication {
  id: string;
  title: string;
  authors: string[];
  date: string;
  category: 'research' | 'medical' | 'ai' | 'public-health';
  summary: string;
  imageUrl?: string;
  pdfUrl?: string;
  tags: string[];
}

const ResearchPublicationsPage: React.FC = () => {
  // Sample publication data
  const publications: Publication[] = [
    {
      id: 'pub-001',
      title: 'Maternal Health Outcomes in Rural Nigeria: A Five-Year Study',
      authors: ['Dr. Amina Ibrahim', 'Dr. Daniel Okonkwo', 'Prof. Sarah Adebayo'],
      date: '2025-03-15',
      category: 'research',
      summary: 'This comprehensive study examines maternal health outcomes in rural Nigerian communities, identifying key factors affecting maternal mortality and strategies for improvement.',
      pdfUrl: '/publications/maternal-health-outcomes.pdf',
      tags: ['Maternal Health', 'Rural Healthcare', 'Public Health']
    },
    {
      id: 'pub-002',
      title: 'Applications of AI in Diagnosing Malaria: Current Progress and Future Directions',
      authors: ['Dr. Chidi Nwachukwu', 'Eng. Folasade Johnson'],
      date: '2025-02-20',
      category: 'ai',
      summary: 'This paper explores how artificial intelligence technologies are being applied to improve malaria diagnosis in resource-limited settings across Nigeria.',
      imageUrl: 'https://ext.same-assets.com/3177588638/malaria-ai-research.jpg',
      pdfUrl: '/publications/ai-malaria-diagnosis.pdf',
      tags: ['AI', 'Malaria', 'Diagnostics', 'Machine Learning']
    },
    {
      id: 'pub-003',
      title: 'COVID-19 Vaccination Hesitancy in Nigeria: Analysis and Recommendations',
      authors: ['Prof. Oluwaseun Adebiyi', 'Dr. Ngozi Okafor', 'Dr. Benjamin Adewale'],
      date: '2025-01-30',
      category: 'public-health',
      summary: 'This research paper analyzes the factors contributing to COVID-19 vaccine hesitancy in Nigeria and proposes evidence-based strategies to address them.',
      pdfUrl: '/publications/covid-vaccine-hesitancy.pdf',
      tags: ['COVID-19', 'Vaccination', 'Public Health', 'Health Education']
    },
    {
      id: 'pub-004',
      title: 'Machine Learning Approaches to Predict Disease Outbreaks in Nigeria',
      authors: ['Dr. Tunde Bakare', 'Prof. Elizabeth Nnamdi'],
      date: '2024-12-10',
      category: 'ai',
      summary: 'This study demonstrates how machine learning algorithms can be used to predict disease outbreaks in Nigeria by analyzing climate data, population movements, and health metrics.',
      imageUrl: 'https://ext.same-assets.com/3177588638/ml-disease-prediction.jpg',
      pdfUrl: '/publications/ml-disease-prediction.pdf',
      tags: ['AI', 'Machine Learning', 'Disease Surveillance', 'Epidemiology']
    },
    {
      id: 'pub-005',
      title: 'Addressing Non-Communicable Diseases in Urban Nigerian Settings',
      authors: ['Dr. Fatima Mohammed', 'Dr. Joseph Oladele'],
      date: '2024-11-15',
      category: 'medical',
      summary: 'This paper presents findings from a multi-center study on the prevalence and management of non-communicable diseases in urban areas of Nigeria.',
      pdfUrl: '/publications/ncd-urban-nigeria.pdf',
      tags: ['Non-Communicable Diseases', 'Urban Health', 'Hypertension', 'Diabetes']
    },
    {
      id: 'pub-006',
      title: 'Telemedicine Implementation in Rural Health Centers: Challenges and Solutions',
      authors: ['Dr. Chioma Eze', 'Dr. Michael Adebayo', 'Eng. Victoria Nwosu'],
      date: '2024-10-05',
      category: 'research',
      summary: 'This research evaluates the implementation of telemedicine services in rural health centers across Nigeria, identifying challenges and proposing practical solutions.',
      imageUrl: 'https://ext.same-assets.com/3177588638/telemedicine-rural.jpg',
      pdfUrl: '/publications/telemedicine-rural-nigeria.pdf',
      tags: ['Telemedicine', 'Rural Healthcare', 'Digital Health', 'Healthcare Access']
    },
  ];

  // State for filtering
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter publications based on category and search term
  const filteredPublications = publications.filter(pub => {
    const matchesCategory = activeCategory === 'all' || pub.category === activeCategory;
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));

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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="phb-container">
          <h1 className="text-4xl font-bold mb-4">PHB Research Publications</h1>
          <p className="text-xl max-w-3xl">
            Access the latest research, articles, and insights from PHB's medical professionals, researchers, and AI specialists.
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
                <span className="text-gray-600">Research Publications</span>
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
              <h2 className="text-xl font-bold mb-4">Filter Publications</h2>

              {/* Search input */}
              <div className="mb-6">
                <label htmlFor="search-publications" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search-publications"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Search by title, author, or topic"
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
                      All Publications
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'research' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('research')}
                    >
                      Research Papers
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'medical' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('medical')}
                    >
                      Medical Articles
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'ai' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('ai')}
                    >
                      AI Research
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'public-health' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                      onClick={() => handleCategoryChange('public-health')}
                    >
                      Public Health
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to action for researchers */}
            <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold mb-2">Are you a researcher?</h3>
              <p className="text-gray-700 mb-4">
                PHB welcomes submissions from healthcare professionals and researchers. Share your work with our community.
              </p>
              <Link
                to="/programs/research"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Publications listing */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeCategory === 'all'
                  ? 'All Publications'
                  : activeCategory === 'ai'
                    ? 'AI Research'
                    : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Publications`}
              </h2>
              <p className="text-gray-600">{filteredPublications.length} results</p>
            </div>

            {filteredPublications.length > 0 ? (
              <div className="space-y-8">
                {filteredPublications.map(publication => (
                  <div key={publication.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <div className="flex flex-col md:flex-row gap-4">
                      {publication.imageUrl && (
                        <div className="md:w-1/4">
                          <img
                            src={publication.imageUrl}
                            alt={publication.title}
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className={publication.imageUrl ? "md:w-3/4" : "w-full"}>
                        <h3 className="text-xl font-semibold mb-2">{publication.title}</h3>
                        <p className="text-gray-600 mb-2">
                          {publication.authors.join(', ')} • {formatDate(publication.date)}
                        </p>
                        <p className="text-gray-700 mb-4">{publication.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {publication.tags.map(tag => (
                            <span
                              key={tag}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {publication.pdfUrl && (
                          <a
                            href={publication.pdfUrl}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No publications found</h3>
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
            <h2 className="text-3xl font-bold mb-4">Stay Updated on PHB Research</h2>
            <p className="text-lg text-gray-700 mb-6">
              Subscribe to our newsletter to receive the latest research publications, articles, and insights from PHB's experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPublicationsPage;
