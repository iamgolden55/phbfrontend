import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { womensHealthApi, MenstrualCycle, WomensHealthProfile, DailyHealthLog } from '../../../services/womensHealthApi';
import WomensHealthGuard from '../../../components/womenshealth/WomensHealthGuard';
import { AlertCircle, Loader } from 'lucide-react';

interface CycleDay {
  date: Date;
  isPeriod: boolean;
  isOvulation: boolean;
  isFertile: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  symptoms: string[];
}

const CycleCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CycleDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<CycleDay | null>(null);
  const [profile, setProfile] = useState<WomensHealthProfile | null>(null);
  const [cycles, setCycles] = useState<MenstrualCycle[]>([]);
  const [healthLogs, setHealthLogs] = useState<DailyHealthLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [cycleToDelete, setCycleToDelete] = useState<MenstrualCycle | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  // Auto-refresh when page becomes visible (user switches back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('📱 Page visible again, refreshing calendar data...');
        loadData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (profile) {
      generateCalendarDays();
    }
  }, [currentDate, profile, cycles, healthLogs]);

  // Track selectedDay changes for debugging
  useEffect(() => {
    if (selectedDay) {
      console.log('🎯 Selected date:', selectedDay.date.toISOString().split('T')[0]);
    }
  }, [selectedDay]);

  const loadData = async () => {
    try {
      setError('');
      
      // Get date range for health logs (current month plus previous and next month for calendar)
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).toISOString().split('T')[0];
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0).toISOString().split('T')[0];
      
      const [profileResponse, cyclesResponse, healthLogsResponse] = await Promise.all([
        womensHealthApi.getProfile(),
        womensHealthApi.getCycles(20, 0), // Get last 20 cycles
        womensHealthApi.getHealthLogs(startDate, endDate) // Get health logs for calendar period
      ]);

      if (profileResponse.success) {
        setProfile(profileResponse.profile);
      }

      if (cyclesResponse.success) {
        setCycles(cyclesResponse.cycles);
      }

      if (healthLogsResponse.success) {
        setHealthLogs(healthLogsResponse.logs);
      }

      if (!profileResponse.success || !cyclesResponse.success) {
        setError('Failed to load cycle data');
      }
    } catch (error: any) {
      console.error('Error loading cycle data:', error);
      setError(error.response?.data?.message || 'Failed to load cycle data');
    } finally {
      setIsLoading(false);
    }
  };

  const generateCalendarDays = () => {
    if (!profile) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and adjust for Monday start
    const firstDay = new Date(year, month, 1);
    const startOfWeek = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(firstDay.getDate() + mondayOffset);

    // Generate 42 days (6 weeks)
    const days: CycleDay[] = [];
    const today = new Date();
    
    // Get the most recent cycle for reference
    const lastPeriodStart = profile.last_menstrual_period ? new Date(profile.last_menstrual_period) : null;
    const cycleLength = profile.average_cycle_length;
    const periodLength = profile.average_period_duration;
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      
      let isPeriod = false;
      let isOvulation = false;
      let isFertile = false;
      let symptoms: string[] = [];
      
      // Check if this date matches any recorded cycles
      const matchingCycle = cycles.find(cycle => {
        const cycleStart = new Date(cycle.cycle_start_date);
        // Compare just the date part (year, month, day)
        return date.toDateString() === cycleStart.toDateString();
      });
      
      // Check for daily health log symptoms for this date
      const healthLog = healthLogs.find(log => {
        const logDate = new Date(log.date);
        return date.toDateString() === logDate.toDateString();
      });
      
      if (matchingCycle) {
        // This is a period start date
        isPeriod = true;
        
        if (matchingCycle.ovulation_date) {
          const ovulationDate = new Date(matchingCycle.ovulation_date);
          isOvulation = date.toDateString() === ovulationDate.toDateString();
        }
      }
      
      // Get symptoms from health log (primary source) or fallback to cycle symptoms
      if (healthLog) {
        symptoms = healthLog.symptoms || [];
      } else if (matchingCycle) {
        symptoms = matchingCycle.symptoms || [];
      }
      
      // For period days following the start date
      if (!isPeriod && lastPeriodStart) {
        const daysSinceLastPeriod = Math.floor((date.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
        
        // Mark as period if within period duration from last period start
        isPeriod = daysSinceLastPeriod >= 0 && daysSinceLastPeriod < periodLength;
        
        // Calculate ovulation and fertile window
        if (daysSinceLastPeriod >= 0) {
          const cycleDay = daysSinceLastPeriod;
          isOvulation = Math.abs(cycleDay - (cycleLength / 2)) < 1; // Around day 14 for 28-day cycle
          isFertile = cycleDay >= (cycleLength / 2) - 3 && cycleDay <= (cycleLength / 2) + 2; // Fertile window
        }
      }
      
      days.push({
        date: new Date(date),
        isPeriod,
        isOvulation,
        isFertile,
        isToday: date.toDateString() === today.toDateString(),
        isCurrentMonth: date.getMonth() === month,
        symptoms
      });
    }
    
    setCalendarDays(days);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    // Reload data for the new month to get health logs
    loadData();
  };

  const getDayClasses = (day: CycleDay) => {
    let classes = 'w-10 h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ';
    
    if (!day.isCurrentMonth) {
      classes += 'text-gray-300 ';
    } else if (day.isPeriod) {
      // Period days have highest priority - red with white text
      classes += day.isToday 
        ? 'bg-red-600 text-white font-bold ring-2 ring-blue-300 ' // Today + Period: Red with blue ring
        : 'bg-red-500 text-white font-semibold ';
    } else if (day.isOvulation) {
      classes += day.isToday
        ? 'bg-green-600 text-white font-bold ring-2 ring-blue-300 ' // Today + Ovulation: Green with blue ring
        : 'bg-green-500 text-white font-semibold ';
    } else if (day.isFertile) {
      classes += day.isToday
        ? 'bg-green-200 text-green-800 font-bold ring-2 ring-blue-400 ' // Today + Fertile: Light green with blue ring
        : 'bg-green-100 text-green-700 ';
    } else if (day.isToday) {
      classes += 'bg-blue-600 text-white font-bold ';
    } else {
      classes += 'text-gray-700 hover:bg-gray-100 ';
    }
    
    return classes;
  };

  const formatSymptomName = (symptom: string) => {
    return symptom.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Handler functions for cycle tracking
  const handleMarkPeriod = async (date: Date) => {
    try {
      const dateString = date.toISOString().split('T')[0];
      
      // Check if there's already a cycle for this date
      const existingCycle = cycles.find(cycle => {
        const cycleStart = new Date(cycle.cycle_start_date);
        const cycleEnd = cycle.cycle_end_date ? new Date(cycle.cycle_end_date) : null;
        return date >= cycleStart && (!cycleEnd || date <= cycleEnd);
      });

      if (existingCycle) {
        // Update existing cycle
        console.log('Period already marked for this date');
        return;
      }

      // Create new cycle starting on this date
      const response = await womensHealthApi.createCycle({
        cycle_start_date: dateString,
        flow_intensity: 'medium',
        is_regular: true,
        is_current_cycle: true
      });

      if (response.success) {
        // Refresh data to get updated cycles and health logs
        await loadData();
        console.log('Period start marked successfully');
      }
    } catch (error) {
      console.error('Error marking period:', error);
      setError('Failed to mark period start');
    }
  };

  const handleMarkOvulation = async (date: Date) => {
    try {
      // For now, just log the ovulation marking
      // In a full implementation, this would update the cycle or create a fertility tracking entry
      console.log('Ovulation marked for:', date.toISOString().split('T')[0]);
      
      // You could add fertility tracking entry here
      const response = await womensHealthApi.addFertilityEntry({
        date: date.toISOString().split('T')[0],
        ovulation_test_taken: true,
        ovulation_test_result: 'positive'
      });

      if (response.success) {
        // Refresh data to get updated cycles and health logs
        await loadData();
        console.log('Ovulation marked successfully');
      }
    } catch (error) {
      console.error('Error marking ovulation:', error);
      setError('Failed to mark ovulation');
    }
  };

  const handleDeleteCycle = (date: Date) => {
    // Find the cycle for this date
    const cycle = cycles.find(cycle => {
      const cycleStart = new Date(cycle.cycle_start_date);
      return date.toDateString() === cycleStart.toDateString();
    });

    if (cycle) {
      setCycleToDelete(cycle);
      setShowDeleteConfirm(true);
    }
  };

  const confirmDeleteCycle = async () => {
    if (!cycleToDelete) return;

    try {
      const response = await womensHealthApi.deleteCycle(cycleToDelete.id);
      
      if (response.success) {
        setSuccessMessage('Cycle deleted successfully');
        await loadData(); // Refresh data to get updated cycles and health logs
        setSelectedDay(null); // Clear selection
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      }
    } catch (error) {
      console.error('Error deleting cycle:', error);
      setError('Failed to delete cycle');
    } finally {
      setShowDeleteConfirm(false);
      setCycleToDelete(null);
    }
  };

  // Calculate cycle statistics from profile and cycles data
  const cycleLength = profile?.average_cycle_length || 28;
  const periodLength = profile?.average_period_duration || 5;
  
  // Calculate last period start date
  const lastCycle = cycles.find(cycle => cycle.cycle_start_date);
  const lastPeriodStart = lastCycle 
    ? new Date(lastCycle.cycle_start_date) 
    : new Date(Date.now() - 28 * 24 * 60 * 60 * 1000); // Default to 28 days ago

  if (isLoading) {
    return (
      <WomensHealthGuard>
        <div className="bg-white min-h-screen">
          <div className="bg-gradient-to-r from-pink-600 to-red-500 text-white py-8">
            <div className="phb-container">
              <div className="animate-pulse">
                <div className="h-8 bg-white bg-opacity-20 rounded w-64 mb-4"></div>
                <div className="h-6 bg-white bg-opacity-20 rounded w-96"></div>
              </div>
            </div>
          </div>
          <div className="phb-container py-8">
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-pink-600" />
              <span className="ml-2 text-gray-600">Loading cycle data...</span>
            </div>
          </div>
        </div>
      </WomensHealthGuard>
    );
  }

  if (error) {
    return (
      <WomensHealthGuard>
        <div className="bg-white min-h-screen">
          <div className="bg-gradient-to-r from-pink-600 to-red-500 text-white py-8">
            <div className="phb-container">
              <h1 className="text-3xl font-bold mb-2">Cycle Calendar</h1>
              <p className="text-pink-100 text-lg">Track your menstrual cycle and fertility</p>
            </div>
          </div>
          <div className="phb-container py-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Failed to Load Calendar</h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={loadData}
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

  return (
    <WomensHealthGuard>
      <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-pink-600 to-red-500 text-white py-8">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Cycle Calendar</h1>
              <p className="text-pink-100 text-lg">Track your menstrual cycle and fertility</p>
            </div>
            <Link
              to="/account/womens-health"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* How to Use Instructions */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-pink-800 mb-3">🌸 How to Track Your Cycle</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start">
                <span className="text-2xl mr-2">1️⃣</span>
                <div>
                  <p className="font-medium text-gray-700">Click any date</p>
                  <p className="text-gray-600">Select a day to view or add cycle information</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-2">2️⃣</span>
                <div>
                  <p className="font-medium text-gray-700">Mark period start</p>
                  <p className="text-gray-600">Use "Mark Period Start" button when your period begins</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-2">3️⃣</span>
                <div>
                  <p className="font-medium text-gray-700">Track symptoms</p>
                  <p className="text-gray-600">Log daily symptoms, ovulation, and other health data</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Calendar Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={loadData}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-600 hover:text-gray-800"
                  title="Refresh calendar data"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={getDayClasses(day)}
                  onClick={() => {
                    console.log('🗓️ Selected:', day.date.toISOString().split('T')[0]);
                    setSelectedDay(day);
                  }}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-200 rounded mr-2"></div>
                <span className="text-sm">Period</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
                <span className="text-sm">Ovulation</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
                <span className="text-sm">Fertile Window</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                <span className="text-sm">Today</span>
              </div>
            </div>
          </div>

          {/* Selected Day Details */}
          {selectedDay && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">
                {selectedDay.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Cycle Information</h4>
                  <div className="space-y-1 text-sm">
                    {selectedDay.isPeriod && (
                      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        Period Day
                      </span>
                    )}
                    {selectedDay.isOvulation && (
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs ml-1">
                        Ovulation Day
                      </span>
                    )}
                    {selectedDay.isFertile && !selectedDay.isOvulation && (
                      <span className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs ml-1">
                        Fertile Window
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Logged Symptoms</h4>
                  {selectedDay.symptoms.length > 0 ? (
                    <div className="space-y-1">
                      {selectedDay.symptoms.map((symptom, index) => (
                        <span key={index} className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs mr-1">
                          {formatSymptomName(symptom)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No symptoms logged</p>
                  )}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleMarkPeriod(selectedDay.date)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay.isPeriod 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {selectedDay.isPeriod ? '✓ Period Day' : 'Mark Period Start'}
                  </button>
                  
                  <button
                    onClick={() => handleMarkOvulation(selectedDay.date)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay.isOvulation 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {selectedDay.isOvulation ? '✓ Ovulation Day' : 'Mark Ovulation'}
                  </button>
                  
                  <button
                    onClick={() => {
                      const todayString = new Date().toISOString().split('T')[0];
                      console.log('🔗 Navigating to daily log for today:', todayString);
                      navigate(`/account/womens-health/daily-log?date=${todayString}`);
                    }}
                    className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    Log Today's Symptoms
                  </button>
                </div>
                
                {/* Delete Option for Period Days */}
                {selectedDay.isPeriod && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleDeleteCycle(selectedDay.date)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      🗑️ Delete Period Entry
                    </button>
                  </div>
                )}
                
                <div className="mt-3">
                  <Link
                    to="/account/womens-health/daily-log"
                    className="inline-flex items-center text-pink-600 hover:text-pink-800 text-sm font-medium"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Complete today's health log
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Cycle Statistics */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-bold mb-4">Cycle Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{cycleLength}</div>
                <div className="text-sm text-gray-600">Average Cycle Length</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{periodLength}</div>
                <div className="text-sm text-gray-600">Average Period Length</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.ceil((new Date().getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-gray-600">Days Since Last Period</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Confirmation Dialog */}
    {showDeleteConfirm && cycleToDelete && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Period Entry</h3>
            <p className="text-gray-600 mb-2">
              Are you sure you want to delete the period entry for{' '}
              <span className="font-medium">
                {new Date(cycleToDelete.cycle_start_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setCycleToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCycle}
                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Success Message */}
    {successMessage && (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </div>
      </div>
    )}

    </WomensHealthGuard>
  );
};

export default CycleCalendar;