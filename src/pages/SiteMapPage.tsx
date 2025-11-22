import React from 'react';
import { Link } from 'react-router-dom';

interface LinkSection {
  title: string;
  links: Array<{
    title: string;
    path: string;
    description?: string;
  }>;
}

const SiteMapPage: React.FC = () => {
  const siteStructure: LinkSection[] = [
    {
      title: 'Main Sections',
      links: [
        { title: 'Home', path: '/', description: 'The PHB homepage with featured content and services' },
        { title: 'Health A-Z', path: '/health-a-z', description: 'Browse conditions alphabetically' },
        { title: 'Live Well', path: '/live-well', description: 'Tips and advice for healthy living' },
        { title: 'Mental Health', path: '/mental-health', description: 'Support and information about mental health' },
        { title: 'Care and Support', path: '/care-and-support', description: 'Find care services and support' },
        { title: 'PHB Services', path: '/phb-services', description: 'Healthcare services provided by PHB' },
        { title: 'About', path: '/about', description: 'Information about PHB and our services' },
        { title: 'Elara AI', path: '/elara-ai', description: 'Our AI-powered health assistant' },
      ]
    },
    {
      title: 'Pregnancy Journey',
      links: [
        { title: 'Pregnancy Overview', path: '/pregnancy', description: 'Your complete guide to pregnancy' },
        { title: 'Planning Pregnancy', path: '/pregnancy/planning', description: 'Information for those trying to conceive' },
        { title: 'Early Pregnancy', path: '/pregnancy/early', description: 'First trimester (weeks 1-12)' },
        { title: 'Middle Pregnancy', path: '/pregnancy/middle', description: 'Second trimester (weeks 13-26)' },
        { title: 'Late Pregnancy', path: '/pregnancy/late', description: 'Third trimester (weeks 27-40)' },
        { title: 'Labor and Birth', path: '/pregnancy/labor-and-birth', description: 'Information about childbirth' },
        { title: 'After Birth', path: '/pregnancy/after-birth', description: 'Postnatal care for you and your baby' },
      ]
    },
    {
      title: 'Pregnancy Health',
      links: [
        { title: 'Pregnancy Health', path: '/pregnancy/health', description: 'Managing your health during pregnancy' },
        { title: 'Pregnancy Concerns', path: '/pregnancy/concerns', description: 'Common concerns during pregnancy' },
        { title: 'Common Concerns', path: '/pregnancy/common-concerns', description: 'Typical symptoms and issues' },
        { title: 'First Prenatal Visit', path: '/pregnancy/first-prenatal-visit', description: 'What to expect at your first appointment' },
        { title: 'Early Symptoms', path: '/pregnancy/early-pregnancy-symptoms', description: 'Common signs of early pregnancy' },
        { title: 'Prenatal Tests', path: '/pregnancy/prenatal-tests', description: 'Tests and screenings during pregnancy' },
        { title: 'Signs of Labor', path: '/pregnancy/signs-of-labor', description: 'How to know when labor is starting' },
      ]
    },
    {
      title: 'Pregnancy Tools & Resources',
      links: [
        { title: 'Pregnancy Calendar', path: '/pregnancy/calendar', description: 'Week by week pregnancy guide' },
        { title: 'Baby Names Directory', path: '/pregnancy/baby-names-directory', description: 'Find the perfect name for your baby' },
        { title: 'Baby Shower Planner', path: '/pregnancy/baby-shower-planner', description: 'Plan your perfect baby celebration' },
        { title: 'Nutrition Guide', path: '/pregnancy/nutrition-guide', description: 'Eating well during pregnancy' },
        { title: 'Birth Plan Creator', path: '/pregnancy/birth-plan-creator', description: 'Create your personalized birth plan' },
        { title: 'Pregnancy Forums', path: '/pregnancy/forums', description: 'Connect with other expecting parents' },
      ]
    },
    {
      title: 'Health Tools',
      links: [
        { title: 'BMI Calculator', path: '/tools/bmi-calculator', description: 'Calculate your body mass index' },
        { title: 'Due Date Calculator', path: '/tools/due-date-calculator', description: 'Find out when your baby is due' },
        { title: 'Kick Counter', path: '/tools/kick-counter', description: 'Track your baby\'s movements' },
        { title: 'Contraction Timer', path: '/tools/contraction-timer', description: 'Time your contractions during labor' },
        { title: 'Weight Gain Calculator', path: '/tools/weight-gain-calculator', description: 'Healthy pregnancy weight gain guide' },
      ]
    },
    {
      title: 'User Account',
      links: [
        { title: 'Login', path: '/login', description: 'Sign in to your PHB account' },
        { title: 'Register', path: '/register', description: 'Create a new PHB account' },
        { title: 'Account Overview', path: '/account', description: 'Manage your PHB account' },
        { title: 'GP Health Record', path: '/account/gp-record', description: 'View your GP health record' },
        { title: 'Prescriptions', path: '/account/prescriptions', description: 'Manage your prescriptions' },
        { title: 'Appointments', path: '/account/appointments', description: 'Book and manage appointments' },
        { title: 'Test Results', path: '/account/test-results', description: 'View your test results' },
      ]
    },
    {
      title: 'Healthcare Professionals',
      links: [
        { title: 'Professional Login', path: '/professional/login', description: 'Sign in for healthcare professionals' },
        { title: 'Professional Register', path: '/professional/register', description: 'Register as a healthcare professional' },
        { title: 'Professional Dashboard', path: '/professional/dashboard', description: 'Healthcare professional portal' },
        { title: 'Patient Management', path: '/professional/patients', description: 'Manage your patients' },
        { title: 'Clinical Guidelines', path: '/professional/guidelines', description: 'PHB clinical guidelines' },
        { title: 'Doctor Resources', path: '/professional/resources', description: 'Resources for healthcare providers' },
        { title: 'Professional Forum', path: '/professional/forum', description: 'Connect with other healthcare professionals' },
        { title: 'Clinical Calculators', path: '/professional/calculators', description: 'Specialized medical calculators' },
        { title: 'Research Portal', path: '/professional/research', description: 'Access medical research tools' },
      ]
    },
    {
      title: 'Tools & Utilities',
      links: [
        { title: 'Link Validator', path: '/link-validator', description: 'Test navigation links on the PHB website' },
        { title: 'Site Map', path: '/site-map', description: 'Complete overview of PHB website content' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Site Map</h1>
          <p className="text-xl">
            Explore all the content available on the PHB website
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <p className="mb-8 text-lg">
          This site map provides links to all major sections and pages of the PHB website. Use it to find exactly what you're looking for or to discover new resources.
        </p>

        {siteStructure.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.links.map((link, linkIndex) => (
                <div key={linkIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold mb-2">
                    <Link to={link.path} className="text-[#0891b2] hover:underline">
                      {link.title}
                    </Link>
                  </h3>
                  {link.description && (
                    <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                  )}
                  <Link to={link.path} className="text-sm text-[#0891b2] hover:underline flex items-center">
                    Visit
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Can't find what you're looking for?</h2>
          <p className="mb-2">Try using the search feature at the top of the page or contact us for assistance.</p>
          <Link to="/contact" className="text-[#0891b2] hover:underline">Contact PHB</Link>
        </div>
      </div>
    </div>
  );
};

export default SiteMapPage;
