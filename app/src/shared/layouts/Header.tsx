import { useAuth } from '@/features/auth/AuthContext';
import { setLocale, getCurrentLocale } from '@/i18n';
import type { SupportedLocale } from '@/api/types';
import clsx from 'clsx';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useAuth();
  const locale = getCurrentLocale();

  const handleLocaleSwitch = () => {
    const next: SupportedLocale = locale === 'ar' ? 'en' : 'ar';
    setLocale(next);
  };

  const handleThemeToggle = () => {
    const current = document.documentElement.getAttribute('data-theme') ?? 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-sticky bg-white dark:bg-gray-800',
        'border-b border-gray-200 dark:border-gray-700',
        'flex items-center gap-2 md:gap-3 px-4 lg:px-6',
        // h-header = 64px from spacing token; flex-shrink-0 prevents collapse
        'h-header flex-shrink-0',
      )}
    >
      {/* Hamburger (mobile/tablet) */}
      <button
        onClick={onToggleSidebar}
        className="btn-icon btn-ghost lg:hidden text-gray-500 dark:text-gray-400"
        aria-label="Toggle sidebar"
      >
        <i className="fas fa-bars text-lg" />
      </button>

      {/* Page title slot */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <button
          onClick={handleLocaleSwitch}
          className="btn btn-outline btn-sm hidden xs:flex"
          aria-label="Switch language"
        >
          {locale === 'ar' ? 'EN' : 'عربي'}
        </button>

        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
          className="btn-icon btn-ghost text-gray-500 dark:text-gray-400"
          aria-label="Toggle theme"
        >
          <i className="fas fa-moon dark:hidden text-base" />
          <i className="fas fa-sun hidden dark:inline text-base" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
                       text-white text-sm font-semibold flex-shrink-0"
          >
            {(user?.name ?? user?.email ?? 'U').charAt(0).toUpperCase()}
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
            {user?.name ?? user?.email}
          </span>
        </div>
      </div>
    </header>
  );
}
