import React, { useState } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';

// Define goal types for better typing
interface HealthGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: 'exercise' | 'nutrition' | 'sleep' | 'mental' | 'general';
  status: 'active' | 'completed' | 'abandoned';
}

const defaultGoals: HealthGoal[] = [
  {
    id: '1',
    title: 'Walk 10,000 steps daily',
    description: 'Achieve 10,000 steps each day to improve cardiovascular health',
    targetDate: '2025-06-30',
    progress: 65,
    category: 'exercise',
    status: 'active'
  },
  {
    id: '2',
    title: 'Reduce sugar intake',
    description: 'Cut down on added sugars to less than 25g per day',
    targetDate: '2025-05-15',
    progress: 40,
    category: 'nutrition',
    status: 'active'
  }
];

const HealthGoalsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [goals, setGoals] = useState<HealthGoal[]>(defaultGoals);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<HealthGoal, 'id' | 'progress'>>({
    title: '',
    description: '',
    targetDate: '',
    category: 'general',
    status: 'active'
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();

    const goalWithId: HealthGoal = {
      ...newGoal,
      id: Date.now().toString(),
      progress: 0
    };

    setGoals([...goals, goalWithId]);
    setShowAddGoalForm(false);
    setNewGoal({
      title: '',
      description: '',
      targetDate: '',
      category: 'general',
      status: 'active'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, progress, status: progress === 100 ? 'completed' : 'active' } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  // Function to get category color
  const getCategoryColor = (category: HealthGoal['category']) => {
    switch (category) {
      case 'exercise':
        return 'bg-blue-100 text-blue-700';
      case 'nutrition':
        return 'bg-green-100 text-green-700';
      case 'sleep':
        return 'bg-purple-100 text-purple-700';
      case 'mental':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Function to get status color
  const getStatusColor = (status: HealthGoal['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'abandoned':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Health Goals</h1>
          <p className="text-xl font-medium">
            Track your health goals and progress
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Health Goals</h2>
            <p className="text-gray-600">Set goals, track progress, and improve your health</p>
          </div>
          <button
            onClick={() => setShowAddGoalForm(!showAddGoalForm)}
            className="bg-[#005eb8] hover:bg-[#003f7e] text-white px-4 py-2 rounded-md transition-colors"
          >
            {showAddGoalForm ? 'Cancel' : '+ Add New Goal'}
          </button>
        </div>

        {showAddGoalForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Add New Health Goal</h3>
            <form onSubmit={handleAddGoal}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newGoal.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="targetDate" className="block text-gray-700 font-medium mb-2">
                    Target Date *
                  </label>
                  <input
                    type="date"
                    id="targetDate"
                    name="targetDate"
                    value={newGoal.targetDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newGoal.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={newGoal.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="general">General</option>
                  <option value="exercise">Exercise</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="sleep">Sleep</option>
                  <option value="mental">Mental Health</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#005eb8] hover:bg-[#003f7e] text-white px-6 py-2 rounded-md transition-colors"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        )}

        {goals.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded-md">
            <p className="text-gray-600 mb-4">You don't have any health goals yet.</p>
            <button
              onClick={() => setShowAddGoalForm(true)}
              className="text-[#005eb8] hover:underline"
            >
              Create your first health goal
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{goal.title}</h3>
                    <div className="flex space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(goal.category)}`}>
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(goal.status)}`}>
                        {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-600 hover:underline text-sm mt-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {goal.description && (
                  <p className="text-gray-700 mb-4">{goal.description}</p>
                )}

                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm font-medium">Progress: {goal.progress}%</span>
                  <span className="text-sm text-gray-600">
                    {goal.progress === 100 ? 'Completed!' : ''}
                  </span>
                </div>

                <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>

                <div className="flex space-x-2">
                  {[0, 25, 50, 75, 100].map(value => (
                    <button
                      key={value}
                      onClick={() => updateGoalProgress(goal.id, value)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        goal.progress === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthGoalsPage;
