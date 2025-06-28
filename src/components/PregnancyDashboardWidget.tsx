import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PregnancyWidgetProps {
  currentWeek: number;
  dueDate: string;
  onQuickLog: (type: 'kicks' | 'symptoms' | 'weight') => void;
}

const PregnancyDashboardWidget: React.FC<PregnancyWidgetProps> = ({ 
  currentWeek, 
  dueDate, 
  onQuickLog 
}) => {
  const [kickCount, setKickCount] = useState(0);
  const [lastKickTime, setLastKickTime] = useState<Date | null>(null);

  const getDaysUntilDue = () => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressPercentage = () => {
    return Math.min((currentWeek / 40) * 100, 100);
  };

  const getBabySize = (week: number) => {
    const sizes: { [key: number]: { item: string; emoji: string } } = {
      20: { item: "banana", emoji: "🍌" },
      21: { item: "carrot", emoji: "🥕" },
      22: { item: "papaya", emoji: "🥭" },
      23: { item: "grapefruit", emoji: "🍊" },
      24: { item: "ear of corn", emoji: "🌽" },
      25: { item: "cauliflower", emoji: "🥬" },
      26: { item: "lettuce head", emoji: "🥬" },
      27: { item: "eggplant", emoji: "🍆" },
      28: { item: "coconut", emoji: "🥥" },
      29: { item: "butternut squash", emoji: "🎃" },
      30: { item: "cabbage", emoji: "🥬" },
      31: { item: "pineapple", emoji: "🍍" },
      32: { item: "jicama", emoji: "🥔" },
      33: { item: "pineapple", emoji: "🍍" },
      34: { item: "cantaloupe", emoji: "🍈" },
      35: { item: "honeydew", emoji: "🍈" },
      36: { item: "papaya", emoji: "🥭" },
      37: { item: "winter melon", emoji: "🍈" },
      38: { item: "pumpkin", emoji: "🎃" },
      39: { item: "watermelon", emoji: "🍉" },
      40: { item: "small watermelon", emoji: "🍉" }
    };
    return sizes[week] || { item: "growing strong", emoji: "👶" };
  };

  const handleKickCount = () => {
    setKickCount(prev => prev + 1);
    setLastKickTime(new Date());
  };

  const resetKickCount = () => {
    setKickCount(0);
    setLastKickTime(null);
  };

  const babySize = getBabySize(currentWeek);
  const daysLeft = getDaysUntilDue();
  const progress = getProgressPercentage();

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-400 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Pregnancy Journey ✨</h3>
            <p className="text-green-100">Week {currentWeek} of 40</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{daysLeft}</div>
            <div className="text-sm text-green-100">days to go</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-green-100 mt-2">
            <span>Conception</span>
            <span>{Math.round(progress)}% complete</span>
            <span>Due Date</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Baby Size */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center">
          <h4 className="font-bold text-blue-800 mb-2">Your Baby This Week</h4>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-4xl">{babySize.emoji}</span>
            <div>
              <p className="font-semibold text-gray-800">Size of {babySize.item}</p>
              <p className="text-sm text-gray-600">Growing beautifully!</p>
            </div>
          </div>
        </div>

        {/* Kick Counter */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-gray-800">Baby Kick Counter</h4>
            <button
              onClick={resetKickCount}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-colors"
            >
              Reset
            </button>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600 mb-1">{kickCount}</div>
            <p className="text-sm text-gray-600">kicks today</p>
            {lastKickTime && (
              <p className="text-xs text-gray-500">
                Last kick: {lastKickTime.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <button
            onClick={handleKickCount}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors transform active:scale-95"
          >
            👶 Feel a Kick!
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => onQuickLog('symptoms')}
            className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-xl text-sm font-medium transition-colors"
          >
            <div className="text-lg mb-1">🩺</div>
            Log Symptoms
          </button>
          
          <button
            onClick={() => onQuickLog('weight')}
            className="bg-pink-50 hover:bg-pink-100 text-pink-700 p-3 rounded-xl text-sm font-medium transition-colors"
          >
            <div className="text-lg mb-1">⚖️</div>
            Track Weight
          </button>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <Link
            to="/account/womens-health/pregnancy/journey"
            className="block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-center py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
          >
            View Full Journey
          </Link>
          
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/account/womens-health/pregnancy/tracker"
              className="bg-green-100 hover:bg-green-200 text-green-700 text-center py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Weekly Tracker
            </Link>
            
            <Link
              to="/account/womens-health/pregnancy/timeline"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-center py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Timeline
            </Link>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700">
            💛 <strong>You're doing amazing!</strong> Your baby is growing perfectly and loves hearing your voice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PregnancyDashboardWidget;