import { create } from 'zustand';

import type { User } from '@vibeline/types';

type AuthState = {
  token: string | null;
  currentUser: User | null;
  setSession: (payload: { token: string; currentUser: User }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  currentUser: null,
  setSession: ({ token, currentUser }) => set({ token, currentUser }),
  clearSession: () => set({ token: null, currentUser: null })
}));
