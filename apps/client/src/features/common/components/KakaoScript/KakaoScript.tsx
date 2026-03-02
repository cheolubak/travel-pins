'use client';

import Script from 'next/script';

import { useInitKakao } from '@/src/features/map/stores/useInitKakao';

export const KakaoScript = () => {
  const { loadedKakaoMap, loadedKakaoSdk } = useInitKakao((state) => state);
  return (
    <>
      <Script
        onLoad={loadedKakaoMap}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
      />
      <Script
        crossOrigin="anonymous"
        onLoad={() => {
          if (!process.env.KAKAO_APP_KEY || Kakao.isInitialized()) {
            return;
          }

          loadedKakaoSdk();
          Kakao.init(process.env.KAKAO_APP_KEY);
        }}
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js"
      />
    </>
  );
};
