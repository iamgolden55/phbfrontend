import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

interface TestResultType {
  id: string;
  date: string;
  testName: string;
  testType: string;
  orderedBy: string;
  status: 'completed' | 'pending' | 'cancelled';
  results?: {
    name: string;
    value: string;
    unit?: string;
    normalRange?: string;
    isNormal: boolean;
  }[];
  summary?: string;
  notes?: string;
}

// Sample test results for demonstration
const mockTestResults: TestResultType[] = [
  {
    id: 't1',
    date: '2025-02-15',
    testName: 'Complete Blood Count',
    testType: 'Blood',
    orderedBy: 'Dr. Sarah Johnson',
    status: 'completed',
    results: [
      {
        name: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        normalRange: '13.5-17.5',
        isNormal: true
      },
      {
        name: 'White Blood Cell Count',
        value: '7.5',
        unit: 'x10^9/L',
        normalRange: '4.5-11.0',
        isNormal: true
      },
      {
        name: 'Platelet Count',
        value: '250',
        unit: 'x10^9/L',
        normalRange: '150-450',
        isNormal: true
      },
      {
        name: 'Red Blood Cell Count',
        value: '5.0',
        unit: 'x10^12/L',
        normalRange: '4.5-5.5',
        isNormal: true
      }
    ],
    summary: 'All results within normal range.'
  },
  {
    id: 't2',
    date: '2025-01-05',
    testName: 'Lipid Panel',
    testType: 'Blood',
    orderedBy: 'Dr. Michael Brown',
    status: 'completed',
    results: [
      {
        name: 'Total Cholesterol',
        value: '5.2',
        unit: 'mmol/L',
        normalRange: '<5.2',
        isNormal: true
      },
      {
        name: 'LDL Cholesterol',
        value: '3.4',
        unit: 'mmol/L',
        normalRange: '<3.4',
        isNormal: true
      },
      {
        name: 'HDL Cholesterol',
        value: '1.1',
        unit: 'mmol/L',
        normalRange: '>1.0',
        isNormal: true
      },
      {
        name: 'Triglycerides',
        value: '1.8',
        unit: 'mmol/L',
        normalRange: '<2.3',
        isNormal: true
      }
    ],
    summary: 'Cholesterol levels are at the upper limit of normal range. Recommend dietary adjustments.',
    notes: 'Consider follow-up test in 6 months. Discuss lifestyle changes at next appointment.'
  },
  {
    id: 't3',
    date: '2024-12-20',
    testName: 'Liver Function Test',
    testType: 'Blood',
    orderedBy: 'Dr. Sarah Johnson',
    status: 'completed',
    results: [
      {
        name: 'ALT',
        value: '45',
        unit: 'U/L',
        normalRange: '7-56',
        isNormal: true
      },
      {
        name: 'AST',
        value: '40',
        unit: 'U/L',
        normalRange: '10-40',
        isNormal: true
      },
      {
        name: 'Alkaline Phosphatase',
        value: '85',
        unit: 'U/L',
        normalRange: '44-147',
        isNormal: true
      },
      {
        name: 'Total Bilirubin',
        value: '0.8',
        unit: 'mg/dL',
        normalRange: '0.1-1.2',
        isNormal: true
      }
    ],
    summary: 'Liver function tests within normal limits.'
  },
  {
    id: 't4',
    date: '2025-03-01',
    testName: 'HbA1c',
    testType: 'Blood',
    orderedBy: 'Dr. James Wilson',
    status: 'pending'
  }
];

const TestResults: React.FC = () => {
  const { user } = useAuth();
  const [selectedTest, setSelectedTest] = useState<TestResultType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('Loading...');

  // Filter test results based on search term
  const filteredTests = mockTestResults
    .filter(test => {
      if (!searchTerm) return true;
      return (
        test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.orderedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get recent test results
  const recentTests = [...mockTestResults]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  useEffect(() => {
    // Set debug info after component mounts
    const userStr = localStorage.getItem('phb_user');
    const isUserAuth = !!user;

    setDebugInfo(`
      User authenticated: ${isUserAuth}
      User from localStorage: ${userStr ? 'yes' : 'no'}
      Number of test results: ${recentTests.length}
    `);
  }, [user, recentTests.length]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const viewTestDetails = (test: TestResultType) => {
    setSelectedTest(test);
    setShowDetailModal(true);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-blue-600 bg-blue-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getResultStatusIndicator = (isNormal: boolean) => {
    return isNormal ? (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
        Normal
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
        Abnormal
      </span>
    );
  };

  // For debugging purposes - show the coming soon message if button is clicked
  const toggleComingSoon = () => {
    setShowComingSoon(!showComingSoon);
  };

  return (
    <AccountHealthLayout title="Test Results">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Your Test Results</h2>

        {/* Debug section */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">Debug Information</h3>
          <pre className="text-sm whitespace-pre-wrap">{debugInfo}</pre>
          <button
            onClick={toggleComingSoon}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {showComingSoon ? "Show Real Test Results" : "Show Coming Soon"}
          </button>
        </div>

        <div className="mb-6">
          <p>
            View your test results from blood tests, scans, and other medical procedures. Results are added to your PHB account after being reviewed by your healthcare provider.
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for test results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Coming Soon or Recent Test Results */}
        {showComingSoon ? (
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-blue-800">Coming Soon</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>We're currently developing the test results feature. You'll soon be able to view and manage your test results online.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Recent Test Results</h3>
              <Link
                to="/account/test-results/all"
                className="text-[#005eb8] hover:text-[#003f7e] font-medium text-sm"
              >
                View all test results →
              </Link>
            </div>

            {recentTests.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No test results</h3>
                <p className="mt-1 text-gray-500">You don't have any test results in your record yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                    onClick={() => viewTestDetails(test)}
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{test.testName}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                        {getStatusLabel(test.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{test.testType} • Ordered by {test.orderedBy}</p>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(test.date)}</p>

                    {test.status === 'completed' && test.summary && (
                      <div className="mt-2 p-2 bg-gray-100 rounded-md">
                        <p className="text-sm">{test.summary}</p>
                      </div>
                    )}

                    <div className="mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewTestDetails(test);
                        }}
                        className="text-sm text-[#005eb8] hover:text-[#003f7e] font-medium"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Result categories and actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Recent test results</h3>
            <p className="mb-4">
              View your most recent test results from blood tests, scans, and other medical procedures.
            </p>
            <Link
              to="/account/test-results/recent"
              className="inline-block bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] transition-colors"
            >
              View recent results
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Search for results</h3>
            <p className="mb-4">
              Search for specific test results by date, type, or healthcare provider.
            </p>
            <Link
              to="/account/test-results/search"
              className="inline-block bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] transition-colors"
            >
              Search results
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Understanding your test results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/help/test-results/understanding"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#005eb8] mb-2">Reading results</h4>
              <p className="text-sm text-gray-600">Learn how to understand your test results and what the numbers mean.</p>
            </Link>

            <Link
              to="/help/test-results/reference-ranges"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#005eb8] mb-2">Reference ranges</h4>
              <p className="text-sm text-gray-600">Information about normal reference ranges for common tests.</p>
            </Link>

            <Link
              to="/help/test-results/follow-up"
              className="bg-white border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-[#005eb8] mb-2">Follow-up care</h4>
              <p className="text-sm text-gray-600">Find out when and how to follow up on test results with your healthcare provider.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Test Detail Modal */}
      {showDetailModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedTest.testName}</h3>
                <p className="text-gray-600">{formatDate(selectedTest.date)}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Test Type</p>
                  <p className="font-medium">{selectedTest.testType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ordered By</p>
                  <p className="font-medium">{selectedTest.orderedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTest.status)}`}>
                    {getStatusLabel(selectedTest.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(selectedTest.date)}</p>
                </div>
              </div>
            </div>

            {selectedTest.status === 'completed' && selectedTest.results && (
              <div className="mb-4">
                <h4 className="font-bold mb-2">Results</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Range</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedTest.results.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.name}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.value} {result.unit}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{result.normalRange}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getResultStatusIndicator(result.isNormal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTest.summary && (
              <div className="mb-4">
                <h4 className="font-bold mb-2">Summary</h4>
                <p className="text-gray-700">{selectedTest.summary}</p>
              </div>
            )}

            {selectedTest.notes && (
              <div className="mb-4">
                <h4 className="font-bold mb-2">Notes</h4>
                <p className="text-gray-700">{selectedTest.notes}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <Link
                to={`/account/test-results/${selectedTest.id}/download`}
                className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e] transition-colors"
              >
                Download PDF
              </Link>
            </div>
          </div>
        </div>
      )}
    </AccountHealthLayout>
  );
};

export default TestResults;
