'use client';

import type { User } from '@travel-pins/domains';

import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface AuthState {
  fetchUser: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  user: User | null;
}

export const useAuth = create<AuthState>((set, get) => ({
  fetchUser: async () => {
    if (get().isLoading) return;

    set({ isLoading: true });

    try {
      const res = await fetchApi.get<{ user: User | null }>('auth/me');
      const user = res.user;

      set({ isAuthenticated: !!user, isLoading: false, user });
    } catch {
      set({ isAuthenticated: false, isLoading: false, user: null });
    }
  },
  isAuthenticated: false,
  isLoading: false,
  logout: async () => {
    try {
      await fetchApi.post('auth/logout');
    } finally {
      set({ isAuthenticated: false, user: null });
    }
  },
  user: null,
}));
