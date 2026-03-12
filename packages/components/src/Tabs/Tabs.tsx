'use client';

import { cn } from '@travel-pins/utils';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  className?: string;
  onChange: (key: string) => void;
  tabs: Tab[];
  value: string;
}

export const Tabs = ({ className, onChange, tabs, value }: TabsProps) => {
  return (
    <div
      className={cn(
        'flex border-b border-grey-200',
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          className={cn(
            'px-4 py-3 text-sm font-medium transition-colors cursor-pointer',
            tab.key === value
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-grey-500 hover:text-grey-700',
          )}
          key={tab.key}
          onClick={() => onChange(tab.key)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
