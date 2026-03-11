import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GlobalModal } from '@travel-pins/components';
import { Geist, Geist_Mono } from 'next/font/google';

import { ExternalScript } from '@/src/features/common/components/ExternalScript';
import { Header } from '@/src/features/common/components/Header';

import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  description: '내가 다녀온 장소를 지도에 핀으로 기록하고 관리하세요',
  title: 'Travel Pins - 여행 장소 기록',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ExternalScript />
        <Header />
        {children}
        <GlobalModal />
      </body>
    </html>
  );
}
