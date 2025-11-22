import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ResearchOpportunitiesPage: React.FC = () => {
  const researchAreas = [
    {
      title: 'Infectious Disease Prevention',
      description: 'Research on strategies to prevent and control infectious diseases prevalent in Nigeria.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Maternal and Child Health',
      description: 'Research focusing on improving maternal and child health outcomes in underserved communities.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Health Systems Strengthening',
      description: 'Research on improving healthcare delivery systems, access, and quality of care across Nigeria.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Non-Communicable Diseases',
      description: 'Research on prevention, early detection, and management of chronic diseases like diabetes and hypertension.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Digital Health Solutions',
      description: 'Research on leveraging technology to improve healthcare access, delivery, and outcomes.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Environmental Health',
      description: 'Research on environmental factors affecting public health and interventions to mitigate risks.',
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Research Opportunities</h1>
          <p className="text-xl font-medium">
            Funding and support for innovative public health research initiatives in Nigeria
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
              { label: 'Research Opportunities', href: '/programs/research' }
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
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">About Our Research Program</h2>
              <p className="mb-4">
                The PHB Research Opportunities Program supports innovative research projects that address critical
                public health challenges in Nigeria. We provide funding, resources, and mentorship to researchers
                at various career stages who are committed to improving health outcomes through evidence-based approaches.
              </p>
              <p className="mb-4">
                Our research agenda aligns with national health priorities and aims to generate evidence that can
                inform policy decisions, improve healthcare delivery, and address health disparities across Nigeria.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Why Apply?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access to research funding ranging from ₦1 million to ₦10 million</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mentorship from experienced researchers and public health experts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access to PHB data resources and research infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Opportunities to collaborate with other researchers and institutions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Support for research publication and dissemination</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Priority Research Areas</h2>
              <p className="mb-6">
                While we welcome innovative proposals across all public health domains, the following areas are
                current priorities for PHB research funding:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {researchAreas.map((area, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">{area.icon}</div>
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
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Eligibility Criteria</h2>
              <p className="mb-4">
                The PHB Research Opportunities Program is open to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Researchers affiliated with Nigerian universities or research institutions</li>
                <li>Early, mid-career, and senior researchers</li>
                <li>Multi-disciplinary research teams</li>
                <li>Collaborations between academic institutions and healthcare organizations</li>
              </ul>
              <p className="mb-4">
                Applicants must demonstrate:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Relevant expertise and qualifications in their research area</li>
                <li>Clear research objectives aligned with PHB priorities</li>
                <li>Feasible methodology and timeline</li>
                <li>Potential for impact on public health in Nigeria</li>
                <li>Commitment to ethical research practices</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Application Process</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">1. Letter of Intent (LOI)</h3>
                  <p>
                    Submit a 2-page LOI outlining your research idea, objectives, methodology, and potential impact.
                    LOIs are reviewed quarterly, and selected applicants will be invited to submit full proposals.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">2. Full Proposal</h3>
                  <p>
                    If your LOI is selected, you will be invited to submit a detailed research proposal, including
                    background, objectives, methodology, budget, timeline, and expected outcomes.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">3. Review and Selection</h3>
                  <p>
                    Proposals undergo rigorous peer review by a panel of experts. Selection is based on scientific
                    merit, relevance to PHB priorities, feasibility, and potential impact.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">4. Award and Implementation</h3>
                  <p>
                    Successful applicants receive funding and support to implement their research projects, with
                    regular monitoring and mentorship from PHB research advisors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <h2 className="text-xl font-bold text-[#0891b2] mb-2">Coming Soon</h2>
              <p className="mb-4">
                The PHB Research Opportunities Program is currently under development and will be launching soon.
                Interested researchers can register below to receive updates when applications open.
              </p>
              <div className="flex justify-center mt-4">
                <button className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors font-medium">
                  Register Interest
                </button>
              </div>
            </div>

            {/* Related Publications */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
              <h3 className="text-xl font-bold mb-4">Explore PHB Research Publications</h3>
              <p className="mb-4">
                Access the latest research, articles, and insights from PHB's medical professionals, researchers, and AI specialists.
              </p>
              <Link
                to="/research-publications"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <span>Browse Publications</span>
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Key Dates */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Funding Cycles</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[#0891b2] font-bold">LOI Submission Deadlines</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Proposal Review</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Award Notification</div>
                  <div>Coming Soon</div>
                </div>
                <div>
                  <div className="text-[#0891b2] font-bold">Project Start Date</div>
                  <div>Coming Soon</div>
                </div>
              </div>
            </div>

            {/* Funding Information */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0891b2] mb-3">Funding Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold">Small Grants</div>
                    <div className="text-gray-600">₦1,000,000 - ₦3,000,000</div>
                    <div className="text-sm text-gray-500">For 1-year projects</div>
                  </div>
                  <div>
                    <div className="font-semibold">Medium Grants</div>
                    <div className="text-gray-600">₦3,000,000 - ₦5,000,000</div>
                    <div className="text-sm text-gray-500">For 1-2 year projects</div>
                  </div>
                  <div>
                    <div className="font-semibold">Large Grants</div>
                    <div className="text-gray-600">₦5,000,000 - ₦10,000,000</div>
                    <div className="text-sm text-gray-500">For 2-3 year projects</div>
                  </div>
                </div>
              </div>
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
                    <Link to="/programs/mentorship" className="text-[#0891b2] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Mentorship Program
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
              <p className="mb-4">For more information about research opportunities:</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-[#0891b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>research@phb.gov.ng</span>
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

export default ResearchOpportunitiesPage;
