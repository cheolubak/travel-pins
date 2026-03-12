'use client';

import type { PlaceCreate } from '@travel-pins/domains';

import {
  Button,
  Chip,
  Input,
  Modal,
  Typography,
  useModal,
} from '@travel-pins/components';
import { useState } from 'react';

import { useCreatePlace } from '@/src/features/place/stores/useCreatePlace';

const PLACE_TYPES = [
  { label: '카페', value: 'CAFE' as const },
  { label: '맛집', value: 'FOOD' as const },
  { label: '가게', value: 'STORE' as const },
  { label: '장소', value: 'PLACE' as const },
];

export const PlaceCreateForm = () => {
  const { close } = useModal();
  const { createPlace, isSubmitting, error } = useCreatePlace();

  const [form, setForm] = useState<Partial<PlaceCreate>>({
    type: 'PLACE',
  });

  const handleSubmit = async () => {
    const success = await createPlace({
      address: form.address || '',
      detailAddress: form.detailAddress,
      lat: form.lat || 0,
      lng: form.lng || 0,
      name: form.name || '',
      type: form.type || 'PLACE',
    });

    if (success) {
      close();
    }
  };

  return (
    <Modal className="flex flex-col gap-4 p-6 max-w-lg w-full">
      <Typography variant="title-medium">장소 등록</Typography>

      <Input
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="장소 이름"
        value={form.name || ''}
      />

      <div className="flex flex-col gap-1">
        <Typography variant="body-small">카테고리</Typography>
        <div className="flex gap-2">
          {PLACE_TYPES.map((pt) => (
            <Chip
              key={pt.value}
              label={pt.label}
              onClick={() => setForm((f) => ({ ...f, type: pt.value }))}
              selected={form.type === pt.value}
            />
          ))}
        </div>
      </div>

      <Input
        onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
        placeholder="주소"
        value={form.address || ''}
      />

      <Input
        onChange={(e) =>
          setForm((f) => ({ ...f, detailAddress: e.target.value }))
        }
        placeholder="상세 주소 (선택)"
        value={form.detailAddress || ''}
      />

      <div className="flex gap-2">
        <Input
          onChange={(e) =>
            setForm((f) => ({ ...f, lat: Number(e.target.value) }))
          }
          placeholder="위도"
          type="number"
          value={form.lat || ''}
        />
        <Input
          onChange={(e) =>
            setForm((f) => ({ ...f, lng: Number(e.target.value) }))
          }
          placeholder="경도"
          type="number"
          value={form.lng || ''}
        />
      </div>

      {error && (
        <Typography className="text-red-500" variant="body-small">
          {error}
        </Typography>
      )}

      <div className="flex gap-2 justify-end">
        <Button onClick={() => close()} variant="secondary">
          취소
        </Button>
        <Button disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? '등록 중...' : '등록'}
        </Button>
      </div>
    </Modal>
  );
};
