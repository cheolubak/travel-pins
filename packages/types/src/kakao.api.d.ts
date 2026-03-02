declare namespace Kakao {
  namespace API {
    interface ApiRequestSettings {
      url: string;
      data?: Record<string, unknown>;
      files?: File[];
      success?: (response: unknown) => void;
      fail?: (error: unknown) => void;
      always?: (response: unknown) => void;
    }

    /** Make an API request to Kakao REST API */
    function request(settings: ApiRequestSettings): Promise<unknown>;

    /** Clean up API module resources */
    function cleanup(): void;
  }
}
