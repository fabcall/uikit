import type { PressableProps } from "react-native";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  title: string;
  color?: "primary" | "secondary";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
}
