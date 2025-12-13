import React from 'react';

const ManageHealthSection: React.FC = () => {
  const healthLinks = [
    {
      href: '/view-gp-health-record',
      text: 'View your health record',
    },
    {
      href: '/repeat-prescription',
      text: 'Order a repeat prescription',
    },
    {
      href: '/test-results',
      text: 'View your test results',
    },
    {
      href: '/gp-appointments',
      text: 'Appointments and bookings at your GP surgery',
    },
    {
      href: '/register-gp',
      text: 'How to register with a GP surgery',
    },
    {
      href: '/find-phb-number',
      text: 'Find your HPN number',
    },
  ];

  return (
    <section className="bg-gray-100 py-8">
      <div className="phb-container">
        <h2 className="text-2xl font-bold mb-6">Manage your health</h2>
        <div className="bg-white rounded-md shadow-sm p-6">
          <ul className="space-y-4">
            {healthLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="flex items-center text-[#0891b2] hover:underline"
                >
                  <svg
                    className="h-5 w-5 mr-4 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span className="font-medium">{link.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ManageHealthSection;
