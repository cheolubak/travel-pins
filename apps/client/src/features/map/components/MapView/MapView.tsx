'use client';

import { CommonMap } from '@travel-pins/components';

import { usePosition } from '@/src/features/map/stores/usePosition';

export const MapView = () => {
  const position = usePosition((state) => state.position);

  if (!process.env.NAVER_CLIENT_ID) {
    return null;
  }

  return (
    <CommonMap
      className={'fixed top-0 left-0 w-screen h-screen'}
      clientId={process.env.NAVER_CLIENT_ID}
      position={position}
    />
  );
};
