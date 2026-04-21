/**
 * Main application shell — sidebar + header + content area.
 * Responsive: sidebar is a drawer on mobile, fixed panel on desktop.
 */
import { useState, useCallback } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { isRtl } from '@/i18n';

export default function AppShell() {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const rtl = isRtl();

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand mb-4">
            <i className="fas fa-shield-alt text-2xl text-white" />
          </div>
          <p className="text-gray-500 text-sm mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50 dark:bg-gray-900" dir={rtl ? 'rtl' : 'ltr'}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-overlay bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Page content — fluid padding scales with viewport */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}
          id="main-content"
        >
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
