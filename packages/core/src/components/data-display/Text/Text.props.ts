import type { TextProps as RNTextProps } from "react-native";

export interface TextProps extends RNTextProps {
  variant?: "h1" | "h2" | "body" | "bodySmall" | "caption";
  color?: "primary" | "secondary" | "disabled" | "inverse";
}
