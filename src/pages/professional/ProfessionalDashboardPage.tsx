import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';

const ProfessionalDashboardPage: React.FC = () => {
  const { professionalUser } = useProfessionalAuth();
  const navigate = useNavigate();

  // Check if view is switched to patient view
  useEffect(() => {
    const checkViewPreference = () => {
      const viewPreference = localStorage.getItem('phb_view_preference');
      if (viewPreference !== 'doctor') {
        // If user switched to patient view, redirect to regular account page
        navigate('/account');
      }
    };
    
    // Check initially
    checkViewPreference();
    
    // Set up event listener for storage changes (when toggle is clicked elsewhere)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'phb_view_preference') {
        checkViewPreference();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for immediate updates within the same window
    const handleCustomViewChange = () => checkViewPreference();
    window.addEventListener('phb_view_changed', handleCustomViewChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('phb_view_changed', handleCustomViewChange);
    };
  }, [navigate]);

  // Format role with capitalization if it exists
  const formattedRole = professionalUser?.role
    ? professionalUser.role.charAt(0).toUpperCase() + professionalUser.role.slice(1)
    : '';

  // Get welcome message and stats based on role
  const getRoleSpecificContent = () => {
    if (!professionalUser) return null;

    switch (professionalUser.role) {
      case 'doctor':
        return {
          welcomeMessage: 'Welcome to your doctor dashboard',
          stats: [
            { label: 'Clinical Guidelines Updates', value: '12 new' },
            { label: 'CME Opportunities', value: '8 available' },
            { label: 'Professional Forum Threads', value: '24 unread' },
            { label: 'Research Collaborations', value: '5 open' },
          ],
          quickLinks: [
            { label: 'Appointments', path: '/professional/appointments' },
            { label: 'Clinical Guidelines', path: '/professional/guidelines' },
            { label: 'Doctor Resources', path: '/professional/doctor-resources' },
            { label: 'Clinical Calculators', path: '/professional/calculators' },
            { label: 'Professional Forum', path: '/professional/forum' },
          ],
        };
      case 'researcher':
        return {
          welcomeMessage: 'Welcome to your research dashboard',
          stats: [
            { label: 'Data Sets Available', value: '36' },
            { label: 'Research Collaborations', value: '11 active' },
            { label: 'Publication Opportunities', value: '7 open' },
            { label: 'Grant Applications', value: '4 closing soon' },
          ],
          quickLinks: [
            { label: 'Research Dashboard', path: '/professional/research' },
            { label: 'Data Visualization', path: '/professional/research/visualization' },
            { label: 'Clinical Calculators', path: '/professional/calculators' },
            { label: 'Professional Forum', path: '/professional/forum' },
          ],
        };
      case 'nurse':
        return {
          welcomeMessage: 'Welcome to your nursing dashboard',
          stats: [
            { label: 'Care Protocols Updates', value: '8 new' },
            { label: 'Training Opportunities', value: '12 available' },
            { label: 'Professional Forum Threads', value: '18 unread' },
            { label: 'Resource Guides', value: '15 available' },
          ],
          quickLinks: [
            { label: 'Care Protocols', path: '/professional/guidelines' },
            { label: 'Nursing Resources', path: '/professional/nursing-resources' },
            { label: 'Clinical Calculators', path: '/professional/calculators' },
            { label: 'Professional Forum', path: '/professional/forum' },
          ],
        };
      case 'pharmacist':
        return {
          welcomeMessage: 'Welcome to your pharmacy dashboard',
          stats: [
            { label: 'Medication Updates', value: '23 new' },
            { label: 'Drug Interaction Alerts', value: '5 updated' },
            { label: 'Professional Forum Threads', value: '14 unread' },
            { label: 'Continuing Education', value: '9 courses' },
          ],
          quickLinks: [
            { label: 'Medication Database', path: '/professional/pharmacy-resources' },
            { label: 'Clinical Guidelines', path: '/professional/guidelines' },
            { label: 'Clinical Calculators', path: '/professional/calculators' },
            { label: 'Professional Forum', path: '/professional/forum' },
          ],
        };
      default:
        return {
          welcomeMessage: 'Welcome to your professional dashboard',
          stats: [
            { label: 'Professional Updates', value: '15 new' },
            { label: 'Forum Activity', value: '20 unread' },
            { label: 'Resource Updates', value: '8 new' },
            { label: 'Educational Opportunities', value: '10 available' },
          ],
          quickLinks: [
            { label: 'Clinical Guidelines', path: '/professional/guidelines' },
            { label: 'Clinical Calculators', path: '/professional/calculators' },
            { label: 'Professional Forum', path: '/professional/forum' },
            { label: 'Educational Resources', path: '/professional/resources' },
          ],
        };
    }
  };

  const roleContent = getRoleSpecificContent();

  // Latest announcements - common for all roles
  const announcements = [
    {
      id: 1,
      title: 'New Clinical Guidelines for Hypertension',
      date: 'May 15, 2023',
      summary: 'Updated clinical guidelines for the management of hypertension have been published.',
    },
    {
      id: 2,
      title: 'Professional Forum Update',
      date: 'May 10, 2023',
      summary: 'The professional forum has been updated with new features including direct messaging and topic subscriptions.',
    },
    {
      id: 3,
      title: 'COVID-19 Protocol Updates',
      date: 'May 5, 2023',
      summary: 'The COVID-19 treatment and prevention protocols have been updated based on the latest research findings.',
    },
  ];

  // Upcoming events - common for all roles
  const events = [
    {
      id: 1,
      title: 'Virtual Grand Rounds: Advanced Diabetes Management',
      date: 'June 15, 2023',
      time: '1:00 PM - 2:30 PM',
    },
    {
      id: 2,
      title: 'Research Methodology Workshop',
      date: 'June 22, 2023',
      time: '10:00 AM - 4:00 PM',
    },
    {
      id: 3,
      title: 'Professional Ethics Seminar',
      date: 'July 5, 2023',
      time: '2:00 PM - 4:00 PM',
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Professional Dashboard | PHB</title>
      </Helmet>

      {roleContent && professionalUser && (
        <>
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800">{roleContent.welcomeMessage}</h1>
            <p className="mt-2 text-gray-600">
              {professionalUser.name} | {formattedRole}
              {professionalUser.specialty ? ` | ${professionalUser.specialty}` : ''}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {roleContent.stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-lg font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Links and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Links */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 gap-2">
                {roleContent.quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.path}
                    className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md flex items-center text-blue-700 transition"
                  >
                    <span className="material-icons mr-2">arrow_forward</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Latest Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-b pb-3 last:border-0">
                    <h3 className="text-md font-semibold">{announcement.title}</h3>
                    <p className="text-xs text-gray-500 mb-1">{announcement.date}</p>
                    <p className="text-sm text-gray-700">{announcement.summary}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:underline text-sm">View all announcements</a>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border-b pb-3 last:border-0">
                    <h3 className="text-md font-semibold">{event.title}</h3>
                    <p className="text-xs text-gray-500">{event.date}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                    <button className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                      Add to calendar
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:underline text-sm">View all events</a>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Accessed Clinical Guidelines</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Guidelines</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 18, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Commented on forum thread</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Professional Forum</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 17, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Downloaded research data</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Research Resources</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <a href="#" className="text-blue-600 hover:underline text-sm">View all activity</a>
            </div>
          </div>
        </>
      )}

      {!professionalUser && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Not Authenticated</h2>
          <p className="text-gray-600">Please <a href="/professional/login" className="text-blue-600 hover:underline">log in</a> to access the professional dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDashboardPage;
