import React from 'react';

const FeaturedSection: React.FC = () => {
  const featuredItems = [
    {
      title: 'Flu vaccine',
      description: 'Find out about the flu vaccine, including who should have it and how to get it',
      href: '/vaccinations/flu-vaccine',
    },
    {
      title: 'Calculate your body mass index (BMI)',
      description: 'Check your or your child\'s BMI to find out if you\'re a healthy weight',
      href: '/health-assessment-tools/calculate-your-bmi',
    },
    {
      title: 'Get healthcare cover abroad with a GHIC or EHIC',
      description: 'Get or renew your health insurance card to help you get healthcare in the EU and some other countries',
      href: '/using-the-phb/healthcare-abroad/apply-for-ghic',
    },
  ];

  return (
    <section className="bg-gray-100 py-8">
      <div className="phb-container">
        <h2 className="text-2xl font-bold mb-6">Featured</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow-sm">
              <h3 className="text-lg font-bold text-[#005eb8] mb-3">
                <a href={item.href} className="hover:underline">
                  {item.title}
                </a>
              </h3>
              <p className="text-sm mb-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
