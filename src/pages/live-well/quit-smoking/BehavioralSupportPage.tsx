import React from 'react';
import { Link } from 'react-router-dom';

const BehavioralSupportPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/quit-smoking" className="hover:underline">Quit smoking</Link>
            <span className="mx-2">›</span>
            <span>Behavioral support</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Behavioral support for quitting smoking</h1>
          <p className="text-xl font-medium">
            Counseling and support to help you change smoking habits and develop healthy coping strategies
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Why behavioral support works */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Why behavioral support is effective</h2>
          <p className="mb-4 text-blue-700">
            Smoking is both a physical addiction and a psychological habit. While medications help with physical withdrawal, behavioral support addresses the mental and emotional aspects of quitting.
          </p>
          <p className="mb-4 text-blue-700">
            Research shows that combining behavioral support with medication increases quit rates by up to 80%. Even on its own, counseling can achieve 60-70% success rates.
          </p>
          <p className="text-blue-700">
            PHB offers various forms of behavioral support through trained counselors and peer support programs.
          </p>
        </div>

        {/* Types of behavioral support */}
        <h2 className="text-2xl font-bold mb-6">Types of behavioral support available</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                alt="Individual counseling"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#0891b2] mb-2">Individual Counseling</h3>
              <p className="text-gray-600 mb-4">One-on-one sessions with trained quit-smoking counselors to develop personalized strategies.</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Personalized quit plan
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Trigger identification
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Coping strategies
                </div>
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                80% effective
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1543269664-647b8d0d9e96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                alt="Group support"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#0891b2] mb-2">Group Support Sessions</h3>
              <p className="text-gray-600 mb-4">Weekly group meetings with others who are quitting smoking for mutual support and encouragement.</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Peer support
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Shared experiences
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Group accountability
                </div>
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                75% effective
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                alt="Phone counseling"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#0891b2] mb-2">Phone Counseling</h3>
              <p className="text-gray-600 mb-4">Convenient support through scheduled phone calls with qualified quit-smoking counselors.</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Flexible scheduling
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Crisis support
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Regular check-ins
                </div>
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                70% effective
              </span>
            </div>
          </div>
        </div>

        {/* Key techniques used */}
        <h2 className="text-2xl font-bold mb-6">Key behavioral techniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#0891b2] mb-3">Cognitive Behavioral Therapy (CBT)</h3>
            <p className="text-gray-600 mb-4">
              Helps identify and change thought patterns that lead to smoking. Learn to recognize triggers and develop alternative responses.
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Thought monitoring and challenging</li>
              <li>• Trigger identification and avoidance</li>
              <li>• Alternative behavior development</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#0891b2] mb-3">Motivational Interviewing</h3>
            <p className="text-gray-600 mb-4">
              Explores your personal reasons for quitting and builds motivation to change. Focuses on your own goals and values.
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Personal motivation exploration</li>
              <li>• Goal clarification and commitment</li>
              <li>• Confidence building techniques</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#0891b2] mb-3">Stress Management</h3>
            <p className="text-gray-600 mb-4">
              Learn healthy ways to cope with stress without smoking. Includes relaxation techniques and lifestyle changes.
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Deep breathing exercises</li>
              <li>• Progressive muscle relaxation</li>
              <li>• Mindfulness and meditation</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#0891b2] mb-3">Habit Replacement</h3>
            <p className="text-gray-600 mb-4">
              Replace smoking habits with healthier alternatives. Develop new routines for situations where you used to smoke.
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Healthy habit development</li>
              <li>• Routine modification strategies</li>
              <li>• Positive activity planning</li>
            </ul>
          </div>
        </div>

        {/* PHB behavioral support services */}
        <h2 className="text-2xl font-bold mb-6">PHB behavioral support services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Community Health Centers</h3>
            <p className="mb-4 text-sm">
              Free individual and group counseling sessions available at all PHB community health centers.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>• Individual sessions: Weekly for 8-12 weeks</li>
              <li>• Group sessions: Weekly for 6-8 weeks</li>
              <li>• Follow-up support for 6 months</li>
            </ul>
            <Link to="/find-pharmacy" className="phb-button inline-block text-sm">
              Find nearest center
            </Link>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">PHB Quit Line</h3>
            <p className="mb-4 text-sm">
              Free telephone counseling available 6 days a week with trained quit-smoking specialists.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>• Initial assessment call: 45 minutes</li>
              <li>• Follow-up calls: 15-20 minutes</li>
              <li>• Crisis support available</li>
            </ul>
            <a href="tel:0800-QUIT-NOW" className="phb-button inline-block text-sm">
              Call 0800-QUIT-NOW
            </a>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Online Support Groups</h3>
            <p className="mb-4 text-sm">
              Virtual support groups that meet weekly via video call for people who cannot attend in person.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>• Evening and weekend options</li>
              <li>• Facilitated by trained counselors</li>
              <li>• Anonymous participation</li>
            </ul>
            <Link to="/services/online-support" className="phb-button inline-block text-sm">
              Join online group
            </Link>
          </div>
        </div>

        {/* What to expect */}
        <h2 className="text-2xl font-bold mb-6">What to expect in counseling sessions</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-3 text-[#0891b2]">First Session (60 minutes)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Assessment of smoking history and patterns</li>
                <li>• Identification of personal triggers</li>
                <li>• Goal setting and quit date planning</li>
                <li>• Introduction to coping strategies</li>
                <li>• Development of action plan</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-[#0891b2]">Follow-up Sessions (30-45 minutes)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Review of progress and challenges</li>
                <li>• Practice stress management techniques</li>
                <li>• Problem-solving for difficult situations</li>
                <li>• Relapse prevention strategies</li>
                <li>• Celebration of milestones</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Family support */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-green-800">Family and social support</h2>
          <p className="mb-4 text-green-700">
            Social support from family and friends significantly improves quit success rates. PHB offers resources to help your loved ones support your quit journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">How family can help:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Provide encouragement during difficult moments</li>
                <li>• Help identify and avoid triggers</li>
                <li>• Celebrate milestones and progress</li>
                <li>• Learn about withdrawal symptoms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">PHB family resources:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Family counseling sessions</li>
                <li>• Educational materials for supporters</li>
                <li>• Support group for family members</li>
                <li>• Crisis intervention guidance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success tips */}
        <h2 className="text-2xl font-bold mb-6">Tips for behavioral support success</h2>
        <div className="bg-[#f0f4f5] p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-[#0891b2]">Before you start:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be honest about your smoking habits</li>
                <li>• Set realistic expectations</li>
                <li>• Commit to attending all sessions</li>
                <li>• Prepare to actively participate</li>
                <li>• Bring a support person if helpful</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-[#0891b2]">During support:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Practice techniques between sessions</li>
                <li>• Keep a smoking/craving diary</li>
                <li>• Ask questions when unclear</li>
                <li>• Share challenges openly</li>
                <li>• Celebrate small victories</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start behavioral support?</h2>
            <p className="mb-6">
              Take the first step towards quitting smoking with PHB's proven behavioral support programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Book counseling session
              </Link>
              <a
                href="tel:0800-QUIT-NOW"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Call quit line: 0800-QUIT-NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralSupportPage;