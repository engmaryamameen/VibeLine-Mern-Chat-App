'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@vibeline/utils';

type AdminShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/users', label: 'Users' },
  { href: '/reports', label: 'Reports' }
];

export const AdminShell = ({ children }: AdminShellProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[220px,1fr]">
      <aside className="border-b border-slate-800 bg-[rgb(var(--surface-panel))] p-4 lg:border-b-0 lg:border-r">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[rgb(var(--text-secondary))]">VibeLine Admin</p>
        <nav className="mt-4 flex gap-2 lg:flex-col" aria-label="Admin">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm transition',
                pathname === item.href
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-[rgb(var(--text-secondary))] hover:bg-slate-800 hover:text-slate-100'
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="p-4 lg:p-8">{children}</main>
    </div>
  );
};
