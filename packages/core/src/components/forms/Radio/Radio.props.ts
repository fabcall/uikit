import type { PressableProps } from "react-native";

export interface RadioProps<T> extends Omit<PressableProps, "onPress" | "style"> {
  value: T;
  label?: string;
  onChange?: (value: T) => void;
  selected?: boolean;
  disabled?: boolean;
}