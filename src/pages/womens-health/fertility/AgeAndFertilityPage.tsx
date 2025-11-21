import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const AgeAndFertilityPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Fertility', url: '/womens-health/fertility' },
              { label: 'Age and fertility', url: '/womens-health/fertility/age-and-fertility' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Age and Fertility</h1>
          <p className="text-xl font-medium">
            How age affects your ability to conceive and have a healthy pregnancy
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">Key facts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Female fertility declines with age, most significantly after 35</li>
                <li>Women are born with all their eggs (about 1-2 million at birth)</li>
                <li>By puberty, about 300,000 eggs remain; by age 37, about 25,000</li>
                <li>Both egg quantity and quality decline with age</li>
                <li>Male fertility also declines with age, but more gradually</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Source: RCOG, HFEA
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How age affects female fertility</h2>
              <p className="mb-4">
                A woman's fertility naturally declines with age. This is because both the number
                and quality of eggs decrease over time.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Under 30</h3>
                  <p>
                    Women under 30 have about a 20-25% chance of conceiving naturally each month.
                    About 85% will conceive within one year of trying.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">30 to 34</h3>
                  <p>
                    Fertility begins to decline slightly. The monthly chance of conception is
                    about 15-20%. About 75% will conceive within one year.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">35 to 39</h3>
                  <p>
                    Fertility declines more significantly. The monthly chance drops to about 10-15%.
                    About 66% will conceive within one year. The risk of miscarriage increases to about 20%.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">40 to 44</h3>
                  <p>
                    Monthly chance of conception is about 5%. About 44% will conceive within one year.
                    Miscarriage risk increases to about 40%. Chromosomal abnormalities become more common.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">45 and over</h3>
                  <p>
                    Natural conception is rare. Most women will need fertility treatment with donor
                    eggs to conceive. Miscarriage risk exceeds 50%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Why fertility declines with age</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg quantity</h3>
                  <p>
                    Women are born with a fixed number of eggs. This number decreases each month
                    through ovulation and natural cell death. By menopause, very few eggs remain.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg quality</h3>
                  <p>
                    As eggs age, they are more likely to have chromosomal abnormalities. This
                    increases the risk of:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Failed fertilisation</li>
                    <li>Failed implantation</li>
                    <li>Miscarriage</li>
                    <li>Chromosomal conditions like Down's syndrome</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Other age-related factors</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Increased risk of conditions like endometriosis and fibroids</li>
                    <li>Decreased frequency of ovulation</li>
                    <li>Changes to the uterine lining</li>
                    <li>Higher rates of pregnancy complications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Male age and fertility</h2>
              <p className="mb-4">
                Male fertility also declines with age, though less dramatically than female fertility.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sperm quality (motility, morphology) decreases from about age 40</li>
                <li>Testosterone levels decline gradually from about age 30</li>
                <li>Time to conception increases when the male partner is over 45</li>
                <li>Older paternal age is associated with slightly increased risks of:
                  <ul className="list-disc pl-6 mt-1">
                    <li>Miscarriage</li>
                    <li>Some genetic conditions</li>
                    <li>Autism spectrum disorder</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">IVF success rates by age</h2>
              <p className="mb-4">
                According to HFEA data, IVF success rates using a woman's own eggs decline with age:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#fdf2f8]">
                      <th className="border border-gray-200 px-4 py-2 text-left">Age</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Birth rate per embryo transferred</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Under 35</td>
                      <td className="border border-gray-200 px-4 py-2">29%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">35-37</td>
                      <td className="border border-gray-200 px-4 py-2">23%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">38-39</td>
                      <td className="border border-gray-200 px-4 py-2">15%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">40-42</td>
                      <td className="border border-gray-200 px-4 py-2">9%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">43-44</td>
                      <td className="border border-gray-200 px-4 py-2">3%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Over 44</td>
                      <td className="border border-gray-200 px-4 py-2">2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Source: HFEA Fertility Trends Report 2021
              </p>
              <p className="mt-2">
                With donor eggs, success rates remain at about 30% regardless of the recipient's age,
                as the egg age is what matters most.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Fertility preservation options</h2>
              <p className="mb-4">
                If you want to delay childbearing but are concerned about age-related fertility
                decline, you may consider fertility preservation:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Egg freezing</h3>
                  <p>
                    Eggs are collected and frozen for future use. Success rates are best when
                    eggs are frozen before age 35. The HFEA reports that eggs frozen at younger
                    ages have better outcomes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Embryo freezing</h3>
                  <p>
                    If you have a partner or are using donor sperm, you can freeze embryos.
                    Frozen embryos have similar success rates to fresh embryos.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Egg and embryo freezing are not guaranteed to result in a baby. Success depends
                on the age at freezing, number of eggs/embryos, and other factors.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to seek help</h3>
              <p className="mb-4">
                Talk to your GP about fertility if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You're under 35 and haven't conceived after 1 year of trying</li>
                <li>You're 35-39 and haven't conceived after 6 months</li>
                <li>You're 40+ and want to conceive</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Testing ovarian reserve</h3>
              <p className="mb-4 text-sm">
                Tests can give an indication of egg quantity (not quality):
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>AMH blood test:</strong> Measures anti-Müllerian hormone</li>
                <li><strong>AFC scan:</strong> Counts visible follicles on ovaries</li>
                <li><strong>FSH blood test:</strong> High levels may indicate reduced reserve</li>
              </ul>
              <p className="mt-4 text-xs text-gray-600">
                These tests indicate likely response to IVF medications but don't predict
                natural conception chances.
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
                  <Link to="/womens-health/fertility/treatments/ivf" className="text-[#d8157d] hover:underline">
                    IVF treatment
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/fertility/treatments/donor" className="text-[#d8157d] hover:underline">
                    Donor eggs and sperm
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/pregnancy" className="text-[#d8157d] hover:underline">
                    Pregnancy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>Human Fertilisation and Embryology Authority (HFEA)</li>
                <li>Royal College of Obstetricians and Gynaecologists (RCOG)</li>
                <li>NICE Fertility Guidelines (CG156)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeAndFertilityPage;
