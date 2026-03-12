'use client';

import { FloatingActionButton, Icon, useModal } from '@travel-pins/components';

import { useAuth } from '@/src/features/auth/stores/useAuth';
import { MapView } from '@/src/features/map/components/MapView';
import { Search } from '@/src/features/map/components/Search';
import { useLoadedMap } from '@/src/features/map/stores/useLoadedMap';
import { PlaceCreateForm } from '@/src/features/place/components/PlaceCreateForm';

export const MapPage = () => {
  const loadedMap = useLoadedMap((state) => state.loaded);
  const { isAuthenticated } = useAuth();
  const { open } = useModal();

  const handleAddPlace = () => {
    open(<PlaceCreateForm />);
  };

  return (
    <div>
      {loadedMap && <Search />}
      <MapView />
      {isAuthenticated && (
        <FloatingActionButton
          aria-label="장소 등록"
          onClick={handleAddPlace}
        >
          <Icon color="white" name="add" size={24} />
        </FloatingActionButton>
      )}
    </div>
  );
};
