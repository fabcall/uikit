import type { ViewProps } from "react-native";

export interface RadioGroupProps<T> extends ViewProps {
  children: React.ReactNode;
  selectedValue: T;
  onChange: (value: T) => void;
  disabled?: boolean;
}