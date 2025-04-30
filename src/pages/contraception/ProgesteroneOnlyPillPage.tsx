import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ProgesteroneOnlyPillPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Progesterone-Only Pill', url: '/contraception/progesterone-only-pill' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Progesterone-Only Pill</h1>
          <p className="text-xl font-medium">
            How the progesterone-only pill works, its effectiveness, and availability in Nigeria
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About the progesterone-only pill in Nigeria</h2>
              <p className="mb-4">
                The progesterone-only pill (POP), also known as the "mini pill," contains only one hormone - progestogen - unlike the combined pill, which contains both estrogen and progestogen. It's an important contraceptive option for women in Nigeria, especially for those who cannot use estrogen-based methods.
              </p>
              <p className="mb-4">
                In Nigeria, the progesterone-only pill is available through family planning clinics, hospitals, and some pharmacies, though it is generally less widely available than the combined pill. Its distribution varies across different regions, with better access in urban areas compared to rural communities.
              </p>
              <p className="mb-4">
                POPs are particularly valuable in Nigeria's context because they are safe for use by breastfeeding mothers, women over 35, and those with certain health conditions like hypertension that might make combined pills unsuitable. This makes them an important option in a country with high maternal mortality and limited healthcare access.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How the progesterone-only pill works</h3>
              <p className="mb-4">
                The progesterone-only pill works in several ways to prevent pregnancy:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Thickens cervical mucus:</strong> Makes it difficult for sperm to reach an egg.</li>
                <li><strong>Thins the lining of the womb:</strong> Makes it less likely for a fertilized egg to implant.</li>
                <li><strong>May stop ovulation in some women:</strong> Some types of POP can prevent the release of an egg, though this is not consistent for all brands or users.</li>
              </ul>
              <p className="mb-4">
                When taken correctly and consistently, the progesterone-only pill is about 99% effective at preventing pregnancy. However, with typical use, it's about 91-93% effective, which means about 7-9 in 100 women using POPs may get pregnant in a year.
              </p>
              <p>
                The effectiveness of POPs depends greatly on taking them at the same time every day. This can be challenging in the Nigerian context where daily routines may be disrupted by various factors including irregular power supply (which can affect timely reminders) and limited privacy for medication storage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Types available in Nigeria</h3>
              <p className="mb-4">
                Several types of progesterone-only pills are available in Nigeria, though availability varies by location:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 mb-4">
                  <thead>
                    <tr>
                      <th className="border border-gray-200 px-4 py-2 bg-gray-50">Brand Name</th>
                      <th className="border border-gray-200 px-4 py-2 bg-gray-50">Active Ingredient</th>
                      <th className="border border-gray-200 px-4 py-2 bg-gray-50">Approximate Cost</th>
                      <th className="border border-gray-200 px-4 py-2 bg-gray-50">Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Microlut</td>
                      <td className="border border-gray-200 px-4 py-2">Levonorgestrel 0.03mg</td>
                      <td className="border border-gray-200 px-4 py-2">₦500-₦1,200/month</td>
                      <td className="border border-gray-200 px-4 py-2">Common in urban areas</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Exluton</td>
                      <td className="border border-gray-200 px-4 py-2">Lynestrenol 0.5mg</td>
                      <td className="border border-gray-200 px-4 py-2">₦800-₦1,500/month</td>
                      <td className="border border-gray-200 px-4 py-2">Limited availability</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Cerazette</td>
                      <td className="border border-gray-200 px-4 py-2">Desogestrel 0.075mg</td>
                      <td className="border border-gray-200 px-4 py-2">₦1,200-₦2,500/month</td>
                      <td className="border border-gray-200 px-4 py-2">Limited to major cities</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Norgeston</td>
                      <td className="border border-gray-200 px-4 py-2">Levonorgestrel 0.03mg</td>
                      <td className="border border-gray-200 px-4 py-2">₦600-₦1,200/month</td>
                      <td className="border border-gray-200 px-4 py-2">Moderately available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-4">
                Microlut is the most widely distributed POP in Nigeria, often available through public health facilities at subsidized rates as part of national family planning programs. The newer desogestrel-containing pills (like Cerazette) are more expensive and typically only available in private pharmacies in major cities.
              </p>
              <p>
                Some POPs may be available free of charge at government-supported family planning clinics, especially for postpartum mothers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How to take the progesterone-only pill</h3>
              <p className="mb-4">
                Taking the progesterone-only pill correctly is essential for its effectiveness, especially in the Nigerian context:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Take one pill every day without a break</strong> between packs.</li>
                <li><strong>Take the pill at the same time each day</strong> - unlike the combined pill, POPs have a stricter timing window. Most POPs must be taken within 3 hours of the same time each day (though newer desogestrel pills like Cerazette have a 12-hour window).</li>
                <li><strong>Start a new pack as soon as you finish the current one</strong> - there are no pill-free or placebo weeks.</li>
                <li>If you're switching from another method, you may need to use additional contraception for 7 days.</li>
              </ul>
              <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500 mb-4">
                <p className="font-bold">Important for Nigerian users:</p>
                <p>
                  In Nigeria's hot climate, store your pills in a cool, dry place away from direct sunlight to maintain their effectiveness. Avoid storing them in the refrigerator, as excessive cold can also affect them. If your pills have been exposed to extreme heat or appear changed in any way, consult a healthcare provider before using them.
                </p>
              </div>
              <p>
                If you miss a pill or take it more than 3 hours late (12 hours for desogestrel pills), take it as soon as you remember and use additional contraception (like condoms) for the next 7 days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Advantages in the Nigerian context</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Safe for breastfeeding mothers (important in Nigeria, where breastfeeding rates are high)</li>
                  <li>Suitable for women who cannot take estrogen</li>
                  <li>Safe for women over 35 and those who smoke</li>
                  <li>Can be used by women with certain health conditions like high blood pressure</li>
                  <li>May reduce menstrual pain and heavy bleeding</li>
                  <li>Does not interrupt sex</li>
                  <li>Fertility returns quickly after stopping</li>
                  <li>More widely available in public health facilities than some other hormonal methods</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Disadvantages and considerations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Must be taken at the same time every day (challenging in environments with unreliable schedules)</li>
                  <li>May cause irregular bleeding or spotting, which can be culturally stigmatized in some Nigerian communities</li>
                  <li>Less effective than some other methods like implants or IUDs</li>
                  <li>Doesn't protect against STIs, including HIV (which remains a significant public health concern in Nigeria)</li>
                  <li>May require regular visits to health facilities for resupply, which can be difficult in rural areas</li>
                  <li>Availability and accessibility issues in many parts of Nigeria, especially rural areas</li>
                  <li>May be affected by certain medications, including some traditional herbal remedies common in Nigeria</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Availability in Nigeria</h3>
              <p className="mb-4">
                In Nigeria, the progesterone-only pill can be obtained from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Government hospitals and health centers:</strong> Often provide POPs at subsidized rates or free as part of family planning programs, especially for postpartum women</li>
                <li><strong>Primary Healthcare Centers (PHCs):</strong> Government-supported facilities that provide basic healthcare services, including family planning</li>
                <li><strong>Private hospitals and clinics:</strong> May charge higher fees but often have more regular stock</li>
                <li><strong>Family planning clinics:</strong> Run by organizations like Planned Parenthood Federation of Nigeria and Society for Family Health</li>
                <li><strong>Pharmacies:</strong> Require a prescription in some cases, though this may not be strictly enforced</li>
                <li><strong>NGO-operated healthcare facilities:</strong> Organizations like Marie Stopes Nigeria often provide contraceptives at subsidized rates</li>
              </ul>
              <p className="mb-4">
                Access to POPs varies significantly across Nigeria. Urban areas, particularly in southern states, generally have better access than rural communities in the north. Cultural and religious factors also influence availability and acceptance of family planning methods in different regions.
              </p>
              <p>
                Many women in Nigeria face challenges accessing the progesterone-only pill due to factors such as geographical location, cost, stockouts at public facilities, lack of trained providers, and social stigma related to contraceptive use.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about the progesterone-only pill in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Is the progesterone-only pill suitable for breastfeeding mothers?</h4>
                <p>
                  Yes, the progesterone-only pill is safe to use while breastfeeding. It doesn't affect milk production and very little of the hormone passes into breast milk. This makes it a popular choice for postpartum women in Nigeria, where breastfeeding rates are high and extended breastfeeding is common.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Will the progesterone-only pill affect my fertility in the future?</h4>
                <p>
                  No, the progesterone-only pill does not cause infertility. Your fertility typically returns quickly after stopping the pill, sometimes within days. This is particularly important in the Nigerian context, where having children is often highly valued and concerns about fertility are common.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can the progesterone-only pill cause irregular bleeding?</h4>
                <p>
                  Yes, changes to your bleeding pattern are common when using the progesterone-only pill. Some women experience irregular bleeding, spotting, lighter periods, or their periods may stop completely. These changes are not harmful but can be challenging in cultural contexts where menstrual bleeding may have social or religious significance, as in some Nigerian communities.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Is the progesterone-only pill available for free in Nigeria?</h4>
                <p>
                  In many government health facilities and NGO-supported clinics, the progesterone-only pill is available either free of charge or at heavily subsidized rates. This is particularly true for maternal health services, where POPs may be provided as part of postpartum care. However, availability varies by location and is more consistent in urban areas and southern states than in rural areas and northern states.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can I use the progesterone-only pill with traditional herbal medicines?</h4>
                <p>
                  Some traditional herbal medicines may interact with hormonal contraceptives, potentially reducing their effectiveness. If you use traditional remedies, discuss this with a healthcare provider. This is particularly relevant in Nigeria, where traditional medicine remains popular alongside modern healthcare.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About the mini pill</a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[#00a499] hover:underline">How it works</a>
                </li>
                <li>
                  <a href="#types" className="text-[#00a499] hover:underline">Types available in Nigeria</a>
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
                  <span>Safe during breastfeeding</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No estrogen side effects</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Must take at the same time daily</span>
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
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Who can use the mini pill?</h3>
              <p className="mb-4">
                The progesterone-only pill is particularly suitable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Breastfeeding mothers</li>
                <li>Women over 35</li>
                <li>Women who smoke</li>
                <li>Women with high blood pressure</li>
                <li>Women who cannot take estrogen</li>
                <li>Women with certain types of migraines</li>
              </ul>
              <p>
                It's one of the few hormonal contraceptive options available to women with certain health conditions, making it an important option in Nigeria's healthcare context.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                Talk to a healthcare provider if you have questions about the progesterone-only pill or need advice on contraception options in Nigeria.
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

export default ProgesteroneOnlyPillPage;
