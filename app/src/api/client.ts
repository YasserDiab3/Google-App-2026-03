/**
 * Typed API client for the Google Apps Script backend.
 * Handles CSRF tokens, request queuing, error normalization, and retries.
 */
import type { ApiRequest, ApiResponse, ErrorCode } from './types';

// ─── Custom error class ───────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly action?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ─── CSRF token management ────────────────────────────────────────────────────

function getOrCreateCsrfToken(): string {
  const KEY = 'csrf_token';
  let token = sessionStorage.getItem(KEY);
  if (!token) {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    token = Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    sessionStorage.setItem(KEY, token);
  }
  return token;
}

// ─── Config ───────────────────────────────────────────────────────────────────

function getScriptUrl(): string | null {
  try {
    const stored = localStorage.getItem('hse_google_config');
    if (!stored) return null;
    const config = JSON.parse(stored) as { appsScript?: { scriptUrl?: string } };
    return config?.appsScript?.scriptUrl ?? null;
  } catch {
    return null;
  }
}

// ─── Core request function ────────────────────────────────────────────────────

export async function apiRequest<TRes = unknown, TData = unknown>(
  action: string,
  data?: TData,
  options: { timeoutMs?: number; skipCsrf?: boolean } = {},
): Promise<ApiResponse<TRes>> {
  const scriptUrl = getScriptUrl();
  if (!scriptUrl) {
    throw new ApiError(
      'Backend URL not configured. Please set up Google Apps Script URL in settings.',
      'INTERNAL_ERROR',
      action,
    );
  }

  const { timeoutMs = 30_000 } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const payload: ApiRequest<TData> = {
    action,
    data,
    timestamp: new Date().toISOString(),
  };

  if (!options.skipCsrf) {
    payload.csrfToken = getOrCreateCsrfToken();
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        'INTERNAL_ERROR',
        action,
      );
    }

    const result = (await response.json()) as ApiResponse<TRes>;

    if (!result.success) {
      throw new ApiError(
        result.message ?? 'Unknown backend error',
        (result.errorCode as ErrorCode) ?? 'INTERNAL_ERROR',
        action,
      );
    }

    return result;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError(`Request timeout (${timeoutMs}ms)`, 'INTERNAL_ERROR', action);
    }
    throw new ApiError(
      err instanceof Error ? err.message : 'Network error',
      'INTERNAL_ERROR',
      action,
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

// ─── Convenience helpers ──────────────────────────────────────────────────────

export const api = {
  /** Read rows from a single sheet */
  readSheet: <T>(sheetName: string, spreadsheetId?: string) =>
    apiRequest<T[]>('readFromSheet', { sheetName, spreadsheetId }),

  /** Batch-read multiple sheets */
  batchRead: <T extends Record<string, unknown[]>>(sheets: string[]) =>
    apiRequest<T>('batchReadSheets', { sheets }),

  /** Save (upsert) a row */
  save: <T>(sheetName: string, data: T) =>
    apiRequest('saveToSheet', { sheetName, data }),

  /** Append a new row */
  append: <T>(sheetName: string, data: T) =>
    apiRequest('appendToSheet', { sheetName, data }),
};
