import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../../components/Breadcrumbs';

const DonorPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Donor treatment', url: '/womens-health/fertility/treatments/donor' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Donor Eggs, Sperm, and Embryos</h1>
          <p className="text-xl font-medium">
            Using donated reproductive material to help you have a baby
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About donor treatment</h2>
              <p className="mb-4">
                Donor treatment uses eggs, sperm, or embryos from another person to help
                you have a baby. Donors may be anonymous or known (such as a friend or relative).
              </p>
              <p>
                Success rates with donor eggs are high regardless of the recipient's age,
                making this an effective option for many.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Donor eggs</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Who might need donor eggs?</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Premature ovarian failure/insufficiency</li>
                    <li>Advanced maternal age (over 40-42)</li>
                    <li>Repeated IVF failure with own eggs</li>
                    <li>Poor egg quality</li>
                    <li>Carriers of genetic disorders</li>
                    <li>Previous cancer treatment affecting ovaries</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">The process</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Donor undergoes ovarian stimulation and egg collection</li>
                    <li>Eggs are fertilised with partner's or donor sperm</li>
                    <li>Recipient takes hormones to prepare the uterus</li>
                    <li>Embryo(s) transferred to recipient's uterus</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Success rates</h3>
                  <p>
                    Live birth rates per cycle are about 40-50% when using eggs from
                    donors under 35, regardless of the recipient's age.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Donor sperm</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Who might need donor sperm?</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Azoospermia (no sperm in ejaculate) where retrieval fails</li>
                    <li>Severe male factor infertility</li>
                    <li>Single women</li>
                    <li>Same-sex female couples</li>
                    <li>Carriers of genetic disorders</li>
                    <li>After failed vasectomy reversal</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Treatment options</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>IUI:</strong> Simplest option if tubes are open</li>
                    <li><strong>IVF:</strong> If other fertility issues exist</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Success rates</h3>
                  <p>
                    IUI with donor sperm: 15-25% per cycle for women under 35.
                    IVF with donor sperm: similar to standard IVF rates.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Donor embryos</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">About embryo donation</h3>
                  <p>
                    Embryos donated by couples who have completed their families after IVF.
                    May be an option when both egg and sperm donation would be needed.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Availability</h3>
                  <p>
                    Donor embryos are less commonly available than donor eggs or sperm.
                    Wait times may be longer.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Donor selection and screening</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Donor screening includes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Medical history and family history</li>
                    <li>Physical examination</li>
                    <li>Screening for infectious diseases (HIV, Hepatitis B/C, Syphilis)</li>
                    <li>Genetic testing for common conditions</li>
                    <li>Psychological evaluation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Information about donors</h3>
                  <p>
                    You can usually choose donors based on physical characteristics, ethnicity,
                    education, occupation, and personal interests. Some clinics provide detailed
                    profiles including childhood photos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Considerations</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Legal considerations</h3>
                  <p>
                    The legal parent(s) are those who carry the pregnancy and/or their partner,
                    regardless of genetic connection. Donors have no legal parental rights
                    or responsibilities.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Telling your child</h3>
                  <p>
                    Research suggests it's best to tell children about their donor conception
                    from an early age. Many clinics offer support and resources for this.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Counselling</h3>
                  <p>
                    Counselling is recommended for all parties (recipients, donors, and partners)
                    to explore the emotional, social, and ethical aspects of donor treatment.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Known vs anonymous donors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Anonymous:</strong> Donors recruited by the clinic</li>
                    <li><strong>Known:</strong> Friend or family member (requires careful consideration)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Waiting times</h3>
              <p className="text-sm">
                Waiting times for donor treatment vary depending on availability.
                Some clinics have egg-sharing programmes that may reduce waiting times.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Costs</h3>
              <p className="text-sm mb-4">
                Donor treatment typically involves:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Clinic treatment fees</li>
                <li>Donor compensation (where applicable)</li>
                <li>Medications</li>
                <li>Screening tests</li>
              </ul>
              <p className="mt-2 text-xs text-gray-600">
                Costs vary widely between clinics and countries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related treatments</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/iui" className="text-[#d8157d] hover:underline">
                    IUI
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/surrogacy" className="text-[#d8157d] hover:underline">
                    Surrogacy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>European Society of Human Reproduction and Embryology (ESHRE)</li>
                <li>American Society for Reproductive Medicine (ASRM)</li>
                <li>Human Fertilisation and Embryology Authority (HFEA)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorPage;
