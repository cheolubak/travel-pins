'use client';

import type { PlaceDetail } from '@travel-pins/domains';

import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface SelectedPlaceState {
  clearSelectedPlace: () => void;
  isLoading: boolean;
  place: PlaceDetail | null;
  selectPlace: (id: string) => Promise<void>;
}

export const useSelectedPlace = create<SelectedPlaceState>((set) => ({
  clearSelectedPlace: () => set({ place: null }),
  isLoading: false,
  place: null,
  selectPlace: async (id: string) => {
    set({ isLoading: true });

    try {
      const res = await fetchApi.get<PlaceDetail>(`places/${id}`);
      set({ isLoading: false, place: res });
    } catch {
      set({ isLoading: false, place: null });
    }
  },
}));
