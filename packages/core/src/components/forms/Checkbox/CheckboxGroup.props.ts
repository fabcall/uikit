import type { ViewProps } from "react-native";

export interface CheckboxGroupProps<T = string | number> extends ViewProps {
  children: React.ReactNode;
  value: T[];
  onChange: (value: T[]) => void;
  disabled?: boolean;
  showSelectAll?: boolean;
  selectAllLabel?: string;
  direction?: "horizontal" | "vertical";
}
