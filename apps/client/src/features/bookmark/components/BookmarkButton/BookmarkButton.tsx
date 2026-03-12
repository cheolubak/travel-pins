'use client';

import { Icon } from '@travel-pins/components';

import { useAuth } from '@/src/features/auth/stores/useAuth';
import { useBookmarks } from '@/src/features/bookmark/stores/useBookmarks';

interface BookmarkButtonProps {
  placeId: string;
}

export const BookmarkButton = ({ placeId }: BookmarkButtonProps) => {
  const { isAuthenticated } = useAuth();
  const bookmarkedIds = useBookmarks((state) => state.bookmarkedIds);
  const toggleBookmark = useBookmarks((state) => state.toggleBookmark);

  const isBookmarked = bookmarkedIds.has(placeId);

  const handleClick = () => {
    if (!isAuthenticated) return;
    toggleBookmark(placeId);
  };

  return (
    <button
      aria-label={isBookmarked ? '북마크 해제' : '북마크'}
      onClick={handleClick}
      type="button"
    >
      <Icon
        color={isBookmarked ? '#FFB300' : undefined}
        name={isBookmarked ? 'bookmark-fill' : 'bookmark-outline'}
        size={28}
      />
    </button>
  );
};
