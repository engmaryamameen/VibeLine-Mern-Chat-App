'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import type { Room } from '@vibeline/types';

import { ApiError, apiClient } from '@/src/lib/api-client';
import { useAuthStore } from '@/src/store/auth.store';
import { useChatStore } from '@/src/store/chat.store';
import { Header } from '@/src/components/layout/header';
import { Sidebar } from '@/src/components/layout/sidebar';
import { useMobileSidebar } from '@/src/hooks/use-mobile-sidebar';

type ChatLayoutProps = {
  children: ReactNode;
};

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  const router = useRouter();
  const { open, setOpen } = useMobileSidebar();
  const token = useAuthStore((state) => state.token);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setRooms = useChatStore((state) => state.setRooms);
  const clearChat = useChatStore((state) => state.clearChat);

  useEffect(() => {
    if (!token) return;

    let active = true;
    apiClient<{ rooms: Room[] }>('/rooms', { token })
      .then((response) => {
        if (!active) return;
        setRooms(response.rooms);
      })
      .catch((error) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          clearChat();
          clearSession();
          router.replace('/login');
        }
      });

    return () => {
      active = false;
    };
  }, [clearChat, clearSession, router, setRooms, token]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface-bg">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <Sidebar onClose={() => setOpen(false)} open={open} />

        <main className="flex min-h-0 flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};
