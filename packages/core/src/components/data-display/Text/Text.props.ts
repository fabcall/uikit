import type { TextProps as RNTextProps } from "react-native";

export interface TextProps extends RNTextProps {
  variant?: "h1" | "body" | "button" | "caption";
  color?: "primary" | "secondary" | "disabled" | "inverse";
}
