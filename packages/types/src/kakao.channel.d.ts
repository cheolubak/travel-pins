declare namespace Kakao {
  namespace Channel {
    interface AddChannelSettings {
      channelPublicId: string;
    }

    interface FollowChannelSettings {
      channelPublicId: string;
    }

    interface ChatSettings {
      channelPublicId: string;
    }

    interface AddChannelButtonSettings {
      container: string | HTMLElement;
      channelPublicId: string;
      size?: 'small' | 'large';
      supportMultipleDensities?: boolean;
    }

    interface ChatButtonSettings {
      container: string | HTMLElement;
      channelPublicId: string;
      title?: string;
      size?: 'small' | 'large';
      color?: 'yellow' | 'mono';
      shape?: 'pc' | 'mobile';
      supportMultipleDensities?: boolean;
    }

    interface FollowChannelResponse {
      success: boolean;
    }

    /** Open the add channel popup */
    function addChannel(settings: AddChannelSettings): void;

    /** Open the follow channel popup */
    function followChannel(
      settings: FollowChannelSettings,
    ): Promise<FollowChannelResponse>;

    /** Open a chat window with the channel */
    function chat(settings: ChatSettings): void;

    /** Create an add-channel button */
    function createAddChannelButton(settings: AddChannelButtonSettings): void;

    /** Create a chat button */
    function createChatButton(settings: ChatButtonSettings): void;

    /** Clean up Channel module resources */
    function cleanup(): void;
  }
}
