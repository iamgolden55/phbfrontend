import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useOrganizationTour } from '../../features/organization/context/OrganizationTourContext';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import ErrorBoundary from '../../components/ErrorBoundary';
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Briefcase,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  LayoutGrid,
  List,
  Zap,
  Eye,
  Edit2,
  Trash2,
  Download
} from 'lucide-react';
import guidelinesService, { ClinicalGuideline, GuidelineStats, GuidelineCreateData } from '../../services/guidelinesService';
import GuidelineUploadModal from '../../components/guidelines/GuidelineUploadModal';
import GuidelineEditModal from '../../components/guidelines/GuidelineEditModal';
import SmartNavigator from '../../components/guidelines/SmartNavigator';
import GuidelineDigitizer from '../../components/guidelines/GuidelineDigitizer';

// --- Components adapted for "Bella" Aesthetic ---

const StatsCard = ({
  label,
  value,
  icon: Icon,
  colorClass,
  bgClass
}: {
  label: string;
  value: string | number;
  icon: any;
  colorClass: string;
  bgClass: string;
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between transition-transform hover:-translate-y-1 duration-300">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <div className={`p-4 rounded-full ${bgClass} ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const UserAvatar = ({ name, role }: { name: string; role?: string }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center space-x-3 max-w-full overflow-hidden">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 font-bold text-sm">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-400 truncate" title={role}>{role || 'Clinician'}</p>
      </div>
    </div>
  );
};

const StatusPill = ({ status }: { status: string }) => {
  let styles = "bg-gray-100 text-gray-500";
  let label = status;

  if (status === 'approved' || status === 'published') {
    styles = "bg-emerald-50 text-emerald-600";
    label = "Approved";
  } else if (status === 'draft') {
    styles = "bg-orange-50 text-orange-600";
    label = "Draft";
  } else if (status === 'pending_review') {
    styles = "bg-pink-50 text-pink-600";
    label = "Pending";
  }

  return (
    <span className={`px-4 py-1.5 rounded-lg text-xs font-bold ${styles}`}>
      {label}
    </span>
  );
};

const PriorityPill = ({ priority }: { priority: string }) => {
  let styles = "bg-gray-100 text-gray-500";

  if (priority === 'critical') styles = "bg-red-50 text-red-500";
  else if (priority === 'high') styles = "bg-orange-50 text-orange-500";
  else if (priority === 'medium') styles = "bg-yellow-50 text-yellow-600";
  else if (priority === 'low') styles = "bg-blue-50 text-blue-500";

  return (
    <span className={`px-3 py-1 rounded-md text-xs font-semibold ${styles}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const ClinicalGuidelinesManagementPage: React.FC = () => {
  const { userData, isAuthenticated } = useOrganizationAuth();
  const [guidelines, setGuidelines] = useState<ClinicalGuideline[]>([]);
  const [stats, setStats] = useState<GuidelineStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGuideline, setEditingGuideline] = useState<ClinicalGuideline | null>(null);
  const [selectedGuideline, setSelectedGuideline] = useState<ClinicalGuideline | null>(null);

  // Smart Navigator
  const [navigatingGuideline, setNavigatingGuideline] = useState<any | null>(null);
  const [digitizingGuideline, setDigitizingGuideline] = useState<ClinicalGuideline | null>(null);

  // Joyride
  const [runTour, setRunTour] = useState<boolean>(false);
  const { tourTrigger } = useOrganizationTour();

  const tourSteps: Step[] = [
    { target: '.page-title', content: 'Welcome to the redesigned protocols dashboard.' },
    { target: '.stats-overview', content: 'Get a quick overview of your guideline metrics.' },
    { target: '.guidelines-list', content: 'Manage and launch your interactive protocols here.' },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const gData = await guidelinesService.getGuidelines();
      const sData = await guidelinesService.getGuidelinesStats();
      setGuidelines(gData);
      setStats(sData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchNavigator = (guideline: ClinicalGuideline) => {
    // For demo purposes, we will allow ANY guideline to trigger the Smart Navigator
    // In a real app, we would check if the guideline has been digitized
    setDigitizingGuideline(guideline);
  };

  const onDigitizationComplete = () => {
    if (digitizingGuideline) {
      const navContent = guidelinesService.getDigitizedContent(digitizingGuideline.guideline_id);
      setNavigatingGuideline(navContent);
      setDigitizingGuideline(null);
    }
  };

  const handleEdit = (guideline: ClinicalGuideline) => {
    setEditingGuideline(guideline);
    setShowEditModal(true);
  };

  const handleDelete = async (guidelineId: string) => {
    if (window.confirm('Are you sure you want to delete this guideline? This will archive it and make it inaccessible to staff.')) {
      try {
        await guidelinesService.deleteGuideline(guidelineId);
        await loadData();
        // Use setTimeout to ensure the alert stays visible
        setTimeout(() => {
          alert('✅ Guideline archived successfully!');
        }, 100);
      } catch (err: any) {
        console.error('Error deleting guideline:', err);
        setTimeout(() => {
          alert('❌ ' + (err?.message || 'Failed to delete guideline. Please try again.'));
        }, 100);
      }
    }
  };

  const handleDownloadGuideline = async (guideline: ClinicalGuideline) => {
    try {
      const blob = await guidelinesService.downloadGuideline(guideline.guideline_id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${guideline.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) { console.error(err); }
  };

  const handlePublish = async (guideline: ClinicalGuideline) => {
    if (window.confirm(`Are you sure you want to publish "${guideline.title}"?`)) {
      try {
        // First approve if not already approved
        if (guideline.approval_status !== 'approved' && guideline.approval_status !== 'published') {
          await guidelinesService.approveGuideline(guideline.guideline_id);
        }

        // Then publish
        await guidelinesService.publishGuideline(guideline.guideline_id);

        // Show success message BEFORE closing modal
        alert('✅ Guideline published successfully!\n\nThe guideline has been approved and is now visible to all staff.');

        // Update local state and close modal
        await loadData();
        setSelectedGuideline(null);
      } catch (err: any) {
        console.error('Error publishing guideline:', err);
        alert('❌ Failed to publish guideline\n\n' + (err?.message || 'Please try again.'));
      }
    }
  };

  // --- Render ---

  if (navigatingGuideline) {
    return (
      <SmartNavigator
        guidelineTitle={navigatingGuideline.title}
        steps={navigatingGuideline.steps}
        initialStepId={navigatingGuideline.initialStepId}
        onExit={() => setNavigatingGuideline(null)}
      />
    );
  }

  if (digitizingGuideline) {
    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex items-center justify-center p-4">
        <GuidelineDigitizer
          fileName={digitizingGuideline.title}
          onComplete={onDigitizationComplete}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-8 font-sans">
        <Helmet>
          <title>Clinical Guidelines - Bella Design</title>
        </Helmet>

        <Joyride steps={tourSteps} run={runTour} continuous showSkipButton styles={{ options: { primaryColor: '#10b981' } }} />

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 page-title">Clinical Guidelines</h1>
            <p className="text-gray-400 text-sm mt-1">Manage network-wide medical protocols</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Guideline
            </button>
            
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Overview</h2>
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 stats-overview">
              <StatsCard
                label="Total Guidelines"
                value={stats.total_guidelines}
                icon={Briefcase}
                bgClass="bg-orange-50"
                colorClass="text-orange-500"
              />
              <StatsCard
                label="Published"
                value={stats.published_guidelines}
                icon={ArrowDownLeft}
                bgClass="bg-emerald-50"
                colorClass="text-emerald-500"
              />
              <StatsCard
                label="Drafts"
                value={stats.draft_guidelines}
                icon={ArrowUpRight}
                bgClass="bg-pink-50"
                colorClass="text-pink-500"
              />
              <StatsCard
                label="Most Accessed"
                value={stats.most_accessed?.access_count || 0}
                icon={Users}
                bgClass="bg-orange-50"
                colorClass="text-orange-500"
              />
            </div>
          )}
        </div>

        {/* Guideline Details (Table/List) - REFINED VERSION */}
        <div className="bg-white rounded-3xl shadow-sm p-8 guidelines-list">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-gray-900">Guideline Details</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 px-4">
            <div className="col-span-3">Guideline Name</div>
            <div className="col-span-3">Author</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-1">Effective Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="space-y-1">
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading...</div>
            ) : guidelines.length === 0 ? (
              <div className="text-center py-10 text-gray-400">No guidelines found.</div>
            ) : (
              guidelines.map((g) => (
                <div key={g.id} className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0 group">

                  {/* Name + Launch Button */}
                  <div className="col-span-3">
                    <p
                      className="font-bold text-gray-900 text-sm cursor-pointer hover:text-emerald-600 transition-colors truncate"
                      onClick={() => setSelectedGuideline(g)}
                    >
                      {g.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchNavigator(g);
                        }}
                        className="text-xs font-bold text-emerald-500 flex items-center hover:text-emerald-700 transition-colors"
                      >
                        <Zap className="w-3 h-3 mr-1 fill-current" />
                        Run Protocol
                      </button>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="col-span-3">
                    <UserAvatar name={g.created_by_name || 'System Admin'} role={g.created_by_email?.split('@')[0] || 'admin'} />
                  </div>

                  {/* Type/Category */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600 font-medium capitalize truncate block">{g.category?.replace('_', ' ') || 'General'}</span>
                  </div>

                  {/* Priority */}
                  <div className="col-span-1">
                    <PriorityPill priority={g.priority} />
                  </div>

                  {/* Date */}
                  <div className="col-span-1">
                    <p className="text-sm text-gray-600 font-medium truncate">{new Date(g.effective_date).toLocaleDateString()}</p>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <StatusPill status={g.approval_status} />
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(g);
                      }}
                      className="p-2 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(g.guideline_id);
                      }}
                      className="p-2 rounded-full text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 text-center border-t border-gray-100 pt-8">
            <button className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest">View All Guidelines</button>
          </div>
        </div>

        {/* Modals */}
        <GuidelineUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSuccess={loadData}
        />
        <GuidelineEditModal
          isOpen={showEditModal}
          guideline={editingGuideline}
          onClose={() => setShowEditModal(false)}
          onSave={async (id, data) => {
            await guidelinesService.updateGuideline(id, data);
            loadData();
          }}
          onSuccess={loadData}
        />

        {/* View Details Modal */}
        {selectedGuideline && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden max-h-[85vh]">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{selectedGuideline.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-sm text-gray-500">Version {selectedGuideline.version}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${selectedGuideline.approval_status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                      selectedGuideline.approval_status === 'draft' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                      {selectedGuideline.approval_status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGuideline(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mb-8">
                  <FileText className="w-16 h-16 text-gray-300 mb-4" />
                  <h4 className="font-bold text-gray-700 mb-2">Document Preview</h4>
                  <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
                    This is a placeholder for the PDF Viewer. In the full version, the document would render here.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleDownloadGuideline(selectedGuideline)}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-gray-200 flex items-center hover:bg-gray-800 transition-transform hover:-translate-y-0.5"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                    {(selectedGuideline.approval_status === 'draft' || selectedGuideline.approval_status === 'pending_review') && (
                      <button
                        onClick={() => handlePublish(selectedGuideline)}
                        className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 flex items-center hover:bg-emerald-700 transition-transform hover:-translate-y-0.5"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Publish Now
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedGuideline(null);
                        handleLaunchNavigator(selectedGuideline);
                      }}
                      className="bg-emerald-50 text-emerald-600 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center hover:bg-emerald-100 transition-colors"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Run Protocol
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Description</p>
                    <p className="text-gray-700 text-sm">{selectedGuideline.description}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Uploaded By</p>
                    <p className="text-gray-700 text-sm">{selectedGuideline.created_by_name || 'Admin'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Category</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      {selectedGuideline.category?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </ErrorBoundary>
  );
};

export default ClinicalGuidelinesManagementPage;