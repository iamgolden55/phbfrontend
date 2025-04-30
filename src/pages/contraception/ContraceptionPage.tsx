import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ContraceptionPage: React.FC = () => {
  const contraceptionTypes = [
    {
      id: 'condoms',
      title: 'Condoms',
      description: 'Male and female condoms, how they work, and how effective they are',
      path: '/contraception/condoms',
      effectivenessRate: '98%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'combined-pill',
      title: 'Combined pill',
      description: 'The combined contraceptive pill, how it works, and how to take it',
      path: '/contraception/combined-pill',
      effectivenessRate: '99%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 8.708M5.3 11c.775-.616 2.375-1.5 3.7-1.5" />
        </svg>
      )
    },
    {
      id: 'progesterone-pill',
      title: 'Progesterone-only pill',
      description: 'The mini pill, how it works, and how to take it',
      path: '/contraception/progesterone-only-pill',
      effectivenessRate: '99%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'implant',
      title: 'Contraceptive implant',
      description: 'The implant, how it works, and how it\'s fitted and removed',
      path: '/contraception/implant',
      effectivenessRate: '99.9%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      )
    },
    {
      id: 'injection',
      title: 'Contraceptive injection',
      description: 'The injection, how it works, and how often you need it',
      path: '/contraception/injection',
      effectivenessRate: '99%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      )
    },
    {
      id: 'iud',
      title: 'Intrauterine device (IUD)',
      description: 'The IUD (copper coil), how it works, and how it\'s fitted and removed',
      path: '/contraception/iud',
      effectivenessRate: '99.9%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'natural-methods',
      title: 'Natural family planning',
      description: 'Calendar methods, fertility awareness, and traditional spacing techniques',
      path: '/contraception/natural-methods',
      effectivenessRate: '76-88%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'emergency',
      title: 'Emergency contraception',
      description: 'The morning after pill and IUD, how they work, and how to get them in Nigeria',
      path: '/contraception/emergency',
      effectivenessRate: '95-99%',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Contraception in Nigeria</h1>
          <p className="text-xl font-medium">
            Information about different types of contraception available in Nigeria, including how they work and where to access them
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-4">About contraception in Nigeria</h2>
          <p className="mb-4">
            Nigeria has one of the highest fertility rates in the world, with an average of 5.3 children per woman. Family planning and contraception play a critical role in improving maternal and child health outcomes across the country.
          </p>
          <p className="mb-4">
            Modern contraceptive methods are available through various healthcare facilities in Nigeria, although access and availability may vary by region. The Nigerian government, in partnership with international organizations, has been working to improve access to family planning services nationwide.
          </p>
          <p className="mb-4">
            Cultural and religious factors may influence contraceptive choices in different parts of Nigeria. This information aims to provide factual, unbiased guidance to help individuals make informed decisions about family planning methods appropriate for their circumstances.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Types of contraception</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contraceptionTypes.map((type) => (
              <Link key={type.id} to={type.path} className="block group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-teal-300 h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0">
                        {type.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-[#00a499] mb-2 group-hover:underline">{type.title}</h3>
                        <p className="text-gray-600">{type.description}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 flex justify-between items-center">
                      <span className="text-gray-700 font-semibold flex items-center">
                        Effectiveness: {type.effectivenessRate}
                      </span>
                      <span className="text-[#00a499] font-medium flex items-center">
                        Read more
                        <svg className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-[#f0f7f7] p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Finding the right contraception for you</h2>
              <p className="mb-4">
                When choosing contraception in Nigeria, consider:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>How effective it is</li>
                <li>Availability and accessibility in your area</li>
                <li>Cost and affordability</li>
                <li>Cultural and religious considerations</li>
                <li>Your health status and any pre-existing conditions</li>
                <li>Whether you need protection against STIs</li>
                <li>Potential side effects</li>
                <li>Your future plans for having children</li>
              </ul>
              <p className="mb-4">
                You can talk to a healthcare provider at primary healthcare centers, maternal health clinics, or family planning clinics about which contraception might be best for you. They can help you weigh up the pros and cons of different methods available in Nigeria.
              </p>
              <div className="mt-6">
                <Link
                  to="/find-contraception-services"
                  className="bg-[#00a499] text-white px-6 py-2 rounded-md hover:bg-[#008c82] transition-colors inline-block"
                >
                  Find family planning services near you
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Which contraception is most effective?</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Implant</span>
                  <span className="font-bold">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#00a499] h-2.5 rounded-full" style={{ width: "99.9%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>IUS/IUD</span>
                  <span className="font-bold">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#00a499] h-2.5 rounded-full" style={{ width: "99.9%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Injectable</span>
                  <span className="font-bold">99%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#00a499] h-2.5 rounded-full" style={{ width: "99%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pills</span>
                  <span className="font-bold">99%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#00a499] h-2.5 rounded-full" style={{ width: "99%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Condoms</span>
                  <span className="font-bold">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#00a499] h-2.5 rounded-full" style={{ width: "98%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Natural methods</span>
                  <span className="font-bold">76-88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#00a499] h-2.5 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * Effectiveness rates are based on perfect use. Actual effectiveness may be lower depending on how the contraception is used.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Contraception services in Nigeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Where to get contraception</h3>
              <p className="mb-4">
                In Nigeria, you can access contraception from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Government hospitals and primary healthcare centers</li>
                <li>Family planning clinics</li>
                <li>Maternal and child health clinics</li>
                <li>Private hospitals and clinics</li>
                <li>NGO-operated healthcare facilities</li>
                <li>Pharmacies and Patent Medicine Vendors (for some methods)</li>
                <li>Community-based distributors in rural areas</li>
              </ul>
              <p className="mb-4">
                Many family planning services in public health facilities are subsidized or free, supported by the Nigerian government and partner organizations.
              </p>
              <div className="mt-6">
                <Link
                  to="/find-a-family-planning-clinic"
                  className="inline-flex items-center text-[#00a499] font-medium hover:underline"
                >
                  Find a family planning clinic
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Talk to someone about contraception</h3>
              <p className="mb-4">
                If you have questions about contraception or need advice in Nigeria, you can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Visit a local primary healthcare center</li>
                <li>Speak with a community health worker</li>
                <li>Call the Nigeria Family Planning Helpline on 0800-MYFAMILY (0800-6932645)</li>
                <li>Visit an NGO that provides reproductive health services (e.g., Society for Family Health, Planned Parenthood Federation of Nigeria)</li>
                <li>Use our online contraception chat service</li>
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center text-[#00a499] font-medium hover:underline"
                >
                  Chat online with a healthcare professional
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold mb-2">What about STIs?</h3>
                <p className="mb-4">
                  Most types of contraception don't protect against sexually transmitted infections (STIs). Condoms are the only form of contraception that protects against both pregnancy and STIs. HIV and other STIs remain significant public health concerns in Nigeria.
                </p>
                <Link
                  to="/sexual-health/stis"
                  className="text-[#00a499] font-medium hover:underline inline-flex items-center"
                >
                  Learn more about STIs and protection in Nigeria
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* New cycle tracker promotion section */}
        <div className="mt-10 bg-blue-50 rounded-lg p-10 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-[#00a499]">Track Your Cycle with Our Natural Family Planning Tool</h2>
              <p className="mb-4 text-lg">
                Our mobile-friendly cycle tracker helps you monitor your fertility patterns for natural family planning. Track your periods, cervical mucus changes, and basal body temperature to identify your fertile window.
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Identify your fertile and infertile days</li>
                <li>Track multiple fertility signs for greater accuracy</li>
                <li>Get predictions based on your personal cycle data</li>
                <li>Private and secure - your data stays on your device</li>
              </ul>
              <Link
                to="/contraception/cycle-tracker"
                className="bg-[#00a499] text-white px-6 py-3 rounded-md hover:bg-[#008c82] transition-colors inline-flex items-center text-lg"
              >
                Start Tracking Your Cycle
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="hidden md:block">
              <svg className="w-full max-w-xs mx-auto" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="256" cy="256" r="248" fill="#e0f2f1" stroke="#00a499" strokeWidth="16"/>
                <path d="M256 120V256L350 350" stroke="#00a499" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="256" cy="256" r="32" fill="#00a499"/>
                <path d="M120 256H140M372 256H392M256 120V140M256 372V392" stroke="#00a499" strokeWidth="12" strokeLinecap="round"/>
                <path d="M169 169L183 183M329 169L315 183M169 343L183 329M329 343L315 329" stroke="#00a499" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContraceptionPage;
