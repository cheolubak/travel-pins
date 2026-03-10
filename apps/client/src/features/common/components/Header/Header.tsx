'use client';

import { Icon, Modal, Typography, useModal } from '@travel-pins/components';
import { useRouter } from 'next/navigation';

import styles from './Header.module.css';

export const Header = () => {
  const router = useRouter();
  const { open } = useModal();

  const handleLoginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/auth/callback',
    });
  };

  const handleLoginWithNaver = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('client_id', process.env.NAVER_LOGIN_CLIENT_ID!);
    searchParams.set('response_type', 'code');
    searchParams.set(
      'redirect_uri',
      'http://localhost:3000/auth/callback/naver',
    );

    router.push(
      `https://nid.naver.com/oauth2.0/authorize?${searchParams.toString()}`,
    );
  };

  const handleClickMyPage = () => {
    open(
      <Modal className={'flex flex-col justify-center items-center gap-4'}>
        <Typography>로그인</Typography>
        <button onClick={handleLoginWithKakao}>카카오 로그인</button>
        <button onClick={handleLoginWithNaver}>네이버 로그인</button>
      </Modal>,
    );
  };

  return (
    <header className={styles.header}>
      <Icon name="person" onClick={handleClickMyPage} />
    </header>
  );
};
