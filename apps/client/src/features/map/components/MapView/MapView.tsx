'use client';

import type { Position } from '@travel-pins/domains';

import { CommonMap, useModal } from '@travel-pins/components';
import { useEffect } from 'react';

import { useAuth } from '@/src/features/auth/stores/useAuth';
import { useBookmarks } from '@/src/features/bookmark/stores/useBookmarks';
import { Marker } from '@/src/features/map/components/Marker';
import { useExternalScripts } from '@/src/features/map/stores/useExternalScripts';
import { useLoadedMap } from '@/src/features/map/stores/useLoadedMap';
import { useMap } from '@/src/features/map/stores/useMap';
import { usePlaces } from '@/src/features/map/stores/usePlaces';
import { PlaceDetail } from '@/src/features/place/components/PlaceDetail';
import { useSelectedPlace } from '@/src/features/place/stores/useSelectedPlace';

export const MapView = () => {
  const setLoadedMap = useLoadedMap((state) => state.setLoaded);
  const { open } = useModal();

  const places = usePlaces((state) => state.places);
  const searchPlaces = usePlaces((state) => state.searchPlaces);

  const position = useMap((state) => state.position);
  const setPosition = useMap((state) => state.setPosition);

  const naverMapLoaded = useExternalScripts((state) => state.initNaverMap);

  const { isAuthenticated } = useAuth();
  const bookmarkedIds = useBookmarks((state) => state.bookmarkedIds);
  const fetchBookmarks = useBookmarks((state) => state.fetchBookmarks);
  const selectPlace = useSelectedPlace((state) => state.selectPlace);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    }
  }, [isAuthenticated, fetchBookmarks]);

  const handleChangeBounds = (leftBottom: Position, rightTop: Position) => {
    searchPlaces(leftBottom, rightTop);
  };

  const handleMarkerClick = (id: string) => {
    selectPlace(id);
    open(<PlaceDetail />);
  };

  return (
    <CommonMap
      className={'fixed top-0 left-0 w-screen h-screen'}
      initCenter={position}
      markers={places.map((x) => ({
        content: (
          <Marker
            isMyPlace={bookmarkedIds.has(x.id)}
            type={x.type}
          />
        ),
        id: x.id,
        position: { lat: x.lat, lng: x.lng },
      }))}
      naverMapLoaded={naverMapLoaded}
      onChangeBounds={handleChangeBounds}
      onChangePosition={setPosition}
      onLoaded={setLoadedMap}
      onMarkerClick={handleMarkerClick}
      position={position}
    />
  );
};
