import React from 'react';
import { Helmet } from 'react-helmet';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';
import ResearchDataVisualization from '../../features/professional/research/ResearchDataVisualization';

const ResearchPage: React.FC = () => {
  const { professionalUser } = useProfessionalAuth();

  return (
    <div>
      <Helmet>
        <title>Research Dashboard | PHB Professional</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Research Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Analyze health data and identify population trends
        </p>
      </div>

      {/* Role-specific introduction */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        {professionalUser?.role === 'researcher' ? (
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Welcome to the Research Portal</h2>
            <p className="mb-2">
              As a healthcare researcher, you have access to our anonymized public health datasets.
              This dashboard provides tools for analysis, visualization, and export of population health data.
            </p>
            <p>
              Use these tools to identify trends, correlations, and potential areas for further research.
              All data accessed through this portal adheres to strict privacy standards and ethical guidelines.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Research Portal Access</h2>
            <p>
              You're currently viewing a limited version of the research dashboard. Full research capabilities
              are available to users with researcher credentials. If you're involved in healthcare research
              and would like to request expanded access, please contact our research department.
            </p>
          </div>
        )}
      </div>

      {/* Data Visualization Component */}
      <ResearchDataVisualization />

      {/* Research Resources */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Research Collaboration</h3>
          <p className="text-gray-600 mb-4">
            Connect with other researchers and healthcare professionals working on similar studies.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Current Research Projects (15)
              </a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Collaboration Requests (7)
              </a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Research Network Directory
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Publication Support</h3>
          <p className="text-gray-600 mb-4">
            Resources to help with research publication and dissemination.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Journal Submission Guidelines
              </a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Statistical Analysis Templates
              </a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Citation Management Tools
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Funding Opportunities</h3>
          <p className="text-gray-600 mb-4">
            Current grants and funding resources for healthcare research.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Open Grant Applications (12)
              </a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Research Fellowship Programs
              </a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Industry Partnership Opportunities
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* API Access Section (For researchers only) */}
      {professionalUser?.role === 'researcher' && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">API Access</h3>
          <p className="text-gray-600 mb-4">
            Programmatic access to anonymized health data for advanced analysis.
          </p>

          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h4 className="text-md font-medium text-gray-800 mb-2">API Endpoints</h4>
            <code className="block text-sm bg-white p-3 rounded border font-mono">
              GET /api/v1/research/population-data<br />
              GET /api/v1/research/patient-data<br />
              GET /api/v1/research/regional-data/:region
            </code>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="text-md font-medium text-gray-800 mb-2">API Authentication</h4>
            <p className="text-sm mb-2">Your personal API key:</p>
            <div className="flex">
              <code className="block text-sm bg-white p-3 rounded-l border font-mono flex-grow overflow-x-auto">
                {professionalUser?.id ? `phb_research_${btoa(professionalUser.id).slice(0, 20)}` : 'Loading...'}
              </code>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Keep your API key secure. All API usage is logged and must comply with our data usage policies.
            </p>
          </div>

          <div className="mt-4">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              View full API documentation
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchPage;
