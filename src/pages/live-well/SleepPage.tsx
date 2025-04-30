import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const SleepPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Sleep and Tiredness</h1>
          <p className="text-xl font-medium">
            Quality sleep is essential for your physical health, mental wellbeing, and daily functioning
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
              { label: 'Sleep and Tiredness', href: '/live-well/sleep' }
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
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Why is sleep important?</h2>
              <p className="mb-4">
                Sleep is a vital function that allows your body and mind to recharge, leaving you refreshed and alert when you wake up. Healthy sleep also helps the body remain healthy and stave off diseases. Without enough sleep, your brain cannot function properly.
              </p>
              <p className="mb-4">
                Quality sleep:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Improves your immune system</li>
                <li>Helps manage your weight</li>
                <li>Reduces stress and improves mood</li>
                <li>Improves memory and cognitive function</li>
                <li>Reduces your risk of heart disease and diabetes</li>
                <li>Increases productivity and concentration</li>
                <li>Enhances physical performance</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">How much sleep do I need?</h2>
              <p className="mb-4">
                Sleep needs vary from person to person, but generally, most adults need between 7 and 9 hours of quality sleep each night. Children and teenagers need even more.
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left border-b border-gray-200">Age Group</th>
                      <th className="py-3 px-4 text-left border-b border-gray-200">Recommended Hours of Sleep</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Newborns (0-3 months)</td>
                      <td className="py-3 px-4 border-b border-gray-200">14-17 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Infants (4-11 months)</td>
                      <td className="py-3 px-4 border-b border-gray-200">12-15 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Toddlers (1-2 years)</td>
                      <td className="py-3 px-4 border-b border-gray-200">11-14 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Preschoolers (3-5 years)</td>
                      <td className="py-3 px-4 border-b border-gray-200">10-13 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">School-age children (6-13 years)</td>
                      <td className="py-3 px-4 border-b border-gray-200">9-11 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Teenagers (14-17 years)</td>
                      <td className="py-3 px-4 border-b border-gray-200">8-10 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Young adults (18-25 years)</td>
                      <td className="py-3 px-4 border-b border-gray-200">7-9 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Adults (26-64 years)</td>
                      <td className="py-3 px-4 border-b border-gray-200">7-9 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200">Older adults (65+ years)</td>
                      <td className="py-3 px-4 border-b border-gray-200">7-8 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mb-4">
                Individual needs may vary. Some people naturally need less sleep than others, while some may need more.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Common sleep problems</h2>

              <h3 className="text-xl font-semibold mb-2">Insomnia</h3>
              <p className="mb-4">
                Insomnia is difficulty falling asleep or staying asleep, even when you have the chance to do so. Symptoms include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Difficulty falling asleep</li>
                <li>Waking up during the night and having trouble going back to sleep</li>
                <li>Waking up too early</li>
                <li>Not feeling well-rested after a night's sleep</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Sleep apnea</h3>
              <p className="mb-4">
                Sleep apnea is a potentially serious sleep disorder in which breathing repeatedly stops and starts during sleep. Signs and symptoms include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Loud snoring</li>
                <li>Episodes of stopped breathing during sleep</li>
                <li>Gasping for air during sleep</li>
                <li>Waking up with a dry mouth or headache</li>
                <li>Excessive daytime sleepiness</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Restless legs syndrome (RLS)</h3>
              <p className="mb-4">
                RLS causes uncomfortable sensations in your legs and an irresistible urge to move them. Symptoms typically occur in the evening, making it difficult to fall asleep.
              </p>

              <h3 className="text-xl font-semibold mb-2">Narcolepsy</h3>
              <p className="mb-4">
                Narcolepsy is a chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep, regardless of how much sleep you get at night.
              </p>

              <p className="text-blue-600 font-medium">
                If you're experiencing persistent sleep problems, consult with a healthcare professional.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Tips for better sleep</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Sleep hygiene practices</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Stick to a sleep schedule:</strong> Go to bed and wake up at the same time every day, even on weekends.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Create a restful environment:</strong> Keep your bedroom cool, quiet, and dark. Use comfortable bedding.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Limit screen time:</strong> Avoid electronic devices at least 30-60 minutes before bedtime, as the blue light can interfere with your ability to fall asleep.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Watch what you eat and drink:</strong> Avoid large meals, caffeine, and alcohol before bedtime.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Be physically active:</strong> Regular physical activity can help you fall asleep faster and enjoy deeper sleep.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Manage stress:</strong> Try relaxation techniques such as meditation, deep breathing, or gentle stretching before bed.</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-2">Establish a relaxing bedtime routine</h3>
              <p className="mb-4">
                A consistent bedtime routine signals to your body that it's time to wind down and prepare for sleep. Consider activities such as:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Taking a warm bath or shower</li>
                <li>Reading a book (not on an electronic device)</li>
                <li>Practicing gentle stretching or yoga</li>
                <li>Listening to calming music</li>
                <li>Practicing relaxation techniques like deep breathing or meditation</li>
              </ul>
              <p>
                <Link to="/live-well/sleep/better-sleep-techniques" className="text-[#005eb8] font-medium hover:underline">
                  Learn more about sleep improvement techniques →
                </Link>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Managing fatigue and tiredness</h2>
              <p className="mb-4">
                If you're feeling constantly tired despite getting enough sleep, there might be other factors affecting your energy levels:
              </p>

              <h3 className="text-xl font-semibold mb-2">Physical causes of fatigue</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Anemia</li>
                <li>Thyroid problems</li>
                <li>Diabetes</li>
                <li>Chronic infections</li>
                <li>Heart or lung conditions</li>
                <li>Vitamin deficiencies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Lifestyle factors</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Stress and emotional exhaustion</li>
                <li>Poor diet and dehydration</li>
                <li>Lack of physical activity</li>
                <li>Alcohol or drug use</li>
                <li>Certain medications</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-semibold">When to see a doctor about tiredness:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>When fatigue is severe or persists for more than two weeks</li>
                  <li>If you have other unexplained symptoms alongside tiredness</li>
                  <li>If fatigue is affecting your quality of life or daily activities</li>
                  <li>If you wake up tired even after a full night's sleep</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Related Topics */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/live-well/mental-wellbeing" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Mental wellbeing
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
                  <Link to="/live-well/healthy-eating" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Healthy eating
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sleep Techniques Guide */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1455642305367-68834a1fa3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Peaceful sleep"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">Sleep improvement techniques</h3>
                <p className="text-gray-600 mb-4">
                  Practical steps to improve your sleep quality and establish a healthy sleep routine.
                </p>
                <Link to="/live-well/sleep/better-sleep-techniques" className="text-[#005eb8] font-medium hover:underline">
                  View techniques
                </Link>
              </div>
            </div>

            {/* Sleep diary tool */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Track your sleep</h3>
              <p className="mb-4">Keeping a sleep diary can help identify patterns and factors affecting your sleep quality.</p>
              <Link
                to="/tools/sleep-diary"
                className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] inline-block w-full text-center"
              >
                Start sleep diary
              </Link>
            </div>

            {/* Quick relaxation technique */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">4-7-8 Breathing Technique</h3>
              <p className="mb-4">This simple breathing exercise can help you relax and fall asleep:</p>
              <ol className="space-y-2 list-decimal pl-5">
                <li>Place the tip of your tongue behind your upper front teeth</li>
                <li>Exhale completely through your mouth, making a whoosh sound</li>
                <li>Close your mouth and inhale through your nose for 4 seconds</li>
                <li>Hold your breath for 7 seconds</li>
                <li>Exhale completely through your mouth for 8 seconds, making a whoosh sound</li>
                <li>Repeat the cycle 3-4 times</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepPage;
