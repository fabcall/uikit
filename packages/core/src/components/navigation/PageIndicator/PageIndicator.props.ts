import type { ViewProps } from "react-native";

export interface PageIndicatorProps extends Omit<ViewProps, "children"> {
  /** Total number of pages */
  count: number;
  /** Current active page index (0-based) */
  currentIndex: number;
  /** Callback when a dot is pressed (makes dots interactive) */
  onPagePress?: (index: number) => void;
}
