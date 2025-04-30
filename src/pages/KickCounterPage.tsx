import React from 'react';
import { Link } from 'react-router-dom';
import KickCounter from '../features/pregnancy/KickCounter';

const KickCounterPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Baby Kick Counter</h1>
          <p className="text-xl font-medium">
            Track your baby's movements to monitor their well-being
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <KickCounter />

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">About Tracking Fetal Movements</h2>
              <p className="mb-4">
                Feeling your baby move is a sign that they are well. Most women usually begin to feel
                their baby move between 16 and 24 weeks of pregnancy. A baby's movements can be
                described as anything from a kick, flutter, swish or roll.
              </p>
              <p className="mb-4">
                From around 24 weeks, your baby's movement should stay roughly the same until you give
                birth. It's important to monitor your baby's movement patterns, as a change in movement
                could indicate that your baby is unwell.
              </p>

              <h3 className="text-lg font-bold mt-6 mb-3">When to count kicks</h3>
              <p className="mb-4">
                It's best to count kicks when your baby is usually active, such as after meals or in the evening.
                Try to count at the same time each day to establish a baseline for what's normal for your baby.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The ideal time is when your baby is active</li>
                <li>Ideally count kicks at the same time every day</li>
                <li>You may want to count kicks after meals when babies tend to be more active</li>
                <li>Try to count when you can focus and are not too busy</li>
              </ul>

              <h3 className="text-lg font-bold mt-6 mb-3">When to call your healthcare provider</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700 font-medium">
                  Call your midwife or maternity unit immediately if:
                </p>
                <ul className="list-disc pl-6 mt-2 text-red-700">
                  <li>Your baby's movements stop or slow down significantly</li>
                  <li>You notice a change in the pattern of movements</li>
                  <li>You're worried about your baby's movements for any reason</li>
                </ul>
              </div>
              <p>
                Don't wait until the next day - reduced movement can sometimes be a sign that your
                baby is unwell and needs to be monitored.
              </p>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Fetal Movement FAQs</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#005eb8]">How many movements should I feel?</h3>
                  <p className="text-gray-600 mt-1">
                    There is no specific number of movements that's considered normal. Instead, it's
                    important to get to know your baby's individual pattern of movements. Some babies
                    are more active than others. Most healthcare providers recommend counting until
                    you feel at least 10 movements.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#005eb8]">Is it normal for movement to change in late pregnancy?</h3>
                  <p className="text-gray-600 mt-1">
                    Your baby's movements may feel different in late pregnancy as there is less room to move around,
                    but the frequency of movements should not reduce. You should still feel your baby moving
                    right up to and during labor.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#005eb8]">Can I use loud noises or cold drinks to make my baby move?</h3>
                  <p className="text-gray-600 mt-1">
                    It's not recommended to use methods like loud noises, cold drinks, or certain foods to make
                    your baby move. If you're concerned about reduced movement, you should contact your healthcare
                    provider right away rather than trying to "wake" your baby.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-[#005eb8] text-white p-4">
                <h2 className="text-xl font-bold">Pregnancy Resources</h2>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-3">Tools & Calculators</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/tools/due-date-calculator" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Due Date Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/weight-gain-calculator" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Weight Gain Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/contraction-timer" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Contraction Timer
                    </Link>
                  </li>
                </ul>

                <h3 className="font-bold mt-6 mb-3">Related Articles</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/pregnancy/late/reduced-movements" className="text-[#005eb8] hover:underline">
                      What to do if baby stops moving
                    </Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/middle/feeling-baby-move" className="text-[#005eb8] hover:underline">
                      When you'll feel your baby move
                    </Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/late/baby-movements" className="text-[#005eb8] hover:underline">
                      Baby movements in the third trimester
                    </Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/health/concerns-to-report" className="text-[#005eb8] hover:underline">
                      Pregnancy symptoms you should never ignore
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <h3 className="font-bold text-blue-800 mb-2">Need help?</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    If you're worried about your baby's movements, contact your midwife or maternity unit right away.
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Don't wait until tomorrow.</strong> It's important to get help right away if you notice a
                    change in your baby's movements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KickCounterPage;
