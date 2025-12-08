import type { ReactNode } from "react";
import type { ViewProps } from "react-native";

export type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

export type BadgeVariant = "solid" | "outline";

export interface BadgeProps extends Omit<ViewProps, "children"> {
  /** Content to display (number or short text) */
  content?: number | string;
  /** Color variant */
  color?: BadgeColor;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Maximum number to display (shows max+ if exceeded) */
  max?: number;
  /** Show as dot only (no content) */
  dot?: boolean;
  /** Whether the badge is visible */
  visible?: boolean;
  /** Offset the badge from the children */
  offset?: { x?: number; y?: number };
  /** Child element to attach the badge to */
  children?: ReactNode;
}
