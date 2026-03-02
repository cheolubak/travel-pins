'use client';

import { Icon, Modal, Typography, useModal } from '@travel-pins/components';

import styles from './Header.module.css';

export const Header = () => {
  const { open } = useModal();

  const handleLoginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/auth/callback',
    });
  };

  const handleClickMyPage = () => {
    open(
      <Modal className={'flex flex-col justify-center items-center gap-4'}>
        <Typography>로그인</Typography>
        <button onClick={handleLoginWithKakao}>카카오 로그인</button>
      </Modal>,
    );
  };

  return (
    <header className={styles.header}>
      <Icon name="person" onClick={handleClickMyPage} />
    </header>
  );
};
