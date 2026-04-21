import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { useApiQuery } from '@/shared/hooks/useQuery';
import type { UserTask } from '@/api/types';
import clsx from 'clsx';

const PRIORITY_CLASSES: Record<string, string> = {
  high:   'bg-danger/10 text-danger border-danger/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low:    'bg-success/10 text-success border-success/20',
};

export default function TasksWidget() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: tasks = [], isLoading } = useApiQuery<UserTask[]>(
    ['tasks', user?.email],
    'getUserTasksByUserId',
    { userId: user?.email ?? '' },
    { enabled: Boolean(user?.email) },
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
          {t('dashboard.myTasks')}
        </h3>
        <Link
          to="/my-tasks"
          className="text-xs text-primary hover:text-primary-dark font-medium transition"
        >
          {t('dashboard.viewAll')}
        </Link>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-5 py-3.5 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 dark:bg-gray-700/50 rounded w-1/4" />
            </div>
          ))
        ) : tasks.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            <i className="fas fa-check-circle text-2xl mb-2 block text-success/50" />
            {t('dashboard.noTasks')}
          </div>
        ) : (
          tasks.slice(0, 6).map((task) => (
            <div key={task.id} className="px-5 py-3.5 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {task.title}
                </p>
                {task.dueDate && (
                  <p className="text-xs text-gray-400 mt-0.5">{task.dueDate}</p>
                )}
              </div>
              {task.priority && (
                <span
                  className={clsx(
                    'text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0',
                    PRIORITY_CLASSES[task.priority.toLowerCase()] ?? 'bg-gray-100 text-gray-500',
                  )}
                >
                  {t(`common.${task.priority.toLowerCase()}`, { defaultValue: task.priority })}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
