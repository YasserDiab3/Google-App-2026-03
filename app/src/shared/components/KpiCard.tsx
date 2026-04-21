import clsx from 'clsx';

export type KpiVariant = 'primary' | 'danger' | 'warning' | 'success' | 'info' | 'purple';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  variant?: KpiVariant;
  trend?: { direction: 'up' | 'down' | 'neutral'; value: string };
  loading?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<KpiVariant, { bg: string; icon: string; text: string }> = {
  primary: { bg: 'bg-primary/10 dark:bg-primary/20', icon: 'text-primary', text: 'text-primary' },
  danger:  { bg: 'bg-danger/10 dark:bg-danger/20',   icon: 'text-danger',  text: 'text-danger'  },
  warning: { bg: 'bg-warning/10 dark:bg-warning/20', icon: 'text-warning', text: 'text-warning' },
  success: { bg: 'bg-success/10 dark:bg-success/20', icon: 'text-success', text: 'text-success' },
  info:    { bg: 'bg-info/10 dark:bg-info/20',       icon: 'text-info',    text: 'text-info'    },
  purple:  { bg: 'bg-purple/10 dark:bg-purple/20',   icon: 'text-purple',  text: 'text-purple'  },
};

export function KpiCard({
  title,
  value,
  subtitle,
  icon,
  variant = 'primary',
  trend,
  loading = false,
  onClick,
}: KpiCardProps) {
  const v = VARIANT_CLASSES[variant];

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
      className={clsx(
        'card p-3 sm:p-4 flex items-start gap-3 sm:gap-4 min-h-[min-kpi]',
        'transition-shadow duration-200',
        onClick && 'card-interactive focus:outline-none focus:ring-2 focus:ring-primary/30',
        'animate-fade-in',
      )}
    >
      {/* Icon — uses kpi-icon token (48px) */}
      {icon && (
        <div className={clsx(
          'w-kpi-icon h-kpi-icon rounded-xl flex items-center justify-center flex-shrink-0',
          v.bg,
        )}>
          <i className={clsx('fas', icon, 'text-lg sm:text-xl', v.icon)} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 line-clamp-2 mb-1 leading-tight">
          {title}
        </p>

        {loading ? (
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-14 mb-1" />
        ) : (
          <p className={clsx('text-xl sm:text-2xl font-bold leading-tight', v.text)}>{value}</p>
        )}

        {subtitle && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{subtitle}</p>
        )}

        {trend && !loading && (
          <div className={clsx(
            'flex items-center gap-1 mt-1 text-xs font-medium',
            trend.direction === 'up' ? 'text-success' :
            trend.direction === 'down' ? 'text-danger' : 'text-gray-400',
          )}>
            <i className={clsx(
              'fas',
              trend.direction === 'up' ? 'fa-arrow-up' :
              trend.direction === 'down' ? 'fa-arrow-down' : 'fa-minus',
            )} />
            {trend.value}
          </div>
        )}
      </div>
    </div>
  );
}
