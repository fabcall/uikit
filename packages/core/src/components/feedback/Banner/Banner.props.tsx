import type { ComponentType, ReactNode } from "react";
import type { ViewProps } from "react-native";
import type { SvgProps } from "react-native-svg";

/**
 * Banner variant types
 */
export type BannerVariant = "error" | "success" | "warning" | "info";

/**
 * Props for the Banner component
 *
 * Use either `variant` for predefined theme colors OR `color` for custom styling.
 * When `color` is provided, `variant` is ignored.
 */
export interface BannerProps extends Omit<ViewProps, "style"> {
  /**
   * The banner message to display
   */
  message: string;

  /**
   * Optional title to display above the message
   */
  title?: string;

  /**
   * The variant/type of banner (ignored when `color` is provided)
   * @defaultValue 'error'
   */
  variant?: BannerVariant;

  /**
   * Optional custom icon component
   */
  icon?: ComponentType<SvgProps>;

  /**
   * Custom color for icon and text.
   * When provided, `variant` is ignored and background is auto-derived with 10% opacity.
   */
  color?: string;

  /**
   * Custom background color (only used when `color` is provided)
   */
  backgroundColor?: string;

  /**
   * Optional action element (e.g., a button) displayed on the right side of the banner
   */
  action?: ReactNode;
}
