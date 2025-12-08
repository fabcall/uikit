import type { ViewProps } from "react-native";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends Omit<ViewProps, "style"> {
  /**
   * The color of the spinner
   * @defaultValue theme.colors.primary
   */
  color?: string;

  /**
   * The size of the spinner
   * @defaultValue 'md'
   */
  size?: SpinnerSize;
}
