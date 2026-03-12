'use client';

import type { ComponentProps } from 'react';

import { cn } from '@travel-pins/utils';

interface TextareaProps extends ComponentProps<'textarea'> {
  label?: string;
}

export const Textarea = ({ className, label, id, ...props }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-grey-700" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full rounded-lg border border-grey-300 px-3 py-2 text-sm',
          'placeholder:text-grey-400 focus:border-blue-500 focus:outline-none',
          'resize-none',
          className,
        )}
        id={id}
        {...props}
      />
    </div>
  );
};
