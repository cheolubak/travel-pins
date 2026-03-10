import type { MarkerType } from '@/src/features/map/types/MarkerType';

import { Icon } from '@travel-pins/components';

import { MARKER_ICON_MAP } from '@/src/features/map/components/Marker/Marker.type';

import styles from './Marker.module.css';

interface MarkerProps {
  isMyPlace?: boolean;
  type: MarkerType;
}

export const Marker = ({ isMyPlace = false, type }: MarkerProps) => {
  return (
    <div className={styles.marker}>
      {MARKER_ICON_MAP[type]}
      {isMyPlace && (
        <div className={styles.myPlaceMarker}>
          <Icon color="var(--color-white)" name="star" size={16} />
        </div>
      )}
    </div>
  );
};
