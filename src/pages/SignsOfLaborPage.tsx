import React from 'react';
import { Link } from 'react-router-dom';

interface SignType {
  id: string;
  title: string;
  description: string;
  timing: string;
  action: string;
  category: 'early' | 'active' | 'imminent';
}

const laborSigns: SignType[] = [
  {
    id: 'lightening',
    title: 'Lightening (baby dropping)',
    description: 'When your baby moves down into your pelvis in preparation for birth. You might feel less pressure on your diaphragm, making it easier to breathe, but more pressure on your bladder, causing more frequent urination. Your bump may look lower.',
    timing: 'Usually 2-4 weeks before labor in first pregnancies; may happen just before labor in subsequent pregnancies',
    action: 'No action needed. Continue with your normal activities and rest when you need to.',
    category: 'early'
  },
  {
    id: 'bloody-show',
    title: 'Bloody show',
    description: 'The mucus plug that sealed your cervix during pregnancy comes away as your cervix begins to soften and open. You may notice a pinkish or brownish discharge, or a small amount of blood mixed with mucus.',
    timing: 'Days or hours before labor begins',
    action: 'No immediate action needed, but inform your midwife or doctor at your next appointment or when your labor starts.',
    category: 'early'
  },
  {
    id: 'nesting',
    title: 'Nesting instinct',
    description: 'A sudden burst of energy and desire to clean, organize, and prepare your home for the baby. You might feel an overwhelming urge to get everything ready.',
    timing: 'Often occurs in the days before labor',
    action: 'It\'s fine to follow this instinct, but avoid exhausting yourself or doing anything risky like climbing ladders. Save your energy for labor.',
    category: 'early'
  },
  {
    id: 'diarrhea',
    title: 'Diarrhea or loose bowels',
    description: 'Your body releases prostaglandins as it prepares for labor, which can cause your bowels to loosen. This helps to empty your bowels to make more room for the baby to pass through the birth canal.',
    timing: 'Often 24-48 hours before labor starts',
    action: 'Stay hydrated and rest. Contact your healthcare provider if you have severe diarrhea with dehydration or fever.',
    category: 'early'
  },
  {
    id: 'backache',
    title: 'Persistent lower back pain',
    description: 'A persistent ache or pressure in your lower back that doesn\'t ease with position changes. This can be caused by the baby\'s position or by early contractions.',
    timing: 'May begin before regular contractions',
    action: 'Try comfort measures like warm baths, massage, or a heating pad on low setting. Contact your provider if pain is severe or accompanied by regular contractions.',
    category: 'early'
  },
  {
    id: 'waters-breaking',
    title: 'Waters breaking (rupture of membranes)',
    description: 'When the amniotic sac ruptures, releasing the fluid that has cushioned your baby during pregnancy. This can be a sudden gush or a slow trickle of fluid.',
    timing: 'Can happen before labor starts or during labor',
    action: 'Contact your healthcare provider or maternity unit right away, regardless of whether you\'re having contractions. Note the time, amount, and color of the fluid.',
    category: 'active'
  },
  {
    id: 'regular-contractions',
    title: 'Regular contractions',
    description: 'True labor contractions come at regular intervals, gradually get stronger and closer together, and don\'t go away with rest or position changes. They usually start in your back and wrap around to your abdomen.',
    timing: 'When active labor begins; typically contractions that last 30-70 seconds and occur every 5-7 minutes',
    action: 'Begin timing your contractions. Contact your healthcare provider or go to the hospital based on their guidance (usually when contractions are 5 minutes apart, lasting 1 minute, for 1 hour).',
    category: 'active'
  },
  {
    id: 'cervical-changes',
    title: 'Cervical dilation and effacement',
    description: 'Your cervix begins to thin out (efface) and open (dilate) in preparation for birth. A healthcare provider checks these changes through a vaginal examination.',
    timing: 'Gradual process that occurs throughout labor; early labor: 0-3 cm, active labor: 4-7 cm, transition: 8-10 cm',
    action: 'Your healthcare provider will monitor this and advise you on your labor progress.',
    category: 'active'
  },
  {
    id: 'increased-pain',
    title: 'Increased intensity of contractions',
    description: 'Contractions become stronger, longer-lasting, and closer together as labor progresses. During active labor, they require your full attention and make it difficult to talk or move during them.',
    timing: 'Active labor contractions typically come every 3-5 minutes and last 45-60 seconds',
    action: 'Use breathing techniques, move to comfortable positions, and consider pain relief options discussed in your birth plan.',
    category: 'active'
  },
  {
    id: 'transition',
    title: 'Transition symptoms',
    description: 'The most intense phase of labor, with symptoms that may include shaking, feeling hot and cold, nausea or vomiting, feeling pressure in your rectum, and feeling overwhelmed or irritable.',
    timing: 'Usually when dilation is 7-10 cm, shortly before pushing begins',
    action: 'Focus on one contraction at a time, communicate your needs clearly, and remember this is usually the shortest phase of labor.',
    category: 'imminent'
  },
  {
    id: 'urge-to-push',
    title: 'Urge to push',
    description: 'An overwhelming, involuntary urge to bear down, similar to the sensation of needing to have a bowel movement. This happens when your baby has descended into the birth canal and is pressing on nerves in your rectum.',
    timing: 'Second stage of labor, after full dilation (10 cm)',
    action: 'Follow your healthcare provider\'s guidance on when to push. They may instruct you to wait until you\'re fully dilated if you feel the urge earlier.',
    category: 'imminent'
  },
  {
    id: 'pressure',
    title: 'Intense pressure in pelvis and rectum',
    description: 'A strong feeling of pressure in your pelvic floor, vagina, and rectum as the baby moves down the birth canal. Many women describe it as feeling like the baby is "right there."',
    timing: 'Late first stage and second stage of labor',
    action: 'This is normal and means you\'re progressing well. Your healthcare team will guide you through this phase.',
    category: 'imminent'
  }
];

const SignsOfLaborPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Signs of Labor</h1>
          <p className="text-xl font-medium">
            Recognizing when labor is beginning and what to expect during childbirth
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <p className="text-lg mb-4">
            As you approach your due date, you may wonder how you'll know when labor is starting. Every woman's experience is different, but there are common signs that can help you recognize when your body is preparing for childbirth.
          </p>
          <p className="text-lg mb-4">
            This guide explains the signs of labor, from early indicators that labor may be approaching to the definitive signs that labor has begun, and what actions to take at each stage.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-3">True labor vs. false labor</h2>
            <p className="mb-3">
              Before we discuss the signs of labor, it's important to understand the difference between true labor and false labor (Braxton Hicks contractions):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-blue-700 mb-2">True labor contractions</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Come at regular intervals and get closer together over time</li>
                  <li>Get stronger and more painful with time</li>
                  <li>Usually start in the back and move to the front</li>
                  <li>Don't go away when you change position or rest</li>
                  <li>Continue despite hydration or comfort measures</li>
                  <li>Cause your cervix to dilate and efface</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-blue-700 mb-2">False labor (Braxton Hicks)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Irregular and don't get consistently closer together</li>
                  <li>Often don't increase in intensity</li>
                  <li>Usually felt only in the front (abdomen)</li>
                  <li>May stop when you change position or activity</li>
                  <li>Often subside with rest and hydration</li>
                  <li>Don't cause progressive cervical changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Early signs section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#0891b2]">Early signs that labor may be approaching</h2>
          <p className="mb-6">These signs may occur days or even weeks before labor begins. They indicate that your body is preparing, but don't necessarily mean that labor is imminent.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laborSigns.filter(sign => sign.category === 'early').map((sign) => (
              <div key={sign.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 bg-purple-50 border-b border-gray-200">
                  <h3 className="font-bold text-lg">{sign.title}</h3>
                </div>
                <div className="p-4">
                  <p className="mb-4">{sign.description}</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="font-bold text-sm text-gray-600">When it typically happens:</p>
                      <p className="text-sm">{sign.timing}</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-600">What to do:</p>
                      <p className="text-sm">{sign.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active labor signs section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#0891b2]">Signs that labor has begun</h2>
          <p className="mb-6">These are the definitive signs that labor is underway. When you experience these signs, you should contact your healthcare provider or go to your birthing location based on their instructions.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laborSigns.filter(sign => sign.category === 'active').map((sign) => (
              <div key={sign.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 bg-blue-50 border-b border-gray-200">
                  <h3 className="font-bold text-lg">{sign.title}</h3>
                </div>
                <div className="p-4">
                  <p className="mb-4">{sign.description}</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="font-bold text-sm text-gray-600">When it typically happens:</p>
                      <p className="text-sm">{sign.timing}</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-600">What to do:</p>
                      <p className="text-sm">{sign.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Imminent birth signs section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#0891b2]">Signs that birth is approaching soon</h2>
          <p className="mb-6">These signs indicate that you're in the later stages of labor and birth may be imminent. By this point, you should already be at your birthing location with your healthcare team.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laborSigns.filter(sign => sign.category === 'imminent').map((sign) => (
              <div key={sign.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 bg-red-50 border-b border-gray-200">
                  <h3 className="font-bold text-lg">{sign.title}</h3>
                </div>
                <div className="p-4">
                  <p className="mb-4">{sign.description}</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="font-bold text-sm text-gray-600">When it typically happens:</p>
                      <p className="text-sm">{sign.timing}</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-600">What to do:</p>
                      <p className="text-sm">{sign.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* When to go to the hospital/call midwife */}
        <div className="bg-green-50 p-6 rounded-lg mb-8 border-l-4 border-green-500">
          <h2 className="text-xl font-bold mb-4">When to go to the hospital or call your midwife</h2>
          <p className="mb-4">
            Your healthcare provider will give you specific instructions, but general guidelines for when to seek medical care include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li><strong>5-1-1 rule:</strong> Contractions coming every 5 minutes, lasting for 1 minute each, for at least 1 hour</li>
            <li><strong>4-1-1 rule:</strong> Some providers recommend this more conservative approach, especially for first-time mothers</li>
            <li><strong>Your waters break:</strong> Contact your provider immediately, regardless of whether contractions have started</li>
            <li><strong>Bright red bleeding:</strong> More than spotting (like a period or heavier)</li>
            <li><strong>Decreased fetal movement:</strong> If you notice your baby is moving less than normal</li>
            <li><strong>Severe, continuous abdominal pain:</strong> Especially if it's different from contractions</li>
            <li><strong>Any concerning symptoms:</strong> Like severe headache, visual changes, or sudden swelling</li>
          </ul>
          <div className="bg-white p-4 rounded-md border border-green-200">
            <h3 className="font-bold mb-2">First baby vs. subsequent babies</h3>
            <p>
              If this is not your first baby, labor often progresses more quickly. Consider heading to your birth location earlier, perhaps when contractions are 7-10 minutes apart.
            </p>
          </div>
        </div>

        {/* Timing contractions section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">How to time contractions</h2>
          <p className="mb-4">
            Timing your contractions can help you determine when to call your healthcare provider or go to the hospital:
          </p>
          <ol className="list-decimal pl-5 space-y-3 mb-4">
            <li>
              <strong>Start timing</strong> when a contraction begins
            </li>
            <li>
              <strong>Note how long</strong> the contraction lasts until it ends (duration)
            </li>
            <li>
              <strong>Note the time</strong> from the start of one contraction to the start of the next (frequency)
            </li>
            <li>
              <strong>Record the intensity</strong> of each contraction (mild, moderate, or strong)
            </li>
          </ol>
          <p className="mb-3">
            You can use a notebook, a smartphone app designed for timing contractions, or ask your partner to help you keep track.
          </p>
          <div className="flex items-center justify-center mb-2">
            <Link
              to="/tools/contraction-timer"
              className="inline-block bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              Use our contraction timer tool
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Related pregnancy information</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li>
              <Link to="/pregnancy/birth-plan-creator" className="text-[#0891b2] hover:underline">Create your birth plan</Link>
            </li>
            <li>
              <Link to="/tools/contraction-timer" className="text-[#0891b2] hover:underline">Contraction timer tool</Link>
            </li>
            <li>
              <Link to="/pregnancy/labor-pain-management" className="text-[#0891b2] hover:underline">Labor pain management options</Link>
            </li>
            <li>
              <Link to="/pregnancy/hospital-bag-checklist" className="text-[#0891b2] hover:underline">Hospital bag checklist</Link>
            </li>
            <li>
              <Link to="/pregnancy/after-birth" className="text-[#0891b2] hover:underline">What to expect after giving birth</Link>
            </li>
            <li>
              <Link to="/pregnancy/calendar" className="text-[#0891b2] hover:underline">Pregnancy calendar</Link>
            </li>
          </ul>
          <div className="mt-4">
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
  );
};

export default SignsOfLaborPage;
