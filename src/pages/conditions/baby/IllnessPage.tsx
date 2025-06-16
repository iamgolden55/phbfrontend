import React, { useState } from 'react';
import { Thermometer, Heart, Phone, AlertTriangle, CheckCircle, Clock, Shield, Stethoscope } from 'lucide-react';

const IllnessPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sick-or-normal' | 'fever' | 'common-illness'>('sick-or-normal');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 py-8">
        <div className="phb-container">
          <div className="flex items-center gap-3 mb-4">
            <Stethoscope className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">When Your Baby is Unwell</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl">
            All babies get sick sometimes. This is normal and part of growing up. Most times, babies 
            get better with love, care, and rest. This guide will help you know when your baby is sick 
            and what to do to help them feel better.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Emergency Banner */}
            <section className="bg-red-50 rounded-lg border-l-4 border-red-400 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-red-800">Call 999 Right Away If Your Baby:</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-red-700">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span><strong>Cannot breathe well</strong> - struggling, blue lips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span><strong>Will not wake up</strong> - very sleepy, hard to wake</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span><strong>Has a fit or seizure</strong> - shaking, not responding</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span><strong>Very hot fever</strong> - under 3 months with any fever</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span><strong>Cannot stop crying</strong> - high-pitched screaming</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span><strong>You are very worried</strong> - trust your feelings</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Simple Tabs */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Understanding Baby Illness</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('sick-or-normal')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'sick-or-normal'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sick or Normal?
                </button>
                <button
                  onClick={() => setActiveTab('fever')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'fever'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Fever Guide
                </button>
                <button
                  onClick={() => setActiveTab('common-illness')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'common-illness'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Common Illnesses
                </button>
              </div>

              {/* Sick or Normal Tab */}
              {activeTab === 'sick-or-normal' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">How to Tell if Your Baby is Sick</h3>
                    <p className="text-blue-800 mb-4">
                      You know your baby best. If something feels different or wrong, trust your feelings. 
                      Here are signs to look for:
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                      <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Normal Baby Behavior
                      </h3>
                      <ul className="space-y-2 text-green-700 text-sm">
                        <li>• <strong>Eating well</strong> - takes milk or food normally</li>
                        <li>• <strong>Alert when awake</strong> - looks around, interested</li>
                        <li>• <strong>Normal crying</strong> - can be comforted</li>
                        <li>• <strong>Wet diapers</strong> - at least 6 wet diapers per day</li>
                        <li>• <strong>Normal skin color</strong> - pink lips and face</li>
                        <li>• <strong>Sleeps normally</strong> - can be woken for feeds</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                      <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        Signs Your Baby Might Be Sick
                      </h3>
                      <ul className="space-y-2 text-yellow-700 text-sm">
                        <li>• <strong>Not eating</strong> - refusing milk or food</li>
                        <li>• <strong>Very sleepy</strong> - hard to wake up</li>
                        <li>• <strong>Different crying</strong> - high-pitched or weak</li>
                        <li>• <strong>Dry diapers</strong> - fewer than 6 wet diapers</li>
                        <li>• <strong>Hot or cold</strong> - fever or very cold</li>
                        <li>• <strong>Vomiting</strong> - throwing up repeatedly</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">What to Do When Baby Seems Sick:</h4>
                    <ol className="space-y-2 text-gray-700 text-sm list-decimal list-inside">
                      <li><strong>Check temperature</strong> - Use a thermometer</li>
                      <li><strong>Offer extra comfort</strong> - Cuddles and gentle care</li>
                      <li><strong>Try feeding</strong> - Small amounts if baby will take</li>
                      <li><strong>Watch closely</strong> - See if baby gets better or worse</li>
                      <li><strong>Call for help</strong> - If worried or baby gets worse</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Fever Tab */}
              {activeTab === 'fever' && (
                <div className="space-y-6">
                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
                      <Thermometer className="h-6 w-6 text-red-600" />
                      Understanding Fever
                    </h3>
                    <p className="text-red-800 mb-4">
                      Fever means your baby's body is hot. Normal body temperature is around 37°C (98.6°F). 
                      Fever in babies can be serious, especially in very young babies.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div className="bg-red-100 rounded-lg p-4 border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-800 mb-3">URGENT - Call Doctor Right Away:</h4>
                      <ul className="space-y-2 text-red-700 text-sm">
                        <li>• <strong>Baby under 3 months with ANY fever</strong> (38°C/100.4°F or higher)</li>
                        <li>• <strong>Baby 3-6 months with fever over 39°C (102°F)</strong></li>
                        <li>• <strong>Fever with other serious signs</strong> (not eating, vomiting, rash)</li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">How to Check Temperature:</h4>
                        <ol className="space-y-2 text-blue-700 text-sm list-decimal list-inside">
                          <li>Use a digital thermometer</li>
                          <li>Under the arm is easiest for babies</li>
                          <li>Hold baby's arm down for 2 minutes</li>
                          <li>Add 0.5°C to the reading</li>
                          <li>Write down the number</li>
                        </ol>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Temperature Guide:</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• <strong>Normal:</strong> 36-37.5°C (96.8-99.5°F)</li>
                          <li>• <strong>Mild fever:</strong> 37.6-38.4°C (99.6-101°F)</li>
                          <li>• <strong>High fever:</strong> 38.5°C+ (101°F+)</li>
                          <li>• <strong>Very high:</strong> 40°C+ (104°F+)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">How to Help Baby with Fever:</h4>
                      <ul className="space-y-2 text-blue-700 text-sm">
                        <li>• <strong>Give extra fluids</strong> - More milk/formula if breastfeeding</li>
                        <li>• <strong>Keep baby cool</strong> - Light clothing, cool room</li>
                        <li>• <strong>Paracetamol</strong> - Only if baby over 2 months, follow packet instructions</li>
                        <li>• <strong>Lukewarm bath</strong> - Not cold water</li>
                        <li>• <strong>Watch closely</strong> - Check temperature every hour</li>
                        <li>• <strong>Call doctor</strong> - If fever doesn't go down or baby gets worse</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Common Illness Tab */}
              {activeTab === 'common-illness' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Common Baby Illnesses</h3>
                    <p className="text-blue-800 mb-4">
                      Most baby illnesses are not serious and get better with time and care. Here are 
                      the most common ones and what to do:
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">😤 Runny Nose and Cough (Cold)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Runny or blocked nose</li>
                            <li>• Coughing or sneezing</li>
                            <li>• May have mild fever</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Keep baby upright when feeding</li>
                            <li>• Use saline drops for blocked nose</li>
                            <li>• Give extra fluids</li>
                            <li>• Call doctor if breathing is hard</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🤢 Vomiting and Diarrhea (Stomach Bug)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Throwing up milk/food</li>
                            <li>• Watery or frequent poo</li>
                            <li>• May be cranky or tired</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Give small amounts of milk often</li>
                            <li>• Watch for dry mouth or no wet diapers</li>
                            <li>• Call doctor if vomiting doesn't stop</li>
                            <li>• Keep baby clean and comfortable</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🌡️ Ear Infection</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Baby pulling or touching ear</li>
                            <li>• Crying more than usual</li>
                            <li>• May have fever</li>
                            <li>• Trouble sleeping</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Give paracetamol for pain</li>
                            <li>• Cuddle and comfort baby</li>
                            <li>• See doctor - may need medicine</li>
                            <li>• Don't put anything in the ear</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🔴 Rash or Skin Changes</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What you see:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Red spots or patches</li>
                            <li>• Rough or bumpy skin</li>
                            <li>• Baby scratching or rubbing</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2"><strong>What to do:</strong></p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Keep skin clean and dry</li>
                            <li>• Use gentle baby cream</li>
                            <li>• Call doctor if rash spreads quickly</li>
                            <li>• Call 999 if baby has fever with rash</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* When to Call Doctor */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to Call the Doctor</h2>
              <p className="text-gray-700 mb-6">
                It's always okay to call the doctor if you're worried about your baby. Here's a simple 
                guide to help you decide:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <h3 className="font-semibold text-red-800 mb-3">Call 999 NOW</h3>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Can't breathe well</li>
                    <li>• Blue lips or face</li>
                    <li>• Won't wake up</li>
                    <li>• Having a fit</li>
                    <li>• Very hot (under 3 months)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <h3 className="font-semibold text-yellow-800 mb-3">Call Doctor Same Day</h3>
                  <ul className="space-y-1 text-yellow-700 text-sm">
                    <li>• High fever over 39°C</li>
                    <li>• Not eating for 12+ hours</li>
                    <li>• Vomiting everything</li>
                    <li>• No wet diapers for 8+ hours</li>
                    <li>• Acting very different</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800 mb-3">Call Doctor Soon</h3>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• Mild fever for 3+ days</li>
                    <li>• Bad cough or cold</li>
                    <li>• Ear pulling + crying</li>
                    <li>• Rash that's spreading</li>
                    <li>• You're worried</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Simple Home Care */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Simple Home Care</h2>
              <p className="text-gray-700 mb-6">
                When your baby is unwell, these simple things can help them feel better:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Comfort Care:</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• <strong>Extra cuddles</strong> - Skin-to-skin contact</li>
                    <li>• <strong>Rest</strong> - Let baby sleep more</li>
                    <li>• <strong>Gentle care</strong> - Quiet, dim lighting</li>
                    <li>• <strong>Fresh air</strong> - Open window for fresh air</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Feeding Care:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>Small amounts often</strong> - Little and frequent feeds</li>
                    <li>• <strong>Extra fluids</strong> - More milk if breastfeeding</li>
                    <li>• <strong>Don't force</strong> - If baby won't eat, try later</li>
                    <li>• <strong>Breast milk</strong> - Best medicine for breastfed babies</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Numbers */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Important Numbers</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-100 rounded">
                  <p className="text-red-800 font-bold text-lg">Emergency: 999</p>
                  <p className="text-red-700 text-sm">For life-threatening emergencies</p>
                </div>
                <div className="p-3 bg-blue-100 rounded">
                  <p className="text-blue-800 font-bold">PHB Health Line: 111</p>
                  <p className="text-blue-700 text-sm">24-hour health advice</p>
                </div>
                <div className="p-3 bg-gray-100 rounded">
                  <p className="text-gray-800 font-bold">Your GP Surgery:</p>
                  <p className="text-gray-700 text-sm">Write your doctor's number here</p>
                </div>
              </div>
            </div>

            {/* Medicine Safety */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">Medicine Safety</h3>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• <strong>Only paracetamol for babies over 2 months</strong></li>
                <li>• <strong>Follow packet instructions exactly</strong></li>
                <li>• <strong>Never give adult medicine to babies</strong></li>
                <li>• <strong>Check with pharmacist if unsure</strong></li>
                <li>• <strong>Keep all medicines locked away</strong></li>
              </ul>
            </div>

            {/* Temperature Check */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Quick Temperature Check</h3>
              <div className="space-y-3 text-blue-700 text-sm">
                <div>
                  <p className="font-semibold">Feel baby's chest or back of neck</p>
                  <p>If it feels hot, check with thermometer</p>
                </div>
                <div>
                  <p className="font-semibold">Normal baby temperature:</p>
                  <p>36-37.5°C (96.8-99.5°F)</p>
                </div>
                <div>
                  <p className="font-semibold">Call doctor if:</p>
                  <p>38°C+ (100.4°F+) in babies under 3 months</p>
                </div>
              </div>
            </div>

            {/* Trust Your Feelings */}
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Trust Yourself</h3>
              </div>
              <p className="text-green-700 text-sm">
                You know your baby best. If something feels wrong or different, it's always okay to 
                call the doctor or health visitor. They would rather you call and everything be fine 
                than not call when something is wrong.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 text-center">
          <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">You're Doing Great</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Taking care of a sick baby is hard and worrying. Remember that most baby illnesses are not 
            serious and get better with time, love, and care. Trust your feelings, ask for help when 
            you need it, and know that you're being a wonderful parent by caring so much.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. 
            Every baby is different and illnesses can change quickly. Always consult with your healthcare provider, pediatrician, 
            or call emergency services if you are concerned about your baby's health. When in doubt, seek professional medical help immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IllnessPage;