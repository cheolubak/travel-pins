'use client';

import { clsx } from 'clsx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Skeleton } from '../Skeleton';

import styles from './Map.module.css';

interface MapProps {
  className?: string;
  clientId: string;
  initCenter?: {
    lat: number;
    lng: number;
  };
}

export const Map = ({
  className,
  clientId,
  initCenter = {
    lat: 37.3595704,
    lng: 127.105399,
  },
}: MapProps) => {
  const mapElementRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<naver.maps.Map>(null);

  const [initMap, setInitMap] = useState(false);

  const { lat, lng } = initCenter;

  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      setInitMap(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId]);

  useEffect(() => {
    if (!initMap) {
      return;
    }

    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 10,
    };

    mapRef.current = new naver.maps.Map(mapElementRef.current, mapOptions);
  }, [initMap]);

  return (
    <div className={clsx(styles.map, className)} ref={mapElementRef}>
      {!initMap && <Skeleton height="100%" width="100%" />}
    </div>
  );
};
