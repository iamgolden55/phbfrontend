import React, { useState } from 'react';
import { Volume2, Heart, Clock, Shield, Phone, Baby, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const CryingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'understanding' | 'soothing' | 'colic'>('understanding');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 py-8">
        <div className="phb-container">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Understanding Baby Crying</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl">
            Crying is your baby's primary way of communicating with you. While it can feel overwhelming, 
            remember that crying is completely normal and doesn't mean you're doing anything wrong. 
            Every baby cries, and every parent learns to understand their unique little voice.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Reassurance Banner */}
            <section className="bg-blue-50 rounded-lg border-l-4 border-blue-400 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">You're Not Alone in This</h2>
              </div>
              <p className="text-blue-700">
                All babies cry, and all parents feel overwhelmed by crying at times. This is one of the most 
                challenging aspects of early parenthood, but it does get easier as you learn your baby's 
                patterns and they develop other ways to communicate.
              </p>
            </section>

            {/* Crying Topics Tabs */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Decoding Your Baby's Cries</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('understanding')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'understanding'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Understanding Cries
                </button>
                <button
                  onClick={() => setActiveTab('soothing')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'soothing'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Soothing Techniques
                </button>
                <button
                  onClick={() => setActiveTab('colic')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'colic'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Colic & Excessive Crying
                </button>
              </div>

              {/* Understanding Cries Tab */}
              {activeTab === 'understanding' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Why Babies Cry</h3>
                    <p className="text-blue-800 mb-4">
                      Crying is your baby's only way to tell you they need something. With time, you'll start 
                      to recognize different cries and what they might mean. Trust your instincts—you know 
                      your baby better than anyone.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Basic Needs:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• Hunger (most common reason)</li>
                          <li>• Tired and needs sleep</li>
                          <li>• Dirty or wet diaper</li>
                          <li>• Too hot or too cold</li>
                          <li>• Gas or digestive discomfort</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Comfort Needs:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• Wants cuddles and closeness</li>
                          <li>• Overstimulated or overwhelmed</li>
                          <li>• Bored and wants interaction</li>
                          <li>• Feeling unwell or uncomfortable</li>
                          <li>• Just needs to release tension</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Hungry Cry:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Short, low-pitched</li>
                        <li>• Rhythmic and repetitive</li>
                        <li>• Gets more intense if not fed</li>
                        <li>• Often accompanied by rooting</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Tired Cry:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Whining, continuous sound</li>
                        <li>• May be interspersed with yawning</li>
                        <li>• Can escalate quickly</li>
                        <li>• Often worse if overtired</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Discomfort Cry:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• High-pitched and piercing</li>
                        <li>• More urgent sounding</li>
                        <li>• May come in bursts</li>
                        <li>• Check diaper, clothing, temperature</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Overstimulated Cry:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Fussy, irregular pattern</li>
                        <li>• Baby may turn away from stimulation</li>
                        <li>• Often occurs in busy environments</li>
                        <li>• Needs calm, quiet space</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Soothing Techniques Tab */}
              {activeTab === 'soothing' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">The 5 S's Method</h3>
                    <p className="text-blue-800 mb-4">
                      Developed by Dr. Harvey Karp, this method mimics the womb environment and can be 
                      very effective for calming fussy babies, especially in the first few months.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">The 5 S's:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• <strong>Swaddling:</strong> Wrap baby snugly in blanket</li>
                          <li>• <strong>Side/Stomach:</strong> Hold baby on side (never sleep on side)</li>
                          <li>• <strong>Shushing:</strong> Make loud shushing sounds</li>
                          <li>• <strong>Swinging:</strong> Gentle rhythmic movement</li>
                          <li>• <strong>Sucking:</strong> Pacifier or clean finger</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Remember:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• Try one technique at a time</li>
                          <li>• Some babies respond better to certain S's</li>
                          <li>• Always place baby on back for sleep</li>
                          <li>• What works can change as baby grows</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Movement Techniques:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Gentle rocking or swaying</li>
                        <li>• Walking while holding baby</li>
                        <li>• Baby swing or bouncer</li>
                        <li>• Car ride or stroller walk</li>
                        <li>• Dancing slowly with baby</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Sound Techniques:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• White noise or nature sounds</li>
                        <li>• Humming or singing softly</li>
                        <li>• Vacuum cleaner or hair dryer</li>
                        <li>• Recorded heartbeat sounds</li>
                        <li>• Your calm, soothing voice</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Touch Techniques:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Skin-to-skin contact</li>
                        <li>• Gentle baby massage</li>
                        <li>• Warm bath (if cord has healed)</li>
                        <li>• Different holding positions</li>
                        <li>• Patting or rubbing back gently</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Environment Changes:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Dim the lights</li>
                        <li>• Reduce stimulation</li>
                        <li>• Change of scenery</li>
                        <li>• Fresh air outside</li>
                        <li>• Quiet, calm room</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Colic Tab */}
              {activeTab === 'colic' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Understanding Colic</h3>
                    <p className="text-blue-800 mb-4">
                      Colic affects about 1 in 5 babies and typically peaks around 6 weeks, improving by 
                      3-4 months. It's characterized by intense crying for 3+ hours a day, 3+ days a week. 
                      Remember: it's not your fault, and it will pass!
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Signs of Colic:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• Intense crying, often in evening</li>
                          <li>• Crying that's hard to soothe</li>
                          <li>• Clenched fists, arched back</li>
                          <li>• Red face, tense stomach</li>
                          <li>• Regular timing (often 6-10 PM)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">What Helps:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• Keep a crying diary to track patterns</li>
                          <li>• Try the 5 S's method</li>
                          <li>• Consider probiotics (ask your GP)</li>
                          <li>• Take breaks when you need them</li>
                          <li>• Remember: this phase will end</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Survival Strategies for Parents:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Put baby down safely and take a 5-minute break if you feel overwhelmed</li>
                      <li>• Ask for help from family, friends, or professionals</li>
                      <li>• Remember that colic is temporary—it usually improves by 12-16 weeks</li>
                      <li>• Join a support group or talk to other parents who've been through it</li>
                      <li>• Trust that you're not doing anything wrong—some babies just cry more</li>
                      <li>• Consider seeking support for your own mental health if needed</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">When to Contact Your Healthcare Provider:</h4>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Crying suddenly becomes different or more intense</li>
                      <li>• Baby seems unwell (fever, not feeding, vomiting)</li>
                      <li>• You're concerned about your baby's health or development</li>
                      <li>• You're feeling overwhelmed or having thoughts of harming yourself or baby</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Normal vs Concerning Crying */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to Seek Help</h2>
              <p className="text-gray-700 mb-6">
                Most crying is completely normal, but sometimes it can indicate that your baby needs 
                medical attention. Trust your instincts—you know your baby best.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Normal Crying Includes:</h3>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Peak crying at 6-8 weeks, then gradual improvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Fussy periods, especially in the evening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Crying that can be soothed, even if it takes time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Baby still feeding and having wet/dirty diapers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Some calm, alert periods during the day</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <h3 className="font-semibold text-red-800 mb-3">Contact Healthcare Provider If:</h3>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span>High-pitched, continuous screaming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span>Crying suddenly becomes very different</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span>Baby won't feed or seems unwell</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span>Fever, vomiting, or other illness signs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span>You're worried something is wrong</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Self-Care for Parents */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Looking After Yourself</h2>
              <p className="text-gray-700 mb-6">
                Dealing with a crying baby is emotionally and physically exhausting. It's completely normal 
                to feel frustrated, helpless, or overwhelmed. Taking care of yourself isn't selfish—it's 
                necessary for both you and your baby.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">When You Feel Overwhelmed:</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Put baby down safely in their cot and take a break</li>
                    <li>• Call a friend or family member for support</li>
                    <li>• Step outside for fresh air if possible</li>
                    <li>• Remember: it's okay to let baby cry while you collect yourself</li>
                    <li>• Take deep breaths and remind yourself this phase will pass</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Building Your Support Network:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Accept help when it's offered</li>
                    <li>• Connect with other parents in similar situations</li>
                    <li>• Don't hesitate to ask healthcare providers for guidance</li>
                    <li>• Consider joining parent support groups</li>
                    <li>• Remember: asking for help is a sign of strength</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Crying Contacts */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">When to Call Immediately</h3>
              </div>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>• High-pitched, continuous screaming</li>
                <li>• Baby seems to be in pain</li>
                <li>• Crying with fever, vomiting, or rash</li>
                <li>• Baby won't feed or seems very unwell</li>
                <li>• You're having thoughts of harming yourself or baby</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded">
                <p className="text-red-800 font-semibold">Emergency: 999</p>
                <p className="text-red-800 font-semibold">PHB Health Line: 111</p>
                <p className="text-red-800 font-semibold">Parent Helpline: 0808 802 6666</p>
              </div>
            </div>

            {/* Quick Crying Checklist */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Quick Check List</h3>
              </div>
              <div className="space-y-3 text-blue-700 text-sm">
                <div>
                  <p className="font-semibold mb-1">When baby cries, check:</p>
                  <ul className="space-y-1">
                    <li>• Is baby hungry?</li>
                    <li>• Does diaper need changing?</li>
                    <li>• Is baby too hot/cold?</li>
                    <li>• Does baby need burping?</li>
                    <li>• Is baby tired?</li>
                    <li>• Does baby want comfort/cuddles?</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Crying Patterns */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Normal Crying Patterns</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">0-6 weeks:</p>
                  <p>Peak crying period, up to 2-3 hours daily</p>
                </div>
                <div>
                  <p className="font-semibold">6-12 weeks:</p>
                  <p>Gradual improvement in crying duration</p>
                </div>
                <div>
                  <p className="font-semibold">3-4 months:</p>
                  <p>Most colic and excessive crying resolves</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <p className="text-gray-800 text-sm font-medium">
                  Remember: Every baby is different. These are general patterns.
                </p>
              </div>
            </div>

            {/* Support Resources */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Support Resources</h3>
              </div>
              <div className="space-y-2 text-blue-700 text-sm">
                <p>• Health visitor support</p>
                <p>• Parent support groups</p>
                <p>• Online parenting forums</p>
                <p>• Family and friends</p>
                <p>• Mental health support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 text-center">
          <Heart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">This Too Shall Pass</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Crying is your baby's way of communicating, and while it can be challenging, remember that 
            you're learning each other's language. Every cry answered with love and care helps build 
            trust and security. Be patient with yourself and your baby—you're both doing the best you can.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. 
            Every baby's crying patterns are unique. Always consult with your healthcare provider, pediatrician, or health visitor 
            if you have concerns about your baby's crying, health, or development. If you're feeling overwhelmed or having 
            concerning thoughts, seek support immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryingPage;