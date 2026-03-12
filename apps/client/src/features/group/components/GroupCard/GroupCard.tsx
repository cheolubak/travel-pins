'use client';

import type { Group } from '@travel-pins/domains';

import { Icon, Typography } from '@travel-pins/components';
import Link from 'next/link';

interface GroupCardProps {
  group: Group;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <Link
      className="flex items-center gap-3 p-4 rounded-lg border border-grey-100 hover:bg-grey-50 transition-colors"
      href={`/groups/${group.id}`}
    >
      {group.coverImage ? (
        <img
          alt={group.name}
          className="w-14 h-14 rounded-lg object-cover"
          src={group.coverImage}
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon name="map" size={24} />
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <Typography variant="body-medium">{group.name}</Typography>
        {group.description && (
          <Typography className="text-grey-500" maxLines={1} variant="body-small">
            {group.description}
          </Typography>
        )}
        <div className="flex items-center gap-1">
          <Icon name="person" size={14} />
          <Typography className="text-grey-400" variant="label-medium">
            {group.memberCount}명
          </Typography>
        </div>
      </div>
    </Link>
  );
};
