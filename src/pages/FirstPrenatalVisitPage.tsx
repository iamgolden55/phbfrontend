import React from 'react';
import { Link } from 'react-router-dom';

const FirstPrenatalVisitPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Your First Prenatal Visit</h1>
          <p className="text-xl font-medium">
            What to expect and how to prepare for your first appointment with your midwife or doctor
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <p className="text-lg mb-4">
            Your first prenatal visit, also called your booking appointment, is an important milestone in your pregnancy journey.
            This appointment usually takes place between weeks 8 and 12 of pregnancy and is typically longer than later appointments.
          </p>
          <p className="text-lg mb-4">
            During this visit, your healthcare provider will gather comprehensive information about your health, take various measurements,
            and help you understand what to expect throughout your pregnancy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">What happens at your first prenatal visit?</h2>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#005eb8] mb-3">Medical history</h3>
                <p className="mb-3">Your healthcare provider will ask detailed questions about:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your general health and any medical conditions</li>
                  <li>Previous pregnancies and births</li>
                  <li>Your menstrual history and last period date</li>
                  <li>Any medications you\'re taking</li>
                  <li>Family medical history for both you and your partner</li>
                  <li>Any genetic conditions in your families</li>
                  <li>Allergies</li>
                  <li>Mental health history</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#005eb8] mb-3">Physical examination</h3>
                <p className="mb-3">Your healthcare provider will:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Check your weight and height</li>
                  <li>Measure your blood pressure</li>
                  <li>Calculate your BMI (Body Mass Index)</li>
                  <li>Often perform a pelvic exam to check your reproductive organs</li>
                  <li>Sometimes measure your pelvis (if you\'ve had previous difficult births)</li>
                  <li>Take a urine sample to check for protein, glucose, and infections</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#005eb8] mb-3">Blood tests</h3>
                <p className="mb-3">Blood will be taken to check:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your blood type and Rhesus (Rh) factor</li>
                  <li>Iron levels (to check for anemia)</li>
                  <li>Infections such as HIV, hepatitis B, and syphilis</li>
                  <li>Immunity to rubella (German measles)</li>
                  <li>Your blood sugar levels if you\'re at risk for gestational diabetes</li>
                </ul>
                <p className="mt-3 text-sm italic">These tests are offered to all pregnant women to help ensure a healthy pregnancy, but you can choose to decline any of them.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#005eb8] mb-3">Dating scan</h3>
                <p className="mb-3">
                  A dating ultrasound scan is usually scheduled around week 12 of pregnancy. This scan:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Confirms your pregnancy</li>
                  <li>Checks if you\'re carrying more than one baby</li>
                  <li>Determines how far along you are and calculates your due date more accurately</li>
                  <li>Checks for some visible physical abnormalities</li>
                </ul>
                <p className="mt-3">
                  Sometimes this ultrasound might be done during your first visit, but often it\'s scheduled separately.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#005eb8] mb-3">Information and advice</h3>
                <p className="mb-3">
                  You\'ll receive information about:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Nutrition and dietary advice during pregnancy</li>
                  <li>Exercise and physical activity recommendations</li>
                  <li>Medications and supplements (including folic acid and vitamin D)</li>
                  <li>Things to avoid during pregnancy (alcohol, smoking, certain foods)</li>
                  <li>The schedule for future prenatal visits</li>
                  <li>Available prenatal screening tests</li>
                  <li>Options for labor and birth</li>
                  <li>Signs of complications to watch for</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg mb-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">How to prepare</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-medium">Gather important information</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Write down the first day of your last period, and bring a list of any medications you\'re taking.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-medium">List your health conditions</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Note any chronic conditions, allergies, past surgeries, or previous pregnancy complications.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-medium">Know your family history</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Gather information about genetic conditions or birth defects in your or your partner\'s family.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <p className="font-medium">Prepare questions</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Write down any questions or concerns you have about your pregnancy.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">5</div>
                  <div>
                    <p className="font-medium">Bring support</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Consider bringing your partner or a supportive friend or family member.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold mb-3">Questions to ask at your first visit</h3>
              <ul className="space-y-2">
                <li>What prenatal vitamins should I take?</li>
                <li>Is my weight healthy for pregnancy?</li>
                <li>Are my symptoms normal?</li>
                <li>What foods should I avoid?</li>
                <li>Can I continue to exercise?</li>
                <li>What screening tests are recommended?</li>
                <li>How can I contact you between appointments?</li>
                <li>What signs indicate a problem?</li>
                <li>When will I have ultrasounds?</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">What happens after your first prenatal visit?</h2>
          <p className="mb-4">
            After your first prenatal visit, you\'ll have regular check-ups throughout your pregnancy. The frequency of these visits typically follows this pattern:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Every 4 weeks until week 28</li>
            <li>Every 2-3 weeks from weeks 28 to 36</li>
            <li>Weekly from week 36 until delivery</li>
          </ul>
          <p className="mb-4">
            These visits will generally be shorter than your first appointment and will involve:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Checking your blood pressure and weight</li>
            <li>Testing your urine for protein</li>
            <li>Measuring your abdomen to track baby\'s growth</li>
            <li>Listening to the baby\'s heartbeat</li>
            <li>Discussing any concerns or questions you have</li>
            <li>Additional tests or scans as needed</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Related pregnancy information</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li>
              <Link to="/pregnancy/early-pregnancy-symptoms" className="text-[#005eb8] hover:underline">Early pregnancy symptoms</Link>
            </li>
            <li>
              <Link to="/pregnancy/prenatal-tests" className="text-[#005eb8] hover:underline">Prenatal tests explained</Link>
            </li>
            <li>
              <Link to="/pregnancy/nutrition-guide" className="text-[#005eb8] hover:underline">Nutrition during pregnancy</Link>
            </li>
            <li>
              <Link to="/pregnancy/common-concerns" className="text-[#005eb8] hover:underline">Common pregnancy concerns</Link>
            </li>
            <li>
              <Link to="/pregnancy/calendar" className="text-[#005eb8] hover:underline">Pregnancy calendar</Link>
            </li>
            <li>
              <Link to="/tools/due-date-calculator" className="text-[#005eb8] hover:underline">Due date calculator</Link>
            </li>
          </ul>
          <div className="mt-4">
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
  );
};

export default FirstPrenatalVisitPage;
