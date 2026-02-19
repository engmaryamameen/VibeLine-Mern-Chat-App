'use client';

import Link from 'next/link';

import { Button, Card, Input } from '@vibeline/ui';

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md animate-fade-in bg-[rgb(var(--surface-panel))]">
        <h1 className="text-2xl font-semibold tracking-tight">Create your workspace identity</h1>

        <form className="mt-8 space-y-4" aria-label="Registration form">
          <label className="block space-y-2">
            <span className="text-sm text-[rgb(var(--text-secondary))]">Name</span>
            <Input name="displayName" placeholder="Alex Johnson" required />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[rgb(var(--text-secondary))]">Email</span>
            <Input name="email" placeholder="alex@company.com" type="email" required />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[rgb(var(--text-secondary))]">Password</span>
            <Input name="password" type="password" required />
          </label>

          <Button className="w-full" type="submit">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-sm text-[rgb(var(--text-secondary))]">
          Already have an account?{' '}
          <Link className="text-cyan-400 hover:text-cyan-300" href="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
};

export default RegisterPage;
