import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Heart, Phone, MessageCircle, Users, Clock, AlertTriangle, Sun, Moon, Baby, HandHeart } from 'lucide-react';

const NewParentMentalHealthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Mental Health', url: '/mental-health' },
              { label: 'New Parent Support', url: '/mental-health/new-parents' }
            ]}
            textColor="text-white"
          />
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <Heart className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">New Parent Mental Health</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl">
              Becoming a parent is life-changing. It's normal to feel overwhelmed, anxious, or sad.
              Support is available, and you're not alone.
            </p>
          </div>
        </div>
      </div>

      <div className="phb-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reassurance Section */}
            <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">You're Doing Better Than You Think</h2>
              <p className="text-purple-800 text-lg mb-4">
                Up to 1 in 5 new mothers and 1 in 10 new fathers experience mental health challenges during
                pregnancy or the first year after birth. This is incredibly common, and with the right support,
                most people recover fully.
              </p>
              <p className="text-purple-700">
                Asking for help is a sign of strength, not weakness. It shows you care about your wellbeing
                and your ability to care for your baby.
              </p>
            </section>

            {/* Baby Blues vs Postnatal Depression */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Your Feelings</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Sun className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800 text-lg">Baby Blues</h3>
                  </div>
                  <p className="text-blue-700 mb-4">Very common in the first 2 weeks after birth</p>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Mood swings and tearfulness</li>
                    <li>• Feeling overwhelmed</li>
                    <li>• Anxiety about the baby</li>
                    <li>• Difficulty sleeping</li>
                    <li>• Irritability</li>
                  </ul>
                  <p className="mt-4 text-sm text-blue-600 font-medium">
                    Usually passes within 2 weeks without treatment
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Moon className="h-6 w-6 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800 text-lg">Postnatal Depression</h3>
                  </div>
                  <p className="text-purple-700 mb-4">Can develop anytime in the first year</p>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>• Persistent low mood lasting more than 2 weeks</li>
                    <li>• Loss of interest in things you enjoyed</li>
                    <li>• Difficulty bonding with your baby</li>
                    <li>• Withdrawing from others</li>
                    <li>• Frightening thoughts</li>
                  </ul>
                  <p className="mt-4 text-sm text-purple-600 font-medium">
                    Treatable with support, therapy, or medication
                  </p>
                </div>
              </div>
            </section>

            {/* Other Conditions */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Perinatal Mental Health Conditions</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Postnatal Anxiety</h3>
                  <p className="text-gray-700">
                    Excessive worry about your baby's health, safety, or your ability to care for them.
                    May include panic attacks, racing thoughts, or avoiding certain situations.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Postnatal OCD</h3>
                  <p className="text-gray-700">
                    Intrusive, unwanted thoughts (often about harm coming to your baby) and repetitive
                    behaviours to reduce anxiety. These thoughts don't reflect who you are.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Postpartum Psychosis</h3>
                  <p className="text-gray-700">
                    Rare but serious (affects 1-2 in 1,000 births). Symptoms include hallucinations,
                    delusions, mania, or confusion. This is a medical emergency—seek immediate help.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Birth Trauma / PTSD</h3>
                  <p className="text-gray-700">
                    Distressing memories, flashbacks, or nightmares about the birth. May avoid talking
                    about the birth or feel detached from your baby.
                  </p>
                </div>
              </div>
            </section>

            {/* For Partners */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                Partners Need Support Too
              </h2>
              <p className="text-gray-700 mb-4">
                Partners can also experience depression, anxiety, and stress during and after pregnancy.
                Research shows 1 in 10 new fathers experience postnatal depression.
              </p>
              <div className="bg-blue-50 p-5 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Signs to watch for:</h3>
                <ul className="grid md:grid-cols-2 gap-2 text-blue-700">
                  <li>• Increased irritability or anger</li>
                  <li>• Working longer hours to avoid home</li>
                  <li>• Feeling disconnected from partner or baby</li>
                  <li>• Changes in sleep or appetite</li>
                  <li>• Loss of interest in activities</li>
                  <li>• Increased alcohol use</li>
                </ul>
              </div>
            </section>

            {/* Self-Care Tips */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HandHeart className="h-6 w-6 text-pink-500 mr-3" />
                Taking Care of Yourself
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Daily Wellbeing</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Sleep when your baby sleeps
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Accept help from family and friends
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Get outside for fresh air daily
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Eat regular, nutritious meals
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Stay connected with loved ones
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Managing Difficult Moments</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      It's okay to put baby down safely and take a breather
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Practice deep breathing exercises
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Talk to someone you trust
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Don't compare yourself to others
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Remember: "good enough" is good enough
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Treatment Options */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatment & Support Options</h2>

              <div className="space-y-4">
                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Talking Therapies</h3>
                  <p className="text-green-700">
                    Cognitive Behavioural Therapy (CBT), counselling, and other talking therapies can be
                    very effective. Many are available through the PHB and can often be done remotely.
                  </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Medication</h3>
                  <p className="text-blue-700">
                    Antidepressants can help and many are safe to use while breastfeeding. Your GP or
                    perinatal mental health team can advise on the best options for you.
                  </p>
                </div>

                <div className="bg-purple-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Peer Support Groups</h3>
                  <p className="text-purple-700">
                    Connecting with other parents who understand what you're going through can be
                    incredibly helpful. Ask your health visitor about local groups.
                  </p>
                </div>

                <div className="bg-amber-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-amber-800 mb-2">Specialist Perinatal Services</h3>
                  <p className="text-amber-700">
                    For more complex needs, specialist perinatal mental health teams provide expert care
                    for parents during pregnancy and the first year after birth.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Urgent Help
              </h3>
              <p className="text-red-700 mb-4 text-sm">
                If you have thoughts of harming yourself or your baby, or are experiencing psychosis:
              </p>
              <p className="text-2xl font-bold text-red-800 mb-2">Call 999</p>
              <p className="text-sm text-red-600 mb-4">or go to A&E immediately</p>
              <div className="border-t border-red-200 pt-4">
                <p className="text-red-700 text-sm">
                  <strong>Samaritans:</strong> 116 123 (24/7)
                </p>
              </div>
            </div>

            {/* Talk to Someone */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Talk to Someone
              </h3>
              <ul className="space-y-3 text-purple-700">
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Health Visitor</strong>
                    <p className="text-sm">Your first point of contact</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>GP Surgery</strong>
                    <p className="text-sm">Book an appointment</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <strong>PHB 111</strong>
                    <p className="text-sm">24/7 health advice</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Assessment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How Are You Feeling?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Take a quick wellbeing assessment to help understand how you're doing.
              </p>
              <Link
                to="/tools/health-assessments/mental-wellbeing"
                className="block w-full text-center py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Take Assessment
              </Link>
            </div>

            {/* Baby Resources */}
            <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
              <h3 className="text-lg font-semibold text-pink-800 mb-4 flex items-center">
                <Baby className="h-5 w-5 mr-2" />
                Baby Care Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/conditions/baby/newborn" className="text-pink-700 hover:underline text-sm">
                    Newborn Care Guide
                  </Link>
                </li>
                <li>
                  <Link to="/conditions/baby/feeding" className="text-pink-700 hover:underline text-sm">
                    Feeding Support
                  </Link>
                </li>
                <li>
                  <Link to="/conditions/baby/crying" className="text-pink-700 hover:underline text-sm">
                    Understanding Crying
                  </Link>
                </li>
                <li>
                  <Link to="/conditions/baby/sleep" className="text-pink-700 hover:underline text-sm">
                    Baby Sleep
                  </Link>
                </li>
              </ul>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/mental-health/depression" className="text-blue-600 hover:underline">
                    Depression
                  </Link>
                </li>
                <li>
                  <Link to="/mental-health/anxiety" className="text-blue-600 hover:underline">
                    Anxiety
                  </Link>
                </li>
                <li>
                  <Link to="/services/talking-therapies" className="text-blue-600 hover:underline">
                    Talking Therapies
                  </Link>
                </li>
                <li>
                  <Link to="/using-the-phb/family-health" className="text-blue-600 hover:underline">
                    Family Health Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Reassurance */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
              <Heart className="h-8 w-8 text-pink-500 mb-3" />
              <p className="text-purple-800 font-medium">
                "The fact that you're seeking help shows what a caring parent you are."
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for general guidance only. If you're
            concerned about your mental health, please speak to your health visitor, GP, or midwife.
            They can provide personalized support and refer you to specialist services if needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewParentMentalHealthPage;
