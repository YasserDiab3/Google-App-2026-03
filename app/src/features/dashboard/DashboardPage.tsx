/**
 * Dashboard route — performance-optimised, fully typed, responsive.
 * Uses React.lazy + Suspense for non-critical widgets.
 * Data is fetched via TanStack Query with a 5-min stale time.
 */
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import KpiSection from './components/KpiSection';

import { lazy } from 'react';

// Deferred non-critical widgets (loaded after main KPI paints)
const TasksWidget     = lazy(() => import('./components/TasksWidget'));
const ActivityWidget  = lazy(() => import('./components/ActivityWidget'));

function WidgetSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-5 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('nav.dashboard')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {t('dashboard.overview')}
          </p>
        </div>
      </div>

      {/* KPI Cards — critical path, loaded immediately */}
      <ErrorBoundary>
        <KpiSection />
      </ErrorBoundary>

      {/* Secondary widgets — deferred */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ErrorBoundary>
          <Suspense fallback={<WidgetSkeleton />}>
            <TasksWidget />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<WidgetSkeleton />}>
            <ActivityWidget />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
