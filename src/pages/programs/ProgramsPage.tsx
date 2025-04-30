import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ProgramsPage: React.FC = () => {
  const programs = [
    {
      title: 'Student Recruitment',
      description: 'Empowering final year students to join PHB\'s mission in improving public health in Nigeria.',
      href: '/programs/student-recruitment',
      imageSrc: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
      status: 'Coming Soon',
    },
    {
      title: 'Research Opportunities',
      description: 'Funding and support for innovative public health research initiatives in Nigeria.',
      href: '/programs/research',
      imageSrc: 'https://images.unsplash.com/photo-1581093458791-9f22b6d3161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
      status: 'Coming Soon',
    },
    {
      title: 'Mentorship Program',
      description: 'Professional development and guidance for emerging public health leaders.',
      href: '/programs/mentorship',
      imageSrc: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
      status: 'Coming Soon',
    },
    {
      title: 'University Partnerships',
      description: 'Collaborative initiatives between PHB and academic institutions across Nigeria.',
      href: '/programs/partnerships',
      imageSrc: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
      status: 'Coming Soon',
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">PHB Programs and Recruitment</h1>
          <p className="text-xl font-medium">
            Discover opportunities to join and collaborate with Nigeria's Public Health Bureau
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Programs', href: '/programs' },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="phb-container py-8">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-[#005eb8] mb-4">About Our Programs</h2>
          <p className="mb-4">
            The Public Health Bureau (PHB) is committed to developing the next generation of public health professionals
            in Nigeria. Through our various programs, we aim to bridge the gap between academic training and
            professional practice, foster innovation in public health research, and strengthen partnerships with
            universities and other institutions.
          </p>
          <p>
            Explore our current and upcoming programs below to find opportunities for students, researchers,
            healthcare professionals, and institutions to collaborate with PHB in improving public health outcomes
            across Nigeria.
          </p>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200"
            >
              {program.imageSrc && (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={program.imageSrc}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {program.status && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {program.status}
                    </div>
                  )}
                </div>
              )}
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-[#005eb8] mb-2">
                  <Link to={program.href} className="hover:underline">
                    {program.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">{program.description}</p>
                <Link
                  to={program.href}
                  className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] inline-block w-full text-center mt-auto"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Stay Informed</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Sign up to receive updates on new programs, application deadlines, and other opportunities from the
            Public Health Bureau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md border border-gray-300 flex-grow"
            />
            <button className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-[#003f7e] transition-colors font-medium whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Contact Us</h2>
          <p className="mb-6">
            For more information about any of our programs or to discuss potential partnerships, please contact our
            Programs and Recruitment team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">General Inquiries</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>programs@phb.gov.ng</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+234 (0) 123 456 7890</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Office Hours</h3>
              <p>Monday to Friday: 9am - 5pm</p>
              <p>Saturday and Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
