/**
 * Authentication context — reads from the same sessionStorage keys
 * as the legacy app so session is shared during migration.
 */
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { UserSession } from '@/api/types';

// ─── Keys (must match legacy app) ────────────────────────────────────────────

const SESSION_KEY = 'hse_current_session';
const REMEMBER_KEY = 'hse_remember_user';

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (session: UserSession, remember?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

function readStoredSession(): UserSession | null {
  try {
    const fromSession = sessionStorage.getItem(SESSION_KEY);
    if (fromSession) return JSON.parse(fromSession) as UserSession;

    const fromLocal = localStorage.getItem(REMEMBER_KEY);
    if (fromLocal) {
      const parsed = JSON.parse(fromLocal) as UserSession;
      // Restore into sessionStorage so other tabs work
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
      return parsed;
    }
  } catch {
    // Corrupted storage — clear and require re-login
    sessionStorage.removeItem(SESSION_KEY);
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const stored = readStoredSession();
    setUser(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback((session: UserSession, remember = false) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    if (remember) {
      localStorage.setItem(REMEMBER_KEY, JSON.stringify(session));
    }
    setUser(session);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('csrf_token');
    localStorage.removeItem(REMEMBER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
