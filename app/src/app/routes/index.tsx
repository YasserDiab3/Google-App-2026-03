/**
 * Application route tree.
 * All feature routes use React.lazy for code splitting.
 * Migrated modules replace their placeholder as each wave completes.
 */
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppShell from '@/shared/layouts/AppShell';
import { PageLoader } from '@/shared/components/PageLoader';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import ModulePlaceholder from '@/features/modules/ModulePlaceholder';

// ── Eagerly loaded (critical path) ───────────────────────────────────────────
import LoginPage from '@/features/auth/LoginPage';

// ── Lazily loaded ─────────────────────────────────────────────────────────────
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));

// Placeholder factory for unmigrated modules (Wave 2/3)
function placeholder(name: string, icon?: string) {
  return () => <ModulePlaceholder moduleName={name} icon={icon} />;
}

const IncidentsPage           = lazy(() => import('@/features/incidents/IncidentsPage'));
const NearMissPage            = lazy(() => Promise.resolve({ default: placeholder('Near Miss', 'fa-exclamation-circle') }));
const PtwPage                 = lazy(() => Promise.resolve({ default: placeholder('Permit to Work', 'fa-file-signature') }));
const TrainingPage            = lazy(() => Promise.resolve({ default: placeholder('Training', 'fa-graduation-cap') }));
const ClinicPage              = lazy(() => Promise.resolve({ default: placeholder('Clinic', 'fa-hospital') }));
const PpePage                 = lazy(() => Promise.resolve({ default: placeholder('PPE', 'fa-hard-hat') }));
const ViolationsPage          = lazy(() => Promise.resolve({ default: placeholder('Violations', 'fa-ban') }));
const EmployeesPage           = lazy(() => Promise.resolve({ default: placeholder('Employees', 'fa-users') }));
const ContractorsPage         = lazy(() => Promise.resolve({ default: placeholder('Contractors', 'fa-building') }));
const FireEquipmentPage       = lazy(() => Promise.resolve({ default: placeholder('Fire Equipment', 'fa-fire-extinguisher') }));
const DailyObservationsPage   = lazy(() => Promise.resolve({ default: placeholder('Daily Observations', 'fa-eye') }));
const IsoPage                 = lazy(() => Promise.resolve({ default: placeholder('ISO Documents', 'fa-certificate') }));
const HsePage                 = lazy(() => Promise.resolve({ default: placeholder('HSE Audit', 'fa-shield-alt') }));
const RiskAssessmentPage      = lazy(() => Promise.resolve({ default: placeholder('Risk Assessment', 'fa-chart-line') }));
const PeriodicInspectionsPage = lazy(() => Promise.resolve({ default: placeholder('Periodic Inspections', 'fa-clipboard-check') }));
const ActionTrackingPage      = lazy(() => Promise.resolve({ default: placeholder('Action Tracking', 'fa-tasks') }));
const ChangeManagementPage    = lazy(() => Promise.resolve({ default: placeholder('Change Management', 'fa-exchange-alt') }));
const SafetyHealthPage        = lazy(() => Promise.resolve({ default: placeholder('Safety & Health', 'fa-heart') }));
const SafetyBudgetPage        = lazy(() => Promise.resolve({ default: placeholder('Safety Budget', 'fa-money-bill-wave') }));
const KpisPage                = lazy(() => Promise.resolve({ default: placeholder('KPIs', 'fa-tachometer-alt') }));
const SustainabilityPage      = lazy(() => Promise.resolve({ default: placeholder('Sustainability', 'fa-leaf') }));
const ChemicalSafetyPage      = lazy(() => Promise.resolve({ default: placeholder('Chemical Safety', 'fa-flask') }));
const EmergencyPage           = lazy(() => Promise.resolve({ default: placeholder('Emergency', 'fa-ambulance') }));
const SopJhaPage              = lazy(() => Promise.resolve({ default: placeholder('SOP / JHA', 'fa-book-open') }));
const RiskMatrixPage          = lazy(() => Promise.resolve({ default: placeholder('Risk Matrix', 'fa-table') }));
const ReportsPage             = lazy(() => Promise.resolve({ default: placeholder('Reports', 'fa-chart-bar') }));
const LegalDocumentsPage      = lazy(() => Promise.resolve({ default: placeholder('Legal Documents', 'fa-gavel') }));
const IssueTrackingPage       = lazy(() => Promise.resolve({ default: placeholder('Issue Tracking', 'fa-bug') }));
const MyTasksPage             = lazy(() => Promise.resolve({ default: placeholder('My Tasks', 'fa-check-square') }));
const BehaviorMonitoringPage  = lazy(() => Promise.resolve({ default: placeholder('Behavior Monitoring', 'fa-user-check') }));
const AiAssistantPage         = lazy(() => Promise.resolve({ default: placeholder('AI Assistant', 'fa-robot') }));
const UsersPage               = lazy(() => Promise.resolve({ default: placeholder('Users', 'fa-user-cog') }));
const SettingsPage            = lazy(() => Promise.resolve({ default: placeholder('Settings', 'fa-cog') }));

function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AppShell />,
    children: [
      { index: true,                       element: <Lazy><DashboardPage /></Lazy> },
      { path: 'incidents',                 element: <Lazy><IncidentsPage /></Lazy> },
      { path: 'near-miss',                 element: <Lazy><NearMissPage /></Lazy> },
      { path: 'ptw',                       element: <Lazy><PtwPage /></Lazy> },
      { path: 'training',                  element: <Lazy><TrainingPage /></Lazy> },
      { path: 'clinic',                    element: <Lazy><ClinicPage /></Lazy> },
      { path: 'ppe',                       element: <Lazy><PpePage /></Lazy> },
      { path: 'violations',                element: <Lazy><ViolationsPage /></Lazy> },
      { path: 'employees',                 element: <Lazy><EmployeesPage /></Lazy> },
      { path: 'contractors',               element: <Lazy><ContractorsPage /></Lazy> },
      { path: 'fire-equipment',            element: <Lazy><FireEquipmentPage /></Lazy> },
      { path: 'daily-observations',        element: <Lazy><DailyObservationsPage /></Lazy> },
      { path: 'iso',                       element: <Lazy><IsoPage /></Lazy> },
      { path: 'hse',                       element: <Lazy><HsePage /></Lazy> },
      { path: 'risk-assessment',           element: <Lazy><RiskAssessmentPage /></Lazy> },
      { path: 'periodic-inspections',      element: <Lazy><PeriodicInspectionsPage /></Lazy> },
      { path: 'action-tracking',           element: <Lazy><ActionTrackingPage /></Lazy> },
      { path: 'change-management',         element: <Lazy><ChangeManagementPage /></Lazy> },
      { path: 'safety-health',             element: <Lazy><SafetyHealthPage /></Lazy> },
      { path: 'safety-budget',             element: <Lazy><SafetyBudgetPage /></Lazy> },
      { path: 'kpis',                      element: <Lazy><KpisPage /></Lazy> },
      { path: 'sustainability',            element: <Lazy><SustainabilityPage /></Lazy> },
      { path: 'chemical-safety',           element: <Lazy><ChemicalSafetyPage /></Lazy> },
      { path: 'emergency',                 element: <Lazy><EmergencyPage /></Lazy> },
      { path: 'sop-jha',                   element: <Lazy><SopJhaPage /></Lazy> },
      { path: 'risk-matrix',               element: <Lazy><RiskMatrixPage /></Lazy> },
      { path: 'reports',                   element: <Lazy><ReportsPage /></Lazy> },
      { path: 'legal-documents',           element: <Lazy><LegalDocumentsPage /></Lazy> },
      { path: 'issue-tracking',            element: <Lazy><IssueTrackingPage /></Lazy> },
      { path: 'my-tasks',                  element: <Lazy><MyTasksPage /></Lazy> },
      { path: 'behavior-monitoring',       element: <Lazy><BehaviorMonitoringPage /></Lazy> },
      { path: 'ai-assistant',              element: <Lazy><AiAssistantPage /></Lazy> },
      { path: 'users',                     element: <Lazy><UsersPage /></Lazy> },
      { path: 'settings',                  element: <Lazy><SettingsPage /></Lazy> },
      { path: '*',                         element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
