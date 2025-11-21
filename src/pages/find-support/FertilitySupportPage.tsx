import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const FertilitySupportPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Find support', url: '/find-support' },
              { label: 'Fertility support', url: '/find-support/fertility' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Fertility Support Services</h1>
          <p className="text-xl font-medium">
            Resources and support for your fertility journey in Nigeria
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Support during your fertility journey</h2>
              <p className="mb-4">
                Dealing with fertility challenges can be emotionally and physically demanding.
                Support from healthcare professionals, counsellors, and others who understand
                what you're going through can make a significant difference.
              </p>
              <p>
                This page provides information about fertility support services and resources
                available in Nigeria.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of support available</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical support</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fertility specialists (reproductive endocrinologists)</li>
                    <li>Obstetricians and gynaecologists with fertility training</li>
                    <li>Fertility nurses</li>
                    <li>Embryologists</li>
                    <li>Urologists/andrologists (for male factor)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Emotional and psychological support</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fertility counsellors</li>
                    <li>Clinical psychologists</li>
                    <li>Peer support groups</li>
                    <li>Online communities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Complementary support</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nutritionists/dietitians</li>
                    <li>Acupuncturists</li>
                    <li>Yoga and relaxation therapists</li>
                    <li>Spiritual/faith-based counsellors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Professional organisations</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Association for Fertility and Reproductive Health (AFRH)</h3>
                  <p>
                    The leading professional body for fertility specialists in Nigeria. Members
                    are trained in reproductive medicine and can provide evidence-based fertility
                    care. The AFRH maintains standards for fertility clinics and practitioners.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Society of Gynaecology and Obstetrics of Nigeria (SOGON)</h3>
                  <p>
                    The national professional society for obstetricians and gynaecologists.
                    Some members have special interest or training in reproductive medicine.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Nigerian Medical Association (NMA)</h3>
                  <p>
                    The umbrella body for medical practitioners in Nigeria. Can help verify
                    the credentials of healthcare providers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Fertility clinics in Nigeria</h2>
              <p className="mb-4">
                Nigeria has numerous fertility clinics offering services ranging from basic
                fertility assessment to advanced treatments like IVF. Major cities with
                fertility services include:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Lagos</h3>
                  <p>
                    The largest concentration of fertility clinics in Nigeria, with both
                    private and teaching hospital-based services.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Abuja</h3>
                  <p>
                    Several established fertility centres serving the Federal Capital Territory
                    and surrounding states.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Port Harcourt</h3>
                  <p>
                    Fertility services available in the South-South region.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other cities</h3>
                  <p>
                    Ibadan, Benin City, Enugu, and other state capitals have fertility services,
                    though options may be more limited.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm">
                  <strong>Tip:</strong> When choosing a clinic, ask about their success rates
                  for your age group and condition, the qualifications of staff, what services
                  are offered, and total costs including medications.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Emotional support and counselling</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Why counselling matters</h3>
                  <p>
                    Fertility challenges can cause stress, anxiety, depression, relationship
                    strain, and grief. Counselling provides:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>A safe space to express feelings</li>
                    <li>Strategies for coping with treatment stress</li>
                    <li>Support for decision-making</li>
                    <li>Help with relationship communication</li>
                    <li>Processing grief from failed treatments or pregnancy loss</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">When to seek counselling</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Before starting treatment (to prepare mentally)</li>
                    <li>During treatment cycles (to manage stress)</li>
                    <li>After failed treatments</li>
                    <li>When considering next steps or stopping treatment</li>
                    <li>Before using donor gametes or surrogacy</li>
                    <li>Any time you feel overwhelmed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Finding a counsellor</h3>
                  <p>
                    Some fertility clinics have in-house counsellors. You can also seek
                    counsellors with experience in fertility through:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Nigerian Psychological Association</li>
                    <li>Association of Clinical Psychologists of Nigeria</li>
                    <li>Hospital psychology departments</li>
                    <li>Private practice therapists</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Support groups and communities</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Benefits of peer support</h3>
                  <p>
                    Connecting with others experiencing similar challenges can help you feel
                    less alone and provide practical information and emotional support from
                    people who truly understand.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Finding support groups</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Ask your fertility clinic about patient support groups</li>
                    <li>Search for Nigerian fertility support groups on social media</li>
                    <li>International online communities (forums, Facebook groups)</li>
                    <li>Faith-based support groups</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Online resources</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fertility Network (international)</li>
                    <li>RESOLVE: The National Infertility Association</li>
                    <li>Local Facebook and WhatsApp support groups</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Financial considerations</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Costs of fertility treatment</h3>
                  <p>
                    Fertility treatments in Nigeria are largely paid out-of-pocket. Costs vary
                    widely between clinics and depend on the treatment required. A single IVF
                    cycle can range from NGN 1.5 million to NGN 4 million or more.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Insurance</h3>
                  <p>
                    Most health insurance plans in Nigeria do not cover fertility treatments.
                    However, some international insurance plans may provide coverage. Always
                    check with your insurer about specific coverage.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Payment plans</h3>
                  <p>
                    Some clinics offer payment plans or partnerships with financial institutions
                    to help patients manage the costs. Ask your clinic about available options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Starting your journey</h3>
              <p className="text-sm mb-4">
                If you're just beginning to explore fertility issues:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-sm">
                <li>See a gynaecologist for initial assessment</li>
                <li>Get basic fertility tests done</li>
                <li>Consider referral to a fertility specialist</li>
                <li>Research clinics and treatment options</li>
                <li>Prepare financially</li>
                <li>Seek emotional support</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Questions to ask clinics</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>What are your success rates for my age?</li>
                <li>What treatments do you offer?</li>
                <li>What are the total costs?</li>
                <li>What is included in the quoted price?</li>
                <li>Do you offer counselling services?</li>
                <li>What are the qualifications of your embryologists?</li>
                <li>How many cycles do you recommend trying?</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">For partners and family</h3>
              <p className="text-sm mb-4">
                Supporting someone through fertility treatment:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Listen without judgement</li>
                <li>Avoid unhelpful advice or stories</li>
                <li>Offer practical help</li>
                <li>Respect privacy about the journey</li>
                <li>Attend appointments together</li>
                <li>Be patient with emotional ups and downs</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Self-care during treatment</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Maintain a healthy diet</li>
                <li>Get regular moderate exercise</li>
                <li>Prioritise sleep</li>
                <li>Limit alcohol and caffeine</li>
                <li>Find stress-relief activities</li>
                <li>Stay connected with supportive friends</li>
                <li>Consider counselling or therapy</li>
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
                  <Link to="/womens-health/fertility/age-and-fertility" className="text-[#d8157d] hover:underline">
                    Age and fertility
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/mental-health" className="text-[#d8157d] hover:underline">
                    Mental health support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>Association for Fertility and Reproductive Health (AFRH)</li>
                <li>World Health Organization (WHO)</li>
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>International Federation of Fertility Societies (IFFS)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilitySupportPage;
