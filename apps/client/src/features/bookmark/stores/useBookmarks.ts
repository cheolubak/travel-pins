'use client';

import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface BookmarksState {
  bookmarkedIds: Set<string>;
  fetchBookmarks: () => Promise<void>;
  isBookmarked: (placeId: string) => boolean;
  toggleBookmark: (placeId: string) => Promise<void>;
}

export const useBookmarks = create<BookmarksState>((set, get) => ({
  bookmarkedIds: new Set(),
  fetchBookmarks: async () => {
    try {
      const res = await fetchApi.get<{ placeId: string }[]>('bookmarks');
      set({ bookmarkedIds: new Set(res.map((b) => b.placeId)) });
    } catch {
      // 비로그인 사용자는 무시
    }
  },
  isBookmarked: (placeId: string) => get().bookmarkedIds.has(placeId),
  toggleBookmark: async (placeId: string) => {
    const { bookmarkedIds } = get();
    const wasBookmarked = bookmarkedIds.has(placeId);

    // 낙관적 업데이트
    const newIds = new Set(bookmarkedIds);
    if (wasBookmarked) {
      newIds.delete(placeId);
    } else {
      newIds.add(placeId);
    }
    set({ bookmarkedIds: newIds });

    try {
      if (wasBookmarked) {
        await fetchApi.delete(`bookmarks/${placeId}`);
      } else {
        await fetchApi.post('bookmarks', { placeId });
      }
    } catch {
      // 롤백
      set({ bookmarkedIds });
    }
  },
}));
