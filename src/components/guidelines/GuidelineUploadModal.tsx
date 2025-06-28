import React, { useState, useRef } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'emergency', label: 'Emergency Protocols' },
    { value: 'surgery', label: 'Surgical Procedures' },
    { value: 'medication', label: 'Medication Guidelines' },
    { value: 'diagnosis', label: 'Diagnostic Protocols' },
    { value: 'treatment', label: 'Treatment Plans' },
    { value: 'prevention', label: 'Preventive Care' },
    { value: 'infection_control', label: 'Infection Control' },
    { value: 'patient_safety', label: 'Patient Safety' },
    { value: 'quality_assurance', label: 'Quality Assurance' },
    { value: 'maternity', label: 'Maternity Care' },
    { value: 'pediatric', label: 'Pediatric Care' },
    { value: 'geriatric', label: 'Geriatric Care' },
    { value: 'mental_health', label: 'Mental Health' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'laboratory', label: 'Laboratory Procedures' },
    { value: 'nursing', label: 'Nursing Protocols' },
    { value: 'other', label: 'Other' }
  ];

  const roles = [
    'doctor', 'nurse', 'pharmacist', 'lab_technician', 'physician_assistant',
    'medical_secretary', 'radiologist_tech', 'paramedic', 'emt', 'midwife'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (role: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      target_roles: checked
        ? [...prev.target_roles, role]
        : prev.target_roles.filter(r => r !== role)
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 
                           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                           'text/plain'];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please select a PDF, Word document, or text file.');
        return;
      }

      // Validate file size (10MB limit)
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
    
    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required.');
      return;
    }

    if (!formData.category) {
      setError('Category is required.');
      return;
    }

    if (formData.content_type === 'pdf' && !file) {
      setError('Please select a file to upload.');
      return;
    }

    if (formData.content_type === 'text' && !formData.text_content.trim()) {
      setError('Text content is required for text-based guidelines.');
      return;
    }

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
        // Upload with file - create FormData
        const uploadFormData = new FormData();
        
        // Add file
        uploadFormData.append('file', file);
        
        // Add all guideline data
        uploadFormData.append('title', guidelineData.title);
        uploadFormData.append('description', guidelineData.description);
        uploadFormData.append('version', guidelineData.version);
        uploadFormData.append('category', guidelineData.category);
        uploadFormData.append('effective_date', guidelineData.effective_date);
        uploadFormData.append('priority', guidelineData.priority);
        uploadFormData.append('content_type', guidelineData.content_type);
        
        if (guidelineData.specialty) {
          uploadFormData.append('specialty', guidelineData.specialty);
        }
        if (guidelineData.expiry_date) {
          uploadFormData.append('expiry_date', guidelineData.expiry_date);
        }
        if (guidelineData.keywords && guidelineData.keywords.length > 0) {
          uploadFormData.append('keywords', guidelineData.keywords.join(','));
        }
        if (guidelineData.target_roles && guidelineData.target_roles.length > 0) {
          uploadFormData.append('target_roles', guidelineData.target_roles.join(','));
        }
        
        const result = await guidelinesService.uploadGuideline(uploadFormData);
        setSuccess(result.message || 'Clinical guideline uploaded successfully.');
      } else {
        // Create text-based guideline
        await guidelinesService.createGuideline(guidelineData);
        setSuccess('Clinical guideline created successfully.');
      }

      // Reset form and close modal after success
      setTimeout(() => {
        resetForm();
        onSuccess();
        onClose();
      }, 2000);

    } catch (err: any) {
      console.error('Error uploading guideline:', err);
      setError(err.response?.data?.error || 'Failed to upload guideline. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
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
    setFile(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (!uploading) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Upload Clinical Guideline</h2>
          <button
            onClick={handleClose}
            disabled={uploading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter guideline title"
                required
                disabled={uploading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the purpose and scope of this guideline"
                required
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1.0"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={uploading}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Cardiology, Pediatrics"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date *
              </label>
              <input
                type="date"
                name="effective_date"
                value={formData.effective_date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., emergency, protocol, treatment"
                disabled={uploading}
              />
            </div>
          </div>

          {/* Target Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Roles *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {roles.map((role) => (
                <label key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.target_roles.includes(role)}
                    onChange={(e) => handleRoleChange(role, e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    disabled={uploading}
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {role.replace('_', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="content_type"
                  value="pdf"
                  checked={formData.content_type === 'pdf'}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  disabled={uploading}
                />
                <span className="text-sm text-gray-700">File Upload (PDF/DOC)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="content_type"
                  value="text"
                  checked={formData.content_type === 'text'}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  disabled={uploading}
                />
                <span className="text-sm text-gray-700">Text Content</span>
              </label>
            </div>
          </div>

          {/* File Upload */}
          {formData.content_type === 'pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />
                {file ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-600 hover:text-red-800"
                      disabled={uploading}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, or TXT files up to 10MB
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                      disabled={uploading}
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Content */}
          {formData.content_type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content *
              </label>
              <textarea
                name="text_content"
                value={formData.text_content}
                onChange={handleInputChange}
                rows={10}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the guideline content here..."
                required={formData.content_type === 'text'}
                disabled={uploading}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={uploading}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !formData.title || !formData.description || !formData.category}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center justify-center"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Guideline
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuidelineUploadModal;