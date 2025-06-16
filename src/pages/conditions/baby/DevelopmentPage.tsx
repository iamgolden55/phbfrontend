import React, { useState } from 'react';
import { TrendingUp, Brain, Hand, MessageCircle, Heart, Clock, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const DevelopmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'physical' | 'cognitive'>('milestones');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 py-8">
        <div className="phb-container">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Baby Development Journey</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl">
            Every baby develops at their own unique pace, and that's perfectly normal! Development isn't 
            a race—it's a beautiful journey of discovery. Use these milestones as a gentle guide, not 
            a strict timetable. Celebrate every small step your little one takes.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Important Reminder Banner */}
            <section className="bg-blue-50 rounded-lg border-l-4 border-blue-400 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Every Baby is Unique</h2>
              </div>
              <p className="text-blue-700">
                Development milestones are guidelines, not deadlines. Some babies will reach milestones 
                earlier, others later—both are completely normal! What matters most is that your baby 
                is making progress and you're providing love, interaction, and support.
              </p>
            </section>

            {/* Development Tabs */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Understanding Development</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('milestones')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'milestones'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Milestone Guide
                </button>
                <button
                  onClick={() => setActiveTab('physical')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'physical'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Physical Development
                </button>
                <button
                  onClick={() => setActiveTab('cognitive')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'cognitive'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cognitive & Social
                </button>
              </div>

              {/* Milestones Tab */}
              {activeTab === 'milestones' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Development by Age</h3>
                    <p className="text-blue-800 mb-4">
                      Remember: These are typical ranges when babies might reach these milestones. 
                      There's lots of normal variation! Premature babies should be adjusted for their 
                      corrected age (due date, not birth date).
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-600" />
                        0-3 Months: Getting to Know the World
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Physical Milestones:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• Lifts head briefly when on tummy</li>
                            <li>• Follows moving objects with eyes</li>
                            <li>• Brings hands near face</li>
                            <li>• Shows some head control when supported</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Social & Communication:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• First social smiles (around 6-8 weeks)</li>
                            <li>• Makes cooing sounds</li>
                            <li>• Calms when comforted</li>
                            <li>• Shows interest in faces</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-600" />
                        3-6 Months: Becoming More Interactive
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Physical Milestones:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• Holds head steady when upright</li>
                            <li>• Rolls from tummy to back</li>
                            <li>• Reaches for and grasps objects</li>
                            <li>• Sits with support</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Social & Communication:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• Laughs and squeals with delight</li>
                            <li>• Babbles and makes vowel sounds</li>
                            <li>• Recognizes familiar faces</li>
                            <li>• Shows excitement when seeing caregiver</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-600" />
                        6-12 Months: On the Move!
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Physical Milestones:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• Sits without support</li>
                            <li>• Crawls or scoots</li>
                            <li>• Pulls to standing</li>
                            <li>• Transfers objects between hands</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Social & Communication:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• Says "mama" or "dada" (may not be specific)</li>
                            <li>• Waves bye-bye</li>
                            <li>• Plays peek-a-boo</li>
                            <li>• Shows stranger anxiety</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Physical Development Tab */}
              {activeTab === 'physical' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Physical Growth & Motor Skills</h3>
                    <p className="text-blue-800 mb-4">
                      Physical development follows a predictable pattern from head to toe and center to 
                      outside. Babies gain control of their head first, then trunk, then arms and legs. 
                      Fine motor skills (like grasping) develop after gross motor skills (like rolling).
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Hand className="h-5 w-5 text-gray-600" />
                        Gross Motor Skills
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-700 text-sm">0-3 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Head control developing</li>
                            <li>• Reflexes present (startle, rooting)</li>
                            <li>• Some arm and leg movements</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">3-6 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Rolling begins</li>
                            <li>• Better head and neck control</li>
                            <li>• Pushes up on arms during tummy time</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">6-12 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Sitting independently</li>
                            <li>• Crawling or alternative movement</li>
                            <li>• Pulling to stand, cruising furniture</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Hand className="h-5 w-5 text-gray-600" />
                        Fine Motor Skills
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-700 text-sm">0-3 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Hands mostly in fists</li>
                            <li>• Reflexive grasping</li>
                            <li>• Brings hands to mouth</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">3-6 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Reaches for objects</li>
                            <li>• Grasps with whole hand</li>
                            <li>• Explores objects with mouth</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">6-12 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Transfers objects between hands</li>
                            <li>• Pincer grasp develops</li>
                            <li>• Points with index finger</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Supporting Physical Development:</h4>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Provide supervised tummy time from birth (start with 2-3 minutes)</li>
                      <li>• Offer safe objects to reach for and explore</li>
                      <li>• Give plenty of floor time for movement practice</li>
                      <li>• Let baby practice sitting with support, then independently</li>
                      <li>• Create safe spaces for crawling and exploring</li>
                      <li>• Remember: babies don't need special equipment to develop normally</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Cognitive & Social Tab */}
              {activeTab === 'cognitive' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Learning & Social Development</h3>
                    <p className="text-blue-800 mb-4">
                      Your baby's brain is growing incredibly fast! Every interaction, every song, every 
                      cuddle helps build important neural connections. Social and cognitive development 
                      happen together as your baby learns about the world through relationships.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-gray-600" />
                        Cognitive Development
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-700 text-sm">0-3 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Focuses on faces 8-12 inches away</li>
                            <li>• Begins to recognize caregivers</li>
                            <li>• Shows interest in high-contrast patterns</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">3-6 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Shows curiosity about surroundings</li>
                            <li>• Begins to understand cause and effect</li>
                            <li>• Recognizes familiar people and objects</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">6-12 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Understands object permanence</li>
                            <li>• Imitates actions and sounds</li>
                            <li>• Shows preferences for people and toys</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-gray-600" />
                        Communication Development
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-700 text-sm">0-3 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Crying as primary communication</li>
                            <li>• Begins cooing (vowel sounds)</li>
                            <li>• Responds to familiar voices</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">3-6 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Babbling begins (ba-ba, ma-ma)</li>
                            <li>• Laughs and squeals</li>
                            <li>• Responds to their name</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">6-12 months:</p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• First words may appear</li>
                            <li>• Understands simple commands</li>
                            <li>• Uses gestures (waving, pointing)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Encouraging Development:</h4>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Talk, sing, and read to your baby every day</li>
                      <li>• Respond to your baby's attempts to communicate</li>
                      <li>• Play simple games like peek-a-boo and pat-a-cake</li>
                      <li>• Provide variety in sights, sounds, and textures (safely)</li>
                      <li>• Follow your baby's lead during play</li>
                      <li>• Remember: loving interaction is the best brain food!</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* When to Be Concerned */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to Seek Guidance</h2>
              <p className="text-gray-700 mb-6">
                Remember that development varies widely among babies. However, if you notice any of 
                these signs, it's worth discussing with your healthcare provider. Early support 
                can be very helpful when needed.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3">Trust Your Instincts:</h3>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>You know your baby best</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Some babies develop in bursts, others gradually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Premature babies need age adjustment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>It's okay to ask questions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <h3 className="font-semibold text-gray-800 mb-3">Consider Discussing If:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-yellow-600" />
                      <span>Loss of previously gained skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-yellow-600" />
                      <span>No social smiles by 3 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-yellow-600" />
                      <span>No babbling by 9 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-yellow-600" />
                      <span>Doesn't respond to their name by 12 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-yellow-600" />
                      <span>You have concerns about their development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Simple Activities */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Simple Activities to Support Development</h2>
              <p className="text-gray-700 mb-6">
                The best activities for babies are simple, loving interactions. You don't need expensive 
                toys or complicated activities—your face, voice, and attention are the most fascinating 
                things to your baby!
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">0-6 Months:</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Make different facial expressions</li>
                    <li>• Sing songs and talk during care routines</li>
                    <li>• Provide supervised tummy time</li>
                    <li>• Show high-contrast books or pictures</li>
                    <li>• Let baby explore different safe textures</li>
                    <li>• Respond when baby makes sounds</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">6-12 Months:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Play peek-a-boo and hide-and-seek games</li>
                    <li>• Read simple board books together</li>
                    <li>• Provide safe objects to bang and explore</li>
                    <li>• Copy sounds and actions your baby makes</li>
                    <li>• Play simple cause-and-effect games</li>
                    <li>• Name objects and actions throughout the day</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Development Concerns */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
              <h3 className="text-lg font-semibold text-red-800 mb-4">Seek Immediate Help If:</h3>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>• Loss of skills baby once had</li>
                <li>• No eye contact or social engagement</li>
                <li>• Extreme muscle stiffness or floppiness</li>
                <li>• No response to loud sounds</li>
                <li>• You're worried about your baby's development</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded">
                <p className="text-red-800 font-semibold">Health Visitor: Contact your assigned visitor</p>
                <p className="text-red-800 font-semibold">PHB Health Line: 111</p>
              </div>
            </div>

            {/* Milestone Reminders */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Milestone Reminders</h3>
              <div className="space-y-3 text-blue-700 text-sm">
                <div>
                  <p className="font-semibold">2 months:</p>
                  <p>First smiles, follows moving objects</p>
                </div>
                <div>
                  <p className="font-semibold">4 months:</p>
                  <p>Laughs, reaches for objects, holds head steady</p>
                </div>
                <div>
                  <p className="font-semibold">6 months:</p>
                  <p>Sits with support, babbles, rolls both ways</p>
                </div>
                <div>
                  <p className="font-semibold">9 months:</p>
                  <p>Sits alone, crawls, says mama/dada</p>
                </div>
                <div>
                  <p className="font-semibold">12 months:</p>
                  <p>Pulls to stand, first words, waves bye-bye</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded">
                <p className="text-blue-800 text-sm font-medium">
                  These are typical ages. Your baby may be earlier or later!
                </p>
              </div>
            </div>

            {/* Support Resources */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Development Support</h3>
              </div>
              <div className="space-y-2 text-gray-700 text-sm">
                <p>• Health visitors and pediatricians</p>
                <p>• Early years development centers</p>
                <p>• Baby development classes</p>
                <p>• Parent support groups</p>
                <p>• Online developmental resources</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Encouragement */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 text-center">
          <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Every Step is Progress</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your baby's development is a unique journey that unfolds at their own pace. Every interaction, 
            every cuddle, every moment you spend together is helping them grow and learn. Trust the process, 
            celebrate small victories, and remember that love and attention are the most important gifts 
            you can give your developing baby.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. 
            Every baby develops at their own pace. These milestones are general guidelines, not strict timelines. Always consult with 
            your healthcare provider, pediatrician, or health visitor if you have concerns about your baby's development. 
            Early intervention, when needed, can be very beneficial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;