/**
 * Placeholder page for modules that haven't been migrated to React yet.
 * In production migration, this is replaced by the real module component.
 * During migration: renders a "coming soon / loading legacy" bridge.
 */

interface ModulePlaceholderProps {
  moduleName: string;
  icon?: string;
}

export default function ModulePlaceholder({ moduleName, icon = 'fa-tools' }: ModulePlaceholderProps) {
  return (
    <div className="page-container">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <i className={`fas ${icon} text-2xl text-primary`} />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {moduleName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            هذا القسم قيد النقل إلى النظام الجديد.
            <br />
            This module is being migrated to the new system.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-info/10 text-info rounded-xl text-sm">
            <i className="fas fa-info-circle" />
            <span>Wave 2 migration — coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
