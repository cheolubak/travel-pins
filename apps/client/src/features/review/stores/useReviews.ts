'use client';

import type { Review, ReviewCreate } from '@travel-pins/domains';

import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface ReviewsState {
  createReview: (placeId: string, data: ReviewCreate) => Promise<boolean>;
  fetchReviews: (placeId: string) => Promise<void>;
  isLoading: boolean;
  isSubmitting: boolean;
  reviews: Review[];
}

export const useReviews = create<ReviewsState>((set) => ({
  createReview: async (placeId: string, data: ReviewCreate) => {
    set({ isSubmitting: true });

    try {
      await fetchApi.post(`places/${placeId}/reviews`, data);
      // 리뷰 목록 갱신
      const reviews = await fetchApi.get<Review[]>(
        `places/${placeId}/reviews`,
      );
      set({ isSubmitting: false, reviews });
      return true;
    } catch {
      set({ isSubmitting: false });
      return false;
    }
  },
  fetchReviews: async (placeId: string) => {
    set({ isLoading: true });

    try {
      const reviews = await fetchApi.get<Review[]>(
        `places/${placeId}/reviews`,
      );
      set({ isLoading: false, reviews });
    } catch {
      set({ isLoading: false, reviews: [] });
    }
  },
  isLoading: false,
  isSubmitting: false,
  reviews: [],
}));
