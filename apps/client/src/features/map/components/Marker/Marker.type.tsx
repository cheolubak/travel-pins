import type { MarkerType } from '@/src/features/map/types/MarkerType';
import type { ReactNode } from 'react';

import { Icon } from '@travel-pins/components';

export const MARKER_ICON_MAP: Record<MarkerType, ReactNode> = {
  CAFE: <Icon color="var(--color-white)" name="cafe" size={20} />,
  FOOD: <Icon color="var(--color-white)" name="food" size={20} />,
  PLACE: <Icon color="var(--color-white)" name="place" size={20} />,
  STORE: <Icon color="var(--color-white)" name="store" size={20} />,
};
