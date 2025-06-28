import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DailyLogData {
  date: string;
  symptoms: string[];
  mood_score: number;
  energy_level: number;
  sleep_hours: number;
  sleep_quality: number;
  exercise_minutes: number;
  water_intake_glasses: number;
  notes: string;
}

interface MoodOption {
  value: number;
  emoji: string;
  label: string;
  color: string;
}

const DailyHealthLogEnhanced: React.FC = () => {
  const [logData, setLogData] = useState<DailyLogData>({
    date: new Date().toISOString().split('T')[0],
    symptoms: [],
    mood_score: 5,
    energy_level: 5,
    sleep_hours: 8,
    sleep_quality: 3,
    exercise_minutes: 0,
    water_intake_glasses: 0,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const availableSymptoms = [
    { id: 'cramps', name: 'Cramps', emoji: '😣', category: 'menstrual' },
    { id: 'bloating', name: 'Bloating', emoji: '🎈', category: 'digestive' },
    { id: 'mood_swings', name: 'Mood Swings', emoji: '🎭', category: 'emotional' },
    { id: 'headache', name: 'Headache', emoji: '🤕', category: 'pain' },
    { id: 'fatigue', name: 'Fatigue', emoji: '😴', category: 'energy' },
    { id: 'breast_tenderness', name: 'Breast Tenderness', emoji: '💗', category: 'menstrual' },
    { id: 'back_pain', name: 'Back Pain', emoji: '🦴', category: 'pain' },
    { id: 'nausea', name: 'Nausea', emoji: '🤢', category: 'digestive' },
    { id: 'acne', name: 'Acne', emoji: '🔴', category: 'skin' },
    { id: 'food_cravings', name: 'Food Cravings', emoji: '🍫', category: 'appetite' },
    { id: 'irritability', name: 'Irritability', emoji: '😤', category: 'emotional' },
    { id: 'anxiety', name: 'Anxiety', emoji: '😰', category: 'emotional' },
  ];

  const moodOptions: MoodOption[] = [
    { value: 1, emoji: '😢', label: 'Terrible', color: 'bg-red-500' },
    { value: 2, emoji: '😞', label: 'Bad', color: 'bg-red-400' },
    { value: 3, emoji: '😐', label: 'Okay', color: 'bg-yellow-400' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'bg-green-400' },
    { value: 5, emoji: '😊', label: 'Great', color: 'bg-green-500' },
  ];

  const energyOptions: MoodOption[] = [
    { value: 1, emoji: '🔋', label: 'Exhausted', color: 'bg-red-500' },
    { value: 2, emoji: '😴', label: 'Tired', color: 'bg-yellow-400' },
    { value: 3, emoji: '😐', label: 'Normal', color: 'bg-blue-400' },
    { value: 4, emoji: '😊', label: 'Energetic', color: 'bg-green-400' },
    { value: 5, emoji: '⚡', label: 'Supercharged', color: 'bg-green-500' },
  ];

  const handleSymptomToggle = (symptomId: string) => {
    setLogData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const handleWaterIncrement = () => {
    setLogData(prev => ({
      ...prev,
      water_intake_glasses: prev.water_intake_glasses + 1
    }));
  };

  const handleWaterDecrement = () => {
    setLogData(prev => ({
      ...prev,
      water_intake_glasses: Math.max(0, prev.water_intake_glasses - 1)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const getSymptomsByCategory = (category: string) => {
    return availableSymptoms.filter(symptom => symptom.category === category);
  };

  const categories = ['menstrual', 'emotional', 'pain', 'digestive', 'energy', 'skin', 'appetite'];

  const WaterGlassVisualization: React.FC<{ glasses: number; target: number }> = ({ glasses, target }) => {
    return (
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: target }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-10 rounded-b-full border-2 flex items-end justify-center transition-all duration-300 ${
              i < glasses 
                ? 'border-blue-400 bg-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            {i < glasses && (
              <div className="w-6 h-6 bg-blue-400 rounded-b-full animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in-right">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            Daily health log saved successfully!
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">Daily Health Log</h1>
              <p className="text-purple-100 text-xl">How are you feeling today? 💝</p>
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
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Date Selection */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">📅</span>
              Choose Date
            </h2>
            <input
              type="date"
              value={logData.date}
              onChange={(e) => setLogData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Mood & Energy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mood */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">😊</span>
                Mood
              </h2>
              <p className="text-gray-600 mb-6">How's your emotional state today?</p>
              <div className="space-y-4">
                {moodOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      logData.mood_score === option.value
                        ? 'bg-purple-50 border-2 border-purple-300 transform scale-105'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mood"
                      value={option.value}
                      checked={logData.mood_score === option.value}
                      onChange={(e) => setLogData(prev => ({ ...prev, mood_score: parseInt(e.target.value) }))}
                      className="sr-only"
                    />
                    <span className="text-3xl mr-4">{option.emoji}</span>
                    <div>
                      <span className="font-semibold text-lg">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">⚡</span>
                Energy Level
              </h2>
              <p className="text-gray-600 mb-6">How energetic do you feel?</p>
              <div className="space-y-4">
                {energyOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      logData.energy_level === option.value
                        ? 'bg-blue-50 border-2 border-blue-300 transform scale-105'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="energy"
                      value={option.value}
                      checked={logData.energy_level === option.value}
                      onChange={(e) => setLogData(prev => ({ ...prev, energy_level: parseInt(e.target.value) }))}
                      className="sr-only"
                    />
                    <span className="text-3xl mr-4">{option.emoji}</span>
                    <div>
                      <span className="font-semibold text-lg">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Water Intake */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">💧</span>
              Water Intake
            </h2>
            <p className="text-gray-600 mb-6">How many glasses of water have you had today?</p>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <WaterGlassVisualization glasses={logData.water_intake_glasses} target={8} />
                <p className="text-sm text-gray-600 mt-2">{logData.water_intake_glasses}/8 glasses</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleWaterDecrement}
                  className="w-12 h-12 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                  </svg>
                </button>
                
                <span className="text-3xl font-bold text-blue-600 min-w-[3rem] text-center">
                  {logData.water_intake_glasses}
                </span>
                
                <button
                  type="button"
                  onClick={handleWaterIncrement}
                  className="w-12 h-12 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Symptoms by Category */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">🩺</span>
              Symptoms
            </h2>
            <p className="text-gray-600 mb-6">Select any symptoms you're experiencing today</p>
            
            <div className="space-y-6">
              {categories.map(category => {
                const categorySymptoms = getSymptomsByCategory(category);
                if (categorySymptoms.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3 text-gray-800 capitalize">
                      {category.replace('_', ' ')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {categorySymptoms.map((symptom) => (
                        <label
                          key={symptom.id}
                          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            logData.symptoms.includes(symptom.id)
                              ? 'bg-purple-50 border-2 border-purple-300 transform scale-105'
                              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={logData.symptoms.includes(symptom.id)}
                            onChange={() => handleSymptomToggle(symptom.id)}
                            className="sr-only"
                          />
                          <span className="text-2xl mr-3">{symptom.emoji}</span>
                          <span className="font-medium text-sm">{symptom.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sleep & Exercise */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">😴</span>
                Sleep
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Hours of sleep last night
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={logData.sleep_hours}
                    onChange={(e) => setLogData(prev => ({ ...prev, sleep_hours: parseFloat(e.target.value) }))}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Sleep quality (1-5)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setLogData(prev => ({ ...prev, sleep_quality: rating }))}
                        className={`w-12 h-12 rounded-full transition-all duration-300 ${
                          logData.sleep_quality >= rating
                            ? 'bg-yellow-400 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🏃‍♀️</span>
                Exercise
              </h2>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Minutes of exercise today
                </label>
                <input
                  type="number"
                  min="0"
                  max="1440"
                  value={logData.exercise_minutes}
                  onChange={(e) => setLogData(prev => ({ ...prev, exercise_minutes: parseInt(e.target.value) }))}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[15, 30, 60].map(minutes => (
                    <button
                      key={minutes}
                      type="button"
                      onClick={() => setLogData(prev => ({ ...prev, exercise_minutes: minutes }))}
                      className="py-2 px-4 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-colors"
                    >
                      {minutes}min
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">📝</span>
              Additional Notes
            </h2>
            <p className="text-gray-600 mb-4">Any other observations about your health today?</p>
            <textarea
              value={logData.notes}
              onChange={(e) => setLogData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="e.g., Started new medication, had stressful day at work, felt particularly energetic after yoga..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center space-x-6">
            <Link
              to="/account/womens-health"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                isSubmitting ? 'animate-pulse' : 'hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Daily Log ✨'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailyHealthLogEnhanced;