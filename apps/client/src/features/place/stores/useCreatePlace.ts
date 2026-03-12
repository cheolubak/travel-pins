'use client';

import type { PlaceCreate } from '@travel-pins/domains';

import { placeCreateSchema } from '@travel-pins/domains';
import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface CreatePlaceState {
  createPlace: (data: PlaceCreate) => Promise<boolean>;
  error: string | null;
  isSubmitting: boolean;
  reset: () => void;
}

export const useCreatePlace = create<CreatePlaceState>((set) => ({
  createPlace: async (data: PlaceCreate) => {
    set({ error: null, isSubmitting: true });

    const result = placeCreateSchema.safeParse(data);
    if (!result.success) {
      set({ error: '입력 정보를 확인해주세요.', isSubmitting: false });
      return false;
    }

    try {
      await fetchApi.post('places', result.data);
      set({ isSubmitting: false });
      return true;
    } catch {
      set({ error: '장소 등록에 실패했습니다.', isSubmitting: false });
      return false;
    }
  },
  error: null,
  isSubmitting: false,
  reset: () => set({ error: null, isSubmitting: false }),
}));
