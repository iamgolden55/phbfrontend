import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/authContext';
import { womensHealthApi, DashboardData } from '../../services/womensHealthApi';
import WomensHealthGuard from '../../components/womenshealth/WomensHealthGuard';
import { 
  Calendar, 
  Search,
  ChevronLeft, 
  ChevronRight,
  Plus,
  User,
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Heart,
  Droplets,
  Activity,
  Bell,
  Settings,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react';
import { Tooltip } from 'recharts';

const WomensHealthDashboardEnhanced: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Format month name
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get current week dates for mobile header
  const getCurrentWeekDates = () => {
    const today = selectedDate || new Date();
    const startOfWeek = new Date(today);
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    startOfWeek.setDate(diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  // Navigate week for mobile
  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };

  // Get period day
  const getPeriodDay = () => {
    const today = new Date();
    const periodStart = new Date('2024-10-19'); // Mock period start
    const diffTime = today.getTime() - periodStart.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <WomensHealthGuard allowSkip={true}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </WomensHealthGuard>
    );
  }

  return (
    <WomensHealthGuard allowSkip={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Layout - Figma Exact Match with Interactivity */}
        <div className="lg:hidden">
          {/* Pink Header Section - Mobile */}
          <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 px-4 pt-12 pb-8">
            <div className="max-w-md mx-auto">
              {/* Top Navigation */}
              <div className="flex items-center justify-between mb-8">
                <div 
                  className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all"
                  onClick={goToPreviousWeek}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-white text-lg font-medium">{getMonthName(currentDate)}</h1>
                <div 
                  className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all"
                  onClick={goToNextWeek}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Week Days - Interactive */}
              <div className="flex items-center justify-center space-x-6 mb-8">
                {getCurrentWeekDates().map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                  return (
                    <div key={index} className="text-center">
                      <div className="text-white text-xs font-medium mb-2">
                        {isToday ? 'TODAY' : dayNames[index]}
                      </div>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer transition-all ${
                          isToday 
                            ? 'bg-white text-pink-500 font-medium' 
                            : isSelected
                            ? 'bg-white bg-opacity-50 text-white font-medium'
                            : 'text-white hover:bg-white hover:bg-opacity-20'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Period Status */}
              <div className="text-center mb-6">
                <div className="text-white text-lg font-medium mb-2">Period</div>
                <div className="text-white text-4xl font-bold mb-4">Day {getPeriodDay()}</div>
                <button className="bg-white bg-opacity-30 px-6 py-2 rounded-full text-white text-sm font-medium hover:bg-opacity-40 transition-all">
                  Edit period dates
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Mobile */}
          <div className="max-w-md mx-auto px-4 -mt-4 relative z-10">
            {/* Daily Insights Section - Instagram Stories Style */}
            <div className="bg-white rounded-t-3xl pt-6 pb-4">
              <h2 className="text-gray-900 text-lg font-semibold mb-4 px-4">My daily insights - today</h2>
              
              {/* Horizontal Scrollable Story Cards */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-3 px-4 pb-2" style={{ width: 'max-content' }}>
                  
                  {/* Log Symptoms Card */}
                  <div className="flex-shrink-0 w-28 bg-gray-50 rounded-3xl p-4 border border-gray-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-pink-600 transition-colors">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Log your symptoms</div>
                    </div>
                  </div>

                  {/* Pregnancy Chance Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-4 border border-pink-200 shadow-sm">
                    <div className="text-center">
                      <div className="text-gray-800 text-xs font-medium mb-2 leading-tight">Today's pregnancy chance</div>
                      <div className="text-xl font-bold text-gray-900 mb-2">0%</div>
                      <button className="text-pink-600 text-xs font-medium hover:text-pink-700 transition-colors">See update</button>
                    </div>
                  </div>

                  {/* Overview Symptoms Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all border border-blue-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Overview symptoms</div>
                    </div>
                  </div>

                  {/* Fertility Window Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all border border-green-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Fertile window</div>
                    </div>
                  </div>

                  {/* Mood Tracking Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all border border-yellow-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Sun className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Mood tracker</div>
                    </div>
                  </div>

                  {/* Water Intake Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all border border-cyan-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Droplets className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Water intake</div>
                    </div>
                  </div>

                  {/* Exercise Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all border border-purple-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Exercise log</div>
                    </div>
                  </div>

                  {/* Medication Reminder Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all border border-red-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Bell className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Medications</div>
                    </div>
                  </div>

                  {/* Sleep Tracking Card */}
                  <div className="flex-shrink-0 w-28 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all border border-indigo-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Moon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-gray-800 text-xs font-medium leading-tight">Sleep tracker</div>
                    </div>
                  </div>

                </div>
              </div>
              
              {/* Scroll Indicator Dots */}
              <div className="flex justify-center mt-4 space-x-1">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* During Period Section */}
            <div className="bg-white px-4 pb-6">
              <h3 className="text-gray-900 text-lg font-semibold mb-4">During period</h3>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search articles, etc"
                  className="w-full bg-gray-50 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-600 border-0 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
              </div>

              {/* Coping with Cramps Card */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 mb-6 relative overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                <div className="relative z-10">
                  <h4 className="text-white text-xl font-bold mb-4">Coping with cramps</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-white text-sm">
                      <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                      Quick pain relief tips
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                      What's causing your cramps
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                      Quick pain relief tips
                    </div>
                  </div>
                  <button className="bg-white bg-opacity-30 px-6 py-2 rounded-full text-white text-sm font-medium hover:bg-opacity-40 transition-all">
                    manage the pain
                  </button>
                </div>
                
                {/* Subtle, elegant illustration - top right corner */}
                <img 
                  src="/images/hand-drawn-compliment-illustration.png" 
                  alt="Woman comfort illustration"
                  className="absolute right-4 top-4 w-16 h-16 object-cover rounded-lg opacity-80"
                />
              </div>

              {/* Based on Current Cycle */}
              <h3 className="text-gray-900 text-lg font-semibold mb-4">Based on your current cycle</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-pink-50 rounded-2xl p-4 relative overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mb-3">
                    <Droplets className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="text-gray-800 text-sm font-semibold mb-1 leading-tight">Blood clots during your period. What it means</h5>
                  <p className="text-gray-500 text-xs">5 min read</p>
                  
                </div>

                <div className="bg-red-50 rounded-2xl p-4 relative overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mb-3">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="text-gray-800 text-sm font-semibold mb-1 leading-tight">Blood clots during your period. What it means</h5>
                  <p className="text-gray-500 text-xs">9 min read</p>
                  
                  
                </div>
              </div>

              <button className="w-full text-center text-gray-600 text-sm font-medium py-3 hover:text-gray-800 transition-colors">
                See more
              </button>
            </div>

            {/* My Cycles Section */}
            <div className="bg-white px-4 pt-6 pb-8 mt-6 rounded-t-3xl">
              <h2 className="text-gray-900 text-lg font-semibold mb-6">My cycles</h2>
              
              {/* Cycle History */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <h3 className="text-gray-900 text-base font-semibold mb-4">Cycle history</h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">Current cycle: {getPeriodDay()} day</span>
                  </div>
                  <div className="text-gray-500 text-xs mb-2">Started Oct 19</div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>

                <button className="flex items-center justify-center w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-pink-600 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Log previous cycles
                </button>
              </div>

              {/* Cycle Summary */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <h3 className="text-gray-900 text-base font-semibold mb-4">Cycle summary</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Facilisi sagittis elementum lacus egestas vitae 
                  ut id tortor. Duis arcu orci aliquet diam montes.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">Previous cycle length</div>
                      <div className="text-gray-500 text-xs">24 days</div>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1 font-bold" />
                      <span className="text-yellow-600 text-xs font-bold">Abnormal</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">Previous period length</div>
                      <div className="text-gray-500 text-xs">24 days</div>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-xs font-medium">Normal</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">Cycle length variation</div>
                      <div className="text-gray-500 text-xs">24 days</div>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-600 text-xs font-medium">Irregular</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full text-center text-gray-600 text-sm font-medium py-3 mb-8 hover:text-gray-800 transition-colors">
                See more
              </button>

              {/* Bottom Navigation Indicator */}
              <div className="flex justify-center">
                <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Professional & Spacious with Full Calendar */}
        <div className="hidden lg:block">
          {/* Desktop Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white">
            <div className="max-w-7xl mx-auto px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold mb-3">Good morning, {user?.full_name || 'Beautiful'} ✨</h1>
                  <p className="text-pink-100 text-xl">Welcome to your women's health dashboard</p>
                </div>
                <Link
                  to="/account"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back to Account</span>
                </Link>
              </div>

              {/* Desktop Period Status */}
              <div className="bg-white bg-opacity-20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <div className="text-pink-100 text-lg mb-2">Current Status</div>
                    <div className="text-white text-3xl font-bold mb-2">Period Day {getPeriodDay()}</div>
                    <div className="text-pink-100 text-sm">Started October 19, 2024</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-pink-100 text-lg mb-4">Calendar Navigation</div>
                    <div className="flex items-center justify-center space-x-4">
                      <button 
                        onClick={goToPreviousMonth}
                        className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-40 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <span className="text-white font-semibold min-w-[120px]">{getMonthName(currentDate)}</span>
                      <button 
                        onClick={goToNextMonth}
                        className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-40 transition-all"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <button 
                      onClick={goToToday}
                      className="mt-2 text-pink-100 text-sm hover:text-white transition-colors"
                    >
                      Go to today
                    </button>
                  </div>

                  <div className="text-center lg:text-right">
                    <button className="bg-white bg-opacity-30 hover:bg-opacity-40 px-8 py-3 rounded-2xl text-white font-medium transition-all">
                      Edit period dates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Main Content */}
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Full Calendar Section for Desktop */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Period Calendar</h2>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="text-lg font-semibold text-gray-800 min-w-[140px] text-center">
                        {getMonthName(currentDate)}
                      </span>
                      <button 
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-3">
                        {day}
                      </div>
                    ))}
                    {(() => {
                      const year = currentDate.getFullYear();
                      const month = currentDate.getMonth();
                      const firstDay = new Date(year, month, 1);
                      const lastDay = new Date(year, month + 1, 0);
                      const startDate = new Date(firstDay);
                      startDate.setDate(startDate.getDate() - firstDay.getDay());
                      
                      const days = [];
                      for (let i = 0; i < 42; i++) {
                        const date = new Date(startDate);
                        date.setDate(date.getDate() + i);
                        days.push(date);
                      }
                      
                      return days.map((date, index) => {
                        const day = date.getDate();
                        const currentMonth = date.getMonth() === currentDate.getMonth();
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        
                        // Mock cycle phases for visual demo
                        let dayType = 'regular';
                        if (currentMonth) {
                          if (day <= 5) dayType = 'period';
                          else if (day >= 12 && day <= 16) dayType = 'fertile';
                          else if (day === 14) dayType = 'ovulation';
                        }
                        
                        const getDayStyle = () => {
                          const baseStyle = "w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer";
                          
                          if (isToday) {
                            return `${baseStyle} bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg scale-110`;
                          }
                          
                          if (isSelected && currentMonth) {
                            return `${baseStyle} bg-pink-100 text-pink-700 border-2 border-pink-500`;
                          }
                          
                          if (!currentMonth) {
                            return `${baseStyle} text-gray-300 hover:bg-gray-50`;
                          }
                          
                          switch (dayType) {
                            case 'period':
                              return `${baseStyle} bg-red-100 text-red-700 hover:bg-red-200`;
                            case 'fertile':
                              return `${baseStyle} bg-green-100 text-green-700 hover:bg-green-200`;
                            case 'ovulation':
                              return `${baseStyle} bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-md`;
                            default:
                              return `${baseStyle} text-gray-600 hover:bg-gray-100`;
                          }
                        };
                        
                        return (
                          <div
                            key={index}
                            className={getDayStyle()}
                            onClick={() => setSelectedDate(date)}
                          >
                            {day}
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Calendar Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-100 rounded-full border border-red-200"></div>
                      <span className="text-gray-600">Period days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full border border-green-200"></div>
                      <span className="text-gray-600">Fertile window</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
                      <span className="text-gray-600">Ovulation day</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-pink-100 rounded-full border-2 border-pink-500"></div>
                      <span className="text-gray-600">Selected date</span>
                    </div>
                  </div>
                </div>
                {/* Daily Insights */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My daily insights - today</h2>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 text-center cursor-pointer hover:shadow-md transition-all">
                      <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-pink-600 transition-colors">
                        <Plus className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-gray-800 font-semibold mb-2">Log your symptoms</h3>
                      <p className="text-gray-600 text-sm">Track how you're feeling today</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 text-center border border-pink-200 cursor-pointer hover:shadow-md transition-all">
                      <h3 className="text-gray-800 font-semibold mb-2">Today's change of pregnancy</h3>
                      <div className="text-4xl font-bold text-gray-900 mb-3">0%</div>
                      <button className="text-pink-600 font-medium hover:text-pink-700 transition-colors">See update</button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 text-center cursor-pointer hover:shadow-md transition-all">
                      <h3 className="text-gray-800 font-semibold mb-4">Overview symptoms</h3>
                      <div className="space-y-2">
                        <div className="text-gray-600 text-sm">Track patterns</div>
                        <div className="text-gray-600 text-sm">Get insights</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* During Period Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">During period</h2>
                  
                  {/* Search Bar */}
                  <div className="relative mb-8">
                    <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search articles, etc"
                      className="w-full bg-gray-50 rounded-2xl pl-12 pr-4 py-4 text-gray-600 border-0 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    />
                  </div>

                  {/* Coping with Cramps Card */}
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 mb-8 relative overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                    <div className="relative z-10">
                      <h3 className="text-white text-2xl font-bold mb-6">Coping with cramps</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-white">
                          <div className="w-2 h-2 bg-white rounded-full mr-4"></div>
                          Quick pain relief tips
                        </div>
                        <div className="flex items-center text-white">
                          <div className="w-2 h-2 bg-white rounded-full mr-4"></div>
                          What's causing your cramps
                        </div>
                        <div className="flex items-center text-white">
                          <div className="w-2 h-2 bg-white rounded-full mr-4"></div>
                          Quick pain relief tips
                        </div>
                      </div>
                      <button className="bg-white bg-opacity-30 hover:bg-opacity-40 px-8 py-3 rounded-2xl text-white font-medium transition-all">
                        manage the pain
                      </button>
                    </div>
                    {/* Enhanced Illustration - Woman with heating pad */}
                    <div className="absolute right-8 top-8 w-32 h-32">
                      <div className="relative w-full h-full">
                        {/* Woman silhouette */}
                        <div className="absolute inset-4 bg-white bg-opacity-15 rounded-full"></div>
                        {/* Head */}
                        <div className="absolute top-6 right-8 w-8 h-10 bg-pink-200 bg-opacity-40 rounded-full"></div>
                        {/* Body/torso */}
                        <div className="absolute top-14 right-6 w-12 h-8 bg-pink-300 bg-opacity-50 rounded-2xl"></div>
                        {/* Heating pad on stomach */}
                        <div className="absolute bottom-8 right-7 w-10 h-6 bg-yellow-300 bg-opacity-70 rounded-lg"></div>
                        {/* Comfort indicators */}
                        <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-300 bg-opacity-60 rounded-full"></div>
                        <div className="absolute bottom-2 right-10 w-1.5 h-1.5 bg-green-400 bg-opacity-70 rounded-full"></div>
                        {/* Heat waves */}
                        <div className="absolute bottom-6 right-9 w-4 h-0.5 bg-orange-300 bg-opacity-60 rounded"></div>
                        <div className="absolute bottom-5 right-8 w-3 h-0.5 bg-orange-400 bg-opacity-70 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Based on Current Cycle */}
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Based on your current cycle</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-pink-50 rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                        <Droplets className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-gray-800 font-semibold mb-2">Blood clots during your period. What it means</h4>
                      <p className="text-gray-500 text-sm mb-4">Understanding what's normal and when to be concerned</p>
                      <p className="text-gray-500 text-xs">5 min read</p>
                      
                      {/* Enhanced Medical Illustration */}
                      <div className="absolute right-4 top-4 w-24 h-24">
                        <div className="relative w-full h-full">
                          {/* Uterus anatomical illustration */}
                          <div className="absolute top-2 left-4 w-12 h-8 bg-pink-300 rounded-t-full opacity-50"></div>
                          <div className="absolute top-6 left-5 w-10 h-12 bg-pink-400 rounded-b-2xl opacity-40"></div>
                          {/* Fallopian tubes */}
                          <div className="absolute top-3 left-2 w-6 h-2 bg-pink-300 rounded-full opacity-60"></div>
                          <div className="absolute top-3 right-2 w-6 h-2 bg-pink-300 rounded-full opacity-60"></div>
                          {/* Blood flow indicators */}
                          <div className="absolute top-12 left-2 w-3 h-4 bg-red-400 rounded-full opacity-70"></div>
                          <div className="absolute top-14 right-3 w-2 h-3 bg-red-500 rounded-full opacity-80"></div>
                          <div className="absolute bottom-3 left-6 w-2 h-2 bg-red-600 rounded-full opacity-60"></div>
                          {/* Health monitoring symbols */}
                          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full opacity-50"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-gray-800 font-semibold mb-2">Blood clots during your period. What it means</h4>
                      <p className="text-gray-500 text-sm mb-4">Expert guidance on menstrual health and wellness</p>
                      <p className="text-gray-500 text-xs">9 min read</p>
                      
                      {/* Enhanced Medical Care Illustration */}
                      <div className="absolute right-4 top-4 w-24 h-24">
                        <div className="relative w-full h-full">
                          {/* Medical heart with pulse */}
                          <div className="absolute top-4 left-6 w-8 h-6 bg-red-300 rounded-t-full opacity-60"></div>
                          <div className="absolute top-6 left-7 w-6 h-6 bg-red-400 rounded-full opacity-70"></div>
                          {/* Pulse line */}
                          <div className="absolute top-12 left-2 w-16 h-0.5 bg-red-500 opacity-60"></div>
                          <div className="absolute top-11 left-6 w-0.5 h-2 bg-red-500 opacity-70"></div>
                          <div className="absolute top-10 left-8 w-0.5 h-4 bg-red-600 opacity-80"></div>
                          <div className="absolute top-11 left-10 w-0.5 h-2 bg-red-500 opacity-70"></div>
                          {/* Medical cross */}
                          <div className="absolute bottom-4 left-2 w-4 h-1 bg-red-500 opacity-60"></div>
                          <div className="absolute bottom-2 left-3 w-1 h-4 bg-red-500 opacity-60"></div>
                          {/* Care indicators */}
                          <div className="absolute bottom-1 right-2 w-6 h-4 bg-red-200 rounded-t-full opacity-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button className="text-gray-600 font-medium hover:text-gray-800 transition-colors">
                      See more articles
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
                {/* Cycle Summary */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">My cycles</h3>
                  
                  {/* Cycle History */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h4 className="text-gray-900 font-semibold mb-4">Cycle history</h4>
                    
                    <div className="mb-4">
                      <div className="text-gray-600 text-sm mb-1">Current cycle: {getPeriodDay()} day</div>
                      <div className="text-gray-500 text-xs mb-3">Started Oct 19</div>
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>

                    <button className="flex items-center justify-center w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-medium transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Log previous cycles
                    </button>
                  </div>

                  {/* Cycle Summary */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-gray-900 font-semibold mb-4">Cycle summary</h4>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur. Facilisi sagittis elementum lacus egestas vitae 
                      ut id tortor. Duis arcu orci aliquet diam montes.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-gray-600 text-sm font-medium">Previous cycle length</div>
                          <div className="text-gray-500 text-xs">24 days</div>
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-600 text-xs font-medium">Abnormal</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-gray-600 text-sm font-medium">Previous period length</div>
                          <div className="text-gray-500 text-xs">24 days</div>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600 text-xs font-medium">Normal</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-gray-600 text-sm font-medium">Cycle length variation</div>
                          <div className="text-gray-500 text-xs">24 days</div>
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-600 text-xs font-medium">Irregular</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                  
                  <div className="space-y-4">
                    <Link
                      to="/account/womens-health/daily-log"
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all"
                    >
                      <Plus className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Log Today's Health</div>
                        <div className="text-sm opacity-90">Track symptoms & mood</div>
                      </div>
                    </Link>

                    <Link
                      to="/account/womens-health/fertility"
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl hover:shadow-lg transition-all"
                    >
                      <Activity className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Fertility Tracking</div>
                        <div className="text-sm opacity-90">Monitor ovulation</div>
                      </div>
                    </Link>

                    <Link
                      to="/account/womens-health/insights"
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:shadow-lg transition-all"
                    >
                      <BarChart3 className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Health Insights</div>
                        <div className="text-sm opacity-90">View trends & patterns</div>
                      </div>
                    </Link>

                    <Link
                      to="/account/womens-health/settings"
                      className="flex items-center space-x-4 p-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl transition-all"
                    >
                      <Settings className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Settings</div>
                        <div className="text-sm text-gray-600">Manage preferences</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WomensHealthGuard>
  );
};

export default WomensHealthDashboardEnhanced;