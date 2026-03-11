'use client';

import { Icon, Modal, Typography, useModal } from '@travel-pins/components';
import { useRouter } from 'next/navigation';

import styles from './Header.module.css';

export const Header = () => {
  const router = useRouter();
  const { open } = useModal();

  const handleLoginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    });
  };

  const handleLoginWithNaver = () => {
    const searchParams = new URLSearchParams();
    searchParams.set(
      'client_id',
      process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID!,
    );
    searchParams.set('response_type', 'code');
    searchParams.set(
      'redirect_uri',
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/naver`,
    );

    router.push(
      `https://nid.naver.com/oauth2.0/authorize?${searchParams.toString()}`,
    );
  };

  const handleClickMyPage = () => {
    open(
      <Modal className={'flex flex-col justify-center items-center gap-4'}>
        <Typography>로그인</Typography>
        <button
          aria-label="카카오 로그인"
          onClick={handleLoginWithKakao}
          type="button"
        >
          카카오 로그인
        </button>
        <button
          aria-label="네이버 로그인"
          onClick={handleLoginWithNaver}
          type="button"
        >
          네이버 로그인
        </button>
      </Modal>,
    );
  };

  return (
    <header className={styles.header}>
      <button aria-label="마이페이지" onClick={handleClickMyPage} type="button">
        <Icon name="person" />
      </button>
    </header>
  );
};
