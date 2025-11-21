import React, { useState } from 'react';
import { Heart, Clock, Shield, Phone, Baby, Milk, AlertTriangle, CheckCircle, Users, BookOpen } from 'lucide-react';

const FeedingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'breastfeeding' | 'formula' | 'mixed'>('breastfeeding');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-8">
        <div className="phb-container">
          <div className="flex items-center gap-3 mb-4">
            <Milk className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900">Feeding Your Baby</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl">
            Every feeding journey is unique and beautiful. Whether you breastfeed, formula feed, or do both, 
            you're nourishing your baby with love. Here's everything you need to feel confident and supported 
            in your feeding choices.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Feeding Method Tabs */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Feeding Journey</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('breastfeeding')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'breastfeeding'
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Breastfeeding
                </button>
                <button
                  onClick={() => setActiveTab('formula')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'formula'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Formula Feeding
                </button>
                <button
                  onClick={() => setActiveTab('mixed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'mixed'
                      ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mixed Feeding
                </button>
              </div>

              {/* Breastfeeding Tab */}
              {activeTab === 'breastfeeding' && (
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Breastfeeding: A Natural Gift</h3>
                    <p className="text-green-800 mb-4">
                      Breastfeeding is a learned skill for both you and your baby. It's perfectly normal to need 
                      time and practice. Be patient with yourself—you're both learning together!
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Getting Started:</h4>
                        <ul className="space-y-1 text-green-800 text-sm">
                          <li>• Skin-to-skin contact helps with latching</li>
                          <li>• Look for early hunger cues (rooting, lip smacking)</li>
                          <li>• Baby's mouth should cover most of the areola</li>
                          <li>• You should feel pulling, not pinching</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Feeding Frequency:</h4>
                        <ul className="space-y-1 text-green-800 text-sm">
                          <li>• Newborns: 8-12 times in 24 hours</li>
                          <li>• Every 1.5-3 hours is normal</li>
                          <li>• Cluster feeding in evenings is common</li>
                          <li>• Growth spurts mean more frequent feeds</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Comfortable Positions:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li><strong>Cradle Hold:</strong> Classic position with baby across your lap</li>
                        <li><strong>Cross-Cradle:</strong> More control for newborns</li>
                        <li><strong>Football Hold:</strong> Great after C-section</li>
                        <li><strong>Side-lying:</strong> Perfect for night feeds</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Signs of Good Latch:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Baby's chin touches your breast</li>
                        <li>• More areola visible above baby's top lip</li>
                        <li>• You can hear swallowing sounds</li>
                        <li>• Baby's cheeks are rounded, not dimpled</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Formula Feeding Tab */}
              {activeTab === 'formula' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Formula Feeding: Perfectly Nutritious</h3>
                    <p className="text-blue-800 mb-4">
                      Modern infant formula provides complete nutrition for your baby. You can bond beautifully 
                      through bottle feeding, and it allows others to share in feeding your baby too!
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Safe Preparation:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• Always wash hands thoroughly first</li>
                          <li>• Use boiled water cooled to room temperature</li>
                          <li>• Follow formula instructions exactly</li>
                          <li>• Never add extra scoops or water</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Feeding Amounts (Guide):</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• 0-2 weeks: 1-3 oz every 2-3 hours</li>
                          <li>• 2-4 weeks: 2-4 oz every 3-4 hours</li>
                          <li>• 1-2 months: 3-5 oz every 3-4 hours</li>
                          <li>• 2-6 months: 4-6 oz every 4-5 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Bottle Feeding Tips:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Hold baby upright, never flat</li>
                        <li>• Keep bottle tilted so nipple stays full</li>
                        <li>• Let baby control the pace</li>
                        <li>• Burp every 1-2 oz during feeding</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Formula Storage:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Prepared formula: 1 hour at room temp</li>
                        <li>• In refrigerator: 24 hours maximum</li>
                        <li>• Never reuse leftover formula</li>
                        <li>• Cool boiled water can be stored 24 hours</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Mixed Feeding Tab */}
              {activeTab === 'mixed' && (
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-purple-900 mb-4">Mixed Feeding: Best of Both</h3>
                    <p className="text-purple-800 mb-4">
                      Combining breast and bottle feeding can work beautifully for many families. It offers 
                      flexibility while still providing the benefits of breastfeeding. Every drop of breast 
                      milk matters!
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Getting Started:</h4>
                        <ul className="space-y-1 text-purple-800 text-sm">
                          <li>• Establish breastfeeding first (3-4 weeks)</li>
                          <li>• Introduce bottles gradually</li>
                          <li>• Consider paced bottle feeding</li>
                          <li>• Let others give bottles to maintain bonding</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Maintaining Supply:</h4>
                        <ul className="space-y-1 text-purple-800 text-sm">
                          <li>• Pump when baby has a bottle</li>
                          <li>• Continue regular breastfeeds</li>
                          <li>• Watch for supply dips and adjust</li>
                          <li>• Stay hydrated and well-nourished</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-3">💡 Helpful Mixed Feeding Tips:</h4>
                    <ul className="space-y-2 text-yellow-700 text-sm">
                      <li>• Use breast-like bottle nipples to ease transitions</li>
                      <li>• Consider topping up after breastfeeds rather than replacing them</li>
                      <li>• Express milk for bottle feeds when possible</li>
                      <li>• Be flexible—some days you might need more formula, others more breast milk</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Recognizing Feeding Cues */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reading Your Baby's Cues</h2>
              <p className="text-gray-700 mb-6">
                Learning to recognize when your baby is hungry or full helps create a positive feeding experience 
                for both of you. Trust your instincts—you know your baby best!
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-3">Hunger Cues (Feed Me!):</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Rooting (turning head, opening mouth)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Lip smacking or tongue movements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Bringing hands to mouth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Increased alertness and movement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Fussing (crying is a late hunger cue!)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Fullness Cues (I'm Done!):</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Slowing down or stopping sucking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Releasing the nipple or pushing bottle away</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Turning head away from food</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Relaxed hands and body</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Falling asleep or becoming drowsy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Feeding Challenges */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Challenges (You're Not Alone!)</h2>
              <p className="text-gray-700 mb-6">
                Most parents face feeding challenges at some point. Remember, these are usually temporary 
                and very manageable with the right support and information.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Breastfeeding Challenges:</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li><strong>Sore nipples:</strong> Check latch, use lanolin cream</li>
                    <li><strong>Low supply:</strong> Feed frequently, stay hydrated, rest</li>
                    <li><strong>Engorgement:</strong> Express a little before feeds</li>
                    <li><strong>Blocked ducts:</strong> Massage, warm compress, frequent feeding</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">General Feeding Issues:</h4>
                  <ul className="space-y-2 text-orange-700 text-sm">
                    <li><strong>Reflux:</strong> Keep baby upright after feeds</li>
                    <li><strong>Colic:</strong> Try different positions, comfort measures</li>
                    <li><strong>Slow weight gain:</strong> More frequent feeds, check with GP</li>
                    <li><strong>Feeding refusal:</strong> Stay calm, try when baby is calm</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Introducing Solids */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Starting Solid Foods (Around 6 Months)</h2>
              <p className="text-gray-700 mb-6">
                Around 6 months, your baby will be ready to explore solid foods alongside milk. This is 
                an exciting milestone that opens up a whole new world of tastes and textures!
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-900 mb-3">Signs of Readiness:</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Can sit up with minimal support</li>
                  <li>• Shows interest in food (reaching, watching you eat)</li>
                  <li>• Can coordinate eyes, hands, and mouth</li>
                  <li>• Has lost the tongue-thrust reflex</li>
                  <li>• Can pick up objects and bring to mouth</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">First Foods:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Iron-rich foods (baby cereal, pureed meat)</li>
                    <li>• Soft fruits (banana, avocado, cooked apple)</li>
                    <li>• Vegetables (sweet potato, carrots, broccoli)</li>
                    <li>• Introduce one food at a time</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Safety First:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Always supervise eating</li>
                    <li>• No honey before 12 months</li>
                    <li>• Watch for choking hazards</li>
                    <li>• Milk remains main nutrition source initially</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Feeding Contacts */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Feeding Concerns - When to Call</h3>
              </div>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>• No wet diapers for 6+ hours</li>
                <li>• Signs of dehydration (dry mouth, lethargy)</li>
                <li>• Persistent vomiting after feeds</li>
                <li>• Baby refusing all feeds for 4+ hours</li>
                <li>• Severe feeding pain for mum</li>
                <li>• No weight gain or weight loss</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded">
                <p className="text-red-800 font-semibold">Emergency: 999</p>
                <p className="text-red-800 font-semibold">PHB Health Line: 111</p>
                <p className="text-red-800 font-semibold">Feeding Support: 0300 100 0212</p>
              </div>
            </div>

            {/* Feeding Schedule Guide */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Typical Feeding Patterns</h3>
              </div>
              <div className="space-y-3 text-blue-700 text-sm">
                <div>
                  <p className="font-semibold">0-2 weeks:</p>
                  <p>Every 1.5-3 hours (8-12 feeds/day)</p>
                </div>
                <div>
                  <p className="font-semibold">2-8 weeks:</p>
                  <p>Every 2-4 hours (6-8 feeds/day)</p>
                </div>
                <div>
                  <p className="font-semibold">2-6 months:</p>
                  <p>Every 3-4 hours (5-6 feeds/day)</p>
                </div>
                <div>
                  <p className="font-semibold">6+ months:</p>
                  <p>4-5 milk feeds + solid meals</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded">
                <p className="text-blue-800 text-sm font-medium">
                  Remember: Every baby is different! These are guidelines, not rules.
                </p>
              </div>
            </div>

            {/* Support Resources */}
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">Feeding Support</h3>
              </div>
              <div className="space-y-3 text-purple-700 text-sm">
                <a href="/mental-health/new-parents" className="block hover:text-purple-900 underline">
                  New Parent Mental Health
                </a>
                <a href="/conditions/baby/newborn" className="block hover:text-purple-900 underline">
                  Newborn Care Guide
                </a>
                <a href="/using-the-phb/family-health" className="block hover:text-purple-900 underline">
                  PHB Family Services
                </a>
                <div className="pt-2 border-t border-purple-200">
                  <p className="font-semibold mb-2">Professional Support:</p>
                  <p>• Lactation consultants</p>
                  <p>• Health visitors</p>
                  <p>• Feeding specialists</p>
                  <p>• Peer support groups</p>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Daily Feeding Tips</h3>
              </div>
              <ul className="space-y-3 text-green-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                  <span>Follow your baby's cues, not the clock</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                  <span>Wet and dirty diapers show good intake</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                  <span>Burp gently but don't worry if no burp comes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                  <span>Trust your instincts—you know your baby</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                  <span>Ask for help when you need it</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Encouragement */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
          <Heart className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Every Feeding Journey is Beautiful</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Whether you breastfeed, bottle feed, or do a combination of both, you're providing your baby 
            with love, nutrition, and care. Trust yourself, be patient, and remember that feeding is about 
            so much more than just nutrition—it's about bonding, comfort, and connection.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. 
            Every baby's feeding needs are unique. Always consult with your healthcare provider, pediatrician, health visitor, or 
            lactation consultant for personalized feeding guidance. If you have concerns about your baby's feeding or growth, 
            contact your healthcare provider immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedingPage;