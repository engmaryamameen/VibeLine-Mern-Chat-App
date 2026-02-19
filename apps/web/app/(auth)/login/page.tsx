'use client';

import Link from 'next/link';

import { Button, Card, Input } from '@vibeline/ui';

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md animate-fade-in bg-[rgb(var(--surface-panel))]">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">Sign in to continue your conversations.</p>

        <form className="mt-8 space-y-4" aria-label="Login form">
          <label className="block space-y-2">
            <span className="text-sm text-[rgb(var(--text-secondary))]">Email</span>
            <Input name="email" placeholder="you@company.com" type="email" required />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[rgb(var(--text-secondary))]">Password</span>
            <Input name="password" type="password" required />
          </label>

          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-sm text-[rgb(var(--text-secondary))]">
          New to VibeLine?{' '}
          <Link className="text-cyan-400 hover:text-cyan-300" href="/register">
            Create account
          </Link>
        </p>
      </Card>
    </main>
  );
};

export default LoginPage;
