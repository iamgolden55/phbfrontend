import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const CombinedPillPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Combined Pill', url: '/contraception/combined-pill' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Combined Contraceptive Pill</h1>
          <p className="text-xl font-medium">
            How the combined pill works, its effectiveness, and availability in Nigeria
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About the combined pill in Nigeria</h2>
              <p className="mb-4">
                The combined oral contraceptive pill, commonly known as "the pill," contains two hormones: estrogen and progestogen. It is one of the most effective methods of contraception when used correctly.
              </p>
              <p className="mb-4">
                In Nigeria, the combined pill is available through family planning clinics, hospitals, and some pharmacies. However, its availability and accessibility vary across different regions, with urban areas generally having better access than rural communities.
              </p>
              <p className="mb-4">
                While the combined pill is an effective contraceptive option, cultural, religious, and social factors may influence its acceptance and use in Nigeria. Additionally, there are sometimes misconceptions about hormonal contraceptives that may affect women's decisions to use them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How the combined pill works</h3>
              <p className="mb-4">
                The combined pill works in three main ways to prevent pregnancy:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Prevents ovulation:</strong> The hormones in the pill stop your ovaries from releasing an egg each month.</li>
                <li><strong>Thickens cervical mucus:</strong> This makes it difficult for sperm to reach an egg if ovulation does occur.</li>
                <li><strong>Thins the lining of the womb:</strong> This makes it less likely for a fertilized egg to implant and develop.</li>
              </ul>
              <p className="mb-4">
                When taken correctly, the combined pill is more than 99% effective at preventing pregnancy. This means that fewer than 1 in 100 women who use the combined pill perfectly will get pregnant in a year.
              </p>
              <p>
                However, with typical use (taking into account human error), it's about 91% effective, which means about 9 in 100 women using the pill may get pregnant in a year.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How to take the combined pill</h3>
              <p className="mb-4">
                The combined pill usually comes in a pack of 21 or 28 pills. The way you take it depends on the type of pill you're using:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>21-day pills:</strong> Take one pill daily for 21 days, followed by a 7-day break when you'll have your period (withdrawal bleed). Start a new pack after the 7-day break, even if you're still bleeding.</li>
                <li><strong>28-day pills:</strong> Take one pill daily for 28 days with no break between packs. The last 7 pills in the pack are usually inactive (placebo pills) during which time you'll have your period.</li>
              </ul>
              <p className="mb-4">
                For the pill to be most effective, you should:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Take the pill at the same time every day</li>
                <li>Start a new pack on time</li>
                <li>Follow the instructions if you miss a pill or have severe vomiting or diarrhea</li>
              </ul>
              <p>
                In hot climates like Nigeria's, it's important to store your pills in a cool, dry place (but not in the refrigerator) to maintain their effectiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Advantages</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Very effective when taken correctly</li>
                  <li>Doesn't interrupt sex</li>
                  <li>Usually makes periods regular, lighter, and less painful</li>
                  <li>May help with premenstrual symptoms</li>
                  <li>Reduces the risk of ovarian, uterine, and colorectal cancers</li>
                  <li>May reduce acne</li>
                  <li>Can be used to skip periods if needed</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Disadvantages</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Must be taken every day at the same time</li>
                  <li>Can cause temporary side effects such as headaches, nausea, breast tenderness, and mood changes</li>
                  <li>Can increase blood pressure in some women</li>
                  <li>Doesn't protect against STIs</li>
                  <li>Not suitable for women over 35 who smoke or have certain medical conditions</li>
                  <li>May require regular visits to health facilities for resupply</li>
                  <li>In Nigeria, may not be consistently available in all areas</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Availability in Nigeria</h3>
              <p className="mb-4">
                In Nigeria, the combined pill is available through:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Government hospitals and health centers:</strong> Often provide pills at subsidized rates or free as part of family planning programs</li>
                <li><strong>Private hospitals and clinics:</strong> May charge higher fees but often have more regular stock</li>
                <li><strong>Family planning clinics:</strong> Run by organizations like Planned Parenthood Federation of Nigeria and Society for Family Health</li>
                <li><strong>Pharmacies:</strong> Require a prescription in some cases, but may sell over-the-counter in others</li>
                <li><strong>NGO-operated healthcare facilities:</strong> Often provide contraceptives at subsidized rates</li>
              </ul>
              <p className="mb-4">
                Common brands available in Nigeria include Microgynon, Combination 3, Duofem, and Desogen. Prices vary but generally range from ₦300-₦1,500 per month's supply, depending on the brand and where you purchase it.
              </p>
              <p>
                Many women in Nigeria face challenges accessing the combined pill due to factors such as geographical location, cost, stockouts at public facilities, and social stigma related to contraceptive use. Additionally, consistent power supply issues can affect the storage conditions of medications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about the combined pill in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Do I need a prescription to get the combined pill in Nigeria?</h4>
                <p>
                  In theory, the combined pill requires a prescription, but in practice, many pharmacies in Nigeria may sell it without one. However, it's important to have a health check before starting the pill to make sure it's suitable for you. At government health centers and family planning clinics, healthcare providers will assess your suitability before providing the pill.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can the combined pill make me infertile?</h4>
                <p>
                  No, the combined pill does not cause infertility. After stopping the pill, your fertility returns to normal, although it might take a few months for your periods to become regular again. Many women in Nigeria are able to conceive soon after stopping the pill.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Does the pill protect against STIs?</h4>
                <p>
                  No, the combined pill does not protect against sexually transmitted infections (STIs), including HIV. If you need protection from STIs, use condoms alongside the pill.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">What if I miss a pill?</h4>
                <p>
                  If you miss one pill, take it as soon as you remember, even if it means taking two pills in one day, then continue with your regular schedule. If you miss two or more pills, or are more than 24 hours late taking your pill, you may not be protected against pregnancy. Take the last pill you missed immediately and continue taking the rest of the pack as normal, but use additional contraception (like condoms) for the next 7 days. If these 7 days run beyond the end of your current pill pack, start the next pack without a break.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Will the pill still work in Nigeria's hot climate?</h4>
                <p>
                  The effectiveness of the pill can be affected by very high temperatures. In Nigeria's hot climate, it's important to store your pills in a cool, dry place away from direct sunlight. However, don't store them in the refrigerator as excessive cold can also affect them. Most pills are stable at room temperature up to about 30°C (86°F). If your pills have been exposed to extreme heat or appear changed in any way (melted, discolored), consult a healthcare provider before using them.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About the combined pill</a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[#00a499] hover:underline">How it works</a>
                </li>
                <li>
                  <a href="#how-to-take" className="text-[#00a499] hover:underline">How to take it</a>
                </li>
                <li>
                  <a href="#advantages" className="text-[#00a499] hover:underline">Advantages</a>
                </li>
                <li>
                  <a href="#disadvantages" className="text-[#00a499] hover:underline">Disadvantages</a>
                </li>
                <li>
                  <a href="#availability" className="text-[#00a499] hover:underline">Availability in Nigeria</a>
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
                  <span>99% effective when used perfectly</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Take at the same time daily</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Available at health facilities</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>May have additional health benefits</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Doesn't protect against STIs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Who can use the combined pill?</h3>
              <p className="mb-4">
                The combined pill is suitable for many women, but isn't recommended if you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Are pregnant</li>
                <li>Smoke and are over 35</li>
                <li>Are very overweight</li>
                <li>Have certain medical conditions</li>
                <li>Take certain medications</li>
              </ul>
              <p>
                Always consult a healthcare provider to determine if the combined pill is right for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                Talk to a healthcare provider if you have questions about the combined pill or need advice on contraception options in Nigeria.
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

export default CombinedPillPage;
