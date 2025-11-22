import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceType {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
}

const services: ServiceType[] = [
  {
    title: 'Mental Health Support',
    description: 'Talk to someone who can help. Get immediate mental health support 24/7 from trained counselors.',
    href: '/services/mental-health-support',
    imageSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Talking Therapies',
    description: 'Access therapy and counseling services to help with depression, anxiety, stress, and other mental health concerns.',
    href: '/services/talking-therapies',
    imageSrc: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Book Appointment',
    description: 'Schedule appointments with doctors, specialists, and healthcare professionals at your convenience.',
    href: '/account/appointments/book',
    imageSrc: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Request Prescription',
    description: 'Request repeat prescriptions online and have them sent to your nominated pharmacy.',
    href: '/account/prescriptions/request',
    imageSrc: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Health Records',
    description: 'Access your medical records, test results, and health history securely online.',
    href: '/account/health-records',
    imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Find Services',
    description: 'Find hospitals, clinics, pharmacies, and other healthcare services near you.',
    href: '/find-services',
    imageSrc: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">PHB Services</h1>
          <p className="text-xl font-medium">
            Find the healthcare services you need, when you need them
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
              {service.imageSrc && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-[#0891b2] mb-2">
                  <Link to={service.href} className="hover:underline">
                    {service.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                <Link
                  to={service.href}
                  className="text-[#0891b2] font-medium hover:underline flex items-center mt-auto"
                >
                  Access service
                  <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Services */}
      <div className="bg-red-50 py-8">
        <div className="phb-container">
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Emergency Services
            </h2>
            <p className="text-gray-700 mb-4">
              If you need urgent medical help or are in a life-threatening situation:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded">
                <h3 className="font-bold mb-2">Call Emergency Services</h3>
                <p className="text-sm text-gray-700 mb-3">For immediate life-threatening emergencies</p>
                <a
                  href="tel:112"
                  className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-center font-bold"
                >
                  Call 112
                </a>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <h3 className="font-bold mb-2">Mental Health Crisis</h3>
                <p className="text-sm text-gray-700 mb-3">24/7 mental health support line</p>
                <a
                  href="tel:0800-742-4357"
                  className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-center font-bold"
                >
                  Call 0800-PHB-HELP
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="phb-container py-8">
        <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#e8edee] rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-[#0891b2] mb-3">Book GP Appointment</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              See a doctor quickly for general health concerns, check-ups, and medical advice.
            </p>
            <Link
              to="/account/appointments/book"
              className="text-[#0891b2] font-medium hover:underline"
            >
              Book now
            </Link>
          </div>
          <div className="bg-[#e8edee] rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-[#0891b2] mb-3">Repeat Prescription</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Order your regular medication online and collect from your nominated pharmacy.
            </p>
            <Link
              to="/account/prescriptions/request"
              className="text-[#0891b2] font-medium hover:underline"
            >
              Request prescription
            </Link>
          </div>
          <div className="bg-[#e8edee] rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-[#0891b2] mb-3">Wellbeing Check</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Check your mental and physical wellbeing with our free health assessments.
            </p>
            <Link
              to="/tools/mental-wellbeing-assessment"
              className="text-[#0891b2] font-medium hover:underline"
            >
              Take check
            </Link>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-100 py-8">
        <div className="phb-container">
          <h2 className="text-2xl font-bold mb-6">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3">Find Your PHB Number</h3>
              <p className="text-gray-600 mb-4">
                Your PHB number is a unique 10-digit number that gives you access to PHB services.
              </p>
              <Link
                to="/help/find-phb-number"
                className="text-[#0891b2] font-medium hover:underline flex items-center"
              >
                Find your number
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3">Contact Support</h3>
              <p className="text-gray-600 mb-4">
                Get help with PHB services, technical issues, or general inquiries.
              </p>
              <Link
                to="/account/contact-support"
                className="text-[#0891b2] font-medium hover:underline flex items-center"
              >
                Contact us
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
