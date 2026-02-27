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
  clientId: string;
  initCenter?: Position;
  onChangePosition?: (position: Position) => void;
  position?: Position;
}

export const CommonMap = ({
  cafeList,
  className,
  clientId,
  initCenter = {
    lat: 37.3595704,
    lng: 127.105399,
  },
  onChangePosition,
  position,
}: MapProps) => {
  const mapElementRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<naver.maps.Map>(null);

  const [loadedMapScript, setLoadedMapScript] = useState(false);
  const [initMap, setInitMap] = useState(false);

  const { lat, lng } = initCenter;

  useEffect(() => {
    if (!position || !mapRef.current || typeof naver === 'undefined') {
      return;
    }

    const { lat, lng } = position;
    mapRef.current.setCenter(new naver.maps.LatLng(lat, lng));
  }, [position]);

  useEffect(() => {
    if (!initMap || !mapRef.current || !cafeList || cafeList.length === 0) {
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
  }, [initMap, cafeList]);

  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      setLoadedMapScript(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId]);

  useEffect(() => {
    if (!loadedMapScript) {
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
        setInitMap(true);
      }),
    );

    return () => {
      mapRef.current?.removeListener(listeners);
    };
  }, [loadedMapScript]);

  return (
    <div className={clsx(styles.map, className)} ref={mapElementRef}>
      {!loadedMapScript && <Skeleton height="100%" width="100%" />}
    </div>
  );
};
