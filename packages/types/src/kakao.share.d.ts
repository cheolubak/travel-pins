declare namespace Kakao {
  namespace Share {
    // --- Common Types ---

    interface Link {
      webUrl?: string;
      mobileWebUrl?: string;
      androidExecutionParams?: string;
      iosExecutionParams?: string;
    }

    interface Content {
      title: string;
      imageUrl: string;
      link: Link;
      description?: string;
      imageWidth?: number;
      imageHeight?: number;
    }

    interface Button {
      title: string;
      link: Link;
    }

    interface Social {
      likeCount?: number;
      commentCount?: number;
      sharedCount?: number;
      viewCount?: number;
      subscriberCount?: number;
    }

    interface ItemInfo {
      item: string;
      itemOp: string;
    }

    interface ItemContent {
      profileText?: string;
      profileImageUrl?: string;
      titleImageText?: string;
      titleImageUrl?: string;
      titleImageCategory?: string;
      items?: ItemInfo[];
      sum?: string;
      sumOp?: string;
    }

    interface Commerce {
      regularPrice: number;
      discountPrice?: number;
      discountRate?: number;
      fixedDiscountPrice?: number;
      currencyUnit?: string;
      currencyUnitPosition?: number;
      productName?: string;
    }

    interface ImageInfos {
      original: {
        url: string;
        length: number;
        content_type: string;
        width: number;
        height: number;
      };
    }

    // --- Template Types ---

    interface FeedTemplate {
      objectType: 'feed';
      content: Content;
      itemContent?: ItemContent;
      social?: Social;
      buttons?: Button[];
      buttonTitle?: string;
    }

    interface ListTemplate {
      objectType: 'list';
      headerTitle: string;
      headerLink: Link;
      contents: Content[];
      buttons?: Button[];
      buttonTitle?: string;
    }

    interface LocationTemplate {
      objectType: 'location';
      address: string;
      addressTitle?: string;
      content: Content;
      social?: Social;
      buttons?: Button[];
      buttonTitle?: string;
    }

    interface CommerceTemplate {
      objectType: 'commerce';
      content: Content;
      commerce: Commerce;
      buttons?: Button[];
      buttonTitle?: string;
    }

    interface TextTemplate {
      objectType: 'text';
      text: string;
      link: Link;
      buttons?: Button[];
      buttonTitle?: string;
    }

    interface CalendarTemplate {
      objectType: 'calendar';
      idType: 'event' | 'calendar';
      id: string;
      content: Content;
      buttons?: Button[];
      buttonTitle?: string;
    }

    type DefaultTemplate =
      | FeedTemplate
      | ListTemplate
      | LocationTemplate
      | CommerceTemplate
      | TextTemplate
      | CalendarTemplate;

    // --- Settings Types ---

    interface DefaultSettings {
      templateObject: DefaultTemplate;
      installTalk?: boolean;
      callback?: () => void;
      serverCallbackArgs?: Record<string, string> | string;
    }

    interface CustomSettings {
      templateId: number;
      templateArgs?: Record<string, string>;
      installTalk?: boolean;
      callback?: () => void;
      serverCallbackArgs?: Record<string, string> | string;
    }

    interface ScrapSettings {
      requestUrl: string;
      templateId?: number;
      templateArgs?: Record<string, string>;
      installTalk?: boolean;
      callback?: () => void;
      serverCallbackArgs?: Record<string, string> | string;
    }

    interface ButtonSettings {
      container: string | HTMLElement;
    }

    interface DefaultButtonSettings extends ButtonSettings, DefaultSettings {}
    interface CustomButtonSettings extends ButtonSettings, CustomSettings {}
    interface ScrapButtonSettings extends ButtonSettings, ScrapSettings {}

    interface UploadImageSettings {
      file: File[];
    }

    interface ScrapImageSettings {
      imageUrl: string;
    }

    interface DeleteImageSettings {
      imageUrl: string;
    }

    interface ImageUploadResponse {
      infos: ImageInfos;
    }

    // --- Functions ---

    /** Send a default template message via KakaoTalk */
    function sendDefault(settings: DefaultSettings): void;

    /** Send a custom template message via KakaoTalk */
    function sendCustom(settings: CustomSettings): void;

    /** Send a scrap template message via KakaoTalk */
    function sendScrap(settings: ScrapSettings): void;

    /** Create a default template share button */
    function createDefaultButton(settings: DefaultButtonSettings): void;

    /** Create a custom template share button */
    function createCustomButton(settings: CustomButtonSettings): void;

    /** Create a scrap template share button */
    function createScrapButton(settings: ScrapButtonSettings): void;

    /** Upload an image to Kakao servers */
    function uploadImage(settings: UploadImageSettings): Promise<ImageUploadResponse>;

    /** Scrap an image from a URL */
    function scrapImage(settings: ScrapImageSettings): Promise<ImageUploadResponse>;

    /** Delete an uploaded image */
    function deleteImage(settings: DeleteImageSettings): Promise<void>;

    /** Clean up Share module resources */
    function cleanup(): void;
  }
}
