import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const PerinatalMentalHealthPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Mental health', url: '/womens-health/mental-health' },
              { label: 'Perinatal mental health', url: '/womens-health/mental-health/perinatal' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Perinatal Mental Health</h1>
          <p className="text-xl font-medium">
            Mental health support during pregnancy and the first year after birth
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About perinatal mental health</h2>
              <p className="mb-4">
                Perinatal mental health refers to your emotional and psychological wellbeing during pregnancy
                and the first year after having a baby. Up to 1 in 5 women develop a mental health problem
                during pregnancy or in the first year after childbirth.
              </p>
              <p>
                With the right support and treatment, most women make a full recovery. It's important
                to seek help early if you're struggling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Common perinatal mental health conditions</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Antenatal depression</h3>
                  <p className="mb-2">
                    Depression that occurs during pregnancy. Symptoms include persistent sadness,
                    loss of interest in activities, sleep problems, and difficulty bonding with
                    your unborn baby.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Postnatal depression</h3>
                  <p className="mb-2">
                    Depression that develops within the first year after birth. Different from
                    'baby blues', which are normal and usually pass within two weeks.
                  </p>
                  <p className="text-sm text-gray-600">
                    Affects about 1 in 10 women after childbirth.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Perinatal anxiety</h3>
                  <p className="mb-2">
                    Excessive worry about your pregnancy, baby, or your ability to cope. May include
                    panic attacks, racing thoughts, and physical symptoms like heart palpitations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Perinatal OCD</h3>
                  <p className="mb-2">
                    Obsessive-compulsive disorder that starts or worsens during pregnancy or after birth.
                    Often involves intrusive thoughts about harming your baby (these thoughts are distressing
                    and not acted upon).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Postpartum psychosis</h3>
                  <p className="mb-2">
                    A rare but serious condition that usually develops within the first two weeks
                    after birth. Symptoms include hallucinations, delusions, and confusion.
                  </p>
                  <p className="text-sm font-bold text-red-600">
                    This is a medical emergency. Call 999 or go to A&E if you or someone you know
                    shows signs of postpartum psychosis.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Post-traumatic stress disorder (PTSD)</h3>
                  <p className="mb-2">
                    Can develop after a traumatic birth experience. Symptoms include flashbacks,
                    nightmares, and avoiding reminders of the birth.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Signs to look out for</h2>
              <p className="mb-4">
                It's important to recognise the signs of perinatal mental health problems early:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Persistent low mood or sadness</li>
                  <li>Feeling unable to cope</li>
                  <li>Loss of interest in things you usually enjoy</li>
                  <li>Difficulty bonding with your baby</li>
                  <li>Frightening thoughts about harming yourself or baby</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Excessive worry or anxiety</li>
                  <li>Difficulty sleeping (even when baby is asleep)</li>
                  <li>Changes in appetite</li>
                  <li>Feeling irritable or angry</li>
                  <li>Withdrawing from others</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Risk factors</h2>
              <p className="mb-4">
                While anyone can develop perinatal mental health problems, some factors may increase risk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Previous mental health problems</li>
                <li>Family history of mental illness</li>
                <li>Difficult pregnancy or birth</li>
                <li>Lack of support from partner, family, or friends</li>
                <li>Stressful life events (bereavement, financial problems, relationship issues)</li>
                <li>Previous pregnancy loss or difficulty conceiving</li>
                <li>Having a baby with health problems</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment and support</h2>
              <p className="mb-4">
                Treatment depends on the type and severity of your condition. Options include:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Self-help and lifestyle</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Regular exercise</li>
                    <li>Good nutrition</li>
                    <li>Accepting help from others</li>
                    <li>Joining a support group</li>
                    <li>Practicing relaxation techniques</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Talking therapies</h3>
                  <p className="mb-2">
                    Cognitive behavioural therapy (CBT) and other talking therapies can be very effective.
                    Available through your GP or self-referral to PHB talking therapies.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medication</h3>
                  <p className="mb-2">
                    Some antidepressants and other medications are safe during pregnancy and breastfeeding.
                    Your doctor will discuss the benefits and risks with you.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Specialist services</h3>
                  <p className="mb-2">
                    Perinatal mental health teams provide specialist care for women with more severe
                    or complex problems. In some cases, admission to a mother and baby unit may be needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">For partners and family</h2>
              <p className="mb-4">
                If your partner or loved one is struggling with their mental health:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Listen without judgement</li>
                <li>Encourage them to seek help</li>
                <li>Offer practical support with baby care and household tasks</li>
                <li>Learn about their condition</li>
                <li>Look after your own mental health too</li>
                <li>Be patient - recovery takes time</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Partners can also experience mental health problems around the birth of a baby.
                Don't hesitate to seek support for yourself.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-600">When to get urgent help</h3>
              <p className="mb-4">
                Call 999 or go to A&E if you or someone you know:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Has thoughts about harming themselves or their baby</li>
                <li>Is experiencing hallucinations or delusions</li>
                <li>Is behaving out of character or seems confused</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Get support</h3>
              <p className="mb-4">
                Speak to your midwife, health visitor, or GP if you're concerned about your
                mental health during or after pregnancy.
              </p>
              <p className="text-sm text-gray-600">
                You can also self-refer to PHB talking therapies in many areas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Helplines</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Perinatal Mental Health</p>
                  <p>0800 765 4321</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm</p>
                </div>
                <div>
                  <p className="font-bold">Samaritans</p>
                  <p>116 123</p>
                  <p className="text-sm text-gray-500">24 hours, 7 days a week</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/mental-health" className="text-[#d8157d] hover:underline">
                    Women's mental health
                  </Link>
                </li>
                <li>
                  <Link to="/mental-health/new-parents" className="text-[#d8157d] hover:underline">
                    New parent mental health
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/pregnancy" className="text-[#d8157d] hover:underline">
                    Pregnancy
                  </Link>
                </li>
                <li>
                  <Link to="/conditions/baby" className="text-[#d8157d] hover:underline">
                    Baby health
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerinatalMentalHealthPage;
