'use client';

import type { KeyboardEvent } from 'react';

import {
  Icon,
  Input,
  Modal,
  Typography,
  useModal,
} from '@travel-pins/components';
import { useEffect } from 'react';
import { useRef } from 'react';

import { useInitKakao } from '@/src/features/map/stores/useInitKakao';
import { useLoadedMap } from '@/src/features/map/stores/useLoadedMap';
import { useMap } from '@/src/features/map/stores/useMap';

import styles from './Search.module.css';

export const Search = () => {
  const { open } = useModal();
  const initKakaoMap = useInitKakao((state) => state.initKakaoMap);

  const searchAddress = useMap((state) => state.searchPosition);

  const placeRef = useRef<kakao.maps.services.Places | null>(null);

  useEffect(() => {
    if (!initKakaoMap) {
      return;
    }

    kakao.maps.load(() => {
      placeRef.current = new kakao.maps.services.Places();
    });
  }, [initKakaoMap]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    const { value } = e.target as HTMLInputElement;

    if (!key.toLowerCase().includes('enter')) {
      return;
    }

    placeRef.current?.keywordSearch(value, (data, status, pagination) => {
      if (status !== kakao.maps.services.Status.OK) {
        return open(
          <Modal>
            <Typography>검색 결과가 없습니다</Typography>
          </Modal>,
        );
      }
    });

    searchAddress(value).catch((err) => {
      if (typeof err === 'string') {
        open(
          <Modal>
            <Typography>{err}</Typography>
          </Modal>,
        );
      }
    });
  };

  return (
    <Input
      className={styles.search}
      onKeyDown={handleKeyboardEvent}
      placeholder="원하는 장소를 입력해주세요."
      prefix={<Icon name="map" />}
      suffix={<Icon name="search" />}
    />
  );
};
