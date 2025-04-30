import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const StudentRecruitmentPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Student Recruitment Program</h1>
          <p className="text-xl font-medium">
            Empowering final year students to join PHB's mission in improving public health in Nigeria
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
              { label: 'Student Recruitment', href: '/programs/student-recruitment' }
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
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">About the Program</h2>
              <p className="mb-4">
                The PHB Student Recruitment Program is designed to identify, mentor, and develop talented final year
                students from universities across Nigeria for potential roles within the Public Health Bureau.
                This initiative bridges the gap between academic learning and professional practice in the public
                health sector.
              </p>
              <p className="mb-4">
                Selected students will have the opportunity to work under the guidance of PHB professionals,
                gaining valuable hands-on experience while contributing to Nigeria's public health infrastructure.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3 text-[#005eb8]">Program Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Structured mentorship from PHB professionals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hands-on experience in public health initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Potential pathway to employment with PHB after graduation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Networking opportunities with health professionals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional development workshops and training</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">How It Works</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Selection Process</h3>
                  <p>
                    Each participating university nominates 5 top-performing final year students based on academic
                    excellence, leadership potential, and commitment to public health. These nominations require
                    verification and approval from the departmental head.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Required Documentation</h3>
                  <p className="mb-2">
                    Nominated students must submit:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Current academic transcripts with stamps from the departmental head</li>
                    <li>Personal statement of interest</li>
                    <li>Curriculum vitae</li>
                    <li>Two letters of recommendation (one must be from a faculty member)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Mentorship and Development</h3>
                  <p>
                    Selected candidates will participate in PHB's structured mentorship program, gaining exposure to
                    various aspects of public health administration, policy development, community health initiatives,
                    data analysis, and healthcare delivery systems.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Program Duration</h3>
                  <p>
                    The program typically runs for 6 months, with potential for extension or transition into
                    full-time roles for outstanding performers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Eligibility Criteria</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Must be a final year student at a recognized Nigerian university</li>
                <li>Studying in relevant fields such as Public Health, Medicine, Nursing, Pharmacy, Health Administration, Epidemiology, Biostatistics, or related disciplines</li>
                <li>Maintaining at least a 3.5 GPA (or equivalent second class upper)</li>
                <li>Demonstrated interest in public health through coursework, research, or volunteer experience</li>
                <li>Strong communication and analytical skills</li>
                <li>Willingness to commit to the full duration of the program</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Expected Outcomes</h2>
              <p className="mb-4">
                By the end of the program, participants will have:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Gained practical experience in Nigeria's public health system</li>
                <li>Developed professional networks within the healthcare sector</li>
                <li>Enhanced their technical and soft skills relevant to public health practice</li>
                <li>Completed at least one significant project or initiative</li>
                <li>Received personalized career guidance and mentorship</li>
                <li>Positioned themselves for potential employment opportunities with PHB</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h2 className="text-xl font-bold text-[#005eb8] mb-2">Coming Soon</h2>
              <p className="mb-4">
                The PHB Student Recruitment Program is currently under development and will be launching soon.
                Interested universities and students can register their interest using the form below to receive
                updates when applications open.
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
            {/* Key Dates */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Program Timeline</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[#005eb8] font-bold">University Registration</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#005eb8] font-bold">Student Nominations</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#005eb8] font-bold">Selection Process</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#005eb8] font-bold">Program Start Date</div>
                  <div>Coming Soon</div>
                </div>
              </div>
            </div>

            {/* Related Programs */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">Related Programs</h3>
                <ul className="space-y-3">
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
                  <li>
                    <Link to="/programs/partnerships" className="text-[#005eb8] hover:underline flex items-center">
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
              <p className="mb-4">For more information about the student recruitment program:</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>students@phb.gov.ng</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+234 (0) 123 456 7890</span>
                </div>
              </div>
            </div>

            {/* Testimonials - will be updated once program launches */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Why Join PHB?</h3>
              <p className="italic text-gray-600 mb-4">
                "Working at PHB offers an unparalleled opportunity to make a meaningful impact on Nigeria's public health
                system. Our organization values innovation, collaboration, and a commitment to serving communities across
                the nation."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#005eb8] font-bold mr-3">
                  DR
                </div>
                <div>
                  <div className="font-medium">Dr. Adeola Rosemary</div>
                  <div className="text-sm text-gray-600">Director of Human Resources, PHB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRecruitmentPage;
