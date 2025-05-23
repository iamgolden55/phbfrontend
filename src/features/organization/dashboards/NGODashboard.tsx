import React from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../organizationAuthContext';

// --- Reusable Components (Mirroring HospitalDashboard, consider moving to shared utils) ---
const DashboardCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
    <h2 className="text-xl font-bold text-blue-800 mb-4">{title}</h2>
    {children}
  </div>
);

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="bg-blue-50 p-4 rounded-lg text-center md:text-left">
    <p className="text-2xl font-bold text-blue-700">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

// --- NGO Specific Components ---
const NGOStats: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatCard label="Active Programs" value={12} />
    <StatCard label="Beneficiaries Reached" value={"5,400+"} />
    <StatCard label="Active Volunteers" value={75} />
    <StatCard label="Funds Raised (This Quarter)" value={"$28,500"} />
  </div>
);

const NGOQuickLinks: React.FC = () => (
  <DashboardCard title="NGO Quick Links" className="h-full">
    <div className="grid grid-cols-1 gap-2">
      {[
        { label: 'Manage Programs', path: '/organization/programs', icon: 'assignment' },
        { label: 'Volunteer Coordination', path: '/organization/volunteers', icon: 'group' },
        { label: 'View Donations', path: '/organization/donations', icon: 'volunteer_activism' },
        { label: 'Create Impact Report', path: '/organization/reports/create', icon: 'assessment' },
        { label: 'Community Outreach', path: '/organization/outreach', icon: 'campaign' },
      ].map((link) => (
        <Link key={link.label} to={link.path} className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md flex items-center text-blue-700 transition">
          <span className="material-icons-outlined mr-2 text-lg">{link.icon}</span> {link.label}
        </Link>
      ))}
    </div>
  </DashboardCard>
);

// --- Placeholder Sections (Can be expanded) ---
const ProgramHighlights: React.FC = () => (
  <DashboardCard title="Program Highlights">
    {/* Replace with actual data */}
    <ul className="space-y-3 text-sm">
      <li><strong>Community Health Clinic:</strong> 150 visits this week. <Link to="/organization/programs/health-clinic" className="text-blue-600 text-xs hover:underline ml-1">Details</Link></li>
      <li><strong>Nutrition Workshop:</strong> Next session on Aug 1st. <Link to="/organization/programs/nutrition" className="text-blue-600 text-xs hover:underline ml-1">Manage</Link></li>
      <li><strong>Youth Mentorship:</strong> 25 active pairings. <Link to="/organization/programs/mentorship" className="text-blue-600 text-xs hover:underline ml-1">View Pairs</Link></li>
    </ul>
    <Link to="/organization/programs" className="text-blue-600 hover:underline text-sm mt-3 inline-block">View All Programs</Link>
  </DashboardCard>
);

const VolunteerActivity: React.FC = () => (
  <DashboardCard title="Recent Volunteer Activity">
    <p className="text-sm text-gray-600 mb-3">Overview of recent volunteer hours and sign-ups.</p>
     <ul className="space-y-2 text-sm">
      <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>Aisha Bello logged 8 hours</span> <span className="text-gray-500">July 23</span></li>
      <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>New signup: Chidi Okonkwo</span> <span className="text-gray-500">July 22</span></li>
      <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>Team Event (Food Drive) - 15 vols</span> <span className="text-gray-500">July 20</span></li>
    </ul>
    <Link to="/organization/volunteers" className="text-blue-600 hover:underline text-sm mt-3 inline-block">Manage Volunteers</Link>
  </DashboardCard>
);

// --- NGO Dashboard Main Component ---
interface NGODashboardProps {
  userData: UserData;
}

const NGODashboard: React.FC<{ userData: UserData }> = ({ userData }) => {
  return (
    <div>
      {/* Stats Grid */}
      <NGOStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
         {/* Column 1 */}
         <div className="lg:col-span-1 space-y-8">
            <NGOQuickLinks />
         </div>

         {/* Column 2 */}
          <div className="lg:col-span-1 space-y-8">
            <ProgramHighlights />
          </div>

         {/* Column 3 */}
          <div className="lg:col-span-1 space-y-8">
             <VolunteerActivity />
          </div>
      </div>
      
      {/* Add more NGO-specific sections here */}
       {/* Example: Fundraising Goal Tracker */}
        {/* <DashboardCard title="Current Fundraising Campaign"> */}
        {/*   <p>Goal: $50,000 / Raised: $28,500</p> */}
        {/*   <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2"> */}
        {/*     <div className="bg-green-600 h-2.5 rounded-full" style={{width: '57%'}}></div> */}
        {/*   </div> */}
        {/* </DashboardCard> */}
    </div>
  );
};

export default NGODashboard; 