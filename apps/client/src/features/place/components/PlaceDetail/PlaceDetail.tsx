'use client';

import { Icon, Modal, Skeleton, Typography, useModal } from '@travel-pins/components';

import { BookmarkButton } from '@/src/features/bookmark/components/BookmarkButton';
import { useSelectedPlace } from '@/src/features/place/stores/useSelectedPlace';

const PLACE_TYPE_LABEL: Record<string, string> = {
  CAFE: '카페',
  FOOD: '맛집',
  PLACE: '장소',
  STORE: '가게',
};

const PLACE_TYPE_ICON: Record<string, string> = {
  CAFE: 'food',
  FOOD: 'food',
  PLACE: 'place',
  STORE: 'store',
};

export const PlaceDetail = () => {
  const { place, isLoading } = useSelectedPlace();
  const { close } = useModal();

  if (isLoading) {
    return (
      <Modal className="flex flex-col gap-4 p-6">
        <Skeleton height={24} width="60%" />
        <Skeleton height={16} width="40%" />
        <Skeleton height={200} width="100%" />
      </Modal>
    );
  }

  if (!place) return null;

  return (
    <Modal className="flex flex-col gap-4 p-6 max-w-lg w-full">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <Typography variant="title-medium">{place.name}</Typography>
          <div className="flex items-center gap-2">
            <Icon
              name={PLACE_TYPE_ICON[place.type] as 'place'}
              size={16}
            />
            <Typography variant="body-small">
              {PLACE_TYPE_LABEL[place.type]}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkButton placeId={place.id} />
          <button
            aria-label="닫기"
            onClick={() => close()}
            type="button"
          >
            <Icon name="clear" size={24} />
          </button>
        </div>
      </div>

      {place.thumbnail && (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <img
            alt={place.name}
            className="w-full h-full object-cover"
            src={place.thumbnail}
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Icon name="place" size={16} />
          <Typography variant="body-small">{place.address}</Typography>
        </div>
        {place.detailAddress && (
          <Typography className="pl-6" variant="body-small">
            {place.detailAddress}
          </Typography>
        )}
      </div>

      {place.reviewCount > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-grey-200">
          <Icon name="star" size={16} />
          <Typography variant="body-small">
            리뷰 {place.reviewCount}개
          </Typography>
        </div>
      )}
    </Modal>
  );
};
