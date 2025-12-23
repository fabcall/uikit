import type { ComponentType } from "react";
import type { PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";

export type ChipColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";
  
export type ChipVariant = "solid" | "outline";

export type ChipSize = "sm" | "md";

export type ChipRoundedSide = "all" | "left" | "right" | "none";

export interface ChipProps extends Omit<PressableProps, "style"> {
  /** Text label for the chip */
  label: string;
  /** Color variant (required) */
  color: ChipColor;
  /** Visual variant */
  variant?: ChipVariant;
  /** Size of the chip */
  size?: ChipSize;
  /** Which sides should be rounded */
  roundedSide?: ChipRoundedSide;
  /** Whether the chip is selected */
  isSelected?: boolean;
  /** Whether the chip is disabled */
  isDisabled?: boolean;
  /** Icon to display on the left */
  leftIcon?: ComponentType<SvgProps>;
  /** Whether to show a dismiss/close button */
  isDismissible?: boolean;
  /** Callback when dismiss button is pressed */
  onDismiss?: () => void;
}
