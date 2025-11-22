import React, { useState, useEffect } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'planning' | 'invitations' | 'decorations' | 'food' | 'games' | 'gifts';
}

interface InvitationTemplate {
  id: number;
  title: string;
  theme: string;
  imageUrl: string;
  colors: string[];
}

const defaultChecklist: ChecklistItem[] = [
  // Planning
  { id: 'p1', text: 'Choose a date and time', completed: false, category: 'planning' },
  { id: 'p2', text: 'Create a guest list', completed: false, category: 'planning' },
  { id: 'p3', text: 'Choose a venue or decide to host at home', completed: false, category: 'planning' },
  { id: 'p4', text: 'Select a theme', completed: false, category: 'planning' },
  { id: 'p5', text: 'Set a budget', completed: false, category: 'planning' },
  { id: 'p6', text: 'Assign tasks if co-hosting', completed: false, category: 'planning' },
  { id: 'p7', text: 'Create a timeline for the event', completed: false, category: 'planning' },

  // Invitations
  { id: 'i1', text: 'Design or select invitations', completed: false, category: 'invitations' },
  { id: 'i2', text: 'Gather addresses', completed: false, category: 'invitations' },
  { id: 'i3', text: 'Send invitations (4-6 weeks before)', completed: false, category: 'invitations' },
  { id: 'i4', text: 'Track RSVPs', completed: false, category: 'invitations' },
  { id: 'i5', text: 'Create a group chat/email for updates', completed: false, category: 'invitations' },

  // Decorations
  { id: 'd1', text: 'Purchase themed decorations', completed: false, category: 'decorations' },
  { id: 'd2', text: 'Plan table centerpieces', completed: false, category: 'decorations' },
  { id: 'd3', text: 'Get photo backdrop or props', completed: false, category: 'decorations' },
  { id: 'd4', text: 'Purchase plates, cups, napkins, utensils', completed: false, category: 'decorations' },
  { id: 'd5', text: 'Create or purchase banner/signage', completed: false, category: 'decorations' },
  { id: 'd6', text: 'Get balloons or balloon arch', completed: false, category: 'decorations' },

  // Food
  { id: 'f1', text: 'Plan menu (appetizers, mains, desserts)', completed: false, category: 'food' },
  { id: 'f2', text: 'Order or bake a cake', completed: false, category: 'food' },
  { id: 'f3', text: 'Purchase beverages', completed: false, category: 'food' },
  { id: 'f4', text: 'Consider dietary restrictions', completed: false, category: 'food' },
  { id: 'f5', text: 'Order food or shop for ingredients', completed: false, category: 'food' },
  { id: 'f6', text: 'Prepare what you can ahead of time', completed: false, category: 'food' },

  // Games & Activities
  { id: 'g1', text: 'Select 3-5 games or activities', completed: false, category: 'games' },
  { id: 'g2', text: 'Purchase game supplies and prizes', completed: false, category: 'games' },
  { id: 'g3', text: 'Create game instruction cards', completed: false, category: 'games' },
  { id: 'g4', text: 'Plan a schedule for activities', completed: false, category: 'games' },
  { id: 'g5', text: 'Set up a photo area', completed: false, category: 'games' },
  { id: 'g6', text: 'Prepare advice cards for parents-to-be', completed: false, category: 'games' },

  // Gifts
  { id: 'gt1', text: 'Set up a gift registry', completed: false, category: 'gifts' },
  { id: 'gt2', text: 'Share registry information with guests', completed: false, category: 'gifts' },
  { id: 'gt3', text: 'Prepare a space for gifts', completed: false, category: 'gifts' },
  { id: 'gt4', text: 'Assign someone to record gifts opened', completed: false, category: 'gifts' },
  { id: 'gt5', text: 'Prepare thank you cards', completed: false, category: 'gifts' },
  { id: 'gt6', text: 'Consider party favors for guests', completed: false, category: 'gifts' },
];

const invitationTemplates: InvitationTemplate[] = [
  {
    id: 1,
    title: 'Sweet Floral',
    theme: 'Floral',
    imageUrl: 'https://images.unsplash.com/photo-1557692538-9468f5bee470?w=600&h=400&fit=crop&q=80',
    colors: ['#f8c9db', '#a1d6e2', '#f1e8b8']
  },
  {
    id: 2,
    title: 'Modern Geometric',
    theme: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1551376347-075b0121a900?w=600&h=400&fit=crop&q=80',
    colors: ['#84b4c8', '#e8995e', '#d8d3cd']
  },
  {
    id: 3,
    title: 'Woodland Adventure',
    theme: 'Nature',
    imageUrl: 'https://images.unsplash.com/photo-1578897367107-83e4a6eeb524?w=600&h=400&fit=crop&q=80',
    colors: ['#7d9b76', '#e8d2ae', '#d4a373']
  },
  {
    id: 4,
    title: 'Rainbow Dreams',
    theme: 'Colorful',
    imageUrl: 'https://images.unsplash.com/photo-1527264935190-1401c51b5bbc?w=600&h=400&fit=crop&q=80',
    colors: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff']
  },
  {
    id: 5,
    title: 'Classic Teddy Bear',
    theme: 'Traditional',
    imageUrl: 'https://images.unsplash.com/photo-1586252991035-d5004e4e7ee5?w=600&h=400&fit=crop&q=80',
    colors: ['#e6ccb2', '#b7d1da', '#ede7e3']
  },
  {
    id: 6,
    title: 'Adventure Awaits',
    theme: 'Travel',
    imageUrl: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=600&h=400&fit=crop&q=80',
    colors: ['#a2d2ff', '#ffc8dd', '#cdb4db']
  }
];

const gameIdeas = [
  {
    title: 'Baby Items Memory Game',
    description: 'Display baby items on a tray for 30 seconds, then cover and have guests write down as many as they can remember.',
    materials: 'Tray, baby items, paper, pens, timer',
    difficulty: 'Easy'
  },
  {
    title: 'Guess the Baby Food',
    description: 'Label jars of baby food with numbers and have guests taste and guess the flavors.',
    materials: 'Baby food jars, spoons, answer sheets',
    difficulty: 'Medium'
  },
  {
    title: 'Diaper the Teddy',
    description: 'Teams race to diaper a teddy bear correctly while blindfolded.',
    materials: 'Teddy bears, diapers, blindfolds',
    difficulty: 'Easy'
  },
  {
    title: 'Baby Bingo',
    description: 'Create bingo cards with gift items. Guests mark them off as the mom-to-be opens presents.',
    materials: 'Printed bingo cards, markers',
    difficulty: 'Easy'
  },
  {
    title: 'Don\'t Say Baby',
    description: 'Give each guest a pin. If someone says "baby," the first person to catch them gets their pin.',
    materials: 'Safety pins or clothespins',
    difficulty: 'Easy'
  },
  {
    title: 'Measure Mom\'s Belly',
    description: 'Guests cut string to the length they think will fit around mom\'s belly. Closest guess wins.',
    materials: 'String, scissors',
    difficulty: 'Easy'
  }
];

const BabyShowerPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'invitations' | 'games' | 'tips'>('checklist');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('planning');
  const [selectedTemplate, setSelectedTemplate] = useState<InvitationTemplate | null>(null);

  // Load checklist from localStorage on first render
  useEffect(() => {
    const savedChecklist = localStorage.getItem('babyShowerChecklist');
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    } else {
      setChecklist(defaultChecklist);
    }
  }, []);

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('babyShowerChecklist', JSON.stringify(checklist));
  }, [checklist]);

  // Add a new item to checklist
  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      const newChecklistItem: ChecklistItem = {
        id: `custom-${Date.now()}`,
        text: newItem,
        completed: false,
        category: newItemCategory
      };
      setChecklist([...checklist, newChecklistItem]);
      setNewItem('');
    }
  };

  // Toggle item completion
  const toggleItemComplete = (id: string) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Remove item from checklist
  const removeItem = (id: string) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  // Reset checklist to default
  const resetChecklist = () => {
    if (window.confirm('Are you sure you want to reset your checklist? This will remove all custom items and reset progress.')) {
      setChecklist(defaultChecklist);
    }
  };

  // Compute completion stats
  const completionStats = {
    total: checklist.length,
    completed: checklist.filter(item => item.completed).length,
    percentage: Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100) || 0
  };

  // Categories for the checklist
  const categories = [
    { id: 'planning', label: 'Planning & Logistics' },
    { id: 'invitations', label: 'Invitations' },
    { id: 'decorations', label: 'Decorations' },
    { id: 'food', label: 'Food & Drinks' },
    { id: 'games', label: 'Games & Activities' },
    { id: 'gifts', label: 'Gifts & Favors' }
  ];

  // View invitation template
  const handleViewTemplate = (template: InvitationTemplate) => {
    setSelectedTemplate(template);
  };

  // Close invitation template modal
  const handleCloseTemplate = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Baby Shower Planner</h2>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Planning Progress</span>
            <span className="text-sm">
              {completionStats.completed} of {completionStats.total} tasks completed ({completionStats.percentage}%)
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${completionStats.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`pb-4 px-1 ${activeTab === 'checklist'
                ? 'border-b-2 border-[#0891b2] text-[#0891b2] font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('checklist')}
            >
              Checklist
            </button>
            <button
              className={`pb-4 px-1 ${activeTab === 'invitations'
                ? 'border-b-2 border-[#0891b2] text-[#0891b2] font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('invitations')}
            >
              Invitation Templates
            </button>
            <button
              className={`pb-4 px-1 ${activeTab === 'games'
                ? 'border-b-2 border-[#0891b2] text-[#0891b2] font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('games')}
            >
              Game Ideas
            </button>
            <button
              className={`pb-4 px-1 ${activeTab === 'tips'
                ? 'border-b-2 border-[#0891b2] text-[#0891b2] font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('tips')}
            >
              Planning Tips
            </button>
          </nav>
        </div>

        {/* Checklist Tab */}
        {activeTab === 'checklist' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Baby Shower Checklist</h3>
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={resetChecklist}
              >
                Reset to Default
              </button>
            </div>

            {/* Add new item form */}
            <div className="mb-6 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Add a new item to your checklist..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
              <select
                className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md"
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as ChecklistItem['category'])}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
              <button
                className="w-full sm:w-auto px-4 py-2 bg-[#0891b2] text-white rounded-md hover:bg-[#004c93]"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            </div>

            {/* Checklist by category */}
            <div className="space-y-6">
              {categories.map(category => {
                const categoryItems = checklist.filter(item => item.category === category.id);
                if (categoryItems.length === 0) return null;

                return (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold mb-2">{category.label}</h4>
                    <ul className="space-y-2">
                      {categoryItems.map(item => (
                        <li key={item.id} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3 h-5 w-5 text-[#0891b2]"
                            checked={item.completed}
                            onChange={() => toggleItemComplete(item.id)}
                          />
                          <span className={`flex-grow ${item.completed ? 'line-through text-gray-500' : ''}`}>
                            {item.text}
                          </span>
                          <button
                            className="text-gray-400 hover:text-red-500 ml-2"
                            onClick={() => removeItem(item.id)}
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Invitation Templates Tab */}
        {activeTab === 'invitations' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Invitation Templates</h3>
            <p className="mb-6 text-gray-700">
              Browse our invitation templates for inspiration. Click on any template to see it in more detail. You can download and customize these for your baby shower.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitationTemplates.map(template => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleViewTemplate(template)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={template.imageUrl}
                      alt={template.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{template.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">Theme: {template.theme}</p>
                    <div className="flex space-x-2">
                      {template.colors.map((color, index) => (
                        <div
                          key={index}
                          className="h-6 w-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Game Ideas Tab */}
        {activeTab === 'games' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Baby Shower Game Ideas</h3>
            <p className="mb-6 text-gray-700">
              Engage your guests with these fun and interactive baby shower games. Most require minimal preparation and are suitable for all ages.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameIdeas.map((game, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg mb-2">{game.title}</h4>
                  <p className="text-gray-700 mb-3">{game.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {game.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Materials needed:</span> {game.materials}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 p-4 rounded-md">
              <h4 className="font-bold text-lg text-blue-800 mb-2">Game Planning Tips</h4>
              <ul className="list-disc pl-5 space-y-2 text-blue-900">
                <li>Plan 3-5 games for a 2-hour shower</li>
                <li>Consider your audience and choose appropriate games</li>
                <li>Have small prizes ready for the winners</li>
                <li>Designate someone to lead each game</li>
                <li>Test games beforehand to ensure they work well</li>
              </ul>
            </div>
          </div>
        )}

        {/* Planning Tips Tab */}
        {activeTab === 'tips' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Baby Shower Planning Tips</h3>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Timing</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Host the shower 4-6 weeks before the due date</li>
                  <li>Weekend afternoons typically work best for most guests</li>
                  <li>Send invitations 4-6 weeks in advance</li>
                  <li>Plan for 2-3 hours total duration</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Menu Planning</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Finger foods and bite-sized appetizers work best</li>
                  <li>Consider a buffet-style setup for easy serving</li>
                  <li>Have non-alcoholic drink options</li>
                  <li>Remember to account for dietary restrictions</li>
                  <li>The cake can be both decoration and dessert</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Etiquette Tips</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Check with the parents-to-be about preferences</li>
                  <li>Co-ed showers are becoming more common</li>
                  <li>Consider creating a gift registry for the parents</li>
                  <li>Send thank you notes within 2-3 weeks after the shower</li>
                  <li>Ask someone to record gifts as they're opened</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Decoration Ideas</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Choose a theme that matches parents' nursery or preferences</li>
                  <li>Balloon arches create dramatic impact</li>
                  <li>Use onesies or baby clothes as decoration (can be gifted later)</li>
                  <li>Photo booth areas are great for memorable pictures</li>
                  <li>Consider table centerpieces that can be taken home as favors</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Day-Of Timeline Example</h4>
                <ul className="space-y-1">
                  <li><span className="font-medium">1:00 PM:</span> Guests arrive, refreshments and mingling</li>
                  <li><span className="font-medium">1:30 PM:</span> Welcome and introductions</li>
                  <li><span className="font-medium">1:45 PM:</span> First game or activity</li>
                  <li><span className="font-medium">2:15 PM:</span> Food service</li>
                  <li><span className="font-medium">2:45 PM:</span> Second game or activity</li>
                  <li><span className="font-medium">3:15 PM:</span> Gift opening</li>
                  <li><span className="font-medium">3:45 PM:</span> Cake and thank you's</li>
                  <li><span className="font-medium">4:00 PM:</span> Event concludes</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invitation Template Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
            <div className="relative h-64 sm:h-80">
              <img
                src={selectedTemplate.imageUrl}
                alt={selectedTemplate.title}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-4 right-4 bg-white p-1 rounded-full shadow-md"
                onClick={handleCloseTemplate}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedTemplate.title}</h3>
              <p className="text-gray-600 mb-4">Theme: {selectedTemplate.theme}</p>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Color Palette</h4>
                <div className="flex space-x-3">
                  {selectedTemplate.colors.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="h-10 w-10 rounded-full border border-gray-200 mb-1"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-xs text-gray-500">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Suggested Text</h4>
                <div className="bg-gray-50 p-3 rounded-md text-sm italic">
                  <p className="mb-1">Please join us for a Baby Shower honoring</p>
                  <p className="font-bold mb-1">[Parent's Name]</p>
                  <p className="mb-1">[Date] at [Time]</p>
                  <p className="mb-1">[Location]</p>
                  <p className="mb-1">Hosted by: [Host's Name]</p>
                  <p>Registry: [Registry Information]</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-[#0891b2] text-[#0891b2] rounded-md hover:bg-blue-50"
                  onClick={handleCloseTemplate}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#0891b2] text-white rounded-md hover:bg-[#004c93]">
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BabyShowerPlanner;
