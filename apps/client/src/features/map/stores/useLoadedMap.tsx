import { create } from 'zustand';

interface LoadedMapState {
  loaded: boolean;
  setLoaded: () => void;
}

export const useLoadedMap = create<LoadedMapState>((set) => ({
  loaded: false,
  setLoaded: () => set({ loaded: true }),
}));
