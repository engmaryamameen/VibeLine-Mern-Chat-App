'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';

import { Button, Card } from '@vibeline/ui';

import { AuthGuard } from '@/src/components/auth/auth-guard';
import { apiClient, ApiError } from '@/src/lib/api-client';
import { useAuthStore } from '@/src/store/auth.store';

import type { User } from '@vibeline/types';

type VerifyResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
  message: string;
};

type VerificationState = 'loading' | 'success' | 'error' | 'no-token';

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const setSession = useAuthStore((state) => state.setSession);

  const [state, setState] = useState<VerificationState>(token ? 'loading' : 'no-token');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setState('no-token');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await apiClient<VerifyResponse>('/auth/verify-email', {
          method: 'POST',
          body: { token }
        });

        setSession({
          token: response.tokens.accessToken,
          currentUser: response.user
        });

        setState('success');

        setTimeout(() => {
          router.replace('/');
        }, 2000);
      } catch (err) {
        setState('error');
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    };

    verifyEmail();
  }, [token, router, setSession]);

  return (
    <AuthGuard mode="guest">
      <main className="flex min-h-screen flex-col items-center justify-center bg-surface-bg px-4 py-16">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span className="text-sm font-bold text-surface-bg">V</span>
          </div>
          <span className="text-lg font-semibold text-content-primary">VibeLine</span>
        </div>

        <Card className="w-full max-w-sm animate-fade-in">
          {state === 'loading' && (
            <div className="flex flex-col items-center py-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <h1 className="mt-4 text-xl font-semibold text-content-primary">
                Verifying your email
              </h1>
              <p className="mt-2 text-sm text-content-secondary">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {state === 'success' && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-status-success/20">
                <CheckCircle className="h-6 w-6 text-status-success" />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-content-primary">
                Email verified!
              </h1>
              <p className="mt-2 text-sm text-content-secondary">
                Your email has been verified successfully. Redirecting to the app...
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-status-error/20">
                <XCircle className="h-6 w-6 text-status-error" />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-content-primary">
                Verification failed
              </h1>
              <p className="mt-2 text-sm text-content-secondary">
                {error || 'The verification link is invalid or has expired.'}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/login">
                  <Button variant="secondary">Back to login</Button>
                </Link>
              </div>
            </div>
          )}

          {state === 'no-token' && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft">
                <Mail className="h-6 w-6 text-content-muted" />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-content-primary">
                Check your email
              </h1>
              <p className="mt-2 text-sm text-content-secondary">
                We sent you a verification link. Click the link in your email to verify your account.
              </p>
              <div className="mt-6">
                <Link href="/login">
                  <Button variant="secondary">Back to login</Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </main>
    </AuthGuard>
  );
};

export default VerifyEmailPage;
