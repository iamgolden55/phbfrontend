import React from 'react';
import { Link } from 'react-router-dom';

interface SectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

const LaborAndBirthPage: React.FC = () => {
  const sections: SectionType[] = [
    {
      id: 'stages-of-labor',
      title: 'Stages of labor',
      content: (
        <div>
          <p className="mb-4">
            Labor is the process that leads to the birth of your baby. Understanding the different stages of labor can help you prepare for what to expect during childbirth.
          </p>

          <h3 className="font-medium text-lg mb-3">The three stages of labor</h3>
          <p className="mb-4">
            Labor is divided into three main stages, each serving a different purpose in the birth process:
          </p>

          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">First stage: Dilation of the cervix</h3>
            </div>
            <div className="p-4 space-y-3">
              <p>
                The first stage of labor is the longest and is divided into three phases:
              </p>
              <div>
                <h4 className="font-medium">Early labor (latent phase)</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Cervix dilates from 0 to 3-4 cm</li>
                  <li>Contractions are mild to moderate, lasting 30-60 seconds</li>
                  <li>Contractions typically 5-20 minutes apart</li>
                  <li>Duration varies widely, often 8-12 hours for first-time mothers, but can be shorter or longer</li>
                  <li>Often managed at home</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Active labor</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Cervix dilates from 4 to 7 cm</li>
                  <li>Contractions become stronger and more regular</li>
                  <li>Contractions typically 3-5 minutes apart, lasting 45-60 seconds</li>
                  <li>Usually lasts 3-5 hours</li>
                  <li>Time to go to the hospital or birth center if not already there</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Transition</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Cervix dilates from 7 to 10 cm (fully dilated)</li>
                  <li>Most intense phase with strong contractions</li>
                  <li>Contractions typically 2-3 minutes apart, lasting 60-90 seconds</li>
                  <li>Usually lasts 30 minutes to 2 hours</li>
                  <li>Many women feel the urge to push toward the end of this phase</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">Second stage: Pushing and birth</h3>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                <li>From full dilation (10 cm) to the birth of your baby</li>
                <li>Strong urge to push with contractions</li>
                <li>Usually lasts 20 minutes to 2 hours for first-time mothers</li>
                <li>Often shorter for subsequent births</li>
                <li>Ends with the birth of your baby</li>
              </ul>
            </div>
          </div>

          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">Third stage: Delivery of the placenta</h3>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                <li>From the birth of your baby to the delivery of the placenta</li>
                <li>Mild contractions help the placenta separate from the uterine wall</li>
                <li>Usually lasts 5-30 minutes</li>
                <li>Often managed actively with medication to reduce blood loss</li>
                <li>During this stage, you'll likely be holding your baby and perhaps starting breastfeeding</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500 mb-4">
            <h3 className="font-bold mb-2">Important to know</h3>
            <p>
              The duration of labor varies significantly between individuals. First-time mothers typically experience longer labor than those who have given birth before. Remember that these timeframes are only averages, and your labor may progress differently.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Signs that labor is beginning</h3>
          <p className="mb-3">
            Recognizing the early signs of labor can help you know when to contact your healthcare provider and prepare for your journey to the birth location.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Definite signs of labor</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Regular contractions</strong> that become progressively stronger, longer, and closer together</li>
                <li><strong>Waters breaking</strong> – rupture of the amniotic sac releasing clear or slightly pink fluid</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Possible early signs</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Bloody show</strong> – pink or blood-tinged mucus discharge</li>
                <li><strong>Loss of mucus plug</strong> – discharge of thick mucus that has sealed the cervix</li>
                <li><strong>Backache</strong> – persistent lower back pain</li>
                <li><strong>Loose stools or diarrhea</strong></li>
                <li><strong>Nesting urge</strong> – sudden burst of energy</li>
              </ul>
            </div>
          </div>

          <p className="mb-3">
            For more detailed information about the signs and symptoms that labor is beginning, visit our <Link to="/pregnancy/signs-of-labor" className="text-[#005eb8] hover:underline">Signs of labor</Link> page.
          </p>
        </div>
      )
    },
    {
      id: 'birth-options',
      title: 'Birth options and settings',
      content: (
        <div>
          <p className="mb-4">
            There are several options for where and how you can give birth. The best choice depends on your health, pregnancy history, personal preferences, and what's available in your area.
          </p>

          <h3 className="font-medium text-lg mb-3">Where to give birth</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Hospital birth</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Most common option in the UK</li>
                <li>Full range of medical facilities and specialists available</li>
                <li>All pain relief options available</li>
                <li>Recommended for high-risk pregnancies</li>
                <li>Some hospitals offer birthing pools</li>
                <li>Special care baby units (SCBU) on site if needed</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Midwife-led birth centre</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>More home-like environment than hospital</li>
                <li>Run by midwives, no doctors present</li>
                <li>May be alongside a hospital or freestanding</li>
                <li>Limited medical pain relief (usually no epidurals)</li>
                <li>Often have birthing pools</li>
                <li>For women with straightforward pregnancies</li>
                <li>Transfer to hospital needed if complications arise</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Home birth</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Giving birth in your own home</li>
                <li>Attended by midwives</li>
                <li>Comfortable, familiar environment</li>
                <li>No medical pain relief (except gas and air)</li>
                <li>Suitable for women with uncomplicated pregnancies</li>
                <li>Transfer to hospital if complications develop</li>
                <li>Evidence shows it's as safe as hospital for low-risk multiparous women</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Types of birth</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Vaginal birth</h4>
              <p className="text-sm mb-2">
                A vaginal birth involves your baby being born through the birth canal. It may include:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Spontaneous vaginal birth</strong> – labor starts and progresses naturally</li>
                <li><strong>Induced labor</strong> – labor is started artificially with medication</li>
                <li><strong>Assisted delivery</strong> – using forceps or vacuum (ventouse) to help baby out</li>
                <li><strong>Water birth</strong> – giving birth in a pool of warm water</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Caesarean section (C-section)</h4>
              <p className="text-sm mb-2">
                A surgical procedure where your baby is delivered through an incision in your abdomen and uterus.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Planned (elective) C-section</strong> – scheduled in advance for medical reasons or sometimes by maternal choice</li>
                <li><strong>Emergency C-section</strong> – performed when complications arise during pregnancy or labor</li>
                <li>Performed under spinal or epidural anesthesia (you're awake) or rarely under general anesthetic</li>
                <li>Recovery typically takes longer than vaginal birth</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Birth positions</h3>
          <p className="mb-3">
            There are many positions you can adopt during labor and birth. Being able to move freely and find comfortable positions can help your labor progress and may reduce pain.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li><strong>Upright positions</strong> (standing, walking, squatting, kneeling) – work with gravity to help baby descend</li>
            <li><strong>Hands and knees</strong> – can help relieve back pain and aid rotation of baby</li>
            <li><strong>Side-lying</strong> – restful position that can still be effective for pushing</li>
            <li><strong>Supported squat</strong> – helps open the pelvis</li>
            <li><strong>Birth stool or chair</strong> – provides support while maintaining an upright position</li>
            <li><strong>In water</strong> – can provide buoyancy and comfort</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Making your choice</h4>
            <p className="mb-2">
              When deciding on your birth options, consider:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your health and pregnancy history</li>
              <li>What's available in your area</li>
              <li>Your personal preferences</li>
              <li>Your pain relief preferences</li>
              <li>Distance from emergency facilities (for home or birth center births)</li>
            </ul>
            <p className="mt-3 text-sm">
              Discuss your preferences with your midwife or doctor, and remember that plans may need to change depending on how your pregnancy and labor progress. You can use our <Link to="/pregnancy/birth-plan-creator" className="text-[#005eb8] hover:underline">Birth Plan Creator</Link> to help document your preferences.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'pain-relief',
      title: 'Pain relief options',
      content: (
        <div>
          <p className="mb-4">
            Labor pain is a natural part of childbirth, but there are various ways to manage it. Pain relief options range from non-medical techniques to medications and anesthesia. Many women use a combination of approaches throughout labor.
          </p>

          <h3 className="font-medium text-lg mb-3">Natural pain management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Breathing and relaxation</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Focused breathing techniques</li>
                <li>Visualization and meditation</li>
                <li>Progressive muscle relaxation</li>
                <li>Hypnobirthing methods</li>
                <li>No side effects</li>
                <li>Can be used throughout labor</li>
                <li>May be taught in antenatal classes</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Water and heat</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Shower or bath during early labor</li>
                <li>Birthing pool for labor and/or birth</li>
                <li>Warm compresses on back or lower abdomen</li>
                <li>Hot water bottle or heating pad</li>
                <li>Can be very effective for back pain</li>
                <li>Promotes relaxation</li>
                <li>No side effects</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Movement and positioning</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Walking and staying upright</li>
                <li>Rocking movements</li>
                <li>Birth ball or peanut ball</li>
                <li>Different positions (hands and knees, squatting)</li>
                <li>Can help labor progress</li>
                <li>Uses gravity to assist baby's descent</li>
                <li>May reduce the intensity of contractions</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Touch and massage</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Massage of lower back or shoulders</li>
                <li>Counter-pressure on the back</li>
                <li>Light touch or stroking</li>
                <li>Acupressure at specific points</li>
                <li>TENS machine (Transcutaneous Electrical Nerve Stimulation)</li>
                <li>Partner can be involved</li>
                <li>No side effects</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Medical pain relief</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Entonox (Gas and Air)</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Mixture of oxygen and nitrous oxide</li>
                <li>Breathed through a mouthpiece or mask</li>
                <li>Takes effect quickly but wears off quickly too</li>
                <li>You control when to use it</li>
                <li>Can be used at any stage of labor</li>
                <li>Available in all birth settings</li>
                <li>May cause nausea, dizziness, or disorientation</li>
                <li>No long-lasting effects on you or baby</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Opioid medications</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Includes pethidine, diamorphine, and meptazinol</li>
                <li>Given by injection into thigh or buttock</li>
                <li>Last for 2-4 hours</li>
                <li>May make you feel drowsy or sick</li>
                <li>Can cross the placenta and affect baby's breathing if given too close to birth</li>
                <li>Available in hospitals and some birth centers</li>
                <li>Not available for home births</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Epidural</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Anesthetic injected into the space around spinal nerves</li>
                <li>Most effective form of pain relief</li>
                <li>Given by an anesthesiologist</li>
                <li>Continuous infusion or topped up as needed</li>
                <li>Generally doesn't affect baby</li>
                <li>May slow labor slightly</li>
                <li>Limits mobility – you stay in bed</li>
                <li>May increase chance of assisted delivery</li>
                <li>Only available in hospitals</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Spinal block</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Single injection of anesthetic near spinal cord</li>
                <li>Works quickly but only lasts 1-2 hours</li>
                <li>Often used for cesarean sections</li>
                <li>May be used for forceps or ventouse deliveries</li>
                <li>Provides complete pain relief for lower body</li>
                <li>Only available in hospitals</li>
                <li>May cause drop in blood pressure</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Tips for pain management</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Learn about all options before labor begins</li>
              <li>Keep an open mind – you may need different approaches than planned</li>
              <li>Consider starting with natural methods and progressing to medical options if needed</li>
              <li>Communicate your preferences to your birth partner and healthcare team</li>
              <li>Remember that what works varies greatly between individuals</li>
              <li>The goal is to help you cope, not necessarily eliminate all sensation</li>
            </ul>
            <p className="mt-3 text-sm">
              Discuss pain relief options with your midwife during pregnancy and include your preferences in your birth plan, while remaining flexible to changing needs during labor.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'delivery-process',
      title: 'The delivery process',
      content: (
        <div>
          <p className="mb-4">
            The actual delivery of your baby occurs during the second stage of labor, after your cervix has fully dilated to 10 centimeters. This is when you'll actively push your baby out into the world.
          </p>

          <h3 className="font-medium text-lg mb-3">Pushing and birth</h3>
          <p className="mb-3">
            When your cervix is fully dilated, you'll likely feel a strong, natural urge to push with each contraction. Your midwife or doctor will guide you through this process.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">What to expect during the pushing phase:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Strong urge to bear down with contractions</li>
              <li>Healthcare providers will guide your pushing efforts</li>
              <li>You may be encouraged to push when you feel the urge</li>
              <li>Different positions can be used (semi-reclined, side-lying, squatting, hands and knees)</li>
              <li>You may feel intense pressure and stretching sensation</li>
              <li>The baby's head will crown (become visible) as it descends</li>
              <li>Healthcare providers may support your perineum to reduce tearing</li>
              <li>After the head delivers, the rest of the body typically follows quickly</li>
            </ul>
          </div>

          <h3 className="font-medium text-lg mb-3">Assisted delivery</h3>
          <p className="mb-3">
            Sometimes, help is needed to deliver your baby. This may be recommended if:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>You've been pushing for a long time without progress</li>
            <li>Your baby is in distress</li>
            <li>You're exhausted and unable to push effectively</li>
            <li>Your baby is in an awkward position</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Forceps delivery</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Metal instruments shaped like large spoons or tongs</li>
                <li>Placed around baby's head to help guide them out</li>
                <li>Local anesthetic or epidural usually given first</li>
                <li>Episiotomy (cut to widen the vaginal opening) often performed</li>
                <li>May leave temporary marks on baby's face</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Ventouse (vacuum) delivery</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Suction cup attached to baby's head</li>
                <li>Gentle suction helps guide baby out</li>
                <li>Less likely to cause vaginal trauma than forceps</li>
                <li>May cause temporary swelling on baby's head</li>
                <li>Less force can be applied than with forceps</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Episiotomy and tearing</h3>
          <p className="mb-3">
            The tissue between the vagina and anus (perineum) needs to stretch significantly during childbirth. Sometimes it tears naturally or is cut deliberately (episiotomy).
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li><strong>Episiotomy</strong> – a surgical cut to enlarge the vaginal opening, done with scissors or scalpel</li>
            <li>Performed with local anesthetic if you don't already have an epidural</li>
            <li>No longer done routinely but may be necessary in some situations (assisted delivery, baby in distress)</li>
            <li><strong>Perineal tears</strong> – classified by severity from first degree (skin only) to fourth degree (extending to anal sphincter)</li>
            <li>Stitches (sutures) are usually needed for second-degree or more severe tears and episiotomies</li>
            <li>Healing typically takes several weeks</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Delivery of the placenta</h3>
          <p className="mb-3">
            After your baby is born, you'll enter the third stage of labor – delivery of the placenta.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">What happens during the third stage:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mild contractions help the placenta separate from the uterine wall</li>
              <li>You may be asked to push gently to deliver the placenta</li>
              <li>The placenta is examined to ensure it's complete</li>
              <li>There are two management approaches:
                <ul className="list-disc pl-5 mt-1 mb-1">
                  <li><strong>Active management</strong> – injection to help the uterus contract, cord clamping, gentle traction on cord</li>
                  <li><strong>Physiological (natural) management</strong> – no intervention unless necessary, placenta delivers by maternal effort</li>
                </ul>
              </li>
              <li>Active management reduces risk of heavy bleeding and is most common in hospital settings</li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500 mb-6">
            <h3 className="font-bold mb-2">When complications arise</h3>
            <p className="mb-3">
              Sometimes unexpected situations arise during delivery. Your healthcare team is trained to respond quickly to any complications.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Fetal distress</strong> – if baby's heart rate indicates distress, expedited delivery may be needed</li>
              <li><strong>Shoulder dystocia</strong> – when baby's shoulder gets stuck behind mother's pubic bone</li>
              <li><strong>Postpartum hemorrhage</strong> – heavy bleeding after birth</li>
              <li><strong>Umbilical cord issues</strong> – such as cord around baby's neck (nuchal cord)</li>
            </ul>
            <p className="mt-3 text-sm">
              Trust your healthcare team to make appropriate recommendations if complications occur. Their priority is the safety of you and your baby.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'immediate-after-birth',
      title: 'Immediately after birth',
      content: (
        <div>
          <p className="mb-4">
            The moments immediately after birth are precious and important for both you and your baby. This period, sometimes called the "golden hour," offers unique opportunities for bonding and has physiological benefits.
          </p>

          <h3 className="font-medium text-lg mb-3">First moments with your baby</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Skin-to-skin contact</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Baby placed directly on your bare chest</li>
                <li>Helps regulate baby's temperature, breathing, and heart rate</li>
                <li>Promotes bonding and attachment</li>
                <li>Stimulates feeding behaviors</li>
                <li>Colonizes baby with normal protective bacteria from your skin</li>
                <li>Reduces stress hormones in both mother and baby</li>
                <li>Can still be done after cesarean birth in most cases</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Delayed cord clamping</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Waiting at least 1-3 minutes before cutting the umbilical cord</li>
                <li>Allows extra blood flow from placenta to baby</li>
                <li>Increases baby's iron stores</li>
                <li>Recommended by World Health Organization (WHO)</li>
                <li>May not be appropriate in all situations</li>
                <li>Your birth partner may be offered the opportunity to cut the cord</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Newborn care procedures</h3>
          <p className="mb-3">
            While you're holding your baby and recovering from birth, healthcare providers will perform some routine procedures:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li><strong>Apgar score assessment</strong> – evaluation of baby's condition at 1 and 5 minutes after birth</li>
            <li><strong>Drying and warming</strong> – to prevent heat loss</li>
            <li><strong>Mucus clearance</strong> – if needed, gentle suctioning of baby's mouth and nose</li>
            <li><strong>Vitamin K injection</strong> – to prevent rare but serious bleeding problems</li>
            <li><strong>Eye prophylaxis</strong> – treatment to prevent eye infections (practice varies by country)</li>
            <li><strong>Weight and measurements</strong> – often done after the initial bonding period</li>
            <li><strong>Identification bands</strong> – placed on you and your baby</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Starting breastfeeding</h3>
          <p className="mb-3">
            If you plan to breastfeed, the first hour after birth is an ideal time to start.
          </p>
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">First breastfeeding:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Newborns are often alert and ready to feed shortly after birth</li>
              <li>Baby may crawl toward the breast and latch spontaneously (breast crawl)</li>
              <li>Your midwife can help position baby and assist with latching</li>
              <li>First milk (colostrum) is rich in antibodies and perfectly suited for newborns</li>
              <li>Early breastfeeding helps your uterus contract, reducing bleeding</li>
              <li>Stimulates ongoing milk production</li>
              <li>Establishes feeding relationship between you and baby</li>
            </ul>
            <p className="mt-3 text-sm">
              If breastfeeding is delayed for medical reasons, skin-to-skin contact can still be beneficial, and breastfeeding can be initiated when both you and baby are ready.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Mother's physical recovery</h3>
          <p className="mb-3">
            In the immediate postpartum period, your body begins its recovery process:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Healthcare providers will monitor your vital signs and bleeding</li>
            <li>Your uterus will contract significantly, which may cause cramping (afterpains)</li>
            <li>You may be offered pain relief if needed, especially if you had an episiotomy or tear</li>
            <li>A small meal and drink are often welcome after the exertion of labor</li>
            <li>You'll be helped to the bathroom when ready, as urination can be difficult at first</li>
            <li>A shower may be available when you're feeling stable</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Emotional responses</h3>
          <p className="mb-3">
            The moments after birth can bring a range of emotional responses:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Overwhelming joy and love</li>
            <li>Relief that labor is over</li>
            <li>Feeling stunned or overwhelmed</li>
            <li>Initial disconnection or numbness</li>
            <li>Tiredness and need for rest</li>
            <li>Excitement to introduce baby to family</li>
          </ul>
          <p className="mb-3">
            All of these reactions are normal. There's no "right way" to feel after birth, and emotions can change rapidly.
          </p>

          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-bold mb-2">Looking ahead</h4>
            <p className="mb-3">
              After these first precious moments, you'll move into the postpartum period as you recover from birth and adjust to life with your new baby.
            </p>
            <p className="mb-3">
              Learn more about the days and weeks following birth in our <Link to="/pregnancy/after-birth" className="text-[#005eb8] font-medium hover:underline">After the birth guide</Link>.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Labor and Birth</h1>
          <p className="text-xl font-medium">
            Information about the stages of labor, birth options, pain relief, and what happens during delivery
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
                    <Link to="/pregnancy/late" className="text-[#005eb8] hover:underline text-sm">Late pregnancy</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/signs-of-labor" className="text-[#005eb8] hover:underline text-sm">Signs of labor</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/birth-plan-creator" className="text-[#005eb8] hover:underline text-sm">Birth plan creator</Link>
                  </li>
                  <li>
                    <Link to="/tools/contraction-timer" className="text-[#005eb8] hover:underline text-sm">Contraction timer</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/after-birth" className="text-[#005eb8] hover:underline text-sm">After the birth</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="prose max-w-none">
                <p className="text-lg">
                  Birth is a unique experience for every woman. This guide covers what happens during labor and birth, including information about the different stages of labor, birth options, pain management, and what to expect during delivery. Understanding the process can help you prepare for this transformative experience.
                </p>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">{section.title}</h2>
                <div className="prose max-w-none">{section.content}</div>
              </section>
            ))}

            <div className="mt-8">
              <Link to="/pregnancy" className="text-[#005eb8] font-medium hover:underline flex items-center">
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

export default LaborAndBirthPage;
