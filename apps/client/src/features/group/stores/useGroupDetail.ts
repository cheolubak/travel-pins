'use client';

import type { Group, GroupMember } from '@travel-pins/domains';
import type { Place } from '@travel-pins/domains';

import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface GroupDetailState {
  addMember: (groupId: string, userId: string) => Promise<boolean>;
  fetchGroupDetail: (id: string) => Promise<void>;
  group: Group | null;
  isLoading: boolean;
  members: GroupMember[];
  places: Place[];
  removeMember: (groupId: string, userId: string) => Promise<boolean>;
}

export const useGroupDetail = create<GroupDetailState>((set) => ({
  addMember: async (groupId: string, userId: string) => {
    try {
      await fetchApi.post(`groups/${groupId}/members`, { userId });
      const members = await fetchApi.get<GroupMember[]>(
        `groups/${groupId}/members`,
      );
      set({ members });
      return true;
    } catch {
      return false;
    }
  },
  fetchGroupDetail: async (id: string) => {
    set({ isLoading: true });

    try {
      const [group, members, places] = await Promise.all([
        fetchApi.get<Group>(`groups/${id}`),
        fetchApi.get<GroupMember[]>(`groups/${id}/members`),
        fetchApi.get<Place[]>(`groups/${id}/places`),
      ]);
      set({ group, isLoading: false, members, places });
    } catch {
      set({ group: null, isLoading: false, members: [], places: [] });
    }
  },
  group: null,
  isLoading: false,
  members: [],
  places: [],
  removeMember: async (groupId: string, userId: string) => {
    try {
      await fetchApi.delete(`groups/${groupId}/members`, {
        params: { userId },
      });
      set((state) => ({
        members: state.members.filter((m) => m.userId !== userId),
      }));
      return true;
    } catch {
      return false;
    }
  },
}));
