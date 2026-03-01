import type { Place, Position } from '@travel-pins/domains';

import { fetchApi } from '@travel-pins/request';
import { create } from 'zustand';

interface PlacesState {
  places: Place[];
  searchPlaces: (leftBottom: Position, rightTop: Position) => Promise<void>;
}

export const usePlaces = create<PlacesState>((set) => ({
  places: [],
  searchPlaces: async (leftBottom: Position, rightTop: Position) => {
    console.log('=======searchPlaces=======');
    const { lat: leftBottomLat, lng: leftBottomLng } = leftBottom;
    const { lat: rightTopLat, lng: rightTopLng } = rightTop;

    const res = await fetchApi.get<Place[]>('places', {
      params: {
        leftBottomLat,
        leftBottomLng,
        rightTopLat,
        rightTopLng,
      },
    });

    console.log('=======res=======', res);

    set(() => ({ places: res }));
  },
}));
