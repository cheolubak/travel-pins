import type { Position } from '@travel-pins/domains';

import { create } from 'zustand';

interface MapState {
  position: Position;
  searchPosition: (address: string) => Promise<void>;
  setPosition: (position: Position) => void;
}

const POSITION_STORAGE_KEY = 'last-pos';

const DEFAULT_POSITION: Position = {
  lat: 37.5665,
  lng: 126.978,
};

const getInitialMap = (): Position => {
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

export const useMap = create<MapState>((set, get) => ({
  position: getInitialMap(),
  searchPosition: async (address: string) => {
    return new Promise((resolve, reject) => {
      if (!window.kakao?.maps?.load) {
        return reject(
          new Error('지도 SDK가 아직 로드되지 않았습니다'),
        );
      }

      kakao.maps.load(() => {
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(address, (data, status) => {
          if (status !== kakao.maps.services.Status.OK) {
            return reject(
              new Error('오류가 발생했습니다. 잠시 후에 시도해주세요'),
            );
          }

          const result = data.at(0);
          if (!result) {
            return reject(new Error('검색 결과가 없습니다'));
          }

          const { x, y } = result;
          get().setPosition({ lat: Number(y), lng: Number(x) });
          resolve();
        });
      });
    });
  },
  setPosition: (position) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));
    }

    set({ position });
  },
}));
