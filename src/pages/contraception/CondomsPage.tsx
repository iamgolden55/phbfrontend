import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const CondomsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Condoms', url: '/contraception/condoms' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Condoms</h1>
          <p className="text-xl font-medium">
            Male and female condoms, how they work, and how effective they are in preventing pregnancy and STIs
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About condoms in Nigeria</h2>
              <p className="mb-4">
                Condoms are one of the most widely available and accessible forms of contraception in Nigeria. They are the only contraceptive method that also protects against sexually transmitted infections (STIs), including HIV, which remains a significant public health concern in Nigeria.
              </p>
              <p className="mb-4">
                Both male and female condoms are available in Nigeria, though male condoms are more common and widely distributed. Public health campaigns have promoted condom use across the country as part of HIV prevention efforts.
              </p>
              <p className="mb-4">
                Despite their availability, condom use in Nigeria is influenced by various factors including religious beliefs, cultural norms, gender dynamics, and misconceptions about their use and effectiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Male condoms</h3>
                <p className="mb-4">
                  Male condoms are thin sheaths made of latex, polyurethane, or natural materials that are rolled onto an erect penis before sexual intercourse. They work by creating a barrier that prevents sperm from entering the vagina.
                </p>
                <h4 className="font-bold mb-2">How to use a male condom:</h4>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li>Check the expiration date and make sure the package is intact</li>
                  <li>Carefully open the package without damaging the condom</li>
                  <li>Make sure the condom is the right way up (like a hat, not a cup)</li>
                  <li>Pinch the tip of the condom to remove air and leave space for semen</li>
                  <li>Roll the condom all the way down to the base of the erect penis</li>
                  <li>After ejaculation, hold the condom at the base while withdrawing</li>
                  <li>Remove the condom carefully and dispose of it properly</li>
                </ol>
                <p className="mb-4">
                  When used correctly every time, male condoms are about 98% effective at preventing pregnancy. However, with typical use, they are about 85% effective.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Female condoms</h3>
                <p className="mb-4">
                  Female condoms are pouches made of nitrile or polyurethane that are inserted into the vagina before sexual intercourse. They line the vagina and prevent sperm from entering the uterus.
                </p>
                <h4 className="font-bold mb-2">How to use a female condom:</h4>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li>Check the expiration date and make sure the package is intact</li>
                  <li>Find a comfortable position to insert the condom</li>
                  <li>Squeeze the inner ring at the closed end of the condom</li>
                  <li>Insert the condom as far as it will go, making sure it's not twisted</li>
                  <li>Make sure the outer ring covers the external genitalia</li>
                  <li>Guide the penis into the condom during intercourse</li>
                  <li>After intercourse, twist the outer ring to seal in fluids before removing</li>
                  <li>Gently pull the condom out and dispose of it properly</li>
                </ol>
                <p className="mb-4">
                  When used correctly every time, female condoms are about 95% effective at preventing pregnancy. With typical use, they are about 79% effective.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Advantages of condoms in Nigeria</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Widely available in pharmacies, health centers, and markets across Nigeria</li>
                <li>Relatively affordable compared to other contraceptive methods</li>
                <li>No prescription required</li>
                <li>Protects against both pregnancy and STIs, including HIV</li>
                <li>No hormonal side effects</li>
                <li>Can be used alongside other contraceptive methods for extra protection</li>
                <li>Many varieties available (different sizes, textures, flavors, etc.)</li>
                <li>Some organizations distribute condoms for free as part of public health campaigns</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Disadvantages and considerations</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Must be used correctly every time for maximum effectiveness</li>
                <li>Some people may have latex allergies (alternative materials are available)</li>
                <li>Requires partner cooperation</li>
                <li>Cultural and religious barriers may affect usage in some communities</li>
                <li>May reduce sensation for some people</li>
                <li>Must be stored properly to prevent damage (away from heat and direct sunlight)</li>
                <li>Quality varies between brands (look for NAFDAC-approved products in Nigeria)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about condoms in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Where can I get condoms in Nigeria?</h4>
                <p>
                  Condoms are widely available at pharmacies, patent medicine stores, supermarkets, health centers, family planning clinics, and from community health workers. Organizations like Society for Family Health also distribute condoms through various outlets. In major cities, condom dispensers may be available in some public spaces and entertainment venues.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Are condoms expensive in Nigeria?</h4>
                <p>
                  Condoms vary in price, with some brands being more affordable than others. A pack of three condoms typically costs between ₦100-₦500, depending on the brand and type. Many health facilities and NGOs provide condoms for free as part of HIV prevention and family planning programs.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Do condoms really protect against HIV and other STIs?</h4>
                <p>
                  Yes, when used correctly and consistently, condoms are highly effective at preventing the transmission of HIV and many other STIs. They create a barrier that prevents the exchange of body fluids that can contain infectious agents. However, they must be used properly every time to provide protection.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can condoms break or slip off?</h4>
                <p>
                  Yes, condoms can break or slip off if they are not used correctly, are past their expiration date, have been stored improperly, or if oil-based lubricants are used with latex condoms. To minimize these risks, always check the expiration date, store condoms in a cool, dry place, use water-based lubricants with latex condoms, and make sure to use the correct size.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Is it true that using two condoms is better than one?</h4>
                <p>
                  No, using two condoms at the same time (either two male condoms or a male and female condom together) actually increases the risk of breakage due to friction between the condoms. Always use just one condom at a time.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About condoms in Nigeria</a>
                </li>
                <li>
                  <a href="#male-condoms" className="text-[#00a499] hover:underline">Male condoms</a>
                </li>
                <li>
                  <a href="#female-condoms" className="text-[#00a499] hover:underline">Female condoms</a>
                </li>
                <li>
                  <a href="#advantages" className="text-[#00a499] hover:underline">Advantages</a>
                </li>
                <li>
                  <a href="#disadvantages" className="text-[#00a499] hover:underline">Disadvantages</a>
                </li>
                <li>
                  <a href="#questions" className="text-[#00a499] hover:underline">Common questions</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Key facts</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>98% effective when used perfectly</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Protects against STIs including HIV</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Widely available in Nigeria</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No prescription needed</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No hormonal side effects</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                Talk to a healthcare provider if you have questions about condoms or need advice on contraception options in Nigeria.
              </p>
              <Link
                to="/find-a-family-planning-clinic"
                className="bg-[#00a499] text-white px-4 py-2 rounded-md hover:bg-[#008c82] transition-colors inline-block w-full text-center"
              >
                Find a clinic near you
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CondomsPage;
