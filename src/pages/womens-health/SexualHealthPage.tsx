import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const SexualHealthPage: React.FC = () => {
  const stisList = [
    {
      id: 'chlamydia',
      name: 'Chlamydia',
      description: 'The most common STI in the UK, especially in young people. It often has no symptoms, but can cause serious problems if left untreated.',
      symptoms: [
        'Often no symptoms',
        'Pain when urinating',
        'Unusual vaginal discharge',
        'Bleeding between periods or after sex',
        'Pain during sex',
        'Lower abdominal pain'
      ],
      testing: 'Urine test or swab',
      treatment: 'Antibiotics (usually a single dose or course)'
    },
    {
      id: 'gonorrhea',
      name: 'Gonorrhea',
      description: 'The second most common bacterial STI in the UK. It can infect the genital area, rectum, and throat.',
      symptoms: [
        'Often no symptoms',
        'Thick, green or yellow discharge from the vagina',
        'Pain when urinating',
        'Bleeding between periods',
        'Rectal pain, bleeding, or discharge'
      ],
      testing: 'Urine test or swab',
      treatment: 'Antibiotics (usually given as an injection plus tablets)'
    },
    {
      id: 'genital-herpes',
      name: 'Genital herpes',
      description: 'A common infection caused by the herpes simplex virus (HSV). Once infected, the virus stays in your body and can cause recurrent outbreaks.',
      symptoms: [
        'Small blisters that burst to leave red sores',
        'Pain when urinating',
        'Tingling or itching around the genitals',
        'Vaginal discharge',
        'Flu-like symptoms (during first outbreak)'
      ],
      testing: 'Visual examination and swab of the affected area',
      treatment: 'Antiviral medication to help manage symptoms. No cure available.'
    },
    {
      id: 'genital-warts',
      name: 'Genital warts',
      description: 'The most common viral STI in the UK, caused by certain types of human papillomavirus (HPV).',
      symptoms: [
        'Small, flesh-colored growths or bumps on or around the genital or anal area',
        'Several warts close together that take on a cauliflower-like shape',
        'Itching or discomfort in the genital area'
      ],
      testing: 'Visual examination',
      treatment: 'Topical treatments, cryotherapy (freezing), or surgical removal. The warts may recur as the virus remains in the body.'
    },
    {
      id: 'trichomoniasis',
      name: 'Trichomoniasis',
      description: 'A common STI caused by a tiny parasite called Trichomonas vaginalis.',
      symptoms: [
        'Abnormal vaginal discharge that may be thick, thin, or frothy and yellow-green in color',
        'Producing more discharge than normal, which may have an unpleasant fishy smell',
        'Soreness, inflammation, and itching around the vagina',
        'Pain when urinating or having sex'
      ],
      testing: 'Swab of affected area',
      treatment: 'Antibiotics (usually a single dose or short course)'
    },
    {
      id: 'syphilis',
      name: 'Syphilis',
      description: 'A bacterial infection that can cause serious health problems if left untreated.',
      symptoms: [
        'Small, painless sore (chancre) on genitals or mouth (primary stage)',
        'Rash, flu-like symptoms, swollen glands (secondary stage)',
        'No symptoms for years (latent stage)',
        'Serious damage to organs including the brain (tertiary stage)'
      ],
      testing: 'Blood test and swab of any sores',
      treatment: 'Antibiotics (usually penicillin injections)'
    },
    {
      id: 'hiv',
      name: 'HIV',
      description: 'Human Immunodeficiency Virus (HIV) damages the cells in your immune system, weakening your ability to fight infections and disease.',
      symptoms: [
        'Most people experience a short flu-like illness 2-6 weeks after infection',
        'After this, HIV may not cause any symptoms for many years',
        'Without treatment, the immune system becomes severely damaged'
      ],
      testing: 'Blood test',
      treatment: 'Antiretroviral drugs to keep the virus under control and prevent further damage. No cure available, but treatment allows most people to live a long and healthy life.'
    }
  ];

  const sexualProblems = [
    {
      id: 'pain-during-sex',
      title: 'Pain during sex (dyspareunia)',
      description: 'Pain during or after sex is common. It can be caused by various factors, including physical, psychological, and relationship issues.',
      possibleCauses: [
        'Not being aroused enough or lacking lubrication',
        'Infection (such as thrush or STIs)',
        'Endometriosis',
        'Vaginismus (involuntary tightening of vaginal muscles)',
        'Pelvic inflammatory disease',
        'Menopause or breastfeeding (causing vaginal dryness)',
        'Psychological issues including anxiety about sex'
      ],
      treatments: [
        'Using lubricant before sex',
        'Treating any underlying infection',
        'Trying different sexual positions',
        'Allowing more time for arousal before penetration',
        'Psychological therapies for anxiety-related issues',
        'Medication or hormonal treatments depending on the cause'
      ]
    },
    {
      id: 'loss-of-desire',
      title: 'Loss of sexual desire',
      description: 'Loss of interest in sex is common and can affect anyone at some point in their life. It\'s not necessarily a problem unless it causes distress.',
      possibleCauses: [
        'Relationship problems',
        'Stress, anxiety, or depression',
        'Hormonal changes (menopause, pregnancy, breastfeeding)',
        'Certain medications (antidepressants, hormonal contraceptives)',
        'Excessive alcohol consumption',
        'Fatigue or lack of sleep',
        'Underlying health conditions'
      ],
      treatments: [
        'Addressing relationship issues, possibly with couples therapy',
        'Treatment for depression, anxiety, or other mental health issues',
        'Hormone therapy for menopausal symptoms',
        'Changing medications if they\'re affecting libido',
        'Lifestyle changes including reducing alcohol, improving sleep, and managing stress',
        'Sex therapy to explore psychological causes and solutions'
      ]
    },
    {
      id: 'difficulty-orgasm',
      title: 'Difficulty reaching orgasm (anorgasmia)',
      description: 'Difficulty reaching orgasm is common. It can be primary (never having had an orgasm) or secondary (having had orgasms in the past but struggling now).',
      possibleCauses: [
        'Not being sufficiently aroused',
        'Relationship issues',
        'Anxiety or stress',
        'Depression and some antidepressants',
        'Hormonal changes',
        'Previous traumatic sexual experiences',
        'Alcohol or drug use'
      ],
      treatments: [
        'Learning about your body and what feels good through self-exploration',
        'Improving communication with partner about needs and preferences',
        'Addressing anxiety with relaxation techniques or therapy',
        'Sex therapy to address psychological barriers',
        'Treating underlying depression or adjusting medications',
        'Focusing on pleasure rather than orgasm as the goal'
      ]
    },
    {
      id: 'vaginismus',
      title: 'Vaginismus',
      description: 'Vaginismus is the involuntary tightening of the vaginal muscles that makes penetration painful or impossible. It can affect sexual intercourse, using tampons, and gynecological exams.',
      possibleCauses: [
        'Fear or anxiety about sex or pain',
        'Past negative sexual experiences',
        'Traumatic experiences including sexual assault',
        'Negative beliefs about sex',
        'Other conditions that cause pain during sex',
        'Medical conditions affecting the vagina or reproductive organs'
      ],
      treatments: [
        'Psychotherapy to address underlying fear or anxiety',
        'Pelvic floor exercises to learn to relax the muscles',
        'Vaginal trainers (dilators) to gradually get used to insertion',
        'Sex therapy or cognitive behavioral therapy',
        'Relaxation techniques',
        'Addressing any physical causes of pain'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Sexual health', url: '/womens-health/sexual-health' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Sexual health</h1>
          <p className="text-xl font-medium">
            Information about sexual health, including STIs, sexual problems, and getting tested
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">About sexual health</h2>
              <p className="mb-4">
                Sexual health is an important part of overall physical and mental health. It includes preventing sexually transmitted infections (STIs) and addressing sexual problems. Good sexual health means having a respectful approach to sexual relationships and being able to have pleasurable and safe sexual experiences, free from coercion, discrimination, and violence.
              </p>
              <p className="mb-4">
                Taking care of your sexual health means:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Using protection against STIs and unwanted pregnancy</li>
                <li>Getting regular sexual health check-ups</li>
                <li>Seeking help for any sexual problems or concerns</li>
                <li>Making informed choices about sex and relationships</li>
              </ul>
              <p>
                This page provides information about common STIs, sexual problems, and how to get tested and treated.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-bold mb-4">Safer sex</h2>
              <p className="mb-4">
                Using protection and practicing safer sex helps prevent STIs and unwanted pregnancy. Here's how to stay safe:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Use protection</h3>
                  <p className="mb-2">
                    Condoms are the only form of contraception that protects against both STIs and pregnancy. They're available for free from sexual health clinics, some GP surgeries, and young people's services. You can also buy them from pharmacies, supermarkets, and online.
                  </p>
                  <p>
                    There are other forms of contraception that protect against pregnancy but not STIs, such as the pill, implant, and IUD. Talk to your doctor or sexual health clinic about the right contraception for you.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Get tested regularly</h3>
                  <p>
                    Regular testing for STIs is important, especially if you change partners, have unprotected sex, or develop symptoms. Many STIs have no symptoms, so you may not know if you have one unless you get tested.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Talk openly with partners</h3>
                  <p>
                    Open communication with sexual partners about STIs, contraception, and sexual health is important. It may feel awkward, but it's an essential part of safer sex.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Where to get help</h3>
              <p className="mb-4">
                If you're concerned about your sexual health, you can get help from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Sexual health clinics</li>
                <li>GP surgeries</li>
                <li>Contraception clinics</li>
                <li>Pharmacies</li>
                <li>Young people's services</li>
              </ul>
              <div className="mt-4">
                <Link
                  to="/find-a-sexual-health-clinic"
                  className="bg-[#d8157d] text-white px-6 py-2 rounded-md hover:bg-[#b91366] transition-colors inline-block w-full text-center"
                >
                  Find a sexual health clinic
                </Link>
              </div>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">When to get tested</h3>
              <p className="mb-4">
                Consider getting tested for STIs if:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You have symptoms of an STI</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You've had unprotected sex</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You've changed sexual partner</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>A sexual partner has symptoms or has been diagnosed with an STI</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You're planning to stop using condoms with a new partner</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Even if you don't have symptoms, it's a good idea to get tested regularly if you're sexually active, especially if you have multiple partners.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Sexually transmitted infections (STIs)</h2>
          <p className="mb-6">
            STIs are infections that are passed from person to person through sexual contact. Many STIs have no symptoms, so you may not know if you have one unless you get tested. If left untreated, some STIs can cause serious health problems.
          </p>
          <div className="space-y-6">
            {stisList.map((sti) => (
              <div key={sti.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-2">{sti.name}</h3>
                <p className="mb-4">{sti.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Common symptoms</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {sti.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Testing</h4>
                      <p>{sti.testing}</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Treatment</h4>
                      <p>{sti.treatment}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/womens-health/sexual-health/stis/${sti.id}`}
                    className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                  >
                    Learn more about {sti.name}
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Sexual problems</h2>
          <p className="mb-6">
            Sexual problems are common and can affect anyone at some point in their life. They may be caused by physical, psychological, or relationship issues. Many sexual problems can be treated or managed effectively.
          </p>
          <div className="space-y-6">
            {sexualProblems.map((problem) => (
              <div key={problem.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#d8157d] mb-2">{problem.title}</h3>
                <p className="mb-4">{problem.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Possible causes</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {problem.possibleCauses.map((cause, index) => (
                        <li key={index}>{cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Treatments and management</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {problem.treatments.map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/womens-health/sexual-health/problems/${problem.id}`}
                    className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                  >
                    Learn more about {problem.title}
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#fdf2f8] rounded-lg p-8 border border-pink-100">
          <h2 className="text-2xl font-bold mb-6">Getting tested for STIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">What happens during an STI test?</h3>
              <p className="mb-4">
                STI testing is quick, confidential, and usually painless. What happens during a test depends on what you're being tested for, but may include:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Urine sample</span>
                    <p className="text-sm text-gray-600">For chlamydia and gonorrhea</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Blood test</span>
                    <p className="text-sm text-gray-600">For HIV, syphilis, and hepatitis B and C</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Swab from the genital area</span>
                    <p className="text-sm text-gray-600">For herpes, gonorrhea, and chlamydia</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-bold">Visual examination</span>
                    <p className="text-sm text-gray-600">For warts, herpes, and other visible STIs</p>
                  </div>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                The healthcare professional will explain what tests you need and how they'll be done. You can ask questions at any time if you're unsure about anything.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Home testing kits</h3>
              <p className="mb-4">
                If you don't want to go to a clinic, you may be able to use a home testing kit for some STIs. These include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Free test kits for chlamydia available through some PHB services</li>
                <li>HIV home testing kits (both paid-for and free options)</li>
                <li>Home testing kits for a range of STIs available to buy online or from pharmacies</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm">
                  <strong>Important:</strong> Make sure any home testing kit you buy is CE marked, which means it meets regulatory standards. Follow the instructions carefully and contact a sexual health clinic or your GP if you test positive or have symptoms despite a negative result.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/find-a-sexual-health-clinic/home-testing"
                  className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
                >
                  Find out about home testing kits
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold mb-2">Confidentiality and sexual health services</h3>
                <p className="mb-4">
                  Sexual health services are free and confidential, including for people under 16. Healthcare professionals have a duty of confidentiality to all patients, including young people. This means they won't share your information with anyone outside the service without your permission, except in very rare circumstances to protect you or others from serious harm.
                </p>
                <p>
                  If you're concerned about confidentiality, you can ask the healthcare professional about their confidentiality policy at the beginning of your appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SexualHealthPage;
