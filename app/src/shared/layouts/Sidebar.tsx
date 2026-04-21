import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { isRtl } from '@/i18n';
import clsx from 'clsx';

interface NavItem {
  key: string;
  path: string;
  icon: string;
  label: string;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard',           path: '/',                   icon: 'fa-home' },
  { key: 'incidents',           path: '/incidents',          icon: 'fa-exclamation-triangle' },
  { key: 'nearMiss',            path: '/near-miss',          icon: 'fa-exclamation-circle' },
  { key: 'ptw',                 path: '/ptw',                icon: 'fa-file-signature' },
  { key: 'training',            path: '/training',           icon: 'fa-graduation-cap' },
  { key: 'clinic',              path: '/clinic',             icon: 'fa-hospital' },
  { key: 'ppe',                 path: '/ppe',                icon: 'fa-hard-hat' },
  { key: 'violations',          path: '/violations',         icon: 'fa-ban' },
  { key: 'employees',           path: '/employees',          icon: 'fa-users' },
  { key: 'contractors',         path: '/contractors',        icon: 'fa-building' },
  { key: 'fireEquipment',       path: '/fire-equipment',     icon: 'fa-fire-extinguisher' },
  { key: 'dailyObservations',   path: '/daily-observations', icon: 'fa-eye' },
  { key: 'iso',                 path: '/iso',                icon: 'fa-certificate' },
  { key: 'hse',                 path: '/hse',                icon: 'fa-shield-alt' },
  { key: 'riskAssessment',      path: '/risk-assessment',    icon: 'fa-chart-line' },
  { key: 'periodicInspections', path: '/periodic-inspections', icon: 'fa-clipboard-check' },
  { key: 'actionTracking',      path: '/action-tracking',   icon: 'fa-tasks' },
  { key: 'changeManagement',    path: '/change-management', icon: 'fa-exchange-alt' },
  { key: 'safetyHealth',        path: '/safety-health',     icon: 'fa-heart' },
  { key: 'safetyBudget',        path: '/safety-budget',     icon: 'fa-money-bill-wave' },
  { key: 'kpis',                path: '/kpis',              icon: 'fa-tachometer-alt' },
  { key: 'sustainability',      path: '/sustainability',    icon: 'fa-leaf' },
  { key: 'chemicalSafety',      path: '/chemical-safety',  icon: 'fa-flask' },
  { key: 'emergency',           path: '/emergency',        icon: 'fa-ambulance' },
  { key: 'sopJha',              path: '/sop-jha',          icon: 'fa-book-open' },
  { key: 'riskMatrix',          path: '/risk-matrix',      icon: 'fa-table' },
  { key: 'reports',             path: '/reports',          icon: 'fa-chart-bar' },
  { key: 'legalDocuments',      path: '/legal-documents',  icon: 'fa-gavel' },
  { key: 'issueTracking',       path: '/issue-tracking',   icon: 'fa-bug' },
  { key: 'usertasks',           path: '/my-tasks',         icon: 'fa-check-square' },
  { key: 'behaviorMonitoring',  path: '/behavior-monitoring', icon: 'fa-user-check' },
  { key: 'aiAssistant',         path: '/ai-assistant',     icon: 'fa-robot' },
  { key: 'users',               path: '/users',            icon: 'fa-user-cog', adminOnly: true },
  { key: 'settings',            path: '/settings',         icon: 'fa-cog' },
] as NavItem[];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const rtl = isRtl();

  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <aside
      className={clsx(
        // Layout: fixed on mobile (drawer), relative on desktop
        'fixed lg:relative z-overlay lg:z-auto',
        'h-[100dvh] flex flex-col flex-shrink-0',
        'bg-gradient-to-b from-brand via-brand-mid to-brand',
        // Width via Tailwind token (maps to 280px from tailwind.config.js)
        'w-sidebar min-w-[240px]',
        'transition-transform duration-300 ease-out',
        // Mobile: slide in/out from the correct edge based on dir
        rtl
          ? isOpen ? 'translate-x-0 right-0' : 'translate-x-full right-0'
          : isOpen ? 'translate-x-0 left-0' : '-translate-x-full left-0',
        // Desktop: always visible, no translate
        'lg:translate-x-0 lg:right-auto lg:left-auto',
      )}
      aria-label={t('nav.dashboard')}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-shield-alt text-white text-lg" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm truncate">HSE System</p>
          <p className="text-white/60 text-xs truncate">{user?.name ?? user?.email}</p>
        </div>
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="ms-auto lg:hidden text-white/70 hover:text-white p-1"
          aria-label="Close sidebar"
        >
          <i className="fas fa-times" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-white/20">
        {visibleItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            end={item.path === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-colors text-sm font-medium',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              )
            }
          >
            <i className={clsx('fas', item.icon, 'w-5 text-center flex-shrink-0')} />
            <span className="truncate">{t(`nav.${item.key}`)}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
                     text-white/70 hover:bg-red-500/20 hover:text-white
                     transition-colors text-sm font-medium"
        >
          <i className="fas fa-sign-out-alt w-5 text-center flex-shrink-0" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </aside>
  );
}
