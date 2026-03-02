declare namespace Kakao {
  /** Initialize the Kakao SDK with your app key */
  function init(appKey: string): void;

  /** Check if the SDK has been initialized */
  function isInitialized(): boolean;

  /** Clean up the SDK and release resources */
  function cleanup(): void;

  /** Current SDK version */
  const VERSION: string;
}
