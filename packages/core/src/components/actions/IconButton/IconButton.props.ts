import type { ComponentType } from "react";
import type { PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";

export interface IconButtonProps extends Omit<PressableProps, "style"> {
  /**
   * The icon component to display
   */
  icon: ComponentType<SvgProps>;

  /**
   * The color scheme of the button
   * @defaultValue 'primary'
   */
  color?: "primary" | "secondary";

  /**
   * The visual style variant of the button
   * @defaultValue 'solid'
   */
  variant?: "solid" | "outline" | "ghost";

  /**
   * The size of the button
   * @defaultValue 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the button is in a loading state
   * @defaultValue false
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled
   * @defaultValue false
   */
  isDisabled?: boolean;

  /**
   * Optional accessibility label for the button
   */
  accessibilityLabel?: string;
}
