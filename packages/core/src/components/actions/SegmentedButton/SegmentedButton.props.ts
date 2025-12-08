import type { ViewProps } from "react-native";

export interface SegmentedButtonOption<T extends string = string> {
  /**
   * Unique value for the option
   */
  value: T;
  /**
   * Label to display
   */
  label: string;
}

export interface SegmentedButtonProps<T extends string = string> extends Omit<
  ViewProps,
  "style"
> {
  /**
   * Array of options to display
   */
  options: SegmentedButtonOption<T>[];
  /**
   * Currently selected value
   */
  value: T;
  /**
   * Callback when selection changes
   */
  onChange: (value: T) => void;
  /**
   * Whether the component is disabled
   * @defaultValue false
   */
  isDisabled?: boolean;
}
