'use client';

import type { GroupMember } from '@travel-pins/domains';

import { Avatar, Button, Typography } from '@travel-pins/components';

interface GroupMemberListProps {
  isOwner: boolean;
  members: GroupMember[];
  onRemove?: (userId: string) => void;
}

export const GroupMemberList = ({
  isOwner,
  members,
  onRemove,
}: GroupMemberListProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body-medium">
        멤버 ({members.length})
      </Typography>
      {members.map((member) => (
        <div
          className="flex items-center justify-between py-2"
          key={member.userId}
        >
          <div className="flex items-center gap-2">
            <Avatar
              name={member.userName}
              size="sm"
              src={member.userProfileImage}
            />
            <div className="flex items-center gap-1">
              <Typography variant="body-small">{member.userName}</Typography>
              {member.role === 'OWNER' && (
                <Typography className="text-blue-500" variant="label-medium">
                  소유자
                </Typography>
              )}
            </div>
          </div>
          {isOwner && member.role !== 'OWNER' && onRemove && (
            <Button
              onClick={() => onRemove(member.userId)}
              size="sm"
              variant="ghost"
            >
              제거
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
