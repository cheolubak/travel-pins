'use client';

import { Button, Icon, Skeleton, Typography } from '@travel-pins/components';
import Link from 'next/link';
import { useEffect } from 'react';

import { GroupCard } from '@/src/features/group/components/GroupCard';
import { useGroups } from '@/src/features/group/stores/useGroups';

export default function GroupsPage() {
  const { groups, isLoading, fetchGroups } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="title-medium">내 그룹</Typography>
        <Link href="/groups/create">
          <Button size="sm">
            <Icon color="white" name="add" size={16} />
            <span className="ml-1">새 그룹</span>
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton height={80} key={i} width="100%" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <div className="text-center py-12">
          <Typography className="text-grey-400" variant="body-medium">
            아직 그룹이 없습니다.
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {groups.map((group) => (
            <GroupCard group={group} key={group.id} />
          ))}
        </div>
      )}
    </div>
  );
}
