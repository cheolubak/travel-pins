'use client';

import { Avatar, Badge, Typography } from '@travel-pins/components';

import { useAuth } from '@/src/features/auth/stores/useAuth';

const PROVIDER_LABEL: Record<string, string> = {
  GOOGLE: '구글',
  KAKAO: '카카오',
  NAVER: '네이버',
};

const PROVIDER_VARIANT: Record<
  string,
  'grey' | 'blue' | 'green' | 'red' | 'orange'
> = {
  GOOGLE: 'blue',
  KAKAO: 'orange',
  NAVER: 'green',
};

export const ProfileHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-8">
        <Typography variant="body-medium">로그인이 필요합니다.</Typography>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar name={user.name} size="lg" src={user.profileImage} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Typography variant="title-small">{user.name}</Typography>
          <Badge size="sm" variant={PROVIDER_VARIANT[user.provider]}>
            {PROVIDER_LABEL[user.provider]}
          </Badge>
        </div>
        <Typography className="text-grey-500" variant="body-small">
          {user.email}
        </Typography>
      </div>
    </div>
  );
};
