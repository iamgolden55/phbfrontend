import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, FileText, CheckCircle, ChevronRight, Tag, AlertTriangle, Send } from 'lucide-react';
import guidelinesService, { ClinicalGuideline, GuidelineCreateData } from '../../services/guidelinesService';

interface GuidelineEditModalProps {
  guideline: ClinicalGuideline | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (guidelineId: string, data: Partial<GuidelineCreateData>) => Promise<void>;
  onSuccess?: () => void;
}

const GuidelineEditModal: React.FC<GuidelineEditModalProps> = ({
  guideline,
  isOpen,
  onClose,
  onSave,
  onSuccess
}) => {
  const [formData, setFormData] = useState<Partial<GuidelineCreateData>>({});
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      document.body.style.overflow = 'hidden';
    } else {
      setAnimateIn(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (guideline) {
      setFormData({
        title: guideline.title,
        description: guideline.description,
        version: guideline.version,
        category: guideline.category,
        specialty: guideline.specialty || '',
        keywords: guideline.keywords || [],
        content_type: guideline.content_type,
        text_content: guideline.text_content || '',
        effective_date: guideline.effective_date,
        expiry_date: guideline.expiry_date || '',
        target_roles: guideline.target_roles || [],
        priority: guideline.priority
      });
      setError(null);
      setSuccess(null);
    }
  }, [guideline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideline) return;
    saveChanges(true);
  };

  const saveChanges = async (shouldClose = true): Promise<boolean> => {
    if (!guideline) return false;
    setLoading(true);
    setError(null);

    try {
      const cleanedData = {
        ...formData,
        expiry_date: formData.expiry_date === '' ? undefined : formData.expiry_date,
        specialty: formData.specialty === '' ? undefined : formData.specialty,
        text_content: formData.text_content === '' ? undefined : formData.text_content,
        // Ensure arrays are arrays
        keywords: Array.isArray(formData.keywords) ? formData.keywords : [],
        target_roles: Array.isArray(formData.target_roles) ? formData.target_roles : []
      };

      await onSave(guideline.guideline_id, cleanedData);

      if (shouldClose) {
        setSuccess('Guideline updated successfully');
        if (onSuccess) onSuccess(); // Notify parent of update
        setTimeout(() => {
          onClose();
        }, 1000);
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update guideline');
      console.error('Error updating guideline:', err);
      return false;
    } finally {
      if (shouldClose) {
        setLoading(false);
      }
    }
  };

  const handlePublish = async () => {
    if (!guideline) return;
    if (confirm('Are you sure you want to publish this guideline? It will become visible to all targeted staff.')) {
      setPublishing(true);
      // Don't modify loading state here as internalSave handles its own or we handle it via publishing state
      try {
        // First save any pending changes, but DON'T close the modal
        const saved = await saveChanges(false);
        if (!saved) {
          setPublishing(false);
          setLoading(false); // Reset loading if save failed
          return;
        }

        // Then approve if not already approved
        if (guideline.approval_status !== 'approved' && guideline.approval_status !== 'published') {
          await guidelinesService.approveGuideline(guideline.guideline_id);
        }

        // Then publish
        await guidelinesService.publishGuideline(guideline.guideline_id);

        // Show success alert BEFORE closing
        alert('✅ Guideline published successfully!\n\nThe guideline has been approved and is now visible to all staff.');

        if (onSuccess) onSuccess(); // Notify parent of refresh

        setTimeout(() => {
          onClose();
        }, 500);
      } catch (err: any) {
        alert('❌ Failed to publish guideline\n\n' + (err.message || 'Please try again.'));
        setPublishing(false);
        setLoading(false);
      }
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

  const handleTargetRolesChange = (role: string) => {
    const currentRoles = formData.target_roles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter(r => r !== role)
      : [...currentRoles, role];
    handleInputChange('target_roles', newRoles);
  };

  if (!isOpen || !guideline) return null;

  const availableRoles = [
    'doctor', 'nurse', 'pharmacist', 'lab_technician', 'physician_assistant',
    'medical_secretary', 'radiologist_tech', 'paramedic', 'midwife'
  ];

  const categories = [
    { value: 'emergency', label: 'Emergency Protocols' },
    { value: 'surgery', label: 'Surgical Procedures' },
    { value: 'medication', label: 'Medication Guidelines' },
    { value: 'diagnosis', label: 'Diagnostic Protocols' },
    { value: 'treatment', label: 'Treatment Plans' },
    { value: 'prevention', label: 'Preventive Care' },
    { value: 'infection_control', label: 'Infection Control' },
    { value: 'patient_safety', label: 'Patient Safety' },
    { value: 'nursing', label: 'Nursing Protocols' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'pediatric', label: 'Pediatric Care' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col relative transform transition-all duration-500 ease-out ${animateIn ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Edit Guideline</h2>
            <div className="flex items-center mt-1 space-x-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${guideline.approval_status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                guideline.approval_status === 'draft' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                {guideline.approval_status}
              </span>
              <span className="text-sm text-gray-500">ID: {guideline.guideline_id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 custom-scrollbar flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Alerts */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center text-red-700 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center text-emerald-700 animate-in fade-in slide-in-from-top-2">
                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">{success}</span>
              </div>
            )}

            {/* Basic Info */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                <FileText className="w-4 h-4 mr-2" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={formData.category || ''}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full appearance-none px-5 py-3 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                  <div className="flex gap-2">
                    {['low', 'medium', 'high', 'critical'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleInputChange('priority', p)}
                        className={`flex-1 py-3 px-1 rounded-xl text-xs font-bold capitalize transition-all border ${formData.priority === p
                          ? p === 'critical' ? 'bg-red-50 text-red-600 border-red-200'
                            : p === 'high' ? 'bg-orange-50 text-orange-600 border-orange-200'
                              : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Meta & Targeting */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                  <Tag className="w-4 h-4 mr-2" /> Meta Data
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Effective Date</label>
                      <input
                        type="date"
                        value={formData.effective_date || ''}
                        onChange={(e) => handleInputChange('effective_date', e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Version</label>
                      <input
                        type="text"
                        value={formData.version || ''}
                        onChange={(e) => handleInputChange('version', e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.keywords) ? formData.keywords.join(', ') : ''}
                      onChange={(e) => handleKeywordsChange(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="comma, separated, keys"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" /> Target Audience
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableRoles.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleTargetRolesChange(role)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${formData.target_roles?.includes(role)
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      {role.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Text Content (only if text type) */}
            {formData.content_type === 'text' && (
              <section>
                <label className="block text-sm font-bold text-gray-700 mb-2">Guideline Content</label>
                <textarea
                  value={formData.text_content || ''}
                  onChange={(e) => handleInputChange('text_content', e.target.value)}
                  className="w-full h-64 p-4 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-mono leading-relaxed"
                />
              </section>
            )}

          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div>
            {/* Left side actions if needed */}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>

            {guideline.approval_status !== 'published' && (
              <button
                type="button"
                onClick={handlePublish}
                disabled={loading || publishing}
                className="px-6 py-3 rounded-full text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center"
              >
                {publishing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600 mr-2"></div>
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Publish Now
              </button>
            )}

            <button
              onClick={() => saveChanges(true)}
              disabled={loading || publishing}
              className={`px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black hover:shadow-xl'
                }`}
            >
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
              <Save className="w-4 h-4 mr-2" />
              Save Updates
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GuidelineEditModal;