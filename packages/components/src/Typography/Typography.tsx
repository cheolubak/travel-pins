import type { TypographySemantic, TypographyVariant } from './Typography.type';
import type { ComponentProps, CSSProperties, ElementType, PropsWithChildren } from 'react';

import { cn } from '@travel-pins/utils';
import { cva } from 'class-variance-authority';

const typographyVariants = cva(
  '[display:-webkit-box] [-webkit-box-orient:vertical] overflow-hidden break-keep [overflow-wrap:break-word]',
  {
    variants: {
      variant: {
        'display-large': 'text-6xl font-bold leading-tight tracking-tighter',
        'display-medium': 'text-5xl font-bold leading-tight tracking-tighter',
        'display-small': 'text-4xl font-bold leading-snug tracking-tight',
        'title-large': 'text-3xl font-semibold leading-snug tracking-tight',
        'title-medium': 'text-2xl font-semibold leading-normal tracking-tight',
        'title-small': 'text-xl font-medium leading-normal tracking-normal',
        'body-large': 'text-lg font-normal leading-relaxed tracking-normal',
        'body-medium': 'text-base font-normal leading-relaxed tracking-normal',
        'body-small': 'text-sm font-normal leading-normal tracking-normal',
        'label-large': 'text-xs font-medium leading-normal tracking-wide',
        'label-medium': 'text-xxs font-medium leading-normal tracking-wide',
        'label-small': 'text-xxxs font-medium leading-normal tracking-wider',
      } satisfies Record<TypographyVariant, string>,
    },
    defaultVariants: {
      variant: 'body-large',
    },
  },
);

interface TypographyProps<
  T extends ElementType = TypographySemantic,
> extends PropsWithChildren {
  className?: string;
  maxLines?: number;
  semantic?: T;
  variant?: TypographyVariant;
}

type TypographyPropsWithIntrinsic<T extends ElementType = TypographySemantic> =
  Omit<ComponentProps<T>, keyof TypographyProps<T>> & TypographyProps<T>;

export const Typography = <T extends ElementType = TypographySemantic>({
  className,
  maxLines,
  semantic,
  variant = 'body-large',
  style,
  ...props
}: TypographyPropsWithIntrinsic<T> & { style?: CSSProperties }) => {
  const Component = semantic || 'span';

  return (
    <Component
      {...props}
      className={cn(typographyVariants({ variant }), className)}
      style={
        maxLines
          ? { WebkitLineClamp: maxLines, ...style }
          : style
      }
    />
  );
};
