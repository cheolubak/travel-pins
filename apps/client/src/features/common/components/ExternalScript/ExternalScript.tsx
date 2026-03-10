'use client';

import Script from 'next/script';

import { useInitExternalKakao } from '@/src/features/map/stores/useInitExternalKakao';

export const ExternalScript = () => {
  const { loadedKakaoMap, loadedKakaoSdk, loadedNaverLogin } =
    useInitExternalKakao((state) => state);
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
      <Script
        onLoad={() => {
          if (
            !process.env.NAVER_LOIGIN_CLIENT_ID ||
            !process.env.NAVER_LOIGIN_CALLBACK_URL
          ) {
            return;
          }

          loadedNaverLogin();
        }}
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
      />
    </>
  );
};
