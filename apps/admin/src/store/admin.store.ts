import { create } from 'zustand';

type AdminState = {
  selectedUserId: string | null;
  setSelectedUserId: (value: string | null) => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (selectedUserId) => set({ selectedUserId })
}));
