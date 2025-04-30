import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ImplantPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Contraceptive Implant', url: '/contraception/implant' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Contraceptive Implant</h1>
          <p className="text-xl font-medium">
            How contraceptive implants work, their effectiveness, and availability in Nigeria
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About contraceptive implants in Nigeria</h2>
              <p className="mb-4">
                Contraceptive implants are small, flexible plastic rods that are inserted under the skin of the upper arm to prevent pregnancy. They are one of the most effective forms of long-acting reversible contraception (LARC) available in Nigeria.
              </p>
              <p className="mb-4">
                In Nigeria, contraceptive implants have become increasingly important in the national family planning strategy. The Nigerian government, in partnership with international organizations, has been working to expand access to implants across the country due to their high effectiveness and suitability for the Nigerian context.
              </p>
              <p className="mb-4">
                Implants are particularly valuable in rural and underserved areas where regular access to healthcare facilities may be limited, as they provide long-term protection without requiring frequent visits for resupply. This makes them an important option in the Nigerian healthcare landscape, where transportation and access challenges are common.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Types of implants available in Nigeria</h3>
              <p className="mb-4">
                There are primarily three types of contraceptive implants available in Nigeria:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">Jadelle</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Two thin, flexible rods</li>
                    <li>Contains levonorgestrel</li>
                    <li>Effective for up to 5 years</li>
                    <li>Widely available across Nigeria</li>
                    <li>Cost: ₦500-₦2,000 in public facilities, ₦3,000-₦10,000 in private facilities</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">Implanon NXT</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Single rod implant</li>
                    <li>Contains etonogestrel</li>
                    <li>Effective for up to 3 years</li>
                    <li>Radio-opaque (can be seen on X-ray)</li>
                    <li>Cost: ₦500-₦2,000 in public facilities, ₦3,000-₦8,000 in private facilities</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">Sino-implant (II)/Levoplant</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Two thin, flexible rods</li>
                    <li>Contains levonorgestrel</li>
                    <li>Effective for up to 4 years</li>
                    <li>Lower cost alternative</li>
                    <li>Becoming more available in Nigeria</li>
                  </ul>
                </div>
              </div>
              <p className="mb-4">
                Implanon NXT and Jadelle are the most widely available implants in Nigeria. They are offered through the public health system as part of the national family planning program, as well as through private healthcare providers and NGOs.
              </p>
              <p>
                Pricing varies significantly between public and private facilities. Many government health centers and NGO-operated clinics offer implants at heavily subsidized rates or even free of charge as part of family planning initiatives.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How contraceptive implants work</h3>
              <p className="mb-4">
                Contraceptive implants work in several ways to prevent pregnancy:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Prevents ovulation:</strong> The primary mechanism is suppressing ovulation, so no egg is released for fertilization.</li>
                <li><strong>Thickens cervical mucus:</strong> Makes it difficult for sperm to reach an egg if ovulation does occur.</li>
                <li><strong>Thins the lining of the womb:</strong> Makes it less likely for a fertilized egg to implant.</li>
              </ul>
              <p className="mb-4">
                The implant releases a steady, low dose of progestogen into the bloodstream, providing continuous pregnancy prevention without requiring daily action from the user.
              </p>
              <p>
                Contraceptive implants are among the most effective methods of contraception available, with a failure rate of less than 1%. This means that less than 1 in 100 women using an implant will get pregnant in a year. Their effectiveness is not dependent on user compliance (unlike pills or condoms), making them particularly reliable in real-world conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Getting an implant in Nigeria</h3>
              <div className="mb-6">
                <h4 className="font-bold mb-2">Before insertion</h4>
                <p className="mb-2">
                  Before getting an implant, you'll typically have a consultation with a healthcare provider who will:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Discuss your medical history and lifestyle</li>
                  <li>Explain how the implant works and potential side effects</li>
                  <li>Rule out pregnancy (may perform a pregnancy test)</li>
                  <li>Address any questions or concerns you might have</li>
                </ul>
                <p>
                  In Nigeria, this consultation is available at government health facilities, private clinics, and NGO-operated healthcare centers that offer family planning services.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Insertion procedure</h4>
                <p className="mb-2">
                  The insertion procedure is quick (usually taking 5-10 minutes) and is performed by a trained healthcare provider:
                </p>
                <ol className="list-decimal pl-6 mb-2 space-y-1">
                  <li>Local anesthetic is applied to numb the area of your upper arm</li>
                  <li>The implant is inserted just under the skin using a special applicator</li>
                  <li>No stitches are needed; the small insertion area is covered with a bandage</li>
                  <li>You'll be shown how to feel the implant under your skin</li>
                </ol>
                <p>
                  In Nigeria, implant insertions are performed by various cadres of healthcare workers including doctors, nurses, midwives, and community health extension workers (CHEWs) who have received specialized training in implant services.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">After insertion</h4>
                <p className="mb-2">
                  After getting an implant:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>You may experience bruising, soreness, or swelling around the insertion site, which typically resolves within a few days</li>
                  <li>The area should be kept clean and dry for 24-48 hours</li>
                  <li>You'll be advised to return to the facility if you experience severe pain, infection signs, or if the implant appears to be coming out</li>
                  <li>You'll typically be given a card with information about your implant type and when it needs to be removed or replaced</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2">Removal</h4>
                <p className="mb-2">
                  When you want the implant removed (either because the effective period has ended or you want to try to become pregnant):
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>The removal procedure is usually quick but may take longer than insertion</li>
                  <li>Local anesthetic is applied to numb the area</li>
                  <li>A small incision is made to remove the implant</li>
                  <li>If desired, a new implant can be inserted through the same incision</li>
                </ul>
                <p>
                  It's important to have the implant removed by a trained healthcare provider. In Nigeria, there have been some challenges with implant removals, particularly in rural areas where access to trained providers may be limited. Several organizations are working to improve training and access to removal services throughout the country.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Advantages in the Nigerian context</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Very high effectiveness (over 99%)</li>
                  <li>Long-lasting protection (3-5 years depending on type)</li>
                  <li>Convenient for women with limited access to healthcare facilities</li>
                  <li>Discrete method that doesn't interfere with sex</li>
                  <li>Reversible - fertility returns quickly after removal</li>
                  <li>Suitable for breastfeeding mothers (can be inserted 6 weeks after delivery)</li>
                  <li>Reduces the need for frequent healthcare visits</li>
                  <li>Often available at low or no cost through public health facilities</li>
                  <li>Not affected by other medications (including anti-malarials and antibiotics)</li>
                  <li>May reduce heavy menstrual bleeding and cramping</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Disadvantages and considerations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Requires a trained provider for insertion and removal</li>
                  <li>May cause changes in menstrual bleeding patterns (irregular bleeding, spotting, or no periods), which can be concerning in cultural contexts where regular menstruation has significance</li>
                  <li>Possible side effects include headaches, breast tenderness, and mood changes</li>
                  <li>Does not protect against STIs, including HIV (which remains a significant health concern in Nigeria)</li>
                  <li>Requires a minor procedure for insertion and removal</li>
                  <li>May be visible or palpable under the skin, which can raise privacy concerns</li>
                  <li>Removals may be challenging in some areas with limited healthcare access</li>
                  <li>Some women report weight gain, though evidence is mixed</li>
                  <li>Cultural and religious barriers may exist in some communities</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Availability in Nigeria</h3>
              <p className="mb-4">
                Contraceptive implants are increasingly available across Nigeria, though access varies by location:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Government hospitals and health centers:</strong> Implants are available at most government hospitals and many primary healthcare centers, often at subsidized rates through the national family planning program</li>
                <li><strong>Private hospitals and clinics:</strong> Many private healthcare facilities offer implant services, though costs are typically higher</li>
                <li><strong>NGO-operated facilities:</strong> Organizations like Marie Stopes Nigeria, Society for Family Health, and Planned Parenthood Federation of Nigeria offer implants at affordable rates</li>
                <li><strong>Mobile outreach services:</strong> Several organizations conduct mobile outreach to bring implant services to underserved communities</li>
                <li><strong>Faith-based healthcare facilities:</strong> Many church-affiliated health centers provide family planning services, including implants</li>
              </ul>
              <p className="mb-4">
                The Nigerian government has made significant investments in expanding access to implants as part of its commitment to increasing modern contraceptive prevalence. Training programs have been expanded to increase the number of providers qualified to insert and remove implants, including community health workers in rural areas.
              </p>
              <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
                <h4 className="font-bold mb-2">Regional variations:</h4>
                <p>
                  There are notable regional disparities in implant access across Nigeria. Southern states generally have higher availability and uptake compared to northern states, where cultural, religious, and logistics factors may limit access. Urban areas have significantly better access than rural communities in all regions of the country.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about implants in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Are contraceptive implants painful to insert or remove?</h4>
                <p>
                  Local anesthetic is used for both insertion and removal, so you should only feel minimal discomfort during the procedures. You may experience some bruising or soreness for a few days afterward. In the Nigerian context, most women report that any discomfort is manageable and well worth the long-term benefits of the method.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Will the implant affect my future fertility?</h4>
                <p>
                  No, contraceptive implants do not cause infertility. Once the implant is removed, fertility returns quickly, often within days or weeks. This is an important consideration in Nigeria, where having children is highly valued in many communities and concerns about fertility are common.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can the implant move around in my arm or to other parts of my body?</h4>
                <p>
                  Once inserted properly, the implant stays in place in the arm. It cannot move to other parts of the body. Very rarely, an implant might migrate slightly within the arm, but this is usually minimal. In Nigeria, there have been some concerns and misconceptions about implant migration, but healthcare providers are trained to insert implants correctly to prevent this.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">How much does it cost to get an implant in Nigeria?</h4>
                <p>
                  The cost varies widely depending on where you go:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>In government health facilities: ₦500-₦2,000 (sometimes free during campaigns)</li>
                  <li>In private facilities: ₦3,000-₦15,000 (depending on location and facility type)</li>
                  <li>NGO facilities: Often subsidized, typically ₦500-₦5,000</li>
                </ul>
                <p>
                  Some health insurance schemes in Nigeria now cover family planning services, including implants. The National Health Insurance Scheme (NHIS) includes family planning in its benefit package, though implementation varies.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Will people be able to see or feel the implant in my arm?</h4>
                <p>
                  The implant is placed under the skin on the inner side of your upper arm and is not usually visible. However, it may be felt if someone touches that specific area. In the Nigerian context where privacy around contraceptive use can be important, many women choose to have the implant inserted in their non-dominant arm and in a position that's less likely to be noticed.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About implants</a>
                </li>
                <li>
                  <a href="#types" className="text-[#00a499] hover:underline">Types available in Nigeria</a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[#00a499] hover:underline">How implants work</a>
                </li>
                <li>
                  <a href="#getting-implant" className="text-[#00a499] hover:underline">Getting an implant</a>
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
                  <span>Lasts 3-5 years</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quick insertion procedure</span>
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
                  <span>Doesn't protect against STIs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Who can use implants?</h3>
              <p className="mb-4">
                Contraceptive implants are suitable for most women, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Women of any age who want long-term contraception</li>
                <li>Women who are breastfeeding (from 6 weeks after delivery)</li>
                <li>Women who cannot use estrogen-based methods</li>
                <li>Women who find it difficult to remember daily contraception</li>
                <li>Women with limited access to healthcare facilities</li>
              </ul>
              <p>
                Some medical conditions may make implants unsuitable. A healthcare provider can help determine if implants are right for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                Talk to a healthcare provider if you have questions about contraceptive implants or need advice on contraception options in Nigeria.
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

export default ImplantPage;
