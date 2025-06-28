import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { womensHealthApi } from '../../../services/womensHealthApi';
import WomensHealthGuard from '../../../components/womenshealth/WomensHealthGuard';
import { AlertCircle, Check } from 'lucide-react';

interface DailyLogData {
  date: string;
  symptoms: string[];
  mood_score: number;
  energy_level: number;
  sleep_hours: number;
  sleep_quality: number;
  exercise_minutes: number;
  water_intake_liters: number;
  notes: string;
  // High priority additional fields
  menstrual_flow: string;
  cramp_severity: string;
  stress_level: number;
  anxiety_level: string;
  sleep_bedtime: string;
  sleep_wake_time: string;
  exercise_intensity: string;
  caffeine_intake_mg: number;
}

const DailyHealthLog: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Get initial date from URL or use current date
  const getInitialDate = () => {
    const dateParam = searchParams.get('date');
    console.log('🔍 URL search params:', window.location.search);
    console.log('🔍 Date param from URL:', dateParam);
    return dateParam || new Date().toISOString().split('T')[0];
  };
  
  const [logData, setLogData] = useState<DailyLogData>({
    date: getInitialDate(),
    symptoms: [],
    mood_score: 5,
    energy_level: 5,
    sleep_hours: 8,
    sleep_quality: 3,
    exercise_minutes: 0,
    water_intake_liters: 2,
    notes: '',
    // High priority additional fields
    menstrual_flow: 'none',
    cramp_severity: 'mild',
    stress_level: 3,
    anxiety_level: 'none',
    sleep_bedtime: '23:00',
    sleep_wake_time: '07:00',
    exercise_intensity: 'moderate',
    caffeine_intake_mg: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState({
    womensHealth: false,
    mentalHealth: false,
    detailedSleep: false,
    detailedExercise: false
  });

  // Set initial date from URL parameter if provided
  useEffect(() => {
    console.log('🔗 Daily Health Log useEffect running...');
    console.log('🔗 Full URL:', window.location.href);
    console.log('🔗 Search params:', window.location.search);
    
    const dateParam = searchParams.get('date');
    
    // Fallback: parse URL manually if searchParams fails
    const urlParams = new URLSearchParams(window.location.search);
    const fallbackDate = urlParams.get('date');
    
    console.log('📅 Date from searchParams:', dateParam);
    console.log('📅 Date from manual parse:', fallbackDate);
    
    const finalDate = dateParam || fallbackDate;
    
    if (finalDate && finalDate !== logData.date) {
      console.log('✅ Updating log data date to:', finalDate);
      setLogData(prev => ({ ...prev, date: finalDate }));
    } else {
      console.log('⚠️ No date parameter found or same as current');
    }
  }, [searchParams]);

  // Debug: Track when logData.date changes
  useEffect(() => {
    console.log('📊 Log data date updated to:', logData.date);
  }, [logData.date]);

  const availableSymptoms = [
    'cramps', 'bloating', 'mood_swings', 'headache', 'fatigue', 
    'breast_tenderness', 'back_pain', 'nausea', 'acne', 'food_cravings',
    'irritability', 'anxiety', 'depression', 'insomnia'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setLogData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submission started');
    console.log('📊 Current logData:', logData);
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Convert form data to API format with proper number validation
      const safeNumber = (value: any, defaultValue: number = 0) => {
        const num = Number(value);
        return isNaN(num) ? defaultValue : num;
      };
      
      const apiData = {
        date: logData.date,
        symptoms: logData.symptoms,
        mood: logData.mood_score === 1 ? 'poor' : 
              logData.mood_score === 2 ? 'low' :
              logData.mood_score === 3 ? 'neutral' :
              logData.mood_score === 4 ? 'good' : 'excellent',
        energy_level: logData.energy_level === 1 ? 'very_low' :
                     logData.energy_level === 2 ? 'low' :
                     logData.energy_level === 3 ? 'normal' :
                     logData.energy_level === 4 ? 'high' : 'very_high',
        sleep_duration_hours: safeNumber(logData.sleep_hours, 8),
        sleep_quality: logData.sleep_quality === 1 ? 'very_poor' :
                      logData.sleep_quality === 2 ? 'poor' :
                      logData.sleep_quality === 3 ? 'fair' :
                      logData.sleep_quality === 4 ? 'good' : 'excellent',
        exercise_performed: logData.exercise_minutes > 0,
        exercise_duration_minutes: safeNumber(logData.exercise_minutes, 0),
        water_intake_liters: safeNumber(logData.water_intake_liters, 2),
        water_goal_met: safeNumber(logData.water_intake_liters, 2) >= 2,
        
        // Women's health specific fields
        menstrual_flow: logData.menstrual_flow,
        menstrual_cramps: logData.symptoms.includes('cramps'),
        cramp_severity: logData.cramp_severity,
        breast_tenderness: logData.symptoms.includes('breast_tenderness'),
        
        // Mental health fields
        stress_level: logData.stress_level === 1 ? 'very_low' :
                     logData.stress_level === 2 ? 'low' :
                     logData.stress_level === 3 ? 'moderate' :
                     logData.stress_level === 4 ? 'high' : 'very_high',
        anxiety_level: logData.anxiety_level,
        
        // Detailed sleep fields
        sleep_bedtime: logData.sleep_bedtime,
        sleep_wake_time: logData.sleep_wake_time,
        
        // Detailed exercise fields
        exercise_intensity: logData.exercise_intensity,
        
        // Caffeine intake
        caffeine_intake_mg: safeNumber(logData.caffeine_intake_mg, 0),
        
        // Convert symptoms to backend format
        headache: logData.symptoms.includes('headache'),
        nausea: logData.symptoms.includes('nausea'),
        fatigue: logData.symptoms.includes('fatigue'),
        
        daily_notes: logData.notes
      };

      console.log('🔄 Converted API data:', apiData);
      console.log('📝 Submitting symptoms:', logData.symptoms);
      console.log('📅 Submitting for date:', apiData.date);
      console.log('🔢 Numeric values being sent:', {
        sleep_duration_hours: apiData.sleep_duration_hours,
        exercise_duration_minutes: apiData.exercise_duration_minutes,
        water_intake_liters: apiData.water_intake_liters,
        caffeine_intake_mg: apiData.caffeine_intake_mg
      });
      
      console.log('🌐 About to call womensHealthApi.createHealthLog...');
      const response = await womensHealthApi.createHealthLog(apiData);
      console.log('✅ API call completed, response:', response);
      
      if (response.success) {
        console.log('🎉 Success! Setting status to success');
        setSubmitStatus('success');
        const action = response.action || 'saved';
        const actionText = action === 'created' ? 'created' : action === 'updated' ? 'updated' : 'saved';
        setSubmitMessage(`Daily health log ${actionText} successfully!`);
        console.log(`✅ Success message set: ${actionText}`);
        
        // Reset form after successful submission
        setTimeout(() => {
          setLogData({
            date: new Date().toISOString().split('T')[0],
            symptoms: [],
            mood_score: 5,
            energy_level: 5,
            sleep_hours: 8,
            sleep_quality: 3,
            exercise_minutes: 0,
            water_intake_liters: 2,
            notes: '',
            // Reset additional fields
            menstrual_flow: 'none',
            cramp_severity: 'mild',
            stress_level: 3,
            anxiety_level: 'none',
            sleep_bedtime: '23:00',
            sleep_wake_time: '07:00',
            exercise_intensity: 'moderate',
            caffeine_intake_mg: 0
          });
          setSubmitStatus('idle');
        }, 2000);
      } else {
        console.log('❌ API returned success: false');
        throw new Error(response.message || 'Failed to save log');
      }
    } catch (error: any) {
      console.error('💥 Exception in handleSubmit:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        response: error.response,
        stack: error.stack
      });
      setSubmitStatus('error');
      setSubmitMessage(error.response?.data?.message || error.message || 'Failed to save daily log. Please try again.');
    } finally {
      console.log('🏁 Form submission finished, setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  const formatSymptomName = (symptom: string) => {
    return symptom.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <WomensHealthGuard>
      <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Daily Health Log</h1>
              <p className="text-purple-100 text-lg">Track your daily health and wellness</p>
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
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Date Selection */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Date</h2>
            <input
              type="date"
              value={logData.date}
              onChange={(e) => setLogData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Symptoms */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Symptoms</h2>
            <p className="text-gray-600 mb-4">Select any symptoms you're experiencing today</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableSymptoms.map((symptom) => (
                <label
                  key={symptom}
                  className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                    logData.symptoms.includes(symptom)
                      ? 'bg-purple-50 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={logData.symptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{formatSymptomName(symptom)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mood and Energy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Mood</h2>
              <p className="text-gray-600 mb-4">Rate your overall mood (1-5)</p>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={logData.mood_score}
                  onChange={(e) => setLogData(prev => ({ ...prev, mood_score: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>😢 Poor</span>
                  <span className="font-bold text-purple-600">{logData.mood_score}</span>
                  <span>😊 Excellent</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Energy Level</h2>
              <p className="text-gray-600 mb-4">Rate your energy level (1-5)</p>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={logData.energy_level}
                  onChange={(e) => setLogData(prev => ({ ...prev, energy_level: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>🔋 Very Low</span>
                  <span className="font-bold text-purple-600">{logData.energy_level}</span>
                  <span>⚡ Very High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sleep */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Sleep Duration</h2>
              <p className="text-gray-600 mb-4">Hours of sleep last night</p>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={logData.sleep_hours}
                onChange={(e) => setLogData(prev => ({ ...prev, sleep_hours: parseFloat(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Sleep Quality</h2>
              <p className="text-gray-600 mb-4">Rate your sleep quality (1-5)</p>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={logData.sleep_quality}
                  onChange={(e) => setLogData(prev => ({ ...prev, sleep_quality: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Poor</span>
                  <span className="font-bold text-purple-600">{logData.sleep_quality}</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise and Water */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Exercise</h2>
              <p className="text-gray-600 mb-4">Minutes of exercise today</p>
              <input
                type="number"
                min="0"
                max="1440"
                value={logData.exercise_minutes}
                onChange={(e) => setLogData(prev => ({ ...prev, exercise_minutes: parseInt(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Water Intake</h2>
              <p className="text-gray-600 mb-4">Liters of water consumed</p>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={logData.water_intake_liters}
                onChange={(e) => setLogData(prev => ({ ...prev, water_intake_liters: parseFloat(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Expandable Advanced Sections */}
          
          {/* Women's Health Details */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <button
              type="button"
              onClick={() => setExpandedSections(prev => ({ ...prev, womensHealth: !prev.womensHealth }))}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-xl font-bold">Women's Health Details</h2>
              <svg 
                className={`w-5 h-5 transition-transform ${expandedSections.womensHealth ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections.womensHealth && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Menstrual Flow</label>
                  <select
                    value={logData.menstrual_flow}
                    onChange={(e) => setLogData(prev => ({ ...prev, menstrual_flow: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none">None</option>
                    <option value="spotting">Spotting</option>
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="heavy">Heavy</option>
                    <option value="very_heavy">Very Heavy</option>
                  </select>
                </div>
                
                {(logData.symptoms.includes('cramps') || logData.menstrual_flow !== 'none') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cramp Severity</label>
                    <select
                      value={logData.cramp_severity}
                      onChange={(e) => setLogData(prev => ({ ...prev, cramp_severity: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mental Health Details */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <button
              type="button"
              onClick={() => setExpandedSections(prev => ({ ...prev, mentalHealth: !prev.mentalHealth }))}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-xl font-bold">Mental Health & Stress</h2>
              <svg 
                className={`w-5 h-5 transition-transform ${expandedSections.mentalHealth ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections.mentalHealth && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stress Level (1-5)</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={logData.stress_level}
                    onChange={(e) => setLogData(prev => ({ ...prev, stress_level: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Very Low</span>
                    <span className="font-bold text-purple-600">{logData.stress_level}</span>
                    <span>Very High</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Anxiety Level</label>
                  <select
                    value={logData.anxiety_level}
                    onChange={(e) => setLogData(prev => ({ ...prev, anxiety_level: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none">None</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Sleep Tracking */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <button
              type="button"
              onClick={() => setExpandedSections(prev => ({ ...prev, detailedSleep: !prev.detailedSleep }))}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-xl font-bold">Detailed Sleep Tracking</h2>
              <svg 
                className={`w-5 h-5 transition-transform ${expandedSections.detailedSleep ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections.detailedSleep && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedtime</label>
                  <input
                    type="time"
                    value={logData.sleep_bedtime}
                    onChange={(e) => setLogData(prev => ({ ...prev, sleep_bedtime: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wake Time</label>
                  <input
                    type="time"
                    value={logData.sleep_wake_time}
                    onChange={(e) => setLogData(prev => ({ ...prev, sleep_wake_time: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Detailed Exercise & Lifestyle */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <button
              type="button"
              onClick={() => setExpandedSections(prev => ({ ...prev, detailedExercise: !prev.detailedExercise }))}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-xl font-bold">Exercise & Lifestyle Details</h2>
              <svg 
                className={`w-5 h-5 transition-transform ${expandedSections.detailedExercise ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections.detailedExercise && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Intensity</label>
                  <select
                    value={logData.exercise_intensity}
                    onChange={(e) => setLogData(prev => ({ ...prev, exercise_intensity: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="vigorous">Vigorous</option>
                    <option value="high">High Intensity</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caffeine Intake (mg)</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={logData.caffeine_intake_mg}
                    onChange={(e) => setLogData(prev => ({ ...prev, caffeine_intake_mg: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 95mg for 1 cup of coffee"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Reference: Coffee (95mg), Tea (40mg), Energy drink (80mg)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Additional Notes</h2>
            <p className="text-gray-600 mb-4">Any other observations about your health today</p>
            <textarea
              value={logData.notes}
              onChange={(e) => setLogData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Started new medication, had stressful day at work, etc."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center space-x-4">
            <Link
              to="/account/womens-health"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={(e) => {
                console.log('🖱️ Submit button clicked!');
                console.log('🔍 Event:', e);
                console.log('📊 Current form data:', logData);
                console.log('🔒 isSubmitting:', isSubmitting);
                // Let the form submission continue normally
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Daily Log'
              )}
            </button>
          </div>
        </form>

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

export default DailyHealthLog;