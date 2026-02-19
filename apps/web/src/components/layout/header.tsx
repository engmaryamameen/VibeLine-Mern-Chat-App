'use client';

import { Menu, Moon, Sun } from 'lucide-react';

import { Button } from '@vibeline/ui';

import { useThemeStore } from '@/src/store/theme.store';

type HeaderProps = {
  onMenuClick: () => void;
};

export const Header = ({ onMenuClick }: HeaderProps) => {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-800/80 bg-[rgb(var(--surface-panel))]/80 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <Button
          aria-label="Open rooms"
          className="lg:hidden"
          onClick={onMenuClick}
          type="button"
          variant="ghost"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-semibold uppercase tracking-[0.12em] text-[rgb(var(--text-secondary))]">
          VibeLine
        </h1>
      </div>

      <Button
        aria-label="Toggle theme"
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        type="button"
        variant="ghost"
      >
        {mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  );
};
