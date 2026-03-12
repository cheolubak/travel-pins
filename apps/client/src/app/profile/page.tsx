'use client';

import { Tabs } from '@travel-pins/components';
import { useState } from 'react';

import { MyPlacesList } from '@/src/features/profile/components/MyPlacesList';
import { MyReviewsList } from '@/src/features/profile/components/MyReviewsList';
import { ProfileHeader } from '@/src/features/profile/components/ProfileHeader';

const TABS = [
  { key: 'places', label: '내 장소' },
  { key: 'reviews', label: '내 리뷰' },
  { key: 'groups', label: '내 그룹' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('places');

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader />
      <Tabs onChange={setActiveTab} tabs={TABS} value={activeTab} />

      {activeTab === 'places' && <MyPlacesList />}
      {activeTab === 'reviews' && <MyReviewsList />}
      {activeTab === 'groups' && (
        <div className="text-center py-8 text-grey-400 text-sm">
          그룹 여행 기능 준비 중
        </div>
      )}
    </div>
  );
}
