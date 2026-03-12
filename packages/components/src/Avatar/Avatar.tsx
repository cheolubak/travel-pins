'use client';

import { cn } from '@travel-pins/utils';
import { cva } from 'class-variance-authority';

const avatarVariants = cva(
  'rounded-full overflow-hidden bg-grey-200 flex items-center justify-center',
  {
    variants: {
      size: {
        lg: 'h-16 w-16 text-2xl',
        md: 'h-10 w-10 text-base',
        sm: 'h-8 w-8 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface AvatarProps {
  className?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string | null;
}

export const Avatar = ({ className, name, size, src }: AvatarProps) => {
  const fallback = name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className={cn(avatarVariants({ size }), className)}>
      {src ? (
        <img
          alt={name || '프로필'}
          className="w-full h-full object-cover"
          src={src}
        />
      ) : (
        <span className="text-grey-500 font-medium">{fallback}</span>
      )}
    </div>
  );
};
