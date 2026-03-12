'use client';

import type { ComponentProps } from 'react';

import { cn } from '@travel-pins/utils';
import { cva } from 'class-variance-authority';

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors cursor-pointer',
  {
    variants: {
      selected: {
        false: 'bg-grey-100 text-grey-700 hover:bg-grey-200',
        true: 'bg-blue-500 text-white',
      },
      size: {
        md: 'h-8 px-4 text-sm',
        sm: 'h-6 px-3 text-xs',
      },
    },
    defaultVariants: {
      selected: false,
      size: 'md',
    },
  },
);

interface ChipProps extends Omit<ComponentProps<'button'>, 'children'> {
  label: string;
  selected?: boolean;
  size?: 'sm' | 'md';
}

export const Chip = ({
  className,
  label,
  selected,
  size,
  ...props
}: ChipProps) => {
  return (
    <button
      className={cn(chipVariants({ selected, size }), className)}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
};
