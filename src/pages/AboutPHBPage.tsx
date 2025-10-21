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
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Data Storage & Cookies Policy
              </h3>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  This section explains how PHB stores data on your device to provide our healthcare services.
                  We use a combination of <strong>browser localStorage</strong> and <strong>backend cookies</strong> for different purposes.
                </p>

                {/* localStorage Usage Section */}
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
                    Browser localStorage (Client-Side Storage)
                  </h4>
                  <p className="mb-3">
                    PHB currently stores authentication tokens and user preferences in your browser's localStorage.
                    This is JavaScript-accessible storage that persists until manually cleared.
                  </p>

                  <h5 className="font-semibold mt-3 mb-2">What We Store in localStorage:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Authentication Tokens</strong>:
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li><code>phb_auth_token</code> - Regular user JWT token</li>
                        <li><code>phb_professional_token</code> - Medical professional JWT token</li>
                        <li><code>phb_organization_token</code> - Organization admin JWT token</li>
                        <li><code>medical_record_token</code> - Temporary medical records access token</li>
                      </ul>
                    </li>
                    <li>
                      <strong>User Preferences</strong>:
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li><code>phb_view_preference</code> - Doctor/patient view toggle</li>
                        <li><code>phb_onboarding_completed</code> - Onboarding completion flag</li>
                        <li><code>cookie-consent</code> - Data storage consent preference</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Women's Health Data</strong> (if you use these features):
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li><code>cycles</code> - Menstrual cycle tracking data</li>
                        <li><code>contractions</code> - Contraction timer data</li>
                        <li><code>pregnancyDueDate</code> - Pregnancy due date</li>
                        <li><code>birthPlan</code> - Birth plan information</li>
                      </ul>
                    </li>
                  </ul>

                  <div className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded mt-4">
                    <h5 className="font-semibold mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      Security Notice
                    </h5>
                    <p className="text-sm">
                      <strong>Important</strong>: localStorage data is accessible to JavaScript code running on our site.
                      While we implement security measures to protect against Cross-Site Scripting (XSS) attacks,
                      localStorage does not offer the same protection as httpOnly cookies.
                    </p>
                    <p className="text-sm mt-2">
                      We are actively working on migrating to httpOnly cookies for enhanced security.
                      This will make authentication tokens inaccessible to JavaScript, providing better protection against XSS attacks.
                    </p>
                  </div>
                </div>

                {/* Backend Cookies Section */}
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
                    Backend Cookies (Server-Set HTTP Cookies)
                  </h4>
                  <p className="mb-3">
                    Our backend server sets minimal cookies for security and session management:
                  </p>

                  <table className="w-full border-collapse mt-2">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Cookie Name</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Purpose</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Duration</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Security</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-2"><code>sessionid</code></td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Django session management (admin only)</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Session (deleted when browser closes)</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Secure, HttpOnly, SameSite</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-2"><code>csrftoken</code></td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Cross-Site Request Forgery protection</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">1 year</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Secure, SameSite</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="mt-3 text-sm">
                    <strong>Note</strong>: These backend cookies are NOT used for regular user authentication.
                    User authentication uses JWT tokens stored in localStorage and sent via Authorization headers.
                  </p>
                </div>

                {/* Third-Party Services */}
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
                    Third-Party Services
                  </h4>
                  <p>
                    We integrate with third-party services that may set their own cookies:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li><strong>Paystack</strong>: Payment processing (may set cookies during checkout)</li>
                    <li><strong>Google reCAPTCHA</strong>: Bot protection (sets cookies for verification)</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    Please refer to these services' privacy policies for information about their cookie usage.
                  </p>
                </div>

                {/* Managing Your Data */}
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
                    Managing Your Stored Data
                  </h4>

                  <h5 className="font-semibold mt-3 mb-2">Clearing localStorage Data:</h5>
                  <p className="mb-2">To clear PHB data from your browser:</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>
                      <strong>Use PHB Logout</strong>: Click "Logout" in your account menu.
                      This clears authentication tokens but preserves preferences.
                    </li>
                    <li>
                      <strong>Browser Settings</strong>:
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li><strong>Chrome/Edge</strong>: Settings → Privacy → Clear browsing data → Cookies and site data</li>
                        <li><strong>Firefox</strong>: Settings → Privacy & Security → Cookies and Site Data → Clear Data</li>
                        <li><strong>Safari</strong>: Settings → Privacy → Manage Website Data → Remove for phb.com</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Developer Console</strong> (Advanced):
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li>Press F12 to open Developer Tools</li>
                        <li>Go to "Application" or "Storage" tab</li>
                        <li>Expand "Local Storage"</li>
                        <li>Select your PHB domain and clear individual items</li>
                      </ul>
                    </li>
                  </ol>

                  <h5 className="font-semibold mt-4 mb-2">Impact of Clearing Data:</h5>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <ul className="list-disc list-inside space-y-1">
                      <li>✅ You will be logged out</li>
                      <li>✅ Preferences will be reset to defaults</li>
                      <li>✅ Women's health tracking data will be lost (unless synced to server)</li>
                      <li>✅ You can log back in with your credentials</li>
                      <li>✅ Server-stored data (appointments, medical records) remains safe</li>
                    </ul>
                  </div>
                </div>

                {/* Legal Compliance */}
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
                    Your Rights Under NDPR
                  </h4>
                  <p className="mb-2">
                    Under the Nigeria Data Protection Regulation (NDPR), you have the right to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Know what data is stored about you</li>
                    <li>Access your stored data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data (right to be forgotten)</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Port your data to another service</li>
                  </ul>
                  <p className="mt-2">
                    To exercise these rights, contact us at{' '}
                    <a href="mailto:privacy@phb.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      privacy@phb.com
                    </a>
                  </p>
                </div>

                {/* Future Enhancements */}
                <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
                    🔒 Upcoming Security Enhancements
                  </h4>
                  <p className="mb-2">
                    We are committed to continuously improving our security. Planned enhancements include:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>HttpOnly Cookie Migration</strong>: Moving JWT tokens to httpOnly cookies for XSS protection</li>
                    <li><strong>Content Security Policy</strong>: Additional XSS prevention measures</li>
                    <li><strong>Refresh Token Rotation</strong>: Automatic token refresh without re-login</li>
                    <li><strong>Multi-Factor Authentication</strong>: Enhanced account security options</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    This policy will be updated when these enhancements are implemented.
                  </p>
                </div>

                {/* Contact */}
                <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                  <p className="text-sm">
                    <strong>Questions about data storage?</strong><br />
                    Contact our Data Protection Officer at{' '}
                    <a href="mailto:dpo@phb.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      dpo@phb.com
                    </a>
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Last Updated</strong>: October 18, 2025<br />
                    <strong>Version</strong>: 2.0 (Updated to reflect localStorage implementation)
                  </p>
                </div>
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
