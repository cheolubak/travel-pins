import type { Position } from '@travel-pins/domains';

import { create } from 'zustand';

interface PositionState {
  position: Position;
  searchPosition: (address: string) => void;
  setPosition: (position: Position) => void;
}

const POSITION_STORAGE_KEY = 'last-pos';

const DEFAULT_POSITION: Position = {
  lat: 37.5665,
  lng: 126.978,
};

const getInitialPosition = (): Position => {
  if (typeof window === 'undefined') {
    return DEFAULT_POSITION;
  }

  const savedPosition = localStorage.getItem(POSITION_STORAGE_KEY);
  if (savedPosition) {
    try {
      return JSON.parse(savedPosition);
    } catch (error) {
      console.error('Failed to parse position from localStorage', error);
    }
  }

  return DEFAULT_POSITION;
};

export const usePosition = create<PositionState>((set) => ({
  position: getInitialPosition(),
  searchPosition: (address: string) => {
    if (typeof naver === 'undefined') {
      console.error('Naver Maps script is not loaded yet');
      return;
    }

    naver.maps.Service.geocode({ query: address }, function (status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return;
      }

      const result = response.v2.addresses.at(0);
      if (!result) {
        return;
      }

      console.log('=======response.v2=======', result);

      const { x, y } = result;

      set({ position: { lat: Number(y), lng: Number(x) } });
    });
  },
  setPosition: (position) => {
    localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));

    set({ position });
  },
}));
