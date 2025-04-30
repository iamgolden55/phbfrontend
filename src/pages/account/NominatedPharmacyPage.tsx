import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Pharmacy = {
  id: string;
  name: string;
  address: string;
  distance: number;
  phone: string;
  openingHours: {
    day: string;
    hours: string;
  }[];
};

const NominatedPharmacyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>('2'); // Default selected for demo
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  // Mock pharmacies
  const nearbyPharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'Community Pharmacy',
      address: '123 High Street, London, SW1A 1AA',
      distance: 0.4,
      phone: '020 1234 5678',
      openingHours: [
        { day: 'Monday - Friday', hours: '9:00 - 18:00' },
        { day: 'Saturday', hours: '9:00 - 17:00' },
        { day: 'Sunday', hours: 'Closed' },
      ],
    },
    {
      id: '2',
      name: 'MedExpress Pharmacy',
      address: '45 Main Road, London, SW1A 2BB',
      distance: 0.8,
      phone: '020 2345 6789',
      openingHours: [
        { day: 'Monday - Friday', hours: '8:00 - 20:00' },
        { day: 'Saturday', hours: '9:00 - 18:00' },
        { day: 'Sunday', hours: '10:00 - 16:00' },
      ],
    },
    {
      id: '3',
      name: 'Healthwise Pharmacy',
      address: '78 Park Lane, London, SW1A 3CC',
      distance: 1.3,
      phone: '020 3456 7890',
      openingHours: [
        { day: 'Monday - Friday', hours: '8:30 - 19:00' },
        { day: 'Saturday', hours: '9:00 - 17:30' },
        { day: 'Sunday', hours: 'Closed' },
      ],
    },
    {
      id: '4',
      name: 'Central Chemist',
      address: '12 Station Road, London, SW1A 4DD',
      distance: 1.7,
      phone: '020 4567 8901',
      openingHours: [
        { day: 'Monday - Friday', hours: '9:00 - 18:30' },
        { day: 'Saturday', hours: '9:00 - 13:00' },
        { day: 'Sunday', hours: 'Closed' },
      ],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    // In a real app, this would trigger an API call to search for pharmacies based on searchTerm
  };

  const handleSelectPharmacy = (id: string) => {
    setSelectedPharmacyId(id);
  };

  const handleSaveNomination = () => {
    // In a real app, this would save the nomination to the user's profile via an API call
    setConfirmationVisible(true);
    setTimeout(() => {
      setConfirmationVisible(false);
    }, 5000);
  };

  const selectedPharmacy = nearbyPharmacies.find(pharmacy => pharmacy.id === selectedPharmacyId);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/account" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Account
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">Nominated Pharmacy</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your nominated pharmacy</h1>

      {confirmationVisible && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">
                Your nominated pharmacy has been updated successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Your nominated pharmacy is where your electronic prescriptions will be sent. You can collect your medicine from this pharmacy without needing a paper prescription.
            </p>
          </div>
        </div>
      </div>

      {/* Current nominated pharmacy */}
      {selectedPharmacyId && (
        <div className="bg-white shadow-sm rounded-lg mb-8 overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your current nominated pharmacy</h2>
            {selectedPharmacy && (
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-lg">{selectedPharmacy.name}</h3>
                <p className="text-gray-600 mt-1">{selectedPharmacy.address}</p>
                <p className="text-gray-600 mt-1">Tel: {selectedPharmacy.phone}</p>
                <div className="mt-3">
                  <h4 className="font-medium text-sm text-gray-700">Opening hours:</h4>
                  <ul className="text-sm text-gray-600">
                    {selectedPharmacy.openingHours.map((hours, idx) => (
                      <li key={idx} className="mt-1">
                        <span className="font-medium">{hours.day}:</span> {hours.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search for a new pharmacy */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Change your nominated pharmacy</h2>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <label htmlFor="pharmacy-search" className="sr-only">
                  Search for a pharmacy by name, postcode or town
                </label>
                <input
                  type="text"
                  id="pharmacy-search"
                  placeholder="Search by name, postcode or town"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </form>

          {searchPerformed || true ? ( // Always show for demo purposes
            <>
              <h3 className="font-medium text-gray-900 mb-3">Nearby pharmacies</h3>
              <div className="border rounded-md overflow-hidden">
                {nearbyPharmacies.map((pharmacy) => (
                  <div
                    key={pharmacy.id}
                    className={`p-4 border-b last:border-b-0 ${selectedPharmacyId === pharmacy.id ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-3 sm:mb-0">
                        <h4 className="font-medium">{pharmacy.name}</h4>
                        <p className="text-sm text-gray-600">{pharmacy.address}</p>
                        <p className="text-sm text-gray-600">{pharmacy.distance} miles away</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={() => window.open(`tel:${pharmacy.phone.replace(/\s/g, '')}`)}
                        >
                          <svg className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call
                        </button>
                        <button
                          type="button"
                          className={`inline-flex items-center px-3 py-1.5 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            selectedPharmacyId === pharmacy.id
                              ? 'border-green-500 text-green-700 bg-green-50'
                              : 'border-blue-500 text-blue-700 bg-white hover:bg-blue-50'
                          }`}
                          onClick={() => handleSelectPharmacy(pharmacy.id)}
                        >
                          {selectedPharmacyId === pharmacy.id ? (
                            <>
                              <svg className="h-4 w-4 mr-1.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Selected
                            </>
                          ) : (
                            'Select'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-right">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleSaveNomination}
                >
                  Save choice
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 italic">Search for pharmacies to display results</p>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Need help?</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/prescriptions/how-nominations-work" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How pharmacy nominations work
            </Link>
          </li>
          <li>
            <Link to="/account/request-prescription" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Request a prescription
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NominatedPharmacyPage;
