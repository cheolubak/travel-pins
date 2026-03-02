declare namespace Kakao {
  namespace Auth {
    interface AuthorizeSettings {
      redirectUri: string;
      state?: string;
      scope?: string;
      prompt?: string;
      loginHint?: string;
      nonce?: string;
      throughTalk?: boolean;
      serviceTerms?: string;
    }

    interface AuthStatusResponse {
      status: 'connected' | 'not_connected';
      user?: Record<string, unknown>;
    }

    interface AuthLogoutResponse {
      id: number;
    }

    interface ShippingAddressSettings {
      continuousRedirectUri?: string;
      returnUrl?: string;
    }

    interface ShippingAddress {
      id: number;
      name?: string;
      isDefault: boolean;
      updatedAt?: string;
      type?: string;
      baseAddress?: string;
      detailAddress?: string;
      receiverName?: string;
      receiverPhoneNumber1?: string;
      receiverPhoneNumber2?: string;
      zonecode?: string;
      zipcode?: string;
    }

    interface ShippingAddressResponse {
      userId: number;
      needsAgreement?: boolean;
      shippingAddresses: ShippingAddress[];
    }

    /** Start OAuth login flow via redirect */
    function authorize(settings: AuthorizeSettings): void;

    /** Get the current access token */
    function getAccessToken(): string | null;

    /** Set the access token manually */
    function setAccessToken(token: string, persist?: boolean): void;

    /** Get the current app key */
    function getAppKey(): string;

    /** Get the current user's login status */
    function getStatusInfo(): Promise<AuthStatusResponse>;

    /** Log out the current user */
    function logout(): Promise<AuthLogoutResponse>;

    /** Open the shipping address picker */
    function selectShippingAddress(
      settings?: ShippingAddressSettings,
    ): Promise<ShippingAddressResponse>;

    /** Clean up Auth module resources */
    function cleanup(): void;
  }
}
