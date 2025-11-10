import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader } from 'lucide-react';
import {
  getMyPracticePage,
  updatePracticePage,
  PracticePageDetail,
  CreatePracticePageRequest,
} from '../../services/practicePageService';

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const NIGERIAN_LANGUAGES = [
  'English',
  'Hausa',
  'Yoruba',
  'Igbo',
  'Pidgin English',
  'Fulfulde',
  'Kanuri',
  'Ibibio',
  'Tiv',
  'Ijaw',
  'Edo',
  'Nupe',
  'Efik',
  'Urhobo',
  'Igala',
  'Idoma',
];

const PAYMENT_METHODS = [
  'Cash',
  'Debit Card',
  'Credit Card',
  'Bank Transfer',
  'USSD',
  'Mobile Money',
  'POS',
  'Paystack',
  'Flutterwave',
  'Interswitch',
  'Remita',
  'Opay',
  'Palmpay',
  'Kuda',
];

const PHARMACY_SERVICES = [
  'Prescription Dispensing',
  'Over-the-Counter Medications',
  'Health Consultations',
  'Medication Counseling',
  'Immunizations & Vaccinations',
  'Health Screenings',
  'Blood Pressure Monitoring',
  'Blood Glucose Testing',
  'Medical Equipment Sales',
  'First Aid Supplies',
  'Vitamins & Supplements',
  'Home Delivery Service',
  'Medication Therapy Management',
  'Chronic Disease Management',
  'Compounding Services',
  'Travel Health Consultations',
];

export const EditPracticePageForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PracticePageDetail | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<CreatePracticePageRequest>>({
    practice_name: '',
    tagline: '',
    about: '',
    service_type: 'in_store',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    website: '',
    whatsapp_number: '',
    opening_hours: {},
    services_offered: [],
    payment_methods: [],
    languages_spoken: [],
  });

  // Load existing page data
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getMyPracticePage();

      if (result.hasPage && result.page) {
        setPageData(result.page);

        // Populate form with existing data
        setFormData({
          practice_name: result.page.practice_name,
          tagline: result.page.tagline,
          about: result.page.about,
          service_type: result.page.service_type,
          address_line_1: result.page.address_line_1,
          address_line_2: result.page.address_line_2,
          city: result.page.city,
          state: result.page.state,
          postcode: result.page.postcode,
          phone: result.page.phone,
          email: result.page.email,
          website: result.page.website,
          whatsapp_number: result.page.whatsapp_number,
          opening_hours: result.page.opening_hours || {},
          services_offered: result.page.services_offered || [],
          payment_methods: result.page.payment_methods || [],
          languages_spoken: result.page.languages_spoken || [],
        });
      } else {
        setError('No practice page found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load practice page');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleArrayAdd = (field: 'services_offered' | 'payment_methods' | 'languages_spoken', value: string) => {
    if (value.trim()) {
      const currentArray = formData[field] || [];
      if (!currentArray.includes(value.trim())) {
        setFormData(prev => ({
          ...prev,
          [field]: [...currentArray, value.trim()],
        }));
      }
    }
  };

  const handleArrayRemove = (field: 'services_offered' | 'payment_methods' | 'languages_spoken', index: number) => {
    const currentArray = formData[field] || [];
    setFormData(prev => ({
      ...prev,
      [field]: currentArray.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await updatePracticePage(formData);

      if (result.success) {
        setSuccessMessage('Practice page updated successfully!');
        setTimeout(() => {
          navigate('/professional/practice-page');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update practice page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading practice page...</p>
        </div>
      </div>
    );
  }

  if (error && !pageData) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Edit Practice Page</h1>
          <p className="mt-2 text-gray-600">Update your professional presence</p>
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong className="font-bold">Error:</strong> {error}
        </div>

        <button
          onClick={() => navigate('/professional/practice-page')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Edit Practice Page</h1>
            <p className="mt-2 text-gray-600">Update your professional presence</p>
          </div>
          <button
            onClick={() => navigate('/professional/practice-page')}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Practice Name *
                  </label>
                  <input
                    type="text"
                    value={formData.practice_name}
                    onChange={(e) => handleInputChange('practice_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    placeholder="A brief description of your practice"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Your Practice *
                  </label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    rows={6}
                    placeholder="Describe your practice, expertise, and what makes you unique..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    value={formData.service_type}
                    onChange={(e) => handleInputChange('service_type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="in_store">In-Store Only</option>
                    <option value="virtual">Virtual Only</option>
                    <option value="both">Both In-Store & Virtual</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Location & Contact</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1 {(formData.service_type === 'in_store' || formData.service_type === 'both') && '*'}
                  </label>
                  <input
                    type="text"
                    value={formData.address_line_1}
                    onChange={(e) => handleInputChange('address_line_1', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={formData.service_type === 'in_store' || formData.service_type === 'both'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.address_line_2}
                    onChange={(e) => handleInputChange('address_line_2', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City {(formData.service_type === 'in_store' || formData.service_type === 'both') && '*'}
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={formData.service_type === 'in_store' || formData.service_type === 'both'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State {(formData.service_type === 'in_store' || formData.service_type === 'both') && '*'}
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={formData.service_type === 'in_store' || formData.service_type === 'both'}
                    >
                      <option value="">Select State</option>
                      {NIGERIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => handleInputChange('postcode', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp_number}
                      onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Opening Hours Section */}
                {(formData.service_type === 'in_store' || formData.service_type === 'both') && (
                  <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Opening Hours</h4>
                    <p className="text-sm text-gray-600 mb-4">Set your pharmacy's opening hours for each day of the week</p>

                    <div className="space-y-3">
                      {DAYS_OF_WEEK.map((day) => (
                        <div key={day} className="flex items-center gap-3">
                          <div className="w-24">
                            <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                          </div>
                          <input
                            type="time"
                            value={formData.opening_hours?.[day]?.open || ''}
                            onChange={(e) => {
                              const hours = { ...formData.opening_hours };
                              if (!hours[day]) hours[day] = { open: '', close: '', closed: false };
                              hours[day].open = e.target.value;
                              handleInputChange('opening_hours', hours);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={formData.opening_hours?.[day]?.close || ''}
                            onChange={(e) => {
                              const hours = { ...formData.opening_hours };
                              if (!hours[day]) hours[day] = { open: '', close: '', closed: false };
                              hours[day].close = e.target.value;
                              handleInputChange('opening_hours', hours);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const hours = { ...formData.opening_hours };
                              if (!hours[day]) hours[day] = { open: '', close: '', closed: false };
                              hours[day].closed = !hours[day].closed;
                              if (hours[day].closed) {
                                hours[day].open = '';
                                hours[day].close = '';
                              }
                              handleInputChange('opening_hours', hours);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              formData.opening_hours?.[day]?.closed
                                ? 'bg-red-100 text-red-700 border border-red-300'
                                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            {formData.opening_hours?.[day]?.closed ? 'Closed' : 'Mark Closed'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Services Offered */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Services Offered</h3>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleArrayAdd('services_offered', e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a service</option>
                    {PHARMACY_SERVICES.filter(
                      service => !(formData.services_offered || []).includes(service)
                    ).map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  {(formData.services_offered || []).map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{service}</span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove('services_offered', index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleArrayAdd('payment_methods', e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select payment method</option>
                    {PAYMENT_METHODS.filter(
                      method => !(formData.payment_methods || []).includes(method)
                    ).map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  {(formData.payment_methods || []).map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{method}</span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove('payment_methods', index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Languages Spoken</h3>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleArrayAdd('languages_spoken', e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a language</option>
                    {NIGERIAN_LANGUAGES.filter(
                      language => !(formData.languages_spoken || []).includes(language)
                    ).map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  {(formData.languages_spoken || []).map((language, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{language}</span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove('languages_spoken', index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/professional/practice-page')}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            {saving ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPracticePageForm;
