import React from 'react';
import ContactForm from '../components/ContactForm';

const AboutPHBPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-[#005eb8] text-white relative pb-0 overflow-hidden">
        <div className="phb-container py-8 md:py-16">
          <div className="max-w-4xl z-10 relative">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              About the Public Health Bureau
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Transforming healthcare access through innovation, technology, and intelligence
            </p>
          </div>
        </div>
        {/* Removed the hero image */}
      </section>

      {/* Main content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar for navigation */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-bold mb-3 text-[#005eb8]">On this page</h2>
              <nav className="flex flex-col space-y-2">
                <a href="#executive-summary" className="hover:underline text-[#005eb8]">Executive Summary</a>
                <a href="#vision-mission" className="hover:underline text-[#005eb8]">Vision & Mission</a>
                <a href="#core-features" className="hover:underline text-[#005eb8]">Core Features</a>
                <a href="#operational-pathways" className="hover:underline text-[#005eb8]">Operational Pathways</a>
                <a href="#technology" className="hover:underline text-[#005eb8]">Technology Framework</a>
                <a href="#elara-ai" className="hover:underline text-[#005eb8]">Elara AI</a>
                <a href="#immigration" className="hover:underline text-[#005eb8]">Immigration Services</a>
                <a href="#accessibility" className="hover:underline text-[#005eb8]">Accessibility</a>
                <a href="#policies" className="hover:underline text-[#005eb8]">Policies</a>
                <a href="#cookies" className="hover:underline text-[#005eb8]">Cookies</a>
                <a href="#contact-us" className="hover:underline text-[#005eb8]">Contact Us</a>
              </nav>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Get involved</h3>
              <p className="mb-4 text-sm">Help shape the future of healthcare by joining the PHB initiative.</p>
              <a href="/register" className="bg-[#005eb8] text-white px-4 py-2 rounded inline-block hover:bg-[#003f7e]">Register now</a>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Learn about Elara AI</h3>
              <p className="mb-4 text-sm">Discover how our AI is revolutionizing healthcare delivery and patient outcomes.</p>
              <a href="/elara-ai" className="bg-[#005eb8] text-white px-4 py-2 rounded inline-block hover:bg-[#003f7e]">Explore Elara AI</a>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:col-span-2">
            <section id="executive-summary" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Executive Summary</h2>

              <p className="mb-4">
                The Public Health Bureau (PHB) represents a transformative initiative within the healthcare technology domain.
                This platform is meticulously designed to optimize healthcare access, coordination, and management through
                the integration of advanced artificial intelligence (AI) and data analytics. Envisioned as a pivotal resource
                on national, continental, and global scales, PHB aspires to redefine digital healthcare delivery paradigms.
              </p>
              <p className="mb-4">
                PHB operates as a national healthcare ecosystem, connecting individuals with healthcare providers, maintaining
                comprehensive health records, and providing AI-driven diagnostic and predictive tools.
              </p>

              <p className="mb-4">
                A key component of PHB is the Health Point Number (HPN), a unique identifier that consolidates a user's
                entire health history, medical records, and interactions with healthcare facilities, thereby streamlining healthcare access.
              </p>

              <div className="my-8 bg-blue-50 p-6 rounded-lg border-l-4 border-[#005eb8]">
                <h3 className="text-xl font-bold text-[#005eb8] mb-3">Our approach</h3>
                <p>
                  We understand that accessing medical care can sometimes be challenging, especially for individuals
                  with limited mobility or busy schedules. That's where we fill the gap—not just for ourselves but for
                  other healthtech providers. PHB envisions digitizing healthcare services, creating a seamless and
                  integrated experience for a diverse range of stakeholders, including patients, healthcare professionals,
                  NGOs, private clinics, and hospitals.
                </p>
              </div>
            </section>

            <section id="vision-mission" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Vision and Mission</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Vision</h3>
                  <p>
                    To establish a comprehensive health technology platform that seamlessly integrates healthcare services,
                    augments operational efficiency, and empowers stakeholders to proactively manage health outcomes.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Mission</h3>
                  <p className="mb-4">
                    Our mission is to improve lives by bridging the gap between patients and healthcare providers through technology,
                    making essential healthcare services accessible from the comfort of home.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Facilitate the delivery of digitized, accessible, and user-centric healthcare solutions.</li>
                    <li>Equip healthcare professionals and institutions with cutting-edge tools to streamline administrative processes and enhance service delivery.</li>
                    <li>Employ predictive analytics and AI to anticipate, mitigate, and manage health risks effectively.</li>
                  </ul>
                </div>
              </div>
              {/* Removed digital health technologies image */}
            </section>

            <section id="core-features" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Core Features</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">End-User Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Health Point Number (HPN)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>A distinctive identifier assigned to each user</li>
                    <li>Central repository for comprehensive medical records</li>
                    <li>Integration with registered healthcare facilities</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">AI-Enabled Functionalities</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Diagnostic Tools: AI-driven algorithms for precise diagnostics</li>
                    <li>Predictive Analytics: Advanced modeling to forecast health outcomes</li>
                    <li>Conversational AI: Chatbots providing personalized health guidance</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Health Monitoring Interface</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Real-time health metric tracking</li>
                    <li>Wearable device integration (coming soon)</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Dynamic Health Reports</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Detailed, interactive monthly health summaries</li>
                    <li>Customized recommendations</li>
                    <li>Automated flagging of anomalies</li>
                  </ul>
                </div>
              </div>
              {/* Removed digital health dashboard images */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Emergency Response System</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>"Uber Emergency" service</li>
                    <li>Immediate access to critical medical transportation</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Educational Resources</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Curated multimedia content on health topics</li>
                    <li>Self-care practices and crisis interventions</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Virtual Consultations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Secure and efficient telemedicine services</li>
                    <li>Facilitated communication between patients and providers</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-3">Institutional Support Services (HR Compliance)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Workforce Management</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Tools for tracking and managing healthcare personnel</li>
                    <li>Intelligent scheduling for optimal resource allocation</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Administrative Automation</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Streamlined registration and appointment booking</li>
                    <li>Efficient patient record management</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Data Analytics Infrastructure</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Actionable insights into patient demographics</li>
                    <li>Treatment efficacy and institutional performance metrics</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="operational-pathways" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Operational Pathways</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">User Engagement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">1. Onboarding</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Streamlined registration process leading to immediate allocation of an HPN</li>
                    <li>Seamless integration with proximal healthcare facilities</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">2. Record Accessibility</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Secure, user-controlled access to longitudinal medical data</li>
                    <li>Consent-driven sharing with designated healthcare entities</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">3. Service Utilization</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Clinical Appointment and Remote Consultation Booking</li>
                    <li>Emergency Medical Response Service Activation</li>
                    <li>Continuous Follow-Up</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">4. Continuous Interaction</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Regular Health Monitoring and Updates</li>
                    <li>Ongoing Provision of Insights via Interactive Health Reports</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="technology" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Technological Framework</h2>
              {/* Removed AI in healthcare network visualization image */}

              <h3 className="text-xl font-semibold mt-6 mb-3">AI-Driven Innovations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Diagnostic Automation</h4>
                  <p className="text-sm">
                    Employing machine learning to detect conditions based on clinical data and generate geographic information reports.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Predictive Health Modeling</h4>
                  <p className="text-sm">
                    Risk stratification through AI-based predictive tools using patient data and algorithms to forecast potential health issues.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Administrative Efficiencies</h4>
                  <p className="text-sm">
                    Automating high-volume, low-complexity tasks to alleviate institutional burdens with conservative patterns to streamline distribution.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Telehealth Enhancements</h4>
                  <p className="text-sm">
                    Robust systems for conducting remote clinical evaluations with integrated health dashboards.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Integrated Health Dashboards</h4>
                  <p className="text-sm">
                    Wearable device synchronization for granular health tracking and comprehensive monitoring.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Conversational Interfaces</h4>
                  <p className="text-sm">
                    Advanced NLP-based chatbots capable of contextual health advisories.
                  </p>
                </div>
              </div>
            </section>

            <section id="elara-ai" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Introducing Elara AI</h2>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#005eb8] mb-6">
                <p className="italic">
                  "Elara is not just a healthcare tool – it's a healthcare revolution."
                </p>
              </div>

              <p className="mb-6">
                Welcome to the future of healthcare tools, designed to streamline operations, enhance accuracy, and empower professionals.
                Elara, the AI behind PHB (Public Health Bureau), is equipped with cutting-edge technologies to assist medical professionals
                in providing the best care possible.
              </p>
              {/* Removed doctor using AI healthcare technology image */}

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Key Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold mb-2">Diagnostics Assistance</h4>
                    <p className="text-sm">
                      Elara analyzes patient symptoms, medical history, and lab results to provide diagnostic suggestions,
                      helping professionals save time with data-driven insights.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold mb-2">Predictive Analytics</h4>
                    <p className="text-sm">
                      Elara leverages advanced machine learning to forecast health trends, identify risk factors,
                      and suggest preventive measures tailored to individual patients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a href="/elara-ai" className="bg-[#005eb8] text-white px-6 py-3 rounded-md inline-block hover:bg-[#003f7e] transition-colors">
                  Learn more about Elara AI
                </a>
              </div>
            </section>

            <section id="immigration" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">PHB & Immigration</h2>
              <p className="text-lg mb-4">Revolutionizing Healthcare Access for Immigrants</p>

              <p className="mb-6">
                PHB serves as a comprehensive healthcare platform that bridges the gap between healthcare and immigration policies.
                Our system supports immigrants by transforming healthcare accessibility for immigrants, refugees, and asylum seekers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Digital Health Records for Immigrants</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Unique Health Point Number (HPN) linked to medical records</li>
                    <li>Cross-border accessibility for medical records</li>
                    <li>Fast-tracking immigration health screenings</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">AI-Powered Support for Refugees</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Quick medical assessments using AI</li>
                    <li>Telemedicine for border areas and refugee camps</li>
                    <li>Mental health support via AI chatbots</li>
                  </ul>
                </div>
              </div>
              {/* Removed migration health data visualization image */}

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Benefits for Immigrants & Refugees</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access to health records anywhere without paper documents</li>
                      <li>Faster medical screenings for visa applications</li>
                      <li>Affordable healthcare solutions and insurance access</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Benefits for Governments</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Digital verification of medical screenings for visas</li>
                      <li>Disease tracking & public health insights for immigrant populations</li>
                      <li>Smoother refugee health integration into public healthcare</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="accessibility" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Accessibility Statement</h2>

              <p className="mb-4">
                PHB Health Systems Ltd is committed to ensuring digital accessibility for all users, including those with disabilities.
                We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Our Commitment</h3>
                <p className="mb-4">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines
                  explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3">Accessibility Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Screen Reader Support</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Semantic HTML markup for proper structure</li>
                    <li>ARIA labels for interactive elements</li>
                    <li>Alt text for all meaningful images</li>
                    <li>Skip navigation links for keyboard users</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Keyboard Navigation</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Full keyboard accessibility for all functions</li>
                    <li>Visible focus indicators</li>
                    <li>Logical tab order throughout the site</li>
                    <li>No keyboard traps</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Visual Design</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>High contrast color schemes</li>
                    <li>Resizable text up to 200% without loss of functionality</li>
                    <li>Clear visual hierarchy and spacing</li>
                    <li>No content relying solely on color</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Content Accessibility</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Plain language for medical information</li>
                    <li>Captions and transcripts for multimedia content</li>
                    <li>Readable fonts and appropriate text sizes</li>
                    <li>Consistent navigation patterns</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Compatible Browsers and Assistive Technologies</h3>
              <p className="mb-4">
                Our platform is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Screen readers: JAWS, NVDA, VoiceOver, TalkBack</li>
                <li>Screen magnification software: ZoomText, MAGic</li>
                <li>Speech recognition software: Dragon NaturallySpeaking</li>
                <li>Modern web browsers: Chrome, Firefox, Safari, Edge (latest versions)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Known Limitations</h3>
              <p className="mb-4">
                Despite our best efforts, some parts of the PHB platform may not be fully accessible. We are actively working to address:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Some PDF documents may not be fully accessible to screen readers</li>
                <li>Certain third-party integrated services may have accessibility limitations</li>
                <li>Medical imaging tools are being enhanced for better accessibility</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Feedback and Contact</h3>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#005eb8]">
                <p className="mb-4">
                  We welcome your feedback on the accessibility of the PHB Health Systems platform. If you encounter
                  accessibility barriers or have suggestions for improvement, please contact us:
                </p>
                <ul className="space-y-2">
                  <li><strong>Email:</strong> accessibility@phbhealthsystems.com</li>
                  <li><strong>Phone:</strong> [PLACEHOLDER: Contact Number]</li>
                  <li><strong>Address:</strong> [PLACEHOLDER: Registered Office Address], Nigeria</li>
                </ul>
                <p className="mt-4 text-sm">
                  We aim to respond to accessibility feedback within 5 business days and propose a solution within 10 business days.
                </p>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p><strong>Last Updated:</strong> January 2025</p>
                <p><strong>Compliance Status:</strong> Partially conformant with WCAG 2.1 Level AA</p>
              </div>
            </section>

            <section id="policies" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Privacy Policy & Terms of Service</h2>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#005eb8] mb-6">
                <p className="font-semibold mb-2">PHB Health Systems Ltd - Legal Information</p>
                <ul className="space-y-1 text-sm">
                  <li><strong>Company Registration:</strong> 8663073 (CAC, Nigeria)</li>
                  <li><strong>Incorporated:</strong> 4th August, 2025</li>
                  <li><strong>Governing Law:</strong> Companies and Allied Matters Act 2020</li>
                  <li><strong>Last Updated:</strong> January 2025</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-3">Privacy Policy</h3>

              <h4 className="text-lg font-semibold mt-4 mb-2">1. Introduction</h4>
              <p className="mb-4">
                PHB Health Systems Ltd ("we," "our," or "PHB") is committed to protecting your privacy and ensuring the security
                of your personal and health information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you use our healthcare platform and services.
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">2. Information We Collect</h4>
              <div className="bg-gray-50 p-5 rounded-lg mb-4">
                <p className="font-semibold mb-2">Personal Information:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Name, date of birth, gender, contact details</li>
                  <li>Government-issued identification numbers</li>
                  <li>Health Point Number (HPN)</li>
                  <li>Emergency contact information</li>
                </ul>

                <p className="font-semibold mb-2 mt-4">Health Information:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Medical history and health records</li>
                  <li>Diagnostic results, lab reports, imaging studies</li>
                  <li>Prescription and medication history</li>
                  <li>Appointment and consultation records</li>
                  <li>Health monitoring data from connected devices</li>
                </ul>

                <p className="font-semibold mb-2 mt-4">Technical Information:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>IP address, browser type, device information</li>
                  <li>Usage data and interaction patterns</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <h4 className="text-lg font-semibold mt-4 mb-2">3. How We Use Your Information</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Healthcare Services:</strong> Provide medical consultations, appointments, diagnoses, and treatment recommendations</li>
                <li><strong>Health Record Management:</strong> Maintain and update your comprehensive medical records via your HPN</li>
                <li><strong>AI-Powered Services:</strong> Elara AI analysis for diagnostics, predictive health modeling, and personalized recommendations</li>
                <li><strong>Communication:</strong> Send appointment reminders, health alerts, and service updates</li>
                <li><strong>Platform Improvement:</strong> Analyze usage patterns to enhance user experience and service quality</li>
                <li><strong>Legal Compliance:</strong> Meet regulatory requirements and respond to legal requests</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">4. Data Sharing and Disclosure</h4>
              <p className="mb-4">
                We respect your privacy and only share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Healthcare Providers:</strong> With your consent, we share relevant health information with medical professionals and facilities involved in your care</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist with platform operations (hosting, payment processing, analytics) under strict confidentiality agreements</li>
                <li><strong>Legal Requirements:</strong> When required by Nigerian law, court orders, or government regulations</li>
                <li><strong>Emergency Situations:</strong> To protect your vital interests or public health</li>
                <li><strong>With Your Consent:</strong> Any other disclosure will require your explicit consent</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">5. Data Security</h4>
              <div className="bg-gray-50 p-5 rounded-lg mb-4">
                <p className="mb-3">We implement comprehensive security measures to protect your data:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure data storage with encryption at rest</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and audit logs</li>
                  <li>Compliance with Nigeria Data Protection Regulation (NDPR) and international standards</li>
                </ul>
                <p className="mt-3 text-sm">
                  <strong>Data Storage:</strong> Your data is stored on secure servers located in [PLACEHOLDER: Server Location].
                  We maintain backup systems to ensure data availability and disaster recovery.
                </p>
              </div>

              <h4 className="text-lg font-semibold mt-4 mb-2">6. Your Rights</h4>
              <p className="mb-3">Under Nigerian data protection laws, you have the following rights:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal and health data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal and medical record retention requirements)</li>
                <li><strong>Portability:</strong> Transfer your health records to another provider</li>
                <li><strong>Consent Withdrawal:</strong> Withdraw consent for data processing (may limit service availability)</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">7. Data Retention</h4>
              <p className="mb-4">
                We retain your personal and health information for as long as necessary to provide services and comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Medical records: Minimum [PLACEHOLDER: X years] as required by Nigerian healthcare regulations</li>
                <li>Account information: Duration of account activity plus [PLACEHOLDER: X years]</li>
                <li>Billing records: [PLACEHOLDER: X years] for tax and financial compliance</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">8. International Data Transfers</h4>
              <p className="mb-4">
                If we transfer your data outside Nigeria, we ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Adequacy determinations or standard contractual clauses</li>
                <li>Compliance with NDPR requirements for cross-border data transfers</li>
                <li>Your explicit consent when required</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">9. Children's Privacy</h4>
              <p className="mb-4">
                Our services are intended for users aged 18 and above. For users under 18, we require parental or guardian consent
                before collecting or processing their information. Parents/guardians can request access to, correction, or deletion
                of their child's information by contacting us.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8">Terms of Service</h3>

              <h4 className="text-lg font-semibold mt-4 mb-2">1. Acceptance of Terms</h4>
              <p className="mb-4">
                By accessing and using the PHB Health Systems platform, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">2. Medical Disclaimer</h4>
              <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500 mb-4">
                <p className="font-semibold mb-2">Important Notice:</p>
                <p className="text-sm mb-2">
                  The PHB platform, including Elara AI, provides health information and facilitates healthcare services but does not
                  replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for
                  medical concerns.
                </p>
                <p className="text-sm">
                  In case of emergency, contact local emergency services immediately. Do not rely solely on the platform for
                  emergency medical situations.
                </p>
              </div>

              <h4 className="text-lg font-semibold mt-4 mb-2">3. Account Registration and Security</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You must provide accurate, current, and complete information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must notify us immediately of any unauthorized access or security breaches</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>One account per person; sharing accounts is prohibited</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">4. User Responsibilities</h4>
              <p className="mb-3">When using our platform, you agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Provide accurate health information for proper medical care</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Not interfere with platform security or functionality</li>
                <li>Not attempt to access other users' accounts or data</li>
                <li>Respect intellectual property rights</li>
                <li>Not upload malicious code or harmful content</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">5. Payment Terms</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Fees for services are displayed before confirmation</li>
                <li>Payment is processed through secure third-party providers (Paystack)</li>
                <li>All fees are in Nigerian Naira (NGN) unless otherwise stated</li>
                <li>Refund policy: [PLACEHOLDER: Refund terms based on service type]</li>
                <li>You are responsible for any applicable taxes</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">6. Intellectual Property</h4>
              <p className="mb-4">
                All content, features, and functionality of the PHB platform, including but not limited to text, graphics, logos,
                software, and AI algorithms, are owned by PHB Health Systems Ltd and protected by Nigerian and international
                intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited.
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">7. Limitation of Liability</h4>
              <p className="mb-4">
                To the fullest extent permitted by Nigerian law, PHB Health Systems Ltd shall not be liable for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Indirect, incidental, consequential, or punitive damages</li>
                <li>Medical outcomes or decisions based on platform information</li>
                <li>Service interruptions, data loss, or technical failures</li>
                <li>Actions or omissions of healthcare providers using the platform</li>
                <li>Third-party content or services</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">8. Termination</h4>
              <p className="mb-4">
                We reserve the right to suspend or terminate your account if you violate these Terms of Service, engage in fraudulent
                activity, or for any other reason at our discretion. You may also terminate your account at any time through your
                account settings or by contacting support.
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">9. Changes to Terms</h4>
              <p className="mb-4">
                We may update these Terms of Service periodically. We will notify you of significant changes via email or platform
                notification. Continued use of the platform after changes constitutes acceptance of the updated terms.
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">10. Dispute Resolution</h4>
              <p className="mb-4">
                These Terms of Service are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from or
                relating to these terms or the use of our platform shall be resolved through:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Initial good faith negotiation between parties</li>
                <li>Mediation if negotiation fails</li>
                <li>Arbitration under Nigerian Arbitration and Conciliation Act</li>
                <li>Jurisdiction of Nigerian courts for matters not resolved through arbitration</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">11. Contact Information</h4>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#005eb8]">
                <p className="mb-4">For questions about these policies or to exercise your rights:</p>
                <ul className="space-y-2">
                  <li><strong>Data Protection Officer:</strong> [PLACEHOLDER: DPO Name]</li>
                  <li><strong>Email:</strong> privacy@phbhealthsystems.com | legal@phbhealthsystems.com</li>
                  <li><strong>Phone:</strong> [PLACEHOLDER: Contact Number]</li>
                  <li><strong>Address:</strong> [PLACEHOLDER: Registered Office Address], Nigeria</li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Nigeria Data Protection Commission:</strong> You have the right to lodge a complaint with the NDPC
                  if you believe your data protection rights have been violated.
                </p>
              </div>
            </section>

            <section id="cookies" className="mb-12">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Cookie Policy</h2>

              <p className="mb-4">
                This Cookie Policy explains how PHB Health Systems Ltd uses cookies and similar tracking technologies when you visit
                our website and use our platform. By continuing to use our services, you consent to our use of cookies as described
                in this policy.
              </p>

              <h3 className="text-xl font-semibold mb-3">What Are Cookies?</h3>
              <p className="mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website.
                They help websites remember your preferences, improve your experience, and provide analytics about how the site is used.
              </p>

              <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use</h3>

              <div className="space-y-4 mb-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">1. Essential Cookies (Strictly Necessary)</h4>
                  <p className="text-sm mb-2">
                    These cookies are required for the platform to function properly and cannot be disabled without affecting
                    core functionality.
                  </p>
                  <p className="text-sm font-semibold mb-1">Used for:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>User authentication and session management</li>
                    <li>Security features and fraud prevention</li>
                    <li>Load balancing and platform performance</li>
                    <li>Storing your preferences and settings</li>
                  </ul>
                  <p className="text-sm mt-2 text-gray-600">
                    <strong>Cookie names:</strong> phb_token, phb_professional_token, phb_organization_token, session_id
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">2. Functional Cookies</h4>
                  <p className="text-sm mb-2">
                    These cookies enable enhanced functionality and personalization based on your interactions with the platform.
                  </p>
                  <p className="text-sm font-semibold mb-1">Used for:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Remembering your language and regional preferences</li>
                    <li>Saving your dashboard customizations</li>
                    <li>Storing view toggle preferences (patient/professional views)</li>
                    <li>Remembering form inputs to improve user experience</li>
                  </ul>
                  <p className="text-sm mt-2 text-gray-600">
                    <strong>Retention:</strong> Up to 12 months
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">3. Analytics Cookies</h4>
                  <p className="text-sm mb-2">
                    These cookies help us understand how visitors interact with our platform, allowing us to improve services
                    and user experience.
                  </p>
                  <p className="text-sm font-semibold mb-1">Used for:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Tracking page views and navigation patterns</li>
                    <li>Analyzing feature usage and engagement metrics</li>
                    <li>Identifying technical issues and performance bottlenecks</li>
                    <li>Understanding user demographics (anonymized)</li>
                  </ul>
                  <p className="text-sm mt-2 text-gray-600">
                    <strong>Third-party services:</strong> [PLACEHOLDER: Google Analytics, Mixpanel, etc.]<br/>
                    <strong>Data anonymization:</strong> IP addresses are anonymized
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">4. Performance Cookies</h4>
                  <p className="text-sm mb-2">
                    These cookies collect information about how you use our platform to help us optimize performance.
                  </p>
                  <p className="text-sm font-semibold mb-1">Used for:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Monitoring page load times and response speeds</li>
                    <li>Identifying and fixing technical errors</li>
                    <li>Testing new features and improvements</li>
                    <li>Load balancing across servers</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">5. Third-Party Cookies</h4>
                  <p className="text-sm mb-2">
                    Some features on our platform use services provided by third parties, which may set their own cookies.
                  </p>
                  <p className="text-sm font-semibold mb-1">Third-party services include:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Paystack:</strong> Payment processing and transaction security</li>
                    <li><strong>[PLACEHOLDER: CDN Provider]:</strong> Content delivery and performance optimization</li>
                    <li><strong>[PLACEHOLDER: Analytics Provider]:</strong> Usage analytics and insights</li>
                    <li><strong>[PLACEHOLDER: Support Tools]:</strong> Customer support chat features</li>
                  </ul>
                  <p className="text-sm mt-2">
                    These third parties have their own privacy policies and cookie policies. We recommend reviewing them:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mt-1">
                    <li>Paystack Privacy Policy: https://paystack.com/privacy</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Cookie Duration</h3>
              <div className="bg-gray-50 p-5 rounded-lg mb-6">
                <p className="mb-3">Cookies are set for different durations:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Session Cookies:</strong> Temporary cookies deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (up to 12 months) or until manually deleted</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-3">How to Control Cookies</h3>
              <p className="mb-4">You have several options to manage or disable cookies:</p>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#005eb8] mb-6">
                <h4 className="font-semibold mb-3">Browser Settings</h4>
                <p className="text-sm mb-2">Most browsers allow you to control cookies through settings:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and Website Data</li>
                  <li><strong>Edge:</strong> Settings → Privacy & Security → Cookies</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-4">Platform Cookie Preferences</h4>
                <p className="text-sm mb-2">
                  You can manage non-essential cookies through our cookie preference center:
                </p>
                <a href="#" className="text-[#005eb8] underline text-sm">Manage Cookie Preferences</a>
              </div>

              <h3 className="text-xl font-semibold mb-3">Impact of Disabling Cookies</h3>
              <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500 mb-6">
                <p className="font-semibold mb-2">Please Note:</p>
                <p className="text-sm mb-2">
                  Disabling cookies may affect your experience on our platform. Specifically:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>You may not be able to log in or access your account</li>
                  <li>Personalized features and preferences will not work</li>
                  <li>Some interactive features may be unavailable</li>
                  <li>Platform performance may be degraded</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-3">Updates to This Policy</h3>
              <p className="mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements.
                We will notify you of significant changes through the platform or via email. The "Last Updated" date at the
                bottom indicates when the policy was last revised.
              </p>

              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#005eb8]">
                <p className="mb-4">If you have questions about our use of cookies, please contact us:</p>
                <ul className="space-y-2">
                  <li><strong>Email:</strong> privacy@phbhealthsystems.com</li>
                  <li><strong>Phone:</strong> [PLACEHOLDER: Contact Number]</li>
                  <li><strong>Address:</strong> [PLACEHOLDER: Registered Office Address], Nigeria</li>
                </ul>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p><strong>Last Updated:</strong> January 2025</p>
                <p><strong>Company Registration:</strong> PHB Health Systems Ltd (RC: 8663073)</p>
              </div>
            </section>

            <section id="contact-us" className="mb-12">
              <ContactForm
                title="Contact the PHB Team"
                subtitle="Have questions about our platform or interested in partnership opportunities? Send us a message and we'll get back to you as soon as possible."
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPHBPage;
