import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { womensHealthApi, HealthGoal as ApiHealthGoal } from '../../../services/womensHealthApi';
import WomensHealthGuard from '../../../components/womenshealth/WomensHealthGuard';
import { AlertCircle, Loader, Plus, Check, Target } from 'lucide-react';

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'fitness' | 'nutrition' | 'wellness' | 'reproductive';
  target_value: number;
  current_value: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  deadline?: string;
  is_active: boolean;
  streak: number;
  best_streak: number;
  reminders_enabled: boolean;
  notes: string[];
}

interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'fitness' | 'nutrition' | 'wellness' | 'reproductive';
  default_target: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly';
}

const HealthGoals: React.FC = () => {
  const [goals, setGoals] = useState<ApiHealthGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGoal, setSelectedGoal] = useState<ApiHealthGoal | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    loadHealthGoals();
  }, []);

  const loadHealthGoals = async () => {
    try {
      setError('');
      const response = await womensHealthApi.getHealthGoals();
      
      if (response.success) {
        setGoals(response.goals);
      } else {
        setError('Failed to load health goals');
      }
    } catch (error: any) {
      console.error('Error loading health goals:', error);
      setError(error.response?.data?.message || 'Failed to load health goals');
    } finally {
      setIsLoading(false);
    }
  };

  const goalTemplates: GoalTemplate[] = [
    {
      id: 't1',
      title: 'Daily Steps',
      description: 'Walk more for better fitness',
      icon: '👟',
      category: 'fitness',
      default_target: 10000,
      unit: 'steps',
      frequency: 'daily'
    },
    {
      id: 't2',
      title: 'Meditation Minutes',
      description: 'Practice mindfulness daily',
      icon: '🧘‍♀️',
      category: 'wellness',
      default_target: 10,
      unit: 'minutes',
      frequency: 'daily'
    },
    {
      id: 't3',
      title: 'Prenatal Vitamins',
      description: 'Take vitamins consistently',
      icon: '💊',
      category: 'reproductive',
      default_target: 1,
      unit: 'pill',
      frequency: 'daily'
    },
    {
      id: 't4',
      title: 'Fruits & Vegetables',
      description: 'Eat colorful, nutritious foods',
      icon: '🥗',
      category: 'nutrition',
      default_target: 5,
      unit: 'servings',
      frequency: 'daily'
    }
  ];

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

  const GoalCard: React.FC<{ goal: HealthGoal }> = ({ goal }) => {
    const progressPercentage = Math.min((goal.current_value / goal.target_value) * 100, 100);
    
    const getCategoryColor = (category: string) => {
      const colors = {
        fitness: 'from-blue-400 to-cyan-400',
        nutrition: 'from-green-400 to-emerald-400',
        wellness: 'from-purple-400 to-indigo-400',
        reproductive: 'from-pink-400 to-rose-400'
      };
      return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
    };

    const getProgressColor = (percentage: number) => {
      if (percentage >= 100) return '#10b981';
      if (percentage >= 75) return '#3b82f6';
      if (percentage >= 50) return '#f59e0b';
      return '#ef4444';
    };

    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className={`bg-gradient-to-r ${getCategoryColor(goal.category)} p-6 text-white`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{goal.icon}</span>
              <div>
                <h3 className="text-xl font-bold">{goal.title}</h3>
                <p className="text-white/80 text-sm">{goal.description}</p>
              </div>
            </div>
            {goal.streak > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold">{goal.streak}</div>
                <div className="text-xs text-white/80">day streak</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <CircularProgress
              percentage={progressPercentage}
              size={80}
              strokeWidth={6}
              color={getProgressColor(progressPercentage)}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            </CircularProgress>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                {goal.current_value}
                <span className="text-lg text-gray-500">/{goal.target_value}</span>
              </div>
              <div className="text-sm text-gray-600">{goal.unit} {goal.frequency}</div>
            </div>
          </div>
          
          {goal.notes.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 italic">"{goal.notes[goal.notes.length - 1]}"</p>
            </div>
          )}
          
          {/* Quick Action Buttons */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={async () => {
                try {
                  const newValue = Math.min(goal.target_value, goal.current_value + 1);
                  const response = await womensHealthApi.updateHealthGoal(goal.id, {
                    goal_id: goal.id,
                    current_value: newValue
                  });
                  
                  if (response.success) {
                    // Update local state optimistically
                    setGoals(prevGoals => 
                      prevGoals.map(g => 
                        g.id === goal.id 
                          ? { ...g, current_value: newValue }
                          : g
                      )
                    );
                  }
                } catch (error) {
                  console.error('Error updating goal:', error);
                }
              }}
              className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              +1 {goal.unit}
            </button>
            <button
              onClick={() => {
                setSelectedGoal(goal);
                setShowUpdateModal(true);
              }}
              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              Full Update
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                🏆 Best: {goal.best_streak}
              </span>
              {goal.reminders_enabled && (
                <span className="flex items-center">
                  🔔 Reminders on
                </span>
              )}
            </div>
            
            <div className="text-xs text-gray-500">
              {goal.frequency}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UpdateGoalModal: React.FC = () => {
    const [newValue, setNewValue] = useState<number>(0);
    const [note, setNote] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      if (selectedGoal) {
        setNewValue(selectedGoal.current_value);
        setNote('');
      }
    }, [selectedGoal]);

    if (!showUpdateModal || !selectedGoal) return null;

    const handleSubmit = async () => {
      setIsSubmitting(true);
      
      try {
        const updateData = {
          goal_id: selectedGoal.id,
          current_value: newValue,
          notes: note || undefined
        };

        const response = await womensHealthApi.updateHealthGoal(selectedGoal.id, updateData);
        
        if (response.success) {
          setSubmitStatus('success');
          setSubmitMessage('Goal updated successfully!');
          
          // Refresh the goals data to show updated values
          loadHealthGoals();
          
          setTimeout(() => {
            setSubmitStatus('idle');
          }, 3000);
        } else {
          throw new Error(response.message || 'Failed to update goal');
        }
      } catch (error: any) {
        console.error('Error updating goal:', error);
        setSubmitStatus('error');
        setSubmitMessage(error.response?.data?.message || 'Failed to update goal. Please try again.');
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } finally {
        setIsSubmitting(false);
        setShowUpdateModal(false);
        setSelectedGoal(null);
      }
    };

    const progressPercentage = Math.min((newValue / selectedGoal.target_value) * 100, 100);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{selectedGoal.icon}</span>
                <div>
                  <h2 className="text-xl font-bold">Update Goal</h2>
                  <p className="text-blue-100 text-sm">{selectedGoal.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="inline-block">
                <CircularProgress
                  percentage={progressPercentage}
                  size={100}
                  strokeWidth={8}
                  color={progressPercentage >= 100 ? '#10b981' : progressPercentage >= 75 ? '#3b82f6' : '#f59e0b'}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {Math.round(progressPercentage)}%
                    </div>
                  </div>
                </CircularProgress>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Goal: {selectedGoal.target_value} {selectedGoal.unit} {selectedGoal.frequency}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Progress ({selectedGoal.unit})
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setNewValue(Math.max(0, newValue - 1))}
                    className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={newValue}
                    onChange={(e) => setNewValue(Math.max(0, parseInt(e.target.value) || 0))}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-semibold"
                  />
                  <button
                    onClick={() => setNewValue(newValue + 1)}
                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="How are you feeling about this goal?"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {selectedGoal.notes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Notes
                  </label>
                  <div className="max-h-20 overflow-y-auto space-y-1">
                    {selectedGoal.notes.slice(-2).map((prevNote, index) => (
                      <p key={index} className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
                        "{prevNote}"
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 border-t flex space-x-4">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Update Goal ✨'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddGoalModal: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null);
    const [customTarget, setCustomTarget] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    if (!showAddGoal) return null;

    const handleAddGoal = async () => {
      if (!selectedTemplate) return;
      
      setIsSubmitting(true);
      
      try {
        const goalData = {
          title: selectedTemplate.title,
          description: selectedTemplate.description,
          category: selectedTemplate.category,
          target_value: customTarget,
          unit: selectedTemplate.unit,
          frequency: selectedTemplate.frequency,
          is_active: true,
          reminders_enabled: true
        };

        const response = await womensHealthApi.createHealthGoal(goalData);
        
        if (response.success) {
          setSubmitStatus('success');
          setSubmitMessage('Goal created successfully!');
          
          // Refresh the goals data to show the new goal
          loadHealthGoals();
          
          setTimeout(() => {
            setSubmitStatus('idle');
          }, 3000);
        } else {
          throw new Error(response.message || 'Failed to create goal');
        }
      } catch (error: any) {
        console.error('Error creating goal:', error);
        setSubmitStatus('error');
        setSubmitMessage(error.response?.data?.message || 'Failed to create goal. Please try again.');
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } finally {
        setIsSubmitting(false);
        setShowAddGoal(false);
        setSelectedTemplate(null);
        setCustomTarget(0);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Health Goal</h2>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Choose a Goal Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setCustomTarget(template.default_target);
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{template.icon}</span>
                    <div>
                      <h4 className="font-bold">{template.title}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Target: {template.default_target} {template.unit} {template.frequency}
                  </div>
                </button>
              ))}
            </div>
            
            {selectedTemplate && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold mb-3">Customize Your Goal</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target {selectedTemplate.unit} per {selectedTemplate.frequency}
                    </label>
                    <input
                      type="number"
                      value={customTarget}
                      onChange={(e) => setCustomTarget(parseInt(e.target.value) || 0)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 border-t flex space-x-4">
            <button
              onClick={() => setShowAddGoal(false)}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGoal}
              disabled={!selectedTemplate || isSubmitting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Goal ✨'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredGoals = selectedCategory === 'all' 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const activeGoals = goals.filter(goal => goal.is_active);
  const overallProgress = activeGoals.length > 0 
    ? activeGoals.reduce((sum, goal) => sum + Math.min((goal.current_value / goal.target_value) * 100, 100), 0) / activeGoals.length
    : 0;

  if (isLoading) {
    return (
      <WomensHealthGuard>
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
          <div className="phb-container py-8">
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Loading health goals...</span>
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
              <h2 className="text-xl font-bold text-gray-900">Failed to Load Goals</h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={loadHealthGoals}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium"
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
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-12">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">Health Goals 🎯</h1>
              <p className="text-purple-100 text-xl">Track your wellness journey</p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="font-semibold">{activeGoals.length} Active Goals</span>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="font-semibold">{Math.round(overallProgress)}% Average Progress</span>
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
        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold">Your Goals</h2>
              <div className="flex items-center space-x-2">
                {['all', 'fitness', 'nutrition', 'wellness', 'reproductive'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              + Add New Goal
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>

        {filteredGoals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">No Goals Yet</h3>
            <p className="text-gray-600 mb-6">
              Start tracking your health goals to improve your wellness journey
            </p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>

      <UpdateGoalModal />
      <AddGoalModal />

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
  </WomensHealthGuard>
  );
};

export default HealthGoals;