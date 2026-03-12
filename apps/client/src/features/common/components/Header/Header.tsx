'use client';

import { Icon, Modal, Typography, useModal } from '@travel-pins/components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/src/features/auth/stores/useAuth';

import styles from './Header.module.css';

export const Header = () => {
  const router = useRouter();
  const { open, close } = useModal();
  const { user, isAuthenticated, fetchUser, logout } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLoginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    });
  };

  const handleLoginWithNaver = () => {
    const state = crypto.randomUUID();

    document.cookie = `tp_naver_state=${state}; path=/; max-age=300; SameSite=Lax`;

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
    searchParams.set('state', state);

    router.push(
      `https://nid.naver.com/oauth2.0/authorize?${searchParams.toString()}`,
    );
  };

  const handleLoginWithGoogle = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!);
    searchParams.set('response_type', 'code');
    searchParams.set(
      'redirect_uri',
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/google`,
    );
    searchParams.set('scope', 'openid email profile');

    router.push(
      `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}`,
    );
  };

  const handleClickLogin = () => {
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
        <button
          aria-label="구글 로그인"
          onClick={handleLoginWithGoogle}
          type="button"
        >
          구글 로그인
        </button>
      </Modal>,
    );
  };

  const handleClickProfile = () => {
    open(
      <Modal className={'flex flex-col justify-center items-center gap-4'}>
        <Typography>{user?.name}</Typography>
        <button
          aria-label="마이페이지"
          onClick={() => {
            close();
            router.push('/profile');
          }}
          type="button"
        >
          마이페이지
        </button>
        <button
          aria-label="로그아웃"
          onClick={async () => {
            await logout();
            close();
          }}
          type="button"
        >
          로그아웃
        </button>
      </Modal>,
    );
  };

  return (
    <header className={styles.header}>
      {isAuthenticated ? (
        <button
          aria-label="프로필"
          onClick={handleClickProfile}
          type="button"
        >
          <Icon name="person" />
        </button>
      ) : (
        <button
          aria-label="로그인"
          onClick={handleClickLogin}
          type="button"
        >
          <Icon name="login" />
        </button>
      )}
    </header>
  );
};
