import React from 'react';
import { Link } from 'react-router-dom';

interface SupportCategoryType {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
}

const supportCategories: SupportCategoryType[] = [
  {
    title: 'Care for older people',
    description: 'Find out about care at home, care homes, and support for carers.',
    href: '/care-and-support/older-people',
    imageSrc: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Dementia guide',
    description: 'Find out about living with dementia, signs and symptoms, and support for you and your family.',
    href: '/care-and-support/dementia',
    imageSrc: 'https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Care after a hospital stay',
    description: 'Planning your discharge from hospital and getting the support you need at home.',
    href: '/care-and-support/hospital-discharge',
    imageSrc: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Support for carers',
    description: 'Information and advice for people looking after someone, including benefits and respite care.',
    href: '/care-and-support/carers',
    imageSrc: 'https://images.unsplash.com/photo-1576765608866-5b51c8617f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'End of life care',
    description: 'Information about end of life care, including advice for relatives and carers.',
    href: '/care-and-support/end-of-life',
    imageSrc: 'https://images.unsplash.com/photo-1523537342848-59d337eba290?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Care for the disabled',
    description: 'Support for living with disability, including benefits, social care and support services.',
    href: '/care-and-support/disabilities',
    imageSrc: 'https://images.unsplash.com/photo-1531171673193-49afcba4c8c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
];

const CareAndSupportPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Care and support</h1>
          <p className="text-xl font-medium">
            Advice, services and support for a wide range of care needs
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Introduction */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Support for your care needs</h2>
          <p className="mb-4">
            Find advice and support with day-to-day living, whether it's for you, a family member or someone you care for.
          </p>
          <p>
            Many care and support services are provided by local authorities, but there are also several PHB services and other organizations that can help.
          </p>
        </div>

        {/* Support categories */}
        <h2 className="text-2xl font-bold mb-6">Care and support guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {supportCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {category.imageSrc && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.imageSrc}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[#005eb8] mb-2">
                  <Link to={category.href} className="hover:underline">
                    {category.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                <Link
                  to={category.href}
                  className="text-[#005eb8] font-medium hover:underline flex items-center mt-auto"
                >
                  Read more
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tools and assessments */}
        <h2 className="text-2xl font-bold mb-6">Tools and assessments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Care needs assessment</h3>
            <p className="mb-4">
              A care needs assessment works out what help you need with day-to-day life. It's the first step to getting the care and support you need.
            </p>
            <Link
              to="/care-and-support/assessment"
              className="phb-button inline-block"
            >
              Apply for a care needs assessment
            </Link>
          </div>
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Financial assessment</h3>
            <p className="mb-4">
              Find out if you're eligible for financial help with care costs and how much you might need to pay yourself.
            </p>
            <Link
              to="/care-and-support/financial-help"
              className="phb-button inline-block"
            >
              Check financial eligibility
            </Link>
          </div>
        </div>

        {/* Looking after someone */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Looking after someone</h2>
            <p className="mb-6">
              If you provide regular care for a friend or family member, you might be eligible for support. Carers can get help and advice from a variety of organizations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold mb-2">Carer's assessment</h3>
                <p className="text-sm mb-3">Find out what support is available to help you as a carer.</p>
                <Link to="/care-and-support/carers-assessment" className="text-[#005eb8] text-sm hover:underline">
                  Apply for an assessment
                </Link>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold mb-2">Carer's benefits</h3>
                <p className="text-sm mb-3">Learn about financial help available to carers.</p>
                <Link to="/care-and-support/carers-benefits" className="text-[#005eb8] text-sm hover:underline">
                  Check benefit eligibility
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Find local services */}
        <div className="bg-[#005eb8] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Find local care services</h2>
            <p className="mb-6">
              Use our service finder to locate care providers in your area, including care homes, home care agencies, and day centers.
            </p>
            <Link
              to="/find-services"
              className="bg-white text-[#005eb8] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
            >
              Find care services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareAndSupportPage;
