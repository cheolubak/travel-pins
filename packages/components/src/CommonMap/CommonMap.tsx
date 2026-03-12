'use client';

import type { Position } from '@travel-pins/domains';
import type { ReactNode } from 'react';

import { clsx } from 'clsx';
import throttle from 'lodash/throttle';
import { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Skeleton } from '../Skeleton';

import styles from './CommonMap.module.css';

interface MapProps {
  className?: string;
  initCenter?: Position;
  markers?: { content: ReactNode; id: string; position: Position }[];
  naverMapLoaded: boolean;
  onChangeBounds?: (leftBottom: Position, rightTop: Position) => void;
  onChangePosition?: (position: Position) => void;
  onLoaded?: () => void;
  onMarkerClick?: (id: string) => void;
  position?: Position;
}

export const CommonMap = ({
  className,
  initCenter = {
    lat: 37.3595704,
    lng: 127.105399,
  },
  markers,
  naverMapLoaded,
  onChangeBounds,
  onChangePosition,
  onLoaded,
  onMarkerClick,
  position,
}: MapProps) => {
  const mapElementRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<naver.maps.Map>(null);

  const [initNaverMap, setInitNaverMap] = useState(false);

  const markersRef = useRef<Map<string, naver.maps.Marker>>(new Map());

  const { lat, lng } = initCenter;

  useEffect(() => {
    if (!position || !mapRef.current || typeof naver === 'undefined') {
      return;
    }

    const { lat, lng } = position;
    mapRef.current.setCenter(new naver.maps.LatLng(lat, lng));
  }, [position]);

  useEffect(() => {
    if (!initNaverMap || !mapRef.current || !markers) {
      return;
    }

    const currentIds = new Set(markers.map((m) => m.id));

    markersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        marker.setMap(null);
        markersRef.current.delete(id);
      }
    });

    markers.forEach(({ content, id, position }) => {
      if (!markersRef.current.has(id)) {
        const marker = new naver.maps.Marker({
          icon: {
            anchor: new naver.maps.Point(16, 16),
            content: renderToStaticMarkup(content),
            size: new naver.maps.Size(48, 48),
          },
          map: mapRef.current!,
          position: new naver.maps.LatLng(position.lat, position.lng),
        });

        if (onMarkerClick) {
          naver.maps.Event.addListener(marker, 'click', () => {
            onMarkerClick(id);
          });
        }

        markersRef.current.set(id, marker);
      }
    });
  }, [initNaverMap, markers, onMarkerClick]);

  useEffect(() => {
    if (!naverMapLoaded) {
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

    const handleInitMap = () => {
      setInitNaverMap(true);

      if (!mapRef.current) {
        return;
      }

      const mapBounds = mapRef.current.getBounds();

      onChangeBounds?.(
        { lat: mapBounds.getMin().y, lng: mapBounds.getMin().x },
        { lat: mapBounds.getMax().y, lng: mapBounds.getMax().x },
      );
    };

    const handleChangeCenter = throttle((latlng: naver.maps.LatLng) => {
      const lat = latlng.lat();
      const lng = latlng.lng();
      onChangePosition?.({ lat, lng });

      handleUpdateMarkers();
    }, 300);

    const handleChangeBounds = throttle((bounds: naver.maps.LatLngBounds) => {
      const sw = bounds.getSW();
      const ne = bounds.getNE();

      onChangeBounds?.(
        { lat: sw.lat(), lng: sw.lng() },
        { lat: ne.lat(), lng: ne.lng() },
      );
    }, 300);

    const handleUpdateMarkers = () => {
      if (!mapRef.current) {
        return;
      }

      const mapBounds = mapRef.current.getBounds();
      const markers = [...markersRef.current.values()];

      markers.forEach((marker) => {
        if (mapBounds.hasPoint(marker.getPosition())) {
          showMarker(marker);
        } else {
          hideMarker(marker);
        }
      });
    };

    const showMarker = (marker: naver.maps.Marker) => {
      if (!mapRef.current) {
        return;
      }
      if (marker.getMap()) {
        return;
      }

      marker.setMap(mapRef.current);
    };

    const hideMarker = (marker: naver.maps.Marker) => {
      if (!marker.getMap()) {
        return;
      }

      marker.setMap(null);
    };

    const listeners: naver.maps.MapEventListener[] = [];

    listeners.push(
      naver.maps.Event.addListener(
        mapRef.current,
        'center_changed',
        handleChangeCenter,
      ),
      naver.maps.Event.addListener(mapRef.current, 'init', handleInitMap),
      naver.maps.Event.addListener(
        mapRef.current,
        'bounds_changed',
        handleChangeBounds,
      ),
    );

    onLoaded?.();

    return () => {
      naver.maps.Event.removeListener(listeners);
    };
  }, [naverMapLoaded]);

  return (
    <div className={clsx(styles.map, className)} ref={mapElementRef}>
      {!naverMapLoaded && <Skeleton height="100%" width="100%" />}
    </div>
  );
};
