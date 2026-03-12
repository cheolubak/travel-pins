'use client';

import { cn } from '@travel-pins/utils';

interface StarRatingProps {
  className?: string;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
  value: number;
}

export const StarRating = ({
  className,
  onChange,
  readonly = false,
  size = 24,
  value,
}: StarRatingProps) => {
  return (
    <div className={cn('inline-flex gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          aria-label={`${star}점`}
          className={cn(
            'transition-colors',
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110',
          )}
          disabled={readonly}
          key={star}
          onClick={() => onChange?.(star)}
          type="button"
        >
          <svg
            fill={star <= value ? '#FFB300' : '#E0E0E0'}
            height={size}
            viewBox="0 0 24 24"
            width={size}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  );
};
