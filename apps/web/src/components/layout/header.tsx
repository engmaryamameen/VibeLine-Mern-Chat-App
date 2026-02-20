'use client';

import { LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, Button } from '@vibeline/ui';

import { apiClient } from '@/src/lib/api-client';
import { useAuthStore } from '@/src/store/auth.store';
import { useChatStore } from '@/src/store/chat.store';
import { useThemeStore } from '@/src/store/theme.store';

type HeaderProps = {
  onMenuClick: () => void;
};

export const Header = ({ onMenuClick }: HeaderProps) => {
  const router = useRouter();
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const currentUser = useAuthStore((state) => state.currentUser);
  const clearSession = useAuthStore((state) => state.clearSession);
  const clearChat = useChatStore((state) => state.clearChat);

  const logout = async () => {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } catch {
      // Proceed with client logout even if server-side logout fails.
    }

    clearChat();
    clearSession();
    router.replace('/login');
  };

  const displayName = currentUser?.displayName ?? currentUser?.email ?? 'Guest';

  return (
    <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b border-border bg-surface-panel/95 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          aria-label="Open rooms"
          className="lg:hidden"
          onClick={onMenuClick}
          size="sm"
          type="button"
          variant="ghost"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent">
            <span className="text-xs font-bold text-surface-bg">V</span>
          </div>
          <span className="text-sm font-semibold text-content-primary">VibeLine</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="mr-2 hidden items-center gap-2 sm:flex">
          <Avatar name={displayName} size="sm" />
          <span className="text-sm text-content-secondary">{displayName}</span>
        </div>

        <div className="flex items-center">
          <Button
            aria-label="Toggle theme"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            size="sm"
            type="button"
            variant="ghost"
          >
            {mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            aria-label="Sign out"
            onClick={logout}
            size="sm"
            type="button"
            variant="ghost"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
