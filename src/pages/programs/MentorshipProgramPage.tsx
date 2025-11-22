import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const MentorshipProgramPage: React.FC = () => {
  const mentorCategories = [
    {
      title: 'Leadership Mentoring',
      description: 'Guidance for emerging leaders in public health administration and policy development.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Clinical Practice Mentoring',
      description: 'Specialized guidance for healthcare practitioners in clinical settings.',
      image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Research Mentoring',
      description: 'Support for researchers at various career stages to develop research skills and projects.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      title: 'Community Health Mentoring',
      description: 'Guidance for those working in community health education and outreach programs.',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Mentorship Program</h1>
          <p className="text-xl font-medium">
            Professional development and guidance for emerging public health leaders
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
              { label: 'Mentorship Program', href: '/programs/mentorship' }
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
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">About the Mentorship Program</h2>
              <p className="mb-4">
                The PHB Mentorship Program connects experienced public health professionals with emerging leaders,
                practitioners, and researchers in the field. Our structured mentoring relationships provide guidance,
                support, and knowledge transfer to help mentees advance their careers and make meaningful contributions
                to public health in Nigeria.
              </p>
              <p className="mb-4">
                The program is designed to foster professional growth, build leadership capacity, and create a
                supportive community of public health practitioners across different specialties and career stages.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Benefits for Mentees</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personalized guidance from experienced professionals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Career development and advancement opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Networking with other professionals in the field</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access to professional development resources and workshops</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Support in developing and implementing public health projects</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Mentorship Categories</h2>
              <p className="mb-6">
                Our mentorship program offers specialized guidance across various domains of public health practice:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentorCategories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">How the Program Works</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Application and Matching</h3>
                  <p>
                    Mentees and mentors apply to the program through separate applications. PHB carefully reviews
                    applications and matches mentees with mentors based on career goals, expertise, interests,
                    and mentoring needs.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Program Orientation</h3>
                  <p>
                    All participants attend an orientation session to learn about program expectations, effective
                    mentoring practices, and how to establish productive mentoring relationships.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Mentoring Relationship</h3>
                  <p>
                    Mentors and mentees meet regularly (typically monthly) over a 12-month period. They establish
                    goals, discuss career challenges and opportunities, and work on specific development areas.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Group Learning Sessions</h3>
                  <p>
                    Throughout the program, PHB organizes group workshops and learning sessions on various topics
                    relevant to public health practice and professional development.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Program Evaluation</h3>
                  <p>
                    Participants regularly provide feedback on their mentoring experience, allowing PHB to
                    continuously improve the program and address any challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Eligibility</h2>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-xl font-semibold mb-3">For Mentees:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Public health professionals with 1-5 years of experience</li>
                  <li>Recent graduates with degrees in public health or related fields</li>
                  <li>Mid-career professionals transitioning to public health</li>
                  <li>Demonstrated commitment to a career in public health in Nigeria</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">For Mentors:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Established professionals with at least 7 years of experience in public health</li>
                  <li>Expertise in one or more areas of public health practice or research</li>
                  <li>Commitment to developing the next generation of public health leaders</li>
                  <li>Willingness to dedicate time to mentoring relationships (approximately 2-3 hours monthly)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h2 className="text-xl font-bold text-[#0891b2] mb-2">Coming Soon</h2>
              <p className="mb-4">
                The PHB Mentorship Program is currently under development and will be launching soon.
                Interested mentors and mentees can register below to receive updates when applications open.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <button className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors font-medium">
                  Register as a Mentor
                </button>
                <button className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors font-medium">
                  Register as a Mentee
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Program Timeline */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Program Timeline</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[#0891b2] font-bold">Applications Open</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Matching Process</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Program Orientation</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Program Duration</div>
                  <div>12 months</div>
                </div>
              </div>
            </div>

            {/* Testimonials - will be updated once program launches */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Benefits for Mentors</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Opportunity to contribute to the development of future public health leaders</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recognition as a leader in the field of public health</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Enhanced leadership and coaching skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Expanded professional network</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access to mentorship training and resources</span>
                </li>
              </ul>
            </div>

            {/* Related Programs */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0891b2] mb-3">Related Programs</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/programs/student-recruitment" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Student Recruitment
                    </Link>
                  </li>
                  <li>
                    <Link to="/programs/research" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Research Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/programs/partnerships" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      University Partnerships
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <p className="mb-4">For more information about the mentorship program:</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#0891b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>mentorship@phb.gov.ng</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#0891b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

export default MentorshipProgramPage;
