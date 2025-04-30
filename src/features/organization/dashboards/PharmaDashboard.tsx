import React from 'react';
import { Link } from 'react-router-dom';
import { OrganizationInfo } from '../organizationAuthContext';

// --- Reusable Components (Mirroring others, consider moving to shared utils) ---
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

// --- Pharma Specific Components ---
const PharmaStats: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatCard label="Active Clinical Trials" value={8} />
    <StatCard label="Products in Pipeline" value={25} />
    <StatCard label="Pending Regulatory Submissions" value={5} />
    <StatCard label="Research Publications (Year)" value={18} />
  </div>
);

const PharmaQuickLinks: React.FC = () => (
  <DashboardCard title="Pharma Quick Links" className="h-full">
    <div className="grid grid-cols-1 gap-2">
      {[
        { label: 'Manage Clinical Trials', path: '/organization/trials', icon: 'biotech' },
        { label: 'Drug Inventory & Supply', path: '/organization/inventory', icon: 'inventory' },
        { label: 'R&D Project Tracker', path: '/organization/research', icon: 'science' },
        { label: 'Regulatory Affairs Docs', path: '/organization/regulatory', icon: 'gavel' },
        { label: 'Market Analysis Reports', path: '/organization/market-analysis', icon: 'analytics' },
      ].map((link) => (
        <Link key={link.label} to={link.path} className="bg-blue-50 hover:bg-blue-100 p-3 rounded-md flex items-center text-blue-700 transition">
          <span className="material-icons-outlined mr-2 text-lg">{link.icon}</span> {link.label}
        </Link>
      ))}
    </div>
  </DashboardCard>
);

// --- Placeholder Sections (Can be expanded) ---
const ClinicalTrialStatus: React.FC = () => (
  <DashboardCard title="Clinical Trial Status">
    {/* Replace with actual data */}
    <ul className="space-y-2 text-sm">
      <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>Trial XYZ (Phase III)</span> <span className="text-green-600 font-medium">Recruiting</span></li>
      <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>Trial ABC (Phase II)</span> <span className="text-blue-600 font-medium">Active</span></li>
      <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>Trial QRS (Phase I)</span> <span className="text-yellow-600 font-medium">Pending Start</span></li>
    </ul>
    <Link to="/organization/trials" className="text-blue-600 hover:underline text-sm mt-3 inline-block">View All Trials</Link>
  </DashboardCard>
);

const PipelineOverview: React.FC = () => (
  <DashboardCard title="Drug Pipeline Overview">
    <p className="text-sm text-gray-600 mb-3">Summary of products in development stages.</p>
    {/* Add chart or detailed list */}
     <div className="space-y-1 text-xs">
        <p><strong>Pre-clinical:</strong> 10 candidates</p>
        <p><strong>Phase I:</strong> 5 candidates</p>
        <p><strong>Phase II:</strong> 6 candidates</p>
        <p><strong>Phase III:</strong> 4 candidates</p>
     </div>
    <Link to="/organization/research" className="text-blue-600 hover:underline text-sm mt-4 inline-block">View R&D Details</Link>
  </DashboardCard>
);

// --- Pharma Dashboard Main Component ---
interface PharmaDashboardProps {
  organizationInfo: OrganizationInfo;
}

const PharmaDashboard: React.FC<PharmaDashboardProps> = ({ organizationInfo }) => {
  return (
    <div>
      {/* Stats Grid */}
      <PharmaStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
         {/* Column 1 */}
         <div className="lg:col-span-1 space-y-8">
            <PharmaQuickLinks />
         </div>

         {/* Column 2 */}
          <div className="lg:col-span-1 space-y-8">
            <ClinicalTrialStatus />
          </div>

         {/* Column 3 */}
          <div className="lg:col-span-1 space-y-8">
             <PipelineOverview />
          </div>
      </div>

      {/* Add more Pharma-specific sections here */}
      {/* Example: Regulatory Submission Deadlines */}
      {/* <DashboardCard title="Upcoming Regulatory Deadlines"> */}
      {/*   <p>Submission for Drug X due: Sept 15, 2024</p> */}
      {/* </DashboardCard> */}
    </div>
  );
};

export default PharmaDashboard; 