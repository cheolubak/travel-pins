import type { TypographySemantic, TypographyVariant } from './Typography.type';
import type { ComponentProps, ElementType, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import styles from './Typography.module.scss';

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
  ...props
}: TypographyPropsWithIntrinsic<T>) => {
  const Component = semantic || 'span';

  return (
    <Component
      {...props}
      className={clsx(styles.typography, className)}
      data-max-lines={maxLines}
      data-variant={variant}
    />
  );
};
