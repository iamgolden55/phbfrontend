import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PregnancyWeekData {
  week: number;
  baby: {
    size: string;
    size_comparison: string;
    length_cm: number;
    weight_g: number;
    developments: string[];
    image_url: string;
    fun_fact: string;
  };
  mom: {
    body_changes: string[];
    symptoms: string[];
    emotions: string[];
    tips: string[];
    appointments?: string;
  };
  partner: {
    tips: string[];
    how_to_help: string[];
    what_to_expect: string;
  };
  milestones: string[];
}

interface UserPregnancyData {
  current_week: number;
  due_date: string;
  baby_name_ideas: string[];
  journey_photos: string[];
  notes: { [week: number]: string };
  completed_milestones: number[];
}

const PregnancyJourneyEnhanced: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(24);
  const [userData, setUserData] = useState<UserPregnancyData>({
    current_week: 24,
    due_date: '2024-12-15',
    baby_name_ideas: ['Emma', 'Liam', 'Sofia'],
    journey_photos: [],
    notes: {},
    completed_milestones: [20, 21, 22, 23]
  });
  const [activeTab, setActiveTab] = useState<'baby' | 'mom' | 'partner' | 'journal'>('baby');
  const [showNamePicker, setShowNamePicker] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  // Mock comprehensive week data
  const getWeekData = (week: number): PregnancyWeekData => {
    const weeks: { [key: number]: PregnancyWeekData } = {
      24: {
        week: 24,
        baby: {
          size: "ear of corn",
          size_comparison: "About the length of a foot-long ruler",
          length_cm: 30,
          weight_g: 600,
          developments: [
            "Hearing is fully developed - baby can hear your voice!",
            "Brain tissue and neurons are developing rapidly",
            "Lungs are producing surfactant for breathing",
            "Taste buds are forming - baby can taste what you eat!",
            "Eyes are forming, though iris still lacks pigment"
          ],
          image_url: "https://images.unsplash.com/photo-1555252332-9f8e92e65df9?w=400&h=400&fit=crop&q=80",
          fun_fact: "Your baby's hearing is so developed, they might jump at loud noises!"
        },
        mom: {
          body_changes: [
            "Uterus is about the size of a soccer ball",
            "You may feel more balanced and energetic",
            "Stretch marks might start appearing",
            "Breasts may be getting larger and more sensitive"
          ],
          symptoms: [
            "You might experience heartburn more frequently",
            "Leg cramps, especially at night",
            "Increased appetite and specific cravings",
            "Some swelling in hands and feet is normal"
          ],
          emotions: [
            "Excitement about the halfway point!",
            "May feel more connected to your baby",
            "Some anxiety about upcoming responsibilities",
            "Joy in feeling regular movements"
          ],
          tips: [
            "Eat smaller, more frequent meals to manage heartburn",
            "Start doing pelvic floor exercises",
            "Sleep on your side with a pillow between your knees",
            "Stay hydrated and wear comfortable shoes"
          ],
          appointments: "Glucose screening test around this time"
        },
        partner: {
          tips: [
            "Start talking to the baby - they can hear you now!",
            "Plan a babymoon getaway while travel is still comfortable",
            "Help set up the nursery together",
            "Learn about labor and delivery processes"
          ],
          how_to_help: [
            "Take over household tasks that require bending or lifting",
            "Give foot and back massages to relieve discomfort",
            "Cook healthy meals and join in pregnancy nutrition",
            "Be patient with mood swings and emotional changes"
          ],
          what_to_expect: "Your partner is at the halfway point! This is often a sweet spot where energy returns and the pregnancy feels more real."
        },
        milestones: [
          "Viability milestone - baby could potentially survive with medical help",
          "Anatomy scan completed",
          "Regular movement patterns established",
          "Gender might be determined if desired"
        ]
      }
    };
    
    return weeks[week] || weeks[24];
  };

  const weekData = getWeekData(currentWeek);

  const BabyVisualization: React.FC<{ week: number }> = ({ week }) => {
    const progress = (week / 40) * 100;
    
    return (
      <div className="relative">
        <div className="w-64 h-64 mx-auto relative">
          {/* Womb outline */}
          <div className="absolute inset-0 border-4 border-pink-300 rounded-full bg-gradient-to-br from-pink-50 to-purple-50"></div>
          
          {/* Baby representation */}
          <div className="absolute inset-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
            <div className="text-4xl">👶</div>
          </div>
          
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="120"
              stroke="#fce7f3"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="120"
              stroke="#ec4899"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          
          {/* Week indicator */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md">
            <span className="text-sm font-bold text-gray-800">Week {week}</span>
          </div>
        </div>
      </div>
    );
  };

  const MilestoneTracker: React.FC = () => {
    const milestones = [
      { week: 12, title: "End of First Trimester", icon: "🌱" },
      { week: 16, title: "Baby's Sex Detectable", icon: "👶" },
      { week: 20, title: "Halfway Point!", icon: "🎉" },
      { week: 24, title: "Viability Milestone", icon: "💪" },
      { week: 28, title: "Third Trimester", icon: "🌟" },
      { week: 32, title: "Baby's Bones Hardening", icon: "🦴" },
      { week: 36, title: "Baby Considered Full-term Soon", icon: "🏁" },
      { week: 40, title: "Due Date!", icon: "👑" }
    ];

    return (
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.week}
            className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
              milestone.week <= currentWeek
                ? 'bg-green-50 border-2 border-green-300'
                : milestone.week === currentWeek + 1
                ? 'bg-blue-50 border-2 border-blue-300'
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <div className="text-3xl mr-4">{milestone.icon}</div>
            <div className="flex-1">
              <h4 className="font-bold">{milestone.title}</h4>
              <p className="text-sm text-gray-600">Week {milestone.week}</p>
            </div>
            {milestone.week <= currentWeek && (
              <div className="text-green-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const PhotoJournal: React.FC = () => {
    const [newNote, setNewNote] = useState('');
    
    return (
      <div className="space-y-6">
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">Week {currentWeek} Journal Entry</h3>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="How are you feeling this week? Any special moments or thoughts you want to remember?"
            className="w-full p-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
          />
          <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors">
            Save Entry ✨
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setShowPhotoUpload(true)}
            className="bg-pink-50 hover:bg-pink-100 border-2 border-dashed border-pink-300 rounded-xl p-8 transition-colors text-center"
          >
            <div className="text-4xl mb-2">📸</div>
            <p className="text-pink-600 font-medium">Add Bump Photo</p>
            <p className="text-sm text-gray-600">Track your beautiful journey</p>
          </button>

          <button 
            onClick={() => setShowNamePicker(true)}
            className="bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 rounded-xl p-8 transition-colors text-center"
          >
            <div className="text-4xl mb-2">👶</div>
            <p className="text-blue-600 font-medium">Baby Name Ideas</p>
            <p className="text-sm text-gray-600">{userData.baby_name_ideas.length} ideas saved</p>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-12">
        <div className="phb-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">Your Pregnancy Journey ✨</h1>
              <p className="text-pink-100 text-xl">Week {currentWeek} • {40 - currentWeek} weeks to go</p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="font-semibold">Due: {new Date(userData.due_date).toLocaleDateString()}</span>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="font-semibold">{Math.round((currentWeek / 40) * 100)}% Complete</span>
                </div>
              </div>
            </div>
            <Link
              to="/account/womens-health"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 flex items-center group"
            >
              <svg className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="phb-container py-8 -mt-6 relative z-10">
        {/* Baby Visualization */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Your Baby This Week</h2>
          <BabyVisualization week={currentWeek} />
          <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Size of {weekData.baby.size} ({weekData.baby.length_cm}cm, {weekData.baby.weight_g}g)
            </p>
            <p className="text-purple-600 font-medium">💡 {weekData.baby.fun_fact}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="flex border-b">
            {[
              { id: 'baby', label: 'Your Baby', icon: '👶' },
              { id: 'mom', label: 'For Mom', icon: '🤱' },
              { id: 'partner', label: 'For Partner', icon: '💑' },
              { id: 'journal', label: 'My Journal', icon: '📔' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'baby' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="mr-2">🧠</span>
                      Development This Week
                    </h3>
                    <div className="space-y-3">
                      {weekData.baby.developments.map((development, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <span className="text-blue-500 mr-3 mt-1">•</span>
                          <p className="text-gray-700">{development}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="mr-2">🏆</span>
                      Milestones
                    </h3>
                    <MilestoneTracker />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mom' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="mr-2">🌸</span>
                      Body Changes
                    </h3>
                    <div className="space-y-2">
                      {weekData.mom.body_changes.map((change, index) => (
                        <div key={index} className="flex items-start p-3 bg-pink-50 rounded-lg">
                          <span className="text-pink-500 mr-3 mt-1">•</span>
                          <p className="text-gray-700">{change}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="mr-2">💭</span>
                      Emotional Journey
                    </h3>
                    <div className="space-y-2">
                      {weekData.mom.emotions.map((emotion, index) => (
                        <div key={index} className="flex items-start p-3 bg-purple-50 rounded-lg">
                          <span className="text-purple-500 mr-3 mt-1">•</span>
                          <p className="text-gray-700">{emotion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="mr-2">💡</span>
                      Tips for This Week
                    </h3>
                    <div className="space-y-2">
                      {weekData.mom.tips.map((tip, index) => (
                        <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                          <span className="text-green-500 mr-3 mt-1">•</span>
                          <p className="text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {weekData.mom.appointments && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-2">Medical Appointments</h4>
                      <p className="text-blue-700">{weekData.mom.appointments}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'partner' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="mr-2">🤝</span>
                    How You Can Help
                  </h3>
                  <div className="space-y-2">
                    {weekData.partner.how_to_help.map((help, index) => (
                      <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <p className="text-gray-700">{help}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="mr-2">💝</span>
                    Special Tips
                  </h3>
                  <div className="space-y-2 mb-6">
                    {weekData.partner.tips.map((tip, index) => (
                      <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-bold text-purple-800 mb-2">What to Expect</h4>
                    <p className="text-purple-700">{weekData.partner.what_to_expect}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'journal' && <PhotoJournal />}
          </div>
        </div>

        {/* Week Navigation */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Explore Other Weeks</h3>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
              disabled={currentWeek <= 1}
              className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed text-purple-700 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              ← Previous Week
            </button>
            
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-800">Week {currentWeek}</span>
            </div>
            
            <button
              onClick={() => setCurrentWeek(Math.min(40, currentWeek + 1))}
              disabled={currentWeek >= 40}
              className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed text-purple-700 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Next Week →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyJourneyEnhanced;