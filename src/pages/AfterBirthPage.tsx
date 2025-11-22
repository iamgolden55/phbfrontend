import React from 'react';
import { Link } from 'react-router-dom';

interface SectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

const AfterBirthPage: React.FC = () => {
  const sections: SectionType[] = [
    {
      id: 'fourth-trimester',
      title: 'The fourth trimester',
      content: (
        <div>
          <p className="mb-4">
            The "fourth trimester" refers to the first three months after your baby's birth. This period is a time of significant adjustment as you recover physically and emotionally from childbirth while learning to care for your newborn.
          </p>
          <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-bold">What is the fourth trimester?</h3>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm">
                The concept of the fourth trimester recognizes that newborns are still developing and adapting to life outside the womb during their first three months, while mothers are undergoing significant physical and emotional transitions. This period requires special care, support, and adjustment for both you and your baby.
              </p>
              <p className="text-sm">
                During this time, your baby is learning to regulate their bodily functions, developing their senses, and adjusting to the external environment. Meanwhile, your body is recovering from pregnancy and childbirth, and you're adapting to new routines, sleep patterns, and parenting responsibilities.
              </p>
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-md border-l-4 border-amber-500 mb-4">
            <h3 className="font-bold mb-2">Important</h3>
            <p>
              The postpartum period is a time when you need extra care and support. Don't hesitate to ask for help from family, friends, and healthcare providers. Remember that adjustment takes time, and it's normal to face challenges during this period.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'physical-recovery',
      title: 'Physical recovery after birth',
      content: (
        <div>
          <p className="mb-4">
            Your body undergoes significant changes during pregnancy and childbirth, and it needs time to heal and recover afterward. The physical recovery process varies depending on your individual circumstances and type of birth.
          </p>

          <h3 className="font-medium text-lg mb-3">Vaginal birth recovery</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">What to expect after a vaginal birth:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vaginal bleeding (lochia)</strong> – Heavy bleeding initially, gradually reducing over 2-6 weeks</li>
              <li><strong>Perineal pain</strong> – Soreness, especially if you had stitches from tearing or an episiotomy</li>
              <li><strong>Afterpains</strong> – Cramping as your uterus contracts to return to its pre-pregnancy size</li>
              <li><strong>Swelling and bruising</strong> – In the perineal area</li>
              <li><strong>Difficulty urinating</strong> – Temporary issues with bladder control</li>
              <li><strong>Hemorrhoids</strong> – May develop or worsen during pushing</li>
            </ul>
          </div>

          <h3 className="font-medium text-lg mb-3">Cesarean birth recovery</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">What to expect after a cesarean birth:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Incision pain</strong> – Soreness at the incision site that gradually improves</li>
              <li><strong>Vaginal bleeding</strong> – Still occurs despite not having a vaginal birth</li>
              <li><strong>Restricted movement</strong> – Difficulty with certain movements initially</li>
              <li><strong>Gas pain</strong> – Trapped air in the abdomen causing discomfort</li>
              <li><strong>Longer recovery time</strong> – Typically 4-6 weeks for basic recovery</li>
              <li><strong>Numbness around incision</strong> – May persist for months</li>
            </ul>
          </div>

          <h3 className="font-medium text-lg mb-3">General postpartum physical changes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Breast changes</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Colostrum (first milk) production in the first few days</li>
                <li>Milk "coming in" around day 2-5, causing fullness or engorgement</li>
                <li>Possible leaking between feedings</li>
                <li>If not breastfeeding, breasts will still produce milk initially but will stop within 7-10 days</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Hormonal changes</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Rapid drop in estrogen and progesterone levels</li>
                <li>Increased prolactin for milk production if breastfeeding</li>
                <li>Night sweats as your body eliminates excess fluid</li>
                <li>Hair loss as hair growth cycle returns to normal</li>
                <li>Mood fluctuations due to hormonal shifts</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Abdominal changes</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Soft, loose abdomen as muscles gradually regain tone</li>
                <li>Continued pregnancy-like appearance for some weeks</li>
                <li>Linea nigra (dark line) fades gradually</li>
                <li>Some separation of abdominal muscles (diastasis recti) is common</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Other changes</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Fatigue from birth exertion and disrupted sleep</li>
                <li>Weight loss of about 10-12 pounds initially (baby, placenta, fluid)</li>
                <li>Urinary or fecal incontinence may occur temporarily</li>
                <li>Joint laxity as hormones gradually return to pre-pregnancy levels</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Self-care for recovery</h3>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li><strong>Rest</strong> – Sleep whenever possible, especially when your baby sleeps</li>
            <li><strong>Hydration</strong> – Drink plenty of water, especially if breastfeeding</li>
            <li><strong>Nutrition</strong> – Focus on nutrient-dense foods to support healing and energy</li>
            <li><strong>Perineal care</strong> – Use warm water bottles, cold packs, or sitz baths for comfort</li>
            <li><strong>Pain management</strong> – Take prescribed or recommended pain relief as needed</li>
            <li><strong>Movement</strong> – Gentle walking increases circulation and aids healing</li>
            <li><strong>Pelvic floor exercises</strong> – Begin gentle Kegels when advised by your healthcare provider</li>
            <li><strong>Avoid heavy lifting</strong> – Nothing heavier than your baby for the first 6 weeks</li>
          </ul>

          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500 mb-6">
            <h3 className="font-bold mb-2">When to seek medical help</h3>
            <p className="mb-3">
              Contact your healthcare provider immediately if you experience any of these symptoms after childbirth:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Heavy bleeding that soaks through a pad within an hour</li>
              <li>Blood clots larger than a plum</li>
              <li>Foul-smelling vaginal discharge</li>
              <li>Fever over 38°C (100.4°F)</li>
              <li>Severe pain in your abdomen, perineum, or incision site</li>
              <li>Redness, swelling, or discharge from your incision (C-section)</li>
              <li>Pain, redness, or swelling in your legs</li>
              <li>Severe headache or changes in vision</li>
              <li>Chest pain or difficulty breathing</li>
              <li>Thoughts of harming yourself or your baby</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'newborn-care',
      title: 'Caring for your newborn',
      content: (
        <div>
          <p className="mb-4">
            Caring for a newborn can feel overwhelming at first, but with time and practice, you'll become more confident. Here's information about the basic aspects of newborn care.
          </p>

          <h3 className="font-medium text-lg mb-3">Feeding your baby</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Breastfeeding</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Recommended exclusively for the first 6 months</li>
                <li>On-demand feeding, typically 8-12 times in 24 hours</li>
                <li>Each session may last 20-40 minutes initially</li>
                <li>Good latch is essential - seek help if painful</li>
                <li>Signs of adequate intake: 6+ wet nappies daily, regular bowel movements, weight gain</li>
                <li>Common challenges include sore nipples, engorgement, and concerns about supply</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Formula feeding</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Follow manufacturer's instructions for preparation</li>
                <li>Sterilize bottles and equipment until baby is 12 months</li>
                <li>Newborns typically take 30-90ml (1-3oz) per feeding</li>
                <li>Feed about every 3-4 hours, or when hungry</li>
                <li>Hold baby semi-upright for feeding</li>
                <li>Burp during and after feedings</li>
                <li>Never prop bottles or put baby to bed with a bottle</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Sleep patterns and safe sleep</h3>
          <p className="mb-3">
            Newborns sleep 14-17 hours per day in short periods of 2-4 hours, gradually developing longer sleep periods.
          </p>
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Safe sleep guidelines:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Always place baby on their back to sleep</li>
              <li>Use a firm, flat sleep surface with a fitted sheet</li>
              <li>Room-sharing (but not bed-sharing) for at least the first 6 months</li>
              <li>Keep cot free of pillows, bumpers, blankets, and soft toys</li>
              <li>Maintain a smoke-free environment</li>
              <li>Avoid overheating - dress baby appropriately for the room temperature</li>
              <li>Consider offering a pacifier at sleep time after breastfeeding is established</li>
            </ul>
          </div>

          <h3 className="font-medium text-lg mb-3">Nappy changing and bathing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Nappy changing</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Newborns need 8-12 nappy changes daily</li>
                <li>Change promptly when wet or soiled</li>
                <li>Clean genitals thoroughly with each change</li>
                <li>For girls, wipe front to back</li>
                <li>For boys, point penis downward in nappy</li>
                <li>For umbilical cord care, keep the area clean and dry</li>
                <li>Apply barrier cream if redness occurs</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Bathing</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Until cord falls off, give sponge baths only</li>
                <li>After cord detaches, 2-3 baths per week is sufficient</li>
                <li>Use warm (not hot) water and mild baby soap</li>
                <li>Have all supplies ready before starting</li>
                <li>Never leave baby unattended in water</li>
                <li>Keep room warm to prevent chilling</li>
                <li>Focus on creases (neck, armpits, groin)</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Understanding your newborn's cues</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">Common baby cues:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Hunger signs</strong>: Rooting, putting hands to mouth, sucking motions, fussing</li>
              <li><strong>Tired signs</strong>: Rubbing eyes, yawning, looking away, fussiness</li>
              <li><strong>Overstimulation</strong>: Turning head away, arching back, crying</li>
              <li><strong>Discomfort</strong>: Drawing up legs, crying with specific pattern, facial grimacing</li>
              <li><strong>Seeking interaction</strong>: Alert eyes, reaching out, cooing</li>
            </ul>
            <p className="mt-3 text-sm">
              Responding promptly to your baby's cues helps build trust and security. Over time, you'll become more adept at reading your baby's unique communication style.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">When to contact your healthcare provider</h3>
          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500 mb-6">
            <p className="mb-3">
              Contact your doctor or seek emergency care if your baby shows any of these signs:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fever (38°C/100.4°F or higher) in a baby under 3 months</li>
              <li>Difficulty breathing or persistent rapid breathing</li>
              <li>Blue or pale skin coloration</li>
              <li>Refusal to feed for multiple feedings</li>
              <li>Excessive sleepiness or difficulty waking</li>
              <li>Persistent or inconsolable crying</li>
              <li>Yellowing of the skin or eyes (jaundice)</li>
              <li>Fewer wet nappies than expected (fewer than 6 in 24 hours)</li>
              <li>Vomiting (not just spitting up) or diarrhea</li>
              <li>Redness, discharge, or odor from umbilical cord</li>
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
          <p className="mb-4">
            The postpartum period brings significant emotional changes as you adjust to new roles, responsibilities, and the physical effects of childbirth. Understanding and caring for your emotional health is just as important as physical recovery.
          </p>

          <h3 className="font-medium text-lg mb-3">Normal emotional changes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Baby blues</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Affects up to 80% of new mothers</li>
                <li>Typically begins 2-3 days after birth</li>
                <li>Lasts for a few days to two weeks</li>
                <li>Symptoms include mood swings, tearfulness, irritability, anxiety, and feeling overwhelmed</li>
                <li>Caused by hormonal changes, fatigue, and adjustment to new responsibilities</li>
                <li>Usually resolves without treatment</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Range of emotions</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Joy and love for your baby</li>
                <li>Feeling protective and vigilant</li>
                <li>Worry about your baby's wellbeing</li>
                <li>Feeling overwhelmed by responsibility</li>
                <li>Identity shifts as you adjust to being a parent</li>
                <li>Relationship changes with your partner</li>
                <li>Grief for your pre-baby lifestyle</li>
              </ul>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-3">Perinatal mental health conditions</h3>
          <p className="mb-3">
            Some new parents develop more serious mental health conditions that require treatment and support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Postpartum depression (PPD)</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Affects 1 in 10 women after childbirth</li>
                <li>Can begin any time in the first year</li>
                <li>Symptoms include persistent sadness, extreme fatigue, feelings of worthlessness, difficulty bonding with baby, withdrawal from others, changes in appetite and sleep</li>
                <li>More severe and longer-lasting than baby blues</li>
                <li>Requires treatment (therapy, support groups, sometimes medication)</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold mb-2">Other perinatal mood disorders</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Postpartum anxiety</strong> – Excessive worry, racing thoughts, feeling on edge</li>
                <li><strong>Postpartum OCD</strong> – Intrusive thoughts, repetitive behaviors</li>
                <li><strong>Postpartum PTSD</strong> – Following traumatic birth experience</li>
                <li><strong>Postpartum psychosis</strong> – Rare but serious condition requiring immediate medical attention</li>
                <li>Partners can also experience depression and anxiety related to becoming a parent</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-md border-l-4 border-purple-500 mb-6">
            <h3 className="font-bold mb-2">Warning signs to seek help</h3>
            <p className="mb-3">
              Contact your healthcare provider if you experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Feelings of sadness, emptiness, or hopelessness that don't lift</li>
              <li>Excessive anxiety, worry, or panic attacks</li>
              <li>Difficulty bonding with your baby</li>
              <li>Thoughts of harming yourself or your baby</li>
              <li>Feeling like you're not coping or are a failure as a parent</li>
              <li>Withdrawing from family and friends</li>
              <li>Loss of interest in activities you used to enjoy</li>
              <li>Symptoms that interfere with your ability to care for yourself or your baby</li>
            </ul>
            <p className="mt-3 text-sm">
              <strong>Remember:</strong> Seeking help is a sign of strength, not weakness. Effective treatments are available, and early intervention leads to better outcomes.
            </p>
          </div>

          <h3 className="font-medium text-lg mb-3">Self-care for emotional wellbeing</h3>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li><strong>Rest when possible</strong> – Sleep deprivation can worsen emotional challenges</li>
            <li><strong>Accept help</strong> – Let others assist with meals, housework, and baby care</li>
            <li><strong>Connect with others</strong> – Share feelings with supportive people, join parent groups</li>
            <li><strong>Adjust expectations</strong> – Be realistic about what you can accomplish</li>
            <li><strong>Take breaks</strong> – Even short periods away from baby care can be refreshing</li>
            <li><strong>Physical activity</strong> – Gentle exercise can improve mood</li>
            <li><strong>Nutrition</strong> – Healthy eating supports emotional wellbeing</li>
            <li><strong>Fresh air and daylight</strong> – Try to get outside daily</li>
            <li><strong>Mindfulness and relaxation</strong> – Even brief moments of calm can help</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Supporting your relationship</h3>
          <p className="mb-3">
            The arrival of a baby significantly impacts relationships. Here are ways to nurture your partnership:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Communicate openly about feelings, needs, and challenges</li>
            <li>Recognize that both partners are adjusting to new roles</li>
            <li>Divide baby care and household responsibilities</li>
            <li>Schedule even small moments of connection</li>
            <li>Express appreciation for each other's efforts</li>
            <li>Seek help together if relationship difficulties persist</li>
          </ul>
        </div>
      )
    },
    {
      id: 'adjusting-to-life',
      title: 'Adjusting to life with a baby',
      content: (
        <div>
          <p className="mb-4">
            The transition to parenthood involves significant lifestyle changes. Finding your new normal takes time and patience.
          </p>

          <h3 className="font-medium text-lg mb-3">Creating routines</h3>
          <p className="mb-3">
            In the early weeks, your baby's needs will drive your schedule. Gradually, you'll develop patterns that work for your family.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Follow your baby's lead initially, responding to their cues</li>
            <li>Look for emerging patterns in feeding, sleeping, and alert times</li>
            <li>Create flexible routines rather than rigid schedules</li>
            <li>Establish simple daily rituals that signal different parts of the day</li>
            <li>Prioritize essential tasks and let go of less important ones</li>
            <li>Remember that routines will continually evolve as your baby develops</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Managing visitors and social connections</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <h4 className="font-bold mb-2">Balancing support and space:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Consider limiting visitors in the early days to allow recovery and bonding</li>
              <li>Communicate your needs and boundaries clearly to family and friends</li>
              <li>Welcome practical support (meals, errands, household help)</li>
              <li>Don't feel obligated to entertain visitors</li>
              <li>Consider scheduling visits during times when extra hands would be helpful</li>
              <li>Connect with other new parents through groups or classes when you're ready</li>
            </ul>
          </div>

          <h3 className="font-medium text-lg mb-3">Returning to work</h3>
          <p className="mb-3">
            If you're planning to return to work, preparation can help ease the transition.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Start planning childcare arrangements well in advance</li>
            <li>Consider a phased return if possible</li>
            <li>Practice your new routine before your return date</li>
            <li>If breastfeeding, begin expressing and storing milk several weeks before returning</li>
            <li>Communicate with your employer about accommodations for pumping if needed</li>
            <li>Prepare for mixed emotions – guilt, anxiety, and sometimes relief are all normal</li>
            <li>Be gentle with yourself as you navigate this additional transition</li>
          </ul>

          <h3 className="font-medium text-lg mb-3">Finding your new identity</h3>
          <p className="mb-3">
            Becoming a parent is a profound identity shift. Give yourself time to integrate this new role into your sense of self.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Acknowledge that ambivalent feelings are normal and don't diminish your love for your baby</li>
            <li>Try to maintain connections to activities and interests that were important to you before parenthood</li>
            <li>Recognize that your relationship with yourself, your partner, and others will evolve</li>
            <li>Consider journaling as a way to process your feelings about this transformation</li>
            <li>Remember that parenting is a journey of continuous growth and adaptation</li>
          </ul>

          <div className="bg-green-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">A note of encouragement</h4>
            <p className="mb-3">
              The postpartum period and early parenting days can be challenging, but they do get easier. As you and your baby get to know each other, and as you gain confidence in your parenting abilities, you'll find your stride.
            </p>
            <p>
              Remember that there's no one "right way" to parent. Trust your instincts, seek support when needed, and be compassionate with yourself as you navigate this transformative time.
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
          <h1 className="text-3xl font-bold mb-4">After the Birth</h1>
          <p className="text-xl font-medium">
            Information about physical recovery, caring for your newborn, emotional wellbeing, and adjusting to life with a baby
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
                    <Link to="/pregnancy/labor-and-birth" className="text-[#0891b2] hover:underline text-sm">Labor and birth</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/nutrition-guide" className="text-[#0891b2] hover:underline text-sm">Nutrition guide</Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/breastfeeding" className="text-[#0891b2] hover:underline text-sm">Breastfeeding guide</Link>
                  </li>
                  <li>
                    <Link to="/mental-health" className="text-[#0891b2] hover:underline text-sm">Mental health</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="prose max-w-none">
                <p className="text-lg">
                  The weeks following the birth of your baby are a time of significant change and adjustment. This guide covers physical recovery after childbirth, caring for your newborn, emotional wellbeing, and establishing new routines as you adapt to life with your baby.
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

export default AfterBirthPage;
