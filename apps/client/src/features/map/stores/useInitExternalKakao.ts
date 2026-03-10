import { create } from 'zustand';

interface InitKakaoState {
  initKakaoMap: boolean;
  initKakaoSdk: boolean;
  initNaverLogin: boolean;
  loadedKakaoMap: () => void;
  loadedKakaoSdk: () => void;
  loadedNaverLogin: () => void;
}

export const useInitExternalKakao = create<InitKakaoState>((set) => ({
  initKakaoMap: false,
  initKakaoSdk: false,
  initNaverLogin: false,
  loadedKakaoMap: () => set((state) => ({ ...state, initKakaoMap: true })),
  loadedKakaoSdk: () => set((state) => ({ ...state, initKakaoSdk: true })),
  loadedNaverLogin: () => set((state) => ({ ...state, initNaverLogin: true })),
}));
