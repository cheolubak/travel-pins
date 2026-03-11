import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GlobalModal } from '@travel-pins/components';
import localFont from 'next/font/local';

import { ExternalScript } from '@/src/features/common/components/ExternalScript';
import { Header } from '@/src/features/common/components/Header';

import './globals.css';

const pretendard = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
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
        className={`${pretendard.variable} antialiased`}
      >
        <ExternalScript />
        <Header />
        {children}
        <GlobalModal />
      </body>
    </html>
  );
}
