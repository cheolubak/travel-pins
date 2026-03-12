'use client';

import type { ChangeEvent } from 'react';

import { cn } from '@travel-pins/utils';
import { useRef } from 'react';

interface ImageUploaderProps {
  className?: string;
  maxFiles?: number;
  onChange: (files: File[]) => void;
  previews?: string[];
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const ImageUploader = ({
  className,
  maxFiles = 5,
  onChange,
  previews = [],
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const validFiles = Array.from(fileList).filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) return false;
      if (file.size > MAX_FILE_SIZE) return false;
      return true;
    });

    const remaining = maxFiles - previews.length;
    onChange(validFiles.slice(0, remaining));

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const canAddMore = previews.length < maxFiles;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {previews.map((src, i) => (
            <div
              className="relative w-20 h-20 rounded-lg overflow-hidden"
              key={src}
            >
              <img
                alt={`미리보기 ${i + 1}`}
                className="w-full h-full object-cover"
                src={src}
              />
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <button
          className="w-full h-24 border-2 border-dashed border-grey-300 rounded-lg flex items-center justify-center text-grey-400 hover:border-blue-400 hover:text-blue-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          <span className="text-sm">
            이미지 추가 ({previews.length}/{maxFiles})
          </span>
        </button>
      )}

      <input
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        multiple
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
    </div>
  );
};
