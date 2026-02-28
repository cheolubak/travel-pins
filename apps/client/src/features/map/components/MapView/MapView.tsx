'use client';

import type { Position } from '@travel-pins/domains';

import { CommonMap } from '@travel-pins/components';

import { useLoadedMap } from '@/src/features/map/stores/useLoadedMap';
import { useMap } from '@/src/features/map/stores/useMap';

export const MapView = () => {
  const setLoadedMap = useLoadedMap((state) => state.setLoaded);

  const { position, setPosition } = useMap((state) => state);

  const handleChangePosition = (position: Position) => {
    setPosition(position);
  };

  if (!process.env.NAVER_CLIENT_ID || !process.env.KAKAO_APP_KEY) {
    return null;
  }

  return (
    <CommonMap
      className={'fixed top-0 left-0 w-screen h-screen'}
      initCenter={position}
      kakaoAppKey={process.env.KAKAO_APP_KEY}
      naverClientId={process.env.NAVER_CLIENT_ID}
      onChangePosition={handleChangePosition}
      onLoaded={setLoadedMap}
      position={position}
    />
  );
};
