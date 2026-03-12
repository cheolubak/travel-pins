'use client';

import type { Review } from '@travel-pins/domains';

import { Skeleton, StarRating, Typography } from '@travel-pins/components';
import { fetchApi } from '@travel-pins/request';
import { useEffect, useState } from 'react';

export const MyReviewsList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchApi.get<Review[]>('users/me/reviews');
        setReviews(res);
      } catch {
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton height={80} key={i} width="100%" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <Typography className="text-grey-400" variant="body-small">
          작성한 리뷰가 없습니다.
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((review) => (
        <div
          className="flex flex-col gap-2 p-3 rounded-lg border border-grey-100"
          key={review.id}
        >
          <div className="flex items-center justify-between">
            <StarRating readonly size={14} value={review.rating} />
            <Typography className="text-grey-400" variant="label-medium">
              {new Date(review.createdAt).toLocaleDateString('ko-KR')}
            </Typography>
          </div>
          <Typography variant="body-small">{review.content}</Typography>
        </div>
      ))}
    </div>
  );
};
