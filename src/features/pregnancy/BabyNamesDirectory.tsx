import React, { useState, useEffect, useMemo } from 'react';

interface BabyName {
  id: number;
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  meaning: string;
  popularity?: string;
}

// Sample baby names data - In a real application, this would be fetched from an API
const sampleBabyNames: BabyName[] = [
  { id: 1, name: 'Olivia', gender: 'girl', origin: 'Latin', meaning: 'Olive tree', popularity: 'Very popular' },
  { id: 2, name: 'Noah', gender: 'boy', origin: 'Hebrew', meaning: 'Rest, comfort', popularity: 'Very popular' },
  { id: 3, name: 'Emma', gender: 'girl', origin: 'Germanic', meaning: 'Universal', popularity: 'Very popular' },
  { id: 4, name: 'Liam', gender: 'boy', origin: 'Irish', meaning: 'Strong-willed warrior', popularity: 'Very popular' },
  { id: 5, name: 'Ava', gender: 'girl', origin: 'Latin', meaning: 'Life', popularity: 'Popular' },
  { id: 6, name: 'Oliver', gender: 'boy', origin: 'Latin', meaning: 'Olive tree', popularity: 'Popular' },
  { id: 7, name: 'Charlotte', gender: 'girl', origin: 'French', meaning: 'Free man', popularity: 'Popular' },
  { id: 8, name: 'Elijah', gender: 'boy', origin: 'Hebrew', meaning: 'Yahweh is God', popularity: 'Popular' },
  { id: 9, name: 'Amelia', gender: 'girl', origin: 'Germanic', meaning: 'Work', popularity: 'Popular' },
  { id: 10, name: 'James', gender: 'boy', origin: 'Hebrew', meaning: 'Supplanter', popularity: 'Popular' },
  { id: 11, name: 'Mia', gender: 'girl', origin: 'Italian', meaning: 'Mine', popularity: 'Popular' },
  { id: 12, name: 'Benjamin', gender: 'boy', origin: 'Hebrew', meaning: 'Son of the right hand', popularity: 'Popular' },
  { id: 13, name: 'Harper', gender: 'girl', origin: 'English', meaning: 'Harp player', popularity: 'Popular' },
  { id: 14, name: 'Lucas', gender: 'boy', origin: 'Greek', meaning: 'Bringer of light', popularity: 'Popular' },
  { id: 15, name: 'Evelyn', gender: 'girl', origin: 'English', meaning: 'Wished for child', popularity: 'Popular' },
  { id: 16, name: 'Mason', gender: 'boy', origin: 'English', meaning: 'Stone worker', popularity: 'Popular' },
  { id: 17, name: 'Ella', gender: 'girl', origin: 'German', meaning: 'Fairy maiden', popularity: 'Popular' },
  { id: 18, name: 'Ethan', gender: 'boy', origin: 'Hebrew', meaning: 'Strong, firm', popularity: 'Popular' },
  { id: 19, name: 'Avery', gender: 'unisex', origin: 'English', meaning: 'Ruler of the elves', popularity: 'Popular' },
  { id: 20, name: 'Aria', gender: 'girl', origin: 'Italian', meaning: 'Air; melody', popularity: 'Rising' },
  { id: 21, name: 'Alexander', gender: 'boy', origin: 'Greek', meaning: 'Defender of the people', popularity: 'Steady' },
  { id: 22, name: 'Sophia', gender: 'girl', origin: 'Greek', meaning: 'Wisdom', popularity: 'Very popular' },
  { id: 23, name: 'William', gender: 'boy', origin: 'Germanic', meaning: 'Resolute protector', popularity: 'Steady' },
  { id: 24, name: 'Riley', gender: 'unisex', origin: 'Irish', meaning: 'Valiant', popularity: 'Rising' },
  { id: 25, name: 'Scarlett', gender: 'girl', origin: 'English', meaning: 'Red', popularity: 'Rising' },
  { id: 26, name: 'Henry', gender: 'boy', origin: 'Germanic', meaning: 'Ruler of the home', popularity: 'Rising' },
  { id: 27, name: 'Lily', gender: 'girl', origin: 'English', meaning: 'Pure, passion', popularity: 'Popular' },
  { id: 28, name: 'Jackson', gender: 'boy', origin: 'English', meaning: 'Son of Jack', popularity: 'Popular' },
  { id: 29, name: 'Aurora', gender: 'girl', origin: 'Latin', meaning: 'Dawn', popularity: 'Rising' },
  { id: 30, name: 'Aiden', gender: 'boy', origin: 'Irish', meaning: 'Little fire', popularity: 'Popular' },
  { id: 31, name: 'Quinn', gender: 'unisex', origin: 'Irish', meaning: 'Counsel', popularity: 'Rising' },
  { id: 32, name: 'Zoe', gender: 'girl', origin: 'Greek', meaning: 'Life', popularity: 'Popular' },
  { id: 33, name: 'Rowan', gender: 'unisex', origin: 'Irish', meaning: 'Little red one', popularity: 'Rising' },
  { id: 34, name: 'Luna', gender: 'girl', origin: 'Latin', meaning: 'Moon', popularity: 'Rising' },
  { id: 35, name: 'Finn', gender: 'boy', origin: 'Irish', meaning: 'Fair', popularity: 'Rising' },
  { id: 36, name: 'Willow', gender: 'girl', origin: 'English', meaning: 'Willow tree', popularity: 'Rising' },
  { id: 37, name: 'Ezra', gender: 'boy', origin: 'Hebrew', meaning: 'Help', popularity: 'Rising' },
  { id: 38, name: 'Sage', gender: 'unisex', origin: 'Latin', meaning: 'Wise', popularity: 'Uncommon' },
  { id: 39, name: 'Nova', gender: 'girl', origin: 'Latin', meaning: 'New', popularity: 'Rising' },
  { id: 40, name: 'Theodore', gender: 'boy', origin: 'Greek', meaning: 'Gift of God', popularity: 'Rising' }
];

const allOrigins = [...new Set(sampleBabyNames.map(name => name.origin))].sort();
const genderFilters = [
  { value: 'all', label: 'All' },
  { value: 'boy', label: 'Boys' },
  { value: 'girl', label: 'Girls' },
  { value: 'unisex', label: 'Unisex' }
];

const BabyNamesDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [selectedName, setSelectedName] = useState<BabyName | null>(null);

  // Load favorites from localStorage on first render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('babyNameFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('babyNameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter names based on search term, gender, origin, letter, and favorites
  const filteredNames = useMemo(() => {
    return sampleBabyNames.filter(name => {
      // Filter by search term
      const matchesSearch = searchTerm === '' ||
        name.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        name.meaning.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by gender
      const matchesGender = selectedGender === 'all' || name.gender === selectedGender;

      // Filter by origin
      const matchesOrigin = selectedOrigin === 'all' || name.origin === selectedOrigin;

      // Filter by first letter
      const matchesLetter = selectedLetter === '' || name.name.charAt(0).toUpperCase() === selectedLetter;

      // Filter by favorites
      const matchesFavorites = !showOnlyFavorites || favorites.includes(name.id);

      return matchesSearch && matchesGender && matchesOrigin && matchesLetter && matchesFavorites;
    });
  }, [searchTerm, selectedGender, selectedOrigin, selectedLetter, showOnlyFavorites, favorites]);

  // Toggle a name as favorite
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Handle view name details
  const handleViewDetails = (name: BabyName) => {
    setSelectedName(name);
  };

  // Close the name details modal
  const handleCloseDetails = () => {
    setSelectedName(null);
  };

  // Generate A-Z alphabet buttons
  const alphabetButtons = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Baby Names Directory</h2>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">Search</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Search by name or meaning..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block mb-2 font-medium">Gender</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                {genderFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium">Origin</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
              >
                <option value="all">All Origins</option>
                {allOrigins.map(origin => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Browse by letter</label>
          <div className="flex flex-wrap gap-1">
            <button
              className={`px-2 py-1 border rounded-md text-sm ${selectedLetter === '' ? 'bg-[#005eb8] text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedLetter('')}
            >
              All
            </button>
            {alphabetButtons.map(letter => (
              <button
                key={letter}
                className={`px-2 py-1 border rounded-md text-sm ${selectedLetter === letter ? 'bg-[#005eb8] text-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Favorites Toggle */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={showOnlyFavorites}
              onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
            />
            <span className="font-medium">Show only favorites</span>
          </label>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredNames.length} {filteredNames.length === 1 ? 'name' : 'names'} found
          </p>

          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <select className="px-2 py-1 border border-gray-300 rounded-md text-sm">
              <option value="alphabetical">A to Z</option>
              <option value="popularity">Popularity</option>
              <option value="length">Length</option>
            </select>
          </div>
        </div>

        {/* Names List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNames.length > 0 ? (
            filteredNames.map(name => (
              <div key={name.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{name.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className={`
                        inline-block px-2 py-0.5 rounded-full text-xs font-medium mr-2
                        ${name.gender === 'boy' ? 'bg-blue-100 text-blue-700' :
                          name.gender === 'girl' ? 'bg-pink-100 text-pink-700' :
                          'bg-purple-100 text-purple-700'}
                      `}>
                        {name.gender === 'boy' ? 'Boy' : name.gender === 'girl' ? 'Girl' : 'Unisex'}
                      </span>
                      <span className="text-gray-500">{name.origin}</span>
                    </p>
                  </div>

                  <button
                    className="text-gray-400 hover:text-yellow-500"
                    onClick={() => toggleFavorite(name.id)}
                    aria-label={favorites.includes(name.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorites.includes(name.id) ? (
                      <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 15.585l-7.01 3.685 1.338-7.797-5.67-5.528 7.836-1.14L10 0l3.505 7.105 7.837 1.14-5.67 5.528 1.337 7.797L10 15.585z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </button>
                </div>

                <p className="text-sm mt-2 line-clamp-2 mb-3">{name.meaning}</p>

                <button
                  className="text-[#005eb8] text-sm font-medium hover:underline"
                  onClick={() => handleViewDetails(name)}
                >
                  View details
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No names found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>

      {/* Name Details Modal */}
      {selectedName && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedName.name}</h3>
                <button
                  className="text-gray-400 hover:text-yellow-500"
                  onClick={() => toggleFavorite(selectedName.id)}
                >
                  {favorites.includes(selectedName.id) ? (
                    <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 15.585l-7.01 3.685 1.338-7.797-5.67-5.528 7.836-1.14L10 0l3.505 7.105 7.837 1.14-5.67 5.528 1.337 7.797L10 15.585z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="mb-4">
                <span className={`
                  inline-block px-2 py-0.5 rounded-full text-xs font-medium mr-2
                  ${selectedName.gender === 'boy' ? 'bg-blue-100 text-blue-700' :
                    selectedName.gender === 'girl' ? 'bg-pink-100 text-pink-700' :
                    'bg-purple-100 text-purple-700'}
                `}>
                  {selectedName.gender === 'boy' ? 'Boy' : selectedName.gender === 'girl' ? 'Girl' : 'Unisex'}
                </span>

                {selectedName.popularity && (
                  <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {selectedName.popularity}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-1">Origin</h4>
                <p>{selectedName.origin}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-1">Meaning</h4>
                <p>{selectedName.meaning}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-1">Pronunciation</h4>
                <p className="italic">{selectedName.name.toLowerCase()}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-1">Possible Nicknames</h4>
                <p>
                  {selectedName.name.length > 3
                    ? `${selectedName.name.substring(0, 3)}y, ${selectedName.name.substring(0, 1)}`
                    : 'N/A'}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
                  onClick={handleCloseDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h3 className="font-bold text-lg text-blue-800 mb-2">Naming Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Consider how the first, middle, and last names sound together</li>
          <li>Think about potential nicknames that could come from the name</li>
          <li>Check the initials to make sure they don't spell anything unwanted</li>
          <li>Test saying the name out loud to see how it feels</li>
          <li>Consider how the name might age with your child into adulthood</li>
        </ul>
      </div>
    </div>
  );
};

export default BabyNamesDirectory;
