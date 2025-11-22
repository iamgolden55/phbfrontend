import React from 'react';
import { Link } from 'react-router-dom';

interface SectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

const MiddlePregnancyPage: React.FC = () => {
  const sections: SectionType[] = [
    {
      id: 'second-trimester',
      title: 'The second trimester (weeks 13-27)',
      content: (
        <div>
          <p className="mb-4">
            The second trimester spans from week 13 to week 27 of pregnancy and is often referred to as the "honeymoon period." Most women find that many early pregnancy discomforts ease during this time, and energy levels improve.
          </p>
          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">Second trimester development highlights:</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium">Weeks 13-16</h4>
                <p className="text-sm">
                  Your baby\'s facial features are becoming more defined, and unique fingerprints develop. Your baby can make facial expressions and may begin to suck their thumb. By week 16, your baby is about 11-12 cm (4.5 inches) long.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Weeks 17-20</h4>
                <p className="text-sm">
                  Fine hair called lanugo covers your baby\'s body, and a protective coating called vernix caseosa forms on the skin. Your baby\'s movements become stronger and more coordinated, and you\'ll likely begin to feel them. By week 20, your baby is about 16-18 cm (6.5-7 inches) long.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Weeks 21-27</h4>
                <p className="text-sm">
                  Your baby\'s sense of touch and hearing develop. They can hear your voice and may respond to loud sounds. Your baby establishes sleep and wake cycles, and their movements become more regular. By the end of this trimester, your baby weighs around 900g (2 pounds) and is about 35 cm (14 inches) long.
                </p>
              </div>
            </div>
          </div>
          <p className="mb-4">
            This trimester is often a time of increased energy and excitement as your pregnancy becomes more visible and you begin to feel your baby move. It\'s also a time for important prenatal check-ups and tests, including the detailed anomaly scan.
          </p>
          <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500 mb-4">
            <h3 className="font-bold mb-2">Important</h3>
            <p>
              Even though the second trimester is typically more comfortable than the first, it\'s still important to attend all scheduled prenatal appointments and contact your healthcare provider promptly about any concerns.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'physical-changes',
      title: 'Physical changes and bodily developments',
      content: (
        <div>
          <p className="mb-6">
            During the second trimester, your body continues to adapt to support your growing baby. These changes are typically more visible now, and you\'ll likely need to adjust to your changing shape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-3">Changes you might notice</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Growing bump</strong> – your uterus rises above your pubic bone, making your pregnancy visible</li>
                <li><strong>Weight gain</strong> – most women gain about 1-2 pounds per week during this trimester</li>
                <li><strong>Skin changes</strong> – darkening of the skin around your nipples and a dark line (linea nigra) down the middle of your abdomen</li>
                <li><strong>Stretch marks</strong> – reddish or purple streaks on your abdomen, breasts, thighs, or buttocks</li>
                <li><strong>Nasal congestion and nosebleeds</strong> – due to increased blood volume and hormones</li>
                <li><strong>Bleeding gums</strong> – increased blood flow can make gums more sensitive</li>
                <li><strong>Leg cramps</strong> – particularly at night</li>
                <li><strong>Larger, more tender breasts</strong> – your breasts continue to prepare for breastfeeding</li>
                <li><strong>Backaches</strong> – as your center of gravity shifts forward</li>
                <li><strong>Varicose veins</strong> – in your legs or vulva due to increased blood volume and pressure</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-3">Internal changes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Increased blood volume</strong> – up to 50% more than before pregnancy</li>
                <li><strong>Expanding uterus</strong> – growing from the size of a grapefruit to a large cantaloupe</li>
                <li><strong>Stronger heart</strong> – pumping more blood throughout your body</li>
                <li><strong>Increased metabolism</strong> – burning more calories even at rest</li>
                <li><strong>Deeper breathing</strong> – to support increased oxygen needs</li>
                <li><strong>Placental growth</strong> – providing more nutrients to your baby</li>
                <li><strong>Relaxation of joints and ligaments</strong> – due to the hormone relaxin, preparing your body for birth</li>
                <li><strong>Changes in hair and nail growth</strong> – many women find their hair and nails grow faster</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Fetal movement</h3>
          <p className="mb-3">
            One of the most exciting developments during the second trimester is feeling your baby move for the first time, known as "quickening." Most first-time mothers feel movements between 18-20 weeks, while women who have been pregnant before may notice them earlier, around 16 weeks.
          </p>
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">About baby\'s movements</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Early movements often feel like flutters, bubbles, or a light tapping sensation</li>
              <li>As your baby grows, movements become stronger and more distinct</li>
              <li>By 24 weeks, you should feel regular movements every day</li>
              <li>Your baby will develop patterns of activity and rest</li>
              <li>Movements are a good sign of your baby\'s wellbeing</li>
            </ul>
            <p className="mt-3 text-sm">
              <strong>Note:</strong> If you notice a significant decrease in your baby\'s movements after 24 weeks, contact your healthcare provider right away. Regular movement is an important sign of fetal wellbeing.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Common discomforts and remedies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Backache</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Maintaining good posture, wearing low-heeled shoes, sleeping on your side with a pillow between your knees, and gentle stretching exercises.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Leg cramps</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Stretching your calf muscles before bed, staying hydrated, and ensuring adequate calcium and magnesium in your diet.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Heartburn</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Eating smaller, more frequent meals, avoiding spicy or fatty foods, not lying down after eating, and elevating your upper body when sleeping.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Constipation</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Increasing fiber in your diet, drinking plenty of water, and regular exercise. Talk to your doctor before taking any laxatives.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Round ligament pain</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Moving more slowly, especially when changing positions, and applying a heat pack to the area for relief.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Nasal congestion and nosebleeds</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Using a humidifier, saline nasal spray, and drinking plenty of fluids. Avoid decongestants unless approved by your doctor.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'antenatal-care',
      title: 'Antenatal care during the second trimester',
      content: (
        <div>
          <p className="mb-4">
            Regular antenatal check-ups continue during the second trimester to monitor your health and your baby\'s development.
          </p>

          <h3 className="font-medium text-lg mb-3">Routine appointments</h3>
          <p className="mb-4">
            During the second trimester, you\'ll typically see your midwife or doctor every 4 weeks. These appointments usually include:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Checking your blood pressure</li>
            <li>Testing your urine for protein (a possible sign of preeclampsia)</li>
            <li>Measuring your abdomen to track your baby\'s growth</li>
            <li>Listening to your baby\'s heartbeat</li>
            <li>Discussing any symptoms or concerns you may have</li>
            <li>Reviewing any test results</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">The anomaly scan</h3>
          <p className="mb-3">
            A major part of second-trimester care is the detailed anomaly scan, usually performed between 18 and 22 weeks.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">During the anomaly scan, the sonographer will:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Check your baby\'s size and growth</li>
              <li>Examine your baby\'s major organs (brain, heart, lungs, kidneys, etc.)</li>
              <li>Look at the placenta, umbilical cord, and amniotic fluid</li>
              <li>Check the position of the placenta</li>
              <li>If you wish, determine your baby\'s sex</li>
            </ul>
            <p className="mt-3 text-sm">
              This scan can detect about 50% of structural abnormalities. While it can be reassuring when everything looks normal, it\'s important to understand that not all conditions can be detected by ultrasound.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Additional tests</h3>
          <p className="mb-3">
            Depending on your individual risk factors and previous test results, you may have additional tests during this trimester:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li><strong>Glucose screening test</strong> (24-28 weeks) – to check for gestational diabetes</li>
            <li><strong>Additional blood tests</strong> – to check for anemia or other health concerns</li>
            <li><strong>Amniocentesis</strong> – if earlier screening suggested increased risk for chromosomal conditions</li>
            <li><strong>Cervical length measurement</strong> – for women at risk of preterm labor</li>
          </ul>
          <p className="mb-3">
            For detailed information about these and other prenatal tests, visit our <Link to="/pregnancy/prenatal-tests" className="text-[#0891b2] hover:underline">Prenatal tests explained</Link> page.
          </p>

          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
            <h3 className="font-bold mb-2">When to call your healthcare provider</h3>
            <p className="mb-3">
              Contact your midwife or doctor immediately if you experience any of these symptoms during your second trimester:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vaginal bleeding or leaking fluid</li>
              <li>Severe abdominal pain or cramping</li>
              <li>Severe or persistent headache</li>
              <li>Vision changes (blurring, seeing spots, light sensitivity)</li>
              <li>Severe swelling in your face, hands, or feet</li>
              <li>Fever over 38°C (100.4°F)</li>
              <li>Persistent vomiting</li>
              <li>Painful urination</li>
              <li>Significantly decreased baby movement after 24 weeks</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'staying-healthy',
      title: 'Staying healthy',
      content: (
        <div>
          <p className="mb-6">
            The second trimester is a great time to focus on healthy habits, as you likely have more energy than during the first trimester.
          </p>

          <h3 className="font-medium text-lg mb-3">Nutrition</h3>
          <p className="mb-3">
            Your baby is growing rapidly during this trimester, and your nutritional needs increase to support this growth.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">Key nutrients for the second trimester:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Iron</strong> – your body needs more iron to make extra blood. Good sources include lean red meat, beans, lentils, and fortified cereals.</li>
              <li><strong>Calcium</strong> – essential for your baby\'s developing bones and teeth. Find it in dairy products, fortified plant milks, leafy greens, and fish with edible bones.</li>
              <li><strong>Protein</strong> – needed for your baby\'s growth. Sources include meat, fish, eggs, dairy, legumes, nuts, and seeds.</li>
              <li><strong>Omega-3 fatty acids</strong> – important for brain and eye development. Found in oily fish (limit to 2 portions per week), walnuts, flaxseeds, and supplements if recommended.</li>
              <li><strong>Vitamin D</strong> – aids calcium absorption. Most pregnant women should take a 10 microgram supplement daily.</li>
            </ul>
            <p className="mt-3 text-sm">
              Continue taking your prenatal vitamin as recommended by your healthcare provider.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Exercise</h3>
          <p className="mb-3">
            Regular physical activity during the second trimester has many benefits, including improved mood, better sleep, and reduced risk of gestational diabetes and preeclampsia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Recommended activities</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Walking</li>
                <li>Swimming</li>
                <li>Stationary cycling</li>
                <li>Low-impact aerobics</li>
                <li>Prenatal yoga or Pilates</li>
                <li>Light strength training</li>
                <li>Pelvic floor exercises (Kegels)</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Activities to avoid</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact sports</li>
                <li>Activities with high fall risk (e.g., skiing, horseback riding)</li>
                <li>Scuba diving</li>
                <li>Exercising at high altitudes</li>
                <li>Hot yoga or hot Pilates</li>
                <li>Lying flat on your back after 16 weeks</li>
                <li>Heavy weightlifting</li>
              </ul>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Exercise guidelines</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Aim for 150 minutes of moderate activity each week (about 30 minutes, 5 days a week)</li>
              <li>Listen to your body and don\'t overexert yourself</li>
              <li>Stay hydrated before, during, and after exercise</li>
              <li>Wear supportive footwear and a supportive bra</li>
              <li>Stop exercising and contact your healthcare provider if you experience pain, bleeding, dizziness, shortness of breath, or reduced fetal movement</li>
            </ul>
          </div>

          <h3 className="font-medium text-lg mb-3">Sleep</h3>
          <p className="mb-3">
            Getting enough good quality sleep is important for your health and your baby\'s development. As your bump grows, you may find it more challenging to sleep comfortably.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Try sleeping on your side, particularly your left side to improve blood flow to your baby</li>
            <li>Use pillows to support your bump and back, or consider a pregnancy pillow</li>
            <li>Avoid caffeine in the afternoon and evening</li>
            <li>Establish a relaxing bedtime routine</li>
            <li>Keep your bedroom cool, dark, and quiet</li>
            <li>Practice relaxation techniques if you have trouble falling asleep</li>
          </ul>
        </div>
      )
    },
    {
      id: 'preparing-ahead',
      title: 'Preparing ahead',
      content: (
        <div>
          <p className="mb-6">
            The second trimester is a good time to start making practical preparations for your baby\'s arrival, as you likely have more energy than during the first or third trimesters.
          </p>

          <h3 className="font-medium text-lg mb-3">Planning for maternity leave</h3>
          <p className="mb-3">
            If you\'re employed, now is a good time to discuss your maternity leave plans with your employer. Consider:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>How much time you plan to take off</li>
            <li>When you intend to start your leave</li>
            <li>Your employer\'s maternity policy and benefits</li>
            <li>Statutory maternity pay or maternity allowance</li>
            <li>How your work will be handled during your absence</li>
            <li>Plans for returning to work, if applicable</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Financial planning</h3>
          <p className="mb-3">
            Having a baby impacts your finances, so it\'s helpful to plan ahead:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Create or adjust your budget to account for baby-related expenses</li>
            <li>Research costs of essential baby items</li>
            <li>Look into available benefits like Child Benefit</li>
            <li>Consider childcare costs if you plan to return to work</li>
            <li>Review your insurance coverage, including health insurance</li>
            <li>Consider updating your will</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Preparing your home</h3>
          <p className="mb-3">
            Start thinking about how to prepare your living space for your new baby:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Essential baby items</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Safe sleeping space (cot, crib, or bassinet)</li>
                <li>Car seat (required by law for hospital discharge)</li>
                <li>Pram or stroller</li>
                <li>Baby clothes in various sizes</li>
                <li>Nappies and changing supplies</li>
                <li>Feeding equipment (bottles if not exclusively breastfeeding)</li>
                <li>Baby bath or bath support</li>
                <li>Baby monitor</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Setting up the nursery</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Decide where the baby will sleep</li>
                <li>Consider safety aspects of the room</li>
                <li>Ensure proper ventilation and temperature control</li>
                <li>Set up a changing area with supplies within reach</li>
                <li>Organize baby clothes and bedding</li>
                <li>Install baby-proofing items if needed</li>
                <li>Consider storage solutions for baby items</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Antenatal classes</h3>
          <p className="mb-3">
            The second trimester is an ideal time to book antenatal classes, which can provide valuable information and preparation for birth and early parenthood.
          </p>
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Types of antenatal classes</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>PHB classes</strong> – free classes covering basic information about pregnancy, birth, and early parenting</li>
              <li><strong>NCT (National Childbirth Trust) classes</strong> – more detailed courses that often create lasting social connections</li>
              <li><strong>Hypnobirthing classes</strong> – focused on relaxation techniques and positive mindset for labor</li>
              <li><strong>Breastfeeding workshops</strong> – specific guidance on breastfeeding techniques and challenges</li>
              <li><strong>Active birth classes</strong> – emphasizing movement and positions during labor</li>
              <li><strong>Aquanatal classes</strong> – exercise in water specifically designed for pregnancy</li>
            </ul>
            <p className="mt-3 text-sm">
              Many classes get booked up quickly, so it\'s worth researching and booking early, even though most classes typically take place in the third trimester.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Birth preferences</h3>
          <p className="mb-3">
            The second trimester is a good time to start thinking about your preferences for labor and birth, though you don\'t need to finalize your birth plan yet.
          </p>
          <p className="mb-6">
            Consider exploring our <Link to="/pregnancy/birth-plan-creator" className="text-[#0891b2] hover:underline">Birth Plan Creator</Link> to help you think through your options and preferences.
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
            The second trimester can bring a mix of emotions as your pregnancy becomes more real and visible to others, and you begin to feel your baby move.
          </p>

          <h3 className="font-medium text-lg mb-3">Common emotional experiences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Positive emotions</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Excitement</strong> as you feel your baby move and see your growing bump</li>
                <li><strong>Connection</strong> with your baby, especially after ultrasound scans</li>
                <li><strong>Relief</strong> from early pregnancy symptoms</li>
                <li><strong>Joy</strong> in sharing your pregnancy with others</li>
                <li><strong>Increased confidence</strong> as you adjust to pregnancy</li>
                <li><strong>Sense of purpose</strong> and anticipation of parenthood</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Challenging emotions</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Body image concerns</strong> as your shape changes rapidly</li>
                <li><strong>Anxiety</strong> about the baby\'s health, especially around scans</li>
                <li><strong>Mood swings</strong> due to hormonal changes</li>
                <li><strong>Relationship changes</strong> with your partner or other children</li>
                <li><strong>Identity shifts</strong> as you prepare for parenthood</li>
                <li><strong>Sleep disruption</strong> affecting emotional wellbeing</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Building connection with your baby</h3>
          <p className="mb-3">
            The second trimester offers opportunities to bond with your baby as you begin to feel movements and can see more detailed ultrasound images.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Talk or sing to your baby – they can hear your voice from about 18 weeks</li>
            <li>Respond to movements by gently touching your bump</li>
            <li>Play music – your baby may respond to different types</li>
            <li>Keep ultrasound images where you can see them</li>
            <li>Start a pregnancy journal to record your experiences</li>
            <li>Involve your partner by encouraging them to feel baby\'s movements</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Relationship changes</h3>
          <p className="mb-3">
            Pregnancy can affect your relationships, particularly with your partner.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">Supporting your relationship</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Maintain open communication about your feelings and concerns</li>
              <li>Involve your partner in antenatal appointments when possible</li>
              <li>Share the experience of feeling the baby move</li>
              <li>Make decisions about baby preparations together</li>
              <li>Discuss how roles and responsibilities might change after the birth</li>
              <li>Make time for your relationship beyond pregnancy discussions</li>
              <li>Consider attending antenatal classes together</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-md border-l-4 border-purple-500 mb-6">
            <h3 className="font-bold mb-2">When to seek support</h3>
            <p className="mb-3">
              While mood fluctuations are normal during pregnancy, some emotional changes may require additional support. Consider speaking to your midwife or doctor if:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You feel persistently sad or hopeless</li>
              <li>You experience excessive anxiety about your baby or birth</li>
              <li>You lose interest in activities you usually enjoy</li>
              <li>You have difficulty sleeping due to racing thoughts</li>
              <li>You feel overwhelmed by stress or worry</li>
              <li>You have thoughts of harming yourself</li>
            </ul>
            <p className="mt-3">
              Mental health is an important part of antenatal care, and effective support is available during pregnancy.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Looking ahead to the third trimester</h3>
          <p className="mb-3">
            As you approach the end of your second trimester, you might start thinking about the final stage of your pregnancy journey.
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="mb-3">
              The third trimester (weeks 28-40+) is a time of continued growth and preparation for birth. During this time:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your baby will gain significant weight and develop fat stores</li>
              <li>You\'ll likely experience more physical discomforts as your baby grows larger</li>
              <li>Antenatal appointments will become more frequent</li>
              <li>You\'ll make final preparations for birth and bringing your baby home</li>
            </ul>
            <p className="mt-3">
              Learn more in our <Link to="/pregnancy/late" className="text-[#0891b2] font-medium hover:underline">Late pregnancy guide</Link>.
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
          <h1 className="text-3xl font-bold mb-4">Middle Pregnancy</h1>
          <p className="text-xl font-medium">
            Guidance on the second trimester, including scans, feeling your baby move, and staying comfortable
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
                <a
                  href="#staying-healthy"
                  className="block hover:text-blue-600 hover:underline transition-colors py-1"
                >
                  Staying healthy
                </a>
                <a
                  href="#preparing-ahead"
                  className="block hover:text-blue-600 hover:underline transition-colors py-1"
                >
                  Preparing ahead
                </a>
                <a
                  href="#emotional-wellbeing"
                  className="block hover:text-blue-600 hover:underline transition-colors py-1"
                >
                  Emotional wellbeing
                </a>
              </nav>

              <div className="border-t border-gray-300 mt-6 pt-6">
                <h3 className="font-bold mb-3">Related information</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/pregnancy/early" className="text-[#0891b2] hover:underline text-sm">Early pregnancy</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/late" className="text-[#0891b2] hover:underline text-sm">Late pregnancy</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/calendar" className="text-[#0891b2] hover:underline text-sm">Pregnancy calendar</Link>
                  </li>
                  <li>
                    <Link to="/tools/kick-counter" className="text-[#0891b2] hover:underline text-sm">Kick counter</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/common-concerns" className="text-[#0891b2] hover:underline text-sm">Common pregnancy concerns</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="prose max-w-none">
                <p className="text-lg">
                  The second trimester (weeks 13-27) is often described as the most comfortable part of pregnancy. Morning sickness usually subsides, energy levels improve, and you\'ll likely start to feel your baby move. This guide covers what to expect during this exciting middle phase of your pregnancy journey.
                </p>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">{section.title}</h2>
                <div className="prose max-w-none">{section.content}</div>
              </section>
            ))}

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

export default MiddlePregnancyPage;
