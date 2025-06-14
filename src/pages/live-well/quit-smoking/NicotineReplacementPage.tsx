import React from 'react';
import { Link } from 'react-router-dom';

interface NRTProduct {
  title: string;
  description: string;
  howToUse: string;
  effectiveness: string;
  sideEffects: string[];
  imageSrc?: string;
  tags?: string[];
}

const nrtProducts: NRTProduct[] = [
  {
    title: 'Nicotine Patches',
    description: 'Provide steady nicotine through your skin over 16-24 hours to reduce withdrawal symptoms.',
    howToUse: 'Apply one patch daily to clean, dry skin on upper body. Rotate application sites.',
    effectiveness: '95% effective when combined with counseling',
    sideEffects: ['Skin irritation', 'Vivid dreams', 'Mild headache'],
    imageSrc: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['24-hour relief', 'Easy to use']
  },
  {
    title: 'Nicotine Gum',
    description: 'Fast-acting relief for sudden cravings. Provides nicotine through mouth lining.',
    howToUse: 'Chew slowly until tingling, then park between cheek and gum. Use every 1-2 hours.',
    effectiveness: '90% effective with proper technique',
    sideEffects: ['Jaw soreness', 'Hiccups', 'Stomach upset'],
    imageSrc: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Fast-acting', 'Portable']
  },
  {
    title: 'Nicotine Lozenges',
    description: 'Dissolve slowly in mouth to provide steady nicotine absorption over 20-30 minutes.',
    howToUse: 'Place in mouth and let dissolve completely. Do not chew or swallow whole.',
    effectiveness: '85% effective for craving control',
    sideEffects: ['Throat irritation', 'Nausea', 'Heartburn'],
    imageSrc: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Discreet', 'Long-lasting']
  },
  {
    title: 'Nicotine Spray',
    description: 'Nasal or mouth spray for immediate relief of strong cravings and withdrawal symptoms.',
    howToUse: 'Spray once or twice into nose or mouth when craving occurs. Maximum 8 sprays per hour.',
    effectiveness: '80% effective for acute cravings',
    sideEffects: ['Nasal irritation', 'Runny nose', 'Throat burning'],
    imageSrc: 'https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Instant relief', 'Prescription required']
  }
];

const NicotineReplacementPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/quit-smoking" className="hover:underline">Quit smoking</Link>
            <span className="mx-2">›</span>
            <span>Nicotine replacement therapy</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Nicotine replacement therapy (NRT)</h1>
          <p className="text-xl font-medium">
            Safe and effective products to help manage withdrawal symptoms and cravings
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* What is NRT section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">What is nicotine replacement therapy?</h2>
          <p className="mb-4 text-blue-700">
            Nicotine replacement therapy (NRT) helps you quit smoking by providing small, controlled amounts of nicotine without the harmful chemicals found in tobacco smoke.
          </p>
          <p className="mb-4 text-blue-700">
            NRT reduces withdrawal symptoms and cravings, making it easier to break the smoking habit. It's the most effective quit-smoking aid, with success rates up to 95% when combined with counseling.
          </p>
          <p className="text-blue-700">
            All NRT products are available through PHB health centers and many can be purchased without prescription at licensed pharmacies.
          </p>
        </div>

        {/* Safety information */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-yellow-800">Important safety information</h2>
          <p className="mb-4 text-yellow-700">
            NRT is much safer than smoking, but consult your PHB healthcare provider before starting, especially if you:
          </p>
          <ul className="list-disc list-inside text-yellow-700 mb-4 space-y-1">
            <li>Are pregnant or breastfeeding</li>
            <li>Have heart disease or recent heart attack</li>
            <li>Have severe kidney or liver disease</li>
            <li>Are under 18 years old</li>
            <li>Take other medications regularly</li>
          </ul>
          <p className="text-yellow-700">
            <strong>Never smoke while using NRT products</strong> as this can cause nicotine overdose.
          </p>
        </div>

        {/* NRT Products */}
        <h2 className="text-2xl font-bold mb-6">Types of nicotine replacement therapy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {nrtProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {product.imageSrc && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.imageSrc}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#005eb8]">{product.title}</h3>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {product.effectiveness}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How to use:</h4>
                    <p className="text-sm text-gray-600">{product.howToUse}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Common side effects:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.sideEffects.map((effect, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Choosing the right NRT */}
        <h2 className="text-2xl font-bold mb-6">Choosing the right NRT for you</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-3 text-[#005eb8]">For heavy smokers (20+ cigarettes/day)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Combination therapy works best: Use patches for steady nicotine levels plus gum/lozenges for breakthrough cravings.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High-dose patches (21mg)</li>
                <li>• Plus nicotine gum (4mg) as needed</li>
                <li>• Or patches plus lozenges</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-[#005eb8]">For light smokers (less than 20/day)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Single therapy often sufficient: Choose the method that fits your lifestyle and smoking patterns.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Medium-dose patches (14mg)</li>
                <li>• Nicotine gum (2mg) as needed</li>
                <li>• Lozenges for discreet use</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Treatment timeline */}
        <h2 className="text-2xl font-bold mb-6">NRT treatment timeline</h2>
        <div className="bg-[#f0f4f5] p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#005eb8] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Weeks 1-6</h3>
              <p className="text-sm text-gray-600">
                Full dose NRT to manage withdrawal symptoms and establish smoke-free routine.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#005eb8] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Weeks 7-9</h3>
              <p className="text-sm text-gray-600">
                Gradual dose reduction as your body adjusts to lower nicotine levels.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#005eb8] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Weeks 10-12</h3>
              <p className="text-sm text-gray-600">
                Complete cessation of NRT as you become fully nicotine-free.
              </p>
            </div>
          </div>
        </div>

        {/* Where to get NRT */}
        <h2 className="text-2xl font-bold mb-6">Where to get NRT in Nigeria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">PHB Health Centers</h3>
            <p className="mb-4">
              Free or subsidized NRT available at all PHB community health centers. Includes counseling and follow-up support.
            </p>
            <Link
              to="/find-pharmacy"
              className="phb-button inline-block"
            >
              Find nearest PHB center
            </Link>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Licensed Pharmacies</h3>
            <p className="mb-4">
              Most NRT products available over-the-counter at licensed pharmacies. Pharmacists can provide usage guidance.
            </p>
            <Link
              to="/find-pharmacy"
              className="phb-button inline-block"
            >
              Find pharmacy near you
            </Link>
          </div>
        </div>

        {/* Success tips */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-800">Tips for NRT success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Do:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Follow dosing instructions exactly</li>
                <li>• Use enough NRT to control cravings</li>
                <li>• Combine with behavioral support</li>
                <li>• Complete the full treatment course</li>
                <li>• Stay hydrated and eat regularly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Don't:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Smoke while using NRT</li>
                <li>• Stop NRT too early</li>
                <li>• Use expired products</li>
                <li>• Ignore side effects</li>
                <li>• Use without medical advice if pregnant</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start NRT?</h2>
            <p className="mb-6">
              Speak with a PHB healthcare provider to create your personalized NRT plan and get ongoing support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Book NRT consultation
              </Link>
              <a
                href="tel:0800-QUIT-NOW"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Call quit line: 0800-QUIT-NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicotineReplacementPage;