'use client';

import type { Position } from '@travel-pins/domains';

import { CommonMap } from '@travel-pins/components';

import { Marker } from '@/src/features/map/components/Marker';
import { useExternalScripts } from '@/src/features/map/stores/useExternalScripts';
import { useLoadedMap } from '@/src/features/map/stores/useLoadedMap';
import { useMap } from '@/src/features/map/stores/useMap';
import { usePlaces } from '@/src/features/map/stores/usePlaces';

export const MapView = () => {
  const setLoadedMap = useLoadedMap((state) => state.setLoaded);

  const places = usePlaces((state) => state.places);
  const searchPlaces = usePlaces((state) => state.searchPlaces);

  const position = useMap((state) => state.position);
  const setPosition = useMap((state) => state.setPosition);

  const naverMapLoaded = useExternalScripts((state) => state.initNaverMap);

  const handleChangeBounds = (leftBottom: Position, rightTop: Position) => {
    searchPlaces(leftBottom, rightTop);
  };

  return (
    <CommonMap
      className={'fixed top-0 left-0 w-screen h-screen'}
      initCenter={position}
      markers={places.map((x) => ({
        content: <Marker type={x.type} />,
        id: x.id,
        position: { lat: x.lat, lng: x.lng },
      }))}
      naverMapLoaded={naverMapLoaded}
      onChangeBounds={handleChangeBounds}
      onChangePosition={setPosition}
      onLoaded={setLoadedMap}
      position={position}
    />
  );
};
