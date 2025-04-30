import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const EmergencyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Emergency Contraception', url: '/contraception/emergency' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Emergency Contraception</h1>
          <p className="text-xl font-medium">
            Emergency contraception options available in Nigeria, how they work, and where to get them
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About emergency contraception in Nigeria</h2>
              <p className="mb-4">
                Emergency contraception (EC) refers to methods of contraception that can be used to prevent pregnancy after unprotected sexual intercourse, contraceptive failure, or sexual assault. It is not intended for regular use but serves as a backup method.
              </p>
              <p className="mb-4">
                In Nigeria, emergency contraception is becoming increasingly available, particularly in urban areas. However, awareness, accessibility, and affordability remain challenges in many parts of the country, especially in rural areas.
              </p>
              <p className="mb-4">
                The Nigerian National Reproductive Health Policy supports the provision of emergency contraception as part of comprehensive family planning services. Several international and local NGOs also work to increase access to emergency contraception across Nigeria.
              </p>
              <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500 mt-6">
                <div className="flex">
                  <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="font-bold">Important note</h4>
                    <p>Emergency contraception prevents pregnancy. It does not cause abortion and will not work if you are already pregnant. It also does not protect against sexually transmitted infections (STIs).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Types of emergency contraception available in Nigeria</h3>

              <div className="mb-8">
                <h4 className="font-bold mb-3 text-lg">Emergency contraceptive pills (ECPs)</h4>
                <p className="mb-4">
                  Also known as the "morning-after pill," emergency contraceptive pills are the most common form of emergency contraception in Nigeria. They work primarily by preventing or delaying ovulation, so that sperm cannot meet an egg.
                </p>
                <p className="mb-4">
                  There are two main types available in Nigeria:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-bold mb-2">Levonorgestrel pills (LNG ECPs)</h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The most commonly available type in Nigeria</li>
                      <li>Brands include Postinor-2, Pregnon, Levofem, and Lydia</li>
                      <li>Taken as a single dose (1.5mg) or two doses (0.75mg 12 hours apart)</li>
                      <li>Most effective when taken within 72 hours (3 days) of unprotected sex</li>
                      <li>Available over-the-counter in many pharmacies</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-bold mb-2">Ulipristal acetate (UPA ECPs)</h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Less commonly available in Nigeria</li>
                      <li>Taken as a single 30mg dose</li>
                      <li>Effective up to 120 hours (5 days) after unprotected sex</li>
                      <li>Can be more effective than LNG ECPs, especially when taken 3-5 days after sex</li>
                      <li>Usually requires prescription and may be more expensive</li>
                    </ul>
                  </div>
                </div>
                <p>
                  The price of emergency contraceptive pills in Nigeria typically ranges from ₦500 to ₦2,500 depending on the brand, type, and where they are purchased.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-3 text-lg">Emergency IUD (Intrauterine Device)</h4>
                <p className="mb-4">
                  The copper IUD is the most effective form of emergency contraception when inserted within 5 days of unprotected sex. It works primarily by preventing fertilization.
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Over 99% effective as emergency contraception</li>
                  <li>Can provide ongoing contraception for up to 10-12 years</li>
                  <li>Suitable for most women, though a medical assessment is needed</li>
                  <li>Must be inserted by a trained healthcare provider</li>
                  <li>Less commonly used for emergency contraception in Nigeria due to limited availability of skilled providers and facilities</li>
                </ul>
                <p>
                  In Nigeria, emergency IUD insertion typically costs between ₦3,000 and ₦15,000, depending on the facility and whether it's a public or private service.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How emergency contraception works</h3>
              <p className="mb-4">
                Emergency contraception works primarily by preventing or delaying ovulation, which is the release of an egg from the ovary. If no egg is released, there is nothing for sperm to fertilize, and pregnancy cannot occur.
              </p>
              <p className="mb-4">
                Emergency contraceptive methods may also work by:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Thickening cervical mucus to prevent sperm from reaching an egg</li>
                <li>Altering the transport of sperm or egg through the fallopian tubes</li>
                <li>In the case of the copper IUD, creating an environment that is toxic to sperm</li>
              </ul>
              <p className="mb-4">
                Emergency contraception does not cause abortion. It won't work if you're already pregnant and won't harm an existing pregnancy.
              </p>
              <p>
                The effectiveness of emergency contraception decreases the longer you wait after unprotected sex. It's important to use it as soon as possible for maximum effectiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">When to use emergency contraception</h3>
                <p className="mb-4">
                  You might need emergency contraception if:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You had sex without using contraception</li>
                  <li>Your contraceptive method failed (e.g., condom broke or slipped off)</li>
                  <li>You missed contraceptive pills</li>
                  <li>You were late getting your contraceptive injection</li>
                  <li>You were forced to have unprotected sex</li>
                  <li>You vomited within 2 hours of taking a regular contraceptive pill</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Effectiveness of emergency contraception</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Copper IUD:</strong> More than 99% effective when inserted within 5 days of unprotected sex</li>
                  <li><strong>Ulipristal acetate (UPA):</strong> About 98% effective when taken within 5 days</li>
                  <li><strong>Levonorgestrel pills:</strong> About 95% effective when taken within 24 hours, 88% within 72 hours</li>
                </ul>
                <p className="mt-4">
                  Effectiveness decreases over time, so it's important to use emergency contraception as soon as possible after unprotected sex.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Where to get emergency contraception in Nigeria</h3>
              <p className="mb-4">
                In Nigeria, emergency contraception can be obtained from various sources:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Emergency contraceptive pills</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pharmacies and drugstores (usually without prescription)</li>
                    <li>Patent medicine vendors (in some areas)</li>
                    <li>Government health centers and hospitals</li>
                    <li>Private hospitals and clinics</li>
                    <li>Family planning clinics</li>
                    <li>NGO-operated health facilities</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Emergency IUD</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Government hospitals with family planning services</li>
                    <li>Private hospitals and clinics with trained providers</li>
                    <li>Family planning clinics (e.g., Planned Parenthood Federation of Nigeria)</li>
                    <li>Specialized reproductive health centers</li>
                    <li>Some primary healthcare centers with trained staff</li>
                  </ul>
                </div>
              </div>
              <p className="mb-4">
                In major Nigerian cities like Lagos, Abuja, Port Harcourt, and Kano, access to emergency contraception is generally better than in rural areas. Organizations like Society for Family Health and DKT International have worked to improve distribution networks across the country.
              </p>
              <p>
                Some healthcare providers may have personal beliefs that lead them to refuse providing emergency contraception. If this happens, you have the right to seek services elsewhere.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about emergency contraception in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Is emergency contraception the same as abortion?</h4>
                <p>
                  No. Emergency contraception prevents pregnancy from occurring in the first place by delaying or preventing ovulation. It does not terminate an established pregnancy. If you are already pregnant, emergency contraception will not affect the pregnancy.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">How often can I use emergency contraception?</h4>
                <p>
                  Emergency contraception is safe to use whenever needed, but it is not recommended as a regular method of contraception. It is less effective than regular contraceptive methods and does not protect against sexually transmitted infections. If you find yourself frequently using emergency contraception, consider speaking with a healthcare provider about regular contraceptive options that might be more suitable for you.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">What are the side effects of emergency contraceptive pills?</h4>
                <p>
                  Side effects are usually mild and temporary. They may include nausea, headache, fatigue, abdominal pain, and irregular bleeding. Some women experience changes in their next menstrual period, which may come earlier or later than expected. If you vomit within 2-3 hours of taking an emergency contraceptive pill, you should contact a healthcare provider as you may need to take another dose.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Do I need a prescription to get emergency contraceptive pills in Nigeria?</h4>
                <p>
                  Technically, emergency contraceptive pills are classified as over-the-counter medications in Nigeria, meaning they should be available without a prescription. In practice, most pharmacies and drugstores sell them without requiring a prescription. However, some pharmacists may ask questions or refuse to provide them based on personal beliefs. If this happens, you can try another pharmacy.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can teenagers access emergency contraception in Nigeria?</h4>
                <p>
                  There is no legal age restriction for accessing emergency contraception in Nigeria. However, in practice, young people may face judgment or refusal from healthcare providers or pharmacists. Youth-friendly services are available at some NGO facilities and specialized clinics. Organizations like Education as a Vaccine (EVA) and the Society for Family Health often provide more accessible services for young people.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About emergency contraception</a>
                </li>
                <li>
                  <a href="#types" className="text-[#00a499] hover:underline">Types available in Nigeria</a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[#00a499] hover:underline">How it works</a>
                </li>
                <li>
                  <a href="#when-to-use" className="text-[#00a499] hover:underline">When to use it</a>
                </li>
                <li>
                  <a href="#effectiveness" className="text-[#00a499] hover:underline">Effectiveness</a>
                </li>
                <li>
                  <a href="#where-to-get" className="text-[#00a499] hover:underline">Where to get it</a>
                </li>
                <li>
                  <a href="#questions" className="text-[#00a499] hover:underline">Common questions</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Emergency contraception timeline</h3>
              <div className="relative pl-8 pb-4 border-l-2 border-teal-200">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-teal-500"></div>
                <div className="font-bold">Immediately after sex</div>
                <p className="text-sm">Best time to take emergency contraception</p>
              </div>
              <div className="relative pl-8 pb-4 border-l-2 border-teal-200">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-teal-400"></div>
                <div className="font-bold">Within 24 hours</div>
                <p className="text-sm">EC pills are about 95% effective</p>
              </div>
              <div className="relative pl-8 pb-4 border-l-2 border-teal-200">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-teal-300"></div>
                <div className="font-bold">Within 72 hours (3 days)</div>
                <p className="text-sm">LNG pills are about 88% effective</p>
              </div>
              <div className="relative pl-8 pb-4 border-l-2 border-teal-200">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-teal-200"></div>
                <div className="font-bold">Within 120 hours (5 days)</div>
                <p className="text-sm">Ulipristal acetate and copper IUD still effective</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gray-400"></div>
                <div className="font-bold">After 5 days</div>
                <p className="text-sm">Emergency contraception no longer effective</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Key facts</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Not the same as abortion</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Most effective when taken quickly</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Available in pharmacies in Nigeria</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Safe to use when needed</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Doesn't protect against STIs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                If you need emergency contraception or have questions, contact a healthcare provider as soon as possible.
              </p>
              <Link
                to="/find-a-family-planning-clinic"
                className="bg-[#00a499] text-white px-4 py-2 rounded-md hover:bg-[#008c82] transition-colors inline-block w-full text-center mb-2"
              >
                Find a clinic near you
              </Link>
              <a
                href="tel:08008008001"
                className="border border-[#00a499] text-[#00a499] px-4 py-2 rounded-md hover:bg-[#e6f7f6] transition-colors inline-block w-full text-center"
              >
                Call the health helpline
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
