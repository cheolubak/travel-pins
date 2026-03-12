'use client';

import { Skeleton, Typography } from '@travel-pins/components';
import { useEffect } from 'react';

import { ReviewCard } from '@/src/features/review/components/ReviewCard';
import { useReviews } from '@/src/features/review/stores/useReviews';

interface ReviewListProps {
  placeId: string;
}

export const ReviewList = ({ placeId }: ReviewListProps) => {
  const { reviews, isLoading, fetchReviews } = useReviews();

  useEffect(() => {
    fetchReviews(placeId);
  }, [placeId, fetchReviews]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton height={60} width="100%" />
        <Skeleton height={60} width="100%" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <Typography className="text-grey-400 py-4 text-center" variant="body-small">
        아직 리뷰가 없습니다.
      </Typography>
    );
  }

  return (
    <div className="flex flex-col">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};
