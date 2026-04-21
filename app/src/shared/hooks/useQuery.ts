/**
 * Typed wrappers around TanStack Query for the HSE API.
 */
import { useQuery as useTanstackQuery, type UseQueryOptions } from '@tanstack/react-query';
import { apiRequest, ApiError } from '@/api/client';
import type { ApiResponse } from '@/api/types';

/**
 * Generic hook for a backend API call.
 * Provides caching, background refetch, and deduplication automatically.
 */
export function useApiQuery<TRes>(
  queryKey: readonly unknown[],
  action: string,
  data?: unknown,
  options?: Partial<UseQueryOptions<TRes, ApiError>>,
) {
  return useTanstackQuery<TRes, ApiError>({
    queryKey,
    queryFn: async (): Promise<TRes> => {
      const res: ApiResponse<TRes> = await apiRequest<TRes>(action, data);
      if (!res.data) throw new ApiError('Empty response data', 'INTERNAL_ERROR', action);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache before background refetch
    retry: (failureCount, error) => {
      // Don't retry on auth / config errors
      if (error.code === 'CSRF_TOKEN_INVALID') return false;
      if (error.code === 'ACTION_NOT_RECOGNIZED') return false;
      return failureCount < 2;
    },
    ...options,
  });
}
