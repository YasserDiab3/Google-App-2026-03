/**
 * Incidents module — Wave 1 migration.
 * Reads from backend via typed API client with caching.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApiQuery } from '@/shared/hooks/useQuery';
import { DataTable, StatusBadge, type Column } from '@/shared/components/ui/DataTable';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import clsx from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Incident {
  id: string;
  incidentNumber?: string;
  date?: string;
  type?: string;
  location?: string;
  severity?: string;
  status?: string;
  description?: string;
  reportedBy?: string;
  investigation?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SEVERITY_COLORS: Record<string, string> = {
  high:    'text-danger',
  medium:  'text-warning',
  low:     'text-success',
  critical:'text-danger font-bold',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function IncidentsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: incidents = [], isLoading } = useApiQuery<Incident[]>(
    ['incidents', 'list'],
    'readFromSheet',
    { sheetName: 'incidents' },
  );

  // Client-side search + filter
  const filtered = incidents.filter((row) => {
    const matchesSearch =
      !search ||
      Object.values(row).some((v) =>
        String(v ?? '').toLowerCase().includes(search.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === 'all' ||
      (row.status ?? '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Incident>[] = [
    {
      key: 'incidentNumber',
      header: '#',
      accessor: (r) => r.incidentNumber,
      sortable: true,
      className: 'w-24',
    },
    {
      key: 'date',
      header: t('common.date'),
      accessor: (r) => r.date,
      sortable: true,
    },
    {
      key: 'type',
      header: t('common.type'),
      accessor: (r) => r.type,
      sortable: true,
    },
    {
      key: 'location',
      header: 'Location',
      accessor: (r) => r.location,
      mobileHidden: true,
    },
    {
      key: 'severity',
      header: 'Severity',
      accessor: (r) => r.severity,
      sortable: true,
      cell: (r) => (
        <span className={clsx('font-medium text-sm', SEVERITY_COLORS[r.severity?.toLowerCase() ?? ''] ?? '')}>
          {r.severity ?? '—'}
        </span>
      ),
    },
    {
      key: 'status',
      header: t('common.status'),
      accessor: (r) => r.status,
      sortable: true,
      cell: (r) => r.status ? <StatusBadge value={r.status} /> : null,
    },
    {
      key: 'reportedBy',
      header: 'Reported By',
      accessor: (r) => r.reportedBy,
      mobileHidden: true,
    },
  ];

  const statuses = ['all', ...new Set(incidents.map((i) => i.status ?? '').filter(Boolean))];

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('nav.incidents')}</h1>
          <p className="page-subtitle">
            {t('common.total')}: {incidents.length}
          </p>
        </div>
        <button className="btn-primary">
          <i className="fas fa-plus" />
          <span>{t('common.add')}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <i className="fas fa-search absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('common.search') + '...'}
            className="form-input ps-9"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-input sm:w-48"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? t('common.all') : s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <ErrorBoundary>
        <DataTable
          data={filtered}
          columns={columns}
          loading={isLoading}
          keyAccessor={(r) => r.id ?? r.incidentNumber ?? Math.random()}
          emptyMessage={t('common.noResults')}
          stickyHeader
        />
      </ErrorBoundary>
    </div>
  );
}
