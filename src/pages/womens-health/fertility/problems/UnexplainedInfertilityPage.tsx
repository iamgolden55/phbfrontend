import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const UnexplainedInfertilityPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Unexplained infertility', url: '/womens-health/fertility/problems/unexplained-infertility' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Unexplained Infertility</h1>
          <p className="text-xl font-medium">
            When no specific cause is found for difficulty conceiving
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About unexplained infertility</h2>
              <p className="mb-4">
                Unexplained infertility is diagnosed when all standard fertility tests come back
                normal, yet conception hasn't occurred after 12 months of trying. It accounts
                for about 25-30% of all infertility cases.
              </p>
              <p>
                This doesn't mean there's no cause - it means the cause hasn't been identified
                with current testing methods.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Standard fertility tests</h2>
              <p className="mb-4">
                To diagnose unexplained infertility, these tests should be normal:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">For women</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Confirmation of ovulation (progesterone blood test)</li>
                    <li>Tubal patency test (HSG or laparoscopy showing open tubes)</li>
                    <li>Normal ovarian reserve (AMH, FSH, antral follicle count)</li>
                    <li>Normal uterine cavity (ultrasound or hysteroscopy)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">For men</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Normal semen analysis (sperm count, motility, morphology)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Possible hidden causes</h2>
              <p className="mb-4">
                Standard tests may not detect certain subtle problems:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg quality issues</h3>
                  <p>
                    Egg quality cannot be tested directly. Poor egg quality can affect
                    fertilisation and embryo development even when ovulation is normal.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Subtle sperm function problems</h3>
                  <p>
                    Standard semen analysis doesn't test sperm function - how well sperm can
                    fertilise an egg. DNA fragmentation or other sperm issues may exist.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Implantation issues</h3>
                  <p>
                    The embryo may be fertilising but failing to implant due to subtle
                    problems with the uterine lining or immune factors.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Mild endometriosis</h3>
                  <p>
                    Minimal endometriosis can affect fertility but may not be detected
                    without laparoscopy (which isn't always performed for all couples).
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Cervical factors</h3>
                  <p>
                    Problems with cervical mucus that prevent sperm from entering the uterus
                    are rarely tested for today.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment options</h2>
              <p className="mb-4">
                Treatment typically follows a stepwise approach:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">1. Expectant management</h3>
                  <p className="mb-2">
                    For younger couples with a shorter duration of infertility, continuing to
                    try naturally may be recommended.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>About 15-25% of couples conceive within the next year</li>
                    <li>Cumulative conception rate over 3 years is about 30-40%</li>
                    <li>More suitable for women under 35</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">2. Ovarian stimulation with IUI</h3>
                  <p className="mb-2">
                    Fertility medications (clomifene or gonadotrophins) combined with
                    intrauterine insemination:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Success rate about 8-15% per cycle</li>
                    <li>Usually tried for 3-6 cycles</li>
                    <li>Risk of multiple pregnancy with stimulation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">3. IVF (In vitro fertilisation)</h3>
                  <p className="mb-2">
                    Often recommended after failed IUI or for older women:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Success rates depend on age (20-40% per cycle under 35)</li>
                    <li>May reveal hidden problems (poor fertilisation, poor embryo quality)</li>
                    <li>Generally higher success rates than IUI</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Some guidelines recommend moving directly to IVF for women over 38 or after
                    3 years of unexplained infertility.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Lifestyle factors</h2>
              <p className="mb-4">
                While lifestyle changes alone may not overcome unexplained infertility, they
                can optimise your chances:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">For both partners</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Maintain healthy weight (BMI 18.5-24.9)</li>
                    <li>Stop smoking</li>
                    <li>Limit alcohol</li>
                    <li>Reduce caffeine</li>
                    <li>Manage stress</li>
                    <li>Regular moderate exercise</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Additional for women</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Take folic acid (400mcg daily)</li>
                    <li>Consider vitamin D</li>
                    <li>Ensure regular intercourse (every 2-3 days)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Prognosis</h2>
              <p className="mb-4">
                The outlook for unexplained infertility is actually better than for some
                known causes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Many couples conceive naturally given enough time</li>
                <li>Response to fertility treatments is generally good</li>
                <li>Younger age and shorter duration of infertility predict better outcomes</li>
                <li>Most couples will eventually achieve pregnancy with treatment</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Coping with uncertainty</h3>
              <p className="text-sm mb-4">
                Not knowing the cause can be frustrating. It may help to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Focus on what you can control (lifestyle)</li>
                <li>Set time limits for each treatment stage</li>
                <li>Seek emotional support</li>
                <li>Consider counselling</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Additional testing</h3>
              <p className="text-sm mb-4">
                Some couples choose additional tests not routinely performed:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Laparoscopy (to check for endometriosis)</li>
                <li>Sperm DNA fragmentation testing</li>
                <li>Hysteroscopy</li>
                <li>Immune testing (though evidence is limited)</li>
              </ul>
              <p className="mt-2 text-xs text-gray-600">
                Discuss with your specialist whether additional tests would be helpful in your case.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Treatment options</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/fertility/treatments/medication" className="text-[#d8157d] hover:underline">
                    Fertility medications
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/iui" className="text-[#d8157d] hover:underline">
                    IUI
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/find-support/fertility" className="text-[#d8157d] hover:underline">
                    Find fertility support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>Practice Committee Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnexplainedInfertilityPage;
