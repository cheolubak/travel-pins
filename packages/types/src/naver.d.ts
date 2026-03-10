declare namespace naver {
  interface LoginButtonOptions {
    color?: 'white' | 'green';
    height?: 20 | 30 | 40 | 50 | 60;
    type?: 1 | 2 | 3;
  }

  interface NaverUser {
    age?: string;
    birthday?: string;
    birthyear?: string;
    email?: string;
    gender?: string;
    id?: string;
    mobile?: string;
    name?: string;
    nickname?: string;
    profile_image?: string;
  }

  interface LoginStatusResponse {
    naverUser?: NaverUser;
    status: string;
  }

  interface LoginWithNaverIdOptions {
    callbackHandle?: boolean;
    callbackUrl: string;
    clientId: string;
    isPopup?: boolean;
    loginButton?: LoginButtonOptions;
  }

  class LoginWithNaverId {
    constructor(options: LoginWithNaverIdOptions);

    init(): void;

    getLoginStatus(callback: (status: LoginStatusResponse) => void): void;

    logout(): void;

    user: NaverUser;
    accessToken: {
      accessToken: string;
      expires: string;
      ttl: number;
    };
  }
}
