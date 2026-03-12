'use client';

import type { ComponentProps } from 'react';

import { cn } from '@travel-pins/utils';
import { cva } from 'class-variance-authority';

const fabVariants = cva(
  'fixed z-50 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer',
  {
    variants: {
      position: {
        'bottom-left': 'bottom-6 left-6',
        'bottom-right': 'bottom-6 right-6',
      },
      size: {
        lg: 'h-14 w-14',
        md: 'h-12 w-12',
      },
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-white text-grey-900 hover:bg-grey-50',
      },
    },
    defaultVariants: {
      position: 'bottom-right',
      size: 'md',
      variant: 'primary',
    },
  },
);

interface FloatingActionButtonProps extends ComponentProps<'button'> {
  position?: 'bottom-right' | 'bottom-left';
  size?: 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export const FloatingActionButton = ({
  className,
  position,
  size,
  variant,
  ...props
}: FloatingActionButtonProps) => {
  return (
    <button
      className={cn(fabVariants({ position, size, variant }), className)}
      type="button"
      {...props}
    />
  );
};
