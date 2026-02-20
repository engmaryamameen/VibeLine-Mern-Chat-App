'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MessageSquare } from 'lucide-react';

import { useAuthStore } from '@/src/store/auth.store';
import { apiClient } from '@/src/lib/api-client';
import type { User } from '@vibeline/types';

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const token = hashParams.get('token') || searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      const errorMessages: Record<string, string> = {
        oauth_not_configured: 'Google/GitHub sign-in is not configured',
        oauth_denied: 'Sign-in was cancelled',
        oauth_no_code: 'Authentication failed',
        oauth_invalid_state: 'Authentication session expired. Please try again.',
        oauth_failed: 'Failed to sign in with Google/GitHub'
      };
      setError(errorMessages[errorParam] || 'Authentication failed');
      setTimeout(() => router.replace('/login'), 3000);
      return;
    }

    if (!token) {
      setError('No authentication token received');
      setTimeout(() => router.replace('/login'), 3000);
      return;
    }

    // Fetch user info and set session
    const initSession = async () => {
      try {
        // Remove OAuth fragment token from browser history once extracted.
        if (window.location.hash) {
          window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        }

        const { user } = await apiClient<{ user: User }>('/users/me', { token });
        setSession({ token, currentUser: user });
        router.replace('/');
      } catch {
        setError('Failed to complete sign-in');
        setTimeout(() => router.replace('/login'), 3000);
      }
    };

    initSession();
  }, [router, searchParams, setSession]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="relative">
        {!error && (
          <div className="absolute inset-0 animate-ping rounded-2xl bg-gradient-to-br from-blue-500/30 to-indigo-600/30" />
        )}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
          <MessageSquare className="h-8 w-8 text-white" />
        </div>
      </div>

      <h1 className="mt-6 text-xl font-bold text-slate-900">VibeLine</h1>

      {error ? (
        <div className="mt-4 text-center">
          <p className="text-sm text-red-600">{error}</p>
          <p className="mt-2 text-xs text-slate-500">Redirecting to login...</p>
        </div>
      ) : (
        <>
          <div className="mt-4 flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500" />
          </div>
          <p className="mt-3 text-sm text-slate-500">Completing sign-in...</p>
        </>
      )}
    </main>
  );
};

export default AuthCallbackPage;
