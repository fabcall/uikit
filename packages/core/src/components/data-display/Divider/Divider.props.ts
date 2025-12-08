import type { ViewProps } from "react-native";

export interface DividerProps extends Omit<ViewProps, "style"> {
  /**
   * Text to display in the middle of the divider
   */
  text?: string;
  /**
   * Orientation of the divider
   * @defaultValue 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Thickness of the divider line
   * @defaultValue 'md'
   */
  thickness?: "sm" | "md" | "lg";
  /**
   * Color variant of the divider
   * @defaultValue 'divider'
   */
  color?: "divider" | "border";
}
