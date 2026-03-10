import type { IconName } from './Icon.type';
import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { ICON_MAP } from './Icon.type';

import styles from './Icon.module.css';

interface IconProps extends ComponentProps<'i'> {
  color?: string;
  name: IconName;
  size?: number;
}

export const Icon = ({
  className,
  color,
  name,
  size = 24,
  ...props
}: IconProps) => {
  const IconComponent = ICON_MAP[name];

  return (
    <i
      {...props}
      className={clsx(styles.icon, className)}
      style={{ fill: color, fontSize: size }}
    >
      <IconComponent />
    </i>
  );
};
