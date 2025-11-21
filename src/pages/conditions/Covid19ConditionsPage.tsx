import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { AlertTriangle, Activity, ThermometerSun, Clock, Phone, Heart, Shield, ChevronDown, ChevronUp, Stethoscope, Home, Users } from 'lucide-react';

const Covid19ConditionsPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-12">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Conditions', url: '/conditions' },
              { label: 'COVID-19', url: '/conditions/covid-19' }
            ]}
            textColor="text-white"
          />
          <div className="mt-6">
            <h1 className="text-4xl font-bold mb-4">COVID-19 (Coronavirus)</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Information about COVID-19 symptoms, treatment, when to seek help, and how to protect yourself and others.
            </p>
          </div>
        </div>
      </div>

      <div className="phb-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What is COVID-19 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is COVID-19?</h2>
              <p className="text-gray-700 mb-4">
                COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus. It spreads mainly through
                respiratory droplets when an infected person coughs, sneezes, talks, or breathes. The illness
                can range from mild to severe, and some people may have no symptoms at all.
              </p>
              <p className="text-gray-700">
                While most people recover without needing hospital treatment, COVID-19 can cause serious illness,
                particularly in older adults and people with underlying health conditions.
              </p>
            </section>

            {/* Symptoms */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ThermometerSun className="h-6 w-6 text-red-500 mr-3" />
                Symptoms of COVID-19
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Common Symptoms</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      High temperature or fever
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      New, continuous cough
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Loss or change to sense of smell or taste
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Fatigue and tiredness
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Body aches and pains
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Other Symptoms</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Sore throat
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Headache
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Runny or blocked nose
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Diarrhoea or nausea
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Shortness of breath
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> Symptoms usually appear 2-14 days after exposure. Some people may have
                  very mild symptoms or none at all but can still spread the virus.
                </p>
              </div>
            </section>

            {/* When to Seek Help */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                When to Seek Medical Help
              </h2>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-6">
                <h3 className="font-bold text-red-800 mb-3">Call 999 immediately if you have:</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Severe difficulty breathing</li>
                  <li>• Persistent chest pain or pressure</li>
                  <li>• Confusion or difficulty staying awake</li>
                  <li>• Pale, gray, or blue-colored skin, lips, or nail beds</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3">Contact your GP or call 111 if:</h3>
                <ul className="space-y-2 text-amber-700">
                  <li>• Your symptoms are getting worse</li>
                  <li>• You have a high fever that doesn't improve with paracetamol</li>
                  <li>• You feel very unwell or are concerned</li>
                  <li>• You're in a high-risk group and have symptoms</li>
                </ul>
              </div>
            </section>

            {/* Treatment */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Stethoscope className="h-6 w-6 text-blue-500 mr-3" />
                Treatment and Self-Care
              </h2>

              <div className="space-y-4">
                <div
                  className="border border-gray-200 rounded-lg"
                  onClick={() => toggleSection('home-care')}
                >
                  <button className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50">
                    <span className="font-semibold text-gray-900 flex items-center">
                      <Home className="h-5 w-5 mr-2 text-blue-500" />
                      Self-care at home
                    </span>
                    {expandedSection === 'home-care' ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'home-care' && (
                    <div className="px-5 pb-4 text-gray-700">
                      <ul className="space-y-2">
                        <li>• <strong>Rest:</strong> Get plenty of rest to help your body fight the infection</li>
                        <li>• <strong>Stay hydrated:</strong> Drink plenty of water, juice, or warm liquids</li>
                        <li>• <strong>Pain relief:</strong> Use paracetamol or ibuprofen for fever and aches</li>
                        <li>• <strong>Monitor symptoms:</strong> Track your temperature and oxygen levels if possible</li>
                        <li>• <strong>Sleep position:</strong> Try sleeping on your side or front to ease breathing</li>
                        <li>• <strong>Honey for cough:</strong> Warm water with honey can help soothe a cough (not for children under 1)</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div
                  className="border border-gray-200 rounded-lg"
                  onClick={() => toggleSection('medical-treatment')}
                >
                  <button className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50">
                    <span className="font-semibold text-gray-900 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-500" />
                      Medical treatments
                    </span>
                    {expandedSection === 'medical-treatment' ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'medical-treatment' && (
                    <div className="px-5 pb-4 text-gray-700">
                      <p className="mb-3">For severe cases or high-risk individuals, treatments may include:</p>
                      <ul className="space-y-2">
                        <li>• <strong>Antiviral medications:</strong> Paxlovid or other antivirals for eligible patients</li>
                        <li>• <strong>Monoclonal antibodies:</strong> For immunocompromised patients</li>
                        <li>• <strong>Oxygen therapy:</strong> If oxygen levels are low</li>
                        <li>• <strong>Steroids:</strong> Dexamethasone for severe respiratory symptoms</li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-500">
                        Contact your healthcare provider to discuss if you're eligible for these treatments.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Long COVID */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="h-6 w-6 text-purple-500 mr-3" />
                Long COVID
              </h2>
              <p className="text-gray-700 mb-4">
                Some people experience symptoms that last weeks or months after the initial infection.
                This is sometimes called "long COVID" or "post-COVID syndrome."
              </p>

              <div className="bg-purple-50 p-5 rounded-lg mb-4">
                <h3 className="font-semibold text-purple-800 mb-3">Common Long COVID Symptoms</h3>
                <ul className="grid md:grid-cols-2 gap-2 text-purple-700">
                  <li>• Fatigue</li>
                  <li>• Shortness of breath</li>
                  <li>• Difficulty concentrating ("brain fog")</li>
                  <li>• Joint or muscle pain</li>
                  <li>• Headaches</li>
                  <li>• Heart palpitations</li>
                  <li>• Sleep problems</li>
                  <li>• Anxiety or depression</li>
                </ul>
              </div>

              <p className="text-gray-700">
                If you're experiencing ongoing symptoms after COVID-19, speak to your GP. Support is available
                through PHB post-COVID services.
              </p>
            </section>

            {/* Prevention */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-green-500 mr-3" />
                Prevention
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Get Vaccinated</h3>
                      <p className="text-sm text-gray-600">Vaccines significantly reduce the risk of severe illness</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Good Ventilation</h3>
                      <p className="text-sm text-gray-600">Open windows and doors in indoor spaces</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-full p-2 mr-3 flex-shrink-0">
                      <Home className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Stay Home When Ill</h3>
                      <p className="text-sm text-gray-600">Avoid contact with others if you have symptoms</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 rounded-full p-2 mr-3 flex-shrink-0">
                      <Heart className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Hand Hygiene</h3>
                      <p className="text-sm text-gray-600">Wash hands regularly with soap and water</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/vaccinations/covid-19-vaccine"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Learn about COVID-19 Vaccines
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency
              </h3>
              <p className="text-red-700 mb-3">
                Severe breathing difficulty or emergency symptoms:
              </p>
              <p className="text-3xl font-bold text-red-800 mb-2">999</p>
              <p className="text-sm text-red-600">Available 24/7</p>
            </div>

            {/* Non-Emergency */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Non-Emergency Advice</h3>
              <p className="text-blue-700 mb-2">
                PHB Health Helpline:
              </p>
              <p className="text-2xl font-bold text-blue-800 mb-2">111</p>
              <p className="text-sm text-blue-600">24 hours a day, 7 days a week</p>
            </div>

            {/* At Risk Groups */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Higher Risk Groups</h3>
              <p className="text-sm text-gray-600 mb-3">People at higher risk of severe illness:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Adults 65 and older</li>
                <li>• People with weakened immune systems</li>
                <li>• Those with chronic conditions (diabetes, heart disease, lung disease)</li>
                <li>• Pregnant women</li>
                <li>• People with obesity</li>
              </ul>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/vaccinations/covid-19-vaccine" className="text-blue-600 hover:underline">
                    COVID-19 Vaccination
                  </Link>
                </li>
                <li>
                  <Link to="/mental-health" className="text-blue-600 hover:underline">
                    Mental Health Support
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/mental-wellbeing" className="text-blue-600 hover:underline">
                    Managing Anxiety
                  </Link>
                </li>
                <li>
                  <Link to="/emergency-services" className="text-blue-600 hover:underline">
                    Emergency Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Last Updated */}
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">
                Last reviewed: November 2024
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for general guidance only and should not
            replace professional medical advice. If you have concerns about COVID-19 symptoms or exposure,
            contact your healthcare provider or call 111 for advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Covid19ConditionsPage;
