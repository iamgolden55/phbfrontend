import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const IUDPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Intrauterine Device (IUD)', url: '/contraception/iud' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Intrauterine Device (IUD)</h1>
          <p className="text-xl font-medium">
            How IUDs work, their effectiveness, and availability in Nigeria
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About IUDs in Nigeria</h2>
              <p className="mb-4">
                An Intrauterine Device (IUD) is a small, T-shaped device that is placed inside the uterus to prevent pregnancy. It is one of the most effective forms of long-acting reversible contraception available in Nigeria.
              </p>
              <p className="mb-4">
                In Nigeria, IUDs have been part of the family planning program for decades, though they have historically been less popular than some other methods like injectables and implants. However, their use has been increasing in recent years due to efforts by the Nigerian government and international partners to expand access to a wider range of long-acting contraceptive options.
              </p>
              <p className="mb-4">
                IUDs are particularly valuable for women who want highly effective, long-term contraception without daily, weekly, or monthly maintenance. This makes them an excellent option for many Nigerian women, especially those who want to space their pregnancies over several years or who have completed their desired family size.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Types of IUDs available in Nigeria</h3>
              <p className="mb-4">
                There are two main types of IUDs available in Nigeria:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">Copper IUDs</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Made of plastic with copper wire wrapped around the stem and arms</li>
                    <li>Most common type in Nigeria is the Copper T 380A (CuT-380A)</li>
                    <li>Effective for up to 10-12 years</li>
                    <li>No hormones</li>
                    <li>May cause heavier periods, especially in the first few months</li>
                    <li>Widely available in public health facilities</li>
                    <li>Cost: ₦500-₦2,000 in public facilities, ₦3,000-₦10,000 in private facilities</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">Hormonal IUDs</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Made of plastic and releases small amounts of progestogen</li>
                    <li>Brands include Mirena and Liletta</li>
                    <li>Effective for 3-7 years depending on the type</li>
                    <li>Often reduces menstrual bleeding and cramps</li>
                    <li>Limited availability in Nigeria, mainly in private facilities and urban areas</li>
                    <li>More expensive than copper IUDs</li>
                    <li>Cost: ₦15,000-₦40,000 in private facilities, rarely available in public sector</li>
                  </ul>
                </div>
              </div>
              <p className="mb-4">
                In Nigeria, the copper IUD (particularly the CuT-380A) is the most widely available type, as it is part of the national family planning program and is offered at subsidized rates or free of charge in many public health facilities. Hormonal IUDs are less common and primarily available in private healthcare settings in major urban areas.
              </p>
              <p>
                The Nigerian government, with support from international partners, has been working to expand access to IUDs across the country, including training more healthcare providers in insertion and removal techniques.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How IUDs work</h3>
              <p className="mb-4">
                IUDs work in different ways depending on the type:
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-2">Copper IUDs:</h4>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Release copper ions that are toxic to sperm, reducing their ability to move and fertilize an egg</li>
                  <li>Create an inflammatory reaction in the uterine lining that is hostile to sperm</li>
                  <li>May prevent a fertilized egg from implanting in the uterus</li>
                  <li>Do not affect ovulation or hormone levels</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Hormonal IUDs:</h4>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Release small amounts of progestogen directly into the uterus</li>
                  <li>Thicken cervical mucus, making it difficult for sperm to enter the uterus</li>
                  <li>Thin the lining of the uterus, making implantation less likely</li>
                  <li>May suppress ovulation in some women, but this is not the primary mechanism</li>
                </ul>
              </div>
              <p className="mt-4">
                IUDs are among the most effective contraceptive methods available, with failure rates of less than 1%. This means that fewer than 1 in 100 women using an IUD will get pregnant in a year. This high effectiveness is not dependent on user action after insertion, making it particularly reliable in real-world conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Getting an IUD in Nigeria</h3>
              <div className="mb-6">
                <h4 className="font-bold mb-2">Before insertion</h4>
                <p className="mb-2">
                  Before getting an IUD, you'll typically have a consultation with a healthcare provider who will:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Take your medical history and perform a physical examination</li>
                  <li>Screen for STIs if necessary (important because IUD insertion with an existing infection can increase the risk of pelvic inflammatory disease)</li>
                  <li>Explain how the IUD works, its benefits, and potential side effects</li>
                  <li>Rule out pregnancy (may perform a pregnancy test)</li>
                  <li>Answer any questions you might have</li>
                </ul>
                <p>
                  In Nigeria, this consultation is available at government health facilities, private clinics, and NGO-operated healthcare centers that offer family planning services. However, the availability of trained providers varies across regions, with greater access in urban areas and more limited access in rural communities.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Insertion procedure</h4>
                <p className="mb-2">
                  The IUD insertion procedure is performed by a trained healthcare provider:
                </p>
                <ol className="list-decimal pl-6 mb-2 space-y-1">
                  <li>You'll lie on an examination table in a position similar to having a pelvic exam</li>
                  <li>A speculum is inserted to hold the vagina open</li>
                  <li>The healthcare provider will clean the cervix and uterus</li>
                  <li>The IUD is inserted through the cervix into the uterus using a special applicator</li>
                  <li>The strings of the IUD are trimmed to an appropriate length</li>
                </ol>
                <p className="mb-2">
                  The procedure usually takes about 5-10 minutes. Some women experience cramping or discomfort during and after insertion, but this typically subsides within a few days. In some facilities, you might be offered pain medication before the procedure.
                </p>
                <p>
                  In Nigeria, IUD insertions are primarily performed by doctors, nurses, and midwives who have received specialized training in IUD services. Community Health Extension Workers (CHEWs) in some states are also being trained to provide these services to expand access.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">After insertion</h4>
                <p className="mb-2">
                  After getting an IUD:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>You may experience cramping, spotting, or irregular bleeding for a few days to a few months</li>
                  <li>You'll be shown how to check for the IUD strings to ensure it remains in place</li>
                  <li>You'll be advised to return to the facility if you experience severe pain, unusual discharge, fever, or if you cannot feel the strings</li>
                  <li>For copper IUDs, you're protected against pregnancy immediately after insertion</li>
                  <li>You'll typically be given a card with information about your IUD and when it needs to be removed or replaced</li>
                </ul>
                <p>
                  A follow-up visit is usually scheduled 3-6 weeks after insertion to ensure the IUD is properly positioned and to address any concerns.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Removal</h4>
                <p className="mb-2">
                  When you want the IUD removed (either because the effective period has ended or you want to try to become pregnant):
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>The removal procedure is usually simple and quick</li>
                  <li>A healthcare provider will use special forceps to grasp the IUD strings and gently pull</li>
                  <li>You may experience brief cramping during removal</li>
                  <li>Fertility returns quickly after removal, often within the first menstrual cycle</li>
                </ul>
                <p>
                  It's important to have the IUD removed by a trained healthcare provider. In Nigeria, there have been some challenges with IUD removals, particularly in rural areas where access to trained providers may be limited. Several organizations are working to improve training and access to removal services throughout the country.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Advantages in the Nigerian context</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Very high effectiveness (over 99%)</li>
                  <li>Long-lasting protection (3-12 years depending on type)</li>
                  <li>Cost-effective over time, especially important in low-resource settings</li>
                  <li>Once inserted, no further action required for years</li>
                  <li>No need to remember daily, weekly, or monthly contraception</li>
                  <li>Private - no one needs to know you have an IUD</li>
                  <li>Does not interfere with sex</li>
                  <li>Copper IUDs are hormone-free (good for women who cannot or prefer not to use hormonal methods)</li>
                  <li>Hormonal IUDs often reduce menstrual bleeding and cramps</li>
                  <li>Can be inserted immediately after childbirth or abortion</li>
                  <li>Fertility returns quickly after removal</li>
                  <li>Copper IUDs can be used as emergency contraception if inserted within 5 days of unprotected sex</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Disadvantages and considerations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Requires a trained healthcare provider for insertion and removal</li>
                  <li>Access to trained providers may be limited in rural areas of Nigeria</li>
                  <li>Initial cost can be high, especially for hormonal IUDs in private facilities</li>
                  <li>Copper IUDs may increase menstrual bleeding and cramps, especially in the first few months</li>
                  <li>Risk of expulsion (the IUD coming out on its own), especially in the first few months</li>
                  <li>Small risk of perforation during insertion (very rare with trained providers)</li>
                  <li>Small risk of infection shortly after insertion</li>
                  <li>Does not protect against STIs, including HIV (which remains a significant health concern in Nigeria)</li>
                  <li>Some women's partners may be able to feel the strings during sex</li>
                  <li>Cultural and religious barriers may exist in some communities</li>
                  <li>Myths and misconceptions about IUDs are common in some parts of Nigeria</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Availability in Nigeria</h3>
              <p className="mb-4">
                IUDs, particularly copper IUDs, are available through various channels in Nigeria:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Government health facilities:</strong> Copper IUDs are available at many government hospitals, some primary healthcare centers, and maternal health clinics, often at subsidized rates (₦500-₦2,000) or free</li>
                <li><strong>Private healthcare providers:</strong> Both copper and hormonal IUDs may be available at private hospitals and clinics, though at higher costs (₦3,000-₦40,000 depending on type)</li>
                <li><strong>NGO facilities:</strong> Organizations like Society for Family Health, Marie Stopes Nigeria, and Planned Parenthood Federation of Nigeria offer IUDs at affordable rates</li>
                <li><strong>Faith-based healthcare facilities:</strong> Some church-affiliated hospitals and clinics provide family planning services, including IUDs</li>
              </ul>
              <p className="mb-4">
                The availability of IUDs varies significantly across Nigeria:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Urban vs. Rural:</strong> IUDs are more readily available in urban areas where there are more trained providers and better-equipped facilities</li>
                <li><strong>Regional differences:</strong> Southern states generally have higher availability compared to northern states</li>
                <li><strong>Type of IUD:</strong> Copper IUDs are much more widely available than hormonal IUDs</li>
                <li><strong>Provider training:</strong> Limited numbers of healthcare providers trained in IUD insertion and removal, particularly in rural areas</li>
              </ul>
              <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
                <h4 className="font-bold mb-2">Access challenges:</h4>
                <p>
                  Despite efforts to increase availability, many Nigerian women face challenges accessing IUDs due to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Geographic barriers and transportation costs to reach facilities with trained providers</li>
                  <li>Cost barriers, particularly for hormonal IUDs</li>
                  <li>Provider biases (some providers may be reluctant to offer IUDs to young or nulliparous women)</li>
                  <li>Lack of knowledge about IUDs among both providers and potential users</li>
                  <li>Cultural and religious beliefs that may discourage the use of certain contraceptive methods</li>
                  <li>Myths and misconceptions about IUDs that persist in some communities</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about IUDs in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Is the IUD painful to insert?</h4>
                <p>
                  Many women experience cramping or discomfort during IUD insertion, but the procedure is usually quick. The level of pain varies - some women feel little more than menstrual-like cramps, while others find it more uncomfortable. In Nigeria, some facilities offer pain management options before insertion. The discomfort typically subsides within a few days. Many Nigerian women report that any temporary discomfort is worth the long-term benefits of this highly effective contraceptive method.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can an IUD affect my fertility in the future?</h4>
                <p>
                  No, IUDs do not cause infertility. Once an IUD is removed, fertility returns quickly, often within the first menstrual cycle. This makes IUDs a good option for women who want to space their children but plan to have more in the future. This is particularly important in the Nigerian context, where concerns about fertility are common, and having children is highly valued in many communities.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can an IUD move around in my body or disappear?</h4>
                <p>
                  IUDs are designed to stay in the uterus. They cannot move to other parts of the body like the heart or brain - myths that sometimes circulate in Nigerian communities. In rare cases (about 1 in 20), an IUD may be expelled from the uterus, usually during the first few months after insertion. This is why checking for the strings regularly is important. Very rarely, an IUD might perforate the uterine wall during insertion, but this risk is minimal when inserted by a properly trained provider.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can single or young women use IUDs?</h4>
                <p>
                  Yes, IUDs are safe and appropriate for women of all ages who have started their periods, whether they have had children or not. However, in Nigeria, provider bias sometimes limits access for young or unmarried women. Medically, there is no reason why a young or nulliparous woman cannot use an IUD if she has no contraindications. The Nigerian Family Planning protocol recognizes IUDs as appropriate for women regardless of age or parity.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">How will the copper IUD affect my periods?</h4>
                <p>
                  Many women who use copper IUDs experience heavier, longer, and sometimes more painful periods, especially during the first 3-6 months of use. This typically improves over time but may persist for some women. In Nigeria, where anemia is common, healthcare providers may recommend iron supplements for women using copper IUDs. If heavy bleeding is problematic, switching to a hormonal IUD (if available and affordable) or another contraceptive method might be recommended.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About IUDs</a>
                </li>
                <li>
                  <a href="#types" className="text-[#00a499] hover:underline">Types available in Nigeria</a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[#00a499] hover:underline">How IUDs work</a>
                </li>
                <li>
                  <a href="#getting-iud" className="text-[#00a499] hover:underline">Getting an IUD</a>
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
                  <span>Over 99% effective</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lasts 3-12 years (depending on type)</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No regular maintenance needed</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fertility returns quickly after removal</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Copper IUDs may increase menstrual bleeding</span>
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
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Who can use IUDs?</h3>
              <p className="mb-4">
                IUDs are suitable for most women, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Women of any age who have started their periods</li>
                <li>Women who have never had children</li>
                <li>Women who have had children</li>
                <li>Women who have had ectopic pregnancies in the past</li>
                <li>Women who have had STIs in the past (if currently resolved)</li>
                <li>Women who cannot use hormonal methods (copper IUDs only)</li>
                <li>Women who want long-term but reversible contraception</li>
                <li>Breastfeeding mothers</li>
                <li>Women immediately after childbirth or abortion</li>
              </ul>
              <p>
                Some conditions may make IUDs unsuitable for certain women. A healthcare provider can help determine if an IUD is right for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                Talk to a healthcare provider if you have questions about IUDs or need advice on contraception options in Nigeria.
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

export default IUDPage;
