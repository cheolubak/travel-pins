import type { IconName } from './Icon.type';
import type { ComponentProps, ComponentType } from 'react';

import { clsx } from 'clsx';

import {
  IconAdd,
  IconAddOutline,
  IconAddOutlineFill,
  IconApple,
  IconArrowBackward,
  IconArrowDownward,
  IconArrowDropDown,
  IconArrowDropUp,
  IconArrowForward,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpward,
  IconArticle,
  IconBack,
  IconBookmarkFill,
  IconBookmarkOutline,
  IconCafe,
  IconCalendar,
  IconCard,
  IconClear,
  IconDelete,
  IconDragHandle,
  IconDragIndicator,
  IconEdit,
  IconEMail,
  IconErrorOutline,
  IconFacebook,
  IconFavoriteFill,
  IconFavoriteOutline,
  IconFilter,
  IconFilterOff,
  IconFood,
  IconForward,
  IconGoogle,
  IconGridView,
  IconHelpOutline,
  IconImage,
  IconInfoOutline,
  IconInvisibility,
  IconKakao,
  IconKey,
  IconKeyboardArrowDown,
  IconKeyboardArrowLeft,
  IconKeyboardArrowRight,
  IconKeyboardArrowUp,
  IconLanguage,
  IconList,
  IconLogin,
  IconLogout,
  IconMenu,
  IconMoreVert,
  IconPauseFill,
  IconPauseOutline,
  IconPerson,
  IconPlayFill,
  IconPlayOutline,
  IconRemove,
  IconRemoveFill,
  IconRemoveOutline,
  IconSearch,
  IconSend,
  IconShare,
  IconStar,
  IconStopFill,
  IconStore,
  IconVisibility,
} from './icons';

import styles from './Icon.module.css';

interface IconProps extends ComponentProps<'i'> {
  color?: string;
  name: IconName;
  size?: number;
}

const ICON_MAP: Record<IconName, ComponentType> = {
  add: IconAdd,
  'add-outline': IconAddOutline,
  'add-outline-fill': IconAddOutlineFill,
  apple: IconApple,
  'arrow-backward': IconArrowBackward,
  'arrow-downward': IconArrowDownward,
  'arrow-drop-down': IconArrowDropDown,
  'arrow-drop-up': IconArrowDropUp,
  'arrow-forward': IconArrowForward,
  'arrow-left': IconArrowLeft,
  'arrow-right': IconArrowRight,
  'arrow-upward': IconArrowUpward,
  article: IconArticle,
  back: IconBack,
  'bookmark-fill': IconBookmarkFill,
  'bookmark-outline': IconBookmarkOutline,
  cafe: IconCafe,
  calendar: IconCalendar,
  card: IconCard,
  clear: IconClear,
  delete: IconDelete,
  'drag-handle': IconDragHandle,
  'drag-indicator': IconDragIndicator,
  edit: IconEdit,
  email: IconEMail,
  'error-outline': IconErrorOutline,
  facebook: IconFacebook,
  'favorite-fill': IconFavoriteFill,
  'favorite-outline': IconFavoriteOutline,
  filter: IconFilter,
  'filter-off': IconFilterOff,
  food: IconFood,
  forward: IconForward,
  google: IconGoogle,
  'grid-view': IconGridView,
  'help-outline': IconHelpOutline,
  image: IconImage,
  'info-outline': IconInfoOutline,
  invisibility: IconInvisibility,
  kakao: IconKakao,
  key: IconKey,
  'keyboard-arrow-down': IconKeyboardArrowDown,
  'keyboard-arrow-left': IconKeyboardArrowLeft,
  'keyboard-arrow-right': IconKeyboardArrowRight,
  'keyboard-arrow-up': IconKeyboardArrowUp,
  language: IconLanguage,
  list: IconList,
  login: IconLogin,
  logout: IconLogout,
  menu: IconMenu,
  'more-vert': IconMoreVert,
  'pause-fill': IconPauseFill,
  'pause-outline': IconPauseOutline,
  person: IconPerson,
  'play-fill': IconPlayFill,
  'play-outline': IconPlayOutline,
  remove: IconRemove,
  'remove-fill': IconRemoveFill,
  'remove-outline': IconRemoveOutline,
  search: IconSearch,
  send: IconSend,
  share: IconShare,
  star: IconStar,
  'stop-fill': IconStopFill,
  store: IconStore,
  visibility: IconVisibility,
};

export const Icon = ({
  className,
  color,
  name,
  size = 24,
  ...props
}: IconProps) => {
  const IconComponent = ICON_MAP[name];

  return (
    <i
      {...props}
      className={clsx(styles.icon, className)}
      style={{ fill: color, fontSize: size }}
    >
      <IconComponent />
    </i>
  );
};
