import { MapView } from '@/src/features/map/components/MapView';
import { Search } from '@/src/features/map/components/Search';

export const MapPage = () => {
  return (
    <div>
      <Search />
      <MapView />
    </div>
  );
};
