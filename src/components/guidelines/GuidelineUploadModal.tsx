import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle, ChevronRight, Calendar, Tag, Shield, FileType } from 'lucide-react';
import guidelinesService, { GuidelineCreateData } from '../../services/guidelinesService';

interface GuidelineUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  description: string;
  version: string;
  category: string;
  specialty: string;
  keywords: string;
  effective_date: string;
  expiry_date: string;
  target_roles: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  content_type: 'pdf' | 'text' | 'mixed';
  text_content: string;
}

const GuidelineUploadModal: React.FC<GuidelineUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    version: '1.0',
    category: '',
    specialty: '',
    keywords: '',
    effective_date: new Date().toISOString().split('T')[0],
    expiry_date: '',
    target_roles: ['doctor', 'nurse'],
    priority: 'medium',
    content_type: 'pdf',
    text_content: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const roles = [
    'doctor', 'nurse', 'pharmacist', 'lab_technician', 'physician_assistant',
    'medical_secretary', 'radiologist_tech', 'paramedic', 'midwife'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      target_roles: prev.target_roles.includes(role)
        ? prev.target_roles.filter(r => r !== role)
        : [...prev.target_roles, role]
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please select a PDF, Word document, or text file.');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB.');
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return setError('Title is required.');
    if (!formData.description.trim()) return setError('Description is required.');
    if (!formData.category) return setError('Category is required.');
    if (formData.content_type === 'pdf' && !file) return setError('Please select a file to upload.');
    if (formData.content_type === 'text' && !formData.text_content.trim()) return setError('Text content is required.');

    try {
      setUploading(true);
      setError(null);

      const guidelineData: GuidelineCreateData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        version: formData.version,
        category: formData.category,
        specialty: formData.specialty.trim() || undefined,
        keywords: formData.keywords.trim() ? formData.keywords.split(',').map(k => k.trim()) : [],
        effective_date: formData.effective_date,
        expiry_date: formData.expiry_date || undefined,
        target_roles: formData.target_roles,
        priority: formData.priority,
        content_type: formData.content_type,
        text_content: formData.content_type === 'text' ? formData.text_content : undefined
      };

      if (formData.content_type === 'pdf' && file) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        Object.entries(guidelineData).forEach(([key, value]) => {
          if (value !== undefined) {
            if (Array.isArray(value)) {
              uploadFormData.append(key, value.join(','));
            } else {
              uploadFormData.append(key, String(value));
            }
          }
        });

        await guidelinesService.uploadGuideline(uploadFormData);
      } else {
        await guidelinesService.createGuideline(guidelineData);
      }

      setSuccess('Guideline published successfully.');
      setTimeout(() => {
        resetForm();
        onSuccess();
        onClose();
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to publish guideline.');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', version: '1.0', category: '', specialty: '', keywords: '',
      effective_date: new Date().toISOString().split('T')[0], expiry_date: '',
      target_roles: ['doctor', 'nurse'], priority: 'medium',
      content_type: 'pdf', text_content: ''
    });
    setFile(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!isOpen) return null;

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
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">New Clinical Guideline</h2>
            <p className="text-sm text-gray-500 mt-1">Share protocols with your organization</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Status Messages */}
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

            {/* Section 1: Basic Info */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                <FileText className="w-4 h-4 mr-2" /> Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Guideline Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium"
                    placeholder="e.g. Sepsis Management Protocol 2024"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm resize-none"
                    placeholder="Briefly describe the purpose..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
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
                        onClick={() => setFormData(prev => ({ ...prev, priority: p as any }))}
                        className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${formData.priority === p
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

            {/* Section 2: Details & Content */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <Tag className="w-4 h-4 mr-2" /> Targeting & Meta
                </h3>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Target Roles</label>
                  <div className="flex flex-wrap gap-2">
                    {roles.map(role => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleToggle(role)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${formData.target_roles.includes(role)
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        {role.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Effective Date</label>
                    <input
                      type="date"
                      name="effective_date"
                      value={formData.effective_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Version</label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <FileType className="w-4 h-4 mr-2" /> Content Source
                </h3>

                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {[
                    { id: 'pdf', label: 'Upload File' },
                    { id: 'text', label: 'Write Content' }
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, content_type: type.id as any }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.content_type === type.id
                          ? 'bg-white shadow-sm text-gray-900'
                          : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {formData.content_type === 'pdf' ? (
                  <div
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${file ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200 hover:border-emerald-300 bg-gray-50 hover:bg-white'
                      }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {file ? (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-gray-900 text-sm mb-1">{file.name}</p>
                        <p className="text-xs text-gray-400 mb-4">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-xs text-red-500 hover:text-red-700 font-bold"
                        >
                          Remove File
                        </button>
                      </div>
                    ) : (
                      <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-gray-700 text-sm mb-1">Click to upload</p>
                        <p className="text-xs text-gray-400">PDF, Word, or Text (Max 10MB)</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea
                    name="text_content"
                    value={formData.text_content}
                    onChange={handleInputChange}
                    className="w-full h-40 p-4 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none"
                    placeholder="Enter the full guideline content..."
                  ></textarea>
                )}
              </div>
            </section>

          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className={`px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black hover:shadow-xl'
              }`}
          >
            {uploading ? 'Publishing...' : 'Publish Guideline'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default GuidelineUploadModal;