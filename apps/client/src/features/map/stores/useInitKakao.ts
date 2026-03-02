import { create } from 'zustand';

interface InitKakaoState {
  initKakaoMap: boolean;
  initKakaoSdk: boolean;
  loadedKakaoMap: () => void;
  loadedKakaoSdk: () => void;
}

export const useInitKakao = create<InitKakaoState>((set) => ({
  initKakaoMap: false,
  initKakaoSdk: false,
  loadedKakaoMap: () => set((state) => ({ ...state, initKakaoMap: true })),
  loadedKakaoSdk: () => set((state) => ({ ...state, initKakaoSdk: true })),
}));
