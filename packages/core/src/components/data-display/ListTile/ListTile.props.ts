import type { ReactNode } from "react";
import type { PressableProps } from "react-native";

export type ListTileSize = "sm" | "md" | "lg";

export interface ListTileProps extends Omit<PressableProps, "style"> {
  /** Primary text/title */
  title: string;
  /** Secondary text/subtitle */
  subtitle?: string;
  /** Element to display on the left (icon, avatar, etc.) */
  leading?: ReactNode;
  /** Element to display on the right (icon, button, switch, etc.) */
  trailing?: ReactNode;
  /** Size variant */
  size?: ListTileSize;
  /** Whether the tile is disabled */
  isDisabled?: boolean;
  /** Whether to show a divider at the bottom */
  showDivider?: boolean;
  /** Whether the tile is selected/active */
  isSelected?: boolean;
}
