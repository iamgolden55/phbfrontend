import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const EndometriosisFertilityPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Endometriosis', url: '/womens-health/fertility/problems/endometriosis' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Endometriosis and Fertility</h1>
          <p className="text-xl font-medium">
            How endometriosis affects fertility and available treatment options
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About endometriosis and fertility</h2>
              <p className="mb-4">
                Endometriosis is a condition where tissue similar to the uterine lining grows
                outside the uterus. It affects approximately 10% of women of reproductive age
                worldwide and is found in 25-50% of women with infertility.
              </p>
              <p>
                Many women with endometriosis conceive naturally, but the condition can affect
                fertility in several ways.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How endometriosis affects fertility</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Anatomical changes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Adhesions can distort pelvic anatomy</li>
                    <li>Fallopian tubes may become blocked or damaged</li>
                    <li>Ovarian cysts (endometriomas) can affect egg development</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg and embryo quality</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Inflammation may affect egg quality</li>
                    <li>Reduced ovarian reserve in some cases</li>
                    <li>Possible effects on embryo development</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Implantation issues</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Altered uterine environment</li>
                    <li>Changes to the endometrial lining</li>
                    <li>Immune system abnormalities</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Stages of endometriosis</h2>
              <p className="mb-4">
                Endometriosis is classified into stages I-IV based on the extent of disease:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Stage I-II (Minimal to Mild)</h3>
                  <p>
                    Small implants and superficial endometriosis. Women with mild endometriosis
                    may still have reduced fertility, though many conceive naturally.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Stage III-IV (Moderate to Severe)</h3>
                  <p>
                    Deep implants, endometriomas (chocolate cysts), and dense adhesions.
                    These stages have a more significant impact on fertility.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Note: The stage doesn't always correlate with symptoms or fertility outcomes.
                Some women with Stage I have significant pain and infertility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment options for fertility</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Expectant management</h3>
                  <p>
                    For mild endometriosis in younger women, trying to conceive naturally for
                    6-12 months may be recommended before other interventions.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Surgical treatment</h3>
                  <p className="mb-2">
                    Laparoscopic surgery can remove or destroy endometriosis tissue and adhesions:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Excision or ablation of endometriosis implants</li>
                    <li>Removal of endometriomas</li>
                    <li>Adhesiolysis (cutting adhesions)</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Surgery can improve natural conception rates, particularly for moderate-severe disease.
                    Studies show pregnancy rates of 30-40% within 9 months after surgery.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Fertility medications</h3>
                  <p>
                    Ovulation induction with clomifene or letrozole may be used, often combined
                    with IUI for mild endometriosis.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">IUI (Intrauterine insemination)</h3>
                  <p>
                    May be recommended for mild endometriosis when tubes are open. Success rates
                    are about 5-15% per cycle.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">IVF (In vitro fertilisation)</h3>
                  <p>
                    Often recommended for moderate-severe endometriosis or after failed surgery.
                    IVF bypasses many of the ways endometriosis affects conception.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Success rates are generally good for endometriosis</li>
                    <li>May be lower than for other fertility diagnoses</li>
                    <li>Severe endometriosis may affect ovarian response to stimulation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Important considerations</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Endometriomas and surgery</h3>
                  <p>
                    Removing ovarian endometriomas can reduce ovarian reserve. Your doctor will
                    weigh the benefits of surgery against potential loss of healthy ovarian tissue.
                    In some cases, IVF may be recommended instead of or before surgery.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical treatment</h3>
                  <p>
                    Hormonal treatments for endometriosis pain (like GnRH agonists or the pill)
                    are contraceptive and should be stopped when trying to conceive.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Recurrence</h3>
                  <p>
                    Endometriosis can recur after surgery. If you're delaying pregnancy, discuss
                    fertility preservation options like egg freezing with your doctor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">See a specialist if</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have painful periods and difficulty conceiving</li>
                <li>You've been diagnosed with endometriosis and want to conceive</li>
                <li>You've had endometriosis surgery and haven't conceived</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Fertility specialists</h3>
              <p className="text-sm mb-4">
                Look for fertility clinics with experience treating endometriosis.
                In Nigeria, registered fertility centres can be found through the
                Association for Fertility and Reproductive Health (AFRH).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/fertility" className="text-[#d8157d] hover:underline">
                    Fertility overview
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/periods/endometriosis" className="text-[#d8157d] hover:underline">
                    Endometriosis
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF treatment
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/surgery" className="text-[#d8157d] hover:underline">
                    Fertility surgery
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>World Endometriosis Society</li>
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>American Society for Reproductive Medicine (ASRM)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndometriosisFertilityPage;
