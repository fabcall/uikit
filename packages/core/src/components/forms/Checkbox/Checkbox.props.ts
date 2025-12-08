import type { PressableProps } from "react-native";

export interface CheckboxProps<T = string | number> extends Omit<PressableProps, "onPress" | "style"> {
  value: T;
  label?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
}
