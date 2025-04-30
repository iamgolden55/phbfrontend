import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const InjectionPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Contraceptive Injection', url: '/contraception/injection' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Contraceptive Injection</h1>
          <p className="text-xl font-medium">
            How contraceptive injections work, their effectiveness, and availability in Nigeria
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About contraceptive injections in Nigeria</h2>
              <p className="mb-4">
                Contraceptive injections are a form of hormonal contraception that is injected into the body to prevent pregnancy. In Nigeria, they are one of the most popular contraceptive methods, particularly among women who want effective, medium-term contraception without daily reminders.
              </p>
              <p className="mb-4">
                Injectable contraceptives are widely available across Nigeria through the public healthcare system, private clinics, and NGO-operated facilities. They have been a central component of Nigeria's family planning program for decades due to their effectiveness, relative affordability, and suitability for the Nigerian context.
              </p>
              <p className="mb-4">
                The popularity of injectable contraceptives in Nigeria can be attributed to several factors, including their discretion (no visible signs of contraceptive use), effectiveness, and the need for only periodic clinic visits rather than daily medication. This makes them well-suited to women in both urban and rural settings across the country.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Types of contraceptive injections available in Nigeria</h3>
              <p className="mb-4">
                There are three main types of contraceptive injections available in Nigeria:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">DMPA (Depo-Provera)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Contains depot medroxyprogesterone acetate</li>
                    <li>Given every 3 months (13 weeks)</li>
                    <li>Most common injectable in Nigeria</li>
                    <li>Administered as an intramuscular injection</li>
                    <li>Cost: ₦300-₦1,000 in public facilities, ₦1,000-₦3,000 in private facilities</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">DMPA-SC (Sayana Press)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Subcutaneous form of DMPA</li>
                    <li>Given every 3 months (13 weeks)</li>
                    <li>Comes in a prefilled, easy-to-use device</li>
                    <li>Can be self-administered after training</li>
                    <li>Increasingly available in Nigeria</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-bold mb-2">NET-EN (Noristerat)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Contains norethisterone enanthate</li>
                    <li>Given every 2 months (8-10 weeks)</li>
                    <li>Less common than DMPA in Nigeria</li>
                    <li>May cause more menstrual irregularities initially</li>
                    <li>More widely available in urban areas</li>
                  </ul>
                </div>
              </div>
              <p className="mb-4">
                Depo-Provera (DMPA) is by far the most widely used injectable contraceptive in Nigeria. It is available through the national family planning program and is often subsidized or provided free of charge at public health facilities.
              </p>
              <p>
                Sayana Press (DMPA-SC) is a newer option that is becoming increasingly available in Nigeria. Its simple design and potential for self-administration make it particularly valuable in areas with limited healthcare access, and several pilot programs are underway across Nigeria to expand its availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">How contraceptive injections work</h3>
              <p className="mb-4">
                Contraceptive injections work in several ways to prevent pregnancy:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Prevent ovulation:</strong> The primary mechanism is stopping the ovaries from releasing eggs.</li>
                <li><strong>Thicken cervical mucus:</strong> This creates a barrier that makes it difficult for sperm to enter the uterus.</li>
                <li><strong>Thin the lining of the womb:</strong> This makes it less likely for a fertilized egg to implant.</li>
              </ul>
              <p className="mb-4">
                The injection releases progestogen (a synthetic form of the hormone progesterone) into the bloodstream. Unlike daily pills, the injection provides a continuous supply of hormone for 2-3 months, depending on the type used.
              </p>
              <p>
                When used correctly, contraceptive injections are more than 99% effective at preventing pregnancy. This means that fewer than 1 in 100 women who use injectable contraception perfectly will get pregnant in a year. With typical use, effectiveness is about 94%, meaning about 6 in 100 women may get pregnant in a year. The main reason for reduced effectiveness is missing or delaying the follow-up injection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Getting contraceptive injections in Nigeria</h3>
              <div className="mb-6">
                <h4 className="font-bold mb-2">Before the first injection</h4>
                <p className="mb-2">
                  Before getting your first contraceptive injection, you'll typically have a consultation with a healthcare provider who will:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Ask about your medical history and lifestyle</li>
                  <li>Check your blood pressure</li>
                  <li>Explain how the injection works and potential side effects</li>
                  <li>Rule out pregnancy (may perform a pregnancy test)</li>
                  <li>Address any questions or concerns you might have</li>
                </ul>
                <p>
                  In Nigeria, this consultation is available at government health facilities, private clinics, and NGO-operated healthcare centers that offer family planning services.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Injection procedure</h4>
                <p className="mb-2">
                  The injection procedure is quick and straightforward:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>For DMPA (Depo-Provera), the injection is given into a muscle, usually in the buttock or upper arm</li>
                  <li>For DMPA-SC (Sayana Press), the injection is given just under the skin, usually in the thigh or abdomen</li>
                  <li>The procedure takes just a few minutes</li>
                  <li>You may feel a brief sting during the injection</li>
                </ul>
                <p>
                  In Nigeria, various healthcare workers are trained to provide injectable contraceptives, including nurses, midwives, community health extension workers (CHEWs), and in some cases, community volunteers who have received specialized training.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Timing of injections</h4>
                <p className="mb-2">
                  The timing of contraceptive injections is important:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li><strong>First injection:</strong> Ideally given during the first 5 days of your menstrual cycle to provide immediate protection</li>
                  <li><strong>DMPA (Depo-Provera):</strong> Repeat injections every 12-13 weeks (3 months)</li>
                  <li><strong>NET-EN (Noristerat):</strong> Repeat injections every 8-10 weeks (2 months)</li>
                  <li>You will typically be given a card with the date of your next injection</li>
                </ul>
                <p>
                  The "grace period" for late injections is up to 2 weeks for DMPA and 2 weeks for NET-EN. If you are later than this, you may need to use additional contraception (like condoms) for 7 days after the injection and may require a pregnancy test.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Maintaining the method</h4>
                <p className="mb-2">
                  To maintain effective contraception with injectables:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Keep track of your injection dates (many clinics in Nigeria now use text message reminders)</li>
                  <li>Return on time for your next injection</li>
                  <li>Discuss any concerns or side effects with your healthcare provider</li>
                  <li>If you want to become pregnant, be aware that fertility may take 6-12 months to return after stopping injections</li>
                </ul>
                <p>
                  In Nigeria, many family planning services have established systems to help women remember their injection dates, including appointment cards, phone calls, or community health worker follow-ups.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Advantages in the Nigerian context</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Highly effective (over 99% with perfect use)</li>
                  <li>Private and discrete - no one needs to know you're using contraception</li>
                  <li>Convenient - no need to remember daily pills</li>
                  <li>Long-lasting - protection for 2-3 months per injection</li>
                  <li>No interference with sex</li>
                  <li>Safe for use while breastfeeding (from 6 weeks after delivery)</li>
                  <li>Widely available across Nigeria, even in rural areas</li>
                  <li>Often available at low or no cost in public facilities</li>
                  <li>Can reduce menstrual pain and heavy bleeding</li>
                  <li>Many women stop having periods after several months of use (which can be a benefit)</li>
                  <li>Not affected by most other medications</li>
                  <li>Can be used by women who cannot take estrogen</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Disadvantages and considerations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Requires regular visits to a healthcare provider (every 2-3 months)</li>
                  <li>Common side effects include irregular bleeding or spotting, especially in the first few months</li>
                  <li>Some women experience weight gain, headaches, or mood changes</li>
                  <li>Cannot be immediately reversed - effects last until the hormone clears from the body</li>
                  <li>Return to fertility may be delayed for 6-12 months after stopping</li>
                  <li>Does not protect against STIs, including HIV (which remains a significant health concern in Nigeria)</li>
                  <li>Not recommended for women with certain health conditions</li>
                  <li>Requires reliable access to healthcare facilities for repeat injections</li>
                  <li>Stock-outs can occur in some Nigerian health facilities</li>
                  <li>Some women may be uncomfortable with injections</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Availability in Nigeria</h3>
              <p className="mb-4">
                Injectable contraceptives are one of the most widely available contraceptive methods in Nigeria:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Government health facilities:</strong> Available at most government hospitals, primary healthcare centers, and maternal health clinics, often at subsidized rates (₦300-₦1,000) or free</li>
                <li><strong>Private healthcare providers:</strong> Available at private hospitals, clinics, and some pharmacies at higher costs (₦1,000-₦3,000)</li>
                <li><strong>NGO facilities:</strong> Organizations like Society for Family Health, Marie Stopes Nigeria, and Planned Parenthood Federation of Nigeria offer injectables at affordable rates</li>
                <li><strong>Mobile outreach services:</strong> Some organizations provide injectable contraceptives through mobile clinics that visit underserved communities</li>
                <li><strong>Community-based distribution:</strong> In some states, trained community health workers can provide DMPA-SC through home visits or community points</li>
              </ul>
              <p className="mb-4">
                Depo-Provera is generally available in most healthcare facilities across the country, while Sayana Press and Noristerat may have more limited availability, particularly in rural areas.
              </p>
              <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
                <h4 className="font-bold mb-2">Access challenges:</h4>
                <p>
                  Despite widespread availability, access to injectable contraceptives can still be challenging in some parts of Nigeria due to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Stock-outs at public facilities</li>
                  <li>Limited trained providers in some rural areas</li>
                  <li>Transportation difficulties for regular clinic visits</li>
                  <li>Cultural and religious barriers in some communities</li>
                  <li>Need for partner or family approval in certain contexts</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about injectable contraceptives in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Will injectable contraceptives affect my ability to have children in the future?</h4>
                <p>
                  No, injectable contraceptives do not cause permanent infertility. However, after stopping the injections, it may take 6-12 months for fertility to return. This is longer than with other methods like pills or implants. This temporary delay is important to understand, especially in Nigerian communities where having children is highly valued. If you're planning to get pregnant soon, injectable contraception might not be the best choice.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Why do many women stop having periods with injectable contraceptives?</h4>
                <p>
                  The hormones in the injection can thin the lining of the womb so much that there is little or no bleeding. This condition, called amenorrhea, is not harmful and doesn't mean you're pregnant. Many women find this convenient, but in some Nigerian cultural contexts where regular menstruation may have significance, this change can cause concern. Healthcare providers can help explain this effect to women and their families if needed.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Do I need my husband's permission to use injectable contraceptives in Nigeria?</h4>
                <p>
                  Legally, adult women in Nigeria do not need spousal consent for contraception. However, in practice, some healthcare providers may ask for it, and social norms in many communities expect male involvement in reproductive decisions. Some women choose injectables because they are discrete and can be used without visible evidence, allowing for personal reproductive autonomy. However, when possible, couple communication about family planning is encouraged for better outcomes.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Is it true that injectable contraceptives cause weight gain?</h4>
                <p>
                  Some women do experience weight gain with injectable contraceptives. Research suggests an average gain of 1-2 kg in the first year, though some women gain more. The exact mechanism isn't fully understood, but may involve increased appetite or fluid retention. Not everyone experiences weight changes, and maintaining a healthy diet and regular exercise can help manage any potential weight gain.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">How do I manage irregular bleeding with injectable contraceptives?</h4>
                <p>
                  Irregular bleeding or spotting is common, especially in the first few months of use. This is not harmful but can be inconvenient. If bleeding is bothersome, healthcare providers in Nigeria may recommend:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Taking ibuprofen (400mg twice daily for 5 days) during spotting episodes</li>
                  <li>Ensuring you get your injections on time</li>
                  <li>Being patient, as bleeding patterns often improve after 3-6 months of use</li>
                </ul>
                <p>
                  If irregular bleeding continues and is troublesome, discuss other contraceptive options with your healthcare provider.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About injectable contraceptives</a>
                </li>
                <li>
                  <a href="#types" className="text-[#00a499] hover:underline">Types available in Nigeria</a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[#00a499] hover:underline">How injections work</a>
                </li>
                <li>
                  <a href="#getting-injection" className="text-[#00a499] hover:underline">Getting an injection</a>
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
                  <span>Over 99% effective when used correctly</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Protection for 2-3 months per injection</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Private and discrete method</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Requires clinic visits every 2-3 months</span>
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
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Who can use injectable contraceptives?</h3>
              <p className="mb-4">
                Injectable contraceptives are suitable for many women, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Women of any age who want effective contraception</li>
                <li>Breastfeeding mothers (from 6 weeks after delivery)</li>
                <li>Women who can't use methods containing estrogen</li>
                <li>Women who have difficulty remembering daily pills</li>
                <li>Women who want discrete contraception</li>
                <li>Women who want to space their pregnancies</li>
              </ul>
              <p>
                Some health conditions may make injectables unsuitable. A healthcare provider can help determine if this method is right for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                Talk to a healthcare provider if you have questions about contraceptive injections or need advice on contraception options in Nigeria.
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

export default InjectionPage;
