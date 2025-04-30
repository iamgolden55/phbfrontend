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
