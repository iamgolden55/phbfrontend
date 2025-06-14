import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import ProfessionalLayout from './layouts/ProfessionalLayout';
import OrganizationLayout from './layouts/OrganizationLayout';

// Components
import ScrollToTop from './components/ScrollToTop';
import MedicalRecords from './features/health/MedicalRecords'; // Updated import for MedicalRecords
import OnboardingFlow from './features/auth/OnboardingFlow'; // Import the onboarding component
import TestPage from './pages/TestPage';
import OnboardingTestPage from './pages/OnboardingTestPage'; // Add this import
import BookAppointment from './features/health/BookAppointment';
import ViewAppointments from './features/health/ViewAppointments';
import AppointmentConfirmation from './features/health/AppointmentConfirmation';

// Organization Pages
import OrganizationDashboardPage from './pages/organization/OrganizationDashboardPage';
import OrganizationLoginPage from './pages/organization/OrganizationLoginPage';
import OrganizationRegisterPage from './pages/organization/OrganizationRegisterPage';
import PatientAdmissionsPage from './pages/organization/PatientAdmissionsPage';
import PatientRegistrationApprovalPage from './pages/organization/PatientRegistrationApprovalPage';
import SurgerySchedulePage from './pages/organization/SurgerySchedulePage';
import HospitalAdminForgotPasswordPage from './pages/organization/HospitalAdminForgotPasswordPage';
import HospitalAdminPasswordResetVerifyPage from './pages/organization/HospitalAdminPasswordResetVerifyPage';
import HospitalAdminPasswordResetCompletePage from './pages/organization/HospitalAdminPasswordResetCompletePage';
import WardManagementPage from './pages/organization/WardManagementPage';
import StaffRosterPage from './pages/organization/StaffRosterPage';
import InventoryCheckPage from './pages/organization/InventoryCheckPage';
import AnalyticsPage from './pages/organization/AnalyticsPage';
import EmergencyPage from './pages/organization/EmergencyPage';
import UserRegistrationsPage from './pages/organization/UserRegistrationsPage';
import AppointmentsPage from './pages/organization/AppointmentsPage';
import { OrganizationAuthProvider } from './features/organization/organizationAuthContext';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Add this import
import ResetPasswordPage from './pages/ResetPasswordPage'; // Add this import

// Feedback Provider
// Removed FeedbackProvider since we're now using a simple mailto link instead

// Account Pages
import PersonalDetailsPage from './pages/account/PersonalDetailsPage';
import ContactPreferencesPage from './pages/account/ContactPreferencesPage';
import PasswordPage from './pages/account/PasswordPage';
import HealthGoalsPage from './pages/account/HealthGoalsPage';
import HealthRecordsPage from './pages/account/HealthRecordsPage';
import RequestPrescriptionPage from './pages/account/RequestPrescriptionPage';
import NominatedPharmacyPage from './pages/account/NominatedPharmacyPage';
import LinkPHBPage from './pages/account/LinkPHBPage'; // Add the import with other account page imports

// Tool Pages
import HealthAssessmentsPage from './pages/tools/HealthAssessmentsPage';
import HealthAssessmentBMICalculatorPage from './pages/HealthAssessmentBMICalculatorPage';
import HealthAssessmentToolsPage from './pages/HealthAssessmentToolsPage'; // New import

// Assessment Pages
import HealthCheckAssessment from './pages/tools/assessments/HealthCheckAssessment';
import MentalWellbeingAssessment from './pages/tools/assessments/MentalWellbeingAssessment';

// Pages
import HomePage from './pages/HomePage';
import HealthAZPage from './pages/HealthAZPage';
import HealthConditionPage from './pages/HealthConditionPage';
import MedicinesAZPage from './pages/MedicinesAZPage';
import MedicineDetailPage from './pages/MedicineDetailPage';
import LiveWellPage from './pages/LiveWellPage';
// Live Well Pages
import HealthyEatingPage from './pages/live-well/HealthyEatingPage';
import MealPlansPage from './pages/live-well/healthy-eating/MealPlansPage';
import ExercisePage from './pages/live-well/ExercisePage';
import MentalWellbeingPage from './pages/live-well/MentalWellbeingPage';
import SleepPage from './pages/live-well/SleepPage';
// Programs Pages
import ProgramsPage from './pages/programs/ProgramsPage';
import StudentRecruitmentPage from './pages/programs/StudentRecruitmentPage';
import ResearchOpportunitiesPage from './pages/programs/ResearchOpportunitiesPage';
import MentorshipProgramPage from './pages/programs/MentorshipProgramPage';
import UniversityPartnershipsPage from './pages/programs/UniversityPartnershipsPage';
import SearchPage from './pages/SearchPage';
import MentalHealthPage from './pages/MentalHealthPage';
import CareAndSupportPage from './pages/CareAndSupportPage';
import PregnancyPage from './pages/PregnancyPage';
import PregnancyHealthPage from './pages/PregnancyHealthPage';
import PregnancyCarePage from './pages/PregnancyCarePage';
import PregnancyConcernsPage from './pages/PregnancyConcernsPage';
import CommonConcernsPage from './pages/CommonConcernsPage';
import FirstPrenatalVisitPage from './pages/FirstPrenatalVisitPage';
import EarlyPregnancySymptomsPage from './pages/EarlyPregnancySymptomsPage';
import PrenatalTestsPage from './pages/PrenatalTestsPage';
import SignsOfLaborPage from './pages/SignsOfLaborPage';
import PlanningPregnancyPage from './pages/PlanningPregnancyPage';
import EarlyPregnancyPage from './pages/EarlyPregnancyPage';
import MiddlePregnancyPage from './pages/MiddlePregnancyPage';
import LatePregnancyPage from './pages/LatePregnancyPage';
import LaborAndBirthPage from './pages/LaborAndBirthPage';
import AfterBirthPage from './pages/AfterBirthPage';
import PregnancyForumsPage from './pages/PregnancyForumsPage';
import BMICalculatorPage from './pages/BMICalculatorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import DueDateCalculatorPage from './pages/DueDateCalculatorPage';
import KickCounterPage from './pages/KickCounterPage';
import ContractionTimerPage from './pages/ContractionTimerPage';
import WeightGainCalculatorPage from './pages/WeightGainCalculatorPage';
import PregnancyCalendarPage from './pages/PregnancyCalendarPage';
import BabyNamesDirectoryPage from './pages/BabyNamesDirectoryPage';
import BabyShowerPlannerPage from './pages/BabyShowerPlannerPage';
import PregnancyNutritionGuidePage from './pages/PregnancyNutritionGuidePage';
import BirthPlanCreatorPage from './pages/BirthPlanCreatorPage';
import AboutPHBPage from './pages/AboutPHBPage';
import ElaraAIPage from './pages/ElaraAIPage';
import PHBServicesPage from './pages/PHBServicesPage';
import FindPharmacyPage from './pages/FindPharmacyPage';
import LinkValidatorPage from './pages/LinkValidatorPage';
import SiteMapPage from './pages/SiteMapPage';
import MedicalAIDemoPage from './pages/MedicalAIDemoPage';

// Professional Pages
import ProfessionalLoginPage from './pages/professional/ProfessionalLoginPage';
import ProfessionalRegisterPage from './pages/professional/ProfessionalRegisterPage';
import ProfessionalDashboardPage from './pages/professional/ProfessionalDashboardPage';
import ProfessionalCalculatorsPage from './pages/professional/ProfessionalCalculatorsPage';
import ResearchPage from './pages/professional/ResearchPage';
import ClinicalGuidelinesPage from './pages/professional/ClinicalGuidelinesPage';
import DoctorResourcesPage from './pages/professional/DoctorResourcesPage';
import ProfessionalForumPage from './pages/professional/ProfessionalForumPage';
import PatientManagementPage from './pages/professional/PatientManagementPage';
import ProfessionalAppointmentsPage from './pages/professional/ProfessionalAppointmentsPage';
import ProfessionalAppointmentDetailPage from './pages/professional/ProfessionalAppointmentDetailPage';
import ProfessionalAppointmentReschedulePage from './pages/professional/ProfessionalAppointmentReschedulePage';
import ProfessionalPatientsPage from './pages/professional/ProfessionalPatientsPage';
import ProfessionalResearchPage from './pages/professional/ProfessionalResearchPage';
import ProfessionalProfilePage from './pages/professional/ProfessionalProfilePage';
import ProfessionalResourcesPage from './pages/professional/ProfessionalResourcesPage';

// Features
import { AuthProvider, useAuth } from './features/auth/authContext';
import { ProfessionalAuthProvider, useProfessionalAuth } from './features/professional/professionalAuthContext';
import { useOrganizationAuth } from './features/organization/organizationAuthContext';
import GPHealthRecord from './features/health/GPHealthRecord';
import Prescriptions from './features/health/Prescriptions';
import Appointments from './features/health/Appointments';
import TestResultsPage from './pages/account/TestResultsPage';
import HospitalStatusGuard from './features/health/HospitalStatusGuard';

// Advanced Search Features
import AdvancedSearchPage from './features/search/AdvancedSearchPage';

// New Imports for Vaccinations and Health Pages
import VaccinationsPage from './pages/vaccinations/VaccinationsPage';
import FluVaccinePage from './pages/vaccinations/FluVaccinePage';
import Covid19VaccinePage from './pages/vaccinations/Covid19VaccinePage';
import AdultVaccinePage from './pages/vaccinations/AdultVaccinePage';
import ChildrenVaccinePage from './pages/vaccinations/ChildrenVaccinePage';
import PregnancyVaccinePage from './pages/vaccinations/PregnancyVaccinePage';
import TravelVaccinePage from './pages/vaccinations/TravelVaccinePage';
import HealthcareAbroadPage from './pages/using-the-phb/healthcare-abroad/HealthcareAbroadPage';
import GHICPage from './pages/using-the-phb/healthcare-abroad/GHICPage';
import WomensHealthPage from './pages/womens-health/WomensHealthPage';
import ContraceptionPage from './pages/contraception/ContraceptionPage';
import BabyHealthPage from './pages/conditions/BabyHealthPage';

// Women's Health Pages
import PeriodsPage from './pages/womens-health/PeriodsPage';
import MenopausePage from './pages/womens-health/MenopausePage';
import BreastHealthPage from './pages/womens-health/BreastHealthPage';
import SexualHealthPage from './pages/womens-health/SexualHealthPage';
import FertilityPage from './pages/womens-health/FertilityPage';
import WomensMentalHealthPage from './pages/womens-health/MentalHealthPage';
import ScreeningsPage from './pages/womens-health/ScreeningsPage';
import PeriodProductsPage from './pages/womens-health/PeriodProductsPage';

// Period-related Pages
import PainfulPeriodsPage from './pages/womens-health/periods/PainfulPeriodsPage';
import IrregularPeriodsPage from './pages/womens-health/periods/IrregularPeriodsPage';
import PMSPage from './pages/womens-health/periods/PMSPage';
import EndometriosisPage from './pages/womens-health/periods/EndometriosisPage';
import PCOSPage from './pages/womens-health/periods/PCOSPage';
import HeavyPeriodsPage from './pages/womens-health/periods/HeavyPeriodsPage';

// Additional imports for contraception sub-pages
import CondomsPage from './pages/contraception/CondomsPage';
import CombinedPillPage from './pages/contraception/CombinedPillPage';
import NaturalMethodsPage from './pages/contraception/NaturalMethodsPage';
import ContraceptionEmergencyPage from './pages/contraception/EmergencyPage';
import CycleTrackerPage from './pages/contraception/CycleTrackerPage';
import ProgesteroneOnlyPillPage from './pages/contraception/ProgesteroneOnlyPillPage';
import ImplantPage from './pages/contraception/ImplantPage';
import InjectionPage from './pages/contraception/InjectionPage';
import IUDPage from './pages/contraception/IUDPage';
import HowToBookPage from './pages/help/appointments/HowToBookPage';
import HelpPage from './pages/help/HelpPage'; // New import for HelpPage
import HowToRequestPage from './pages/help/prescriptions/HowToRequestPage';
import UrgentRequestsPage from './pages/help/prescriptions/UrgentRequestsPage';
import HowNominationsWorkPage from './pages/help/prescriptions/HowNominationsWorkPage';

// Mental Health Pages
import DepressionPage from './pages/mental-health/DepressionPage';
import AnxietyPage from './pages/mental-health/AnxietyPage';
import StressPage from './pages/mental-health/StressPage';
import PTSDPage from './pages/mental-health/PTSDPage';
import SelfHarmPage from './pages/mental-health/SelfHarmPage';
import EatingDisordersPage from './pages/mental-health/EatingDisordersPage';

// New import for Research Publications Page
import ResearchPublicationsPage from './pages/ResearchPublicationsPage';

// Add the new import
import AppointmentDetail from './features/health/AppointmentDetail';

// Import the Professional Route Guard for proper authentication
import ProfessionalRouteGuard from './features/professional/ProfessionalRouteGuard';

// Import CAPTCHA test pages
import CaptchaTestPage from './features/auth/CaptchaTestPage';
import CaptchaTestScript from './features/auth/CaptchaTestScript';

// Organization route guard component
const OrganizationRouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, isInitialized } = useOrganizationAuth();
  const [directCheckDone, setDirectCheckDone] = React.useState(false);
  const [directAuthCheck, setDirectAuthCheck] = React.useState(false);

  // Try to directly check localStorage before relying on context state
  React.useEffect(() => {
    if (!isAuthenticated && !directCheckDone) {
      try {
        // Check localStorage directly as a last resort
        const storedAuth = localStorage.getItem('organizationAuth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          if (authData.userData && authData.tokens) {
            console.log('🛡️ Route Guard: Found valid auth in localStorage');
            setDirectAuthCheck(true);
          } else {
            console.log('🛡️ Route Guard: Invalid auth data in localStorage');
            setDirectAuthCheck(false);
          }
        } else {
          // Check sessionStorage as backup
          const backupState = sessionStorage.getItem('org_auth_state');
          if (backupState) {
            const parsedState = JSON.parse(backupState);
            if (parsedState.isAuthenticated && parsedState.userData) {
              console.log('🛡️ Route Guard: Found valid auth in sessionStorage backup');
              setDirectAuthCheck(true);
            } else {
              setDirectAuthCheck(false);
            }
          } else {
            setDirectAuthCheck(false);
          }
        }
      } catch (err) {
        console.error('🛡️ Route Guard: Error checking direct auth:', err);
        setDirectAuthCheck(false);
      } finally {
        setDirectCheckDone(true);
      }
    }
  }, [isAuthenticated, directCheckDone]);

  // Show loading spinner while authentication is being initialized
  if (isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-lg font-medium">Verifying authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // Either use the context's isAuthenticated or our direct check
  if (!isAuthenticated && !directAuthCheck) {
    console.log('🛡️ Route Guard: Redirecting to login page');
    return <Navigate to="/organization/login" replace />;
  }

  return <>{children}</>;
};

// Protected route component that redirects to onboarding if needed
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, needsOnboarding } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ProfessionalAuthProvider>
        <OrganizationAuthProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Standalone auth pages (no header/footer) */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="professional/login" element={<ProfessionalLoginPage />} />
              <Route path="professional/register" element={<ProfessionalRegisterPage />} />
              <Route path="organization/login" element={<OrganizationLoginPage />} />
              <Route path="organization/register" element={<OrganizationRegisterPage />} />
              
              {/* Hospital Admin Password Reset Routes */}
              <Route path="hospital-admin/reset-password/request" element={<HospitalAdminForgotPasswordPage />} />
              <Route path="hospital-admin/reset-password/verify" element={<HospitalAdminPasswordResetVerifyPage />} />
              <Route path="hospital-admin/reset-password/complete" element={<HospitalAdminPasswordResetCompletePage />} />

              {/* Organization layout routes */}
              <Route path="/organization" element={<OrganizationLayout />}>
                <Route path="dashboard" element={
                  <OrganizationRouteGuard>
                    <OrganizationDashboardPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="user-registrations" element={
                  <OrganizationRouteGuard>
                    <UserRegistrationsPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="admissions" element={
                  <OrganizationRouteGuard>
                    <PatientAdmissionsPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="registration-approvals" element={
                  <OrganizationRouteGuard>
                    <PatientRegistrationApprovalPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="surgery-schedule" element={
                  <OrganizationRouteGuard>
                    <SurgerySchedulePage />
                  </OrganizationRouteGuard>
                } />
                <Route path="wards" element={
                  <OrganizationRouteGuard>
                    <WardManagementPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="staffing" element={
                  <OrganizationRouteGuard>
                    <StaffRosterPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="inventory" element={
                  <OrganizationRouteGuard>
                    <InventoryCheckPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="analytics" element={
                  <OrganizationRouteGuard>
                    <AnalyticsPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="emergency" element={
                  <OrganizationRouteGuard>
                    <EmergencyPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="appointments" element={
                  <OrganizationRouteGuard>
                    <AppointmentsPage />
                  </OrganizationRouteGuard>
                } />
              </Route>

              {/* Test pages for debugging */}
              <Route path="test" element={<TestPage />} />
              <Route path="test-onboarding" element={<OnboardingTestPage />} />

              {/* Onboarding flow */}
              <Route path="onboarding" element={<OnboardingFlow />} />

              {/* Main layout routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="health-assessment-tools" element={<HealthAssessmentToolsPage />} /> {/* New route */}
                <Route path="health-assessment-tools/calculate-your-bmi" element={<HealthAssessmentBMICalculatorPage />} />
                <Route path="health-a-z" element={<HealthAZPage />} />
                <Route path="health-a-z/:conditionSlug" element={<HealthConditionPage />} />
                <Route path="medicines-a-z" element={<MedicinesAZPage />} />
                <Route path="medicines-a-z/:medicineId" element={<MedicineDetailPage />} />
                <Route path="research-publications" element={<ResearchPublicationsPage />} /> {/* New route for Research Publications */}
                <Route path="live-well" element={<LiveWellPage />} />
                {/* Live Well Subroutes */}
                <Route path="live-well/healthy-eating" element={<HealthyEatingPage />} />
                <Route path="live-well/healthy-eating/meal-plans" element={<MealPlansPage />} />
                <Route path="live-well/exercise" element={<ExercisePage />} />
                <Route path="live-well/mental-wellbeing" element={<MentalWellbeingPage />} />
                <Route path="live-well/sleep" element={<SleepPage />} />

                {/* Programs Routes */}
                <Route path="programs" element={<ProgramsPage />} />
                <Route path="programs/student-recruitment" element={<StudentRecruitmentPage />} />
                <Route path="programs/research" element={<ResearchOpportunitiesPage />} />
                <Route path="programs/mentorship" element={<MentorshipProgramPage />} />
                <Route path="programs/partnerships" element={<UniversityPartnershipsPage />} />

                {/* Search Pages */}
                <Route path="search" element={<SearchPage />} />
                <Route path="advanced-search" element={<AdvancedSearchPage />} />

                <Route path="mental-health" element={<MentalHealthPage />} />
                <Route path="mental-health/depression" element={<DepressionPage />} />
                <Route path="mental-health/anxiety" element={<AnxietyPage />} />
                <Route path="mental-health/stress" element={<StressPage />} />
                <Route path="mental-health/ptsd" element={<PTSDPage />} />
                <Route path="mental-health/self-harm" element={<SelfHarmPage />} />
                <Route path="mental-health/eating-disorders" element={<EatingDisordersPage />} />
                <Route path="care-and-support" element={<CareAndSupportPage />} />

                {/* Help Routes */}
                <Route path="help" element={<HelpPage />} /> {/* New Help Route */}
                <Route path="help/appointments/how-to-book" element={<HowToBookPage />} />
                <Route path="help/prescriptions/how-to-request" element={<HowToRequestPage />} />
                <Route path="help/prescriptions/urgent-requests" element={<UrgentRequestsPage />} />
                <Route path="help/prescriptions/how-nominations-work" element={<HowNominationsWorkPage />} />

                {/* Women's Health Pages */}
                <Route path="womens-health" element={<WomensHealthPage />} />
                <Route path="womens-health/periods" element={<PeriodsPage />} />
                <Route path="womens-health/menopause" element={<MenopausePage />} />
                <Route path="womens-health/breast-health" element={<BreastHealthPage />} />
                <Route path="womens-health/sexual-health" element={<SexualHealthPage />} />
                <Route path="womens-health/fertility" element={<FertilityPage />} />
                <Route path="womens-health/mental-health" element={<WomensMentalHealthPage />} />
                <Route path="womens-health/screenings" element={<ScreeningsPage />} />
                <Route path="womens-health/period-products" element={<PeriodProductsPage />} />

                {/* Period-related Pages */}
                <Route path="womens-health/periods/painful-periods" element={<PainfulPeriodsPage />} />
                <Route path="womens-health/periods/irregular-periods" element={<IrregularPeriodsPage />} />
                <Route path="womens-health/periods/pms" element={<PMSPage />} />
                <Route path="womens-health/periods/endometriosis" element={<EndometriosisPage />} />
                <Route path="womens-health/periods/pcos" element={<PCOSPage />} />
                <Route path="womens-health/periods/heavy-periods" element={<HeavyPeriodsPage />} />

                <Route path="contraception" element={<ContraceptionPage />} />
                <Route path="contraception/condoms" element={<CondomsPage />} />
                <Route path="contraception/combined-pill" element={<CombinedPillPage />} />
                <Route path="contraception/progesterone-only-pill" element={<ProgesteroneOnlyPillPage />} />
                <Route path="contraception/implant" element={<ImplantPage />} />
                <Route path="contraception/injection" element={<InjectionPage />} />
                <Route path="contraception/iud" element={<IUDPage />} />
                <Route path="contraception/natural-methods" element={<NaturalMethodsPage />} />
                <Route path="contraception/emergency" element={<ContraceptionEmergencyPage />} />
                <Route path="contraception/cycle-tracker" element={<CycleTrackerPage />} />

                {/* Pregnancy Pages */}
                <Route path="pregnancy" element={<PregnancyPage />} />
                <Route path="pregnancy/health" element={<PregnancyHealthPage />} />
                <Route path="pregnancy/care" element={<PregnancyCarePage />} />
                <Route path="pregnancy/forums" element={<PregnancyForumsPage />} />
                <Route path="pregnancy/calendar" element={<PregnancyCalendarPage />} />
                <Route path="pregnancy/baby-names-directory" element={<BabyNamesDirectoryPage />} />
                <Route path="pregnancy/baby-shower-planner" element={<BabyShowerPlannerPage />} />
                <Route path="pregnancy/nutrition-guide" element={<PregnancyNutritionGuidePage />} />
                <Route path="pregnancy/birth-plan-creator" element={<BirthPlanCreatorPage />} />
                <Route path="pregnancy/concerns" element={<PregnancyConcernsPage />} />
                <Route path="pregnancy/common-concerns" element={<CommonConcernsPage />} />
                <Route path="pregnancy/first-prenatal-visit" element={<FirstPrenatalVisitPage />} />
                <Route path="pregnancy/early-pregnancy-symptoms" element={<EarlyPregnancySymptomsPage />} />
                <Route path="pregnancy/prenatal-tests" element={<PrenatalTestsPage />} />
                <Route path="pregnancy/signs-of-labor" element={<SignsOfLaborPage />} />

                {/* Pregnancy Journey Pages */}
                <Route path="pregnancy/planning" element={<PlanningPregnancyPage />} />
                <Route path="pregnancy/early" element={<EarlyPregnancyPage />} />
                <Route path="pregnancy/middle" element={<MiddlePregnancyPage />} />
                <Route path="pregnancy/late" element={<LatePregnancyPage />} />
                <Route path="pregnancy/labor-and-birth" element={<LaborAndBirthPage />} />
                <Route path="pregnancy/after-birth" element={<AfterBirthPage />} />

                {/* Tools */}
                <Route path="tools/bmi-calculator" element={<BMICalculatorPage />} />
                <Route path="tools/due-date-calculator" element={<DueDateCalculatorPage />} />
                <Route path="tools/kick-counter" element={<KickCounterPage />} />
                <Route path="tools/contraction-timer" element={<ContractionTimerPage />} />
                <Route path="tools/weight-gain-calculator" element={<WeightGainCalculatorPage />} />
                <Route path="tools/health-assessments" element={<HealthAssessmentsPage />} />

                {/* Health Assessment Routes */}
                <Route path="tools/health-assessments/health-check" element={<HealthCheckAssessment />} />
                <Route path="tools/health-assessments/mental-wellbeing" element={<MentalWellbeingAssessment />} />

                {/* New Routes for Vaccinations and Health Pages */}
                <Route path="vaccinations" element={<VaccinationsPage />} />
                <Route path="vaccinations/flu-vaccine" element={<FluVaccinePage />} />
                <Route path="vaccinations/covid-19-vaccine" element={<Covid19VaccinePage />} />
                <Route path="vaccinations/adults" element={<AdultVaccinePage />} />
                <Route path="vaccinations/children" element={<ChildrenVaccinePage />} />
                <Route path="vaccinations/pregnancy" element={<PregnancyVaccinePage />} />
                <Route path="vaccinations/travel" element={<TravelVaccinePage />} />
                <Route path="using-the-phb/healthcare-abroad" element={<HealthcareAbroadPage />} />
                <Route path="using-the-phb/healthcare-abroad/nigerian-travel-health" element={<GHICPage />} />
                <Route path="conditions/baby" element={<BabyHealthPage />} />

                {/* Account and Health Dashboard - Protected Routes */}
                <Route path="account" element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                } />

                {/* New Account Management Routes */}
                <Route path="account/personal-details" element={
                  <ProtectedRoute>
                    <PersonalDetailsPage />
                  </ProtectedRoute>
                } />
                <Route path="account/contact-preferences" element={
                  <ProtectedRoute>
                    <ContactPreferencesPage />
                  </ProtectedRoute>
                } />
                <Route path="account/password" element={
                  <ProtectedRoute>
                    <PasswordPage />
                  </ProtectedRoute>
                } />
                <Route path="account/link-phb" element={
                  <ProtectedRoute>
                    <LinkPHBPage />
                  </ProtectedRoute>
                } /> {/* Add the route for LinkPHBPage within the account routes section */}

                {/* New Health Management Routes */}
                <Route path="account/health-goals" element={
                  <ProtectedRoute>
                    <HealthGoalsPage />
                  </ProtectedRoute>
                } />
                <Route path="account/health-records" element={
                  <ProtectedRoute>
                    <HealthRecordsPage />
                  </ProtectedRoute>
                } />
                <Route path="account/request-prescription" element={
                  <ProtectedRoute>
                    <RequestPrescriptionPage />
                  </ProtectedRoute>
                } />
                <Route path="account/nominated-pharmacy" element={
                  <ProtectedRoute>
                    <NominatedPharmacyPage />
                  </ProtectedRoute>
                } />

                <Route path="account/gp-record" element={
                  <ProtectedRoute>
                    <GPHealthRecord />
                  </ProtectedRoute>
                } />
                <Route path="account/prescriptions" element={
                  <ProtectedRoute>
                    <Prescriptions />
                  </ProtectedRoute>
                } />
                <Route path="account/appointments" element={
                  <ProtectedRoute>
                    <HospitalStatusGuard>
                      <Appointments />
                    </HospitalStatusGuard>
                  </ProtectedRoute>
                } />
                <Route path="account/appointments/book" element={
                  <ProtectedRoute>
                    <HospitalStatusGuard>
                      <BookAppointment />
                    </HospitalStatusGuard>
                  </ProtectedRoute>
                } />
                <Route path="account/appointments/view" element={
                  <ProtectedRoute>
                    <HospitalStatusGuard>
                      <ViewAppointments />
                    </HospitalStatusGuard>
                  </ProtectedRoute>
                } />
                <Route path="account/appointments/confirmation" element={
                  <ProtectedRoute>
                    <HospitalStatusGuard>
                      <AppointmentConfirmation />
                    </HospitalStatusGuard>
                  </ProtectedRoute>
                } />
                <Route path="account/appointments/:id" element={
                  <ProtectedRoute>
                    <HospitalStatusGuard>
                      <AppointmentDetail />
                    </HospitalStatusGuard>
                  </ProtectedRoute>
                } />
                <Route path="account/medical-records" element={
                  <ProtectedRoute>
                    <MedicalRecords />
                  </ProtectedRoute>
                } />
                <Route path="account/test-results" element={
                  <ProtectedRoute>
                    <TestResultsPage />
                  </ProtectedRoute>
                } />
                <Route path="account/test-results/all" element={
                  <ProtectedRoute>
                    <TestResultsPage />
                  </ProtectedRoute>
                } />
                <Route path="account/test-results/recent" element={
                  <ProtectedRoute>
                    <TestResultsPage />
                  </ProtectedRoute>
                } />
                <Route path="account/test-results/search" element={
                  <ProtectedRoute>
                    <TestResultsPage />
                  </ProtectedRoute>
                } />

                {/* About and Additional Pages */}
                <Route path="about" element={<AboutPHBPage />} />
                <Route path="elara-ai" element={<ElaraAIPage />} />
                <Route path="phb-services" element={<PHBServicesPage />} />
                <Route path="find-pharmacy" element={<FindPharmacyPage />} />
                <Route path="medical-ai-demo" element={<MedicalAIDemoPage />} />
                <Route path="link-validator" element={<LinkValidatorPage />} />
                <Route path="site-map" element={<SiteMapPage />} />
                
                {/* Test Pages */}
                <Route path="captcha-test" element={<CaptchaTestPage />} />
                <Route path="captcha-script" element={<CaptchaTestScript />} />
              </Route>

              {/* Professional layout routes */}
              <Route path="/professional" element={<ProfessionalLayout />}>
                <Route index element={<Navigate to="/professional/dashboard" replace />} />
                <Route path="dashboard" element={
                  <ProfessionalRouteGuard>
                    <ProfessionalDashboardPage />
                  </ProfessionalRouteGuard>
                } />
                <Route path="appointments" element={<ProfessionalAppointmentsPage />} />
                <Route path="appointments/reschedule/:appointmentId" element={<ProfessionalAppointmentReschedulePage />} />
                <Route path="appointments/:appointmentId" element={<ProfessionalAppointmentDetailPage />} />
                <Route path="calculators" element={<ProfessionalCalculatorsPage />} />
                <Route path="guidelines" element={<ClinicalGuidelinesPage />} />
                <Route path="doctor-resources" element={<DoctorResourcesPage />} />
                <Route path="resources" element={<ProfessionalResourcesPage />} />
                <Route path="patients" element={<PatientManagementPage />} />
                <Route path="research" element={<ProfessionalResearchPage />} />
                <Route path="forum" element={<ProfessionalForumPage />} />
                <Route path="profile" element={<ProfessionalProfilePage />} />
              </Route>

              {/* Catch all for 404 - can be replaced with a NotFoundPage component */}
              <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-center p-4">
                <div>
                  <h1 className="text-4xl font-bold text-blue-700 mb-4">Page Not Found</h1>
                  <p className="text-lg mb-6">The page you are looking for might have been removed or is temporarily unavailable.</p>
                  <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Return to Home
                  </a>
                </div>
              </div>} />
            </Routes>
          </Router>
        </OrganizationAuthProvider>
      </ProfessionalAuthProvider>
    </AuthProvider>
  );
}

export default App;
