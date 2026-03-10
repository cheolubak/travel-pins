import { MapPage } from '@/src/features/map/pages/MapPage';

export default function Home() {
  if (!process.env.NAVER_MAP_CLIENT_ID || !process.env.KAKAO_APP_KEY) {
    return null;
  }

  return <MapPage />;
}
