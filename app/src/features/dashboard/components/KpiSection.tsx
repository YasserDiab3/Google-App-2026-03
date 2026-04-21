import { useTranslation } from 'react-i18next';
import { useApiQuery } from '@/shared/hooks/useQuery';
import { KpiCard, type KpiVariant } from '@/shared/components/KpiCard';
import { SkeletonCard } from '@/shared/components/PageLoader';
import type { KpiSummary } from '@/api/types';

interface KpiDef {
  key: keyof KpiSummary;
  labelKey: string;
  icon: string;
  variant: KpiVariant;
  format?: 'number' | 'percent';
}

const KPI_DEFS: KpiDef[] = [
  { key: 'totalIncidents',     labelKey: 'dashboard.totalIncidents', icon: 'fa-exclamation-triangle', variant: 'danger'  },
  { key: 'openIncidents',      labelKey: 'dashboard.openIncidents',  icon: 'fa-exclamation-circle',   variant: 'warning' },
  { key: 'lostTimeIncidents',  labelKey: 'dashboard.lostTime',       icon: 'fa-clock',                variant: 'danger'  },
  { key: 'nearMisses',         labelKey: 'dashboard.nearMisses',     icon: 'fa-eye',                  variant: 'info'    },
  { key: 'safetyObservations', labelKey: 'dashboard.safetyObs',      icon: 'fa-shield-alt',           variant: 'primary' },
  { key: 'trainingCompletion', labelKey: 'dashboard.trainingComp',   icon: 'fa-graduation-cap',       variant: 'success', format: 'percent' },
  { key: 'ppeCompliance',      labelKey: 'dashboard.ppeCompliance',  icon: 'fa-hard-hat',             variant: 'purple',  format: 'percent' },
];

export default function KpiSection() {
  const { t } = useTranslation();

  const { data, isLoading } = useApiQuery<KpiSummary>(
    ['kpi', 'summary'],
    'getKpiSummary',
    undefined,
    {
      // Fallback to reading from appData if backend isn't configured yet
      placeholderData: {
        totalIncidents: 0,
        openIncidents: 0,
        lostTimeIncidents: 0,
        nearMisses: 0,
        safetyObservations: 0,
        trainingCompletion: 0,
        ppeCompliance: 0,
      },
    },
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-3 md:gap-4">
        {KPI_DEFS.map((def) => <SkeletonCard key={def.key} />)}
      </div>
    );
  }

  const kpi = data ?? {} as KpiSummary;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-3 md:gap-4">
      {KPI_DEFS.map((def) => {
        const rawValue = kpi[def.key] ?? 0;
        const displayValue =
          def.format === 'percent' ? `${Number(rawValue).toFixed(1)}%` : String(rawValue);

        return (
          <KpiCard
            key={def.key}
            title={t(def.labelKey)}
            value={displayValue}
            icon={def.icon}
            variant={def.variant}
            loading={isLoading}
          />
        );
      })}
    </div>
  );
}
