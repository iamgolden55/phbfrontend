import React from 'react';
import { Link } from 'react-router-dom';

interface SectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

const EarlyPregnancyPage: React.FC = () => {
  const sections: SectionType[] = [
    {
      id: 'first-trimester',
      title: 'The first trimester (weeks 1-12)',
      content: (
        <div>
          <p className="mb-4">
            The first trimester spans from week 1 to week 12 of your pregnancy. During this time, your baby develops from a single cell to a fully formed fetus with all major organs in place.
          </p>
          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">First trimester development highlights:</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium">Weeks 1-4</h4>
                <p className="text-sm">
                  Fertilization occurs, and the fertilized egg develops into a blastocyst and implants in the uterine lining. The placenta and amniotic sac begin to form.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Weeks 5-8</h4>
                <p className="text-sm">
                  The embryo\'s heart begins to beat, and rudimentary forms of the brain, spinal cord, and gastrointestinal tract develop. Tiny limb buds that will become arms and legs appear.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Weeks 9-12</h4>
                <p className="text-sm">
                  The embryo is now called a fetus. All essential organs have formed, fingers and toes develop, and external genitalia begin to differentiate. By week 12, your baby is about 6cm (2.5 inches) long.
                </p>
              </div>
            </div>
          </div>
          <p className="mb-4">
            While your baby is rapidly developing, your body is also undergoing significant changes to support this new life. Many women experience various symptoms during the first trimester.
          </p>
          <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500 mb-4">
            <h3 className="font-bold mb-2">Important</h3>
            <p>
              The first 12 weeks are critical for your baby\'s development. Taking care of your health during this time is especially important. Continue taking folic acid supplements, avoid alcohol and smoking, and discuss any medications with your healthcare provider.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'common-symptoms',
      title: 'Common symptoms and changes',
      content: (
        <div>
          <p className="mb-6">
            Many women experience a range of physical and emotional changes during early pregnancy. These symptoms can vary greatly from person to person – you may have all of them, some of them, or none at all.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-3">Physical changes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Morning sickness</strong> – nausea and vomiting that can occur at any time of day</li>
                <li><strong>Fatigue</strong> – feeling extremely tired, especially in the first 12 weeks</li>
                <li><strong>Breast changes</strong> – tenderness, swelling, and darkening of the areolas</li>
                <li><strong>Frequent urination</strong> – due to hormonal changes and increased blood flow to the kidneys</li>
                <li><strong>Food cravings or aversions</strong> – sudden likes or dislikes for certain foods</li>
                <li><strong>Heightened sense of smell</strong> – sensitivity to odors that may trigger nausea</li>
                <li><strong>Mild cramping</strong> – as your uterus expands</li>
                <li><strong>Slight spotting</strong> – when the fertilized egg implants in the uterus</li>
                <li><strong>Constipation</strong> – due to hormonal changes slowing digestion</li>
                <li><strong>Heartburn and indigestion</strong> – as hormones relax the valve between your stomach and esophagus</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-3">Emotional changes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Mood swings</strong> – sudden changes in mood due to hormonal fluctuations</li>
                <li><strong>Anxiety</strong> – about pregnancy, birth, or becoming a parent</li>
                <li><strong>Mixed emotions</strong> – excitement, worry, joy, or even ambivalence</li>
                <li><strong>Forgetfulness</strong> – sometimes called "pregnancy brain"</li>
                <li><strong>Changes in interest in sex</strong> – may increase or decrease</li>
                <li><strong>Worrying about miscarriage</strong> – common in early pregnancy</li>
                <li><strong>Vivid dreams</strong> – possibly related to hormonal changes and anxiety</li>
              </ul>
              <div className="mt-4 p-3 bg-purple-50 rounded-md">
                <p className="text-sm">
                  <strong>Remember:</strong> It\'s normal to experience a wide range of emotions during pregnancy. However, if you feel persistently low or anxious, speak to your midwife or doctor, as support is available.
                </p>
              </div>
            </div>
          </div>

          <p className="mb-4">
            For more detailed information about early pregnancy symptoms and how to manage them, visit our <Link to="/pregnancy/early-pregnancy-symptoms" className="text-[#0891b2] hover:underline">Early pregnancy symptoms</Link> page.
          </p>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="font-bold mb-2">When to contact your healthcare provider</h3>
            <p className="mb-3">Contact your doctor or midwife immediately if you experience:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Severe abdominal pain or cramping</li>
              <li>Heavy vaginal bleeding</li>
              <li>Severe dizziness or fainting</li>
              <li>Severe vomiting and inability to keep fluids down</li>
              <li>High fever</li>
              <li>Painful urination</li>
              <li>Sudden swelling of your face, hands, or feet</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'antenatal-care',
      title: 'Antenatal care',
      content: (
        <div>
          <p className="mb-4">
            Antenatal care (also called prenatal care) refers to the regular check-ups you\'ll have with healthcare professionals throughout your pregnancy to ensure you and your baby stay healthy.
          </p>

          <h3 className="font-medium text-lg mb-3">Your first appointment</h3>
          <p className="mb-4">
            Your first official antenatal appointment, called the booking appointment, usually happens between weeks 8 and 12. This appointment is longer than later ones and covers many important aspects of your pregnancy care.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">During your booking appointment, your midwife will:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Take a detailed medical history</li>
              <li>Check your blood pressure, height, and weight</li>
              <li>Arrange blood tests to check your blood type, iron levels, and screen for certain infections</li>
              <li>Take a urine sample</li>
              <li>Calculate your due date</li>
              <li>Discuss screening tests for chromosomal conditions like Down syndrome</li>
              <li>Provide information about nutrition, exercise, and lifestyle during pregnancy</li>
              <li>Answer any questions you have</li>
            </ul>
          </div>
          <p className="mb-3">
            For more details about what to expect at this important appointment, see our guide to <Link to="/pregnancy/first-prenatal-visit" className="text-[#0891b2] hover:underline">Your first prenatal visit</Link>.
          </p>

          <h3 className="font-medium text-lg mb-3 mt-6">Ultrasound scans</h3>
          <p className="mb-4">
            Most women in the UK are offered two routine ultrasound scans during pregnancy:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold">Dating scan (8-14 weeks)</h4>
              <p className="text-sm mt-2">
                This first scan confirms your pregnancy, checks if you\'re carrying more than one baby, and provides a more accurate due date. The sonographer will measure your baby from crown to rump to determine gestational age.
              </p>
              <p className="text-sm mt-2">
                Some women may choose to have the nuchal translucency (NT) measurement taken during this scan as part of screening for Down syndrome.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold">Anomaly scan (18-22 weeks)</h4>
              <p className="text-sm mt-2">
                This detailed scan checks your baby\'s physical development and looks for any structural abnormalities. The sonographer examines your baby\'s head, face, spine, heart, stomach, kidneys, and limbs.
              </p>
              <p className="text-sm mt-2">
                You may be able to find out your baby\'s sex during this scan if you wish to know.
              </p>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Screening tests</h3>
          <p className="mb-3">
            During early pregnancy, you\'ll be offered various screening tests to check for potential health conditions. These are optional, and your healthcare provider will explain each test so you can make an informed decision.
          </p>
          <p className="mb-6">
            For detailed information about available tests, visit our <Link to="/pregnancy/prenatal-tests" className="text-[#0891b2] hover:underline">Prenatal tests explained</Link> page.
          </p>
        </div>
      )
    },
    {
      id: 'nutrition-health',
      title: 'Nutrition and health',
      content: (
        <div>
          <p className="mb-6">
            Eating well during early pregnancy helps provide essential nutrients for your baby\'s development and supports your changing body.
          </p>

          <h3 className="font-medium text-lg mb-3">Key nutrients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Essential nutrients for early pregnancy</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Folic acid</strong> – crucial for preventing neural tube defects</li>
                <li><strong>Iron</strong> – helps prevent anemia as your blood volume increases</li>
                <li><strong>Calcium</strong> – supports your baby\'s developing bones and teeth</li>
                <li><strong>Vitamin D</strong> – helps with calcium absorption</li>
                <li><strong>Protein</strong> – essential for cell growth and blood production</li>
                <li><strong>Omega-3 fatty acids</strong> – important for brain and eye development</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Foods to include</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fresh fruits and vegetables</li>
                <li>Whole grains and cereals</li>
                <li>Lean protein (meat, fish, poultry, eggs, legumes)</li>
                <li>Dairy products or calcium-fortified alternatives</li>
                <li>Nuts and seeds (unless allergic)</li>
                <li>Healthy fats from olive oil, avocados</li>
                <li>Water and other hydrating fluids</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-bold mb-2">Foods and drinks to avoid</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 list-disc pl-5">
              <li>Unpasteurized milk and cheese</li>
              <li>Soft cheeses with white rinds (brie, camembert)</li>
              <li>Blue-veined cheeses</li>
              <li>Raw or undercooked meat</li>
              <li>Liver and liver products</li>
              <li>Pâté (including vegetable pâté)</li>
              <li>Raw shellfish</li>
              <li>High-mercury fish (shark, swordfish, marlin)</li>
              <li>Alcohol</li>
              <li>Limit caffeine to 200mg per day</li>
              <li>Unwashed fruits and vegetables</li>
              <li>Raw or partially cooked eggs (unless Lion Code)</li>
            </ul>
          </div>

          <p className="mb-6">
            For more detailed information about nutrition during pregnancy, see our <Link to="/pregnancy/nutrition-guide" className="text-[#0891b2] hover:underline">Pregnancy nutrition guide</Link>.
          </p>

          <h3 className="font-medium text-lg mb-3">Exercise and activity</h3>
          <p className="mb-3">
            Regular physical activity during pregnancy has many benefits, including helping with common discomforts, improving mood, and preparing your body for labor.
          </p>
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Safe exercise in early pregnancy</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Walking</li>
              <li>Swimming</li>
              <li>Pregnancy yoga or pilates</li>
              <li>Low-impact aerobics</li>
              <li>Stationary cycling</li>
              <li>Light weightlifting</li>
            </ul>
            <p className="mt-3 text-sm">
              <strong>Note:</strong> If you were active before pregnancy, you can generally continue your routine with modifications. If you\'re new to exercise, start gradually with 15 minutes of continuous activity and build up to 30 minutes daily.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Managing morning sickness</h3>
          <p className="mb-3">
            "Morning sickness" (which can occur at any time of day) affects many women in early pregnancy. These strategies may help:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Eat small, frequent meals instead of large ones</li>
            <li>Keep crackers or dry toast by your bed to eat before getting up</li>
            <li>Avoid foods and smells that trigger nausea</li>
            <li>Try ginger in the form of tea, candy, or supplements</li>
            <li>Stay hydrated by sipping water throughout the day</li>
            <li>Wear acupressure wristbands</li>
            <li>Rest adequately – fatigue can worsen nausea</li>
          </ul>
          <p className="mb-3 text-sm italic">
            If your nausea and vomiting are severe (hyperemesis gravidarum), making it difficult to keep food or fluids down, contact your healthcare provider. Treatment options are available.
          </p>
        </div>
      )
    },
    {
      id: 'emotional-wellbeing',
      title: 'Emotional wellbeing',
      content: (
        <div>
          <p className="mb-6">
            Pregnancy brings significant emotional changes along with physical ones. Taking care of your mental health is just as important as caring for your physical health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Common emotional experiences</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Excitement and joy</strong> about the future</li>
                <li><strong>Worry and anxiety</strong> about your baby\'s health</li>
                <li><strong>Mood swings</strong> due to hormonal changes</li>
                <li><strong>Uncertainty</strong> about how life will change</li>
                <li><strong>Concern about birth</strong> and parenting</li>
                <li><strong>Mixed feelings</strong> if the pregnancy was unplanned</li>
                <li><strong>Apprehension</strong> if you\'ve had previous pregnancy loss</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Self-care for emotional wellbeing</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Share your feelings with your partner, friends, or family</li>
                <li>Connect with other pregnant women through classes or groups</li>
                <li>Practice relaxation techniques like deep breathing or meditation</li>
                <li>Prioritize activities that make you feel good</li>
                <li>Get adequate rest and sleep</li>
                <li>Continue gentle exercise, which can improve mood</li>
                <li>Set boundaries with work and social commitments</li>
                <li>Plan something nice for yourself each day</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-5 rounded-lg mb-6">
            <h4 className="font-bold mb-3">When to seek support</h4>
            <p className="mb-3">
              While mood fluctuations are normal during pregnancy, it\'s important to recognize when you might need additional support. Consider speaking to your midwife or doctor if you experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Persistent feelings of sadness or hopelessness</li>
              <li>Constant worry or anxiety that interferes with daily life</li>
              <li>Difficulty sleeping due to anxiety</li>
              <li>Loss of interest in activities you usually enjoy</li>
              <li>Feeling overwhelmed or unable to cope</li>
              <li>Thoughts of harming yourself</li>
            </ul>
            <p className="mt-3 text-sm">
              Help is available, and addressing mental health concerns early benefits both you and your baby.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Sharing your news</h3>
          <p className="mb-3">
            Many women choose to wait until after the first trimester (around 12 weeks) to announce their pregnancy widely, as the risk of miscarriage decreases significantly after this point. However, there\'s no right or wrong time to share your news.
          </p>
          <p className="mb-6">
            You might want to tell close family members, friends, or your employer earlier, especially if you\'re experiencing significant symptoms or need support. The decision about when and how to announce your pregnancy is personal.
          </p>
        </div>
      )
    },
    {
      id: 'preparing',
      title: 'Preparing for the journey ahead',
      content: (
        <div>
          <p className="mb-6">
            The first trimester is a good time to start thinking about and planning for the rest of your pregnancy, birth, and life with a new baby.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Learning about pregnancy and birth</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Read books, reliable websites, or apps about pregnancy</li>
                <li>Consider attending antenatal classes (usually in the second trimester)</li>
                <li>Research birthing options available in your area</li>
                <li>Talk to friends or family who have had children</li>
                <li>Discuss your questions with your midwife or doctor</li>
                <li>Explore our <Link to="/pregnancy/calendar" className="text-[#0891b2] hover:underline">Pregnancy calendar</Link> to learn about fetal development week by week</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Practical preparations</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Inform your employer about your pregnancy</li>
                <li>Research maternity and paternity leave options</li>
                <li>Consider financial planning for baby-related expenses</li>
                <li>Start thinking about childcare arrangements if needed</li>
                <li>Look into health insurance coverage for pregnancy and birth</li>
                <li>Begin researching baby equipment needs (though purchasing can wait)</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Involving your partner</h3>
          <p className="mb-3">
            Pregnancy can be an exciting but challenging time for partners too. Here are ways to involve them in your pregnancy journey:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Invite them to antenatal appointments and scans</li>
            <li>Share pregnancy books or resources with them</li>
            <li>Discuss your feelings and experiences regularly</li>
            <li>Involve them in decisions about birth preferences and baby preparations</li>
            <li>Encourage them to connect with other expectant parents</li>
            <li>Consider attending antenatal classes together</li>
          </ul>

          <div className="bg-blue-50 p-5 rounded-lg">
            <h4 className="font-bold mb-2">Looking ahead to the second trimester</h4>
            <p className="mb-3">
              Many women find the second trimester (weeks 13-27) more comfortable than the first. During this time, you can generally expect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Relief from morning sickness and extreme fatigue for many women</li>
              <li>Beginning to feel your baby move (usually between weeks 16-24)</li>
              <li>A visibly growing bump</li>
              <li>More energy and a general feeling of wellbeing</li>
              <li>The exciting 20-week scan where you can see your baby in detail</li>
              <li>Potentially learning your baby\'s sex, if you choose to</li>
            </ul>
            <p className="mt-3 text-sm">
              The second trimester is often considered the "honeymoon period" of pregnancy, when many discomforts ease and the risk of complications is lower.
            </p>
            <p className="mt-3">
              Learn more in our <Link to="/pregnancy/middle" className="text-[#0891b2] font-medium hover:underline">Middle pregnancy guide</Link>.
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
          <h1 className="text-3xl font-bold mb-4">Early Pregnancy</h1>
          <p className="text-xl font-medium">
            Information about early pregnancy symptoms, antenatal care, common concerns and preparing for your baby
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
                    <Link to="/pregnancy/early-pregnancy-symptoms" className="text-[#0891b2] hover:underline text-sm">Early pregnancy symptoms</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/first-prenatal-visit" className="text-[#0891b2] hover:underline text-sm">Your first prenatal visit</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/nutrition-guide" className="text-[#0891b2] hover:underline text-sm">Nutrition guide</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/common-concerns" className="text-[#0891b2] hover:underline text-sm">Common pregnancy concerns</Link>
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
                  The first trimester of pregnancy (weeks 1-12) is a time of rapid development for your baby and significant changes for your body. This guide covers what to expect during early pregnancy, including common symptoms, antenatal care, nutrition, emotional wellbeing, and preparing for the months ahead.
                </p>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">{section.title}</h2>
                <div className="prose max-w-none">{section.content}</div>
              </section>
            ))}

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">Week by week development</h2>
              <p className="mb-4">
                For detailed information about how your baby is developing each week, visit our pregnancy calendar.
              </p>
              <Link
                to="/pregnancy/calendar"
                className="inline-block bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                View pregnancy calendar
              </Link>
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

export default EarlyPregnancyPage;
