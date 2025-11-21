import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Debug utility
import './utils/authDebug';

// Layouts
import MainLayout from './layouts/MainLayout';
import ProfessionalLayout from './layouts/ProfessionalLayout';
import OrganizationLayout from './layouts/OrganizationLayout';
import FluentOrganizationLayout from './layouts/FluentOrganizationLayout';

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
import FluentDashboardPage from './pages/organization/FluentDashboardPage';
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
import ClinicalGuidelinesManagementPage from './pages/organization/ClinicalGuidelinesManagementPage';
import HospitalLicensesPage from './pages/organization/HospitalLicensesPage';
import { OrganizationAuthProvider } from './features/organization/organizationAuthContext';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Add this import
import ResetPasswordPage from './pages/ResetPasswordPage'; // Add this import

// Feedback Provider
// Removed FeedbackProvider since we're now using a simple mailto link instead

// Account Pages
import PersonalDetailsPage from './pages/account/PersonalDetailsPage';
import ContactPreferencesPage from './pages/account/ContactPreferencesPage';
import ContactSupportPage from './pages/account/ContactSupportPage';
import PasswordPage from './pages/account/PasswordPage';
import SecuritySettingsPage from './pages/account/SecuritySettingsPage';
import HealthGoalsPage from './pages/account/HealthGoalsPage';
import HealthRecordsPage from './pages/account/HealthRecordsPage';
import RequestPrescriptionPage from './pages/account/RequestPrescriptionPage';
import NominatedPharmacyPage from './pages/account/NominatedPharmacyPage';
import LinkPHBPage from './pages/account/LinkPHBPage'; // Add the import with other account page imports
import WomensHealthDashboardEnhanced from './pages/account/WomensHealthDashboardEnhanced';
import DailyHealthLog from './pages/account/womens-health/DailyHealthLog';
import CycleCalendar from './pages/account/womens-health/CycleCalendar';
import PregnancyTracker from './pages/account/womens-health/PregnancyTracker';
import PregnancyJourneyEnhanced from './pages/account/womens-health/PregnancyJourneyEnhanced';
import FertilityTracker from './pages/account/womens-health/FertilityTracker';
import HealthGoals from './pages/account/womens-health/HealthGoals';

// Tool Pages
import HealthAssessmentsPage from './pages/tools/HealthAssessmentsPage';
import HealthAssessmentBMICalculatorPage from './pages/HealthAssessmentBMICalculatorPage';
import HealthAssessmentToolsPage from './pages/HealthAssessmentToolsPage'; // New import

// Assessment Pages
import HealthCheckAssessment from './pages/tools/assessments/HealthCheckAssessment';
import MentalWellbeingAssessment from './pages/tools/assessments/MentalWellbeingAssessment';
import HeartDiseaseRiskAssessment from './pages/tools/assessments/HeartDiseaseRiskAssessment';
import DiabetesRiskAssessment from './pages/tools/assessments/DiabetesRiskAssessment';
import SleepQualityAssessment from './pages/tools/assessments/SleepQualityAssessment';
import NutritionAssessment from './pages/tools/assessments/NutritionAssessment';
import DepressionScreeningAssessment from './pages/tools/assessments/DepressionScreeningAssessment';
import AnxietyScreeningAssessment from './pages/tools/assessments/AnxietyScreeningAssessment';

// Pages
import HomePage from './pages/HomePage';
import HealthAZPage from './pages/HealthAZPage';
import HealthConditionPage from './pages/HealthConditionPage';
import ConditionsPage from './pages/ConditionsPage';
import MedicinesAZPage from './pages/MedicinesAZPage';
import MedicineDetailPage from './pages/MedicineDetailPage';
import LiveWellPage from './pages/LiveWellPage';
// Live Well Pages
import HealthyEatingPage from './pages/live-well/HealthyEatingPage';
import MealPlansPage from './pages/live-well/healthy-eating/MealPlansPage';
import ExercisePage from './pages/live-well/ExercisePage';
import MentalWellbeingPage from './pages/live-well/MentalWellbeingPage';
import SleepPage from './pages/live-well/SleepPage';
import QuitSmokingPage from './pages/live-well/QuitSmokingPage';
import AlcoholPage from './pages/live-well/AlcoholPage';
import LiveWellSexualHealthPage from './pages/live-well/SexualHealthPage';
import HealthyWeightPage from './pages/live-well/HealthyWeightPage';
import FiveWeekWorkoutPlanPage from './pages/live-well/exercise/FiveWeekWorkoutPlanPage';
import BudgetMealPlanningPage from './pages/live-well/healthy-eating/BudgetMealPlanningPage';
import BetterSleepTechniquesPage from './pages/live-well/sleep/BetterSleepTechniquesPage';
import CalorieCalculatorPage from './pages/tools/CalorieCalculatorPage';
import OlderPeoplePage from './pages/care-and-support/OlderPeoplePage';
import DementiaPage from './pages/care-and-support/DementiaPage';
import CarersBenefitsPage from './pages/care-and-support/CarersBenefitsPage';
import FindServicesPage from './pages/FindServicesPage';
import HospitalDischargePage from './pages/care-and-support/HospitalDischargePage';
import CarersPage from './pages/care-and-support/CarersPage';
import EndOfLifePage from './pages/care-and-support/EndOfLifePage';
import DisabilitiesPage from './pages/care-and-support/DisabilitiesPage';
import AssessmentPage from './pages/care-and-support/AssessmentPage';
import CarersAssessmentPage from './pages/care-and-support/CarersAssessmentPage';
import FinancialHelpPage from './pages/care-and-support/FinancialHelpPage';
import BehavioralSupportPage from './pages/live-well/quit-smoking/BehavioralSupportPage';
import NicotineReplacementPage from './pages/live-well/quit-smoking/NicotineReplacementPage';
import PrescriptionMedicationsPage from './pages/live-well/quit-smoking/PrescriptionMedicationsPage';
import CopingStrategiesPage from './pages/live-well/quit-smoking/CopingStrategiesPage';
import HealthBenefitsPage from './pages/live-well/quit-smoking/HealthBenefitsPage';
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
import PrescriptionRequestsPage from './pages/professional/PrescriptionRequestsPage';
import PrescriptionTriagePage from './pages/professional/PrescriptionTriagePage';
import PharmacyPrescriptionsPage from './pages/professional/PharmacyPrescriptionsPage';

// Practice Pages
import MyPracticePageDashboard from './pages/professional/MyPracticePageDashboard';
import { CreatePracticePageWizard } from './components/professional/CreatePracticePageWizard';
import PracticePagePreview from './pages/professional/PracticePagePreview';
import EditPracticePageForm from './pages/professional/EditPracticePageForm';
import PharmacyResourcesPage from './pages/professional/PharmacyResourcesPage';
import { PracticePageView } from './pages/public/PracticePageView';
import { PracticePageDirectory } from './pages/public/PracticePageDirectory';

// Registry Pages
import RegistryLandingPage from './pages/registry/RegistryLandingPage';
import RegistrySearchPage from './pages/registry/RegistrySearchPage';
import RegistryProfessionalProfilePage from './pages/registry/ProfessionalProfilePage';
import ApplyPage from './pages/registry/ApplyPage';
import ApplicationSuccessPage from './pages/registry/ApplicationSuccessPage';
import RegistryDashboardPage from './pages/registry/RegistryDashboardPage';
import ApplicationDetailPage from './pages/registry/ApplicationDetailPageRedesigned';

// Features
import { AuthProvider, useAuth } from './features/auth/authContext';
import { ProfessionalAuthProvider, useProfessionalAuth } from './features/professional/professionalAuthContext';
import { useOrganizationAuth } from './features/organization/organizationAuthContext';
import GPHealthRecord from './features/health/GPHealthRecord';
import Prescriptions from './features/health/Prescriptions';
import PharmacyVerification from './features/health/PharmacyVerification';
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
import ApplyForGHICPage from './pages/using-the-phb/healthcare-abroad/ApplyForGHICPage';
import EmergencyServicesPage from './pages/EmergencyServicesPage';
import VaccinationSafetyPage from './pages/vaccinations/VaccinationSafetyPage';
import Covid19ConditionsPage from './pages/conditions/Covid19ConditionsPage';
import NewParentMentalHealthPage from './pages/mental-health/NewParentMentalHealthPage';
import PHBFamilyHealthPage from './pages/using-the-phb/PHBFamilyHealthPage';
import ProductSafetyRecallsPage from './pages/ProductSafetyRecallsPage';
import WomensHealthPage from './pages/womens-health/WomensHealthPage';
import ContraceptionPage from './pages/contraception/ContraceptionPage';
import BabyHealthPage from './pages/conditions/BabyHealthPage';
import NewbornPage from './pages/conditions/baby/NewbornPage';
import FeedingPage from './pages/conditions/baby/FeedingPage';
import BabySleepPage from './pages/conditions/baby/SleepPage';
import CryingPage from './pages/conditions/baby/CryingPage';
import DevelopmentPage from './pages/conditions/baby/DevelopmentPage';
import IllnessPage from './pages/conditions/baby/IllnessPage';
import SafetyPage from './pages/conditions/baby/SafetyPage';
import SkinPage from './pages/conditions/baby/SkinPage';
import HealthChecksPage from './pages/conditions/baby/HealthChecksPage';

// Women's Health Pages
import PeriodsPage from './pages/womens-health/PeriodsPage';
import MenopausePage from './pages/womens-health/MenopausePage';
import PrematureMenopausePage from './pages/womens-health/menopause/PrematureMenopausePage';
import HRTPage from './pages/womens-health/menopause/treatments/HRTPage';
import NonHormonalPage from './pages/womens-health/menopause/treatments/NonHormonalPage';
import LifestyleTreatmentPage from './pages/womens-health/menopause/treatments/LifestylePage';
import ComplementaryPage from './pages/womens-health/menopause/treatments/ComplementaryPage';
import PerinatalMentalHealthPage from './pages/womens-health/mental-health/PerinatalMentalHealthPage';
import PremenstrualDisordersPage from './pages/womens-health/mental-health/PremenstrualDisordersPage';
import WomensEatingDisordersPage from './pages/womens-health/mental-health/EatingDisordersPage';
import AnxietyDepressionPage from './pages/womens-health/mental-health/AnxietyDepressionPage';
import BreastHealthPage from './pages/womens-health/BreastHealthPage';
import SexualHealthPage from './pages/womens-health/SexualHealthPage';

// Sexual Health STI Pages
import ChlamydiaPage from './pages/womens-health/sexual-health/stis/ChlamydiaPage';
import GonorrheaPage from './pages/womens-health/sexual-health/stis/GonorrheaPage';
import GenitalHerpesPage from './pages/womens-health/sexual-health/stis/GenitalHerpesPage';
import GenitalWartsPage from './pages/womens-health/sexual-health/stis/GenitalWartsPage';
import TrichomoniasisPage from './pages/womens-health/sexual-health/stis/TrichomoniasisPage';
import SyphilisPage from './pages/womens-health/sexual-health/stis/SyphilisPage';
import HIVPage from './pages/womens-health/sexual-health/stis/HIVPage';

// Sexual Health Problems Pages
import PainDuringSexPage from './pages/womens-health/sexual-health/problems/PainDuringSexPage';
import LossOfDesirePage from './pages/womens-health/sexual-health/problems/LossOfDesirePage';
import DifficultyOrgasmPage from './pages/womens-health/sexual-health/problems/DifficultyOrgasmPage';
import VaginismusPage from './pages/womens-health/sexual-health/problems/VaginismusPage';

// Breast Health Pages
import BreastCancerPage from './pages/womens-health/breast-health/BreastCancerPage';
import BenignLumpsPage from './pages/womens-health/breast-health/BenignLumpsPage';
import MastitisPage from './pages/womens-health/breast-health/MastitisPage';
import BreastPainPage from './pages/womens-health/breast-health/BreastPainPage';
import BreastScreeningPage from './pages/womens-health/breast-health/ScreeningPage';
import BreastRiskAssessmentPage from './pages/womens-health/breast-health/RiskAssessmentPage';

import FertilityPage from './pages/womens-health/FertilityPage';
import AgeAndFertilityPage from './pages/womens-health/fertility/AgeAndFertilityPage';

// Fertility Problems Pages
import OvulationDisordersPage from './pages/womens-health/fertility/problems/OvulationDisordersPage';
import TubalDamagePage from './pages/womens-health/fertility/problems/TubalDamagePage';
import EndometriosisFertilityPage from './pages/womens-health/fertility/problems/EndometriosisFertilityPage';
import UterineFibroidsPage from './pages/womens-health/fertility/problems/UterineFibroidsPage';
import UnexplainedInfertilityPage from './pages/womens-health/fertility/problems/UnexplainedInfertilityPage';

// Fertility Treatments Pages
import FertilityMedicationPage from './pages/womens-health/fertility/treatments/MedicationPage';
import FertilitySurgeryPage from './pages/womens-health/fertility/treatments/SurgeryPage';
import IUIPage from './pages/womens-health/fertility/treatments/IUIPage';
import IVFPage from './pages/womens-health/fertility/treatments/IVFPage';
import ICSIPage from './pages/womens-health/fertility/treatments/ICSIPage';
import DonorPage from './pages/womens-health/fertility/treatments/DonorPage';
import SurrogacyPage from './pages/womens-health/fertility/treatments/SurrogacyPage';

// Find Support
import FertilitySupportPage from './pages/find-support/FertilitySupportPage';

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
import ManagingAppointmentsPage from './pages/help/appointments/ManagingAppointmentsPage';
import AppointmentTypesPage from './pages/help/appointments/AppointmentTypesPage';
import PrepareForAppointmentPage from './pages/help/appointments/PrepareForAppointmentPage';
import TechnicalIssuesPage from './pages/help/appointments/TechnicalIssuesPage';
import HelpPage from './pages/help/HelpPage'; // New import for HelpPage
import FindPhbNumberPage from './pages/help/FindPhbNumberPage';
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

// Services Pages
import ServicesPage from './pages/ServicesPage';
import TalkingTherapiesPage from './pages/services/TalkingTherapiesPage';
import MentalHealthSupportPage from './pages/services/MentalHealthSupportPage';

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
  const { isAuthenticated, needsOnboarding, isLoading } = useAuth();

  console.log('🔒 ProtectedRoute: isLoading:', isLoading);
  console.log('🔒 ProtectedRoute: isAuthenticated:', isAuthenticated);
  console.log('🔒 ProtectedRoute: needsOnboarding:', needsOnboarding);

  // Show loading state while auth is initializing
  if (isLoading) {
    console.log('🔒 ProtectedRoute: Showing loading state');
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🔒 ProtectedRoute: Redirecting to login (not authenticated)');
    return <Navigate to="/login" replace />;
  }

  if (needsOnboarding) {
    console.log('🔒 ProtectedRoute: Redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  console.log('🔒 ProtectedRoute: Allowing access to protected route');
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

              {/* Pharmacy Verification - Public Tool */}
              <Route path="pharmacy-verification" element={<PharmacyVerification />} />

              {/* Organization layout routes */}
              <Route path="/organization" element={<FluentOrganizationLayout />}>
                <Route path="dashboard" element={
                  <OrganizationRouteGuard>
                    <FluentDashboardPage />
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
                <Route path="clinical-guidelines" element={
                  <OrganizationRouteGuard>
                    <ClinicalGuidelinesManagementPage />
                  </OrganizationRouteGuard>
                } />
                <Route path="licenses" element={
                  <OrganizationRouteGuard>
                    <HospitalLicensesPage />
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
                <Route path="conditions" element={<ConditionsPage />} />
                <Route path="conditions/covid-19" element={<Covid19ConditionsPage />} />
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
                <Route path="live-well/healthy-eating/budget-meal-planning" element={<BudgetMealPlanningPage />} />
                <Route path="live-well/exercise" element={<ExercisePage />} />
                <Route path="live-well/exercise/5-week-workout-plan" element={<FiveWeekWorkoutPlanPage />} />
                <Route path="live-well/mental-wellbeing" element={<MentalWellbeingPage />} />
                <Route path="live-well/mental-health" element={<MentalWellbeingPage />} />
                <Route path="live-well/sleep" element={<SleepPage />} />
                <Route path="live-well/sleep/better-sleep-techniques" element={<BetterSleepTechniquesPage />} />
                <Route path="live-well/sexual-health" element={<LiveWellSexualHealthPage />} />
                <Route path="live-well/healthy-weight" element={<HealthyWeightPage />} />
                <Route path="live-well/quit-smoking" element={<QuitSmokingPage />} />
                <Route path="live-well/alcohol" element={<AlcoholPage />} />
                <Route path="live-well/quit-smoking/behavioral-support" element={<BehavioralSupportPage />} />
                <Route path="live-well/quit-smoking/nicotine-replacement" element={<NicotineReplacementPage />} />
                <Route path="live-well/quit-smoking/prescription-medications" element={<PrescriptionMedicationsPage />} />
                <Route path="live-well/quit-smoking/coping-strategies" element={<CopingStrategiesPage />} />
                <Route path="live-well/quit-smoking/health-benefits" element={<HealthBenefitsPage />} />

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
                <Route path="mental-health/new-parents" element={<NewParentMentalHealthPage />} />

                {/* Services Routes */}
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/talking-therapies" element={<TalkingTherapiesPage />} />
                <Route path="services/mental-health-support" element={<MentalHealthSupportPage />} />
                <Route path="care-and-support" element={<CareAndSupportPage />} />
                <Route path="care-and-support/older-people" element={<OlderPeoplePage />} />
                <Route path="care-and-support/dementia" element={<DementiaPage />} />
                <Route path="care-and-support/carers-benefits" element={<CarersBenefitsPage />} />
            <Route path="care-and-support/hospital-discharge" element={<HospitalDischargePage />} />
            <Route path="care-and-support/carers" element={<CarersPage />} />
            <Route path="care-and-support/end-of-life" element={<EndOfLifePage />} />
            <Route path="care-and-support/disabilities" element={<DisabilitiesPage />} />
            <Route path="care-and-support/assessment" element={<AssessmentPage />} />
            <Route path="care-and-support/carers-assessment" element={<CarersAssessmentPage />} />
            <Route path="care-and-support/financial-help" element={<FinancialHelpPage />} />

                {/* Find Support Routes */}
                <Route path="find-support/fertility" element={<FertilitySupportPage />} />

                {/* Help Routes */}
                <Route path="help" element={<HelpPage />} /> {/* New Help Route */}
                <Route path="help/find-phb-number" element={<FindPhbNumberPage />} />
                <Route path="help/appointments/how-to-book" element={<HowToBookPage />} />
                <Route path="help/appointments/managing" element={<ManagingAppointmentsPage />} />
                <Route path="help/appointments/types" element={<AppointmentTypesPage />} />
                <Route path="help/appointments/prepare" element={<PrepareForAppointmentPage />} />
                <Route path="help/appointments/technical-issues" element={<TechnicalIssuesPage />} />
                <Route path="help/prescriptions/how-to-request" element={<HowToRequestPage />} />
                <Route path="help/prescriptions/urgent-requests" element={<UrgentRequestsPage />} />
                <Route path="help/prescriptions/how-nominations-work" element={<HowNominationsWorkPage />} />

                {/* Women's Health Pages */}
                <Route path="womens-health" element={<WomensHealthPage />} />
                <Route path="womens-health/periods" element={<PeriodsPage />} />
                <Route path="womens-health/menopause" element={<MenopausePage />} />
                <Route path="womens-health/menopause/premature-menopause" element={<PrematureMenopausePage />} />
                <Route path="womens-health/menopause/treatments/hrt" element={<HRTPage />} />
                <Route path="womens-health/menopause/treatments/non-hormonal" element={<NonHormonalPage />} />
                <Route path="womens-health/menopause/treatments/lifestyle" element={<LifestyleTreatmentPage />} />
                <Route path="womens-health/menopause/treatments/complementary" element={<ComplementaryPage />} />
                <Route path="womens-health/breast-health" element={<BreastHealthPage />} />

                {/* Breast Health Pages */}
                <Route path="womens-health/breast-health/breast-cancer" element={<BreastCancerPage />} />
                <Route path="womens-health/breast-health/benign-lumps" element={<BenignLumpsPage />} />
                <Route path="womens-health/breast-health/mastitis" element={<MastitisPage />} />
                <Route path="womens-health/breast-health/breast-pain" element={<BreastPainPage />} />
                <Route path="womens-health/breast-health/screening" element={<BreastScreeningPage />} />
                <Route path="womens-health/breast-health/risk-assessment" element={<BreastRiskAssessmentPage />} />

                <Route path="womens-health/sexual-health" element={<SexualHealthPage />} />

                {/* Sexual Health STI Pages */}
                <Route path="womens-health/sexual-health/stis/chlamydia" element={<ChlamydiaPage />} />
                <Route path="womens-health/sexual-health/stis/gonorrhea" element={<GonorrheaPage />} />
                <Route path="womens-health/sexual-health/stis/genital-herpes" element={<GenitalHerpesPage />} />
                <Route path="womens-health/sexual-health/stis/genital-warts" element={<GenitalWartsPage />} />
                <Route path="womens-health/sexual-health/stis/trichomoniasis" element={<TrichomoniasisPage />} />
                <Route path="womens-health/sexual-health/stis/syphilis" element={<SyphilisPage />} />
                <Route path="womens-health/sexual-health/stis/hiv" element={<HIVPage />} />

                {/* Sexual Health Problems Pages */}
                <Route path="womens-health/sexual-health/problems/pain-during-sex" element={<PainDuringSexPage />} />
                <Route path="womens-health/sexual-health/problems/loss-of-desire" element={<LossOfDesirePage />} />
                <Route path="womens-health/sexual-health/problems/difficulty-orgasm" element={<DifficultyOrgasmPage />} />
                <Route path="womens-health/sexual-health/problems/vaginismus" element={<VaginismusPage />} />

                <Route path="womens-health/fertility" element={<FertilityPage />} />
                <Route path="womens-health/fertility/age-and-fertility" element={<AgeAndFertilityPage />} />

                {/* Fertility Problems Pages */}
                <Route path="womens-health/fertility/problems/ovulation-disorders" element={<OvulationDisordersPage />} />
                <Route path="womens-health/fertility/problems/tubal-damage" element={<TubalDamagePage />} />
                <Route path="womens-health/fertility/problems/endometriosis" element={<EndometriosisFertilityPage />} />
                <Route path="womens-health/fertility/problems/uterine-fibroids" element={<UterineFibroidsPage />} />
                <Route path="womens-health/fertility/problems/unexplained-infertility" element={<UnexplainedInfertilityPage />} />

                {/* Fertility Treatments Pages */}
                <Route path="womens-health/fertility/treatments/medication" element={<FertilityMedicationPage />} />
                <Route path="womens-health/fertility/treatments/surgery" element={<FertilitySurgeryPage />} />
                <Route path="womens-health/fertility/treatments/iui" element={<IUIPage />} />
                <Route path="womens-health/fertility/treatments/ivf" element={<IVFPage />} />
                <Route path="womens-health/fertility/treatments/icsi" element={<ICSIPage />} />
                <Route path="womens-health/fertility/treatments/donor" element={<DonorPage />} />
                <Route path="womens-health/fertility/treatments/surrogacy" element={<SurrogacyPage />} />

                <Route path="womens-health/mental-health" element={<WomensMentalHealthPage />} />
                <Route path="womens-health/mental-health/perinatal" element={<PerinatalMentalHealthPage />} />
                <Route path="womens-health/mental-health/premenstrual-disorders" element={<PremenstrualDisordersPage />} />
                <Route path="womens-health/mental-health/eating-disorders" element={<WomensEatingDisordersPage />} />
                <Route path="womens-health/mental-health/anxiety-depression" element={<AnxietyDepressionPage />} />
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
                <Route path="tools/calorie-calculator" element={<CalorieCalculatorPage />} />
                <Route path="tools/due-date-calculator" element={<DueDateCalculatorPage />} />
                <Route path="tools/kick-counter" element={<KickCounterPage />} />
                <Route path="tools/contraction-timer" element={<ContractionTimerPage />} />
                <Route path="tools/weight-gain-calculator" element={<WeightGainCalculatorPage />} />
                <Route path="tools/health-assessments" element={<HealthAssessmentsPage />} />

                {/* Health Assessment Routes */}
                <Route path="tools/health-assessments/health-check" element={<HealthCheckAssessment />} />
                <Route path="tools/health-assessments/mental-wellbeing" element={<MentalWellbeingAssessment />} />
                <Route path="tools/mental-wellbeing-assessment" element={<MentalWellbeingAssessment />} />
                <Route path="tools/health-assessments/heart-disease-risk" element={<HeartDiseaseRiskAssessment />} />
                <Route path="tools/health-assessments/diabetes-risk" element={<DiabetesRiskAssessment />} />
                <Route path="tools/health-assessments/sleep-quality" element={<SleepQualityAssessment />} />
                <Route path="tools/health-assessments/nutrition" element={<NutritionAssessment />} />
                <Route path="tools/health-assessments/depression-screening" element={<DepressionScreeningAssessment />} />
                <Route path="tools/health-assessments/anxiety-screening" element={<AnxietyScreeningAssessment />} />

                {/* New Routes for Vaccinations and Health Pages */}
                <Route path="vaccinations" element={<VaccinationsPage />} />
                <Route path="vaccinations/flu-vaccine" element={<FluVaccinePage />} />
                <Route path="vaccinations/covid-19-vaccine" element={<Covid19VaccinePage />} />
                <Route path="vaccinations/adults" element={<AdultVaccinePage />} />
                <Route path="vaccinations/children" element={<ChildrenVaccinePage />} />
                <Route path="vaccinations/pregnancy" element={<PregnancyVaccinePage />} />
                <Route path="vaccinations/travel" element={<TravelVaccinePage />} />
                <Route path="vaccinations/safety" element={<VaccinationSafetyPage />} />
                <Route path="using-the-phb/healthcare-abroad" element={<HealthcareAbroadPage />} />
                <Route path="using-the-phb/healthcare-abroad/nigerian-travel-health" element={<GHICPage />} />
                <Route path="using-the-phb/healthcare-abroad/apply-for-ghic" element={<ApplyForGHICPage />} />
                <Route path="using-the-phb/family-health" element={<PHBFamilyHealthPage />} />
                <Route path="conditions/baby" element={<BabyHealthPage />} />
                <Route path="conditions/baby/newborn" element={<NewbornPage />} />
                <Route path="conditions/baby/feeding" element={<FeedingPage />} />
                <Route path="conditions/baby/sleep" element={<BabySleepPage />} />
                <Route path="conditions/baby/crying" element={<CryingPage />} />
                <Route path="conditions/baby/development" element={<DevelopmentPage />} />
                <Route path="conditions/baby/illness" element={<IllnessPage />} />
                <Route path="conditions/baby/safety" element={<SafetyPage />} />
                <Route path="conditions/baby/skin" element={<SkinPage />} />
                <Route path="conditions/baby/health-checks" element={<HealthChecksPage />} />

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
                <Route path="account/contact-support" element={
                  <ProtectedRoute>
                    <ContactSupportPage />
                  </ProtectedRoute>
                } />
                <Route path="account/password" element={
                  <ProtectedRoute>
                    <PasswordPage />
                  </ProtectedRoute>
                } />
                <Route path="account/security" element={
                  <ProtectedRoute>
                    <SecuritySettingsPage />
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
                <Route path="account/womens-health" element={
                  <ProtectedRoute>
                    <WomensHealthDashboardEnhanced />
                  </ProtectedRoute>
                } />
                <Route path="account/womens-health/daily-log" element={
                  <ProtectedRoute>
                    <DailyHealthLog />
                  </ProtectedRoute>
                } />
                <Route path="account/womens-health/cycle-calendar" element={
                  <ProtectedRoute>
                    <CycleCalendar />
                  </ProtectedRoute>
                } />
                <Route path="account/womens-health/pregnancy/tracker" element={
                  <ProtectedRoute>
                    <PregnancyTracker />
                  </ProtectedRoute>
                } />
                <Route path="account/womens-health/pregnancy/journey" element={
                  <ProtectedRoute>
                    <PregnancyJourneyEnhanced />
                  </ProtectedRoute>
                } />
                <Route path="account/womens-health/fertility" element={
                  <ProtectedRoute>
                    <FertilityTracker />
                  </ProtectedRoute>
                } />
                <Route path="account/womens-health/goals" element={
                  <ProtectedRoute>
                    <HealthGoals />
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
                <Route path="find-services" element={<FindServicesPage />} />
                <Route path="find-pharmacy" element={<FindPharmacyPage />} />
                <Route path="emergency-services" element={<EmergencyServicesPage />} />
                <Route path="product-safety-recalls" element={<ProductSafetyRecallsPage />} />
                <Route path="medical-ai-demo" element={<MedicalAIDemoPage />} />
                <Route path="link-validator" element={<LinkValidatorPage />} />
                <Route path="site-map" element={<SiteMapPage />} />
                
                {/* Test Pages */}
                <Route path="captcha-test" element={<CaptchaTestPage />} />
                <Route path="captcha-script" element={<CaptchaTestScript />} />

                {/* Registry Routes - Professional Registration System */}
                <Route path="registry" element={<RegistryLandingPage />} />
                <Route path="registry/search" element={<RegistrySearchPage />} />
                <Route path="registry/apply" element={<ApplyPage />} />
                <Route path="registry/application-success" element={<ApplicationSuccessPage />} />
                <Route path="registry/dashboard" element={
                  <ProtectedRoute>
                    <RegistryDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="registry/applications/:applicationId" element={
                  <ProtectedRoute>
                    <ApplicationDetailPage />
                  </ProtectedRoute>
                } />

                {/* Practice Pages - Public Directory */}
                <Route path="practice-pages" element={<PracticePageDirectory />} />
                <Route path="practice-pages/:slug" element={<PracticePageView />} />
              </Route>

              {/* Standalone Public Registry Routes (No Layout) */}
              <Route path="/registry/professional/:id" element={<RegistryProfessionalProfilePage />} />

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
                <Route path="prescriptions" element={<PrescriptionRequestsPage />} />
                <Route path="prescriptions/triage" element={<PrescriptionTriagePage />} />
                <Route path="prescriptions/pharmacy" element={<PharmacyPrescriptionsPage />} />
                <Route path="calculators" element={<ProfessionalCalculatorsPage />} />
                <Route path="guidelines" element={<ClinicalGuidelinesPage />} />
                <Route path="resources" element={<DoctorResourcesPage />} />
                <Route path="patients" element={<PatientManagementPage />} />
                <Route path="research" element={<ProfessionalResearchPage />} />
                <Route path="forum" element={<ProfessionalForumPage />} />
                <Route path="profile" element={<ProfessionalProfilePage />} />
                <Route path="practice-page" element={<MyPracticePageDashboard />} />
                <Route path="practice-page/create" element={<CreatePracticePageWizard />} />
                <Route path="practice-page/edit" element={<EditPracticePageForm />} />
                <Route path="practice-page/preview" element={<PracticePagePreview />} />
                <Route path="pharmacy-resources" element={<PharmacyResourcesPage />} />
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
