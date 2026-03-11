'use client';

import type { KeyboardEvent } from 'react';

import {
  Icon,
  Input,
  Modal,
  Typography,
  useModal,
} from '@travel-pins/components';

import { useMap } from '@/src/features/map/stores/useMap';

import styles from './Search.module.css';

export const Search = () => {
  const { open } = useModal();

  const searchAddress = useMap((state) => state.searchPosition);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    const { value } = e.target as HTMLInputElement;

    if (!key.toLowerCase().includes('enter')) {
      return;
    }

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
      aria-label="장소 검색"
      className={styles.search}
      onKeyDown={handleKeyboardEvent}
      placeholder="원하는 장소를 입력해주세요."
      prefix={<Icon name="map" />}
      suffix={<Icon name="search" />}
    />
  );
};
