import type { ReactNode } from 'react';

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {children}
    </div>
  );
}
