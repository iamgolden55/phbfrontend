import React, { useState } from 'react';
import { Droplets, Shield, Sun, AlertTriangle, CheckCircle, Heart, Baby } from 'lucide-react';

const SkinPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'normal-skin' | 'common-problems' | 'care-tips'>('normal-skin');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 py-8">
        <div className="phb-container">
          <div className="flex items-center gap-3 mb-4">
            <Baby className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Baby Skin Care</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl">
            Baby skin is very soft and delicate. It needs gentle care and protection. Most skin 
            problems in babies are normal and get better with simple care. Learn what's normal 
            and how to keep your baby's skin healthy and comfortable.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Important Reminder */}
            <section className="bg-blue-50 rounded-lg border-l-4 border-blue-400 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Baby Skin is Special</h2>
              </div>
              <p className="text-blue-700">
                Baby skin is 5 times thinner than adult skin. It needs extra gentle care and protection. 
                Most baby skin problems are normal and temporary. Simple, gentle care is usually all 
                that's needed.
              </p>
            </section>

            {/* Skin Care Tabs */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Understanding Baby Skin</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('normal-skin')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'normal-skin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Normal Baby Skin
                </button>
                <button
                  onClick={() => setActiveTab('common-problems')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'common-problems'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Common Skin Problems
                </button>
                <button
                  onClick={() => setActiveTab('care-tips')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'care-tips'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Daily Skin Care
                </button>
              </div>

              {/* Normal Skin Tab */}
              {activeTab === 'normal-skin' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">What Normal Baby Skin Looks Like</h3>
                    <p className="text-blue-800 mb-4">
                      Newborn skin changes a lot in the first few weeks. Many things that look worrying 
                      are actually completely normal and will go away by themselves.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-800 mb-3">Normal Things You Might See:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <ul className="space-y-2 text-green-700 text-sm">
                            <li>• <strong>Peeling skin</strong> - Like after sunburn, very normal</li>
                            <li>• <strong>Red blotchy patches</strong> - Come and go, especially when crying</li>
                            <li>• <strong>Tiny white spots</strong> - On nose and cheeks, called milia</li>
                            <li>• <strong>Blue hands/feet</strong> - When cold, normal in first days</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-2 text-green-700 text-sm">
                            <li>• <strong>Soft fuzzy hair</strong> - All over body, will fall off</li>
                            <li>• <strong>Dry, flaky skin</strong> - Normal after birth</li>
                            <li>• <strong>Yellow/orange tinge</strong> - Mild jaundice, common in first week</li>
                            <li>• <strong>Pink/red color</strong> - Normal baby skin color</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Birthmarks (Normal Marks):</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Common birthmarks:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• <strong>Stork marks</strong> - Pink patches on eyelids, forehead</li>
                            <li>• <strong>Mongolian spots</strong> - Blue-gray patches on back/bottom</li>
                            <li>• <strong>Strawberry marks</strong> - Raised red bumps</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">What to know:</p>
                          <ul className="space-y-1 text-gray-600 text-sm">
                            <li>• Most birthmarks are harmless</li>
                            <li>• Many fade or disappear as baby grows</li>
                            <li>• Ask doctor if you're worried</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Common Problems Tab */}
              {activeTab === 'common-problems' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Common Baby Skin Problems</h3>
                    <p className="text-blue-800 mb-4">
                      Most baby skin problems are mild and get better with gentle care. Here are the 
                      most common ones and simple things you can do to help:
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🍼 Baby Acne (Red Spots on Face)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Small red or white spots on face</li>
                            <li>• Usually on cheeks, forehead, chin</li>
                            <li>• Appears in first few weeks</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Wash gently with water only</li>
                            <li>• Don't squeeze or pick spots</li>
                            <li>• No special creams needed</li>
                            <li>• Will go away by itself in few weeks</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🧴 Cradle Cap (Scaly Scalp)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Yellow or brown scaly patches on head</li>
                            <li>• Can be thick and crusty</li>
                            <li>• Sometimes on eyebrows too</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Rub gentle baby oil on scalp</li>
                            <li>• Leave for few hours, then wash off</li>
                            <li>• Gently brush with soft baby brush</li>
                            <li>• Don't pick or scratch</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🔴 Diaper Rash (Red Bottom)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Red, sore-looking skin on bottom</li>
                            <li>• Sometimes spots or bumps</li>
                            <li>• Baby may cry during diaper changes</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Change diapers more often</li>
                            <li>• Clean gently with water</li>
                            <li>• Let skin air dry before new diaper</li>
                            <li>• Use thick barrier cream</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🌡️ Heat Rash (Tiny Red Bumps)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Tiny red bumps or blisters</li>
                            <li>• Usually on chest, neck, face</li>
                            <li>• Appears when baby is too hot</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Keep baby cool</li>
                            <li>• Remove extra clothing</li>
                            <li>• Cool bath can help</li>
                            <li>• Will go away when baby cools down</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🟡 Baby Eczema (Dry, Itchy Patches)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Dry, rough, red patches</li>
                            <li>• Usually on face, arms, legs</li>
                            <li>• Baby may scratch or rub area</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Use gentle, fragrance-free moisturizer</li>
                            <li>• Short, lukewarm baths</li>
                            <li>• Pat skin dry, don't rub</li>
                            <li>• See doctor if it gets worse</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Care Tips Tab */}
              {activeTab === 'care-tips' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Daily Skin Care for Your Baby</h3>
                    <p className="text-blue-800 mb-4">
                      Simple, gentle care is best for baby skin. You don't need lots of products - 
                      sometimes less is more when it comes to delicate baby skin.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-blue-600" />
                        Bath Time Care
                      </h4>
                      <ul className="space-y-2 text-blue-700 text-sm">
                        <li>• <strong>2-3 times per week</strong> - Daily baths not needed</li>
                        <li>• <strong>Lukewarm water</strong> - Test with your elbow</li>
                        <li>• <strong>5-10 minutes max</strong> - Long baths dry out skin</li>
                        <li>• <strong>Gentle baby wash</strong> - Fragrance-free is best</li>
                        <li>• <strong>Pat dry gently</strong> - Don't rub with towel</li>
                        <li>• <strong>Moisturize right after</strong> - While skin still damp</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-gray-600" />
                        Daily Protection
                      </h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• <strong>Gentle moisturizer</strong> - Use fragrance-free baby lotion</li>
                        <li>• <strong>Clean face gently</strong> - Use soft cloth with warm water</li>
                        <li>• <strong>Change diapers often</strong> - Keep bottom clean and dry</li>
                        <li>• <strong>Soft clothes</strong> - Choose cotton, avoid rough fabrics</li>
                        <li>• <strong>Room temperature</strong> - Not too hot or cold</li>
                        <li>• <strong>Gentle detergent</strong> - Wash baby clothes with mild soap</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                        <Sun className="h-5 w-5 text-yellow-600" />
                        Sun Protection
                      </h4>
                      <ul className="space-y-2 text-yellow-700 text-sm">
                        <li>• <strong>Keep baby in shade</strong> - Under 6 months avoid direct sun</li>
                        <li>• <strong>Cover arms and legs</strong> - Light, long-sleeved clothes</li>
                        <li>• <strong>Wide-brimmed hat</strong> - Protect face and neck</li>
                        <li>• <strong>Sunscreen for babies 6+ months</strong> - SPF 30+ on exposed skin</li>
                        <li>• <strong>Avoid midday sun</strong> - 10am-4pm is strongest</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-3">What NOT to Use:</h4>
                      <ul className="space-y-2 text-green-700 text-sm">
                        <li>• <strong>Adult products</strong> - Too harsh for baby skin</li>
                        <li>• <strong>Scented products</strong> - Can cause irritation</li>
                        <li>• <strong>Talcum powder</strong> - Can be harmful if breathed in</li>
                        <li>• <strong>Antiseptic wipes</strong> - Too strong for daily use</li>
                        <li>• <strong>Hot water</strong> - Can burn delicate skin</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Simple Daily Routine:</h4>
                    <ol className="space-y-2 text-blue-700 text-sm list-decimal list-inside">
                      <li><strong>Morning:</strong> Gently wash face and hands with warm water</li>
                      <li><strong>Diaper changes:</strong> Clean bottom gently, apply barrier cream</li>
                      <li><strong>After bath:</strong> Pat dry and apply gentle moisturizer all over</li>
                      <li><strong>Throughout day:</strong> Check for redness or irritation</li>
                      <li><strong>Before bed:</strong> Make sure baby is clean, dry, and comfortable</li>
                    </ol>
                  </div>
                </div>
              )}
            </section>

            {/* When to See Doctor */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to See the Doctor</h2>
              <p className="text-gray-700 mb-6">
                Most baby skin problems are normal and get better with simple care. However, sometimes 
                you need to see a doctor:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <h3 className="font-semibold text-red-800 mb-3">See Doctor Soon If:</h3>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span><strong>Skin infection signs</strong> - Yellow pus, red streaks, hot to touch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span><strong>Severe eczema</strong> - Very red, weeping, won't heal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span><strong>Diaper rash getting worse</strong> - Despite good care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span><strong>New unusual rash</strong> - Especially with fever</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-1 text-red-600" />
                      <span><strong>You're worried</strong> - Trust your instincts</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-800 mb-3">Usually Normal:</h3>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Baby acne that comes and goes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Mild cradle cap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Small amount of peeling skin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Birthmarks that don't change</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600" />
                      <span>Mild diaper rash that improves</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Skin Problems */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
              <h3 className="text-lg font-semibold text-red-800 mb-4">Call Doctor Right Away:</h3>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>• Widespread rash with fever</li>
                <li>• Skin hot and red with streaks</li>
                <li>• Baby seems very unwell with skin problem</li>
                <li>• Lots of yellow pus from skin</li>
                <li>• Large blisters or raw areas</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded">
                <p className="text-red-800 font-semibold">Emergency: 999</p>
                <p className="text-red-800 font-semibold">PHB Health Line: 111</p>
              </div>
            </div>

            {/* Products to Use */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Gentle Products for Baby:</h3>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• <strong>Fragrance-free baby wash</strong></li>
                <li>• <strong>Gentle baby moisturizer</strong></li>
                <li>• <strong>Zinc oxide barrier cream</strong></li>
                <li>• <strong>Soft cotton cloths</strong></li>
                <li>• <strong>Mild laundry detergent</strong></li>
              </ul>
            </div>

            {/* Quick Tips */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Skin Care Reminders:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Less is more - don't over-wash</li>
                <li>• Pat dry, don't rub</li>
                <li>• Keep baby comfortable temperature</li>
                <li>• Change wet/dirty diapers quickly</li>
                <li>• Use gentle, fragrance-free products</li>
                <li>• Watch for any changes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Encouragement */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 text-center">
          <Droplets className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gentle Care for Delicate Skin</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your baby's skin is precious and delicate. With gentle, simple care, most skin problems 
            will get better on their own. Trust your instincts, use mild products, and don't hesitate 
            to ask for help if you're worried. You're taking wonderful care of your little one.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. 
            Every baby's skin is different and conditions can change. Always consult with your healthcare provider, pediatrician, 
            or dermatologist if you have concerns about your baby's skin. When in doubt, seek professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkinPage;