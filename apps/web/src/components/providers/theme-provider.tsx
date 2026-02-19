'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useThemeStore } from '@/src/store/theme.store';

const resolveTheme = (mode: 'dark' | 'light' | 'system') => {
  if (mode !== 'system') return mode;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    const nextTheme = resolveTheme(mode);
    document.documentElement.classList.toggle('light', nextTheme === 'light');
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }, [mode]);

  return children;
};
