/**
 * Frozen API contracts for the Google Apps Script backend.
 * All request/response shapes are defined here — never inlined elsewhere.
 */

// ─── Base transport shapes ────────────────────────────────────────────────────

export interface ApiRequest<T = unknown> {
  action: string;
  data?: T;
  csrfToken?: string;
  timestamp?: string;
  spreadsheetId?: string;
  _spreadsheetId?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errorCode?: ErrorCode;
  errorType?: string;
  hint?: string;
  action?: string;
}

// ─── Error codes emitted by the backend ──────────────────────────────────────

export type ErrorCode =
  | 'NULL_REQUEST_OBJECT'
  | 'NO_DATA'
  | 'JSON_PARSE_ERROR'
  | 'ACTION_MISSING'
  | 'CSRF_TOKEN_MISSING'
  | 'CSRF_TOKEN_INVALID'
  | 'CSRF_TOKEN_VALIDATION_FAILED'
  | 'SWITCH_ERROR'
  | 'INTERNAL_ERROR'
  | 'ACTION_NOT_RECOGNIZED'
  | string; // allow module-specific codes

// ─── Session / auth types ────────────────────────────────────────────────────

export interface UserSession {
  email: string;
  name?: string;
  role: UserRole;
  site?: string;
  department?: string;
  spreadsheetId?: string;
  googleConfig?: GoogleConfig;
  [key: string]: unknown;
}

export type UserRole = 'admin' | 'manager' | 'supervisor' | 'user' | string;

export interface GoogleConfig {
  appsScript: {
    enabled: boolean;
    scriptUrl: string;
  };
}

// ─── Common domain types ──────────────────────────────────────────────────────

export interface SheetRow {
  id?: string | number;
  [key: string]: unknown;
}

export interface BatchReadRequest {
  sheets: string[];
  spreadsheetId?: string;
}

export interface BatchReadResponse {
  [sheetName: string]: SheetRow[];
}

// ─── Dashboard-specific API types ────────────────────────────────────────────

export interface UserTasksRequest {
  userId: string;
}

export interface UserTask {
  id: string;
  title: string;
  status: string;
  priority?: string;
  dueDate?: string;
  assignedTo?: string;
}

export interface ContractorAnalyticsRequest {
  contractor: string;
  contractorId?: string;
}

export interface ContractorAnalytics {
  contractorId: string;
  name: string;
  totalWorkers: number;
  incidents: number;
  trainings: number;
  [key: string]: unknown;
}

// ─── KPI types ────────────────────────────────────────────────────────────────

export interface KpiSummary {
  totalIncidents: number;
  openIncidents: number;
  lostTimeIncidents: number;
  nearMisses: number;
  safetyObservations: number;
  trainingCompletion: number;
  ppeCompliance: number;
  [key: string]: number | string;
}

// ─── i18n types ───────────────────────────────────────────────────────────────

export type SupportedLocale = 'ar' | 'en';
export type TextDirection = 'rtl' | 'ltr';
