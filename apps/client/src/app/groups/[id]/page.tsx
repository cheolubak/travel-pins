'use client';

import { CommonMap, Skeleton, Typography } from '@travel-pins/components';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/src/features/auth/stores/useAuth';
import { GroupMemberList } from '@/src/features/group/components/GroupMemberList';
import { useGroupDetail } from '@/src/features/group/stores/useGroupDetail';
import { Marker } from '@/src/features/map/components/Marker';
import { useExternalScripts } from '@/src/features/map/stores/useExternalScripts';

export default function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const {
    group,
    members,
    places,
    isLoading,
    fetchGroupDetail,
    removeMember,
  } = useGroupDetail();
  const naverMapLoaded = useExternalScripts((state) => state.initNaverMap);

  useEffect(() => {
    fetchGroupDetail(id);
  }, [id, fetchGroupDetail]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        <Skeleton height={32} width="50%" />
        <Skeleton height={300} width="100%" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 text-center">
        <Typography variant="body-medium">그룹을 찾을 수 없습니다.</Typography>
      </div>
    );
  }

  const isOwner = user?.id === group.createdBy;
  const center = places.length > 0
    ? { lat: places[0].lat, lng: places[0].lng }
    : undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div>
        <Typography variant="title-medium">{group.name}</Typography>
        {group.description && (
          <Typography className="text-grey-500 mt-1" variant="body-small">
            {group.description}
          </Typography>
        )}
      </div>

      <div className="w-full h-64 rounded-lg overflow-hidden">
        <CommonMap
          initCenter={center}
          markers={places.map((p) => ({
            content: <Marker type={p.type} />,
            id: p.id,
            position: { lat: p.lat, lng: p.lng },
          }))}
          naverMapLoaded={naverMapLoaded}
        />
      </div>

      <GroupMemberList
        isOwner={isOwner}
        members={members}
        onRemove={(userId) => removeMember(group.id, userId)}
      />
    </div>
  );
}
