import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const MentalWellbeingPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Mental Wellbeing</h1>
          <p className="text-xl font-medium">
            Good mental health is as important as physical health for a fulfilling life
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Live Well', href: '/live-well' },
              { label: 'Mental Wellbeing', href: '/live-well/mental-wellbeing' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">What is mental wellbeing?</h2>
              <p className="mb-4">
                Mental wellbeing describes your mental state—how you're feeling and how well you can cope with day-to-day life. Good mental wellbeing doesn't mean you're always happy or free from problems. It's about feeling good about yourself, being able to function well individually and in relationships, and having the resilience to deal with life's challenges.
              </p>
              <p className="mb-4">
                Everyone's mental wellbeing changes throughout their life. But maintaining good mental health can help you:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Better cope with the normal stresses of life</li>
                <li>Work productively and fruitfully</li>
                <li>Make meaningful contributions to your community</li>
                <li>Realize your potential</li>
                <li>Enjoy life and have fulfilling relationships</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">5 steps to mental wellbeing</h2>
              <p className="mb-4">
                Research suggests there are five simple steps you can take to improve your mental health and wellbeing:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#005eb8]">1. Connect with others</h3>
                  <p>
                    Good relationships are important for your mental wellbeing. Take time to connect with family, friends, colleagues, and your community.
                  </p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#005eb8]">2. Be physically active</h3>
                  <p>
                    Being active is not only great for your physical health but can also improve your mental wellbeing by raising your self-esteem and helping you set and achieve goals.
                  </p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#005eb8]">3. Learn new skills</h3>
                  <p>
                    Learning new skills can boost your confidence and give you a sense of purpose. Try a new hobby, learn to cook a new dish, or take up a new challenge.
                  </p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#005eb8]">4. Give to others</h3>
                  <p>
                    Acts of giving and kindness can improve your mental wellbeing by creating positive feelings, a sense of reward, and giving you a feeling of purpose and self-worth.
                  </p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg md:col-span-2">
                  <h3 className="text-xl font-semibold mb-3 text-[#005eb8]">5. Pay attention to the present moment</h3>
                  <p>
                    Mindfulness can help you enjoy life more and understand yourself better. It means taking notice of your thoughts, feelings, body sensations, and the world around you in the present moment.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Managing stress</h2>
              <p className="mb-4">
                Stress is a normal part of life, but when it becomes overwhelming, it can negatively impact your mental wellbeing. Here are some strategies to help manage stress:
              </p>

              <h3 className="text-xl font-semibold mb-2">Identify your triggers</h3>
              <p className="mb-4">
                Understanding what situations, people, or events trigger your stress can help you prepare and manage your reactions.
              </p>

              <h3 className="text-xl font-semibold mb-2">Practice relaxation techniques</h3>
              <p className="mb-4">
                Techniques such as deep breathing, meditation, yoga, or progressive muscle relaxation can help calm your mind and body when feeling stressed.
              </p>

              <h3 className="text-xl font-semibold mb-2">Maintain a healthy lifestyle</h3>
              <p className="mb-4">
                Eating well, getting enough sleep, exercising regularly, and limiting alcohol and caffeine can help your body better manage stress.
              </p>

              <h3 className="text-xl font-semibold mb-2">Manage your time effectively</h3>
              <p className="mb-4">
                Prioritize tasks, break large projects into manageable steps, and avoid overcommitting yourself.
              </p>

              <h3 className="text-xl font-semibold mb-2">Set boundaries</h3>
              <p className="mb-4">
                Learn to say no to additional responsibilities when you're already stressed or busy.
              </p>

              <h3 className="text-xl font-semibold mb-2">Seek support</h3>
              <p className="mb-4">
                Talk to friends, family, or a professional about your feelings. Sometimes just talking about your stress can make it feel more manageable.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Improving sleep for better mental health</h2>
              <p className="mb-4">
                Sleep and mental health are closely connected. Poor sleep can negatively affect your mental health, while good mental health can help you sleep better. Here are some tips for improving your sleep:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Establish a regular sleep schedule, going to bed and waking up at the same time each day</li>
                <li>Create a relaxing bedtime routine to help your body and mind prepare for sleep</li>
                <li>Make your bedroom conducive to sleep—cool, dark, and quiet</li>
                <li>Limit exposure to screens (phones, computers, TVs) for at least an hour before bed</li>
                <li>Avoid caffeine, large meals, and alcohol close to bedtime</li>
                <li>Get regular physical activity, but not too close to bedtime</li>
                <li>Manage stress and worries through relaxation techniques or writing down concerns before bed</li>
              </ul>
              <p>
                <Link to="/live-well/sleep" className="text-[#005eb8] font-medium hover:underline">
                  Learn more about improving sleep →
                </Link>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">When to seek help</h2>
              <p className="mb-4">
                It's normal to feel down, anxious, or overwhelmed at times, but if these feelings persist or interfere with your daily life, it may be time to seek help. Signs that you might need professional support include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Feeling sad, hopeless, or "empty" most of the day, nearly every day</li>
                <li>Losing interest in activities you once enjoyed</li>
                <li>Significant changes in appetite or weight</li>
                <li>Sleeping too little or too much</li>
                <li>Feeling anxious, restless, or irritable</li>
                <li>Having difficulty concentrating or making decisions</li>
                <li>Having thoughts of suicide or self-harm</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-semibold">If you're having thoughts of suicide, seek help immediately:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Call the Nigerian Suicide Prevention Initiative: 0800-DIAL-NSPI (0800-3425-6774)</li>
                  <li>Go to your nearest hospital emergency room</li>
                  <li>Call a trusted friend, family member, or spiritual leader</li>
                </ul>
              </div>
              <p className="mb-4">
                Remember, seeking help is a sign of strength, not weakness. Mental health professionals, including psychologists, psychiatrists, and counselors, can provide effective treatments for mental health concerns.
              </p>
              <p>
                <Link to="/mental-health" className="text-[#005eb8] font-medium hover:underline">
                  Explore mental health services and support →
                </Link>
              </p>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Related Topics */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/live-well/sleep" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Sleep and tiredness
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/exercise" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Exercise and fitness
                  </Link>
                </li>
                <li>
                  <Link to="/mental-health" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Mental health services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mindfulness Guide */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Meditation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">Mindfulness guide</h3>
                <p className="text-gray-600 mb-4">
                  Learn the basics of mindfulness and how to incorporate it into your daily life for improved mental wellbeing.
                </p>
                <Link to="/live-well/mental-wellbeing/mindfulness" className="text-[#005eb8] font-medium hover:underline">
                  Explore mindfulness
                </Link>
              </div>
            </div>

            {/* Self-assessment tool */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Mental wellbeing assessment</h3>
              <p className="mb-4">Take our self-assessment to get insights into your current mental wellbeing and find resources to help.</p>
              <Link
                to="/tools/mental-wellbeing-assessment"
                className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] inline-block w-full text-center"
              >
                Take the assessment
              </Link>
            </div>

            {/* Quick stress relief techniques */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Quick stress relief</h3>
              <p className="mb-2">Try these quick techniques when you're feeling stressed:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Deep breathing: Breathe in for 4 counts, hold for 7, exhale for 8</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>5-4-3-2-1: Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Progressive relaxation: Tense and release each muscle group from toes to head</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalWellbeingPage;
