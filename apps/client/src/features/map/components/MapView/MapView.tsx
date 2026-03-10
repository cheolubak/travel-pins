'use client';

import type { Position } from '@travel-pins/domains';

import { CommonMap } from '@travel-pins/components';

import { Marker } from '@/src/features/map/components/Marker';
import { useLoadedMap } from '@/src/features/map/stores/useLoadedMap';
import { useMap } from '@/src/features/map/stores/useMap';
import { usePlaces } from '@/src/features/map/stores/usePlaces';

export const MapView = () => {
  const setLoadedMap = useLoadedMap((state) => state.setLoaded);

  const { places, searchPlaces } = usePlaces((state) => state);

  const { position, setPosition } = useMap((state) => state);

  const handleChangePosition = (position: Position) => {
    setPosition(position);
  };

  const handleChangeBounds = (leftBottom: Position, rightTop: Position) => {
    searchPlaces(leftBottom, rightTop);
  };

  if (!process.env.NAVER_MAP_CLIENT_ID || !process.env.KAKAO_APP_KEY) {
    return null;
  }

  return (
    <CommonMap
      className={'fixed top-0 left-0 w-screen h-screen'}
      initCenter={position}
      markers={places.map((x) => ({
        content: <Marker type={x.type} />,
        id: x.id,
        position: { lat: x.lat, lng: x.lng },
      }))}
      naverClientId={process.env.NAVER_MAP_CLIENT_ID}
      onChangeBounds={handleChangeBounds}
      onChangePosition={handleChangePosition}
      onLoaded={setLoadedMap}
      position={position}
    />
  );
};
