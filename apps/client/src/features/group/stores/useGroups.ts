'use client';

import type { Group, GroupCreate } from '@travel-pins/domains';

import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface GroupsState {
  createGroup: (data: GroupCreate) => Promise<boolean>;
  deleteGroup: (id: string) => Promise<boolean>;
  fetchGroups: () => Promise<void>;
  groups: Group[];
  isLoading: boolean;
}

export const useGroups = create<GroupsState>((set, get) => ({
  createGroup: async (data: GroupCreate) => {
    try {
      await fetchApi.post('groups', data);
      await get().fetchGroups();
      return true;
    } catch {
      return false;
    }
  },
  deleteGroup: async (id: string) => {
    try {
      await fetchApi.delete(`groups/${id}`);
      set((state) => ({
        groups: state.groups.filter((g) => g.id !== id),
      }));
      return true;
    } catch {
      return false;
    }
  },
  fetchGroups: async () => {
    set({ isLoading: true });

    try {
      const groups = await fetchApi.get<Group[]>('groups');
      set({ groups, isLoading: false });
    } catch {
      set({ groups: [], isLoading: false });
    }
  },
  groups: [],
  isLoading: false,
}));
