import { Map } from '@travel-pins/components';

export default function Home() {
  if (!process.env.NAVER_CLIENT_ID) {
    return null;
  }

  return (
    <Map
      className={'fixed top-0 left-0 w-screen h-screen'}
      clientId={process.env.NAVER_CLIENT_ID}
    />
  );
}
