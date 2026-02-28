import type { JSX } from 'react';

export type TypographyVariant =
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small';

export type TypographySemantic = Extract<
  keyof JSX.IntrinsicElements,
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'pre'
  | 'address'
  | 'dd'
>;
