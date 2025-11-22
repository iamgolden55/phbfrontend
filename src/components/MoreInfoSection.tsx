import React from 'react';

const MoreInfoSection: React.FC = () => {
  const infoItems = [
    {
      title: 'Vaccinations',
      description: 'Information about vaccinations for babies, children and adults, including why they\'re important and how to get them',
      href: '/vaccinations',
    },
    {
      title: 'COVID-19',
      description: 'Advice about COVID-19, including symptoms, treatments and how to avoid catching and spreading it.',
      href: '/conditions/covid-19',
    },
    {
      title: 'Baby',
      description: 'A guide to everything you need to know about caring for a baby',
      href: '/conditions/baby',
    },
    {
      title: 'Women\'s health',
      description: 'Information and support on health, wellbeing, conditions and screening',
      href: '/womens-health',
    },
    {
      title: 'Contraception',
      description: 'Information about different types of contraception, including where to get them and how well they work',
      href: '/contraception',
    },
  ];

  return (
    <section className="bg-gray-100 py-8">
      <div className="phb-container">
        <h2 className="text-2xl font-bold mb-6">More information and advice</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-6">
              <h3 className="text-lg font-bold text-[#0891b2] mb-3">
                <a href={item.href} className="hover:underline">
                  {item.title}
                </a>
              </h3>
              <p className="text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreInfoSection;
