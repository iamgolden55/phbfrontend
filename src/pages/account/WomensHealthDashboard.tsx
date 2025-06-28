import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/authContext';
import { womensHealthApi, DashboardData } from '../../services/womensHealthApi';
import WomensHealthGuard from '../../components/womenshealth/WomensHealthGuard';
import { AlertCircle } from 'lucide-react';

const WomensHealthDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setError('');
      const response = await womensHealthApi.getDashboardData();
      if (response.success) {
        setDashboardData(response.dashboard);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getPregnancyStatusDisplay = (status: string) => {
    switch (status) {
      case 'pregnant': return { text: 'Pregnant', color: 'text-green-600', bg: 'bg-green-50' };
      case 'trying_to_conceive': return { text: 'Trying to conceive', color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'postpartum': return { text: 'Postpartum', color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'breastfeeding': return { text: 'Breastfeeding', color: 'text-indigo-600', bg: 'bg-indigo-50' };
      case 'menopause': return { text: 'Menopause', color: 'text-orange-600', bg: 'bg-orange-50' };
      default: return { text: 'Not pregnant', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const calculateDaysUntilPeriod = (nextPeriodDate: string) => {
    const today = new Date();
    const nextPeriod = new Date(nextPeriodDate);
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <WomensHealthGuard allowSkip={true}>
        <div className="bg-white min-h-screen">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
            <div className="phb-container">
              <div className="animate-pulse">
                <div className="h-8 bg-white bg-opacity-20 rounded w-64 mb-4"></div>
                <div className="h-6 bg-white bg-opacity-20 rounded w-96"></div>
              </div>
            </div>
          </div>
          <div className="phb-container py-8">
            <div className="animate-pulse space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WomensHealthGuard>
    );
  }

  if (error) {
    return (
      <WomensHealthGuard allowSkip={true}>
        <div className="bg-white min-h-screen">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
            <div className="phb-container">
              <h1 className="text-3xl font-bold mb-2">Women's Health Dashboard</h1>
              <p className="text-pink-100 text-lg">Your complete reproductive health companion</p>
            </div>
          </div>
          <div className="phb-container py-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Failed to Load Dashboard</h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={loadDashboardData}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </WomensHealthGuard>
    );
  }

  const healthProfile = dashboardData?.profile;
  const currentCycle = dashboardData?.current_cycle;
  const currentPregnancy = dashboardData?.current_pregnancy;
  const statusDisplay = healthProfile ? getPregnancyStatusDisplay(healthProfile.pregnancy_status) : null;
  const daysUntilPeriod = healthProfile?.estimated_next_period ? calculateDaysUntilPeriod(healthProfile.estimated_next_period) : null;

  return (
    <WomensHealthGuard allowSkip={true}>
      <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Women's Health Dashboard</h1>
              <p className="text-pink-100 text-lg">Your complete reproductive health companion</p>
            </div>
            <Link
              to="/account"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Account
            </Link>
          </div>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Quick Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className={`rounded-full p-3 mr-3 ${statusDisplay?.bg}`}>
                <svg className={`h-6 w-6 ${statusDisplay?.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Current Status</h3>
                <p className={`text-sm ${statusDisplay?.color}`}>{statusDisplay?.text}</p>
              </div>
            </div>
            {healthProfile?.pregnancy_status === 'pregnant' && healthProfile.current_pregnancy_week && (
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-sm text-green-800">
                  <span className="font-bold">Week {healthProfile.current_pregnancy_week}</span> of pregnancy
                </p>
                {healthProfile.estimated_due_date && (
                  <p className="text-xs text-green-600 mt-1">
                    Due: {new Date(healthProfile.estimated_due_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Cycle Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-blue-100 p-3 mr-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Cycle Tracking</h3>
                <p className="text-sm text-gray-600">Menstrual cycle overview</p>
              </div>
            </div>
            {daysUntilPeriod !== null && (
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-800">
                  Next period in <span className="font-bold">{daysUntilPeriod} days</span>
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {healthProfile?.estimated_next_period && new Date(healthProfile.estimated_next_period).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-purple-100 p-3 mr-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Quick Log</h3>
                <p className="text-sm text-gray-600">Track today's health</p>
              </div>
            </div>
            <Link
              to="/account/womens-health/daily-log"
              className="block bg-purple-50 hover:bg-purple-100 p-3 rounded-md transition-colors text-center"
            >
              <span className="text-purple-600 font-medium text-sm">Log Today's Health</span>
            </Link>
          </div>
        </div>

        {/* Main Dashboard Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pregnancy Journey */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Pregnancy Journey
            </h3>
            
            {healthProfile?.pregnancy_status === 'pregnant' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="font-semibold text-green-800 mb-2">Current Progress</h4>
                  <div className="w-full bg-green-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${((healthProfile.current_pregnancy_week || 0) / 40) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-green-700">
                    Week {healthProfile.current_pregnancy_week} of 40
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/account/womens-health/pregnancy/tracker"
                    className="bg-green-100 hover:bg-green-200 p-3 rounded-md text-center transition-colors"
                  >
                    <span className="text-green-700 font-medium text-sm">Weekly Tracker</span>
                  </Link>
                  <Link
                    to="/account/womens-health/pregnancy/appointments"
                    className="bg-green-100 hover:bg-green-200 p-3 rounded-md text-center transition-colors"
                  >
                    <span className="text-green-700 font-medium text-sm">Appointments</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">Start your pregnancy journey when ready</p>
                <div className="space-y-2">
                  <Link
                    to="/pregnancy"
                    className="block bg-green-100 hover:bg-green-200 p-3 rounded-md transition-colors"
                  >
                    <span className="text-green-700 font-medium text-sm">Explore Pregnancy Information</span>
                  </Link>
                  <Link
                    to="/account/womens-health/fertility"
                    className="block bg-blue-100 hover:bg-blue-200 p-3 rounded-md transition-colors"
                  >
                    <span className="text-blue-700 font-medium text-sm">Fertility & Family Planning</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Menstrual Health */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="h-6 w-6 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Menstrual Health
            </h3>
            
            <div className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-md">
                <h4 className="font-semibold text-pink-800 mb-2">Cycle Overview</h4>
                <div className="text-sm space-y-1">
                  <p className="text-pink-700">
                    Average cycle: <span className="font-medium">{healthProfile?.average_cycle_length} days</span>
                  </p>
                  {healthProfile?.last_menstrual_period && (
                    <p className="text-pink-700">
                      Last period: <span className="font-medium">
                        {new Date(healthProfile.last_menstrual_period).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/account/womens-health/cycle-calendar"
                  className="bg-pink-100 hover:bg-pink-200 p-3 rounded-md text-center transition-colors"
                >
                  <span className="text-pink-700 font-medium text-sm">Cycle Calendar</span>
                </Link>
                <Link
                  to="/account/womens-health/symptoms"
                  className="bg-pink-100 hover:bg-pink-200 p-3 rounded-md text-center transition-colors"
                >
                  <span className="text-pink-700 font-medium text-sm">Symptom Tracker</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Health Screenings & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Screenings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Health Screenings
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                <div>
                  <p className="font-medium text-blue-800">Cervical Screening</p>
                  <p className="text-sm text-blue-600">Due in 6 months</p>
                </div>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Upcoming</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                <div>
                  <p className="font-medium text-green-800">Mammogram</p>
                  <p className="text-sm text-green-600">Completed last month</p>
                </div>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Current</span>
              </div>
              
              <Link
                to="/account/womens-health/screenings"
                className="block text-center bg-blue-100 hover:bg-blue-200 p-3 rounded-md transition-colors"
              >
                <span className="text-blue-700 font-medium text-sm">View All Screenings</span>
              </Link>
            </div>
          </div>

          {/* Health Goals */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Health Goals
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-purple-800">Regular Exercise</p>
                  <span className="text-sm text-purple-600">75%</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-800">Water Intake</p>
                  <span className="text-sm text-gray-600">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <Link
                to="/account/womens-health/goals"
                className="block text-center bg-purple-100 hover:bg-purple-200 p-3 rounded-md transition-colors"
              >
                <span className="text-purple-700 font-medium text-sm">Manage Goals</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </WomensHealthGuard>
  );
};

export default WomensHealthDashboard;