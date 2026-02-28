'use client';

import type { Position } from '@travel-pins/domains';

import { clsx } from 'clsx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import styles from './CommonMap.module.css';

interface MapProps {
  cafeList?: Position[];
  className?: string;
  initCenter?: Position;
  kakaoAppKey: string;
  naverClientId: string;
  onChangePosition?: (position: Position) => void;
  onLoaded?: () => void;
  position?: Position;
}

export const CommonMap = ({
  cafeList,
  className,
  initCenter = {
    lat: 37.3595704,
    lng: 127.105399,
  },
  kakaoAppKey,
  naverClientId,
  onChangePosition,
  onLoaded,
  position,
}: MapProps) => {
  const mapElementRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<naver.maps.Map>(null);

  const [loadedNaverMapScript, setLoadedNaverMapScript] = useState(false);
  const [initNaverMap, setInitNaverMap] = useState(false);

  const { lat, lng } = initCenter;

  useEffect(() => {
    if (!position || !mapRef.current || typeof naver === 'undefined') {
      return;
    }

    const { lat, lng } = position;
    mapRef.current.setCenter(new naver.maps.LatLng(lat, lng));
  }, [position]);

  useEffect(() => {
    if (
      !initNaverMap ||
      !mapRef.current ||
      !cafeList ||
      cafeList.length === 0
    ) {
      return;
    }

    cafeList.forEach((pos) => {
      const marker = new naver.maps.Marker({
        icon: {
          content: renderToStaticMarkup(<Icon name="cafe" size={48} />),
          size: new naver.maps.Size(48, 48),
        },
        map: mapRef.current!,
        position: new naver.maps.LatLng(pos.lat, pos.lng),
      });
    });
  }, [initNaverMap, cafeList]);

  useLayoutEffect(() => {
    const naverMapScript = document.createElement('script');
    naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverClientId}&submodules=geocoder`;
    naverMapScript.type = 'text/javascript';
    naverMapScript.async = true;
    naverMapScript.onload = () => {
      setLoadedNaverMapScript(true);
    };

    document.body.appendChild(naverMapScript);

    return () => {
      document.body.removeChild(naverMapScript);
    };
  }, [naverClientId]);

  useEffect(() => {
    if (!loadedNaverMapScript) {
      return;
    }

    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(lat, lng),
      maxZoom: 21,
      minZoom: 10,
      zoom: 21,
    };

    mapRef.current = new naver.maps.Map(mapElementRef.current, mapOptions);

    const handleChangeCenter = (latlng: naver.maps.LatLng) => {
      const lat = latlng.lat();
      const lng = latlng.lng();
      onChangePosition?.({ lat, lng });
    };

    const listeners: naver.maps.MapEventListener[] = [];

    listeners.push(
      mapRef.current.addListener('center_changed', handleChangeCenter),
      mapRef.current.addListener('init', () => {
        setInitNaverMap(true);
      }),
    );

    onLoaded?.();

    return () => {
      mapRef.current?.removeListener(listeners);
    };
  }, [loadedNaverMapScript]);

  return (
    <div className={clsx(styles.map, className)} ref={mapElementRef}>
      {!loadedNaverMapScript && <Skeleton height="100%" width="100%" />}
    </div>
  );
};
