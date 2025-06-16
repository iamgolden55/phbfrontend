import React, { useState } from 'react';
import { Heart, Clock, Shield, Phone, Baby, Thermometer, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const NewbornPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 py-8">
        <div className="phb-container">
          <div className="flex items-center gap-3 mb-4">
            <Baby className="h-8 w-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-900">Your Precious Newborn</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl">
            Welcome to parenthood! The first weeks with your newborn are a magical time filled with wonder, 
            love, and yes—perfectly normal questions and concerns. You're doing an amazing job, and we're 
            here to support you every step of the way.
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* First 48 Hours */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-semibold text-gray-900">The First 48 Hours</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Those first two days are all about recovery, bonding, and getting to know your little one. 
                  It's completely normal to feel overwhelmed—you've just experienced one of life's most 
                  incredible events!
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">What's Happening Right Now:</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Your baby is adjusting to life outside the womb</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Skin-to-skin contact helps regulate temperature and breathing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Early feeding attempts establish important bonds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                      <span>Your baby's senses are actively developing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Newborn Behaviors */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Perfectly Normal Newborn Behaviors</h2>
              <p className="text-gray-700 mb-6">
                Many new parent worries stem from completely normal newborn behaviors. Here's what's typical:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Frequent Hiccups</h4>
                  <p className="text-gray-600 text-sm">Normal due to developing diaphragm. Usually harmless and will decrease over time.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Irregular Breathing</h4>
                  <p className="text-gray-600 text-sm">Brief pauses between breaths are normal. Breathing rates of 30-60 breaths per minute are typical.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Frequent Sneezing</h4>
                  <p className="text-gray-600 text-sm">Helps clear tiny nasal passages. Not usually a sign of illness unless accompanied by other symptoms.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Startle Reflexes</h4>
                  <p className="text-gray-600 text-sm">Sudden movements or "jumping" are protective reflexes. Perfectly normal and will fade by 3-4 months.</p>
                </div>
              </div>
            </section>

            {/* Bonding and Attachment */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <h2 className="text-2xl font-semibold text-gray-900">Bonding and Connection</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Bonding doesn't always happen instantly—and that's completely okay! Love grows through 
                  daily care, gentle touch, and shared moments. Every interaction is building your 
                  relationship.
                </p>
                
                <div className="bg-pink-50 rounded-lg p-4">
                  <h3 className="font-semibold text-pink-900 mb-3">Beautiful Bonding Moments:</h3>
                  <ul className="space-y-2 text-pink-800">
                    <li>• Skin-to-skin contact during feeding or cuddling</li>
                    <li>• Talking or singing to your baby (they love your voice!)</li>
                    <li>• Making eye contact during feeding and diaper changes</li>
                    <li>• Gentle massage during bath time or after feeding</li>
                    <li>• Reading or telling stories (it's never too early!)</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">When to Call Immediately</h3>
              </div>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>• Difficulty breathing or blue lips/face</li>
                <li>• Fever over 38°C (100.4°F) in babies under 3 months</li>
                <li>• Signs of dehydration (no wet diapers for 6+ hours)</li>
                <li>• Persistent vomiting or diarrhea</li>
                <li>• Extreme lethargy or difficulty waking</li>
                <li>• Seizures or unusual movements</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded">
                <p className="text-red-800 font-semibold">Emergency: 999</p>
                <p className="text-red-800 font-semibold">PHB Health Line: 111</p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Quick Daily Reminders</h3>
              <ul className="space-y-3 text-blue-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                  <span>Always place baby on their back to sleep</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                  <span>Support head and neck when holding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                  <span>Wash hands before handling baby</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                  <span>Count wet and dirty diapers daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-blue-600" />
                  <span>Take care of yourself too—you matter!</span>
                </li>
              </ul>
            </div>

            {/* Support Resources */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">You're Not Alone</h3>
              <div className="space-y-3 text-purple-700 text-sm">
                <a href="/live-well/mental-health" className="block hover:text-purple-900 underline">
                  New Parent Mental Health Support
                </a>
                <a href="/conditions/baby/feeding" className="block hover:text-purple-900 underline">
                  Feeding Guidance & Support
                </a>
                <a href="/using-the-phb" className="block hover:text-purple-900 underline">
                  PHB Family Health Services
                </a>
                <a href="/emergency-services" className="block hover:text-purple-900 underline">
                  24/7 Emergency Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-8 text-center">
          <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">You're Already a Wonderful Parent</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Every question, every concern, every moment of doubt—they all show how much you love your baby. 
            Trust yourself, be patient, and remember that parenting is a journey you'll learn together, 
            one beautiful day at a time.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. 
            Every baby is unique, and development varies. Always consult with your healthcare provider, pediatrician, or midwife 
            for personalized guidance about your baby's health and development. If you have concerns about your newborn's health, 
            contact your healthcare provider immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewbornPage;