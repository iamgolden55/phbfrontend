import React, { useState } from 'react';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'water' | 'mood' | 'exercise' | 'symptoms';
  onSave: (data: any) => void;
}

const QuickActionModal: React.FC<QuickActionModalProps> = ({ isOpen, onClose, type, onSave }) => {
  const [value, setValue] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    onSave({ type, value, timestamp: new Date() });
    setIsSubmitting(false);
    onClose();
  };

  const renderContent = () => {
    switch (type) {
      case 'water':
        return (
          <WaterQuickAction 
            glasses={value || 0} 
            onChange={setValue}
          />
        );
      case 'mood':
        return (
          <MoodQuickAction 
            mood={value || 3} 
            onChange={setValue}
          />
        );
      case 'exercise':
        return (
          <ExerciseQuickAction 
            minutes={value || 0} 
            onChange={setValue}
          />
        );
      case 'symptoms':
        return (
          <SymptomsQuickAction 
            symptoms={value || []} 
            onChange={setValue}
          />
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'water': return 'Log Water Intake 💧';
      case 'mood': return 'Rate Your Mood 😊';
      case 'exercise': return 'Log Exercise 🏃‍♀️';
      case 'symptoms': return 'Track Symptoms 🩺';
      default: return 'Quick Log';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{getTitle()}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 max-h-96 overflow-y-auto">
          {renderContent()}
        </div>
        
        <div className="p-6 border-t flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || value === null}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save ✨'}
          </button>
        </div>
      </div>
    </div>
  );
};

const WaterQuickAction: React.FC<{ glasses: number; onChange: (value: number) => void }> = ({ glasses, onChange }) => {
  const target = 8;
  
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-6">How many glasses of water have you had today?</p>
      
      <div className="grid grid-cols-4 gap-2 mb-6 justify-center">
        {Array.from({ length: target }, (_, i) => (
          <div
            key={i}
            className={`w-12 h-16 rounded-b-full border-2 flex items-end justify-center transition-all duration-300 cursor-pointer ${
              i < glasses 
                ? 'border-blue-400 bg-blue-200' 
                : 'border-gray-300 bg-gray-50 hover:bg-blue-50'
            }`}
            onClick={() => onChange(i + 1)}
          >
            {i < glasses && (
              <div className="w-10 h-10 bg-blue-400 rounded-b-full animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={() => onChange(Math.max(0, glasses - 1))}
          className="w-12 h-12 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
        >
          -
        </button>
        
        <span className="text-3xl font-bold text-blue-600 min-w-[3rem]">
          {glasses}
        </span>
        
        <button
          onClick={() => onChange(Math.min(target, glasses + 1))}
          className="w-12 h-12 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors"
        >
          +
        </button>
      </div>
      
      <p className="text-sm text-gray-500">{glasses}/{target} glasses today</p>
    </div>
  );
};

const MoodQuickAction: React.FC<{ mood: number; onChange: (value: number) => void }> = ({ mood, onChange }) => {
  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Terrible' },
    { value: 2, emoji: '😞', label: 'Bad' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😊', label: 'Great' },
  ];

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">How are you feeling right now?</p>
      
      <div className="space-y-3">
        {moodOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${
              mood === option.value
                ? 'bg-purple-50 border-2 border-purple-300 transform scale-105'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <span className="text-3xl mr-4">{option.emoji}</span>
            <span className="font-semibold text-lg">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const ExerciseQuickAction: React.FC<{ minutes: number; onChange: (value: number) => void }> = ({ minutes, onChange }) => {
  const quickOptions = [15, 30, 45, 60];

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">How many minutes did you exercise today?</p>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickOptions.map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`py-4 px-4 rounded-xl font-medium transition-all duration-300 ${
              minutes === option
                ? 'bg-green-500 text-white transform scale-105'
                : 'bg-green-100 hover:bg-green-200 text-green-700'
            }`}
          >
            {option} min
          </button>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom minutes
        </label>
        <input
          type="number"
          min="0"
          max="480"
          value={minutes}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter minutes"
        />
      </div>
    </div>
  );
};

const SymptomsQuickAction: React.FC<{ symptoms: string[]; onChange: (value: string[]) => void }> = ({ symptoms, onChange }) => {
  const commonSymptoms = [
    { id: 'cramps', name: 'Cramps', emoji: '😣' },
    { id: 'bloating', name: 'Bloating', emoji: '🎈' },
    { id: 'headache', name: 'Headache', emoji: '🤕' },
    { id: 'fatigue', name: 'Fatigue', emoji: '😴' },
    { id: 'mood_swings', name: 'Mood Swings', emoji: '🎭' },
    { id: 'breast_tenderness', name: 'Breast Tenderness', emoji: '💗' },
  ];

  const toggleSymptom = (symptomId: string) => {
    const newSymptoms = symptoms.includes(symptomId)
      ? symptoms.filter(s => s !== symptomId)
      : [...symptoms, symptomId];
    onChange(newSymptoms);
  };

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">Select any symptoms you're experiencing</p>
      
      <div className="grid grid-cols-2 gap-3">
        {commonSymptoms.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => toggleSymptom(symptom.id)}
            className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
              symptoms.includes(symptom.id)
                ? 'bg-purple-50 border-2 border-purple-300 transform scale-105'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <span className="text-xl mr-2">{symptom.emoji}</span>
            <span className="font-medium text-sm">{symptom.name}</span>
          </button>
        ))}
      </div>
      
      {symptoms.length > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-xl">
          <p className="text-sm font-medium text-purple-800">
            {symptoms.length} symptom{symptoms.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickActionModal;