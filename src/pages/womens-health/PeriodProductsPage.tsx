import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const PeriodProductsPage: React.FC = () => {
  const products = [
    {
      id: 'pads',
      title: 'Sanitary pads',
      description: 'Absorbent pads that stick to your underwear and catch period blood',
      types: ['Regular/day pads', 'Night pads (longer and more absorbent)', 'Pantyliners (thinner pads for light flow)'],
      pros: ['Easy to use', 'No need to insert anything', 'Can be worn overnight', 'Available in different absorbencies', 'Widely available'],
      cons: ['Can feel bulky', 'May shift when moving', 'Not suitable for swimming', 'May be visible under tight clothing', 'Create more waste than reusable options'],
      changeFrequency: 'Every 3-4 hours, or more frequently if needed',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20V4m0 0l5-2m-5 2l-5-2m10 0l5 2m-5-2v16" />
        </svg>
      )
    },
    {
      id: 'tampons',
      title: 'Tampons',
      description: 'Small absorbent products that are inserted into the vagina to absorb blood',
      types: ['Applicator tampons', 'Non-applicator tampons', 'Available in different absorbencies (light, regular, super, super plus)'],
      pros: ['Cannot feel them when inserted correctly', 'Can be worn while swimming', 'Less visible under clothing', 'Small and easy to carry'],
      cons: ['Learning curve for insertion', 'Small risk of Toxic Shock Syndrome (TSS)', 'May be uncomfortable to insert for some', 'String might be visible in swimwear', 'Create waste'],
      changeFrequency: 'Every 4-8 hours, never longer than 8 hours',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      id: 'menstrual-cups',
      title: 'Menstrual cups',
      description: 'Small, flexible cups made of silicone or rubber that are inserted into the vagina to collect (not absorb) period blood',
      types: ['Different sizes (typically small/large)', 'Different firmness levels', 'Various shapes to fit different anatomies'],
      pros: ['Reusable for several years', 'Eco-friendly and cost-effective', 'Can be worn for up to 12 hours', 'No risk of TSS', 'Can be worn overnight and during swimming'],
      cons: ['Learning curve for insertion and removal', 'May be messy to empty', 'Needs to be cleaned properly', 'Initial cost higher than disposable products', 'May not be suitable for those uncomfortable with insertion'],
      changeFrequency: 'Every 8-12 hours, depending on flow',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'period-underwear',
      title: 'Period underwear',
      description: 'Absorbent underwear that looks like regular underwear but contains special layers to absorb period blood',
      types: ['Different absorbency levels', 'Various styles (briefs, boyshorts, thongs)', 'Different materials'],
      pros: ['Reusable and eco-friendly', 'Comfortable to wear', 'Can be used as backup with other products', 'No need to insert anything', 'Good for overnight use'],
      cons: ['More expensive upfront', 'Needs washing after each use', 'May feel damp when heavily saturated', 'Takes time to dry', 'Limited absorbency for very heavy flows'],
      changeFrequency: 'Change once or twice per day, depending on flow',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M12 3v18" />
        </svg>
      )
    },
    {
      id: 'reusable-pads',
      title: 'Reusable cloth pads',
      description: 'Fabric pads made from absorbent materials that can be washed and reused',
      types: ['Different sizes and absorbencies', 'Various materials (cotton, bamboo, hemp)', 'Different fastening methods (snaps, wings)'],
      pros: ['Environmentally friendly', 'Cost-effective long-term', 'Often made from natural materials', 'Less likely to cause irritation', 'Customizable absorbency'],
      cons: ['Need washing after use', 'Need to carry used pads when changing outside home', 'May stain', 'Thicker than disposable pads', 'Takes time to dry after washing'],
      changeFrequency: 'Every 4-6 hours, depending on flow',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20V4m0 0l5-2m-5 2l-5-2m10 0l5 2m-5-2v16" />
        </svg>
      )
    },
    {
      id: 'menstrual-discs',
      title: 'Menstrual discs',
      description: 'Disc-shaped products that sit in the vaginal fornix (wider space at the top of the vagina) to collect period blood',
      types: ['Disposable discs', 'Reusable discs', 'Different sizes'],
      pros: ['Can be worn for up to 12 hours', 'Can be worn during sex', 'Less likely to leak during physical activity', 'No suction like menstrual cups', 'Some can be worn during sex'],
      cons: ['Learning curve for insertion and removal', 'Can be messy to remove', 'May be difficult to remove for some', 'Limited availability', 'Reusable options more expensive upfront'],
      changeFrequency: 'Every 8-12 hours, depending on flow',
      image: (
        <svg className="w-16 h-16 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: "How do I choose the right period product for me?",
      answer: "Consider your flow, lifestyle, comfort with insertion, budget, and environmental concerns. It often helps to try different products to find what works best for you. Many people use a combination of products depending on their flow and activities."
    },
    {
      question: "Can I use different period products together?",
      answer: "Yes, many people use a combination of products. For example, using period underwear as backup with a tampon or menstrual cup, or using different products at different points in your cycle depending on your flow."
    },
    {
      question: "How do I know when to change my period product?",
      answer: "For tampons and pads, change when they feel saturated or every 4-8 hours (never leave a tampon in for more than 8 hours). For cups and discs, empty every 8-12 hours. Period underwear should be changed daily or when it feels damp."
    },
    {
      question: "Can I swim during my period?",
      answer: "Yes, with internal products like tampons, menstrual cups, or discs. Water pressure temporarily slows flow while swimming, but you should use protection to prevent leaks when you exit the water."
    },
    {
      question: "What should I do if I can't afford period products?",
      answer: "Some schools, colleges, community centers, and food banks offer free period products. Reusable products like cups and cloth pads have a higher upfront cost but save money long-term. Some organizations also provide period products to those in need."
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
              { label: 'Periods', url: '/womens-health/periods' },
              { label: 'Period products', url: '/womens-health/period-products' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Period products</h1>
          <p className="text-xl font-medium">
            Information about different types of period products and how to choose what's right for you
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="bg-[#fdf2f8] p-6 rounded-lg mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About period products</h2>
          <p className="mb-4">
            There are many different products available to manage your period. Each type has its pros and cons,
            and which one is best for you depends on your personal preferences, lifestyle, and body.
          </p>
          <p>
            Most people try different products throughout their life and may use different types for different
            situations or days of their period. It's completely normal to use a combination of products that work for you.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Types of period products</h2>

        {products.map((product, index) => (
          <div
            key={product.id}
            className={`border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            id={product.id}
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start">
                <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  {product.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#d8157d] mb-3">{product.title}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>

                  <h4 className="font-bold text-gray-700 mb-2">Types:</h4>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    {product.types.map((type, idx) => (
                      <li key={idx}>{type}</li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">Pros:</h4>
                      <ul className="list-disc pl-6 text-gray-700">
                        {product.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">Cons:</h4>
                      <ul className="list-disc pl-6 text-gray-700">
                        {product.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#fdf2f8] p-4 rounded-md">
                    <p><strong>How often to change:</strong> {product.changeFrequency}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to choose the right product for you</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="mb-4">
              When choosing period products, consider these factors:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">Flow heaviness</h3>
                <p className="mb-2">Different products are designed for different flow levels:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Light flow: pantyliners, light tampons, period underwear</li>
                  <li>Medium flow: regular pads/tampons, menstrual cups, discs</li>
                  <li>Heavy flow: super/night pads, super tampons, high-capacity cups</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">Comfort level with insertion</h3>
                <p className="mb-2">Consider your comfort with products that are inserted into the vagina:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>No insertion: pads, period underwear, reusable cloth pads</li>
                  <li>Insertion required: tampons, menstrual cups, menstrual discs</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">Activity level</h3>
                <p className="mb-2">Your activities can influence which products work best:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Swimming: tampons, cups, or discs</li>
                  <li>Sports/exercise: tampons, cups, period underwear</li>
                  <li>Sleeping: overnight pads, period underwear, cups</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#d8157d] mb-2">Environmental impact</h3>
                <p className="mb-2">If environmental impact is important to you:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Lowest impact: reusable products like cups, cloth pads, period underwear</li>
                  <li>Medium impact: reusable applicator tampons, biodegradable products</li>
                  <li>Highest impact: disposable pads and tampons with plastic applicators</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#d8157d] mb-2">Budget considerations</h3>
              <p className="mb-2">Cost can be an important factor:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Low upfront cost, higher long-term cost: disposable pads and tampons</li>
                <li>Higher upfront cost, lower long-term cost: reusable products like cups, period underwear, cloth pads</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#d8157d]">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Period poverty and accessibility</h2>
          <p className="mb-4">
            Period poverty refers to the lack of access to period products, education, and hygienic facilities. It affects millions of people worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Finding help</h3>
              <p className="mb-4">
                If you're struggling to afford period products, there are organizations that can help:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Some schools, colleges, and universities offer free period products</li>
                <li>Food banks and community centers often provide free products</li>
                <li>Some charities specialize in providing period products to those in need</li>
                <li>PHB outreach programs offer support (call 0800 123 4567 for information)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">How to help others</h3>
              <p className="mb-4">
                You can help address period poverty by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Donating period products to food banks and shelters</li>
                <li>Supporting organizations that distribute period products</li>
                <li>Advocating for free period products in schools and public facilities</li>
                <li>Raising awareness about period poverty</li>
                <li>Supporting policy changes to make period products more accessible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodProductsPage;
