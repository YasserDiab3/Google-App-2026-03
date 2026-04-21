import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/features/auth/AuthContext';
import AppRoutes from '@/app/routes';
import '@/i18n';
import '@/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   // 5 min
      gcTime: 30 * 60 * 1000,     // 30 min garbage collection
      refetchOnWindowFocus: false, // avoid noise on tab switch
      retry: 2,
    },
    mutations: {
      retry: 0,
    },
  },
});

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
