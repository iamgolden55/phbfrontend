import React, { useState, useRef, useEffect } from 'react';

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface CountryPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

const countries: Country[] = [
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳' },
];

const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Enter phone number",
  className = "",
  error = false,
  disabled = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.code === 'NG') || countries[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.startsWith(selectedCountry.dialCode)) {
      setPhoneNumber(value.substring(selectedCountry.dialCode.length).trim());
    } else {
      setPhoneNumber(value);
    }
  }, [value, selectedCountry.dialCode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm('');
    const newValue = phoneNumber ? `${country.dialCode} ${phoneNumber}` : country.dialCode;
    onChange(newValue);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    const fullValue = newPhoneNumber ? `${selectedCountry.dialCode} ${newPhoneNumber}` : selectedCountry.dialCode;
    onChange(fullValue);
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className={`flex border rounded-md bg-white transition-all duration-200 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${
          isDropdownOpen ? 'ring-2 ring-[#0891b2] ring-opacity-20 border-[#0891b2]' : 'hover:border-gray-400'
        } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}>
        
        <button
          type="button"
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center px-3 py-2 border-r border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors rounded-l-md ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          disabled={disabled}
        >
          <span className="text-lg mr-2">{selectedCountry.flag}</span>
          <span className="font-medium text-gray-700 mr-1">{selectedCountry.dialCode}</span>
          <svg className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          className={`flex-1 px-3 py-2 border-none outline-none rounded-r-md ${
            disabled ? 'cursor-not-allowed bg-gray-50 text-gray-500' : 'bg-white'
          }`}
          disabled={disabled}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-[#0891b2]"
            />
          </div>
          
          <div className="max-h-40 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                  selectedCountry.code === country.code ? 'bg-blue-50 text-[#0891b2]' : 'text-gray-700'
                }`}
              >
                <span className="text-lg mr-3">{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="font-medium text-gray-500">{country.dialCode}</span>
              </button>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="p-3 text-center text-gray-500 text-sm">
              No countries found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryPhoneInput;