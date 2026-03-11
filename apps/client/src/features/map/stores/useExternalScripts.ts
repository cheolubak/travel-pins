import { create } from 'zustand';

interface ExternalScriptsState {
  initKakaoMap: boolean;
  initKakaoSdk: boolean;
  initNaverLogin: boolean;
  initNaverMap: boolean;
  loadedKakaoMap: () => void;
  loadedKakaoSdk: () => void;
  loadedNaverLogin: () => void;
  loadedNaverMap: () => void;
}

export const useExternalScripts = create<ExternalScriptsState>((set) => ({
  initKakaoMap: false,
  initKakaoSdk: false,
  initNaverLogin: false,
  initNaverMap: false,
  loadedKakaoMap: () => set({ initKakaoMap: true }),
  loadedKakaoSdk: () => set({ initKakaoSdk: true }),
  loadedNaverLogin: () => set({ initNaverLogin: true }),
  loadedNaverMap: () => set({ initNaverMap: true }),
}));
