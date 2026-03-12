'use client';

import type { Review } from '@travel-pins/domains';

import { Avatar, StarRating, Typography } from '@travel-pins/components';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-2 py-3 border-b border-grey-100 last:border-b-0">
      <div className="flex items-center gap-2">
        <Avatar
          name={review.userName}
          size="sm"
          src={review.userProfileImage}
        />
        <div className="flex flex-col">
          <Typography variant="body-small">{review.userName}</Typography>
          <Typography className="text-grey-400" variant="label-medium">
            {new Date(review.createdAt).toLocaleDateString('ko-KR')}
          </Typography>
        </div>
      </div>
      <StarRating readonly size={16} value={review.rating} />
      <Typography variant="body-small">{review.content}</Typography>
      {review.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {review.images.map((src, i) => (
            <img
              alt={`리뷰 이미지 ${i + 1}`}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              key={src}
              src={src}
            />
          ))}
        </div>
      )}
    </div>
  );
};
