import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { ClinicalGuideline, GuidelineCreateData } from '../../services/guidelinesService';

interface GuidelineEditModalProps {
  guideline: ClinicalGuideline | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (guidelineId: string, data: Partial<GuidelineCreateData>) => Promise<void>;
}

const GuidelineEditModal: React.FC<GuidelineEditModalProps> = ({
  guideline,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<GuidelineCreateData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (guideline) {
      setFormData({
        title: guideline.title,
        description: guideline.description,
        version: guideline.version,
        category: guideline.category,
        specialty: guideline.specialty || '',
        keywords: guideline.keywords,
        content_type: guideline.content_type,
        text_content: guideline.text_content || '',
        effective_date: guideline.effective_date,
        expiry_date: guideline.expiry_date || '',
        target_roles: guideline.target_roles,
        priority: guideline.priority
      });
    }
  }, [guideline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideline) return;

    setLoading(true);
    setError(null);

    try {
      // Clean up the data before sending - convert empty strings to null for date fields
      const cleanedData = {
        ...formData,
        expiry_date: formData.expiry_date === '' ? null : formData.expiry_date,
        specialty: formData.specialty === '' ? null : formData.specialty,
        text_content: formData.text_content === '' ? null : formData.text_content
      };
      
      await onSave(guideline.guideline_id, cleanedData);
      onClose();
    } catch (err) {
      setError('Failed to update guideline');
      console.error('Error updating guideline:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof GuidelineCreateData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
    handleInputChange('keywords', keywords);
  };

  const handleTargetRolesChange = (role: string, checked: boolean) => {
    const currentRoles = formData.target_roles || [];
    let newRoles;
    
    if (checked) {
      newRoles = [...currentRoles, role];
    } else {
      newRoles = currentRoles.filter(r => r !== role);
    }
    
    handleInputChange('target_roles', newRoles);
  };

  if (!isOpen || !guideline) return null;

  const availableRoles = [
    'doctor', 'nurse', 'pharmacist', 'lab_technician', 'physician_assistant',
    'medical_secretary', 'radiologist_tech', 'paramedic', 'emt', 'midwife'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Clinical Guideline</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Version */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <input
                type="text"
                value={formData.version || ''}
                onChange={(e) => handleInputChange('version', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1.0"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="emergency">Emergency Protocols</option>
                <option value="surgery">Surgical Procedures</option>
                <option value="medication">Medication Guidelines</option>
                <option value="diagnosis">Diagnostic Protocols</option>
                <option value="treatment">Treatment Plans</option>
                <option value="prevention">Preventive Care</option>
                <option value="infection_control">Infection Control</option>
                <option value="patient_safety">Patient Safety</option>
              </select>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <input
                type="text"
                value={formData.specialty || ''}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Cardiology, Emergency Medicine"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority || 'medium'}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Effective Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date *
              </label>
              <input
                type="date"
                value={formData.effective_date || ''}
                onChange={(e) => handleInputChange('effective_date', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiry_date || ''}
                onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Keywords */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={formData.keywords?.join(', ') || ''}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="emergency protocol, Healthcare access"
              />
            </div>

            {/* Text Content (if content_type is text) */}
            {formData.content_type === 'text' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Content
                </label>
                <textarea
                  value={formData.text_content || ''}
                  onChange={(e) => handleInputChange('text_content', e.target.value)}
                  rows={8}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the full text content of the guideline..."
                />
              </div>
            )}

            {/* Target Roles */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Roles
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {availableRoles.map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.target_roles?.includes(role) || false}
                      onChange={(e) => handleTargetRolesChange(role, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {role.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuidelineEditModal;