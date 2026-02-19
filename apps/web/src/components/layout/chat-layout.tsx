'use client';

import type { ReactNode } from 'react';

import { Header } from '@/src/components/layout/header';
import { Sidebar } from '@/src/components/layout/sidebar';
import { useMobileSidebar } from '@/src/hooks/use-mobile-sidebar';

type ChatLayoutProps = {
  children: ReactNode;
};

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  const { open, setOpen } = useMobileSidebar();

  return (
    <main className="h-screen overflow-hidden">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar onClose={() => setOpen(false)} open={open} />

        <section className="flex-1 bg-[rgb(var(--surface-bg))]">{children}</section>
      </div>
    </main>
  );
};
