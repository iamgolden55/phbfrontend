import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const supportLinks = [
    { text: 'Home', path: '/' },
    { text: 'Health A to Z', path: '/health-a-z' },
    { text: 'Live Well', path: '/live-well' },
    { text: 'Mental health', path: '/mental-health' },
    { text: 'Care and support', path: '/care-and-support' },
    { text: 'Pregnancy', path: '/pregnancy' },
    { text: 'PHB services', path: '/phb-services' },
    { text: 'Coronavirus (COVID-19)', path: '/health-a-z/covid-19' },
  ];

  const appLinks = [
    { text: 'PHB App', path: '/phb-services' },
    { text: 'Find my PHB number', path: '/account' },
    { text: 'View your GP health record', path: '/account/gp-record' },
    { text: 'View your test results', path: '/account/test-results' },
    { text: 'About the PHB', path: '/about' },
    { text: 'Healthcare abroad', path: '/care-and-support' },
  ];

  const programLinks = [
    { text: 'Student Recruitment', path: '/programs/student-recruitment' },
    { text: 'Research Opportunities', path: '/programs/research' },
    { text: 'Research Publications', path: '/research-publications' },
    { text: 'Mentorship Program', path: '/programs/mentorship' },
    { text: 'University Partnerships', path: '/programs/partnerships' },
  ];

  const otherLinks = [
    { text: 'Pregnancy tools', path: '/pregnancy' },
    { text: 'BMI calculator', path: '/tools/bmi-calculator' },
    { text: 'Elara AI assistant', path: '/elara-ai' },
    { text: 'Research Publications', path: '/research-publications' },
    { text: 'Site Map', path: '/site-map' },
  ];

  const aboutLinks = [
    { text: 'About us', path: '/about' },
    { text: 'Give us feedback', isExternal: true, path: 'mailto:publichealthbureau@hotmail.com?subject=PHB Website Feedback&body=Please share your feedback about the PHB website here. What did you like? What could be improved?' },
    { text: 'Accessibility statement', path: '/about#accessibility' },
    { text: 'Our policies', path: '/about#policies' },
    { text: 'Cookies', path: '/about#cookies' },
  ];

  return (
    <footer className="bg-gray-200 pt-8 pb-4">
      <div className="phb-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-sm font-bold mb-4">Support links</h3>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-[#005eb8] hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">PHB App and services</h3>
            <ul className="space-y-2 text-sm">
              {appLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-[#005eb8] hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">Programs and Recruitment</h3>
            <ul className="space-y-2 text-sm">
              {programLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-[#005eb8] hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">Other resources</h3>
            <ul className="space-y-2 text-sm">
              {otherLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-[#005eb8] hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">About PHB</h3>
            <ul className="space-y-2 text-sm">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  {link.isExternal ? (
                    <a
                      href={link.path}
                      className="text-[#005eb8] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-[#005eb8] hover:underline">
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">© Public Health Bureau</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
