'use client';

import type { ComponentProps } from 'react';

import { cn } from '@travel-pins/utils';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      size: {
        lg: 'h-12 px-6 text-base',
        md: 'h-10 px-4 text-sm',
        sm: 'h-8 px-3 text-xs',
      },
      variant: {
        danger: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'hover:bg-grey-100',
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-grey-100 text-grey-900 hover:bg-grey-200',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  },
);

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export const Button = ({
  className,
  size,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ size, variant }), className)}
      type="button"
      {...props}
    />
  );
};
