import { useTranslation } from 'react-i18next';
import { useApiQuery } from '@/shared/hooks/useQuery';
import clsx from 'clsx';

interface ActivityEntry {
  id: string;
  action: string;
  user?: string;
  timestamp?: string;
  type?: string;
}

const TYPE_ICONS: Record<string, { icon: string; color: string }> = {
  incident:  { icon: 'fa-exclamation-triangle', color: 'text-danger' },
  training:  { icon: 'fa-graduation-cap',       color: 'text-success' },
  ptw:       { icon: 'fa-file-signature',        color: 'text-info'    },
  default:   { icon: 'fa-circle',               color: 'text-gray-400' },
};

export default function ActivityWidget() {
  const { t } = useTranslation();

  const { data: activities = [], isLoading } = useApiQuery<ActivityEntry[]>(
    ['activity', 'recent'],
    'getRecentActivity',
    { limit: 10 },
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
          {t('common.actions')}
        </h3>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-1.5" />
                <div className="h-3 bg-gray-100 dark:bg-gray-700/50 rounded w-1/3" />
              </div>
            </div>
          ))
        ) : activities.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            <i className="fas fa-history text-2xl mb-2 block text-gray-300" />
            {t('common.noResults')}
          </div>
        ) : (
          activities.map((entry) => {
            const { icon, color } = TYPE_ICONS[entry.type ?? ''] ?? TYPE_ICONS.default;
            return (
              <div key={entry.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <i className={clsx('fas text-sm', icon, color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 dark:text-gray-200 truncate">{entry.action}</p>
                  {entry.user && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{entry.user}</p>
                  )}
                </div>
                {entry.timestamp && (
                  <span className="text-xs text-gray-400 flex-shrink-0">{entry.timestamp}</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
