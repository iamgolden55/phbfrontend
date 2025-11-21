import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Heart, Baby, Users, Calendar, Phone, Stethoscope, Shield, BookOpen, Clock, CheckCircle, MapPin } from 'lucide-react';

const PHBFamilyHealthPage: React.FC = () => {
  const familyServices = [
    {
      icon: Baby,
      title: "Maternity Services",
      description: "Antenatal care, birth options, and postnatal support for you and your baby",
      link: "/pregnancy",
      color: "pink"
    },
    {
      icon: Heart,
      title: "Child Health Services",
      description: "Vaccinations, developmental checks, and health visitor support",
      link: "/conditions/baby",
      color: "red"
    },
    {
      icon: Stethoscope,
      title: "GP Services",
      description: "Register with a GP, book appointments, and access primary care",
      link: "/phb-services",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Vaccinations",
      description: "Immunisation schedules for children and adults",
      link: "/vaccinations",
      color: "green"
    },
    {
      icon: BookOpen,
      title: "Mental Health Support",
      description: "Support for parents, children, and family mental wellbeing",
      link: "/mental-health/new-parents",
      color: "purple"
    },
    {
      icon: Users,
      title: "Family Planning",
      description: "Contraception advice and sexual health services",
      link: "/contraception",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Using the PHB', url: '/using-the-phb' },
              { label: 'Family Health Services', url: '/using-the-phb/family-health' }
            ]}
            textColor="text-white"
          />
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <Users className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">PHB Family Health Services</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Comprehensive health services for every stage of family life, from pregnancy to
              childhood and beyond.
            </p>
          </div>
        </div>
      </div>

      <div className="phb-container py-12">
        {/* Services Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Family Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyServices.map((service, index) => {
              const colors = getColorClasses(service.color);
              return (
                <Link
                  key={index}
                  to={service.link}
                  className={`${colors.bg} border ${colors.border} rounded-lg p-6 hover:shadow-md transition-shadow`}
                >
                  <service.icon className={`h-8 w-8 ${colors.text} mb-4`} />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Life Stages */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Support at Every Stage</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Planning a Family</h3>
                  <p className="text-gray-700 mb-3">
                    Pre-conception advice, fertility support, and general health check-ups to prepare for pregnancy.
                  </p>
                  <Link to="/pregnancy/planning" className="text-pink-600 hover:underline text-sm font-medium">
                    Learn more about planning pregnancy →
                  </Link>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Pregnancy</h3>
                  <p className="text-gray-700 mb-3">
                    Antenatal appointments, scans, tests, and support throughout your pregnancy journey.
                  </p>
                  <Link to="/pregnancy" className="text-purple-600 hover:underline text-sm font-medium">
                    Explore pregnancy services →
                  </Link>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Birth & Postnatal</h3>
                  <p className="text-gray-700 mb-3">
                    Birth options, postnatal care, health visitor support, and newborn checks.
                  </p>
                  <Link to="/pregnancy/after-birth" className="text-blue-600 hover:underline text-sm font-medium">
                    After birth support →
                  </Link>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Early Years (0-5)</h3>
                  <p className="text-gray-700 mb-3">
                    Development reviews, vaccinations, feeding support, and health visitor contacts.
                  </p>
                  <Link to="/conditions/baby" className="text-green-600 hover:underline text-sm font-medium">
                    Baby and child health →
                  </Link>
                </div>

                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">School Age Children</h3>
                  <p className="text-gray-700 mb-3">
                    School health services, vaccinations, and support for learning and development.
                  </p>
                  <Link to="/vaccinations/children" className="text-amber-600 hover:underline text-sm font-medium">
                    Children's vaccinations →
                  </Link>
                </div>
              </div>
            </section>

            {/* Health Visitor Service */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="h-6 w-6 text-red-500 mr-3" />
                Health Visitor Service
              </h2>
              <p className="text-gray-700 mb-6">
                Health visitors are qualified nurses or midwives with additional training in child health
                and development. They provide support from late pregnancy until your child starts school.
              </p>

              <div className="bg-red-50 p-5 rounded-lg mb-6">
                <h3 className="font-semibold text-red-800 mb-3">Health Visitor Contacts</h3>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Antenatal contact (28+ weeks pregnant)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    New birth visit (10-14 days)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    6-8 week review
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    1 year review
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    2-2½ year review
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 text-sm">
                You can contact your health visitor at any time between scheduled visits if you have concerns.
              </p>
            </section>

            {/* Registering with Services */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">Register with a GP</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Your GP is your first point of contact for most health concerns. Find and register
                    with a local practice.
                  </p>
                  <Link to="/find-services" className="text-blue-600 hover:underline text-sm font-medium">
                    Find a GP near you →
                  </Link>
                </div>

                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Book Appointments</h3>
                  <p className="text-green-700 text-sm mb-3">
                    Once registered, you can book appointments online, by phone, or through the PHB app.
                  </p>
                  <Link to="/help/appointments/how-to-book" className="text-green-600 hover:underline text-sm font-medium">
                    How to book →
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency
              </h3>
              <p className="text-red-700 mb-2">Life-threatening emergency:</p>
              <p className="text-2xl font-bold text-red-800 mb-4">999</p>
              <p className="text-red-700 mb-2">Non-emergency health advice:</p>
              <p className="text-xl font-bold text-red-800">111</p>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/account/appointments/book" className="text-blue-600 hover:underline flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book an appointment
                  </Link>
                </li>
                <li>
                  <Link to="/find-pharmacy" className="text-blue-600 hover:underline flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find a pharmacy
                  </Link>
                </li>
                <li>
                  <Link to="/account/prescriptions" className="text-blue-600 hover:underline flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Order prescriptions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Useful Numbers */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Useful Numbers</h3>
              <ul className="space-y-3 text-blue-700 text-sm">
                <li>
                  <strong>PHB Health Helpline:</strong> 111
                </li>
                <li>
                  <strong>Pregnancy Helpline:</strong> 0800 XXX XXXX
                </li>
                <li>
                  <strong>Breastfeeding Helpline:</strong> 0300 XXX XXXX
                </li>
                <li>
                  <strong>NSPCC Helpline:</strong> 0808 800 5000
                </li>
              </ul>
            </div>

            {/* Parent Resources */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Parent Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/conditions/baby/newborn" className="text-purple-700 hover:underline text-sm">
                    Newborn Care Guide
                  </Link>
                </li>
                <li>
                  <Link to="/conditions/baby/feeding" className="text-purple-700 hover:underline text-sm">
                    Feeding Your Baby
                  </Link>
                </li>
                <li>
                  <Link to="/mental-health/new-parents" className="text-purple-700 hover:underline text-sm">
                    Parent Mental Health
                  </Link>
                </li>
                <li>
                  <Link to="/conditions/baby/safety" className="text-purple-700 hover:underline text-sm">
                    Baby Safety
                  </Link>
                </li>
              </ul>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/emergency-services" className="text-blue-600 hover:underline">
                    Emergency Services
                  </Link>
                </li>
                <li>
                  <Link to="/services/mental-health-support" className="text-blue-600 hover:underline">
                    Mental Health Support
                  </Link>
                </li>
                <li>
                  <Link to="/care-and-support" className="text-blue-600 hover:underline">
                    Care and Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHBFamilyHealthPage;
