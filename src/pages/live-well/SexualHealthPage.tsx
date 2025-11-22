import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HealthTopic {
  title: string;
  description: string;
  keyPoints: string[];
  imageSrc?: string;
  category: 'basics' | 'prevention' | 'wellness' | 'support';
}

const healthTopics: HealthTopic[] = [
  {
    title: 'Understanding Sexual Health',
    description: 'Sexual health is an important part of overall wellbeing, involving physical, emotional, and social aspects of sexuality.',
    keyPoints: [
      'Sexual health includes physical, emotional, and social wellbeing',
      'Open communication with partners is essential',
      'Regular health check-ups help maintain sexual wellness',
      'Sexual health concerns are normal and treatable'
    ],
    imageSrc: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'basics'
  },
  {
    title: 'Safe Sex Practices',
    description: 'Protecting yourself and your partner from sexually transmitted infections (STIs) and unplanned pregnancy.',
    keyPoints: [
      'Consistent and correct condom use prevents STIs and pregnancy',
      'Regular STI testing is important for sexually active individuals',
      'Know your partner\'s sexual health status',
      'Multiple contraception methods available through PHB'
    ],
    imageSrc: 'https://images.unsplash.com/photo-1559757175-0eb20ae753fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'prevention'
  },
  {
    title: 'Communication & Consent',
    description: 'Healthy relationships are built on clear communication, mutual respect, and ongoing consent.',
    keyPoints: [
      'Consent should be freely given, ongoing, and can be withdrawn',
      'Open dialogue about boundaries and preferences',
      'Respect for your partner\'s comfort and decisions',
      'Communication improves intimacy and satisfaction'
    ],
    imageSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'wellness'
  },
  {
    title: 'Sexual Wellness',
    description: 'Maintaining sexual function and satisfaction as part of a healthy lifestyle.',
    keyPoints: [
      'Regular exercise improves sexual function and confidence',
      'Healthy diet supports sexual health and energy',
      'Stress management enhances intimacy',
      'Sleep quality affects libido and performance'
    ],
    imageSrc: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'wellness'
  },
  {
    title: 'Common Concerns',
    description: 'Many sexual health concerns are common and treatable with proper medical care and support.',
    keyPoints: [
      'Erectile dysfunction affects many men and is treatable',
      'Low libido can have physical or psychological causes',
      'Pain during sex should be evaluated by healthcare provider',
      'Sexual concerns are normal parts of life for many people'
    ],
    imageSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'support'
  },
  {
    title: 'STI Prevention & Testing',
    description: 'Regular testing and prevention strategies help maintain sexual health for you and your partners.',
    keyPoints: [
      'Annual STI screening recommended for sexually active adults',
      'Many STIs have no symptoms but are easily treatable',
      'Free and confidential testing available at PHB centers',
      'Early detection prevents complications and transmission'
    ],
    imageSrc: 'https://images.unsplash.com/photo-1559757146-6ae99abe5ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    category: 'prevention'
  }
];

const SexualHealthPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Topics', color: 'bg-gray-100' },
    { id: 'basics', label: 'Sexual Health Basics', color: 'bg-blue-100' },
    { id: 'prevention', label: 'Prevention & Testing', color: 'bg-green-100' },
    { id: 'wellness', label: 'Wellness & Lifestyle', color: 'bg-purple-100' },
    { id: 'support', label: 'Support & Treatment', color: 'bg-orange-100' }
  ];

  const filteredTopics = selectedCategory === 'all' 
    ? healthTopics 
    : healthTopics.filter(topic => topic.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <span>Sexual health</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Sexual health and wellbeing</h1>
          <p className="text-xl font-medium">
            Comprehensive guidance for maintaining sexual health throughout your life
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Your sexual health matters</h2>
          <p className="mb-4 text-blue-700">
            Sexual health is an integral part of overall health and wellbeing. It encompasses physical, emotional, 
            mental, and social aspects of sexuality, approached in a positive and respectful manner.
          </p>
          <p className="mb-4 text-blue-700">
            Good sexual health requires access to accurate information, safe and effective healthcare, 
            and an environment free from discrimination and violence.
          </p>
          <p className="text-blue-700">
            <strong>Remember:</strong> Sexual health concerns are normal, and seeking help is a sign of taking 
            good care of yourself and your relationships.
          </p>
        </div>

        {/* Confidential support notice */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-green-800">Confidential and non-judgmental care</h2>
          <p className="mb-4 text-green-700">
            All PHB sexual health services are completely confidential and provided without judgment. 
            Our healthcare professionals are trained to discuss sensitive topics with care and respect.
          </p>
          <p className="text-green-700">
            You have the right to ask questions, request specific healthcare providers, and receive 
            culturally sensitive care that respects your values and beliefs.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Explore sexual health topics</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#0891b2] text-white'
                    : `${category.color} text-gray-700 hover:bg-gray-200`
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Health Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {topic.imageSrc && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={topic.imageSrc}
                    alt={topic.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0891b2] mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key points:</h4>
                  <ul className="space-y-1">
                    {topic.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="w-2 h-2 bg-[#0891b2] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* STI Information */}
        <h2 className="text-2xl font-bold mb-6">Common sexually transmitted infections (STIs)</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-yellow-800 mb-4">
            <strong>Important:</strong> Many STIs have no symptoms, especially in early stages. 
            Regular testing is the only way to know your status.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-800">Bacterial STIs (Curable)</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Chlamydia - often no symptoms</li>
                <li>• Gonorrhea - may cause discharge</li>
                <li>• Syphilis - starts with painless sore</li>
                <li>• Trichomoniasis - may cause itching</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-800">Viral STIs (Manageable)</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Herpes (HSV-1, HSV-2) - blisters/sores</li>
                <li>• HPV - may cause genital warts</li>
                <li>• HIV - affects immune system</li>
                <li>• Hepatitis B - affects liver</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-800">Prevention Methods</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Consistent condom use</li>
                <li>• Regular testing</li>
                <li>• Open communication</li>
                <li>• HPV and Hepatitis B vaccines</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contraception overview */}
        <h2 className="text-2xl font-bold mb-6">Contraception and family planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold mb-2 text-blue-800">Barrier Methods</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Male and female condoms</li>
              <li>• Diaphragms and cervical caps</li>
              <li>• Prevent STIs and pregnancy</li>
              <li>• Available over-the-counter</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold mb-2 text-green-800">Hormonal Methods</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Birth control pills</li>
              <li>• Injections and implants</li>
              <li>• Patches and rings</li>
              <li>• Require prescription</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold mb-2 text-purple-800">Long-term Methods</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• IUDs (copper and hormonal)</li>
              <li>• Contraceptive implants</li>
              <li>• Sterilization procedures</li>
              <li>• 3-10+ years effectiveness</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-bold mb-2 text-orange-800">Natural Methods</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Fertility awareness</li>
              <li>• Calendar tracking</li>
              <li>• Temperature monitoring</li>
              <li>• Requires dedication</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              question: "How often should I get tested for STIs?",
              answer: "Sexually active adults should get tested annually, or more frequently if you have multiple partners, new partners, or symptoms. Some people may need testing every 3-6 months based on risk factors."
            },
            {
              question: "Is it normal to have questions about sexual function?",
              answer: "Absolutely. Sexual concerns are very common and can affect anyone at any age. Issues like low libido, erectile dysfunction, or pain during sex are treatable medical conditions."
            },
            {
              question: "What should I do if I think I have an STI?",
              answer: "Contact a healthcare provider as soon as possible. Many STIs are easily curable with antibiotics, and early treatment prevents complications. Avoid sexual contact until you've been evaluated and treated if necessary."
            },
            {
              question: "How can I talk to my partner about sexual health?",
              answer: "Choose a relaxed time outside the bedroom. Be honest about your needs, concerns, and boundaries. Ask about their sexual health history and testing. Open communication strengthens relationships and improves intimacy."
            },
            {
              question: "Are sexual health services confidential?",
              answer: "Yes, all sexual health services at PHB are completely confidential. Information is only shared with your explicit consent or in very rare emergency situations as required by law."
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className={`transform transition-transform ${activeAccordion === index ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              {activeAccordion === index && (
                <div className="p-4 pt-0 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* When to seek help */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-red-800">When to seek medical help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Physical symptoms:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Unusual discharge or odor</li>
                <li>• Pain during urination or sex</li>
                <li>• Unusual bleeding or spotting</li>
                <li>• Genital sores, bumps, or rashes</li>
                <li>• Persistent pelvic or genital pain</li>
                <li>• Changes in menstrual cycle</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Concerns to discuss:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Changes in sexual desire or function</li>
                <li>• Difficulty achieving orgasm</li>
                <li>• Anxiety about sexual performance</li>
                <li>• Relationship or communication issues</li>
                <li>• Family planning and contraception</li>
                <li>• Questions about sexual orientation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PHB Services */}
        <h2 className="text-2xl font-bold mb-6">PHB sexual health services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">STI Testing & Treatment</h3>
            <p className="mb-4 text-sm">
              Comprehensive testing for all common STIs with same-day results for many conditions. Free and confidential services.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Rapid HIV testing (15 minutes)</li>
              <li>• Chlamydia and gonorrhea screening</li>
              <li>• Syphilis and hepatitis testing</li>
              <li>• Treatment for curable STIs</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Book STI test
            </Link>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Family Planning</h3>
            <p className="mb-4 text-sm">
              Comprehensive contraceptive counseling and services to help you choose the best family planning method.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Contraceptive consultations</li>
              <li>• IUD insertion and removal</li>
              <li>• Implant placement</li>
              <li>• Emergency contraception</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Plan appointment
            </Link>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Sexual Health Counseling</h3>
            <p className="mb-4 text-sm">
              Professional counseling for sexual concerns, relationship issues, and sexual wellness education.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Individual and couples counseling</li>
              <li>• Sexual function support</li>
              <li>• Relationship guidance</li>
              <li>• Educational resources</li>
            </ul>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block text-sm"
            >
              Get support
            </Link>
          </div>
        </div>

        {/* Emergency and support */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need immediate help or have concerns?</h2>
            <p className="mb-6">
              Don't wait if you have symptoms or concerns. Early treatment leads to better outcomes and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Book confidential appointment
              </Link>
              <a
                href="tel:0800-SEXUAL-HEALTH"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Sexual health helpline
              </a>
              <Link
                to="/find-pharmacy"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#0891b2] transition-colors inline-block font-bold"
              >
                Find nearest clinic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SexualHealthPage;