/**
 * Responsive data table component.
 * - Desktop: full table
 * - Mobile (<768px): card-style stacked layout (no horizontal overflow)
 * - Built-in loading skeleton, empty state, and sort support
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export type SortDir = 'asc' | 'desc' | null;

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => string | number | undefined | null;
  sortable?: boolean;
  className?: string;
  /** If true, column is hidden on mobile stacked view */
  mobileHidden?: boolean;
  /** Render a custom cell */
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  keyAccessor: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
}

function StatusBadge({ value }: { value: string }) {
  const classes: Record<string, string> = {
    open:       'bg-warning/10 text-warning border-warning/20',
    closed:     'bg-success/10 text-success border-success/20',
    pending:    'bg-info/10 text-info border-info/20',
    inprogress: 'bg-primary/10 text-primary border-primary/20',
    approved:   'bg-success/10 text-success border-success/20',
    rejected:   'bg-danger/10 text-danger border-danger/20',
  };
  const key = value.toLowerCase().replace(/\s+/g, '');
  const cls = classes[key] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border', cls)}>
      {value}
    </span>
  );
}

export function DataTable<T extends object>({
  data,
  columns,
  loading = false,
  emptyMessage,
  keyAccessor,
  onRowClick,
  stickyHeader = false,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  function handleSort(col: Column<T>) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'));
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(col.key);
      setSortDir('asc');
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return 0;
    const av = col.accessor(a) ?? '';
    const bv = col.accessor(b) ?? '';
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
    return sortDir === 'asc' ? cmp : -cmp;
  });

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="hidden lg:block">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile/tablet loading skeleton */}
        <div className="lg:hidden space-y-3 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-2 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-3 bg-gray-100 dark:bg-gray-700/50 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <i className="fas fa-inbox text-3xl text-gray-300 mb-3 block" />
        <p className="text-sm text-gray-400">{emptyMessage ?? t('common.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Desktop table (≥1024px) */}
      <div className="hidden lg:block table-responsive">
        <table className="w-full min-w-[700px]">
          <thead className={clsx('bg-gray-50 dark:bg-gray-800/80', stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={clsx(
                    'px-4 py-3 text-start text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap',
                    col.sortable && 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none',
                    col.className,
                  )}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <i className={clsx(
                        'fas text-[10px]',
                        sortKey === col.key && sortDir === 'asc' ? 'fa-sort-up text-primary' :
                        sortKey === col.key && sortDir === 'desc' ? 'fa-sort-down text-primary' :
                        'fa-sort text-gray-300',
                      )} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {sorted.map((row) => (
              <tr
                key={keyAccessor(row)}
                onClick={() => onRowClick?.(row)}
                className={clsx(
                  'transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30',
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={clsx('px-4 py-3 text-sm text-gray-700 dark:text-gray-300', col.className)}>
                    {col.cell ? col.cell(row) : String(col.accessor(row) ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/tablet card layout (<1024px) */}
      <div className="lg:hidden divide-y divide-gray-100 dark:divide-gray-700/50">
        {sorted.map((row) => {
          const visibleCols = columns.filter((c) => !c.mobileHidden);
          const [primary, ...rest] = visibleCols;
          return (
            <div
              key={keyAccessor(row)}
              onClick={() => onRowClick?.(row)}
              className={clsx(
                'p-3 sm:p-4',
                onRowClick && 'cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/30',
              )}
              style={{ minHeight: '44px' }} // WCAG touch target for rows
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                  {primary?.cell ? primary.cell(row) : String(primary?.accessor(row) ?? '—')}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                {rest.map((col) => (
                  <div key={col.key} className="text-xs">
                    <span className="block text-gray-400">{col.header}</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {col.cell ? col.cell(row) : String(col.accessor(row) ?? '—')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { StatusBadge };
