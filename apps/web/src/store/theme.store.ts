import { create } from 'zustand';

import type { ThemeMode } from '@/src/types';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',
  setMode: (mode) => set({ mode })
}));
