import type { ComponentType } from "react";
import type { ImageSourcePropType, ViewProps } from "react-native";
import type { SvgProps } from "react-native-svg";

export interface CircleAvatarProps extends Omit<ViewProps, "style"> {
  /**
   * The image source to display
   */
  source?: ImageSourcePropType;

  /**
   * The name to display initials from (used as fallback when source is not available)
   * Also used for automatic color generation when backgroundColor is not provided
   */
  name?: string;

  /**
   * The icon component to display as fallback (used when source and name are not available)
   */
  icon?: ComponentType<SvgProps>;

  /**
   * The size of the avatar
   * @defaultValue 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Custom background color for the avatar
   * If not provided and name is available, a color will be generated based on the name hash
   */
  backgroundColor?: string;

  /**
   * Custom foreground color for initials/icon
   * If not provided, a high-contrast color will be calculated based on the background
   */
  foregroundColor?: string;

  /**
   * Whether to allow special characters in initials
   * @defaultValue false
   */
  allowSpecialChars?: boolean;

  /**
   * Whether to keep the original case of the name
   * @defaultValue false
   */
  keepCase?: boolean;

  /**
   * Desired length of the initials
   * @defaultValue 2
   */
  initialsLength?: number;

  /**
   * Optional accessibility label for the avatar
   */
  accessibilityLabel?: string;
}
