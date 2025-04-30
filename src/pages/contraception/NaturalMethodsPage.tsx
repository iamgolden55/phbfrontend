import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const NaturalMethodsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Natural Family Planning', url: '/contraception/natural-methods' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Natural Family Planning</h1>
          <p className="text-xl font-medium">
            Traditional and natural methods of family planning in Nigeria
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About natural family planning in Nigeria</h2>
              <p className="mb-4">
                Natural family planning methods have historical and cultural significance in Nigeria and across Africa. These methods involve identifying fertile days during a woman's menstrual cycle to either avoid pregnancy or increase chances of conception.
              </p>
              <p className="mb-4">
                In Nigeria, natural methods are often preferred by individuals who have cultural, religious, or personal objections to hormonal or barrier contraceptives. The Catholic Church, which has a significant presence in parts of Nigeria, specifically endorses natural family planning as the only acceptable form of birth control.
              </p>
              <p className="mb-4">
                Traditional methods have been practiced for generations in various Nigerian communities, though modern fertility awareness-based methods provide more precise approaches. While natural methods can be effective when used correctly and consistently, they typically have higher failure rates than modern contraceptives.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Types of natural family planning methods</h3>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Calendar method (Rhythm method)</h4>
                <p className="mb-2">
                  This involves tracking the menstrual cycle to predict fertile days. A woman identifies her fertile period by calculating from the first day of her period, assuming ovulation occurs around day 14 of a 28-day cycle.
                </p>
                <p>
                  In Nigeria, many women use calendar-based counting, often with the aid of physical calendars, mobile apps, or beaded necklaces that help track cycle days. However, this method is less reliable for women with irregular cycles, which is common due to factors like nutritional status, stress, and postpartum changes.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Cervical mucus method (Billings method)</h4>
                <p className="mb-2">
                  This involves monitoring changes in cervical mucus throughout the menstrual cycle. During fertile days, cervical mucus becomes clear, slippery, and stretchy (similar to raw egg white).
                </p>
                <p>
                  In Nigerian contexts, this method requires proper education and consistent checking, which may be challenging in communities where discussing bodily fluids is considered taboo. However, it can be effective for women who receive proper instruction from trained healthcare providers.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Basal body temperature (BBT) method</h4>
                <p className="mb-2">
                  This involves measuring body temperature first thing every morning before getting out of bed. A slight increase in temperature (about 0.2-0.5°C) indicates that ovulation has occurred.
                </p>
                <p>
                  In Nigeria, this method may be limited by access to accurate thermometers and reliable record-keeping. Power outages and environmental factors like heat may also affect consistent temperature readings.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Symptothermal method</h4>
                <p className="mb-2">
                  This combines multiple indicators including calendar calculations, cervical mucus observations, and basal body temperature. It's considered more effective than using a single indicator alone.
                </p>
                <p>
                  In Nigeria, this method is often taught in family planning classes run by religious organizations, particularly Catholic health facilities. It requires thorough education and consistent practice.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Traditional African spacing methods</h4>
                <p className="mb-2">
                  Various traditional methods exist across different Nigerian ethnic groups, including:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Postpartum abstinence during breastfeeding (practiced widely across Nigeria)</li>
                  <li>Use of traditional herbs and roots (though these may have inconsistent efficacy and potential side effects)</li>
                  <li>Extended breastfeeding as a spacing method (lactational amenorrhea)</li>
                  <li>Waist beads and other traditional markers to signal fertility</li>
                </ul>
                <p>
                  These traditional methods often combine cultural practices with biological understanding, passed down through generations.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Effectiveness of natural methods</h3>
              <p className="mb-4">
                The effectiveness of natural family planning methods varies widely depending on how consistently and correctly they are used:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With perfect use, natural methods have effectiveness rates of 76-88%</li>
                <li>With typical use, effectiveness can drop to 76% or lower</li>
                <li>The symptothermal method tends to be the most effective natural approach</li>
                <li>Calendar-only methods tend to be the least reliable</li>
              </ul>
              <p className="mb-4">
                This means that with typical use, about 24 out of 100 women using natural family planning may become pregnant in a year.
              </p>
              <p>
                In Nigerian contexts, effectiveness may be affected by factors such as limited access to proper instruction, literacy levels, cycle irregularities due to nutritional status, and challenges in abstaining during fertile periods.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Advantages</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No financial cost after initial education</li>
                  <li>No medical side effects</li>
                  <li>Aligns with religious beliefs (particularly Catholic and some Islamic teachings)</li>
                  <li>Can be used in areas with limited access to modern contraceptives</li>
                  <li>Increases awareness of the reproductive cycle</li>
                  <li>Can be used to plan pregnancy as well as avoid it</li>
                  <li>Respects traditional values and cultural practices</li>
                  <li>Does not require medical visits or prescriptions</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">Disadvantages</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lower effectiveness compared to modern methods</li>
                  <li>Requires consistent daily monitoring and record-keeping</li>
                  <li>Needs periods of abstinence during fertile days (typically 8-10 days per cycle)</li>
                  <li>Requires cooperation from both partners</li>
                  <li>Less reliable for women with irregular cycles</li>
                  <li>Requires proper education and instruction</li>
                  <li>Does not protect against STIs, including HIV</li>
                  <li>May be difficult to practice in relationships where women have limited reproductive autonomy</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Cultural and religious context in Nigeria</h3>
              <p className="mb-4">
                Natural family planning methods in Nigeria are deeply intertwined with cultural and religious beliefs:
              </p>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Religious influences</h4>
                <p>
                  The Catholic Church, with a significant presence in southern and central Nigeria, actively promotes natural family planning as the only morally acceptable form of birth control. Catholic hospitals and health centers often provide training in fertility awareness methods. Similarly, some Islamic scholars support natural methods as preferable to hormonal or barrier methods, though interpretations vary across different Islamic traditions in Nigeria.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Traditional postpartum practices</h4>
                <p>
                  Many Nigerian cultures traditionally practiced postpartum abstinence for 2-3 years while breastfeeding, though this practice has declined in recent generations. This served as a natural child-spacing method that protected maternal health and ensured adequate nutrition for the nursing child.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Gender dynamics</h4>
                <p>
                  The success of natural methods often depends on male cooperation, which can be challenging in contexts where men may be reluctant to abstain during fertile periods. This highlights the importance of male involvement in family planning education and decision-making.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Integration with modern healthcare</h4>
                <p>
                  In Nigeria today, there are efforts to integrate traditional spacing methods with modern fertility awareness education. Some NGOs and faith-based organizations provide training in natural methods alongside information about modern contraceptives, allowing families to make informed choices based on their values and needs.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Common questions about natural family planning in Nigeria</h3>

              <div className="mb-4">
                <h4 className="font-bold mb-2">How can I learn natural family planning methods properly?</h4>
                <p>
                  In Nigeria, training in natural family planning methods is available through:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Catholic hospitals and health centers</li>
                  <li>Some primary healthcare facilities</li>
                  <li>Family planning clinics</li>
                  <li>Trained community health workers</li>
                  <li>NGOs focused on reproductive health</li>
                </ul>
                <p>
                  It's important to receive proper instruction rather than relying solely on self-taught methods. Many organizations provide charts, cycle beads, or mobile apps to help track fertility signs.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Do natural methods work during breastfeeding?</h4>
                <p>
                  Breastfeeding itself can be a temporary natural method (called the Lactational Amenorrhea Method or LAM) if a woman is exclusively breastfeeding, has not resumed menstruation, and the baby is less than 6 months old. However, once any of these conditions change, another method should be used. Many women in Nigeria rely on breastfeeding for child spacing, but it's important to understand its limitations.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Can natural methods be used alongside modern methods?</h4>
                <p>
                  Yes, some couples use natural methods to identify fertile windows and then use barrier methods like condoms only during fertile days. This combined approach can be more effective than natural methods alone. In Nigeria, this integrated approach may be acceptable to those who have concerns about using hormonal methods continuously.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Are traditional herbs effective for preventing pregnancy?</h4>
                <p>
                  While various traditional herbs are used across Nigerian communities for contraception, most have not been scientifically validated, and some may have harmful side effects or inconsistent efficacy. It's advisable to consult healthcare providers about safer and more reliable options.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">On this page</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-[#00a499] hover:underline">About natural methods</a>
                </li>
                <li>
                  <a href="#types" className="text-[#00a499] hover:underline">Types of methods</a>
                </li>
                <li>
                  <a href="#effectiveness" className="text-[#00a499] hover:underline">Effectiveness</a>
                </li>
                <li>
                  <a href="#advantages" className="text-[#00a499] hover:underline">Advantages</a>
                </li>
                <li>
                  <a href="#disadvantages" className="text-[#00a499] hover:underline">Disadvantages</a>
                </li>
                <li>
                  <a href="#cultural-context" className="text-[#00a499] hover:underline">Cultural context</a>
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
                  <span>No medical side effects</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No ongoing costs</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aligns with religious values</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>76-88% effective with perfect use</span>
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
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Where to learn</h3>
              <p className="mb-4">
                In Nigeria, you can learn about natural family planning methods from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Catholic hospitals and clinics</li>
                <li>Primary healthcare centers</li>
                <li>Family planning clinics</li>
                <li>Community health workers</li>
                <li>NGOs focused on reproductive health</li>
              </ul>
              <p>
                Proper instruction is essential for effective use of these methods.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-[#00a499]">Need help?</h3>
              <p className="mb-4">
                Talk to a healthcare provider if you have questions about natural family planning or need advice on contraception options in Nigeria.
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

export default NaturalMethodsPage;
