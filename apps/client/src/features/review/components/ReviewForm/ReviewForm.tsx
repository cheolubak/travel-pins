'use client';

import {
  Button,
  Modal,
  StarRating,
  Textarea,
  Typography,
  useModal,
} from '@travel-pins/components';
import { useState } from 'react';

import { useAuth } from '@/src/features/auth/stores/useAuth';
import { useReviews } from '@/src/features/review/stores/useReviews';

interface ReviewFormProps {
  placeId: string;
}

export const ReviewForm = ({ placeId }: ReviewFormProps) => {
  const { isAuthenticated } = useAuth();
  const { createReview, isSubmitting } = useReviews();
  const { open } = useModal();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="py-4 text-center">
        <Typography className="text-grey-500" variant="body-small">
          리뷰를 작성하려면 로그인해주세요.
        </Typography>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0 || !content.trim()) return;

    const success = await createReview(placeId, {
      content: content.trim(),
      images: [],
      rating,
    });

    if (success) {
      setRating(0);
      setContent('');
      open(
        <Modal className="flex flex-col items-center gap-4 p-6">
          <Typography>리뷰가 등록되었습니다.</Typography>
        </Modal>,
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-3 border-t border-grey-200">
      <Typography variant="body-small">리뷰 작성</Typography>
      <StarRating onChange={setRating} value={rating} />
      <Textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰를 작성해주세요"
        rows={3}
        value={content}
      />
      <Button
        disabled={isSubmitting || rating === 0 || !content.trim()}
        onClick={handleSubmit}
        size="sm"
      >
        {isSubmitting ? '등록 중...' : '리뷰 등록'}
      </Button>
    </div>
  );
};
