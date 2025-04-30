import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const UniversityPartnershipsPage: React.FC = () => {
  const partnershipAreas = [
    {
      title: 'Curriculum Development',
      description: 'Collaborating with universities to enhance public health education curricula with current industry insights and needs.',
      icon: (
        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Joint Research Projects',
      description: 'Funding and supporting collaborative research initiatives addressing critical public health challenges in Nigeria.',
      icon: (
        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Staff Exchange Programs',
      description: 'Facilitating knowledge exchange between academic institutions and PHB through temporary staff placements.',
      icon: (
        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: 'Student Internships',
      description: 'Providing structured internship opportunities for students to gain practical experience in public health.',
      icon: (
        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Professional Development',
      description: 'Offering specialized training and workshops for faculty members to enhance their knowledge and skills.',
      icon: (
        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Resource Sharing',
      description: 'Providing access to PHB data, facilities, and expertise to enhance academic research and teaching.',
      icon: (
        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      )
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">University Partnerships</h1>
          <p className="text-xl font-medium">
            Collaborative initiatives between PHB and academic institutions across Nigeria
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
              { label: 'University Partnerships', href: '/programs/partnerships' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">About Our University Partnerships</h2>
              <p className="mb-4">
                The PHB University Partnerships program fosters collaboration between PHB and academic institutions
                throughout Nigeria. These strategic partnerships aim to strengthen public health education, research,
                and practice by bringing together the expertise and resources of both sectors.
              </p>
              <p className="mb-4">
                Through these partnerships, we work to develop Nigeria's public health workforce, enhance the
                relevance and quality of public health education, and collaborate on research that addresses
                pressing health challenges.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="mb-4">
                  To create a dynamic ecosystem where academic institutions and the public health sector work together
                  to advance knowledge, improve practice, and develop professionals who will strengthen Nigeria's
                  health systems.
                </p>
                <h3 className="text-xl font-semibold mb-3">Partnership Goals</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enhance public health education and curriculum development</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Establish collaborative research initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create practical learning opportunities for students</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Promote knowledge exchange between academia and practice</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Build capacity among faculty and PHB staff</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Partnership Areas</h2>
              <p className="mb-6">
                Our university partnerships encompass various collaborative initiatives across the following areas:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partnershipAreas.map((area, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start">
                      <div className="mr-4">{area.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
                        <p className="text-gray-600">{area.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Benefits for Universities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Enhanced Curriculum</h3>
                  <p>
                    Access to real-world insights and expertise to ensure public health curricula remain current,
                    relevant, and aligned with industry needs.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Research Opportunities</h3>
                  <p>
                    Access to funding, data, and collaborative opportunities for research projects addressing
                    important public health challenges.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Student Opportunities</h3>
                  <p>
                    Expanded opportunities for students to gain practical experience through internships,
                    projects, and the PHB Student Recruitment Program.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Faculty Development</h3>
                  <p>
                    Professional development opportunities for faculty members to enhance their knowledge and skills
                    in public health practice.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Partnership Process</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Initial Inquiry</h3>
                    <p>
                      Universities express interest in partnering with PHB by submitting an initial inquiry form
                      outlining potential areas of collaboration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Exploration Meeting</h3>
                    <p>
                      PHB and university representatives meet to discuss partnership objectives, potential initiatives,
                      and mutual benefits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Partnership Agreement</h3>
                    <p>
                      Development and signing of a Memorandum of Understanding (MOU) outlining the partnership scope,
                      objectives, and commitments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Initiative Development</h3>
                    <p>
                      Collaborative development of specific programs and initiatives based on the partnership focus areas
                      and mutual priorities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Implementation and Evaluation</h3>
                    <p>
                      Execution of partnership initiatives with regular monitoring, evaluation, and adjustment to ensure
                      achievement of goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h2 className="text-xl font-bold text-[#005eb8] mb-2">Coming Soon</h2>
              <p className="mb-4">
                The PHB University Partnerships Program is currently under development and will be launching soon.
                Interested universities can register below to receive updates when the program opens for applications.
              </p>
              <div className="flex justify-center mt-4">
                <button className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-[#003f7e] transition-colors font-medium">
                  Register Interest
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Eligibility */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Eligibility Criteria</h3>
              <p className="mb-3">Partnerships are open to:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Accredited Nigerian universities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Institutions offering public health or related programs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Institutions with demonstrated commitment to public health education and research</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Institutions with capacity to implement and sustain partnership initiatives</span>
                </li>
              </ul>
            </div>

            {/* Featured Program */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Student Recruitment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">Student Recruitment Program</h3>
                <p className="text-gray-600 mb-4">
                  A key benefit for partner universities is participation in our Student Recruitment Program, where final year
                  students can be nominated for mentorship and potential career opportunities with PHB.
                </p>
                <Link to="/programs/student-recruitment" className="text-[#005eb8] font-medium hover:underline">
                  Learn more
                </Link>
              </div>
            </div>

            {/* Related Programs */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">Related Programs</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/programs/student-recruitment" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Student Recruitment
                    </Link>
                  </li>
                  <li>
                    <Link to="/programs/research" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Research Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/programs/mentorship" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Mentorship Program
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <p className="mb-4">For more information about university partnerships:</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>partnerships@phb.gov.ng</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+234 (0) 123 456 7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityPartnershipsPage;
