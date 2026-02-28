'use client';

import { MapView } from '@/src/features/map/components/MapView';
import { Search } from '@/src/features/map/components/Search';
import { useLoadedMap } from '@/src/features/map/stores/useLoadedMap';

export const MapPage = () => {
  const loadedMap = useLoadedMap((state) => state.loaded);

  return (
    <div>
      {loadedMap && <Search />}
      <MapView />
    </div>
  );
};
