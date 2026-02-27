'use client';

import type { KeyboardEvent } from 'react';

import { Icon, Input } from '@travel-pins/components';

import { usePosition } from '@/src/features/map/stores/usePosition';

export const Search = () => {
  const searchAddress = usePosition((state) => state.searchPosition);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    const { value } = e.target as HTMLInputElement;

    if (key.toLowerCase().includes('enter')) {
      searchAddress(value);
    }
  };

  return (
    <Input
      className={
        'fixed top-8 left-1/2 -translate-x-1/2 z-1000 min-w-[500px] max-w-11/12'
      }
      onKeyDown={handleKeyboardEvent}
      placeholder="지역을 입력해주세요."
      prefix={<Icon name="map" />}
      suffix={<Icon name="search" />}
    />
  );
};
