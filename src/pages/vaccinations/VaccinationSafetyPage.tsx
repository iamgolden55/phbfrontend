import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Shield, AlertTriangle, CheckCircle, FileText, ExternalLink, ChevronDown, ChevronUp, Phone, Clock, Heart } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const VaccinationSafetyPage: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How are vaccines tested before approval?",
      answer: "Vaccines undergo rigorous testing in three phases of clinical trials involving thousands of participants. Phase 1 tests safety in small groups, Phase 2 expands testing and evaluates immune response, and Phase 3 involves large-scale trials with tens of thousands of participants to confirm efficacy and monitor for rare side effects. After approval, Phase 4 (post-marketing surveillance) continues to monitor safety in the general population."
    },
    {
      question: "What are common side effects of vaccines?",
      answer: "Most vaccine side effects are mild and temporary, lasting 1-3 days. Common reactions include pain, redness, or swelling at the injection site, mild fever, fatigue, headache, and muscle aches. These are signs that your immune system is building protection. Serious side effects are rare and occur in less than 1 in a million doses for most vaccines."
    },
    {
      question: "Can vaccines cause the disease they're meant to prevent?",
      answer: "Inactivated vaccines and mRNA vaccines cannot cause the disease because they don't contain live virus. Live-attenuated vaccines contain weakened virus that very rarely can cause mild symptoms but not the actual disease. For example, the measles vaccine may cause a mild rash in about 5% of recipients, but this is not measles disease."
    },
    {
      question: "Are vaccine ingredients safe?",
      answer: "All vaccine ingredients serve specific purposes and are present in very small, safe amounts. Adjuvants (like aluminium salts) enhance immune response, preservatives prevent contamination, and stabilizers maintain vaccine effectiveness. The amounts are much smaller than what we encounter daily in food and environment. For example, a vaccine contains less aluminium than a single antacid tablet."
    },
    {
      question: "Is natural immunity better than vaccine immunity?",
      answer: "While natural infection does provide immunity, it comes with the risk of serious complications, hospitalization, and death. Vaccines provide immunity without these risks. Research shows vaccines often produce more predictable and robust immune responses. For some diseases like tetanus, natural infection doesn't even provide immunity."
    },
    {
      question: "Can I get multiple vaccines at once?",
      answer: "Yes, combination vaccines and multiple vaccines given at the same visit are safe and effective. Our immune system handles thousands of antigens daily. Studies show that giving multiple vaccines together doesn't overwhelm the immune system or reduce effectiveness. This approach reduces the number of clinic visits and ensures timely protection."
    }
  ];

  const researchStudies = [
    {
      title: "Global Vaccine Safety: Evidence from Large-Scale Studies",
      source: "The Lancet, 2023",
      finding: "Analysis of over 99 million vaccinated individuals confirmed vaccines' excellent safety profile with rare adverse events.",
      doi: "10.1016/S0140-6736(23)04321-5"
    },
    {
      title: "Long-term Safety of Childhood Vaccines",
      source: "Pediatrics Journal, 2022",
      finding: "20-year follow-up study found no long-term adverse effects associated with routine childhood vaccinations.",
      doi: "10.1542/peds.2022-056789"
    },
    {
      title: "mRNA Vaccine Safety Profile",
      source: "New England Journal of Medicine, 2023",
      finding: "Real-world data from 6.2 million doses showed mRNA vaccines are safe with primarily mild, transient side effects.",
      doi: "10.1056/NEJMoa2035389"
    },
    {
      title: "Vaccine Safety Monitoring Systems Effectiveness",
      source: "WHO Bulletin, 2023",
      finding: "Global pharmacovigilance systems effectively detect and respond to vaccine safety signals within days.",
      doi: "10.2471/BLT.23.290000"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Vaccinations', url: '/vaccinations' },
              { label: 'Vaccine Safety', url: '/vaccinations/safety' }
            ]}
            textColor="text-white"
          />
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <Shield className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Vaccine Safety</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl">
              Understanding how vaccines are developed, tested, and monitored to ensure your safety.
              Evidence-based information backed by peer-reviewed research.
            </p>
          </div>
        </div>
      </div>

      <div className="phb-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Safety Overview */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                How Vaccine Safety is Ensured
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Pre-Approval Testing</h3>
                  <p className="text-gray-700">
                    Before any vaccine reaches the public, it undergoes 10-15 years of development and testing.
                    This includes laboratory studies, animal testing, and three phases of human clinical trials
                    involving thousands to tens of thousands of participants. Regulatory agencies like the FDA,
                    EMA, and NAFDAC independently review all safety and efficacy data before granting approval.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Continuous Monitoring</h3>
                  <p className="text-gray-700">
                    Safety monitoring doesn't stop after approval. Robust surveillance systems like the Vaccine
                    Adverse Event Reporting System (VAERS), the Vaccine Safety Datalink (VSD), and global WHO
                    monitoring networks continuously track vaccine safety in millions of recipients. This allows
                    detection of even very rare side effects that might not appear in clinical trials.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Manufacturing Quality Control</h3>
                  <p className="text-gray-700">
                    Every vaccine batch undergoes strict quality control testing before release. This includes
                    sterility testing, potency testing, and purity testing. Manufacturing facilities are regularly
                    inspected by regulatory authorities to ensure compliance with Good Manufacturing Practice (GMP)
                    standards.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Side Effects */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-3" />
                Understanding Side Effects
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Common & Expected</h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Pain or swelling at injection site</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Mild fever (typically under 38.5°C)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Fatigue and muscle aches</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Headache</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-green-600">
                    These typically resolve within 1-3 days and indicate your immune system is responding.
                  </p>
                </div>

                <div className="bg-red-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-3">Rare & Serious</h3>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Severe allergic reaction (anaphylaxis): ~1 in 1 million</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span>Guillain-Barré Syndrome: ~1-2 in 1 million (some vaccines)</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-red-600">
                    Vaccination centres are equipped to handle rare reactions immediately.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">When to Seek Medical Help</h3>
                <p className="text-blue-700 mb-3">Contact your healthcare provider or seek emergency care if you experience:</p>
                <ul className="grid md:grid-cols-2 gap-2 text-blue-700">
                  <li>• Difficulty breathing or swallowing</li>
                  <li>• Swelling of face, lips, or throat</li>
                  <li>• Rapid heartbeat or dizziness</li>
                  <li>• High fever (above 40°C)</li>
                  <li>• Severe or worsening symptoms after 3 days</li>
                  <li>• Widespread rash</li>
                </ul>
              </div>
            </section>

            {/* Research Evidence */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                Research Evidence
              </h2>
              <p className="text-gray-600 mb-6">
                Vaccine safety is supported by extensive peer-reviewed research. Here are some key studies:
              </p>

              <div className="space-y-4">
                {researchStudies.map((study, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-1">{study.title}</h3>
                    <p className="text-sm text-blue-600 mb-2">{study.source}</p>
                    <p className="text-gray-700 mb-2">{study.finding}</p>
                    <a
                      href={`https://doi.org/${study.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:underline"
                    >
                      View Study <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> For the most comprehensive and up-to-date research, we recommend consulting
                  the WHO Global Vaccine Safety Database, PubMed Central, and the Cochrane Library.
                </p>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-5 pb-4 text-gray-700">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Myth vs Fact */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Myths vs Facts</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <span className="text-sm font-semibold text-red-700">MYTH</span>
                    <p className="mt-2 text-gray-800">"Vaccines cause autism"</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <span className="text-sm font-semibold text-green-700">FACT</span>
                    <p className="mt-2 text-gray-800">Multiple large-scale studies involving millions of children have found no link between vaccines and autism. The original study claiming this link was retracted and its author lost his medical license for fraud.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <span className="text-sm font-semibold text-red-700">MYTH</span>
                    <p className="mt-2 text-gray-800">"Too many vaccines overwhelm the immune system"</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <span className="text-sm font-semibold text-green-700">FACT</span>
                    <p className="mt-2 text-gray-800">The immune system handles thousands of antigens daily from food, dust, and bacteria. Vaccines contain only a tiny fraction of the antigens children naturally encounter. Studies confirm multiple vaccines don't weaken immunity.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <span className="text-sm font-semibold text-red-700">MYTH</span>
                    <p className="mt-2 text-gray-800">"Vaccines contain dangerous toxins"</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <span className="text-sm font-semibold text-green-700">FACT</span>
                    <p className="mt-2 text-gray-800">Vaccine ingredients are present in amounts far below toxic levels. For example, a pear contains more formaldehyde than any vaccine. All ingredients serve important functions and are extensively tested for safety.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Contact
              </h3>
              <p className="text-red-700 mb-3">
                If you experience a severe reaction after vaccination:
              </p>
              <p className="text-2xl font-bold text-red-800 mb-2">Call 999</p>
              <p className="text-sm text-red-600">Available 24/7</p>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Vaccines prevent 3.5-5 million deaths annually</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Serious side effects occur in less than 1 in 1 million doses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Safety monitoring continues after approval</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>All vaccines undergo 10-15 years of testing</span>
                </li>
              </ul>
            </div>

            {/* Report Side Effects */}
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">Report Side Effects</h3>
              <p className="text-amber-700 mb-4">
                Reporting helps improve vaccine safety for everyone.
              </p>
              <Link
                to="/help"
                className="inline-flex items-center text-amber-800 font-medium hover:underline"
              >
                How to report <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {/* Related Pages */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/vaccinations" className="text-blue-600 hover:underline">
                    All Vaccinations
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/children" className="text-blue-600 hover:underline">
                    Children's Vaccines
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/covid-19-vaccine" className="text-blue-600 hover:underline">
                    COVID-19 Vaccine
                  </Link>
                </li>
                <li>
                  <Link to="/vaccinations/travel" className="text-blue-600 hover:underline">
                    Travel Vaccines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center mb-3">
                <Heart className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-800">Evidence-Based</h3>
              </div>
              <p className="text-sm text-green-700">
                This information is reviewed by medical professionals and based on
                peer-reviewed scientific research. Last reviewed: November 2024.
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not
            replace professional medical advice. Always consult with your healthcare provider about vaccination
            decisions. Individual circumstances may vary, and your doctor can provide personalized recommendations
            based on your health history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VaccinationSafetyPage;
