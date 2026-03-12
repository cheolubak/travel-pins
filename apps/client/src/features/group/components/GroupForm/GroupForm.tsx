'use client';

import { Button, Input, Textarea, Typography } from '@travel-pins/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGroups } from '@/src/features/group/stores/useGroups';

export const GroupForm = () => {
  const router = useRouter();
  const { createGroup } = useGroups();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setIsSubmitting(true);

    const success = await createGroup({
      description: description.trim() || undefined,
      name: name.trim(),
    });

    if (success) {
      router.push('/groups');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="title-medium">그룹 만들기</Typography>

      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder="그룹 이름"
        value={name}
      />

      <Textarea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="그룹 설명 (선택)"
        rows={3}
        value={description}
      />

      <div className="flex gap-2 justify-end">
        <Button onClick={() => router.back()} variant="secondary">
          취소
        </Button>
        <Button
          disabled={isSubmitting || !name.trim()}
          onClick={handleSubmit}
        >
          {isSubmitting ? '생성 중...' : '그룹 생성'}
        </Button>
      </div>
    </div>
  );
};
