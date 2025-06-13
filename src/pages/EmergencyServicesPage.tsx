import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface EmergencyService {
  id: string;
  title: string;
  type: 'medical' | 'mental' | 'crisis' | 'general';
  availability: '24/7' | 'business_hours' | 'limited';
  phone: string;
  description: string;
  icon: string;
  urgent: boolean;
}

interface EmergencyTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'preparation' | 'response' | 'first_aid';
}

const EmergencyServicesPage: React.FC = () => {
  // Emergency services data
  const [services] = useState<EmergencyService[]>([
    {
      id: 'ES001',
      title: 'Emergency Medical Services',
      type: 'medical',
      availability: '24/7',
      phone: '999',
      description: 'Life-threatening emergencies requiring immediate medical attention. Paramedics, ambulances, and emergency medical care.',
      icon: 'local_hospital',
      urgent: true
    },
    {
      id: 'ES002',
      title: 'Police Emergency Services',
      type: 'general',
      availability: '24/7',
      phone: '999',
      description: 'Crimes in progress, dangerous situations, threats to public safety, and urgent police matters.',
      icon: 'local_police',
      urgent: true
    },
    {
      id: 'ES003',
      title: 'Fire & Rescue Services',
      type: 'general',
      availability: '24/7',
      phone: '999',
      description: 'Fire emergencies, rescue operations, hazardous material incidents, and structural emergencies.',
      icon: 'local_fire_department',
      urgent: true
    },
    {
      id: 'ES004',
      title: 'PHB 111 Health Advice',
      type: 'medical',
      availability: '24/7',
      phone: '111',
      description: 'Non-emergency health advice, when you need medical help but it\'s not a life-threatening emergency.',
      icon: 'phone_in_talk',
      urgent: false
    },
    {
      id: 'ES005',
      title: 'Samaritans Crisis Support',
      type: 'mental',
      availability: '24/7',
      phone: '116 123',
      description: 'Confidential emotional support for people experiencing feelings of distress or despair.',
      icon: 'support_agent',
      urgent: false
    },
    {
      id: 'ES006',
      title: 'Childline',
      type: 'crisis',
      availability: '24/7',
      phone: '0800 1111',
      description: 'Free, private and confidential service for children and young people under 19.',
      icon: 'child_care',
      urgent: false
    },
    {
      id: 'ES007',
      title: 'Domestic Violence Helpline',
      type: 'crisis',
      availability: '24/7',
      phone: '0808 2000 247',
      description: 'National domestic abuse helpline providing support, advice and information to women.',
      icon: 'shield',
      urgent: false
    },
    {
      id: 'ES008',
      title: 'PHB Poison Information',
      type: 'medical',
      availability: '24/7',
      phone: '0344 892 0111',
      description: 'Advice for poisoning emergencies, overdoses, and exposure to harmful substances.',
      icon: 'warning',
      urgent: true
    },
    {
      id: 'ES009',
      title: 'Mind Mental Health',
      type: 'mental',
      availability: 'business_hours',
      phone: '0300 123 3393',
      description: 'Mental health support, advice and information services. Monday to Friday 9am-6pm.',
      icon: 'psychology',
      urgent: false
    },
    {
      id: 'ES010',
      title: 'RSPCA Animal Emergency',
      type: 'general',
      availability: '24/7',
      phone: '0300 1234 999',
      description: 'Report animal cruelty, rescue wildlife, and emergency veterinary advice.',
      icon: 'pets',
      urgent: false
    }
  ]);

  // Emergency tips data
  const [tips] = useState<EmergencyTip[]>([
    {
      id: 'ET001',
      title: 'Keep Emergency Numbers Handy',
      description: 'Save important emergency numbers in your phone and keep a written list at home.',
      icon: 'contact_phone',
      category: 'preparation'
    },
    {
      id: 'ET002',
      title: 'Learn Basic First Aid',
      description: 'Know CPR, how to treat bleeding, and basic first aid techniques that could save lives.',
      icon: 'healing',
      category: 'first_aid'
    },
    {
      id: 'ET003',
      title: 'Stay Calm During Emergencies',
      description: 'Take deep breaths, think clearly, and speak slowly when calling emergency services.',
      icon: 'self_improvement',
      category: 'response'
    },
    {
      id: 'ET004',
      title: 'Know Your Location',
      description: 'Always know your exact address or location to help emergency services find you quickly.',
      icon: 'location_on',
      category: 'response'
    },
    {
      id: 'ET005',
      title: 'Prepare an Emergency Kit',
      description: 'Keep essential items like water, food, medications, and flashlight in an emergency kit.',
      icon: 'inventory_2',
      category: 'preparation'
    },
    {
      id: 'ET006',
      title: 'Recovery Position',
      description: 'Learn how to place an unconscious but breathing person in the recovery position safely.',
      icon: 'accessibility',
      category: 'first_aid'
    }
  ]);

  // Filter states
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [tipFilter, setTipFilter] = useState<string>('all');

  // Filter services
  const filteredServices = services.filter(service => {
    return serviceFilter === 'all' || service.type === serviceFilter;
  });

  // Filter tips
  const filteredTips = tips.filter(tip => {
    return tipFilter === 'all' || tip.category === tipFilter;
  });

  // Helper for availability badge colors
  const getAvailabilityBadgeColor = (availability: EmergencyService['availability']) => {
    switch (availability) {
      case '24/7':
        return 'bg-green-100 text-green-800';
      case 'business_hours':
        return 'bg-blue-100 text-blue-800';
      case 'limited':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper for type badge colors
  const getTypeBadgeColor = (type: EmergencyService['type']) => {
    switch (type) {
      case 'medical':
        return 'bg-red-50 text-red-700';
      case 'mental':
        return 'bg-purple-50 text-purple-700';
      case 'crisis':
        return 'bg-orange-50 text-orange-700';
      case 'general':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <span className="material-icons text-4xl">emergency</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Emergency Services
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Get help when you need it most. Find emergency contact numbers and life-saving information.
            </p>
            
            {/* Emergency Numbers Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <span className="material-icons text-3xl mb-2 block">local_hospital</span>
                <h3 className="text-xl font-bold mb-1">999</h3>
                <p className="text-sm opacity-90">Medical Emergency</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <span className="material-icons text-3xl mb-2 block">local_police</span>
                <h3 className="text-xl font-bold mb-1">999</h3>
                <p className="text-sm opacity-90">Police Emergency</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <span className="material-icons text-3xl mb-2 block">phone_in_talk</span>
                <h3 className="text-xl font-bold mb-1">111</h3>
                <p className="text-sm opacity-90">PHB Health Advice</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Alert Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="material-icons text-yellow-600">info</span>
            </div>
            <div className="ml-3">
              <p className="text-yellow-800">
              <strong>When to call 999:</strong> Life-threatening emergencies only. For non-urgent health advice, call PHB 111.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Services Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Emergency Contact Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Save these important numbers to your phone. In an emergency, every second counts.
            </p>
          </div>

          {/* Service Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setServiceFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                serviceFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setServiceFilter('medical')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                serviceFilter === 'medical'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">local_hospital</span>
              Medical
            </button>
            <button
              onClick={() => setServiceFilter('mental')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                serviceFilter === 'mental'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">psychology</span>
              Mental Health
            </button>
            <button
              onClick={() => setServiceFilter('crisis')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                serviceFilter === 'crisis'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">shield</span>
              Crisis Support
            </button>
            <button
              onClick={() => setServiceFilter('general')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                serviceFilter === 'general'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">public</span>
              General
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className={`bg-white rounded-xl shadow-md overflow-hidden border-2 hover:shadow-lg transition-all duration-300 ${
                  service.urgent ? 'border-red-200 hover:border-red-400' : 'border-gray-200 hover:border-blue-400'
                }`}
              >
                {service.urgent && (
                  <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
                    <span className="material-icons text-sm mr-1 align-text-bottom">priority_high</span>
                    URGENT
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${getTypeBadgeColor(service.type)}`}>
                      <span className="material-icons text-2xl">{service.icon}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityBadgeColor(service.availability)}`}>
                      {service.availability === '24/7' ? '24/7 Available' : 
                       service.availability === 'business_hours' ? 'Business Hours' : 'Limited Hours'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-icons text-blue-600 mr-2">phone</span>
                      <span className="text-2xl font-bold text-blue-600">{service.phone}</span>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href={`tel:${service.phone.replace(/\s+/g, '')}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center transition-colors"
                      >
                        <span className="material-icons text-sm mr-1">call</span>
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Tips Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Emergency Preparedness Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Be prepared for emergencies with these essential tips and life-saving knowledge.
            </p>
          </div>

          {/* Tip Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setTipFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tipFilter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Tips
            </button>
            <button
              onClick={() => setTipFilter('preparation')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tipFilter === 'preparation'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">inventory_2</span>
              Preparation
            </button>
            <button
              onClick={() => setTipFilter('response')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tipFilter === 'response'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">emergency</span>
              Response
            </button>
            <button
              onClick={() => setTipFilter('first_aid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tipFilter === 'first_aid'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">healing</span>
              First Aid
            </button>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map(tip => (
              <div key={tip.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <span className="material-icons text-2xl text-green-600">{tip.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="bg-blue-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-blue-700">
              More ways to stay informed and prepared for emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/tools/health-assessments"
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-blue-200 hover:border-blue-400"
            >
              <span className="material-icons text-4xl text-blue-600 mb-3 block">health_and_safety</span>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Health Assessments</h3>
              <p className="text-blue-700 text-sm">Check your health status and identify potential risks.</p>
            </Link>

            <Link 
              to="/find-pharmacy"
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-blue-200 hover:border-blue-400"
            >
              <span className="material-icons text-4xl text-blue-600 mb-3 block">local_pharmacy</span>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Find Pharmacy</h3>
              <p className="text-blue-700 text-sm">Locate nearby pharmacies for emergency medications.</p>
            </Link>

            <Link 
              to="/mental-health"
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-blue-200 hover:border-blue-400"
            >
              <span className="material-icons text-4xl text-blue-600 mb-3 block">psychology</span>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Mental Health</h3>
              <p className="text-blue-700 text-sm">Resources for mental health support and crisis intervention.</p>
            </Link>

            <Link 
              to="/account/medical-records"
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-blue-200 hover:border-blue-400"
            >
              <span className="material-icons text-4xl text-blue-600 mb-3 block">folder_shared</span>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Medical Records</h3>
              <p className="text-blue-700 text-sm">Access your medical history for emergency situations.</p>
            </Link>
          </div>
        </section>

        {/* Important Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mt-12 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="material-icons text-red-600 text-2xl">warning</span>
            </div>
            <div className="ml-4">
              <h3 className="text-red-800 font-bold text-lg mb-2">Important Emergency Information</h3>
              <div className="text-red-700 space-y-2">
                <p><strong>Call 999 immediately for:</strong> Severe injuries, chest pain, difficulty breathing, unconsciousness, severe bleeding, suspected stroke, or any life-threatening situation.</p>
                <p><strong>Call 111 for:</strong> Non-urgent health concerns, when you need PHB medical advice but it's not an emergency.</p>
                <p><strong>Do not call 999 for:</strong> Minor cuts, colds, repeat prescriptions, or conditions that can wait for a GP appointment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServicesPage;