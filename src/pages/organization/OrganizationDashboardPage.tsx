import React from 'react';
import { Helmet } from 'react-helmet';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import { Link } from 'react-router-dom';

// Import the specific dashboard components
import HospitalDashboard from '../../features/organization/dashboards/HospitalDashboard';
import NGODashboard from '../../features/organization/dashboards/NGODashboard';
import PharmaDashboard from '../../features/organization/dashboards/PharmaDashboard';

// Common sections can be kept here or moved into the specific dashboards if they need variations
const AnnouncementsSection: React.FC = () => {
  const announcements = [
    { id: 1, title: 'PHB Platform Update v2.1', date: 'July 20, 2024', summary: 'New features added for inter-organization communication.' },
    { id: 2, title: 'Upcoming Data Privacy Webinar', date: 'July 15, 2024', summary: 'Join our webinar on enhanced data protection measures.' },
    { id: 3, title: 'Call for Collaboration: Public Health Initiative', date: 'July 10, 2024', summary: 'Seeking partners for a new community health program.' },
  ];
  return (
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
  );
};

const EventsSection: React.FC = () => {
  const events = [
    { id: 1, title: 'Healthcare Leadership Summit', date: 'August 5, 2024', time: '9:00 AM - 5:00 PM' },
    { id: 2, title: 'NGO Network Meeting', date: 'August 12, 2024', time: '2:00 PM - 4:00 PM' },
    { id: 3, title: 'Pharmaceutical Innovation Conference', date: 'August 20, 2024', time: 'Full Day' },
  ];
  return (
     <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border-b pb-3 last:border-0">
            <h3 className="text-md font-semibold">{event.title}</h3>
            <p className="text-xs text-gray-500">{event.date} | {event.time}</p>
            <button className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition">
              More Info
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <a href="#" className="text-blue-600 hover:underline text-sm">View all events</a>
      </div>
    </div>
  );
};

// --- Main Dashboard Page Container Component ---
const OrganizationDashboardPage: React.FC = () => {
  const { userData, logout } = useOrganizationAuth();

  // Determine organization type from user role
  const getOrganizationType = () => {
    if (!userData) return 'Organization';
    if (userData.role === 'hospital_admin') return 'Hospital';
    if (userData.role === 'ngo_admin') return 'NGO';
    if (userData.role === 'pharmacy_admin') return 'Pharmacy';
    return 'Organization';
  };
  
  const formattedType = getOrganizationType();

  const handleLogout = () => {
    logout();
    // Consider navigating to login page after logout
    // navigate('/organization/login');
  };

  // Render the specific dashboard based on user role
  const renderSpecificDashboard = () => {
    if (!userData) return null; // Or a loading/error state

    switch (userData.role) {
      case 'hospital_admin':
        return <HospitalDashboard userData={userData} />;
      case 'ngo_admin':
        return <NGODashboard userData={userData} />;
      case 'pharmacy_admin':
        return <PharmaDashboard userData={userData} />;
      default:
        return <p>Unknown organization type.</p>; // Fallback
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Helmet>
        <title>{formattedType} Dashboard | PHB</title>
        {/* Include Material Icons Outlined font */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </Helmet>

      {userData ? (
        <>
          {/* Header Section - Common for all org dashboards */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-800">{formattedType} Dashboard</h1>
              <p className="mt-1 text-gray-600">
                Welcome, {userData.full_name} | {userData.hospital?.name || userData.ngo?.name || userData.pharmacy?.name || 'Organization'}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 sm:mt-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center transition"
            >
              <span className="material-icons-outlined mr-1 text-lg">logout</span> Sign Out
            </button>
          </div>

          {/* Render the Type-Specific Dashboard Content */}
          {renderSpecificDashboard()}

          {/* Common Sections Grid (Announcements & Events) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
             <AnnouncementsSection />
             <EventsSection />
          </div>
        </>
      ) : (
         // Loading or Error State
         <div className="text-center p-10">
            <p className="text-gray-500">Loading organization data or not logged in...</p>
             <Link to="/organization/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
               Go to Login
             </Link>
          </div>
      )}
    </div>
  );
};

export default OrganizationDashboardPage; 