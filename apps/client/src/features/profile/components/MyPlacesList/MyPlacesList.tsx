'use client';

import type { Place } from '@travel-pins/domains';

import { Icon, Skeleton, Typography } from '@travel-pins/components';
import { fetchApi } from '@travel-pins/request';
import { useEffect, useState } from 'react';

export const MyPlacesList = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchApi.get<Place[]>('users/me/places');
        setPlaces(res);
      } catch {
        setPlaces([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton height={64} key={i} width="100%" />
        ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="text-center py-8">
        <Typography className="text-grey-400" variant="body-small">
          저장한 장소가 없습니다.
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {places.map((place) => (
        <div
          className="flex items-center gap-3 p-3 rounded-lg border border-grey-100 hover:bg-grey-50 transition-colors"
          key={place.id}
        >
          {place.thumbnail ? (
            <img
              alt={place.name}
              className="w-12 h-12 rounded-lg object-cover"
              src={place.thumbnail}
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-grey-100 flex items-center justify-center">
              <Icon name="place" size={20} />
            </div>
          )}
          <div className="flex flex-col">
            <Typography variant="body-small">{place.name}</Typography>
            <Typography className="text-grey-400" variant="label-medium">
              {place.address}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};
