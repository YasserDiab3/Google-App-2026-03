import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import type { UserSession } from '@/api/types';
import { apiRequest } from '@/api/client';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiRequest<UserSession>('authenticateUser', {
        email: email.trim().toLowerCase(),
        password,
      });

      if (res.data) {
        login(res.data, remember);
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.invalidCreds'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand to-brand-mid p-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-4">
            <i className="fas fa-shield-alt text-4xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">HSE</h1>
          <p className="text-white/70 text-sm mt-1">نظام إدارة السلامة المهنية</p>
        </div>

        {/* Card */}
        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            {t('auth.login')}
          </h2>

          <form onSubmit={(e) => void handleSubmit(e)} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="form-label">{t('auth.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-input"
                placeholder="example@company.com"
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="form-input"
                dir="ltr"
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                {t('auth.rememberMe')}
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-lg w-full"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" />
                  {t('auth.loggingIn')}
                </>
              ) : (
                t('auth.loginBtn')
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
