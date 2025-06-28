import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { womensHealthApi, PregnancyRecord, WomensHealthProfile } from '../../../services/womensHealthApi';
import { AlertCircle, Loader, Check } from 'lucide-react';

// Import the WomensHealthGuard component
import WomensHealthGuard from '../../../components/womenshealth/WomensHealthGuard';

interface PregnancyData {
  pregnancy_week: number;
  weight_kg: number;
  belly_circumference_cm: number;
  baby_kicks_count: number;
  symptoms: string[];
  mood_rating: number;
  prenatal_vitamins_taken: boolean;
  exercise_minutes: number;
  notes: string;
}

interface WeeklyInfo {
  baby_size: string;
  baby_length_cm: number;
  baby_weight_g: number;
  developments: string[];
  mom_changes: string[];
  tips: string[];
}

const PregnancyTracker: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [profile, setProfile] = useState<WomensHealthProfile | null>(null);
  const [pregnancyRecord, setPregnancyRecord] = useState<PregnancyRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  
  const [trackingData, setTrackingData] = useState<PregnancyData>({
    pregnancy_week: 0,
    weight_kg: 0,
    belly_circumference_cm: 0,
    baby_kicks_count: 0,
    symptoms: [],
    mood_rating: 5,
    prenatal_vitamins_taken: false,
    exercise_minutes: 0,
    notes: ''
  });

  useEffect(() => {
    loadPregnancyData();
  }, []);

  const loadPregnancyData = async () => {
    try {
      setError('');
      const [profileResponse, pregnancyResponse] = await Promise.all([
        womensHealthApi.getProfile(),
        womensHealthApi.getPregnancyRecord()
      ]);

      if (profileResponse.success) {
        setProfile(profileResponse.profile);
        const week = profileResponse.profile.pregnancy_week || 0;
        setCurrentWeek(week);
        setTrackingData(prev => ({ ...prev, pregnancy_week: week }));
      }

      if (pregnancyResponse.success) {
        setPregnancyRecord(pregnancyResponse.pregnancy_record);
        
        // Initialize tracking data with latest pregnancy data
        if (pregnancyResponse.pregnancy_record) {
          setTrackingData(prev => ({
            ...prev,
            weight_kg: pregnancyResponse.pregnancy_record.current_weight_kg || 0,
            belly_circumference_cm: pregnancyResponse.pregnancy_record.belly_circumference_cm || 0,
            mood_rating: pregnancyResponse.pregnancy_record.mood_rating || 5,
            prenatal_vitamins_taken: pregnancyResponse.pregnancy_record.prenatal_vitamins_taken || false,
            exercise_minutes: pregnancyResponse.pregnancy_record.exercise_minutes || 0,
            notes: pregnancyResponse.pregnancy_record.notes || ''
          }));
        }
      }

      if (!profileResponse.success && !pregnancyResponse.success) {
        setError('Failed to load pregnancy data');
      }
    } catch (error: any) {
      console.error('Error loading pregnancy data:', error);
      setError(error.response?.data?.message || 'Failed to load pregnancy data');
    } finally {
      setIsLoading(false);
    }
  };

  const pregnancySymptoms = [
    'morning_sickness', 'fatigue', 'back_pain', 'heartburn', 'swollen_feet',
    'frequent_urination', 'mood_swings', 'breast_tenderness', 'constipation',
    'headaches', 'leg_cramps', 'shortness_of_breath', 'round_ligament_pain'
  ];

  // Mock weekly information - in real app, this would come from a comprehensive database
  const getWeeklyInfo = (week: number): WeeklyInfo => {
    const weeklyData: { [key: number]: WeeklyInfo } = {
      24: {
        baby_size: "ear of corn",
        baby_length_cm: 30,
        baby_weight_g: 600,
        developments: ["Hearing is developing", "Fat accumulation begins", "Lung development continues"],
        mom_changes: ["Uterus is about the size of a soccer ball", "You may feel more balanced", "Glucose screening test"],
        tips: ["Stay hydrated", "Continue prenatal vitamins", "Monitor baby movements"]
      },
      25: {
        baby_size: "cauliflower",
        baby_length_cm: 34,
        baby_weight_g: 660,
        developments: ["Hair color developing", "Wrinkled skin filling out", "Responding to sounds"],
        mom_changes: ["May experience heartburn", "Skin changes possible", "Increased blood volume"],
        tips: ["Eat smaller, frequent meals", "Sleep on your side", "Practice relaxation techniques"]
      }
    };
    
    return weeklyData[week] || weeklyData[24];
  };

  const weeklyInfo = getWeeklyInfo(currentWeek);

  const handleSymptomToggle = (symptom: string) => {
    setTrackingData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleKickCountIncrement = () => {
    setTrackingData(prev => ({
      ...prev,
      baby_kicks_count: prev.baby_kicks_count + 1
    }));
  };

  const resetKickCounter = () => {
    setTrackingData(prev => ({
      ...prev,
      baby_kicks_count: 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Convert form data to API format
      const apiData = {
        pregnancy_week: trackingData.pregnancy_week,
        current_weight_kg: trackingData.weight_kg,
        belly_circumference_cm: trackingData.belly_circumference_cm,
        baby_kicks_count: trackingData.baby_kicks_count,
        symptoms_experienced: trackingData.symptoms,
        mood_rating: trackingData.mood_rating,
        prenatal_vitamins_taken: trackingData.prenatal_vitamins_taken,
        exercise_minutes: trackingData.exercise_minutes,
        exercise_performed: trackingData.exercise_minutes > 0,
        notes: trackingData.notes,
        data_completeness_score: 90 // Calculate based on filled fields
      };

      const response = await womensHealthApi.createPregnancyRecord(apiData);
      
      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage('Pregnancy tracking data saved successfully!');
        
        // Refresh pregnancy data to show updated values
        loadPregnancyData();
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to save pregnancy data');
      }
    } catch (error: any) {
      console.error('Error saving pregnancy data:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.response?.data?.message || 'Failed to save pregnancy data. Please try again.');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSymptomName = (symptom: string) => {
    return symptom.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getProgressPercentage = () => {
    return Math.min((currentWeek / 40) * 100, 100);
  };

  if (isLoading) {
    return (
      <WomensHealthGuard>
        <div className="bg-white min-h-screen">
          <div className="bg-gradient-to-r from-green-600 to-blue-500 text-white py-8">
            <div className="phb-container">
              <div className="animate-pulse">
                <div className="h-8 bg-white bg-opacity-20 rounded w-64 mb-4"></div>
                <div className="h-6 bg-white bg-opacity-20 rounded w-96"></div>
              </div>
            </div>
          </div>
          <div className="phb-container py-8">
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-green-600" />
              <span className="ml-2 text-gray-600">Loading pregnancy data...</span>
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
          <div className="bg-gradient-to-r from-green-600 to-blue-500 text-white py-8">
            <div className="phb-container">
              <h1 className="text-3xl font-bold mb-2">Pregnancy Tracker</h1>
              <p className="text-green-100 text-lg">Track your pregnancy journey</p>
            </div>
          </div>
          <div className="phb-container py-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Failed to Load Pregnancy Data</h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={loadPregnancyData}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium"
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
      <div className="bg-gradient-to-r from-green-600 to-blue-500 text-white py-8">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Pregnancy Tracker</h1>
              <p className="text-green-100 text-lg">Week {currentWeek} of your pregnancy journey</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Pregnancy Progress</h2>
              <span className="text-sm text-gray-600">Week {currentWeek} of 40</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {Math.round(getProgressPercentage())}% complete • Approximately {40 - currentWeek} weeks remaining
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Baby Development */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Your Baby This Week
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-md">
                    <p className="text-green-800 font-semibold">Size: {weeklyInfo.baby_size}</p>
                    <p className="text-green-700 text-sm">
                      Length: {weeklyInfo.baby_length_cm} cm • Weight: {weeklyInfo.baby_weight_g} grams
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">This Week's Developments</h3>
                    <ul className="space-y-1">
                      {weeklyInfo.developments.map((development, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {development}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Kick Counter */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4">Baby Kick Counter</h2>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {trackingData.baby_kicks_count}
                  </div>
                  <p className="text-gray-600 mb-4">kicks counted today</p>
                  <div className="space-x-3">
                    <button
                      onClick={handleKickCountIncrement}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
                    >
                      Count Kick
                    </button>
                    <button
                      onClick={resetKickCounter}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-md transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Aim for 10 movements in 2 hours when baby is active
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                {/* Physical Measurements */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Physical Tracking</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={trackingData.weight_kg}
                        onChange={(e) => setTrackingData(prev => ({ 
                          ...prev, 
                          weight_kg: parseFloat(e.target.value) 
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Belly Circumference (cm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={trackingData.belly_circumference_cm}
                        onChange={(e) => setTrackingData(prev => ({ 
                          ...prev, 
                          belly_circumference_cm: parseFloat(e.target.value) 
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Symptoms Today</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {pregnancySymptoms.map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                          trackingData.symptoms.includes(symptom)
                            ? 'bg-green-50 border-green-300 text-green-700'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={trackingData.symptoms.includes(symptom)}
                          onChange={() => handleSymptomToggle(symptom)}
                          className="sr-only"
                        />
                        <span className="font-medium">{formatSymptomName(symptom)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Wellness */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Wellness</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overall Mood (1-10)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={trackingData.mood_rating}
                        onChange={(e) => setTrackingData(prev => ({ 
                          ...prev, 
                          mood_rating: parseInt(e.target.value) 
                        }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>Low</span>
                        <span className="font-bold text-green-600">{trackingData.mood_rating}</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exercise Minutes
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={trackingData.exercise_minutes}
                        onChange={(e) => setTrackingData(prev => ({ 
                          ...prev, 
                          exercise_minutes: parseInt(e.target.value) 
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="prenatal-vitamins"
                        checked={trackingData.prenatal_vitamins_taken}
                        onChange={(e) => setTrackingData(prev => ({ 
                          ...prev, 
                          prenatal_vitamins_taken: e.target.checked 
                        }))}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="prenatal-vitamins" className="ml-2 text-sm text-gray-700">
                        Took prenatal vitamins today
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Notes</h2>
                  <textarea
                    value={trackingData.notes}
                    onChange={(e) => setTrackingData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any additional notes about today..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-md hover:from-green-700 hover:to-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Today\'s Tracking'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Changes for You */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Changes for You This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">What's Happening</h3>
                <ul className="space-y-1">
                  {weeklyInfo.mom_changes.map((change, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tips for This Week</h3>
                <ul className="space-y-1">
                  {weeklyInfo.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
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
      </div>
    </WomensHealthGuard>
  );
};

export default PregnancyTracker;