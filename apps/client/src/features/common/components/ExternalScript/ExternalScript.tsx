'use client';

import Script from 'next/script';

import { useExternalScripts } from '@/src/features/map/stores/useExternalScripts';

export const ExternalScript = () => {
  const loadedKakaoMap = useExternalScripts((state) => state.loadedKakaoMap);
  const loadedKakaoSdk = useExternalScripts((state) => state.loadedKakaoSdk);
  const loadedNaverLogin = useExternalScripts(
    (state) => state.loadedNaverLogin,
  );
  const loadedNaverMap = useExternalScripts((state) => state.loadedNaverMap);

  return (
    <>
      <Script
        onLoad={loadedKakaoMap}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
      />
      <Script
        crossOrigin="anonymous"
        onLoad={() => {
          if (
            !process.env.NEXT_PUBLIC_KAKAO_APP_KEY ||
            Kakao.isInitialized()
          ) {
            return;
          }

          loadedKakaoSdk();
          Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
        }}
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js"
      />
      <Script
        onLoad={loadedNaverLogin}
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
      />
      <Script
        onLoad={loadedNaverMap}
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
      />
    </>
  );
};
