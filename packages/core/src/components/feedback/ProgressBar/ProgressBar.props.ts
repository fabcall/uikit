import type { ViewProps } from "react-native";

export type ProgressBarColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps extends Omit<ViewProps, "style"> {
  /** Progress value between 0 and 100 */
  value: number;
  /** Color of the progress bar */
  color?: ProgressBarColor;
  /** Size/height of the progress bar */
  size?: ProgressBarSize;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Whether to animate the progress changes */
  animated?: boolean;
  /** Whether to show an indeterminate loading animation */
  indeterminate?: boolean;
}
