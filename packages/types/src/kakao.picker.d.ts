declare namespace Kakao {
  namespace Picker {
    interface SelectedUser {
      uuid: string;
      id?: string;
      profile_nickname?: string;
      profile_thumbnail_image?: string;
      favorite?: boolean;
    }

    interface PickerFriendSettings {
      title?: string;
      enableSearch?: boolean;
      showMyProfile?: boolean;
      showFavorite?: boolean;
      showPickedFriend?: boolean;
      maxPickableCount?: number;
      minPickableCount?: number;
      returnUrl?: string;
      enableBackButton?: boolean;
    }

    interface FriendPickerResponse {
      selectedTotalCount: number;
      users: SelectedUser[];
    }

    /** Open the friend picker to select a single friend */
    function selectFriend(
      settings?: PickerFriendSettings,
    ): Promise<FriendPickerResponse>;

    /** Open the friend picker to select multiple friends */
    function selectFriends(
      settings?: PickerFriendSettings,
    ): Promise<FriendPickerResponse>;

    /** Clean up Picker module resources */
    function cleanup(): void;
  }
}
