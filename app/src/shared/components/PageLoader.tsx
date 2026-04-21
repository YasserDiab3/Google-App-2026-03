
interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message }: PageLoaderProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center">
        <i className="fas fa-spinner fa-spin text-primary text-3xl mb-3 block" />
        {message && <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>}
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3" />
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    </div>
  );
}
