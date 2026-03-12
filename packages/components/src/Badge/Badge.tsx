'use client';

import type { PropsWithChildren } from 'react';

import { cn } from '@travel-pins/utils';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium',
  {
    variants: {
      size: {
        md: 'px-3 py-1 text-xs',
        sm: 'px-2 py-0.5 text-xxs',
      },
      variant: {
        blue: 'bg-blue-100 text-blue-700',
        green: 'bg-green-100 text-green-700',
        grey: 'bg-grey-100 text-grey-700',
        orange: 'bg-orange-100 text-orange-700',
        red: 'bg-red-100 text-red-700',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'grey',
    },
  },
);

interface BadgeProps extends PropsWithChildren {
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'grey' | 'blue' | 'green' | 'red' | 'orange';
}

export const Badge = ({ children, className, size, variant }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ size, variant }), className)}>
      {children}
    </span>
  );
};
