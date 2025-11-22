import React from 'react';

const ElaraAIPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-[#0891b2] text-white relative pb-0 overflow-hidden">
        <div className="phb-container py-8 md:py-16">
          <div className="max-w-4xl z-10 relative">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Elara AI
            </h1>
            <p className="text-xl md:text-2xl font-light">
              The intelligent healthcare assistant powering the Public Health Bureau
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-1/2 overflow-hidden hidden md:block">
          <img
            src="https://www.shutterstock.com/image-photo/medical-technology-doctor-use-ai-600nw-2304284475.jpg"
            alt="Doctor using Elara AI healthcare technology"
            className="object-cover h-full w-full object-left"
          />
        </div>
      </section>

      {/* Main content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar for navigation */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-bold mb-3 text-[#0891b2]">On this page</h2>
              <nav className="flex flex-col space-y-2">
                <a href="#introduction" className="hover:underline text-[#0891b2]">Introduction</a>
                <a href="#capabilities" className="hover:underline text-[#0891b2]">Capabilities</a>
                <a href="#benefits" className="hover:underline text-[#0891b2]">Benefits</a>
                <a href="#limitations" className="hover:underline text-[#0891b2]">Limitations & Ethics</a>
                <a href="#use-cases" className="hover:underline text-[#0891b2]">Use Cases</a>
                <a href="#technology" className="hover:underline text-[#0891b2]">Technology</a>
                <a href="#integrations" className="hover:underline text-[#0891b2]">Integrations</a>
                <a href="#future" className="hover:underline text-[#0891b2]">Future Development</a>
              </nav>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-[#0891b2]">Try Elara AI</h3>
              <p className="mb-4 text-sm">Experience the power of AI-driven healthcare with a demo of Elara.</p>
              <a href="/register" className="bg-[#0891b2] text-white px-4 py-2 rounded inline-block hover:bg-[#0e7490]">Request demo</a>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:col-span-2">
            <section id="introduction" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Meet Elara AI</h2>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#0891b2] mb-6">
                <p className="italic text-lg">
                  "Elara is not just a healthcare tool – it's a healthcare revolution."
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-2/3">
                  <p className="mb-4">
                    Welcome to the future of healthcare tools, designed to streamline operations, enhance accuracy, and empower professionals.
                    Elara, the AI behind PHB (Public Health Bureau), is equipped with cutting-edge technologies to assist medical professionals
                    in providing the best care possible.
                  </p>
                  <p className="mb-4">
                    Born from the need to make healthcare more efficient and accessible, Elara represents the convergence of advanced
                    artificial intelligence with medical expertise. Our system continuously learns from interactions with healthcare
                    professionals, keeping up with the latest medical research and best practices.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <img
                    src="https://www.shutterstock.com/image-vector/futuristic-healthcare-ai-concept-background-260nw-2544949177.jpg"
                    alt="Elara AI concept visualization"
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </section>

            <section id="capabilities" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Capabilities of Elara</h2>

              <p className="mb-6">
                Elara is a versatile AI system that serves as a valuable assistant in medical practice.
                Its key functionalities are designed to enhance the healthcare experience for both professionals and patients.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-3">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0891b2" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl">Diagnostics Assistance</h3>
                  </div>
                  <p>
                    Elara analyzes patient symptoms, medical history, and lab results to provide diagnostic suggestions,
                    helping professionals save time by offering data-driven insights and potential diagnoses for review.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-3">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0891b2" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl">Predictive Analytics</h3>
                  </div>
                  <p>
                    Elara leverages advanced machine learning to forecast health trends, identify risk factors,
                    and suggest preventive measures tailored to individual patients.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-3">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0891b2" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl">Administrative Automation</h3>
                  </div>
                  <p>
                    Elara streamlines administrative tasks, such as appointment scheduling, patient record management,
                    and generating medical reports, allowing professionals to focus on patient care.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-3">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0891b2" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl">24/7 Patient Support</h3>
                  </div>
                  <p>
                    Elara bridges the gap between healthcare providers and patients by answering queries,
                    providing follow-up reminders, and guiding patients in emergencies.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-lg">
                <div className="md:w-1/3">
                  <img
                    src="https://thumbs.dreamstime.com/b/healthcare-monitoring-system-modern-hospital-medical-technology-clean-environment-wide-angle-digital-health-innovation-showcasing-348069679.jpg"
                    alt="Healthcare monitoring system"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-bold text-xl mb-3">Telemedicine Integration</h3>
                  <p className="mb-3">
                    Elara facilitates seamless virtual consultations by preparing pre-appointment summaries
                    and assisting in post-consultation record updates.
                  </p>
                  <p>
                    Our system integrates with major telemedicine platforms to enable efficient remote healthcare delivery,
                    ensuring patients receive timely care regardless of their location.
                  </p>
                </div>
              </div>
            </section>

            <section id="benefits" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Benefits</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">For Healthcare Providers</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Time Savings:</strong> Reduce administrative work by up to 40%, allowing more focus on patient care</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Enhanced Accuracy:</strong> Access to AI-powered diagnostic suggestions reduces potential for oversight</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Data-Driven Insights:</strong> Make informed decisions based on comprehensive patient analytics</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Expanded Reach:</strong> Serve more patients through efficient telemedicine integration</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Continuous Learning:</strong> Access to a system that stays current with medical advances</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">For Patients</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>24/7 Support:</strong> Get answers to health questions anytime, anywhere</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Personalized Care:</strong> Receive recommendations tailored to your health profile</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Remote Access:</strong> Connect with healthcare providers from the comfort of home</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Improved Health Literacy:</strong> Better understand your health conditions and treatment options</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-5 h-5 mr-2 flex-shrink-0 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Proactive Health Management:</strong> Stay ahead of potential health issues with preventive recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-[#0891b2]">For Healthcare Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <span className="text-3xl font-bold text-[#0891b2] block mb-2">30%</span>
                    <span className="text-sm">Reduction in administrative costs</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <span className="text-3xl font-bold text-[#0891b2] block mb-2">25%</span>
                    <span className="text-sm">Increase in patient satisfaction</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <span className="text-3xl font-bold text-[#0891b2] block mb-2">20%</span>
                    <span className="text-sm">More patients served on average</span>
                  </div>
                </div>
                <p>
                  Healthcare organizations implementing Elara AI report significant improvements in operational efficiency,
                  resource allocation, and overall patient care quality. The system's ability to handle routine tasks autonomously
                  allows healthcare providers to maximize their impact where it matters most.
                </p>
              </div>
            </section>

            <section id="limitations" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0891b2] mb-4">Limitations & Ethics</h2>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100 mb-6">
                <h4 className="font-bold text-lg mb-2">Important Note: Elara's Role and Limitations</h4>
                <p className="mb-4">
                  While Elara is designed to enhance your workflow and provide valuable assistance, it is important to remember:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Elara is a Support Tool, Not a Substitute:</strong> Elara is here to assist, not replace, healthcare professionals.
                    All diagnoses and recommendations should be carefully reviewed before making clinical decisions.
                  </li>
                  <li>
                    <strong>Elara May Occasionally Make Mistakes:</strong> As advanced as Elara is, it is not immune to errors.
                    AI systems rely on data, and there can be gaps or inconsistencies. We encourage all professionals to verify
                    the insights and consult with peers when needed.
                  </li>
                </ul>
              </div>

              <p className="mb-4">
                At PHB, we're committed to developing AI that adheres to the highest ethical standards. Our approach includes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold mb-2">Transparency</h4>
                  <p className="text-sm">
                    We're open about how Elara works, what data it uses, and the limitations of its capabilities.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold mb-2">Privacy</h4>
                  <p className="text-sm">
                    Patient data security and privacy are paramount in our system design and operation.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold mb-2">Human Oversight</h4>
                  <p className="text-sm">
                    All critical decisions suggested by Elara require human verification and approval.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold mb-2">Continuous Improvement</h4>
                  <p className="text-sm">
                    We regularly audit and update our systems to address biases and improve accuracy.
                  </p>
                </div>
              </div>
            </section>

            {/* More sections to be added */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElaraAIPage;
