import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';

// List of countries
const countries = [
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'ghana', label: 'Ghana' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'south-africa', label: 'South Africa' },
  { value: 'united-states', label: 'United States' },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'india', label: 'India' },
  { value: 'china', label: 'China' },
  // Add more countries as needed
];

// List of Nigerian states
const nigerianStates = [
  { value: 'abia', label: 'Abia' },
  { value: 'adamawa', label: 'Adamawa' },
  { value: 'akwa-ibom', label: 'Akwa Ibom' },
  { value: 'anambra', label: 'Anambra' },
  { value: 'bauchi', label: 'Bauchi' },
  { value: 'bayelsa', label: 'Bayelsa' },
  { value: 'benue', label: 'Benue' },
  { value: 'borno', label: 'Borno' },
  { value: 'cross-river', label: 'Cross River' },
  { value: 'delta', label: 'Delta' },
  { value: 'ebonyi', label: 'Ebonyi' },
  { value: 'edo', label: 'Edo' },
  { value: 'ekiti', label: 'Ekiti' },
  { value: 'enugu', label: 'Enugu' },
  { value: 'fct', label: 'Federal Capital Territory' },
  { value: 'gombe', label: 'Gombe' },
  { value: 'imo', label: 'Imo' },
  { value: 'jigawa', label: 'Jigawa' },
  { value: 'kaduna', label: 'Kaduna' },
  { value: 'kano', label: 'Kano' },
  { value: 'katsina', label: 'Katsina' },
  { value: 'kebbi', label: 'Kebbi' },
  { value: 'kogi', label: 'Kogi' },
  { value: 'kwara', label: 'Kwara' },
  { value: 'lagos', label: 'Lagos' },
  { value: 'nasarawa', label: 'Nasarawa' },
  { value: 'niger', label: 'Niger' },
  { value: 'ogun', label: 'Ogun' },
  { value: 'ondo', label: 'Ondo' },
  { value: 'osun', label: 'Osun' },
  { value: 'oyo', label: 'Oyo' },
  { value: 'plateau', label: 'Plateau' },
  { value: 'rivers', label: 'Rivers' },
  { value: 'sokoto', label: 'Sokoto' },
  { value: 'taraba', label: 'Taraba' },
  { value: 'yobe', label: 'Yobe' },
  { value: 'zamfara', label: 'Zamfara' },
];

// Helper function to ensure secondary_languages is always an array of strings
const ensureLanguagesArray = (value: any): string[] => {
  // If null or undefined, return empty array
  if (value === null || value === undefined) {
    return [];
  }
  
  // If already an array, make a copy and ensure all items are strings
  if (Array.isArray(value)) {
    return value
      .filter(item => item !== null && item !== undefined)
      .map(item => String(item).trim());
  }
  
  // If it's a string that looks like a JSON array
  if (typeof value === 'string' && value.trim().startsWith('[') && value.trim().endsWith(']')) {
    try {
      // Try to parse as JSON
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed
          .filter(item => item !== null && item !== undefined)
          .map(item => String(item).trim());
      }
      // If parsed but not an array, treat as comma-separated string inside brackets
      return value
        .slice(1, -1)
        .split(',')
        .map(lang => lang.trim().replace(/['"]/g, ''))
        .filter(lang => lang.length > 0);
    } catch (e) {
      // If parsing fails, manually extract values
      return value
        .slice(1, -1)
        .split(',')
        .map(lang => lang.trim().replace(/['"]/g, ''))
        .filter(lang => lang.length > 0);
    }
  }
  
  // If it's a regular string, split by commas
  if (typeof value === 'string') {
    return value
      .split(',')
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0);
  }
  
  // For any other type, try to convert to string and split
  try {
    const asString = String(value);
    return asString
      .split(',')
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0);
  } catch (e) {
    console.error("Failed to convert value to string array:", e);
    return [];
  }
};

const PersonalDetailsPage: React.FC = () => {
  const { user, isAuthenticated, updateUserProfile } = useAuth();

  // Debug the user object, specifically looking at secondary_languages
  console.log('User object in PersonalDetailsPage:', user);
  if (user && user.secondary_languages) {
    console.log('Raw secondary_languages from user object:', user.secondary_languages);
    console.log('Type of secondary_languages:', typeof user.secondary_languages);
    console.log('Is Array?', Array.isArray(user.secondary_languages));
    
    // Debug conversion
    const processedLanguages = ensureLanguagesArray(user.secondary_languages);
    console.log('After ensureLanguagesArray:', processedLanguages);
    console.log('Processed type:', typeof processedLanguages);
    console.log('Is Array after processing?', Array.isArray(processedLanguages));
  }

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    date_of_birth: user?.date_of_birth || '',
    phone: user?.phone || '',
    country: user?.country || '',
    state: user?.state || '',
    city: user?.city || '',
    gender: user?.gender || '',
    preferred_language: user?.preferred_language || '',
    secondary_languages: ensureLanguagesArray(user?.secondary_languages),
    custom_language: user?.custom_language || '',
  });

  const [selectedCountry, setSelectedCountry] = useState<string>('');

  // Update selected country when form data changes
  useEffect(() => {
    setSelectedCountry(formData.country || '');
  }, [formData.country]);

  useEffect(() => {
    if (user) {
      // Process secondary_languages properly
      const processedLanguages = ensureLanguagesArray(user.secondary_languages);
      
      console.log('Setting form data with processed secondary_languages:', processedLanguages);
      
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        date_of_birth: user.date_of_birth || '',
        phone: user.phone || '',
        country: user.country || '',
        state: user.state || '',
        city: user.city || '',
        gender: user.gender || '',
        preferred_language: user.preferred_language || '',
        secondary_languages: processedLanguages,
        custom_language: user.custom_language || '',
      });
    }
  }, [user]);

  // Log the formData state after setting
  console.log('Current formData state:', formData);
  console.log('secondary_languages in formData:', formData.secondary_languages);
  console.log('Type:', typeof formData.secondary_languages);
  console.log('Is Array?', Array.isArray(formData.secondary_languages));

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Reset state when country changes
    if (name === 'country' && value !== formData.country) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        state: '', // Reset state when country changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    
    // Get array of selected values - ensure it's a proper array of strings
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    
    console.log('Selected languages:', selectedOptions);
    console.log('Type of selectedOptions:', typeof selectedOptions);
    console.log('Is Array?', Array.isArray(selectedOptions));
    
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Track which fields have been changed - perfect for PATCH method
    const changedFields: Record<string, any> = {};
    
    // Compare current form data with original user data
    if (user) {
      // Check each field to see if it has changed
      if (formData.phone !== user.phone) {
        changedFields.phone = formData.phone || '';
      }
      
      if (formData.country !== user.country) {
        changedFields.country = formData.country || '';
      }
      
      if (formData.state !== user.state) {
        changedFields.state = formData.state || '';
      }
      
      if (formData.city !== user.city) {
        changedFields.city = formData.city || '';
      }
      
      if (formData.date_of_birth !== user.date_of_birth) {
        changedFields.date_of_birth = formData.date_of_birth || '';
      }
      
      if (formData.gender !== user.gender) {
        changedFields.gender = formData.gender || '';
      }
      
      if (formData.preferred_language !== user.preferred_language) {
        changedFields.preferred_language = formData.preferred_language || '';
      }
      
      // For custom_language, only check if preferred_language is 'other'
      if (formData.preferred_language === 'other' && formData.custom_language !== user.custom_language) {
        changedFields.custom_language = formData.custom_language || '';
      }
      
      // For secondary_languages, use a more robust comparison
      const userLanguages = ensureLanguagesArray(user.secondary_languages);
      const formLanguages = ensureLanguagesArray(formData.secondary_languages);
      
      console.log('Comparing secondary_languages:');
      console.log('User languages:', userLanguages);
      console.log('Form languages:', formLanguages);
      
      // Check if arrays have different lengths
      if (userLanguages.length !== formLanguages.length) {
        console.log('Arrays have different lengths');
        changedFields.secondary_languages = formLanguages;
      } 
      // Check if arrays have the same elements
      else if (!userLanguages.every(lang => formLanguages.includes(lang)) || 
              !formLanguages.every(lang => userLanguages.includes(lang))) {
        console.log('Arrays have different elements');
        changedFields.secondary_languages = formLanguages;
      }
    } else {
      // If no user data, consider all fields as changed
      changedFields.phone = formData.phone || '';
      changedFields.country = formData.country || '';
      changedFields.state = formData.state || '';
      changedFields.city = formData.city || '';
      changedFields.date_of_birth = formData.date_of_birth || '';
      changedFields.gender = formData.gender || '';
      changedFields.preferred_language = formData.preferred_language || '';
      changedFields.custom_language = formData.custom_language || '';
      changedFields.secondary_languages = ensureLanguagesArray(formData.secondary_languages);
    }
    
    // Check if any fields have been changed
    if (Object.keys(changedFields).length === 0) {
      setSuccessMessage('No changes were made');
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsEditing(false);
      return;
    }
    
    // Debug the data before sending
    console.log('Sending only changed fields with PATCH:', changedFields);
    console.log('Number of changed fields:', Object.keys(changedFields).length);
    
    if (changedFields.secondary_languages) {
      console.log('secondary_languages before sending:');
      console.log('Value:', changedFields.secondary_languages);
      console.log('Type:', typeof changedFields.secondary_languages);
      console.log('Is Array?', Array.isArray(changedFields.secondary_languages));
    }

    try {
      await updateUserProfile(changedFields);
      setSuccessMessage('Personal details updated successfully');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error("Update profile failed:", error);
      setErrorMessage(error.message || 'Failed to update personal details');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // Language options
  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'other', label: 'Other' },
  ];

  // Gender options
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
  ];

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Personal Details</h1>
          <p className="text-xl font-medium">
            Manage your personal information
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#0891b2] hover:underline flex items-center"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="space-y-6">
              {/* Read-only fields */}
              <div>
                <label htmlFor="full_name" className="block text-gray-700 font-medium mb-2">
                  Full Name <span className="text-sm text-gray-500">(read-only)</span>
                </label>
                <p className="p-2 bg-gray-50 rounded-md">{formData.full_name || 'Not provided'}</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address <span className="text-sm text-gray-500">(read-only)</span>
                </label>
                <p className="p-2 bg-gray-50 rounded-md">{formData.email || 'Not provided'}</p>
              </div>

              {/* Editable fields */}
              <div>
                <label htmlFor="date_of_birth" className="block text-gray-700 font-medium mb-2">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{formData.date_of_birth || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">
                    {formData.gender ? 
                      genderOptions.find(o => o.value === formData.gender)?.label || formData.gender 
                      : 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{formData.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                  Country
                </label>
                {isEditing ? (
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">
                    {formData.country ? 
                      countries.find(c => c.value === formData.country)?.label || formData.country 
                      : 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                  State/Province
                </label>
                {isEditing ? (
                  <>
                    {selectedCountry === 'nigeria' ? (
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a state</option>
                        {nigerianStates.map((stateOption) => (
                          <option key={stateOption.value} value={stateOption.value}>
                            {stateOption.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your state or province"
                      />
                    )}
                  </>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">
                    {formData.state ? 
                      (selectedCountry === 'nigeria' ? 
                        nigerianStates.find(s => s.value === formData.state)?.label || formData.state 
                        : formData.state)
                      : 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{formData.city || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label htmlFor="preferred_language" className="block text-gray-700 font-medium mb-2">
                  Preferred Language
                </label>
                {isEditing ? (
                  <select
                    id="preferred_language"
                    name="preferred_language"
                    value={formData.preferred_language}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a language</option>
                    {languageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">
                    {formData.preferred_language ? 
                      languageOptions.find(o => o.value === formData.preferred_language)?.label || formData.preferred_language 
                      : 'Not provided'}
                  </p>
                )}
              </div>

              {formData.preferred_language === 'other' && (
                <div>
                  <label htmlFor="custom_language" className="block text-gray-700 font-medium mb-2">
                    Other Language
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="custom_language"
                      name="custom_language"
                      value={formData.custom_language}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Specify your language"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md">{formData.custom_language || 'Not provided'}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="secondary_languages" className="block text-gray-700 font-medium mb-2">
                  Secondary Languages
                </label>
                {isEditing ? (
                  <select
                    id="secondary_languages"
                    name="secondary_languages"
                    multiple
                    value={formData.secondary_languages}
                    onChange={handleMultiSelectChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    size={4}
                  >
                    {languageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">
                    {formData.secondary_languages && formData.secondary_languages.length > 0
                      ? Array.isArray(formData.secondary_languages) 
                        ? formData.secondary_languages.map(lang => 
                            languageOptions.find(o => o.value === lang)?.label || lang
                          ).join(', ')
                        : 'None selected'
                      : 'None selected'}
                  </p>
                )}
                {isEditing && (
                  <p className="text-sm text-gray-500 mt-1">Hold Ctrl (or Cmd on Mac) to select multiple options</p>
                )}
              </div>

              {isEditing && (
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#0891b2] hover:bg-[#0e7490] text-white py-2 px-6 rounded-md transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
