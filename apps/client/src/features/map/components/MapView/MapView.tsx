'use client';

import type { Position } from '@travel-pins/domains';

import { CommonMap } from '@travel-pins/components';

import { usePosition } from '@/src/features/map/stores/usePosition';

export const MapView = () => {
  const { position, setPosition } = usePosition((state) => state);

  const handleChangePosition = (position: Position) => {
    setPosition(position);
  };

  if (!process.env.NAVER_CLIENT_ID) {
    return null;
  }

  return (
    <CommonMap
      cafeList={[{ lat: 37.5849512, lng: 126.9186947 }]}
      className={'fixed top-0 left-0 w-screen h-screen'}
      clientId={process.env.NAVER_CLIENT_ID}
      initCenter={position}
      onChangePosition={handleChangePosition}
      position={position}
    />
  );
};
