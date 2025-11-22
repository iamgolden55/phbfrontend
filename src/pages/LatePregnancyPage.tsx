import React from 'react';
import { Link } from 'react-router-dom';

interface SectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

const LatePregnancyPage: React.FC = () => {
  const sections: SectionType[] = [
    {
      id: 'third-trimester',
      title: 'The third trimester (weeks 28-40+)',
      content: (
        <div>
          <p className="mb-4">
            The third trimester spans from week 28 until the birth of your baby (around week 40, though many women deliver before or after this date). This is the final stage of pregnancy when your baby is growing rapidly and preparing for birth.
          </p>
          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">Third trimester development highlights:</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium">Weeks 28-32</h4>
                <p className="text-sm">
                  Your baby continues to gain weight rapidly, and their brain is developing quickly. Their skin becomes less transparent and more opaque as fat accumulates beneath it. Your baby can open and close their eyes and may be able to see light that filters through your womb. By week 32, your baby is about 42-43 cm (16.5 inches) long and weighs around 1.7-1.9 kg (3.7-4.2 pounds).
                </p>
              </div>
              <div>
                <h4 className="font-medium">Weeks 33-36</h4>
                <p className="text-sm">
                  Your baby's lungs are maturing, and they're practicing breathing movements. Their bones are hardening, though the skull remains soft and flexible for birth. Most babies move into a head-down position during this time. By week 36, your baby is about 47-48 cm (18.5-19 inches) long and weighs around 2.5-2.7 kg (5.5-6 pounds).
                </p>
              </div>
              <div>
                <h4 className="font-medium">Weeks 37-40+</h4>
                <p className="text-sm">
                  Your baby is considered full term at 37 weeks. They continue to gain weight and develop more fat stores. Their digestive system and lungs are ready to function outside the womb. The baby's movements may change as space becomes tight, but they should remain regular. By week 40, most babies weigh between 3-4 kg (6.6-8.8 pounds) and are 48-52 cm (19-20.5 inches) long.
                </p>
              </div>
            </div>
          </div>
          <p className="mb-4">
            During the third trimester, your body continues to adapt to support your growing baby and prepare for birth. Many women find this trimester physically challenging as the baby grows larger and puts more pressure on various body systems.
          </p>
          <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500 mb-4">
            <h3 className="font-bold mb-2">Important</h3>
            <p>
              In the third trimester, it's essential to be aware of warning signs that require immediate medical attention, such as decreased fetal movement, vaginal bleeding, severe headaches, vision changes, sudden swelling, or regular contractions before 37 weeks.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'physical-changes',
      title: 'Physical changes and discomforts',
      content: (
        <div>
          <p className="mb-6">
            The third trimester brings many physical changes as your body accommodates your growing baby and prepares for birth. These changes can cause various discomforts, but there are often ways to manage them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-3">Common physical changes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Larger bump</strong> – your uterus extends from pelvis to ribcage</li>
                <li><strong>Increased weight gain</strong> – typically about 5-6 kg (11-13 pounds) during this trimester</li>
                <li><strong>Braxton Hicks contractions</strong> – practice contractions that may become more frequent</li>
                <li><strong>Changes in center of gravity</strong> – affecting balance and posture</li>
                <li><strong>Swelling (edema)</strong> – especially in feet, ankles, and hands</li>
                <li><strong>Stretch marks</strong> – may continue to develop or become more prominent</li>
                <li><strong>Leaking colostrum</strong> – your breasts may produce early milk</li>
                <li><strong>Changes in vaginal discharge</strong> – often increases in late pregnancy</li>
                <li><strong>Increased urination</strong> – as the baby puts pressure on your bladder</li>
                <li><strong>Changes in fetal movement</strong> – movements remain regular but may feel different</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-3">Internal changes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cervical ripening</strong> – your cervix begins to soften and prepare for dilation</li>
                <li><strong>Engagement</strong> – the baby's head may drop into your pelvis (lightening)</li>
                <li><strong>Increased blood volume</strong> – continues to rise to support you and your baby</li>
                <li><strong>Changes in breathing</strong> – you may feel short of breath as the uterus pushes against your diaphragm</li>
                <li><strong>Hormone changes</strong> – preparing your body for labor and breastfeeding</li>
                <li><strong>Pelvic floor pressure</strong> – as your baby drops lower in preparation for birth</li>
                <li><strong>Organ displacement</strong> – your growing uterus pushes internal organs out of their usual position</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Common discomforts and remedies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Backache and pelvic pain</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Using good posture, wearing supportive shoes, sleeping with pillows between your knees and under your bump, warm baths, and gentle exercise like swimming or pregnancy yoga.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Shortness of breath</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Sitting or standing with good posture, sleeping propped up with pillows, and avoiding overexertion. This often improves once the baby drops lower in the pelvis.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Heartburn and indigestion</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Eating smaller, more frequent meals, avoiding spicy or fatty foods, staying upright after eating, and using pillows to elevate your upper body while sleeping.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Swollen ankles and feet</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Elevating your feet when sitting, regular ankle exercises, avoiding standing for long periods, and wearing comfortable, supportive shoes.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Insomnia</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Using extra pillows for support, practicing relaxation techniques, establishing a bedtime routine, limiting fluids before bed, and gentle exercise during the day.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Frequent urination</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Leaning forward when urinating to empty your bladder completely, avoiding caffeine, and continuing to drink plenty of water despite the inconvenience.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Hemorrhoids</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Applying cold compresses or witch hazel, avoiding constipation by eating high-fiber foods, staying hydrated, and avoiding sitting for long periods.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-sm">Leg cramps</h4>
              <p className="text-xs mt-1">
                <strong>Try:</strong> Stretching your calf muscles before bed, staying hydrated, regular exercise, and eating potassium-rich foods like bananas.
              </p>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Fetal movements in the third trimester</h3>
          <p className="mb-3">
            Your baby continues to move regularly throughout the third trimester, though the type of movements may change as space becomes limited in your uterus. You may notice more pushing, stretching, and rolling movements and fewer kicks or jabs.
          </p>
          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500 mb-6">
            <h4 className="font-bold mb-2">Monitoring your baby's movements</h4>
            <p className="mb-2">
              It's important to remain aware of your baby's movement patterns in the third trimester. A reduction in movements can sometimes be a sign that your baby needs checking.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your baby should continue moving regularly right up until labor and even during labor</li>
              <li>Get to know your baby's normal pattern of movements</li>
              <li>If you notice your baby is moving less than usual, or if there's a sudden change in the pattern, contact your midwife or maternity unit immediately</li>
              <li>Don't rely on home doppler devices or phone apps to check your baby's wellbeing</li>
              <li>Never wait until the next day to seek advice about reduced movements</li>
            </ul>
            <p className="mt-2">
              You can use our <Link to="/tools/kick-counter" className="text-[#0891b2] hover:underline">Kick Counter tool</Link> to help monitor your baby's movements.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'antenatal-care',
      title: 'Antenatal care in the third trimester',
      content: (
        <div>
          <p className="mb-4">
            Antenatal care becomes more frequent during the third trimester as your healthcare providers monitor your health and your baby's development more closely as birth approaches.
          </p>

          <h3 className="font-medium text-lg mb-3">Appointment schedule</h3>
          <p className="mb-4">
            During the third trimester, you'll typically have appointments:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Every 2-3 weeks between 28 and 36 weeks</li>
            <li>Weekly from 36 weeks until birth</li>
          </ul>

          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">What happens at third trimester check-ups:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Measurement of your blood pressure to check for pre-eclampsia</li>
              <li>Urine testing for protein, sugar, and signs of infection</li>
              <li>Measurement of your bump (fundal height) to track baby's growth</li>
              <li>Checking the position of your baby (particularly from 36 weeks)</li>
              <li>Listening to your baby's heartbeat</li>
              <li>Blood tests (if needed) to check for anemia or other conditions</li>
              <li>Discussions about your birth preferences and options</li>
              <li>Addressing any questions or concerns you have</li>
            </ul>
          </div>

          <h3 className="font-medium text-lg mb-3">Additional checks and tests</h3>
          <p className="mb-3">
            Depending on your individual circumstances, you may need additional monitoring during the third trimester:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold">Growth scans</h4>
              <p className="text-sm mt-2">
                If there are concerns about your baby's growth or if you have certain risk factors, you may have additional ultrasound scans to check your baby's size and the amount of amniotic fluid.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold">Fetal monitoring</h4>
              <p className="text-sm mt-2">
                If you have complications or go past your due date, your baby's heart rate might be monitored using a cardiotocograph (CTG) to ensure they're not under stress.
              </p>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Group B Streptococcus (GBS) screening</h3>
          <p className="mb-3">
            GBS is a common bacterium that many women carry without symptoms. If present during birth, it can rarely cause serious infections in newborns. Screening options include:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Routine testing (usually between 35-37 weeks) in some healthcare systems</li>
            <li>"Risk-based" approach in other systems, where antibiotics are offered based on risk factors</li>
            <li>If you test positive for GBS, you'll be offered antibiotics during labor to protect your baby</li>
          </ul>

          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
            <h3 className="font-bold mb-2">When to seek immediate care</h3>
            <p className="mb-3">
              Between your scheduled appointments, contact your maternity unit promptly if you experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vaginal bleeding</li>
              <li>Persistent, severe, or unusual abdominal pain</li>
              <li>A significant reduction in your baby's movements</li>
              <li>Your waters breaking (clear or colored fluid leaking from your vagina)</li>
              <li>Regular, painful contractions before 37 weeks</li>
              <li>Severe headache, vision changes, or sudden swelling (possible signs of pre-eclampsia)</li>
              <li>Fever, burning when urinating, or other signs of infection</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'preparing-for-birth',
      title: 'Preparing for birth',
      content: (
        <div>
          <p className="mb-6">
            The third trimester is the time to focus on preparations for labor, birth, and bringing your baby home. Taking time to plan and prepare can help you feel more confident and ready for the journey ahead.
          </p>

          <h3 className="font-medium text-lg mb-3">Birth plan</h3>
          <p className="mb-3">
            A birth plan outlines your preferences for labor and delivery, helping you communicate your wishes to your healthcare team. Remember that birth is unpredictable, and you may need to be flexible.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">Consider including in your birth plan:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your preferred birth environment (hospital, birth center, home)</li>
              <li>Who you want present during labor and birth</li>
              <li>Pain relief preferences and comfort measures</li>
              <li>Positions you'd like to try during labor</li>
              <li>Preferences for interventions (like continuous monitoring or episiotomy)</li>
              <li>Third stage management (delivery of the placenta)</li>
              <li>Immediate newborn care preferences</li>
              <li>Plans for feeding your baby</li>
            </ul>
            <p className="mt-3 text-sm">
              Discuss your birth plan with your midwife or doctor, and be prepared to adapt if medical needs arise. Our <Link to="/pregnancy/birth-plan-creator" className="text-[#0891b2] hover:underline">Birth Plan Creator</Link> can help you develop a personalized plan.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Antenatal classes</h3>
          <p className="mb-3">
            Antenatal or childbirth education classes can provide valuable information and skills for labor, birth, and early parenthood. They're often most relevant in the third trimester.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Classes may cover breathing techniques, positions for labor, pain management, breastfeeding, and newborn care</li>
            <li>Partners are typically encouraged to attend</li>
            <li>Options include PHB classes, NCT courses, hypnobirthing, active birth, and specialized classes</li>
            <li>Online classes are available if in-person attendance is difficult</li>
            <li>Classes can provide opportunities to meet other expectant parents</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Packing your hospital bag</h3>
          <p className="mb-3">
            It's a good idea to have your hospital bag packed by 36 weeks in case your baby arrives earlier than expected.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">For you</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Comfortable clothes for labor</li>
                <li>Several nightgowns or pajamas that open at the front if you plan to breastfeed</li>
                <li>Dressing gown and slippers</li>
                <li>Nursing bras and breast pads</li>
                <li>Several pairs of underwear (consider disposable)</li>
                <li>Maternity pads</li>
                <li>Toiletries and personal care items</li>
                <li>Towel</li>
                <li>Phone and charger</li>
                <li>Snacks and drinks</li>
                <li>Birth plan (if you have one)</li>
                <li>Maternity notes</li>
                <li>Entertainment (books, music, etc.)</li>
                <li>Going home outfit</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">For your baby</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bodysuits and sleepsuits (2-3 of each)</li>
                <li>Hat, socks, and mittens</li>
                <li>Blanket</li>
                <li>Nappies (around 20 for a newborn)</li>
                <li>Cotton wool or baby wipes</li>
                <li>Muslin squares (2-3)</li>
                <li>Going home outfit</li>
                <li>Car seat (required for hospital discharge if traveling by car)</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Recognizing signs of labor</h3>
          <p className="mb-3">
            As your due date approaches, it's important to recognize the signs that labor may be beginning.
          </p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li><strong>Prelabor signs</strong> – mucus plug release, bloody show, diarrhea, backache, increased Braxton Hicks contractions</li>
            <li><strong>Early labor signs</strong> – regular contractions that increase in frequency and intensity, waters breaking</li>
          </ul>
          <p className="mb-6">
            For detailed information about the signs and stages of labor, visit our <Link to="/pregnancy/signs-of-labor" className="text-[#0891b2] hover:underline">Signs of labor</Link> page.
          </p>

          <h3 className="font-medium text-lg mb-3">When to go to the hospital or birth center</h3>
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Contact your maternity unit or midwife if:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your contractions are regular and coming every 5 minutes, lasting 30-60 seconds (first-time mothers)</li>
              <li>Your contractions are regular and coming every 10 minutes (if you've had a baby before)</li>
              <li>Your waters break, even if you're not having contractions</li>
              <li>You have bright red vaginal bleeding</li>
              <li>You feel your baby's movements have reduced or changed</li>
              <li>You feel you need pain relief</li>
              <li>You feel anxious or concerned about anything</li>
            </ul>
            <p className="mt-3 text-sm">
              Always call if you're unsure – maternity staff would rather you contact them than worry at home.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'preparing-for-baby',
      title: 'Preparing for your baby',
      content: (
        <div>
          <p className="mb-6">
            The third trimester is the time to make final preparations for your baby's arrival. While you don't need to have everything perfect, having the essentials ready will make those first weeks easier.
          </p>

          <h3 className="font-medium text-lg mb-3">Essential baby items</h3>
          <p className="mb-3">
            These are the items you'll need from day one with your new baby:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Sleeping</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cot, crib, or Moses basket with a firm, flat mattress</li>
                <li>At least 2 fitted sheets</li>
                <li>Cellular blankets (safer than duvets for babies)</li>
                <li>Room thermometer</li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Note:</strong> Current safe sleep guidelines recommend your baby sleeps in the same room as you for the first 6 months.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Clothing</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>6-8 bodysuits or vests</li>
                <li>6-8 sleepsuits or babygrows</li>
                <li>2-3 cardigans or jackets</li>
                <li>Hat, mittens, and socks</li>
                <li>2-3 muslin squares</li>
                <li>Outdoor clothing appropriate for the season</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Feeding</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>If breastfeeding:</strong> Nursing bras, breast pads, nipple cream</li>
                <li><strong>If formula feeding:</strong> Bottles, teats, bottle brush, sterilizer, formula</li>
                <li>Bibs and burp cloths</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Changing</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Changing mat</li>
                <li>Newborn nappies (around 10-12 per day initially)</li>
                <li>Cotton wool or baby wipes</li>
                <li>Barrier cream for nappy rash</li>
                <li>Changing bag for outings</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Bathing</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Baby bath or bath support</li>
                <li>2-3 towels (hooded ones are useful)</li>
                <li>Gentle baby soap or cleanser</li>
                <li>Cotton wool</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Travel</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Car seat (required by law for hospital discharge if traveling by car)</li>
                <li>Pram or pushchair</li>
                <li>Baby carrier or sling (optional but useful)</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Preparing your home</h3>
          <p className="mb-3">
            These final weeks are a good time to prepare your home for your baby's arrival:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Set up a safe sleeping space for your baby</li>
            <li>Organize baby clothes by size</li>
            <li>Prepare a changing area with easy access to supplies</li>
            <li>Stock your kitchen with easy meals and snacks for the early weeks</li>
            <li>Consider arrangements for household help after the birth if possible</li>
            <li>If you have pets, make preparations for introducing them to the baby</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Practical preparations</h3>
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Before your baby arrives, consider:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Register with a GP for your baby if you haven't already</li>
              <li>Learn about local postnatal and breastfeeding support services</li>
              <li>Consider who might be able to help you in the early weeks</li>
              <li>If you have other children, arrange care for them during labor</li>
              <li>Plan for pet care if needed</li>
              <li>Ensure your car seat is properly installed</li>
              <li>Confirm arrangements for maternity leave and pay</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'emotional-wellbeing',
      title: 'Emotional wellbeing',
      content: (
        <div>
          <p className="mb-6">
            The third trimester can bring a mix of emotions as you prepare for birth and parenthood. Many women experience excitement, anxiety, impatience, and a desire to have their body back to themselves.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Common emotional experiences</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Nesting urges</strong> – a strong desire to prepare your home</li>
                <li><strong>Anxiety about labor and birth</strong> – worries about pain, complications, or the unknown</li>
                <li><strong>Concerns about parenting</strong> – wondering if you'll know what to do</li>
                <li><strong>Impatience</strong> – feeling ready to meet your baby and end pregnancy discomforts</li>
                <li><strong>Mood swings</strong> – continuing hormonal changes can affect your emotions</li>
                <li><strong>Excitement</strong> – anticipation about meeting your baby</li>
                <li><strong>Relationship concerns</strong> – thoughts about how a baby will change your relationships</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Self-care strategies</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Rest when you can – your body is working hard</li>
                <li>Talk about your feelings with understanding people</li>
                <li>Join a prenatal group to connect with others at the same stage</li>
                <li>Prepare for birth with knowledge, but avoid scary birth stories</li>
                <li>Make time for activities you enjoy</li>
                <li>Practice relaxation techniques like deep breathing or meditation</li>
                <li>Gentle exercise like walking or swimming</li>
                <li>Focus on the present rather than worrying about the future</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Partner relationships</h3>
          <p className="mb-3">
            The approach of birth and parenthood can affect your relationship with your partner. This is a good time to:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Communicate openly about hopes and concerns regarding labor, birth, and parenting</li>
            <li>Discuss how you'll support each other during labor and the early weeks with a newborn</li>
            <li>Consider practical arrangements like parental leave and division of baby care</li>
            <li>Make time for your relationship, perhaps with special dates before baby arrives</li>
            <li>Acknowledge that this is a transitional time for both of you</li>
          </ul>

          <div className="bg-purple-50 p-4 rounded-md border-l-4 border-purple-500 mb-6">
            <h3 className="font-bold mb-2">When to seek support</h3>
            <p className="mb-3">
              While anxiety and mood fluctuations are common during pregnancy, it's important to seek help if you experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Persistent feelings of sadness or hopelessness</li>
              <li>Excessive worry that interferes with daily functioning</li>
              <li>Panic attacks</li>
              <li>Difficulty sleeping due to anxiety (beyond physical discomfort)</li>
              <li>Loss of interest in activities you usually enjoy</li>
              <li>Thoughts of harming yourself</li>
              <li>Constant worry about your baby's wellbeing despite reassurance</li>
            </ul>
            <p className="mt-3">
              Speak to your midwife, doctor, or health visitor about how you're feeling. Support and treatment are available, and addressing mental health concerns during pregnancy benefits both you and your baby.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Looking ahead to birth and beyond</h3>
          <p className="mb-3">
            As you approach your due date, you're preparing to enter the next phase of your journey – labor, birth, and life with your new baby.
          </p>
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <p className="mb-3">
              Your next important milestone is labor and delivery. Understanding what to expect can help you feel more prepared and confident.
            </p>
            <p className="mb-3">
              Learn more about the stages of labor, birth options, and what happens during delivery in our <Link to="/pregnancy/labor-and-birth" className="text-[#0891b2] font-medium hover:underline">Labor and Birth guide</Link>.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="mb-3">
              After birth, you'll enter the "fourth trimester" – the first 12 weeks of your baby's life. During this time:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Both you and your baby will be adjusting to life outside the womb</li>
              <li>Your body will be recovering from pregnancy and birth</li>
              <li>You'll be learning to care for your newborn and interpret their needs</li>
              <li>Your hormones will be changing significantly</li>
              <li>You may experience a range of emotions from joy to occasional overwhelm</li>
            </ul>
            <p className="mt-3">
              Learn more in our <Link to="/pregnancy/after-birth" className="text-[#0891b2] font-medium hover:underline">After the birth guide</Link>.
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
          <h1 className="text-3xl font-bold mb-4">Late Pregnancy</h1>
          <p className="text-xl font-medium">
            Guidance on the third trimester, preparing for birth, common discomforts, and getting ready for your baby
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
                    <Link to="/pregnancy/middle" className="text-[#0891b2] hover:underline text-sm">Middle pregnancy</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/labor-and-birth" className="text-[#0891b2] hover:underline text-sm">Labor and birth</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/signs-of-labor" className="text-[#0891b2] hover:underline text-sm">Signs of labor</Link>
                  </li>
                  <li>
                    <Link to="/tools/contraction-timer" className="text-[#0891b2] hover:underline text-sm">Contraction timer</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/birth-plan-creator" className="text-[#0891b2] hover:underline text-sm">Birth plan creator</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="prose max-w-none">
                <p className="text-lg">
                  The third trimester (weeks 28-40+) is the final stretch of your pregnancy journey. During this time, your baby continues to grow and develop, and your body prepares for labor and birth. This guide covers what to expect in late pregnancy, managing common discomforts, preparing for birth, and getting ready to welcome your new baby.
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

export default LatePregnancyPage;
