import React from 'react';
import { Link } from 'react-router-dom';

interface SectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

const PlanningPregnancyPage: React.FC = () => {
  const sections: SectionType[] = [
    {
      id: 'getting-started',
      title: 'Getting started',
      content: (
        <div>
          <p className="mb-4">
            If you\'re planning to have a baby, there are things you can do before you conceive to improve your chances of getting pregnant and having a healthy pregnancy.
          </p>
          <p className="mb-4">
            Preparing for pregnancy physically, emotionally, and financially can help ensure the best start for you and your baby.
          </p>
          <div className="bg-blue-50 p-4 rounded-md my-4">
            <h3 className="font-bold mb-2">When to seek help</h3>
            <p>
              If you\'ve been trying to conceive for more than a year (or 6 months if you\'re over 35), talk to your GP about fertility testing and treatments.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'before-conception',
      title: 'Before conception',
      content: (
        <div>
          <h3 className="font-medium text-lg mb-3">For women:</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Start taking <strong>folic acid supplements</strong> (400 micrograms daily) at least 3 months before trying to conceive to help prevent neural tube defects like spina bifida.</li>
            <li>Consider taking a <strong>vitamin D supplement</strong> (10 micrograms daily) throughout pregnancy and breastfeeding.</li>
            <li>Make sure your <strong>vaccinations are up to date</strong>, especially rubella (German measles), as this can harm your unborn baby.</li>
            <li>If you have a pre-existing medical condition like diabetes, epilepsy, or asthma, talk to your doctor about how to manage it during pregnancy.</li>
            <li>Consider having a <strong>preconception check-up</strong> with your GP to discuss your health history and any potential risks.</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">For men:</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Maintain a <strong>healthy lifestyle</strong> to support sperm quality.</li>
            <li>Avoid excessive heat to the testicles (like hot tubs or saunas) as it can temporarily reduce sperm production.</li>
            <li>Consider a health check with your GP, particularly if you have any chronic health conditions or take medications.</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">For both partners:</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Quit <strong>smoking</strong> - smoking reduces fertility in both men and women and increases the risk of pregnancy complications.</li>
            <li>Cut down on <strong>alcohol</strong> - alcohol can affect fertility and harm your developing baby.</li>
            <li>Maintain a <strong>healthy weight</strong> - being underweight or overweight can affect your fertility and increase pregnancy risks.</li>
            <li>Eat a <strong>balanced diet</strong> with plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats.</li>
            <li>Exercise <strong>regularly</strong> to maintain good physical and mental health.</li>
            <li>Reduce <strong>stress</strong> through relaxation techniques, adequate sleep, and regular exercise.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'timing',
      title: 'Timing and tracking fertility',
      content: (
        <div>
          <p className="mb-4">
            Understanding your menstrual cycle and recognizing signs of fertility can help you identify the best time to try for a baby.
          </p>

          <h3 className="font-medium text-lg mb-3">Ovulation and fertility window</h3>
          <p className="mb-4">
            Ovulation typically occurs around day 14 of a 28-day menstrual cycle, but this can vary. Your most fertile time is the day of ovulation and the 5 days before (the "fertility window").
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Signs of ovulation</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Change in cervical mucus (becomes clearer, slippery, and stretchy)</li>
                <li>Slight rise in basal body temperature</li>
                <li>Mild abdominal pain or cramping</li>
                <li>Increased sex drive</li>
                <li>Light spotting</li>
                <li>Breast tenderness</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Ways to track fertility</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Calendar tracking</li>
                <li>Basal body temperature charting</li>
                <li>Checking cervical mucus</li>
                <li>Ovulation predictor kits</li>
                <li>Fertility tracking apps</li>
                <li>Fertility monitors</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">How often to have sex</h3>
          <p className="mb-4">
            Having sex every 2-3 days throughout your cycle gives you the best chance of getting pregnant. Trying to time sex precisely with ovulation can create stress, which may affect your chances.
          </p>
        </div>
      )
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle changes',
      content: (
        <div>
          <p className="mb-4">
            Making healthy lifestyle changes before conception can improve your chances of getting pregnant and having a healthy pregnancy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-green-700">Recommended</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Regular exercise</strong> - aim for at least 150 minutes of moderate activity per week</li>
                <li><strong>Balanced diet</strong> - rich in fruits, vegetables, whole grains, lean protein, and healthy fats</li>
                <li><strong>Maintain a healthy weight</strong> - aim for a BMI between 18.5 and 24.9</li>
                <li><strong>Stay hydrated</strong> - drink plenty of water throughout the day</li>
                <li><strong>Take folic acid supplements</strong> - 400 micrograms daily</li>
                <li><strong>Manage stress</strong> - through relaxation techniques, meditation, or yoga</li>
                <li><strong>Get enough sleep</strong> - aim for 7-9 hours per night</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-red-700">Avoid</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Smoking</strong> - quit smoking completely</li>
                <li><strong>Alcohol</strong> - avoid alcohol when trying to conceive</li>
                <li><strong>Recreational drugs</strong> - stop using all recreational drugs</li>
                <li><strong>Too much caffeine</strong> - limit to 200mg per day (about 2 cups of coffee)</li>
                <li><strong>Environmental toxins</strong> - limit exposure to chemicals, pesticides, and lead</li>
                <li><strong>Excessive exercise</strong> - very intense exercise can sometimes affect fertility</li>
                <li><strong>High-mercury fish</strong> - limit consumption of shark, swordfish, king mackerel, and tilefish</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'health-conditions',
      title: 'Managing health conditions',
      content: (
        <div>
          <p className="mb-4">
            If you have pre-existing health conditions, it\'s important to manage them effectively before and during pregnancy.
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h3 className="font-bold mb-3">Common health conditions to manage before pregnancy:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Diabetes</h4>
                <p className="text-sm">
                  Aim for optimal blood sugar control before conception, as high blood sugar can increase the risk of birth defects and complications.
                </p>
              </div>
              <div>
                <h4 className="font-medium">High blood pressure</h4>
                <p className="text-sm">
                  Work with your healthcare provider to control your blood pressure, as certain blood pressure medications aren\'t safe during pregnancy.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Thyroid disorders</h4>
                <p className="text-sm">
                  Ensure your thyroid condition is well-controlled, as both overactive and underactive thyroid can affect fertility and pregnancy.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Epilepsy</h4>
                <p className="text-sm">
                  Consult with your neurologist about epilepsy medications, as some may need to be adjusted before pregnancy.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Mental health conditions</h4>
                <p className="text-sm">
                  Discuss with your healthcare provider how to manage conditions like depression or anxiety during pregnancy, including medication safety.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500">
            <h3 className="font-bold mb-2">Important</h3>
            <p>
              Always consult with your healthcare provider before stopping or changing any prescribed medications. Some medications require careful management during pregnancy planning.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'genetic-counseling',
      title: 'Genetic counseling',
      content: (
        <div>
          <p className="mb-4">
            Genetic counseling helps assess the risk of passing genetic disorders to your children. Consider genetic counseling if:
          </p>

          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>You or your partner have a family history of genetic disorders like cystic fibrosis, sickle cell anemia, or Tay-Sachs disease</li>
            <li>You\'ve had previous children with birth defects or genetic disorders</li>
            <li>You\'ve experienced multiple miscarriages</li>
            <li>You\'re of an ethnic background with higher risks for certain genetic conditions</li>
            <li>You\'re over 35 years old (increased risk of chromosomal abnormalities)</li>
            <li>You and your partner are closely related (e.g., cousins)</li>
          </ul>

          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
            <h3 className="font-bold mb-3">What to expect from genetic counseling:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Discussion of your family health history</li>
              <li>Assessment of potential genetic risks</li>
              <li>Information about genetic testing options</li>
              <li>Explanation of test results</li>
              <li>Support for decision-making</li>
              <li>Referrals to specialists if needed</li>
            </ul>
          </div>

          <p>
            Your GP can refer you to a genetic counselor, or you may be referred through a fertility specialist.
          </p>
        </div>
      )
    },
    {
      id: 'finances',
      title: 'Financial planning',
      content: (
        <div>
          <p className="mb-4">
            Having a baby impacts your finances in many ways. Planning ahead can help reduce financial stress during pregnancy and after your baby arrives.
          </p>

          <h3 className="font-medium text-lg mb-3">Financial considerations:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Short-term costs</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Prenatal vitamins and healthcare</li>
                <li>Maternity clothes</li>
                <li>Baby gear (cot, pram, car seat, etc.)</li>
                <li>Baby clothes and supplies</li>
                <li>Hospital or birth center fees (if not covered by insurance)</li>
                <li>Additional healthcare expenses</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Long-term planning</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Childcare costs</li>
                <li>Potential reduced income during parental leave</li>
                <li>Changes to working arrangements</li>
                <li>Additional living expenses</li>
                <li>Education savings</li>
                <li>Updated life insurance and will</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Financial support available:</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Statutory Maternity Pay/Maternity Allowance</strong> - financial support while on maternity leave</li>
            <li><strong>Statutory Paternity Pay</strong> - for partners taking paternity leave</li>
            <li><strong>Shared Parental Leave and Pay</strong> - allows parents to share time off after the birth</li>
            <li><strong>Child Benefit</strong> - regular payments to help with the cost of raising a child</li>
            <li><strong>Sure Start Maternity Grant</strong> - a one-off payment to help with the costs of a newborn</li>
            <li><strong>Tax credits and Universal Credit</strong> - depending on your income and circumstances</li>
            <li><strong>Healthy Start vouchers</strong> - for milk, fruit, vegetables and formula if you\'re on a low income</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm">
              <strong>Tip:</strong> Visit <a href="https://www.gov.uk/browse/childcare-parenting/financial-help-children" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">gov.uk</a> for the most up-to-date information on benefits and financial support available for parents.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'fertility-problems',
      title: 'Fertility problems',
      content: (
        <div>
          <p className="mb-4">
            About 1 in 7 couples may have difficulty conceiving. If you\'ve been trying for a baby without success, there are steps you can take.
          </p>

          <h3 className="font-medium text-lg mb-3">When to seek help:</h3>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>If you\'re under 35 and have been trying for more than a year</li>
            <li>If you\'re 35 or over and have been trying for more than 6 months</li>
            <li>If you have known fertility issues (irregular periods, endometriosis, etc.)</li>
            <li>If you\'ve had multiple miscarriages</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Common causes of fertility problems:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">For women</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ovulation problems</li>
                <li>Polycystic ovary syndrome (PCOS)</li>
                <li>Endometriosis</li>
                <li>Fibroids</li>
                <li>Blocked or damaged fallopian tubes</li>
                <li>Age-related fertility decline</li>
                <li>Thyroid problems</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">For men</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Low sperm count</li>
                <li>Poor sperm quality or movement</li>
                <li>Abnormal sperm shape</li>
                <li>Erectile dysfunction</li>
                <li>Ejaculation problems</li>
                <li>Testicular damage or surgery</li>
                <li>Hormonal imbalances</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Fertility treatment options:</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Lifestyle changes</strong> - improving diet, exercise, and stopping smoking</li>
            <li><strong>Medications</strong> - to assist with ovulation or hormonal issues</li>
            <li><strong>Surgery</strong> - to treat conditions like endometriosis or blocked fallopian tubes</li>
            <li><strong>Intrauterine insemination (IUI)</strong> - placing sperm directly into the uterus</li>
            <li><strong>In vitro fertilization (IVF)</strong> - fertilizing eggs outside the body</li>
            <li><strong>Intracytoplasmic sperm injection (ICSI)</strong> - injecting a single sperm directly into an egg</li>
            <li><strong>Donor insemination or eggs</strong> - using sperm or eggs from a donor</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-md">
            <p>
              <strong>Public fertility treatment:</strong> Availability of publicly-funded fertility treatment varies by location. Your GP can provide information about criteria and waiting times in your area.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Planning Your Pregnancy</h1>
          <p className="text-xl font-medium">
            Information and advice on getting pregnant, including how to improve your chances and when to seek help
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg sticky top-4">
              <h2 className="font-bold text-lg mb-4">On this page</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block hover:text-blue-600 hover:underline transition-colors py-1"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="border-t border-gray-300 mt-6 pt-6">
                <h3 className="font-bold mb-3">Related information</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/pregnancy/early" className="text-[#0891b2] hover:underline text-sm">Early pregnancy</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/first-prenatal-visit" className="text-[#0891b2] hover:underline text-sm">Your first prenatal visit</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/early-pregnancy-symptoms" className="text-[#0891b2] hover:underline text-sm">Early pregnancy symptoms</Link>
                  </li>
                  <li>
                    <Link to="/tools/due-date-calculator" className="text-[#0891b2] hover:underline text-sm">Due date calculator</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="prose max-w-none">
                <p className="text-lg">
                  Whether you\'re just thinking about having a baby or actively trying to conceive, planning ahead can help increase your chances of a healthy pregnancy. This guide provides information on the steps you can take before pregnancy to prepare your body, manage health conditions, and address potential fertility issues.
                </p>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">{section.title}</h2>
                <div className="prose max-w-none">{section.content}</div>
              </section>
            ))}

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h2 className="text-xl font-bold mb-4">Ready to take the next step?</h2>
              <p className="mb-4">
                If you\'ve been planning and are now pregnant, or think you might be pregnant, here\'s what to do next:
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="font-bold mr-2">1.</span>
                  <div>
                    <p className="font-medium">Take a pregnancy test</p>
                    <p className="text-sm text-gray-600">Home pregnancy tests are reliable from the first day of your missed period.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold mr-2">2.</span>
                  <div>
                    <p className="font-medium">Contact your GP</p>
                    <p className="text-sm text-gray-600">Make an appointment with your GP to confirm your pregnancy and discuss next steps.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold mr-2">3.</span>
                  <div>
                    <p className="font-medium">Continue with healthy habits</p>
                    <p className="text-sm text-gray-600">Keep taking folic acid, maintain a healthy lifestyle, and avoid alcohol and smoking.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold mr-2">4.</span>
                  <div>
                    <p className="font-medium">Learn about early pregnancy</p>
                    <p className="text-sm text-gray-600">
                      Read our <Link to="/pregnancy/early" className="text-[#0891b2] hover:underline">Early pregnancy guide</Link> for information on what to expect in the first trimester.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link to="/pregnancy" className="text-[#0891b2] font-medium hover:underline flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to pregnancy home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningPregnancyPage;
