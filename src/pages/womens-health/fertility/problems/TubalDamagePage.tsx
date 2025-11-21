import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const TubalDamagePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Tubal damage', url: '/womens-health/fertility/problems/tubal-damage' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Fallopian Tube Damage</h1>
          <p className="text-xl font-medium">
            Blocked or damaged fallopian tubes account for about 20% of female infertility
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About tubal damage</h2>
              <p className="mb-4">
                The fallopian tubes connect the ovaries to the uterus. After ovulation, the egg
                travels through the tube where fertilisation occurs. The fertilised embryo then
                travels to the uterus for implantation.
              </p>
              <p>
                Damage or blockage to the tubes can prevent the egg and sperm from meeting,
                or stop the embryo from reaching the uterus.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Causes of tubal damage</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Pelvic inflammatory disease (PID)</h3>
                  <p>
                    The most common cause of tubal damage. PID is usually caused by sexually
                    transmitted infections like chlamydia or gonorrhoea. Infection causes
                    inflammation and scarring of the tubes.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    About 10-20% of women with PID develop infertility. Risk increases with
                    repeated infections.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Previous ectopic pregnancy</h3>
                  <p>
                    An ectopic pregnancy occurs when an embryo implants in the fallopian tube.
                    Treatment may damage the tube, and the underlying cause may affect both tubes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Endometriosis</h3>
                  <p>
                    Endometriosis can cause adhesions (scar tissue) that block or distort the
                    tubes. It can also affect the function of the tubes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Previous surgery</h3>
                  <p>
                    Abdominal or pelvic surgery can cause adhesions that affect the tubes. This
                    includes surgery for:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Appendicitis</li>
                    <li>Ovarian cysts</li>
                    <li>Ectopic pregnancy</li>
                    <li>Caesarean section</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other causes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Congenital abnormalities (present from birth)</li>
                    <li>Previous sterilisation</li>
                    <li>Tuberculosis (rare in UK)</li>
                    <li>Hydrosalpinx (fluid-filled tube)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
              <p className="mb-4">
                Tubal damage often has no symptoms, so testing is important:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Hysterosalpingography (HSG)</h3>
                  <p>
                    An X-ray procedure where dye is injected through the cervix. The dye shows
                    whether the tubes are open. This is usually the first test recommended by NICE.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Hysterosalpingo-contrast-sonography (HyCoSy)</h3>
                  <p>
                    Similar to HSG but uses ultrasound instead of X-ray. No radiation exposure.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Laparoscopy</h3>
                  <p>
                    A surgical procedure using a camera inserted through small abdominal incisions.
                    Dye is passed through the tubes to check they're open. This allows direct
                    visualisation and treatment of any adhesions or endometriosis found.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Chlamydia antibody testing</h3>
                  <p>
                    A blood test that shows if you've had a previous chlamydia infection, which
                    indicates higher risk of tubal damage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment options</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Tubal surgery</h3>
                  <p className="mb-2">
                    Surgery to repair the tubes may be considered for mild tubal damage. Options include:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Salpingostomy:</strong> Creating a new opening in a blocked tube</li>
                    <li><strong>Fimbrioplasty:</strong> Repairing the fimbriae (finger-like ends of tubes)</li>
                    <li><strong>Adhesiolysis:</strong> Removing adhesions around the tubes</li>
                    <li><strong>Tubal reanastomosis:</strong> Reversing sterilisation</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Success rates vary: 20-30% pregnancy rate for mild damage, lower for severe damage.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">IVF (In vitro fertilisation)</h3>
                  <p>
                    IVF bypasses the tubes entirely by fertilising eggs in the laboratory.
                    This is often recommended for:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Bilateral (both tubes) blockage</li>
                    <li>Severe tubal damage</li>
                    <li>After failed tubal surgery</li>
                    <li>When other fertility factors are present</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Salpingectomy before IVF</h3>
                  <p>
                    If you have a hydrosalpinx (fluid-filled tube), NICE recommends removing
                    the affected tube before IVF. This is because the fluid can reduce IVF
                    success rates by about 50%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Prevention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>STI prevention:</strong> Use condoms and get regular sexual health
                  checks to prevent chlamydia and gonorrhoea
                </li>
                <li>
                  <strong>Prompt treatment:</strong> Seek medical attention quickly for any
                  symptoms of infection (unusual discharge, pelvic pain, pain during sex)
                </li>
                <li>
                  <strong>Chlamydia screening:</strong> Women under 25 should be screened annually
                  and when they change sexual partners
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-600">Ectopic pregnancy warning</h3>
              <p className="mb-4 text-sm">
                Women with tubal damage have a higher risk of ectopic pregnancy. Seek urgent
                medical help if you experience:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Sharp abdominal pain on one side</li>
                <li>Vaginal bleeding with a positive pregnancy test</li>
                <li>Shoulder tip pain</li>
                <li>Dizziness or fainting</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Treatment decision</h3>
              <p className="text-sm">
                The choice between surgery and IVF depends on:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                <li>Extent of tubal damage</li>
                <li>Your age</li>
                <li>Duration of infertility</li>
                <li>Other fertility factors</li>
                <li>Your preferences</li>
              </ul>
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
                  <Link to="/womens-health/fertility/problems/endometriosis" className="text-[#d8157d] hover:underline">
                    Endometriosis and fertility
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF treatment
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>NICE Fertility Guidelines (CG156)</li>
                <li>Royal College of Obstetricians and Gynaecologists</li>
                <li>British Fertility Society</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TubalDamagePage;
