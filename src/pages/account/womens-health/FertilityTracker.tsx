import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { womensHealthApi, FertilityTracking, WomensHealthProfile } from '../../../services/womensHealthApi';
import WomensHealthGuard from '../../../components/womenshealth/WomensHealthGuard';
import { AlertCircle, Loader, Plus, Check } from 'lucide-react';

interface FertilityData {
  cycle_day: number;
  cycle_length: number;
  ovulation_day: number;
  temperature_readings: { day: number; temperature: number; time: string }[];
  cervical_mucus: { day: number; type: 'dry' | 'sticky' | 'creamy' | 'egg_white'; notes?: string }[];
  ovulation_tests: { day: number; result: 'negative' | 'positive' | 'peak'; image?: string }[];
  symptoms: { day: number; symptoms: string[]; severity: number }[];
  intercourse_log: { day: number; time: string }[];
  fertile_window: { start: number; end: number; peak: number };
  prediction_accuracy: number;
}

const FertilityTracker: React.FC = () => {
  const [currentCycleDay, setCurrentCycleDay] = useState(15);
  const [activeTab, setActiveTab] = useState<'overview' | 'temperature' | 'mucus' | 'tests' | 'symptoms'>('overview');
  const [fertilityData, setFertilityData] = useState<FertilityTracking[]>([]);
  const [profile, setProfile] = useState<WomensHealthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    loadFertilityData();
  }, []);

  const loadFertilityData = async () => {
    try {
      setError('');
      const [profileResponse, fertilityResponse] = await Promise.all([
        womensHealthApi.getProfile(),
        womensHealthApi.getFertilityData()
      ]);

      if (profileResponse.success) {
        setProfile(profileResponse.profile);
        setCurrentCycleDay(profileResponse.profile.current_cycle_day || 1);
      }

      if (fertilityResponse.success) {
        setFertilityData(fertilityResponse.fertility_data);
      }

      if (!profileResponse.success || !fertilityResponse.success) {
        setError('Failed to load fertility data');
      }
    } catch (error: any) {
      console.error('Error loading fertility data:', error);
      setError(error.response?.data?.message || 'Failed to load fertility data');
    } finally {
      setIsLoading(false);
    }
  };

  const CircularProgress: React.FC<{ 
    percentage: number; 
    size: number; 
    strokeWidth: number; 
    color: string;
    trackColor?: string;
    children?: React.ReactNode;
  }> = ({ percentage, size, strokeWidth, color, trackColor = '#f1f5f9', children }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  };

  const FertilityCalendar: React.FC = () => {
    const daysInCycle = fertilityData?.cycle_length || 28;
    const currentDay = fertilityData?.cycle_day || 1;
    const fertileStart = fertilityData?.fertile_window.start || 12;
    const fertileEnd = fertilityData?.fertile_window.end || 16;
    const ovulationDay = fertilityData?.ovulation_day || 14;

    const getDayType = (day: number) => {
      if (day === ovulationDay) return 'ovulation';
      if (day >= fertileStart && day <= fertileEnd) return 'fertile';
      if (day <= 5) return 'menstrual';
      return 'normal';
    };

    const getDayColor = (dayType: string, isToday: boolean) => {
      const colors = {
        ovulation: isToday ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800',
        fertile: isToday ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-800',
        menstrual: isToday ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800',
        normal: isToday ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
      };
      return colors[dayType as keyof typeof colors];
    };

    return (
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">Fertility Calendar</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
          {Array.from({ length: daysInCycle }, (_, i) => {
            const day = i + 1;
            const dayType = getDayType(day);
            const isToday = day === currentDay;
            
            return (
              <div
                key={day}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors cursor-pointer hover:shadow-md ${getDayColor(dayType, isToday)}`}
              >
                {day}
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 rounded mr-2"></div>
            <span>Menstrual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-pink-100 rounded mr-2"></div>
            <span>Fertile Window</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 rounded mr-2"></div>
            <span>Ovulation</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    );
  };

  const TemperatureChart: React.FC = () => {
    const readings = fertilityData?.temperature_readings || [];
    
    return (
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Basal Body Temperature</h3>
          <button 
            onClick={() => setIsLogging(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Log Temperature
          </button>
        </div>
        
        <div className="space-y-3">
          {readings.map((reading, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
              <div>
                <span className="font-medium">Day {reading.day}</span>
                <span className="text-sm text-gray-600 ml-2">{reading.time}</span>
              </div>
              <div className="text-lg font-bold text-pink-600">
                {reading.temperature}°F
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Take your temperature first thing every morning before getting out of bed for accurate readings.
          </p>
        </div>
      </div>
    );
  };

  const CervicalMucusTracker: React.FC = () => {
    const mucusData = fertilityData?.cervical_mucus || [];
    
    const getMucusIcon = (type: string) => {
      const icons = {
        dry: '🏜️',
        sticky: '🍯',
        creamy: '🥛',
        egg_white: '🥚'
      };
      return icons[type as keyof typeof icons] || '❓';
    };

    const getMucusDescription = (type: string) => {
      const descriptions = {
        dry: 'Little to no mucus',
        sticky: 'Thick and tacky',
        creamy: 'Smooth and creamy',
        egg_white: 'Clear and stretchy (most fertile)'
      };
      return descriptions[type as keyof typeof descriptions] || 'Unknown';
    };

    return (
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Cervical Mucus</h3>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Log Mucus
          </button>
        </div>
        
        <div className="space-y-3">
          {mucusData.map((data, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getMucusIcon(data.type)}</span>
                <div>
                  <span className="font-medium">Day {data.day}</span>
                  <p className="text-sm text-gray-600">{getMucusDescription(data.type)}</p>
                  {data.notes && <p className="text-xs text-green-600">{data.notes}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            🥚 <strong>Fertile Sign:</strong> Egg white cervical mucus indicates peak fertility - perfect time for conception!
          </p>
        </div>
      </div>
    );
  };

  const handleLogFertilityData = async (data: Partial<FertilityTracking>) => {
    setIsLogging(true);
    setSubmitStatus('idle');
    
    try {
      const logData = {
        date: new Date().toISOString().split('T')[0],
        cycle_day: currentCycleDay,
        ...data
      };

      const response = await womensHealthApi.addFertilityEntry(logData);
      
      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage('Fertility data logged successfully!');
        
        // Refresh data to show the new entry
        loadFertilityData();
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to log fertility data');
      }
    } catch (error: any) {
      console.error('Error logging fertility data:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.response?.data?.message || 'Failed to log fertility data. Please try again.');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsLogging(false);
    }
  };

  if (isLoading) {
    return (
      <WomensHealthGuard>
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
          <div className="phb-container py-8">
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-pink-600" />
              <span className="ml-2 text-gray-600">Loading fertility data...</span>
            </div>
          </div>
        </div>
      </WomensHealthGuard>
    );
  }

  if (error) {
    return (
      <WomensHealthGuard>
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
          <div className="phb-container py-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Failed to Load Fertility Data</h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={loadFertilityData}
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

  if (fertilityData.length === 0) {
    return (
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
        <div className="phb-container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded-xl"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WomensHealthGuard>
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-12">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">Fertility Tracker 🌸</h1>
              <p className="text-pink-100 text-xl">Your journey to conception</p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="font-semibold">Cycle Day {currentCycleDay}</span>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="font-semibold">{fertilityData.length} Entry{fertilityData.length !== 1 ? 'ies' : 'y'} Logged</span>
                </div>
              </div>
            </div>
            <Link
              to="/account/womens-health"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 flex items-center group"
            >
              <svg className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="phb-container py-8 -mt-6 relative z-10">
        {/* Fertility Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Fertile Window */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Fertile Window</h3>
              <p className="text-pink-100 text-sm">Your most fertile days</p>
            </div>
            <div className="p-6 text-center">
              <CircularProgress
                percentage={((fertilityData.cycle_day - fertilityData.fertile_window.start) / (fertilityData.fertile_window.end - fertilityData.fertile_window.start)) * 100}
                size={120}
                strokeWidth={8}
                color="#ec4899"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🌸</div>
                  <div className="text-sm font-bold text-gray-800">
                    Day {fertilityData.fertile_window.start}-{fertilityData.fertile_window.end}
                  </div>
                  <div className="text-xs text-gray-600">
                    {fertilityData.cycle_day >= fertilityData.fertile_window.start && fertilityData.cycle_day <= fertilityData.fertile_window.end 
                      ? 'In window!' 
                      : `${Math.abs(fertilityData.cycle_day - fertilityData.fertile_window.start)} days to go`}
                  </div>
                </div>
              </CircularProgress>
            </div>
          </div>

          {/* Ovulation Prediction */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Ovulation Day</h3>
              <p className="text-green-100 text-sm">Predicted peak fertility</p>
            </div>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🥚</div>
              <div className="text-2xl font-bold text-green-600 mb-2">
                Day {fertilityData.ovulation_day}
              </div>
              <div className="text-sm text-gray-600">
                {fertilityData.cycle_day === fertilityData.ovulation_day 
                  ? 'Today is ovulation day!' 
                  : fertilityData.cycle_day < fertilityData.ovulation_day 
                    ? `${fertilityData.ovulation_day - fertilityData.cycle_day} days until ovulation`
                    : 'Ovulation has passed'}
              </div>
              <div className="mt-4 text-xs text-green-600 bg-green-50 rounded-lg p-2">
                Best chance for conception
              </div>
            </div>
          </div>

          {/* Prediction Accuracy */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 to-indigo-400 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Prediction</h3>
              <p className="text-purple-100 text-sm">Algorithm accuracy</p>
            </div>
            <div className="p-6 text-center">
              <CircularProgress
                percentage={fertilityData.prediction_accuracy}
                size={120}
                strokeWidth={8}
                color="#8b5cf6"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-lg font-bold text-gray-800">{fertilityData.prediction_accuracy}%</div>
                  <div className="text-xs text-gray-600">Accurate</div>
                </div>
              </CircularProgress>
              <p className="text-sm text-gray-600 mt-3">
                Based on your cycle history
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'temperature', label: 'Temperature', icon: '🌡️' },
              { id: 'mucus', label: 'Cervical Mucus', icon: '🥚' },
              { id: 'tests', label: 'OV Tests', icon: '🧪' },
              { id: 'symptoms', label: 'Symptoms', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-pink-50 text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'overview' && <FertilityCalendar />}
            {activeTab === 'temperature' && <TemperatureChart />}
            {activeTab === 'mucus' && <CervicalMucusTracker />}
            {activeTab === 'tests' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🧪</div>
                <h3 className="text-xl font-bold mb-2">Ovulation Tests</h3>
                <p className="text-gray-600">Track your LH surge with ovulation test results</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors">
                  Log Test Result
                </button>
              </div>
            )}
            {activeTab === 'symptoms' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-2">Fertility Symptoms</h3>
                <p className="text-gray-600">Track ovulation symptoms like cramping, mood, and energy</p>
                <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-colors">
                  Log Symptoms
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-in-right">
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              {submitMessage}
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-in-right">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {submitMessage}
            </div>
          </div>
        )}
      </div>
    </div>
    </WomensHealthGuard>
  );
};

export default FertilityTracker;