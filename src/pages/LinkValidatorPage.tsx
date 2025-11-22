import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type LinkStatus = 'valid' | 'invalid' | 'pending';

interface LinkCheckResult {
  url: string;
  status: LinkStatus;
}

// Common PHB site links we want to validate
const commonLinks = [
  // Pregnancy journey
  '/pregnancy',
  '/pregnancy/planning',
  '/pregnancy/early',
  '/pregnancy/middle',
  '/pregnancy/late',
  '/pregnancy/labor-and-birth',
  '/pregnancy/after-birth',

  // Pregnancy tools
  '/pregnancy/calendar',
  '/pregnancy/baby-names-directory',
  '/pregnancy/baby-shower-planner',
  '/pregnancy/nutrition-guide',
  '/pregnancy/birth-plan-creator',
  '/pregnancy/forums',

  // Tools
  '/tools/bmi-calculator',
  '/tools/due-date-calculator',
  '/tools/kick-counter',
  '/tools/contraction-timer',
  '/tools/weight-gain-calculator',

  // Primary sections
  '/health-a-z',
  '/live-well',
  '/mental-health',
  '/care-and-support',
  '/phb-services',
  '/about',
  '/elara-ai',

  // Authentication
  '/login',
  '/register',
  '/account',

  // Professional section
  '/professional/login',
  '/professional/register',
  '/professional/dashboard'
];

const LinkValidatorPage: React.FC = () => {
  const [results, setResults] = useState<LinkCheckResult[]>([]);
  const [customUrl, setCustomUrl] = useState('');
  const navigate = useNavigate();

  // Function to test if a link exists in the application
  const checkLink = (url: string) => {
    try {
      // Navigate to the URL to see if it works
      navigate(url);
      return 'valid' as LinkStatus;
    } catch (error) {
      console.error(`Error navigating to ${url}:`, error);
      return 'invalid' as LinkStatus;
    }
  };

  // Function to run the tests
  const runLinkTests = () => {
    const newResults = commonLinks.map(link => ({
      url: link,
      status: 'pending' as LinkStatus
    }));

    setResults(newResults);

    // Check each link
    commonLinks.forEach((link, index) => {
      setTimeout(() => {
        const status = checkLink(link);
        setResults(prevResults => {
          const newResults = [...prevResults];
          newResults[index] = { url: link, status };
          return newResults;
        });
      }, index * 500); // Stagger checks to avoid overwhelming
    });
  };

  // Handler for checking a custom URL
  const checkCustomUrl = () => {
    if (!customUrl.trim()) return;

    setResults(prev => [
      ...prev,
      { url: customUrl, status: 'pending' }
    ]);

    const status = checkLink(customUrl);

    setResults(prev => prev.map(item =>
      item.url === customUrl
        ? { url: customUrl, status }
        : item
    ));

    setCustomUrl('');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Link Validator</h1>
          <p className="text-xl">
            Verify that all links in the PHB website are working correctly
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <button
            onClick={runLinkTests}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Test Common Links
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Check Custom URL</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter URL path (e.g., /pregnancy/health)"
              className="border border-gray-300 rounded px-3 py-2 flex-grow"
            />
            <button
              onClick={checkCustomUrl}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Check URL
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.url}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.status === 'pending' ? (
                          <span className="text-yellow-500">Checking...</span>
                        ) : result.status === 'valid' ? (
                          <span className="text-green-500">Valid</span>
                        ) : (
                          <span className="text-red-500">Invalid</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.status !== 'pending' && (
                          <Link to={result.url} className="text-blue-600 hover:underline">
                            Visit
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Note</h2>
          <p>This tool is for development purposes only. It helps identify broken links and navigation issues in the PHB website.</p>
        </div>
      </div>
    </div>
  );
};

export default LinkValidatorPage;
