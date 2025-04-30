import React, { useState, useEffect } from 'react';
import { TreatmentPlan, TreatmentGoal, Patient, Medication } from './patientTypes';
import { usePatients } from './patientContext';

interface TreatmentPlanFormProps {
  patientId: string;
  onComplete: () => void;
  existingPlan?: TreatmentPlan;
}

const TreatmentPlanForm: React.FC<TreatmentPlanFormProps> = ({
  patientId,
  onComplete,
  existingPlan
}) => {
  const { selectedPatient, addTreatmentPlan, updateTreatmentPlan } = usePatients();
  const isEditing = !!existingPlan;

  const [formData, setFormData] = useState<Partial<TreatmentPlan>>({
    id: existingPlan?.id || `plan-${Date.now()}`,
    patientId: patientId,
    condition: existingPlan?.condition || '',
    startDate: existingPlan?.startDate || new Date().toISOString().split('T')[0],
    endDate: existingPlan?.endDate || '',
    goals: existingPlan?.goals || [],
    medications: existingPlan?.medications || [],
    instructions: existingPlan?.instructions || '',
    professionalId: 'PROF1', // Would come from auth context in real app
    professionalName: 'Dr. Sarah Johnson', // Would come from auth context in real app
    status: existingPlan?.status || 'active',
    progressNotes: existingPlan?.progressNotes || []
  });

  const [newGoal, setNewGoal] = useState({
    description: '',
    targetDate: '',
    status: 'pending' as const
  });

  // Add a treatment goal to the form data
  const handleAddGoal = () => {
    if (!newGoal.description) return;

    const goal: TreatmentGoal = {
      id: `goal-${Date.now()}`,
      description: newGoal.description,
      targetDate: newGoal.targetDate || undefined,
      status: newGoal.status,
      notes: ''
    };

    setFormData(prev => ({
      ...prev,
      goals: [...(prev.goals || []), goal]
    }));

    setNewGoal({
      description: '',
      targetDate: '',
      status: 'pending'
    });
  };

  // Remove a goal from the list
  const handleRemoveGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: (prev.goals || []).filter(goal => goal.id !== goalId)
    }));
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.condition || !formData.startDate || !formData.instructions) {
      // Show validation error
      return;
    }

    const plan = formData as TreatmentPlan;

    if (isEditing) {
      updateTreatmentPlan(plan);
    } else {
      addTreatmentPlan(plan);
    }

    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'New'} Treatment Plan</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Treatment Goals</h3>

          <div className="mb-4 p-4 bg-gray-50 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Description</label>
                <input
                  type="text"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a new goal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddGoal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Goal
              </button>
            </div>
          </div>

          {formData.goals && formData.goals.length > 0 ? (
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.goals.map((goal) => (
                    <tr key={goal.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">{goal.description}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{goal.targetDate || 'No target date'}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        <select
                          value={goal.status}
                          onChange={(e) => {
                            const updatedGoals = formData.goals?.map(g =>
                              g.id === goal.id ? { ...g, status: e.target.value as any } : g
                            ) || [];
                            setFormData(prev => ({ ...prev, goals: updatedGoals }));
                          }}
                          className="p-1 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="achieved">Achieved</option>
                          <option value="discontinued">Discontinued</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-sm text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveGoal(goal.id)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Remove goal"
                        >
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No goals added yet.</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onComplete}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Update' : 'Create'} Treatment Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TreatmentPlanForm;
