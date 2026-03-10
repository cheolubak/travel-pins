import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    KAKAO_APP_KEY: process.env.KAKAO_APP_KEY,
    KAKAO_REST_KEY: process.env.KAKAO_REST_KEY,
    NAVER_LOGIN_CLIENT_ID: process.env.NAVER_LOGIN_CLIENT_ID,
    NAVER_LOGIN_CLIENT_SECRET: process.env.NAVER_LOGIN_CLIENT_SECRET,
    NAVER_MAP_CLIENT_ID: process.env.NAVER_MAP_CLIENT_ID,
    NAVER_MAP_CLIENT_SECRET: process.env.NAVER_MAP_CLIENT_SECRET,
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
