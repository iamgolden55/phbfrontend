import React, { useState } from 'react';
import { Moon, Shield, Clock, Thermometer, AlertTriangle, CheckCircle, Baby, Heart } from 'lucide-react';

const SleepPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'safe-sleep' | 'patterns' | 'challenges'>('safe-sleep');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-8">
        <div className="phb-container">
          <div className="flex items-center gap-3 mb-4">
            <Moon className="h-8 w-8 text-indigo-500" />
            <h1 className="text-3xl font-bold text-gray-900">Baby Sleep Guide</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl">
            Sleep with a newborn is a journey, not a destination! Every baby is different, and what matters 
            most is that your baby is sleeping safely. Be patient with yourself and your little one—good 
            sleep habits develop over time.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Safe Sleep Priority Banner */}
            <section className="bg-red-50 rounded-lg border-l-4 border-red-400 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-red-800">Safe Sleep is the Priority</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-red-700">
                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <Baby className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Back to Sleep</h3>
                  <p className="text-sm">Always place baby on their back for every sleep</p>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Clear Cot</h3>
                  <p className="text-sm">Firm mattress, no loose bedding, toys, or bumpers</p>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <Thermometer className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Right Temperature</h3>
                  <p className="text-sm">16-20°C room temperature, avoid overheating</p>
                </div>
              </div>
            </section>

            {/* Sleep Topics Tabs */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Understanding Baby Sleep</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('safe-sleep')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'safe-sleep'
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Safe Sleep Setup
                </button>
                <button
                  onClick={() => setActiveTab('patterns')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'patterns'
                      ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sleep Patterns
                </button>
                <button
                  onClick={() => setActiveTab('challenges')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'challenges'
                      ? 'bg-pink-100 text-pink-800 border-2 border-pink-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Common Challenges
                </button>
              </div>

              {/* Safe Sleep Setup Tab */}
              {activeTab === 'safe-sleep' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-indigo-900 mb-4">Creating a Safe Sleep Environment</h3>
                    <p className="text-indigo-800 mb-4">
                      Safe sleep practices dramatically reduce the risk of SIDS (Sudden Infant Death Syndrome). 
                      These guidelines might feel strict, but they're based on extensive research that saves lives.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-indigo-900 mb-2">The Sleep Space:</h4>
                        <ul className="space-y-1 text-indigo-800 text-sm">
                          <li>• Firm, flat mattress</li>
                          <li>• Fitted sheet only</li>
                          <li>• No pillows, blankets, or bumpers</li>
                          <li>• No toys or loose items</li>
                          <li>• Room sharing (not bed sharing)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-indigo-900 mb-2">Room Environment:</h4>
                        <ul className="space-y-1 text-indigo-800 text-sm">
                          <li>• Temperature: 16-20°C</li>
                          <li>• Smoke-free environment</li>
                          <li>• Darkened for night sleep</li>
                          <li>• White noise optional (low volume)</li>
                          <li>• Baby in own sleep space</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-3">Safe Sleep Checklist:</h4>
                      <ul className="space-y-2 text-green-700 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                          <span>Baby on back for every sleep</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                          <span>Cot clear of loose items</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                          <span>Baby's face uncovered</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                          <span>Sleep bag or swaddle properly fitted</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">Keeping Baby Warm:</h4>
                      <ul className="space-y-2 text-blue-700 text-sm">
                        <li>• Use a baby sleep bag (0.5-2.5 tog)</li>
                        <li>• Dress baby in light sleep clothing</li>
                        <li>• Check temperature by feeling chest/neck</li>
                        <li>• Baby should feel warm, not hot or cold</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Sleep Patterns Tab */}
              {activeTab === 'patterns' && (
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-purple-900 mb-4">Understanding Baby Sleep Cycles</h3>
                    <p className="text-purple-800 mb-4">
                      Baby sleep is very different from adult sleep! Newborns have shorter sleep cycles and 
                      spend more time in light sleep, which is actually protective—it helps them wake easily 
                      if they need something.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Newborn Sleep (0-3 months):</h4>
                        <ul className="space-y-1 text-purple-800 text-sm">
                          <li>• Total sleep: 14-17 hours per 24 hours</li>
                          <li>• Sleep periods: 2-4 hours at a time</li>
                          <li>• Day/night confusion is normal</li>
                          <li>• Sleep cycles: 45-60 minutes</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Why Babies Wake Often:</h4>
                        <ul className="space-y-1 text-purple-800 text-sm">
                          <li>• Small stomach = frequent feeding</li>
                          <li>• Light sleep is protective</li>
                          <li>• Still developing circadian rhythm</li>
                          <li>• Brain development happens during sleep</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">0-6 weeks:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• No predictable pattern</li>
                        <li>• Sleep when hungry/tired</li>
                        <li>• Day = night confusion</li>
                        <li>• Focus on safe sleep only</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">6-12 weeks:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Longer stretches emerging</li>
                        <li>• May sleep 4-6 hour periods</li>
                        <li>• Day/night starting to differentiate</li>
                        <li>• Gentle routines can begin</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">3-6 months:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• More predictable patterns</li>
                        <li>• Longer night sleep possible</li>
                        <li>• 3-4 daytime naps</li>
                        <li>• Sleep training can begin if desired</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Common Challenges Tab */}
              {activeTab === 'challenges' && (
                <div className="space-y-6">
                  <div className="bg-pink-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-pink-900 mb-4">Sleep Challenges (You're Not Alone!)</h3>
                    <p className="text-pink-800 mb-4">
                      Almost every parent faces sleep challenges. These are temporary phases that will pass! 
                      Remember: there's no such thing as a "bad sleeper"—only babies who haven't yet 
                      developed mature sleep patterns.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Frequent Night Waking:</h4>
                      <p className="text-yellow-700 text-sm mb-2">This is completely normal for babies!</p>
                      <ul className="space-y-1 text-yellow-700 text-sm">
                        <li>• Check if baby is actually awake or just stirring</li>
                        <li>• Wait a moment before responding</li>
                        <li>• Keep night interactions calm and minimal</li>
                        <li>• Consider if baby needs more daytime calories</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">Day/Night Confusion:</h4>
                      <p className="text-orange-700 text-sm mb-2">Very common in first 6-8 weeks!</p>
                      <ul className="space-y-1 text-orange-700 text-sm">
                        <li>• Bright light and activity during day feeds</li>
                        <li>• Dim lighting and quiet for night feeds</li>
                        <li>• Get morning sunlight exposure</li>
                        <li>• Be patient—it takes time to develop</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Short Naps (Catnapping):</h4>
                      <p className="text-blue-700 text-sm mb-2">30-45 minute naps are normal for young babies!</p>
                      <ul className="space-y-1 text-blue-700 text-sm">
                        <li>• Don't worry if baby seems happy and well-fed</li>
                        <li>• Some babies are naturally short nappers</li>
                        <li>• Focus on total sleep over individual nap length</li>
                        <li>• Consider if environment is too stimulating</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Fighting Sleep:</h4>
                      <p className="text-green-700 text-sm mb-2">Some babies resist sleep when overtired!</p>
                      <ul className="space-y-1 text-green-700 text-sm">
                        <li>• Watch for early tired signs (yawning, rubbing eyes)</li>
                        <li>• Create calming pre-sleep routine</li>
                        <li>• Consider swaddling for comfort</li>
                        <li>• Sometimes babies need to release energy first</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Sleep Safety Red Flags */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl font-semibold text-gray-900">When to Seek Help</h2>
              </div>
              <p className="text-gray-700 mb-6">
                While every baby's sleep is different, there are some signs that warrant checking with 
                your healthcare provider:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-800 mb-2">Sleep Concerns to Discuss:</h4>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>• Baby sleeps more than 19 hours per day consistently</li>
                    <li>• Difficulty waking baby for feeds</li>
                    <li>• Breathing changes during sleep</li>
                    <li>• Extreme fussiness that prevents any sleep</li>
                    <li>• No improvement in day/night confusion after 8 weeks</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Remember:</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Frequent waking is normal and protective</li>
                    <li>• Every baby develops at their own pace</li>
                    <li>• Sleep patterns change with growth spurts</li>
                    <li>• "Sleeping through the night" means 5-6 hours for babies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Gentle Sleep Tips */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gentle Sleep Encouraging Tips</h2>
              <p className="text-gray-700 mb-6">
                These tips can help encourage good sleep habits without pressure or stress:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">During the Day:</h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• Expose baby to natural light</li>
                      <li>• Keep interactions bright and engaging</li>
                      <li>• Allow normal household sounds</li>
                      <li>• Encourage full feeds</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Creating Routine:</h4>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• Simple, consistent bedtime routine</li>
                      <li>• Same sleep location when possible</li>
                      <li>• Calm activities before sleep</li>
                      <li>• Watch for tired signs</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">At Night:</h4>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Keep lighting dim</li>
                      <li>• Minimal talking and interaction</li>
                      <li>• Quick, efficient feeds and changes</li>
                      <li>• Return baby to sleep space promptly</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Comfort Measures:</h4>
                    <ul className="space-y-2 text-orange-700 text-sm">
                      <li>• Swaddling for young babies</li>
                      <li>• White noise or gentle music</li>
                      <li>• Pacifier after feeding is established</li>
                      <li>• Gentle rocking or patting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Sleep Contacts */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
              <h3 className="text-lg font-semibold text-red-800 mb-4">Emergency Sleep Concerns</h3>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>• Difficulty breathing during sleep</li>
                <li>• Blue lips or face</li>
                <li>• Unusual limpness or stiffness</li>
                <li>• Cannot wake baby for feeds</li>
                <li>• Extreme changes in sleep patterns</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded">
                <p className="text-red-800 font-semibold">Emergency: 999</p>
                <p className="text-red-800 font-semibold">PHB Health Line: 111</p>
              </div>
            </div>

            {/* Sleep Environment Checklist */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Safe Sleep Checklist</h3>
              <ul className="space-y-3 text-indigo-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-indigo-600" />
                  <span>Baby on back for every sleep</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-indigo-600" />
                  <span>Firm mattress with fitted sheet only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-indigo-600" />
                  <span>No loose bedding, toys, or bumpers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-indigo-600" />
                  <span>Room temperature 16-20°C</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-indigo-600" />
                  <span>Smoke-free environment</span>
                </li>
              </ul>
            </div>

            {/* Age-Appropriate Sleep Expectations */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">What to Expect</h3>
              <div className="space-y-3 text-purple-700 text-sm">
                <div>
                  <p className="font-semibold">0-3 months:</p>
                  <p>No predictable pattern, frequent waking normal</p>
                </div>
                <div>
                  <p className="font-semibold">3-6 months:</p>
                  <p>Longer stretches, some babies sleep 6+ hours</p>
                </div>
                <div>
                  <p className="font-semibold">6+ months:</p>
                  <p>More consistent patterns, 2-3 naps</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-100 rounded">
                <p className="text-purple-800 text-sm font-medium">
                  Every baby is different! These are general guides, not rules.
                </p>
              </div>
            </div>

            {/* Parent Self-Care */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Looking After Yourself</h3>
              <ul className="space-y-2 text-green-700 text-sm">
                <li>• Sleep when baby sleeps (really!)</li>
                <li>• Take help when offered</li>
                <li>• Tag-team night duties with partner</li>
                <li>• Don't compare to other babies</li>
                <li>• This phase will pass</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 text-center">
          <Moon className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sweet Dreams Will Come</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Baby sleep is one of the most challenging aspects of early parenthood, but it does get easier! 
            Focus on safe sleep, be patient with the process, and remember that every baby develops their 
            own unique sleep patterns. You're doing everything right, even when it doesn't feel like it.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. 
            Always follow current safe sleep guidelines and consult with your healthcare provider, pediatrician, or health visitor 
            for personalized sleep guidance. If you have concerns about your baby's sleep patterns or breathing, 
            contact your healthcare provider immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SleepPage;